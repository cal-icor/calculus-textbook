(definite-integrals)=
# 12. Definite Integrals

A definite integral measures accumulation. Geometric area is one
interpretation, but the same construction describes displacement, total
change, mass, and many other quantities.

## 12.1 Riemann sums

Partition $[a,b]$ into $n$ subintervals of width

$$
\Delta x=\frac{b-a}{n}.
$$

Choose a sample point $x_i^*$ in each subinterval. The sum

$$
\sum_{i=1}^n f(x_i^*)\Delta x
$$

adds signed rectangle areas. If these sums approach one value as the
partition becomes finer, that limit is the definite integral

$$
\int_a^b f(x)\,dx.
$$

```{anywidget} ../_widgets/riemann_sums.js
{"family": "quadratic", "method": "midpoint", "n": 8}
```

### Read the figure

1. Compare left, right, and midpoint sums for the same number of rectangles.
2. Increase $n$. Which visual error shrinks?
3. Choose a function that crosses the axis. How are rectangles below the
   axis counted?

## 12.2 Signed area

The definite integral is **net signed area**:

- regions above the $x$-axis contribute positively;
- regions below the $x$-axis contribute negatively.

Therefore,

$$
\int_a^b f(x)\,dx
$$

can be zero even when the graph encloses substantial geometric area.

## 12.3 Properties of the integral

Definite integrals are linear:

$$
\int_a^b\bigl(\alpha f(x)+\beta g(x)\bigr)\,dx
=
\alpha\int_a^b f(x)\,dx+\beta\int_a^b g(x)\,dx.
$$

Intervals can be joined:

$$
\int_a^c f(x)\,dx+\int_c^b f(x)\,dx
=\int_a^b f(x)\,dx.
$$

Reversing the bounds changes the sign:

$$
\int_b^a f(x)\,dx=-\int_a^b f(x)\,dx.
$$

## 12.4 Net change

If $Q'(t)$ is a rate of change, then

$$
\int_a^b Q'(t)\,dt
$$

is the net change in $Q$ from $a$ to $b$.

For velocity $v(t)$,

$$
\text{displacement}=\int_a^b v(t)\,dt.
$$

Total distance instead uses

$$
\int_a^b |v(t)|\,dt,
$$

or equivalently splits the interval wherever $v$ changes sign.

## 12.5 Units

The units of a definite integral are

$$
(\text{output units})(\text{input units}).
$$

Integrating velocity in miles per hour over hours produces miles. Unit
analysis is often the fastest way to detect an incorrect interpretation.

## 12.6 What to carry forward

The definite integral is a limit of sums and a measure of net accumulation.
The Fundamental Theorem of Calculus will connect this accumulation back to
antiderivatives.
