(mean-value-and-indeterminate-forms)=
# 9. Mean Value and Indeterminate Forms

Derivative theorems connect local rates of change with a function's behavior
across an interval. They support rigorous conclusions about roots,
monotonicity, and average versus instantaneous change.

## 9.1 Rolle's Theorem

If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and
$f(a)=f(b)$, then there is at least one $c$ in $(a,b)$ such that

$$
f'(c)=0.
$$

Geometrically, a smooth curve that begins and ends at the same height must
have a horizontal tangent somewhere between.

Each hypothesis matters. A jump can avoid the intermediate heights, a corner
can avoid a horizontal derivative, and unequal endpoint values do not call
for a horizontal tangent.

## 9.2 The Mean Value Theorem

If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then some
$c\in(a,b)$ satisfies

$$
f'(c)=\frac{f(b)-f(a)}{b-a}.
$$

The right side is the average rate of change across the interval. The theorem
says that at least one instantaneous rate matches it.

```{anywidget} ../_widgets/mean_value.js
{"family": "quadratic", "a": -1, "b": 2}
```

### Read the figure

1. Move the endpoints and compare the secant slope with the parallel tangent.
2. For the cubic example, can more than one point satisfy the conclusion?
3. Why must the endpoints remain distinct?

## 9.3 Consequences of the theorem

If $f'(x)=0$ throughout an interval, then $f$ is constant there. More
generally, if two functions have the same derivative on an interval, they
differ by a constant.

The Mean Value Theorem also turns derivative bounds into change bounds. If
$|f'(x)|\le M$, then

$$
|f(b)-f(a)|\le M|b-a|.
$$

## 9.4 Indeterminate forms

Direct substitution sometimes produces

$$
\frac00
\qquad\text{or}\qquad
\frac{\infty}{\infty}.
$$

These are **indeterminate forms**, not answers. Different functions with the
same form can have different limits.

## 9.5 L'Hôpital's Rule

When a quotient approaches $0/0$ or $\infty/\infty$, and the required
derivatives and limits exist,

$$
\lim_{x\to a}\frac{f(x)}{g(x)}
=
\lim_{x\to a}\frac{f'(x)}{g'(x)}
$$

provided the limit on the right exists or is infinite.

For example,

$$
\lim_{x\to0}\frac{e^x-1}{x}
=\lim_{x\to0}\frac{e^x}{1}=1.
$$

The rule differentiates the numerator and denominator separately; it is not
the quotient rule.

## 9.6 Rewriting other forms

Products such as $0\cdot\infty$ and differences such as
$\infty-\infty$ must first be rewritten as quotients. Powers such as
$1^\infty$ are often handled by taking logarithms.

Before using L'Hôpital's Rule:

1. identify the form by substitution;
2. simplify algebraically when possible;
3. confirm that the hypotheses apply; and
4. check the new limit after differentiating.

## 9.7 What to carry forward

The derivative theorems require hypotheses before conclusions. L'Hôpital's
Rule follows the same pattern: classify the limit first, then choose a method.
