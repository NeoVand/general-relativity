# Review of the guided visual arguments

These five original experiences are part of an authored progression, not replacements for all of the book's existing illustrations. They turn specific mathematical claims into inspectable examples. Their controls change quantities that matter to the argument; the adjacent lesson provides the derivation, assumptions, prerequisite links, and practice.

## Mathematical models and teaching choices

| Lesson | What the model actually computes | Important boundary |
| --- | --- | --- |
| Two maps, one sphere | North- and south-pole stereographic projection of a unit sphere: `(u,v)=(X,Y)/(1−Z)` and `(p,q)=(X,Y)/(1+Z)`. Both addresses update from the same point. The excluded north pole is explicitly undefined in one chart and regular in the other. | Five authored point presets, rather than arbitrary point picking. The sphere's embedding constructs this example; an embedding is not part of the definition of a manifold. |
| Metric rulers | A polar cell in the Euclidean plane, with exact radial side `Δr`, exact circular arc `r Δθ`, tangent norm `sqrt(Δr²+r²Δθ²)`, and exact straight endpoint distance `sqrt(Δr²+2r(r+Δr)(1−cos Δθ))`. | The finite tangent prediction is not mislabeled as the exact endpoint distance. Each cell is magnified to fit with equal physical scale in both directions; the magnification is disclosed. |
| Moving bases | The same Cartesian vector `(1,0)` expanded in the orthonormal polar frame, with components `(cos θ,−sin θ)`. The derivative of the component contribution is `(0,−1)` and the derivative of the basis contribution is `(0,1)`. | Hatted orthonormal components are distinguished from coordinate components, especially the additional factor `1/r` in the angular coordinate component. Controls show degrees; derivatives use radians. |
| Parallel transport | Exact rotations along the great-circle route `A=(1,0,0) → N=(0,0,1) → B=(0,1,0) → A`, carrying the tangent vector `z → −x → −x → y`. It preserves norm and tangency and has a purely normal ambient derivative on each arc. | A one-point tangent projection is introduced first, but a finite projection is not claimed to be transport. The local transport rule projects the derivative. The final right-angle mismatch is an explicit octant calculation; it is not offered as a proof of the general curvature–area theorem. |
| Horizon causal directions | Radial Schwarzschild null directions in regular ingoing coordinates, with `ρ=r/r_s` and `τ_plot=cv/r_s−ρ`, where `v` is in seconds. Ingoing slope is `−1`; outgoing slope is `(ρ−1)/(ρ+1)`. | These arrows are local tangent directions, not full finite light trajectories. Plot time is not proper time. The construction is stationary Schwarzschild; a vanishing coordinate speed does not generally define an event horizon. |

The chart includes an exact off-meridian point `(2/3,1/3,2/3)`. It has `(u,v)=(2,1)` and `(p,q)=(2/5,1/5)`, so the example exercises both coordinates rather than restricting all exploration to a meridian.

## Changes made after visual criticism

- The first metric-cell framing made the cell too small. Its local magnification now uses the larger physical side to occupy the drawing area. Numerical readouts distinguish the tangent estimate from the endpoint distance, and compact two-column readouts preserve that comparison on phones.
- The sphere wireframes were too faint, especially in dark mode. Increased wire contrast, added restrained surface shading, and used an opaque transport sphere so back-side lines no longer compete with the active path.
- A fixed exterior-wide causal map made the inside-horizon cone tiny. The coordinate window now magnifies near the horizon, displays the new ticks, and keeps equal unit scales on both axes. The horizon and both inward future directions remain visible.
- Mathematical labels are typeset with KaTeX. SVG contains geometry only. Overlay positioning follows the SVG's actual fitted viewport, including letterboxing; formulas are not stretched to fit.
- Short presets and one fine-track angle control replace bulky, unrelated sliders. Narration actions share the top line, preserving the same alignment as the other controls.
- The initial no-WebGL chart schematic was a meridian section. Adding the off-meridian example required a true orthographic sphere projection in the fallback as well.

## Inspection and verification

`scripts/check-visual-lessons.mjs` independently verifies chart inversion and transitions, metric convergence to the infinitesimal limit, basis-derivative cancellation, transport tangency/norm/normal-derivative conditions, and the null condition for both radial light directions. These checks do not merely compare a displayed number with the same implementation's output.

The browser suite exercises all five experiences at 1440px and 390px in light and dark themes: 20 page/theme/viewport combinations, with every preset visited. It checks mathematical label bounds and overlap, page overflow, typesetting errors, persistent state, preservation of authored narration and aligned listening controls, and the no-WebGL fallback. It also checks that a non-preset angle clears the preset selection.

Screenshots in ignored `qa/visual-lesson-{type}-{width}-{theme}.png` record the integrated book. `qa/visual-lessons-report.json` records the tested states. Additional standalone images in `qa/visual-final-*` were used for the shading, local-cell, and inside-horizon iterations. Inspection focused on geometry as well as CSS: whether the active point, direction, tangent plane, physical rulers, or horizon remains interpretable.

## Runtime behavior and limits

The experiences redraw on interaction, resize, or theme changes. They have no continuous animation loop; offscreen 3D rendering is suspended. A useful SVG diagram stays available when WebGL is unavailable or its context is lost. Mathematical readouts and controls remain ordinary accessible DOM content.

Each lesson saves its meaningful parameter state locally and exposes it to the course/tutor through `getVisualLessonState`, `restoreVisualLessonState`, and `gr:visual-change`. Notebook restoration recovers selected points, ruler settings, angle, transport step, and causal-event position. Camera orientation is an inspection aid and is not included in a saved learning-state snapshot.

These are deliberately bounded demonstrations. They do not yet provide arbitrary manifold construction, general-curve transport, arbitrary chart-point dragging, numerical ray integration, or a complete differential-geometry laboratory. The local causal diagram complements the separate authored global-causality material; it does not replace that material.
