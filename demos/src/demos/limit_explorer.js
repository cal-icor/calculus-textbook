import {
  drawAxes,
  htmlElement,
  makePlot,
  pathForFunction,
  svgElement,
  widgetStyles,
  withCleanup,
} from "../shared.js";

const EXAMPLES = {
  hole: {
    label: "Removable hole",
    fn: (x) => x + 1,
    leftLimit: 2,
    rightLimit: 2,
    point: 4,
    note: "Nearby values approach 2 even though f(1) = 4.",
  },
  jump: {
    label: "Jump",
    fn: (x) => (x < 1 ? 1 : 3),
    leftLimit: 1,
    rightLimit: 3,
    point: 3,
    note: "The one-sided limits disagree, so the two-sided limit does not exist.",
  },
  oscillation: {
    label: "Oscillation",
    fn: (x) => (x === 1 ? 0 : Math.sin(1 / (x - 1))),
    leftLimit: null,
    rightLimit: null,
    point: 0,
    note: "Outputs keep oscillating instead of settling near one value.",
  },
};

export function sampleNear(example, a = 1, distance = 0.1) {
  const selected = EXAMPLES[example] ?? EXAMPLES.hole;
  return {
    left: selected.fn(a - distance),
    right: selected.fn(a + distance),
  };
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .le-table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
        .le-table th, .le-table td { padding: .25rem .4rem; border-bottom: 1px solid var(--cw-border); text-align: right; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Limit explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const plot = makePlot(
      "Function behavior near x equals 1",
      "A graph and table show values approaching a selected point from both sides.",
    );
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Approach from both sides" }));
    const label = htmlElement("label", { text: "Example" });
    const select = htmlElement("select");
    for (const [value, example] of Object.entries(EXAMPLES)) {
      select.append(htmlElement("option", { value, text: example.label }));
    }
    select.value = EXAMPLES[model.get("example")] ? model.get("example") : "hole";
    label.append(select);

    const zoomOutput = htmlElement("output", { text: "0.500" });
    const zoom = htmlElement("input", {
      type: "range",
      min: "0",
      max: "4",
      step: "1",
      value: "1",
      "aria-label": "Approach distance",
    });
    const zoomLabel = htmlElement("label");
    zoomLabel.append(
      htmlElement("span", { class: "cw-row" }, [
        htmlElement("span", { text: "Closest table distance" }),
        zoomOutput,
      ]),
      zoom,
    );
    const table = htmlElement("table", { class: "le-table", "aria-label": "Values near x equals 1" });
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(label, zoomLabel, table, readout);

    const { sx, sy } = drawAxes(plot, { xMin: -1, xMax: 3, yMin: -2, yMax: 5 });
    const distances = [1, 0.5, 0.1, 0.01, 0.001];

    const update = () => {
      const example = EXAMPLES[select.value];
      const closestIndex = Number(zoom.value);
      const shown = distances.slice(0, closestIndex + 1);
      zoomOutput.textContent = shown.at(-1).toFixed(3);
      plot.querySelectorAll("[data-dynamic]").forEach((node) => node.remove());
      plot.append(svgElement("path", {
        class: "cw-curve",
        d: pathForFunction(example.fn, sx, sy, -1, 3, select.value === "oscillation" ? 0.003 : 0.02),
        "data-dynamic": "true",
      }));
      if (select.value === "hole") {
        plot.append(
          svgElement("circle", {
            cx: sx(1), cy: sy(2), r: 7, fill: "white",
            stroke: "var(--cw-blue)", "stroke-width": 3, "data-dynamic": "true",
          }),
          svgElement("circle", {
            class: "cw-point", cx: sx(1), cy: sy(example.point), r: 6,
            "data-dynamic": "true",
          }),
        );
      }
      table.replaceChildren();
      const header = htmlElement("tr");
      for (const text of ["x < 1", "f(x)", "x > 1", "f(x)"]) {
        header.append(htmlElement("th", { text }));
      }
      table.append(header);
      for (const distance of shown) {
        const values = sampleNear(select.value, 1, distance);
        const row = htmlElement("tr");
        for (const value of [
          1 - distance,
          values.left,
          1 + distance,
          values.right,
        ]) {
          row.append(htmlElement("td", { text: value.toFixed(4) }));
        }
        table.append(row);
      }
      const left = example.leftLimit === null ? "does not settle" : example.leftLimit;
      const right = example.rightLimit === null ? "does not settle" : example.rightLimit;
      readout.innerHTML =
        `<strong>From the left:</strong> ${left}<br>` +
        `<strong>From the right:</strong> ${right}<br>${example.note}`;
    };

    select.addEventListener("change", update, { signal });
    zoom.addEventListener("input", update, { signal });
    layout.append(plot, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
