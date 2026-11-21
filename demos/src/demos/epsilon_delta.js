import {
  drawAxes,
  htmlElement,
  makePlot,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const FUNCTIONS = {
  linear: { label: "Linear: f(x) = 2x + 1", fn: (x) => 2 * x + 1, a: 1, limit: 3 },
  quadratic: { label: "Quadratic: f(x) = x²", fn: (x) => x ** 2, a: 1, limit: 1 },
  jump: { label: "Jump at x = 0", fn: (x) => (x < 0 ? -1 : 1), a: 0, limit: 0 },
};

export function bandContains(functionName, epsilon, delta, samples = 500) {
  const selected = FUNCTIONS[functionName] ?? FUNCTIONS.linear;
  for (let index = 1; index < samples; index += 1) {
    const offset = -delta + (2 * delta * index) / samples;
    if (Math.abs(offset) < 1e-12) continue;
    if (Math.abs(selected.fn(selected.a + offset) - selected.limit) >= epsilon) {
      return false;
    }
  }
  return true;
}

function slider(labelText, minimum, maximum, step, value) {
  const output = htmlElement("output", { text: Number(value).toFixed(2) });
  const input = htmlElement("input", {
    type: "range",
    min: String(minimum),
    max: String(maximum),
    step: String(step),
    value: String(value),
  });
  const label = htmlElement("label");
  label.append(
    htmlElement("span", { class: "cw-row" }, [
      htmlElement("span", { text: labelText }),
      output,
    ]),
    input,
  );
  return { input, output, label };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Epsilon delta explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Epsilon band and delta window",
      "Horizontal and vertical shaded regions test the precise definition of a limit.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Can δ meet the ε challenge?" }));
    const functionLabel = htmlElement("label", { text: "Function" });
    const select = htmlElement("select");
    for (const [value, item] of Object.entries(FUNCTIONS)) {
      select.append(htmlElement("option", { value, text: item.label }));
    }
    select.value = FUNCTIONS[model.get("function")] ? model.get("function") : "linear";
    functionLabel.append(select);
    const epsilon = slider("Output tolerance ε", 0.1, 2, 0.1, model.get("epsilon") ?? 1);
    const delta = slider("Input tolerance δ", 0.05, 2, 0.05, model.get("delta") ?? 0.5);
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      functionLabel,
      epsilon.label,
      delta.label,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Green means every sampled graph point in the δ-window lies inside the ε-band.",
      }),
    );
    const bounds = { xMin: -2, xMax: 3, yMin: -3, yMax: 6 };
    const { sx, sy } = drawAxes(plot, bounds);

    const update = () => {
      const selected = FUNCTIONS[select.value];
      const epsilonValue = Number(epsilon.input.value);
      const deltaValue = Number(delta.input.value);
      epsilon.output.textContent = epsilonValue.toFixed(2);
      delta.output.textContent = deltaValue.toFixed(2);
      const passes = bandContains(select.value, epsilonValue, deltaValue);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      const bandTop = sy(selected.limit + epsilonValue);
      const bandBottom = sy(selected.limit - epsilonValue);
      plot.append(
        svgElement("rect", {
          x: 40,
          y: bandTop,
          width: 400,
          height: bandBottom - bandTop,
          fill: "#f0a202",
          opacity: ".16",
          "data-dynamic": "true",
        }),
        svgElement("rect", {
          x: sx(selected.a - deltaValue),
          y: 40,
          width: sx(selected.a + deltaValue) - sx(selected.a - deltaValue),
          height: 260,
          fill: passes ? "#08756b" : "#b6414a",
          opacity: ".14",
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(selected.fn, sx, sy, bounds.xMin, bounds.xMax),
          "data-dynamic": "true",
        }),
        svgElement("circle", {
          class: "cw-point",
          cx: sx(selected.a),
          cy: sy(selected.limit),
          r: 5,
          "data-dynamic": "true",
        }),
      );
      readout.innerHTML =
        `<strong>${passes ? "This δ works" : "This δ is too large"}</strong><br>` +
        `Target: 0 &lt; |x − ${selected.a}| &lt; ${deltaValue.toFixed(2)} implies ` +
        `|f(x) − ${selected.limit}| &lt; ${epsilonValue.toFixed(2)}.`;
    };

    select.addEventListener("change", update, { signal });
    epsilon.input.addEventListener("input", update, { signal });
    delta.input.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
