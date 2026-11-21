(limit-laws-and-continuity)=
# 4. Limit Laws and Continuity

Once a limit is understood as nearby behavior, algebraic laws let us compute
many limits efficiently. Continuity then identifies functions for which this
nearby behavior agrees with the actual function value.

## 4.1 Limit laws

If

$$
\lim_{x\to a}f(x)=L
\qquad\text{and}\qquad
\lim_{x\to a}g(x)=M,
$$

then

$$
\lim_{x\to a}(f+g)(x)=L+M,\qquad
\lim_{x\to a}(fg)(x)=LM,
$$

and

$$
\lim_{x\to a}\frac{f(x)}{g(x)}=\frac{L}{M}
\quad\text{when }M\ne0.
$$

For polynomials, these laws justify direct substitution. For rational
functions, substitution works wherever the limiting denominator is nonzero.

## 4.2 Indeterminate forms signal more work

The expression $0/0$ is not a limit value. It says that direct substitution
has not settled the question.

For example,

$$
\lim_{x\to2}\frac{x^2-4}{x-2}
=\lim_{x\to2}(x+2)=4,
$$

because the expressions agree whenever $x\ne2$. Factoring reveals the nearby
behavior even though the original function is undefined at $2$.

## 4.3 The squeeze theorem

If

$$
g(x)\le f(x)\le h(x)
$$

near $a$, and both outside functions approach the same value $L$, then
$f(x)$ must also approach $L$.

A classic example is

$$
-|x|\le x\sin(1/x)\le |x|,
$$

which shows that $\lim_{x\to0}x\sin(1/x)=0$ even though $\sin(1/x)$ oscillates
infinitely often.

## 4.4 Making “close” precise

The statement

$$
\lim_{x\to a}f(x)=L
$$

means that for every output tolerance $\varepsilon>0$, there is an input
tolerance $\delta>0$ such that

$$
0<|x-a|<\delta
\quad\Longrightarrow\quad
|f(x)-L|<\varepsilon.
$$

The $\varepsilon$-band is a challenge chosen around $L$. The $\delta$-window
is the response around $a$. Use the figure to see whether the entire graph
inside the punctured $\delta$-window stays within the band.

```{anywidget} ../_widgets/epsilon_delta.js
{"function": "linear", "epsilon": 1, "delta": 0.5}
```

### Read the figure

1. For the linear example, reduce $\varepsilon$. How must $\delta$ respond?
2. Choose the quadratic example. Why does the same $\delta$ not work equally
   well at every center?
3. Choose the jump example and set a small $\varepsilon$. Can any $\delta$
   capture both sides inside one band?

## 4.5 Continuity

A function is continuous at $a$ when all three conditions hold:

1. $f(a)$ is defined;
2. $\lim_{x\to a}f(x)$ exists; and
3. $\lim_{x\to a}f(x)=f(a)$.

Continuity means that substitution works at that point. Polynomials are
continuous everywhere, while rational functions are continuous wherever
their denominators are nonzero.

## 4.6 The Intermediate Value Theorem

If $f$ is continuous on $[a,b]$, then it takes every value between $f(a)$ and
$f(b)$. In particular, if $f(a)$ and $f(b)$ have opposite signs, there is
some $c$ in $(a,b)$ with $f(c)=0$.

The theorem guarantees existence, not a formula for $c$, and continuity on
the whole interval is essential.

## 4.7 What to carry forward

Limit laws are efficient only after existence has been considered. The
precise definition explains what a limit claim promises, while continuity
identifies when limits and function values agree.
