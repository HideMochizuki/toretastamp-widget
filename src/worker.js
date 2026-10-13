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
const MIN_CONTRAST_RATIO = 4.5;

// ヘッダーのメイン画像として使うサイズ（generator側の「スライダー画像サイズ」既定値に合わせる）
const HEADER_IMAGE_WIDTH = 500;
const HEADER_IMAGE_HEIGHT = 250;

// フッター固定メニューの標準構成。サイトごとに変える必要がないため固定値とし、
// URL（href）は空のまま、項目の種類（class）とラベルだけを設定する。
const DEFAULT_MENU_ITEMS = [
  { class: 'home', label: 'ホーム', href: '', ext: false, aclass: '' },
  { class: 'stamp', label: 'スタンプ帳', href: '', ext: false, aclass: '' },
  { class: 'ticket', label: 'チケット', href: '', ext: false, aclass: '' },
  { class: 'history', label: '履歴', href: '', ext: false, aclass: '' },
  { class: 'reservation', label: '予約', href: '', ext: false, aclass: '' },
];

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
  noticeColor: 'お知らせ・注意書きの文字色。警告として目立つ、独立した色でよい。',
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
  bodyBg: ['cfg-body-bg', 'cfg-user-bg'],
  cardBg: [
    'cfg-btn-area-bg',
    'cfg-list-bg',
    'cfg-ticket-bg',
    'cfg-std-bg-c',
    'cfg-user-card-bg',
    'cfg-btn2-bg', // セカンダリボタンの背景＝カードと同じ白系
  ],
  textColor: ['cfg-list-txt'],
  noticeColor: ['cfg-notice-color'],
};

// role の色の「上に乗る文字色」。初期値は白を仮置きし、enforceContrast() で
// 読みにくければ黒へ補正する（＝自前で判断せず、既存のコントラスト補正に任せる）。
const TEXT_ON_ROLE_FIELDS = {
  mainColor: ['cfg-header-text-c', 'cfg-txt', 'cfg-btn1-txt', 'cfg-pgbtn-txt-c', 'cfg-pgbtn-org-txt-c'],
};

// 背景色とセットで読みやすさ（コントラスト）を保証すべき組み合わせ
const CONTRAST_PAIRS = [
  ['cfg-header-bg', 'cfg-header-text-c'],
  ['cfg-bg', 'cfg-txt'],
  ['cfg-btn1-bg', 'cfg-btn1-txt'],
  ['cfg-pgbtn-bg-c', 'cfg-pgbtn-txt-c'],
  ['cfg-pgbtn-org-bg-c', 'cfg-pgbtn-org-txt-c'],
  ['cfg-btn2-bg', 'cfg-btn2-txt'],
  ['cfg-list-bg', 'cfg-list-txt'],
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

  let targetUrl;
  try {
    const body = await request.json();
    targetUrl = body.url;
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

  const colorCandidates = extractColorCandidates(html + '\n' + cssText);

  const schema = buildResponseSchema();
  const prompt = buildPrompt(targetUrl, html.slice(0, MAX_HTML_CHARS), cssText, colorCandidates);

  let roles;
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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
  if (roles.noticeColor) settings['cfg-notice-color'] = roles.noticeColor;

  // 背景色と文字色のコントラストが低い場合は、読みやすい色に自動補正する
  enforceContrast(settings);

  // フッター固定メニュー：サイトごとに変わるものではなく固定の標準構成でよいとのことなので、
  // URL（href）は空のまま、項目の種類だけ標準の5つを毎回設定する。
  // ※ generator/script.js 側のインポートは既にマージ方式に直しているので、
  // 　この項目だけを上書きしても他の設定（フォント・画像など）は消えない。
  settings['saved_menu_items'] = DEFAULT_MENU_ITEMS;

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

  return jsonResponse(settings, 200);
}

// サイト本体のHTMLに加えて、外部CSSファイルも取得して解析材料にする
// （色指定は <link rel="stylesheet"> の先に書かれていることが多いため）
async function fetchSiteMaterial(targetUrl) {
  const siteRes = await fetch(targetUrl, { headers: FETCH_HEADERS, redirect: 'follow' });
  if (!siteRes.ok) {
    throw new Error(`サイトの取得に失敗しました（HTTP ${siteRes.status}）`);
  }
  const html = await siteRes.text();

  const linkTagRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi;
  const hrefRegex = /href=["']([^"']+)["']/i;
  const linkTags = html.match(linkTagRegex) || [];

  let cssText = '';
  let fetchedCount = 0;
  for (const linkTag of linkTags) {
    if (fetchedCount >= MAX_CSS_FILES) break;
    const hrefMatch = linkTag.match(hrefRegex);
    if (!hrefMatch) continue;

    try {
      const cssUrl = new URL(hrefMatch[1], targetUrl).toString();
      const cssRes = await fetch(cssUrl, { headers: FETCH_HEADERS });
      if (cssRes.ok) {
        const cssContent = await cssRes.text();
        cssText += `\n/* ${cssUrl} */\n` + cssContent.slice(0, MAX_CSS_CHARS_PER_FILE);
        fetchedCount++;
      }
    } catch (e) {
      // 1つのCSS取得に失敗しても全体は止めず、他のファイルで続行する
    }
  }

  return { html, cssText };
}

// HTML・CSSの中から実際に使われているカラーコードを拾い出し、
// 出現頻度順に並べる。AIに「実在する色」の手がかりとして渡すことで、
// サイトと無関係な色を創作してしまうのを防ぐ。
// 頻度の高い側（構造色候補）と低い側（アクセント候補）を別枠で返すことで、
// 出現回数の少ないアクセントカラーが上位N件の足切りで消えてしまうのを防ぐ。
function extractColorCandidates(text) {
  const matches = text.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];
  const freq = new Map();
  matches.forEach((raw) => {
    const color = normalizeHex(raw);
    freq.set(color, (freq.get(color) || 0) + 1);
  });

  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);

  return {
    structural: sorted.slice(0, MAX_STRUCTURAL_CANDIDATES).map(([color]) => color),
    accent: sorted
      .slice(MAX_STRUCTURAL_CANDIDATES, MAX_STRUCTURAL_CANDIDATES + MAX_ACCENT_CANDIDATES)
      .map(([color]) => color),
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

function buildPrompt(targetUrl, htmlExcerpt, cssText, colorCandidates) {
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

  return `あなたは飲食店の公式サイトのデザインを分析し、配色のトンマナを抽出する専門家です。

対象サイト: ${targetUrl}

--- HTML抜粋 ---
${htmlExcerpt}
--- HTML抜粋ここまで ---

--- 関連CSS抜粋 ---
${cssText ? cssText.slice(0, MAX_CSS_CHARS_PER_FILE * MAX_CSS_FILES) : '(取得できませんでした)'}
--- CSS抜粋ここまで ---

${colorHint}

このサイトの配色・雰囲気（高級感がある／カジュアル／和風／ポップ、など）を読み取り、
同じトンマナに合う配色を、来店ポイントを貯めるスタンプカードアプリのUI設定として、
以下の5つの「役割」ごとに1色ずつ提案してください。

- mainColor: ${ROLE_DESCRIPTIONS.mainColor}
- bodyBg: ${ROLE_DESCRIPTIONS.bodyBg}
- cardBg: ${ROLE_DESCRIPTIONS.cardBg}
- textColor: ${ROLE_DESCRIPTIONS.textColor}
- noticeColor: ${ROLE_DESCRIPTIONS.noticeColor}

必ず守ってほしいこと：
- すべて16進数カラーコード（例: #ffffff）で回答する
- bodyBg と cardBg は、重なったときにカードの輪郭が分かる程度に区別できる色にする
- 上で示した「実際に検出されたカラーコード」を優先的に活用し、サイトと無関係な色を創作しない
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

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
