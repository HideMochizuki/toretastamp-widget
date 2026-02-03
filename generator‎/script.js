$(document).ready(function() {
    // カラーピッカー同期
    function setupColorSync(pickerId, textId, targetSelector, cssProp) {
        $(`#${pickerId}`).on('input', function() {
            const val = $(this).val().toUpperCase();
            $(`#${textId}`).val(val);
            $(targetSelector).css(cssProp, val);
        });
        $(`#${textId}`).on('input', function() {
            const val = $(this).val();
            if (/^#[0-9A-F]{6}$/i.test(val)) {
                $(`#${pickerId}`).val(val);
                $(targetSelector).css(cssProp, val);
            }
        });
    }

    setupColorSync('cfg-h-bg', 'cfg-h-bg-val', '#prev-header', 'background-color');
    setupColorSync('cfg-btn-bg', 'cfg-btn-bg-val', '.mock-btn', 'background-color');

    // コード生成 (簡易版)
    $('#generate-btn').on('click', function() {
        const hBg = $('#cfg-h-bg-val').val();
        const bBg = $('#cfg-btn-bg-val').val();

        const cssOutput = `
/* ヘッダー背景 */
header.top { background-color: ${hBg} !important; }
/* メインボタン背景 */
.top_button ul li a div.button_img { background-color: ${bBg} !important; }
        `;

        $('#out-css').val(cssOutput.trim());
        alert("コードを生成しました！");
    });
});
