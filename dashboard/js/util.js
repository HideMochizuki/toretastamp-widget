window.Dashboard = window.Dashboard || {};

window.Dashboard.Util = (function () {
  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  // 日時の区切り文字は "2026/10/9 17:39" (スラッシュ)と "2026-10-09 17:39:38" (ハイフン)の
  // どちらのパターンも実際の管理画面エクスポートで確認されている(ファイルによって違う)ため、両方許容する。
  function parseDateTime(s) {
    if (!s) return null;
    const m = String(s).trim().match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
    if (!m) return null;
    const [, y, mo, d, h, mi, se] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d), Number(h || 0), Number(mi || 0), Number(se || 0));
  }

  function toDayKey(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function toMonthKey(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
  }

  function addDays(date, days) {
    const r = new Date(date);
    r.setDate(r.getDate() + days);
    return r;
  }

  // 発行日と利用日はどちらも日付境界で比較する(時刻は切り捨て)。有効期限は「日数」で設定されるため。
  function diffDays(from, to) {
    const MS = 24 * 60 * 60 * 1000;
    const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((b - a) / MS);
  }

  // 管理画面のデフォルト書き出し名（例: すべてのログ2026-10.csv）から年月キーを取り出す。
  // 会員数が少ない個店など、月単位ではなく1ファイルで全期間をDLしている場合は
  // 「すべてのログ.csv」（年月なし）という名前で置いてもらう運用とし、特別なキー'all'を返す。
  function parseMonthFromFileName(fileName) {
    const m = fileName.match(/すべてのログ(\d{4})-(\d{1,2})/);
    if (m) return `${m[1]}-${pad2(Number(m[2]))}`;
    if (/^すべてのログ\.csv$/i.test(fileName)) return 'all';
    return null;
  }

  // ホーム/チケット設定/営業時間設定など、クライアント選択プルダウンを持つページ間で
  // 「どのクライアントを見ていたか」を引き継ぐための共通ストレージ。クライアント名をキーにする
  // (読み込むたびに並び順は同じはずだが、indexではなく名前で突き合わせたほうが安全)。
  const LAST_CLIENT_KEY = 'toretastamp:lastClientName';

  function getLastClientName() {
    try {
      return localStorage.getItem(LAST_CLIENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setLastClientName(name) {
    try {
      localStorage.setItem(LAST_CLIENT_KEY, name);
    } catch (e) {
      // プライベートブラウジングなどでlocalStorageが使えない場合は、ページ間の引き継ぎを諦めるだけでよい
    }
  }

  return {
    pad2, parseDateTime, toDayKey, toMonthKey, addDays, diffDays, parseMonthFromFileName,
    getLastClientName, setLastClientName,
  };
})();
