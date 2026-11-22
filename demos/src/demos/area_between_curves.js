import { htmlElement, svgElement, widgetStyles, withCleanup } from "../shared.js";

export function areaSlice(orientation, value) {
  const input = Number(value);
  if (orientation === "horizontal") {
    const left = input / 2;
    const right = Math.sqrt(Math.max(0, input));
    return { start: left, end: right, length: right - left };
  }
  const lower = input ** 2;
  const upper = 2 * input;
  return { start: lower, end: upper, length: upper - lower };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .ab-plot { width: 100%; min-height: 350px; }
        .ab-region { fill: color-mix(in srgb, var(--cw-blue) 18%, transparent); stroke: none; }
        .ab-line { fill: none; stroke: var(--cw-blue); stroke-width: 3; }
        .ab-parabola { fill: none; stroke: var(--cw-green); stroke-width: 3; }
        .ab-slice { stroke: var(--cw-red); stroke-width: 6; stroke-linecap: round; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Area between curves slicing explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "ab-plot", viewBox: "0 0 430 350", role: "img",
      "aria-label": "Region between a line and a parabola with an adjustable slice",
    });
    const sx = (x) => 55 + (x / 2.2) * 330;
    const sy = (y) => 305 - (y / 4.4) * 265;
    svg.append(
      svgElement("line", { class: "cw-axis", x1: 45, y1: sy(0), x2: 400, y2: sy(0) }),
      svgElement("line", { class: "cw-axis", x1: sx(0), y1: 25, x2: sx(0), y2: 315 }),
    );
    const regionPoints = [`M ${sx(0)} ${sy(0)}`];
    for (let index = 0; index <= 100; index += 1) {
      const x = (2 * index) / 100;
      regionPoints.push(`L ${sx(x)} ${sy(2 * x)}`);
    }
    for (let index = 100; index >= 0; index -= 1) {
      const x = (2 * index) / 100;
      regionPoints.push(`L ${sx(x)} ${sy(x ** 2)}`);
    }
    regionPoints.push("Z");
    const region = svgElement("path", { class: "ab-region", d: regionPoints.join(" ") });
    const line = svgElement("path", { class: "ab-line", d: `M ${sx(0)} ${sy(0)} L ${sx(2)} ${sy(4)}` });
    const parabolaParts = [];
    for (let index = 0; index <= 100; index += 1) {
      const x = (2 * index) / 100;
      parabolaParts.push(`${index ? "L" : "M"} ${sx(x)} ${sy(x ** 2)}`);
    }
    const parabola = svgElement("path", { class: "ab-parabola", d: parabolaParts.join(" ") });
    const slice = svgElement("line", { class: "ab-slice" });
    svg.append(region, line, parabola, slice);
    for (const [x, y] of [[0, 0], [2, 4]]) {
      svg.append(svgElement("circle", { class: "cw-point", cx: sx(x), cy: sy(y), r: 6 }));
    }

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Choose a slice direction" }));
    const orientationLabel = htmlElement("label", { text: "Orientation" });
    const orientation = htmlElement("select");
    orientation.append(
      htmlElement("option", { value: "vertical", text: "Vertical: top − bottom" }),
      htmlElement("option", { value: "horizontal", text: "Horizontal: right − left" }),
    );
    orientation.value = model.get("orientation") === "horizontal" ? "horizontal" : "vertical";
    orientationLabel.append(orientation);
    const output = htmlElement("output");
    const position = htmlElement("input", {
      type: "range", min: "0", max: "2", step: "0.02", value: String(model.get("slice") ?? 1),
    });
    const positionLabel = htmlElement("label");
    positionLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Slice position" }),
        output,
      ]),
      position,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      orientationLabel,
      positionLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Blue is y = 2x. Green is y = x². Red is one representative rectangle.",
      }),
    );

    const update = () => {
      const horizontal = orientation.value === "horizontal";
      position.max = horizontal ? "4" : "2";
      if (Number(position.value) > Number(position.max)) position.value = position.max;
      const value = Number(position.value);
      const result = areaSlice(orientation.value, value);
      output.textContent = horizontal ? `y = ${value.toFixed(2)}` : `x = ${value.toFixed(2)}`;
      if (horizontal) {
        slice.setAttribute("x1", sx(result.start));
        slice.setAttribute("y1", sy(value));
        slice.setAttribute("x2", sx(result.end));
        slice.setAttribute("y2", sy(value));
        readout.innerHTML =
          `<strong>Length:</strong> √y − y/2 = ${result.length.toFixed(3)}<br>` +
          `<strong>Setup:</strong> ∫₀⁴(√y − y/2)dy`;
      } else {
        slice.setAttribute("x1", sx(value));
        slice.setAttribute("y1", sy(result.start));
        slice.setAttribute("x2", sx(value));
        slice.setAttribute("y2", sy(result.end));
        readout.innerHTML =
          `<strong>Height:</strong> 2x − x² = ${result.length.toFixed(3)}<br>` +
          `<strong>Setup:</strong> ∫₀²(2x − x²)dx`;
      }
    };

    orientation.addEventListener("change", update, { signal });
    position.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
