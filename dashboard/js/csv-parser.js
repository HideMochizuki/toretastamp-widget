window.Dashboard = window.Dashboard || {};

window.Dashboard.Csv = (function () {
  function parseRows(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    const normalized = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;

    for (let i = 0; i < normalized.length; i++) {
      const c = normalized[i];
      if (inQuotes) {
        if (c === '"') {
          if (normalized[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else {
          field += c;
        }
        continue;
      }
      if (c === '"') { inQuotes = true; continue; }
      if (c === ',') { row.push(field); field = ''; continue; }
      if (c === '\r') continue;
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; continue; }
      field += c;
    }
    if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }

    return rows.filter(r => !(r.length === 1 && r[0] === ''));
  }

  function toObjects(text) {
    const rows = parseRows(text);
    const header = rows[0] || [];
    return rows.slice(1).map(r => {
      const obj = {};
      header.forEach((h, idx) => { obj[h] = r[idx] !== undefined ? r[idx] : ''; });
      return obj;
    });
  }

  return { parseRows, toObjects };
})();
