export function htmlElement(tag, attributes = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) node.append(child);
  return node;
}

export function svgElement(tag, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, value);
  }
  return node;
}

export const widgetStyles = `
  .calc-widget {
    --cw-blue: #1557a0;
    --cw-blue-soft: #eaf2fb;
    --cw-red: #b6414a;
    --cw-green: #08756b;
    --cw-ink: #172033;
    --cw-muted: #566070;
    --cw-border: #cbd5e1;
    color: var(--pst-color-text-base, var(--cw-ink));
    background: var(--pst-color-background, #fff);
    border: 1px solid var(--pst-color-border, var(--cw-border));
    border-radius: 12px;
    padding: 1rem;
    font-family: var(--pst-font-family-base, system-ui, sans-serif);
  }
  .cw-layout {
    display: grid;
    grid-template-columns: minmax(300px, 1.4fr) minmax(220px, .8fr);
    gap: 1.1rem;
    align-items: center;
  }
  .cw-panel { display: grid; gap: .8rem; align-content: start; }
  .cw-panel h3 { margin: 0; font-size: 1.05rem; }
  .cw-panel label { display: grid; gap: .3rem; font-weight: 650; }
  .cw-panel select, .cw-panel button {
    min-height: 2.4rem;
    border: 1px solid #8c9aac;
    border-radius: 6px;
    padding: .4rem .55rem;
    color: inherit;
    background: var(--pst-color-background, #fff);
    font: inherit;
  }
  .cw-panel button { cursor: pointer; font-weight: 650; }
  .cw-panel button:hover, .cw-panel select:hover { border-color: var(--cw-blue); }
  .cw-panel input[type="range"] { width: 100%; accent-color: var(--cw-blue); }
  .cw-panel button:focus-visible, .cw-panel select:focus-visible,
  .cw-panel input:focus-visible {
    outline: 3px solid #f0a202;
    outline-offset: 2px;
  }
  .cw-plot { width: 100%; min-height: 320px; overflow: hidden; }
  .cw-axis { stroke: #8190a5; stroke-width: 1.25; }
  .cw-grid { stroke: #d8e0ea; stroke-width: .7; }
  .cw-base { fill: none; stroke: #8190a5; stroke-width: 2; stroke-dasharray: 6 5; }
  .cw-curve { fill: none; stroke: var(--cw-blue); stroke-width: 3; }
  .cw-accent { fill: none; stroke: var(--cw-red); stroke-width: 2.5; }
  .cw-secondary { fill: none; stroke: var(--cw-green); stroke-width: 2.5; }
  .cw-point { fill: var(--cw-red); stroke: white; stroke-width: 2.5; }
  .cw-label { fill: currentColor; font-size: 12px; }
  .cw-readout {
    padding: .75rem;
    border-radius: 8px;
    background: var(--cw-blue-soft);
    line-height: 1.55;
    font-variant-numeric: tabular-nums;
  }
  .cw-help { margin: 0; color: var(--pst-color-text-muted, var(--cw-muted)); font-size: .9rem; }
  .cw-row { display: grid; grid-template-columns: 1fr auto; gap: .6rem; align-items: center; }
  @media (max-width: 700px) {
    .cw-layout { grid-template-columns: 1fr; }
    .cw-plot { min-height: 280px; }
  }
  @media (prefers-color-scheme: dark) {
    .calc-widget {
      --cw-blue-soft: #1d3148;
      --cw-ink: #e8edf5;
      --cw-muted: #b4c0d0;
      --cw-border: #3a4658;
      background: #151b26;
    }
    .cw-grid { stroke: #303c4e; }
    .cw-panel select, .cw-panel button { background: #202938; border-color: #617087; }
  }
`;

export function makePlot(titleText, descriptionText) {
  const svg = svgElement("svg", {
    class: "cw-plot",
    viewBox: "0 0 480 340",
    role: "img",
  });
  const titleId = `cw-title-${Math.random().toString(36).slice(2)}`;
  const descriptionId = `cw-desc-${Math.random().toString(36).slice(2)}`;
  svg.setAttribute("aria-labelledby", `${titleId} ${descriptionId}`);
  const title = svgElement("title", { id: titleId });
  title.textContent = titleText;
  const description = svgElement("desc", { id: descriptionId });
  description.textContent = descriptionText;
  svg.append(title, description);
  return svg;
}

export function drawAxes(svg, bounds = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }) {
  const { xMin, xMax, yMin, yMax } = bounds;
  const sx = (x) => 40 + ((x - xMin) / (xMax - xMin)) * 400;
  const sy = (y) => 300 - ((y - yMin) / (yMax - yMin)) * 260;

  for (let value = Math.ceil(xMin); value <= Math.floor(xMax); value += 1) {
    svg.append(svgElement("line", {
      class: "cw-grid",
      x1: sx(value),
      y1: 40,
      x2: sx(value),
      y2: 300,
    }));
  }
  for (let value = Math.ceil(yMin); value <= Math.floor(yMax); value += 1) {
    svg.append(svgElement("line", {
      class: "cw-grid",
      x1: 40,
      y1: sy(value),
      x2: 440,
      y2: sy(value),
    }));
  }
  if (xMin <= 0 && xMax >= 0) {
    svg.append(svgElement("line", { class: "cw-axis", x1: sx(0), y1: 35, x2: sx(0), y2: 305 }));
  }
  if (yMin <= 0 && yMax >= 0) {
    svg.append(svgElement("line", { class: "cw-axis", x1: 35, y1: sy(0), x2: 445, y2: sy(0) }));
  }
  return { sx, sy };
}

export function pathForFunction(fn, sx, sy, xMin, xMax, step = 0.03) {
  const parts = [];
  let drawing = false;
  for (let x = xMin; x <= xMax + step / 2; x += step) {
    const y = fn(x);
    if (Number.isFinite(y) && y > -100 && y < 100) {
      parts.push(`${drawing ? "L" : "M"} ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`);
      drawing = true;
    } else {
      drawing = false;
    }
  }
  return parts.join(" ");
}

export function withCleanup(el, build) {
  const controller = new AbortController();
  el.replaceChildren();
  build(controller.signal);
  return () => controller.abort();
}
