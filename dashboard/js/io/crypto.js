window.Dashboard = window.Dashboard || {};

// CSVファイルをパスワードで暗号化/復号する(ブラウザ標準のWeb Crypto APIのみ使用、外部ライブラリ不使用)。
// コンテナ形式(バイナリ): [マジック6byte "TSENC1"][salt 16byte][iv 12byte][AES-GCM暗号文(認証タグ込み)]
// パスワードはPBKDF2(SHA-256)で鍵に変換する。パスワードはどこにも保存せず、都度その場で入力してもらう想定。
window.Dashboard.Crypto = (function () {
  const MAGIC = 'TSENC1';
  const SALT_LEN = 16;
  const IV_LEN = 12;
  const PBKDF2_ITERATIONS = 210000;

  function strToBytes(s) { return new TextEncoder().encode(s); }
  function bytesToStr(b) { return new TextDecoder().decode(b); }

  async function deriveKey(password, salt) {
    const keyMaterial = await crypto.subtle.importKey('raw', strToBytes(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encryptText(plainText, password) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
    const key = await deriveKey(password, salt);
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, strToBytes(plainText));

    const magicBytes = strToBytes(MAGIC);
    const out = new Uint8Array(magicBytes.length + salt.length + iv.length + ciphertext.byteLength);
    out.set(magicBytes, 0);
    out.set(salt, magicBytes.length);
    out.set(iv, magicBytes.length + salt.length);
    out.set(new Uint8Array(ciphertext), magicBytes.length + salt.length + iv.length);
    return out.buffer;
  }

  function isEncryptedContainer(buffer) {
    if (!buffer || buffer.byteLength < MAGIC.length) return false;
    return bytesToStr(new Uint8Array(buffer, 0, MAGIC.length)) === MAGIC;
  }

  // 復号に失敗したら(パスワード間違い・ファイル破損)例外を投げる
  // (AES-GCMの認証タグ検証により、誤ったパスワードでは自動的に弾かれる)。
  async function decryptBuffer(buffer, password) {
    const magicLen = MAGIC.length;
    const salt = new Uint8Array(buffer, magicLen, SALT_LEN);
    const iv = new Uint8Array(buffer, magicLen + SALT_LEN, IV_LEN);
    const ciphertext = new Uint8Array(buffer, magicLen + SALT_LEN + IV_LEN);
    const key = await deriveKey(password, salt);
    const plainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    return bytesToStr(new Uint8Array(plainBuffer));
  }

  return { encryptText, decryptBuffer, isEncryptedContainer, MAGIC };
})();
