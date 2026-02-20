/* ==========================================================
   設定データ・定数定義
   ========================================================== */

// フッター固定メニュー　アイコン
const iconImages = {
    home: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/G7NN1cykJDexyrf7W3sY.png",
    stamp: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/11vmbKPoZKbaDsS6AnC8.png",
    user: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/E3WFqdsnqvH99pgwlK5L.png",
    ticket: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/qwb7BN3RXESAD0krnj5v.png",
    history: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/s1WjgAYhCT5YkwteDBW1.png",
    reservation: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/fAZsRqTheewTc01HDN4c.png",
    map: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/l8lm4e55dWmksNmI67cP.png",
    official: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/10SUTh364ZEmm6ZUueCC.png"
};

// ヘッダーアイコン
const snsIcons = {
    x: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/c7uwfrlxGLtGgicoRX1M.png",
    instagram: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/00C99O6v3QOXHIznyxCw.png",
    facebook: "https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/BU2IujPW7US3seAdc4nT.png",
    other: "" // 任意入力用
};

// 別画面のテンプレート（スタンプ帳一覧・チケット一覧・その他）
const screens = {
    top: "", // 初期化時に現在のHTMLを保存
    
    // スタンプ帳一覧
    stamp: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
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
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,

    // スタンプ詳細
    stamp_details: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <div class="stamp_set" style="padding: 20px; margin: 15px;">
            <h3 class="stamp_title">レストラントレタ来店スタンプ</h3>
            <div style="margin-bottom: 0px;">
                <span class="stamp_due" style="font-size: 10px;">有効期限：2027年02月14日</span>
            </div>
            <p class="stamp_note">お得なチケットは、来店3回来店ごとにお得なチケットをプレゼント！<br>ご来店お待ちしております！</p>
            
            <div class="stamp_wrapper" style="text-align: center; margin: 20px 0; padding: 0;">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/Ad0xVj96ubnYL40GtQCi.png" alt="" style="width: 25%;">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/rGXbgv33qZPRED56WnWc.png" alt="" style="width: 25%">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/rGXbgv33qZPRED56WnWc.png" alt="" style="width: 25%;">
            </div>
            
            <div class="stamp_button" style="text-align: center; margin: 0 10px">
                <a class="page_button orange" href="#" style="text-decoration: none; padding: 3px 5px;"><span style="font-size:12px;">QRコード読み取り</span></a>
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
               <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
               <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
               <li><a href="#">スタンプ/チケットの使い方</a></li>
               <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,

    // チケット一覧
    ticket: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>    
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <h3 class="titleh3"><b>チケット一覧</b>
            <select class="ticket_sort_select" style="font-size:10px; padding:5px 2px;">
                <option>有効期限順 ▼</option>
            </select>
        </h3>
        <div id="coupon-list">
            <div class="ticket_list_set">
                <div class="ticket_list">
                    <a href="#">
                        <p><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/j25fdwy2uJ1ykNwKelCg.png" alt=""></p>
                        <dl><dt>お好きなピザプレゼント</dt></dl>
                    </a>
                    <dl class="ticket_list_bottom">
                        <dt><span class="ticket_list_due">有効期限：2026/02/24</span></dt>
                    </dl>
                </div>
            </div>
            <div class="ticket_list_set used">
                <div class="ticket_list">
                    <a>
                    <p><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/den7ZxsbI7usqqeACj7Q.png" alt=""></p>
                    <dl><dt>お好きなピザプレゼント</dt></dl>
                    </a>
                    <dl class="ticket_list_bottom">
                        <dt><span class="ticket_list_due">利用日時：2026/02/17 18:48:21</span></dt>
                        <dd><a href="#" class="stamp_card_delete_btn">削除</a></dd>
                    </dl>
                </div>
            </div>
            <div class="ticket_list_set expired">
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
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,

    // チケット詳細ページ
    ticket_detail: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <p class="ticket_notice" style="margin: 0 0 10px;">
            ★おめでとうございます★
        </p>

        <div class="ticket_set">
            <div class="ticket_img">
                <img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/j25fdwy2uJ1ykNwKelCg.png" alt="お好きなピザプレゼント" style="width:100%; display:block;">
            </div>

            <h3 class="ticket_title">お好きなピザプレゼント</h3>

            <span class="ticket_due">有効期限：2026/05/19</span>

            <p class="ticket_note">※チケットご利用時にスタッフにお見せください。<br>※メニュー内にあるデザートと引き換える事が可能です。<br>※1回のみご利用いただけます。<br>※他のチケットと併用可能です。</p>
            
            <div class="stamp_button">
                <a class="page_button orange" href="#" style="text-decoration: none; padding: 3px 5px;"><span style="font-size:12px;">チケットを利用する</span></a>
                
            </div>
        </div>

        <div class="stamp_button">
            <a class="page_button to-ticket clickable" href="#"><span>チケット一覧へ</span></a>
        </div>
        <div class="stamp_button">
            <a class="page_button to-history clickable" href="#"><span>スタンプ履歴へ</span></a>
        </div>
        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ</span></a>
        </div>

        <div class="menu-sublist">
            <ul>
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,
    user: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <div class="profile_set">
            <form class="form">
                <h3 class="profile_title">会員ID</h3>
                <div class="formset">
                    <div class="txfmset d-flex">
                        <p id="user_id">*************</p>
                    </div>
                </div>

                <h3 class="profile_title" style="margin: -20px 0 0 0;">メールアドレス変更</h3>
                <p class="profile_note">メールアドレスを変更する場合は以下より変更してください。</p>
                
                <div class="formset">
                    <h4>現在のメールアドレス</h4>
                    <div class="txfmset d-flex" >
                        <p id="user_email">yamada@toreta.in</p>
                    </div>
                    
                    <h4 style="margin-top:10px;">変更後のメールアドレス</h4>
                    <div class="txfmset">
                        <input type="email" name="email" value="">
                    </div>
                    
                    <h4 style="margin-top:10px;">変更後のメールアドレス（確認用）</h4>
                    <div class="txfmset">
                        <input type="email" name="check_mail" value="">
                    </div>
                </div>

                <div class="stamp_button">
                    <button type="button" class="page_button orange submit idChangeConfirm disabled" disabled=""><span>変更する</span></button>
                </div>
                <p class="borderDash"></p>
            </form>

            <div style="padding:15px 0;">
                <div class="stamp_button">
                    <a class="page_button orange" href="#" style="text-decoration: none;"><span>ログアウト</span></a>
                </div>
                <div class="stamp_button">
                    <a class="page_button orange" href="#" style="text-decoration: none;"><span>退会する</span></a>
                </div>
            </div>
        </div>

        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ</span></a>
        </div>

        <div class="menu-sublist">
            <ul>
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,
    // スタンプ履歴ページ
    history: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <div class="top_button">
            <ul>
                <li>
                    <a href="#" class="to-stamp clickable">
                        <div class="button_img">
                            <img src="https://toretastamp-stg.s3.amazonaws.com/static/front/images/stamp.svg" alt="">
                        </div>
                        <div class="button_info">スタンプ帳</div>
                    </a>
                </li>
                <li>
                    <a href="#" class="to-ticket clickable">
                        <div class="button_img">
                            <img src="https://toretastamp-stg.s3.amazonaws.com/static/front/images/ticket.svg" alt="">
                        </div>
                        <div class="button_info">チケット一覧</div>
                    </a>
                </li>
            </ul>
        </div>

        <h3 class="titleh3"><b>スタンプ履歴</b></h3>

        <div class="stamp_set" style="margin-bottom:10px;"> 
            <h3 class="stamp_list_title">来店スタンプ</h3>
            <dl><dt><span class="stamp_shop">店舗：レストラントレタ</span></dt></dl>
            <dl><dt><span class="ticket_list_due">獲得日:2026年02月18日 14:39</span></dt></dl>
            <dl class="ticket_list_bottom stamp">
                <dt class="stampicon"><b><span></span></b><span class="stamp_num">5ポイント獲得</span></dt>
            </dl>
        </div>

        <div class="stamp_set" style="margin-bottom:10px;"> 
            <h3 class="stamp_list_title">来店スタンプ</h3>
            <dl><dt><span class="stamp_shop">店舗：レストラントレタ</span></dt></dl>
            <dl><dt><span class="ticket_list_due">獲得日:2026年02月01日 12:29</span></dt></dl>
            <dl class="ticket_list_bottom stamp">
                <dt class="stampicon"><b><span></span></b><span class="stamp_num">1ポイント獲得</span></dt>
            </dl>
        </div>
        
        <div class="stamp_button">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ戻る</span></a>
        </div>
        
        <div class="menu-sublist">
            <ul>
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,
    // screens オブジェクト内に追加
    notice_detail: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <div class="landing_set show">
            <h3 class="landing_title">◯◯◯◯のお知らせ</h3>
            <div class="landing_note"">
                テキスト<br><br>
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br><br>
                テキストテキストテキストテキストテキストテキストテキストテキスト<br><br><br>
                テキストテキストテキストテキスト
                <br><br><br><br>
            </div>
        </div>
        <div class="stamp_button" style="margin-top: 20px;">
            <a class="page_button back-to-top clickable" href="#"><span>トップへ戻る</span></a>
        </div>
        <div class="menu-sublist">
            <ul>
                <li><a href="#" class="to-history clickable">スタンプ履歴</a></li>
                <li><a href="#" class="to-user clickable">登録情報の変更</a></li>
                <li><a href="#">スタンプ/チケットの使い方</a></li>
                <li><a href="#">お問い合わせ</a></li>
            </ul>
        </div>
    </section>
    `,
};

const menuList = document.getElementById('menu-list');
const previewUl = document.getElementById('preview-ul');

// 初期化 ---
if (window.Sortable && menuList) {
    Sortable.create(menuList, {
        animation: 150, handle: '.drag-handle', ghostClass: 'sortable-ghost',
        onEnd: function() { relabelItems(); updatePreview(); saveToLocal(); } 
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

/* --- SNSアイテム入力欄の生成 --- */
function createSnsItem() {
    const snsList = document.getElementById('sns-list');
    if (!snsList) return;
    if (snsList.children.length >= 4) return alert("最大4個までです");

    const div = document.createElement('div');
    div.className = 'menu-item sns-item';
    div.innerHTML = `
        <button class="btn-remove" onclick="this.parentElement.remove(); saveToLocal(); updatePreview();">
            <i class="fa fa-times"></i>
        </button>
        <div class="form-grid">
            <div class="form-group">
                <label>アイコン</label>
                <select class="field-sns-type" onchange="toggleSnsOtherInput(this); updatePreview();">
                    <option value="x">X</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="other">その他(URL指定)</option>
                </select>
            </div>
            <div class="form-group">
                <label>リンクURL</label>
                <input type="text" class="field-sns-href" oninput="updatePreview()" placeholder="https://...">
            </div>
            <div class="form-group field-sns-other-url-wrap" style="display:none;">
                <label>カスタム画像URL</label>
                <input type="text" class="field-sns-other-url" oninput="updatePreview()" placeholder="https://...">
            </div>
            <div class="form-group" style="flex-direction:row; align-items:center; gap:8px;">
                <input type="checkbox" class="field-sns-ext" onchange="updatePreview()" checked> 
                <label style="margin:0;">別タブ</label>
            </div>
        </div>`;
    
    snsList.appendChild(div);
    updatePreview();
}


function toggleSnsOtherInput(select) {
    const wrap = select.closest('.sns-item').querySelector('.field-sns-other-url-wrap');
    if(wrap) wrap.style.display = (select.value === 'other') ? 'block' : 'none';
}

// HTML側にボタンがある前提でイベント登録
const addSnsBtn = document.getElementById('add-sns-btn');
if(addSnsBtn) addSnsBtn.onclick = () => createSnsItem();



const syncPairs = [
    // 共通・Aパターン・Bパターン
    ['cfg-body-bg', 'cfg-body-bg-val'],
    ['cfg-font-family-select', 'cfg-font-family-custom'],
    ['cfg-btn1-icon-c', 'cfg-btn1-icon-c-val'],
    ['cfg-btn2-icon-c', 'cfg-btn2-icon-c-val'],
    ['cfg-b-btn1-icon-c', 'cfg-b-btn1-icon-c-val'],
    ['cfg-b-btn2-icon-c', 'cfg-b-btn2-icon-c-val'],
    ['cfg-c-btn1-icon-c', 'cfg-c-btn1-icon-c-val'],
    ['cfg-c-btn2-icon-c', 'cfg-c-btn2-icon-c-val'],
    
    // ★ヘッダー用
    ['cfg-header-bg', 'cfg-header-bg-val'],
    ['cfg-header-text-c', 'cfg-header-text-c-val'],
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
    ['cfg-std-due-border-c', 'cfg-std-due-border-c-val'],
    ['cfg-std-note-line-c', 'cfg-std-note-line-val'],
    ['cfg-std-title-c', 'cfg-std-title-val'],
    ['cfg-std-note-txt-c', 'cfg-std-note-txt-val'],
    // チケット一覧
    ['cfg-ticket-bg', 'cfg-ticket-bg-val'],
    ['cfg-ticket-line-c', 'cfg-ticket-line-val'],
    ['cfg-ticket-title-c', 'cfg-ticket-title-val'],
    ['cfg-ticket-due-c', 'cfg-ticket-due-val'],
    ['cfg-ticket-due-bg', 'cfg-ticket-due-bg-val'],
    ['cfg-ticket-border-c', 'cfg-ticket-border-c-val'],
    ['cfg-ticket-due-border-c', 'cfg-ticket-due-border-c-val'],
    // チケット詳細用
    ['cfg-td-card-bg', 'cfg-td-card-bg-val'],
    ['cfg-td-card-border-c', 'cfg-td-card-border-c-val'],
    ['cfg-td-notice-c', 'cfg-td-notice-val'],
    ['cfg-td-title-c', 'cfg-td-title-val'],
    ['cfg-td-due-bg', 'cfg-td-due-bg-val'],
    ['cfg-td-note-c', 'cfg-td-note-val'],
    ['cfg-td-due-c', 'cfg-td-due-val'],
    // マイページ
    ['cfg-user-card-bg', 'cfg-user-card-bg-val'],
    ['cfg-user-card-border-c', 'cfg-user-card-border-c-val'],
    ['cfg-user-title-c', 'cfg-user-title-val'],
    ['cfg-user-note-c', 'cfg-user-note-val'],
    ['cfg-user-btn-disabled-bg', 'cfg-user-btn-disabled-bg-val']
];
syncPairs.forEach(pair => setupSync(pair[0], pair[1]));

// フッター固定メニュー　
function relabelItems() {
    document.querySelectorAll('.menu-item').forEach((item, index) => { 
        const h = item.querySelector('.menu-item-header');
        if(h) h.textContent = `ITEM ${index + 1}`; 
    });
}

/* ==========================================================
   UIプレビュー層（各パーツの反映処理）
   ========================================================== */
   function updatePreview() {
    const mock = document.querySelector('.mock-screen');
    const phoneContainer = document.querySelector('.phone-mock');
    if (!mock || !phoneContainer) return;

    // --- 1. ヘルパー関数の定義 (関数の最初で行う) ---
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

    // --- 2. フォント設定の反映 ---
    const selectedFont = getV('cfg-font-family-select');
    const customFont = getV('cfg-font-family-custom');
    const finalFont = customFont ? customFont : selectedFont;

    // スマホプレビュー（.mock-screen）のみに適用
    mock.style.setProperty('font-family', `${finalFont}, sans-serif`, 'important');

    // --- 3. カラーピッカーの同期 (ヘッダー文字色など) ---
    const picker = document.getElementById('cfg-header-text-c');
    const textVal = document.getElementById('cfg-header-text-c-val');
    if (picker && textVal) {
        textVal.value = picker.value.toUpperCase();
    }

    // CSS一括適用
    applyCurrentDesignToMock();

    const isSubScreen = mock.dataset.currentScreen === 'stamp' 
                      || mock.dataset.currentScreen === 'ticket' 
                      || mock.dataset.currentScreen === 'stamp_details' 
                      || mock.dataset.currentScreen === 'ticket_detail'
                      || mock.dataset.currentScreen === 'user'
                      || mock.dataset.currentScreen === 'history'
                      || mock.dataset.currentScreen === 'notice_detail';
    
    const previewUl = document.getElementById('preview-ul');
    if(!previewUl) return;
    previewUl.innerHTML = '';
    

    // ---------------------------------------------------------
    // A. ヘッダー設定（トップページのみ）
    // ---------------------------------------------------------
    if (!isSubScreen) {
        const headerPattern = document.querySelector('input[name="header-pattern"]:checked')?.value || 'A';
        const bSettings = document.getElementById('header-b-settings');
        const headerTop = mock.querySelector('header.top');
        const headerH1 = headerTop?.querySelector('h1.top');
        const headerSpan = headerH1?.querySelector('span');
        let sliderWrap = mock.querySelector('.header-slider-wrap');

        if (headerPattern === 'B') {
            // --- パターンB (スライダーあり) ---
            if(bSettings) bSettings.style.display = 'block';
            if(headerSpan) headerSpan.style.display = 'none';

            if(headerTop) {
                headerTop.style.setProperty('display', 'flex', 'important');
                headerTop.style.setProperty('justify-content', 'flex-start', 'important');
                headerTop.style.setProperty('padding-left', '0px', 'important');
                headerTop.style.setProperty('background-color', 'transparent', 'important');
                headerTop.style.setProperty('background-image', 'none', 'important');
                headerTop.style.height = '50px';
            }
            if(headerH1) {
                headerH1.style.setProperty('margin', '0px 0 0 0', 'important');
                headerH1.style.setProperty('width', '100px', 'important');
            }
            
            if (!sliderWrap && headerTop) {
                const wrap = document.createElement('div');
                wrap.className = 'header-slider-wrap';
                wrap.style.height = '250px'; // スライダーの高さ
                wrap.innerHTML = `<div class="header-slider"><div class="header-slide"></div></div>`;
                headerTop.after(wrap);
                sliderWrap = wrap;
            }
            const slide = sliderWrap?.querySelector('.header-slide');
            if(slide) slide.style.backgroundImage = `url('${getV('cfg-header-main-img')}')`;

        } else {
            // --- パターンA (標準) ---
            if(bSettings) bSettings.style.display = 'none';

            if(headerTop) {
                const mainImgUrl = getV('cfg-header-main-img');
                const isHeaderBgNone = document.getElementById('cfg-header-bg-none')?.checked;
        
                if (mainImgUrl) {
                    // ★リッチ背景画像モード
                    headerTop.style.setProperty('display', 'flex', 'important');
                    headerTop.style.setProperty('justify-content', 'center', 'important');
                    headerTop.style.setProperty('height', '270px', 'important');
                    headerTop.style.setProperty('background-image', `url('${mainImgUrl}')`, 'important');
                    headerTop.style.setProperty('background-color', 'initial', 'important');
                    headerTop.style.setProperty('background-size', 'cover', 'important');
                    headerTop.style.setProperty('background-position', 'bottom', 'important');
                } else {
                    // ★シンプル背景色モード
                    headerTop.style.display = '';
                    headerTop.style.justifyContent = '';
                    headerTop.style.height = ''; 
                    headerTop.style.backgroundImage = 'none';
                    headerTop.style.setProperty('background-color', getV('cfg-header-bg-val'), 'important');
                    
                    const hColor = isHeaderBgNone ? 'transparent' : getV('cfg-header-bg-val');
                    headerTop.style.setProperty('background-color', hColor, 'important');
                }
                
                headerTop.style.setProperty('position', 'relative', 'important');
                headerTop.style.setProperty('z-index', '99', 'important');
            }
            if(headerH1) {
                headerH1.style.margin = '';
                headerH1.style.width = '';
            }
            if(headerSpan) {
                headerSpan.style.display = '';
                headerSpan.style.setProperty('color', getV('cfg-header-text-c-val'), 'important');
                headerSpan.style.setProperty('font-size', getV('cfg-header-text-size'), 'important');
            }
            if (sliderWrap) sliderWrap.remove();
        }
        

        // 全体背景色（トップページのみ適用する場合）
        const isBodyBgNone = document.getElementById('cfg-body-bg-none')?.checked;
        mock.style.backgroundColor = isBodyBgNone ? 'transparent' : getV('cfg-body-bg-val');
    }

    // ---------------------------------------------------------
    // B. メインボタン設定（トップ・履歴など共通）
    // ---------------------------------------------------------
    const area = mock.querySelector('.top_button');
    if(area) {
        // ボタンエリア背景色
        const isBtnAreaNone = document.getElementById('cfg-btn-area-bg-none')?.checked;
        area.style.backgroundColor = isBtnAreaNone ? 'transparent' : getV('cfg-btn-area-bg-val');

        // ボタン自体のデザイン適用
        const selected = document.querySelector('input[name="btn-pattern"]:checked')?.value || 'A';
        const btn1 = area.querySelector('ul li:nth-child(1)');
        const btn2 = area.querySelector('ul li:nth-child(2)');
        /*
        if (selected === 'A') {
            apply(btn1, getV('cfg-btn1-bg-val'), getC('cfg-btn1-border-on'), getV('cfg-btn1-border-w'), getV('cfg-btn1-border-c-val'), getV('cfg-btn1-txt-val'), getV('cfg-btn1-icon-c-val'), 60);
            apply(btn2, getV('cfg-btn2-bg-val'), getC('cfg-btn2-border-on'), getV('cfg-btn2-border-w'), getV('cfg-btn2-border-c-val'), getV('cfg-btn2-txt-val'), getV('cfg-btn2-icon-c-val'), 60);
        } else if (selected === 'B') {
            const d1 = getBData(0); const d2 = getBData(1);
            apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-b-btn1-icon-c-val'), 50);
            apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-b-btn2-icon-c-val'), 50);

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
            // パターンC：装飾があるので、少し大きく見せたい場合 (例: 65)
            const d1 = getCData(0); const d2 = getCData(1);
            apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-c-btn1-icon-c-val'), 65);
            apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-c-btn2-icon-c-val'), 65);

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
        */
        if (selected === 'A') {
            apply(btn1, getV('cfg-btn1-bg-val'), getC('cfg-btn1-border-on'), getV('cfg-btn1-border-w'), getV('cfg-btn1-border-c-val'), getV('cfg-btn1-txt-val'), getV('cfg-btn1-icon-c-val'), 55);
            apply(btn2, getV('cfg-btn2-bg-val'), getC('cfg-btn2-border-on'), getV('cfg-btn2-border-w'), getV('cfg-btn2-border-c-val'), getV('cfg-btn2-txt-val'), getV('cfg-btn2-icon-c-val'), 55);

        } else if (selected === 'B') {
            const bArea = document.getElementById('pattern-settings-B');
            const cols = bArea?.querySelectorAll('.setting-column');
            if (cols && cols.length >= 2) {
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
                
                // ★ここでサイズ「50」を指定して適用（1回にまとめます）
                apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-b-btn1-icon-c-val'), 27);
                if(btn1) btn1.style.borderRadius = d1.radius;
                
                apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-b-btn2-icon-c-val'), 27);
                if(btn2) btn2.style.borderRadius = d2.radius;
                
                updateDynamicStyle(`
                    .mock-screen.pattern-B .top_button ul li:nth-child(1):before { border-bottom: ${d1.befW} solid ${d1.befC} !important; border-right: ${d1.befW} solid ${d1.befC} !important; }
                    .mock-screen.pattern-B .top_button ul li:nth-child(2):before { border-bottom: ${d2.befW} solid ${d2.befC} !important; border-right: ${d2.befW} solid ${d2.befC} !important; }
                `, 'dyn-style-pattern');
            }

        } else if (selected === 'C') {
            const cArea = document.getElementById('pattern-settings-C');
            const cols = cArea?.querySelectorAll('.setting-column');
            if (cols && cols.length >= 2) {
                const getCData = (idx) => {
                    const c = cols[idx]; const allTxt = c.querySelectorAll('input[type="text"]');
                    const chk = c.querySelector('input[type="checkbox"]');
                    return {
                        bg: allTxt[0].value, on: chk.checked, bw: allTxt[1].value, bc: allTxt[2].value, radius: allTxt[3].value,
                        befW: allTxt[4].value, befC: allTxt[5].value, afterC: allTxt[6].value, tx: allTxt[7].value
                    };
                };
                const d1 = getCData(0); const d2 = getCData(1);
                
                // ★ここでサイズ「65」を指定して適用
                apply(btn1, d1.bg, d1.on, d1.bw, d1.bc, d1.tx, getV('cfg-c-btn1-icon-c-val'), 45);
                if(btn1) btn1.style.borderRadius = d1.radius;
                
                apply(btn2, d2.bg, d2.on, d2.bw, d2.bc, d2.tx, getV('cfg-c-btn2-icon-c-val'), 45);
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

    // ---------------------------------------------------------
    // C. フッターメニューのアイコン設定
    // ---------------------------------------------------------
    const fBg = getV('cfg-bg-val');
    const fFilter = document.getElementById('cfg-icon-choice')?.value === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    const previewFooter = document.getElementById('preview-footer');
    if(previewFooter) previewFooter.style.backgroundColor = fBg;

    document.querySelectorAll('.menu-item:not(.sns-item)').forEach(el => {
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
        } else if (cls === 'user') {
            li.classList.add('clickable');
            li.style.cursor = 'pointer';
            li.onclick = (e) => { e.preventDefault(); changeMockScreen('user'); };
        } else if (cls === 'history') {
            li.classList.add('clickable');
            li.style.cursor = 'pointer';
            li.onclick = (e) => { e.preventDefault(); changeMockScreen('history'); };
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

    // --- SNSアイコンの描画処理（配置場所対応版） ---
    if (mock) {
        // 既存のSNSを削除
        mock.querySelectorAll('.sns_btn').forEach(el => el.remove());

        // 設定の取得
        const snsPos = document.querySelector('input[name="sns-position"]:checked')?.value || 'header';
        const snsColorChoice = getV('cfg-sns-c-val');
        const filterStyle = (snsColorChoice === '#FFFFFF') ? 'brightness(0) invert(1)' : 'brightness(0)';

        // SNSのHTMLを作成
        const snsBtnDiv = document.createElement('div');
        snsBtnDiv.className = 'sns_btn';
        let snsHtml = '<ul>';
        document.querySelectorAll('.sns-item').forEach(item => {
            const type = item.querySelector('.field-sns-type').value;
            const href = item.querySelector('.field-sns-href').value || '#';
            const ext = item.querySelector('.field-sns-ext').checked;
            const otherUrl = item.querySelector('.field-sns-other-url').value;
            let iconUrl = (type === 'other') ? otherUrl : snsIcons[type];
            const target = ext ? ' target="_blank" rel="noopener noreferrer"' : '';
            if (iconUrl) snsHtml += `<li><a href="${href}"${target}><img src="${iconUrl}"></a></li>`;
        });
        snsHtml += '</ul>';
        snsBtnDiv.innerHTML = snsHtml;

        if (snsPos === 'header') {
            // 【パターンA】ヘッダーに配置
            mock.appendChild(snsBtnDiv);
            const snsRightPos = (listPattern === 'B') ? '60px' : '25px';

            updateDynamicStyle(`
                .mock-screen .sns_btn { position: absolute; top: 14px; right: ${snsRightPos}; z-index: 110; }
                .mock-screen .sns_btn ul { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
                .mock-screen .sns_btn li img { width: 25px; filter: ${filterStyle} !important; }
            `, 'dyn-style-sns');
        } else {
            // 【パターンB】フッターメニューリストの後ろに配置
            const menuUl = mock.querySelector('.menu-sublist ul');
            if (menuUl) {
                menuUl.after(snsBtnDiv); // ulの直後に挿入
            }

            updateDynamicStyle(`
                .mock-screen .sns_btn { display: block; margin: 20px 0 30px 0; padding: 0; text-align: center; }
                .mock-screen .sns_btn ul { display: flex; justify-content: center; gap: 10px; list-style: none; margin: 0; padding: 0; align-items: center; }
                .mock-screen .sns_btn li { display: inline-block; list-style: none; margin: 0; padding: 0; }
                .mock-screen .sns_btn li img { width: 35px; filter: ${filterStyle} !important; }
            `, 'dyn-style-sns');
        }
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
        const historyLink = mock.querySelector('.menu-sublist .to-history');
        if (historyLink) {
            historyLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                changeMockScreen('history');
            };
        }
        const userLink = mock.querySelector('.menu-sublist .to-user');
        if (userLink) {
            userLink.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                changeMockScreen('user');
            };
        }
        mock.onclick = (e) => {
            const noticeItem = e.target.closest('.notice_list');
            
            if (noticeItem) {
                e.preventDefault();
                e.stopPropagation();
                changeMockScreen('notice_detail');
            }
        };

    }, 200);
}

// 2. 画面を切り替える関数
function changeMockScreen(screenKey) {
    const mock = document.querySelector('.mock-screen');
    if (!mock) return;

    // 現在のトップ画面のHTMLを保存（初回のみ）
    if (!screens.top) screens.top = mock.innerHTML;

    // 1. 画面の中身を切り替え
    if (screens[screenKey]) {
        mock.innerHTML = screens[screenKey];
        mock.dataset.currentScreen = screenKey;
    } else {
        console.error(`エラー: screens.${screenKey} が定義されていません。script.jsを確認してください。`);
        return; 
    }

    // --- トップ画面に戻る共通命令 ---
    const goToTop = (e) => {
        if(e) { e.preventDefault(); e.stopPropagation(); }
        console.log("トップ画面に戻ります");
        mock.innerHTML = screens.top;
        delete mock.dataset.currentScreen;
        updatePreview(); // トップ画面のイベントを再登録
    };

    const toUserBtns = mock.querySelectorAll('.to-user');
    toUserBtns.forEach(btn => {
        btn.style.cursor = 'pointer';
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            changeMockScreen('user');
        };
    });
    // 2. イベント設定（DOM反映待ちのために少しだけ遅らせる）
    setTimeout(() => {
        // ヘッダー全体をクリック可能に
        const headerBox = mock.querySelector('.mock-header-v2');
        if (headerBox) {
            headerBox.style.cursor = 'pointer';
            headerBox.onclick = goToTop;
        }

        // 「トップへ戻る」ボタン
        const backBtn = mock.querySelector('.back-to-top');
        if (backBtn) backBtn.onclick = goToTop;

        // ページ内リンク（チケット一覧へ）
        const toTicketBtn = mock.querySelector('.to-ticket');
        if (toTicketBtn) toTicketBtn.onclick = (e) => { e.preventDefault(); changeMockScreen('ticket'); };

        // ページ内リンク（スタンプ帳へ）
        const toStampBtn = mock.querySelector('.to-stamp');
        if (toStampBtn) toStampBtn.onclick = (e) => { e.preventDefault(); changeMockScreen('stamp'); };

        // ===============================================
        // スタンプ画面の設定
        // ===============================================
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

        // ===============================================
        // スタンプ詳細画面の設定
        // ===============================================
        if (screenKey === 'stamp_details') {
            const toStampListBtn = mock.querySelector('.to-stamp-list');
            if (toStampListBtn) {
                toStampListBtn.onclick = (e) => { 
                    e.preventDefault(); 
                    changeMockScreen('stamp'); 
                };
            }
        }

        // ===============================================
        // チケット一覧画面でのクリック設定
        // ===============================================
        if (screenKey === 'ticket') {
            // 「利用可能」なチケットのカード全体を取得（親のdivを見る）
            // .ticket_list_set のうち、.used も .expired も付いていないものの中にある .ticket_list
            const validCards = mock.querySelectorAll('.ticket_list_set:not(.used):not(.expired) .ticket_list');
            
            console.log(`チケット検出数: ${validCards.length} 件`); // デバッグ用

            validCards.forEach(card => {
                // カード全体をクリック可能にする
                card.style.cursor = 'pointer';
                card.onclick = (e) => {
                    e.preventDefault();
                    console.log("チケット詳細へ遷移します");
                    changeMockScreen('ticket_detail');
                };
                
                // 念のため中のリンク(aタグ)のクリックも無効化して、親(card)のクリックを優先させる
                const link = card.querySelector('a');
                if(link) link.style.pointerEvents = "none"; 
            });
        }

        // ===============================================
        // チケット詳細画面のボタン設定
        // ===============================================
        if (screenKey === 'ticket_detail') {
            // チケット一覧へ戻る
            const toTicketList = mock.querySelector('.to-ticket');
            if (toTicketList) {
                toTicketList.onclick = (e) => { e.preventDefault(); changeMockScreen('ticket'); };
            }
            // スタンプ履歴へ（仮でスタンプ帳へ）
            const toHistory = mock.querySelector('.to-history');
            if (toHistory) {
                toHistory.onclick = (e) => { e.preventDefault(); changeMockScreen('stamp'); };
            }
        }

        // ===============================================
        // ★スタンプ履歴画面の設定
        // ===============================================
        if (screenKey === 'history') {
            // リストメニューなどの「スタンプ履歴」リンクを無効化（現在地なので）
            const historyLinks = mock.querySelectorAll('.to-history');
            historyLinks.forEach(a => a.style.pointerEvents = 'none');
            
            // ページ上部の「スタンプ帳」ボタン
            const toStamp = mock.querySelector('a[href*="stamp_list"]'); // hrefに含まれる文字で探すかクラスで
            if(toStamp) toStamp.onclick = (e) => { e.preventDefault(); changeMockScreen('stamp'); };

            // ページ上部の「チケット一覧」ボタン
            const toTicket = mock.querySelector('a[href*="coupon_list"]');
            if(toTicket) toTicket.onclick = (e) => { e.preventDefault(); changeMockScreen('ticket'); };
        }

        // ===============================================
        // 他の画面からの遷移
        // ===============================================
        // すべての画面共通で「.to-history」クラスを持つリンクをクリックしたら履歴へ
        const toHistoryBtns = mock.querySelectorAll('.to-history');
        toHistoryBtns.forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation(); // イベントの連鎖を止める
                console.log("リストメニューから履歴ページへ遷移します");
                changeMockScreen('history'); // 履歴画面へ切り替え
            };
        });

        // ===============================================
        // お知らせリストからの遷移
        // ===============================================
        const noticeLinks = mock.querySelectorAll('.notice_list a');
        noticeLinks.forEach(link => {
            link.onclick = (e) => {
                e.preventDefault();
                console.log("遷移実行：お知らせ詳細へ");
                changeMockScreen('notice_detail'); // 1で作ったテンプレートに切り替え
            };
        });

        // --- 2. お知らせ詳細ページ内の「トップへ戻る」ボタン ---
        // 既存の back-to-top 処理があれば自動で動きますが、念のため
        const noticeBackBtn = mock.querySelector('.notice_detail .back-to-top');
        if (noticeBackBtn) noticeBackBtn.onclick = goToTop;



        // デザインの再適用（DOM書き換えで消えることがあるため念押し）
        applyCurrentDesignToMock();
        updatePreview();

    }, 10); // 10ms待ってからイベントを貼る
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
    if (mock.dataset.currentScreen === 'stamp' 
            || mock.dataset.currentScreen === 'ticket' 
            || mock.dataset.currentScreen === 'stamp_details' 
            || mock.dataset.currentScreen === 'ticket_detail'
            || mock.dataset.currentScreen === 'user'
            || mock.dataset.currentScreen === 'history'
            || mock.dataset.currentScreen === 'notice_detail') {

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
            // 背景色の適用
            topHeader.style.setProperty('background-color', getV('cfg-header-bg-val'), 'important');

            // ★ タイトルの文字色とサイズを適用（セレクタをより広範囲に指定）
            const titleSpan = topHeader.querySelector('h1 span, h1'); 
            if (titleSpan) {
                const textColor = getV('cfg-header-text-c-val');
                const textSize = getV('cfg-header-text-size').replace('px', '');
                
                titleSpan.style.setProperty('color', textColor, 'important');
                titleSpan.style.setProperty('font-size', textSize + 'px', 'important');
            }
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

        // ロゴの形状設定を取得
        const wmShape = document.getElementById('cfg-st-watermark-shape')?.value || 'landscape';
        const wmWidth = (wmShape === 'square') ? '75px' : '100px';
        const wmHeight = (wmShape === 'square') ? '75px' : '40px';

        finalCSS += `
            /* カード本体のデザイン */
            .mock-screen .stamp_card { 
                background-color: ${getV('cfg-st-card-bg-val')} !important; 
                border-radius: ${getV('cfg-st-radius')} !important; 
                border: ${borderOn ? `${getV('cfg-st-border-w')} solid ${stColor}` : 'none'} !important; 
                outline: ${borderOn ? `${getV('cfg-st-outline-w')} solid ${stColor}` : 'none'} !important; 
                outline-offset: -7px; 
                position: relative; 
                overflow: hidden; 
            }

            /* カード透かしロゴ（選択したサイズを適用） */
            .mock-screen .stamp_card::before { 
                content: ""; 
                position: absolute; 
                bottom: 10px; 
                right: 10px; 
                width: ${wmWidth} !important; 
                height: ${wmHeight} !important; 
                background-image: url(${getV('cfg-st-watermark-url')}) !important; 
                background-size: contain; 
                background-repeat: no-repeat; 
                background-position: right, bottom;
                pointer-events: none; 
            }

            /* その他テキスト・アイコンのデザイン */
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

    // チケット一覧ページCSS
    if (mock.dataset.currentScreen === 'ticket' && typeof getTicketPageCSS === 'function') {
        finalCSS += getTicketPageCSS(false);
    }

    // チケット詳細ページCSS
    if (mock.dataset.currentScreen === 'ticket_detail' && typeof getTicketDetailPageCSS === 'function') {
        finalCSS += getTicketDetailPageCSS(false);
    }
    // マイページCSS
    if (mock.dataset.currentScreen === 'user' && typeof getUserPageCSS === 'function') {
        finalCSS += getUserPageCSS(false);
    }

    // CSSをプレビュー画面に適用
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
        
        // 無効ボタンの背景色を取得
        const disabledBg = getV('cfg-user-btn-disabled-bg-val');

        orgBtns.forEach(btn => {
            // disabledクラスがある場合は、無効色を優先する
            if (btn.classList.contains('disabled')) {
                btn.style.setProperty('background-color', disabledBg, 'important');
                btn.style.setProperty('border', 'none', 'important'); // 無効時は枠線なし
                btn.style.setProperty('border-radius', orgRadius, 'important'); // 角丸は維持
            } else {
                // 通常時（オレンジ）
                btn.style.setProperty('background-color', orgBg, 'important');
                btn.style.setProperty('border-radius', orgRadius, 'important');
                
                if (orgBorderOn) {
                    btn.style.setProperty('border', `${orgBorderW} solid ${orgBorderC}`, 'important');
                } else {
                    btn.style.setProperty('border', 'none', 'important');
                }
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
// アイコン色設定用
function apply(el, bg, on, bw, bc, tx, iconColor, size = 60) {
    if(!el) return;
    
    el.style.backgroundColor = bg;
    el.style.setProperty('border', on ? `${bw} solid ${bc}` : 'none', 'important');
    el.style.transform = 'translateZ(0)'; 
    
    const info = el.querySelector('.button_info');
    if(info) info.style.setProperty('color', tx, 'important');

    const imgDiv = el.querySelector('.button_img');
    const img = el.querySelector('img');

    if (imgDiv && img) {
        // 親枠のサイズを変数 size に合わせる
        imgDiv.style.cssText = `
            width: ${size}px !important;
            height: ${size}px !important;
            min-width: ${size}px !important;
            flex: 0 0 ${size}px !important;
            position: relative !important;
            background: transparent !important;
            transform: translateZ(0);
            margin: 0 auto;
            -webkit-mask: none !important;
            mask: none !important;
            overflow: visible !important;
            clip-path: inset(0px);
            -webkit-clip-path: inset(0px);
        `;

        // translateX と drop-shadow の距離を size に合わせる
        img.style.cssText = `
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            position: absolute !important;
            top: 0; left: 0;
            opacity: 1 !important;
            transform: translateX(-${size}px);
            -webkit-transform: translateX(-${size}px);
            filter: drop-shadow(${size}px 0 0 ${iconColor}) !important;
            -webkit-filter: drop-shadow(${size}px 0 0 ${iconColor}) !important;
        `;
    }
}

function updateDynamicStyle(css, id = 'dyn-style') {
    let s = document.getElementById(id);
    if(!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s); }
    s.innerHTML = css;
}

function switchPattern() {
    // 1. メインボタン(A/B/C)の切り替え
    const s = document.querySelector('input[name="btn-pattern"]:checked').value;
    document.querySelectorAll('.pattern-fields').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`pattern-settings-${s}`);
    if(target) target.style.display = 'grid';

    // 2. ヘッダーパターン(A/B)の切り替えと表示制御
    const h = document.querySelector('input[name="header-pattern"]:checked')?.value || 'A';
    const bSettings = document.getElementById('header-b-settings');
    const mainImgInput = document.getElementById('cfg-header-main-img');
    const defaultImg = "https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/v4AFzVlZMSCffhihwlbX.png";

    if (h === 'B') {
        // パターンBなら追加設定（スライダー等）を表示
        if(bSettings) bSettings.style.display = 'block';
        // パターンBでURLが空なら、デフォルト画像をセットしてあげる（利便性のため）
        if(mainImgInput && mainImgInput.value === "") {
            mainImgInput.value = defaultImg;
        }
    } else {
        // パターンAなら追加設定を非表示
        if(bSettings) bSettings.style.display = 'none';
        // ★ご要望：パターンAに切り替えた時、デフォルトURLが入っていれば空にする
        if(mainImgInput && mainImgInput.value === defaultImg) {
            mainImgInput.value = "";
        }
    }

    // 3. プレビュー（モック）のクラス更新
    const mock = document.querySelector('.mock-screen');
    if(mock) { 
        // ボタン用のクラス
        mock.classList.remove('pattern-A', 'pattern-B', 'pattern-C'); 
        mock.classList.add(`pattern-${s}`); 
    }

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

/* ==========================================================
   生成ロジック (リファクタリング版)
   ========================================================== */

// 共通ヘルパー関数：値の取得を簡単にする
const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

// 1. 全体背景画像のCSSを生成する関数
function getBodyBgCSS() {
    const bodyBgImg = getV('cfg-body-bg-img');
    if (!bodyBgImg) return "";

    // リピート設定
    const bgRepeat = getV('cfg-body-bg-repeat');
    // サイズ設定
    const bgSizeMode = getV('cfg-body-bg-size-mode');
    const bgSizeVal = getV('cfg-body-bg-size-val');
    const finalSize = (bgSizeMode === 'custom') ? bgSizeVal : bgSizeMode;

    // プロパティのみを文字列として返す
    let css = `background-image: url('${bodyBgImg}') !important;`;
    css += `background-repeat: ${bgRepeat} !important;`;
    if (finalSize) {
        css += `background-size: ${finalSize} !important;`;
    }
    css += `background-position: center top !important;`;
    
    return css;
}

// 2. メインボタン（A/B/Cパターン）のCSSを生成する関数
function getButtonPatternCSS(selectedPattern) {

    // --- Aパターン ---
    if (selectedPattern === 'A') {
        // 現在の設定値を取得
        const bg1 = getV('cfg-btn1-bg-val').toUpperCase();
        const txt1 = getV('cfg-btn1-txt-val').toUpperCase();
        const icon1 = getV('cfg-btn1-icon-c-val').toUpperCase();
        const bg2 = getV('cfg-btn2-bg-val').toUpperCase();
        const txt2 = getV('cfg-btn2-txt-val').toUpperCase();
        const icon2 = getV('cfg-btn2-icon-c-val').toUpperCase();
        const b1on = getC('cfg-btn1-border-on');
        const b2on = getC('cfg-btn2-border-on');

        // デフォルト状態（初期値）の判定
        // 背景: #FFFFFF, 文字/アイコン: #000000, 枠線チェック: OFF
        const isDefault = (
            bg1 === '#FFFFFF' && txt1 === '#000000' && icon1 === '#000000' &&
            bg2 === '#FFFFFF' && txt2 === '#000000' && icon2 === '#000000' &&
            b1on === false && b2on === false
        );

        // 全て初期値のままなら何も出力しない
        if (isDefault) return "";

        // 一つでも変更がある場合は以下のCSSを生成
        const b1Border = b1on ? `${getV('cfg-btn1-border-w')} solid ${getV('cfg-btn1-border-c-val')}` : 'none';
        const b2Border = b2on ? `${getV('cfg-btn2-border-w')} solid ${getV('cfg-btn2-border-c-val')}` : 'none';

        return `
    /* --- Aパターン専用 --- */
    .top_button > ul > li { width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; list-style: none; transform: translateZ(0); }
    .top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; text-decoration: none; }
    .button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }

    /* 左ボタン */
    .top_button > ul > li:nth-child(1) { background-color: ${bg1} !important; border: ${b1Border} !important; }
    .top_button > ul > li:nth-child(1) .button_info { color: ${txt1} !important; }
    /* 左アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(1) .button_img { 
    width: 55px !important; height: 55px !important; min-width: 60px; flex: 0 0 60px;
    position: relative; margin: 0 auto; transform: translateZ(0);
    overflow: visible; clip-path: inset(0px); -webkit-clip-path: inset(0px);
    }
    .top_button > ul > li:nth-child(1) .button_img img {
    width: 100%; height: 100%; object-fit: contain; position: absolute; left: 0; top: 0;
    transform: translateX(-100%); -webkit-transform: translateX(-100%);
    filter: drop-shadow(60px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(60px 0 0 ${icon1}) !important;
    }

    /* 右ボタン */
    .top_button > ul > li:nth-child(2) { background-color: ${bg2} !important; border: ${b2Border} !important; }
    .top_button > ul > li:nth-child(2) .button_info { color: ${txt2} !important; }
    /* 右アイコン (Clip-Path) */
    .top_button > ul > li:nth-child(2) .button_img { 
    width: 55px !important; height: 55px !important; min-width: 60px; flex: 0 0 60px;
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
    width: 27px !important; height: 27px !important; min-width: 60px; flex: 0 0 60px;
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
    width: 27px !important; height: 27px !important; min-width: 60px; flex: 0 0 60px;
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
    width: 45px !important; height: 45px !important; min-width: 60px; flex: 0 0 60px;
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
    width: 46px !important; height: 45px !important; min-width: 60px; flex: 0 0 60px;
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
    // 1. 各種設定値を取得
    const pattern = document.querySelector('input[name="header-pattern"]:checked')?.value || 'A';
    const mainImgUrl = getV('cfg-header-main-img');
    const isBgNone = getC('cfg-header-bg-none');
    const hColor = getV('cfg-header-bg-val').toUpperCase();
    const tColor = getV('cfg-header-text-c-val').toUpperCase();
    const tSize = getV('cfg-header-text-size');

    // 2. パターンB（スライダー）
    if (pattern === 'B') {
        if (!mainImgUrl) return "";
        // パターンBのロジック（省略）
        return `/* パターンBのCSS */`; 
    } 

    // 3. パターンAの「初期値チェック」
    // ★ここを修正：hColor の比較対象を実際の初期値 #F5F5F5 に合わせます
    const isDefault = (
        (hColor === "#F5F5F5" || hColor === "#FFFFFF") && 
        tColor === "#000000" && 
        tSize === "18px" && 
        mainImgUrl === "" && 
        !isBgNone
    );

    // 全く変更がなければ空文字を返す
    if (isDefault) return ""; 

    // 4. 変更がある場合のみ生成
    if (mainImgUrl) {
        return `
header.top {
    display: flex !important; justify-content: center !important; align-items: center !important;
    height: 270px !important; background-image: url('${mainImgUrl}') !important;
    background-size: cover !important; background-position: bottom !important;
    position: relative; z-index: 99;
}
header.top h1 span { color: ${tColor} !important; font-size: ${tSize} !important; }`;
    } else {
        const finalBg = isBgNone ? 'transparent' : hColor;
        return `
header.top {
    background-color: ${finalBg} !important;
    display: flex !important; justify-content: center !important; align-items: center !important;
    padding: 10px 0 !important;
}
header.top h1 span { color: ${tColor} !important; font-size: ${tSize} !important; }`;
    }
}


// 4. スタンプ一覧ページのCSSを生成する関数
function getStampPageCSS() {
    // 現在の設定値を取得
    const stCardBg = getV('cfg-st-card-bg-val').toUpperCase();
    const stRadius = getV('cfg-st-radius');
    const stBorderOn = document.getElementById('cfg-st-border-on').checked;
    const stBorderW = getV('cfg-st-border-w');
    const stBorderC = getV('cfg-st-border-c-val').toUpperCase();
    const stOutlineW = getV('cfg-st-outline-w');
    const stWatermarkUrl = getV('cfg-st-watermark-url');
    const stTxtColor = getV('cfg-st-txt-c-val').toUpperCase();
    const stDueTxtColor = getV('cfg-st-due-txt-c-val').toUpperCase();
    const stLabelBg = getV('cfg-st-label-bg-val');
    const stLabelRadius = getV('cfg-st-label-radius');
    const stIconBorder = getV('cfg-st-icon-border-val').toUpperCase();
    const stIconChoice = document.getElementById('cfg-st-icon-choice').value;

    // デフォルト状態（初期値）の判定
    const isDefault = (
        stCardBg === '#FFFFFF' &&
        stRadius === '16px' &&
        stBorderOn === true &&
        stBorderW === '1px' &&
        stBorderC === '#000000' &&
        stOutlineW === '1.3px' &&
        stWatermarkUrl === 'https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png' &&
        stTxtColor === '#000000' &&
        stDueTxtColor === '#000000' &&
        stLabelBg === '#ffffff1c' &&
        stLabelRadius === '30px' &&
        stIconBorder === '#000000' &&
        stIconChoice === 'black'
    );

    // 全て初期値のままなら何も出力しない
    if (isDefault) return "";

    // 一つでも変更がある場合は以下のCSSを生成
    const stIconFilter = stIconChoice === 'black' 
        ? 'brightness(0)' 
        : 'invert(100%) sepia(100%) saturate(62%) hue-rotate(329deg) brightness(92%) contrast(260%)';

    const stBorderColor = getV('cfg-st-border-c-val');
    const wmShape = document.getElementById('cfg-st-watermark-shape')?.value || 'landscape';
    const wmWidth = (wmShape === 'square') ? '75px' : '100px';
    const wmHeight = (wmShape === 'square') ? '75px' : '40px';

    return `
/* ====== スタンプ一覧ページ ====== */
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
    content: ""; position: absolute; z-index: 0; bottom: 10px; right: 10px; 
    width: ${wmWidth} !important; 
    height: ${wmHeight} !important;
    background-image: url(${getV('cfg-st-watermark-url')});
    background-position: right,bottom; background-size: contain; background-repeat: no-repeat; pointer-events: none;
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

// 5. フッター固定メニューリストの配列を取得する関数
function getMenuItems() {
    const items = [];
    document.querySelectorAll('.menu-item:not(.sns-item)').forEach(el => {
        items.push({
            class: el.querySelector('.field-class').value,
            href: el.querySelector('.field-href').value,
            label: el.querySelector('.field-label').value,
            external: el.querySelector('.field-ext').checked,
            aclass: el.querySelector('.field-aclass').value
        });
    });
    settings['saved_menu_items'] = items;

    // SNSだけを抽出して保存
    const snsData = [];
    document.querySelectorAll('.sns-item').forEach(el => {
        snsData.push({
            type: el.querySelector('.field-sns-type').value,
            href: el.querySelector('.field-sns-href').value,
            otherUrl: el.querySelector('.field-sns-other-url').value,
            ext: el.querySelector('.field-sns-ext').checked
        });
    });
    settings['saved_sns_items'] = snsData;
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

    // タイトル
    const titleSize = getV('cfg-std-title-size');
    const titleColor = getV('cfg-std-title-val');

    // 有効期限の背景・文字
    const dueTxt = getV('cfg-std-due-txt-val');
    const dueBg = getV('cfg-std-due-bg-val');
    const dueRadius = getV('cfg-std-due-radius');

    // ★有効期限の枠線設定（ここを getV に直しました）
    const dueBorderOn = document.getElementById('cfg-std-due-border-on')?.checked;
    const dueBorderW = getV('cfg-std-due-border-w');
    const dueBorderC = getV('cfg-std-due-border-c-val');
    const dueBorderCSS = dueBorderOn ? `${dueBorderW} solid ${dueBorderC}` : 'none';

    // 注意事項
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
    border: ${dueBorderCSS} !important;
    display: inline-block;
    padding: 2px 8px;
}
.stamp_note {
    font-size: ${noteSize} !important;
    color: ${noteTxtColor} !important;
    border-bottom: 1px dashed ${noteLineC} !important;
}
`;
}

// 8. チケット一覧ページのCSSを生成する関数
function getTicketPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    // prefix (プレビュー用 or 出力用)
    const prefix = isExport ? '' : '.mock-screen ';

    // ★ここがポイント！
    // 「.ticket_list_set」のうち、「.used」でも「.expired」でもないものだけを対象にするセレクタを作る
    const targetSelector = '.ticket_list_set:not(.used):not(.expired)';
    
    // プレビュー用プレフィックスと合体させる
    // 例: .mock-screen .ticket_list_set:not(.used):not(.expired)
    const baseSelector = prefix + targetSelector;

    // カード設定
    const cardBg = getV('cfg-ticket-bg-val');
    const cardRadius = getV('cfg-ticket-radius');
    // カード枠線
    const cardBorderOn = document.getElementById('cfg-ticket-border-on')?.checked;
    const cardBorderW = getV('cfg-ticket-border-w');
    const cardBorderC = getV('cfg-ticket-border-c-val');
    const cardBorderCSS = cardBorderOn ? `${cardBorderW} solid ${cardBorderC}` : 'none';

    // 区切り線
    const lineColor = getV('cfg-ticket-line-val');

    // タイトル
    const titleSize = getV('cfg-ticket-title-size');
    const titleWeight = document.getElementById('cfg-ticket-title-weight')?.value || '700';
    const titleColor = getV('cfg-ticket-title-val');

    // 有効期限
    const dueSize = getV('cfg-ticket-due-size');
    const dueColor = getV('cfg-ticket-due-val');
    const dueBg = getV('cfg-ticket-due-bg-val');
    const dueRadius = getV('cfg-ticket-due-radius');
    // 有効期限枠線
    const dueBorderOn = document.getElementById('cfg-ticket-due-border-on')?.checked;
    const dueBorderW = getV('cfg-ticket-due-border-w');
    const dueBorderC = getV('cfg-ticket-due-border-c-val');
    const dueBorderCSS = dueBorderOn ? `${dueBorderW} solid ${dueBorderC}` : 'none';

    return `
/* チケット一覧デザイン（利用可能のみ） */

/* カード全体：利用可能チケットのみ対象 */
${baseSelector} {
    border-radius: ${cardRadius} !important;
    background-color: ${cardBg} !important;
    border: ${cardBorderCSS} !important;
}
${baseSelector} > .ticket_list > a {
    border-bottom: 1px dashed ${lineColor} !important;
}
${baseSelector} > .ticket_list > a > dl > dt {
    font-size: ${titleSize} !important;
    font-weight: ${titleWeight} !important;
    color: ${titleColor} !important;
}
${baseSelector} .ticket_list_due {
    font-size: ${dueSize} !important;
    background-color: ${dueBg} !important;
    border-radius: ${dueRadius} !important;
    color: ${dueColor} !important;
    border: ${dueBorderCSS} !important;
    display: inline-block;
}
`;
}
// 9. チケット詳細ページのCSSを生成する関数
function getTicketDetailPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const prefix = isExport ? '' : '.mock-screen ';

    // 設定値の取得
    // カード全体
    const cardBg = getV('cfg-td-card-bg-val');
    const cardRadius = getV('cfg-td-card-radius');
    const borderOn = document.getElementById('cfg-td-card-border-on')?.checked;
    const borderW = getV('cfg-td-card-border-w');
    const borderC = getV('cfg-td-card-border-c-val');
    const borderCSS = borderOn ? `${borderW} solid ${borderC}` : 'none';

    // メッセージ
    const noticeSize = getV('cfg-td-notice-size');
    const noticeColor = getV('cfg-td-notice-val');

    // タイトル
    const titleSize = getV('cfg-td-title-size');
    const titleWeight = document.getElementById('cfg-td-title-weight')?.value || '700';
    const titleColor = getV('cfg-td-title-val');

    // 有効期限
    const dueSize = getV('cfg-td-due-size');
    const dueColor = getV('cfg-td-due-val');
    const dueBg = getV('cfg-td-due-bg-val');
    const dueRadius = getV('cfg-td-due-radius');

    // 注意事項
    const noteSize = getV('cfg-td-note-size');
    const noteColor = getV('cfg-td-note-val');

    return `
/* チケット詳細デザイン */
${prefix}.ticket_set {
    background-color: ${cardBg} !important;
    border-radius: ${cardRadius} !important;
    border: ${borderCSS} !important;
}
${prefix}.ticket_notice {
    color: ${noticeColor} !important;
    font-size: ${noticeSize} !important;

}
${prefix}.ticket_title {
    color: ${titleColor} !important;
    font-size: ${titleSize} !important;
    font-weight: ${titleWeight} !important;
    padding: 20px 20px 15px;
}
${prefix}.ticket_due {
    font-size: ${dueSize} !important;
    color: ${dueColor} !important;
    background: ${dueBg} !important;
    border-radius: ${dueRadius} !important;
}
${prefix}.ticket_note {
    font-size: ${noteSize} !important;
    color: ${noteColor} !important;
}
${prefix}.ticket_img img {
    width: 100% !important;
    height: auto !important;
    border-radius: calc(${cardRadius} / 2);
}
`;
}

// 10. マイページ用CSS生成関数
function getUserPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const prefix = isExport ? '' : '.mock-screen ';

    const cardBg = getV('cfg-user-card-bg-val');
    const cardRadius = getV('cfg-user-card-radius');
    const borderOn = document.getElementById('cfg-user-card-border-on')?.checked;
    const borderW = getV('cfg-user-card-border-w');
    const borderC = getV('cfg-user-card-border-c-val');
    const borderCSS = borderOn ? `${borderW} solid ${borderC}` : 'none';
    const titleColor = getV('cfg-user-title-val');
    const noteColor = getV('cfg-user-note-val');
    const disabledBg = getV('cfg-user-btn-disabled-bg-val');

    return `
/* マイページデザイン */
${prefix}.profile_set {
    background-color: ${cardBg} !important;
    border-radius: ${cardRadius} !important;
    border: ${borderCSS} !important; /* ★枠線を適用 */
}
${prefix}.profile_title {
    color: ${titleColor} !important;
}
${prefix}.profile_note {
    color: ${noteColor} !important;
}
${prefix}.page_button.disabled,
${prefix}.page_button.orange.disabled {
    background-color: ${disabledBg} !important;

}
${prefix}.page_button.disabled span,
${prefix}.page_button.orange.disabled span {
    color: #fff !important;
}
/* フォーム入力欄のスタイル補正 (プレビュー用) */
${prefix}.formset h4 {
    font-size: 12px;
    margin-bottom: 5px;
    font-weight: bold;
}
`;
}

// --- 配布用コード生成ボタンの処理 ---
document.getElementById('generate-btn').onclick = () => {
    
    // 0. 生成前に最新状態を反映
    updatePreview(); 

    // 1. 各種設定値の取得用のヘルパー
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const getC = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;

    // --- フォント指定の判定ロジック ---
    const selectedFont = getV('cfg-font-family-select');
    const customFont = getV('cfg-font-family-custom');
    const finalFont = customFont ? customFont : selectedFont;

    let fontCSS = "";
    // 初期値（sans-serif）以外、かつ空でない場合のみCSSを作成
    if (finalFont !== 'sans-serif' && finalFont !== '') {
        fontCSS = `font-family: ${finalFont}, sans-serif !important;`;
    }

    // --- 全体背景 (html, body) の判定ロジック（iOSバグ回避・リピート対応） ---
    const bodyBgColorRaw = getV('cfg-body-bg-val').toUpperCase();
    const isBodyBgNone = getC('cfg-body-bg-none');
    const bodyBgImg = getV('cfg-body-bg-img'); // 画像があるか判定用
    const bodyBgCSS = getBodyBgCSS();        // 画像用のプロパティ群

    let htmlBodyOutput = "";

    // 背景色、透明、画像、または「フォント」に変更がある場合のみCSSを生成
    if (bodyBgColorRaw !== "#FFFFFF" || isBodyBgNone || bodyBgImg !== "" || fontCSS !== "") {
        const finalBodyBg = isBodyBgNone ? 'transparent' : bodyBgColorRaw;
        
        // 1. html, body に背景色とフォント、基本余白を適用
        htmlBodyOutput = `html, body { background-color: ${finalBodyBg} !important; ${fontCSS} margin: 0; padding: 0; min-height: 100vh; }\n`;

        // 2. もし画像があるなら、固定レイヤー body::before を生成
        if (bodyBgImg !== "") {
            htmlBodyOutput += `body::before { content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; ${bodyBgCSS} }`;
        }
    }
    

    // --- 2. 各パーツの配布用CSS生成（getHeaderCSSなども同様に内部で判定させる） ---
    const headerCSS = getHeaderCSS(); 

    // ボタンエリア背景色の判定
    const isBtnAreaNone = getC('cfg-btn-area-bg-none');
    const btnAreaColor = getV('cfg-btn-area-bg-val').toUpperCase();
    
    // 【修正】ボタンエリアも変更がある場合のみ変数に格納
    let btnAreaOutput = "";
    if (btnAreaColor !== "#FFFFFF" || isBtnAreaNone) {
        const finalBtnAreaColor = isBtnAreaNone ? 'transparent' : btnAreaColor;
        btnAreaOutput = `.top_button { background-color: ${finalBtnAreaColor} !important; }`;
    }

    const listPattern = document.querySelector('input[name="list-pattern"]:checked')?.value || 'A';
        
    // --- SNSアイコンの生成 ---
    const snsPos = document.querySelector('input[name="sns-position"]:checked')?.value || 'header';
    const snsIconColorVal = getV('cfg-sns-c-val');
    const snsFilter = (snsIconColorVal === '#FFFFFF') ? 'brightness(0) invert(1)' : 'brightness(0)';

    const snsDataArray = [];
    document.querySelectorAll('.sns-item').forEach(el => {
        const type = el.querySelector('.field-sns-type').value;
        snsDataArray.push({
            iconUrl: (type === 'other') ? el.querySelector('.field-sns-other-url').value : snsIcons[type],
            href: el.querySelector('.field-sns-href').value || '#',
            target: el.querySelector('.field-sns-ext').checked ? ' target="_blank" rel="noopener noreferrer"' : ""
        });
    });
    const snsItemsHtml = snsDataArray.map(item => `<li><a href="${item.href}"${item.target}><img src="${item.iconUrl}"></a></li>`).join('');
    const snsFinalHtml = snsDataArray.length > 0 ? `<div class="sns_btn"><ul>${snsItemsHtml}</ul></div>` : "";

    let snsCSS = "";
    let snsInsertJS = "";
    if (snsFinalHtml !== "") { // SNSデータがある時だけ生成
        if (snsPos === 'header') {
            const snsRightOffset = (listPattern === 'B') ? '60px' : '15px';
            snsCSS = `.sns_btn { position: fixed; top: 14px; right: ${snsRightOffset}; z-index: 1002; display: block; }\n.sns_btn ul { display: flex; gap: 10px; list-style: none; margin: 0; padding: 0; align-items: center; }\n.sns_btn li img { width: 28px; filter: ${snsFilter} !important; }`;
            snsInsertJS = `document.body.insertAdjacentHTML('beforeend', \`${snsFinalHtml}\`);`;
        } else {
            snsCSS = `.sns_btn { display: block; margin: 20px 0 30px 0; padding: 0; text-align: center; }\n.sns_btn ul { display: flex; justify-content: center; gap: 10px; list-style: none; margin: 0; padding: 0; align-items: center; }\n.sns_btn li img { width: 35px; filter: ${snsFilter} !important; }`;
            snsInsertJS = `const footerUl = document.querySelector(".menu-sublist ul"); if(footerUl) { footerUl.insertAdjacentHTML('afterend', \`${snsFinalHtml}\`); }`;
        }
    }

    // 3. その他のパーツ
    const btnPattern = document.querySelector('input[name="btn-pattern"]:checked')?.value || 'A';
    const patternCSS = getButtonPatternCSS(btnPattern);
    const stampPageCSS = getStampPageCSS();
    const pageBtnCSS = getPageBtnCSS(true); 
    const noticeCSS = getNoticeCSS(true);  
    const stampDetailsCSS = getStampDetailsCSS();
    const ticketPageCSS = getTicketPageCSS(true);
    const ticketDetailCSS = getTicketDetailPageCSS(true);
    const userPageCSS = getUserPageCSS(true);
    const mockLogoAlign = document.querySelector('input[name="cfg-mock-logo-align"]:checked')?.value || 'center';

    // サブページヘッダーの判定（中央配置・白背景なら出さない）
    let subPageHeaderCSS = "";
    const mockHeaderBg = getV('cfg-mock-header-bg-val').toUpperCase();
    if (mockHeaderBg !== "#FFFFFF" || mockLogoAlign !== "center") {
        subPageHeaderCSS = `header { background-color: ${mockHeaderBg} !important; display: flex !important; justify-content: ${mockLogoAlign} !important; ${mockLogoAlign === 'flex-start' ? 'padding-left: 15px !important;' : ''} ${mockLogoAlign === 'flex-end' ? 'padding-right: 15px !important;' : ''} }`;
    }

    const fFilter = getV('cfg-icon-choice') === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';
    const listBorderOn = getC('cfg-list-border-on');
    const hamLineColor = getV('cfg-ham-line-val');
    const hamActiveColor = getV('cfg-ham-line-active-val');

    let hamburgerCSS = "";
    if (listPattern === 'B') {
        const listBgColor = getV('cfg-list-bg-val');
        const listTxtColor = getV('cfg-list-txt-val');
        hamburgerCSS = `/* ハンバーガーメニュー */\n.hamburger-btn { position: fixed; top: 18px; right: 20px; width: 28px; height: 20px; cursor: pointer; z-index: 1001; display: flex; flex-direction: column; justify-content: space-between; }\n.hamburger-btn span { display: block; height: 3px; border-radius: 2px; transition: all 0.3s ease; transform-origin: center center; background-color: ${hamLineColor} !important; }\n.hamburger-btn.active span { background-color: ${hamActiveColor} !important; }\n.menu-sublist { position: fixed; top: 0; right: -100%; width: 100%; height: 100vh; box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2); z-index: 1000; transition: right 0.35s ease; padding: 60px 20px 40px; box-sizing: border-box; overflow-y: auto; background-color: ${listBgColor} !important; }\n.menu-sublist.open { right: 0; }\n.menu-sublist a { text-decoration: none; color: ${listTxtColor} !important; }\n.menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.4); z-index: 999; opacity: 0; visibility: hidden; transition: all 0.3s ease; }\n.menu-overlay.show { opacity: 1; visibility: visible; }`;
    }

    // フッターアイコン
    let footerIconCSS = "";
    Object.keys(iconImages).forEach(key => {
        let url = (key === 'official') ? getV('cfg-official-url') : iconImages[key];
        footerIconCSS += `#sp-fixed-menu li.${key} .icon { background-image: url('${url}'); }\n`;
    });

    // --- JSの組み立て ---
    const menuItemsData = Array.from(document.querySelectorAll('.menu-item:not(.sns-item)')).map(el => ({
        class: el.querySelector('.field-class').value,
        label: el.querySelector('.field-label').value,
        href: el.querySelector('.field-href').value,
        external: el.querySelector('.field-ext').checked,
        aclass: el.querySelector('.field-aclass').value
    }));

    let hamburgerScript = (listPattern === 'B') ? `$(function() { $('body').append('<div class="hamburger-btn"><span></span><span></span><span></span></div><div class="menu-overlay"></div>'); $('.hamburger-btn').on('click', function() { $(this).toggleClass('active'); $('.menu-sublist').toggleClass('open'); $('.menu-overlay').toggleClass('show'); }); $('.menu-overlay').on('click', function() { $('.hamburger-btn').removeClass('active'); $('.menu-sublist').removeClass('open'); $(this).removeClass('show'); }); });` : "";

    const jsOutput = `<script>\nwindow.onload = () => {\n    const menuItems = ${JSON.stringify(menuItemsData.map(item => ({ class: item.class, href: item.href, aclass: item.aclass, icon: "<span class='icon'></span>", label: item.label, external: item.external })), null, 8)};\n    const listItems = menuItems.map(item => { const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : ""; return \`<li class="\${item.class}"><a href="\${item.href}"\${target} class="\${item.aclass}">\${item.icon}<span>\${item.label}</span></a></li>\`; }).join('');\n    const footerHTML = \`<footer><div id="sp-fixed-menu" class="for-sp"><ul>\${listItems}</ul></div></footer>\`;\n    document.body.insertAdjacentHTML('beforeend', footerHTML);\n    ${snsInsertJS}\n};\n${hamburgerScript}\n<\/script>`;

    // --- CSSの組み立て（htmlBodyOutput と btnAreaOutput を使用） ---
    const cssOutput = `<style type="text/css">
${htmlBodyOutput}
${headerCSS}
${snsCSS}
${subPageHeaderCSS}
${btnAreaOutput}
.top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; list-style: none; }
${patternCSS}
${stampPageCSS}
${stampDetailsCSS}
${pageBtnCSS}
${hamburgerCSS}
${noticeCSS}
${ticketPageCSS}
${ticketDetailCSS}
${userPageCSS}
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${getV('cfg-bg-val')}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${getV('cfg-txt-val')}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }
${footerIconCSS}
#sp-fixed-menu .user a { position: relative; top: -21px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 73px; height: 73px; border-radius: 50%; background: ${getV('cfg-user-bg-val')} !important; z-index: 10; border: 3px solid #FFF; padding-bottom: 5px; }
#sp-fixed-menu .user a span { color: #fff !important; font-size: 9px; font-weight: bold; margin: 0 0 -10px 0; }
#sp-fixed-menu .user a .icon { filter: brightness(0) invert(1); }
.menu-sublist > ul > li > a { color: ${getV('cfg-list-txt-val')} !important; border-top: ${listBorderOn ? getV('cfg-list-border-w') + ' solid ' + getV('cfg-list-border-c-val') : 'none'} !important; font-size: ${getV('cfg-list-size')} !important; display: block; text-decoration: none; padding: 15px; }
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
            <div class="form-group"><label>アイコン</label><select class="field-class" onchange="handleClassChange(this)"><option value="home">home</option><option value="stamp">stamp</option><option value="user">user (マイページ)</option><option value="ticket">ticket</option><option value="history">history</option><option value="reservation">reservation</option><option value="official">official</option><option value="map">map</option></select></div>
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

/* ==========================================================
   データの保存・読み込み (LocalStorage) 
   ========================================================== */
 
// 1. 現在のすべての設定値をオブジェクトにまとめる関数
function getAllSettings() {
    const settings = {};
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.id) {
            if (input.type === 'checkbox') {
                settings[input.id] = input.checked;
            } else if (input.type !== 'radio') {
                settings[input.id] = input.value;
            }
        }
        if (input.checked && input.name) {
            settings[input.name] = input.value;
        }
    });

    // (C) フッターメニュー項目の保存
    const items = [];
    document.querySelectorAll('.menu-item:not(.sns-item)').forEach(el => {
        items.push({
            class: el.querySelector('.field-class').value,
            label: el.querySelector('.field-label').value,
            href: el.querySelector('.field-href').value,
            ext: el.querySelector('.field-ext').checked,
            aclass: el.querySelector('.field-aclass').value
        });
    });
    settings['saved_menu_items'] = items;







    // (D) SNS項目の保存
    const snsItems = [];
    const snsContainer = document.getElementById('sns-list');
    if (snsContainer) {
        snsContainer.querySelectorAll('.sns-item').forEach(el => {
            snsItems.push({
                type: el.querySelector('.field-sns-type').value,
                href: el.querySelector('.field-sns-href').value,
                otherUrl: el.querySelector('.field-sns-other-url').value,
                ext: el.querySelector('.field-sns-ext').checked
            });
        });
    }
    settings['saved_sns_items'] = snsItems;

    // 配置場所（ヘッダーかフッターか）を保存
    settings['sns-position'] = document.querySelector('input[name="sns-position"]:checked')?.value || 'header';

    return settings;






}

// 2. 保存を実行する関数
function saveToLocal() {
    // 読み込みが完了するまでは保存しないフラグ（誤作動防止）
    if (!window.isLoaded) return;

    const data = getAllSettings();
    localStorage.setItem('generator_backup', JSON.stringify(data));
    // console.log("設定を保存しました"); // デバッグ用
}

// 3. データを復元する関数
function loadFromLocal() {
    const dataStr = localStorage.getItem('generator_backup');
    if (!dataStr) return;

    try {
        const settings = JSON.parse(dataStr);
        
        // (A) 各種入力項目の復元
        Object.keys(settings).forEach(key => {
            // ラジオボタンの復元
            if (key === 'btn-pattern' || 
                key === 'header-pattern' || 
                key === 'cfg-mock-logo-align' || 
                key === 'list-pattern' || 
                key === 'notice-pattern' || 
                key === 'sns-position') {
                
                const val = settings[key];
                const radio = document.querySelector(`input[name="${key}"][value="${val}"]`);
                if (radio) radio.checked = true;
                return;
            }

            // 通常の入力欄の復元
            const el = document.getElementById(key);
            if (el) {
                if (el.type === 'checkbox') {
                    el.checked = settings[key];
                } else {
                    el.value = settings[key];
                }
            }
        });

        // (B) メニュー項目の復元
        if (settings['saved_menu_items'] && menuList) {
            menuList.innerHTML = ''; // 一旦クリア
            settings['saved_menu_items'].forEach((data, idx) => {
                createItem(idx === 0);
                const lastItem = menuList.lastElementChild;
                if (lastItem) {
                    lastItem.querySelector('.field-class').value = data.class;
                    lastItem.querySelector('.field-label').value = data.label;
                    lastItem.querySelector('.field-href').value = data.href;
                    lastItem.querySelector('.field-ext').checked = data.ext;
                    // handleClassChangeなどを実行してUIを同期
                    handleClassChange(lastItem.querySelector('.field-class'));
                    // handleClassChangeでhrefがリセットされる場合があるので再度セット
                    lastItem.querySelector('.field-href').value = data.href;
                }
            });
        }


        // (C) SNS項目の復元
        if (settings['saved_sns_items']) {
            const snsList = document.getElementById('sns-list');
            if (snsList) {
                snsList.innerHTML = '';
                settings['saved_sns_items'].forEach(data => {
                    createSnsItem();
                    const last = snsList.lastElementChild;
                    if (last) {
                        last.querySelector('.field-sns-type').value = data.type;
                        last.querySelector('.field-sns-href').value = data.href;
                        last.querySelector('.field-sns-other-url').value = data.otherUrl;
                        last.querySelector('.field-sns-ext').checked = data.ext;
                        toggleSnsOtherInput(last.querySelector('.field-sns-type'));
                    }
                });
            }
        }

        // 配置場所（ヘッダーかフッターか）を復元
        if (settings['sns-position']) {
            const radio = document.querySelector(`input[name="sns-position"][value="${settings['sns-position']}"]`);
            if (radio) radio.checked = true;
        }

        // (D) カラーピッカーとテキストボックスの同期
        // 保存されたテキスト値(#XXXXXX)を、カラーピッカー側にも反映させる
        if (typeof syncPairs !== 'undefined') {
            syncPairs.forEach(pair => {
                const picker = document.getElementById(pair[0]); // カラーピッカー
                const text = document.getElementById(pair[1]);   // テキスト入力
                if (picker && text) {
                    // テキスト側の値（保存データ）を優先してピッカーに適用
                    if(/^#[0-9A-F]{6}$/i.test(text.value)) {
                         picker.value = text.value;
                    }
                }
            });
        }
        
        // (E) 表示の切り替えを反映
        if(typeof switchPattern === 'function') switchPattern();
        if(typeof switchListPattern === 'function') switchListPattern();
        if(typeof switchNoticePattern === 'function') switchNoticePattern();

    } catch (e) {
        console.error("データの読み込みに失敗しました", e);
    }
}

// =========================================================
// 実行タイミングの制御
// =========================================================

// まだ読み込みが完了していないことを示すフラグ
window.isLoaded = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. 最初は保存を禁止する
    window.isLoaded = false;

    // 2. データを復元する
    loadFromLocal();
    
    // 3. 復元が終わったことを少し遅らせて確定させる（要素の生成待ち）
    setTimeout(() => {
        window.isLoaded = true;
        console.log("設定を復元し、自動保存を有効にしました。");
    }, 500); 

    // 4. イベントリスナーをセット
    document.addEventListener('input', () => {
        if(window.isLoaded) saveToLocal(); // ★isLoadedがtrueの時だけ保存
    });

    document.addEventListener('change', () => {
        if(!window.isLoaded) return; // ★読み込み中は無視
        if(typeof switchPattern === 'function') switchPattern();
        if(typeof switchListPattern === 'function') switchListPattern();
        if(typeof switchNoticePattern === 'function') switchNoticePattern();
        saveToLocal();
        updatePreview();
    });
});

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
    
    // (A) 通常入力の復元
    Object.keys(settings).forEach(key => {
        // ラジオボタンの復元（フッターパターン含む）
        if (key === 'btn-pattern' || 
            key === 'header-pattern' || 
            key === 'cfg-mock-logo-align' || 
            key === 'list-pattern' ||
            key === 'notice-pattern' ||
            key === 'sns-position') {
            
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

    // (B) フッターメニューの復元
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

    // (C) SNS項目の復元
    if (settings['saved_sns_items']) {
        const snsList = document.getElementById('sns-list');
        if (snsList) {
            snsList.innerHTML = ''; // 既存を一旦クリア
            settings['saved_sns_items'].forEach(data => {
                createSnsItem(); // 入力欄を生成
                const lastItem = snsList.lastElementChild;
                if (lastItem) {
                    lastItem.querySelector('.field-sns-type').value = data.type;
                    lastItem.querySelector('.field-sns-href').value = data.href;
                    lastItem.querySelector('.field-sns-other-url').value = data.otherUrl;
                    lastItem.querySelector('.field-sns-ext').checked = data.ext;
                    // その他URL入力欄の表示制御
                    toggleSnsOtherInput(lastItem.querySelector('.field-sns-type'));
                }
            });
        }
    }

    // (D) カラー同期
    if (typeof syncPairs !== 'undefined') {
        syncPairs.forEach(pair => {
            const picker = document.getElementById(pair[0]); // カラーピッカー
            const text = document.getElementById(pair[1]);   // テキストボックス
            if (picker && text) {
                text.value = picker.value.toUpperCase();
            }
        });
    }
    
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
    const pattern = patternEl ? patternEl.value : 'A';
    

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
${prefix} .notice_set { margin: 10px 20px 20px !important; box-shadow: none !important; background: transparent !important; }
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
    if (pattern === 'c') {
        css += `
    ${prefix} .notice_set {
    border-radius: inherit !important;
    position: relative !important;
    z-index: 1 !important;
    box-shadow: none !important;
    background: none;
    padding: 10px 10px;
    margin: 0;
    }
    ${prefix} .notice_list {
    border-bottom: none;
    }
    ${prefix} .notice_list:last-child {
    border-bottom: none !important;
    padding: 0 !important;
    }
    ${prefix} .notice_list > a {
    display: flex !important;
    align-items: center !important;
    padding: 10px 0 !important;
    }
    ${prefix} .notice_list > a > p {
    width: 100px !important; /* 横幅調整：190pxだとスマホで広すぎるため適宜調整 */
    text-align: center !important;
    padding: 0 10px !important;
    }
    ${prefix} .notice_list > a > dl {
    width: calc(100% - 110px) !important;
    display: flex !important;
    flex-direction: column !important;
    }
    ${prefix} .notice_list > a > dl > dt {
    font-weight: 500 !important;
    line-height: 1.3 !important;
    padding: 0 0 5px !important;
    }
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
        // Bなら表示、それ以外(A)なら非表示にする
        target.style.display = (pattern === 'B') ? 'block' : 'none';
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


// ==============================================
// 追加コード：保存・読み込み機能の実行スイッチ
// ==============================================

// 1. 画面を開いた(読み込んだ)ときに、保存データを復元する
document.addEventListener('DOMContentLoaded', () => {
    // データがあれば読み込む
    loadFromLocal();
    
    // 読み込み直後はプレビューが古いままの場合があるので、念のため更新
    setTimeout(updatePreview, 100);
});

// 2. 何か入力(input)や変更(change)があるたびに、自動で保存する
// （キーボード入力中や、ラジオボタン切り替え時など）
document.addEventListener('input', () => {
    saveToLocal();
});

document.addEventListener('change', () => {
    saveToLocal();
});

// =========================================================
// 設定のエクスポート（ダウンロード）とインポート
// =========================================================

// 1. 設定を書き出し (Export)
document.getElementById('export-btn').onclick = () => {
    // 現在の設定データを取得
    const data = getAllSettings();
    // JSON文字列に変換（見やすく整形）
    const jsonStr = JSON.stringify(data, null, 2);
    
    // Blob（ファイルのようなデータ詳細）を作成
    const blob = new Blob([jsonStr], { type: 'application/json' });
    
    // ダウンロードリンクを生成してクリックさせる
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // ファイル名（日付入り）
    const date = new Date();
    const dateStr = date.toISOString().slice(0,10).replace(/-/g, '');
    a.download = `option_generator_settings_${dateStr}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// 2. 設定を読み込み (Import)
const importBtn = document.getElementById('import-btn');
const fileInput = document.getElementById('import-file');

// ボタンを押したら、隠してあるファイル選択ダイアログを開く
importBtn.onclick = () => {
    fileInput.click();
};

// ファイルが選択されたら実行
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    // ファイル読み込み完了時の処理
    reader.onload = (event) => {
        try {
            const jsonStr = event.target.result;
            // 正しいJSONかチェック
            const data = JSON.parse(jsonStr);

            // 簡易チェック（saved_menu_itemsがあるか確認）
            if (!data.saved_menu_items) {
                alert("無効なファイル形式です。");
                return;
            }

            if (confirm("現在の設定を上書きして、ファイルを読み込みますか？")) {
                // LocalStorageに上書き保存
                localStorage.setItem('generator_backup', JSON.stringify(data));
                
                // 画面を再読み込みして反映（これが一番確実です）
                location.reload();
            }
        } catch (error) {
            console.error(error);
            alert("ファイルの読み込みに失敗しました。\n正しいJSONファイルを選択してください。");
        }
    };

    // テキストとしてファイルを読み込む
    reader.readAsText(file);
    
    // 同じファイルを再度選べるようにリセット
    fileInput.value = '';
};