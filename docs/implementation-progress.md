# Course redevelopment: completion ledger

The full course overhaul is **not finished**. A completed commit means the named increment is ready to review; it is not a certification of the book. This ledger implements the [visual-development plan](visual-development-plan-2026-09-09.md) and [novice-sequencing audit](novice-sequencing-audit-2026-09-09.md).

| Work | Status | Evidence / next requirement |
|---|---|---|
| Opening and first-use repairs | Partial | Entry and selected sections revised; full chapter-by-chapter review still open. |
| Navigation, LaTeX, disclosure spacing, cone visibility, manifold framing | Targeted repairs shipped | Earlier rendering and geometry review evidence; continue checking newly added surfaces. |
| Calculated star, photon, distance and numerical labs | Shipped; design repair complete | `0b19b6b`, `ce8aa46`; model, browser and recovery checks. |
| Mechanics and Hamiltonian preparation | Shipped | `a27a2f4`; energy/phase-space experiments, independent calculations, manuscript derivation. |
| Polar coordinates and physical distances | Shipped | Labeled grid before the transformation; drag, radius/angle controls, arc/chord comparison, origin failure; mathematical and browser checks. |
| Differentiating actual vector fields | Shipped | Four fields, neighboring polar frames, common-origin comparison and an exact finite product-rule diagram; visual before component algebra. |
| Flows and Lie bracket before torsion | Implemented and pushed | Missing §6.6 added, with an exact two-order flow experiment and moving-frame example. |
| Connection and continuous parallel transport | Implemented and pushed | Continuous plane/cylinder/sphere transport before the equation; exact model, independent ODE, face-on view, orbit/fallback/reload checks. |
| Curvature through two routes and closed loops | Partial | Closed-loop transport, reversal, shrinking, and area/radius scaling implemented. Dedicated two-route endpoint comparison remains. |
| Stress–energy through particles and fluid flow | Open | Crossings, pressure without bulk flow, shear; consistent tensor indexing. |
| Variations and stationary action | Open | Reconcile symbols; label endpoints/displacement; linked histories and action; saddle example. |
| Forms, exterior derivative and Stokes | Open | Level sets, oriented area/flux, cancellation along interior boundaries. |
| Penrose diagrams and black-hole causal geometry | Open | Teach compactification; distinguish collapse from eternal extensions; light cones and singularities. |
| Gravitational lensing and black-hole optics | Open | Linked source, lens, observer and image; validate null rays before rendering the sky. |
| Remaining chapter visual coverage | Open | Chapters 2, 5, 9–10, 12, 14–15, 18–20, 22–24 against the coverage map. |
| Complete prose/prerequisite review | Open | Read every main-text and optional explanation; repair undefined quantities and unjustified jumps. |
| Tutor integration and teaching evaluation | Partial | Deterministic state available; validated actions/Undo, real misconception sessions and learner walkthroughs remain. |
| Final release review | Open | Integrated physics, annotation, responsive, keyboard, performance and learning review. |

For each increment: implement the visual and surrounding teaching together, verify the mathematics, inspect both themes and narrow/wide layouts, exercise real controls and recovery, then commit and push. A model-only patch or passing structural tests does not complete a teaching experience. Learner walkthroughs require actual learners and cannot be replaced by an assistant claiming to simulate their understanding.
