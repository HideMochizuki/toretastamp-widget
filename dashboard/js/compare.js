window.Dashboard = window.Dashboard || {};

// GAと同じ考え方: 選択期間と同じ日数ぶん遡った期間を「たたき台」として自動算出する。
// 返した from/to は画面側で自由に上書きしてよい(呼び出し側の責務)。
window.Dashboard.Compare = (function () {
  const U = window.Dashboard.Util;

  function defaultComparisonRange(mainFrom, mainTo) {
    const lengthDays = U.diffDays(mainFrom, mainTo) + 1;
    const compTo = U.addDays(mainFrom, -1);
    const compFrom = U.addDays(compTo, -(lengthDays - 1));
    return { from: compFrom, to: compTo };
  }

  return { defaultComparisonRange };
})();
