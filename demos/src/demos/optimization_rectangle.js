import { htmlElement, svgElement, widgetStyles, withCleanup } from "../shared.js";

export function rectangleModel(perimeter, width) {
  const P = Number(perimeter);
  const w = Number(width);
  const length = P / 2 - w;
  const area = w * length;
  const maximizingWidth = P / 4;
  return {
    length,
    area,
    maximizingWidth,
    maximumArea: maximizingWidth ** 2,
  };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .or-plot { width: 100%; min-height: 350px; }
        .or-rectangle { fill: color-mix(in srgb, var(--cw-blue) 16%, transparent); stroke: var(--cw-blue); stroke-width: 3; }
        .or-objective { fill: none; stroke: var(--cw-green); stroke-width: 3; }
        .or-guide { stroke: var(--cw-red); stroke-width: 1.5; stroke-dasharray: 4 3; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Constrained rectangle optimization explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "or-plot", viewBox: "0 0 500 350", role: "img",
      "aria-label": "A rectangle with fixed perimeter and its area objective graph",
    });
    const rectangle = svgElement("rect", { class: "or-rectangle" });
    const widthLabel = svgElement("text", { class: "cw-label" });
    const lengthLabel = svgElement("text", { class: "cw-label" });
    const axisX = svgElement("line", { class: "cw-axis", x1: 275, y1: 300, x2: 475, y2: 300 });
    const axisY = svgElement("line", { class: "cw-axis", x1: 285, y1: 325, x2: 285, y2: 35 });
    const curve = svgElement("path", { class: "or-objective" });
    const guide = svgElement("line", { class: "or-guide" });
    const point = svgElement("circle", { class: "cw-point", r: 6 });
    const leftTitle = svgElement("text", { class: "cw-label", x: 35, y: 25 });
    leftTitle.textContent = "allowed rectangle";
    const rightTitle = svgElement("text", { class: "cw-label", x: 300, y: 25 });
    rightTitle.textContent = "objective A(w)";
    svg.append(
      rectangle, widthLabel, lengthLabel, axisX, axisY, curve, guide, point,
      leftTitle, rightTitle,
    );

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Maximize area with fixed perimeter" }));
    const makeControl = (text, min, max, step, value) => {
      const output = htmlElement("output");
      const input = htmlElement("input", {
        type: "range", min: String(min), max: String(max), step: String(step), value: String(value),
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
    const perimeter = makeControl("Fixed perimeter P", 20, 80, 2, model.get("perimeter") ?? 40);
    const width = makeControl("Chosen width w", 0.5, 19.5, 0.5, model.get("width") ?? 6);
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      perimeter.label,
      width.label,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "The constraint determines the length. The red point tracks the resulting area.",
      }),
    );

    const update = () => {
      const P = Number(perimeter.input.value);
      width.input.max = String(P / 2 - 0.5);
      if (Number(width.input.value) >= P / 2) width.input.value = String(P / 2 - 0.5);
      const w = Number(width.input.value);
      const result = rectangleModel(P, w);
      perimeter.output.textContent = P.toFixed(0);
      width.output.textContent = w.toFixed(1);

      const maxSide = P / 2;
      const drawingScale = 170 / maxSide;
      const rectangleWidth = Math.max(3, w * drawingScale);
      const rectangleHeight = Math.max(3, result.length * drawingScale);
      rectangle.setAttribute("x", 145 - rectangleWidth / 2);
      rectangle.setAttribute("y", 175 - rectangleHeight / 2);
      rectangle.setAttribute("width", rectangleWidth);
      rectangle.setAttribute("height", rectangleHeight);
      widthLabel.setAttribute("x", 145);
      widthLabel.setAttribute("y", 190 + rectangleHeight / 2);
      widthLabel.setAttribute("text-anchor", "middle");
      widthLabel.textContent = `w = ${w.toFixed(1)}`;
      lengthLabel.setAttribute("x", 150 + rectangleWidth / 2);
      lengthLabel.setAttribute("y", 175);
      lengthLabel.textContent = `ℓ = ${result.length.toFixed(1)}`;

      const sx = (value) => 285 + (value / maxSide) * 175;
      const sy = (value) => 300 - (value / result.maximumArea) * 245;
      const parts = [];
      for (let index = 0; index <= 100; index += 1) {
        const candidate = (maxSide * index) / 100;
        const area = candidate * (maxSide - candidate);
        parts.push(`${index ? "L" : "M"} ${sx(candidate)} ${sy(area)}`);
      }
      curve.setAttribute("d", parts.join(" "));
      point.setAttribute("cx", sx(w));
      point.setAttribute("cy", sy(result.area));
      guide.setAttribute("x1", sx(result.maximizingWidth));
      guide.setAttribute("y1", sy(0));
      guide.setAttribute("x2", sx(result.maximizingWidth));
      guide.setAttribute("y2", sy(result.maximumArea));
      readout.innerHTML =
        `<strong>Constraint:</strong> ℓ = P/2 − w = ${result.length.toFixed(1)}<br>` +
        `<strong>Current area:</strong> ${result.area.toFixed(2)}<br>` +
        `<strong>Maximum:</strong> ${result.maximumArea.toFixed(2)} at w = ℓ = ${result.maximizingWidth.toFixed(1)}`;
    };

    perimeter.input.addEventListener("input", update, { signal });
    width.input.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
