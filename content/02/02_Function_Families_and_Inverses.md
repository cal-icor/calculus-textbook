(function-families-and-inverses)=
# 2. Function Families and Inverses

Recognizing a function family helps us predict shape, end behavior, and the
algebra that will be useful. This section compares the families that appear
most often in calculus and then studies how functions can be reversed.

## 2.1 Polynomial and power functions

A **power function** has the form $f(x)=cx^p$. When $p$ is a positive integer,
its shape depends strongly on whether $p$ is even or odd:

- even powers have matching end behavior and are symmetric about the
  $y$-axis;
- odd powers have opposite end behavior and are symmetric about the origin.

A **polynomial**

$$
P(x)=a_nx^n+\cdots+a_1x+a_0
$$

is a sum of power functions with nonnegative integer exponents. Far from the
origin, the leading term $a_nx^n$ determines its end behavior.

## 2.2 Exponential and trigonometric functions

An exponential function $b^x$, where $b>0$ and $b\ne1$, changes by a constant
factor over equal input intervals:

$$
b^{x+1}=b\cdot b^x.
$$

By contrast, sine and cosine are periodic:

$$
\sin(x+2\pi)=\sin x,\qquad \cos(x+2\pi)=\cos x.
$$

Their outputs repeat even as the input continues to increase. Periodicity is
why unrestricted sine and cosine do not have inverse functions.

## 2.3 When does an inverse exist?

An inverse function must undo the original function:

$$
f^{-1}(f(x))=x.
$$

For this to work, each output of $f$ must come from only one input. A function
with that property is **one-to-one** and passes the horizontal line test.

The graph of $f^{-1}$ is the reflection of the graph of $f$ across the line
$y=x$. Explore how restricting the domain can turn a many-to-one rule into a
one-to-one function.

```{anywidget} ../_widgets/inverse_explorer.js
{"family": "quadratic"}
```

### Read the figure

1. Why does $x^2$ fail the horizontal line test on all real numbers?
2. Restrict its domain to $x\ge0$. How does that choice determine the
   principal square root?
3. Compare an exponential function with its inverse. Which axis is an
   asymptote for each?

## 2.4 Logarithms reverse exponentials

For $b>0$ and $b\ne1$,

$$
y=b^x\quad\Longleftrightarrow\quad x=\log_b y.
$$

This equivalence explains both the domain and range:

| Function | Domain | Range |
|---|---|---|
| $b^x$ | $(-\infty,\infty)$ | $(0,\infty)$ |
| $\log_b x$ | $(0,\infty)$ | $(-\infty,\infty)$ |

It also explains the inverse identities

$$
\log_b(b^x)=x,\qquad b^{\log_b x}=x\quad(x>0).
$$

## 2.5 Inverse trigonometric functions

Sine is not one-to-one on all real numbers, so we restrict it to
$[-\frac{\pi}{2},\frac{\pi}{2}]$. On that interval, it has the inverse
$\arcsin$:

$$
\arcsin(\sin x)=x
\quad\text{for }-\frac{\pi}{2}\le x\le\frac{\pi}{2}.
$$

The restriction is part of the definition, not an inconvenience. Similar
choices define $\arccos$ and $\arctan$.

## 2.6 What to carry forward

Function families supply the examples and models of calculus. Their domains,
ranges, symmetry, periodicity, and inverse relationships will determine which
limits and derivatives are possible.
