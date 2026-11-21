(algebra-review)=
# Algebra review

Algebra lets us rewrite an expression without changing its value. In calculus,
the useful form of an expression often depends on the question we are asking.

## Fractions and factoring

For $c\ne 0$,

$$
\frac{ac}{bc}=\frac{a}{b}.
$$

Cancellation removes a **common factor**, not a term. For example,

$$
\frac{x^2-4}{x-2}
=\frac{(x-2)(x+2)}{x-2}
=x+2,\qquad x\ne2.
$$

The restriction $x\ne2$ remains because the original expression is undefined
there. This distinction becomes essential when we study limits.

```{warning}
In general,
$\frac{x+2}{x}\ne2$. There is no factor of $x$ common to the entire numerator.
```

### How to factor a polynomial

Factoring reverses multiplication. The goal is to rewrite a sum as a product.
Use this sequence:

1. **Factor out the greatest common factor first.**  
   For example,
   $6x^2-24=6(x^2-4)$.
2. **Look for a familiar pattern.**  
   A difference of squares factors as
   $a^2-b^2=(a-b)(a+b)$. Therefore,
   $6(x^2-4)=6(x-2)(x+2)$.
3. **For $x^2+bx+c$, find two numbers whose product is $c$ and whose sum is
   $b$.**  
   To factor $x^2-5x+6$, we need two numbers with product $6$ and sum $-5$.
   They are $-2$ and $-3$, so

   $$
   x^2-5x+6=(x-2)(x-3).
   $$

4. **Check by multiplying the factors.**  
   Expanding $(x-2)(x-3)$ gives $x^2-5x+6$, so the factorization is correct.

```{tip}
If the constant term is positive, the two numbers have the same sign. If it is
negative, they have opposite signs. Their sum determines which sign is larger.
```

## Solving equations

An operation preserves equivalence only when it can be reversed under the
stated conditions.

**Example.** Solve $3(x-2)=2x+5$.

$$
\begin{aligned}
3x-6 &= 2x+5\\
x-6 &= 5\\
x &= 11.
\end{aligned}
$$

Substitution verifies the result:
$3(11-2)=27$ and $2(11)+5=27$.

Squaring is different because it can introduce extra solutions. From $x=-2$
we may conclude $x^2=4$, but $x^2=4$ does not imply only $x=-2$.

## Absolute value and distance

$|x|$ is the distance from $x$ to $0$, while $|x-a|$ is the distance from $x$
to $a$.

$$
|x-a|<r \quad\Longleftrightarrow\quad a-r<x<a+r.
$$

This distance interpretation will return in the precise definition of a
limit.

## Quick practice

1. Factor $x^2-5x+6$.
2. Simplify $\frac{x^2-9}{x-3}$ and state its domain restriction.
3. Solve $|x-4|<2$.
4. Explain why $\sqrt{x^2}=|x|$, not always $x$.

```{dropdown} Answers
1. $(x-2)(x-3)$
2. $x+3$, with $x\ne3$
3. $2<x<6$
4. The principal square root is nonnegative; for example,
   $\sqrt{(-3)^2}=3=|-3|$.
```
