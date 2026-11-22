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
  cubic: {
    label: "f(x) = x³ − 3x",
    fn: (x) => x ** 3 - 3 * x,
    first: (x) => 3 * x ** 2 - 3,
    second: (x) => 6 * x,
  },
  quartic: {
    label: "f(x) = x⁴ − 4x²",
    fn: (x) => x ** 4 - 4 * x ** 2,
    first: (x) => 4 * x ** 3 - 8 * x,
    second: (x) => 12 * x ** 2 - 8,
  },
  sine: {
    label: "f(x) = 3 sin(x)",
    fn: (x) => 3 * Math.sin(x),
    first: (x) => 3 * Math.cos(x),
    second: (x) => -3 * Math.sin(x),
  },
};

export function derivativeBehavior(family, x) {
  const selected = FAMILIES[family] ?? FAMILIES.cubic;
  const first = selected.first(x);
  const second = selected.second(x);
  return {
    first,
    second,
    direction: first > 1e-8 ? "increasing" : first < -1e-8 ? "decreasing" : "stationary",
    concavity: second > 1e-8 ? "concave up" : second < -1e-8 ? "concave down" : "possible inflection",
  };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "First and second derivative sign explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Function with a movable inspection point",
      "The signs of the first and second derivatives describe direction and concavity.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Read shape from derivative signs" }));
    const familyLabel = htmlElement("label", { text: "Function" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "cubic";
    familyLabel.append(select);
    const output = htmlElement("output");
    const xInput = htmlElement("input", {
      type: "range", min: "-2.5", max: "2.5", step: "0.05",
      value: String(model.get("x") ?? -1),
    });
    const xLabel = htmlElement("label");
    xLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Inspect at x" }),
        output,
      ]),
      xInput,
    );
    const directionLabel = htmlElement("label", { text: "Your direction prediction" });
    const directionPrediction = htmlElement("select");
    for (const value of ["increasing", "decreasing", "stationary"]) {
      directionPrediction.append(htmlElement("option", { value, text: value }));
    }
    directionLabel.append(directionPrediction);
    const concavityLabel = htmlElement("label", { text: "Your concavity prediction" });
    const concavityPrediction = htmlElement("select");
    for (const value of ["concave up", "concave down", "possible inflection"]) {
      concavityPrediction.append(htmlElement("option", { value, text: value }));
    }
    concavityLabel.append(concavityPrediction);
    const check = htmlElement("button", { type: "button", text: "Check predictions" });
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      xLabel,
      directionLabel,
      concavityLabel,
      check,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "The red tangent shows the first derivative at the selected point.",
      }),
    );
    const bounds = { xMin: -3, xMax: 3, yMin: -7, yMax: 7 };
    const { sx, sy } = drawAxes(plot, bounds);
    let checked = false;

    const update = () => {
      const selected = FAMILIES[select.value];
      const x = Number(xInput.value);
      const y = selected.fn(x);
      const behavior = derivativeBehavior(select.value, x);
      output.textContent = x.toFixed(2);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(selected.fn, sx, sy, bounds.xMin, bounds.xMax),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-accent",
          d: `M ${sx(x - 1)} ${sy(y - behavior.first)} L ${sx(x + 1)} ${sy(y + behavior.first)}`,
          "data-dynamic": "true",
        }),
        svgElement("circle", {
          class: "cw-point", cx: sx(x), cy: sy(y), r: 6,
          "data-dynamic": "true",
        }),
      );
      readout.innerHTML = checked
        ? `<strong>${directionPrediction.value === behavior.direction ? "Direction correct" : "Recheck direction"}:</strong> ` +
          `f′(x) = ${behavior.first.toFixed(3)}, so the graph is ${behavior.direction}.<br>` +
          `<strong>${concavityPrediction.value === behavior.concavity ? "Concavity correct" : "Recheck concavity"}:</strong> ` +
          `f″(x) = ${behavior.second.toFixed(3)}, so the graph is ${behavior.concavity}.`
        : "Predict the signs from the graph and tangent, then check.";
    };

    const revise = () => {
      checked = false;
      update();
    };
    select.addEventListener("change", revise, { signal });
    xInput.addEventListener("input", revise, { signal });
    check.addEventListener("click", () => {
      checked = true;
      update();
    }, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
