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
  linear: { label: "f(x) = 2x", derivative: (x) => 2 * x, base: (x) => x ** 2 },
  quadratic: { label: "f(x) = 3x²", derivative: (x) => 3 * x ** 2, base: (x) => x ** 3 },
  cosine: { label: "f(x) = cos(x)", derivative: Math.cos, base: Math.sin },
};

export function antiderivativeValue(family, x, constant = 0) {
  const selected = FAMILIES[family] ?? FAMILIES.linear;
  return selected.base(Number(x)) + Number(constant);
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Antiderivative family explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "A family of antiderivative curves",
      "Several vertical shifts share the same derivative, with one selected curve highlighted.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Change the constant C" }));
    const familyLabel = htmlElement("label", { text: "Derivative" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "linear";
    familyLabel.append(select);
    const output = htmlElement("output");
    const constant = htmlElement("input", {
      type: "range", min: "-3", max: "3", step: "0.5",
      value: String(model.get("constant") ?? 0),
    });
    const constantLabel = htmlElement("label");
    constantLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Integration constant C" }),
        output,
      ]),
      constant,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      constantLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Gray curves are other possible constants. All curves have the same slope at each x.",
      }),
    );
    const bounds = { xMin: -3, xMax: 3, yMin: -6, yMax: 6 };
    const { sx, sy } = drawAxes(plot, bounds);

    const update = () => {
      const selected = FAMILIES[select.value];
      const c = Number(constant.value);
      output.textContent = c.toFixed(1);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      for (const offset of [-3, -1.5, 0, 1.5, 3]) {
        plot.append(svgElement("path", {
          class: "cw-base",
          d: pathForFunction((x) => selected.base(x) + offset, sx, sy, bounds.xMin, bounds.xMax),
          "data-dynamic": "true",
        }));
      }
      plot.append(svgElement("path", {
        class: "cw-curve",
        d: pathForFunction((x) => selected.base(x) + c, sx, sy, bounds.xMin, bounds.xMax),
        "data-dynamic": "true",
      }));
      const name = select.value === "linear" ? "x²" : select.value === "quadratic" ? "x³" : "sin(x)";
      readout.innerHTML =
        `<strong>Selected antiderivative:</strong> F(x) = ${name} ${c < 0 ? "−" : "+"} ${Math.abs(c).toFixed(1)}<br>` +
        `Differentiating removes C and returns ${selected.label}.`;
    };

    select.addEventListener("change", update, { signal });
    constant.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
