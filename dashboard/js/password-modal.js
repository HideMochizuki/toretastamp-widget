window.Dashboard = window.Dashboard || {};

// 暗号化されたCSVを復号するためのパスワード入力モーダル。window.prompt()は入力が平文表示されて
// しまう(マスクされない)ため、<input type="password">を使った簡易モーダルを自前で用意する。
// 呼び出し側は await Dashboard.PasswordModal.ask(message) でPromise<string|null>を受け取る
// (null はキャンセル)。全ページ共通で使うため、スタイルも含めてこのファイル単体で自己完結する。
window.Dashboard.PasswordModal = (function () {
  let overlay = null;
  let messageEl = null;
  let inputEl = null;
  let errorEl = null;
  let okBtn = null;
  let cancelBtn = null;
  let pendingResolve = null;

  function ensureDom() {
    if (overlay) return;

    const style = document.createElement('style');
    style.textContent = `
      .pw-modal-overlay {
        position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5);
        display: flex; align-items: center; justify-content: center; z-index: 1000;
      }
      .pw-modal-box {
        background: #fff; border-radius: 10px; padding: 24px 28px; width: 360px; max-width: 90vw;
        box-shadow: 0 10px 40px rgba(0,0,0,0.25); font-family: inherit;
      }
      .pw-modal-title { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 1rem; color: #1e293b; margin-bottom: 4px; }
      .pw-modal-message { font-size: 0.85rem; color: #475569; margin-bottom: 14px; line-height: 1.5; }
      .pw-modal-input {
        width: 100%; height: 38px; padding: 0 10px; border: 1px solid #cbd5e1; border-radius: 4px;
        box-sizing: border-box; font-size: 0.9rem;
      }
      .pw-modal-error { color: #dc2626; font-size: 0.78rem; margin-top: 8px; min-height: 1em; }
      .pw-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
      .pw-modal-btn {
        height: 36px; padding: 0 18px; border-radius: 4px; border: none; font-size: 0.85rem; font-weight: bold; cursor: pointer;
      }
      .pw-modal-btn.primary { background: var(--primary-color, #8ace36); color: #fff; }
      .pw-modal-btn.secondary { background: #f1f5f9; color: #475569; }
    `;
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.className = 'pw-modal-overlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
      <div class="pw-modal-box">
        <div class="pw-modal-title"><i class="fa fa-lock"></i> パスワードを入力</div>
        <div class="pw-modal-message" id="pw-modal-message"></div>
        <input type="password" class="pw-modal-input" id="pw-modal-input" autocomplete="off">
        <div class="pw-modal-error" id="pw-modal-error"></div>
        <div class="pw-modal-actions">
          <button type="button" class="pw-modal-btn secondary" id="pw-modal-cancel">キャンセル</button>
          <button type="button" class="pw-modal-btn primary" id="pw-modal-ok">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    messageEl = overlay.querySelector('#pw-modal-message');
    inputEl = overlay.querySelector('#pw-modal-input');
    errorEl = overlay.querySelector('#pw-modal-error');
    okBtn = overlay.querySelector('#pw-modal-ok');
    cancelBtn = overlay.querySelector('#pw-modal-cancel');

    const submit = () => {
      if (!pendingResolve) return;
      const resolve = pendingResolve;
      pendingResolve = null;
      overlay.style.display = 'none';
      resolve(inputEl.value);
    };
    const cancel = () => {
      if (!pendingResolve) return;
      const resolve = pendingResolve;
      pendingResolve = null;
      overlay.style.display = 'none';
      resolve(null);
    };

    okBtn.addEventListener('click', submit);
    cancelBtn.addEventListener('click', cancel);
    inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  }

  // message: 入力欄の上に出す説明文(どのファイルのパスワードかなど)。errorMessage: 前回失敗した旨の赤字。
  function ask(message, errorMessage) {
    ensureDom();
    return new Promise(resolve => {
      pendingResolve = resolve;
      messageEl.textContent = message || '';
      errorEl.textContent = errorMessage || '';
      inputEl.value = '';
      overlay.style.display = 'flex';
      setTimeout(() => inputEl.focus(), 0);
    });
  }

  return { ask };
})();
