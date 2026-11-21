(the-unit-circle)=
# The unit circle

The **unit circle** is the circle of radius $1$ centered at the origin:

$$
x^2+y^2=1.
$$

An angle $\theta$ is measured counterclockwise from the positive $x$-axis. The
point where its terminal side meets the unit circle is

$$
(\cos\theta,\sin\theta).
$$

This one picture connects angles, coordinates, signs, and periodic behavior.

## Degrees and radians

A complete revolution is $360^\circ=2\pi$ radians, so

$$
\text{radians}=\text{degrees}\cdot\frac{\pi}{180},
\qquad
\text{degrees}=\text{radians}\cdot\frac{180}{\pi}.
$$

Calculus formulas use radians. For example,
$\frac{d}{dx}\sin x=\cos x$ is true in this simple form only when $x$ is
measured in radians.

## Quadrants and signs

The axes divide the coordinate plane into four quadrants. Because the
unit-circle point is $(\cos\theta,\sin\theta)$:

- $\cos\theta$ is the horizontal coordinate $x$;
- $\sin\theta$ is the vertical coordinate $y$; and
- $\tan\theta=\frac{\sin\theta}{\cos\theta}$ when $\cos\theta\ne0$.

| Quadrant | Angle range | $\cos\theta$ | $\sin\theta$ | $\tan\theta$ |
|---|---|:---:|:---:|:---:|
| I | $0<\theta<\frac{\pi}{2}$ | $+$ | $+$ | $+$ |
| II | $\frac{\pi}{2}<\theta<\pi$ | $-$ | $+$ | $-$ |
| III | $\pi<\theta<\frac{3\pi}{2}$ | $-$ | $-$ | $+$ |
| IV | $\frac{3\pi}{2}<\theta<2\pi$ | $+$ | $-$ | $-$ |

You do not need to memorize the table if you picture the coordinates. A point
to the right has positive cosine, a point above the $x$-axis has positive
sine, and so on.

```{note}
Angles on an axis are not in a quadrant. At $0$ and $\pi$, sine is zero. At
$\frac{\pi}{2}$ and $\frac{3\pi}{2}$, cosine is zero and tangent is undefined.
```

## Interactive unit circle

Before moving the point, predict the signs of sine and cosine in each
quadrant. Then use the slider, common-angle buttons, or drag the point around
the circle to test your prediction.

```{anywidget} ../_widgets/unit_circle.js
{"angle": 45}
```

### Questions to investigate

1. What changes and what stays the same when $\theta$ becomes
   $\theta+2\pi$?
2. At which angles is $\cos\theta=0$? At which angles is
   $\sin\theta=0$?
3. Compare $\theta$ and $-\theta$. Why is cosine even while sine is odd?
4. Find two different angles with sine equal to $\frac{\sqrt2}{2}$.

## Reference values

| $\theta$ | $0$ | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ |
|---|---:|---:|---:|---:|---:|
| $\cos\theta$ | $1$ | $\frac{\sqrt3}{2}$ | $\frac{\sqrt2}{2}$ | $\frac12$ | $0$ |
| $\sin\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}{2}$ | $\frac{\sqrt3}{2}$ | $1$ |

The other quadrants use the same reference values with signs determined by the
coordinates of the point.
