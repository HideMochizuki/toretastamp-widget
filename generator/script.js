document.addEventListener('DOMContentLoaded', () => {
    // --- 1. サイドバーの開閉トグル ---
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // --- 2. カードエリアの開閉トグル（H2クリック） ---
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    cardWrappers.forEach(wrapper => {
        const title = wrapper.querySelector('h2.card-title');
        if (title) {
            title.addEventListener('click', () => {
                wrapper.classList.toggle('collapsed');
            });
        }
    });

    // 前回のデータを復元
    loadFromLocal();
    
    // 入力があるたびに自動保存する（デバウンス処理なしの簡易版）
    document.addEventListener('input', saveToLocal);
    document.addEventListener('change', saveToLocal);
});

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

// --- 別画面のテンプレート ---
const screens = {
    top: "", // 初期化時に現在のHTMLを保存します
    // screens.stamp の中身をこちらに差し替え
    stamp: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/brand/TCNteaCYUPectHdLS0JD.png" alt="レストラントレタ"></a></h1>
    </div>    
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <h3 class="titleh3"><b>スタンプ帳</b></h3>
        <div id="stamp-list">
            <div class="stamp_set">
                <div class="stamp_card">
                    <a href="#" class="clearfix">
                        <h3 class="stamp_list_title">レストラントレタ来店スタンプ</h3>
                        <dl class="ticket_list_bottom">
                            <dt><span class="ticket_list_due">有効期限：なし</span></dt>
                        </dl>
                        <dl class="ticket_list_bottom stamp">
                            <dt class="stampicon"><b><span></span></b> 0獲得</dt>
                        </dl>
                    </a>
                </div>
            </div>
        </div>
        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ戻る</span></a>
        </div>
        <div class="menu-sublist">
            <ul>
                <li><a href="#">スタンプ履歴</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `
};

const menuList = document.getElementById('menu-list');
const previewUl = document.getElementById('preview-ul');

// --- 初期化 ---
if (window.Sortable && menuList) {
    Sortable.create(menuList, {
        animation: 150, handle: '.drag-handle', ghostClass: 'sortable-ghost',
        onEnd: function() { relabelItems(); updatePreview(); }
    });
}

// すべての入力を監視
document.addEventListener('input', updatePreview);
document.addEventListener('change', updatePreview);

// カラー同期設定
const setupSync = (p, t) => {
    const elP = document.getElementById(p);
    const elT = document.getElementById(t);
    if(elP && elT) {
        elP.oninput = () => { elT.value = elP.value.toUpperCase(); updatePreview(); };
        elT.oninput = () => { if(/^#[0-9A-F]{6}$/i.test(elT.value)) { elP.value = elT.value; updatePreview(); } };
    }
};

const syncPairs = [
    // 共通・Aパターン・Bパターン（既存分）
    ['cfg-body-bg', 'cfg-body-bg-val'],
    // ★ヘッダー用を追加
    ['cfg-header-bg', 'cfg-header-bg-val'],
    ['cfg-mock-header-bg', 'cfg-mock-header-bg-val'],
    ['cfg-btn-area-bg', 'cfg-btn-area-bg-val'],
    ['cfg-btn1-bg', 'cfg-btn1-bg-val'], ['cfg-btn2-bg', 'cfg-btn2-bg-val'],
    ['cfg-btn1-border-c', 'cfg-btn1-border-c-val'], ['cfg-btn2-border-c', 'cfg-btn2-border-c-val'],
    ['cfg-btn1-txt', 'cfg-btn1-txt-val'], ['cfg-btn2-txt', 'cfg-btn2-txt-val'],
    ['cfg-b-btn1-bg', 'cfg-b-btn1-bg-val'], ['cfg-b-btn2-bg', 'cfg-b-btn2-bg-val'],
    ['cfg-b-btn1-border-c', 'cfg-b-btn1-border-c-val'], ['cfg-b-btn2-border-c', 'cfg-b-btn2-border-c-val'],
    ['cfg-b-btn1-txt', 'cfg-b-btn1-txt-val'], ['cfg-b-btn2-txt', 'cfg-b-btn2-txt-val'],
    ['cfg-b-btn1-bef-c', 'cfg-b-btn1-bef-c-val'], ['cfg-b-btn2-bef-c', 'cfg-b-btn2-bef-c-val'],
    ['cfg-bg', 'cfg-bg-val'], ['cfg-txt', 'cfg-txt-val'], ['cfg-user-bg', 'cfg-user-bg-val'],

    // ★Cパターン用を追加
    ['cfg-c-btn1-bg', 'cfg-c-btn1-bg-val'], 
    ['cfg-c-btn2-bg', 'cfg-c-btn2-bg-val'],
    ['cfg-c-btn1-border-c', 'cfg-c-btn1-border-c-val'], 
    ['cfg-c-btn2-border-c', 'cfg-c-btn2-border-c-val'],
    ['cfg-c-btn1-bef-c', 'cfg-c-btn1-bef-c-val'], 
    ['cfg-c-btn2-bef-c', 'cfg-c-btn2-bef-c-val'],
    ['cfg-c-btn1-after', 'cfg-c-btn1-after-val'], 
    ['cfg-c-btn2-after', 'cfg-c-btn2-after-val'],
    ['cfg-c-btn1-txt', 'cfg-c-btn1-txt-val'], 
    ['cfg-c-btn2-txt', 'cfg-c-btn2-txt-val'],
    // ★フッター用を追加
    ['cfg-list-bg', 'cfg-list-bg-val'],
    ['cfg-list-txt', 'cfg-list-txt-val'],
    ['cfg-list-border-c', 'cfg-list-border-c-val']
];
syncPairs.forEach(pair => setupSync(pair[0], pair[1]));

function relabelItems() {
    document.querySelectorAll('.menu-item').forEach((item, index) => { 
        const h = item.querySelector('.menu-item-header');
        if(h) h.textContent = `ITEM ${index + 1}`; 
    });
}

// --- プレビュー更新 (整理版) ---
function updatePreview() {
    const mock = document.querySelector('.mock-screen');
    if (!mock) return;

    // 1. もし今スタンプ画面を表示中なら、デザイン適用（色塗り）だけして終了
    if (mock.dataset.currentScreen === 'stamp') {
        applyCurrentDesignToMock();
        return;
    }

    // 2. 画面を新しく作り直す（ここで古いボタンは捨てられます）
    if(!previewUl) return;
    previewUl.innerHTML = '';
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;
    const selected = document.querySelector('input[name="btn-pattern"]:checked').value;

    // 背景・ヘッダーの色設定
    mock.style.backgroundColor = getV('cfg-body-bg-val');
    const area = mock.querySelector('.top_button');
    if(area) area.style.backgroundColor = getV('cfg-btn-area-bg-val');
    const headerTop = mock.querySelector('header.top');
    if (headerTop) {
        headerTop.style.backgroundColor = getV('cfg-header-bg-val');
    }

    const btn1 = mock.querySelector('.top_button ul li:nth-child(1)');
    const btn2 = mock.querySelector('.top_button ul li:nth-child(2)');

    // パターン(A/B/C)ごとの描画ロジック
    if (selected === 'A') {
        apply(btn1, getV('cfg-btn1-bg-val'), getC('cfg-btn1-border-on'), getV('cfg-btn1-border-w'), getV('cfg-btn1-border-c-val'), getV('cfg-btn1-txt-val'), getV('cfg-btn1-filter'));
        apply(btn2, getV('cfg-btn2-bg-val'), getC('cfg-btn2-border-on'), getV('cfg-btn2-border-w'), getV('cfg-btn2-border-c-val'), getV('cfg-btn2-txt-val'), getV('cfg-btn2-filter'));
    } else if (selected === 'B') {
        const bArea = document.getElementById('pattern-settings-B');
        const cols = bArea.querySelectorAll('.setting-column');
        const getBData = (idx) => {
            const c = cols[idx];
            const allTxt = c.querySelectorAll('input[type="text"]');
            return {
                bg: allTxt[0].value, on: c.querySelector('input[type="checkbox"]').checked,
                bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value,
                befW: allTxt[4].value, befC: allTxt[5].value, tx: allTxt[6].value
            };
        };
        const d1 = getBData(0); const d2 = getBData(1);
        apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-btn1-filter'));
        btn1.style.borderRadius = d1.radius;
        apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-btn2-filter'));
        btn2.style.borderRadius = d2.radius;
        updateDynamicStyle(`
            .mock-screen.pattern-B .top_button ul li:nth-child(1):before { border-bottom: ${d1.befW} solid ${d1.befC} !important; border-right: ${d1.befW} solid ${d1.befC} !important; }
            .mock-screen.pattern-B .top_button ul li:nth-child(2):before { border-bottom: ${d2.befW} solid ${d2.befC} !important; border-right: ${d2.befW} solid ${d2.befC} !important; }
        `);
    } else if (selected === 'C') {
        const cArea = document.getElementById('pattern-settings-C');
        const cols = cArea.querySelectorAll('.setting-column');
        const getCData = (idx) => {
            const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
            const chk = c.querySelector('input[type="checkbox"]');
            return {
                bg: allTxt[0].value, on: chk.checked, bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value,
                befW: allTxt[4].value, befC: allTxt[5].value, afterC: allTxt[6].value, tx: allTxt[7].value
            };
        };
        const d1 = getCData(0); const d2 = getCData(1);
        apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-btn1-filter'));
        btn1.style.borderRadius = d1.radius;
        apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-btn2-filter'));
        btn2.style.borderRadius = d2.radius;
        updateDynamicStyle(`
            .mock-screen.pattern-C .top_button ul li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; z-index: 1; }
            .mock-screen.pattern-C .top_button ul li:after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; clip-path: ellipse(70% 90% at 50% 100%); z-index: 0; }
            .mock-screen.pattern-C .top_button ul li:nth-child(1):before { border-bottom: ${d1.befW} solid ${d1.befC} !important; border-right: ${d1.befW} solid ${d1.befC} !important; }
            .mock-screen.pattern-C .top_button ul li:nth-child(2):before { border-bottom: ${d2.befW} solid ${d2.befC} !important; border-right: ${d2.befW} solid ${d2.befC} !important; }
            .mock-screen.pattern-C .top_button ul li:nth-child(1):after { background: ${d1.afterC} !important; }
            .mock-screen.pattern-C .top_button ul li:nth-child(2):after { background: ${d2.afterC} !important; }
        `);
    }

    // フッターメニューの描画
    const fBg = getV('cfg-bg-val');
    const fTx = getV('cfg-txt-val');
    const fFilter = document.getElementById('cfg-icon-choice').value === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    document.getElementById('preview-footer').style.backgroundColor = fBg;

    document.querySelectorAll('.menu-item').forEach(el => {
        const cls = el.querySelector('.field-class').value;
        const lab = el.querySelector('.field-label').value;
        const li = document.createElement('li');
        let icon = (cls === 'official') ? getV('cfg-official-url') : iconImages[cls];
        if(cls === 'user') {
            li.innerHTML = `<div class="prev-user-btn" style="background:${getV('cfg-user-bg-val')}"><div class="prev-icon" style="background-image:url('${icon}'); filter:brightness(0) invert(1);"></div><span style="color:#fff">${lab}</span></div>`;
        } else {
            li.innerHTML = `<div class="prev-icon" style="background-image:url('${icon}'); filter:${fFilter}"></div><span style="color:${getV('cfg-txt-val')}">${lab}</span>`;
        }
        previewUl.appendChild(li);
    });

    // 3. 全ての描画（HTMLの更新）が終わった後に、デザインを適用
    applyCurrentDesignToMock();

    // 4. 一番最後に、ボタンに対してクリック命令を登録する
    // ★これで新しく作られたボタンに対して確実に命令が伝わります
    attachPreviewEvents();
}

// 1. プレビュー内のボタンにクリックイベントを貼る関数
function attachPreviewEvents() {
    setTimeout(() => {
        const mock = document.querySelector('.mock-screen');
        if (!mock) return;

        // ITEM 1（左ボタン）のliとaを取得
        const leftLi = mock.querySelector('.top_button ul li:nth-child(1)');
        const leftBtn = leftLi ? leftLi.querySelector('a') : null;
        
        if (leftLi && leftBtn) {
            console.log("ITEM 1を特定しました。クリックを有効化します。");
            
            // CSSで有効化するためのクラスを付与
            leftLi.classList.add('clickable');
            leftBtn.classList.add('clickable');

            // クリックイベントの設定
            leftLi.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("遷移実行：スタンプページへ");
                changeMockScreen('stamp');
            };
        } else {
            console.error("ITEM 1が見つかりません。");
        }
    }, 150);
}

// 2. 画面を切り替える関数
function changeMockScreen(screenKey) {
    const mock = document.querySelector('.mock-screen');
    if (!mock) return;

    if (screenKey === 'stamp') {
        // 現在のトップ画面を保存
        if (!screens.top) screens.top = mock.innerHTML;

        // 中身をスタンプ帳に書き換え
        mock.innerHTML = screens.stamp;
        mock.dataset.currentScreen = 'stamp'; // 目印

        // スタンプ帳内の「トップへ戻る」ボタンの設定
        const backBtn = mock.querySelector('.back-to-top');
        if (backBtn) {
            // CSSの pointer-events: none を突破するためにクラスを追加
            backBtn.classList.add('clickable');
            
            backBtn.onclick = (e) => {
                e.preventDefault();
                console.log("トップ画面に戻ります");
                
                // 1. トップ画面のHTMLを復元
                mock.innerHTML = screens.top;
                
                // 2. スタンプ画面の目印を消す
                delete mock.dataset.currentScreen;
                
                // 3. プレビューを再描画（これでトップ画面のボタンにイベントが再登録される）
                updatePreview();
            };
        }
    }
    
    // 遷移直後に現在のデザイン設定（背景色やリストの色）を適用
    applyCurrentDesignToMock();
}

// 3. デザイン設定を現在の画面に適用する関数
function applyCurrentDesignToMock() {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const mock = document.querySelector('.mock-screen');
    if (!mock) return;

    // --- 1. 全体背景色 ---
    if (mock.dataset.currentScreen === 'stamp') {
        mock.style.backgroundColor = '#f5f5f5'; 
    } else {
        mock.style.backgroundColor = getV('cfg-body-bg-val');
    }

    // --- 2. ヘッダー色の適用（ここを入れ替え） ---
    // スタンプ画面が表示されている場合
    if (mock.dataset.currentScreen === 'stamp') {
        const mockHeader = mock.querySelector('.mock-header-v2');
        if (mockHeader) {
            // 背景色を強制的に上書きするために setProperty を使用します
            const color = getV('cfg-mock-header-bg-val');
            mockHeader.style.setProperty('background-color', color, 'important');
        }
    } else {
        const topHeader = mock.querySelector('header.top') || mock.querySelector('header:not(.mock-header-v2)');
        if (topHeader) {
            const color = getV('cfg-header-bg-val');
            topHeader.style.setProperty('background-color', color, 'important');
        }
    }

    // リストメニューのデザイン
    const listArea = mock.querySelector('.menu-sublist');
    if (listArea) {
        listArea.style.backgroundColor = getV('cfg-list-bg-val');
        const listLinks = listArea.querySelectorAll('ul li a');
        const listFontSize = getV('cfg-list-size');
        const borderOn = document.getElementById('cfg-list-border-on').checked;
        const borderW = getV('cfg-list-border-w');
        const borderC = getV('cfg-list-border-c-val');

        listLinks.forEach(a => {
            a.style.color = getV('cfg-list-txt-val');
            a.style.fontSize = listFontSize;
            a.style.borderTop = borderOn ? `${borderW} solid ${borderC}` : 'none';
        });
    }
}




function apply(el, bg, on, bw, bc, tx, flt) {
    if(!el) return;
    el.style.backgroundColor = bg;
    el.style.setProperty('border', on ? `${bw} solid ${bc}` : 'none', 'important');
    const info = el.querySelector('.button_info');
    if(info) info.style.setProperty('color', tx, 'important');
    const img = el.querySelector('img');
    if(img) img.style.filter = flt;
}

function updateDynamicStyle(css) {
    let s = document.getElementById('dyn-style');
    if(!s) { s = document.createElement('style'); s.id = 'dyn-style'; document.head.appendChild(s); }
    s.innerHTML = css;
}

function switchPattern() {
    const s = document.querySelector('input[name="btn-pattern"]:checked').value;
    document.querySelectorAll('.pattern-fields').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`pattern-settings-${s}`);
    if(target) target.style.display = 'grid';
    const mock = document.querySelector('.mock-screen');
    if(mock) { mock.classList.remove('pattern-A', 'pattern-B', 'pattern-C'); mock.classList.add(`pattern-${s}`); }
    updatePreview();
}

function handleClassChange(select) {
    const item = select.closest('.menu-item');
    const href = item.querySelector('.field-href');
    const aclass = item.querySelector('.field-aclass');
    const label = item.querySelector('.field-label');
    if(select.value === 'map') {
        href.value = '#'; href.disabled = true;
        aclass.value = 'open-reserve'; aclass.disabled = true;
        label.value = '近くの店舗';
        href.style.background = '#f0f0f0'; aclass.style.background = '#f0f0f0';
    } else {
        if(href.value === '#') href.value = '';
        href.disabled = false; aclass.value = '';
        href.style.background = ''; aclass.style.background = '#f0f0f0';
    }
    updatePreview();
}

// --- 3. 生成ロジック ---
document.getElementById('generate-btn').onclick = () => {
    updatePreview(); // 生成前に最新状態を強制反映
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;
    const selected = document.querySelector('input[name="btn-pattern"]:checked').value;
    
    // --- CSSパーツの組み立て ---
    let patternCSS = "";
    
    // 【Aパターン】のCSS生成
    if(selected === 'A') {
        const b1on = getC('cfg-btn1-border-on');
        const b2on = getC('cfg-btn2-border-on');
        const b1Border = b1on ? `${getV('cfg-btn1-border-w')} solid ${getV('cfg-btn1-border-c-val')}` : 'none';
        const b2Border = b2on ? `${getV('cfg-btn2-border-w')} solid ${getV('cfg-btn2-border-c-val')}` : 'none';
        
        patternCSS = `
/* --- Aパターン専用 --- */
.top_button > ul > li { width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; list-style: none; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; text-decoration: none; }
.button_img { height: 60px; width: 100%; display: flex; align-items: center; justify-content: center; }
.button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }
.top_button > ul > li:nth-child(1) { background-color: ${getV('cfg-btn1-bg-val')} !important; border: ${b1Border} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${getV('cfg-btn2-bg-val')} !important; border: ${b2Border} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${getV('cfg-btn1-txt-val')} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${getV('cfg-btn2-txt-val')} !important; }
.top_button > ul > li:nth-child(1) .button_img img { filter: ${getV('cfg-btn1-filter')} !important; }
.top_button > ul > li:nth-child(2) .button_img img { filter: ${getV('cfg-btn2-filter')} !important; }`;
    } 
    // 【Bパターン】のCSS生成 (角丸 radius 対応)
    else if(selected === 'B') {
        const bArea = document.getElementById('pattern-settings-B');
        const cols = bArea.querySelectorAll('.setting-column');
        
        const getBDataForCode = (idx) => {
            const c = cols[idx]; 
            const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, 
                on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, 
                bc: allTxt[2].value, 
                radius: allTxt[3].value, 
                befW: allTxt[4].value, 
                befC: allTxt[5].value, 
                tx: allTxt[6].value 
            };
        };
        const b1 = getBDataForCode(0); 
        const b2 = getBDataForCode(1);

        patternCSS = `
/* --- Bパターン専用 --- */
.top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; }
.top_button > ul > li > a { display: flex; align-items: center; padding: 15px 10px; text-decoration: none; }
.top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; }
.top_button > ul > li:nth-child(1):before { border-bottom: ${b1.befW} solid ${b1.befC}; border-right: ${b1.befW} solid ${b1.befC}; }
.top_button > ul > li:nth-child(2):before { border-bottom: ${b2.befW} solid ${b2.befC}; border-right: ${b2.befW} solid ${b2.befC}; }
.top_button > ul > li:nth-child(1) { background-color: ${b1.bg} !important; border: ${b1.on ? b1.bw+' solid '+b1.bc : 'none'} !important; border-radius: ${b1.radius} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${b2.bg} !important; border: ${b2.on ? b2.bw+' solid '+b2.bc : 'none'} !important; border-radius: ${b2.radius} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${b1.tx} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${b2.tx} !important; }`;
    }
    // 【Cパターン】のCSS生成
    else if(selected === 'C') {
        const cArea = document.getElementById('pattern-settings-C');
        const cols = cArea.querySelectorAll('.setting-column');
        const getCDataForCode = (idx) => {
            const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, 
                on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, 
                bc: allTxt[2].value, 
                radius: allTxt[3].value, 
                befW: allTxt[4].value, 
                befC: allTxt[5].value, 
                afterC: allTxt[6].value, 
                tx: allTxt[7].value 
            };
        };
        const c1 = getCDataForCode(0); const c2 = getCDataForCode(1);

        patternCSS = `
/* --- Cパターン専用 --- */
.top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 15px 20px 0px; text-decoration: none; font-weight: bold; position: relative; z-index: 2; }
.button_info { width: 100%; text-align: center; padding: 25px 0 5px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
.top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; z-index: 1; }
.top_button > ul > li::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; z-index: 0; clip-path: ellipse(70% 90% at 50% 100%); }
.top_button > ul > li:nth-child(1) { background-color: ${c1.bg} !important; border: ${c1.on ? c1.bw+' solid '+c1.bc : 'none'} !important; border-radius: ${c1.radius} !important; }
.top_button > ul > li:nth-child(1):before { border-bottom: ${c1.befW} solid ${c1.befC}; border-right: ${c1.befW} solid ${c1.befC}; }
.top_button > ul > li:nth-child(1)::after { background: ${c1.afterC} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${c1.tx} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${c2.bg} !important; border: ${c2.on ? c2.bw+' solid '+c2.bc : 'none'} !important; border-radius: ${c2.radius} !important; }
.top_button > ul > li:nth-child(2):before { border-bottom: ${c2.befW} solid ${c2.befC}; border-right: ${c2.befW} solid ${c2.befC}; }
.top_button > ul > li:nth-child(2)::after { background: ${c2.afterC} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${c2.tx} !important; }`;
    }

    // --- メニュー項目のデータ抽出 ---
    const items = [];
    document.querySelectorAll('.menu-item').forEach(el => {
        items.push({
            class: el.querySelector('.field-class').value,
            href: el.querySelector('.field-href').value,
            label: el.querySelector('.field-label').value,
            external: el.querySelector('.field-ext').checked,
            aclass: el.querySelector('.field-aclass').value
        });
    });

    // --- 【1】JavaScript出力の作成 ---
    const jsOutput = `<script>
window.onload = () => {
    const menuItems = ${JSON.stringify(items.map(item => ({
        class: item.class,
        href: item.href,
        aclass: item.aclass,
        icon: "<span class='icon'></span>",
        label: item.label,
        external: item.external
    })), null, 8)};
    const listItems = menuItems.map(item => {
        const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return \`<li class="\${item.class}"><a href="\${item.href}"\${target} class="\${item.aclass}">\${item.icon}<span>\${item.label}</span></a></li>\`;
    }).join('');
    const footerHTML = \`<footer><div id="sp-fixed-menu" class="for-sp"><ul>\${listItems}</ul></div></footer>\`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
};
<\/script>`;

    // --- 【2】CSS出力の作成 ---
    const fFilter = document.getElementById('cfg-icon-choice').value === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    const listBorderOn = document.getElementById('cfg-list-border-on').checked; // ★修正：追加

    const cssOutput = `<style type="text/css">
html, body { background-color: ${getV('cfg-body-bg-val')} !important; }
header.top { background-color: ${getV('cfg-header-bg-val')} !important; }

/* --- スタンプ帳画面用 --- */
body.stamp { background-color: #f5f5f5 !important; }
header { background-color: ${getV('cfg-mock-header-bg-val')} !important; } 

.top_button { background-color: ${getV('cfg-btn-area-bg-val')} !important; }
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; list-style: none; }
${patternCSS}
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${getV('cfg-bg-val')}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${getV('cfg-txt-val')}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }
#sp-fixed-menu .user a { position: relative; top: -21px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 73px; height: 73px; border-radius: 50%; background: ${getV('cfg-user-bg-val')} !important; z-index: 10; border: 3px solid #FFF; padding-bottom: 5px; }
#sp-fixed-menu .user a span { color: #fff !important; font-size: 9px; font-weight: bold; margin: 0 0 -10px 0; }
#sp-fixed-menu .user a .icon { filter: brightness(0) invert(1); }
.menu-sublist { background: ${getV('cfg-list-bg-val')} !important; }
.menu-sublist > ul > li > a { 
    color: ${getV('cfg-list-txt-val')} !important; 
    border-top: ${listBorderOn ? getV('cfg-list-border-w') + ' solid ' + getV('cfg-list-border-c-val') : 'none'} !important;
    font-size: ${getV('cfg-list-size')} !important;
    display: block; text-decoration: none; padding: 15px;
}
</style>`;

    document.getElementById('out-js').value = jsOutput;
    document.getElementById('out-css').value = cssOutput;
    alert("配布用コードを生成しました！");
};




function createItem(isFirst = false) {
    if (!isFirst && menuList.children.length >= 5) return alert("最大5個までです");
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <div class="drag-handle"><i class="fa fa-grip-vertical"></i></div>
        ${isFirst ? '' : '<button class="btn-remove" onclick="this.parentElement.remove();relabelItems();updatePreview();"><i class="fa fa-times"></i></button>'}
        <div class="menu-item-header">ITEM ${menuList.children.length + 1}</div>
        <div class="form-grid">
            <div class="form-group"><label>アイコン</label><select class="field-class" onchange="handleClassChange(this)"><option value="home">home</option><option value="stamp">stamp</option><option value="user">user (マイページ)</option><option value="ticket">ticket</option><option value="history">history</option><option value="ec">ec</option><option value="official">official</option><option value="map">map</option></select></div>
            <div class="form-group"><label>ラベル名</label><input type="text" class="field-label" oninput="updatePreview()" value="${isFirst?'ホーム':''}"></div>
            <div class="form-group full-width"><label>URL</label><input type="text" class="field-href" oninput="updatePreview()" placeholder="https://"></div>
            <div class="form-group"><label>aclass (固定)</label><input type="text" class="field-aclass" disabled style="background:#f0f0f0;"></div>
            <div class="form-group" style="flex-direction:row; align-items:center; gap:8px; margin-top:24px;"><input type="checkbox" class="field-ext" onchange="updatePreview()"> <label style="margin:0;">別タブ</label></div>
        </div>`;
    menuList.appendChild(div);
    relabelItems(); updatePreview();
}

createItem(true);
document.getElementById('add-item').onclick = () => createItem();
window.copyText = (id) => { const el = document.getElementById(id); if(el){ el.select(); document.execCommand('copy'); alert("コピーしました"); } };

// --- 4. データの保存・読み込み (LocalStorage) ---

// 現在のすべての設定値をオブジェクトにまとめる関数
function getAllSettings() {
    const settings = {};
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // IDがある通常の入力欄を保存
        if (input.id) {
            if (input.type === 'checkbox') {
                settings[input.id] = input.checked;
            } else if (input.type !== 'radio') {
                settings[input.id] = input.value;
            }
        }
        
        // ★ラジオボタン（パターン選択）を名前で個別に保存
        if (input.name === 'btn-pattern' && input.checked) {
            settings['btn-pattern'] = input.value;
        }
    });

    // メニュー項目の保存
    const items = [];
    document.querySelectorAll('.menu-item').forEach(el => {
        items.push({
            class: el.querySelector('.field-class').value,
            label: el.querySelector('.field-label').value,
            href: el.querySelector('.field-href').value,
            ext: el.querySelector('.field-ext').checked,
            aclass: el.querySelector('.field-aclass').value
        });
    });
    settings['saved_menu_items'] = items;

    return settings;
}


// 保存ボタン（または自動保存）用の関数
function saveToLocal() {
    const data = getAllSettings();
    localStorage.setItem('generator_backup', JSON.stringify(data));
    console.log("設定を保存しました");
}

// 読み込み用の関数
function loadFromLocal() {
    const dataStr = localStorage.getItem('generator_backup');
    if (!dataStr) return;

    const settings = JSON.parse(dataStr);
    
    // 1. 通常の入力欄とラジオボタンの復元
    Object.keys(settings).forEach(key => {
        // ★ラジオボタンの復元
        if (key === 'btn-pattern') {
            const val = settings[key];
            const radio = document.querySelector(`input[name="btn-pattern"][value="${val}"]`);
            if (radio) radio.checked = true;
            return;
        }

        const el = document.getElementById(key);
        if (!el) return;

        if (el.type === 'checkbox') {
            el.checked = settings[key];
        } else {
            el.value = settings[key];
        }
    });

    // 2. メニュー項目の復元（変更なし）
    if (settings['saved_menu_items'] && menuList) {
        menuList.innerHTML = '';
        settings['saved_menu_items'].forEach((data, idx) => {
            createItem(idx === 0);
            const lastItem = menuList.lastElementChild;
            lastItem.querySelector('.field-class').value = data.class;
            lastItem.querySelector('.field-label').value = data.label;
            lastItem.querySelector('.field-href').value = data.href;
            lastItem.querySelector('.field-ext').checked = data.ext;
            handleClassChange(lastItem.querySelector('.field-class'));
            lastItem.querySelector('.field-href').value = data.href;
        });
    }
    
    // 表示状態の最終同期
    switchPattern(); 
    updatePreview();
}
