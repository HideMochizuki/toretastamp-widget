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

    // ★追加：お知らせパターンの切り替え監視
    const noticeRadios = document.querySelectorAll('input[name="notice-pattern"]');
    noticeRadios.forEach(r => {
        r.addEventListener('change', () => {
            switchNoticePattern(); // 表示切り替え
            updatePreview();       // プレビュー更新
        });
    });
    switchNoticePattern(); // 初期実行

    // ★追加：リストパターンのラジオボタン切り替え時に実行
    const listRadios = document.querySelectorAll('input[name="list-pattern"]');
    listRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            switchListPattern(); // 表示切り替え
            updatePreview();     // プレビュー更新
        });
    });
    switchListPattern();
    
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
                        <h3 class="stamp_list_title">来店スタンプカード</h3>
                        <dl class="ticket_list_bottom">
                            <dt><span class="ticket_list_due" style="font-size:10px;">有効期限：2026年02月01日</span></dt>
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
    // ★ チケット一覧用のテンプレート
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
    `,
    // ★ ここから：スタンプ詳細ページ
    stamp_details: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/brand/TCNteaCYUPectHdLS0JD.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <div class="stamp_set" style="padding: 20px; margin: 15px;">
            <h3 class="stamp_title">レストラントレタ来店スタンプ</h3>
            <div style="margin-bottom: 0px;">
                <span class="stamp_due" style="font-size: 10px;">有効期限：2027年02月14日</span>
            </div>
            <p class="stamp_note">お得なチケットは、来店3回来店ごとにお得なチケットをプレゼント！<br>ご来店お待ちしております！</p>
            
            <div class="stamp_wrapper" style="text-align: center; margin: 20px 0;">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/Ad0xVj96ubnYL40GtQCi.png" alt="" style="width: 25%; margin: 5px;">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/rGXbgv33qZPRED56WnWc.png" alt="" style="width: 25%; margin: 5px;">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/rGXbgv33qZPRED56WnWc.png" alt="" style="width: 25%; margin: 5px;">
            </div>
            
            <div class="stamp_button" style="text-align: center; margin: 0 10px">
                <a class="page_button orange" href="#" style="text-decoration: none; padding: 3px 5px;"><span  style="font-size:10px;">QRコード読み取り</span></a>
            </div>
        </div>
        
        <div class="stamp_button" style="margin-top: 20px;">
            <a class="page_button to-stamp-list clickable" href="#"><span>スタンプ一覧へ</span></a>
        </div>
        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ</span></a>
        </div>
        <div class="menu-sublist">
            <ul>
                <li><a href="#">スタンプ履歴</a></li>
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
    ['cfg-ham-line-c', 'cfg-ham-line-val'],
    ['cfg-ham-line-active-c', 'cfg-ham-line-active-val'],
    // ★スタンプ帳
    ['cfg-st-card-bg', 'cfg-st-card-bg-val'],
    ['cfg-st-border-c', 'cfg-st-border-c-val'],
    ['cfg-st-txt-c', 'cfg-st-txt-c-val'],
    ['cfg-st-due-txt-c', 'cfg-st-due-txt-c-val'],
    ['cfg-st-label-bg', 'cfg-st-label-bg-val'],
    ['cfg-st-icon-border', 'cfg-st-icon-border-val'],
    // ★共通ボタン用
    ['cfg-pgbtn-bg-c', 'cfg-pgbtn-bg-val'],
    ['cfg-pgbtn-txt-c', 'cfg-pgbtn-txt-val'],
    ['cfg-pgbtn-border-c', 'cfg-pgbtn-border-c-val'],
    // ★追加：オレンジボタン用
    ['cfg-pgbtn-org-bg-c', 'cfg-pgbtn-org-bg-val'],
    ['cfg-pgbtn-org-txt-c', 'cfg-pgbtn-org-txt-val'],
    ['cfg-pgbtn-org-border-c', 'cfg-pgbtn-org-border-c-val'],
    // ★お知らせ用
    ['cfg-notice-color', 'cfg-notice-color-val'],

    // ▼ スタンプ詳細ページ用
    ['cfg-std-bg-c', 'cfg-std-bg-val'],
    ['cfg-std-border-c', 'cfg-std-border-c-val'],
    ['cfg-std-due-txt-c', 'cfg-std-due-txt-val'],
    ['cfg-std-due-bg-c', 'cfg-std-due-bg-val'],
    ['cfg-std-note-line-c', 'cfg-std-note-line-val'],
    ['cfg-std-title-c', 'cfg-std-title-val'],
    ['cfg-std-note-txt-c', 'cfg-std-note-txt-val']
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
    const phoneContainer = document.querySelector('.phone-mock');

    if (!mock || !phoneContainer) return;

    // ★ CSS一括適用
    applyCurrentDesignToMock();

    const isSubScreen = mock.dataset.currentScreen === 'stamp' || mock.dataset.currentScreen === 'ticket' || mock.dataset.currentScreen === 'stamp_details';
    
    const previewUl = document.getElementById('preview-ul');
    if(!previewUl) return;
    previewUl.innerHTML = '';
    
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

    if (!isSubScreen) {
        const headerPattern = document.querySelector('input[name="header-pattern"]:checked')?.value || 'A';
        const bSettings = document.getElementById('header-b-settings');
        const headerTop = mock.querySelector('header.top');
        const headerH1 = headerTop?.querySelector('h1.top');
        const headerSpan = headerH1?.querySelector('span');
        let sliderWrap = mock.querySelector('.header-slider-wrap');

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

        const selected = document.querySelector('input[name="btn-pattern"]:checked')?.value || 'A';
        const btn1 = mock.querySelector('.top_button ul li:nth-child(1)');
        const btn2 = mock.querySelector('.top_button ul li:nth-child(2)');

        const isBodyBgNone = document.getElementById('cfg-body-bg-none')?.checked;
        mock.style.backgroundColor = isBodyBgNone ? 'transparent' : getV('cfg-body-bg-val');
        
        const area = mock.querySelector('.top_button');
        if(area) {
            const isBtnAreaNone = document.getElementById('cfg-btn-area-bg-none')?.checked;
            area.style.backgroundColor = isBtnAreaNone ? 'transparent' : getV('cfg-btn-area-bg-val');
        }

        if (selected === 'A') {
            apply(btn1, getV('cfg-btn1-bg-val'), getC('cfg-btn1-border-on'), getV('cfg-btn1-border-w'), getV('cfg-btn1-border-c-val'), getV('cfg-btn1-txt-val'), getV('cfg-btn1-icon-c-val'));
            apply(btn2, getV('cfg-btn2-bg-val'), getC('cfg-btn2-border-on'), getV('cfg-btn2-border-w'), getV('cfg-btn2-border-c-val'), getV('cfg-btn2-txt-val'), getV('cfg-btn2-icon-c-val'));
        } else if (selected === 'B') {
            const bArea = document.getElementById('pattern-settings-B');
            const cols = bArea.querySelectorAll('.setting-column');
            if (cols.length >= 2) {
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
                
                apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-b-btn1-icon-c-val'));
                if(btn1) btn1.style.borderRadius = d1.radius;
                
                apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-b-btn2-icon-c-val'));
                if(btn2) btn2.style.borderRadius = d2.radius;
                
                updateDynamicStyle(`
                    .mock-screen.pattern-B .top_button ul li:nth-child(1):before { border-bottom: ${d1.befW} solid ${d1.befC} !important; border-right: ${d1.befW} solid ${d1.befC} !important; }
                    .mock-screen.pattern-B .top_button ul li:nth-child(2):before { border-bottom: ${d2.befW} solid ${d2.befC} !important; border-right: ${d2.befW} solid ${d2.befC} !important; }
                `, 'dyn-style-pattern');
            }
        } else if (selected === 'C') {
            const cArea = document.getElementById('pattern-settings-C');
            const cols = cArea.querySelectorAll('.setting-column');
            if (cols.length >= 2) {
                const getCData = (idx) => {
                    const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
                    const chk = c.querySelector('input[type="checkbox"]');
                    return {
                        bg: allTxt[0].value, on: chk.checked, bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value,
                        befW: allTxt[4].value, befC: allTxt[5].value, afterC: allTxt[6].value, tx: allTxt[7].value
                    };
                };
                const d1 = getCData(0); const d2 = getCData(1);
                
                apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-c-btn1-icon-c-val'));
                if(btn1) btn1.style.borderRadius = d1.radius;
                
                apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-c-btn2-icon-c-val'));
                if(btn2) btn2.style.borderRadius = d2.radius;
                
                updateDynamicStyle(`
                    .mock-screen.pattern-C .top_button ul li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; z-index: 1; }
                    .mock-screen.pattern-C .top_button ul li:after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; clip-path: ellipse(70% 90% at 50% 100%); z-index: 0; }
                    .mock-screen.pattern-C .top_button ul li:nth-child(1):before { border-bottom: ${d1.befW} solid ${d1.befC} !important; border-right: ${d1.befW} solid ${d1.befC} !important; }
                    .mock-screen.pattern-C .top_button ul li:nth-child(2):before { border-bottom: ${d2.befW} solid ${d2.befC} !important; border-right: ${d2.befW} solid ${d2.befC} !important; }
                    .mock-screen.pattern-C .top_button ul li:nth-child(1):after { background: ${d1.afterC} !important; }
                    .mock-screen.pattern-C .top_button ul li:nth-child(2):after { background: ${d2.afterC} !important; }
                `, 'dyn-style-pattern');
            }
        }
    }

    const fBg = getV('cfg-bg-val');
    const fFilter = document.getElementById('cfg-icon-choice')?.value === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    const previewFooter = document.getElementById('preview-footer');
    if(previewFooter) previewFooter.style.backgroundColor = fBg;

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

    // --- ハンバーガーメニュー(パターンB)の制御 ---
    const listPatternEl = document.querySelector('input[name="list-pattern"]:checked');
    const listPattern = listPatternEl ? listPatternEl.value : 'A';
    const menuSublist = mock.querySelector('.menu-sublist');

    const oldBtn = phoneContainer.querySelector('.hamburger-btn');
    const wasOpen = oldBtn && oldBtn.classList.contains('active');

    phoneContainer.querySelectorAll('.hamburger-btn').forEach(el => el.remove());
    phoneContainer.querySelectorAll('.menu-overlay').forEach(el => el.remove());

    if (menuSublist) {
        menuSublist.classList.remove('pattern-B', 'open');
        menuSublist.style.removeProperty('display'); 
    }

    if (listPattern === 'B' && menuSublist) {
        menuSublist.classList.add('pattern-B');

        const hamLineColor = getV('cfg-ham-line-val');       
        const hamActiveColor = getV('cfg-ham-line-active-val'); 

        const hamBtn = document.createElement('div');
        hamBtn.className = 'hamburger-btn';
        hamBtn.innerHTML = '<span></span><span></span><span></span>';
        const spans = hamBtn.querySelectorAll('span');

        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        phoneContainer.appendChild(hamBtn);
        phoneContainer.appendChild(overlay);

        if (wasOpen) {
            hamBtn.classList.add('active');
            menuSublist.classList.add('open');
            overlay.classList.add('show');
            spans.forEach(s => s.style.setProperty('background-color', hamActiveColor, 'important'));
        } else {
            spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
        }

        const toggleMenu = (e) => {
            e.stopPropagation();
            if (hamBtn.classList.contains('active')) {
                hamBtn.classList.remove('active');
                menuSublist.classList.remove('open');
                overlay.classList.remove('show');
                spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
            } else {
                hamBtn.classList.add('active');
                menuSublist.classList.add('open');
                overlay.classList.add('show');
                spans.forEach(s => s.style.setProperty('background-color', hamActiveColor, 'important'));
            }
        };

        hamBtn.onclick = toggleMenu;
        overlay.onclick = (e) => {
            e.stopPropagation();
            hamBtn.classList.remove('active');
            menuSublist.classList.remove('open');
            overlay.classList.remove('show');
            spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
        };
    }

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
    if (screenKey === 'stamp' || screenKey === 'ticket' || screenKey === 'stamp_details') {
        
        // 【重要：修正ポイント】
        // <a>タグを探すのではなく、ヘッダーの塊（.mock-header-v2）全体をクリック可能にします
        const headerBox = mock.querySelector('.mock-header-v2');
        if (headerBox) {
            headerBox.style.cursor = 'pointer'; // どこを触っても指マークにする
            headerBox.onclick = goToTop;        // ヘッダーエリア全体に命令を出す
        }

        // ★スタンプ画面の「スタンプカード」をクリックで詳細へ
        if (screenKey === 'stamp') {
            const stampCards = mock.querySelectorAll('.stamp_card');
            stampCards.forEach(card => {
                card.style.cursor = 'pointer';
                card.onclick = (e) => { 
                    e.preventDefault(); 
                    changeMockScreen('stamp_details'); 
                };
            });
        }

        // ★詳細画面の「スタンプ一覧へ」ボタンで一覧へ戻る
        if (screenKey === 'stamp_details') {
            const toStampListBtn = mock.querySelector('.to-stamp-list');
            if (toStampListBtn) {
                toStampListBtn.onclick = (e) => { 
                    e.preventDefault(); 
                    changeMockScreen('stamp'); 
                };
            }
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
// プレビュー画面へのデザイン反映処理
function applyCurrentDesignToMock() {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const mock = document.querySelector('.mock-screen');
    const phoneContainer = document.querySelector('.phone-mock');
    
    if (!mock || !phoneContainer) return;

    // --- 1. 全体背景の設定 ---
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
    if (mock.dataset.currentScreen === 'stamp' || mock.dataset.currentScreen === 'ticket' || mock.dataset.currentScreen === 'stamp_details') {
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
    const listArea = mock.querySelector('.menu-sublist');
    if (listArea) {
        const listBg = getV('cfg-list-bg-val');
        const listTxt = getV('cfg-list-txt-val');
        const listFontSize = getV('cfg-list-size');
        const borderOn = document.getElementById('cfg-list-border-on')?.checked;
        const borderW = getV('cfg-list-border-w');
        const borderC = getV('cfg-list-border-c-val');

        listArea.style.setProperty('background-color', listBg, 'important');
        listArea.style.setProperty('opacity', '1', 'important');

        const listLinks = listArea.querySelectorAll('ul li a');
        listLinks.forEach((a, index) => {
            a.style.setProperty('color', listTxt, 'important');
            a.style.setProperty('font-size', listFontSize, 'important');

            if (index === 0) {
                a.style.setProperty('border-top', 'none', 'important');
            } else {
                const borderVal = borderOn ? `${borderW} solid ${borderC}` : 'none';
                a.style.setProperty('border-top', borderVal, 'important');
            }
        });
    }

    // ★プレビュー専用CSSをまとめて管理する変数
    let finalCSS = "";

    // --- 4. スタンプ帳デザインCSSの生成 ---
    if (mock.dataset.currentScreen === 'stamp') {
        const stColor = getV('cfg-st-border-c-val');
        const borderOn = document.getElementById('cfg-st-border-on')?.checked;
        const stTxtColor = getV('cfg-st-txt-c-val');
        const stDueTxtColor = getV('cfg-st-due-txt-c-val');
        const stIconChoice = document.getElementById('cfg-st-icon-choice')?.value;
        const stIconFilter = stIconChoice === 'black' ? 'brightness(0)' : 'invert(100%) sepia(100%) saturate(62%) hue-rotate(329deg) brightness(92%) contrast(260%)';

        finalCSS += `
            .mock-screen .stamp_card { background-color: ${getV('cfg-st-card-bg-val')} !important; border-radius: ${getV('cfg-st-radius')} !important; border: ${borderOn ? `${getV('cfg-st-border-w')} solid ${stColor}` : 'none'} !important; outline: ${borderOn ? `${getV('cfg-st-outline-w')} solid ${stColor}` : 'none'} !important; outline-offset: -7px; position: relative; overflow: hidden; }
            .mock-screen .stamp_card::before { content: ""; position: absolute; bottom: 5px; right: 5px; width: 100px; height: 50px; background-image: url(${getV('cfg-st-watermark-url')}) !important; background-size: contain; background-repeat: no-repeat; pointer-events: none; }
            .mock-screen .stamp_list_title { color: ${stTxtColor} !important; border-bottom: 1px dashed ${stColor} !important; }
            .mock-screen .ticket_list_due { color: ${stDueTxtColor} !important; border: ${borderOn ? '1px solid ' + stColor : 'none'} !important; border-radius: ${getV('cfg-st-label-radius')} !important; background-color: ${getV('cfg-st-label-bg-val')} !important; }
            .mock-screen .stampicon { color: ${stTxtColor} !important; }
            .mock-screen .stampicon > b { border: 2px solid ${getV('cfg-st-icon-border-val')} !important; }
            .mock-screen .stampicon > b > span { filter: ${stIconFilter} !important; }
        `;
    }

    // --- お知らせデザインCSS ---
    if (typeof getNoticeCSS === 'function') {
        finalCSS += getNoticeCSS(false);
    }

    // --- スタンプ詳細ページCSS ---
    if (mock.dataset.currentScreen === 'stamp_details' && typeof getStampDetailsCSS === 'function') {
        finalCSS += getStampDetailsCSS();
    }

    // --- CSSをプレビュー画面に適用 ---
    if (typeof updateDynamicStyle === 'function') {
        updateDynamicStyle(finalCSS, 'dyn-style-main');
    }

    // ==========================================
    // ★復活：共通ボタン・オレンジボタンの直塗り処理
    // （CSSの詳細度で負けないように、JSで直接色を塗ります）
    // ==========================================
    
    // ① 通常ボタン (.page_button だが .orange は除く)
    const pgBtns = mock.querySelectorAll('.page_button:not(.orange)');
    if (pgBtns.length > 0) {
        const pgBg = getV('cfg-pgbtn-bg-val');
        const pgTxt = getV('cfg-pgbtn-txt-val');
        const pgRadius = getV('cfg-pgbtn-radius');
        const pgBorderOnEl = document.getElementById('cfg-pgbtn-border-on');
        const pgBorderOn = pgBorderOnEl ? pgBorderOnEl.checked : false;
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
            if (span) span.style.setProperty('color', pgTxt, 'important');
        });
    }

    // ② オレンジボタン (.page_button.orange)
    const orgBtns = mock.querySelectorAll('.page_button.orange');
    if (orgBtns.length > 0) {
        const orgBg = getV('cfg-pgbtn-org-bg-val');
        const orgTxt = getV('cfg-pgbtn-org-txt-val');
        const orgRadius = getV('cfg-pgbtn-org-radius');
        const orgBorderOnEl = document.getElementById('cfg-pgbtn-org-border-on');
        const orgBorderOn = orgBorderOnEl ? orgBorderOnEl.checked : false;
        const orgBorderW = getV('cfg-pgbtn-org-border-w');
        const orgBorderC = getV('cfg-pgbtn-org-border-c-val');

        orgBtns.forEach(btn => {
            btn.style.setProperty('background-color', orgBg, 'important');
            btn.style.setProperty('border-radius', orgRadius, 'important');
            
            if (orgBorderOn) {
                btn.style.setProperty('border', `${orgBorderW} solid ${orgBorderC}`, 'important');
            } else {
                btn.style.setProperty('border', 'none', 'important');
            }

            const span = btn.querySelector('span');
            if (span) span.style.setProperty('color', orgTxt, 'important');
        });
    }

    // --- 5. ハンバーガーメニュー(パターンB)の制御 ---
    const listPatternEl = document.querySelector('input[name="list-pattern"]:checked');
    const listPattern = listPatternEl ? listPatternEl.value : 'A';
    const menuSublist = mock.querySelector('.menu-sublist');

    // 設定保持
    const oldBtn = phoneContainer.querySelector('.hamburger-btn');
    const wasOpen = oldBtn && oldBtn.classList.contains('active');

    // 既存削除
    phoneContainer.querySelectorAll('.hamburger-btn').forEach(el => el.remove());
    phoneContainer.querySelectorAll('.menu-overlay').forEach(el => el.remove());

    if (menuSublist) {
        menuSublist.classList.remove('pattern-B', 'open');
        menuSublist.style.removeProperty('display'); 
    }

    if (listPattern === 'B' && menuSublist) {
        menuSublist.classList.add('pattern-B');

        const hamLineColor = getV('cfg-ham-line-val');       
        const hamActiveColor = getV('cfg-ham-line-active-val'); 

        // 生成
        const hamBtn = document.createElement('div');
        hamBtn.className = 'hamburger-btn';
        hamBtn.innerHTML = '<span></span><span></span><span></span>';
        const spans = hamBtn.querySelectorAll('span');

        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        phoneContainer.appendChild(hamBtn);
        phoneContainer.appendChild(overlay);

        // 状態復元
        if (wasOpen) {
            hamBtn.classList.add('active');
            menuSublist.classList.add('open');
            overlay.classList.add('show');
            spans.forEach(s => s.style.setProperty('background-color', hamActiveColor, 'important'));
        } else {
            spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
        }

        // クリックイベント
        const toggleMenu = (e) => {
            e.stopPropagation();
            if (hamBtn.classList.contains('active')) {
                hamBtn.classList.remove('active');
                menuSublist.classList.remove('open');
                overlay.classList.remove('show');
                spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
            } else {
                hamBtn.classList.add('active');
                menuSublist.classList.add('open');
                overlay.classList.add('show');
                spans.forEach(s => s.style.setProperty('background-color', hamActiveColor, 'important'));
            }
        };

        hamBtn.onclick = toggleMenu;
        overlay.onclick = (e) => {
            e.stopPropagation();
            hamBtn.classList.remove('active');
            menuSublist.classList.remove('open');
            overlay.classList.remove('show');
            spans.forEach(s => s.style.setProperty('background-color', hamLineColor, 'important'));
        };
    }
}


function apply(el, bg, on, bw, bc, tx, iconColor) {
    if(!el) return;
    
    // ボタン自体のスタイル
    el.style.backgroundColor = bg;
    el.style.setProperty('border', on ? `${bw} solid ${bc}` : 'none', 'important');
    // iOS対策：GPU描画強制
    el.style.transform = 'translateZ(0)'; 
    
    const info = el.querySelector('.button_info');
    if(info) info.style.setProperty('color', tx, 'important');

    // ★アイコン色変更 (iOS決定版: Clip-Path方式)
    const imgDiv = el.querySelector('.button_img');
    const img = el.querySelector('img');

    if (imgDiv && img) {
        // 親枠の設定：overflow:hiddenの代わりにclip-pathを使う
        imgDiv.style.cssText = `
            width: 60px !important;
            height: 60px !important;
            min-width: 60px !important;
            flex: 0 0 60px !important;
            position: relative !important;
            background: transparent !important;
            transform: translateZ(0);
            margin: 0 auto;
            -webkit-mask: none !important;
            mask: none !important;
            /* ★ここが変更点：overflowをやめてclip-pathにする */
            overflow: visible !important;
            clip-path: inset(0px);
            -webkit-clip-path: inset(0px);
        `;

        // 画像の設定
        img.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            position: absolute !important;
            top: 0; left: 0;
            opacity: 1 !important;
            /* 左に飛ばして、右に影を落とす */
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
            filter: drop-shadow(60px 0 0 ${iconColor}) !important;
            -webkit-filter: drop-shadow(60px 0 0 ${iconColor}) !important;
        `;
    }
}

function updateDynamicStyle(css, id = 'dyn-style') {
    let s = document.getElementById(id);
    if(!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s); }
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

    // --- Aパターン ---
    if (selectedPattern === 'A') {
        const b1on = getC('cfg-btn1-border-on');
        const b2on = getC('cfg-btn2-border-on');
        const b1Border = b1on ? `${getV('cfg-btn1-border-w')} solid ${getV('cfg-btn1-border-c-val')}` : 'none';
        const b2Border = b2on ? `${getV('cfg-btn2-border-w')} solid ${getV('cfg-btn2-border-c-val')}` : 'none';
        const icon1 = getV('cfg-btn1-icon-c-val');
        const icon2 = getV('cfg-btn2-icon-c-val');

        return `
    /* --- Aパターン専用 --- */
    .top_button > ul > li { width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; list-style: none; transform: translateZ(0); }
    .top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; text-decoration: none; }
    .button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }

    /* 左ボタン */
    .top_button > ul > li:nth-child(1) { background-color: ${getV('cfg-btn1-bg-val')} !important; border: ${b1Border} !important; }
    .top_button > ul > li:nth-child(1) .button_info { color: ${getV('cfg-btn1-txt-val')} !important; }
    /* 左アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(1) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin: 0 auto; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(1) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
    }

    /* 右ボタン */
    .top_button > ul > li:nth-child(2) { background-color: ${getV('cfg-btn2-bg-val')} !important; border: ${b2Border} !important; }
    .top_button > ul > li:nth-child(2) .button_info { color: ${getV('cfg-btn2-txt-val')} !important; }
    /* 右アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(2) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin: 0 auto; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(2) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon2}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon2}) !important;
    }`;
    }
        
    // --- Bパターン ---
    if (selectedPattern === 'B') {
        const bArea = document.getElementById('pattern-settings-B');
        const cols = bArea.querySelectorAll('.setting-column');
        const getBData = (idx) => {
            const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value, 
                befW: allTxt[4].value, befC: allTxt[5].value, tx: allTxt[6].value 
            };
        };
        const b1 = getBData(0); const b2 = getBData(1);
        const icon1 = getV('cfg-b-btn1-icon-c-val');
        const icon2 = getV('cfg-b-btn2-icon-c-val');

        return `
    /* --- Bパターン専用 --- */
    .top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; transform: translateZ(0); }
    .top_button > ul > li > a { display: flex; align-items: center; padding: 15px 10px; text-decoration: none; }
    .top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; }
    .top_button > ul > li:nth-child(1):before { border-bottom: ${b1.befW} solid ${b1.befC}; border-right: ${b1.befW} solid ${b1.befC}; }
    .top_button > ul > li:nth-child(2):before { border-bottom: ${b2.befW} solid ${b2.befC}; border-right: ${b2.befW} solid ${b2.befC}; }

    /* 左ボタン */
    .top_button > ul > li:nth-child(1) { background-color: ${b1.bg} !important; border: ${b1.on ? b1.bw+' solid '+b1.bc : 'none'} !important; border-radius: ${b1.radius} !important; }
    .top_button > ul > li:nth-child(1) .button_info { color: ${b1.tx} !important; }
    /* 左アイコン */
    .top_button > ul > li:nth-child(1) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin-right: 10px; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(1) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
    }

    /* 右ボタン */
    .top_button > ul > li:nth-child(2) { background-color: ${b2.bg} !important; border: ${b2.on ? b2.bw+' solid '+b2.bc : 'none'} !important; border-radius: ${b2.radius} !important; }
    .top_button > ul > li:nth-child(2) .button_info { color: ${b2.tx} !important; }
    /* 右アイコン */
    .top_button > ul > li:nth-child(2) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin-right: 10px; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(2) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon2}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon2}) !important;
    }`;
    }

    // --- Cパターン ---
    if (selectedPattern === 'C') {
        const cArea = document.getElementById('pattern-settings-C');
        const cols = cArea.querySelectorAll('.setting-column');
        const getCData = (idx) => {
            const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
            return { 
                bg: allTxt[0].value, on: c.querySelector('input[type="checkbox"]').checked, 
                bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value, 
                befW: allTxt[4].value, befC: allTxt[5].value, afterC: allTxt[6].value, tx: allTxt[7].value 
            };
        };
        const c1 = getCData(0); const c2 = getCData(1);
        const icon1 = getV('cfg-c-btn1-icon-c-val');
        const icon2 = getV('cfg-c-btn2-icon-c-val');

        return `
    /* --- Cパターン専用 --- */
    .top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; transform: translateZ(0); }
    .top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 15px 20px 0px; text-decoration: none; font-weight: bold; position: relative; z-index: 2; }
    .button_info { width: 100%; text-align: center; padding: 25px 0 5px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
    .top_button > ul > li:before { content: ""; position: absolute; top: 0; left: 0; width: 15px; height: 15px; z-index: 1; }
    .top_button > ul > li::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 40%; z-index: 0; clip-path: ellipse(70% 90% at 50% 100%); }

    /* 左ボタン */
    .top_button > ul > li:nth-child(1) { background-color: ${c1.bg} !important; border: ${c1.on ? c1.bw+' solid '+c1.bc : 'none'} !important; border-radius: ${c1.radius} !important; }
    .top_button > ul > li:nth-child(1):before { border-bottom: ${c1.befW} solid ${c1.befC}; border-right: ${c1.befW} solid ${c1.befC}; }
    .top_button > ul > li:nth-child(1)::after { background: ${c1.afterC} !important; }
    .top_button > ul > li:nth-child(1) .button_info { color: ${c1.tx} !important; }
    /* 左アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(1) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin: 0 auto; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(1) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
    }

    /* 右ボタン */
    .top_button > ul > li:nth-child(2) { background-color: ${c2.bg} !important; border: ${c2.on ? c2.bw+' solid '+c2.bc : 'none'} !important; border-radius: ${c2.radius} !important; }
    .top_button > ul > li:nth-child(2):before { border-bottom: ${c2.befW} solid ${c2.befC}; border-right: ${c2.befW} solid ${c2.befC}; }
    .top_button > ul > li:nth-child(2)::after { background: ${c2.afterC} !important; }
    .top_button > ul > li:nth-child(2) .button_info { color: ${c2.tx} !important; }
    /* 右アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(2) .button_img { 
    width: 60px !important; height: 60px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin: 0 auto; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(2) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
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

/* ==================== スライダー外枠 ====================== */
.header-slider-wrap { position: relative; z-index: 3 !important; overflow: hidden; top: -50px; margin-bottom: -50px; height: 380px; }
/* ==================== スライダー本体 ====================== */
.header-slider { width: 100%; height: 100%; display: flex; transition: transform 0.8s ease-in-out; touch-action: pan-y; will-change: transform; }
/* ==================== 各スライド ====================== */
.header-slide { width: 100%; height: 100%; flex-shrink: 0; background-size: cover; background-position: center; background-repeat: no-repeat; pointer-events: auto; }
.header-slider-wrap.swiping .header-slide { pointer-events: none; }
/* ==================== ドット ====================== */
.header-dots-wrap { text-align: center; margin-top: 15px; margin-bottom: 0px; }
.header-dots { display: flex; justify-content: center; gap: 8px; }
.header-dots .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(117,117,117,0.5); cursor: pointer; }
.header-dots .dot.active { background: #333; transform: scale(1.2); }
`;
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

// 6. 共通ボタン ＆ オレンジボタンのCSS生成関数
function getPageBtnCSS(isExport = false) {
    const prefix = isExport ? '' : '.mock-screen ';
    const getVLocal = (id) => document.getElementById(id) ? document.getElementById(id).value : '';

    // 1. 通常の共通ボタン
    const bg = getVLocal('cfg-pgbtn-bg-val');
    const txt = getVLocal('cfg-pgbtn-txt-val');
    const radius = getVLocal('cfg-pgbtn-radius');
    const borderOnEl = document.getElementById('cfg-pgbtn-border-on');
    const borderOn = borderOnEl ? borderOnEl.checked : false;
    const borderW = getVLocal('cfg-pgbtn-border-w');
    const borderC = getVLocal('cfg-pgbtn-border-c-val');
    const borderCSS = borderOn ? `border: ${borderW} solid ${borderC} !important;` : `border: none !important;`;

    // 2. オレンジボタン (.page_button.orange)
    const orgBg = getVLocal('cfg-pgbtn-org-bg-val');
    const orgTxt = getVLocal('cfg-pgbtn-org-txt-val');
    const orgRadius = getVLocal('cfg-pgbtn-org-radius');
    const orgBorderOnEl = document.getElementById('cfg-pgbtn-org-border-on');
    const orgBorderOn = orgBorderOnEl ? orgBorderOnEl.checked : false;
    const orgBorderW = getVLocal('cfg-pgbtn-org-border-w');
    const orgBorderC = getVLocal('cfg-pgbtn-org-border-c-val');
    const orgBorderCSS = orgBorderOn ? `border: ${orgBorderW} solid ${orgBorderC} !important;` : `border: none !important;`;

    // ★CSSの優先度（強さ）を上げるために指定を工夫しています
    return `
/* 共通ボタン (.page_button) ※ .orange を除く */
${prefix}a.page_button:not(.orange),
${prefix}.stamp_set a.page_button:not(.orange) {
    background-color: ${bg} !important;
    border-radius: ${radius} !important;
    ${borderCSS}
    text-decoration: none !important;
}
${prefix}a.page_button:not(.orange) > span,
${prefix}.stamp_set a.page_button:not(.orange) > span {
    color: ${txt} !important;
}

/* QR読み取りボタン等 (.page_button.orange) */
${prefix}a.page_button.orange,
${prefix}.stamp_set a.page_button.orange {
    background-color: ${orgBg} !important;
    border-radius: ${orgRadius} !important;
    ${orgBorderCSS}
    text-decoration: none !important;
}
${prefix}a.page_button.orange > span,
${prefix}.stamp_set a.page_button.orange > span {
    color: ${orgTxt} !important;
}
`;
}

// 7. スタンプ詳細ページのCSSを生成する関数
function getStampDetailsCSS() {
    // 取得用ヘルパー
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';

    // 全体枠
    const stdBg = getV('cfg-std-bg-val');
    const stdRadius = getV('cfg-std-radius');
    const stdBorderOn = document.getElementById('cfg-std-border-on')?.checked;
    const stdBorderW = getV('cfg-std-border-w');
    const stdBorderC = getV('cfg-std-border-c-val');
    const borderCSS = stdBorderOn ? `${stdBorderW} solid ${stdBorderC}` : 'none';

    // ★追加：タイトル
    const titleSize = getV('cfg-std-title-size');
    const titleColor = getV('cfg-std-title-val');

    // 有効期限
    const dueTxt = getV('cfg-std-due-txt-val');
    const dueBg = getV('cfg-std-due-bg-val');
    const dueRadius = getV('cfg-std-due-radius');

    // 注意事項 (★文字色を追加)
    const noteSize = getV('cfg-std-note-size');
    const noteTxtColor = getV('cfg-std-note-txt-val'); 
    const noteLineC = getV('cfg-std-note-line-val');

    return `
/* =========================================
スタンプ詳細ページ設定
========================================= */
.stamp_set {
    border-radius: ${stdRadius} !important;
    background-color: ${stdBg} !important;
    border: ${borderCSS} !important;
}
.stamp_title {
    color: ${titleColor} !important;
    font-size: ${titleSize} !important;
}
.stamp_due {
    background-color: ${dueBg} !important;
    border-radius: ${dueRadius} !important;
    color: ${dueTxt} !important;
}
.stamp_note {
    font-size: ${noteSize} !important;
    color: ${noteTxtColor} !important;
    border-bottom: 1px dashed ${noteLineC} !important;
}
`;
}

// --- メイン処理: 生成ボタンクリック時の動作 ---
document.getElementById('generate-btn').onclick = () => {
    
    // ... (既存の背景色取得や switchNoticePattern などの処理) ...
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
    const noticeCSS = getNoticeCSS(true); // お知らせCSS
    const stampDetailsCSS = getStampDetailsCSS();

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

    // ハンバーガーメニューの色設定を取得
    const hamLineColor = getV('cfg-ham-line-val');
    const hamActiveColor = getV('cfg-ham-line-active-val');
    const listPattern = document.querySelector('input[name="list-pattern"]:checked').value;
    
    // 追加するCSS
    let hamburgerCSS = "";
    if (listPattern === 'B') {
        // メニューの背景色と文字色をジェネレーターから取得
        const listBgColor = getV('cfg-list-bg-val');
        const listTxtColor = getV('cfg-list-txt-val');

        hamburgerCSS = `
    /* ====== ハンバーガーボタン ====== */
    .hamburger-btn { position: fixed; top: 18px; right: 20px; width: 28px; height: 20px; cursor: pointer; z-index: 1001; display: flex; flex-direction: column; justify-content: space-between; }
    .hamburger-btn span { display: block; height: 3px; border-radius: 2px; transition: all 0.3s ease; transform-origin: center center; }

    /* ★ジェネレーターの「線の色」を反映 */
    .hamburger-btn span { background-color: ${hamLineColor} !important; }
    .hamburger-btn.active span { background-color: ${hamActiveColor} !important; }

    /* ✕アニメーション */
    .hamburger-btn.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger-btn.active span:nth-child(2) { opacity: 0; }
    .hamburger-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

    /* ====== メニュー全体（右スライド＋スクロール可） ====== */
    .menu-sublist { position: fixed; top: 0; right: -100%; width: 100%; height: 100vh; box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2); z-index: 1000; transition: right 0.35s ease; padding: 60px 20px 40px; box-sizing: border-box; overflow-y: auto; -webkit-overflow-scrolling: touch; margin-top: 0; }

    /* ★ジェネレーターの「メニュー背景色」を反映 */
    .menu-sublist.open { right: 0; background-color: ${listBgColor} !important; }

    /* メニュー内リンク */
    .menu-sublist ul { list-style: none; padding: 0; margin: 0; }
    .menu-sublist li { margin-bottom: 20px; padding: 0; }

    /* ★ジェネレーターの「文字色」を反映 */
    .menu-sublist a { text-decoration: none; font-size: 15px; font-weight: 600; color: ${listTxtColor} !important; }
    .modal-wrapper { z-index: 1010; }

    /* ====== 背景の半透明オーバーレイ ====== */
    .menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.4); z-index: 999; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
    .menu-overlay.show { opacity: 1; visibility: visible; }
    `;
    }

    // ★★★【追加】フッターアイコン画像のCSS生成 ★★★
    let footerIconCSS = "";
    // iconImagesオブジェクト（script.js上部で定義済み）をループしてCSSを作る
    Object.keys(iconImages).forEach(key => {
        let url = iconImages[key];
        // officialの場合は入力欄の値を使う
        if (key === 'official') {
            url = getV('cfg-official-url');
        }
        // CSS生成: .home .icon { background-image: ... }
        footerIconCSS += `#sp-fixed-menu li.${key} .icon { background-image: url('${url}'); }\n`;
    });
    // ★★★ 追加ここまで ★★★


    // --- 【1】JavaScriptコードの組み立て ---
    const menuItems = getMenuItems();
    const headerPattern = document.querySelector('input[name="header-pattern"]:checked').value;
    
    // ★追加：ヘッダーBパターン用の超長スクリプト
    let headerBScript = "";
    if (headerPattern === 'B') {
        headerBScript = `
    /* お知らせ・スライダー機能 (Header Pattern B) */
    $(window).on('load', function () {
    setTimeout(function () {
    /* ======================================================
        ★ スライダー処理
    ====================================================== */
    function buildSlider() {
    $('.header-slider-wrap, .header-dots-wrap, .header-slider, .header-slide').remove();
    if ($('.header-slider-wrap').length === 0) {
        $('header.top').after(\`
        <div class="header-slider-wrap">
            <div class="header-slider"></div>
        </div>
        <div class="header-dots-wrap">
            <div class="header-dots"></div>
        </div>
        \`);
    }
    let carouselImages = [];
    let carouselLinks = [];
    $('.notice_list dt').each(function () {
    const text = $(this).text().trim();
    if (text.includes('↔️')) {
        const cleaned = text.replace('↔️', '').trim();
        const $notice = $(this).closest('.notice_list');
        const imgSrc = $notice.find('p img').attr('src');
        if (imgSrc) carouselImages.push(imgSrc);
        let link = null;
        const href = $notice.find('a').attr('href') || null;
        if (/^https?:\\/\\/[^\\s]+$/i.test(cleaned)) {
            link = cleaned;
        }
        else if (cleaned === "リンクあり") {
            link = href;
        }
        else {
            link = null;
        }
        carouselLinks.push(link);
        $notice.hide();
    }
    });
    if (carouselImages.length === 1) {
        $('.header-dots-wrap').hide();
    }
    if (carouselImages.length === 0) return;
    const $wrap = $('.header-slider-wrap');
    const $slider = $('.header-slider');
    $wrap.css('height', '380px');
    $slider.html("");
    let index = 1;
    if (carouselImages.length === 1) {
        const bg = carouselImages[0];
        const link = carouselLinks[0];
        if (link) {
        $slider.html(\`<a href="\${link}" class="header-slide" style="background-image:url('\${bg}')"></a>\`);
        } else {
        $slider.html(\`<div class="header-slide" style="background-image:url('\${bg}')"></div>\`);
        }
        return;
    }
    const loopImages = [
        carouselImages[carouselImages.length - 1],
        ...carouselImages,
        carouselImages[0]
    ];
    const loopLinks = [
        carouselLinks[carouselLinks.length - 1],
        ...carouselLinks,
        carouselLinks[0]
    ];
    loopImages.forEach((src, i) => {
        const link = loopLinks[i];
        if (link) {
        $slider.append(\`<a href="\${link}" class="header-slide" style="background-image:url('\${src}')"></a>\`);
        } else {
        $slider.append(\`<div class="header-slide" style="background-image:url('\${src}')"></div>\`);
        }
    });
    const total = loopImages.length;
    function clampIndex() {
        if (index < 0) index = 1;
        if (index > total - 1) index = total - 2;
    }
    function applyTransform() {
        clampIndex();
        $slider.css('transform', \`translateX(-\${index * 100}%)\`);
    }
    $slider.css({ transition: 'none', transform: \`translateX(-\${index * 100}%)\` });
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        applyTransform();
        });
    });
    setTimeout(() => {
        $slider.css('transition', 'transform 0.8s ease-in-out');
    }, 30);
    let dotsHtml = '';
    carouselImages.forEach((_, i) => {
        dotsHtml += \`<span class="dot" data-index="\${i}"></span>\`;
    });
    $('.header-dots').html(dotsHtml);
    function updateDots() {
        const realIndex = (index - 1 + carouselImages.length) % carouselImages.length;
        $('.header-dots .dot').removeClass('active');
        $(\`.header-dots .dot[data-index="\${realIndex}"]\`).addClass('active');
    }
    updateDots();
    if (window.__sliderTimer) clearInterval(window.__sliderTimer);
    window.__sliderTimer = setInterval(() => {
        index++;
        clampIndex();
        applyTransform();
        updateDots();
    }, 3500);
    $slider.on('transitionend', function () {
        if (index === total - 1) {
        $slider.css('transition', 'none');
        index = 1;
        applyTransform();
        setTimeout(() => {
            $slider.css('transition', 'transform 0.8s ease-in-out');
        }, 30);
        }
        clampIndex();
    });
    if (carouselImages.length >= 2) {
        let startX = 0, currentX = 0, isDragging = false;
        $wrap.on('touchstart', function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        $slider.css('transition', 'none');
        });
        $wrap.on('touchmove', function (e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        let diff = currentX - startX;
        $slider.css('transform', \`translateX(calc(-\${index * 100}% + \${diff}px))\`);
        });
        $wrap.on('touchend', function () {
        if (!isDragging) return;
        isDragging = false;
        let diff = currentX - startX;
        if (diff > 50) index--;
        else if (diff < -50) index++;
        $slider.css('transition', 'transform 0.3s ease');
        clampIndex();
        applyTransform();
        updateDots();
        });
    }
    }
    buildSlider();
    $('.notice_list dt').each(function () {
        const text = $(this).text().trim();
        const $dl = $(this).closest('dl');
        const $a = $(this).closest('a');
        const isNoTitle = (text === 'タイトル無し' || text === '');
        const isURL = /^https?:\\/\\/[^\\s]+$/i.test(text);
        if (isNoTitle) {
        $dl.hide().addClass('hidden-dl-force');
        } else if (isURL) {
        let url = text;
        if (!url.includes('?') && !url.includes('#') && !url.endsWith('/')) {
            url += '/';
        }
        $a.attr({
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer'
        });
        $(this).text('');
        $dl.hide().addClass('hidden-dl-force');
        }
    });
    $('.landing_title').each(function () {
        const text = $(this).text().trim();
        const $landingSet = $(this).closest('.landing_set');
        const isNoTitle = (text === 'タイトル無し' || text === '');
        const isURL = /^https?:\\/\\/[^\\s]+$/i.test(text);
        if (isNoTitle || isURL) {
        $(this).hide().addClass('hidden-title-force');
        $landingSet.css({
            padding: '20px 0 10px 0'
        }).addClass('adjusted-padding');
        }
    });
    $('.notice_list dt').each(function () {
        const text = $(this).text().trim();
        if (text.includes('ℹ️')) {
        const $notice = $(this).closest('.notice_list');
        const $a = $notice.find('a');
        const url = $a.attr('href');
        const cleanText = text.replace('ℹ️', '').trim();
        $('.top_button').before(\`
            <div class="info-banner">
            <a href="\${url}" rel="noopener noreferrer">
                <p><span class="info-icon">i</span> \${cleanText}</p>
            </a>
            </div>
        \`);
        $notice.hide().addClass('hidden-info-notice');
        }
    });
    $('.landing_title').each(function () {
        const text = $(this).text().trim();
        if (text.includes('ℹ️')) {
        $(this).text(text.replace('ℹ️', '').trim());
        }
    });
    $('.landing_title').each(function () {
        const text = $(this).text().trim();
        if (text.includes('↔️')) {
        $(this).hide().addClass('hidden-slider-title');
        $(this).closest('.landing_set')
            .css({ padding: '20px 0 10px 0' })
            .addClass('adjusted-padding');
        }
    });
    $('.landing_title').each(function () {
        if (!$(this).hasClass('hidden-title-force') &&
            !$(this).hasClass('hidden-slider-title')) {
        $(this).css('visibility', 'visible');
        }
    });
    (function () {
        $('.notice_list dt').each(function () {
        const text = $(this).text().trim();
        if (text.includes('↔️')) {
            $(this).closest('.notice_list')
            .hide()
            .addClass('hidden-slider-notice');
        }
        });
        let hasNormalNotice = false;
        $('.notice_list dt').each(function () {
        const text = $(this).text().trim();
        if (!text.includes('↔️') && !text.includes('ℹ️') && text !== '' && text !== 'タイトル無し' && !/^https?:\\/\\/[^\\s]+$/i.test(text)) {
            hasNormalNotice = true;
        }
        });
        if (!hasNormalNotice) {
        $('h3.titleh3:contains("お知らせ")').hide();
        }
    })();
    (function () {
        const currentTitle = document.title.trim();
        const shouldReplace = currentTitle === "" || currentTitle === "タイトル無し" || currentTitle.includes("↔️") || currentTitle.includes("ℹ️");
        if (shouldReplace) {
            document.title = "お知らせ";
        }
    })();
    $('.notice_list').each(function (i) {
        const $el = $(this);
        setTimeout(function () {
        $el.addClass('show');
        }, i * 100);
    });
    $('.landing_set').css('opacity', 0);
    $('.landing_note').css('opacity', 0);
    setTimeout(function () {
        $('.landing_set').each(function (i) {
        const $set = $(this);
        const $note = $set.find('.landing_note');
        setTimeout(function () {
            $set.css('opacity', 1);
            $note.css('opacity', 1);
        }, i * 120);
        });
    }, 30);
    window.addEventListener("pageshow", function(event) {
        if (event.persisted) {
        console.log("🔥 BFCache 復元 → スライダー再構築発動");
        $('.header-slider-wrap').remove();
        $('.header-dots-wrap').remove();
        $('.header-slider').remove();
        $('.header-slide').remove();
        setTimeout(() => {
            buildSlider();
        }, 100);
        }
    });
    }, 300);
    });
    `;
    }

    let hamburgerScript = "";
    if (listPattern === 'B') {
        hamburgerScript = `
/* ハンバーガー機能 */
$(function() {
$('body').append('<div class="hamburger-btn"><span></span><span></span><span></span></div>');
$('body').append('<div class="menu-overlay"></div>');
$('.hamburger-btn').on('click', function() {
    $(this).toggleClass('active');
    $('.menu-sublist').toggleClass('open');
    $('.menu-overlay').toggleClass('show');
});
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
${headerBScript}
<\/script>`;

    // --- 【2】CSSコードの組み立て ---
    const cssOutput = `<style type="text/css">
/* ページ全体の設定 */
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
${stampDetailsCSS}
${pageBtnCSS}
${hamburgerCSS}
${noticeCSS}

/* フッター固定メニュー */
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${getV('cfg-bg-val')}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${getV('cfg-txt-val')}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }

/* ★ここに生成したアイコンCSSを追加 */
${footerIconCSS}

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
                input.name === 'list-pattern' || 
                input.name === 'notice-pattern') { 
                
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
            key === 'list-pattern' ||
            key === 'notice-pattern') {
            
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
    switchListPattern();
    switchNoticePattern();

    updatePreview();
}


// ★リストパターンの設定エリアの表示/非表示を切り替える関数
function switchListPattern() {
    const listPatternEl = document.querySelector('input[name="list-pattern"]:checked');
    if (!listPatternEl) return;

    const pattern = listPatternEl.value;
    const targetDiv = document.getElementById('list-pattern-B-settings'); // 先ほど追加した設定エリアのID

    if (targetDiv) {
        if (pattern === 'B') {
            targetDiv.style.display = 'block'; // Bなら表示
        } else {
            targetDiv.style.display = 'none';  // Aなら非表示
        }
    }
}
// ★お知らせ用CSSを生成する関数
function getNoticeCSS(isExport = false) {
    const patternEl = document.querySelector('input[name="notice-pattern"]:checked');
    if (!patternEl) return "";
    
    const pattern = patternEl.value;

    // 設定値を取得
    const size = document.getElementById('cfg-notice-size').value;
    const color = document.getElementById('cfg-notice-color-val').value;

    // ★重要：プレビュー時は .mock-screen、出力時は body.top に自動で切り替える
    const prefix = isExport ? 'body.top' : '.mock-screen';

    // ★共通CSS（文字サイズ・色の変更）
    let css = `
/* タイトル部分の文字サイズ・色変更 */
${prefix} .notice_list > a > dl > dt {
    font-size: ${size}px !important;
    color: ${color} !important;
}
/* スマホ時の微調整 */
@media (max-width: 480px) {
    ${prefix} .notice_list > a > dl > dt { font-size: ${Math.max(10, size - 0.5)}px !important; }
}
`;

    if (pattern === 'A') return css;

    if (pattern === 'B') {
        css += `
/* =========================================
お知らせカード（横いっぱい画像＋下白テキスト）＆MVカルーセル
========================================= */
${prefix} .notice_set { margin: 10px 20px 50px !important; box-shadow: none !important; background: transparent !important; }
${prefix} .notice_list { border-radius: 16px !important; overflow: hidden !important; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08) !important; margin-bottom: 20px !important; background: #fff !important; transition: transform 0.2s ease, box-shadow 0.2s ease !important; border: none !important; }
${prefix} .notice_list:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 14px rgba(0,0,0,0.15) !important; }
${prefix} .notice_list > a { display: flex !important; flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; text-decoration: none !important; color: inherit !important; padding: 0 !important; }
${prefix} .notice_list p { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 210px !important; overflow: hidden !important; display: block !important; position: relative !important; background: #f2f2f2 !important; }
${prefix} .notice_list p img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center !important; display: block !important; }
${prefix} .notice_list > a > dl { width: 100% !important; background: #fff !important; margin: 0 !important; padding: 15px 20px 15px !important; text-align: center !important; display: block !important; box-sizing: border-box !important; }
${prefix} .notice_list > a > dl > dt { line-height: 1.7 !important; margin: 0 !important; text-align: left !important; font-weight: 700 !important; }
@media (max-width: 480px) {
    ${prefix} .notice_list p { height: 130px !important; }
}
.notice_list { opacity: 0 !important; visibility: hidden !important; }
.notice_list.show { opacity: 1 !important; visibility: visible !important; transition: opacity 0.4s ease !important; }
${prefix} .hidden-dl-force { display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; margin: 0 !important; padding: 0 !important; }

.info-banner { background: #f8f9fa; border-bottom: 1px solid #ddd; text-align: center; padding: 10px 15px; margin: 0px 0px 0px; }
.info-banner a { color: #000; text-decoration: none; font-weight: 500; font-size: 12px; }
.info-banner p { text-align: left; margin: 0; }
.info-banner a:hover { text-decoration: underline; }
.info-icon { display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; font-weight: bold; border-radius: 50%; background: #000; color: #fff; margin-right: 6px; font-size: 13px; vertical-align: middle; }
@keyframes fadeSlideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;
    }
    return css;
}

// ★お知らせパターンの設定エリアの表示/非表示を切り替える関数
function switchNoticePattern() {
    const patternEl = document.querySelector('input[name="notice-pattern"]:checked');
    if (!patternEl) return;
    
    const pattern = patternEl.value;
    const target = document.getElementById('notice-pattern-b-settings');
    
    if (target) {
        target.style.display = 'block';
    }
}



// ページをリロードして初期状態を反映
document.getElementById('reset-btn').onclick = () => {
    if (confirm("すべての設定を初期状態にリセットしますか？")) {
        // 1. LocalStorageのデータを削除
        localStorage.removeItem('generator_backup');
        location.reload();
    }
};