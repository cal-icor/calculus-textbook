import {
  drawAxes,
  htmlElement,
  makePlot,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const PARENTS = {
  quadratic: { label: "Quadratic: f(x) = x²", fn: (x) => x ** 2 },
  absolute: { label: "Absolute value: f(x) = |x|", fn: (x) => Math.abs(x) },
  cubic: { label: "Cubic: f(x) = x³", fn: (x) => x ** 3 },
  sine: { label: "Sine: f(x) = sin(x)", fn: (x) => Math.sin(x) },
};

export function transformedValue(family, x, { a = 1, b = 1, h = 0, k = 0 } = {}) {
  const parent = PARENTS[family] ?? PARENTS.quadratic;
  return a * parent.fn(b * (x - h)) + k;
}

const numberControl = (name, label, min, max, step, value) => {
  const output = htmlElement("output", { text: Number(value).toFixed(1) });
  const input = htmlElement("input", {
    type: "range",
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(value),
    "aria-label": label,
  });
  const wrapper = htmlElement("label");
  wrapper.append(htmlElement("span", { class: "cw-row" }, [
    htmlElement("span", { text: label }),
    output,
  ]), input);
  return { name, input, output, wrapper };
};

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Function transformation explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Parent and transformed function graphs",
      "A dashed parent graph is compared with a solid transformed graph.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Transform a parent function" }));

    const familyLabel = htmlElement("label", { text: "Parent function" });
    const familySelect = htmlElement("select", { "aria-label": "Parent function" });
    for (const [value, parent] of Object.entries(PARENTS)) {
      familySelect.append(htmlElement("option", { value, text: parent.label }));
    }
    familySelect.value = PARENTS[model.get("family")] ? model.get("family") : "quadratic";
    familyLabel.append(familySelect);

    const controls = [
      numberControl("a", "Vertical scale a", -3, 3, 0.5, model.get("a") ?? 1),
      numberControl("b", "Horizontal scale b", -3, 3, 0.5, model.get("b") ?? 1),
      numberControl("h", "Horizontal shift h", -3, 3, 0.5, model.get("h") ?? 0),
      numberControl("k", "Vertical shift k", -3, 3, 0.5, model.get("k") ?? 0),
    ];
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      ...controls.map((control) => control.wrapper),
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "The dashed graph is f(x); the blue graph is a·f(b(x−h))+k.",
      }),
    );

    const update = () => {
      const family = familySelect.value;
      const parameters = Object.fromEntries(
        controls.map((control) => {
          const value = Number(control.input.value);
          control.output.textContent = value.toFixed(1);
          return [control.name, value];
        }),
      );
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      const { sx, sy } = drawAxes(plot.cloneNode());
      const base = svgElement("path", {
        class: "cw-base",
        d: pathForFunction(PARENTS[family].fn, sx, sy, -5, 5),
        "data-dynamic": "true",
      });
      const curve = svgElement("path", {
        class: "cw-curve",
        d: pathForFunction(
          (x) => transformedValue(family, x, parameters),
          sx,
          sy,
          -5,
          5,
        ),
        "data-dynamic": "true",
      });
      plot.append(base, curve);
      const { a, b, h, k } = parameters;
      readout.textContent =
        `g(x) = ${a.toFixed(1)} · f(${b.toFixed(1)}(x − ${h.toFixed(1)})) ` +
        `${k < 0 ? "−" : "+"} ${Math.abs(k).toFixed(1)}`;
    };

    drawAxes(plot);
    familySelect.addEventListener("change", update, { signal });
    for (const control of controls) {
      control.input.addEventListener("input", update, { signal });
    }
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
