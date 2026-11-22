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
Two equations usually play different roles:

- the **objective** is the quantity to maximize or minimize;
- the **constraint** describes which choices are allowed.

The derivative must be taken after the constraint has reduced the objective
to one independent variable. Differentiating an objective that still has two
independent-looking variables does not yet describe motion along the
constraint.

A reliable process is:

1. name the objective quantity;
2. write a constraint relating the variables;
3. use the constraint to express the objective in one variable;
4. determine the feasible domain from the context;
5. differentiate the one-variable objective;
6. find critical numbers in the feasible domain; and
7. compare all candidates and endpoints.

**Example.** A rectangle has perimeter $40$. If its width is $x$, then its
length is $y$. The objective and constraint are

$$
A=xy,
\qquad
2x+2y=40.
$$

Solving the constraint gives $y=20-x$. Substituting into the objective
produces the one-variable model

$$
A(x)=x(20-x),\qquad 0\le x\le20.
$$

The interval is part of the model: side lengths cannot be negative. Since
$A'(x)=20-2x$, the only interior critical number is $x=10$. The candidates
are therefore

$$
A(0)=0,\qquad A(10)=100,\qquad A(20)=0.
$$

The square $10\times10$ gives the absolute maximum area.

```{anywidget} ../_widgets/optimization_rectangle.js
{"perimeter": 40, "width": 6}
```

### Read the model

1. Move the width and watch the constraint determine the length.
2. Compare the geometric rectangle with the point on the objective graph.
3. Why must the endpoints be checked even though they are not interior
   critical numbers?

```{tip}
Do not begin by differentiating. First decide what is changing, what is
fixed, what is being optimized, and which choices are physically possible.
```

## 10.6 What to carry forward

Derivative signs explain shape; optimization adds a model and a feasible
domain. A critical number is only a candidate until its surrounding signs or
competing endpoint values have been checked.
