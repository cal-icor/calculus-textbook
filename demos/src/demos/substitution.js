import { htmlElement, widgetStyles, withCleanup } from "../shared.js";

export const SUBSTITUTIONS = {
  cosine: {
    label: "∫₁² 2x cos(x²) dx",
    inner: "u = x²",
    differential: "du = 2x dx",
    transformed: "∫₁⁴ cos(u) du",
    bounds: "x = 1 → u = 1;  x = 2 → u = 4",
    result: "sin(4) − sin(1)",
  },
  power: {
    label: "∫₀¹ 3x²(1 + x³)⁴ dx",
    inner: "u = 1 + x³",
    differential: "du = 3x² dx",
    transformed: "∫₁² u⁴ du",
    bounds: "x = 0 → u = 1;  x = 1 → u = 2",
    result: "31/5",
  },
  logarithm: {
    label: "∫₁ᵉ [1 / (x(1 + ln x))] dx",
    inner: "u = 1 + ln x",
    differential: "du = (1/x) dx",
    transformed: "∫₁² (1/u) du",
    bounds: "x = 1 → u = 1;  x = e → u = 2",
    result: "ln 2",
  },
};

export function substitutionExample(name) {
  return SUBSTITUTIONS[name] ?? SUBSTITUTIONS.cosine;
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .su-map { display: grid; gap: .65rem; min-height: 270px; align-content: center; }
        .su-step { padding: .75rem 1rem; border: 1px solid var(--cw-border); border-radius: 8px; }
        .su-step strong { display: block; color: var(--cw-blue); margin-bottom: .2rem; }
        .su-arrow { color: var(--cw-muted); text-align: center; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Integration substitution explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const map = htmlElement("div", { class: "su-map" });
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Track the substitution" }));
    const label = htmlElement("label", { text: "Integral" });
    const select = htmlElement("select");
    for (const [value, example] of Object.entries(SUBSTITUTIONS)) {
      select.append(htmlElement("option", { value, text: example.label }));
    }
    select.value = SUBSTITUTIONS[model.get("example")] ? model.get("example") : "cosine";
    label.append(select);
    const reveal = htmlElement("button", { type: "button", text: "Reveal next step" });
    const reset = htmlElement("button", { type: "button", text: "Reset" });
    const readout = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      label,
      reveal,
      reset,
      readout,
      htmlElement("p", {
        class: "cw-help",
        text: "Each substitution must replace the inner expression, its differential, and definite bounds.",
      }),
    );
    let visibleSteps = 0;

    const update = () => {
      const example = substitutionExample(select.value);
      const steps = [
        ["Original integral", example.label],
        ["Choose the inner expression", example.inner],
        ["Match its differential", example.differential],
        ["Change the bounds", example.bounds],
        ["Rewrite entirely in u", example.transformed],
        ["Evaluate", example.result],
      ];
      map.replaceChildren();
      for (let index = 0; index <= visibleSteps; index += 1) {
        if (index > 0) map.append(htmlElement("div", { class: "su-arrow", text: "then" }));
        const [heading, text] = steps[index];
        map.append(htmlElement("div", { class: "su-step" }, [
          htmlElement("strong", { text: heading }),
          htmlElement("span", { text }),
        ]));
      }
      reveal.disabled = visibleSteps >= steps.length - 1;
      readout.textContent =
        visibleSteps < 2
          ? "Look for an inner expression whose derivative also appears."
          : visibleSteps < 4
            ? "Account for every factor before rewriting the integral."
            : "The transformed integral contains only u and u-bounds.";
    };

    select.addEventListener("change", () => {
      visibleSteps = 0;
      update();
    }, { signal });
    reveal.addEventListener("click", () => {
      visibleSteps = Math.min(5, visibleSteps + 1);
      update();
    }, { signal });
    reset.addEventListener("click", () => {
      visibleSteps = 0;
      update();
    }, { signal });
    layout.append(map, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
