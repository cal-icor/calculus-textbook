(shape-and-optimization)=
# 10. Shape and Optimization

Derivatives translate a formula into geometric information. The first
derivative tracks direction of change; the second derivative tracks how that
change itself evolves.

## 10.1 Increasing, decreasing, and critical numbers

On an interval:

- $f'(x)>0$ means $f$ is increasing;
- $f'(x)<0$ means $f$ is decreasing.

Critical numbers divide the domain into intervals on which the sign of
$f'$ can be tested.

The **first derivative test** classifies a critical number $c$:

- $f'$ changes from positive to negative: local maximum;
- $f'$ changes from negative to positive: local minimum;
- no sign change: neither.

## 10.2 Concavity and inflection

If $f''(x)>0$, slopes are increasing and the graph is concave up. If
$f''(x)<0$, slopes are decreasing and the graph is concave down.

An inflection point is a point on the graph where concavity changes. Solving
$f''(x)=0$ gives candidates, but a sign change must still be checked.

Explore how the signs of $f'$ and $f''$ correspond to motion along a graph.

```{anywidget} ../_widgets/derivative_signs.js
{"family": "cubic", "x": -1}
```

### Read the figure

1. Find a point where $f'=0$ but there is no local extremum.
2. Locate each concavity change and verify it on both sides.
3. Can a function be decreasing and concave up at the same point?

## 10.3 The second derivative test

Suppose $f'(c)=0$.

- If $f''(c)>0$, then $f$ has a local minimum at $c$.
- If $f''(c)<0$, then $f$ has a local maximum at $c$.
- If $f''(c)=0$, the test is inconclusive.

The test works because the sign of $f''$ describes whether nearby tangent
slopes are increasing or decreasing.

## 10.4 A curve-sketching workflow

To understand a graph from its formula:

1. determine domain, intercepts, symmetry, and asymptotes;
2. find critical numbers and intervals of increase or decrease;
3. find possible inflection points and intervals of concavity;
4. evaluate important points; and
5. combine the information in one consistent sketch.

A graphing tool can check the result, but it does not replace the sign
analysis that explains the shape.

## 10.5 Optimization models

Optimization asks for the largest or smallest value allowed by a model.
A reliable process is:

1. name the objective quantity;
2. write a constraint relating the variables;
3. use the constraint to express the objective in one variable;
4. determine the feasible domain;
5. find critical numbers; and
6. compare all candidates and endpoints.

**Example.** A rectangle has perimeter $40$. If its width is $x$, then its
length is $20-x$ and

$$
A(x)=x(20-x),\qquad 0\le x\le20.
$$

Since $A'(x)=20-2x$, the critical number is $x=10$. Comparing with the
endpoints shows that the square $10\times10$ gives the maximum area.

## 10.6 What to carry forward

Derivative signs explain shape; optimization adds a model and a feasible
domain. A critical number is only a candidate until its surrounding signs or
competing endpoint values have been checked.
