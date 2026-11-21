(integration-checkpoint)=
# 14. Integration Checkpoint

This section is a pause for consolidation. It introduces no new technique.
Use it to connect limits, derivatives, antiderivatives, and definite
integrals before applying integration to geometric models.

## 14.1 One chain of ideas

The first half of calculus follows a connected progression:

$$
\text{average change}
\longrightarrow
\text{limit}
\longrightarrow
\text{instantaneous change}
\longrightarrow
\text{accumulated change}.
$$

- A derivative is a limit of average rates.
- An antiderivative reverses a derivative.
- A definite integral is a limit of finite sums.
- The Fundamental Theorem connects definite integrals to antiderivatives.

## 14.2 Distinguish the notation

These expressions answer different questions:

| Expression | Meaning |
|---|---|
| $f'(a)$ | instantaneous rate at one input |
| $\int f(x)\,dx$ | family of antiderivatives |
| $\int_a^b f(x)\,dx$ | net accumulation over an interval |
| $\frac{d}{dx}\int_a^x f(t)\,dt$ | current accumulation rate, equal to $f(x)$ |

## 14.3 Method check

Before calculating, ask:

1. Is the problem about a nearby value, an instantaneous rate, or an
   accumulation?
2. Does the question ask for a function, a number, or a rate with units?
3. Which hypotheses or domain restrictions matter?
4. What representation—formula, graph, table, or context—contains the needed
   information?

## 14.4 Short synthesis examples

**From position to velocity.** If $s(t)=t^3-3t$, then
$v(t)=3t^2-3$.

**From velocity to displacement.**

$$
\int_0^2(3t^2-3)\,dt
=\left[t^3-3t\right]_0^2=2.
$$

**From velocity to total distance.** Since $v(t)=0$ at $t=1$, split the
integral there and integrate $|v(t)|$.

## 14.5 Readiness for applications

Before continuing, make sure you can:

- identify a quantity and its rate from units;
- distinguish signed area from geometric area;
- choose bounds from a graph or context;
- evaluate a definite integral with the Fundamental Theorem; and
- recognize a substitution pattern.

Return to the relevant numbered section whenever one of these steps is not
yet reliable.
