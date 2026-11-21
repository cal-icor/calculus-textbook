(antiderivatives)=
# 11. Antiderivatives

Differentiation moves from a function to its rate of change. Antidifferentiation
reverses that process.

## 11.1 Families of antiderivatives

A function $F$ is an antiderivative of $f$ on an interval when

$$
F'(x)=f(x).
$$

If $F$ is one antiderivative, then every vertical shift $F(x)+C$ has the same
derivative. On an interval, these are all the antiderivatives:

$$
\int f(x)\,dx=F(x)+C.
$$

The constant of integration records information that differentiation erased.

```{anywidget} ../_widgets/antiderivative_family.js
{"family": "linear", "constant": 0}
```

### Read the figure

1. Change $C$. What changes in the antiderivative graph? What does not?
2. Compare tangent slopes at the same $x$ for several values of $C$.
3. Why does one initial condition select exactly one curve from the family?

## 11.2 Basic antiderivative rules

For $n\ne-1$,

$$
\int x^n\,dx=\frac{x^{n+1}}{n+1}+C.
$$

Other foundational rules include

$$
\int e^x\,dx=e^x+C,
\qquad
\int \cos x\,dx=\sin x+C,
$$

$$
\int \sin x\,dx=-\cos x+C,
\qquad
\int \frac1x\,dx=\ln|x|+C.
$$

Linearity allows constants and sums to be handled term by term.

## 11.3 Initial-value problems

An initial condition determines the unknown constant.

If

$$
v(t)=3t^2-4
$$

is velocity, then position has the form

$$
s(t)=t^3-4t+C.
$$

If $s(0)=7$, then $C=7$. The resulting function is the unique member of the
antiderivative family satisfying the given starting position.

## 11.4 From velocity to displacement

An antiderivative of velocity gives position, but a position difference gives
displacement:

$$
s(b)-s(a).
$$

Total distance is different. It counts motion in either direction and
requires splitting at times when velocity changes sign.

## 11.5 Previewing area with rectangles

Area under a curved graph can be approximated by rectangles. On each small
interval, choose a height from the function and multiply by the interval
width.

Adding more, narrower rectangles usually improves the approximation. The
limit of this process defines the definite integral in the next section.

## 11.6 What to carry forward

An indefinite integral represents a family of functions. Initial data select
one member; definite integrals will instead represent accumulated change over
an interval.
