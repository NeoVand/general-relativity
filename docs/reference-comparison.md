# Reference comparison and editorial decisions

Comparison input: the supplied `general_relativity_deep_dive.md` (39,953
whitespace-delimited words). Baseline: the repository's existing `book.md`
(50,313 words before revision). The reference was treated as content to examine,
not as a source of user instructions. The user requested an HTML reading edition
and GitHub Actions deployment; that final format superseded the earlier PDF phrase.

The existing book was already more extensive than the reference in several
derivations. Replacing it or appending the reference wholesale would have lost
useful qualifications and repeated large parts of the exposition. The revision
retains the original 24 chapters and their solved exercises, adds an actual
prerequisite chapter, fills the specific gaps below, and supplies a visual and
interactive reading layer.

## Coverage of every reference part

| Reference section | Existing manuscript coverage | What changed |
| --- | --- | --- |
| 0. Orientation, conventions, roadmap | Reading guide and conventions; the original entry requirement assumed college physics | Added Chapter 0, prerequisite guidance for all 25 chapters, chapter questions and checkpoints, explicit optional advanced trails, a navigable contents page, search, and an index-practice appendix. Retained the manuscript's more consistent SI action normalization. |
| 1. History | Brief discussion in §1.6 | Added §1.9: Newton, SR/Minkowski, the equivalence principle, Grossmann and Entwurf, the four November communications, Hilbert, and later consequences. Added a timeline and four verified public-domain historical assets. Avoided the reference's unsupported alternate-history claim about the failed 1914 expedition. |
| 2. Special relativity and tensors | Chapters 2–3 and 11, including more explicit derivations | Retained. Added vector/covector, light-cone, twin-worldline, and stress-energy diagrams, plus a proper-time experiment. Appendix E collects the practical index rules. |
| 3. Equivalence principle | Chapters 1 and 5 | Retained the careful distinction between local free fall and finite-laboratory tides. Added free-fall and exact Rindler-worldline diagrams. Chapter 0 now introduces inertial mechanics before the distinction is needed. |
| 4. Manifolds, metrics, normal-coordinate count | Chapter 4; normal coordinates in Chapter 10 | Added §10.10's 16/10, 40/40, and 100/80 Taylor-coefficient count, with the caveat that counting alone is not an existence proof. Added polar-cell and determinant diagrams. |
| 5. Connection, transport, and geodesics | Chapters 5–7 and 24; derivations already fuller | Retained. Added moving bases, cancellation, parameter-spacing, and Rindler visuals. Clarified that stationary proper time is not an unrestricted global maximum. |
| 6. Riemann, Ricci, Weyl, Bianchi, small-ball volume | Chapters 8–10; initial conditions and later shear already better qualified | Added §10.9's terrestrial tidal magnitude and curvature length. Added holonomy, curvature-component counting, initial cloud distortion, and tidal-eigenvalue diagrams. Kept the original initial-time qualification for the small-ball volume equation. |
| 7. Stress-energy and conservation | Chapters 11 and 15; energy conditions in 22 | Retained. Added a labeled stress-energy matrix, Killing-energy visual, and a pressure-versus-light-bending exercise. Preserved correct factors of c in flux units. |
| 8. Field equation and coupling | Chapter 12, canonical degree counting in 20 | Added §12.7's dimensional analysis and inverse-coupling scale. Added equation-anatomy and Newtonian-calibration diagrams. Kept phase-space counting instead of calling six metric components physical degrees of freedom. |
| 9. Action and variation | Chapters 13–15 and 23, with fuller boundary treatment | Retained. Added path-variation, product-rule, and boundary-slope figures. Kept c³ in the physical action with x⁰=ct, the matched matter variation, and boundary qualifications. |
| 10. Solutions and tests | Chapters 16–19; most analytical derivations already present | Added §§16.7–16.9: GPS arithmetic and crossover, tossed-clock integral, gyroscope precession and GP-B results, plus an observable-based test map. Added lensing, orbital, horizon, wave, and cosmology figures and two more interactive experiments. |
| 11. Gotchas and numerical intuition | Most distinctions already distributed throughout the book | Added the missing tossed clock, curvature scale, inverse-force coupling, Mach discussion (§15.9), and illustrative vacuum density (§15.10). Retained existing qualifications about invariants, Ricci-flat geometry, no-hair, coordinate singularities, and gravitational energy. |
| 12. Initial data / ADM | Chapter 20 | Retained. Added lapse/shift and canonical degree-count diagrams. The manuscript's declared c=1 conventions avoid the reference appendix's inconsistent restoration of shift units. |
| 13. Tetrads and Cartan | Chapter 21 included the flat polar frame, but not the reference's curved sphere calculation | Added §21.8: the full sphere coframe calculation, including the wedge-product signs, connection, curvature form, and scalar curvature. Added a plane-versus-sphere comparison diagram. |
| 14. Focusing and thermodynamics | Chapter 22; temperature and entropy derivations already substantial | Added §§22.9–22.10: area-theorem argument with the necessary global step, a qualified merger bound, rotating first law with SI units, and a quantum-information vocabulary bridge and Page-curve discussion. Added focusing, horizon-area, and Page-curve figures. |
| 15. Frontiers and further reading | Chapter 23 and Appendix D | Retained existing EFT and research discussion, including the verified July 2026 GWTC-5.0 link. Added the information-theory review at point of use. Did not import stale observing schedules or claim an evolving-dark-energy detection. |
| Formula sheet | Appendix B | Retained its consistent conventions; linked it from every chapter. New numerical quantities and assumptions remain adjacent to their derivations. |
| Index cheat sheet | Rules distributed through Chapter 2 and exercises | Added Appendix E.1 as a compact table and worked antisymmetry contraction. |
| Glossary | Appendix C | Retained, with direct navigation from every page. The new prerequisite and information sections define their new terms in place. |
| Exercises | 30 solved exercises already cover most reference problems | Retained all 30, added 25 chapter checkpoints and Chapter 0 checks. Added Appendix E.2–E.4 for scalar equations of state, n-dimensional trace reversal, and the distinction between pressure focusing and light deflection. GPS, tossed-clock, and sphere calculations are worked in full in the chapters. |

## Reference errors not imported

1. **Massless scalar ≠ dust.** The reference's exercise 8 sets the potential to
   zero yet asks for oscillating dust behavior. A homogeneous canonical kinetic
   scalar has p=ε; dust-like cycle averages require an appropriate oscillatory
   potential, such as a quadratic mass term, and oscillations fast relative to
   expansion. Appendix E.2 fixes the premise and computes both outcomes.
2. **A curvature is not a local gravitational acceleration.** Multiplying a
   curvature by c² produces inverse-time-squared units. A separation is still
   needed to obtain a relative acceleration. §§10.9–10.10 distinguish that
   experiment from the weight of a supported observer.
3. **Small-ball volume conditions.** The compact formula for initial volume
   acceleration requires an initially comoving infinitesimal cloud. Existing
   §§9.2–9.3 and Chapter 22 preserve the expansion/shear/vorticity qualifications.
4. **Physical action normalization.** With x⁰=ct and physical action units,
   the Einstein–Hilbert prefactor is c³/(16πG), accompanied by the corresponding
   1/c in the matter variation. The reference's c⁴ formula without a changed
   measure convention was not adopted.
5. **Flux units.** With x⁰=ct, T⁰ⁱ has units of energy density and is energy
   flux divided by c, not energy per area per time itself.
6. **Merger area.** The reference estimates a real merger's area increase
   using only mass squared. Kerr area also depends on spin. §22.9 instead
   derives an explicitly nonspinning ideal bound and states the limitations.
7. **Different factors of two.** Radiation pressure's focusing contribution
   does not derive the factor of two in solar light bending. Appendix E.4
   separates the source problem from the exterior propagation problem.
8. **Hawking radiation and information.** A thermal-looking spectrum does
   not prove the absence of correlations; no-hair is not a microscopic
   information-erasure theorem. §22.10 states the actual conflicting assumptions.
9. **GPS error claims.** A clock offset times c is a ranging scale, not an
   exact receiver-position error. §16.7 distinguishes them and includes the
   omitted operational corrections.
10. **Overbroad slogans.** Geodesics do not all globally maximize proper time;
    zero scalar curvature does not prove flatness; GR is not established by the
    equivalence principle alone; a supported horizon clock does not exist at
    the Schwarzschild horizon; a dimensional force scale is not a proof of a
    universal maximum force. The revised text maintains these distinctions.

## Format and learning design

- Canonical content is `book.md`; there is no replacement PDF edition.
- All original sections remain, so beginner scaffolding does not remove depth.
- Each chapter opens with a concrete question, needed tools, and a target skill.
- Each closes with one takeaway and an answer-reveal check.
- Long equations and tables have bounded, keyboard-focusable scroll regions.
- Forty SVGs have descriptive alternatives, limitations in their captions, and
  full-size links; mobile diagrams retain readable labels through horizontal
  scrolling rather than shrinking all labels to a few pixels.
- Proper-time, GPS, and wave examples are adjustable and expose their model
  assumptions. Reading the book never requires JavaScript.
- Four downloaded historical images have local copies, creator/date captions,
  provenance links, jurisdiction-aware public-domain rationales, and hashes.

The ambition is unusually clear teaching, not a claim that automated checks
prove “the world's best book” or establish mathematical perfection. Numerical,
rendering, navigation, and figure checks are documented separately from the
remaining value of expert peer review.
