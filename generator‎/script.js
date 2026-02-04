$(document).ready(function() {
    // 同期とプレビュー反映の関数
    function bindColorControl(pickerId, textId, targetSelector, cssProp) {
        const $picker = $(`#${pickerId}`);
        const $text = $(`#${textId}`);

        $picker.on('input', function() {
            const color = $(this).val().toUpperCase();
            $text.val(color);
            $(targetSelector).css(cssProp, color);
        });

        $text.on('input', function() {
            const color = $(this).val();
            if (/^#[0-9A-F]{6}$/i.test(color)) {
                $picker.val(color);
                $(targetSelector).css(cssProp, color);
            }
        });
    }

    // 1. ヘッダー背景色の紐付け
    bindColorControl('cfg-h-bg', 'cfg-h-bg-val', 'header.top', 'background-color');
    
    // 2. メインボタン背景色の紐付け
    bindColorControl('cfg-btn-bg', 'cfg-btn-bg-val', '.button_img', 'background-color');

    // CSS生成ロジック
    $('#generate-btn').on('click', function() {
        const hBg = $('#cfg-h-bg-val').val();
        const bBg = $('#cfg-btn-bg-val').val();

        const cssTemplate = `
/* --- ジェネレーター生成コード --- */
/* ヘッダー背景 */
header.top { 
    background-color: ${hBg} !important; 
}

/* メインボタン背景 */
.top_button ul li a div.button_img { 
    background-color: ${bBg} !important; 
}
/* ---------------------------- */
        `.trim();

        $('#out-css').val(cssTemplate);
        alert("CSSコードを生成しました！管理画面の「独自CSS」欄に貼り付けてください。");
    });
});