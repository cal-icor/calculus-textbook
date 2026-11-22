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
  quadratic: { label: "f(x) = x²", fn: (x) => x ** 2, derivative: (x) => 2 * x },
  cubic: { label: "f(x) = x³ / 3", fn: (x) => x ** 3 / 3, derivative: (x) => x ** 2 },
  sine: { label: "f(x) = sin(x)", fn: Math.sin, derivative: Math.cos },
  absolute: {
    label: "f(x) = |x|",
    fn: Math.abs,
    derivative: (x) => (x === 0 ? Number.NaN : Math.sign(x)),
  },
};

export function secantSlope(family, a, h) {
  const selected = FAMILIES[family] ?? FAMILIES.quadratic;
  if (h === 0) return selected.derivative(a);
  return (selected.fn(a + h) - selected.fn(a)) / h;
}

function control(labelText, min, max, step, value) {
  const output = htmlElement("output");
  const input = htmlElement("input", {
    type: "range",
    min: String(min),
    max: String(max),
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
      "aria-label": "Secant to tangent explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Secant and tangent lines",
      "Two points determine a secant line that approaches a tangent line as h approaches zero.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Shrink the interval h" }));
    const familyLabel = htmlElement("label", { text: "Function" });
    const select = htmlElement("select");
    for (const [value, family] of Object.entries(FAMILIES)) {
      select.append(htmlElement("option", { value, text: family.label }));
    }
    select.value = FAMILIES[model.get("family")] ? model.get("family") : "quadratic";
    familyLabel.append(select);
    const aControl = control("Base input a", -2, 2, 0.1, model.get("a") ?? 1);
    const hControl = control("Interval h", -2, 2, 0.05, model.get("h") ?? 2);
    const animate = htmlElement("button", { type: "button", text: "Animate h → 0" });
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      familyLabel,
      aControl.label,
      hControl.label,
      animate,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Red is the secant line; green is the limiting tangent when it exists.",
      }),
    );
    const bounds = { xMin: -3, xMax: 3, yMin: -3, yMax: 6 };
    const { sx, sy } = drawAxes(plot, bounds);

    const linePath = (x, y, slope) =>
      `M ${sx(bounds.xMin)} ${sy(y + slope * (bounds.xMin - x))} ` +
      `L ${sx(bounds.xMax)} ${sy(y + slope * (bounds.xMax - x))}`;

    const update = () => {
      const family = FAMILIES[select.value];
      const a = Number(aControl.input.value);
      const h = Number(hControl.input.value);
      const b = a + h;
      const fa = family.fn(a);
      const fb = family.fn(b);
      const secant = secantSlope(select.value, a, h);
      const tangent = family.derivative(a);
      aControl.output.textContent = a.toFixed(1);
      hControl.output.textContent = h.toFixed(2);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(
        svgElement("path", {
          class: "cw-curve",
          d: pathForFunction(family.fn, sx, sy, bounds.xMin, bounds.xMax),
          "data-dynamic": "true",
        }),
        svgElement("path", {
          class: "cw-accent",
          d: linePath(a, fa, secant),
          "data-dynamic": "true",
        }),
      );
      if (Number.isFinite(tangent)) {
        plot.append(svgElement("path", {
          class: "cw-secondary",
          d: linePath(a, fa, tangent),
          "data-dynamic": "true",
        }));
      }
      for (const [x, y] of [[a, fa], [b, fb]]) {
        plot.append(svgElement("circle", {
          class: "cw-point",
          cx: sx(x),
          cy: sy(y),
          r: 6,
          "data-dynamic": "true",
        }));
      }
      readout.innerHTML =
        `<strong>Difference quotient:</strong> [f(a + h) − f(a)] / h<br>` +
        `<strong>${h === 0 ? "Limit as h → 0" : `At h = ${h.toFixed(3)}`}:</strong> ${secant.toFixed(3)}<br>` +
        `<strong>Tangent slope:</strong> ${Number.isFinite(tangent) ? tangent.toFixed(3) : "does not exist"}`;
    };

    select.addEventListener("change", update, { signal });
    aControl.input.addEventListener("input", update, { signal });
    hControl.input.addEventListener("input", update, { signal });
    let animation = null;
    animate.addEventListener("click", () => {
      if (animation !== null) clearInterval(animation);
      if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        hControl.input.value = "0";
        update();
        return;
      }
      let frame = 0;
      const start = Math.abs(Number(hControl.input.value)) < 0.1
        ? 2
        : Number(hControl.input.value);
      animate.disabled = true;
      animation = setInterval(() => {
        frame += 1;
        const progress = frame / 40;
        hControl.input.value = String(start * (1 - progress) ** 2);
        update();
        if (frame >= 40) {
          clearInterval(animation);
          animation = null;
          hControl.input.value = "0";
          animate.disabled = false;
          update();
        }
      }, 35);
    }, { signal });
    signal.addEventListener("abort", () => {
      if (animation !== null) clearInterval(animation);
    }, { once: true });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
