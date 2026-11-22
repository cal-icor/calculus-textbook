import {
  htmlElement,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const FAMILIES = {
  line: { label: "y = x, 0 ≤ x ≤ 2", fn: (x) => x, max: 2 },
  square: { label: "y = x² / 2, 0 ≤ x ≤ 2", fn: (x) => x ** 2 / 2, max: 2 },
  root: { label: "y = √x, 0 ≤ x ≤ 4", fn: Math.sqrt, max: 4 },
};

export function diskArea(family, x) {
  const selected = FAMILIES[family] ?? FAMILIES.line;
  return Math.PI * selected.fn(Number(x)) ** 2;
}

export function crossSectionArea(mode, sliceLength) {
  const length = Number(sliceLength);
  if (mode === "washer") return Math.PI * ((length + 1) ** 2 - 1);
  if (mode === "square") return length ** 2;
  if (mode === "semicircle") return (Math.PI * length ** 2) / 8;
  return Math.PI * length ** 2;
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .vs-plot { width: 100%; min-height: 340px; }
        .vs-region { fill: color-mix(in srgb, var(--cw-blue) 18%, transparent); stroke: var(--cw-blue); stroke-width: 2.5; }
        .vs-slice { stroke: var(--cw-red); stroke-width: 5; }
        .vs-disk, .vs-shape { fill: color-mix(in srgb, var(--cw-green) 24%, transparent); stroke: var(--cw-green); stroke-width: 3; }
        .vs-hole { fill: var(--pst-color-background, white); stroke: var(--cw-green); stroke-width: 2; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Volume cross-section explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "vs-plot",
      viewBox: "0 0 500 350",
      role: "img",
      "aria-label": "A region, a representative vertical slice, and its resulting cross-section",
    });
    svg.append(
      svgElement("line", { class: "cw-axis", x1: 35, y1: 300, x2: 275, y2: 300 }),
      svgElement("line", { class: "cw-axis", x1: 50, y1: 25, x2: 50, y2: 310 }),
    );
    const region = svgElement("path", { class: "vs-region" });
    const slice = svgElement("line", { class: "vs-slice" });
    const disk = svgElement("ellipse", { class: "vs-disk", cx: 390 });
    const hole = svgElement("ellipse", { class: "vs-hole", cx: 390 });
    const squareShape = svgElement("rect", { class: "vs-shape" });
    const semicircle = svgElement("path", { class: "vs-shape" });
    const connectorTop = svgElement("line", { class: "cw-base" });
    const connectorBottom = svgElement("line", { class: "cw-base" });
    const regionLabel = svgElement("text", { class: "cw-label", x: 55, y: 22 });
    regionLabel.textContent = "region and slice";
    const diskLabel = svgElement("text", { class: "cw-label", x: 340, y: 22 });
    diskLabel.textContent = "cross-section";
    svg.append(
      region, connectorTop, connectorBottom, slice, disk, hole, squareShape,
      semicircle, regionLabel, diskLabel,
    );

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Follow one representative slice" }));
    const familyLabel = htmlElement("label", { text: "Region boundary" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "line";
    familyLabel.append(select);
    const modeLabel = htmlElement("label", { text: "Cross-section type" });
    const mode = htmlElement("select");
    for (const [value, text] of [
      ["disk", "Disk about y = 0"],
      ["washer", "Washer about y = −1"],
      ["square", "Square cross-sections"],
      ["semicircle", "Semicircle cross-sections"],
    ]) {
      mode.append(htmlElement("option", { value, text }));
    }
    mode.value = ["disk", "washer", "square", "semicircle"].includes(model.get("mode"))
      ? model.get("mode")
      : "disk";
    modeLabel.append(mode);
    const output = htmlElement("output");
    const xInput = htmlElement("input", {
      type: "range", min: "0", max: "2", step: "0.05", value: String(model.get("x") ?? 1),
    });
    const xLabel = htmlElement("label");
    xLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Slice position x" }),
        output,
      ]),
      xInput,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      modeLabel,
      xLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "The same red segment can define a radius, a side, or a diameter.",
      }),
    );

    const update = () => {
      const family = FAMILIES[select.value];
      xInput.max = String(family.max);
      if (Number(xInput.value) > family.max) xInput.value = String(family.max);
      const x = Number(xInput.value);
      const radius = family.fn(x);
      const sx = (value) => 50 + (value / family.max) * 210;
      const sy = (value) => 300 - (value / 2.2) * 245;
      const points = [`M ${sx(0)} ${sy(0)}`];
      for (let index = 0; index <= 100; index += 1) {
        const value = (family.max * index) / 100;
        points.push(`L ${sx(value)} ${sy(family.fn(value))}`);
      }
      points.push(`L ${sx(family.max)} ${sy(0)} Z`);
      region.setAttribute("d", points.join(" "));
      slice.setAttribute("x1", sx(x));
      slice.setAttribute("y1", sy(0));
      slice.setAttribute("x2", sx(x));
      slice.setAttribute("y2", sy(radius));
      const diskRadius = Math.max(2, (radius / 2.2) * 105);
      const washerOuterRadius = Math.max(2, ((radius + 1) / 3.2) * 105);
      const washerInnerRadius = 105 / 3.2;
      disk.style.display = mode.value === "disk" || mode.value === "washer" ? "" : "none";
      hole.style.display = mode.value === "washer" ? "" : "none";
      squareShape.style.display = mode.value === "square" ? "" : "none";
      semicircle.style.display = mode.value === "semicircle" ? "" : "none";
      disk.setAttribute("cy", 175);
      disk.setAttribute("rx", Math.max(8, (mode.value === "washer" ? washerOuterRadius : diskRadius) * 0.32));
      disk.setAttribute("ry", mode.value === "washer" ? washerOuterRadius : diskRadius);
      hole.setAttribute("cy", 175);
      hole.setAttribute("rx", Math.max(5, washerInnerRadius * 0.32));
      hole.setAttribute("ry", washerInnerRadius);
      const shapeSize = Math.max(4, diskRadius * 1.4);
      squareShape.setAttribute("x", 390 - shapeSize / 2);
      squareShape.setAttribute("y", 175 - shapeSize / 2);
      squareShape.setAttribute("width", shapeSize);
      squareShape.setAttribute("height", shapeSize);
      semicircle.setAttribute(
        "d",
        `M ${390 - shapeSize / 2} 175 A ${shapeSize / 2} ${shapeSize / 2} 0 0 1 ${390 + shapeSize / 2} 175 Z`,
      );
      const displayedRadius = mode.value === "washer" ? washerOuterRadius : diskRadius;
      connectorTop.setAttribute("x1", sx(x));
      connectorTop.setAttribute("y1", sy(radius));
      connectorTop.setAttribute("x2", 390);
      connectorTop.setAttribute("y2", 175 - displayedRadius);
      connectorBottom.setAttribute("x1", sx(x));
      connectorBottom.setAttribute("y1", sy(0));
      connectorBottom.setAttribute("x2", 390);
      connectorBottom.setAttribute("y2", 175 + displayedRadius);
      output.textContent = x.toFixed(2);
      const area = crossSectionArea(mode.value, radius);
      const formula =
        mode.value === "washer"
          ? "π[(R + 1)² − 1²]"
          : mode.value === "square"
            ? "R²"
            : mode.value === "semicircle"
              ? "πR²/8, where R is the diameter"
              : "πR²";
      readout.innerHTML =
        `<strong>Slice length:</strong> R(${x.toFixed(2)}) = ${radius.toFixed(3)}<br>` +
        `<strong>Cross-sectional area:</strong> ${formula} = ${area.toFixed(3)}<br>` +
        `<strong>Volume element:</strong> dV = A(x) dx`;
    };

    select.addEventListener("change", update, { signal });
    mode.addEventListener("change", update, { signal });
    xInput.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
