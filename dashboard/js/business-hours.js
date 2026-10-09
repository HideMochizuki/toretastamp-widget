window.Dashboard = window.Dashboard || {};

// 店舗ごと・曜日ごとの営業時間マスターを使って、営業時間外のスタンプ押下を検出する。
// マスター未登録の店舗は判定不能として対象外にする(=計算に含めない。黙って0件に見せない)。
window.Dashboard.BusinessHours = (function () {
  const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const DAY_LABELS = { mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日' };

  function timeToMinutes(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  // 戻り値: true(時間外) / false(時間内) / null(その店舗の設定が無く判定不能)
  function isOutsideBusinessHours(at, storeHoursConfig) {
    if (!storeHoursConfig) return null;
    const date = new Date(at);
    const dayKey = DAY_KEYS[date.getDay()];
    const dayConfig = storeHoursConfig[dayKey];
    if (!dayConfig) return null;
    if (dayConfig.closed) return true;

    const minutes = date.getHours() * 60 + date.getMinutes();
    return minutes < timeToMinutes(dayConfig.open) || minutes > timeToMinutes(dayConfig.close);
  }

  // stampPushes: [{ memberId, at, storeKey }]。店舗ごとの設定が無いものは unconfiguredStores に集計する。
  function findOutOfHoursPushes(stampPushes, businessHoursConfig) {
    const results = [];
    const unconfiguredStores = new Set();

    for (const push of stampPushes) {
      if (!push.storeKey) continue;
      const storeConfig = businessHoursConfig[push.storeKey];
      const outside = isOutsideBusinessHours(push.at, storeConfig);
      if (outside === null) {
        unconfiguredStores.add(push.storeKey);
        continue;
      }
      if (outside) results.push(push);
    }

    return { results, unconfiguredStores: Array.from(unconfiguredStores) };
  }

  return { DAY_KEYS, DAY_LABELS, isOutsideBusinessHours, findOutOfHoursPushes };
})();
