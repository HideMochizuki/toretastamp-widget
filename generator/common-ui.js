document.addEventListener('DOMContentLoaded', () => {
    // --- 1. サイドバーの開閉トグル ---
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn && sidebar) {
        const savedState = localStorage.getItem('sidebar_collapsed');
        if (savedState === 'true') sidebar.classList.add('collapsed');

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // --- 2. カードの開閉（アコーディオン） ---
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    cardWrappers.forEach(wrapper => {
        // 最初は閉じた状態にする
        wrapper.classList.add('collapsed');
        const title = wrapper.querySelector('h2.card-title');
        if (title) {
            title.addEventListener('click', () => {
                wrapper.classList.toggle('collapsed');
            });
        }
    });
});

// --- 3. コピー機能（共通関数） ---
window.copyText = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.select();
        document.execCommand('copy');
        alert("コピーしました");
    }
};