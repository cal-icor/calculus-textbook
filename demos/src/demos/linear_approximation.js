import {
  drawAxes,
  htmlElement,
  makePlot,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const FAMILIES = {
  square_root: {
    label: "f(x) = √x",
    fn: Math.sqrt,
    derivative: (x) => 1 / (2 * Math.sqrt(x)),
    min: 0.25,
    max: 9,
  },
  quadratic: {
    label: "f(x) = x² / 4",
    fn: (x) => x ** 2 / 4,
    derivative: (x) => x / 2,
    min: -1,
    max: 4,
  },
  logarithm: {
    label: "f(x) = ln(x)",
    fn: Math.log,
    derivative: (x) => 1 / x,
    min: 0.25,
    max: 5,
  },
};

export function linearApproximation(family, a, x) {
  const selected = FAMILIES[family] ?? FAMILIES.square_root;
  const actual = selected.fn(Number(x));
  const estimate = selected.fn(Number(a)) + selected.derivative(Number(a)) * (Number(x) - Number(a));
  return { actual, estimate, error: actual - estimate };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Linear approximation explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "A function and its tangent-line approximation",
      "A movable input compares the true function value with the tangent-line estimate.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Compare f(x) with L(x)" }));
    const familyLabel = htmlElement("label", { text: "Function" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "square_root";
    familyLabel.append(select);

    const makeControl = (text, value) => {
      const output = htmlElement("output");
      const input = htmlElement("input", { type: "range", step: "0.05", value: String(value) });
      const label = htmlElement("label");
      label.append(
        htmlElement("span", { class: "cw-row" }, [
          htmlElement("span", { text }),
          output,
        ]),
        input,
      );
      return { input, output, label };
    };
    const center = makeControl("Tangent point a", model.get("a") ?? 4);
    const target = makeControl("Estimate at x", model.get("x") ?? 4.5);
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      center.label,
      target.label,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Blue is f. Green is its tangent line at a. The red segment is the approximation error.",
      }),
    );
    const bounds = { xMin: -1, xMax: 9, yMin: -2, yMax: 5 };
    const { sx, sy } = drawAxes(plot, bounds);

    const update = () => {
      const family = FAMILIES[select.value];
      for (const control of [center, target]) {
        control.input.min = String(family.min);
        control.input.max = String(family.max);
        const value = Math.max(family.min, Math.min(family.max, Number(control.input.value)));
        control.input.value = String(value);
        control.output.textContent = value.toFixed(2);
      }
      const a = Number(center.input.value);
      const x = Number(target.input.value);
      const result = linearApproximation(select.value, a, x);
      const fa = family.fn(a);
      const slope = family.derivative(a);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(family.fn, sx, sy, family.min, family.max),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-secondary",
          d: `M ${sx(bounds.xMin)} ${sy(fa + slope * (bounds.xMin - a))} ` +
            `L ${sx(bounds.xMax)} ${sy(fa + slope * (bounds.xMax - a))}`,
          "data-dynamic": "true",
        }),
        svgElement("line", {
          class: "cw-accent",
          x1: sx(x), y1: sy(result.actual), x2: sx(x), y2: sy(result.estimate),
          "data-dynamic": "true",
        }),
        svgElement("circle", {
          class: "cw-point", cx: sx(a), cy: sy(fa), r: 6, "data-dynamic": "true",
        }),
      );
      readout.innerHTML =
        `<strong>Actual f(x):</strong> ${result.actual.toFixed(5)}<br>` +
        `<strong>Estimate L(x):</strong> ${result.estimate.toFixed(5)}<br>` +
        `<strong>Actual − estimate:</strong> ${result.error.toFixed(5)}`;
    };

    select.addEventListener("change", update, { signal });
    center.input.addEventListener("input", update, { signal });
    target.input.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
