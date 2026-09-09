# Reading quality pass, 9 September 2026

This pass responds to a reader encountering unexplained vocabulary, inaccessible collapsed-navigation popups, excessive spacing, and prose that substitutes commentary for teaching. It follows the assembled pages as well as the manuscript. It does not certify the whole course as finished.

## Interface and sequencing

- Collapsed navigation previously generated text-only previews, disabled pointer interaction, and dismissed them immediately on leaving the trigger. The old test required zero links. The flyout now contains real links; pointer travel, a reading pause, chapter selection, Tab traversal, ArrowRight entry, and Escape return are tested.
- Chapter headers and separate navigation blocks delayed the first paragraph. Chapter titles and their vertical spacing are smaller; chapter tools share a compact area. The opening explanation is now visible on the first screen at desktop and phone widths.
- Removed the manuscript-only reading-time estimate, which omitted worked lessons and the time needed to calculate.
- Eight labs were inserted before the chapter prose regardless of their prerequisites. They now follow their preparation: Earth 1.10, covectors 2.4, light cone 3.3, tides 10.5, embedding 17.2, waves 18.4, expansion 19.1, and slicing 20.2. Other chapter figures follow their sections rather than precede their explanations.
- Illustration insertion works on top-level manuscript sections, so headings inside a lab cannot split the surrounding HTML.
- The cover equation is an optional expandable reference. It remains available with its links and mathematical typesetting.
- Section IDs are preserved when early headings change, retaining saved links and prerequisite destinations.

## Chapters 0 and 1

The opening now asks a concrete motion question. The mechanics section derives the kinetic-energy expression from force and work and includes a numerical example. The flow section calculates a box's net mass loss before introducing divergence. The approximation section starts with a square-root estimate and constructs it from a derivative.

The first graph now depicts the same cart law and units as the text, removes its premature metric reference, and reflows into a readable vertical composition on phones. The free-fall figure no longer incorrectly suggests that a single laboratory cannot measure tides.

Chapter 1 removes repeated promises and motivational commentary, adds an explicit comparison of supported, falling, and rocket-driven cabins, and retains the illustrated history in an expandable section. The falling-grid model appears after its speed law; its explanation no longer introduces a spacetime metric before Chapter 3.

## Chapters 2 and 3

Chapter 2 now develops the same displacement and measuring rule through a basis change before generalizing to Jacobians and tensors. It expands matrix multiplication into its component sums, defines free and dummy indices at first use, and gives numerical tensor-product, symmetrization, and Taylor examples. Oriented area remains available as a further example.

Chapter 3 constructs proper time from the momentarily stationary clock and the invariant interval. It explains the inverse-boost assumptions and intermediate substitution, defines index lowering before contracted four-momenta, and distinguishes coordinate changes from changes of physical observer. The two-clock example now matches its figure at 0.6c and eight traveling years out of ten. The photon-energy comparison explains the additional quantum input relating energy and frequency. Rapidity is available as a further calculation and remains linked by later prerequisites.

All 14 previously unassigned opening figures now have explicit section placements, with a build failure for unreviewed additions. In particular, Rindler motion follows 5.3; polar connection cancellation 7.5; the Ricci/Weyl comparison 9.3; the action summary 14.7; Killing energy 15.4; Cartan's comparison 21.5; focusing versus singularity 22.5; and the effective-theory hierarchy 23.2. Chapter titles in navigation identify their subjects instead of relying on slogans. This placement review is not a sentence-level certification of those later chapters.

The units lesson's unrelated ODE reference is replaced by the [BIPM SI Brochure](https://www.bipm.org/en/publications/si-brochure), checked against its current official page. The frequency discussion links [Einstein Online's Doppler explanation](https://www.einstein-online.info/en/spotlight/doppler/).

## Chapters 4 and 5

Chapter 4 starts with latitude and longitude, explains the jobs of charts and transition maps, and gives the formal topology conditions as an expandable reference. It separates point labels from tangent vectors using a translation before discussing nonlinear changes. The spherical volume calculation now defines its angles and derives all three local spatial length factors.

Chapter 5 calculates the accelerating chart's differentials, clock rates, and proper accelerations rather than just displaying the results. It states the general Euler–Lagrange rule before using it for null rays and Newton's limit. The massless auxiliary-field calculation is an expandable extension with its constraint and parameter change worked out. The affine-parameter exercise now uses relabeled clock readings instead of an ambiguously accelerating pen, and uses the already derived component expression for acceleration instead of premature covariant-derivative notation.

Opening the AI study companion had a separate title-size override that made the chapter heading larger. Its heading now gets smaller as the available reading width shrinks; desktop screenshots confirm the first paragraph remains visible.

## Chapters 6 and 7

The derivative chapter now starts with a fixed eastward arrow in explicitly defined rotating unit axes. The product rule shows the complete cancellation before the general coordinate transformation. The connection definition then builds on that example instead of introducing a second, unrelated currency analogy. The chapter derives the determinant identity used in divergence and verifies a traveling scalar wave by differentiating its profile.

Chapter 7 adds the actual basis-change product rule for the connection transformation, evaluates one Christoffel coefficient step by step, and tests the polar Laplacian against the same scalar function in Cartesian coordinates. Torsion is checked on the already taught pair of noncommuting flat-plane fields. Premature vocabulary in the chapter decks and the Chapter 5 check is removed. The early rotating-basis formulas are stacked to fit a phone screen.

The geometry models and controls passed 20 viewport/theme combinations, with independent checks of basis cancellation and transport. All 37 lessons again passed 680 interactions, including persistence and prerequisite round trips. Desktop and mobile reading-position restoration passed.

## Chapters 8 through 10

This pass found errors as well as difficult phrasing. The zero-trace matrix example incorrectly described negative unit eigenvalues as compression; it now distinguishes reversing a vector from accelerating a separation. The geodesic-variation setup incorrectly called its two-parameter strip a full congruence. The plane-wave example called both coordinate functions null even though its inverse metric has a generally nonzero VV entry. Both descriptions are corrected.

The tidal calibration exercise appeared before the spherical-field calculation it used. It now follows §10.5, with an explicit prerequisite link that the sequencing check can verify.

The transport chapter begins with the actual loop experiment. It explains contractible loops with a calculated cone example, derives the sphere's area-to-rotation relation, and supplies the coordinate construction and metric-derivative expression used to prove curvature symmetries. The Ricci chapter works through the initially stationary cloud's edge lengths before its volume formula. Expandable calculations cover conformal rescaling, the normal-coordinate coefficient, and the nonzero curvature of the wave example. Newtonian tides now include the radial-unit-vector derivative, and the curvature count explains its combinatorics.

Independent numerical differentiation of the metrics checks the added conformal and wave calculations. The test now inverts full metric matrices and raises all four curvature indices, which is essential for the non-diagonal wave metric. It verifies nonzero tidal entries together with zero Ricci and scalar contractions. Existing FLRW and curvature-table checks still pass.

All 37 lessons passed their 680 browser interactions after these changes. The integrated curvature experiences, 74 page/viewport checks, reading-position restoration, and narration-context checks also passed.

## Chapters 11 and 12

The matter introduction starts with gas in a box. The observer decomposition is checked in its rest frame and on a moving pressureless sample. Fluid conservation is expanded before projecting it into energy and acceleration equations. Piston work explains the pressure-volume term, and a directional momentum-flux calculation explains radiation pressure. The field preparation now defines its derivative shorthand, derives the string's force balance, and explains the electromagnetic current and cross product.

The divergence theorem is introduced through cancellation of shared box faces before the wall-stress integral uses it. The Newtonian matching then derives Poisson's normalization. The weak-field calculation keeps separate temporal and spatial perturbations, derives both Ricci and Einstein components, and explains the boundary assumptions under which the two potentials agree. Independent numerical metric derivatives verify those formulas, including the failure of a time-only perturbation to source G00.

## Chapters 13 through 15

The variational chapter now connects the path calculation to a field calculation. The oscillator's trial displacement includes an amplitude with length units; previously a dimensionless sine was added to a dimensional position. The scalar example defines its potential and inverse-length parameter and checks a plane-wave solution. Electromagnetic potential, field strength, and their gauge change are introduced before a metric variation holds the potential fixed.

The independent-connection calculation explains a tensor density's transformation and derivative, performs the connection-equation trace, and derives metric compatibility under its stated assumptions. The boundary exercise now follows the definition of extrinsic curvature instead of using it before its introduction. Saved section and exercise links are preserved.

The symmetry chapter derives the metric Lie derivative's connection form and the mixed-index balance identity. It states the physical units of photon energy, defines the observer's spatial slice, and derives the dilution of dust and radiation after defining the expansion scale. Repeated commentary about the elegance or difficulty of the subject is replaced with the calculation itself.

All 37 lessons passed 680 browser interactions after this batch. Narration-context and hidden-panel retrieval checks passed with mocked providers.

## Chapters 16 and 17

The experiments chapter now derives the weak-bending ray equation from the travel-time functional, evaluates the light-delay antiderivative, defines the ellipse's eccentricity and semimajor axis, and converts Mercury's per-orbit shift into a per-century value. The redshift calculation uses the same physical energy convention as Chapter 15. Small time and angle units are defined alongside the numerical examples. The gyroscope discussion calculates its orbital average and explicitly identifies the leading rotating-field result it uses as an input.

The black-hole chapter adds the spherical time-independence calculation, connects the Schwarzschild invariant to the earlier curvature table, and expands the conversion from radial energy to the orbit equation. It defines escape to null infinity before using that global horizon definition. Kerr is identified as a supplied exact solution, not a completed derivation. Independent numerical differentiation checks its vacuum Ricci tensor, the spherical time-dependent Ricci component, and Schwarzschild's invariant outside, on, and inside the horizon in regular coordinates.

The assembled book passed 74 page/viewport checks, including section links, readable tables, clock and GPS controls, and the compact reader header.

## Chapters 18 and 19

The wave chapter now demonstrates the residual gauge choices behind the two-polarization count, derives the double-angle transformation, and follows light on both interferometer arms. The binary calculation supplies the center-of-mass substitution and the energy-versus-frequency derivative behind chirp mass. Multipole names are attached to their defining integrals. The calculation's approximation and source assumptions remain explicit.

Cosmology introduces comoving labels, explains the domain of the closed radial chart, works through the time-dependent Ricci terms and fluid divergence, and checks the full Weyl cancellation. The observing section now teaches angular-diameter and luminosity distances in the manuscript before the practice lesson uses them. It defines luminosity and flux and accounts separately for photon-energy and arrival-rate redshift. Numerical metric differentiation checks Weyl cancellation for positive, zero, and negative spatial curvature.

Static and prerequisite checks, 74 browser page/viewport checks, and narration-context checks passed after this batch.

## Chapters 20 and 21

Lapse and shift now have an explicit flat-spacetime coordinate example. The constraint discussion derives the Gauss and Codazzi projections from the Gaussian-normal connection. The evolution section gives the corresponding spatial Ricci expression and tracks the scalar-curvature boundary divergence. Numerical differentiation of a spatially varying, anisotropically evolving metric independently checks these projection, evolution, and boundary signs.

The frame chapter starts with cylindrical ruler components, gives the coefficient rule for a general exterior derivative, connects Cartan torsion to coordinate torsion, and shows the cancellation in the twice-applied frame derivative. An expandable spinor calculation obtains the half-angle rotation from the supplied gamma-matrix algebra. Projective freedom is explained by an explicit connection change and its antisymmetric Ricci change. Mobile inspection prompted stacking the three Gaussian-normal connection entries.

All 37 lessons passed 680 browser interactions after this batch; static pages and authored prerequisite order also passed.

## Chapters 22 through 24 and appendices

Focusing now includes a shrinking-volume proof of the finite-time bound, a projected-derivative check of zero twist, and the observer calculations behind the perfect-fluid energy conditions. The null screen is constructed before it is used. The thermodynamics discussion derives the negative heat capacity and the finite Schwarzschild surface gravity. A calculation verifies the rotating-hole first law by differentiating the horizon area; independent finite differences check both mass and spin variations.

The effective-theory chapter introduces resolution, regulated quantities, renormalization, and the meaning of a nonlocal operator before using them. It explains the additional quantum assumptions behind the zero-point estimate. The information discussion defines islands and identifies the model-dependent status of the calculation. The gravitational-wave catalog reference is dated rather than described as indefinitely current. The final calculation chapter and exercise titles use direct descriptions instead of personification and editorial slogans.

Appendix units and definitions were checked, the front contents were synchronized with the revised titles, and saved appendix links now receive the same preservation and automated checks as chapter links. The build rejects unexpected control characters that can silently corrupt mathematical commands during editing.

This completes a first sentence-level pass through the manuscript, including the appendices. It does not complete every possible derivation: the full Kerr construction, global singularity proof, canonical constraint algebra, and quantum-field calculations still need dedicated treatments to meet the project's full self-contained ambition. Supplied results and additional assumptions are identified where they enter. Reader observation and exercises with actual beginners remain necessary to assess whether the pacing works.

## Verification

Local checks during this pass: static pages and links; all 37 lesson placements; eight lab placements and the two opening figures; Svelte checks; 74 browser page/viewport combinations; desktop/mobile navigation; all 40 figures in both themes; 42 responsive figure/theme/width compositions; all 36 3D scene/theme/viewport combinations; reading position; reading-source and narration unit checks. All 37 lessons also passed 680 browser interactions, including deep links and saved exercise state, after the Chapter 4–5 rewrite. Screenshot evidence accompanies this note.

These checks establish specific software behavior and catch the named sequencing regressions. They do not establish that a novice can understand every chapter or certify the entire book as error-free.
