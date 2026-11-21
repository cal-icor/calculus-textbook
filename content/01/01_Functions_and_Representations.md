(functions-and-representations)=
# 1. Functions and Representations

A function connects each allowed input to exactly one output. We write

$$
y=f(x)
$$

to say that the output $y$ is determined by the input $x$. A formula is one
way to describe that relationship, but functions also appear as graphs,
tables, and verbal rules.

## 1.1 Domain and range

The **domain** is the set of allowed inputs. The **range** is the set of
outputs the function actually produces.

For

$$
f(x)=\sqrt{4-x},
$$

real outputs require $4-x\ge 0$, so the domain is $(-\infty,4]$. Since a
principal square root is nonnegative, the range is $[0,\infty)$.

Domain restrictions can come from the context as well as the formula. If
$C(n)$ is the cost of buying $n$ tickets, then negative and fractional values
of $n$ may make no sense even if the algebraic formula accepts them.

```{tip}
Ask two separate questions: “Which inputs are permitted?” and “Which outputs
can occur?” A graph answers the first by its horizontal extent and the second
by its vertical extent.
```

## 1.2 Four views of one function

Suppose a car travels at a constant $50$ miles per hour. Its distance after
$t$ hours can be represented in several equivalent ways:

- **words:** distance is fifty times elapsed time;
- **formula:** $d(t)=50t$;
- **table:** $(0,0),(1,50),(2,100),\ldots$;
- **graph:** a line through the origin with slope $50$.

Each view makes different information easy to see. A formula supports exact
calculation, a graph shows global behavior, and a table highlights selected
values.

## 1.3 Transforming graphs

Starting with a familiar graph $y=f(x)$, the expression

$$
g(x)=a\,f\bigl(b(x-h)\bigr)+k
$$

describes a family of related graphs.

- $h$ shifts the graph horizontally.
- $k$ shifts it vertically.
- $a$ stretches vertically; a negative $a$ also reflects across the
  $x$-axis.
- $b$ changes horizontal scale; a negative $b$ also reflects across the
  $y$-axis.

Horizontal changes can feel backward because they happen **inside** the
function. The interactive figure lets you change one parameter at a time and
compare the transformed graph with its parent.

```{anywidget} ../_widgets/function_transformations.js
{"family": "quadratic", "a": 1, "b": 1, "h": 0, "k": 0}
```

### Read the figure

1. Set $h=2$. Why does $f(x-2)$ move to the right?
2. Compare $a=2$ and $a=\frac12$. Which graph has the larger output magnitude?
3. Choose the sine parent and set $b=2$. What happens to its period?

## 1.4 Composition

Composition feeds the output of one function into another:

$$
(f\circ g)(x)=f(g(x)).
$$

If $g(x)=x^2+1$ and $f(u)=\sqrt{u}$, then

$$
(f\circ g)(x)=\sqrt{x^2+1}.
$$

Order matters. In the reverse order,

$$
(g\circ f)(x)=(\sqrt{x})^2+1=x+1,
$$

and this expression inherits the restriction $x\ge0$ from the inner square
root. In general, $f\circ g$ and $g\circ f$ are different functions.

## 1.5 What to carry forward

Calculus studies how outputs respond when inputs change. That work depends on
being able to move among formulas, graphs, tables, and contexts—and on
tracking domain restrictions throughout every transformation and
composition.
