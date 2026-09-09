# Polar coordinates and vector fields

This increment adds two experiments to the reading order, with the corresponding prose rewritten around what the reader can see. It completes these two rows of the redevelopment ledger, not the full geometry or book review.

## Chapter 4: polar coordinates

The coordinate experiment precedes the first polar transformation in §4.2. It shows square and polar grids on one flat plane, with labeled origin, selected point, radius, angle and axes. A pointer drag and keyboard-accessible sliders control the same state. At radius zero, the angle readout is explicitly undefined. The angular-step view compares the circular arc and straight chord at a fixed scale. §4.5 returns to this picture before deriving the metric.

The model uses Cartesian conversion, exact arc length and the exact chord formula. Tests compare the chord against independently computed endpoint separation, check coordinate round trips and the small-angle limit, and exercise the origin. The finite arc is never described as a finite straight distance.

## Chapter 6: differentiating a field

The field experiment precedes the first basis formula in §6.1. It samples four prescribed velocity fields: uniform translation, expansion, rotation and shear. All arrows in the field use one scale. The comparison plot has its own labeled velocity axes. Thin gold arrows are explicitly identified as unit frame directions, not velocities. Field samples are explicitly distinguished from particles.

The two velocities can be compared after ordinary Euclidean translation to one origin. Their polar components are displayed separately. Uniform flow demonstrates changing components without vector change; expansion and rotation on a fixed-radius circle demonstrate vector change without component change. A disclosure adds an exact finite decomposition into component and frame contributions. It explains the matrix notation before using it, including why the second term uses the endpoint components.

Tests verify orthonormality, the finite product identity, known analytic polar components, and agreement with an independent Simpson integration of the analytic field derivatives along the circular path. These tests do not infer teaching effectiveness from mathematical agreement.

## Interface and integration

Both experiments reuse Spacetime Lab headings, controls, icon actions, colors and range styling. Browser checks exercise pointer input, keyboard input, all choices, reset, saved-state recovery, both themes, 390 px and 1440 px viewports, required annotation bounds, and JavaScript-disabled explanations. Screenshots are generated under `qa/polar-*` and `qa/field-*` for inspection. Mobile annotation clipping and an angle/radius label collision found during review were corrected.

Each experiment forms a single semantic reading passage. Its narration and scientific context update from deterministic model state. No AI-generated result changes the model. The course prerequisite check, site validation and Svelte check also pass. Real learner walkthroughs remain part of the release review.
