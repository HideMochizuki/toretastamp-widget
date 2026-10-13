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

// index.html（UIデザイン設定）の cfg-* 項目のうち、
// サイトのトンマナ（配色・雰囲気）に直結する主要項目だけを対象にする。
// ここに無い項目は画面側のデフォルト値のまま変更されない。
const COLOR_FIELDS = [
  'cfg-body-bg',
  'cfg-header-bg',
  'cfg-header-text-c',
  'cfg-h3-color',
  'cfg-mock-header-bg',
  'cfg-btn-area-bg',
  'cfg-btn1-bg',
  'cfg-btn1-txt',
  'cfg-btn2-bg',
  'cfg-btn2-txt',
  'cfg-list-bg',
  'cfg-list-txt',
  'cfg-ticket-bg',
  'cfg-ticket-title-c',
  'cfg-user-bg',
  'cfg-user-card-bg',
  'cfg-std-bg-c',
  'cfg-notice-color',
];

// 背景色とセットで読みやすさ（コントラスト）を保証すべき組み合わせ
const CONTRAST_PAIRS = [
  ['cfg-header-bg', 'cfg-header-text-c'],
  ['cfg-btn1-bg', 'cfg-btn1-txt'],
  ['cfg-btn2-bg', 'cfg-btn2-txt'],
  ['cfg-list-bg', 'cfg-list-txt'],
  ['cfg-ticket-bg', 'cfg-ticket-title-c'],
  ['cfg-body-bg', 'cfg-h3-color'],
  ['cfg-body-bg', 'cfg-notice-color'],
];

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

  let geminiJson;
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
    geminiJson = JSON.parse(text);
  } catch (e) {
    return jsonResponse({ error: 'Gemini呼び出し中に予期しないエラーが発生しました: ' + e.message }, 500);
  }

  // 背景色と文字色のコントラストが低い場合は、読みやすい色に自動補正する
  enforceContrast(geminiJson);

  // index.html のインポート機能が要求する必須キーを補完
  // （画面の実装上、このキーが無いと「無効なファイル形式」と判定される）
  geminiJson['saved_menu_items'] = [];

  // 各色は <input type="color"> 本体と、同期表示用の `-val` テキスト欄の
  // 両方に同じ値を入れないと、再読み込み後に表示がずれるため複製する
  COLOR_FIELDS.forEach((field) => {
    if (geminiJson[field]) {
      geminiJson[field + '-val'] = geminiJson[field];
    }
  });

  return jsonResponse(geminiJson, 200);
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

function buildResponseSchema() {
  const properties = {};
  COLOR_FIELDS.forEach((field) => {
    properties[field] = {
      type: 'string',
      description: '16進カラーコード。例: #ffffff',
    };
  });
  return {
    type: 'object',
    properties,
    required: COLOR_FIELDS,
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
    colorHint += 'これらは実際にサイトで使われている色です。トンマナに合う配色を作る際は、この中から主要なブランドカラーを優先的に選んで使ってください。白・黒・グレーに近い色は背景/文字の土台として使い、それ以外の有彩色をアクセント（ボタンや見出し）に使うと自然になります。';
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
同じトンマナに合う配色を、来店ポイントを貯めるスタンプカードアプリのUI設定として提案してください。

必ず守ってほしいこと：
- すべて16進数カラーコード（例: #ffffff）で回答する
- 背景色とその上に乗る文字色は、コントラスト比 4.5:1 以上を目安にし、必ず読みやすい組み合わせにする
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
  const bgLum = relativeLuminance(hexToRgb(bgHex));
  // 背景が明るければ黒文字、暗ければ白文字を選ぶ
  return bgLum > 0.5 ? '#000000' : '#ffffff';
}

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
