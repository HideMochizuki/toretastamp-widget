// --- 設定データ ---
const iconImages = {
    home: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/G7NN1cykJDexyrf7W3sY.png",
    stamp: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/11vmbKPoZKbaDsS6AnC8.png",
    user: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/E3WFqdsnqvH99pgwlK5L.png",
    ticket: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/qwb7BN3RXESAD0krnj5v.png",
    history: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/s1WjgAYhCT5YkwteDBW1.png",
    ec: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/fAZsRqTheewTc01HDN4c.png",
    map: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/l8lm4e55dWmksNmI67cP.png",
    official: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/10SUTh364ZEmm6ZUueCC.png"
};

const menuList = document.getElementById('menu-list');
const previewUl = document.getElementById('preview-ul');

// --- 初期化処理 ---
Sortable.create(menuList, {
    animation: 150, handle: '.drag-handle', ghostClass: 'sortable-ghost',
    onEnd: function() { relabelItems(); updatePreview(); }
});

// カラー同期のセットアップ
setupColorSync('cfg-bg', 'cfg-bg-val');
setupColorSync('cfg-txt', 'cfg-txt-val');
setupColorSync('cfg-user-bg', 'cfg-user-bg-val');
setupColorSync('cfg-h-bg', 'cfg-h-bg-val');
setupColorSync('cfg-body-bg', 'cfg-body-bg-val');
setupColorSync('cfg-btn-area-bg', 'cfg-btn-area-bg-val');
setupColorSync('cfg-btn1-bg', 'cfg-btn1-bg-val');
setupColorSync('cfg-btn2-bg', 'cfg-btn2-bg-val');
setupColorSync('cfg-btn1-border-c', 'cfg-btn1-border-c-val');
setupColorSync('cfg-btn2-border-c', 'cfg-btn2-border-c-val');
setupColorSync('cfg-btn1-txt', 'cfg-btn1-txt-val');
setupColorSync('cfg-btn2-txt', 'cfg-btn2-txt-val');

// Bパターン用の同期設定
setupColorSync('cfg-b-btn1-bg', 'cfg-b-btn1-bg-val');
setupColorSync('cfg-b-btn2-bg', 'cfg-b-btn2-bg-val');
setupColorSync('cfg-b-btn1-txt', 'cfg-b-btn1-txt-val');
setupColorSync('cfg-b-btn2-txt', 'cfg-b-btn2-txt-val');
setupColorSync('cfg-b-btn1-bef-c', 'cfg-b-btn1-bef-c-val');
setupColorSync('cfg-b-btn2-bef-c', 'cfg-b-btn2-bef-c-val');



// 入力イベントの一括登録
const inputIds = [
    'cfg-official-url', 'cfg-btn1-border-w', 'cfg-btn1-border-c', 'cfg-btn1-border-c-val',
    'cfg-btn2-border-w', 'cfg-btn2-border-c', 'cfg-btn2-border-c-val', 'cfg-btn1-filter', 'cfg-btn2-filter'
];
inputIds.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', updatePreview);
});

// --- 関数定義 ---

function relabelItems() {
    document.querySelectorAll('.menu-item').forEach((item, index) => { 
        item.querySelector('.menu-item-header').textContent = `ITEM ${index + 1}`; 
    });
}

function updatePreview() {
    if(!previewUl) return;
    previewUl.innerHTML = '';

    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const selectedPattern = document.querySelector('input[name="btn-pattern"]:checked').value;
    const mock = document.querySelector('.mock-screen'); // 共通で使用するため上で定義

    if (!mock) return;

    // --- 全体・ヘッダー（共通部分）の反映 ---
    const bodyBg = getVal('cfg-body-bg-val');
    const hBg = getVal('cfg-h-bg-val');
    const btnAreaBg = getVal('cfg-btn-area-bg-val');

    mock.style.backgroundColor = bodyBg;
    const header = mock.querySelector('header.top');
    if(header) header.style.backgroundColor = hBg;
    
    const btnArea = mock.querySelector('.top_button');
    if(btnArea) btnArea.style.backgroundColor = btnAreaBg;

    // --- パターン別ボタン反映 ---
    if (selectedPattern === 'B') {
        // --- Bパターンの処理 ---
        const b1Bg = getVal('cfg-b-btn1-bg-val');
        const b1Tx = getVal('cfg-b-btn1-txt-val');
        const b1BefW = getVal('cfg-b-btn1-bef-w');
        const b1BefC = getVal('cfg-b-btn1-bef-c-val');
        const b1On = document.getElementById('cfg-b-btn1-border-on').checked;
        const b1Bw = getVal('cfg-b-btn1-border-w');
        const b1Bc = getVal('cfg-b-btn1-border-c-val');

        const b2Bg = getVal('cfg-b-btn2-bg-val');
        const b2Tx = getVal('cfg-b-btn2-txt-val');
        const b2BefW = getVal('cfg-b-btn2-bef-w');
        const b2BefC = getVal('cfg-b-btn2-bef-c-val');
        const b2On = document.getElementById('cfg-b-btn2-border-on').checked;
        const b2Bw = getVal('cfg-b-btn2-border-w');
        const b2Bc = getVal('cfg-b-btn2-border-c-val');

        // 疑似要素プレビュー用の動的スタイル
        let dynamicStyle = document.getElementById('dynamic-preview-style');
        if (!dynamicStyle) {
            dynamicStyle = document.createElement('style');
            dynamicStyle.id = 'dynamic-preview-style';
            document.head.appendChild(dynamicStyle);
        }
        dynamicStyle.innerHTML = `
            .mock-screen.pattern-B .top_button ul li:nth-child(1):before { border-bottom: ${b1BefW} solid ${b1BefC}; border-right: ${b1BefW} solid ${b1BefC}; }
            .mock-screen.pattern-B .top_button ul li:nth-child(2):before { border-bottom: ${b2BefW} solid ${b2BefC}; border-right: ${b2BefW} solid ${b2BefC}; }
        `;

        const btn1 = mock.querySelector('.top_button ul li:nth-child(1)');
        if(btn1) {
            btn1.style.backgroundColor = b1Bg;
            btn1.style.border = b1On ? `${b1Bw} solid ${b1Bc}` : 'none';
            const info1 = btn1.querySelector('.button_info');
            if(info1) info1.style.color = b1Tx;
        }
        const btn2 = mock.querySelector('.top_button ul li:nth-child(2)');
        if(btn2) {
            btn2.style.backgroundColor = b2Bg;
            btn2.style.border = b2On ? `${b2Bw} solid ${b2Bc}` : 'none';
            const info2 = btn2.querySelector('.button_info');
            if(info2) info2.style.color = b2Tx;
        }

    } else if (selectedPattern === 'A') {
        // --- Aパターンの処理 ---
        const b1Bg = getVal('cfg-btn1-bg-val');
        const b1On = document.getElementById('cfg-btn1-border-on').checked;
        const b1Bw = getVal('cfg-btn1-border-w');
        const b1Bc = getVal('cfg-btn1-border-c-val');
        const b1Ft = getVal('cfg-btn1-filter');
        const b1Tx = getVal('cfg-btn1-txt-val');

        const b2Bg = getVal('cfg-btn2-bg-val');
        const b2On = document.getElementById('cfg-btn2-border-on').checked;
        const b2Bw = getVal('cfg-btn2-border-w');
        const b2Bc = getVal('cfg-btn2-border-c-val');
        const b2Ft = getVal('cfg-btn2-filter');
        const b2Tx = getVal('cfg-btn2-txt-val');

        const btn1 = mock.querySelector('.top_button ul li:nth-child(1)');
        if (btn1) {
            btn1.style.backgroundColor = b1Bg;
            btn1.style.border = b1On ? `${b1Bw} solid ${b1Bc}` : 'none';
            const info1 = btn1.querySelector('.button_info');
            if (info1) info1.style.color = b1Tx;
            const img1 = btn1.querySelector('img');
            if (img1) img1.style.filter = b1Ft;
        }

        const btn2 = mock.querySelector('.top_button ul li:nth-child(2)');
        if (btn2) {
            btn2.style.backgroundColor = b2Bg;
            btn2.style.border = b2On ? `${b2Bw} solid ${b2Bc}` : 'none';
            const info2 = btn2.querySelector('.button_info');
            if (info2) info2.style.color = b2Tx;
            const img2 = btn2.querySelector('img');
            if (img2) img2.style.filter = b2Ft;
        }
    }

    // --- プレビュー反映（フッターメニュー） ---
    const bgColor = getVal('cfg-bg-val');
    const txtColor = getVal('cfg-txt-val');
    const userBg = getVal('cfg-user-bg-val');
    const officialUrl = getVal('cfg-official-url');
    
    const filterChoice = document.getElementById('cfg-icon-choice').value;
    const iconFilter = filterChoice === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';

    document.getElementById('preview-footer').style.backgroundColor = bgColor;

    document.querySelectorAll('.menu-item').forEach(el => {
        const cls = el.querySelector('.field-class').value;
        const label = el.querySelector('.field-label').value;
        const li = document.createElement('li');
        
        let iconUrl = iconImages[cls];
        if(cls === 'official') iconUrl = officialUrl;

        if(cls === 'user') {
            li.innerHTML = `
                <div class="prev-user-btn" style="background:${userBg}">
                    <div class="prev-icon" style="background-image:url('${iconUrl}'); filter: brightness(0) invert(1);"></div>
                    <span style="color:#fff">${label}</span>
                </div>`;
        } else {
            li.innerHTML = `
                <div class="prev-icon" style="background-image:url('${iconUrl}'); filter: ${iconFilter};"></div>
                <span style="color:${txtColor}">${label}</span>`;
        }
        previewUl.appendChild(li);
    });
}

window.handleClassChange = function(select) {
    const item = select.closest('.menu-item');
    const href = item.querySelector('.field-href');
    const aclass = item.querySelector('.field-aclass');
    const label = item.querySelector('.field-label');

    if(select.value === 'map') {
        href.value = '#'; href.disabled = true;
        aclass.value = 'open-reserve'; aclass.disabled = true;
        label.value = '近くの店舗';
    } else {
        if(href.value === '#') href.value = '';
        href.disabled = false;
        aclass.value = ''; aclass.disabled = true;
    }
    updatePreview();
};

function setupColorSync(pId, tId) {
    const p = document.getElementById(pId);
    const t = document.getElementById(tId);
    if(!p || !t) return;
    p.oninput = () => { t.value = p.value.toUpperCase(); updatePreview(); };
    t.oninput = () => { if(/^#[0-9A-F]{6}$/i.test(t.value)) { p.value = t.value; updatePreview(); } };
}

// パターン切り替え関数
function switchPattern() {
    const selected = document.querySelector('input[name="btn-pattern"]:checked').value;
    
    // 1. 全てのパターン設定エリアを一旦非表示にする
    document.querySelectorAll('.pattern-fields').forEach(el => {
        el.style.display = 'none';
        // ここが重要：以前の設定で付与された可能性のあるレイアウトクラスを一旦整理
        el.style.display = 'none'; 
    });

    // 2. 選択されたパターンのIDを取得
    const targetForm = document.getElementById(`pattern-settings-${selected}`);
    
    if (targetForm) {
        // 【修正ポイント】 display = 'block' ではなく、CSSで定義した 'grid' や 'flex' を指定する
        // Aパターンの場合は、CSSで定義した .pattern-fields の display (grid) を適用
        targetForm.style.display = 'grid'; 
    }

    // 3. UIプレビュー側のクラス切り替え
    const mock = document.querySelector('.mock-screen');
    if (mock) {
        mock.classList.remove('pattern-A', 'pattern-B', 'pattern-C');
        mock.classList.add(`pattern-${selected}`);
    }
    
    updatePreview();
}


// --- 生成ロジック ---
document.getElementById('generate-btn').onclick = () => {
    // 1. 各項目の値を最新の状態で取得
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    
    // 現在選択されているパターンを取得 (A or B or C)
    const selectedPattern = document.querySelector('input[name="btn-pattern"]:checked').value;

    // メニュー項目の取得 (JS用)
    const items = [];
    document.querySelectorAll('.menu-item').forEach(el => {
        const fieldExt = el.querySelector('.field-ext');
        items.push({ 
            class: el.querySelector('.field-class').value, 
            href: el.querySelector('.field-href').value, 
            aclass: el.querySelector('.field-aclass').value, 
            icon: "<span class='icon'></span>", 
            label: el.querySelector('.field-label').value, 
            external: fieldExt ? fieldExt.checked : false 
        });
    });

    // 共通変数の取得
    const fBg = getVal('cfg-bg-val');
    const fTx = getVal('cfg-txt-val');
    const fUBg = getVal('cfg-user-bg-val');
    const offUrl = getVal('cfg-official-url');
    const filterChoice = document.getElementById('cfg-icon-choice').value;
    const fFilter = filterChoice === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';

    const bBg = getVal('cfg-body-bg-val');
    const hBg = getVal('cfg-h-bg-val');
    const btAreaBg = getVal('cfg-btn-area-bg-val');
    
    const b1Bg = getVal('cfg-btn1-bg-val');
    const b1Bw = getVal('cfg-btn1-border-w');
    const b1Bc = getVal('cfg-btn1-border-c-val');
    const b1Ft = getVal('cfg-btn1-filter');
    const b1On = document.getElementById('cfg-btn1-border-on').checked;
    const b1Tx = getVal('cfg-btn1-txt-val');

    const b2Bg = getVal('cfg-btn2-bg-val');
    const b2Bw = getVal('cfg-btn2-border-w');
    const b2Bc = getVal('cfg-btn2-border-c-val');
    const b2Ft = getVal('cfg-btn2-filter');
    const b2On = document.getElementById('cfg-btn2-border-on').checked;
    const b2Tx = getVal('cfg-btn2-txt-val');

    const b1Border = b1On ? `${b1Bw} solid ${b1Bc}` : 'none';
    const b2Border = b2On ? `${b2Bw} solid ${b2Bc}` : 'none';

    // 2. パターン別のCSSを組み立てる
    let patternCSS = "";
    
    if (selectedPattern === 'A') {
        patternCSS = `
/* --- Aパターン専用 --- */
header.top { background-color: ${hBg} !important; }
.top_button { background-color: ${btAreaBg} !important; }
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; }
.top_button > ul > li { list-style: none; width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; }
.button_img { height: 60px; width: 100%; display: flex; align-items: center; justify-content: center; }
.button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }
.top_button > ul > li:nth-child(1) { background-color: ${b1Bg} !important; border: ${b1Border} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${b2Bg} !important; border: ${b2Border} !important; }
.top_button > ul > li:nth-child(1) .button_img img { filter: ${b1Ft} !important; }
.top_button > ul > li:nth-child(2) .button_img img { filter: ${b2Ft} !important; }
/* 個別色設定 */
.top_button > ul > li:nth-child(1) .button_info { color: ${b1Tx} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${b2Tx} !important; }`;
    } 
    else if (selectedPattern === 'B') {
        patternCSS = `
/* --- Bパターン専用 --- */
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; }
.top_button > ul > li { position: relative; list-style: none; width: calc(48% - 5px); border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
.top_button > ul > li > a { display: flex; flex-direction: initial; align-items: center; padding: 15px 10px; text-decoration: none; }

/* 装飾線 (:before) */
.top_button > ul > li :before { content: ''; display: inline-block; position: absolute; right: 10px; top: 46%; width: 7px; height: 7px; border-bottom: 1px solid #333; border-right: 1px solid #333; transform: rotateZ(-45deg);}
.top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; }
.top_button > ul > li:nth-child(1):before { border-bottom: ${b1BefW} solid ${b1BefC}; border-right: ${b1BefW} solid ${b1BefC}; }
.top_button > ul > li:nth-child(2):before { border-bottom: ${b2BefW} solid ${b2BefC}; border-right: ${b2BefW} solid ${b2BefC}; }

.button_img { height: 40px; width: 40px; display: flex; align-items: center; justify-content: center; }
.button_info { font-size: 13px; font-weight: 700; padding-left: 10px; }
.top_button > ul > li:nth-child(1) .button_info { color: ${b1Tx} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${b2Tx} !important; }
`;
    }
     
    else if (selectedPattern === 'C') {
        patternCSS = `
/* --- Cパターン専用 --- */
.top_button { padding: 0; margin: 20px 0 0 0; }
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 25px; margin: 0; }
.top_button > ul > li { list-style: none; width: calc(48% - 5px); position: relative; overflow: hidden; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 15px 20px 0px; position: relative; z-index: 2; text-decoration: none; }
.button_img { height: 25px; width: 100%; display: flex; align-items: center; justify-content: center; }
.button_info { width: 100%; background: transparent; text-align: center; padding: 25px 0 5px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
.top_button > ul > li::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; background: #fff; clip-path: ellipse(70% 90% at 50% 100%); z-index: 0; }`;
    }

    // 3. 全体CSSの組み立てと出力
    document.getElementById('out-css').value = `<style type="text/css">
/* --- 共通デザイン --- */
html, body { background-color: ${bBg} !important; }
header.top { background-color: ${hBg} !important; }
.top_button { background-color: ${btAreaBg} !important; }
.top_button > ul > li:nth-child(1) { background-color: ${b1Bg} !important; border: ${b1Border} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${b2Bg} !important; border: ${b2Border} !important; }
.top_button > ul > li:nth-child(1) .button_img img { filter: ${b1Ft} !important; }
.top_button > ul > li:nth-child(2) .button_img img { filter: ${b2Ft} !important; }
${patternCSS}

/* --- フッター固定メニュー --- */
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${fBg}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu ul li { flex: 1; text-align: center; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${fTx}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }
li.home .icon { background-image: url("${iconImages.home}"); }
li.stamp .icon { background-image: url("${iconImages.stamp}"); }
li.ticket .icon { background-image: url("${iconImages.ticket}"); }
li.user .icon { background-image: url("${iconImages.user}"); }
li.history .icon { background-image: url("${iconImages.history}"); }
li.ec .icon { background-image: url("${iconImages.ec}"); }
li.map .icon { background-image: url("${iconImages.map}"); }
li.official .icon { background-image: url("${offUrl}"); }
#sp-fixed-menu .user a { position: relative; top: -21px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 73px; height: 73px; border-radius: 50%; background: ${fUBg}; box-shadow: 0 3px 6px rgba(0,0,0,0.25); z-index: 10; border: 3px solid #FFF; padding-bottom: 5px; }
#sp-fixed-menu .user a span { color: #fff !important; font-size: 9px; font-weight: bold; margin: 0 0 -10px 0; }
#sp-fixed-menu li.official .icon { width: 35px; height: 35px; margin-bottom: -2px; }
<\/style>`;

    // 4. JSの出力 (JSはパターンに関わらず共通)
    document.getElementById('out-js').value = `<script>
window.onload = () => {
    const menuItems = ${JSON.stringify(items, null, 8)};
    const listItems = menuItems.map(item => {
        const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return \`<li class="\${item.class}"><a href="\${item.href}"\${target} class="\${item.aclass}">\${item.icon}<span>\${item.label}</span></a></li>\`;
    }).join('');
    const footerHTML = \`<footer><div id="sp-fixed-menu" class="for-sp"><ul>\${listItems}</ul></div></footer>\`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
};
<\/script>`;

    alert("配布用コードを生成しました！");
};



// --- 初期化処理 ---
// この部分がドラッグ＆ドロップの核心です
const sortable = Sortable.create(menuList, {
    animation: 150,
    handle: '.drag-handle', // ドラッグのつまみ部分を指定
    ghostClass: 'sortable-ghost',
    onEnd: function() {
        relabelItems();   // 番号を振り直す
        updatePreview();  // プレビューの順番を更新
    }
});

// ITEM 1, ITEM 2... の番号を上から順に振り直す関数
function relabelItems() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
        const header = item.querySelector('.menu-item-header');
        if (header) {
            header.textContent = `ITEM ${index + 1}`;
        }
    });
}

// 項目追加関数
function createItem(isFirst = false) {
    if (!isFirst && menuList.children.length >= 5) return alert("最大5個までです");
    
    const div = document.createElement('div');
    div.className = 'menu-item';
    
    // innerHTMLの中に .drag-handle が含まれていることを確認
    div.innerHTML = `
        <div class="drag-handle"><i class="fa fa-grip-vertical"></i></div>
        ${isFirst ? '' : '<button class="btn-remove" onclick="this.parentElement.remove();relabelItems();updatePreview();"><i class="fa fa-times"></i></button>'}
        <div class="menu-item-header">ITEM ${menuList.children.length + 1}</div>
        <div class="form-grid">
            <div class="form-group">
                <label>アイコン</label>
                <select class="field-class" onchange="handleClassChange(this)">
                    <option value="home">home</option><option value="stamp">stamp</option>
                    <option value="user">user (マイページ)</option><option value="ticket">ticket</option>
                    <option value="history">history</option><option value="ec">ec</option>
                    <option value="official">official</option><option value="map">map</option>
                </select>
            </div>
            <div class="form-group"><label>ラベル名</label><input type="text" class="field-label" oninput="updatePreview()" value="${isFirst?'ホーム':''}"></div>
            <div class="form-group full-width"><label>URL</label><input type="text" class="field-href" oninput="updatePreview()" placeholder="https://"></div>
            <div class="form-group"><label>aclass (固定)</label><input type="text" class="field-aclass" disabled></div>
            <div class="form-group" style="flex-direction:row; align-items:center; gap:8px; margin-top:20px;">
                <input type="checkbox" class="field-ext" onchange="updatePreview()"> <label style="margin:0;">別タブ</label>
            </div>
        </div>`;
    
    menuList.appendChild(div);
    relabelItems(); // 追加時に念のため番号更新
    updatePreview();
}

const addItemBtn = document.getElementById('add-item');
if (addItemBtn) {
    addItemBtn.onclick = () => createItem();
}

createItem(true);
window.copyText = (id) => {
    const el = document.getElementById(id);
    el.select();
    document.execCommand('copy');
    alert("コピーしました");
};