# Visual and numerical review

The HTML edition was inspected at desktop (1440 × 1000) and mobile (390 × 844)
widths. Every SVG was rendered independently at its native viewBox size and
reviewed in five contact sheets, with full-size inspection of dense or corrected
figures. The gallery is available in the published visual atlas.

## Changes prompted by inspection

- Corrected nine figures with overlapping labels: vector/covector, light cone,
  Killing symmetry, GPS, horizon cones, expansion, determinant, tossed clock,
  and conformal horizons. Moved axis labels out of titles and separated tick
  numbers from captions. Rechecked the exported SVG geometry after each change.
- Replaced the connection diagram's awkward pseudo-index label with a plainly
  identified coefficient and a clean cancellation; the exact indexed formula
  remains in the chapter.
- Removed an annotation intersecting a radial tidal arrow.
- Used true projected spherical great-circle arcs for holonomy, exact Rindler
  hyperbolae, and the correct Eddington–Finkelstein outgoing and ingoing slopes.
- Made the non-affine parameter map regular at its starting point, while
  preserving visibly unequal spacing. Renumbered figures in reading order.
- Qualified ellipses as first-order cloud sections; distinguished exact volume
  conservation from a vanishing initial trace. Marked exaggerated strain,
  weak-field deflection, schematic orbit rotation, and qualitative Page curves.
- Kept mobile SVG labels at a readable scale through bounded horizontal scrolling
  and explicit full-size links. Captions and alternative descriptions remain
  accessible without opening the image.
- Fixed sidebar initialization that could displace an incoming section anchor.
- Isolated screen-reader MathML boxes after Chromium's intrinsic MathML layout
  produced a seven-pixel mobile document overflow. The visible math and semantic
  MathML are both retained; long visible equations scroll within their own box.
- Made the closed mobile sidebar non-focusable through CSS visibility, added
  Escape/focus restoration, and checked search, theme, text size, and checkpoints.

## Numerical and mathematical checks

The new calculations have explicit model assumptions and independent numerical
calibrations in `scripts/check-site.mjs`:

| Quantity | Computed value or relationship |
| --- | --- |
| GPS altitude contribution, ideal spherical Earth | +45.724 microseconds/day |
| GPS orbital-motion contribution | −7.211 microseconds/day |
| Net GPS clock gain in that model | +38.514 microseconds/day |
| Circular-orbit clock crossover | r = 1.5 R; altitude R/2 |
| Earth surface radial curvature magnitude | approximately 3.43 × 10⁻²³ m⁻² |
| One-second tossed-clock excess | approximately 44.615 attoseconds |
| Twin example at 0.6c over ten home years | eight traveller years |
| Ideal nonspinning area-theorem radiation bound | 1 − 1/√2 ≈ 29.289% |
| Sphere connection curvature | d(−cosθ dφ) = sinθ dθ ∧ dφ |

The build treats invalid LaTeX as a failure, rather than silently showing raw
source. Static checks verify every local link and section anchor, every figure's
placement, accessible figure titles/descriptions, and the absence of invalid
coordinates. Browser checks cover all 34 HTML pages at both widths, all image
loads, the three experiments, search, section links, and reading controls.
The figure check detects text collisions and text outside each viewBox. It does
not claim to prove mathematical correctness or replace the visual inspection.

The CI workflow repeats these checks and preserves screenshots and JSON reports
as its `visual-inspection` artifact. Local evidence is written to ignored `qa/`.

## Complete figure inventory

| No. | Chapter | Figure | What the caption explicitly checks or limits |
| --- | --- | --- | --- |
| 01 | 0 | [A derivative predicts the next small step](../assets/figures/local-prediction.svg) | The tangent captures the value and first derivative. Curvature enters at the next order; the same hierarchy will appear in a local expansion of the metric. |
| 02 | 1 | [One laboratory is not enough](../assets/figures/free-fall-comparison.svg) | The paired experiment measures relative acceleration. Curved drawn paths are coordinate schematics; their appearance alone is not evidence of curvature. |
| 03 | 1 | [A century of consequences](../assets/figures/historical-timeline.svg) | Dates label selected developments, not a complete priority history. The 2015 LIGO event was publicly reported in 2016. The text discusses the collaborative and iterative development of the field equations. |
| 04 | 2 | [Arrows and the questions they answer](../assets/figures/vector-covector.svg) | The covector dx returns the change in x, not the Euclidean length of the arrow. Changing the coordinate scale changes both components so their pairing stays the same. |
| 05 | 3 | [The minus sign creates a light cone](../assets/figures/light-cone.svg) | The graph uses the same scale for x and ct. A massive observer follows a timelike worldline; no rest frame exists for a light ray. |
| 06 | 3 | [Two histories between the same events](../assets/figures/twin-worldlines.svg) | The idealized travelling clock accumulates 10√(1 − 0.6²) = 8 years. The sharp turnaround is an approximation; the path integral, not a local feeling of slow time, gives the age difference. |
| 07 | 4 | [Coordinates are not rulers](../assets/figures/polar-metric.svg) | For an infinitesimal cell, the angular edge is r dθ and the radial edge is dr. The finite cell is enlarged for visibility; the plane is intrinsically flat. |
| 08 | 4 | [Why a determinant belongs in the volume](../assets/figures/metric-volume.svg) | This Euclidean two-dimensional example explains the square root of the metric determinant. In four-dimensional Lorentzian geometry the positive measure uses √(−g). The drawn transformation is illustrative. |
| 09 | 5 | [Acceleration without curvature](../assets/figures/rindler-worldlines.svg) | Each curve is a stationary rocket-frame observer. In a rigid accelerated laboratory, different heights require different proper accelerations. These worldlines occupy flat Minkowski spacetime. |
| 10 | 5 | [Do not confuse a route with its parameter](../assets/figures/affine-parameter.svg) | This flat straight-line illustration isolates parameter choice. Affine parameters are related by λ ↦ aλ + b; an arbitrary nonlinear relabeling changes the standard coordinate form of the geodesic equation. |
| 11 | 6 | [Different components can describe the same arrow](../assets/figures/moving-basis.svg) | The ordinary component derivatives see changing numbers. The connection correction accounts for the basis change. Together they report that this field is constant. |
| 12 | 7 | [The connection cancels a false change](../assets/figures/connection-cancellation.svg) | This is an exact calculation on the flat polar plane. The derivative direction is θ. The full indexed equation in the chapter identifies the single connection coefficient used in this cancellation. |
| 13 | 8 | [A sphere remembers the loop](../assets/figures/sphere-holonomy.svg) | Great-circle transport around this octant rotates a tangent vector by 90°. Projection changes apparent angles on the page; the right angles and 90° rotation are intrinsic to the sphere. |
| 14 | 8 | [From 256 slots to 20 independent entries](../assets/figures/curvature-count.svg) | Riemann antisymmetry creates six pair labels; pair-exchange symmetry leaves 21 entries. The algebraic Bianchi identity removes one in four dimensions. This counts local tensor components, not propagating gravitational degrees of freedom. |
| 15 | 9 | [Volume and shape ask different questions](../assets/figures/ricci-weyl.svg) | These are exaggerated cross-sections of infinitesimal clouds, not exact finite volume-preserving motions. The trace controls initial volume acceleration for an initially comoving cloud; shear can later change the volume. |
| 16 | 10 | [Stretching and squeezing near Earth](../assets/figures/tidal-eigenvalues.svg) | The labels give eigenvalues of the Newtonian relative-acceleration matrix, not curvature components: divide by c² for the corresponding curvature scale, with the convention-dependent sign tracked in the text. |
| 17 | 11 | [The source has more than one kind of entry](../assets/figures/stress-energy.svg) | S is energy flux, π is momentum density, and σ denotes the spatial stress entries using the momentum-flux convention. The tensor is symmetric in ordinary metric GR. |
| 18 | 12 | [Read the equation as a relationship](../assets/figures/einstein-anatomy.svg) | The equation constrains spacetime geometry and matter together. It is not a recipe that chooses arbitrary matter independently of its own dynamics and conservation. |
| 19 | 12 | [Where the factor of eight comes from](../assets/figures/newtonian-calibration.svg) | The displayed component estimates assume weak, stationary fields and slow pressureless matter, with x⁰=ct. The matching is performed in the chapter with the full index conventions. |
| 20 | 13 | [A derivative of whole paths](../assets/figures/action-variation.svg) | A variation is a mathematical comparison with nearby candidate histories. The physical stationary path is found by requiring the first action change to vanish for every allowed variation. |
| 21 | 14 | [Two variations make one field equation](../assets/figures/action-product-rule.svg) | The boundary divergence requires its own treatment. After that treatment, the bulk coefficient of the arbitrary inverse-metric variation is the Einstein tensor. |
| 22 | 14 | [Fixing the value does not fix the slope](../assets/figures/boundary-variation.svg) | The scalar graph is an analogy for each metric variation component along a normal direction. It explains why the Einstein–Hilbert action needs appropriate boundary treatment even when the boundary metric is fixed. |
| 23 | 15 | [A symmetry supplies an energy comparison](../assets/figures/killing-energy.svg) | The drawing is schematic. A timelike Killing vector provides a stationary energy; normalization and the observer’s local energy measurement must still be specified. |
| 24 | 16 | [A ray samples more than the clock rate](../assets/figures/light-bending.svg) | This is the shape from a first-order weak-field deflection profile, with its amplitude enlarged. The book derives why keeping only the clock term misses half the leading GR deflection. |
| 25 | 16 | [A slowly turning orbit](../assets/figures/perihelion-precession.svg) | The curves are schematic successive Kepler ellipses, compressed vertically for layout, not a numerical integration of an exact relativistic orbit. The text derives the small secular advance and states its regime. |
| 26 | 16 | [Altitude and motion compete](../assets/figures/gps-clocks.svg) | Calculated for circular orbits around a nonrotating spherical Earth and compared with a stationary surface clock. Real GPS also models rotation, eccentricity, the geoid, and signal propagation. |
| 27 | 16 | [The tossed clock records more time](../assets/figures/tossed-clock.svg) | This calculation assumes uniform g, weak gravity, slow motion, and negligible launch/catch durations. The shelf clock and tossed clock share both comparison events. |
| 28 | 17 | [Do not merge these three radii](../assets/figures/black-hole-radii.svg) | Circle radii are proportional to the Schwarzschild areal coordinate r. The drawing is a radial coordinate guide, not an isometric picture of spatial proper distances. |
| 29 | 17 | [A horizon changes which way the future goes](../assets/figures/horizon-cones.svg) | The diagram uses regular ingoing coordinates, not singular Schwarzschild time. Cone slopes follow dr/dT = −1 and (r − rₛ)/(r + rₛ). T is a drawing coordinate, not a freely falling clock reading. |
| 30 | 18 | [Two independent patterns of strain](../assets/figures/wave-polarizations.svg) | The figure shows a local detector-frame interpretation at one phase, to first order in strain. Real astrophysical strains at Earth are vastly smaller; the interactive figure lets you move through a cycle. |
| 31 | 19 | [Expansion is not the same as acceleration](../assets/figures/cosmic-expansion.svg) | Each ideal flat model is normalized to a(1)=1. The exponential curve uses H=2/3 in these plot units; it does not begin with a finite-time big bang in this slicing. These are separate single-component universes. |
| 32 | 19 | [A causal horizon is not just a distance scale](../assets/figures/cosmic-horizons.svg) | The diagram depicts a model with finite past and future conformal intervals. Their lengths determine particle and event horizons. Other expansion histories can lack one or both boundaries; c/H is a different construction. |
| 33 | 20 | [Lapse and shift separate two choices](../assets/figures/adm-slicing.svg) | Lapse controls normal proper-time separation; shift controls the tangential relabeling. Arrow lengths are schematic and do not represent an ordinary Euclidean decomposition of a Lorentzian norm. |
| 34 | 20 | [Two physical degrees of freedom, counted honestly](../assets/figures/constraint-count.svg) | This is the local canonical count for ordinary four-dimensional GR, with first-class constraints. Four remaining phase-space functions describe two propagating configuration degrees of freedom. |
| 35 | 21 | [Same method, different curvature](../assets/figures/cartan-comparison.svg) | These are local formulas on regular angular charts. The polar origin and sphere poles need other frames; a singular coordinate expression there is not an extra curvature singularity. |
| 36 | 22 | [Focusing is not yet a singularity](../assets/figures/focusing-caustic.svg) | This flat-spacetime schematic intentionally has no curvature. Raychaudhuri can force a congruence to focus, but singularity theorems require additional causal and global assumptions to conclude geodesic incompleteness. |
| 37 | 22 | [Two areas constrain one remnant](../assets/figures/horizon-area.svg) | The equality illustration is the bound’s limiting case, not an achievable merger prediction. Initial binding energy is neglected, and all holes are assumed nonspinning; Kerr horizons require a different area formula. |
| 38 | 22 | [The information question has a shape](../assets/figures/page-curve.svg) | Axes are qualitative and the curves are not a quantitative evaporation solution. A final pure radiation state has zero fine-grained entropy for the whole radiation system; individual portions can remain mixed. |
| 39 | 23 | [A theory has a resolution scale](../assets/figures/effective-theory.svg) | This is a hierarchy diagram, not a measured error curve. The cutoff depends on the theory and physical setting; the text distinguishes gravitational scales from other possible new-physics scales. |
| 40 | 24 | [From a metric to a measurement](../assets/figures/calculation-map.svg) | The observer can often be chosen earlier. This map is a practical organizing sequence; it is not a claim that every problem needs every tensor computed explicitly. |

## Explorable visual overhaul — September 8, 2026

Replaced the reading interface and cover, introduced Newsreader and Manrope, added Hugeicons, and built a five-role semantic math palette with separate light/dark values. Converted 231 mathematical figure labels to explicit LaTeX and vector glyphs. Captions and checkpoints now use the same typesetting pipeline as the manuscript. Preserved the mathematical token sequence of all 2,474 manuscript expressions.

Eight new Three.js labs were inspected at 1440px and 390px in both themes (32 combinations). Endpoint checks cover octant transport, tidal scale factors, the embedding profile, displacement pairing, cone speed, expansion scale, wave phase, and ADM shift. Inspection caught and corrected overlapping covector labels, clipped tidal/expansion labels, excessive mobile embedding cropping, and distracting sphere back-grid lines. A blocked-WebGL check verified the dark-theme inline vector fallback.

All 35 pages passed desktop/mobile checks (70 combinations). All 40 SVGs were inspected in both themes with the deployed description font and bounding boxes for both ordinary text and LaTeX glyphs; no label overlap or clipping remained. Reviewed five contact sheets spanning all figures, plus the cover, atlas directory, full-size viewer, mobile embedding, and individual 3D labs. The primary semantic text colors have contrast ratios of at least 4.54:1 on the light reading/equation surfaces; dark equivalents exceed 7:1 on the scene backgrounds.

The GitHub Actions workflow now also runs the 3D experience checks before publication and preserves the screenshot/report artifact. Scientific illustrations retain their stated approximation limits; visual QA is not a claim of independent peer review of the entire manuscript.
