# Review of the geometric apprenticeship

Authored 8 September 2026. Scope: six new guided lessons in `content/geometry-lessons.mjs`, intended to be integrated into the existing course. This is a bounded improvement to the foundations of the book, not a claim to have supplied a complete differential-geometry degree or resolved every prerequisite in the advanced chapters.

## What the lessons establish

| Lesson | Existing insertion heading | New intellectual work | Independent transfer task |
|---|---|---|---|
| Change the coordinates. Keep the measurement. | §2.4 | Follow a nonlinear coordinate change, transform a tangent, independently rewrite a scalar field, and recover the invariant covector pairing. Distinguish point transformation from the Jacobian's linear action at a point. | Change both the scalar field and tangent; recover the rate using the new coordinates. |
| Give one sphere two reliable addresses | §4.1 | Construct stereographic projection from its line equation; recover the point with the inverse; transform a tangent between charts. Explain chart domains rather than treating exploding coordinates as broken geometry. | Differentiate a quotient along a path at a new chart point. |
| Teach a coordinate grid how to measure | §4.5 | Derive the polar metric from Cartesian differentials and explain its units. Distinguish coordinate angle, local physical length, finite chord, and exact instantaneous speed. | Combine radial and angular rates into a physical speed. |
| An unchanged arrow can have changing components | §6.2 | Explicitly differentiate both components and rotating unit basis vectors, show the cancellation, and extract the connection correction. Separate orthonormal components from coordinate components. | Convert a physical velocity into an angular coordinate rate using both projection and the radius factor. |
| Carry a direction home—and find it changed | §8.3 | Build tangent projection, verify parallel transport on a great circle, calculate all three arcs of an octant loop, and compare vectors in the same tangent plane. | Use physical loop area and sphere radius to calculate holonomy with units and convert radians to degrees. |
| Measure curvature without leaving the surface | §8.6 | Derive the sphere's geodesic-circle circumference, isolate its small-circle deficit, and obtain an intrinsic curvature measurement. Use the cylinder as a control for extrinsic bending. | Infer an unknown sphere radius from measured lengths, then check that the small-circle approximation is self-consistent. |

Each lesson has an initial question, an intuitive account, a sequence of justified steps, a more formal account, exact prerequisite links, a conceptual question with mistake-specific feedback, a changed-context numerical transfer task, and a one-sentence takeaway. Correctly choosing a conceptual answer and independently completing a transfer calculation are different pieces of evidence; neither should be inferred merely from opening the explanation.

The map lesson deliberately reuses the manuscript's two-chart sphere convention rather than introducing a competing atlas. The new contribution is a concrete projection construction and tangent transformation, with the original prose retained as a reference. The polar plane recurs when the connection is introduced, letting the reader compare the same geometry with one more mathematical structure available.

## Mathematical qualifications preserved

- The nonlinear shear uses dimensionless quantities, so adding a squared coordinate to another coordinate is dimensionally well defined. It has a smooth global inverse on the plane. The examples do not imply that every nonlinear coordinate map is globally invertible.
- Covectors written as rows transform by the inverse Jacobian. The inverse transpose is needed when those same components are stored as columns. The lesson names this bookkeeping distinction instead of presenting two apparently inconsistent laws.
- The stereographic chart images are the entire coordinate plane. Their overlap excludes the origin. The north and south chart exclusions refer to different sphere points. The nonzero negative determinant reverses coordinate orientation; it is not a physical rotation, a metric, or an indication of curvature.
- The polar metric is exact on tangent vectors. Substitution of finite increments estimates an endpoint distance only locally. A two-leg radial-plus-circular path has another length. The origin is a polar-chart defect, not a degeneracy of the Euclidean metric.
- Hatted radial and angular components refer to a unit frame. The polar coordinate angular basis has length equal to the radius. The lesson supplies the conversion explicitly before invoking connection coefficients.
- The projection construction identifies the Levi-Civita connection for the metric induced on the sphere. An arbitrary connection need not be that one. A single finite projection is not exact transport; it generally loses norm. The differential equation preserves norm because the ambient derivative is normal and the vector tangent.
- The octant loop has a specifically stated order and initial vector. Its computed rotation magnitude is a right angle. Reversing the loop reverses the signed rotation. The more general curvature–area theorem is identified as a stated result rather than a consequence proved by one example. Holonomy angles are interpreted modulo a full turn.
- The geodesic-circle construction measures the radius along the surface, not through the ambient space. The exact circumference formula holds before the antipode. The small-circle estimate includes its expansion parameter and does not license applying the limiting formula unchanged to a large circle.
- The cylinder comparison uses an unwrapped local patch and a sufficiently small geodesic circle. It does not ignore global wrapping or confuse global topology with local curvature.
- The scope of proof is explicit: the shear invariance, atlas compatibility, polar metric, basis cancellation, octant transport, and spherical circumference are worked through. General intrinsic-curvature and global Gauss–Bonnet theorems are not advertised as proved.

## Source review and editorial choices

All explanations, numerical choices, feedback, and lesson sequences were written for this project. No figure or prose passage from a reference was copied into the book.

Tristan Needham's [official book overview](https://www.vdgf.space/) and [contents](https://www.vdgf.space/table-of-contents) inform the editorial choice to make geometric constructions participate in the argument. The relevant inspiration is the recurring concrete geometry and attention to intrinsic curvature. The sample chapter is presented as page images; those image assets could not be opened by the web retrieval tool in this review, so no mathematical claim is attributed to an unseen sample page. Needham's listing in a lesson's sources is a further-reading and pedagogical reference, not an assertion that our examples reproduce his proof.

David Tong's [differential-geometry notes, §2.1](https://davidtong.org/pdfs/teaching/general-relativity/gr2.pdf#page=3) were used to check the chart/atlas and domain language. [§2.3.1](https://davidtong.org/pdfs/teaching/general-relativity/gr2.pdf#page=21) supplies a reference for dual spaces and one-forms. The worked shear and stereographic numbers were computed independently.

Tong's [Riemannian-geometry notes, §3.1](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf#page=1) check the metric's role as an inner product, while [§3.2.1](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf#page=11) and [§3.3](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf#page=26) check covariant differentiation and transport. The sphere and polar frame are independently calculated examples of those definitions.

The University of Mannheim's [Metrics and Connections, Example 3.26 and Theorem 3.60](https://www.wim.uni-mannheim.de/media/Lehrstuehle/wim/schmidt/FSS2024/Riemannian_Geometry/Web/RGch3.html) verifies that the tangent projection of the ambient derivative yields the induced Levi-Civita connection. This is the reason the interactive projection construction corresponds to ordinary metric-compatible, torsion-free transport rather than to an arbitrary rule for moving arrows.

Andreas Kriegl's [Riemannian Geometry, Theorem 11.1](https://www.mat.univie.ac.at/~kriegl/Skripten/2018WSe.pdf#page=80) verifies the general geodesic-circle curvature limit. The lesson derives its round-sphere instance directly and clearly identifies the general theorem's larger scope.

Scott Hughes's [MIT lecture sequence](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/lecture-summaries/) and [parallel-transport lecture](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/resources/lecture-7-the-principle-of-equivalence-continued-parallel-transport/) were consulted for sequencing: first establish the difficulty of comparing tangent spaces, then supply a comparison rule, then diagnose curvature by a loop. These are educational design references, not claims of measured effectiveness for this interface.

## Verification performed on the authored source

- All six `after` strings match existing third-level headings in `book.md` exactly.
- All thirteen prerequisite links match existing heading anchors; each link's chapter is the chapter containing that heading.
- Every conceptual question has exactly one correct choice and distinct feedback for its distractors.
- The book's actual `math()` renderer accepted all 217 inline/display expressions in the initial authored lessons with no errors. The later formal clarification adds no new mathematical syntax.
- Independent numerical checks verified invariant pairings under the nonlinear shear at 25 positions, sphere membership and chart inverses at 169 points, overlap transition/inverse/determinant identities at the 168 nonzero chart points, fixed-arrow reconstruction and component/basis cancellation through a full turn, and tangency, unit norm, and vanishing projected derivative on every one of the three transport arcs.
- The circle-limit estimate was checked at successively smaller radii against the sphere value. Transfer results are respectively `−1`, `0.75`, `5 m/s`, `1 rad/s`, `15 degrees`, and approximately `2.00017 m` (accepted as `2 m` within the stated approximation tolerance).

These are mathematical and source-contract checks. The integrating change must still verify actual page insertion, responsive layout, lesson state, narration treatment, accessible controls, and consistency between every visual and its accompanying lesson. Mathematical correctness of an isolated lesson does not establish that an interface presents it clearly.

## Remaining curriculum work

Six lessons establish a reusable apprenticeship pattern; they do not close every gap elsewhere in the manuscript. A complete subsequent geometry pathway still needs an oriented integration/Stokes sequence, an extended geometric proof relating local curvature to parallel transport and angle excess, and more practice with maps, flows, and tensor fields. The black-hole path needs its own causal-diagram and horizon-crossing progression. Those should be authored and checked as real lessons before stronger claims of completeness are made.

## Independent cross-review of the prerequisite bridges

The seven lessons in `content/bridge-lessons.mjs` were subsequently reviewed by the geometry author against the corresponding manuscript sections: §16.6, §§17.1–17.6, §§18.1–18.5, §21.2, and §§22.7–22.8. These new bridge lessons now address several items named above: a worked oriented Stokes calculation, horizon-crossing directions, and the construction of global causal coordinates. Their presence does not amount to a complete advanced geometry or black-hole course.

Two precision edits were agreed with the bridge author and applied: the central acceleration formula explicitly assumes positive radius before dividing by it, and the proper-time Schwarzschild orbit example explicitly specifies a timelike geodesic. No incorrect result was found in the bridge calculations.

The review verified the distinction between Newtonian coordinate time and relativistic proper time in angular-momentum conservation; the resonance coefficient and accumulated-phase approximation in Mercury's orbit; retarded-time dimensions and the sign of right-moving waves; both Eddington–Finkelstein null families; future timelike directions between the plotted null slopes; the Kruskal metric coefficient and region sign conventions; orientation signs in the Stokes example; and the factors of light speed, Planck's constant, and Boltzmann's constant in the temperature/entropy calculation. The manuscript's §17.5 does supply the promised connection from its effective potential to the orbit equation.

In particular, the Kruskal lesson properly extends the regular metric rather than pretending that a negative exterior exponential defines every region. It identifies the extra eternal regions as properties of that idealized spacetime, distinguishes them from a collapse history, and does not treat a conformal diagram's scale as an observable distance. These statements agree with [Tong's black-hole notes, §§6.1.3–6.1.5](https://davidtong.org/pdfs/teaching/general-relativity/gr6.pdf#page=14). The thermal lesson makes the imported quantum assumption and the scope of the Euclidean equilibrium argument explicit; it does not advertise a derivation of collapse radiation or microscopic entropy.

All seven insertion headings and sixteen prerequisite targets were resolved against the manuscript and new lesson IDs. Before the positive-radius clarification, the actual math renderer accepted all 333 mathematical expressions; the clarification adds one elementary inline inequality. Independent numerical checks tested the two null directions and an intervening timelike direction at nine radii, including the horizon and interior; tested the Kruskal product and transformed metric factor at fifteen exterior points; and checked the nontrivial transfer arithmetic. This cross-review did not change the bridge author's visual code or the integrating application.
