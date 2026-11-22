(area-and-volume)=
# 15. Area and Volume

Integration models a three-dimensional object by adding contributions from
thin slices. The difficult part is usually geometric: identifying a typical
slice and expressing its size in one variable.

## 15.1 Area between curves

If $f(x)\ge g(x)$ on $[a,b]$, then the area between their graphs is

$$
A=\int_a^b\bigl(f(x)-g(x)\bigr)\,dx.
$$

Think “top minus bottom.” With horizontal slices, the corresponding rule is
“right minus left.”

When the curves exchange order, find their intersections and split the
integral. Geometric area must not become negative.

The subtraction comes from the length of one representative slice. A
vertical rectangle has height

$$
\text{upper }y-\text{lower }y
$$

and thickness $dx$. A horizontal rectangle has length

$$
\text{right }x-\text{left }x
$$

and thickness $dy$. Choose the direction that describes the region without
unnecessary splitting.

```{anywidget} ../_widgets/area_between_curves.js
{"orientation": "vertical", "slice": 1}
```

## 15.2 Cross-sections

If a solid has cross-sectional area $A(x)$ perpendicular to the $x$-axis,
then

$$
V=\int_a^b A(x)\,dx.
$$

The formula does not require circular slices. Squares, triangles, and
semicircles all fit the same pattern once their area is written in terms of
$x$.

The setup always begins with one slice:

1. identify its thickness, $dx$ or $dy$;
2. express its dimensions using the same variable;
3. write the slice's area formula; and
4. integrate from the first slice to the last.

The integral is determined by the slice geometry, not by the appearance of
the finished solid.

## 15.3 Disks and washers

Rotating a region around an axis produces circular cross-sections.

For a disk of radius $R(x)$,

$$
A(x)=\pi R(x)^2.
$$

For a washer with outer radius $R(x)$ and inner radius $r(x)$,

$$
A(x)=\pi\bigl(R(x)^2-r(x)^2\bigr).
$$

Radii are distances from the axis of rotation, so they must be nonnegative.
For rotation around the horizontal line $y=c$, a radius is typically
$|f(x)-c|$. Determine which boundary is farther from the axis before naming
the outer and inner radii.

Use the interactive slice to connect the two-dimensional region, the
rotated solid, and the integral.

```{anywidget} ../_widgets/volume_slices.js
{"family": "line", "x": 1}
```

### Read the figure

1. Move the slice. Which dimension becomes the disk radius?
2. Why is the radius squared in the volume integrand?
3. Compare the disk areas near the two endpoints. Which slices contribute
   most to the volume?
4. Switch among disks, washers, and square cross-sections. Which part of the
   setup changes, and which part remains $\int A(x)\,dx$?

## 15.4 Choosing a slice direction

Before writing an integral:

1. sketch the region and axis of rotation;
2. draw one representative slice;
3. decide whether the slice is vertical or horizontal;
4. express every radius or side length in that slice's variable; and
5. determine where the slice begins and ends.

A vertical slice means integration with respect to $x$; a horizontal slice
means integration with respect to $y$.

After choosing the direction, keep every part of the setup consistent. A
$dx$ integral needs $x$-bounds and dimensions written as functions of $x$.
A $dy$ integral needs $y$-bounds and dimensions written as functions of $y$.

```{warning}
Common setup errors are using a diameter as a radius, subtracting radii before
squaring in a washer, and mixing $x$-bounds with a $dy$ integral.
```

## 15.5 Example: rotating a triangular region

Rotate the region under $y=x$ from $x=0$ to $x=2$ around the $x$-axis.
Each cross-section is a disk of radius $x$, so

$$
V=\int_0^2\pi x^2\,dx
=\pi\left[\frac{x^3}{3}\right]_0^2
=\frac{8\pi}{3}.
$$

The units are cubic because cross-sectional area is multiplied by thickness.

## 15.6 What to carry forward

Area and volume formulas are not separate facts to memorize. Both come from
adding thin pieces: height times width for area, and cross-sectional area
times thickness for volume.
