// トレタスタンプ ウィジェットジェネレーター用 Worker
// 静的ファイル配信はそのまま ASSETS に委譲し、
// /api/analyze-site だけ Gemini を使ったサーバーサイド処理を行う。
// Gemini の API キーはこのファイルには書かず、Cloudflare の
// 「変数とシークレット」(環境変数 GEMINI_API_KEY) に設定して使う。

const GEMINI_MODEL = 'gemini-flash-latest';
const FETCH_HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; ToretaStampTonmanaBot/1.0)' };
const MAX_HTML_CHARS = 20000;
const MAX_CSS_FILES = 3;
const MAX_CSS_CHARS_PER_FILE = 8000;
// 出現頻度の高い色（構造色＝背景・ヘッダーなど広い面積に使われがち）と、
// 頻度の低い色（アクセント候補＝バッジ等あえて少数箇所にしか使わない色）を
// 別枠で確保する。アクセントカラーは定義上「使用頻度が低い」のが当たり前なので、
// 単純な頻度上位N件の足切りだと真っ先に漏れてしまうため。
const MAX_STRUCTURAL_CANDIDATES = 20;
const MAX_ACCENT_CANDIDATES = 40;
// 「構造色」と呼べるのは、最低でもこの回数以上使われている色だけ。単純に上位N件という
// 順位だけで区切ると、色数が少ないサイト（例：ほぼ黒/白/グレーのみ）では、たった1回しか
// 出てこない色まで「上位20件」に収まってしまい、構造色（＝よく使われている色）として
// 誤って扱われてしまう事故があった（実例：出現1回だけの`#99895c`がメインカラーとして
// 採用されてしまった）。
const MIN_STRUCTURAL_FREQUENCY = 3;
const MIN_CONTRAST_RATIO = 4.5;

// ヘッダーのメイン画像として使うサイズ（generator側の「スライダー画像サイズ」既定値に合わせる）
const HEADER_IMAGE_WIDTH = 500;
const HEADER_IMAGE_HEIGHT = 250;

// フッター固定メニューの標準構成。項目の種類（class）とラベルはサイトごとに変える必要がないため固定値とする。
const DEFAULT_MENU_ITEMS = [
  { class: 'home', label: 'ホーム', href: '', ext: false, aclass: '' },
  { class: 'stamp', label: 'スタンプ帳', href: '', ext: false, aclass: '' },
  { class: 'ticket', label: 'チケット', href: '', ext: false, aclass: '' },
  { class: 'history', label: '履歴', href: '', ext: false, aclass: '' },
  { class: 'reservation', label: '予約', href: '', ext: false, aclass: '' },
];

// トレタスタンプの各ページの相対パス（全店舗共通。shops.md参照）。
// 店舗ベースURLが分かれば、ここから home/stamp/ticket/history の href を機械的に組み立てられる。
const SHOP_PAGE_PATHS = {
  home: '',
  stamp: 'mypage/stamp',
  ticket: 'mypage/coupon',
  history: 'mypage/stamp_history/',
};

// --- Gemini に判断させる「役割」は6つだけに絞る ---------------------------------
// 以前は cfg-* の18項目それぞれを独立にGeminiへ判断させていたが、
// 「ヘッダー背景」「フッターメニュー背景」「チケットタイトル文字色」のように
// 本来は同じ"メインカラー"であるべき項目が、独立判断のせいで毎回バラバラな値になったり、
// 矛盾したりする問題があった。
// そこで、Geminiには少数の「役割（role）」だけを答えさせ、
// そこから各 cfg-* 項目へはコード側で機械的に展開する。これにより：
// 　・同じ役割を持つ項目同士は常に同じ値になる（ブレない・矛盾しない）
// 　・結果的に以前よりカバーする項目数が増える
const ROLE_DESCRIPTIONS = {
  mainColor: 'サイトで最も特徴的な、ブランドを象徴するメインカラー。ヘッダー・主要ボタン・見出し・QRコード読み取りボタンなど、実際にクリックできる操作ボタン全般に使われる色。',
  bodyBg: 'ページ全体の土台となる背景色。白に近いごく薄いグレーなど、落ち着いた色。',
  cardBg: 'その上に乗る、個々のカード・リスト・チケットなどの表面色。白またはそれに近い色が自然。',
  textColor: '本文の基本的な文字色。黒に近い色。',
};
const ROLE_FIELDS = Object.keys(ROLE_DESCRIPTIONS);

// role -> その値をそのままコピーする cfg-* 項目（背景・文字色として同じ値を使う箇所）
// ※以前は「QR読み取り等の強調ボタンはアクセントカラー（バッジに使う差し色）にする」設計だったが、
// 　実際のブランドCSSを調べたところ .c-btn--blue 等のクリック可能なボタン類は
// 　例外なくメインカラーで統一されており、差し色はバッジのような非操作要素にしか
// 　使われていなかった。そのため操作ボタン系はすべてメインカラーに統一する。
const ROLE_TO_FIELDS = {
  mainColor: [
    'cfg-header-bg',
    'cfg-mock-header-bg',
    'cfg-btn1-bg',
    'cfg-bg', // フッター固定メニューの背景色
    'cfg-ticket-title-c',
    'cfg-h3-color',
    'cfg-btn2-txt', // セカンダリボタンの文字色＝メインカラー
    'cfg-btn2-icon-c',
    'cfg-pgbtn-bg-c', // 通常ボタン（「トップへ戻る」等）の背景
    'cfg-pgbtn-org-bg-c', // QR読み取り・チケット利用などの強調ボタンの背景
  ],
  // cfg-list-bg（フッターリストメニュー＝ハンバーガー時のドロワー背景）は
  // 個々のカードというより画面全体を覆うパネルなので、カードの表面色ではなく
  // ページ全体の土台色（bodyBg）と揃える。
  bodyBg: ['cfg-body-bg', 'cfg-user-bg', 'cfg-list-bg'],
  cardBg: [
    'cfg-btn-area-bg',
    'cfg-ticket-bg',
    'cfg-std-bg-c',
    'cfg-user-card-bg',
    'cfg-btn2-bg', // セカンダリボタンの背景＝カードと同じ白系
  ],
  // cfg-notice-color（お知らせの文字色）も、以前は独立した「役割」としてGeminiに自由に
  // 選ばせていたが、実例を重ねた結果、明確な根拠（見出しタグやクラス名での指定）が
  // 無い限り、ほとんどのサイトで単なる本文色（黒に近い色）だった。独立した役割のままだと
  // 「警告として目立つ色でよい」という説明に引っ張られ、ロゴの色（ブランドとは無関係な
  // 文脈の色）を安易に流用してしまう事故が繰り返し起きたため、デフォルトはtextColorに
  // 揃え、実際のCSSから見出し色が検出できた場合だけ上書きする方式にした
  // （下の extractHeadingColorHint の呼び出し箇所を参照）。
  textColor: ['cfg-list-txt', 'cfg-notice-color'],
};

// role の色の「上に乗る文字色」。初期値は白を仮置きし、enforceContrast() で
// 読みにくければ黒へ補正する（＝自前で判断せず、既存のコントラスト補正に任せる）。
const TEXT_ON_ROLE_FIELDS = {
  mainColor: [
    'cfg-header-text-c',
    'cfg-txt',
    'cfg-btn1-txt',
    'cfg-btn1-icon-c',
    'cfg-pgbtn-txt-c',
    'cfg-pgbtn-org-txt-c',
    'cfg-ham-line-c', // ハンバーガーメニューの線の色（通常時）＝ヘッダー背景の上に乗る
  ],
  bodyBg: ['cfg-ham-line-active-c'], // ハンバーガーメニューの線の色（開いている時）＝リスト背景（=bodyBg）の上に乗る
};

// 背景色とセットで読みやすさ（コントラスト）を保証すべき組み合わせ
const CONTRAST_PAIRS = [
  ['cfg-header-bg', 'cfg-header-text-c'],
  ['cfg-header-bg', 'cfg-ham-line-c'],
  ['cfg-bg', 'cfg-txt'],
  ['cfg-btn1-bg', 'cfg-btn1-txt'],
  ['cfg-btn1-bg', 'cfg-btn1-icon-c'],
  ['cfg-pgbtn-bg-c', 'cfg-pgbtn-txt-c'],
  ['cfg-pgbtn-org-bg-c', 'cfg-pgbtn-org-txt-c'],
  ['cfg-btn2-bg', 'cfg-btn2-txt'],
  ['cfg-list-bg', 'cfg-list-txt'],
  ['cfg-list-bg', 'cfg-ham-line-active-c'],
  ['cfg-ticket-bg', 'cfg-ticket-title-c'],
  ['cfg-body-bg', 'cfg-h3-color'],
  ['cfg-body-bg', 'cfg-notice-color'],
];

// 各色は <input type="color"> 本体と、同期表示用の `-val` テキスト欄の
// 両方に同じ値を入れないと、再読み込み後に表示がずれるため複製する。対象は全色項目。
const ALL_COLOR_FIELDS = Array.from(
  new Set([
    ...Object.values(ROLE_TO_FIELDS).flat(),
    ...Object.values(TEXT_ON_ROLE_FIELDS).flat(),
  ])
);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/analyze-site') {
      if (request.method !== 'POST') {
        return jsonResponse({ error: 'POSTメソッドのみ対応しています' }, 405);
      }
      return handleAnalyzeSite(request, env);
    }

    // それ以外は静的ファイル配信
    return env.ASSETS.fetch(request);
  },
};

async function handleAnalyzeSite(request, env) {
  if (!env.GEMINI_API_KEY) {
    return jsonResponse(
      { error: 'サーバー側に GEMINI_API_KEY が設定されていません。Cloudflare の「設定 > 変数とシークレット」で設定してください。' },
      500
    );
  }

  let targetUrl, shopBaseUrl, reservationUrl;
  try {
    const body = await request.json();
    targetUrl = body.url;
    // 解析対象の公式HPとは別物。トレタスタンプ自体のURL（例: https://xxx.toreta-stamp.com/XXXX/YYYYYYYY/）。
    shopBaseUrl = typeof body.shopBaseUrl === 'string' ? body.shopBaseUrl.trim() : '';
    reservationUrl = typeof body.reservationUrl === 'string' ? body.reservationUrl.trim() : '';
  } catch (e) {
    return jsonResponse({ error: 'リクエストの形式が不正です' }, 400);
  }

  if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
    return jsonResponse({ error: '有効なURL（http:// または https:// で始まるもの）を指定してください' }, 400);
  }

  let html, cssText;
  try {
    ({ html, cssText } = await fetchSiteMaterial(targetUrl));
  } catch (e) {
    return jsonResponse({ error: 'サイトの取得中にエラーが発生しました: ' + e.message }, 400);
  }

  // 一時的な状態（:hover・.open等）のCSSルールは、色抽出の対象から除外する
  // （一時状態の色を定常的なブランドカラーと誤認してしまう事故があったため）。
  const cssTextForAnalysis = stripStateRules(cssText);
  const colorCandidates = extractColorCandidates(html + '\n' + cssTextForAnalysis);

  // ロゴ画像を1枚見つけられれば取得し、Geminiへの入力に画像としてそのまま添える。
  // テキスト（HTML/CSS）だけでは、ロゴ画像の中にしか存在しない色（写真やアイコンの色）は
  // 原理的に拾えないため、画像そのものを判断材料に加える。
  let logoImage = null;
  const logoImageUrl = extractLogoImageCandidate(html, targetUrl);
  if (logoImageUrl) {
    logoImage = await fetchImageAsBase64(logoImageUrl);
  }

  const schema = buildResponseSchema();
  // rgb()/rgba()表記も合わせて取り除く。私たちの色抽出（16進数のみ対象）はこの表記を
  // そもそも拾わないので、Geminiにだけその表記が見える非対称を無くすため。
  const prompt = buildPrompt(targetUrl, html.slice(0, MAX_HTML_CHARS), stripRgbFunctions(cssTextForAnalysis), colorCandidates, !!logoImage);

  const parts = [{ text: prompt }];
  if (logoImage) {
    parts.push({ inline_data: { mime_type: logoImage.mimeType, data: logoImage.base64 } });
  }

  let roles;
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: schema,
            // 同じサイトを解析したときに毎回違う配色が出るとブレの原因になるため、
            // ある程度決定的寄りの値にして再現性を上げる（0にはせず、多少の幅は残す）
            temperature: 0.2,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return jsonResponse({ error: 'Gemini APIの呼び出しに失敗しました: ' + errText }, 502);
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return jsonResponse({ error: 'Geminiから有効な応答が得られませんでした' }, 502);
    }
    roles = JSON.parse(text);
  } catch (e) {
    return jsonResponse({ error: 'Gemini呼び出し中に予期しないエラーが発生しました: ' + e.message }, 500);
  }

  // role（6項目）から、実際の cfg-* 項目へ機械的に展開する。
  // 同じ役割を参照する項目は必ず同じ値になるので、項目間の矛盾・ブレが起きない。
  const settings = {};
  Object.entries(ROLE_TO_FIELDS).forEach(([role, fields]) => {
    fields.forEach((field) => {
      if (roles[role]) settings[field] = roles[role];
    });
  });
  Object.entries(TEXT_ON_ROLE_FIELDS).forEach(([role, fields]) => {
    // 初期値は白を仮置き。背景色とのコントラストが低ければ enforceContrast() が黒に補正する。
    fields.forEach((field) => {
      settings[field] = '#ffffff';
    });
  });
  // 「全体の推測」であるGeminiの判断より、サイトのCSSに literal に書かれている値の方が
  // 確実なので、body / 見出し(h1-h3) のルールが見つかった場合はそちらで上書きする。
  const bodyStyleHints = extractBodyStyleHints(html + '\n' + cssText);
  if (bodyStyleHints.bgColor) {
    // bodyBg役割の全フィールド（cfg-body-bg・cfg-user-bg・cfg-list-bg）を実際の値で揃える
    ROLE_TO_FIELDS.bodyBg.forEach((field) => {
      settings[field] = bodyStyleHints.bgColor;
    });
  }
  if (bodyStyleHints.fontFamily) {
    // select側はそのままデフォルトにしておき、custom側（優先される）に実際のフォント指定を入れる
    settings['cfg-font-family-custom'] = bodyStyleHints.fontFamily;
  }

  const headingColor = extractHeadingColorHint(html + '\n' + cssText);
  if (headingColor) {
    // お知らせ表示の文字色・共通見出し(.titleh3)は、サイトの見出し(タイトル)で
    // 実際に使われている色に揃える（メインカラーとは別の色になっている実例があったため）
    settings['cfg-notice-color'] = headingColor;
    settings['cfg-h3-color'] = headingColor;
  }

  // ヘッダー・フッターの背景も、メインカラーからの一律判断より、
  // 実際のCSS（.header / .footer 等）に書かれている値があればそちらを優先する
  // （例：dragon-t2.comはヘッダーが白、フッターが黒と、ヘッダーとフッターで
  // 　色が分かれており、メインカラー1色で揃える前提が成立しなかった）。
  const combinedForElementHints = html + '\n' + cssText;
  const headerBgHint = extractElementBgHint(combinedForElementHints, (s) => /(?:^|\s)\.?header(?:\.[a-z0-9_-]+)*$/i.test(s));
  if (headerBgHint) {
    settings['cfg-header-bg'] = headerBgHint;
    settings['cfg-mock-header-bg'] = headerBgHint;
  }
  const footerBgHint = extractElementBgHint(combinedForElementHints, (s) => /(?:^|\s)\.?footer(?:\.[a-z0-9_-]+)*$/i.test(s));
  if (footerBgHint) {
    settings['cfg-bg'] = footerBgHint;
  }

  // メインカラーが明るい色（例：鮮やかな黄色）の場合、ページの背景（bodyBg・cardBg）の
  // 上にメインカラーで塗ったボタンを置くと、背景に溶けて見えなくなることがある。
  // mainColor自体（ヘッダー等）は変えず、該当するボタンの塗りだけ黒/白に反転する。
  invertFillsThatCollideWithBackground(settings, [settings['cfg-body-bg'], settings['cfg-btn-area-bg']]);

  // 背景色と文字色のコントラストが低い場合は、読みやすい色に自動補正する
  enforceContrast(settings);

  // フッター固定メニュー：項目の種類は標準の5つで固定（サイトごとに変える必要が無いため）。
  // home/stamp/ticket/history は、店舗ベースURL（解析対象の公式HPとは別物）が分かれば
  // 相対パスが全店舗共通なので自動で組み立てられる。「予約」だけは外部の予約ページという
  // 性質上、別途入力してもらった予約URLをそのまま href に使う（どちらも未入力なら空のまま）。
  // ※ generator/script.js 側のインポートは既にマージ方式に直しているので、
  // 　この項目だけを上書きしても他の設定（フォント・画像など）は消えない。
  const normalizedShopBaseUrl = shopBaseUrl ? (shopBaseUrl.endsWith('/') ? shopBaseUrl : shopBaseUrl + '/') : '';
  const menuItems = DEFAULT_MENU_ITEMS.map((item) => {
    if (item.class === 'reservation' && reservationUrl) {
      return { ...item, href: reservationUrl, ext: true }; // 外部予約サイトなので新しいタブで開く
    }
    if (normalizedShopBaseUrl && SHOP_PAGE_PATHS[item.class] !== undefined) {
      return { ...item, href: normalizedShopBaseUrl + SHOP_PAGE_PATHS[item.class] };
    }
    return item;
  });
  settings['saved_menu_items'] = menuItems;

  // SNS設定：公式サイトにX/Instagram/Facebookへのリンクがあれば自動で設定する。
  // 見つからない場合はキー自体を設定しない（既存のSNS設定をマージインポートで消さないため）。
  const snsItems = extractSnsLinks(html);
  if (snsItems.length) {
    settings['saved_sns_items'] = snsItems;
  }

  // SNSアイコンの色：既定の配置場所（ヘッダー右側）に合わせて、ヘッダー背景に対して
  // 読みやすい方（白 or 黒）を選ぶ。この項目は <select> で "#FFFFFF"/"#000000" の
  // 大文字表記しか選択肢に無いため、toUpperCase() して渡す。
  if (isHexColor(settings['cfg-header-bg'])) {
    settings['cfg-sns-c-val'] = pickReadableColor(settings['cfg-header-bg']).toUpperCase();
  }

  ALL_COLOR_FIELDS.forEach((field) => {
    if (settings[field]) {
      settings[field + '-val'] = settings[field];
    }
  });

  // ヘッダーのメイン画像：公式サイトのお知らせ・トピックス・カルーセルらしい画像を1枚探し、
  // スライダーの既定サイズ（500×250）にリサイズしたURLを設定する。
  // 画像が見つかった場合のみ、それが実際に表示される「パターンB（リッチ）」も合わせて選ぶ
  // （画像だけ設定してもheader-patternがAのままだと表示されないため）。
  const headerImageUrl = extractHeaderImageCandidate(html, targetUrl);
  if (headerImageUrl) {
    settings['cfg-header-main-img'] = buildResizedImageUrl(headerImageUrl, HEADER_IMAGE_WIDTH, HEADER_IMAGE_HEIGHT);
    settings['cfg-header-slider-width'] = String(HEADER_IMAGE_WIDTH);
    settings['cfg-header-slider-height'] = String(HEADER_IMAGE_HEIGHT);
    settings['header-pattern'] = 'B';
  }

  // フッターリストメニューの表示形式：公式サイト側にハンバーガーメニュー（スマホ等で
  // 開閉するメニュー）があれば、ジェネレーター側も同じ構成（パターンB）に寄せる。
  if (detectHamburgerMenu(html)) {
    settings['list-pattern'] = 'B';
  }

  return jsonResponse(settings, 200);
}

// 公式サイトのHTMLに、ハンバーガーメニューを示す典型的なクラス名・属性があるかを調べる。
// 完全な判定はできないので、あくまで目安。見つからなくても「無い」と断定はできないが、
// 見つかった場合は高い確度で「ある」と言える。
const HAMBURGER_MENU_PATTERN =
  /hamburger|humberger|nav-?toggle|menu-?toggle|drawer-?(toggle|menu|btn)|offcanvas|nav-?drawer|sp-?menu|gnav-?btn|header__menu|menu-?trigger|menu-?icon|icon-?menu/i;

function detectHamburgerMenu(html) {
  return HAMBURGER_MENU_PATTERN.test(html);
}

// サイト本体のHTMLに加えて、外部CSSファイルも取得して解析材料にする
// （色指定は <link rel="stylesheet"> の先に書かれていることが多いため）
// 汎用プラグイン・ライブラリ・Webフォント配信CSSのパターン。これらは大抵ブランドの配色を
// 含まない（スライダーの矢印デザイン、フォントの@font-face定義など）ため、取得の優先順位を
// 下げる。先頭から機械的にN件取得する方式だと、こうしたファイルが本物のテーマCSSより先に
// 並んでいる場合に、肝心のテーマCSSを一度も読まずに終わってしまうことがあるため
// （実例：dragon-t2.com は5個中3個がswiper/slickのプラグインCSSで、本当のテーマCSSである
// 　common.css/index.cssが4・5番目だった）。
const VENDOR_CSS_PATTERN =
  /swiper|slick|flatpickr|fancybox|dflip|owl[.-]?carousel|select2|lightbox|font-?awesome|jquery-?ui|bootstrap|wp-block|honeypot|pagenavi|tiny-slider|glide\.(?:core|theme)|splide|animate\.css|normalize\.css|reset\.css|typekit|fonts\.googleapis|fonts\.gstatic/i;

async function fetchSiteMaterial(targetUrl) {
  const siteRes = await fetch(targetUrl, { headers: FETCH_HEADERS, redirect: 'follow' });
  if (!siteRes.ok) {
    throw new Error(`サイトの取得に失敗しました（HTTP ${siteRes.status}）`);
  }
  const html = await siteRes.text();

  const linkTagRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi;
  const hrefRegex = /href=["']([^"']+)["']/i;
  const linkTags = html.match(linkTagRegex) || [];

  // テーマ固有らしいCSSを先に、汎用プラグイン/フォントCSSを後に回す（出現順はそれぞれ維持）。
  const themeLikeTags = [];
  const vendorLikeTags = [];
  linkTags.forEach((tag) => {
    (VENDOR_CSS_PATTERN.test(tag) ? vendorLikeTags : themeLikeTags).push(tag);
  });
  const orderedLinkTags = [...themeLikeTags, ...vendorLikeTags];

  let cssText = '';
  let fetchedCount = 0;
  for (const linkTag of orderedLinkTags) {
    if (fetchedCount >= MAX_CSS_FILES) break;
    const hrefMatch = linkTag.match(hrefRegex);
    if (!hrefMatch) continue;

    try {
      const cssUrl = new URL(hrefMatch[1], targetUrl).toString();
      const cssRes = await fetch(cssUrl, { headers: FETCH_HEADERS });
      if (cssRes.ok) {
        const cssContent = await cssRes.text();
        // ここでは切り詰めない（全文を保持する）。以前は1ファイルごとに先頭8000文字へ
        // 切り詰めていたが、実際のテーマCSSで `.footer{...}` のような重要なルールが
        // 8000文字目より後ろにあり、丸ごと読み落とす事故があった（dragon-t2.com）。
        // 自前の色抽出（body/見出し/ヘッダー/フッター等）は全文を見る必要があるため、
        // 文字数の都合はGeminiへのプロンプトを組み立てる側（buildPrompt内）でのみ考慮する。
        cssText += `\n/* ${cssUrl} */\n` + cssContent;
        fetchedCount++;
      }
    } catch (e) {
      // 1つのCSS取得に失敗しても全体は止めず、他のファイルで続行する
    }
  }

  return { html, cssText };
}

// :hover・:focus・.open・.active のような「操作中だけ表示される一時的な状態」を表す
// セレクタのCSSルールを取り除く。こうした一時状態の色は定常的なブランドカラーではないのに、
// プロンプトにCSSの生テキストをそのまま渡しているため、Geminiが読み取って
// 「ブランドカラーだ」と誤認してしまう事故があった（実例：ハンバーガーメニューを開いた時だけの
// 半透明の赤 `rgba(158,0,0,0.95)` が、お知らせの文字色として採用されてしまった）。
// Geminiに渡すCSS抜粋を作る直前にだけ適用し、他の抽出（body/見出し色等）には使わない
// （それらは選択は末尾一致などで既に厳密なので、この問題の影響を受けていない）。
const STATE_SELECTOR_PATTERN = /:hover|:focus|:active|:visited|\.open\b|\.active\b|\.disabled\b|\.show\b|\.expanded\b|\.toggled\b|\.selected\b/i;
function stripStateRules(cssText) {
  return cssText.replace(/([^{}]+)\{([^{}]*)\}/g, (full, selector) => (STATE_SELECTOR_PATTERN.test(selector) ? '' : full));
}

// rgb()/rgba() のCSS関数表記そのものを取り除く。私たちの色抽出（16進数のみを対象）は
// そもそもこの表記を拾わないが、プロンプトにはCSSの生テキストをそのまま渡しているため、
// Geminiだけがこの表記を読めてしまう非対称があった。rgba()は半透明（背景により見え方が
// 変わる）ことが多く、不透明の単色として扱うと誤解を招きやすい
// （実例：同じサイトの別箇所 `.new-news{background-color: rgba(158,0,0,0.85)}` という
// 半透明の装飾が、お知らせの文字色としてそのまま採用されてしまった）。
function stripRgbFunctions(cssText) {
  return cssText.replace(/rgba?\([^)]*\)/gi, '');
}

// HTML・CSSの中から実際に使われているカラーコードを拾い出し、
// 出現頻度順に並べる。AIに「実在する色」の手がかりとして渡すことで、
// サイトと無関係な色を創作してしまうのを防ぐ。
// 頻度の高い側（構造色候補）と低い側（アクセント候補）を別枠で返すことで、
// 出現回数の少ないアクセントカラーが上位N件の足切りで消えてしまうのを防ぐ。
//
// 注意：`(?<!&)` で「&」の直後は除外している。HTMLの数値文字参照（例: &#038; は「&」の意味）は
// 3桁・6桁とも偶然すべて0-9の数字だけになりやすく、16進カラーコードと誤認識してしまうため
// （実例：つぼ八公式サイトの `&#038;` を `#003388` という実在しない色として検出してしまった）。
function extractColorCandidates(text) {
  const matches = text.match(/(?<!&)#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];
  const freq = new Map();
  matches.forEach((raw) => {
    const color = normalizeHex(raw);
    freq.set(color, (freq.get(color) || 0) + 1);
  });

  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);

  // 「上位N件」という順位だけでなく、最低出現回数（MIN_STRUCTURAL_FREQUENCY）も
  // 満たすものだけを構造色とする。これにより、色数が少ないサイトで出現1〜2回の
  // レアな色が紛れ込むのを防ぐ（そうした色はaccent側に回る）。
  const structuralEntries = sorted.filter(([, count]) => count >= MIN_STRUCTURAL_FREQUENCY);
  const accentEntries = sorted.filter(([, count]) => count < MIN_STRUCTURAL_FREQUENCY);

  return {
    structural: structuralEntries.slice(0, MAX_STRUCTURAL_CANDIDATES).map(([color]) => color),
    accent: accentEntries.slice(0, MAX_ACCENT_CANDIDATES).map(([color]) => color),
  };
}

function normalizeHex(hex) {
  let h = hex.toLowerCase();
  if (h.length === 4) {
    // #abc -> #aabbcc
    h = '#' + h.slice(1).split('').map((c) => c + c).join('');
  }
  return h;
}

// HTML/CSSのテキストから「セレクタ, 宣言ブロック」のペアを順に探し、selectorTestを満たす
// ルールの宣言ブロックを**全て**集めて返す（出現順）。@media等のat-rule内部は正しく解釈
// できないため対象外（body/見出しの基本スタイルは通常トップレベルで宣言されるため実用上は問題ない）。
//
// 1つのタグに対して複数のルールが存在するのが普通（例: CSSリセットの `body{margin:0;...}` と、
// 実際のテーマの `body{font-family:...}` は別ルール）なので、最初に見つかった1件だけを見ると
// 目的のプロパティが無いルールに当たって何も取れないことがある。そのため全ルールを集めたうえで、
// 後方（＝CSSの優先順位としても後勝ち）から目的のプロパティを探す。
function findCssRuleBodies(cssText, selectorTest) {
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  const bodies = [];
  let m;
  while ((m = ruleRegex.exec(cssText)) !== null) {
    const selectors = m[1].split(',').map((s) => s.trim());
    if (selectors.some(selectorTest)) {
      bodies.push(m[2]);
    }
  }
  return bodies;
}

// 宣言ブロックの配列から「プロパティ名: 値」を1つ取り出す。複数ブロックがある場合は
// 後方（CSSの優先順位としても後勝ち）から探し、最初に見つかった値を返す。
// ハイフン付きの別プロパティ（例: background-color から color だけを誤って拾う）を防ぐため、
// 直前が「;」か宣言の先頭であることを確認する。
function extractDeclValue(declBodies, propName) {
  const regex = new RegExp('(?:^|;)\\s*' + propName + '\\s*:\\s*([^;]+)', 'i');
  for (let i = declBodies.length - 1; i >= 0; i--) {
    const m = declBodies[i].match(regex);
    if (m) return m[1].trim();
  }
  return null;
}

// body（html,bodyのような組み合わせ含む）のCSSルールから、実際に指定されている
// 背景色・フォントファミリーを取り出す。Geminiの推測に頼らず literal な値を優先するため。
function extractBodyStyleHints(text) {
  // 背景色は html 側に書かれていることもあるため html/body 両方を対象にする。
  // フォントは通常 body 側で指定されるので body のみを対象にする。
  const bodyDeclBodies = findCssRuleBodies(text, (s) => /^body$/i.test(s));
  const htmlOrBodyDeclBodies = findCssRuleBodies(text, (s) => /^(?:html|body)$/i.test(s));
  if (!htmlOrBodyDeclBodies.length) return { bgColor: null, fontFamily: null };

  let bgColor = null;
  const bgValue = extractDeclValue(htmlOrBodyDeclBodies, 'background(?:-color)?');
  if (bgValue) {
    const hexMatch = bgValue.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/);
    if (hexMatch) bgColor = normalizeHex(hexMatch[0]);
  }

  const fontValue = extractDeclValue(bodyDeclBodies, 'font-family');
  const fontFamily = fontValue ? fontValue.replace(/!important/gi, '').trim() : null;

  return { bgColor, fontFamily };
}

// 「お知らせ/ニュース一覧の記事タイトル」によくあるクラス名パターン。h1-h3のような
// タグ自体には色指定が無く、クラスベースで装飾しているサイトのためのフォールバック。
// index_news のようにホームページの簡易一覧を指すクラスを、news_list のような
// 専用一覧ページのクラスより優先する（トレタスタンプの「お知らせ」欄は前者に近い簡易表示のため）。
const NOTICE_TITLE_SELECTOR_PATTERNS = [
  (s) => /(?:index|top|home)[-_][a-z]*(?:news|info|notice|topic)/i.test(s) && /(?:ttl|title)/i.test(s),
  (s) => /(?:news|info|notice|topic)[-_][a-z_]*(?:ttl|title)/i.test(s),
];

// h1 → h2 → h3 → お知らせ系クラス名パターン、の順にCSSルールを探し、
// 最初に見つかった文字色を返す。見出し（タイトル）に実際に使われている色を、
// お知らせ表示の文字色の手がかりとして使うため。
function extractHeadingColorHint(text) {
  for (const tag of ['h1', 'h2', 'h3']) {
    const declBodies = findCssRuleBodies(text, (s) => new RegExp(`^${tag}$`, 'i').test(s));
    if (!declBodies.length) continue;
    const colorValue = extractDeclValue(declBodies, 'color');
    if (!colorValue) continue;
    const hexMatch = colorValue.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/);
    if (hexMatch) return normalizeHex(hexMatch[0]);
  }
  for (const test of NOTICE_TITLE_SELECTOR_PATTERNS) {
    const declBodies = findCssRuleBodies(text, test);
    if (!declBodies.length) continue;
    const colorValue = extractDeclValue(declBodies, 'color');
    if (!colorValue) continue;
    const hexMatch = colorValue.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/);
    if (hexMatch) return normalizeHex(hexMatch[0]);
  }
  return null;
}

// selectorTestを満たすCSSルール（例：.header, .footer）から背景色を取り出す。
// ヘッダー/フッターはメインカラー1色に揃わない実例があった（例：dragon-t2.comは
// ヘッダーが白・フッターが黒と分かれていた）ため、「全部メインカラーで揃える」という
// 前提に頼らず、実際にそのセレクタへ指定されている値を優先的に使う。
function extractElementBgHint(text, selectorTest) {
  const declBodies = findCssRuleBodies(text, selectorTest);
  if (!declBodies.length) return null;
  const bgValue = extractDeclValue(declBodies, 'background(?:-color)?');
  if (!bgValue) return null;
  const hexMatch = bgValue.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/);
  return hexMatch ? normalizeHex(hexMatch[0]) : null;
}

// 公式サイトの <img> タグから、ヘッダースライダーに使えそうな画像を1枚選ぶ。
// ロゴ・アイコン・SVG等は除外し、「お知らせ/トピックス/カルーセル」らしいパス、
// なるべく横幅の大きい画像を優先する。
function extractHeaderImageCandidate(html, baseUrl) {
  const imgTagRegex = /<img\b[^>]*>/gi;
  const srcRegex = /\b(?:src|data-src)=["']([^"']+)["']/i;
  const widthRegex = /\bwidth=["']?(\d+)/i;

  const tags = html.match(imgTagRegex) || [];
  const candidates = [];

  for (const tag of tags) {
    const srcMatch = tag.match(srcRegex);
    if (!srcMatch) continue;
    const src = srcMatch[1];

    if (/\.svg(\?|$)/i.test(src)) continue;
    if (/logo|icon|favicon|sprite|pixel|spacer|\.gif(\?|$)/i.test(src)) continue;

    let url;
    try {
      url = new URL(src, baseUrl).toString();
    } catch (e) {
      continue;
    }

    const widthMatch = tag.match(widthRegex);
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
    const looksLikeNews = /news|topics?|carousel|slide|banner|\bkv\b|campaign/i.test(src);

    candidates.push({ url, width, looksLikeNews });
  }

  candidates.sort((a, b) => {
    if (a.looksLikeNews !== b.looksLikeNews) return a.looksLikeNews ? -1 : 1;
    return b.width - a.width;
  });

  return candidates.length ? candidates[0].url : null;
}

// 自前でCloudflare Image Resizingを使うには有料プラン/専用設定が必要なため、
// 無料で使える画像プロキシ（wsrv.nl）経由で指定サイズにリサイズしたURLを返す。
// 実際のリサイズ処理は表示時にそのプロキシ側で行われる。
function buildResizedImageUrl(originalUrl, width, height) {
  const encoded = encodeURIComponent(originalUrl);
  return `https://wsrv.nl/?url=${encoded}&w=${width}&h=${height}&fit=cover&output=jpg`;
}

// 公式サイトのリンクから、対応しているSNS（X・Instagram・Facebook）のアカウントURLを探す。
// generator側の「SNS設定」は最大4個までのため、見つかった順に最大4個まで、
// 種類ごとに最初の1件を採用する（同じSNSへのリンクが複数あっても1つに絞る）。
const SNS_TYPE_PATTERNS = [
  { type: 'instagram', regex: /instagram\.com/i },
  { type: 'x', regex: /(?:\/\/|\.)(?:twitter|x)\.com(?:[/"'?#]|$)/i },
  { type: 'facebook', regex: /(?:\/\/|\.)facebook\.com(?:[/"'?#]|$)/i },
];

function extractSnsLinks(html) {
  const hrefRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  const found = new Map();
  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    const href = m[1];
    for (const { type, regex } of SNS_TYPE_PATTERNS) {
      if (!found.has(type) && regex.test(href)) {
        found.set(type, href);
      }
    }
  }
  return Array.from(found.entries())
    .slice(0, 4)
    .map(([type, href]) => ({ type, href, otherUrl: '', ext: true }));
}

// ロゴ画像を1枚探す。Geminiの画像入力はラスター形式（png/jpeg/webp等）のみ対応で
// SVGは渡せないため、SVGは除外する。
// 1. alt・src・class に "logo" を含む <img> タグを優先
// 2. 無ければ <link rel="icon"> / rel="apple-touch-icon"> を探し、sizes指定が最大のものを使う
//    （favicon.ico のような曖昧な拡張子は対象外。きちんと image/png 等と分かるものだけ使う）
function extractLogoImageCandidate(html, baseUrl) {
  const imgTagRegex = /<img\b[^>]*>/gi;
  const srcRegex = /\b(?:src|data-src)=["']([^"']+)["']/i;
  const isRasterImage = (src) => /\.(?:png|jpe?g|webp)(\?|$)/i.test(src);

  const imgTags = html.match(imgTagRegex) || [];
  for (const tag of imgTags) {
    if (!/logo/i.test(tag)) continue;
    const srcMatch = tag.match(srcRegex);
    if (!srcMatch) continue;
    const src = srcMatch[1];
    if (!isRasterImage(src)) continue; // SVGなどは対象外
    try {
      return new URL(src, baseUrl).toString();
    } catch (e) {
      continue;
    }
  }

  // フォールバック：favicon / apple-touch-icon から、宣言サイズが最大のものを選ぶ
  const linkTagRegex = /<link\b[^>]*rel=["'](?:icon|apple-touch-icon)["'][^>]*>/gi;
  const hrefRegex = /\bhref=["']([^"']+)["']/i;
  const sizesRegex = /\bsizes=["'](\d+)x\d+["']/i;

  const linkTags = html.match(linkTagRegex) || [];
  let best = null;
  for (const tag of linkTags) {
    const hrefMatch = tag.match(hrefRegex);
    if (!hrefMatch) continue;
    const src = hrefMatch[1];
    if (!isRasterImage(src)) continue;

    const sizeMatch = tag.match(sizesRegex);
    const size = sizeMatch ? parseInt(sizeMatch[1], 10) : 0;
    if (!best || size > best.size) {
      try {
        best = { url: new URL(src, baseUrl).toString(), size };
      } catch (e) {
        continue;
      }
    }
  }

  return best ? best.url : null;
}

// 画像を取得してGeminiのinline_data用にBase64エンコードする。
// Workers環境にはNodeのBufferが無いため、Uint8Arrayをchunk単位でbtoaにかける。
// 取得失敗・非対応形式・大きすぎる画像は null を返し、呼び出し側はテキストのみで解析を続行する。
const MAX_LOGO_IMAGE_BYTES = 3 * 1024 * 1024; // 3MB
async function fetchImageAsBase64(url) {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS });
    if (!res.ok) return null;

    const contentType = (res.headers.get('content-type') || '').split(';')[0].trim();
    if (!/^image\/(png|jpeg|webp)$/.test(contentType)) return null;

    const buf = await res.arrayBuffer();
    if (buf.byteLength === 0 || buf.byteLength > MAX_LOGO_IMAGE_BYTES) return null;

    const bytes = new Uint8Array(buf);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }

    return { base64: btoa(binary), mimeType: contentType };
  } catch (e) {
    return null;
  }
}

function buildResponseSchema() {
  const properties = {};
  ROLE_FIELDS.forEach((role) => {
    properties[role] = {
      type: 'string',
      description: `16進カラーコード。例: #ffffff。${ROLE_DESCRIPTIONS[role]}`,
    };
  });
  return {
    type: 'object',
    properties,
    required: ROLE_FIELDS,
  };
}

function buildPrompt(targetUrl, htmlExcerpt, cssText, colorCandidates, hasLogoImage) {
  const { structural, accent } = colorCandidates;
  let colorHint;
  if (structural.length || accent.length) {
    colorHint = 'このサイトのHTML/CSSから実際に検出されたカラーコードです。\n\n';
    if (structural.length) {
      colorHint += `【高頻度で検出された色＝構造色の候補】\n${structural.join(', ')}\nこれらは背景・ヘッダー・ボタンなど広い面積で使われている可能性が高い色です。\n\n`;
    }
    if (accent.length) {
      colorHint += `【低頻度で検出された色＝アクセントカラーの候補】\n${accent.join(', ')}\nアクセントカラーは「NEW」「おすすめ」バッジなど、デザイン上あえて少数箇所にしか使わないことが多い色です。出現回数が少ないからといって軽視せず、そのサイトらしさを象徴する色として積極的に検討してください。\n\n`;
    }
    colorHint += 'これらは実際にサイトで使われている色です。配色を作る際は、この中から主要なブランドカラーを優先的に選んで使ってください。';
  } else {
    colorHint = '色の検出はできませんでした。業態の一般的な印象から妥当な配色を提案してください。';
  }

  // サイト本体のCSSから十分な色の手がかりが取れているかどうかで、ロゴ画像の扱いを変える。
  // 手がかりが乏しい場合（例：つぼ八のように理論上の配色情報がテキストに存在しないサイト）は
  // ロゴの色を積極的に使うべきだが、手がかりが豊富な場合（例：dragon-t2.comのように黒/白/グレー中心の
  // テーマCSSが別途ちゃんと存在するサイト）にロゴの色を無条件に優先すると、実際には
  // ボタン等の操作要素には使われていない「ロゴだけの色」をUI全体に広げてしまう事故が起きた。
  // ロゴマークの色は、ブランドシンボルとして使われているだけで、実際の操作要素（ボタン等）の
  // 色とは限らないため、サイト本体の手がかりが十分にある場合はそちらを優先する。
  const hasStrongTextEvidence = structural.length + accent.length >= 8;
  const logoHint = hasLogoImage
    ? hasStrongTextEvidence
      ? '\n\nこのメッセージにはロゴ画像も添付しています。ただし、このサイトのHTML/CSSからは十分な数の色の手がかりが見つかっているので、mainColor・bodyBg・cardBg・textColorはすべて基本的にそちらを優先してください。ロゴマークの色は、ブランドシンボルとして使われているだけで、実際にクリックできる操作要素（ボタン等）や本文の色とは限りません。ロゴの色がHTML/CSSの手がかりと大きく食い違う場合、無理にどこかの役割に当てはめようとせず、HTML/CSSの手がかりの方を優先してください（特にtextColorは「黒に近い色」が基本なので、ロゴが鮮やかな色でもtextColorをその色にしないでください）。'
      : '\n\nこのメッセージにはロゴ画像も添付しています。このサイトのHTML/CSSからは十分な色の手がかりが見つかっていないため、ロゴで使われている色（写真の色・ロゴマークそのものの色）を積極的に参考にしてください。'
    : '';

  return `あなたは飲食店の公式サイトのデザインを分析し、配色のトンマナを抽出する専門家です。

対象サイト: ${targetUrl}

--- HTML抜粋 ---
${htmlExcerpt}
--- HTML抜粋ここまで ---

--- 関連CSS抜粋 ---
${cssText ? cssText.slice(0, MAX_CSS_CHARS_PER_FILE * MAX_CSS_FILES) : '(取得できませんでした)'}
--- CSS抜粋ここまで ---

${colorHint}${logoHint}

このサイトの配色・雰囲気（高級感がある／カジュアル／和風／ポップ、など）を読み取り、
同じトンマナに合う配色を、来店ポイントを貯めるスタンプカードアプリのUI設定として、
以下の4つの「役割」ごとに1色ずつ提案してください。

- mainColor: ${ROLE_DESCRIPTIONS.mainColor}
- bodyBg: ${ROLE_DESCRIPTIONS.bodyBg}
- cardBg: ${ROLE_DESCRIPTIONS.cardBg}
- textColor: ${ROLE_DESCRIPTIONS.textColor}

必ず守ってほしいこと：
- すべて16進数カラーコード（例: #ffffff）で回答する
- bodyBg と cardBg は、重なったときにカードの輪郭が分かる程度に区別できる色にする
- 上で示した「実際に検出されたカラーコード」（および添付したロゴ画像があればその色）を優先的に活用し、サイトと無関係な色を創作しない
- とくにmainColorは、必ず【高頻度で検出された色＝構造色の候補】の中から選んでください。【低頻度で検出された色＝アクセントカラーの候補】は出現回数が1〜2回程度のことが多く、サイト全体の基調とは言えないことが多いです。今回の4つの役割にはアクセント用の枠が無いため、低頻度の色をmainColorに採用しないでください
- 検出された色だけでは組み合わせが成立しない場合（似た色しかない等）のみ、業態の印象から補う色を追加してよい`;
}

// Geminiの提案が読みにくい配色だった場合の最終防衛ライン。
// 背景と文字のコントラスト比が基準未満なら、文字色を黒 or 白に寄せて読めるようにする。
function enforceContrast(settings) {
  CONTRAST_PAIRS.forEach(([bgField, fgField]) => {
    const bg = settings[bgField];
    const fg = settings[fgField];
    if (!isHexColor(bg) || !isHexColor(fg)) return;

    try {
      if (contrastRatio(bg, fg) < MIN_CONTRAST_RATIO) {
        settings[fgField] = pickReadableColor(bg);
      }
    } catch (e) {
      // 色の解析に失敗した場合は補正せずそのまま
    }
  });
}

function isHexColor(value) {
  return typeof value === 'string' && /^#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex).slice(1);
  const num = parseInt(normalized, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function pickReadableColor(bgHex) {
  // 背景色に対して、黒文字・白文字のどちらがより高いコントラスト比を得られるかで選ぶ。
  // 輝度0.5を境にした単純な閾値だと、ゴールドのような中間的な色で
  // 「本当はより読みやすい方」と逆の文字色を選んでしまうことがあるため、
  // 実際にコントラスト比を両方計算して比較する。
  const blackContrast = contrastRatio(bgHex, '#000000');
  const whiteContrast = contrastRatio(bgHex, '#ffffff');
  return blackContrast >= whiteContrast ? '#000000' : '#ffffff';
}

// mainColor自体（ヘッダー・フッター等）はブランドカラーそのものなので書き換えない。
// ただし cfg-btn1-bg・cfg-pgbtn-bg-c・cfg-pgbtn-org-bg-c は「ページの背景（bodyBg・cardBg）の
// 上に乗るボタンの塗り」として使われる箇所で、mainColor自体が薄い色（例：明るい黄色）だと
// 背景に溶けて見えなくなる。その場合は、その塗りだけを黒 or 白に反転する
// （mainColorの色味を壊さず、ヘッダー等は従来通りブランドカラーのまま）。
// 反転後の文字色・アイコン色は、この後に走る enforceContrast() が既存のCONTRAST_PAIRSに
// 従って自動的に黒/白へ補正するので、ここでは塗りの反転だけ行えばよい。
const MIN_FILL_CONTRAST = 1.8; // 文字色基準の4.5より緩い、塗りが「背景と同じ色」に見えない程度の閾値
const FILL_FIELDS_ON_BACKGROUND = ['cfg-btn1-bg', 'cfg-pgbtn-bg-c', 'cfg-pgbtn-org-bg-c'];
function invertFillsThatCollideWithBackground(settings, backgrounds) {
  FILL_FIELDS_ON_BACKGROUND.forEach((field) => {
    const fillColor = settings[field];
    if (!isHexColor(fillColor)) return;

    const collides = backgrounds.some((bg) => isHexColor(bg) && contrastRatio(fillColor, bg) < MIN_FILL_CONTRAST);
    if (collides) {
      settings[field] = pickReadableColor(fillColor);
    }
  });
}

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
