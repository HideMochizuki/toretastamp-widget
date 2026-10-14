window.Dashboard = window.Dashboard || {};

// メッセージ配信ごとに、配信後N日以内に同じ配信ID(通常配信ID/リッチメッセージID)タグが付いた
// 来店イベント(既定: スタンプ押下)が何件発生したかを数える。
//
// 会員IDが取れない行から来店判定を行うため、これは「反応した人数」ではなく「反応した件数」。
// 同一人物が期間中に複数回スタンプを押せば複数件としてカウントされる点は呼び出し側で明示すること。
window.Dashboard.Effect = (function () {
  function calcMessageEffect(messagesSent, attributedVisits, windowDays, targetEvent) {
    const event = targetEvent || 'スタンプ押下';

    const visitsByMessage = {};
    for (const v of attributedVisits) {
      if (v.event !== event) continue;
      (visitsByMessage[v.messageId] = visitsByMessage[v.messageId] || []).push(new Date(v.at));
    }

    return Object.values(messagesSent)
      .map(message => {
        const sentAt = new Date(message.sentAt);
        const deadline = new Date(sentAt);
        deadline.setDate(deadline.getDate() + windowDays);

        const visitCount = (visitsByMessage[message.id] || [])
          .filter(d => d >= sentAt && d <= deadline)
          .length;

        return {
          id: message.id,
          subject: message.subject,
          sentAt: message.sentAt,
          recipientCount: message.recipientCount,
          visitEventCount: visitCount,
          reachRate: message.recipientCount > 0 ? visitCount / message.recipientCount : null,
        };
      })
      .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  }

  // 「スタンプページを表示した人のうち、何人がN日以内にスタンプを押しに来たか」を会員ID単位で数える。
  // (メッセージ効果と違い、この2つのイベントは会員IDが入っているので人数ベースで数えられる)
  // 同じ人が何度も表示していても、最初に表示した時刻を起点に1人として数える。
  function calcPageViewToVisitFunnel(pageViews, stampPushes, windowDays) {
    const firstViewByMember = {};
    for (const v of pageViews) {
      const at = new Date(v.at);
      if (!firstViewByMember[v.memberId] || at < firstViewByMember[v.memberId]) {
        firstViewByMember[v.memberId] = at;
      }
    }

    const pushesByMember = {};
    for (const p of stampPushes) {
      (pushesByMember[p.memberId] = pushesByMember[p.memberId] || []).push(new Date(p.at));
    }

    const viewerIds = Object.keys(firstViewByMember);
    let convertedCount = 0;
    for (const memberId of viewerIds) {
      const viewAt = firstViewByMember[memberId];
      const deadline = new Date(viewAt);
      deadline.setDate(deadline.getDate() + windowDays);
      const pushes = pushesByMember[memberId] || [];
      if (pushes.some(d => d > viewAt && d <= deadline)) convertedCount += 1;
    }

    return {
      viewerCount: viewerIds.length,
      convertedCount,
      rate: viewerIds.length > 0 ? convertedCount / viewerIds.length : null,
    };
  }

  return { calcMessageEffect, calcPageViewToVisitFunnel };
})();
