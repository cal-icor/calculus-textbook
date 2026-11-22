(related-rates-and-extrema)=
# 8. Related Rates and Extrema

Derivatives become modeling tools when several changing quantities are tied
together by one equation. They also identify candidates for the largest and
smallest values a continuous function can attain.

## 8.1 A related-rates model

A ladder of fixed length $L$ leans against a wall. If its foot is $x$ units
from the wall and its top is $y$ units above the ground, then

$$
x^2+y^2=L^2.
$$

Both $x$ and $y$ depend on time. Differentiating with respect to $t$ gives

$$
2x\frac{dx}{dt}+2y\frac{dy}{dt}=0,
$$

and therefore

$$
\frac{dy}{dt}=-\frac{x}{y}\frac{dx}{dt}.
$$

The minus sign says that the top moves downward when the foot moves away from
the wall.

```{anywidget} ../_widgets/related_rates_ladder.js
{"length": 10, "x": 6, "dxdt": 1}
```

### Read the figure

1. Keep $\frac{dx}{dt}$ fixed and move the foot away from the wall. Why does
   the top descend faster?
2. What happens to $\frac{dy}{dt}$ as the ladder approaches the ground?
3. Which quantity is constant, and where was that fact used?

## 8.2 A reliable setup process

For a related-rates problem:

1. Define each quantity and include units.
2. Draw a diagram when geometry is involved.
3. Write one equation relating the quantities.
4. Differentiate with respect to time **before** substituting numerical
   values.
5. Substitute the known snapshot and rates.
6. Solve for the requested rate and interpret its sign and units.

Substituting too early turns a changing quantity into a constant and removes
the rate the problem asks for.

## 8.3 Linear approximation

Near $x=a$, a differentiable function is approximated by its tangent line:

$$
f(x)\approx f(a)+f'(a)(x-a).
$$

In differential notation,

$$
\Delta y\approx dy=f'(a)\,dx.
$$

For example, using $f(x)=\sqrt{x}$ near $a=100$,

$$
\sqrt{101}\approx 10+\frac{1}{20}(1)=10.05.
$$

The approximation is local: it is generally more accurate when $x$ is closer
to $a$.

The reason is geometric. After zooming in near a differentiable point, the
graph and its tangent line become difficult to distinguish. The error is the
vertical gap between the true output $f(x)$ and the tangent-line estimate
$L(x)$.

```{anywidget} ../_widgets/linear_approximation.js
{"family": "square_root", "a": 4, "x": 4.5}
```

### Read the approximation

1. Move $x$ toward $a$. How does the error change?
2. Compare a concave-up function with a concave-down function. Does the
   tangent line overestimate or underestimate?
3. Move the center $a$. Why must it remain in the function's domain?

## 8.4 Absolute and local extrema

A **local maximum** is at least as large as nearby function values. An
**absolute maximum** is at least as large as every function value in the
domain. Minimum values are defined similarly.

A **critical number** is a domain value $c$ where

$$
f'(c)=0
$$

or where $f'(c)$ does not exist. Local extrema can occur at critical numbers,
but not every critical number is an extremum.

For example, $f(x)=x^3$ has $f'(0)=0$, yet it continues increasing through
$0$.

## 8.5 The Extreme Value Theorem

If $f$ is continuous on a closed interval $[a,b]$, then it attains both an
absolute maximum and an absolute minimum on that interval.

The theorem guarantees existence, but it does not locate the extrema. To find
them:

1. find critical numbers inside $(a,b)$;
2. evaluate $f$ at those critical numbers; and
3. evaluate $f$ at both endpoints.

The largest and smallest resulting values are the absolute extrema.

```{warning}
Checking only where $f'(x)=0$ can miss an endpoint extremum or a point where
the derivative does not exist.
```

## 8.6 What to carry forward

Related rates translate a changing situation into an equation before any
calculus occurs. Extrema problems similarly begin with domain and continuity
before derivative calculations. In both settings, setup controls the meaning
of the answer.
