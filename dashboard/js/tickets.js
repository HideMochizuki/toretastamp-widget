window.Dashboard = window.Dashboard || {};

// チケット種別ごとの有効期限マスター(masterConfig)を使って、台帳(ledger)上の各チケットが
// 基準日時点で「有効」かどうかを判定する。masterConfig に登録のないチケット番号は
// 判定不能として active=null を返す(呼び出し側で「未設定」として除外・警告する)。
//
// masterConfig の形:
//   { "<チケット番号>": { category: 'none'|'fixed_date'|'days_from_issue'|'issue_day_only', value } }
window.Dashboard.Tickets = (function () {
  const U = window.Dashboard.Util;

  // 戻り値: true(有効) / false(失効・使用済み) / null(マスター未設定で判定不能) /
  //         undefined(基準日の時点ではまだ発行されていない=このチケットはまだ存在しない)
  // 最後のundefinedは「現在時点」だけを見ていた頃は起こり得なかった(発行日は常に過去)が、
  // 過去の日付を基準にスナップショットを取る(チケットの推移グラフなど)用途で必要になった。
  function isActive(ticket, config, asOf) {
    if (new Date(ticket.issuedAt) > asOf) return undefined;
    if (ticket.usedAt && new Date(ticket.usedAt) <= asOf) return false;
    if (!config) return null;

    const issuedAt = new Date(ticket.issuedAt);
    switch (config.category) {
      case 'none':
        return true;
      case 'fixed_date':
        return asOf <= new Date(config.value);
      case 'days_from_issue':
        return U.diffDays(issuedAt, asOf) <= Number(config.value);
      case 'issue_day_only':
        return U.toDayKey(issuedAt) === U.toDayKey(asOf);
      default:
        return null;
    }
  }

  // そのチケットの失効日(=もう有効ではなくなる日)を返す。"有効期限なし"は失効日が無いのでnull。
  function calcExpiryDate(ticket, config) {
    if (!config) return null;
    const issuedAt = new Date(ticket.issuedAt);
    switch (config.category) {
      case 'none':
        return null;
      case 'fixed_date':
        return new Date(config.value);
      case 'days_from_issue':
        return U.addDays(issuedAt, Number(config.value));
      case 'issue_day_only':
        return issuedAt;
      default:
        return null;
    }
  }

  // 「有効期限まであとN日以内」のチケットを、まだ有効なものの中から抽出する。
  // 「有効期限なし」のチケットは失効日が無いので対象外(=期限切れの心配がないため)。
  function listExpiringSoon(ledger, masterConfig, thresholdDays, asOfDate) {
    const asOf = asOfDate || new Date();
    const results = [];

    for (const ticket of ledger) {
      const config = masterConfig[ticket.ticketNo];
      if (!isActive(ticket, config, asOf)) continue;

      const expiryDate = calcExpiryDate(ticket, config);
      if (!expiryDate) continue;

      const daysRemaining = U.diffDays(asOf, expiryDate);
      if (daysRemaining < 0 || daysRemaining > thresholdDays) continue;

      results.push({ ...ticket, expiryDate: expiryDate.toISOString(), daysRemaining });
    }

    return results.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }

  function calcTicketValidity(ledger, masterConfig, asOfDate) {
    const asOf = asOfDate || new Date();
    const result = {
      activeCount: 0,
      inactiveCount: 0,
      unconfiguredCount: 0,
      unconfiguredTicketNos: [],
      byTicketNo: {},
    };
    const unconfiguredSet = new Set();

    for (const ticket of ledger) {
      const config = masterConfig[ticket.ticketNo];
      const active = isActive(ticket, config, asOf);
      if (active === undefined) continue; // 基準日の時点ではまだ発行されていない

      result.byTicketNo[ticket.ticketNo] = result.byTicketNo[ticket.ticketNo] || {
        name: ticket.ticketName,
        issued: 0,
        used: 0,
        active: 0,
        inactive: 0,
        unconfigured: 0,
      };
      const bucket = result.byTicketNo[ticket.ticketNo];
      bucket.issued += 1;

      const isUsed = !!(ticket.usedAt && new Date(ticket.usedAt) <= asOf);
      if (isUsed) bucket.used += 1;

      if (active === null) {
        result.unconfiguredCount += 1;
        unconfiguredSet.add(ticket.ticketNo);
        bucket.unconfigured += 1;
      } else if (active) {
        result.activeCount += 1;
        bucket.active += 1;
      } else {
        result.inactiveCount += 1;
        bucket.inactive += 1;
      }
    }

    result.unconfiguredTicketNos = Array.from(unconfiguredSet);
    return result;
  }

  return { isActive, calcTicketValidity, calcExpiryDate, listExpiringSoon };
})();
