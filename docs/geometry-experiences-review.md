# Curved surfaces and orbital precession: implementation review

Reviewed 9 September 2026. These are original code-native experiences, integrated at Chapter 4.1 and the perihelion discussion in Chapter 16. They replace neither a mathematical definition nor a full geodesic calculation; their questions, maps and approximations are explicit in the interface.

## What the surface actually represents

The object is the smooth graph

\[
F(x,y)=\left(x,y,0.38\sin(1.3x)\cos(1.15y)+0.16(x^2-y^2)\right).
\]

It is a two-dimensional surface embedded in Euclidean three-space. Coordinates and heights are dimensionless. Its inverse projection reads the first two components, and the two parameter derivatives are linearly independent: the determinant of their first two components is one. Thus there is no singular point hidden behind an attractive rendering.

Two restricted charts cover open disks of radius 1.35. Chart A uses origin \((-0.55,0)\) with unrotated axes. Chart B uses origin \((0.55,0.15)\), with axes rotated by \(\pi/5\). The transition on their overlap is a translation followed by a rotation. The visible rim marks the domain's limiting boundary; the chart contains the interior. This graph also admits one global projection chart, a fact the explanation states explicitly. The two patches demonstrate overlapping descriptions; they do not falsely demonstrate that every surface requires multiple charts.

The selected rose point is shared by the 3D surface and flat map. Chart switching preserves that point and changes its coordinates. A chart that does not cover the point reports that limitation instead of inventing a coordinate pair. The names remain fixed: A uses \((u,v)\), B uses \((u',v')\). The optional tangent plane is the first-order plane through the point, calculated from the analytic partial derivatives. It does not claim to flatten a finite curved neighborhood isometrically.

The smooth shaded mesh, subtle contextual lines, chart grids and local plane are generated from the same functions. The faded outer edge is a finite rendering window, not a boundary of the mathematical manifold. This surface is an instructional example, not a depiction of four-dimensional spacetime. Background definitions are supported by [Gualtieri's university differential-geometry notes](https://www.math.toronto.edu/mgualt/courses/18-367/docs/DiffGeomNotes-5.pdf).

## What the orbit actually represents

The physical advance uses the leading weak-field result

\[
\Delta\varpi=\frac{6\pi GM}{a(1-e^2)c^2}.
\]

The fixed parameters are approximate Sun–Mercury values: \(a=5.7909\times10^{10}\,\mathrm m\), \(GM/c^2=1476.625\,\mathrm m\), and a reference period of 87.969 days. With \(e=0.2056\), the result is about 0.1035 arcseconds per radial cycle, or 43 arcseconds per century. The formula and comparison are supported by [Tong's GR chapter, “Perihelion Precession”](https://www.damtp.cam.ac.uk/user/tong/gr/grhtml/S1.html).

The rendered construction retains a Kepler ellipse's radial law, while advancing its angular phase:

\[
\frac ra=\frac{1-e^2}{1+e\cos\chi},\qquad
\varphi=\left(1+\frac{A\Delta\varpi}{2\pi}\right)\chi.
\]

Here \(\chi\) increases by \(2\pi\) per radial cycle. The actual-scale setting uses \(A=1\); the reveal setting uses \(A=300\,000\). Only the extra angular advance is magnified. This is an explanatory precessing-ellipse model for the leading accumulated effect, not an exact Schwarzschild trajectory. Smaller periodic relativistic changes to the radial motion are omitted. The large displayed advance must not be interpreted as an orbit in a stronger physical field.

Animation uses Newtonian Kepler timing on the reference ellipse, not uniform angular speed. One radial cycle takes seven screen seconds. The star and planet markers are enlarged. Solar spin, oblateness, planetary perturbations and radiation reaction are omitted. Changing eccentricity keeps the Sun's mass and Mercury's semi-major axis fixed, creating a hypothetical orbit; the interface stops calling it Mercury's orbit. The control excludes a perfect circle because a circle has no distinguished perihelion.

## Interaction, narration and rendering contract

- `geometryExperienceHTML(type, {reference})` produces complete markup, authored hidden narration and a static SVG fallback. Types are `manifold` and `precession`.
- `initGeometryExperiences()` returns a cleanup function for page navigation. It removes event listeners, observers, animation callbacks and WebGL resources.
- `getGeometryExperienceSource(elementOrId)` returns a concise current-state explanation with TeX delimiters. The same text is published as `data-narration-source` for the assistant. Meaningful parameters are serialized in `data-visual-state`.
- `getGeometryExperienceState()` and `restoreGeometryExperienceState()` expose state to the application. Restoration pauses playback rather than unexpectedly restarting it.
- The map supports pointer manipulation and arrow-key/Home equivalents. The 3D scene supports direct rotation and keyboard orbit/reset. The orbital experience has play/pause, next-perihelion, reset, actual/reveal scale and an eccentricity control.
- Animation never starts automatically. A reduced-motion preference therefore starts with a still picture; explicit Play remains available. Animation stops advancing while the experience is offscreen or the document is hidden.
- Both experiences retain their working SVG representation and controls without WebGL. A lost WebGL context reveals the same fallback. All mathematical UI labels use KaTeX; the canvas itself contains no rasterized text.

## Actual visual review

The first render was not accepted. The surface was overlit and the initial cameras left both models too small. The revision introduced tone mapping and a darker surface material, fitted the surface from projected geometry, fitted the orbit to eccentricity and viewport, and made the tangent plane's outline visible. It reduced the oversized title, restored Manrope for interface text, increased measurement labels, and moved Listen/Explain into the top line. The current surface can be seen as a curved object before reading its equation.

Phone review found a second issue: mathematical readouts touched the right edge. They now reserve four pixels for glyph overhang and wrap a label/value pair when necessary. The visual-status region has its own hidden styling, rather than assuming an unavailable utility class. Screenshot-only capture hides the app's skip link and expands viewport height to avoid cropping tall examples; these changes do not alter the product UI or substitute for normal-viewport layout assertions.

The default Mercury-shaped ellipse is fairly close to circular, as it should be. Increasing eccentricity makes the geometry more visually dramatic; the default shape is not exaggerated merely for spectacle. The flat map is intentionally simpler than the surface because its job is to expose the coordinate assignment. Neither experience is described as a research simulator or as a substitute for the book's derivation.

## Verification and evidence

Dedicated checks live in `scripts/check-geometry-experiences.mjs`. Numerical assertions independently check chart inversion and overlap, rank of finite-differenced tangent maps, analytic height derivatives, exact perihelion/aphelion radii of the displayed model, ellipse membership, equal-area timing, angular advance per radial cycle and the Mercury comparison.

Browser checks run at 1440- and 390-pixel viewport widths in both themes. They exercise chart switching with fixed point and fixed notation, inside/outside coverage, tangent-plane control, keyboard movement, eccentricity changes, actual scale, reset, explicit playback under reduced motion, pause, next-perihelion, offscreen suspension and both no-WebGL fallbacks. Assertions cover KaTeX errors, runtime errors, page overflow, current-state narration, visible point-label bounds, readout bounds and toolbar placement.

The final suite passed all eight viewport/theme combinations against the third coordinated build, including the fixed chart notation, mathematical readout bounds and toolbar placement. It reported zero page errors. Its machine-readable outcome is `qa/geometry-experiences-report.json`.

Evidence captures:

| Experience | Desktop light | Desktop dark | Phone light | Phone dark |
|---|---|---|---|---|
| Surface and charts | [View](../qa/geometry-experience-manifold-1440-light.png) | [View](../qa/geometry-experience-manifold-1440-dark.png) | [View](../qa/geometry-experience-manifold-390-light.png) | [View](../qa/geometry-experience-manifold-390-dark.png) |
| Orbital precession | [View](../qa/geometry-experience-precession-1440-light.png) | [View](../qa/geometry-experience-precession-1440-dark.png) | [View](../qa/geometry-experience-precession-390-light.png) | [View](../qa/geometry-experience-precession-390-dark.png) |

Reviewed browser assets: `geometry-experiences-a358b3cec9e9.js` and `geometry-experiences-135c5dd7b290.css`. The final source-link cleanup affects generated markup only.
