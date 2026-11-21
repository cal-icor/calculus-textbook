(limits-at-a-point)=
# 3. Limits at a Point

Calculus begins with a question about motion: how can we describe velocity at
a single instant? The key is to study what happens over shorter and shorter
time intervals. That same idea leads to limits.

## 3.1 From average to instantaneous velocity

If an object's position is $s(t)$, its average velocity from $t=a$ to
$t=a+h$ is

$$
\frac{s(a+h)-s(a)}{h}.
$$

On a position graph, this is the slope of the secant line through the two
points. As $h$ approaches zero, the second point approaches the first and the
secant line may approach a tangent line.

## 3.2 The idea of a limit

We write

$$
\lim_{x\to a}f(x)=L
$$

when values of $f(x)$ can be made as close as desired to $L$ by taking $x$
sufficiently close—but not necessarily equal—to $a$.

The value $f(a)$ does not decide the limit. A function may have:

- a limit at $a$ even when $f(a)$ is undefined;
- a limit different from $f(a)$; or
- no limit even when $f(a)$ exists.

Use the graph and numerical table together. The open circle records the
nearby behavior; a filled point records the actual function value.

```{anywidget} ../_widgets/limit_explorer.js
{"example": "hole", "a": 1}
```

### Read the figure

1. For the removable-hole example, what number do the left and right tables
   approach? Does the filled point change that answer?
2. For the jump example, compare the values approaching from each side.
3. For the oscillating example, does shrinking the window make the outputs
   settle near one number?

## 3.3 One-sided limits

The left-hand and right-hand limits are written

$$
\lim_{x\to a^-}f(x)
\qquad\text{and}\qquad
\lim_{x\to a^+}f(x).
$$

A two-sided limit exists exactly when both one-sided limits exist and agree:

$$
\lim_{x\to a}f(x)=L
\quad\Longleftrightarrow\quad
\lim_{x\to a^-}f(x)=L=
\lim_{x\to a^+}f(x).
$$

This is especially important for piecewise functions and endpoints.

## 3.4 Estimating from data

A table should approach $a$ from both sides without using $x=a$. For example,
to estimate a limit at $2$, useful inputs include

$$
1.9,\ 1.99,\ 1.999
\quad\text{and}\quad
2.1,\ 2.01,\ 2.001.
$$

Tables provide evidence, not proof. A graph can hide behavior between sampled
points, and a finite list can never show what happens for every sufficiently
close input.

## 3.5 What to carry forward

A limit describes nearby behavior. It is not substitution, and it is not the
same as the function value. Keeping those ideas separate will make continuity
and derivatives much clearer.
