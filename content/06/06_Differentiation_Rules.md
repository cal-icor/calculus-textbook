(differentiation-rules)=
# 6. Differentiation Rules

The limit definition explains what a derivative means. Differentiation rules
let us compute derivatives without rebuilding that limit each time. The main
skill is recognizing the structure of an expression before choosing a rule.

## 6.1 Constant and power rules

For a constant $c$ and suitable real exponents $n$,

$$
\frac{d}{dx}c=0,
\qquad
\frac{d}{dx}x^n=nx^{n-1}.
$$

Together with linearity,

$$
\frac{d}{dx}\bigl(af(x)+bg(x)\bigr)
=af'(x)+bg'(x),
$$

these rules differentiate every polynomial term by term.

**Example.**

$$
\frac{d}{dx}(4x^3-5x+7)=12x^2-5.
$$

## 6.2 Exponential and trigonometric derivatives

The natural exponential is distinguished by

$$
\frac{d}{dx}e^x=e^x.
$$

For a general base $b>0$,

$$
\frac{d}{dx}b^x=b^x\ln b.
$$

When angles are measured in radians,

$$
\frac{d}{dx}\sin x=\cos x,
\qquad
\frac{d}{dx}\cos x=-\sin x.
$$

The unit circle explains the phase shift: cosine gives the horizontal rate
of change of sine.

## 6.3 Product and quotient rules

The derivative of a product is not generally the product of the derivatives:

$$
(fg)'=f'g+fg'.
$$

To see why there are two terms, picture a rectangle with side lengths $f$
and $g$. When $x$ changes, one thin strip comes from the change in $f$ and
another from the change in $g$:

$$
\Delta(fg)\approx g\,\Delta f+f\,\Delta g.
$$

The tiny corner $\Delta f\,\Delta g$ becomes negligible after division by
$\Delta x$ and taking the limit. This leaves $f'g+fg'$: each term records one
factor changing while the other supplies the current scale.

For a quotient with $g(x)\ne0$,

$$
\left(\frac{f}{g}\right)'
=\frac{f'g-fg'}{g^2}.
$$

Each rule includes terms that account for both changing factors.

## 6.4 The chain rule

For a composition $y=f(g(x))$,

$$
\frac{dy}{dx}=f'(g(x))g'(x).
$$

The rule has two factors because a change in $x$ passes through two stages.
First, $x$ changes the inner quantity $u=g(x)$. Then the change in $u$
changes the output $y=f(u)$. For small changes,

$$
\frac{\Delta y}{\Delta x}
\approx
\frac{\Delta y}{\Delta u}\frac{\Delta u}{\Delta x}.
$$

Taking limits gives

$$
\frac{dy}{dx}=\frac{dy}{du}\frac{du}{dx}.
$$

This notation is a reminder of the two rates being multiplied, not ordinary
fraction cancellation.

To apply the rule, name the layers:

1. set the inner expression equal to $u$;
2. differentiate the outer function with respect to $u$;
3. replace $u$ with the original inner expression; and
4. multiply by $du/dx$.

**Example.**

$$
\frac{d}{dx}\sin(x^2)
=\cos(x^2)\cdot2x.
$$

Here $u=x^2$ and $y=\sin u$. The factor $\cos(x^2)$ measures how sine responds
to a change in its input; the factor $2x$ measures how quickly that input is
changing.

```{warning}
Stopping at $\cos(x^2)$ differentiates only the outer layer. The missing
factor $2x$ is the rate at which the inner input changes.
```

The explorer below emphasizes expression structure. Choose a form, inspect
its layers, and reveal the corresponding derivative rule.

```{anywidget} ../_widgets/derivative_rules.js
{"example": "chain"}
```

### Read the figure

1. In a product, identify which term records the change in the first factor
   and which records the change in the second.
2. In a composition, name the outer and inner functions before revealing the
   derivative.
3. Compare $e^{x^2}$ with $(e^x)^2$. Their notation looks similar; how does
   their structure differ?

## 6.5 Choosing a rule

Read the outermost operation first:

1. Is the expression a sum or difference? Differentiate term by term.
2. Is it a product of nonconstant factors? Use the product rule.
3. Is it a quotient? Use the quotient rule or rewrite with powers when that
   is clearer.
4. Is one function substituted inside another? Use the chain rule.

Several rules may be nested. For

$$
y=x^2\sin(3x),
$$

the outer structure is a product, and differentiating the sine factor also
requires the chain rule:

$$
y'=2x\sin(3x)+3x^2\cos(3x).
$$

For a deeper composition such as $e^{\sin(x^2)}$, work from the outside
inward and include one derivative factor for each layer:

$$
\frac{d}{dx}e^{\sin(x^2)}
=e^{\sin(x^2)}\cos(x^2)(2x).
$$

## 6.6 Checking a derivative

A derivative can be checked in several ways:

- compare with a numerical secant slope near one input;
- check units;
- inspect whether the sign matches the graph's increasing or decreasing
  behavior; and
- simplify only after the rule has been applied correctly.

## 6.7 What to carry forward

Differentiation is not a list of disconnected formulas. It is a small set of
rules organized by expression structure, all grounded in the derivative
limit.
