window.Dashboard = window.Dashboard || {};

// File System Access API のラッパー。フォルダへのアクセス許可はIndexedDBに保存した
// ハンドルを使って次回以降スキップできるが、ブラウザ再起動後などは許可の再確認(ensurePermission)が要る。
window.Dashboard.FS = (function () {
  const DB_NAME = 'toretastamp-dashboard';
  const STORE_NAME = 'handles';
  const ROOT_KEY = 'rootFolderHandle';

  function openDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbGet(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const req = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbSet(key, value) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // requestPermissionはユーザー操作(クリック)の文脈でないとブラウザに拒否されることがあるため、
  // 「無言で確認するだけ(queryPermission)」と「ユーザー操作ありきで許可を求める(requestPermission)」を
  // 分けている。ページ起動時の自動復元はqueryPermissionだけで済ませ、ダメなら1クリックだけ挟む。
  async function hasPermission(handle, mode) {
    return (await handle.queryPermission({ mode: mode || 'readwrite' })) === 'granted';
  }

  async function requestPermissionForHandle(handle, mode) {
    return (await handle.requestPermission({ mode: mode || 'readwrite' })) === 'granted';
  }

  async function ensurePermission(handle) {
    if (await hasPermission(handle)) return true;
    return requestPermissionForHandle(handle);
  }

  async function pickRootFolder() {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await idbSet(ROOT_KEY, handle);
    return handle;
  }

  // IndexedDBに保存済みのハンドルをそのまま返す(権限チェックはしない。呼び出し側でhasPermission等を使う)。
  async function getSavedHandle() {
    return (await idbGet(ROOT_KEY)) || null;
  }

  async function loadSavedRootFolder() {
    const handle = await idbGet(ROOT_KEY);
    if (!handle) return null;
    return (await ensurePermission(handle)) ? handle : null;
  }

  // macOSは保存元のアプリ(Excel/Numbers/Finderなど)によって、同じ見た目の日本語ファイル名でも
  // 内部のUnicode正規化形式(NFC/NFD)が変わることがある。ここで一度NFCに揃えておかないと、
  // 見た目が同じ文字列同士のはずの比較(isAccessLogFileなど)が一致しなくなる。
  async function listEntries(dirHandle) {
    const entries = [];
    for await (const [name, handle] of dirHandle.entries()) {
      entries.push({ name: name.normalize('NFC'), handle, kind: handle.kind });
    }
    return entries;
  }

  function getOrCreateSubdirectory(dirHandle, name) {
    return dirHandle.getDirectoryHandle(name, { create: true });
  }

  async function readFileText(fileHandle, encoding) {
    const file = await fileHandle.getFile();
    const buffer = await file.arrayBuffer();
    const text = new TextDecoder(encoding || 'shift_jis').decode(buffer);
    return { text, size: file.size, lastModified: file.lastModified };
  }

  async function readJsonFile(dirHandle, name) {
    try {
      const fileHandle = await dirHandle.getFileHandle(name);
      const file = await fileHandle.getFile();
      return JSON.parse(await file.text());
    } catch (e) {
      return null;
    }
  }

  async function writeJsonFile(dirHandle, name, obj) {
    const fileHandle = await dirHandle.getFileHandle(name, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(obj, null, 2));
    await writable.close();
  }

  return {
    isSupported: () => 'showDirectoryPicker' in window,
    pickRootFolder,
    getSavedHandle,
    hasPermission,
    requestPermissionForHandle,
    loadSavedRootFolder,
    ensurePermission,
    listEntries,
    getOrCreateSubdirectory,
    readFileText,
    readJsonFile,
    writeJsonFile,
  };
})();
