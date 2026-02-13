document.addEventListener('DOMContentLoaded', () => {
    // --- 1. サイドバーの開閉トグル (既存) ---
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // --- 2. カードエリアの初期化とトグル設定 ---
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    cardWrappers.forEach(wrapper => {
        // ★ 最初から閉じた状態にするためにクラスを追加
        wrapper.classList.add('collapsed');

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

// --- 別画面のテンプレート（スタンプ帳一覧） ---
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
    `,
    // ★ チケット一覧用のテンプレートを追加
    ticket: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/brand/TCNteaCYUPectHdLS0JD.png" alt="レストラントレタ"></a></h1>
    </div>    
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <h3 class="titleh3"><b>チケット一覧</b>
            <select class="ticket_sort_select" style="font-size:10px; padding:2px;">
                <option>有効期限順 ▼</option>
            </select>
        </h3>
        <div id="coupon-list">
            <div class="ticket_list_set">
                <div class="ticket_list">
                    <a href="#">
                        <p><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/j25fdwy2uJ1ykNwKelCg.png" alt=""></p>
                        <dl><dt>【抽選】お好きなピザ</dt></dl>
                    </a>
                    <dl class="ticket_list_bottom">
                        <dt><span class="ticket_list_due">有効期限：2026/02/24</span></dt>
                    </dl>
                </div>
            </div>
            <div class="ticket_list_set expired" style="opacity: 0.6;">
                <div class="ticket_list">
                    <a>
                        <p style="position:relative;">
                            <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/R46Imnfxu48cfWkeQXhv.png" alt="">
                            <span style="position:absolute; top:40%; left:20%; background:rgba(0,0,0,0.7); color:#fff; padding:2px 5px; font-size:10px;">期限切れ</span>
                        </p>
                        <dl><dt>選べるフードチケット（ドリンク1杯無料！）</dt></dl>
                    </a>
                    <dl class="ticket_list_bottom">
                        <dt><span class="ticket_list_due">有効期限：2026/01/31</span></dt>
                        <dd><a href="#" class="stamp_card_delete_btn" style="color:red; font-size:10px; margin-left:10px;">削除</a></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ</span></a>
        </div>
        <div class="stamp_button">
            <a class="page_button to-stamp clickable" href="#"><span>スタンプ帳へ</span></a>
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
    ['cfg-btn1-icon-c', 'cfg-btn1-icon-c-val'],
    ['cfg-btn2-icon-c', 'cfg-btn2-icon-c-val'],
    ['cfg-b-btn1-icon-c', 'cfg-b-btn1-icon-c-val'],
    ['cfg-b-btn2-icon-c', 'cfg-b-btn2-icon-c-val'],
    ['cfg-c-btn1-icon-c', 'cfg-c-btn1-icon-c-val'],
    ['cfg-c-btn2-icon-c', 'cfg-c-btn2-icon-c-val'],
    // ★ヘッダー用
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
    // ★Cパターン用
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
    // ★フッター用
    ['cfg-list-bg', 'cfg-list-bg-val'],
    ['cfg-list-txt', 'cfg-list-txt-val'],
    ['cfg-list-border-c', 'cfg-list-border-c-val'],
    // ★スタンプ帳
    ['cfg-st-card-bg', 'cfg-st-card-bg-val'],
    ['cfg-st-border-c', 'cfg-st-border-c-val'],
    ['cfg-st-txt-c', 'cfg-st-txt-c-val'],
    ['cfg-st-due-txt-c', 'cfg-st-due-txt-c-val'],
    ['cfg-st-label-bg', 'cfg-st-label-bg-val'],
    ['cfg-st-icon-border', 'cfg-st-icon-border-val'],
    // ★追加：共通ボタン用
    ['cfg-pgbtn-bg', 'cfg-pgbtn-bg-val'],
    ['cfg-pgbtn-txt', 'cfg-pgbtn-txt-val'],
    ['cfg-pgbtn-border-c', 'cfg-pgbtn-border-c-val']

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
    // ★重要：ここで phoneContainer を定義しないと、後の処理ですべてエラーになります
    const phoneContainer = document.querySelector('.phone-mock');

    // どちらかが無ければ処理を中止（エラー防止）
    if (!mock || !phoneContainer) return;

    // 1. デザインの即時適用（ヘッダー背景色などの塗り直し）
    applyCurrentDesignToMock();

    // 2. 状態の判定
    const isSubScreen = mock.dataset.currentScreen === 'stamp' || mock.dataset.currentScreen === 'ticket';
    
    // フッターの入れ物があるか確認
    const previewUl = document.getElementById('preview-ul');
    if(!previewUl) return;
    
    // フッターの中身をリセット
    previewUl.innerHTML = '';
    
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

    // --- 3. トップ画面専用の描画ロジック ---
    if (!isSubScreen) {
        // --- 変数と要素の取得 ---
        const headerPattern = document.querySelector('input[name="header-pattern"]:checked').value;
        const bSettings = document.getElementById('header-b-settings');
        const headerTop = mock.querySelector('header.top');
        const headerH1 = headerTop?.querySelector('h1.top');
        const headerSpan = headerH1?.querySelector('span');
        let sliderWrap = mock.querySelector('.header-slider-wrap');

        // --- ヘッダーパターンの切り替え ---
        if (headerPattern === 'B') {
            if(bSettings) bSettings.style.display = 'block';
            if(headerSpan) headerSpan.style.display = 'none';

            if(headerTop) {
                headerTop.style.setProperty('display', 'flex', 'important');
                headerTop.style.setProperty('justify-content', 'flex-start', 'important');
                headerTop.style.setProperty('padding-left', '15px', 'important');
                headerTop.style.setProperty('background-color', 'transparent', 'important');
                headerTop.style.height = '50px';
            }
            if(headerH1) {
                headerH1.style.setProperty('margin', '20px 0 0 0', 'important');
                headerH1.style.setProperty('width', '50px', 'important');
            }
            
            if (!sliderWrap && headerTop) {
                const wrap = document.createElement('div');
                wrap.className = 'header-slider-wrap';
                wrap.style.height = '250px';
                wrap.innerHTML = `<div class="header-slider"><div class="header-slide"></div></div>`;
                headerTop.after(wrap);
                sliderWrap = wrap;
            }
            const slide = sliderWrap?.querySelector('.header-slide');
            if(slide) slide.style.backgroundImage = `url('${getV('cfg-header-main-img')}')`;

        } else {
            if(bSettings) bSettings.style.display = 'none';

            if(headerTop) {
                headerTop.style.display = '';
                headerTop.style.justifyContent = '';
                headerTop.style.paddingLeft = '';
                headerTop.style.height = '';
                headerTop.style.setProperty('background-color', getV('cfg-header-bg-val'), 'important');
            }
            if(headerH1) {
                headerH1.style.margin = '';
                headerH1.style.width = '';
            }
            if(headerSpan) {
                headerSpan.style.display = '';
                headerSpan.style.color = '';
            }
            if (sliderWrap) sliderWrap.remove();
        }

        // --- ボタンエリア等の共通デザイン適用 ---
        const selected = document.querySelector('input[name="btn-pattern"]:checked').value;
        const btn1 = mock.querySelector('.top_button ul li:nth-child(1)');
        const btn2 = mock.querySelector('.top_button ul li:nth-child(2)');

        // 1. 全体背景色の適用（チェックがあれば transparent）
        const isBodyBgNone = document.getElementById('cfg-body-bg-none').checked;
        mock.style.backgroundColor = isBodyBgNone ? 'transparent' : getV('cfg-body-bg-val');
        
        // 2. ボタンエリアの背景色（チェックがあれば transparent）
        const area = mock.querySelector('.top_button');
        if(area) {
            const isBtnAreaNone = document.getElementById('cfg-btn-area-bg-none').checked;
            area.style.backgroundColor = isBtnAreaNone ? 'transparent' : getV('cfg-btn-area-bg-val');
        }

        if (selected === 'A') {
            apply(btn1, getV('cfg-btn1-bg-val'), getC('cfg-btn1-border-on'), getV('cfg-btn1-border-w'), getV('cfg-btn1-border-c-val'), getV('cfg-btn1-txt-val'), getV('cfg-btn1-icon-c-val'));
            apply(btn2, getV('cfg-btn2-bg-val'), getC('cfg-btn2-border-on'), getV('cfg-btn2-border-w'), getV('cfg-btn2-border-c-val'), getV('cfg-btn2-txt-val'), getV('cfg-btn2-icon-c-val'));
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
            
            // ★最後の引数を、B用のアイコン色IDに変更
            apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-b-btn1-icon-c-val'));
            btn1.style.borderRadius = d1.radius;
            
            apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-b-btn2-icon-c-val'));
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
            
            // ★最後の引数を、C用のアイコン色IDに変更
            apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-c-btn1-icon-c-val'));
            btn1.style.borderRadius = d1.radius;
            
            apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-c-btn2-icon-c-val'));
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
    }

    // .page_button のプレビュー反映
    const pgBtns = mock.querySelectorAll('.page_button');
    if (pgBtns.length > 0) {
        const pgBg = getV('cfg-pgbtn-bg-val');
        const pgTxt = getV('cfg-pgbtn-txt-val');
        const pgRadius = getV('cfg-pgbtn-radius');
        const pgBorderOn = document.getElementById('cfg-pgbtn-border-on').checked;
        const pgBorderW = getV('cfg-pgbtn-border-w');
        const pgBorderC = getV('cfg-pgbtn-border-c-val');

        pgBtns.forEach(btn => {
            btn.style.setProperty('background-color', pgBg, 'important');
            btn.style.setProperty('border-radius', pgRadius, 'important');
            
            if (pgBorderOn) {
                btn.style.setProperty('border', `${pgBorderW} solid ${pgBorderC}`, 'important');
            } else {
                btn.style.setProperty('border', 'none', 'important'); // または元が2px solidならそれを消す
            }

            // 中のspan（文字色）
            const span = btn.querySelector('span');
            if (span) {
                span.style.setProperty('color', pgTxt, 'important');
            }
        });
    }


    // --- 4. フッターメニューの描画 ---
    const fBg = getV('cfg-bg-val');
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

        if (cls === 'stamp') {
            li.classList.add('clickable');
            li.style.cursor = 'pointer';
            li.onclick = (e) => { e.preventDefault(); changeMockScreen('stamp'); };
        } else if (cls === 'ticket') {
            li.classList.add('clickable');
            li.style.cursor = 'pointer';
            li.onclick = (e) => { e.preventDefault(); changeMockScreen('ticket'); };
        } else if (cls === 'home') {
            li.onclick = (e) => { 
                e.preventDefault(); 
                const mock = document.querySelector('.mock-screen');
                if (mock && screens.top) {
                    mock.innerHTML = screens.top;
                    delete mock.dataset.currentScreen;
                    updatePreview();
                }
            };
        }

        previewUl.appendChild(li);
    });

    // --- 5. ハンバーガーメニュー(パターンB)の制御 ---
    const listPatternEl = document.querySelector('input[name="list-pattern"]:checked');
    const listPattern = listPatternEl ? listPatternEl.value : 'A';
    const menuSublist = mock.querySelector('.menu-sublist');

    // ★重要：既存パーツを全削除（重複防止）
    const allBtns = phoneContainer.querySelectorAll('.hamburger-btn');
    const allOverlays = phoneContainer.querySelectorAll('.menu-overlay');
    allBtns.forEach(el => el.remove());
    allOverlays.forEach(el => el.remove());

    // クラスのリセット
    if (menuSublist) {
        menuSublist.classList.remove('pattern-B', 'open');
        menuSublist.style.removeProperty('display'); 
    }

    if (listPattern === 'B' && menuSublist) {
        menuSublist.classList.add('pattern-B');

        // 1. パーツ作成
        const hamBtn = document.createElement('div');
        hamBtn.className = 'hamburger-btn';
        hamBtn.innerHTML = '<span></span><span></span><span></span>';
        
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        // 2. 配置
        phoneContainer.appendChild(hamBtn);
        phoneContainer.appendChild(overlay);

        // 3. クリックイベント
        const toggleMenu = (e) => {
            e.stopPropagation();
            const isActive = hamBtn.classList.contains('active');
            if (isActive) {
                hamBtn.classList.remove('active');
                menuSublist.classList.remove('open');
                overlay.classList.remove('show');
            } else {
                hamBtn.classList.add('active');
                menuSublist.classList.add('open');
                overlay.classList.add('show');
            }
            // ×印の色調整
            const spans = hamBtn.querySelectorAll('span');
            spans.forEach(s => s.style.backgroundColor = isActive ? '' : '#ffffff'); 
        };

        hamBtn.onclick = toggleMenu;
        overlay.onclick = (e) => {
            e.stopPropagation();
            hamBtn.classList.remove('active');
            menuSublist.classList.remove('open');
            overlay.classList.remove('show');
            const spans = hamBtn.querySelectorAll('span');
            spans.forEach(s => s.style.backgroundColor = '');
        };
    }

    // 6. ボタンに対してクリック命令を登録する
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
        const rightLi = mock.querySelector('.top_button ul li:nth-child(2)');
        if (rightLi) {
            rightLi.classList.add('clickable');
            rightLi.style.cursor = 'pointer';
            rightLi.onclick = (e) => {
                e.preventDefault();
                changeMockScreen('ticket');
            };
        }
    }, 150);
}

// 2. 画面を切り替える関数（決定版：ロゴクリックを確実に動かす）
function changeMockScreen(screenKey) {
    const mock = document.querySelector('.mock-screen');
    if (!mock) return;

    // 現在のトップ画面のHTMLを保存（初回のみ）
    if (!screens.top) screens.top = mock.innerHTML;

    // 1. 画面の中身を切り替え
    if (screens[screenKey]) {
        mock.innerHTML = screens[screenKey];
        mock.dataset.currentScreen = screenKey;
    }

    // --- トップ画面に戻る共通命令 ---
    const goToTop = (e) => {
        if(e) {
            e.preventDefault();
            e.stopPropagation(); // 他のイベントに邪魔されないようにする
        }
        console.log("トップ画面に戻ります");
        mock.innerHTML = screens.top;
        delete mock.dataset.currentScreen;
        updatePreview(); // トップ画面のイベントを再登録
    };

    // 2. 遷移先がサブ画面（stamp/ticket）の場合のイベント設定
    if (screenKey === 'stamp' || screenKey === 'ticket') {
        
        // 【重要：修正ポイント】
        // <a>タグを探すのではなく、ヘッダーの塊（.mock-header-v2）全体をクリック可能にします
        const headerBox = mock.querySelector('.mock-header-v2');
        if (headerBox) {
            headerBox.style.cursor = 'pointer'; // どこを触っても指マークにする
            headerBox.onclick = goToTop;        // ヘッダーエリア全体に命令を出す
        }

        // 「トップへ戻る」ボタン
        const backBtn = mock.querySelector('.back-to-top');
        if (backBtn) {
            backBtn.onclick = goToTop;
        }

        // スタンプ画面内の「チケット一覧へ」
        const toTicketBtn = mock.querySelector('.to-ticket');
        if (toTicketBtn) {
            toTicketBtn.onclick = (e) => { e.preventDefault(); changeMockScreen('ticket'); };
        }

        // チケット画面内の「スタンプ帳へ」
        const toStampBtn = mock.querySelector('.to-stamp');
        if (toStampBtn) {
            toStampBtn.onclick = (e) => { e.preventDefault(); changeMockScreen('stamp'); };
        }
    }
    
    // デザインの反映
    applyCurrentDesignToMock();
}

function applyCurrentDesignToMock() {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const mock = document.querySelector('.mock-screen');
    const phoneContainer = document.querySelector('.phone-mock');
    
    // 親要素がない場合はエラーを防ぐために何もしない
    if (!mock || !phoneContainer) return;

    // --- 1. 全体背景の設定 (色 + 画像) ---
    const bgColor = getV('cfg-body-bg-val');
    const bgImg = getV('cfg-body-bg-img');
    const bgRepeat = getV('cfg-body-bg-repeat');
    const bgSizeMode = getV('cfg-body-bg-size-mode');
    const bgSizeVal = getV('cfg-body-bg-size-val');

    mock.style.backgroundColor = bgColor;
    if (bgImg) {
        mock.style.backgroundImage = `url('${bgImg}')`;
        mock.style.backgroundRepeat = bgRepeat;
        mock.style.backgroundPosition = 'center top';
        mock.style.backgroundSize = (bgSizeMode === 'custom') ? bgSizeVal : bgSizeMode;
    } else {
        mock.style.backgroundImage = 'none';
    }

    // --- 2. ヘッダー色の適用 ---
    if (mock.dataset.currentScreen === 'stamp' || mock.dataset.currentScreen === 'ticket') {
        const mockHeader = mock.querySelector('.mock-header-v2');
        if (mockHeader) {
            const hColor = getV('cfg-mock-header-bg-val');
            mockHeader.style.setProperty('background-color', hColor, 'important');
            const align = document.querySelector('input[name="cfg-mock-logo-align"]:checked')?.value || 'center';
            mockHeader.style.setProperty('justify-content', align, 'important');
            mockHeader.style.setProperty('padding', (align === 'center' ? '0' : '0 15px'), 'important');
        }
    } else {
        const topHeader = mock.querySelector('header.top') || mock.querySelector('header:not(.mock-header-v2)');
        if (topHeader) {
            topHeader.style.setProperty('background-color', getV('cfg-header-bg-val'), 'important');
        }
    }

    // --- 3. リストメニューのデザイン ---
    // ★修正ポイント1：変数名を 'menuSublist' から 'listArea' に変更して重複を回避
    const listArea = mock.querySelector('.menu-sublist');
    if (listArea) {
        const listBg = getV('cfg-list-bg-val');
        const listTxt = getV('cfg-list-txt-val');
        const listFontSize = getV('cfg-list-size');
        const borderOn = document.getElementById('cfg-list-border-on')?.checked;
        const borderW = getV('cfg-list-border-w');
        const borderC = getV('cfg-list-border-c-val');

        // ★重要：透過を完全に排除して不透明(1)にする
        listArea.style.setProperty('background-color', listBg, 'important');
        listArea.style.setProperty('opacity', '1', 'important');

        const listLinks = listArea.querySelectorAll('ul li a');
        listLinks.forEach((a, index) => {
            a.style.color = listTxt;
            a.style.fontSize = listFontSize;
            if (index === 0) a.style.borderTop = 'none';
            else a.style.borderTop = borderOn ? `${borderW} solid ${borderC}` : 'none';
        });
    }

    // --- 4. スタンプ帳デザイン ---
    if (mock.dataset.currentScreen === 'stamp') {
        const stColor = getV('cfg-st-border-c-val');
        const borderOn = document.getElementById('cfg-st-border-on')?.checked;
        const stTxtColor = getV('cfg-st-txt-c-val');
        const stDueTxtColor = getV('cfg-st-due-txt-c-val');
        const stIconChoice = document.getElementById('cfg-st-icon-choice')?.value;
        const stIconFilter = stIconChoice === 'black' ? 'brightness(0)' : 'invert(100%) sepia(100%) saturate(62%) hue-rotate(329deg) brightness(92%) contrast(260%)';

        const dynamicStyles = `
            .mock-screen .stamp_card {
                background-color: ${getV('cfg-st-card-bg-val')} !important;
                border-radius: ${getV('cfg-st-radius')} !important;
                border: ${borderOn ? `${getV('cfg-st-border-w')} solid ${stColor}` : 'none'} !important;
                outline: ${borderOn ? `${getV('cfg-st-outline-w')} solid ${stColor}` : 'none'} !important;
                outline-offset: -7px;
                position: relative; overflow: hidden;
            }
            .mock-screen .stamp_card::before {
                content: ""; position: absolute; bottom: 5px; right: 5px; width: 100px; height: 50px;
                background-image: url(${getV('cfg-st-watermark-url')}) !important;
                background-size: contain; background-repeat: no-repeat; pointer-events: none;
            }
            .mock-screen .stamp_list_title { color: ${stTxtColor} !important; border-bottom: 1px dashed ${stColor} !important; }
            .mock-screen .ticket_list_due { color: ${stDueTxtColor} !important; border: ${borderOn ? '1px solid ' + stColor : 'none'} !important; border-radius: ${getV('cfg-st-label-radius')} !important; background-color: ${getV('cfg-st-label-bg-val')} !important; }
            .mock-screen .stampicon { color: ${stTxtColor} !important; }
            .mock-screen .stampicon > b { border: 2px solid ${getV('cfg-st-icon-border-val')} !important; }
            .mock-screen .stampicon > b > span { filter: ${stIconFilter} !important; }
        `;
        if (typeof updateDynamicStyle === 'function') {
            updateDynamicStyle(dynamicStyles);
        }
    }

    // --- 5. 共通ボタン (.page_button) の反映 ---
    // ★修正ポイント2：if (stamp) の外に出したので、チケット画面でも効くようになります
    const pgBtns = mock.querySelectorAll('.page_button');
    if (pgBtns.length > 0) {
        const pgBg = getV('cfg-pgbtn-bg-val');
        const pgTxt = getV('cfg-pgbtn-txt-val');
        const pgRadius = getV('cfg-pgbtn-radius');
        const pgBorderOn = document.getElementById('cfg-pgbtn-border-on') ? document.getElementById('cfg-pgbtn-border-on').checked : false;
        const pgBorderW = getV('cfg-pgbtn-border-w');
        const pgBorderC = getV('cfg-pgbtn-border-c-val');

        pgBtns.forEach(btn => {
            btn.style.setProperty('background-color', pgBg, 'important');
            btn.style.setProperty('border-radius', pgRadius, 'important');
            
            if (pgBorderOn) {
                btn.style.setProperty('border', `${pgBorderW} solid ${pgBorderC}`, 'important');
            } else {
                btn.style.setProperty('border', 'none', 'important');
            }

            const span = btn.querySelector('span');
            if (span) {
                span.style.setProperty('color', pgTxt, 'important');
            }
        });
    }

    // --- 6. ハンバーガーメニュー(パターンB)の制御 ---
    const listPatternEl = document.querySelector('input[name="list-pattern"]:checked');
    const listPattern = listPatternEl ? listPatternEl.value : 'A';
    
    // ★修正ポイント3：変数名を再宣言せず、querySelectorで再取得して使う
    const menuSublist = mock.querySelector('.menu-sublist');

    // ★重要：既存のボタンとオーバーレイを「すべて」削除（ループで完全に消す）
    const allBtns = phoneContainer.querySelectorAll('.hamburger-btn');
    const allOverlays = phoneContainer.querySelectorAll('.menu-overlay');
    allBtns.forEach(el => el.remove());
    allOverlays.forEach(el => el.remove());

    // クラスのリセット
    if (menuSublist) {
        menuSublist.classList.remove('pattern-B', 'open');
        menuSublist.style.removeProperty('display'); 
    }

    // ★ここでエラーが出なくなります
    if (listPattern === 'B' && menuSublist) {
        menuSublist.classList.add('pattern-B');

        // 1. ハンバーガーボタン作成
        const hamBtn = document.createElement('div');
        hamBtn.className = 'hamburger-btn';
        hamBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // 2. オーバーレイ作成
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        // 3. スマホ枠(phoneContainer)の直下に追加
        phoneContainer.appendChild(hamBtn);
        phoneContainer.appendChild(overlay);

        // 4. 開閉イベント（クリック時の挙動）
        const toggleMenu = (e) => {
            e.stopPropagation();
            const isActive = hamBtn.classList.contains('active');
            
            if (isActive) {
                // 閉じる
                hamBtn.classList.remove('active');
                menuSublist.classList.remove('open');
                overlay.classList.remove('show');
            } else {
                // 開く
                hamBtn.classList.add('active');
                menuSublist.classList.add('open');
                overlay.classList.add('show');
            }
            
            // ×印の色調整
            const spans = hamBtn.querySelectorAll('span');
            spans.forEach(s => s.style.backgroundColor = isActive ? '' : '#ffffff'); 
        };

        hamBtn.onclick = toggleMenu;

        // 背景クリックで閉じる
        overlay.onclick = (e) => {
            e.stopPropagation();
            hamBtn.classList.remove('active');
            menuSublist.classList.remove('open');
            overlay.classList.remove('show');
            
            // 色を戻す
            const spans = hamBtn.querySelectorAll('span');
            spans.forEach(s => s.style.backgroundColor = '');
        };
    }
}

function apply(el, bg, on, bw, bc, tx, iconColor) {
    if(!el) return;
    
    // ボタン自体のスタイル
    el.style.backgroundColor = bg;
    el.style.setProperty('border', on ? `${bw} solid ${bc}` : 'none', 'important');
    
    // ★【重要】iOS対策：親要素(li)にGPU描画を強制させる呪文
    // これがないと、iPhoneでアイコンの影が消えてしまいます
    el.style.transform = 'translateZ(0)'; 
    
    const info = el.querySelector('.button_info');
    if(info) info.style.setProperty('color', tx, 'important');

    // ★アイコン色変更 (iOS完全対応版 Drop-shadow Hack)
    const imgDiv = el.querySelector('.button_img');
    const img = el.querySelector('img');

    if (imgDiv && img) {
        // 親枠の設定
        imgDiv.style.width = '60px';
        imgDiv.style.height = '60px';
        imgDiv.style.position = 'relative'; 
        imgDiv.style.overflow = 'hidden';
        imgDiv.style.backgroundColor = 'transparent';
        imgDiv.style.webkitMask = 'none';
        imgDiv.style.mask = 'none';
        // 念のためここにも対策
        imgDiv.style.transform = 'translateZ(0)';

        // 画像の設定
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.opacity = '1';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        
        // 影を落とす（左に60px移動し、右に60pxの影）
        const shadow = `drop-shadow(60px 0 0 ${iconColor})`;
        img.style.filter = shadow;
        img.style.webkitFilter = shadow;
        
        // 画像本体を左に飛ばす
        img.style.transform = 'translate3d(-60px, 0, 0)';
        img.style.webkitTransform = 'translate3d(-60px, 0, 0)';
    }
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


// --- 3. 生成ロジック (リファクタリング版) ---

// 共通ヘルパー関数：値の取得を簡単にする
const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

// 1. 全体背景画像のCSSを生成する関数
function getBodyBgCSS() {
    const bodyBgImg = getV('cfg-body-bg-img');
    if (!bodyBgImg) return "";

    const bgRepeat = getV('cfg-body-bg-repeat');
    const bgSizeMode = getV('cfg-body-bg-size-mode');
    const bgSizeVal = getV('cfg-body-bg-size-val');
    const finalSize = (bgSizeMode === 'custom') ? bgSizeVal : bgSizeMode;

    return `
    background-image: url('${bodyBgImg}') !important;
    background-repeat: ${bgRepeat} !important;
    background-size: ${finalSize} !important;
    background-position: center top !important;`;
}

// 2. メインボタン（A/B/Cパターン）のCSSを生成する関数
function getButtonPatternCSS(selectedPattern) {
    // AパターンのCSS生成部分
// AパターンのCSS生成部分
if (selectedPattern === 'A') {
    const b1on = getC('cfg-btn1-border-on');
    const b2on = getC('cfg-btn2-border-on');
    const b1Border = b1on ? `${getV('cfg-btn1-border-w')} solid ${getV('cfg-btn1-border-c-val')}` : 'none';
    const b2Border = b2on ? `${getV('cfg-btn2-border-w')} solid ${getV('cfg-btn2-border-c-val')}` : 'none';
    
    // アイコン色を取得
    const icon1 = getV('cfg-btn1-icon-c-val');
    const icon2 = getV('cfg-btn2-icon-c-val');

    return `
/* --- Aパターン専用 --- */
.top_button > ul > li { width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; list-style: none; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; text-decoration: none; }
.button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }

/* 左ボタン */
.top_button > ul > li:nth-child(1) { background-color: ${getV('cfg-btn1-bg-val')} !important; border: ${b1Border} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${getV('cfg-btn1-txt-val')} !important; }
/* 左アイコン (Drop Shadow Hack) */
.top_button > ul > li:nth-child(1) .button_img {
    width: 60px; height: 60px; overflow: hidden;
}
.top_button > ul > li:nth-child(1) .button_img img {
    width: 60px; height: 60px;
    transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon1}) !important;
    -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
}

/* 右ボタン */
.top_button > ul > li:nth-child(2) { background-color: ${getV('cfg-btn2-bg-val')} !important; border: ${b2Border} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${getV('cfg-btn2-txt-val')} !important; }
/* 右アイコン (Drop Shadow Hack) */
.top_button > ul > li:nth-child(2) .button_img {
    width: 60px; height: 60px; overflow: hidden;
}
.top_button > ul > li:nth-child(2) .button_img img {
    width: 60px; height: 60px;
    transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon2}) !important;
    -webkit-filter: drop-shadow(60px 0 0 ${icon2}) !important;
}
`;
}
    
    if (selectedPattern === 'B') {
        const bArea = document.getElementById('pattern-settings-B');
        const cols = bArea.querySelectorAll('.setting-column');
        const getBData = (idx) => {
            const c = cols[idx]; 
            const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, 
                on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value, 
                befW: allTxt[4].value, befC: allTxt[5].value, tx: allTxt[6].value 
            };
        };
        const b1 = getBData(0); 
        const b2 = getBData(1);
        
        // ★アイコン色取得
        const icon1 = getV('cfg-b-btn1-icon-c-val');
        const icon2 = getV('cfg-b-btn2-icon-c-val');

        return `
    /* --- Bパターン専用 --- */
    .top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; }
    .top_button > ul > li > a { display: flex; align-items: center; padding: 15px 10px; text-decoration: none; }
    .top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; }
    .top_button > ul > li:nth-child(1):before { border-bottom: ${b1.befW} solid ${b1.befC}; border-right: ${b1.befW} solid ${b1.befC}; }
    .top_button > ul > li:nth-child(2):before { border-bottom: ${b2.befW} solid ${b2.befC}; border-right: ${b2.befW} solid ${b2.befC}; }

    /* 左ボタン */
    .top_button > ul > li:nth-child(1) { background-color: ${b1.bg} !important; border: ${b1.on ? b1.bw+' solid '+b1.bc : 'none'} !important; border-radius: ${b1.radius} !important; }
    .top_button > ul > li:nth-child(1) .button_info { color: ${b1.tx} !important; }
    /* 左アイコン (Drop Shadow Hack) */
    .top_button > ul > li:nth-child(1) .button_img { width: 60px; height: 60px; overflow: hidden; }
    .top_button > ul > li:nth-child(1) .button_img img {
    width: 60px; height: 60px; transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
    }

    /* 右ボタン */
    .top_button > ul > li:nth-child(2) { background-color: ${b2.bg} !important; border: ${b2.on ? b2.bw+' solid '+b2.bc : 'none'} !important; border-radius: ${b2.radius} !important; }
    .top_button > ul > li:nth-child(2) .button_info { color: ${b2.tx} !important; }
    /* 右アイコン (Drop Shadow Hack) */
    .top_button > ul > li:nth-child(2) .button_img { width: 60px; height: 60px; overflow: hidden; }
    .top_button > ul > li:nth-child(2) .button_img img {
    width: 60px; height: 60px; transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon2}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon2}) !important;
    }`;
    }

    if (selectedPattern === 'C') {
        const cArea = document.getElementById('pattern-settings-C');
        const cols = cArea.querySelectorAll('.setting-column');
        const getCData = (idx) => {
            const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, 
                on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value, 
                befW: allTxt[4].value, befC: allTxt[5].value, afterC: allTxt[6].value, tx: allTxt[7].value 
            };
        };
        const c1 = getCData(0); const c2 = getCData(1);
        
        // ★アイコン色取得
        const icon1 = getV('cfg-c-btn1-icon-c-val');
        const icon2 = getV('cfg-c-btn2-icon-c-val');

        return `
/* --- Cパターン専用 --- */
.top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 15px 20px 0px; text-decoration: none; font-weight: bold; position: relative; z-index: 2; }
.button_info { width: 100%; text-align: center; padding: 25px 0 5px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
.top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; z-index: 1; }
.top_button > ul > li::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; z-index: 0; clip-path: ellipse(70% 90% at 50% 100%); }

/* 左ボタン */
.top_button > ul > li:nth-child(1) { background-color: ${c1.bg} !important; border: ${c1.on ? c1.bw+' solid '+c1.bc : 'none'} !important; border-radius: ${c1.radius} !important; }
.top_button > ul > li:nth-child(1):before { border-bottom: ${c1.befW} solid ${c1.befC}; border-right: ${c1.befW} solid ${c1.befC}; }
.top_button > ul > li:nth-child(1)::after { background: ${c1.afterC} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${c1.tx} !important; }
/* 左アイコン (Drop Shadow Hack) */
.top_button > ul > li:nth-child(1) .button_img { width: 60px; height: 60px; overflow: hidden; }
.top_button > ul > li:nth-child(1) .button_img img {
    width: 60px; height: 60px; transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
}

/* 右ボタン */
.top_button > ul > li:nth-child(2) { background-color: ${c2.bg} !important; border: ${c2.on ? c2.bw+' solid '+c2.bc : 'none'} !important; border-radius: ${c2.radius} !important; }
.top_button > ul > li:nth-child(2):before { border-bottom: ${c2.befW} solid ${c2.befC}; border-right: ${c2.befW} solid ${c2.befC}; }
.top_button > ul > li:nth-child(2)::after { background: ${c2.afterC} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${c2.tx} !important; }
/* 右アイコン (Drop Shadow Hack) */
.top_button > ul > li:nth-child(2) .button_img { width: 60px; height: 60px; overflow: hidden; }
.top_button > ul > li:nth-child(2) .button_img img {
    width: 60px; height: 60px; transform: translateX(-60px);
    filter: drop-shadow(60px 0 0 ${icon2}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon2}) !important;
}`;
    }
    return "";
}

// 3. ヘッダー（パターンA/B）のCSSを生成する関数
function getHeaderCSS() {
    const headerPattern = document.querySelector('input[name="header-pattern"]:checked').value;
    if (headerPattern === 'B') {
        return `
header.top { height: 50px !important; display: flex !important; justify-content: flex-start !important; align-items: center !important; background-color: transparent !important; position: relative; z-index: 20; padding-left: 15px !important; }
header.top h1.top { margin: 0 !important; }
header.top h1.top span { display: none !important; }
.header-slider-wrap { position: relative; z-index: 3 !important; overflow: hidden; top: -50px; margin-bottom: -50px; height: 380px; }
.header-slider, .header-slide { width: 100%; height: 100%; }
.header-slide { background-size: cover; background-position: center; }`;
    } else {
        return `header.top { background-color: ${getV('cfg-header-bg-val')} !important; display: flex; justify-content: center; align-items: center; padding: 10px 0; }`;
    }
}

// 4. スタンプ帳ページのCSSを生成する関数
function getStampPageCSS() {
    const stTxtColor = getV('cfg-st-txt-c-val');
    const stDueTxtColor = getV('cfg-st-due-txt-c-val');
    const stBorderColor = getV('cfg-st-border-c-val');
    const stBorderOn = document.getElementById('cfg-st-border-on').checked;
    
    // アイコンフィルター設定
    const stIconFilter = document.getElementById('cfg-st-icon-choice').value === 'black' 
        ? 'brightness(0)' 
        : 'invert(100%) sepia(100%) saturate(62%) hue-rotate(329deg) brightness(92%) contrast(260%)';

    return `
body.stamp .stamp_set { box-shadow: 0 0 5px 0px #adadadb5; border-radius: 17px; }
#stamp-list .stamp_card {
    background: ${getV('cfg-st-card-bg-val')} !important;
    border-radius: ${getV('cfg-st-radius')} !important;
    border: ${stBorderOn ? getV('cfg-st-border-w') + ' solid ' + stBorderColor : 'none'} !important;
    outline: ${stBorderOn ? getV('cfg-st-outline-w') + ' solid ' + stBorderColor : 'none'} !important;
    outline-offset: -7px;
    background-blend-mode: lighten;
    position: relative; overflow: hidden;
}
#stamp-list .stamp_card::before {
    content: ""; position: absolute; z-index: 0; bottom: 10px; right: 10px; width: 100px; height: 60px;
    background-image: url(${getV('cfg-st-watermark-url')});
    background-position: center; background-size: contain; background-repeat: no-repeat; pointer-events: none;
}
.stamp_list_title { color: ${stTxtColor} !important; border-bottom: 1px dashed ${stBorderColor} !important; font-size: 20px; }
.stamp_card .ticket_list_due {
    color: ${stDueTxtColor} !important;
    border: ${stBorderOn ? '1px solid ' + stBorderColor : 'none'} !important;
    border-radius: ${getV('cfg-st-label-radius')} !important;
    background-color: ${getV('cfg-st-label-bg-val')} !important;
}
body.stamp .stampicon { color: ${stTxtColor} !important; }
body.stamp .stampicon > b { border: 2px solid ${getV('cfg-st-icon-border-val')} !important; }
body.stamp .stampicon > b > span { filter: ${stIconFilter} !important; }
`;
}

// 5. メニューリストの配列を取得する関数
function getMenuItems() {
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
    return items;
}

// ★追加：共通ボタンのCSS生成関数
function getPageBtnCSS() {
    const bg = getV('cfg-pgbtn-bg-val');
    const txt = getV('cfg-pgbtn-txt-val');
    const radius = getV('cfg-pgbtn-radius');
    const borderOn = document.getElementById('cfg-pgbtn-border-on').checked;
    const borderW = getV('cfg-pgbtn-border-w');
    const borderC = getV('cfg-pgbtn-border-c-val');

    const borderCSS = borderOn ? `border: ${borderW} solid ${borderC} !important;` : `border: none !important;`;

    return `
/* 共通ボタン (.page_button) */
.page_button {
    background-color: ${bg} !important;
    border-radius: ${radius} !important;
    ${borderCSS}
    text-decoration: none;
}
.page_button > span {
    color: ${txt} !important;
}
`;
}

// --- メイン処理: 生成ボタンクリック時の動作 ---
document.getElementById('generate-btn').onclick = () => {
    
    // 生成前に最新状態を強制反映
    updatePreview(); 

    // 全体背景色の判定
    const isBodyBgNone = document.getElementById('cfg-body-bg-none').checked;
    const bodyBgColor = isBodyBgNone ? 'transparent' : getV('cfg-body-bg-val');

    // ボタンエリア背景色の判定
    const isBtnAreaNone = document.getElementById('cfg-btn-area-bg-none').checked;
    const btnAreaColor = isBtnAreaNone ? 'transparent' : getV('cfg-btn-area-bg-val');



    // 各パーツのCSS生成
    const bodyBgCSS = getBodyBgCSS();
    const btnPattern = document.querySelector('input[name="btn-pattern"]:checked').value;
    const patternCSS = getButtonPatternCSS(btnPattern);
    const headerCSS = getHeaderCSS();
    const stampPageCSS = getStampPageCSS();
    const pageBtnCSS = getPageBtnCSS();
    
    // フッターメニュー設定
    const fFilter = document.getElementById('cfg-icon-choice').value === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    const listBorderOn = document.getElementById('cfg-list-border-on').checked;
    
    // ロゴ配置
    const mockLogoAlign = document.querySelector('input[name="cfg-mock-logo-align"]:checked').value;
    const subPageHeaderCSS = `
.mock-header-v2 { 
    display: flex !important; 
    justify-content: ${mockLogoAlign} !important; 
    ${mockLogoAlign === 'flex-start' ? 'padding-left: 15px !important;' : ''}
    ${mockLogoAlign === 'flex-end' ? 'padding-right: 15px !important;' : ''}
}`;




// --- 【1】JavaScriptコードの組み立て ---
const menuItems = getMenuItems();
    
// ★追加：パターンB（ハンバーガー）が選ばれているか確認
const listPattern = document.querySelector('input[name="list-pattern"]:checked').value;
let hamburgerScript = "";

// パターンBの場合のみ、ハンバーガーメニュー用スクリプトを追加
if (listPattern === 'B') {
    hamburgerScript = `
/* ハンバーガー機能 */
$(function() {
// body に追加
$('body').append('<div class="hamburger-btn"><span></span><span></span><span></span></div>');
$('body').append('<div class="menu-overlay"></div>');

// 開閉制御
$('.hamburger-btn').on('click', function() {
    $(this).toggleClass('active');
    $('.menu-sublist').toggleClass('open');
    $('.menu-overlay').toggleClass('show');
});

// 背景クリックで閉じる
$('.menu-overlay').on('click', function() {
    $('.hamburger-btn').removeClass('active');
    $('.menu-sublist').removeClass('open');
    $(this).removeClass('show');
});
});`;
}

const jsOutput = `<script>
window.onload = () => {
const menuItems = ${JSON.stringify(menuItems.map(item => ({
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
${hamburgerScript}
<\/script>`;









    // --- 【2】CSSコードの組み立て ---
    const cssOutput = `<style type="text/css">
* ページ全体の設定 */
html, body { 
    background-color: ${bodyBgColor} !important;
    ${bodyBgCSS} 
}
${headerCSS}
${subPageHeaderCSS}
/* --- スタンプ帳画面用 --- */
body.stamp { background-color: #f5f5f5 !important; }
header { background-color: ${getV('cfg-mock-header-bg-val')} !important; } 
${stampPageCSS}
.top_button { background-color: ${btnAreaColor} !important; }
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; list-style: none; }
${patternCSS}
${headerCSS}
${subPageHeaderCSS}
${stampPageCSS}
${pageBtnCSS}

/* フッター固定メニュー */
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${getV('cfg-bg-val')}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${getV('cfg-txt-val')}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }
#sp-fixed-menu .user a { position: relative; top: -21px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 73px; height: 73px; border-radius: 50%; background: ${getV('cfg-user-bg-val')} !important; z-index: 10; border: 3px solid #FFF; padding-bottom: 5px; }
#sp-fixed-menu .user a span { color: #fff !important; font-size: 9px; font-weight: bold; margin: 0 0 -10px 0; }
#sp-fixed-menu .user a .icon { filter: brightness(0) invert(1); }

/* メニューリスト */
.menu-sublist { background: ${getV('cfg-list-bg-val')} !important; }
.menu-sublist > ul > li > a { 
    color: ${getV('cfg-list-txt-val')} !important; 
    border-top: ${listBorderOn ? getV('cfg-list-border-w') + ' solid ' + getV('cfg-list-border-c-val') : 'none'} !important;
    font-size: ${getV('cfg-list-size')} !important;
    display: block; text-decoration: none; padding: 15px;
}
</style>`;

    // --- 結果を出力 ---
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
        // --- 1. IDがある通常の入力欄 (テキスト、カラー、チェックボックス、セレクト) の保存 ---
        if (input.id) {
            if (input.type === 'checkbox') {
                settings[input.id] = input.checked;
            } else if (input.type !== 'radio') {
                settings[input.id] = input.value;
            }
        }
        
        // --- 2. ラジオボタン (パターン選択・ロゴ配置) の保存 ---
        if (input.checked) {
            // ★ここを変更： 'list-pattern' を追加しました
            if (input.name === 'btn-pattern' || 
                input.name === 'header-pattern' || 
                input.name === 'cfg-mock-logo-align' || 
                input.name === 'list-pattern') { 
                
                settings[input.name] = input.value;
            }
        }
    });

    // --- 3. 動的に増減するメニュー項目の保存 ---
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

// LocalStorageからデータを読み込み、フォームとプレビューを復元する関数
function loadFromLocal() {
    const dataStr = localStorage.getItem('generator_backup');
    if (!dataStr) return;

    const settings = JSON.parse(dataStr);
    
    // 1. 各種入力項目の復元
    Object.keys(settings).forEach(key => {
        // ラジオボタンの復元（フッターパターン含む）
        if (key === 'btn-pattern' || 
            key === 'header-pattern' || 
            key === 'cfg-mock-logo-align' || 
            key === 'list-pattern') { 
            
            const val = settings[key];
            const radio = document.querySelector(`input[name="${key}"][value="${val}"]`);
            if (radio) {
                radio.checked = true;
            }
            return; 
        }

        // 通常の入力欄の復元
        const el = document.getElementById(key);
        if (!el) return;

        if (el.type === 'checkbox') {
            el.checked = settings[key];
        } else {
            el.value = settings[key];
        }
    });

    // 2. メニュー項目の復元
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

    // ★★★ ここを追加！ ★★★
    // 3. カラーピッカーの値をテキストボックスに同期させる
    // これをやらないと、プレビューがテキストボックスの初期値（黒など）を読み込んでしまいます
    if (typeof syncPairs !== 'undefined') {
        syncPairs.forEach(pair => {
            const picker = document.getElementById(pair[0]); // カラーピッカー
            const text = document.getElementById(pair[1]);   // テキストボックス
            if (picker && text) {
                text.value = picker.value.toUpperCase();
            }
        });
    }
    // ★★★ 追加ここまで ★★★
    
    // 4. 最後にUIの状態を同期
    switchPattern(); 
    
    updatePreview();
}

// ページをリロードして初期状態を反映
document.getElementById('reset-btn').onclick = () => {
    if (confirm("すべての設定を初期状態にリセットしますか？")) {
        // 1. LocalStorageのデータを削除
        localStorage.removeItem('generator_backup');
        location.reload();
    }
};