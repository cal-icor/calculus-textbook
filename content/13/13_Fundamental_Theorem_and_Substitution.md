(fundamental-theorem-and-substitution)=
# 13. Fundamental Theorem and Substitution

The Fundamental Theorem of Calculus explains why derivatives and integrals
are inverse processes. It turns limits of sums into antiderivative
calculations and accumulation functions into ordinary functions we can
differentiate.

## 13.1 Accumulation functions

Given a continuous function $f$, define

$$
A(x)=\int_a^x f(t)\,dt.
$$

As $x$ moves, $A(x)$ records the signed area accumulated from the fixed
starting point $a$. Over a short interval of width $\Delta x$, the new area
is approximately $f(x)\Delta x$, so the accumulation changes at rate $f(x)$.

```{anywidget} ../_widgets/accumulation.js
{"family": "linear", "x": 2}
```

### Read the figure

1. Move the endpoint through a region where $f$ is positive. How does $A$
   change?
2. What happens to $A$ where $f$ is negative?
3. At which inputs does the accumulation graph have a horizontal tangent?

## 13.2 Fundamental Theorem, Part I

If $f$ is continuous, then

$$
\frac{d}{dx}\int_a^x f(t)\,dt=f(x).
$$

For a variable upper bound $g(x)$, the chain rule gives

$$
\frac{d}{dx}\int_a^{g(x)}f(t)\,dt
=f(g(x))g'(x).
$$

If both bounds vary, differentiate the two accumulation functions
separately.

## 13.3 Fundamental Theorem, Part II

If $F'=f$ on $[a,b]$, then

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

This evaluates a definite integral without taking the Riemann-sum limit
directly.

For example,

$$
\int_0^2(3x^2-1)\,dx
=\left[x^3-x\right]_0^2
=6.
$$

The bracket notation means “evaluate at the upper bound minus evaluate at the
lower bound.”

## 13.4 Substitution

Substitution reverses the chain rule. If $u=g(x)$ and $du=g'(x)\,dx$, then

$$
\int f(g(x))g'(x)\,dx
=\int f(u)\,du.
$$

For example,

$$
\int 2x\cos(x^2)\,dx
$$

uses $u=x^2$ and $du=2x\,dx$:

$$
\int\cos u\,du=\sin u+C=\sin(x^2)+C.
$$

## 13.5 Changing bounds

For a definite integral, either return to $x$ before evaluating or transform
the bounds into $u$-values.

If $u=x^2$, then

$$
\int_1^2 2x\cos(x^2)\,dx
=\int_1^4\cos u\,du.
$$

Do not combine $u$-bounds with an expression still written in $x$.

## 13.6 What to carry forward

The theorem connects local rate and global accumulation. Substitution extends
that connection to composite functions by recognizing the chain rule in
reverse.
