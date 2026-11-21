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

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .vs-plot { width: 100%; min-height: 340px; }
        .vs-region { fill: color-mix(in srgb, var(--cw-blue) 18%, transparent); stroke: var(--cw-blue); stroke-width: 2.5; }
        .vs-slice { stroke: var(--cw-red); stroke-width: 5; }
        .vs-disk { fill: color-mix(in srgb, var(--cw-green) 24%, transparent); stroke: var(--cw-green); stroke-width: 3; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Volume by disks explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "vs-plot",
      viewBox: "0 0 500 350",
      role: "img",
      "aria-label": "A region, a representative vertical slice, and the disk formed by rotation",
    });
    svg.append(
      svgElement("line", { class: "cw-axis", x1: 35, y1: 300, x2: 275, y2: 300 }),
      svgElement("line", { class: "cw-axis", x1: 50, y1: 25, x2: 50, y2: 310 }),
    );
    const region = svgElement("path", { class: "vs-region" });
    const slice = svgElement("line", { class: "vs-slice" });
    const disk = svgElement("ellipse", { class: "vs-disk", cx: 390 });
    const connectorTop = svgElement("line", { class: "cw-base" });
    const connectorBottom = svgElement("line", { class: "cw-base" });
    const regionLabel = svgElement("text", { class: "cw-label", x: 55, y: 22 });
    regionLabel.textContent = "region and slice";
    const diskLabel = svgElement("text", { class: "cw-label", x: 340, y: 22 });
    diskLabel.textContent = "rotated disk";
    svg.append(region, connectorTop, connectorBottom, slice, disk, regionLabel, diskLabel);

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Follow one representative slice" }));
    const familyLabel = htmlElement("label", { text: "Region boundary" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "line";
    familyLabel.append(select);
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
      xLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Rotating the red segment about the x-axis creates the green disk.",
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
      disk.setAttribute("cy", 175);
      disk.setAttribute("rx", Math.max(8, diskRadius * 0.32));
      disk.setAttribute("ry", diskRadius);
      connectorTop.setAttribute("x1", sx(x));
      connectorTop.setAttribute("y1", sy(radius));
      connectorTop.setAttribute("x2", 390);
      connectorTop.setAttribute("y2", 175 - diskRadius);
      connectorBottom.setAttribute("x1", sx(x));
      connectorBottom.setAttribute("y1", sy(0));
      connectorBottom.setAttribute("x2", 390);
      connectorBottom.setAttribute("y2", 175 + diskRadius);
      output.textContent = x.toFixed(2);
      readout.innerHTML =
        `<strong>Radius:</strong> R(${x.toFixed(2)}) = ${radius.toFixed(3)}<br>` +
        `<strong>Disk area:</strong> πR² = ${diskArea(select.value, x).toFixed(3)}<br>` +
        `<strong>Volume element:</strong> dV = πR² dx`;
    };

    select.addEventListener("change", update, { signal });
    xInput.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
