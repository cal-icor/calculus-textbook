import { htmlElement, widgetStyles, withCleanup } from "../shared.js";

export const RULE_EXAMPLES = {
  power: {
    label: "Power: 4x³",
    rule: "Power rule",
    structure: ["coefficient 4", "power x³"],
    derivative: "12x²",
    explanation: "Keep the coefficient, multiply by the exponent, then reduce the exponent by one.",
  },
  product: {
    label: "Product: x² sin(x)",
    rule: "Product rule",
    structure: ["first factor x²", "second factor sin(x)"],
    derivative: "2x sin(x) + x² cos(x)",
    explanation: "Differentiate one factor at a time while leaving the other unchanged.",
  },
  quotient: {
    label: "Quotient: sin(x) / x",
    rule: "Quotient rule",
    structure: ["numerator sin(x)", "denominator x"],
    derivative: "[x cos(x) − sin(x)] / x²",
    explanation: "Use denominator times derivative of numerator minus numerator times derivative of denominator.",
  },
  chain: {
    label: "Composition: sin(x²)",
    rule: "Chain rule",
    structure: [
      { heading: "Outer function", text: "y = sin(u)", derivative: "dy/du = cos(u)" },
      { heading: "Inner function", text: "u = x²", derivative: "du/dx = 2x" },
    ],
    derivative: "cos(x²) · 2x",
    explanation: "Differentiate the outer function at the inner input, then multiply by the inner derivative.",
  },
  deepChain: {
    label: "Three layers: e^(sin(x²))",
    rule: "Chain rule twice",
    structure: [
      { heading: "Outer function", text: "y = eᵘ", derivative: "dy/du = eᵘ" },
      { heading: "Middle function", text: "u = sin(v)", derivative: "du/dv = cos(v)" },
      { heading: "Inner function", text: "v = x²", derivative: "dv/dx = 2x" },
    ],
    derivative: "e^(sin(x²)) · cos(x²) · 2x",
    explanation: "Each layer contributes one derivative factor, evaluated at the expression inside it.",
  },
  nested: {
    label: "Nested rules: x² sin(3x)",
    rule: "Product rule + chain rule",
    structure: ["product of x² and sin(3x)", "inside sin: 3x"],
    derivative: "2x sin(3x) + 3x² cos(3x)",
    explanation: "The outer product rule contains a chain rule when the sine factor is differentiated.",
  },
};

export function derivativeFor(example) {
  return (RULE_EXAMPLES[example] ?? RULE_EXAMPLES.chain).derivative;
}

function render({ model, el }) {
  return withCleanup(el, (signal) => {
    const style = htmlElement("style", {
      text: `${widgetStyles}
        .dr-map { display: grid; gap: .7rem; align-content: center; min-height: 280px; }
        .dr-expression { font-size: 1.45rem; font-weight: 750; text-align: center; }
        .dr-layer { padding: .75rem 1rem; border: 1px solid var(--cw-border); border-radius: 8px; }
        .dr-layer strong { display: block; color: var(--cw-blue); }
        .dr-arrow { text-align: center; color: var(--cw-muted); }
        .dr-answer { padding: 1rem; border-radius: 8px; background: var(--cw-blue-soft); font-size: 1.1rem; }
      `,
    });
    const shell = htmlElement("section", {
      class: "calc-widget",
      "aria-label": "Derivative rule explorer",
    });
    const layout = htmlElement("div", { class: "cw-layout" });
    const map = htmlElement("div", { class: "dr-map" });
    const panel = htmlElement("div", { class: "cw-panel" });
    panel.append(htmlElement("h3", { text: "Read structure before differentiating" }));
    const label = htmlElement("label", { text: "Expression" });
    const select = htmlElement("select");
    for (const [value, example] of Object.entries(RULE_EXAMPLES)) {
      select.append(htmlElement("option", { value, text: example.label }));
    }
    select.value = RULE_EXAMPLES[model.get("example")] ? model.get("example") : "chain";
    label.append(select);
    const reveal = htmlElement("button", { type: "button", text: "Reveal derivative" });
    const explanation = htmlElement("div", { class: "cw-readout", "aria-live": "polite" });
    panel.append(
      label,
      reveal,
      explanation,
      htmlElement("p", {
        class: "cw-help",
        text: "Changing the expression hides the result so you can identify the rule first.",
      }),
    );

    let revealed = false;
    const update = () => {
      const example = RULE_EXAMPLES[select.value];
      map.replaceChildren(
        htmlElement("div", { class: "dr-expression", text: example.label.split(": ")[1] }),
      );
      for (const [index, layer] of example.structure.entries()) {
        const structured = typeof layer === "object";
        map.append(
          htmlElement("div", { class: "dr-arrow", text: index === 0 ? "outer structure" : "then inspect inside" }),
          htmlElement("div", { class: "dr-layer" }, [
            htmlElement("strong", {
              text: structured ? layer.heading : index === 0 ? example.rule : "Nested part",
            }),
            htmlElement("span", { text: structured ? `${layer.text}; ${layer.derivative}` : layer }),
          ]),
        );
      }
      if (revealed) {
        map.append(
          htmlElement("div", { class: "dr-arrow", text: "differentiate" }),
          htmlElement("div", { class: "dr-answer", text: `Derivative: ${example.derivative}` }),
        );
      }
      reveal.textContent = revealed ? "Hide derivative" : "Reveal derivative";
      explanation.textContent = revealed
        ? example.explanation
        : `Start with: ${
          typeof example.structure[0] === "object"
            ? example.structure[0].text
            : example.structure[0]
        }. Which rule matches that structure?`;
    };

    select.addEventListener("change", () => {
      revealed = false;
      update();
    }, { signal });
    reveal.addEventListener("click", () => {
      revealed = !revealed;
      update();
    }, { signal });
    layout.append(map, panel);
    shell.append(layout);
    el.append(style, shell);
    update();
  });
}

export default { render };
