window.Dashboard = window.Dashboard || {};

// 軽量な自前SVGチャート(外部ライブラリ不使用)。線グラフ・棒グラフ・複数系列の折れ線の3種類。
// 単一系列(renderLineChart/renderBarChart)は凡例を出さない(タイトルが系列名を兼ねる)。
// 複数系列(renderMultiLineChart)は凡例必須。どちらもホバーで値を出す。
window.Dashboard.Charts = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  const COLOR = '#8ace36';
  const COLOR_DARK = '#5a9c1e';
  const GRID = '#e1e0d9';
  const AXIS = '#c3c2b7';
  const TEXT_MUTED = '#898781';
  const TEXT_SECONDARY = '#52514e';

  function el(tag, attrs) {
    const node = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) node.setAttribute(k, v);
    return node;
  }

  function niceMax(max) {
    if (max <= 0) return 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    const normalized = max / magnitude;
    let niceNormalized;
    if (normalized <= 1) niceNormalized = 1;
    else if (normalized <= 2) niceNormalized = 2;
    else if (normalized <= 5) niceNormalized = 5;
    else niceNormalized = 10;
    return niceNormalized * magnitude;
  }

  function formatNum(n) {
    return n.toLocaleString();
  }

  function ensureTooltip(container) {
    let tip = container.querySelector('.chart-tooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'chart-tooltip';
      tip.style.cssText = 'position:absolute; display:none; pointer-events:none; background:#1e293b; color:#fff; font-size:0.75rem; padding:6px 10px; border-radius:4px; white-space:nowrap; z-index:10;';
      container.style.position = 'relative';
      container.appendChild(tip);
    }
    return tip;
  }

  // points: [{ label: string(表示用), value: number }] を日/月/年いずれの単位でも渡せる
  function renderLineChart(container, points, opts) {
    opts = opts || {};
    container.innerHTML = '';
    if (!points.length) { container.innerHTML = '<div class="chart-empty">データがありません</div>'; return; }

    const width = 800, height = 260;
    const padL = 48, padR = 16, padT = 16, padB = 28;
    const plotW = width - padL - padR, plotH = height - padT - padB;

    const maxVal = niceMax(Math.max(...points.map(p => p.value), 1));
    const xStep = points.length > 1 ? plotW / (points.length - 1) : 0;
    const xAt = i => padL + xStep * i;
    const yAt = v => padT + plotH - (v / maxVal) * plotH;

    const svg = el('svg', { viewBox: `0 0 ${width} ${height}`, style: 'display:block; width:100%; height:auto;' });

    const gridCount = 4;
    for (let g = 0; g <= gridCount; g++) {
      const v = (maxVal / gridCount) * g;
      const y = yAt(v);
      svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: y, y2: y, stroke: GRID, 'stroke-width': 1 }));
      const label = el('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: TEXT_MUTED });
      label.textContent = formatNum(Math.round(v));
      svg.appendChild(label);
    }
    svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: padT + plotH, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1 }));

    const tickEvery = Math.max(1, Math.ceil(points.length / 7));
    points.forEach((p, i) => {
      if (i % tickEvery !== 0 && i !== points.length - 1) return;
      const label = el('text', { x: xAt(i), y: height - 8, 'text-anchor': 'middle', 'font-size': 11, fill: TEXT_MUTED });
      label.textContent = p.label;
      svg.appendChild(label);
    });

    const areaPath = ['M', xAt(0), yAt(points[0].value)];
    const linePath = ['M', xAt(0), yAt(points[0].value)];
    points.forEach((p, i) => {
      if (i === 0) return;
      linePath.push('L', xAt(i), yAt(p.value));
      areaPath.push('L', xAt(i), yAt(p.value));
    });
    areaPath.push('L', xAt(points.length - 1), padT + plotH, 'L', xAt(0), padT + plotH, 'Z');

    svg.appendChild(el('path', { d: areaPath.join(' '), fill: COLOR, 'fill-opacity': 0.1, stroke: 'none' }));
    svg.appendChild(el('path', { d: linePath.join(' '), fill: 'none', stroke: COLOR_DARK, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

    const lastIdx = points.length - 1;
    svg.appendChild(el('circle', { cx: xAt(lastIdx), cy: yAt(points[lastIdx].value), r: 5, fill: COLOR_DARK, stroke: '#fff', 'stroke-width': 2 }));

    const crosshair = el('line', { x1: 0, x2: 0, y1: padT, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1, style: 'display:none;' });
    svg.appendChild(crosshair);
    const hoverDot = el('circle', { r: 5, fill: COLOR_DARK, stroke: '#fff', 'stroke-width': 2, style: 'display:none;' });
    svg.appendChild(hoverDot);

    const hitRect = el('rect', { x: padL, y: padT, width: plotW, height: plotH, fill: 'transparent', style: 'cursor:crosshair;' });
    svg.appendChild(hitRect);

    container.appendChild(svg);
    const tip = ensureTooltip(container);

    function onMove(evt) {
      const rect = svg.getBoundingClientRect();
      const scaleX = width / rect.width;
      const localX = (evt.clientX - rect.left) * scaleX;
      let idx = xStep > 0 ? Math.round((localX - padL) / xStep) : 0;
      idx = Math.max(0, Math.min(points.length - 1, idx));
      const p = points[idx];
      const px = xAt(idx), py = yAt(p.value);
      crosshair.setAttribute('x1', px); crosshair.setAttribute('x2', px);
      crosshair.style.display = '';
      hoverDot.setAttribute('cx', px); hoverDot.setAttribute('cy', py);
      hoverDot.style.display = '';
      tip.textContent = `${p.label}: ${formatNum(p.value)}`;
      tip.style.display = '';
      tip.style.left = Math.min(rect.width - 120, Math.max(0, (px / width) * rect.width + 8)) + 'px';
      tip.style.top = Math.max(0, (py / height) * rect.height - 30) + 'px';
    }
    function onLeave() {
      crosshair.style.display = 'none';
      hoverDot.style.display = 'none';
      tip.style.display = 'none';
    }
    hitRect.addEventListener('pointermove', onMove);
    hitRect.addEventListener('pointerleave', onLeave);
  }

  function renderBarChart(container, points) {
    container.innerHTML = '';
    if (!points.length) { container.innerHTML = '<div class="chart-empty">データがありません</div>'; return; }

    const width = 800, height = 260;
    const padL = 48, padR = 16, padT = 16, padB = 36;
    const plotW = width - padL - padR, plotH = height - padT - padB;

    const maxVal = niceMax(Math.max(...points.map(p => p.value), 1));
    const yAt = v => padT + plotH - (v / maxVal) * plotH;

    const slot = plotW / points.length;
    const barW = Math.min(24, slot * 0.6);

    const svg = el('svg', { viewBox: `0 0 ${width} ${height}`, style: 'display:block; width:100%; height:auto;' });

    const gridCount = 4;
    for (let g = 0; g <= gridCount; g++) {
      const v = (maxVal / gridCount) * g;
      const y = yAt(v);
      svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: y, y2: y, stroke: GRID, 'stroke-width': 1 }));
      const label = el('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: TEXT_MUTED });
      label.textContent = formatNum(Math.round(v));
      svg.appendChild(label);
    }
    svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: padT + plotH, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1 }));

    const tickEvery = Math.max(1, Math.ceil(points.length / 10));
    const tip = ensureTooltip(container);

    points.forEach((p, i) => {
      const cx = padL + slot * i + slot / 2;
      const barH = (p.value / maxVal) * plotH;
      const y = padT + plotH - barH;
      const rect = el('rect', {
        x: cx - barW / 2, y, width: barW, height: Math.max(barH, 1),
        rx: 3, fill: COLOR_DARK, style: 'cursor:pointer;',
      });
      const hit = el('rect', { x: cx - slot / 2, y: padT, width: slot, height: plotH, fill: 'transparent' });

      function show(evt) {
        rect.setAttribute('fill', COLOR);
        const rectBox = svg.getBoundingClientRect();
        tip.textContent = `${p.label}: ${formatNum(p.value)}`;
        tip.style.display = '';
        tip.style.left = Math.min(rectBox.width - 120, Math.max(0, (cx / width) * rectBox.width - 40)) + 'px';
        tip.style.top = Math.max(0, (y / height) * rectBox.height - 30) + 'px';
      }
      function hide() {
        rect.setAttribute('fill', COLOR_DARK);
        tip.style.display = 'none';
      }
      hit.addEventListener('pointerenter', show);
      hit.addEventListener('pointermove', show);
      hit.addEventListener('pointerleave', hide);

      svg.appendChild(rect);
      svg.appendChild(hit);

      if (i % tickEvery === 0 || i === points.length - 1) {
        const label = el('text', { x: cx, y: height - 14, 'text-anchor': 'middle', 'font-size': 11, fill: TEXT_MUTED });
        label.textContent = p.label;
        svg.appendChild(label);
      }
    });

    container.appendChild(svg);
  }

  // 複数系列の折れ線(例: チケットの発行/利用/有効/失効)。凡例と、全系列の値を1つにまとめた
  // ツールチップを出す(2系列以上では凡例が必須、かつ1つのツールチップで全系列の値を見せる、という
  // データビジュアライゼーションの基本に沿っている)。系列ごとにX軸のlabelは揃っている前提。
  function renderMultiLineChart(container, series) {
    container.innerHTML = '';
    const pointCount = series[0] ? series[0].points.length : 0;
    if (!pointCount) { container.innerHTML = '<div class="chart-empty">データがありません</div>'; return; }

    const width = 800, height = 300;
    const padL = 48, padR = 32, padT = 16, padB = 56;
    const plotW = width - padL - padR, plotH = height - padT - padB;
    const legendY = height - 16;

    const maxVal = niceMax(Math.max(1, ...series.flatMap(s => s.points.map(p => p.value))));
    const xStep = pointCount > 1 ? plotW / (pointCount - 1) : 0;
    const xAt = i => padL + xStep * i;
    const yAt = v => padT + plotH - (v / maxVal) * plotH;
    const labels = series[0].points.map(p => p.label);

    const svg = el('svg', { viewBox: `0 0 ${width} ${height}`, style: 'display:block; width:100%; height:auto;' });

    const gridCount = 4;
    for (let g = 0; g <= gridCount; g++) {
      const v = (maxVal / gridCount) * g;
      const y = yAt(v);
      svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: y, y2: y, stroke: GRID, 'stroke-width': 1 }));
      const label = el('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: TEXT_MUTED });
      label.textContent = formatNum(Math.round(v));
      svg.appendChild(label);
    }
    svg.appendChild(el('line', { x1: padL, x2: width - padR, y1: padT + plotH, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1 }));

    const tickEvery = Math.max(1, Math.ceil(pointCount / 7));
    labels.forEach((label, i) => {
      if (i % tickEvery !== 0 && i !== pointCount - 1) return;
      const t = el('text', { x: xAt(i), y: padT + plotH + 16, 'text-anchor': 'middle', 'font-size': 11, fill: TEXT_MUTED });
      t.textContent = label;
      svg.appendChild(t);
    });

    series.forEach(s => {
      const linePath = ['M', xAt(0), yAt(s.points[0].value)];
      s.points.forEach((p, i) => { if (i > 0) linePath.push('L', xAt(i), yAt(p.value)); });
      svg.appendChild(el('path', { d: linePath.join(' '), fill: 'none', stroke: s.color, 'stroke-width': s.width || 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      const lastIdx = s.points.length - 1;
      svg.appendChild(el('circle', { cx: xAt(lastIdx), cy: yAt(s.points[lastIdx].value), r: 4, fill: s.color, stroke: '#fff', 'stroke-width': 2 }));
    });

    // 凡例: 塗りつぶしの箱ではなく線で系列を示す(折れ線なので、凡例も線の見た目に揃える)
    const legendItemWidth = width / series.length;
    series.forEach((s, i) => {
      const lx = i * legendItemWidth + 8;
      svg.appendChild(el('line', { x1: lx, x2: lx + 16, y1: legendY, y2: legendY, stroke: s.color, 'stroke-width': 3 }));
      const t = el('text', { x: lx + 22, y: legendY + 4, 'font-size': 11, fill: TEXT_SECONDARY });
      t.textContent = s.label;
      svg.appendChild(t);
    });

    const crosshair = el('line', { x1: 0, x2: 0, y1: padT, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1, style: 'display:none;' });
    svg.appendChild(crosshair);
    const hitRect = el('rect', { x: padL, y: padT, width: plotW, height: plotH, fill: 'transparent', style: 'cursor:crosshair;' });
    svg.appendChild(hitRect);
    container.appendChild(svg);
    const tip = ensureTooltip(container);

    function onMove(evt) {
      const rect = svg.getBoundingClientRect();
      const scaleX = width / rect.width;
      const localX = (evt.clientX - rect.left) * scaleX;
      let idx = xStep > 0 ? Math.round((localX - padL) / xStep) : 0;
      idx = Math.max(0, Math.min(pointCount - 1, idx));
      const px = xAt(idx);
      crosshair.setAttribute('x1', px); crosshair.setAttribute('x2', px);
      crosshair.style.display = '';

      tip.textContent = '';
      const dateRow = document.createElement('div');
      dateRow.style.fontWeight = 'bold';
      dateRow.textContent = labels[idx];
      tip.appendChild(dateRow);
      series.forEach(s => {
        const row = document.createElement('div');
        row.textContent = `${s.label}: ${formatNum(s.points[idx].value)}`;
        tip.appendChild(row);
      });
      tip.style.display = '';
      tip.style.left = Math.min(container.clientWidth - 140, Math.max(0, (px / width) * rect.width + 8)) + 'px';
      tip.style.top = '4px';
    }
    function onLeave() {
      crosshair.style.display = 'none';
      tip.style.display = 'none';
    }
    hitRect.addEventListener('pointermove', onMove);
    hitRect.addEventListener('pointerleave', onLeave);
  }

  function renderHBarChart(container, points) {
    container.innerHTML = '';
    if (!points.length) { container.innerHTML = '<div class="chart-empty">データがありません</div>'; return; }

    const width = 800;
    const barHeight = 26, gap = 14;
    const padL = 90, padR = 56, padT = 8, padB = 8;
    const plotH = points.length * barHeight + (points.length - 1) * gap;
    const height = plotH + padT + padB;
    const plotW = width - padL - padR;

    const maxVal = niceMax(Math.max(...points.map(p => p.value), 1));
    const xAt = v => padL + (v / maxVal) * plotW;

    const svg = el('svg', { viewBox: `0 0 ${width} ${height}`, style: 'display:block; width:100%; height:auto;' });

    const gridCount = 4;
    for (let g = 0; g <= gridCount; g++) {
      const x = xAt((maxVal / gridCount) * g);
      svg.appendChild(el('line', { x1: x, x2: x, y1: padT, y2: padT + plotH, stroke: GRID, 'stroke-width': 1 }));
    }
    svg.appendChild(el('line', { x1: padL, x2: padL, y1: padT, y2: padT + plotH, stroke: AXIS, 'stroke-width': 1 }));

    const tip = ensureTooltip(container);

    points.forEach((p, i) => {
      const y = padT + i * (barHeight + gap);
      const barW = (p.value / maxVal) * plotW;
      const rect = el('rect', { x: padL, y, width: Math.max(barW, 1), height: barHeight, rx: 3, fill: COLOR_DARK, style: 'cursor:pointer;' });

      const label = el('text', { x: padL - 8, y: y + barHeight / 2 + 4, 'text-anchor': 'end', 'font-size': 11, fill: TEXT_SECONDARY });
      label.textContent = p.label;

      const valueLabel = el('text', { x: padL + barW + 8, y: y + barHeight / 2 + 4, 'font-size': 11, fill: TEXT_MUTED });
      valueLabel.textContent = formatNum(p.value);

      const hit = el('rect', { x: 0, y, width, height: barHeight, fill: 'transparent', style: 'cursor:pointer;' });
      function show() {
        rect.setAttribute('fill', COLOR);
        const rectBox = svg.getBoundingClientRect();
        tip.textContent = `${p.label}: ${formatNum(p.value)}`;
        tip.style.display = '';
        tip.style.left = Math.min(rectBox.width - 120, Math.max(0, (padL / width) * rectBox.width)) + 'px';
        tip.style.top = Math.max(0, (y / height) * rectBox.height - 26) + 'px';
      }
      function hide() { rect.setAttribute('fill', COLOR_DARK); tip.style.display = 'none'; }
      hit.addEventListener('pointerenter', show);
      hit.addEventListener('pointermove', show);
      hit.addEventListener('pointerleave', hide);

      svg.appendChild(rect);
      svg.appendChild(label);
      svg.appendChild(valueLabel);
      svg.appendChild(hit);
    });

    container.appendChild(svg);
  }

  // カテゴリの出現順(=呼び出し側で既に決めたソート順)に沿って固定の配色を割り当てる。
  // 性別など、クライアントによって表記ゆれがある項目でも、同じ並びなら同じ色になる。
  const PIE_COLORS = ['#8ace36', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#94a3b8'];

  function renderPieChart(container, points) {
    container.innerHTML = '';
    if (!points.length) { container.innerHTML = '<div class="chart-empty">データがありません</div>'; return; }

    const total = points.reduce((s, p) => s + p.value, 0);
    const size = 220, cx = size / 2, cy = size / 2, r = size / 2 - 10;

    const svg = el('svg', { viewBox: `0 0 ${size} ${size}`, style: 'display:block; margin: 0 auto; width:100%; max-width:220px; height:auto;' });
    const tip = ensureTooltip(container);

    let angle = -Math.PI / 2;
    points.forEach((p, i) => {
      const frac = total > 0 ? p.value / total : 0;
      const sweep = frac * Math.PI * 2;
      const endAngle = angle + sweep;
      const color = PIE_COLORS[i % PIE_COLORS.length];

      let shape;
      if (frac >= 0.9999) {
        // 1カテゴリで100%の場合、円弧(A)では描けないため真円として描く
        shape = el('circle', { cx, cy, r, fill: color, style: 'cursor:pointer;' });
      } else {
        const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
        const x2 = cx + r * Math.cos(endAngle), y2 = cy + r * Math.sin(endAngle);
        const largeArc = sweep > Math.PI ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        shape = el('path', { d, fill: color, style: 'cursor:pointer;' });
      }

      function show() {
        shape.setAttribute('opacity', 0.82);
        tip.textContent = `${p.label}: ${formatNum(p.value)}（${(frac * 100).toFixed(1)}%）`;
        tip.style.display = '';
        tip.style.left = '8px';
        tip.style.top = '8px';
      }
      function hide() { shape.setAttribute('opacity', 1); tip.style.display = 'none'; }
      shape.addEventListener('pointerenter', show);
      shape.addEventListener('pointerleave', hide);

      svg.appendChild(shape);
      angle = endAngle;
    });

    container.appendChild(svg);

    // 凡例(カテゴリ2件以上の円グラフは凡例必須)
    const legend = document.createElement('div');
    legend.style.cssText = `display:flex; flex-wrap:wrap; gap:6px 16px; justify-content:center; margin-top:10px; font-size:11px; color:${TEXT_SECONDARY};`;
    points.forEach((p, i) => {
      const frac = total > 0 ? p.value / total : 0;
      const item = document.createElement('div');
      item.style.cssText = 'display:flex; align-items:center; gap:4px;';
      const swatch = document.createElement('span');
      swatch.style.cssText = `display:inline-block; width:10px; height:10px; border-radius:2px; background:${PIE_COLORS[i % PIE_COLORS.length]};`;
      const text = document.createElement('span');
      text.textContent = `${p.label} ${formatNum(p.value)}（${(frac * 100).toFixed(1)}%）`;
      item.appendChild(swatch);
      item.appendChild(text);
      legend.appendChild(item);
    });
    container.appendChild(legend);
  }

  return { renderLineChart, renderBarChart, renderHBarChart, renderPieChart, renderMultiLineChart };
})();
