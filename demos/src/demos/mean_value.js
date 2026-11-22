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
  quadratic: { label: "f(x) = x²", fn: (x) => x ** 2, derivative: (x) => 2 * x, valid: true },
  cubic: {
    label: "f(x) = x³ − 3x",
    fn: (x) => x ** 3 - 3 * x,
    derivative: (x) => 3 * x ** 2 - 3,
    valid: true,
  },
  corner: {
    label: "Failed hypothesis: f(x) = |x|",
    fn: Math.abs,
    derivative: (x) => (x === 0 ? Number.NaN : Math.sign(x)),
    valid: false,
    reason: "The function is not differentiable at the corner x = 0.",
  },
  jump: {
    label: "Failed hypothesis: jump at x = 0",
    fn: (x) => (x < 0 ? x : x + 1),
    graphFn: (x) => (Math.abs(x) < 0.025 ? Number.NaN : x < 0 ? x : x + 1),
    derivative: () => 1,
    valid: false,
    reason: "The function is not continuous on the closed interval.",
  },
};

export function meanValuePoints(family, a, b) {
  if (a === b) return { slope: Number.NaN, points: [] };
  const selected = FAMILIES[family] ?? FAMILIES.quadratic;
  const slope = (selected.fn(b) - selected.fn(a)) / (b - a);
  if (!selected.valid) return { slope, points: [] };
  if (family === "cubic") {
    const root = Math.sqrt(Math.max(0, (slope + 3) / 3));
    return {
      slope,
      points: [-root, root].filter((c) => c > Math.min(a, b) && c < Math.max(a, b)),
    };
  }
  return { slope, points: [(a + b) / 2] };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", { text: widgetStyles });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Mean Value Theorem explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Secant line and parallel tangent lines",
      "A curve over a closed interval shows where tangent slopes equal the average slope.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Match an instantaneous rate" }));
    const familyLabel = htmlElement("label", { text: "Function" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "quadratic";
    familyLabel.append(select);

    const makeControl = (text, value) => {
      const output = htmlElement("output");
      const input = htmlElement("input", {
        type: "range", min: "-2.5", max: "2.5", step: "0.1", value: String(value),
      });
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
    const left = makeControl("Left endpoint a", model.get("a") ?? -1);
    const right = makeControl("Right endpoint b", model.get("b") ?? 2);
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      left.label,
      right.label,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Red is the interval secant. Green tangents have the same slope.",
      }),
    );
    const bounds = { xMin: -3, xMax: 3, yMin: -6, yMax: 7 };
    const { sx, sy } = drawAxes(plot, bounds);
    const linePath = (x, y, slope) =>
      `M ${sx(bounds.xMin)} ${sy(y + slope * (bounds.xMin - x))} ` +
      `L ${sx(bounds.xMax)} ${sy(y + slope * (bounds.xMax - x))}`;

    const update = () => {
      let a = Number(left.input.value);
      let b = Number(right.input.value);
      if (a >= b) {
        if (document.activeElement === left.input) a = b - 0.1;
        else b = a + 0.1;
      }
      left.input.value = String(a);
      right.input.value = String(b);
      left.output.textContent = a.toFixed(1);
      right.output.textContent = b.toFixed(1);
      const family = FAMILIES[select.value];
      const result = meanValuePoints(select.value, a, b);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(family.graphFn ?? family.fn, sx, sy, bounds.xMin, bounds.xMax),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-accent",
          d: linePath(a, family.fn(a), result.slope),
          "data-dynamic": "true",
        }),
      );
      for (const c of result.points) {
        plot.append(
          svgElement("path", {
            class: "cw-secondary",
            d: linePath(c, family.fn(c), result.slope),
            "data-dynamic": "true",
          }),
          svgElement("circle", {
            class: "cw-point", cx: sx(c), cy: sy(family.fn(c)), r: 6,
            "data-dynamic": "true",
          }),
        );
      }
      readout.innerHTML =
        `<strong>Average slope:</strong> ${result.slope.toFixed(3)}<br>` +
        (family.valid
          ? `<strong>MVT point${result.points.length === 1 ? "" : "s"}:</strong> ` +
            `${result.points.map((c) => `c = ${c.toFixed(3)}`).join(", ")}`
          : `<strong>The theorem does not apply:</strong> ${family.reason}`);
    };

    select.addEventListener("change", update, { signal });
    left.input.addEventListener("input", update, { signal });
    right.input.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
