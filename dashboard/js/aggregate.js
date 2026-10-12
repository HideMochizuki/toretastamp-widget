window.Dashboard = window.Dashboard || {};

// アクセスログ1ファイル分（=だいたい1ヶ月分）から、生ログを捨てても困らない粒度まで圧縮する。
// ・件数集計は「日ごと」をキーに、その日のtotal/ブランド別/店舗別/スタンプページ別を全部持つ(byDay)。
//   「期間」と「店舗」を同時に絞り込みたい(例: 今月・A店だけ)ので、日単位の粒度を潰さずに残している。
// ・チケット発行/利用とメッセージ配信の関連は、月をまたいで突き合わせる必要があるので
//   ここでは正規化した「台帳」行として残し、実際の突き合わせは mergeMonthlyAggregates 側で行う
window.Dashboard.Aggregate = (function () {
  const U = window.Dashboard.Util;

  function bump(obj, key) {
    obj[key] = (obj[key] || 0) + 1;
  }

  function emptyDayBucket() {
    return { total: {}, byBrand: {}, byStore: {}, byStampPage: {}, byStoreStampPage: {} };
  }

  function aggregateAccessLogRows(rows) {
    // チケット発行はログにスタンプページ名称を持たないが、実データで確認した限り
    // ほぼ100%(99.9〜100%, 4ヶ月分で確認済み)、同じ会員・同じ分(日時の記録は分単位)に
    // スタンプ押下が記録されている(スタンプを押した結果として自動発行されるため)。
    // これを使って間接的にスタンプページへ帰属させる。
    // ※ チケット利用はこの相関が17%程度しかないため対象外(レジでの利用は押下と別タイミングのため)。
    const stampPageByMoment = new Map();
    for (const row of rows) {
      if (row['イベント'] === 'スタンプ押下' && row['会員ID'] && row['スタンプページ名称']) {
        stampPageByMoment.set(`${row['会員ID']}|${row['日時']}`, row['スタンプページ名称']);
      }
    }

    const result = {
      dateRange: { min: null, max: null },
      byDay: {},
      ticketIssued: [],
      ticketUsed: [],
      messagesSent: {},
      attributedVisits: [],
      pageViews: [],
      stampPushes: [],
    };

    for (const row of rows) {
      const dt = U.parseDateTime(row['日時']);
      if (!dt) continue;

      const event = row['イベント'];
      const day = U.toDayKey(dt);
      const brand = row['ブランド名'] || '(ブランド未設定)';
      const storeKey = row['店舗番号'] ? `${row['店舗番号']}:${row['店舗名']}` : null;
      const memberId = row['会員ID'] || null;
      const stampPage = row['スタンプページ名称']
        || (event === 'チケット発行' && memberId ? stampPageByMoment.get(`${memberId}|${row['日時']}`) : null)
        || null;

      if (!result.dateRange.min || dt < result.dateRange.min) result.dateRange.min = dt;
      if (!result.dateRange.max || dt > result.dateRange.max) result.dateRange.max = dt;

      const bucket = result.byDay[day] = result.byDay[day] || emptyDayBucket();
      bump(bucket.total, event);
      bucket.byBrand[brand] = bucket.byBrand[brand] || {};
      bump(bucket.byBrand[brand], event);
      if (storeKey) {
        bucket.byStore[storeKey] = bucket.byStore[storeKey] || {};
        bump(bucket.byStore[storeKey], event);
      }
      if (stampPage) {
        bucket.byStampPage[stampPage] = bucket.byStampPage[stampPage] || {};
        bump(bucket.byStampPage[stampPage], event);
        if (storeKey) {
          bucket.byStoreStampPage[storeKey] = bucket.byStoreStampPage[storeKey] || {};
          bucket.byStoreStampPage[storeKey][stampPage] = bucket.byStoreStampPage[storeKey][stampPage] || {};
          bump(bucket.byStoreStampPage[storeKey][stampPage], event);
        }
      }

      // チケット発行は店舗番号が付くが、チケット利用には付かない(ログ仕様)。
      // そのため「店舗別のチケット利用数」は出せない。storeKeyはissued側にだけ残す。
      if (event === 'チケット発行') {
        result.ticketIssued.push({
          ticketNo: row['チケット番号'],
          ticketName: row['チケット名称'],
          memberId,
          issuedAt: dt.toISOString(),
          storeKey,
        });
      }

      if (event === 'チケット利用') {
        result.ticketUsed.push({
          ticketNo: row['チケット番号'],
          memberId,
          usedAt: dt.toISOString(),
        });
      }

      // 「スタンプページ表示→来店(スタンプ押下)」のファネル計測用。会員IDが取れる行だけ対象にする。
      if (memberId && (event === '未使用スタンプページ表示' || event === '使用中スタンプページ表示')) {
        result.pageViews.push({ memberId, at: dt.toISOString() });
      }
      if (memberId && event === 'スタンプ押下') {
        result.stampPushes.push({ memberId, at: dt.toISOString(), storeKey, stampPage });
      }

      // メッセージ配信/配信ユーザー行、およびそこから発生した行動には同じID(通常配信ID or リッチメッセージID)が
      // タグとして引き継がれる。ただし会員IDはどちらの系統の行にも入らないため、突合キーはこのIDのみになる。
      const messageId = row['リッチメッセージID'] || row['通常配信ID'] || null;

      if (messageId && (event === 'メッセージ配信' || event === 'メッセージ配信ユーザー')) {
        result.messagesSent[messageId] = result.messagesSent[messageId] || {
          id: messageId,
          subject: row['件名'] || '',
          sentAt: dt.toISOString(),
          brand,
          recipientCount: 0,
        };
        if (event === 'メッセージ配信ユーザー') {
          result.messagesSent[messageId].recipientCount += 1;
        }
      } else if (messageId) {
        result.attributedVisits.push({ messageId, event, at: dt.toISOString() });
      }
    }

    return result;
  }

  function mergeCountDicts(target, source) {
    for (const k of Object.keys(source)) target[k] = (target[k] || 0) + source[k];
  }

  function mergeNestedCountDicts(target, source) {
    for (const key of Object.keys(source)) {
      target[key] = target[key] || {};
      mergeCountDicts(target[key], source[key]);
    }
  }

  function mergeNested2CountDicts(target, source) {
    for (const key of Object.keys(source)) {
      target[key] = target[key] || {};
      mergeNestedCountDicts(target[key], source[key]);
    }
  }

  function mergeDayBuckets(target, source) {
    mergeCountDicts(target.total, source.total);
    mergeNestedCountDicts(target.byBrand, source.byBrand);
    mergeNestedCountDicts(target.byStore, source.byStore);
    mergeNestedCountDicts(target.byStampPage, source.byStampPage);
    mergeNested2CountDicts(target.byStoreStampPage, source.byStoreStampPage);
  }

  function mergeMonthlyAggregates(aggregates) {
    const merged = {
      dateRange: { min: null, max: null },
      byDay: {},
      ticketIssued: [],
      ticketUsed: [],
      messagesSent: {},
      attributedVisits: [],
      pageViews: [],
      stampPushes: [],
    };

    for (const agg of aggregates) {
      if (!agg) continue;
      if (agg.dateRange.min && (!merged.dateRange.min || agg.dateRange.min < merged.dateRange.min)) {
        merged.dateRange.min = agg.dateRange.min;
      }
      if (agg.dateRange.max && (!merged.dateRange.max || agg.dateRange.max > merged.dateRange.max)) {
        merged.dateRange.max = agg.dateRange.max;
      }

      for (const [day, bucket] of Object.entries(agg.byDay)) {
        merged.byDay[day] = merged.byDay[day] || emptyDayBucket();
        mergeDayBuckets(merged.byDay[day], bucket);
      }

      merged.ticketIssued.push(...agg.ticketIssued);
      merged.ticketUsed.push(...agg.ticketUsed);
      merged.attributedVisits.push(...agg.attributedVisits);
      merged.pageViews.push(...(agg.pageViews || []));
      merged.stampPushes.push(...(agg.stampPushes || []));

      for (const m of Object.values(agg.messagesSent)) {
        if (!merged.messagesSent[m.id]) {
          merged.messagesSent[m.id] = { ...m };
        } else {
          merged.messagesSent[m.id].recipientCount += m.recipientCount;
          if (!merged.messagesSent[m.id].subject && m.subject) merged.messagesSent[m.id].subject = m.subject;
        }
      }
    }

    return merged;
  }

  function inRange(day, from, to) {
    if (from && day < U.toDayKey(from)) return false;
    if (to && day > U.toDayKey(to)) return false;
    return true;
  }

  // 期間(from/to、省略で全期間)と、ブランド or 店舗の絞り込み(どちらか一方、省略で全体合算)を
  // かけたうえでのイベント件数を返す。
  function queryCounts(byDay, opts) {
    const { from, to, brand, storeKey } = opts || {};
    const result = {};
    for (const [day, bucket] of Object.entries(byDay)) {
      if (!inRange(day, from, to)) continue;
      const source = storeKey ? bucket.byStore[storeKey] : (brand ? bucket.byBrand[brand] : bucket.total);
      if (!source) continue;
      mergeCountDicts(result, source);
    }
    return result;
  }

  // 店舗ごとのイベント件数一覧(期間で絞り込み可)。店舗別テーブル表示に使う。
  function queryByStore(byDay, opts) {
    const { from, to } = opts || {};
    const result = {};
    for (const [day, bucket] of Object.entries(byDay)) {
      if (!inRange(day, from, to)) continue;
      for (const [store, counts] of Object.entries(bucket.byStore)) {
        result[store] = result[store] || {};
        mergeCountDicts(result[store], counts);
      }
    }
    return result;
  }

  // スタンプページごとのイベント件数一覧(期間・店舗で絞り込み可)。「スタンプ帳ごとの押下数」表示に使う。
  function queryByStampPage(byDay, opts) {
    const { from, to, storeKey } = opts || {};
    const result = {};
    for (const [day, bucket] of Object.entries(byDay)) {
      if (!inRange(day, from, to)) continue;
      const source = storeKey ? (bucket.byStoreStampPage[storeKey] || {}) : bucket.byStampPage;
      for (const [page, counts] of Object.entries(source)) {
        result[page] = result[page] || {};
        mergeCountDicts(result[page], counts);
      }
    }
    return result;
  }

  function listBrands(byDay) {
    const set = new Set();
    for (const bucket of Object.values(byDay)) {
      for (const b of Object.keys(bucket.byBrand)) set.add(b);
    }
    return Array.from(set).sort();
  }

  function listStores(byDay) {
    const set = new Set();
    for (const bucket of Object.values(byDay)) {
      for (const s of Object.keys(bucket.byStore)) set.add(s);
    }
    return Array.from(set).sort();
  }

  function listStampPages(byDay) {
    const set = new Set();
    for (const bucket of Object.values(byDay)) {
      for (const p of Object.keys(bucket.byStampPage)) set.add(p);
    }
    return Array.from(set).sort();
  }

  // チケット発行イベントと利用イベントを (チケット番号, 会員ID) をキーに、発行が古い順のFIFOで対応付ける。
  // 会員ID未取得のチケット(＝チケット発行時にログインしていない等)は突き合わせ不能なので usedAt=null のまま残す。
  function buildTicketLedger(ticketIssued, ticketUsed) {
    const ledger = ticketIssued
      .slice()
      .sort((a, b) => new Date(a.issuedAt) - new Date(b.issuedAt))
      .map(t => ({ ...t, usedAt: null }));

    const pending = {};
    for (const t of ledger) {
      if (!t.memberId) continue;
      const key = `${t.ticketNo}_${t.memberId}`;
      (pending[key] = pending[key] || []).push(t);
    }

    const usedSorted = ticketUsed
      .filter(u => u.memberId)
      .slice()
      .sort((a, b) => new Date(a.usedAt) - new Date(b.usedAt));

    for (const used of usedSorted) {
      const key = `${used.ticketNo}_${used.memberId}`;
      const queue = pending[key];
      if (!queue) continue;
      const target = queue.find(t => !t.usedAt && new Date(t.issuedAt) <= new Date(used.usedAt));
      if (target) target.usedAt = used.usedAt;
    }

    return ledger;
  }

  // 会員一覧CSV(常に最新の全件スナップショット)から、会員数・退会者数・LINE会員数などを出す。
  // members には 会員ID→LINE ID・登録店舗・登録日時 の対応表も残す。これがあれば
  // 「会員登録者数の推移」を日/月/年×店舗の好きな組み合わせで、集計し直さず出せる。
  function summarizeMemberList(memberRows) {
    const result = {
      total: 0,
      withdrawn: 0,
      active: 0,
      lineMembers: 0,
      byStore: {},
      members: {},
    };

    for (const row of memberRows) {
      result.total += 1;
      const isWithdrawn = row['退会'] === '1';
      if (isWithdrawn) result.withdrawn += 1; else result.active += 1;
      if (row['LINE ID']) result.lineMembers += 1;

      const storeKey = row['初回登録店舗番号']
        ? `${row['初回登録店舗番号']}:${row['初回登録店舗名']}`
        : '(店舗未設定)';
      result.byStore[storeKey] = result.byStore[storeKey] || { total: 0, withdrawn: 0 };
      result.byStore[storeKey].total += 1;
      if (isWithdrawn) result.byStore[storeKey].withdrawn += 1;

      const regDt = U.parseDateTime(row['登録日時']);
      // 「登録日時」はこの会員一覧CSVの行の登録イベント日時(再登録でも更新されうる)。
      // 「初回登録日時」はその会員が生涯で最初に登録した日時で、新規/既存の判定には
      // こちらを使う(でないと、何年も前からの会員を「新規」と誤分類してしまう)。
      const firstRegDt = U.parseDateTime(row['初回登録日時']) || regDt;

      if (row['会員ID']) {
        result.members[row['会員ID']] = {
          lineId: row['LINE ID'] || null,
          storeKey,
          withdrawn: isWithdrawn,
          registeredAt: regDt ? regDt.toISOString() : null,
          firstRegisteredAt: firstRegDt ? firstRegDt.toISOString() : null,
          // 会員プロフィール項目。事業者によって取得していない(全行空欄)こともあるため、
          // 空欄はnullのままにしておく(集計側で「取得できている人数」を別に数える)。
          prefecture: row['都道府県'] || null,
          gender: row['性別'] || null,
          birthYearMonth: row['生年月'] || null,
          referralSource: row['何を見て知りましたか'] || null,
        };
      }
    }

    return result;
  }

  // 生年月("YYYY-MM"形式)から年代("20代"など)を計算する。日までは分からないため、
  // 年だけで近似する(誕生月によって±1歳ずれる可能性があるが、年代の分布を見る分には十分)。
  function calcAgeGroup(birthYearMonth, asOfDate) {
    const m = String(birthYearMonth).trim().match(/^(\d{4})-(\d{1,2})$/);
    if (!m) return null;
    const birthYear = Number(m[1]);
    const asOf = asOfDate || new Date();
    const age = asOf.getFullYear() - birthYear;
    if (age < 0 || age > 119) return null;
    if (age < 20) return '10代以下';
    if (age < 70) return `${Math.floor(age / 10) * 10}代`;
    return '70代以上';
  }

  // 会員プロフィール(都道府県・性別・年代・流入経路)の分布を集計する。
  // 項目ごとに「取得できている人数」を別に返すので、画面側は取得できている項目だけ表示できる。
  function summarizeMemberAttributes(members, asOfDate) {
    const result = {
      totalWithPrefecture: 0, byPrefecture: {},
      totalWithGender: 0, byGender: {},
      totalWithAge: 0, byAgeGroup: {},
      totalWithReferral: 0, byReferralSource: {},
    };

    for (const m of Object.values(members)) {
      if (m.prefecture) {
        result.totalWithPrefecture += 1;
        result.byPrefecture[m.prefecture] = (result.byPrefecture[m.prefecture] || 0) + 1;
      }
      if (m.gender) {
        result.totalWithGender += 1;
        result.byGender[m.gender] = (result.byGender[m.gender] || 0) + 1;
      }
      const ageGroup = m.birthYearMonth ? calcAgeGroup(m.birthYearMonth, asOfDate) : null;
      if (ageGroup) {
        result.totalWithAge += 1;
        result.byAgeGroup[ageGroup] = (result.byAgeGroup[ageGroup] || 0) + 1;
      }
      if (m.referralSource) {
        result.totalWithReferral += 1;
        result.byReferralSource[m.referralSource] = (result.byReferralSource[m.referralSource] || 0) + 1;
      }
    }

    return result;
  }

  // 会員数が多いクライアントは、会員一覧を複数ファイルに分けてDLすることがある
  // (例: 会員一覧.csv, 会員一覧2.csv, ...)。summarizeMemberList() した結果を
  // このファイルで束ねて、1つの会員一覧として扱えるようにする。
  // members は会員IDでまとめるため、同じ会員IDが複数ファイルに重複して入っていても
  // 二重には数えない(後に読んだファイルの内容で上書きされる)。
  function mergeMemberSummaries(summaries) {
    const members = {};
    for (const s of summaries) {
      if (!s) continue;
      Object.assign(members, s.members);
    }

    const result = { total: 0, withdrawn: 0, active: 0, lineMembers: 0, byStore: {}, members };
    for (const m of Object.values(members)) {
      result.total += 1;
      if (m.withdrawn) result.withdrawn += 1; else result.active += 1;
      if (m.lineId) result.lineMembers += 1;

      result.byStore[m.storeKey] = result.byStore[m.storeKey] || { total: 0, withdrawn: 0 };
      result.byStore[m.storeKey].total += 1;
      if (m.withdrawn) result.byStore[m.storeKey].withdrawn += 1;
    }

    return result;
  }

  // 会員登録数を日/月/年の粒度で、必要なら店舗(storeKey)で絞り込んで集計する。
  function countRegistrationsByPeriod(members, granularity, storeKey) {
    const result = {};
    for (const m of Object.values(members)) {
      if (storeKey && m.storeKey !== storeKey) continue;
      if (!m.registeredAt) continue;
      const d = new Date(m.registeredAt);
      const key = granularity === 'day' ? U.toDayKey(d)
        : granularity === 'year' ? String(d.getFullYear())
        : U.toMonthKey(d);
      result[key] = (result[key] || 0) + 1;
    }
    return result;
  }

  // countRegistrationsByPeriodと同じ集計を、LINE会員(LINE IDあり)とメール認証会員(LINE IDなし)の
  // 内訳付きで出す(会員登録者数の推移グラフで、LINE/メールの割合を積み上げ棒で見せる用)。
  function countRegistrationsByPeriodSplit(members, granularity, storeKey) {
    const result = {};
    for (const m of Object.values(members)) {
      if (storeKey && m.storeKey !== storeKey) continue;
      if (!m.registeredAt) continue;
      const d = new Date(m.registeredAt);
      const key = granularity === 'day' ? U.toDayKey(d)
        : granularity === 'year' ? String(d.getFullYear())
        : U.toMonthKey(d);
      const bucket = result[key] = result[key] || { line: 0, email: 0 };
      if (m.lineId) bucket.line += 1; else bucket.email += 1;
    }
    return result;
  }

  // 月ごとに「その月末時点までの累計会員数」に対する「その月にスタンプを押した会員数(アクティブ)」の
  // 割合を計算する。会員数は増え続けても、実際に使われているか(アクティブ率)が伴っているかを見るための指標
  // (会員数の増加だけを見て安心してしまう、という事業者の思い込みに気づいてもらうための数字)。
  function calcMonthlyActiveRate(stampPushes, members, storeKey) {
    const registrationMonths = Object.values(members)
      .filter(m => m.registeredAt && (!storeKey || m.storeKey === storeKey))
      .map(m => U.toMonthKey(new Date(m.registeredAt)))
      .sort();

    const activeByMonth = {};
    for (const p of stampPushes) {
      if (!p.memberId) continue;
      if (storeKey && p.storeKey !== storeKey) continue;
      const month = U.toMonthKey(new Date(p.at));
      const set = activeByMonth[month] = activeByMonth[month] || new Set();
      set.add(p.memberId);
    }

    const months = Array.from(new Set([...registrationMonths, ...Object.keys(activeByMonth)])).sort();

    const result = {};
    let cumulativeRegistered = 0;
    let regIdx = 0;
    for (const month of months) {
      while (regIdx < registrationMonths.length && registrationMonths[regIdx] <= month) {
        cumulativeRegistered += 1;
        regIdx += 1;
      }
      const activeCount = activeByMonth[month] ? activeByMonth[month].size : 0;
      result[month] = {
        cumulativeRegistered,
        activeCount,
        activeRate: cumulativeRegistered ? activeCount / cumulativeRegistered : 0,
      };
    }
    return result;
  }

  // 店舗ごと・月ごとの会員登録数を1回の走査でまとめる。「会員登録された店舗」の表で
  // 当月・先月の登録数を店舗別に出す用(countRegistrationsByPeriodを店舗の数だけ呼ぶと
  // 走査がO(店舗数×会員数)になってしまうため、専用に1回の走査で集計する)。
  function countRegistrationsByStoreAndMonth(members) {
    const result = {};
    for (const m of Object.values(members)) {
      if (!m.registeredAt) continue;
      const monthKey = U.toMonthKey(new Date(m.registeredAt));
      result[m.storeKey] = result[m.storeKey] || {};
      result[m.storeKey][monthKey] = (result[m.storeKey][monthKey] || 0) + 1;
    }
    return result;
  }

  // 「以前は頻繁に来ていたのに、最近来店していない」常連客(離脱予兆)を抽出する。
  // 「常連」の判定は総来店回数(スタンプ押下回数。ブランド全体でカウントする公式定義に合わせ、
  // storeKeyでは絞り込まない)、「最近来ていない」は最終来店日からの経過日数で判定する。
  function findLapsedRegulars(stampPushes, minVisits, thresholdDays, asOfDate) {
    const asOf = asOfDate || new Date();
    const byMember = {};

    for (const push of stampPushes) {
      if (!push.memberId) continue;
      const at = new Date(push.at);
      const m = byMember[push.memberId] = byMember[push.memberId] || { pushCount: 0, lastPushAt: null };
      m.pushCount += 1;
      if (!m.lastPushAt || at > m.lastPushAt) m.lastPushAt = at;
    }

    const results = [];
    for (const [memberId, info] of Object.entries(byMember)) {
      if (info.pushCount < minVisits) continue;
      const daysSinceLastVisit = U.diffDays(info.lastPushAt, asOf);
      if (daysSinceLastVisit < thresholdDays) continue;
      results.push({
        memberId,
        pushCount: info.pushCount,
        lastPushAt: info.lastPushAt.toISOString(),
        daysSinceLastVisit,
      });
    }

    return results.sort((a, b) => b.pushCount - a.pushCount);
  }

  // スタンプ帳ごとに「今、会員が何個目まで貯めているか(保有スタンプ数)」「今何枚目のカードか」の
  // 分布を数える(現在のスナップショット。全期間・全店舗が対象で、期間や店舗の絞り込みはしない)。
  // 「1枚あたりの個数」に達するとカウントは0に戻って次の1枚が始まる(=カードが満了してチケット発行)
  // という仕様を前提にしている。ちょうど満了した会員は「次の1枚の0個」ではなく「その枚の満了(=個数ぴったり)」
  // として数える(「0個」という誰も気にしない区分より、「満了した」区分の方がファネルとして意味を持つため)。
  // 「1枚あたりの個数」が未登録のスタンプ帳は枚数の境目が分からないため計算できず、結果に含まれない。
  function calcStampCardProgress(stampPushes, stampPageConfig) {
    const totalsByPageMember = {};
    for (const p of stampPushes) {
      if (!p.memberId || !p.stampPage) continue;
      const byMember = totalsByPageMember[p.stampPage] = totalsByPageMember[p.stampPage] || {};
      byMember[p.memberId] = (byMember[p.memberId] || 0) + 1;
    }

    const result = {};
    for (const [page, byMember] of Object.entries(totalsByPageMember)) {
      const config = stampPageConfig[page] || {};
      const stampsPerCard = Number(config.stampsPerCard) || null;
      if (!stampsPerCard) continue;

      const byCurrentCount = {};
      const byCardNumber = {};
      for (const total of Object.values(byMember)) {
        const current = total % stampsPerCard || stampsPerCard;
        const cardNumber = Math.ceil(total / stampsPerCard);
        bump(byCurrentCount, current);
        bump(byCardNumber, cardNumber);
      }

      result[page] = {
        stampsPerCard,
        memberCount: Object.keys(byMember).length,
        byCurrentCount,
        byCardNumber,
      };
    }
    return result;
  }

  // 「スタンプ帳設定」で登録したステータスランク(累計スタンプ数に基づく会員ランク)ごとに、
  // 今何人の会員がそのランクにいるかを数える(現在のスナップショット。カードの保有数と違い、
  // こちらは一度貯めたら減らない「累計」のスタンプ数で判定する)。
  // ランクはエントリー(下限0)側から順に1位・2位…と並べる(「このランクは何段階中何番目か」が分かるように)。
  // activeDays: 「直近N日以内にスタンプを押した会員」をそのランクの「アクティブ」として数える
  // (ランク自体は累計スタンプ数という生涯の実績で決まるが、そのランクの会員が今も通ってくれているかは
  // 別の話のため、両方を出す)。asOfDateは基準日(省略時は現在時刻)。
  function calcMemberRankDistribution(stampPushes, stampPageConfig, asOfDate, activeDays) {
    const asOf = asOfDate || new Date();
    const activeWindow = activeDays || 30;

    const totalsByPageMember = {};
    const lastPushByPageMember = {};
    for (const p of stampPushes) {
      if (!p.memberId || !p.stampPage) continue;
      const byMember = totalsByPageMember[p.stampPage] = totalsByPageMember[p.stampPage] || {};
      byMember[p.memberId] = (byMember[p.memberId] || 0) + 1;

      const lastByMember = lastPushByPageMember[p.stampPage] = lastPushByPageMember[p.stampPage] || {};
      const at = new Date(p.at);
      if (!lastByMember[p.memberId] || at > lastByMember[p.memberId]) lastByMember[p.memberId] = at;
    }

    const result = {};
    for (const [page, byMember] of Object.entries(totalsByPageMember)) {
      const config = stampPageConfig[page] || {};
      if (!config.statusEnabled || !config.ranks || !config.ranks.length) continue;

      let nextMin = 0;
      const bounds = config.ranks.map((r, i) => {
        const isLast = i === config.ranks.length - 1;
        const min = nextMin;
        const max = (!isLast && r.max !== null && r.max !== undefined) ? Number(r.max) : Infinity;
        nextMin = max + 1;
        return { name: r.name || `ランク${i + 1}`, order: i + 1, min, max };
      });

      const counts = bounds.map(() => 0);
      const activeCounts = bounds.map(() => 0);
      const lastByMember = lastPushByPageMember[page] || {};
      for (const [memberId, total] of Object.entries(byMember)) {
        let idx = bounds.findIndex(b => total >= b.min && total <= b.max);
        if (idx === -1) idx = bounds.length - 1;
        counts[idx] += 1;
        if (U.diffDays(lastByMember[memberId], asOf) <= activeWindow) activeCounts[idx] += 1;
      }

      result[page] = {
        memberCount: Object.keys(byMember).length,
        activeDays: activeWindow,
        ranks: bounds.map((b, i) => ({
          name: b.name, order: b.order, min: b.min, max: b.max === Infinity ? null : b.max,
          count: counts[i], activeCount: activeCounts[i],
        })),
      };
    }
    return result;
  }

  // 「スタンプ帳設定」の「スタンプ有効期限」をもとに、まもなくスタンプが失効する会員を抽出する。
  // type='last_push': 最終押下日+days(来店のたびに延びる、よくある「休眠で失効」のパターン)。
  // type='first_push'かつperPage=false: 生涯で最初の押下日+days(1回きりの期限、延長されない)。
  // type='first_push'かつperPage=true: 今の周回(カード)が始まった日+days
  //   (「1枚あたりの個数」を使って、今の保有数ぶん遡った押下日時を周回の開始日とみなす。
  //    calcStampCardProgressの「保有数」の考え方と揃えている)。
  // thresholdDays以内に失効する(まだ失効していない)会員だけを、スタンプ帳ごとにまとめて返す。
  function listStampExpiringSoon(stampPushes, stampPageConfig, thresholdDays, asOfDate) {
    const asOf = asOfDate || new Date();

    const byPageMember = {};
    for (const p of stampPushes) {
      if (!p.memberId || !p.stampPage) continue;
      const byMember = byPageMember[p.stampPage] = byPageMember[p.stampPage] || {};
      const list = byMember[p.memberId] = byMember[p.memberId] || [];
      list.push(new Date(p.at));
    }

    const result = {};
    for (const [page, byMember] of Object.entries(byPageMember)) {
      const config = stampPageConfig[page] || {};
      const expiry = config.expiry;
      if (!expiry || expiry.type === 'none' || !expiry.days) continue;

      const members = [];
      for (const [memberId, datesRaw] of Object.entries(byMember)) {
        const dates = datesRaw.slice().sort((a, b) => a - b);
        const firstAt = dates[0];
        const lastAt = dates[dates.length - 1];

        let baseAt;
        if (expiry.type === 'last_push') {
          baseAt = lastAt;
        } else if (expiry.perPage && config.stampsPerCard) {
          const stampsPerCard = Number(config.stampsPerCard);
          const currentCount = dates.length % stampsPerCard || stampsPerCard;
          baseAt = dates[dates.length - currentCount];
        } else {
          baseAt = firstAt;
        }

        const expiresAt = new Date(baseAt);
        expiresAt.setDate(expiresAt.getDate() + Number(expiry.days));
        const daysRemaining = U.diffDays(asOf, expiresAt);
        if (daysRemaining < 0 || daysRemaining > thresholdDays) continue;

        members.push({ memberId, lastPushAt: lastAt.toISOString(), expiresAt: expiresAt.toISOString(), daysRemaining });
      }

      if (members.length) result[page] = members.sort((a, b) => a.daysRemaining - b.daysRemaining);
    }
    return result;
  }

  // 月ごとに、スタンプ押下を「新規(その月が初回来店月=初めてスタンプを押した月の会員)」と
  // 「既存(それ以前から来店している会員)」に分け、押下数・ユニーク顧客数・1人あたり平均を集計する。
  // トレタCS部が顧客向けレポートで使っている定義(初回"来店"月基準)に合わせている
  // (会員一覧の「初回登録月」基準ではない点に注意。登録しただけで来店が後日なケースがあるため)。
  // この定義はアクセスログの会員IDだけで完結し、会員一覧との突合が要らないので、
  // 月をまたいだ会員ID短縮問題の影響は受けない。ただし「初回来店月」の判定は
  // storeKeyで絞り込む前の全履歴(ブランド全体)を使う───来店回数はブランド全体でカウントする、
  // というトレタの定義どおりにするため(店舗を絞ると新規/既存の判定自体が変わってしまうのを防ぐ)。
  function calcMonthlyPushByCohort(stampPushes, storeKey) {
    const firstPushAt = {};
    for (const push of stampPushes) {
      if (!push.memberId) continue;
      const at = new Date(push.at);
      if (!firstPushAt[push.memberId] || at < firstPushAt[push.memberId]) {
        firstPushAt[push.memberId] = at;
      }
    }

    const byMonth = {};
    for (const push of stampPushes) {
      if (storeKey && push.storeKey !== storeKey) continue;
      if (!push.memberId) continue;

      const pushMonth = U.toMonthKey(new Date(push.at));
      const firstMonth = U.toMonthKey(firstPushAt[push.memberId]);
      const cohort = pushMonth === firstMonth ? 'new' : 'existing';

      byMonth[pushMonth] = byMonth[pushMonth] || {
        new: { pushCount: 0, members: new Set() },
        existing: { pushCount: 0, members: new Set() },
      };
      byMonth[pushMonth][cohort].pushCount += 1;
      byMonth[pushMonth][cohort].members.add(push.memberId);
    }

    const result = {};
    for (const month of Object.keys(byMonth).sort()) {
      const b = byMonth[month];
      result[month] = {
        newPushCount: b.new.pushCount,
        newUniqueCount: b.new.members.size,
        newAverage: b.new.members.size ? b.new.pushCount / b.new.members.size : 0,
        existingPushCount: b.existing.pushCount,
        existingUniqueCount: b.existing.members.size,
        existingAverage: b.existing.members.size ? b.existing.pushCount / b.existing.members.size : 0,
      };
    }

    return { byMonth: result };
  }

  // 会員ごとに「スタンプ押下が一番多い店舗」を実利用店舗とみなし、初回登録店舗と比較する。
  // スタンプ押下の記録が無い会員(実利用店舗が分からない)は対象外。
  // 会員一覧に無い会員ID(=アクセスログとの突合に失敗した押下)はunmatchedCountに計上する
  // (突合率を画面に出す用。calcMonthlyPushByCohortと同じ注意が要る)。
  function calcRegisteredVsActualStore(stampPushes, members) {
    const pushCountByMember = {};
    for (const push of stampPushes) {
      if (!push.storeKey) continue;
      pushCountByMember[push.memberId] = pushCountByMember[push.memberId] || {};
      pushCountByMember[push.memberId][push.storeKey] = (pushCountByMember[push.memberId][push.storeKey] || 0) + 1;
    }

    const result = { byRegisteredStore: {}, members: {} };
    let matchedCount = 0;
    let unmatchedCount = 0;

    for (const [memberId, counts] of Object.entries(pushCountByMember)) {
      const member = members[memberId];
      if (!member || !member.storeKey) { unmatchedCount += 1; continue; }
      matchedCount += 1;

      // 最多店舗を実利用店舗とする。同数のときは店舗キーの昇順で決定的に選ぶ。
      let actualStoreKey = null;
      let maxCount = -1;
      for (const [storeKey, count] of Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))) {
        if (count > maxCount) { maxCount = count; actualStoreKey = storeKey; }
      }

      const isSame = actualStoreKey === member.storeKey;
      result.members[memberId] = {
        lineId: member.lineId,
        registeredStoreKey: member.storeKey,
        actualStoreKey,
        actualPushCount: maxCount,
        isSame,
      };

      const bucket = result.byRegisteredStore[member.storeKey] = result.byRegisteredStore[member.storeKey] || { total: 0, same: 0, different: 0 };
      bucket.total += 1;
      if (isSame) bucket.same += 1; else bucket.different += 1;
    }

    return { ...result, matchedCount, unmatchedCount };
  }

  // 店舗ごとに「会員あたりの平均来店回数」「複数回来店率(2回以上来た会員の割合)」を数える。
  // 会員の生涯の来店パターンを見る指標のため、期間や店舗の絞り込みは行わず常に全期間で計算する想定
  // (短い期間で切ると大半が1回になり、数字が意味を持たなくなるため)。
  // 複数店舗を利用する会員は、利用した店舗それぞれでカウントされる(店舗単位の指標のため)。
  function calcStoreRepeatStats(stampPushes) {
    const byStore = {};
    for (const p of stampPushes) {
      if (!p.memberId || !p.storeKey) continue;
      const byMember = byStore[p.storeKey] = byStore[p.storeKey] || {};
      byMember[p.memberId] = (byMember[p.memberId] || 0) + 1;
    }

    const result = {};
    for (const [storeKey, byMember] of Object.entries(byStore)) {
      const counts = Object.values(byMember);
      const memberCount = counts.length;
      const totalPushCount = counts.reduce((a, b) => a + b, 0);
      const repeatMemberCount = counts.filter(c => c >= 2).length;
      result[storeKey] = {
        memberCount,
        totalPushCount,
        avgPushPerMember: memberCount ? totalPushCount / memberCount : 0,
        repeatRate: memberCount ? repeatMemberCount / memberCount : 0,
      };
    }
    return result;
  }

  // 生涯のスタンプ押下数が多い会員の上位ランキング(「離脱予兆」の対になる、前向きな切り口のカード用)。
  // 複数店舗・複数スタンプ帳をまたいだ合計で順位付けする(お礼キャンペーン等の対象選定に使う想定のため、
  // 店舗やスタンプ帳単位に分けず「この会員は全体として上得意か」をシンプルに見せる)。
  function rankTopMembers(stampPushes, topN) {
    const byMember = {};
    for (const p of stampPushes) {
      if (!p.memberId) continue;
      const m = byMember[p.memberId] = byMember[p.memberId] || {
        memberId: p.memberId, pushCount: 0, firstPushAt: null, lastPushAt: null, storeKeys: new Set(),
      };
      m.pushCount += 1;
      const at = new Date(p.at);
      if (!m.firstPushAt || at < m.firstPushAt) m.firstPushAt = at;
      if (!m.lastPushAt || at > m.lastPushAt) m.lastPushAt = at;
      if (p.storeKey) m.storeKeys.add(p.storeKey);
    }

    const list = Object.values(byMember).map(m => ({
      memberId: m.memberId,
      pushCount: m.pushCount,
      firstPushAt: m.firstPushAt,
      lastPushAt: m.lastPushAt,
      storeCount: m.storeKeys.size,
    }));
    list.sort((a, b) => b.pushCount - a.pushCount);
    return topN ? list.slice(0, topN) : list;
  }

  return {
    aggregateAccessLogRows,
    mergeMonthlyAggregates,
    queryCounts,
    calcMonthlyPushByCohort,
    calcRegisteredVsActualStore,
    calcStoreRepeatStats,
    rankTopMembers,
    queryByStore,
    queryByStampPage,
    listBrands,
    listStores,
    listStampPages,
    buildTicketLedger,
    summarizeMemberList,
    mergeMemberSummaries,
    summarizeMemberAttributes,
    calcAgeGroup,
    countRegistrationsByPeriod,
    countRegistrationsByPeriodSplit,
    calcMonthlyActiveRate,
    countRegistrationsByStoreAndMonth,
    findLapsedRegulars,
    calcStampCardProgress,
    calcMemberRankDistribution,
    listStampExpiringSoon,
  };
})();
