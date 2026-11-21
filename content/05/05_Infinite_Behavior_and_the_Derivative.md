(infinite-behavior-and-derivative)=
# 5. Infinite Behavior and the Derivative

Limits describe behavior both near a finite input and far along a graph. They
also let us turn the secant-line approximation from section 3 into an exact
definition of instantaneous rate of change.

## 5.1 Limits at infinity

The notation

$$
\lim_{x\to\infty}f(x)=L
$$

describes the end behavior of $f$: outputs approach $L$ as inputs grow
without bound. The line $y=L$ is then a horizontal asymptote.

For a rational function, divide numerator and denominator by the highest
power of $x$ present. For example,

$$
\lim_{x\to\infty}\frac{3x^2-x}{2x^2+5}
=\lim_{x\to\infty}\frac{3-\frac1x}{2+\frac5{x^2}}
=\frac32.
$$

## 5.2 Infinite limits

The statement

$$
\lim_{x\to a^+}f(x)=\infty
$$

means that $f(x)$ grows beyond every finite bound as $x$ approaches $a$ from
the right. This does **not** say that infinity is a function value.

If outputs grow without bound near $x=a$, the line $x=a$ is a vertical
asymptote. One-sided limits must be checked because the two sides may have
different signs.

## 5.3 The derivative as a limit

The derivative of $f$ at $a$ is

$$
f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h},
$$

provided this limit exists. The quotient is an average rate of change over an
interval of width $h$; its limit is the instantaneous rate of change.

Geometrically, the same number is the slope of the tangent line. Move the
second point toward the first and compare the secant slope with the limiting
tangent slope.

```{anywidget} ../_widgets/secant_tangent.js
{"family": "quadratic", "a": 1, "h": 2}
```

### Read the figure

1. Approach $h=0$ from positive and negative values. Do the secant slopes
   approach the same number?
2. Move $a$ along the quadratic. Where is the tangent horizontal?
3. Choose the absolute-value example and place $a=0$. What happens to the
   secant slopes from the two sides?

## 5.4 Units and interpretation

If $s(t)$ is measured in meters and $t$ in seconds, then

$$
s'(t)
$$

is measured in meters per second. Derivative units are always “output units
per input unit.”

The sign also carries meaning:

- $f'(a)>0$: outputs are increasing near $a$;
- $f'(a)<0$: outputs are decreasing near $a$;
- $f'(a)=0$: the tangent is horizontal, though the point need not be an
  extremum.

## 5.5 Differentiability and continuity

If $f$ is differentiable at $a$, then $f$ is continuous at $a$. The converse
is false: $f(x)=|x|$ is continuous at $0$, but its left and right tangent
slopes disagree there.

Corners, cusps, vertical tangents, and discontinuities are common reasons a
derivative can fail to exist.

## 5.6 What to carry forward

The derivative is one idea with several interpretations: a limit of average
rates, a tangent slope, and an instantaneous rate with units. The rules in
the next section make this limit practical to compute.
