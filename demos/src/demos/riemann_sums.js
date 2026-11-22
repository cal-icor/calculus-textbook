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
  quadratic: { label: "f(x) = x²", fn: (x) => x ** 2, a: 0, b: 2, exact: 8 / 3 },
  line: { label: "f(x) = x", fn: (x) => x, a: -2, b: 2, exact: 0 },
  sine: { label: "f(x) = sin(x)", fn: Math.sin, a: 0, b: 2 * Math.PI, exact: 0 },
};

export function riemannSum(family, method, n) {
  const selected = FAMILIES[family] ?? FAMILIES.quadratic;
  const count = Math.max(1, Math.round(Number(n)));
  const width = (selected.b - selected.a) / count;
  let sum = 0;
  for (let index = 0; index < count; index += 1) {
    const left = selected.a + index * width;
    const sample =
      method === "right" ? left + width : method === "midpoint" ? left + width / 2 : left;
    sum += selected.fn(sample) * width;
  }
  return sum;
}

export function riemannFormula(family, method, n) {
  const count = Math.max(1, Math.round(Number(n)));
  if (family === "quadratic") {
    if (method === "left") return `Σᵢ₌₀^${count - 1} (2i/${count})²(2/${count})`;
    if (method === "right") return `Σᵢ₌₁^${count} (2i/${count})²(2/${count})`;
    return `Σᵢ₌₁^${count} ((2i−1)/${count})²(2/${count})`;
  }
  if (family === "line") {
    const offset = method === "left" ? "i−1" : method === "right" ? "i" : "i−1/2";
    return `Σᵢ₌₁^${count} [−2 + 4(${offset})/${count}](4/${count})`;
  }
  const offset = method === "left" ? "i−1" : method === "right" ? "i" : "i−1/2";
  return `Σᵢ₌₁^${count} sin(2π(${offset})/${count})(2π/${count})`;
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .rs-rect { fill: color-mix(in srgb, var(--cw-red) 24%, transparent); stroke: var(--cw-red); stroke-width: 1; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Riemann sum explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Rectangles approximating a definite integral",
      "Left, right, or midpoint rectangle heights approximate signed area.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Refine a Riemann sum" }));
    const familyLabel = htmlElement("label", { text: "Function" });
    const familySelect = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      familySelect.append(htmlElement("option", { value, text: family.label }));
    }
    familySelect.value = FAMILIES[model.get("family")] ? model.get("family") : "quadratic";
    familyLabel.append(familySelect);
    const methodLabel = htmlElement("label", { text: "Sample point" });
    const methodSelect = htmlElement("select");
    for (const [value, text] of [["left", "Left endpoint"], ["right", "Right endpoint"], ["midpoint", "Midpoint"]]) {
      methodSelect.append(htmlElement("option", { value, text }));
    }
    methodSelect.value = ["left", "right", "midpoint"].includes(model.get("method"))
      ? model.get("method")
      : "midpoint";
    methodLabel.append(methodSelect);
    const nOutput = htmlElement("output");
    const nInput = htmlElement("input", {
      type: "range", min: "2", max: "40", step: "1", value: String(model.get("n") ?? 8),
    });
    const nLabel = htmlElement("label");
    nLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Rectangles n" }),
        nOutput,
      ]),
      nInput,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(familyLabel, methodLabel, nLabel, readout);
    const bounds = { xMin: -2.5, xMax: 6.5, yMin: -2.5, yMax: 4.5 };
    const { sx, sy } = drawAxes(plot, bounds);

    const update = () => {
      const family = FAMILIES[familySelect.value];
      const method = methodSelect.value;
      const n = Number(nInput.value);
      const width = (family.b - family.a) / n;
      nOutput.textContent = String(n);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      for (let index = 0; index < n; index += 1) {
        const left = family.a + index * width;
        const sample = method === "right" ? left + width : method === "midpoint" ? left + width / 2 : left;
        const height = family.fn(sample);
        plot.append(svgElement("rect", {
          class: "rs-rect",
          x: sx(left),
          y: height >= 0 ? sy(height) : sy(0),
          width: Math.max(0, sx(left + width) - sx(left)),
          height: Math.abs(sy(height) - sy(0)),
          "data-dynamic": "true",
        }));
      }
      plot.append(svgElement("path", {
        class: "cw-curve",
        d: pathForFunction(family.fn, sx, sy, family.a, family.b),
        "data-dynamic": "true",
      }));
      const sum = riemannSum(familySelect.value, method, n);
      readout.innerHTML =
        `<strong>Δx:</strong> ${width.toFixed(5)}<br>` +
        `<strong>Summation:</strong> ${riemannFormula(familySelect.value, method, n)}<br>` +
        `<strong>Numerical value:</strong> ${sum.toFixed(5)}<br>` +
        `<strong>Exact integral:</strong> ${family.exact.toFixed(5)}<br>` +
        `<strong>Error:</strong> ${Math.abs(sum - family.exact).toFixed(5)}`;
    };

    familySelect.addEventListener("change", update, { signal });
    methodSelect.addEventListener("change", update, { signal });
    nInput.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
