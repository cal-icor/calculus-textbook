import {
  htmlElement,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

export function ladderRates(length, x, dxdt) {
  const L = Number(length);
  const horizontal = Number(x);
  const horizontalRate = Number(dxdt);
  const y = Math.sqrt(Math.max(0, L ** 2 - horizontal ** 2));
  const dydt = y === 0 ? Number.NEGATIVE_INFINITY : -(horizontal / y) * horizontalRate;
  return { y, dydt };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .rr-plot { width: 100%; min-height: 340px; }
        .rr-wall, .rr-ground { stroke: #8190a5; stroke-width: 5; }
        .rr-ladder { stroke: var(--cw-blue); stroke-width: 9; stroke-linecap: round; }
        .rr-motion { stroke: var(--cw-red); stroke-width: 3; marker-end: url(#rr-arrow); }
        .rr-measure { stroke: var(--cw-green); stroke-width: 2; stroke-dasharray: 5 4; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Sliding ladder related rates explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "rr-plot",
      viewBox: "0 0 440 350",
      role: "img",
      "aria-label": "A fixed-length ladder sliding down a wall",
    });
    const definitions = svgElement("defs");
    const marker = svgElement("marker", {
      id: "rr-arrow",
      viewBox: "0 0 10 10",
      refX: "9",
      refY: "5",
      markerWidth: "7",
      markerHeight: "7",
      orient: "auto-start-reverse",
    });
    marker.append(svgElement("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "var(--cw-red)" }));
    definitions.append(marker);
    svg.append(
      definitions,
      svgElement("line", { class: "rr-wall", x1: 70, y1: 25, x2: 70, y2: 305 }),
      svgElement("line", { class: "rr-ground", x1: 65, y1: 305, x2: 410, y2: 305 }),
    );
    const ladder = svgElement("line", { class: "rr-ladder" });
    const horizontalMeasure = svgElement("line", { class: "rr-measure" });
    const verticalMeasure = svgElement("line", { class: "rr-measure" });
    const horizontalArrow = svgElement("line", { class: "rr-motion" });
    const verticalArrow = svgElement("line", { class: "rr-motion" });
    const xLabel = svgElement("text", { class: "cw-label" });
    const yLabel = svgElement("text", { class: "cw-label" });
    svg.append(
      horizontalMeasure,
      verticalMeasure,
      ladder,
      horizontalArrow,
      verticalArrow,
      xLabel,
      yLabel,
    );

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Slide a fixed-length ladder" }));
    const xOutput = htmlElement("output");
    const xSlider = htmlElement("input", {
      type: "range",
      min: "1",
      max: "9.5",
      step: "0.1",
      value: String(model.get("x") ?? 6),
    });
    const xControl = htmlElement("label");
    xControl.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Foot distance x" }),
        xOutput,
      ]),
      xSlider,
    );
    const rateOutput = htmlElement("output");
    const rateSlider = htmlElement("input", {
      type: "range",
      min: "0.2",
      max: "2",
      step: "0.1",
      value: String(model.get("dxdt") ?? 1),
    });
    const rateControl = htmlElement("label");
    rateControl.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Foot speed dx/dt" }),
        rateOutput,
      ]),
      rateSlider,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      xControl,
      rateControl,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Arrow lengths show relative speeds. The ladder length remains 10 units.",
      }),
    );

    const update = () => {
      const length = Number(model.get("length")) || 10;
      xSlider.max = String(length * 0.95);
      const x = Number(xSlider.value);
      const dxdt = Number(rateSlider.value);
      const { y, dydt } = ladderRates(length, x, dxdt);
      const scale = 23;
      const footX = 70 + x * scale;
      const topY = 305 - y * scale;
      xOutput.textContent = x.toFixed(1);
      rateOutput.textContent = `${dxdt.toFixed(1)} units/s`;
      ladder.setAttribute("x1", 70);
      ladder.setAttribute("y1", topY);
      ladder.setAttribute("x2", footX);
      ladder.setAttribute("y2", 305);
      horizontalMeasure.setAttribute("x1", 70);
      horizontalMeasure.setAttribute("y1", 325);
      horizontalMeasure.setAttribute("x2", footX);
      horizontalMeasure.setAttribute("y2", 325);
      verticalMeasure.setAttribute("x1", 50);
      verticalMeasure.setAttribute("y1", 305);
      verticalMeasure.setAttribute("x2", 50);
      verticalMeasure.setAttribute("y2", topY);
      horizontalArrow.setAttribute("x1", footX - 35);
      horizontalArrow.setAttribute("y1", 285);
      horizontalArrow.setAttribute("x2", footX - 35 + 30 * dxdt);
      horizontalArrow.setAttribute("y2", 285);
      verticalArrow.setAttribute("x1", 90);
      verticalArrow.setAttribute("y1", topY);
      verticalArrow.setAttribute("x2", 90);
      verticalArrow.setAttribute("y2", Math.min(300, topY + 18 * Math.abs(dydt)));
      xLabel.setAttribute("x", (70 + footX) / 2);
      xLabel.setAttribute("y", 343);
      xLabel.textContent = `x = ${x.toFixed(1)}`;
      yLabel.setAttribute("x", 5);
      yLabel.setAttribute("y", (305 + topY) / 2);
      yLabel.textContent = `y = ${y.toFixed(2)}`;
      readout.innerHTML =
        `<strong>Height:</strong> y = ${y.toFixed(3)} units<br>` +
        `<strong>Top rate:</strong> dy/dt = ${dydt.toFixed(3)} units/s`;
    };

    xSlider.addEventListener("input", update, { signal });
    rateSlider.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
