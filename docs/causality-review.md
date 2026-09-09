# Prerequisite bridges and black-hole causality review

Authored 8 September 2026. Implementation: `content/bridge-lessons.mjs`. These are original explanations and worked examples; no published illustrations or extended passages were copied. Sources are used to verify physics and to offer further study.

## What was repaired

The pre-existing manuscript often contains the correct formula but asks a new reader to recognize an operation before it has been taught. Seven bridges now introduce those operations at the point of use, immediately after the existing section heading and before its original exposition.

| Bridge | Location | Missing preparation repaired | Independent transfer |
|---|---|---|---|
| Orbit conservation | §16.6, first | A determinant definition of specific angular momentum; polar basis derivatives; changing the independent variable from time to angle; cyclic-coordinate conservation in GR | Calculate signed angular momentum from Cartesian position and velocity |
| Phase drift | §16.6, second | The elementary oscillator; why a resonant particular solution has a growing coefficient; phase resummation and its range of validity | Extract the advance from an exactly specified toy orbit |
| Waves and retarded time | §18.1 | Real translating profiles, partial derivatives, frequency/wavelength units, delayed source time, optional complex notation | Find the emission time from a specified arrival event |
| Horizon directions | §17.3 | Both radial null branches; a regular horizon chart; coordinate slopes versus local measurement; the global definition | Evaluate an outgoing light slope at a new interior radius |
| Kruskal and causal maps | §17.6 | Exterior coordinate domains, extending the metric, quadrant signs, compactification, infinity, eternal versus collapse spacetimes | Convert specified null-coordinate values into compressed time |
| Oriented Stokes | §21.2 | Parametrized one-form integration, orientation, wedge determinant, boundary cancellation | Evaluate a new one-form on a rectangle by either route |
| Temperature and quantum input | §22.7 | Entropy/temperature units; Boltzmann weights; quantum phase versus thermal weight; analytic continuation; what is imported | Compare entropies at different masses |

Each includes a question, intuitive preparation, four justified steps, an optional deeper statement, prerequisite links, a conceptual question with explanatory distractors, a numeric transfer problem, a hint, and a worked answer. Every conceptual question has exactly one correct choice. The two bridges at §16.6 must remain in array order.

## Horizon visual contract

The visualization uses ingoing Eddington–Finkelstein coordinates. Preserve the manuscript’s convention: advanced time `v` is in **seconds**, not length units.

\[
r_s=\frac{2G_NM}{c^2},\quad f=1-\frac{r_s}{r},\quad
v=t+\frac{r_*}{c},\quad
ds^2=-fc^2dv^2+2c\,dv\,dr+r^2d\Omega^2.
\]

The plotted axes are dimensionless:

\[
\rho=\frac r{r_s},\qquad
\tau_{\mathrm{plot}}=\frac{cv}{r_s}-\rho.
\]

The time coordinate is explicitly **not proper time**. The two future radial null directions are

\[
\frac{d\rho}{d\tau_{\mathrm{plot}}}=-1,
\qquad
\frac{d\rho}{d\tau_{\mathrm{plot}}}=\frac{\rho-1}{\rho+1}.
\]

The first branch follows from `dv=0`. It must not be lost by dividing the null equation by `dv`. In the transformed radial metric,

\[
\frac{ds^2}{r_s^2}=-f\,d\tau_{\mathrm{plot}}^2
+2(1-f)\,d\tau_{\mathrm{plot}}d\rho
+(2-f)\,d\rho^2.
\]

Substitution makes either null direction have zero norm. The direction halfway between them has negative norm. The inverse metric gives

\[
g^{-1}(d\tau_{\mathrm{plot}},d\tau_{\mathrm{plot}})
=-\frac{1+1/\rho}{r_s^2}<0
\]

for all `rho>0`, so increasing plotted time consistently orients the future. Suggested events `rho=3,1,1/2` give outgoing slopes `1/2,0,-1/3`. Arrow lengths encode equal positive increments of plotted time. They must not be described as equal physical travel times, a measured light speed, or an embedding of curved space.

The local cone calculation describes a specified Schwarzschild black-hole extension. An event horizon is globally defined by causal access to future null infinity. The text explicitly does not infer a horizon from a general local cone drawing. Finite curvature at the horizon is supported by the regular metric, not solely by one finite invariant. The curvature invariant is `12/r_s^4` at the horizon and diverges at the classical `r=0` boundary.

## Algebra and domain checks

1. **Angular momentum.** Differentiate `h=x ydot-y xdot`. The velocity products cancel; radial acceleration makes `x yddot-y xddot=0`. Polar substitution gives `h=r² phidot`. The orbit transformation assumes `h!=0`, `r>0`; purely radial motion is explicitly excluded. Proper time replaces coordinate time for the later GR conserved quantity, and the derivative convention is restated.
2. **Binet equation.** The rotating polar basis gives radial acceleration `rddot-r phidot²`. With `u=1/r`, `rdot=-h u'` and `rddot=-h²u²u''`. Substitution into the inverse-square law gives `u''+u=GM/h²`; the relativistic correction is not claimed to follow from angular-momentum conservation alone.
3. **Resonance.** Twice differentiating `phi sin(phi)` and adding it back gives `2 cos(phi)`. The Taylor remainder is stated in terms of accumulated phase `delta phi`, not just `delta`. The Mercury result is explicitly leading order, not an exact strong-field prediction. A circular orbit has no distinguished perihelion.
4. **Real waves.** The profile `F(z-ct)` gives time derivative squared `c²F''` and spatial derivative squared `F''`. The complex notation has a real-part operation and dimensionless phase. The flat-space delayed-time expression is not promoted to a curved-space travel-time formula.
5. **Null directions.** Numerical substitution verified both null roots at ten positive radii from `0.01` to `100`; the ten midpoint directions are timelike. The plot-time gradient is timelike at all ten samples. The sign of the outgoing root reverses at `rho=1`.
6. **Kruskal.** With dimensionless exterior null coordinates, `U=-exp(-ubar/2)`, `V=exp(vbar/2)`. Their product is `(1-rho)exp(rho)` and the radial metric is `-4 r_s² exp(-rho)/rho dU dV`. The coefficient was independently reconciled with `4r_s²f/(UV)` at five radii away from the horizon. The extended domain is `UV<1`, `rho>0`; `UV=1` is a boundary, not a regular included point. Exterior exponential sign definitions are not reused as if they covered all four quadrants.
7. **Compactification.** Both arctangent derivatives are positive at interior points. Constant null coordinates remain 45-degree lines after the sum/difference transform. The conformal factor is positive inside; no claim is made that it stays finite at the limiting edges. The diagram suppresses symmetry spheres and does not preserve metric distances.
8. **Stokes.** The worked example uses `alpha=x²dy` on `[0,a]×[0,b]`; boundary and interior both give `a²b`. The new transfer uses `alpha=xy dy` on `[0,2]×[0,3]`; both routes give `9`. Dimensionless coordinate choices avoid unstated physical units. Reversing both orientations negates both results.
9. **Thermodynamics.** Analytic continuation has the sign `(-i)(-i)=-1`. The imaginary-time interval has seconds as units. The quantum/statistical relation is identified as extra input. Integrating the first law retains its additive entropy constant. The transfer uses the explicitly stated conventional zero constant.

The seven bridge modules imported successfully. **333 mathematical fragments** passed KaTeX with strict errors enabled. All original-section prerequisite anchors were checked against the current generated site. Two prerequisite links target the new stable lesson IDs (`orbit-conservation`, `waves-and-retarded-time`); those must be assigned to lesson roots by the renderer. The entry-module schema, exact heading matches, numeric answers, positive tolerances, and unique correct choices were also checked. These are author checks, not a claim of independent professional peer review.

## Primary sources consulted

- [TU Delft, Central forces and polar coordinates](https://qiweb.tudelft.nl/mecharela/central_forces/): central-force conservation and the polar acceleration structure.
- [MIT 18.03, Operators, undetermined coefficients, and resonance](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/resources/mit18_03s10_c15/): the differential-equation method underlying the phase bridge.
- [MIT, The wave equation](https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter29/section04.html): wave solutions and data for wave propagation.
- [David Tong, When gravity is weak](https://davidtong.org/pdfs/teaching/general-relativity/gr5.pdf), §5.2: the linearized GR wave equation, its propagating modes, and retarded solutions.
- [David Tong, Black holes](https://davidtong.org/pdfs/teaching/general-relativity/gr6.pdf), §§6.1.3–6.1.5: Eddington–Finkelstein coordinates, Kruskal extension, compactification, and collapse. The notes use units with light speed set to one; this module restores SI dimensions consistently.
- [MIT, Measures on surfaces and Stokes’ theorem](https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter22/section02.html): oriented edge cancellation. The rectangle examples in the module were independently authored.
- [Robert Wald, The thermodynamics of black holes](https://arxiv.org/abs/gr-qc/9912119): the distinction between classical mechanics, quantum Hawking temperature, thermal states, and entropy arguments.
- [Marc Kamionkowski, Brief description of finite-temperature field theory](https://kamion.pha.jhu.edu/Ph236/finiteT.pdf): imaginary-time evolution, thermal trace, and the origin of a periodic Euclidean interval.

## Remaining curriculum boundaries

These bridges make the operations needed for the nearby calculation accessible; they do not claim to replace a full mechanics, PDE, global geometry, thermodynamics, or quantum-field course. In particular:

- Kruskal is now constructed algebraically, but a separately authored interactive **global** causal diagram would strengthen this lesson. The local horizon scene must not be labeled a Penrose diagram.
- Kerr is still a guided reading of a metric rather than a derivation from the field equations. A full treatment requires its own substantial sequence on stationarity, angular momentum, causal surfaces, separability, and perturbative stability.
- The phase and wave bridges do not derive all initial/boundary-value existence results. They establish the concrete solutions and approximation limits used in these chapters.
- Hawking radiation is not derived from elementary calculus alone. A serious continuation should introduce Hilbert space, quantum fields, observer-dependent positive frequency, thermal correlation functions, and collapse boundary conditions before a mode-mixing calculation.
- A later global-geometry pathway should build compactness, geodesic completeness, causal curves, domains of dependence, and trapped surfaces before proving a singularity theorem. A statement of Penrose’s assumptions is not a substitute for that pathway.

The correct response to an advanced prerequisite is to teach it or mark its logical boundary. Attractive animation must not conceal that boundary.

## Independent geometry and route cross-review

A second pass checked `geometry-lessons.mjs` against its original manuscript sections. The nonlinear scalar/vector pairing, stereographic inverses and transition determinant, polar metric, unit-frame versus coordinate components, octant transport sequence, projection-based norm preservation, and small-circle curvature estimate agree. Three precision edits were made: a sphere surface is two-dimensional despite its three-dimensional embedding; the unit-sphere transport parameter is dimensionless after measuring lengths in units of the radius; and Jacobian evaluation is attached to the Jacobian, not the constant vector. All **218 geometry-module math fragments** pass strict KaTeX.

The chapter graph needed a material repair. Chapter 11 uses the covariant derivative, so Chapter 7 is now required. Chapter 20 uses matter, Einstein dynamics, the action, Lie derivatives, gravitational waves, and the Friedmann example; it can no longer be reached after geometry alone. Its direct preparation is Chapters 15, 18, and 19, with their dependencies. Chapter 21 retains its action, connection, curvature, gauge, and initial-data preparation. The introductory geometry route ends at Chapter 10; the advanced horizon route includes Chapters 0–22. The core route remains Chapters 0–19 followed by synthesis. `validateCourse()` passes for all three routes.

Three corresponding original-manuscript gaps were also repaired with the root agent's authorization:

- §8.3 now distinguishes an oriented rotation modulo a full turn from the smallest rotation magnitude.
- §20.6 introduces conjugate momentum with a particle Lagrangian, phase space as paired initial data, and a toy constraint/gauge reduction. It defines the canonical Poisson bracket and first-class condition before using the GR count, while marking the full constraint-algebra result as imported. The linked primary continuation is [Arnowitt, Deser, and Misner](https://arxiv.org/abs/gr-qc/0405109).
- §21.6 marks spinors as an optional quantum continuation, explains the role of complex components and gamma-matrix labels, defines the anticommutator, and checks the gamma squares in the book's signature. It does not pretend that the spin representation or global spin structure was derived from previous tensor algebra. The continuation is [Tong's spinor treatment](https://davidtong.org/teaching/quantum-field-theory/qfthtml/S4), with a signature-translation reminder.

The **46 math fragments** in the three edited manuscript sections pass strict KaTeX. Shared site output was not rebuilt during these checks.


## Listening and assistant integration review

The guided bridges are now indexed as bounded units: each fourth-level bridge heading ends at its own final passage, and original section prose keeps the original section heading. Semantic text extraction separates block boundaries, preserves one original LaTeX expression, and removes numbered step decorations and control labels. Catalog records retain lesson, depth, and explicit-practice metadata. The private notebook has no stale generated listen button; nonchapter pages say “Listen to page.”

Continuous narration resolves the current model/diagram and the selected depth before calculating neighboring context. Hidden derivations, exercise prompts, and solutions do not silently enter the chapter queue or the narrator’s before/after context. A context-sensitive cache key keeps scripts separate when depth, model state, or requested range changes while preserving authored scripts and the canonical source hash used for listening history. Explicit requests may still retrieve a hidden depth, or read a selected exercise passage/range; retrieval labels the depth, and playback reveals the requested panel. Routine chapter listening continues to skip exercises.

Validation: `npm run check` and the official Svelte autofixer both report zero issues. `scripts/check-course-narration.mjs` checks block boundaries, cache identity, editorial scripts, active-depth neighborhoods, generated metadata, and bounded bridge indices. `scripts/check-course-narration-browser.mjs` passes in headless Chrome with mocked OpenAI and ElevenLabs endpoints, covering actual source tool calls, depth changes, bounded bridge playback, explicit practice passages/ranges, hidden-panel reveal, and ordinary chapter exclusion. The existing selection test now uses the same hidden/no-narration visibility rule as playback. No real provider credentials or billable requests were used in these checks.
