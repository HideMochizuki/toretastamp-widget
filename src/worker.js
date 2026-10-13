// トレタスタンプ ウィジェットジェネレーター用 Worker
// 静的ファイル配信はそのまま ASSETS に委譲し、
// /api/analyze-site だけ Gemini を使ったサーバーサイド処理を行う。
// Gemini の API キーはこのファイルには書かず、Cloudflare の
// 「変数とシークレット」(環境変数 GEMINI_API_KEY) に設定して使う。

const GEMINI_MODEL = 'gemini-flash-latest';

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

  let siteExcerpt;
  try {
    const siteRes = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ToretaStampTonmanaBot/1.0)' },
      redirect: 'follow',
    });
    if (!siteRes.ok) {
      return jsonResponse({ error: `サイトの取得に失敗しました（HTTP ${siteRes.status}）` }, 400);
    }
    const html = await siteRes.text();
    // 長すぎるとAPIコストが跳ねるため冒頭のみ使用（head部のCSS変数やmeta、bodyの先頭を含む）
    siteExcerpt = html.slice(0, 20000);
  } catch (e) {
    return jsonResponse({ error: 'サイトの取得中にエラーが発生しました: ' + e.message }, 400);
  }

  const schema = buildResponseSchema();
  const prompt = buildPrompt(targetUrl, siteExcerpt);

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

function buildPrompt(targetUrl, siteExcerpt) {
  return `あなたは飲食店の公式サイトのデザインを分析し、配色のトンマナを抽出する専門家です。

以下は飲食店の公式サイト（${targetUrl}）のHTMLソースの抜粋です。

---
${siteExcerpt}
---

このHTMLから読み取れる配色・雰囲気（高級感がある／カジュアル／和風／ポップ、など）を推測し、
同じトンマナに合う配色を、来店ポイントを貯めるスタンプカードアプリのUI設定として提案してください。

必ず守ってほしいこと：
- すべて16進数カラーコード（例: #ffffff）で回答する
- 背景色とその上の文字色は、コントラストが十分で読みやすい組み合わせにする
- サイトからブランドカラーが明確に読み取れる場合は積極的に反映する
- 読み取れない場合は、業態の一般的な印象から妥当な配色を提案する`;
}

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
