(exponents-and-logarithms)=
# Exponents and logarithms

## Exponent rules

For appropriate real numbers and integers $m,n$,

$$
a^m a^n=a^{m+n},\qquad
\frac{a^m}{a^n}=a^{m-n},\qquad
(a^m)^n=a^{mn}.
$$

Also,

$$
a^{-n}=\frac{1}{a^n},
\qquad
a^{1/n}=\sqrt[n]{a}.
$$

The bases and domains matter. For example, $\sqrt{x^2}=|x|$ for real $x$.

```{warning}
Exponents do not distribute over addition:
$(a+b)^2\ne a^2+b^2$ in general.
```

## Exponential functions

An exponential function $f(x)=b^x$ has constant base $b>0$, $b\ne1$, and
variable exponent $x$.

- If $b>1$, then $b^x$ grows as $x$ increases.
- If $0<b<1$, then $b^x$ decays as $x$ increases.
- Its domain is all real numbers and its range is $(0,\infty)$.

The number $e\approx2.71828$ is the natural base used throughout calculus.

## Logarithms are inverses

For $b>0$ and $b\ne1$,

$$
\log_b(x)=y \quad\Longleftrightarrow\quad b^y=x.
$$

Therefore,

$$
\log_b(b^x)=x
\quad\text{and}\quad
b^{\log_b x}=x\quad(x>0).
$$

The natural logarithm is $\ln x=\log_e x$.

## Logarithm rules

For $x>0$ and $y>0$,

$$
\log_b(xy)=\log_bx+\log_by,
$$

$$
\log_b\left(\frac{x}{y}\right)=\log_bx-\log_by,
$$

$$
\log_b(x^r)=r\log_bx.
$$

There is no corresponding sum rule:
$\log_b(x+y)\ne\log_bx+\log_by$ in general.

## Quick practice

1. Rewrite $8^{2/3}$ using a root and evaluate it.
2. Solve $3^{x+1}=27$.
3. Expand $\ln\left(\frac{x^2\sqrt y}{z}\right)$ for $x,y,z>0$.
4. Solve $\ln x=2$.

```{dropdown} Answers
1. $(\sqrt[3]{8})^2=4$
2. $x=2$
3. $2\ln x+\frac12\ln y-\ln z$
4. $x=e^2$
```
