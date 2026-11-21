import {
  drawAxes,
  htmlElement,
  makePlot,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

export const INVERSE_FAMILIES = {
  linear: {
    label: "Linear: f(x) = 2x + 1",
    fn: (x) => 2 * x + 1,
    inverse: (x) => (x - 1) / 2,
    domain: [-3, 3],
    message: "One-to-one on all real numbers.",
  },
  quadratic: {
    label: "Restricted quadratic: f(x) = x², x ≥ 0",
    fn: (x) => (x >= 0 ? x ** 2 : Number.NaN),
    inverse: (x) => (x >= 0 ? Math.sqrt(x) : Number.NaN),
    domain: [0, 3],
    message: "The restriction x ≥ 0 makes the inverse √x a function.",
  },
  exponential: {
    label: "Exponential: f(x) = 2ˣ",
    fn: (x) => 2 ** x,
    inverse: (x) => (x > 0 ? Math.log2(x) : Number.NaN),
    domain: [-3, 3],
    message: "The inverse is log₂(x), whose domain is x > 0.",
  },
};

export function inversePoint(family, x) {
  const selected = INVERSE_FAMILIES[family] ?? INVERSE_FAMILIES.linear;
  const y = selected.fn(x);
  return { original: [x, y], reflected: [y, x] };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Inverse function explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "A function and its inverse",
      "The inverse graph reflects the original graph across the line y equals x.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Reflect across y = x" }));

    const familyLabel = htmlElement("label", { text: "Function pair" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(INVERSE_FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = INVERSE_FAMILIES[model.get("family")] ? model.get("family") : "quadratic";
    familyLabel.append(select);

    const xOutput = htmlElement("output", { text: "1.0" });
    const xSlider = htmlElement("input", {
      type: "range",
      min: "0",
      max: "3",
      step: "0.1",
      value: "1",
    });
    const xLabel = htmlElement("label");
    xLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Input x" }),
        xOutput,
      ]),
      xSlider,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      xLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Blue shows f. Green shows f⁻¹. Red points swap their coordinates.",
      }),
    );

    const { sx, sy } = drawAxes(plot, { xMin: -3, xMax: 6, yMin: -3, yMax: 6 });
    plot.append(svgElement("line", {
      class: "cw-base",
      x1: sx(-3),
      y1: sy(-3),
      x2: sx(6),
      y2: sy(6),
    }));

    const update = () => {
      const family = INVERSE_FAMILIES[select.value];
      const [minimum, maximum] = family.domain;
      xSlider.min = String(minimum);
      xSlider.max = String(maximum);
      if (Number(xSlider.value) < minimum || Number(xSlider.value) > maximum) {
        xSlider.value = String(Math.max(minimum, Math.min(maximum, 1)));
      }
      const x = Number(xSlider.value);
      const { original, reflected } = inversePoint(select.value, x);
      xOutput.textContent = x.toFixed(1);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(family.fn, sx, sy, -3, 6),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-secondary",
          d: pathForFunction(family.inverse, sx, sy, -3, 6),
          "data-dynamic": "true",
        }),
      );
      for (const [point, className] of [[original, "cw-point"], [reflected, "cw-point"]]) {
        if (point.every(Number.isFinite)) {
          plot.append(svgElement("circle", {
            class: className,
            cx: sx(point[0]),
            cy: sy(point[1]),
            r: 6,
            "data-dynamic": "true",
          }));
        }
      }
      readout.innerHTML =
        `<strong>Coordinate swap:</strong> (${original[0].toFixed(1)}, ` +
        `${original[1].toFixed(2)}) ↔ (${reflected[0].toFixed(2)}, ` +
        `${reflected[1].toFixed(1)})<br>${family.message}`;
    };

    select.addEventListener("change", update, { signal });
    xSlider.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
