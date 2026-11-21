import { describe, expect, it } from "vitest";

import { accumulationValue } from "../src/demos/accumulation.js";
import { antiderivativeValue } from "../src/demos/antiderivative_family.js";
import { derivativeFor } from "../src/demos/derivative_rules.js";
import { derivativeBehavior } from "../src/demos/derivative_signs.js";
import { circlePoint } from "../src/demos/implicit_circle.js";
import { bandContains } from "../src/demos/epsilon_delta.js";
import { transformedValue } from "../src/demos/function_transformations.js";
import { inversePoint } from "../src/demos/inverse_explorer.js";
import { ladderRates } from "../src/demos/related_rates_ladder.js";
import { sampleNear } from "../src/demos/limit_explorer.js";
import { meanValuePoints } from "../src/demos/mean_value.js";
import { riemannSum } from "../src/demos/riemann_sums.js";
import { secantSlope } from "../src/demos/secant_tangent.js";
import { diskArea } from "../src/demos/volume_slices.js";

describe("function transformations", () => {
  it("applies shifts and scaling in the documented order", () => {
    expect(transformedValue("quadratic", 3, { a: 2, b: 1, h: 1, k: -1 })).toBe(7);
  });
});

describe("inverse explorer", () => {
  it("reflects points by swapping coordinates", () => {
    expect(inversePoint("linear", 2)).toEqual({
      original: [2, 5],
      reflected: [5, 2],
    });
  });
});

describe("limit explorer", () => {
  it("samples both sides of a removable hole", () => {
    expect(sampleNear("hole", 1, 0.01)).toEqual({
      left: 1.99,
      right: 2.01,
    });
  });
});

describe("epsilon delta explorer", () => {
  it("accepts and rejects delta windows for a linear limit", () => {
    expect(bandContains("linear", 1, 0.4)).toBe(true);
    expect(bandContains("linear", 1, 0.6)).toBe(false);
  });

  it("cannot fit a jump into a narrow band", () => {
    expect(bandContains("jump", 0.5, 0.01)).toBe(false);
  });
});

describe("secant tangent explorer", () => {
  it("approaches the quadratic tangent slope", () => {
    expect(secantSlope("quadratic", 1, 0.0001)).toBeCloseTo(2, 3);
  });

  it("shows conflicting one-sided slopes at the absolute-value corner", () => {
    expect(secantSlope("absolute", 0, 0.1)).toBe(1);
    expect(secantSlope("absolute", 0, -0.1)).toBe(-1);
  });
});

describe("derivative rules explorer", () => {
  it("returns the chain-rule example", () => {
    expect(derivativeFor("chain")).toBe("cos(x²) · 2x");
  });
});

describe("implicit differentiation explorer", () => {
  it("computes a circle point and tangent slope", () => {
    const point = circlePoint(5, 45);
    expect(point.x).toBeCloseTo(5 / Math.sqrt(2));
    expect(point.y).toBeCloseTo(5 / Math.sqrt(2));
    expect(point.slope).toBeCloseTo(-1);
  });
});

describe("related rates explorer", () => {
  it("computes the 6-8-10 ladder snapshot", () => {
    expect(ladderRates(10, 6, 1)).toEqual({ y: 8, dydt: -0.75 });
  });
});

describe("Mean Value Theorem explorer", () => {
  it("finds the quadratic midpoint", () => {
    const result = meanValuePoints("quadratic", -1, 2);
    expect(result.slope).toBe(1);
    expect(result.points).toEqual([0.5]);
  });
});

describe("derivative signs explorer", () => {
  it("identifies increasing and concave-up behavior", () => {
    expect(derivativeBehavior("cubic", 2)).toMatchObject({
      direction: "increasing",
      concavity: "concave up",
    });
  });
});

describe("antiderivative family explorer", () => {
  it("applies the integration constant as a vertical shift", () => {
    expect(antiderivativeValue("linear", 2, 3)).toBe(7);
  });
});

describe("Riemann sum explorer", () => {
  it("approaches the quadratic integral with midpoint sums", () => {
    expect(riemannSum("quadratic", "midpoint", 1000)).toBeCloseTo(8 / 3, 5);
  });
});

describe("accumulation explorer", () => {
  it("evaluates accumulated signed area", () => {
    expect(accumulationValue("linear", 2)).toBe(0);
    expect(accumulationValue("sine", Math.PI)).toBeCloseTo(2);
  });
});

describe("volume slice explorer", () => {
  it("computes disk area from the curve height", () => {
    expect(diskArea("line", 2)).toBeCloseTo(4 * Math.PI);
  });
});
