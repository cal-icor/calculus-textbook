(implicit-and-inverse-differentiation)=
# 7. Implicit and Inverse Differentiation

Not every curve is most naturally written as $y=f(x)$. Equations such as
$x^2+y^2=25$ describe several branches at once. Implicit differentiation
finds tangent slopes directly from the relationship between $x$ and $y$.

## 7.1 Differentiating an implicit equation

Treat $y$ as a function of $x$, even when that function has not been isolated.
Differentiating

$$
x^2+y^2=25
$$

with respect to $x$ gives

$$
2x+2y\frac{dy}{dx}=0.
$$

Solving for the slope,

$$
\frac{dy}{dx}=-\frac{x}{y}.
$$

The factor $\frac{dy}{dx}$ appears because differentiating $y^2$ requires the
chain rule.

## 7.2 Tangents on an implicit curve

The derivative formula belongs to the whole curve, but its value depends on
the point. On the circle, the slope is undefined where $y=0$, corresponding
to vertical tangent lines.

Move the point around the circle and compare the radius with the tangent.
Their slopes are negative reciprocals whenever both are defined.

```{anywidget} ../_widgets/implicit_circle.js
{"angle": 45, "radius": 5}
```

### Read the figure

1. What happens to $\frac{dy}{dx}$ as the point approaches $(5,0)$?
2. Where are the horizontal tangents? How does the formula identify them?
3. Why must the tangent be perpendicular to the radius?

## 7.3 Logarithmic differentiation

Logarithms turn products into sums and powers into coefficients. For

$$
y=x^x,\qquad x>0,
$$

take the logarithm of both sides:

$$
\ln y=x\ln x.
$$

Differentiate implicitly:

$$
\frac{y'}{y}=\ln x+1,
$$

so

$$
y'=x^x(\ln x+1).
$$

This method is especially useful for products with many factors or when both
the base and exponent contain the variable.

## 7.4 Derivatives of inverse functions

If $f$ is one-to-one and differentiable, then

$$
(f^{-1})'(a)=\frac{1}{f'(f^{-1}(a))}
$$

whenever the denominator is nonzero. The graph reflection across $y=x$
explains the reciprocal: reflection swaps horizontal and vertical changes.

Since $\ln x$ is the inverse of $e^x$,

$$
\frac{d}{dx}\ln x=\frac1x,\qquad x>0.
$$

## 7.5 Inverse trigonometric derivatives

Let $y=\arcsin x$. Then $\sin y=x$. Differentiating implicitly gives

$$
\cos y\frac{dy}{dx}=1.
$$

On the chosen range of arcsine, $\cos y=\sqrt{1-x^2}$, so

$$
\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}},
\qquad -1<x<1.
$$

Similarly,

$$
\frac{d}{dx}\arctan x=\frac{1}{1+x^2}.
$$

## 7.6 Higher derivatives

The second derivative $f''$ measures how the first derivative changes. For a
position function $s(t)$,

$$
s'(t)=\text{velocity},\qquad s''(t)=\text{acceleration}.
$$

Higher derivatives can also be found implicitly. Differentiate the first
derivative relationship again, remembering that every occurrence of $y$
still depends on $x$.

## 7.7 What to carry forward

Implicit and inverse differentiation extend the rules from section 6 to
relations that are not presented as explicit formulas. The essential move is
to identify every hidden composition before differentiating.
