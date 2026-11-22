import {
  htmlElement,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const FAMILIES = {
  linear: {
    label: "f(t) = t − 1",
    fn: (t) => t - 1,
    accumulation: (x) => x ** 2 / 2 - x,
    max: 4,
  },
  positive: {
    label: "f(t) = t / 2",
    fn: (t) => t / 2,
    accumulation: (x) => x ** 2 / 4,
    max: 4,
  },
  sine: {
    label: "f(t) = sin(t)",
    fn: Math.sin,
    accumulation: (x) => 1 - Math.cos(x),
    max: 2 * Math.PI,
  },
};

export function accumulationValue(family, x) {
  return (FAMILIES[family] ?? FAMILIES.linear).accumulation(Number(x));
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .ac-area { fill: color-mix(in srgb, var(--cw-blue) 22%, transparent); stroke: none; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Accumulation function explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = svgElement("svg", {
      class: "cw-plot",
      viewBox: "0 0 540 340",
      role: "img",
      "aria-label": "Side-by-side integrand and accumulation function graphs",
    });
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Move the upper bound" }));
    const familyLabel = htmlElement("label", { text: "Integrand" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "linear";
    familyLabel.append(select);
    const output = htmlElement("output");
    const xInput = htmlElement("input", {
      type: "range", min: "0", max: "4", step: "0.05", value: String(model.get("x") ?? 2),
    });
    const xLabel = htmlElement("label");
    xLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Upper bound x" }),
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
        text: "Blue is f. Green is A(x) = ∫₀ˣ f(t)dt. Shading shows the current signed accumulation.",
      }),
    );
    const sy = (y) => 285 - ((y + 2) / 7) * 240;
    const sxLeft = (x, max = 6.4) => 35 + (x / max) * 205;
    const sxRight = (x, max = 6.4) => 300 + (x / max) * 205;
    plot.append(
      svgElement("line", { class: "cw-axis", x1: 35, y1: sy(0), x2: 245, y2: sy(0) }),
      svgElement("line", { class: "cw-axis", x1: 35, y1: 35, x2: 35, y2: 295 }),
      svgElement("line", { class: "cw-axis", x1: 300, y1: sy(0), x2: 510, y2: sy(0) }),
      svgElement("line", { class: "cw-axis", x1: 300, y1: 35, x2: 300, y2: 295 }),
    );
    const leftTitle = svgElement("text", { class: "cw-label", x: 100, y: 22 });
    leftTitle.textContent = "integrand f(t)";
    const rightTitle = svgElement("text", { class: "cw-label", x: 355, y: 22 });
    rightTitle.textContent = "accumulation A(x)";
    plot.append(leftTitle, rightTitle);

    const areaPath = (fn, end, max) => {
      const parts = [`M ${sxLeft(0, max)} ${sy(0)}`];
      const steps = Math.max(2, Math.ceil(end / 0.03));
      for (let index = 0; index <= steps; index += 1) {
        const t = (end * index) / steps;
        parts.push(`L ${sxLeft(t, max)} ${sy(fn(t))}`);
      }
      parts.push(`L ${sxLeft(end, max)} ${sy(0)} Z`);
      return parts.join(" ");
    };

    const update = () => {
      const family = FAMILIES[select.value];
      xInput.max = String(family.max);
      if (Number(xInput.value) > family.max) xInput.value = String(family.max);
      const x = Number(xInput.value);
      const value = family.accumulation(x);
      output.textContent = x.toFixed(2);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "ac-area", d: areaPath(family.fn, x, family.max), "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(family.fn, (value) => sxLeft(value, family.max), sy, 0, family.max),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-secondary",
          d: pathForFunction(
            family.accumulation,
            (value) => sxRight(value, family.max),
            sy,
            0,
            family.max,
          ),
          "data-dynamic": "true",
        }),
        svgElement("line", {
          class: "cw-accent",
          x1: sxLeft(x, family.max),
          y1: sy(0),
          x2: sxLeft(x, family.max),
          y2: sy(family.fn(x)),
          "data-dynamic": "true",
        }),
        svgElement("circle", {
          class: "cw-point",
          cx: sxRight(x, family.max),
          cy: sy(value),
          r: 6,
          "data-dynamic": "true",
        }),
      );
      readout.innerHTML =
        `<strong>A(${x.toFixed(2)}):</strong> ${value.toFixed(4)}<br>` +
        `<strong>A′(${x.toFixed(2)}):</strong> f(${x.toFixed(2)}) = ${family.fn(x).toFixed(4)}`;
    };

    select.addEventListener("change", update, { signal });
    xInput.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
