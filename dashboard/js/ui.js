// generator/common-ui.js と同じ、サイドバー開閉・カードのアコーディオン開閉。
// ただしこのダッシュボードは数値を一覧するためのツールなので、ジェネレーターと違い
// 読み込み直後に全カードを閉じたりはしない(毎回全部開き直す手間になってしまうため)。
document.addEventListener('DOMContentLoaded', () => {
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

  document.querySelectorAll('.card-wrapper').forEach(wrapper => {
    const title = wrapper.querySelector('h2.card-title');
    if (title) {
      title.addEventListener('click', () => {
        wrapper.classList.toggle('collapsed');
      });
    }
  });
});
