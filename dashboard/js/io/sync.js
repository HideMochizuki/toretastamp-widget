window.Dashboard = window.Dashboard || {};

// クライアント(ブランド)サブフォルダ1つぶんの同期処理。
// ・アクセスログは「ファイル名の年月」をキーに、サイズ/更新日時が変わっていなければ再集計をスキップする
// ・会員一覧は常に最新スナップショットとして扱う(Q3)
// ・集計結果は各クライアントフォルダ内の _cache/summary.json に書き戻す(Q7)
window.Dashboard.Sync = (function () {
  const FS = window.Dashboard.FS;
  const U = window.Dashboard.Util;
  const Csv = window.Dashboard.Csv;
  const Agg = window.Dashboard.Aggregate;

  const CACHE_DIR = '_cache';
  const CACHE_FILE = 'summary.json';
  const CONFIG_DIR = '_config';
  const CONFIG_FILE = 'tickets.json';
  const BUSINESS_HOURS_FILE = 'business-hours.json';
  // aggregate.js の出力構造を変えたときはこれを上げる。古いバージョンのキャッシュは
  // 中身を信用せず、空として扱って全ファイルを再集計する(でないと新旧の構造が混ざって壊れる)。
  // ※ util.js の日時パース処理(ハイフン区切り対応)の不具合修正に伴い、修正前に空集計のまま
  //   キャッシュされてしまったクライアントがいるため、ここも上げて強制的に再集計させる。
  const CACHE_SCHEMA_VERSION = 11;

  function isAccessLogFile(name) {
    return /^すべてのログ/.test(name) && /\.csv$/i.test(name);
  }

  // 会員数が多いクライアントは、会員一覧を複数ファイルに分けてDLすることがある
  // (例: 会員一覧.csv, 会員一覧2.csv, ...)。「会員一覧」で始まるCSVは全部対象にする。
  function isMemberListFile(name) {
    return /^会員一覧/.test(name) && /\.csv$/i.test(name);
  }

  function isFresh(cacheEntry, file) {
    return !!cacheEntry && cacheEntry.size === file.size && cacheEntry.lastModified === file.lastModified;
  }

  async function loadCache(clientDirHandle) {
    const cacheDir = await FS.getOrCreateSubdirectory(clientDirHandle, CACHE_DIR);
    const cache = await FS.readJsonFile(cacheDir, CACHE_FILE);
    if (!cache || cache.schemaVersion !== CACHE_SCHEMA_VERSION) {
      return { schemaVersion: CACHE_SCHEMA_VERSION, accessLogFiles: {}, memberListFiles: {} };
    }
    return cache;
  }

  async function saveCache(clientDirHandle, cache) {
    const cacheDir = await FS.getOrCreateSubdirectory(clientDirHandle, CACHE_DIR);
    cache.schemaVersion = CACHE_SCHEMA_VERSION;
    cache.updatedAt = new Date().toISOString();
    await FS.writeJsonFile(cacheDir, CACHE_FILE, cache);
  }

  async function loadTicketConfig(clientDirHandle) {
    const configDir = await FS.getOrCreateSubdirectory(clientDirHandle, CONFIG_DIR);
    return (await FS.readJsonFile(configDir, CONFIG_FILE)) || {};
  }

  async function saveTicketConfig(clientDirHandle, config) {
    const configDir = await FS.getOrCreateSubdirectory(clientDirHandle, CONFIG_DIR);
    await FS.writeJsonFile(configDir, CONFIG_FILE, config);
  }

  async function loadBusinessHoursConfig(clientDirHandle) {
    const configDir = await FS.getOrCreateSubdirectory(clientDirHandle, CONFIG_DIR);
    return (await FS.readJsonFile(configDir, BUSINESS_HOURS_FILE)) || {};
  }

  async function saveBusinessHoursConfig(clientDirHandle, config) {
    const configDir = await FS.getOrCreateSubdirectory(clientDirHandle, CONFIG_DIR);
    await FS.writeJsonFile(configDir, BUSINESS_HOURS_FILE, config);
  }

  // JSONを経由すると Date が文字列に化けるので、min/maxだけDateへ戻す。
  // (Date -> new Date(date) も、既にDateのインスタンスを渡すケースとして問題なく動く)
  function reviveAggregate(agg) {
    return {
      ...agg,
      dateRange: {
        min: agg.dateRange.min ? new Date(agg.dateRange.min) : null,
        max: agg.dateRange.max ? new Date(agg.dateRange.max) : null,
      },
    };
  }

  async function syncClientFolder(clientDirHandle) {
    const warnings = [];
    const entries = await FS.listEntries(clientDirHandle);
    const cache = await loadCache(clientDirHandle);
    let cacheChanged = false;

    const accessLogEntries = entries.filter(e => e.kind === 'file' && isAccessLogFile(e.name));
    const memberListEntries = entries.filter(e => e.kind === 'file' && isMemberListFile(e.name));

    // フォルダから削除・リネームされたファイルのキャッシュを残したままにすると、
    // 実体の無いファイルの集計がいつまでも合算され続けてしまう(二重集計の原因にもなる)ので、
    // 今フォルダに実在するファイルに対応するキーだけ残す。
    const currentKeys = new Set(accessLogEntries.map(e => U.parseMonthFromFileName(e.name)).filter(Boolean));
    for (const key of Object.keys(cache.accessLogFiles)) {
      if (!currentKeys.has(key)) {
        delete cache.accessLogFiles[key];
        cacheChanged = true;
      }
    }

    // 会員一覧も同様に、フォルダに実在するファイル名だけ残す(分割ファイルを減らした/
    // リネームしたときに、消えたファイルの会員が残り続けないようにする)。
    const currentMemberListNames = new Set(memberListEntries.map(e => e.name));
    for (const name of Object.keys(cache.memberListFiles)) {
      if (!currentMemberListNames.has(name)) {
        delete cache.memberListFiles[name];
        cacheChanged = true;
      }
    }

    for (const entry of accessLogEntries) {
      const monthKey = U.parseMonthFromFileName(entry.name);
      if (!monthKey) {
        warnings.push(`「${entry.name}」の年月をファイル名から判定できません。管理画面のデフォルト名のまま置いてください。`);
        continue;
      }

      const file = await entry.handle.getFile();
      if (isFresh(cache.accessLogFiles[monthKey], file)) continue;

      const { text } = await FS.readFileText(entry.handle, 'shift_jis');
      const rows = Csv.toObjects(text);
      const aggregate = Agg.aggregateAccessLogRows(rows);

      // 'all'(全期間を1ファイルでDLしたケース)は複数月にまたがるのが前提なので、
      // 月単位ファイル向けのこの整合性チェックは対象外にする。
      if (aggregate.dateRange.min && monthKey !== 'all') {
        const contentMin = U.toMonthKey(aggregate.dateRange.min);
        const contentMax = U.toMonthKey(aggregate.dateRange.max);
        if (contentMin !== monthKey || contentMax !== monthKey) {
          warnings.push(`「${entry.name}」はファイル名が${monthKey}ですが、中身の日時は${contentMin}〜${contentMax}です。月をまたいだ範囲でDLされていないか確認してください。`);
        }
      }

      cache.accessLogFiles[monthKey] = {
        fileName: entry.name,
        size: file.size,
        lastModified: file.lastModified,
        aggregate,
      };
      cacheChanged = true;
    }

    if (memberListEntries.length) {
      for (const entry of memberListEntries) {
        const file = await entry.handle.getFile();
        if (isFresh(cache.memberListFiles[entry.name], file)) continue;

        const { text } = await FS.readFileText(entry.handle, 'shift_jis');
        const rows = Csv.toObjects(text);
        cache.memberListFiles[entry.name] = {
          size: file.size,
          lastModified: file.lastModified,
          summary: Agg.summarizeMemberList(rows),
        };
        cacheChanged = true;
      }
    } else {
      warnings.push('会員一覧.csv（「会員一覧」で始まるCSV）が見つかりませんでした。');
    }

    // 'all'(全期間1ファイル)と月単位ファイルが混在していると、期間が重なって二重集計になる
    // おそれがあるため、両方検出した場合は警告する(どちらか一方の運用に統一してもらう)。
    const accessLogKeys = Object.keys(cache.accessLogFiles);
    if (accessLogKeys.includes('all') && accessLogKeys.some(k => k !== 'all')) {
      warnings.push('「すべてのログ.csv」(全期間)と月単位のログファイルが両方置かれています。期間が重なっていると件数が二重に集計されるおそれがあるため、どちらか一方の運用に統一してください。');
    }

    if (cacheChanged) await saveCache(clientDirHandle, cache);

    const monthlyAggregates = Object.values(cache.accessLogFiles).map(e => reviveAggregate(e.aggregate));
    const merged = Agg.mergeMonthlyAggregates(monthlyAggregates);
    const ticketLedger = Agg.buildTicketLedger(merged.ticketIssued, merged.ticketUsed);
    const ticketConfig = await loadTicketConfig(clientDirHandle);
    const businessHoursConfig = await loadBusinessHoursConfig(clientDirHandle);

    const memberSummaries = Object.values(cache.memberListFiles).map(e => e.summary);
    const memberSummary = memberSummaries.length ? Agg.mergeMemberSummaries(memberSummaries) : null;

    return {
      name: clientDirHandle.name,
      dirHandle: clientDirHandle,
      warnings,
      months: Object.keys(cache.accessLogFiles).sort(),
      merged,
      ticketLedger,
      ticketConfig,
      businessHoursConfig,
      memberSummary,
    };
  }

  async function syncAllClients(rootHandle) {
    const entries = await FS.listEntries(rootHandle);
    const clientFolders = entries.filter(e => e.kind === 'directory' && !e.name.startsWith('_'));
    const results = [];
    for (const folder of clientFolders) {
      results.push(await syncClientFolder(folder.handle));
    }
    return results;
  }

  return {
    syncAllClients, syncClientFolder,
    loadTicketConfig, saveTicketConfig,
    loadBusinessHoursConfig, saveBusinessHoursConfig,
  };
})();
