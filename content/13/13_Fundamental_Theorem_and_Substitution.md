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

The variable $t$ inside the integral is a placeholder. It keeps the input to
$f$ separate from the moving endpoint $x$. Replacing $t$ with another unused
letter would not change the function $A$.

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

To see why, form the difference quotient for $A$:

$$
\frac{A(x+h)-A(x)}{h}
=
\frac{1}{h}\int_x^{x+h}f(t)\,dt.
$$

The numerator is the signed area of one thin strip. Dividing by its width
$h$ gives the **average value** of $f$ on that strip. As $h\to0$, continuity
forces that average value toward the strip's endpoint height $f(x)$. Thus the
rate at which area accumulates is the current height of the graph.

For a variable upper bound $g(x)$, the chain rule gives

$$
\frac{d}{dx}\int_a^{g(x)}f(t)\,dt
=f(g(x))g'(x).
$$

If both bounds vary, differentiate the two accumulation functions
separately.

For example,

$$
\frac{d}{dx}\int_1^{x^2}\cos t\,dt
=\cos(x^2)\cdot2x.
$$

The Fundamental Theorem supplies the integrand evaluated at the moving bound;
the chain rule supplies the speed of that bound.

## 13.3 Fundamental Theorem, Part II

If $F'=f$ on $[a,b]$, then

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

This evaluates a definite integral without taking the Riemann-sum limit
directly.

The subtraction records net change. On each small interval,
$f(x)\Delta x$ approximates the change in $F$. Adding those changes causes
intermediate values to cancel, leaving only the final value minus the initial
value. Part I says accumulation has derivative $f$; Part II says the total
accumulation is the change in any antiderivative of $f$.

For example,

$$
\int_0^2(3x^2-1)\,dx
=\left[x^3-x\right]_0^2
=6.
$$

The bracket notation means “evaluate at the upper bound minus evaluate at the
lower bound.”

```{note}
The theorem does not say that every integral is geometric area. It evaluates
**signed accumulation**. Negative contributions remain negative unless the
problem specifically asks for geometric area or total distance.
```

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

The substitution succeeds because the integrand contains both a composite
function and the derivative of its inner expression. A constant multiple is
harmless; a missing nonconstant factor is not.

## 13.5 Changing bounds

For a definite integral, either return to $x$ before evaluating or transform
the bounds into $u$-values.

If $u=x^2$, then

$$
\int_1^2 2x\cos(x^2)\,dx
=\int_1^4\cos u\,du.
$$

Do not combine $u$-bounds with an expression still written in $x$.

```{anywidget} ../_widgets/substitution.js
{"example": "cosine", "showBounds": true}
```

### Read the substitution

1. Identify the inner expression before revealing $du$.
2. Track which factor of the original integrand becomes $du$.
3. For a definite integral, verify that both transformed bounds are
   $u$-values before evaluating.

## 13.6 What to carry forward

The theorem connects local rate and global accumulation. Substitution extends
that connection to composite functions by recognizing the chain rule in
reverse.
