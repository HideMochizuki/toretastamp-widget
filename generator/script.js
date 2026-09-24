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
            <select class="ticket_sort_select" style="font-size:10px; padding:5px 10px; height: 20px;">
                <option value="-expiration_date">有効期限順 ▼</option>
            </select>
        </h3>
        <div id="coupon-list">
            <div class="ticket_list_set" data-ticket-status="get">
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
            <div class="ticket_list_set used" data-ticket-status="used">
                <div class="ticket_list">
                    <a>
                    <p><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/den7ZxsbI7usqqeACj7Q.png" alt=""></p>
                    <dl><dt>お好きなピザプレゼント</dt></dl>
                    </a>
                    <dl class="ticket_list_bottom">
                        <dt><span class="ticket_list_due">利用日時：2026/02/17 18:48:21</span></dt>
                        <dd><a href="#" class="stamp_card_delete_btn" style="color:red; font-size:10px; margin-left:10px;">削除</a></dd>
                    </dl>
                </div>
            </div>
            <div class="ticket_list_set expired" data-ticket-status="expired">
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
    /*
    ticket: `
    <div class="mock-header-v2">
        <h1><a href="#"><img src="https://toretastamp-stg.s3.amazonaws.com/media/upload/lp/RhRKQ7hBSEEB9ad8Wa79.png" alt="レストラントレタ"></a></h1>
    </div>    
    <div class="mock-headermargin-v2"></div>
    <section class="content">
        <h3 class="titleh3"><b>チケット一覧</b>
            <select class="ticket_sort_select" style="font-size:10px; padding:5px 10px; height: 20px;">
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
    */

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

/* ==========================================================
   スタンプ詳細ページ パターンB（チケット獲得表示）
   配布用コードにそのまま出力する固定のスクリプト・CSS
   ========================================================== */
const TICKET_FROM_STAMP_SCRIPT = `$(document).ready(function(){

if($('.stamp_image-list2').length === 0) return;

/* ============================================================
    STEP 1: 「器」だけをページ読み込み直後に【最速】で生成する
============================================================ */
const skeletonHtml = \`
<div class="ticket_list_from_stamp">
    <h3 class="ticket_list_title">獲得可能チケット</h3>
    <div id="ticket_dynamic_area">
        <p class="ticket_none" style="opacity: 0.6; padding: 20px 0;">情報を確認中...</p>
    </div>
</div>\`;

// ページ表示直後にタイトル枠だけ出す
$('.stamp_set').last().after(skeletonHtml);


/* ============================================================
    STEP 2: モーダルHTML（1回だけ追加）
============================================================ */
let executed = false;
const modalHtml = \`
<div class="ticket_modal_overlay">
    <div class="ticket_modal">
    <button class="ticket_modal_close">×</button>
    <div class="ticket_modal_inner">
        <div class="ticket_modal_slider"></div>
        <div class="ticket_modal_dots"></div>
        <div class="ticket_modal_caption"></div>
    </div>
    </div>
</div>\`;
$('body').append(modalHtml);

// ▼ クーポンが揃ったか判定する関数
function couponReady(){
    return $('.stamp_image-wrapper2[data-coupon]:visible').length > 0;
}

/* ============================================================
    STEP 3: 変化を監視して実行（分割処理対応）
============================================================ */
const observer = new MutationObserver(()=>{
    if(!executed && couponReady()){
        executed = true;
        observer.disconnect();
        buildTicketList();
    }
});

observer.observe(document.body,{ childList:true, subtree:true });

// ▼ 最悪 DOMが来なかった場合でも3秒後には強制実行
setTimeout(()=>{
    if(!executed){
        executed = true;
        observer.disconnect();
        buildTicketList();
    }
},3000);


/* ============================================================
    STEP 4: チケットの中身を生成して流し込む処理
============================================================ */
function buildTicketList(){
    // 実際のデータ抽出と計算
    const $coupons = $('.stamp_image-wrapper2').filter(function(){
        const coupon = $(this).data('coupon') ?? "";
        return coupon !== "" && $(this).is(':visible');
    });

    const currentStamps = $('.stamp_image-wrapper2').filter(function () {
        const isStampOn = $(this).hasClass('stamp_on_img');
        const isCouponGet = $(this).data('coupon-status') === 'get';
        return isStampOn || isCouponGet;
    }).length;

    const $dynamicArea = $('#ticket_dynamic_area');

    // チケットがない場合の処理
    if($coupons.length === 0){
        $dynamicArea.html(\`<p class="ticket_none">このスタンプ帳は獲得できるチケットがありません。</p>\`);
        return;
    }

    // リストの中身を構築
    let listHtml = \`<ul class="ticket_list_ul">\`;

    $coupons.each(function(){
        const $c = $(this);
        const couponName = $c.data('coupon');
        const status     = $c.data('coupon-status');
        const imgFiles   = ($c.data('img') || "").split(',').map(v=>v.trim()).filter(v=>v);
        const number     = Number($c.attr('id').replace(/[^\\d]/g,''));
        const got        = (status === "get");
        const left       = Math.max(number - currentStamps, 0);

        let badge = '';
        if(couponName.includes('抽選')) badge = \`<span class="badge badge-lottery">抽選</span>\`;
        else if(couponName.includes('えらべる')||couponName.includes('選択')) badge=\`<span class="badge badge-select">選択</span>\`;

        const statusText = got
            ? \`<span class="ticket_status got_label">獲得済み</span>\`
            : \`スタンプ残り：<b>\${left} 個</b>\`;

        const imgDom = imgFiles.length > 0
            ? imgFiles.map(img => {
                const src = img.startsWith('http') ? img :
                            img.startsWith('default/')
                            ? \`https://toretastamp-prod.s3.amazonaws.com/media/upload/\${img}\`
                            : \`https://toretastamp-prod.s3.amazonaws.com/media/upload/stamp/\${img}\`;
                return \`<img src="\${src}" alt="\${couponName}">\`;
            }).join('')
            : \`<img src="https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/Tbq9BQVwgzzA8i5qFYv8.png" alt="ticket">\`;

        listHtml += \`
        <li class="ticket_list_item\${got?' got':''}\${imgFiles.length>1?' multi':''}" data-name="\${couponName}">
            <div class="ticket_img">
                <div class="ticket_img_multi" data-count="\${imgFiles.length}">\${imgDom}</div>
            </div>
            <dl class="ticket_info \${imgFiles.length>1?'multi':''}">
                <dt>\${badge}\${couponName}</dt><dd>\${statusText}</dd>
            </dl>
        </li>\`;
    });

    listHtml += \`</ul>\`;

    // 4. 「確認中...」を消して、リストを流し込む
    $dynamicArea.hide().html(listHtml).fadeIn(500);
}


/* ============================================================
    STEP 5: モーダル関連のイベント（変更なし）
============================================================ */
$(document).on('click', '.ticket_img_multi', function() {
    const $imgs = $(this).find('img');
    const $slider = $('.ticket_modal_slider');
    const $dots = $('.ticket_modal_dots');
    const $caption = $('.ticket_modal_caption');
    const couponName = $(this).closest('.ticket_list_item').data('name');

    let badgeHtml = '';
    if (couponName.includes('抽選')) badgeHtml = '<span class="badge badge-lottery">抽選</span>';
    else if (couponName.includes('えらべる') || couponName.includes('選択')) badgeHtml = '<span class="badge badge-select">選択</span>';

    $slider.empty();
    $dots.empty();
    $caption.text(couponName);

    $imgs.each(function(i) {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        const active = i === 0 ? 'active' : '';
        $slider.append(\`
        <div class="ticket_slide \${active}">
            <div class="ticket_slide_img">
            \${badgeHtml}
            <img src="\${src}" alt="\${alt}">
            </div>
        </div>
        \`);
        $dots.append(\`<span class="\${i === 0 ? 'active' : ''}" data-index="\${i}"></span>\`);
    });

    $('.ticket_modal_overlay').fadeIn(200);
});

$(document).on('click', '.ticket_modal_close, .ticket_modal_overlay', function(e) {
    if ($(e.target).is('.ticket_modal_overlay, .ticket_modal_close')) {
        $('.ticket_modal_overlay').fadeOut(200, function() {
            $('.ticket_modal_slider, .ticket_modal_dots, .ticket_modal_caption').empty();
        });
    }
});

$(document).on('click', '.ticket_modal_dots span', function() {
    const index = $(this).data('index');
    $('.ticket_slide').removeClass('active').eq(index).addClass('active');
    $('.ticket_modal_dots span').removeClass('active').eq(index).addClass('active');
});

let startX = 0;
$(document).on('touchstart', '.ticket_modal_slider', e => startX = e.originalEvent.touches[0].clientX);
$(document).on('touchend', '.ticket_modal_slider', e => {
    const endX = e.originalEvent.changedTouches[0].clientX;
    if (startX - endX > 50) {
        let next = $('.ticket_slide.active').next('.ticket_slide');
        if (!next.length) next = $('.ticket_slide').first();
        next.addClass('active').siblings().removeClass('active');
        const idx = next.index();
        $('.ticket_modal_dots span').removeClass('active').eq(idx).addClass('active');
    }
    if (endX - startX > 50) {
        let prev = $('.ticket_slide.active').prev('.ticket_slide');
        if (!prev.length) prev = $('.ticket_slide').last();
        prev.addClass('active').siblings().removeClass('active');
        const idx = prev.index();
        $('.ticket_modal_dots span').removeClass('active').eq(idx).addClass('active');
    }
});

});`;

const TICKET_FROM_STAMP_CSS = `
/* =========================================
    スタンプページ　チケット情報
    ========================================= */
    .ticket_list_from_stamp {
    border-radius: 15px;
    background-color: #ffffffc9;
    margin: 0 20px 20px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #32231a;
    font-family:'Noto Sans JP', sans-serif;
}
.ticket_list_title {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 10px;
    padding-left: 10px;
    border-bottom: 3px solid #000000ba;
    margin-bottom: 25px;
    margin-top: 10px;
}
.ticket_list_ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.ticket_list_item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
    gap: 12px;
}
li.ticket_list_item.multi {
    margin: 10px 0 0 -2px;
}
.ticket_modal .ticket_list_item {
    display: block;
}
.ticket_list_item:last-child {
    margin-bottom: 0;
}
.ticket_img img {
    width: 80px;
    height: auto;
    border-radius: 8px;
}
dl.ticket_info {
    width: 100%;
    position: relative;
}
dl.ticket_info.multi {
    margin: 0 0 0 72px;
}
.ticket_info dt {
    color: #32231a;
    font-weight: 700;
    font-size: 15px;
    margin: 5px 0 0 0;
    padding: 25px 0 0 0;
    line-height:1.4;
}
.ticket_info dd {
    color: #32231a;
    font-size: 13px;
    margin: 6px 20px 0 0;
    text-align: right;
    font-weight: 500;
}
.ticket_none {
    color: #32231a;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 0px 0 10px;
    opacity: 0.9;
}
.ticket_list_item.got {
    opacity: 0.6;
    position: relative;
}

.ticket_list_item.got::after {
    content: "獲得済";
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 5px 8px;
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translate(-50%, -50%);
    z-index: 100;
}

/* =========================================
    チケット一覧　タブ
    ========================================= */
    .ticket_tab_menu {
    display: flex;
    background-color: #ffffff33;
    margin: 0px 0 20px;
    border-bottom: 1.5px solid #e1e1e1;
    align-items: stretch;
}
.ticket_tab_btn {
    flex: 1;
    border: none;
    background: transparent;
    color: #32231A;
    font-weight: 700;
    font-size: 12px;
    padding: 8px 0;
    transition: background 0.2s ease;
    font-weight: 300;
}

.ticket_tab_btn.active {
    background-color: transparent;
    color: #333;
    border-bottom: 7px solid #333;
    margin-top: 0;
    padding: 0 0 0px 0;
    font-weight: 600;
}
/* =============================
▼ チケット画像全体レイアウト
============================= */
.ticket_modal .ticket_img {
position: relative;
display: inline-block;
vertical-align: middle;
margin-right: 20px;
}

/* =============================
▼ 通常1枚画像
============================= */
.ticket_modal .ticket_img_multi[data-count="1"] {
display: inline-flex;
align-items: center;
justify-content: center;
}
.ticket_img_multi[data-count="1"] img {
width: 85px;
height: auto;
border-radius: 0px;
}

/* =============================
▼ 複数チケット画像（重なりあり）
============================= */
.ticket_modal .ticket_img_multi {
position: relative;
display: inline-block;
width: 70px;
height: 70px;
vertical-align: middle;
}

/* ▼ 2枚重ね */
.ticket_img_multi[data-count="2"] img:nth-child(1) {
position: absolute;
z-index: 2;
top: 0;
left: 0;
width: 65px;
border-radius: 0px;
border: 1px solid #ddd;
}
.ticket_img_multi[data-count="2"] img:nth-child(2) {
position: absolute;
z-index: 1;
top: 6px;
left: 6px;
width: 65px;
border-radius: 0px;
border: 1px solid #ddd;
}

/* ▼ 3枚重ね */
.ticket_img_multi[data-count="3"] img:nth-child(1) {
position: absolute;
z-index: 3;
top: 0;
left: 0;
width: 63px;
}
.ticket_img_multi[data-count="3"] img:nth-child(2) {
position: absolute;
z-index: 2;
top: 6px;
left: 6px;
width: 63px;
}
.ticket_img_multi[data-count="3"] img:nth-child(3) {
position: absolute;
z-index: 1;
top: 12px;
left: 12px;
width: 63px;
}

/* ▼ 4枚重ね */
.ticket_img_multi[data-count="4"] img:nth-child(1) {
position: absolute;
z-index: 4;
top: 0;
left: 0;
width: 60px;
}
.ticket_img_multi[data-count="4"] img:nth-child(2) {
position: absolute;
z-index: 3;
top: 5px;
left: 5px;
width: 60px;
}
.ticket_img_multi[data-count="4"] img:nth-child(3) {
position: absolute;
z-index: 2;
top: 10px;
left: 10px;
width: 60px;
}
.ticket_img_multi[data-count="4"] img:nth-child(4) {
position: absolute;
z-index: 1;
top: 15px;
left: 15px;
width: 60px;
}

/* =============================
▼ 選択／抽選ラベル
============================= */
.badge {
position: absolute;
top: 10px;
left: 0;
display: inline-block;
font-size: 10.5px;
font-weight: 700;
padding: 2px 7px;
border-radius: 5px;
color: #fff;
line-height: 1.1;
box-shadow: 0 1px 2px rgba(0,0,0,0.15);
z-index: 20;
}
.badge-lottery {
background-color: #c10003;
}
.badge-select {
background-color: #f6a700;
}

/* =============================
▼ スマホ対応
============================= */
@media (max-width: 600px) {
.ticket_modal .ticket_img_multi[data-count="1"] img,
.ticket_modal .ticket_img_multi[data-count="2"] img,
.ticket_modal .ticket_img_multi[data-count="3"] img,
.ticket_modal .ticket_img_multi[data-count="4"] img {
width: 70px;
}

.ticket_modal .ticket_img {
margin-right: 15px;
}
}

/* =============================
▼ チケットモーダル（ドット付）
============================= */
.ticket_modal_overlay {
position: fixed;
inset: 0;
background: rgba(0,0,0,0.6);
display: none;                 /* ✅ 最初は非表示 */
justify-content: center;
align-items: center;
z-index: 9999;
}

.ticket_modal {
background: #fff;
border-radius: 20px;
padding: 20px 25px 15px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 320px;
max-width: 95%;
text-align: center;
box-shadow: 0 5px 20px rgba(0,0,0,0.3);
animation: fadeInModal 0.25s ease;
}

@keyframes fadeInModal {
from {
transform: translate(-50%, -50%) scale(0.95);  /* ← 位置と拡大を同時に指定 */
opacity: 0;
}
to {
transform: translate(-50%, -50%) scale(1);     /* ← 中央位置を維持したまま拡大 */
opacity: 1;
}
}

.ticket_modal_close {
    position: absolute;
    top: -17px;
    right: -17px;
    background: #000000;
    border: 2px solid #000000;
    color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 33px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 0 6px 0;
}
/* 画像スライド */
.ticket_modal_slider {
position: relative;
overflow: hidden;
margin-bottom: 10px;
}
.ticket_slide {
display: none;
}
.ticket_slide.active {
display: block;
}
.ticket_slide_img {
position: relative;
}
.ticket_slide_img img {
width: 100%;
height: auto;
border-radius: 10px;
}

/* バッジ（選択・抽選） */
.ticket_slide_img .badge {
position: absolute;
top: 6px;
left: 6px;
font-size: 15px;
font-weight: 700;
padding: 3px 8px;
border-radius: 6px;
color: #fff;
box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.badge-lottery { background-color: #c10003; }
.badge-select { background-color: #f6a700; }

/* ドットインジケーター */
.ticket_modal_dots {
display: flex;
justify-content: center;
gap: 6px;
margin: 8px 0 4px;
}
.ticket_modal_dots span {
display: inline-block;
width: 8px;
height: 8px;
border-radius: 50%;
background: #ccc;
transition: background 0.2s;
cursor: pointer;
}
.ticket_modal_dots span.active {
background: #444;
}

/* キャプション */
.ticket_modal_caption {
font-weight: 700;
font-size: 14px;
color: #32231a;
margin-top: 15px;
line-height: 1.4;
}
li.ticket_list_item .ticket_img_multi::after {
    content: "＋";
    z-index: 10;
    border: 2px solid #444444;
    border-radius: 100%;
    font-size: 15px;
    width: 25px;
    height: 25px;
    font-weight: 800;
    left: -5px;
    position: absolute;
    /* bottom: 7px; */
    top: 0;
    background-color: #fffffff5;
    color: #444444;
    display: flex;
    font-family: 'Noto Sans JP', sans-serif;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 2px;
}

/* =============================
▼ チケット獲得スタンプ（プレゼントアイコン）
============================= */
.stamp_image-list2 li.stamp_image-wrapper2.get_coupon::before {
    content: "";
    width: 40%;
    height: 40%;
    background-image: url(https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/jPMZk1GCUUFKBlpEslUG.png);
    background-position: center;
    background-size: contain;
    z-index: 10;
    position: absolute;
    bottom: 5%;
    right: 5%;
    background-repeat: no-repeat;
    opacity: 0.8;
}`;

/* プレビュー用：実データが無いので、チケット一覧画面と同じサンプルチケットを流用して見た目だけ再現する */
function buildTicketFromStampPreviewHtml() {
    const samples = [
        {
            name: 'お好きなピザプレゼント',
            img: 'https://toretastamp-stg.s3.amazonaws.com/media/upload/stamp/j25fdwy2uJ1ykNwKelCg.png',
            got: true
        },
        {
            name: '選べるフードチケット（ドリンク1杯無料！）',
            img: 'img/09_ticketdrink.png',
            got: false,
            left: 2,
            badge: '<span class="badge badge-select">選択</span>'
        }
    ];

    const items = samples.map(s => `
        <li class="ticket_list_item${s.got ? ' got' : ''}" data-name="${s.name}">
            <div class="ticket_img">
                <div class="ticket_img_multi" data-count="1"><img src="${s.img}" alt="${s.name}"></div>
            </div>
            <dl class="ticket_info">
                <dt>${s.badge || ''}${s.name}</dt>
                <dd>${s.got ? '<span class="ticket_status got_label">獲得済み</span>' : `スタンプ残り：<b>${s.left} 個</b>`}</dd>
            </dl>
        </li>`).join('');

    return `
        <div class="ticket_list_from_stamp">
            <h3 class="ticket_list_title">獲得可能チケット</h3>
            <div id="ticket_dynamic_area">
                <ul class="ticket_list_ul">${items}</ul>
            </div>
        </div>`;
}

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
    ['cfg-h3-color', 'cfg-h3-color-val'],
    ['cfg-btn1-icon-c', 'cfg-btn1-icon-c-val'],
    ['cfg-btn2-icon-c', 'cfg-btn2-icon-c-val'],
    ['cfg-b-btn1-icon-c', 'cfg-b-btn1-icon-c-val'],
    ['cfg-b-btn2-icon-c', 'cfg-b-btn2-icon-c-val'],
    ['cfg-c-btn1-icon-c', 'cfg-c-btn1-icon-c-val'],
    ['cfg-c-btn2-icon-c', 'cfg-c-btn2-icon-c-val'],
    
    // ヘッダー用
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
    ['cfg-st-due-border-c', 'cfg-st-due-border-c-val'],
    // 共通ボタン用
    ['cfg-pgbtn-bg-c', 'cfg-pgbtn-bg-val'],
    ['cfg-pgbtn-txt-c', 'cfg-pgbtn-txt-val'],
    ['cfg-pgbtn-border-c', 'cfg-pgbtn-border-c-val'],
    // オレンジボタン用
    ['cfg-pgbtn-org-bg-c', 'cfg-pgbtn-org-bg-val'],
    ['cfg-pgbtn-org-txt-c', 'cfg-pgbtn-org-txt-val'],
    ['cfg-pgbtn-org-border-c', 'cfg-pgbtn-org-border-c-val'],
    // お知らせ用
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
    ['cfg-ticket-tab-active-c', 'cfg-ticket-tab-active-val'],

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
                
                const headerBg = getV('cfg-header-bg-top') || getV('cfg-header-bg') || '#ffffff';
                headerTop.style.setProperty('background-color', headerBg, 'important');
                headerTop.style.setProperty('box-shadow', '1px 5px 5px 0 rgba(0, 0, 0, 0.1)', 'important');
                headerTop.style.setProperty('background-image', 'none', 'important');
                headerTop.style.height = '50px';

                const headerImg = headerTop.querySelector('img');
                if (headerImg) {
                    headerImg.style.setProperty('max-width', '35%', 'important');
                }
            }
            if(headerH1) {
                headerH1.style.setProperty('margin', '0 auto', 'important');
                headerH1.style.setProperty('width', '100px', 'important');
            }
            
            // スライダー枠の生成
            if (!sliderWrap && headerTop) {
                const wrap = document.createElement('div');
                wrap.className = 'header-slider-wrap';
                wrap.innerHTML = `<div class="header-slider"><div class="header-slide" style="height: 100%;"></div></div>`;
                headerTop.after(wrap);
                sliderWrap = wrap;
            }
            
            // スライダー枠へのスタイル適用
            if (sliderWrap) {
                const sWidth = document.getElementById('cfg-header-slider-width')?.value || '500';
                const sHeight = document.getElementById('cfg-header-slider-height')?.value || '500';
                sliderWrap.style.width = '100%';
                sliderWrap.style.height = 'auto';
                sliderWrap.style.aspectRatio = `${sWidth} / ${sHeight}`;
        
                sliderWrap.style.marginTop = '0px'; 
                sliderWrap.style.top = '0px';
                sliderWrap.style.marginBottom = '0px';
            }
        
            
            const slide = sliderWrap?.querySelector('.header-slide');
            if (slide) {
                slide.style.backgroundImage = `url('${getV('cfg-header-main-img')}')`;
            }

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

                const headerImg = headerTop.querySelector('img');
                if (headerImg) {
                    headerImg.style.removeProperty('max-width');
                }
                headerTop.style.removeProperty('box-shadow');
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
    const menuCount = document.querySelectorAll('.menu-item:not(.sns-item)').length; // 項目数を数える

    if (previewFooter) {
        if (menuCount > 0) {
            previewFooter.style.display = 'block'; // 1個以上あれば表示
            previewFooter.style.backgroundColor = fBg;
        } else {
            previewFooter.style.display = 'none';  // 0個なら土台ごと消す
        }
    }

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

    // updatePreview 関数内の適当な場所（applyCurrentDesignToMock の前など）
    const h3Elements = mock.querySelectorAll('.titleh3');
    h3Elements.forEach(el => {
        el.style.setProperty('font-size', getV('cfg-h3-size'), 'important');
        el.style.setProperty('font-weight', getV('cfg-h3-weight'), 'important');
        el.style.setProperty('color', getV('cfg-h3-color-val'), 'important');
        el.style.setProperty('line-height', getV('cfg-h3-lh'), 'important');
    });

    // --- 【updatePreview内に追記】カード透かしロゴのプレビュー反映 ---
    const watermarkOn = document.getElementById('cfg-card-watermark-on')?.checked;
    const watermarkUrl = document.getElementById('cfg-card-watermark-url')?.value;
    
    // ⭐ 形状の設定値を取得
    const wmShape = document.getElementById('cfg-st-watermark-shape')?.value || 'landscape';
    const wmWidth = (wmShape === 'square') ? '75px' : '100px';
    const wmHeight = (wmShape === 'square') ? '75px' : '40px';
    
    // 現在の画面がスタンプ一覧のときだけ反映
    if (mock.dataset.currentScreen === 'stamp' && watermarkOn && watermarkUrl !== "") {
        updateDynamicStyle(`
            .mock-screen .stamp_card { position: relative; }
            .mock-screen .stamp_card::after {
                content: "";
                position: absolute;
                bottom: 10px;
                right: 10px;
                width: ${wmWidth} !important;
                height: ${wmHeight} !important;
                background-image: url('${watermarkUrl}');
                background-size: contain;
                background-repeat: no-repeat;
                pointer-events: none;
            }
        `, 'dyn-style-watermark');
    } else {
        const styleEl = document.getElementById('dyn-style-watermark');
        if (styleEl) styleEl.remove();
    }

    const listAlign = getV('cfg-list-align');

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

        setTimeout(() => {
            applyCurrentDesignToMock();
        }, 100);

        updatePreview();

    }, 50); // 50ms待ってからイベントを貼る
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
    
    // 【重要】ここの { から下の } までの間に、すべての処理を入れる必要があります
    if (listArea) {
        const listBg = getV('cfg-list-bg-val');
        const listTxt = getV('cfg-list-txt-val');
        const listFontSize = getV('cfg-list-size');
        const borderOn = document.getElementById('cfg-list-border-on')?.checked;
        const borderW = getV('cfg-list-border-w');
        const borderC = getV('cfg-list-border-c-val');

        listArea.style.setProperty('background-color', listBg, 'important');
        listArea.style.setProperty('opacity', '1', 'important');

        // リストリンクのデザイン適用
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

        // 配置（アラインメント）の反映
        const listAlign = getV('cfg-list-align');
        const listUl = listArea.querySelector('ul');
        if (listUl) {
            listUl.style.setProperty('text-align', listAlign, 'important');
        }
        
        const listItems = listArea.querySelectorAll('ul li');
        listItems.forEach(li => {
            li.style.setProperty('text-align', listAlign, 'important');
            li.style.setProperty('display', 'block', 'important'); 
        });
    } 

    let finalCSS = "";

    finalCSS += `
        /* 全ページ共通の見出しスタイルを強制適用 */
        .mock-screen .titleh3, 
        .mock-screen .titleh3 b,
        .mock-screen section.content .titleh3 { 
            font-size: ${getV('cfg-h3-size')} !important; 
            font-weight: ${getV('cfg-h3-weight')} !important; 
            color: ${getV('cfg-h3-color-val')} !important; 
            line-height: ${getV('cfg-h3-lh')} !important; 
        }
    `;

    // --- 4. スタンプ帳デザインCSSの生成（スタンプ帳一覧・スタンプ履歴の両方で同じデザインを使う） ---
    if (mock.dataset.currentScreen === 'stamp' || mock.dataset.currentScreen === 'history') {
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

        // スタンプ帳一覧では「カード」= .stamp_card（.stamp_setは外枠）。
        // スタンプ履歴では .stamp_card が存在せず、.stamp_set 自体がカードなので対象を切り替える。
        const cardSelector = mock.dataset.currentScreen === 'history' ? '.mock-screen .stamp_set' : '.mock-screen .stamp_card';

        finalCSS += `
            /* カード本体のデザイン */
            ${cardSelector} {
                background-color: ${getV('cfg-st-card-bg-val')} !important;
                border-radius: ${getV('cfg-st-radius')} !important;
                border: ${borderOn ? `${getV('cfg-st-border-w')} solid ${stColor}` : 'none'} !important;
                outline: ${borderOn ? `${getV('cfg-st-outline-w')} solid ${stColor}` : 'none'} !important;
                outline-offset: -7px;
                position: relative;
                overflow: hidden;
            }

            /* カード透かしロゴ（選択したサイズを適用） */
            ${cardSelector}::before {
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
            .mock-screen .ticket_list_due { color: ${stDueTxtColor} !important; border: ${document.getElementById('cfg-st-due-border-on')?.checked ? `${getV('cfg-st-due-border-w')} solid ${getV('cfg-st-due-border-c-val')}` : 'none'} !important; border-radius: ${getV('cfg-st-label-radius')} !important; background-color: ${getV('cfg-st-label-bg-val')} !important; }
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
        finalCSS += getStampDetailsCSS(false);
    }

    // --- スタンプ詳細ページ パターンB（チケット獲得表示）のプレビュー ---
    if (mock.dataset.currentScreen === 'stamp_details') {
        const sdPattern = document.querySelector('input[name="stamp-detail-pattern"]:checked')?.value || 'A';
        const existingTicketFromStamp = mock.querySelector('.ticket_list_from_stamp');
        if (sdPattern === 'B') {
            finalCSS += `\n@scope (.mock-screen) {\n${TICKET_FROM_STAMP_CSS}\n}`;
            // 管理画面側の共通 .badge スタイル（カードラベル用）が漏れて位置崩れするのを、プレビュー内だけ打ち消す
            finalCSS += `\n.mock-screen .ticket_list_from_stamp .badge,\n.mock-screen .ticket_modal .badge {\n    margin: 0;\n    letter-spacing: normal;\n    right: auto;\n}`;
            if (!existingTicketFromStamp) {
                const stampSet = mock.querySelector('.stamp_set');
                if (stampSet) stampSet.insertAdjacentHTML('afterend', buildTicketFromStampPreviewHtml());
            }
            // 3つ目のスタンプ画像に、チケット獲得アイコンをオーバーレイ表示する
            const stampWrapper = mock.querySelector('.stamp_wrapper');
            if (stampWrapper && !stampWrapper.querySelector('.stamp-get-coupon-preview')) {
                const thirdImg = stampWrapper.querySelectorAll('img')[2];
                if (thirdImg) {
                    const wrapper = document.createElement('span');
                    wrapper.className = 'stamp-get-coupon-preview';
                    wrapper.style.cssText = 'position:relative; display:inline-block; width:25%; vertical-align:top;';
                    thirdImg.parentNode.insertBefore(wrapper, thirdImg);
                    thirdImg.style.width = '100%';
                    wrapper.appendChild(thirdImg);

                    const icon = document.createElement('span');
                    icon.className = 'stamp-get-coupon-icon';
                    icon.style.cssText = 'content:""; display:block; width:40%; height:40%; background-image:url(https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/jPMZk1GCUUFKBlpEslUG.png); background-position:center; background-size:contain; background-repeat:no-repeat; z-index:10; position:absolute; bottom:5%; right:5%; opacity:0.8;';
                    wrapper.appendChild(icon);
                }
            }
        } else {
            if (existingTicketFromStamp) existingTicketFromStamp.remove();
            const wrapper = mock.querySelector('.stamp-get-coupon-preview');
            if (wrapper) {
                const img = wrapper.querySelector('img');
                if (img) {
                    img.style.width = '25%';
                    wrapper.parentNode.insertBefore(img, wrapper);
                }
                wrapper.remove();
            }
        }
    }

    // チケット一覧ページCSS
    if (mock.dataset.currentScreen === 'ticket' && typeof getTicketPageCSS === 'function') {
        if (mock.dataset.currentScreen === 'ticket') {
            const tPattern = document.querySelector('input[name="ticket-pattern"]:checked')?.value || 'A';
            const sortSelect = mock.querySelector('.ticket_sort_select');
            let tabMenu = mock.querySelector('.ticket_tab_menu');
            let noTicketMsg = mock.querySelector('#js-no-ticket-msg');

            if (tPattern === 'B') {
                if (sortSelect) sortSelect.style.setProperty('display', 'none', 'important');
                
                if (!tabMenu) {
                    const h3 = mock.querySelector('h3.titleh3');
                    if (h3) {
                        h3.insertAdjacentHTML('afterend', `
                        <div class="ticket_tab_menu">
                            <button class="ticket_tab_btn active" data-target="get">利用可</button>
                            <button class="ticket_tab_btn" data-target="used">利用済み</button>
                            <button class="ticket_tab_btn" data-target="expired">期限切れ</button>
                        </div>
                        `);
                    }
                    
                    const list = mock.querySelector('#coupon-list');
                    if (list && !noTicketMsg) {
                        list.insertAdjacentHTML('afterbegin', '<div id="js-no-ticket-msg" style="display:none; text-align:center; padding:20px; color:#666; font-size:14px;"></div>');
                    }

                    // タブのクリック切り替え処理（プレビュー用）
                    const newTabs = mock.querySelectorAll('.ticket_tab_btn');
                    newTabs.forEach(t => t.onclick = (e) => {
                        e.preventDefault();
                        newTabs.forEach(btn => btn.classList.remove('active'));
                        t.classList.add('active');
                        
                        const target = t.dataset.target;
                        const msgArea = mock.querySelector('#js-no-ticket-msg');
                        const cards = mock.querySelectorAll('.ticket_list_set');
                        let count = 0;
                        
                        cards.forEach(card => {
                            if (card.dataset.ticketStatus === target) {
                                card.style.display = '';
                                count++;
                            } else {
                                card.style.display = 'none';
                            }
                        });
                        
                        if (count === 0 && msgArea) {
                            let message = target === 'get' ? "利用可能なチケットがありません" : 
                                        target === 'used' ? "利用済みのチケットはありません" : "期限切れのチケットはありません";
                            msgArea.textContent = message;
                            msgArea.style.display = '';
                        } else if (msgArea) {
                            msgArea.style.display = 'none';
                        }
                    });

                    // 初期状態のクリックを発火
                    const getTab = mock.querySelector('.ticket_tab_btn[data-target="get"]');
                    if (getTab) getTab.click();
                }
            } else {
                // Aに戻した時のリセット処理
                if (sortSelect) sortSelect.style.removeProperty('display');
                if (tabMenu) tabMenu.remove();
                if (noTicketMsg) noTicketMsg.remove();
                mock.querySelectorAll('.ticket_list_set').forEach(card => card.style.display = '');
            }
        }
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
    // 共通ボタン・オレンジボタンの直塗り処理
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
// ★チケット一覧パターンの設定エリアの表示/非表示を切り替える関数
function switchTicketPattern() {
    const patternEl = document.querySelector('input[name="ticket-pattern"]:checked');
    if (!patternEl) return;
    
    const pattern = patternEl.value;
    const target = document.getElementById('ticket-pattern-b-settings');
    
    if (target) {
        target.style.display = (pattern === 'B') ? 'block' : 'none';
    }
}
function handleClassChange(select) {
    const item = select.closest('.menu-item');
    const href = item.querySelector('.field-href');
    const aclass = item.querySelector('.field-aclass');
    const label = item.querySelector('.field-label');
    const mapHint = item.querySelector('.map-hint');

    // 一旦リセット
    href.disabled = false;
    href.style.background = '';
    aclass.disabled = false;
    aclass.style.background = '';
    if (mapHint) mapHint.style.display = 'none';

    if (select.value === 'map') {
        if (mapHint) mapHint.style.display = 'block';
        href.value = '#'; href.disabled = true;
        aclass.value = 'open-reserve'; aclass.disabled = true;
        label.value = '近くの店舗';
        href.style.background = '#f0f0f0'; aclass.style.background = '#f0f0f0';
    } 
    // ⭐ オフィシャル選択時の自動処理を追加
    else if (select.value === 'official') {
        aclass.value = 'open-iframe-modal'; 
        aclass.disabled = true; // クラスを固定
        aclass.style.background = '#f0f0f0';
        if (label.value === '') label.value = '公式サイト';
    }
    else {
        // それ以外の場合は以前の値をクリア、または自由入力を許可
        if (href.value === '#') href.value = '';
        aclass.value = '';
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
    const commonUlStyle = ".top_button > ul { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 15px; margin: 0; list-style: none; }";

    // --- Aパターン ---
    if (selectedPattern === 'A') {
        // 1. まず現在の設定値をすべて取得する
        const bg1 = getV('cfg-btn1-bg-val').toUpperCase();
        const txt1 = getV('cfg-btn1-txt-val').toUpperCase();
        const icon1 = getV('cfg-btn1-icon-c-val').toUpperCase();
        const bg2 = getV('cfg-btn2-bg-val').toUpperCase();
        const txt2 = getV('cfg-btn2-txt-val').toUpperCase();
        const icon2 = getV('cfg-btn2-icon-c-val').toUpperCase();
        const b1on = getC('cfg-btn1-border-on');
        const b2on = getC('cfg-btn2-border-on');

        // 2. デフォルト状態（初期値）かどうかを判定する
        const isDefault = (
            bg1 === '#FFFFFF' && txt1 === '#000000' && icon1 === '#000000' &&
            bg2 === '#FFFFFF' && txt2 === '#000000' && icon2 === '#000000' &&
            b1on === false && b2on === false
        );

        // 3. 全て初期値のままなら何も出力せず終了する
        if (isDefault) return "";

        // 4. 一つでも変更がある場合のみ、枠線の設定などを行う
        const b1Border = b1on ? `${getV('cfg-btn1-border-w')} solid ${getV('cfg-btn1-border-c-val')}` : 'none';
        const b2Border = b2on ? `${getV('cfg-btn2-border-w')} solid ${getV('cfg-btn2-border-c-val')}` : 'none';

        // 5. 最後に共通スタイルと個別スタイルを合体させて返す
        return `\n${commonUlStyle}\n` + `
/* --- Aパターン専用 --- */
.top_button > ul > li { width: calc(48% - 5px); border-radius: 15px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-bottom: 10px; list-style: none; transform: translateZ(0); }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 20px; text-decoration: none; }
.button_info { width: 100%; font-size: 14px; font-weight: 700; padding: 10px 0 0; text-align: center; }

/* 左ボタン */
.top_button > ul > li:nth-child(1) { background-color: ${bg1} !important; border: ${b1Border} !important; }
.top_button > ul > li:nth-child(1) .button_info { color: ${txt1} !important; }
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

        // ★共通レイアウト(commonUlStyle)と個別デザインを合体させて返す
        return `\n${commonUlStyle}\n` + `
/* --- Bパターン専用：修正後の生成コード --- */
.top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; transform: translateZ(0); }

/* aタグ：横並び(row)を明示し、高さをアイコンに合わせる */
.top_button > ul > li > a { 
    display: flex !important; 
    flex-direction: row !important; 
    align-items: center !important; 
    justify-content: center !important; /* 中央寄せ */
    padding: 15px 15px !important; 
    text-decoration: none !important; 
}

/* 左上の装飾角 */
.top_button > ul > li:before { content: ""; content: ""; position: absolute; width: 7px; height: 7px; right: 12px; top: 50%; margin-top: -4px; z-index: 3;left: auto; transform: rotateZ(-45deg);}

.top_button > ul > li:nth-child(1):before { border-bottom: ${b1.befW} solid ${b1.befC}; border-right: ${b1.befW} solid ${b1.befC}; }
.top_button > ul > li:nth-child(2):before { border-bottom: ${b2.befW} solid ${b2.befC}; border-right: ${b2.befW} solid ${b2.befC}; }

/* --- ボタン個別スタイル --- */
.top_button > ul > li:nth-child(1) { background-color: ${b1.bg} !important; border: ${b1.on ? b1.bw+' solid '+b1.bc : 'none'} !important; border-radius: ${b1.radius} !important; }
.top_button > ul > li:nth-child(2) { background-color: ${b2.bg} !important; border: ${b2.on ? b2.bw+' solid '+b2.bc : 'none'} !important; border-radius: ${b2.radius} !important; }

/* テキストスタイル：余白を調整 */
.top_button > ul > li .button_info { 
    color: inherit; 
    font-size: 14px; 
    font-weight: 700; 
    padding: 0 !important; 
    margin-left: 8px !important; /* アイコンとの間隔 */
    text-align: left !important;
}
.top_button > ul > li:nth-child(1) .button_info { color: ${b1.tx} !important; }
.top_button > ul > li:nth-child(2) .button_info { color: ${b2.tx} !important; }

/* アイコン枠：サイズを27pxに厳密に固定 */
.top_button > ul > li .button_img { 
    width: 27px !important; 
    height: 27px !important; 
    min-width: 27px !important; 
    flex: 0 0 27px !important;
    position: relative !important; 
    transform: translateZ(0);
    overflow: visible !important; 
    clip-path: inset(0px); 
    -webkit-clip-path: inset(0px);
}

/* アイコン画像：27pxの移動距離で正確に影を落とす */
.top_button > ul > li .button_img img {
    width: 100% !important; 
    height: 100% !important; 
    object-fit: contain !important; 
    position: absolute !important; 
    left: 0; top: 0;
    transform: translateX(-27px) !important; 
    -webkit-transform: translateX(-27px) !important;
}
/* アイコンの色（ドロップシャドウ） */
.top_button > ul > li:nth-child(1) .button_img img { filter: drop-shadow(27px 0 0 ${icon1}) !important; -webkit-filter: drop-shadow(27px 0 0 ${icon1}) !important; }
.top_button > ul > li:nth-child(2) .button_img img { filter: drop-shadow(27px 0 0 ${icon2}) !important; -webkit-filter: drop-shadow(27px 0 0 ${icon2}) !important; }
`;
    }

    // --- Cパターン ---
    if (selectedPattern === 'C') {
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
        const c1 = getCData(0); const c2 = getCData(1);
        const icon1 = getV('cfg-c-btn1-icon-c-val');
        const icon2 = getV('cfg-c-btn2-icon-c-val');

        // ★共通レイアウト(commonUlStyle)と個別デザインを合体させて返す
        return `\n${commonUlStyle}\n` + `
/* --- Cパターン専用 --- */
.top_button > ul > li { position: relative; width: calc(48% - 5px); margin-bottom: 10px; overflow: hidden; list-style: none; transform: translateZ(0); }
.top_button > ul > li > a { display: flex; flex-direction: column; align-items: center; padding: 15px 20px 0px; text-decoration: none; font-weight: bold; position: relative; z-index: 2; }
.button_info { width: 100%; text-align: center; padding: 25px 0 5px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
.top_button > ul > li:before { content: ""; content: ""; position: absolute; width: 7px; height: 7px; right: 12px; top: 50%; margin-top: -4px; z-index: 3;left: auto; transform: rotateZ(-45deg);}

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

        // 設定画面から幅と高さを取得（プレビューとデフォルト値を合わせています）
        const sWidth = getV('cfg-header-slider-width') || '500';
        const sHeight = getV('cfg-header-slider-height') || '500';
        
        // ヘッダー背景色 (TOP) の設定値を動的に取得
        const headerBg = getV('cfg-header-bg-top') || getV('cfg-header-bg') || '#ffffff';

        return `/* パターンB専用：ヘッダー＆スライダーCSS */
body.top header.top { height: 50px !important; display: flex !important; justify-content: flex-start !important; align-items: center !important; background-color: ${headerBg} !important; z-index: 20; box-shadow: 1px 5px 5px 0 #0000001a; }
header.top h1.top { margin: 0 auto !important; width: 100px !important; }
header.top h1.top span { display: none !important; }
header.top h1.top img { border-radius: unset; height: 50px; width: auto; }

/* ==================== スライダー外枠（食い込み重なり無し仕様） ====================== */
.header-slider-wrap { position: relative; z-index: 3 !important; overflow: hidden; top: 0px; width: 100%; height: auto; aspect-ratio: ${sWidth} / ${sHeight}; }

/* ==================== スライダー本体 ====================== */
.header-slider { width: 100%; height: 100%; display: flex; transition: transform 0.8s ease-in-out; touch-action: pan-y; will-change: transform; }

/* ==================== 各スライド ====================== */
.header-slide { width: 100%; height: 100%; flex-shrink: 0; background-size: cover; background-position: center; background-repeat: no-repeat; pointer-events: auto; }

/* ==================== ドット ====================== */
.header-dots-wrap { text-align: center; margin-top: 15px; margin-bottom: 0px; }
.header-dots { display: flex; justify-content: center; gap: 8px; }
.header-dots .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(117,117,117,0.5); cursor: pointer; }
.header-dots .dot.active { background: #333; transform: scale(1.2); }
`;
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
    const getV = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    // 1. 各種設定値を取得
    const stCardBg = getV('cfg-st-card-bg-val').toUpperCase();
    const stBorderC = getV('cfg-st-border-c-val').toUpperCase();
    const stTxtColor = getV('cfg-st-txt-c-val').toUpperCase();
    const stDueTxtColor = getV('cfg-st-due-txt-c-val').toUpperCase();
    const stLabelBg = getV('cfg-st-label-bg-val').toUpperCase();
    const stIconBorder = getV('cfg-st-icon-border-val').toUpperCase();

    const stRadius = getV('cfg-st-radius');
    const stBorderW = getV('cfg-st-border-w');
    const stOutlineW = getV('cfg-st-outline-w');
    const stLabelRadius = getV('cfg-st-label-radius');
    const stWatermarkUrl = getV('cfg-st-watermark-url');
    const stIconChoice = document.getElementById('cfg-st-icon-choice')?.value || 'black';
    const wmShape = document.getElementById('cfg-st-watermark-shape')?.value || 'landscape';
    const stBorderOn = document.getElementById('cfg-st-border-on')?.checked || false;
    const stDueBorderOn = document.getElementById('cfg-st-due-border-on')?.checked || false;
    const stDueBorderW = getV('cfg-st-due-border-w');
    const stDueBorderC = getV('cfg-st-due-border-c-val').toUpperCase();

    // 2. デフォルト状態（初期値）の判定
    const isDefault = (
        (stCardBg === '#FFFFFF' || stCardBg === '') &&
        (stRadius === '16px' || stRadius === '16' || stRadius === '') &&
        stBorderOn === false &&
        (stBorderC === '#000000' || stBorderC === '') &&
        stDueBorderOn === false &&
        (stDueBorderC === '#000000' || stDueBorderC === '') &&
        (stWatermarkUrl === '' || stWatermarkUrl.includes('TCNteaCYUPectHdLS0JD.png')) &&
        (stTxtColor === '#000000' || stTxtColor === '') &&
        (stDueTxtColor === '#000000' || stDueTxtColor === '') &&
        (stLabelBg === '#F9D5BD' || stLabelBg === '' || stLabelBg === '#000000') && // #000000も念のため追加
        (stLabelRadius === '5px' || stLabelRadius === '5' || stLabelRadius === '') &&
        (stIconBorder === '#000000' || stIconBorder === '') &&
        stIconChoice === 'black' &&
        wmShape === 'landscape'
    );

    if (isDefault) return "";

    // 4. 一つでも変更がある場合はCSSを組み立てる
    const stIconFilter = stIconChoice === 'black' 
        ? 'brightness(0)' 
        : 'invert(100%) sepia(100%) saturate(62%) hue-rotate(329deg) brightness(92%) contrast(260%)';

    const wmWidth = (wmShape === 'square') ? '75px' : '100px';
    const wmHeight = (wmShape === 'square') ? '75px' : '40px';

    return `
/* ====== スタンプ一覧ページ ====== */
body.stamp .stamp_set { box-shadow: 0 0 5px 0px #adadadb5; border-radius: 17px; }
#stamp-list .stamp_card {
    background: ${stCardBg} !important;
    border-radius: ${stRadius} !important;
    border: ${stBorderOn ? stBorderW + ' solid ' + stBorderC : 'none'} !important;
    outline: ${stBorderOn ? stOutlineW + ' solid ' + stBorderC : 'none'} !important;
    outline-offset: -7px;
    background-blend-mode: lighten;
    position: relative; overflow: hidden;
}
#stamp-list .stamp_card::before {
    content: ""; position: absolute; z-index: 0; bottom: 10px; right: 10px; 
    width: ${wmWidth} !important; 
    height: ${wmHeight} !important;
    background-image: url(${stWatermarkUrl});
    background-position: right,bottom; background-size: contain; background-repeat: no-repeat; pointer-events: none;
}
.stamp_list_title { color: ${stTxtColor} !important; border-bottom: 1px dashed ${stBorderC} !important; font-size: 20px; }
.stamp_card .ticket_list_due {
    color: ${stDueTxtColor} !important;
    border: ${stDueBorderOn ? stDueBorderW + ' solid ' + stDueBorderC : 'none'} !important;
    border-radius: ${stLabelRadius} !important;
    background-color: ${stLabelBg} !important;
}
body.stamp .stampicon { color: ${stTxtColor} !important; }
body.stamp .stampicon > b { border: 2px solid ${stIconBorder} !important; }
body.stamp .stampicon > b > span { filter: ${stIconFilter} !important; }

/* ====== スタンプ履歴ページ（.stamp_setがカード本体。.stamp_card は無い） ====== */
body.stamp_history .stamp_set {
    background: ${stCardBg} !important;
    border-radius: ${stRadius} !important;
    border: ${stBorderOn ? stBorderW + ' solid ' + stBorderC : 'none'} !important;
    outline: ${stBorderOn ? stOutlineW + ' solid ' + stBorderC : 'none'} !important;
    outline-offset: -7px;
    background-blend-mode: lighten;
    position: relative; overflow: hidden;
}
body.stamp_history .stamp_set::before {
    content: ""; position: absolute; z-index: 0; bottom: 10px; right: 10px;
    width: ${wmWidth} !important;
    height: ${wmHeight} !important;
    background-image: url(${stWatermarkUrl});
    background-position: right,bottom; background-size: contain; background-repeat: no-repeat; pointer-events: none;
}
body.stamp_history .ticket_list_due {
    color: ${stDueTxtColor} !important;
    border: ${stDueBorderOn ? stDueBorderW + ' solid ' + stDueBorderC : 'none'} !important;
    border-radius: ${stLabelRadius} !important;
    background-color: ${stLabelBg} !important;
}
body.stamp_history .stampicon { color: ${stTxtColor} !important; }
body.stamp_history .stampicon > b { border: 2px solid ${stIconBorder} !important; }
body.stamp_history .stampicon > b > span { filter: ${stIconFilter} !important; }
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

    // 通常ボタン設定
    const bg = getVLocal('cfg-pgbtn-bg-val').toUpperCase();
    const txt = getVLocal('cfg-pgbtn-txt-val').toUpperCase();
    const radius = getVLocal('cfg-pgbtn-radius');
    const borderOn = document.getElementById('cfg-pgbtn-border-on')?.checked;
    const borderW = getVLocal('cfg-pgbtn-border-w');
    const borderC = getVLocal('cfg-pgbtn-border-c-val').toUpperCase();

    // オレンジボタン設定
    const orgBg = getVLocal('cfg-pgbtn-org-bg-val').toUpperCase();
    const orgTxt = getVLocal('cfg-pgbtn-org-txt-val').toUpperCase();
    const orgRadius = getVLocal('cfg-pgbtn-org-radius');
    const orgBorderOn = document.getElementById('cfg-pgbtn-org-border-on')?.checked;
    const orgBorderW = getVLocal('cfg-pgbtn-org-border-w');
    const orgBorderC = getVLocal('cfg-pgbtn-org-border-c-val').toUpperCase();

    // デフォルト判定
    const isDefault = (
        bg === '#333333' && txt === '#FFFFFF' && radius === '30px' && borderOn === false &&
        orgBg === '#FF8C00' && orgTxt === '#FFFFFF' && orgRadius === '50px' && orgBorderOn === false
    );

    if (isDefault) return "";

    const borderCSS = borderOn ? `border: ${borderW} solid ${borderC} !important;` : `border: none !important;`;
    const orgBorderCSS = orgBorderOn ? `border: ${orgBorderW} solid ${orgBorderC} !important;` : `border: none !important;`;

    return `
/* 共通ボタン (.page_button) ※ .orange を除く */
${prefix}a.page_button:not(.orange), ${prefix}.stamp_set a.page_button:not(.orange) { background-color: ${bg} !important; border-radius: ${radius} !important; ${borderCSS} text-decoration: none !important; }
${prefix}a.page_button:not(.orange) > span, ${prefix}.stamp_set a.page_button:not(.orange) > span { color: ${txt} !important; }

/* QR読取ボタン等 (.page_button.orange) */
${prefix}a.page_button.orange, ${prefix}.stamp_set a.page_button.orange { background-color: ${orgBg} !important; border-radius: ${orgRadius} !important; ${orgBorderCSS} text-decoration: none !important; }
${prefix}a.page_button.orange > span, ${prefix}.stamp_set a.page_button.orange > span { color: ${orgTxt} !important; }
`;
}

// 7. スタンプ詳細ページのCSSを生成する関数
function getStampDetailsCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    // 配布用：body.stamp_card でスコープしスタンプ帳一覧ページの .stamp_set と衝突しないようにする
    // プレビュー用：.mock-screen でスコープする（プレビューのbodyには stamp_card クラスが付かないため）
    const prefix = isExport ? 'body.stamp_card ' : '.mock-screen ';

    // 設定値を取得
    const stdBg = getV('cfg-std-bg-val').toUpperCase();
    const stdRadius = getV('cfg-std-radius');
    const stdBorderOn = document.getElementById('cfg-std-border-on')?.checked;
    const stdBorderW = getV('cfg-std-border-w');
    const stdBorderC = getV('cfg-std-border-c-val').toUpperCase();
    const titleSize = getV('cfg-std-title-size');
    const titleColor = getV('cfg-std-title-val').toUpperCase();
    const dueTxt = getV('cfg-std-due-txt-val').toUpperCase();
    const dueBg = getV('cfg-std-due-bg-val').toUpperCase();
    const dueRadius = getV('cfg-std-due-radius');
    const dueBorderOn = document.getElementById('cfg-std-due-border-on')?.checked;
    const dueBorderW = getV('cfg-std-due-border-w');
    const dueBorderC = getV('cfg-std-due-border-c-val').toUpperCase();
    const noteSize = getV('cfg-std-note-size');
    const noteTxtColor = getV('cfg-std-note-txt-val').toUpperCase(); 
    const noteLineC = getV('cfg-std-note-line-val').toUpperCase();

    // デフォルト判定
    const isDefault = (
        stdBg === '#FFFFFF' && stdRadius === '15px' && stdBorderOn === true && stdBorderW === '1px' && stdBorderC === '#333333' &&
        titleSize === '16px' && titleColor === '#000000' && dueTxt === '#000000' && dueBg === '#E3E3E3' && dueRadius === '5px' &&
        dueBorderOn === false && noteSize === '15px' && noteTxtColor === '#000000' && noteLineC === '#717171'
    );

    if (isDefault) return "";

    const borderCSS = stdBorderOn ? `${stdBorderW} solid ${stdBorderC}` : 'none';
    const dueBorderCSS = dueBorderOn ? `${dueBorderW} solid ${dueBorderC}` : 'none';

    return `
/* =========================================
スタンプ詳細ページ設定
========================================= */
${prefix}.stamp_set { border-radius: ${stdRadius} !important; background-color: ${stdBg} !important; border: ${borderCSS} !important; }
${prefix}.stamp_title { color: ${titleColor} !important; font-size: ${titleSize} !important; }
${prefix}.stamp_due { background-color: ${dueBg} !important; border-radius: ${dueRadius} !important; color: ${dueTxt} !important; border: ${dueBorderCSS} !important; display: inline-block; }
${prefix}.stamp_note { font-size: ${noteSize} !important; color: ${noteTxtColor} !important; border-bottom: 1px dashed ${noteLineC} !important; }
`;
}

// 8. チケット一覧ページのCSSを生成する関数
/*
function getTicketPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const prefix = isExport ? '' : '.mock-screen ';
    const targetSelector = '.ticket_list_set:not(.used):not(.expired)';
    const baseSelector = prefix + targetSelector;

    // 1. 各種設定値を取得
    const cardBg = getV('cfg-ticket-bg-val').toUpperCase();
    const cardRadius = getV('cfg-ticket-radius');
    const cardBorderOn = document.getElementById('cfg-ticket-border-on')?.checked;
    const cardBorderW = getV('cfg-ticket-border-w');
    const cardBorderC = getV('cfg-ticket-border-c-val').toUpperCase();
    const lineColor = getV('cfg-ticket-line-val').toUpperCase();
    const titleSize = getV('cfg-ticket-title-size');
    const titleWeight = document.getElementById('cfg-ticket-title-weight')?.value || '700';
    const titleColor = getV('cfg-ticket-title-val').toUpperCase();
    const dueSize = getV('cfg-ticket-due-size');
    const dueColor = getV('cfg-ticket-due-val').toUpperCase();
    const dueBg = getV('cfg-ticket-due-bg-val').toUpperCase();
    const dueRadius = getV('cfg-ticket-due-radius');
    const dueBorderOn = document.getElementById('cfg-ticket-due-border-on')?.checked;
    const dueBorderW = getV('cfg-ticket-due-border-w');
    const dueBorderC = getV('cfg-ticket-due-border-c-val').toUpperCase();

    // 2. デフォルト状態（初期値）の判定
    // ユーザーが一つも設定を変更していない状態を定義
    const isDefault = (
        (cardBg === '#FFFFFF' || cardBg === '') &&  // 空文字を許容
        (cardRadius === '15px' || cardRadius === '15' || cardRadius === '') &&
        cardBorderOn === false &&
        (lineColor === '#717171' || lineColor === '') &&
        (titleColor === '#252525' || titleColor === '') &&
        (dueBg === '#DADADA' || dueBg === '')
    );

    // 3. 全て初期値のままなら何も出力しない
    if (isDefault) return "";

    // 4. 変更がある場合のみCSSを組み立てる
    const cardBorderCSS = cardBorderOn ? `${cardBorderW} solid ${cardBorderC}` : 'none';
    const dueBorderCSS = dueBorderOn ? `${dueBorderW} solid ${dueBorderC}` : 'none';

    return `
    */
/* チケット一覧デザイン（利用可能のみ） */
/*
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
*/
function getTicketPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    const prefix = isExport ? '' : '.mock-screen ';
    const targetSelector = '.ticket_list_set:not(.used):not(.expired)';
    const baseSelector = prefix + targetSelector;
    const ticketPattern = document.querySelector('input[name="ticket-pattern"]:checked')?.value || 'A';

    // 1. 各種設定値を取得
    const cardBg = getV('cfg-ticket-bg-val').toUpperCase();
    const cardRadius = getV('cfg-ticket-radius');
    const cardBorderOn = document.getElementById('cfg-ticket-border-on')?.checked;
    const cardBorderW = getV('cfg-ticket-border-w');
    const cardBorderC = getV('cfg-ticket-border-c-val').toUpperCase();
    const lineColor = getV('cfg-ticket-line-val').toUpperCase();
    const titleSize = getV('cfg-ticket-title-size');
    const titleWeight = document.getElementById('cfg-ticket-title-weight')?.value || '700';
    const titleColor = getV('cfg-ticket-title-val').toUpperCase();
    const dueSize = getV('cfg-ticket-due-size'); // ← ここで値を取るように修正
    const dueColor = getV('cfg-ticket-due-val').toUpperCase();
    const dueBg = getV('cfg-ticket-due-bg-val').toUpperCase();
    const dueRadius = getV('cfg-ticket-due-radius');
    const dueBorderOn = document.getElementById('cfg-ticket-due-border-on')?.checked;
    const dueBorderW = getV('cfg-ticket-due-border-w');
    const dueBorderC = getV('cfg-ticket-due-border-c-val').toUpperCase();

    // 2. 初期値（デフォルト状態）の厳密な判定
    const isDefault = (
        (cardBg === '#FFFFFF' || cardBg === '') && 
        (cardRadius === '15px' || cardRadius === '15' || cardRadius === '') &&
        cardBorderOn === false &&
        (lineColor === '#717171' || lineColor === '') &&
        (titleSize === '16px' || titleSize === '') && // 追加
        titleWeight === '700' &&                     // 追加
        (titleColor === '#252525' || titleColor === '') &&
        (dueSize === '10px' || dueSize === '') &&       // 追加（※HTMLの初期値に合わせて調整してください）
        (dueColor === '#000000' || dueColor === '') &&  // 追加
        (dueBg === '#DADADA' || dueBg === '') &&
        (dueRadius === '5px' || dueRadius === '5' || dueRadius === '') && // 追加
        dueBorderOn === false                        // 追加
    );

    let css = "";

    // カードのスタイル設定（初期値から変更がある場合、またはパターンBのタブがある場合のみ出力）
    if (!isDefault || (ticketPattern === 'B' && isExport)) {
        const cardBorderCSS = cardBorderOn ? `${cardBorderW} solid ${cardBorderC}` : 'none';
        const dueBorderCSS = dueBorderOn ? `${dueBorderW} solid ${dueBorderC}` : 'none';

        // isDefaultが真（初期値のまま）で、かつパターンAならカードCSSを出力しない
        if (!isDefault) {
            css += `
/* チケット一覧デザイン（利用可能のみ） */
${baseSelector} { border-radius: ${cardRadius} !important; background-color: ${cardBg} !important; border: ${cardBorderCSS} !important; }
${baseSelector} > .ticket_list > a { border-bottom: 1px dashed ${lineColor} !important; }
${baseSelector} > .ticket_list > a > dl > dt { font-size: ${titleSize} !important; font-weight: ${titleWeight} !important; color: ${titleColor} !important; }
${baseSelector} .ticket_list_due { font-size: ${dueSize} !important; background-color: ${dueBg} !important; border-radius: ${dueRadius} !important; color: ${dueColor} !important; border: ${dueBorderCSS} !important; display: inline-block; }
`;
        }
    }

    // パターンB（タブ形式）専用のCSS追記
    if (ticketPattern === 'B') {
        const tabActiveColor = getV('cfg-ticket-tab-active-val') || '#333333';
        const tabFontSize = getV('cfg-ticket-tab-size') || '12px';
        css += `
/* =========================================
   チケット一覧 タブ (Pattern B)
========================================= */
${prefix}.ticket_tab_menu {
    display: flex; background-color: #ffffff33; margin: 0px 0 20px;
    border-bottom: 1.5px solid #e1e1e1; align-items: stretch;
}
${prefix}.ticket_tab_btn {
    flex: 1; border: none; background: transparent; color: #32231A;
    font-weight: 300; 
    font-size: ${tabFontSize} !important;
    padding: 8px 0;
    transition: background 0.2s ease;
}
${prefix}.ticket_tab_btn.active {
    color: #333; border-bottom: 7px solid ${tabActiveColor} !important;
    margin-top: 0; padding: 0 0 0px 0; font-weight: 600;
}
`;
        if (!isExport) {
            css += `${prefix}.ticket_sort_select { display: none !important; }\n`;
        }
    }

    return css;
}






// 9. チケット詳細ページのCSSを生成する関数
function getTicketDetailPageCSS(isExport = false) {
    const getV = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const prefix = isExport ? '' : '.mock-screen ';

    // 1. 各種設定値を取得
    const cardBg = getV('cfg-td-card-bg-val').toUpperCase();
    const cardRadius = getV('cfg-td-card-radius');
    const borderOn = document.getElementById('cfg-td-card-border-on')?.checked;
    const borderW = getV('cfg-td-card-border-w');
    const borderC = getV('cfg-td-card-border-c-val').toUpperCase();

    const noticeSize = getV('cfg-td-notice-size');
    const noticeColor = getV('cfg-td-notice-val').toUpperCase();

    const titleSize = getV('cfg-td-title-size');
    const titleWeight = document.getElementById('cfg-td-title-weight')?.value || '700';
    const titleColor = getV('cfg-td-title-val').toUpperCase();

    const dueSize = getV('cfg-td-due-size');
    const dueColor = getV('cfg-td-due-val').toUpperCase();
    const dueBg = getV('cfg-td-due-bg-val').toUpperCase();
    const dueRadius = getV('cfg-td-due-radius');

    const noteSize = getV('cfg-td-note-size');
    const noteColor = getV('cfg-td-note-val').toUpperCase();

    // 2. デフォルト状態（初期値）の判定
    // ユーザーが一つも設定を変更していない状態を定義
    const isDefault = (
        (cardBg === '#FFFFFF' || cardBg === '') &&
        (cardRadius === '15px' || cardRadius === '15' || cardRadius === '') &&
        borderOn === false &&
        (noticeColor === '#252525' || noticeColor === '') &&
        (titleColor === '#252525' || titleColor === '') &&
        // 透明度付きの色は誤差が出やすいため、前方一致などで判定
        (dueBg === '' || dueBg.toUpperCase().startsWith('#EB843A'))
    );

    // 3. 全て初期値のままなら何も出力しない
    if (isDefault) return "";

    // 4. 変更がある場合のみCSSを組み立てる
    const borderCSS = borderOn ? `${borderW} solid ${borderC}` : 'none';

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

    // 1. 各種設定値を取得
    const cardBg = getV('cfg-user-card-bg-val').toUpperCase();
    const cardRadius = getV('cfg-user-card-radius');
    const borderOn = document.getElementById('cfg-user-card-border-on')?.checked;
    const borderW = getV('cfg-user-card-border-w');
    const borderC = getV('cfg-user-card-border-c-val').toUpperCase();
    const titleColor = getV('cfg-user-title-val').toUpperCase();
    const noteColor = getV('cfg-user-note-val').toUpperCase();
    const disabledBg = getV('cfg-user-btn-disabled-bg-val').toUpperCase();

    // 2. デフォルト状態（初期値）の判定
    const isDefault = (
        cardBg === '#FFFFFF' &&
        cardRadius === '15px' &&
        borderOn === false && // 枠線なしがデフォルト
        titleColor === '#252525' &&
        noteColor === '#252525' &&
        disabledBg === '#D4D4D4'
    );

    // 3. 全て初期値のままなら何も出力しない
    if (isDefault) return "";

    // 4. 変更がある場合のみCSSを組み立てる
    const borderCSS = borderOn ? `${borderW} solid ${borderC}` : 'none';

    return `
/* マイページデザイン */
${prefix}.profile_set {
    background-color: ${cardBg} !important;
    border-radius: ${cardRadius} !important;
    border: ${borderCSS} !important;
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

    // --- JSの組み立て ---
    const menuItemsData = Array.from(document.querySelectorAll('.menu-item:not(.sns-item)')).map(el => ({
        class: el.querySelector('.field-class').value,
        label: el.querySelector('.field-label').value,
        href: el.querySelector('.field-href').value,
        external: el.querySelector('.field-ext').checked,
        aclass: el.querySelector('.field-aclass').value
    }));

    const hasOfficial = menuItemsData.some(item => item.class === 'official');
    const headerPattern = document.querySelector('input[name="header-pattern"]:checked')?.value || 'A';
    const listPattern = document.querySelector('input[name="list-pattern"]:checked')?.value || 'A';
    const btnPattern = document.querySelector('input[name="btn-pattern"]:checked')?.value || 'A';
    const snsPos = document.querySelector('input[name="sns-position"]:checked')?.value || 'header';

    // --- 【CSSパーツ作成】 ---
    // 背景・フォント
    const selectedFont = getV('cfg-font-family-select');
    const customFont = getV('cfg-font-family-custom');
    const finalFont = (customFont ? customFont : selectedFont).trim();
    let fontCSS = "";
    if (finalFont && finalFont.toLowerCase() !== 'sans-serif') {
        fontCSS = `font-family: ${finalFont}, sans-serif !important;`;
    }
    const bodyBgColorRaw = getV('cfg-body-bg-val').toUpperCase();
    const isBodyBgNone = getC('cfg-body-bg-none');
    const bodyBgImg = getV('cfg-body-bg-img');
    const bodyBgCSS = getBodyBgCSS();
    let htmlBodyOutput = "";
    const isBodyBgDefault = (bodyBgColorRaw === "#FFFFFF" || bodyBgColorRaw === "");
    if (!isBodyBgDefault || isBodyBgNone || bodyBgImg !== "" || fontCSS !== "") {
        const finalBodyBg = isBodyBgNone ? 'transparent' : (bodyBgColorRaw || '#FFFFFF');
        htmlBodyOutput = `html, body { background-color: ${finalBodyBg} !important; ${fontCSS} margin: 0; padding: 0; min-height: 100vh; }\n`;

        if (bodyBgImg !== "") {
            htmlBodyOutput += `body::before { content: ""; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none; ${bodyBgCSS} }`;
        }
    }

    // --- 共通見出し (.titleh3) の判定ロジック ---
    const h3Size = getV('cfg-h3-size');
    const h3Weight = getV('cfg-h3-weight');
    const h3Color = getV('cfg-h3-color-val').toUpperCase();
    const h3Lh = getV('cfg-h3-lh');
    let h3Output = "";
    if (h3Size !== '16px' || h3Weight !== '600' || h3Color !== '#333333' || h3Lh !== '1.5') {
        h3Output = `.titleh3 { font-size: ${h3Size} !important; font-weight: ${h3Weight} !important; color: ${h3Color} !important; line-height: ${h3Lh} !important; }\n`;
    }
    const headerCSS = getHeaderCSS(); 
    const isBtnAreaNone = getC('cfg-btn-area-bg-none');
    const btnAreaColor = getV('cfg-btn-area-bg-val').toUpperCase();
    let btnAreaOutput = "";
    if (btnAreaColor !== "#FFFFFF" || isBtnAreaNone) {
        const finalBtnAreaColor = isBtnAreaNone ? 'transparent' : btnAreaColor;
        btnAreaOutput = `.top_button { background-color: ${finalBtnAreaColor} !important; padding: 20px 0; margin: -20px 0 0;}`;
    }

    // --- SNSアイコンの生成 ---
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


let officialModalCSS = "";
if (hasOfficial) {
    officialModalCSS = `
/* オフィシャル用モーダル基本スタイル */
.brand-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10001; display: none; }
.brand-modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); }
.modal-close { position: absolute; top: 10px; right: 10px; z-index: 10003; background: #fff; border: none; padding: 5px 15px; border-radius: 20px; font-size: 12px; cursor: pointer; }
.brand-modal-window { position: absolute; bottom: 0; left: 0; width: 100%; height: 90vh; background: #fff; border-radius: 15px 15px 0 0; overflow: hidden; z-index: 10002; }
.slide-in { animation: modalSlideUp 0.3s ease-out; }
@keyframes modalSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
`;
}

    // --- 【カード透かしロゴの判定と生成】 ---
    const watermarkOn = getC('cfg-card-watermark-on');
    const watermarkUrl = getV('cfg-card-watermark-url').trim();

    // ⭐ 形状の設定を取得（プレビューと同じロジックにする）
    const wmShape = getV('cfg-st-watermark-shape') || 'landscape';
    const wmWidth = (wmShape === 'square') ? '75px' : '100px';
    const wmHeight = (wmShape === 'square') ? '75px' : '40px';

    let cardWatermarkCSS = "";

    // チェックが入っており、かつURLが入っている時だけCSSを生成
    if (watermarkOn && watermarkUrl !== "") {
        cardWatermarkCSS = `
#stamp-list > .stamp_set > .stamp_card::after {
content: "";
position: absolute;
bottom: 10px;
right: 10px;
width: ${wmWidth} !important;
height: ${wmHeight} !important;
background-image: url('${watermarkUrl}');
background-size: contain;
background-repeat: no-repeat;
pointer-events: none;
}
`;
    }

    // 3. その他のパーツ
    const patternCSS = getButtonPatternCSS(btnPattern);
    const stampPageCSS = getStampPageCSS();
    const pageBtnCSS = getPageBtnCSS(true); 
    const noticeCSS = getNoticeCSS(true);  
    const stampDetailsCSS = getStampDetailsCSS(true);
    const ticketPageCSS = getTicketPageCSS(true);
    const ticketDetailCSS = getTicketDetailPageCSS(true);
    const userPageCSS = getUserPageCSS(true);
    const mockLogoAlign = document.querySelector('input[name="cfg-mock-logo-align"]:checked')?.value || 'center';

    // サブページヘッダーの判定（中央配置・白背景なら出さない）
    const fFilter = getV('cfg-icon-choice') === 'white' ? 'brightness(0) invert(1)' : 'brightness(0)';


    let subPageHeaderCSS = "";
    const mockHeaderBg = getV('cfg-mock-header-bg-val').toUpperCase();
    if (mockHeaderBg !== "#FFFFFF" || mockLogoAlign !== "center") {
        subPageHeaderCSS = `header { background-color: ${mockHeaderBg} !important; display: flex !important; justify-content: ${mockLogoAlign} !important; ${mockLogoAlign === 'flex-start' ? 'padding-left: 15px !important;' : ''} ${mockLogoAlign === 'flex-end' ? 'padding-right: 15px !important;' : ''} }`;
    }

    // --- フッターリストメニュー（.menu-sublist）の判定と生成 ---
    const listBg = (getV('cfg-list-bg-val') || "").trim().toUpperCase();
    const listTxt = (getV('cfg-list-txt-val') || "").trim().toUpperCase();
    const listSize = (getV('cfg-list-size') || "").trim();
    const listBorderOn = getC('cfg-list-border-on'); // HTMLで初期値 checked
    const listBorderW = (getV('cfg-list-border-w') || "").trim();
    const listBorderC = (getV('cfg-list-border-c-val') || "").trim().toUpperCase();
    const listAlign = getV('cfg-list-align');

    const isListDefault = (
        (listBg === "#FFFFFF" || listBg === "") && 
        (listTxt === "#252525" || listTxt === "") && 
        (listSize === "14px" || listSize === "") && 
        (listBorderOn === true) &&  // 初期値が有効なので true
        (listBorderW === "2px") &&  // 初期値が 2px
        (listBorderC === "#A9A9A92B") &&  // 初期値が #A9A9A92B
        (listAlign === "left")
    );

    let listMenuOutput = "";

    // 初期状態から何かが変更された場合のみ生成
    if (!isListDefault) {
        // 境界線がONの時だけスタイルを作り、OFFの時は none にする
        const borderStyle = listBorderOn ? `${listBorderW} solid ${listBorderC}` : "none";

        listMenuOutput = `
/* フッターリストメニュー設定 */
.menu-sublist { background-color: ${listBg || '#FFFFFF'} !important; padding-bottom: 80px !important; }
.menu-sublist > ul > li { text-align: ${listAlign} !important; }
.menu-sublist > ul > li > a { 
color: ${listTxt || '#252525'} !important; 
font-size: ${listSize || '14px'} !important; 
border-top: ${borderStyle} !important; 
display: block; text-decoration: none; 
}
.menu-sublist > ul > li:first-child > a { border-top: none !important; }
`;
    }


    const hamLineColor = getV('cfg-ham-line-val');
    const hamActiveColor = getV('cfg-ham-line-active-val');

    let hamburgerCSS = "";
if (listPattern === 'B') {
    const hamLineColor = getV('cfg-ham-line-val') || '#333';
    const hamActiveColor = getV('cfg-ham-line-active-val') || '#333';
    const listBgColor = getV('cfg-list-bg-val') || '#fff';

    hamburgerCSS = `
/* ====== ハンバーガーボタン ====== */
.hamburger-btn {
    position: fixed; top: 18px; right: 20px; width: 28px; height: 20px;
    cursor: pointer; z-index: 1001; display: flex; flex-direction: column; justify-content: space-between;
}
.hamburger-btn span {
    display: block; height: 3px; background-color: ${hamLineColor} !important;
    border-radius: 2px; transition: all 0.3s ease; transform-origin: center center;
}
.hamburger-btn.active span { background-color: ${hamActiveColor} !important; }

/* ✕アニメーション */
.hamburger-btn.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger-btn.active span:nth-child(2) { opacity: 0; }
.hamburger-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

/* ====== メニュー全体（右スライド＋スクロール可） ====== */
.menu-sublist {
    position: fixed; top: 0; right: -100%; width: 100%; height: 100vh;
    background-color: ${listBgColor} !important;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000; transition: right 0.35s ease;
    padding: 60px 20px 40px; box-sizing: border-box;
    overflow-y: auto; -webkit-overflow-scrolling: touch;
    margin-top: 0 !important;
}
.menu-sublist.open { right: 0; }

/* ====== 背景の半透明オーバーレイ ====== */
.menu-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: rgba(0,0,0,0.4); z-index: 999;
    opacity: 0; visibility: hidden; transition: all 0.3s ease;
}
.menu-overlay.show { opacity: 1; visibility: visible; }

/* コンテンツ余白調整 */
section.content { padding-bottom: 120px !important; }
`;
}

    // フッターアイコン
    let footerIconCSS = "";
    Object.keys(iconImages).forEach(key => {
        let url = (key === 'official') ? getV('cfg-official-url') : iconImages[key];
        footerIconCSS += `#sp-fixed-menu li.${key} .icon { background-image: url('${url}'); }\n`;
    });

    let hamburgerScript = (listPattern === 'B') ? `
$(function() {
    // body に追加
    $('body').append('<div class="hamburger-btn"><span></span><span></span><span></span></div><div class="menu-overlay"></div>');

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
});` : "";

// --- 【1】JavaScriptの組み立て ---
let jsOutput = "";
let footerJS = "";

// フッターメニューがある場合のみ作成
if (menuItemsData.length > 0) {
    footerJS = `
    const menuItems = ${JSON.stringify(menuItemsData.map(item => ({ class: item.class, href: item.href, aclass: item.aclass, icon: "<span class='icon'></span>", label: item.label, external: item.external })), null, 8)};
    const listItems = menuItems.map(item => { const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : ""; return \`<li class="\${item.class}"><a href="\${item.href}"\${target} class="\${item.aclass}">\${item.icon}<span>\${item.label}</span></a></li>\`; }).join('');
    const footerHTML = \`<footer><div id="sp-fixed-menu" class="for-sp"><ul>\${listItems}</ul></div></footer>\`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);`;
}

// ヘッダーパターンB専用ロジック
let headerBSliderLogic = "";
if (headerPattern === 'B') {
headerBSliderLogic = `
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
$wrap.css('height', 'auto');
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
});`;
}

// チケットタブ（パターンB）専用ロジックの追加
let ticketTabLogic = "";
const ticketPattern = document.querySelector('input[name="ticket-pattern"]:checked')?.value || 'A';
if (ticketPattern === 'B') {
    ticketTabLogic = `
/* チケット一覧タブ切り替え処理 */
$(document).ready(function() {
if (!$('body').hasClass('coupon')) return;

$('.ticket_sort_select').hide();

const tabMenu = \`
<div class="ticket_tab_menu">
    <button class="ticket_tab_btn active" data-target="get">利用可</button>
    <button class="ticket_tab_btn" data-target="used">利用済み</button>
    <button class="ticket_tab_btn" data-target="expired">期限切れ</button>
</div>
\`;
$('h3.titleh3').after(tabMenu);

$('#coupon-list').prepend('<div id="js-no-ticket-msg" style="display:none; text-align:center; padding:20px; color:#666; font-size:14px;"></div>');

filterTickets('get');

$(document).on('click', '.ticket_tab_btn', function() {
    const target = $(this).data('target');
    $('.ticket_tab_btn').removeClass('active');
    $(this).addClass('active');
    filterTickets(target);
});

$(document).on('click', '#load-btn a', function() {
    setTimeout(() => {
        const currentTab = $('.ticket_tab_btn.active').data('target');
        filterTickets(currentTab);
    }, 500);
});

function filterTickets(target) {
    const $tickets = $('.ticket_list_set');
    const $msgArea = $('#js-no-ticket-msg');
    
    $tickets.hide();
    $msgArea.hide();

    const $filtered = $tickets.filter(\`[data-ticket-status="\${target}"]\`);

    if ($filtered.length > 0) {
        $filtered.fadeIn(200);
    } else {
        let message = "";
        if (target === 'get') message = "利用可能なチケットがありません";
        else if (target === 'used') message = "利用済みのチケットはありません";
        else if (target === 'expired') message = "期限切れのチケットはありません";
        
        $msgArea.text(message).fadeIn(200);
    }
}
});`;
}


// 3. JavaScriptパーツの作成
let officialModalScript = "";
if (hasOfficial) {
    officialModalScript = `
/* フッターメニューのクリックイベントを制御（オフィシャル用） */
$(document).on('click', '.open-iframe-modal', function(e) {
e.preventDefault();
const targetUrl = $(this).attr('href');
$('.shop-modal').remove();
const iframeModalHtml = \`
    <div id="shopModal" class="shop-modal brand-modal" style="display:none;">
        <div class="brand-modal-overlay"></div>
        <button class="modal-close">閉じる</button>
        <div class="brand-modal-window slide-in">
            <div class="brand-modal-content" style="height: 100%; padding: 0;">
                <iframe src="\${targetUrl}" style="width:100%; height:calc(100vh - 50px); border:none; border-radius:15px 15px 0 0;" allowfullscreen></iframe>
            </div>
        </div>
    </div>\`;
$('body').append(iframeModalHtml);
$('#shopModal').fadeIn(200);
});
$(document).on('click', '.modal-close, .brand-modal-overlay', function() {
$('#shopModal').fadeOut(200, function() { $(this).remove(); });
});`;
}

// --- 合成の判定 ---
let scriptInnerContent = "";
// 1. スライダーロジックがあれば追加
if (headerBSliderLogic) {
    scriptInnerContent += headerBSliderLogic + "\n";
}

if (ticketTabLogic) {
    scriptInnerContent += ticketTabLogic + "\n";
}

// スタンプ詳細ページ パターンB（チケット獲得表示）
const stampDetailPattern = document.querySelector('input[name="stamp-detail-pattern"]:checked')?.value || 'A';
if (stampDetailPattern === 'B') {
    scriptInnerContent += TICKET_FROM_STAMP_SCRIPT + "\n";
}

// 2. フッター または SNS があれば window.onload を追加
if (footerJS || snsInsertJS) {
    scriptInnerContent += `
window.onload = () => {
    ${footerJS}
    ${snsInsertJS}
};`;
}
// 3. ハンバーガースクリプトがあれば追加
if (hamburgerScript) {
    scriptInnerContent += "\n" + hamburgerScript;
}
if (officialModalScript) scriptInnerContent += "\n" + officialModalScript;
// 最終的に、中身が何か一つでもあれば <script> タグで囲う
if (scriptInnerContent.trim() !== "") {
    jsOutput = `<script>\n${scriptInnerContent.trim()}\n<\/script>`;
}

// 画面へ反映
document.getElementById('out-js').value = jsOutput;

// --- 【2】CSSの組み立て ---
// A. 常に生成する共通UIデザイン
let coreUIStyles = `
${htmlBodyOutput}
${h3Output}
${headerCSS}
${snsCSS}
${subPageHeaderCSS}
${btnAreaOutput}
${patternCSS}
${stampPageCSS}
${stampDetailsCSS}
${stampDetailPattern === 'B' ? TICKET_FROM_STAMP_CSS : ''}
${pageBtnCSS}
${noticeCSS}
${ticketPageCSS}
${ticketDetailCSS}
${officialModalCSS}
${listMenuOutput}
${cardWatermarkCSS}
${hamburgerCSS}
${userPageCSS}`.trim();

// B. フッターメニューがある時だけ追加する専用CSS
let footerSpecificStyles = "";
if (menuItemsData.length > 0) {
    const fBg = getV('cfg-bg-val') || '#FFFFFF';
    const fTxt = getV('cfg-txt-val') || '#a9a9a9';
    const userBg = getV('cfg-user-bg-val') || '#3F5C53';
    const listBorderOn = getC('cfg-list-border-on');
    const listBorderW = getV('cfg-list-border-w') || '1px';
    const listBorderC = getV('cfg-list-border-c-val') || '#A9A9A92B';

    footerSpecificStyles = `
/* =========================================
   フッター固定メニュー（ベース設定）
========================================= */
${hamburgerCSS}
#sp-fixed-menu.for-sp { position: fixed; bottom: 0; left: 0; width: 100%; background: ${fBg}; z-index: 999; box-shadow: 0px -5px 10px 0 #0000000f; }
#sp-fixed-menu ul { display: flex; justify-content: space-around; margin: 0; padding: 7px 0 5px; list-style: none; height: 65px; }
#sp-fixed-menu ul li { flex: 1; text-align: center; }
#sp-fixed-menu li a { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 9px; color: ${fTxt}; }
#sp-fixed-menu .icon { display: block; width: 28px; height: 28px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 3px; filter: ${fFilter}; }

/* --- アイコン画像指定 --- */
li.home .icon   { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/G7NN1cykJDexyrf7W3sY.png"); }
li.stamp .icon  { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/11vmbKPoZKbaDsS6AnC8.png"); }
li.ticket .icon { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/qwb7BN3RXESAD0krnj5v.png"); }
li.user .icon   { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/E3WFqdsnqvH99pgwlK5L.png"); }
li.history .icon { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/s1WjgAYhCT5YkwteDBW1.png"); }
li.reservation .icon { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/fAZsRqTheewTc01HDN4c.png"); }
li.map .icon { background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/l8lm4e55dWmksNmI67cP.png"); }
li.official .icon { background-image: url("${getV('cfg-official-url') || 'https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/OQuGHUMzZZ3yGuhaAFVm.png'}"); }

/* --- ON/OFF カラーロジック --- */
body.top #sp-fixed-menu .home a,
body.stamp #sp-fixed-menu .stamp a,
body.stamp_card #sp-fixed-menu .stamp a,
body.coupon #sp-fixed-menu .ticket a,
body.change #sp-fixed-menu .user a,
body.stamp_history #sp-fixed-menu .history a {
    color: ${fTxt} !important;
    font-weight: 600;
}
#sp-fixed-menu .icon {width: 29px; height: 29px;}
body.top      .home .icon {
background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/Rhn5Vvjh2SP38NF1xIwr.png");
}
body.stamp       .stamp .icon,
body.stamp_card  .stamp .icon {
background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/JHgPi2AKawTsS4JmquNG.png");
}
body.coupon      .ticket .icon {
background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/HW3t7RIX70B8ZS3NCBSy.png");
}
body.change      .user .icon {
background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/dfXYpacHjwLUuVQ7Eg8k.png");
}
body.stamp_history .history .icon {
background-image: url("https://toretastamp-prod.s3.amazonaws.com/media/upload/lp/VZ0tdfcpyCzlV8HRACZJ.png");
}
/* --- MY PAGE（常時丸ボタン）--- */
#sp-fixed-menu .user a {
    position: relative;
    top: -21px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 73px;
    height: 73px;
    border-radius: 50%;
    background: ${userBg} !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    z-index: 10;
    border: 3px solid #FFF;
    padding-bottom: 5px;
}
#sp-fixed-menu .user a span { color: #fff !important; font-size: 9px; font-weight: bold; margin: 0 0 0px 0; }
#sp-fixed-menu .user a .icon { width: 32px; height: 32px; margin-bottom: 0px; filter: brightness(0) invert(1) !important; }

/* リストメニュー用余白調整 */
.menu-sublist { padding-bottom: 80px !important; }
.menu-sublist > ul > li > a { 
    color: ${getV('cfg-list-txt-val') || '#333333'} !important; 
    border-top: ${listBorderOn ? `${listBorderW} solid ${listBorderC}` : 'none'} !important; 
    font-size: ${getV('cfg-list-size') || '13px'} !important; 
    display: block; text-decoration: none; 
}`;
}

// 最終的なCSS出力を合成
const cssOutput = `<style type="text/css">\n${coreUIStyles}\n${footerSpecificStyles}\n</style>`;

// 反映
document.getElementById('out-js').value = jsOutput;
document.getElementById('out-css').value = cssOutput;
showToast("配布用コードを正常に生成しました！");
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
            <div class="map-hint" style="display:none; grid-column: 1 / -1; font-size: 11px; color: #92400e; background:#fffbeb; border:1px solid #fde68a; border-radius:4px; padding:6px 10px;">
                ⚠️ 「map」は単体では動作しません。「店舗情報設定」ページで生成したJavaScript／CSSコードも、実際のサイトに合わせて設置してください。
            </div>
        </div>`;
    menuList.appendChild(div);
    relabelItems(); updatePreview();
}

document.getElementById('add-item').onclick = () => createItem();
window.copyText = (id) => { const el = document.getElementById(id); if(el){ el.select(); document.execCommand('copy'); showToast("クリップボードにコピーしました！"); } };

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
                key === 'sns-position' || 
                key === 'ticket-pattern') {
                
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
            key === 'sns-position' ||
            key === 'ticket-pattern' ||
            key === 'stamp-detail-pattern') {
            
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
    switchTicketPattern();

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
    const pattern = patternEl ? patternEl.value.toUpperCase() : 'A';

    const size = document.getElementById('cfg-notice-size').value;
    const color = document.getElementById('cfg-notice-color-val').value.toUpperCase();
    const prefix = isExport ? 'body.top' : '.mock-screen';

    if (isExport && pattern === 'A' && size === '15' && color === '#222222') {
        return "";
    }

    let css = `
/* お知らせ表示設定：パターン${pattern} */
${prefix} .notice_list > a > dl > dt {
    font-size: ${size}px !important;
    color: ${color} !important;
}
@media (max-width: 480px) {
    ${prefix} .notice_list > a > dl > dt { font-size: ${Math.max(10, size - 0.5)}px !important; }
}
`;

    if (pattern === 'B') {
        css += `
/* パターンB：カード風 */
${prefix} .notice_set { margin: 10px 20px 20px !important; box-shadow: none !important; background: transparent !important; }
${prefix} .notice_list { border-radius: 16px !important; overflow: hidden !important; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08) !important; margin-bottom: 20px !important; background: #fff !important; transition: transform 0.2s ease, box-shadow 0.2s ease !important; border: none !important; opacity: 1 !important; visibility: visible !important; }
${prefix} .notice_list:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 14px rgba(0,0,0,0.15) !important; }
${prefix} .notice_list > a { display: flex !important; flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; text-decoration: none !important; color: inherit !important; padding: 0 !important; }
${prefix} .notice_list p { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 170px !important; overflow: hidden !important; display: block !important; position: relative !important; background: #f2f2f2 !important; }
${prefix} .notice_list p img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
${prefix} .notice_list > a > dl { width: 100% !important; background: #fff !important; margin: 0 !important; padding: 15px 20px 15px !important; box-sizing: border-box !important; }
${prefix} .notice_list > a > dl > dt { line-height: 1.7 !important; margin: 0 !important; text-align: left !important; font-weight: 700 !important; }
@media (max-width: 480px) { ${prefix} .notice_list p { height: 130px !important; } }
${prefix} .notice_list.show { opacity: 1 !important; visibility: visible !important; }
`;
    } 
    else if (pattern === 'C') {
        css += `
/* パターンC：シンプルライン */
${prefix} .notice_set { box-shadow: none !important; background: transparent !important; }
${prefix} .notice_list { 
    background: transparent !important; 
    border: none !important; 
    margin-bottom: 10px !important; 
    padding: 0 !important;
    opacity: 1 !important;        /* ★確実に表示させる */
    visibility: visible !important; /* ★確実に表示させる */
}
${prefix} .notice_list > a { 
    display: flex !important; 
    align-items: center !important; 
    padding: 5px 0 5px 12px !important; 
    text-decoration: none !important;
}
${prefix} .notice_list p { 
    width: 60px !important; 
    height: 60px !important; 
    min-width: 60px !important; 
    border-radius: 8px !important; 
    overflow: hidden !important; 
    margin: 0 15px 0 0 !important; 
}
${prefix} .notice_list p img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
${prefix} .notice_list > a > dl { padding: 0 !important; margin: 0 !important; background: transparent !important; }
${prefix} .notice_list > a > dl > dt { border: none !important; font-weight: bold !important; padding: 0 !important; }
`;
    }

    css += `
.info-banner { background: #f8f9fa; border-bottom: 1px solid #ddd; text-align: center; padding: 10px 15px; margin: 0; }
.info-banner a { color: #000; text-decoration: none; font-weight: 500; font-size: 12px; }
.info-banner p { text-align: left; margin: 0; }
.info-icon { display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; font-weight: bold; border-radius: 50%; background: #000; color: #fff; margin-right: 6px; font-size: 13px; vertical-align: middle; }
`;

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