import {
  htmlElement,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

export function circlePoint(radius, angleDegrees) {
  const angle = (Number(angleDegrees) * Math.PI) / 180;
  const x = Number(radius) * Math.cos(angle);
  const y = Number(radius) * Math.sin(angle);
  const slope = Math.abs(y) < 1e-10 ? Number.NaN : -x / y;
  return { x, y, slope };
}

const format = (value) => {
  if (!Number.isFinite(value)) return "undefined (vertical tangent)";
  const clean = Math.abs(value) < 0.0005 ? 0 : value;
  return clean.toFixed(3);
};

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .ic-plot { width: 100%; min-height: 340px; }
        .ic-circle { fill: color-mix(in srgb, var(--cw-blue) 8%, transparent); stroke: var(--cw-blue); stroke-width: 3; }
        .ic-radius { stroke: var(--cw-red); stroke-width: 3; }
        .ic-tangent { stroke: var(--cw-green); stroke-width: 3; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Implicit circle tangent explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const svg = svgElement("svg", {
      class: "ic-plot",
      viewBox: "0 0 420 360",
      role: "img",
      "aria-label": "Circle with a movable point, radius, and tangent line",
    });
    const centerX = 210;
    const centerY = 180;
    const plotRadius = 135;
    svg.append(
      svgElement("line", { class: "cw-axis", x1: 35, y1: centerY, x2: 385, y2: centerY }),
      svgElement("line", { class: "cw-axis", x1: centerX, y1: 15, x2: centerX, y2: 345 }),
      svgElement("circle", { class: "ic-circle", cx: centerX, cy: centerY, r: plotRadius }),
    );
    const radiusLine = svgElement("line", {
      class: "ic-radius",
      x1: centerX,
      y1: centerY,
    });
    const tangentLine = svgElement("line", { class: "ic-tangent" });
    const point = svgElement("circle", { class: "cw-point", r: 8 });
    svg.append(radiusLine, tangentLine, point);

    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Move along x² + y² = r²" }));
    const angleOutput = htmlElement("output");
    const angle = htmlElement("input", {
      type: "range",
      min: "0",
      max: "360",
      step: "1",
      value: String(model.get("angle") ?? 45),
    });
    const angleLabel = htmlElement("label");
    angleLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Position angle" }),
        angleOutput,
      ]),
      angle,
    );
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      angleLabel,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Red is the radius. Green is the tangent found from dy/dx = −x/y.",
      }),
    );

    const update = () => {
      const radius = Number(model.get("radius")) || 5;
      const angleDegrees = Number(angle.value);
      const values = circlePoint(radius, angleDegrees);
      const scale = plotRadius / radius;
      const px = centerX + values.x * scale;
      const py = centerY - values.y * scale;
      angleOutput.textContent = `${angleDegrees}°`;
      radiusLine.setAttribute("x2", px);
      radiusLine.setAttribute("y2", py);
      point.setAttribute("cx", px);
      point.setAttribute("cy", py);

      const tangentDirectionX = Number.isFinite(values.slope) ? 1 : 0;
      const tangentDirectionY = Number.isFinite(values.slope) ? -values.slope : 1;
      const magnitude = Math.hypot(tangentDirectionX, tangentDirectionY);
      const dx = (70 * tangentDirectionX) / magnitude;
      const dy = (70 * tangentDirectionY) / magnitude;
      tangentLine.setAttribute("x1", px - dx);
      tangentLine.setAttribute("y1", py - dy);
      tangentLine.setAttribute("x2", px + dx);
      tangentLine.setAttribute("y2", py + dy);

      readout.innerHTML =
        `<strong>Point:</strong> (${format(values.x)}, ${format(values.y)})<br>` +
        `<strong>Implicit derivative:</strong> dy/dx = −x/y = ${format(values.slope)}`;
    };

    angle.addEventListener("input", update, { signal });
    layout.append(svg, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
