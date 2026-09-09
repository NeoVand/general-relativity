# Comprehensive review: General Relativity from the Inside Out

**Follow-up correction:** Reader feedback exposed a serious first-use and lesson-order failure after this review. Its earlier verification did not establish novice readiness. See [the novice sequencing audit and repair record](novice-sequencing-audit-2026-09-09.md) for confirmed failures, corrected opening material, and the limits of the remaining audit.


**Review date:** 9 September 2026  
**Reviewed revision:** `ad6a533535f1b7c2209272ae48258359e910bfc5`  
**Purpose:** assess the actual course against the ambition of an outstanding, self-contained learning resource, accessible from basic calculus and linear algebra and valuable through research level.

## 1. Overall judgment

This is a strong, unusually thoughtful foundation for an introductory GR resource. Its best feature is the repeated distinction between a physical object, a coordinate description, and an observer's measurement. Its treatment of curvature, local flattening, vacuum tides, horizon coordinates, and the limitations of semiclassical arguments is often substantially more careful than popular explanations. The reader and visual system also have considerable substance: this is much more than a manuscript with decorative animations.

**It does not yet meet the stated ambition.** The largest shortfall is the distance between *following a convincing explanation* and *being able to construct, calculate, test, and criticize one independently*. The beginner route assumes more physics and mathematical fluency than its advertised entry level. The advanced chapters provide informed introductions, but do not yet constitute a substantial graduate or research curriculum. Practice is too sparse and predictable to establish competence. The AI interface is sophisticated, but its scientific teaching quality has not been established by the existing integration tests.

There are also concrete defects: an incorrect contextual symbol explanation, a curvature notation collision, a universal answer-position cue, incomplete restoration of learning state, inaccessible bridge derivations when JavaScript is unavailable, and loss of reading position on browser Back.

I would preserve the central exposition and visual identity, repair those defects, and invest next in prerequisite bridges, independent work, and a reliable scientific content model. Adding many more animations or frontier names before that would have a smaller educational return.

The aspiration to teach beginners and experts is achievable as **connected learning paths with different depth and evidence requirements**. It is not achievable by making every paragraph simultaneously elementary and research-level. “Self-contained” should mean that every required skill has an accessible teaching path inside the resource; named advanced results should have explicit statements, assumptions, and routes to their proofs. A tooltip definition alone does not supply a prerequisite.

**Navigate:** [Confirmed findings](#4-confirmed-defects-and-concrete-corrections) · [Prerequisites](#5-prerequisites-what-the-entry-promise-still-needs) · [Every chapter](#7-chapter-by-chapter-review) · [Missing subjects](#8-missing-or-underdeveloped-subject-areas) · [Teaching](#10-teaching-for-understanding-retention-and-delight) · [Demos](#11-demos-from-illustrations-to-scientific-laboratories) · [AI](#12-ai-integration-a-scientific-tutor-with-accountable-behavior) · [Verification](#14-verification-results-and-remaining-limits) · [Roadmap](#15-implementation-roadmap-and-acceptance-gates)

### Highest-priority decisions

| Priority | Decision | Why it matters |
|---|---|---|
| P1 | Repair contextual symbol meanings and the curvature notation collision | The interface currently contradicts correct prose in a scientifically meaningful way. |
| P1 | Remove the correct-answer position cue and improve evidence tracking | Current checks can reward recognition of a pattern rather than understanding. |
| P1 | Build a real physics and differential-equations on-ramp | Basic calculus and linear algebra do not imply familiarity with fields, waves, electromagnetism, or thermodynamics. |
| P1 | Add scaffolded, then unaided, then delayed problems throughout the core | Explanatory completeness is not learning completeness. |
| P1 | Establish expert-reviewed scientific evaluations for typed and spoken AI | Working tool calls and correct passage IDs do not establish correct explanations. |
| P1 | Make essential bridge text available when enhancement fails | The promised fallback currently omits the very derivations meant to close prerequisite gaps. |
| P2 | Add stellar interiors, observational distances, and deeper black-hole physics | These are major holes in a comprehensive GR education. |
| P2 | Replace chapter-only dependencies with section/skill dependencies | Current routes are both incomplete semantically and unnecessarily long in places. |
| P2 | Repair reading continuity and notebook round trips | A long course depends on reliable return, recovery, and accumulated work. |
| P2 | Validate with real learners at several entry levels | Expert inspection cannot establish that novices can learn independently from the material. |

Here P1 means “address before presenting the resource as meeting the stated educational promise”; P2 means “important next-stage work”; P3 means “refinement or specialized extension.” These are priorities for this project, not claims that every P1 issue makes the entire book unusable.

## 2. What was reviewed and what the evidence establishes

The review covered the canonical [book.md](/Users/neo/repos/general-relativity/book.md), Chapters 0–24 and Appendices A–E; the 13 authored bridge lessons; chapter guides, routes, and prerequisite metadata; the reader, notebook, symbol inspector, tutor, narration, and provider code; the principal visual models and their stated approximations; generated pages; and the repository's validation suites. The canonical manuscript is approximately 58,000 words. The generated edition has 37 HTML pages, 40 figure placements, and 761 display equations.

I followed derivations and independently checked selected signs, normalizations, units, limiting cases, and numerical claims. Examples include trace reversal and Newtonian matching, the matter-action normalization with the declared coordinate convention, radial null directions in horizon-penetrating coordinates, Schwarzschild orbital scales, the Earth tidal estimate, the distinction between a curvature component and a squared invariant, and the constant-matrix tidal-cloud model. This is an expert review and targeted verification, **not a machine-checked proof of every equation**.

The legacy `book.tex` is explicitly retained as an older print source. It is not the current web edition and should not be used to infer defects in the canonical manuscript. Existing review documents were treated as historical context; findings below refer to the current implementation. In particular, the new orbit, wave, Kruskal, Stokes, and quantum-input bridges are present and deserve credit.

Browser reproductions used the local generated site in Chrome, with desktop and mobile viewports and an isolated JavaScript-disabled context. No real provider calls were made, no API credits were spent, and no learner study was conducted. The automated AI checks use mocked providers. Consequently, this review makes no claim about measured live tutor accuracy, real speech fidelity, universal browser accessibility, or actual learning gains.

Primary teaching and scientific sources were checked where relevant. An instructive comparison is [MIT's graduate GR syllabus](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/syllabus/), which explicitly expects differential equations, electromagnetism, action principles, Green functions, and numerical analysis. This resource can admit readers without those subjects, but then has to teach the needed portions. [Tong's course outline](https://davidtong.org/teaching/general-relativity/) also helps identify the graduate gap: it includes Hodge duality, charged black holes, Cauchy horizons, energy extraction, and superradiance alongside problem sheets. These are comparisons of scope, not instructions to copy another course's ordering.

## 3. Strengths that should survive revision

1. **Operational foundations.** Clocks, accelerometers, neighboring laboratories, and exchanged signals give the subject physical meaning before the abstraction becomes heavy.
2. **Objects before component lists.** Vectors, covectors, Jacobians, inverse metrics, and moving bases receive unusually useful explanations. The nonlinear coordinate-change bridge is especially good: it shows an invariant measurement explicitly surviving two compensating transformations.
3. **Coordinate artifacts are separated from curvature.** Flat polar coordinates, accelerated coordinates, parallel transport, normal coordinates, and curvature invariants reinforce the distinction from several directions.
4. **Ricci and Weyl are treated carefully.** The course does not confuse Ricci-flat with flat, trace-free tides with permanent volume preservation, or the number of curvature components with propagating degrees of freedom.
5. **Several commonly hidden derivations are supplied.** The worldline variation, determinant variation, integration-by-parts logic, trace reversal, Einstein–Hilbert boundary issue, quadrupole manipulation, and cosmological equations receive real attention.
6. **Horizon teaching is conceptually sound.** Eddington–Finkelstein and Kruskal bridges, future-directed null slopes, areal radius, and eternal-versus-collapse distinctions are now substantial. Do not replace these with an escape-speed story.
7. **Modern viewpoints are present without overselling them.** ADM constraints, local frames, effective field theory, semiclassical limits, and the difference between classical and quantum input provide a useful modern outlook.
8. **Models frequently state their limitations.** Flamm's embedding is a spatial slice with auxiliary height; the precession model magnifies a controlled phase effect; the wave displacement is first order; the expanding grid does not purport to solve an expansion history. These qualifications prevent real misconceptions.
9. **The software has a serious foundation.** Pre-rendered mathematics, semantic color, authored symbol definitions, keyboard interactions, reduced-motion behavior, source-aware narration, local notebook storage, validated navigation tools, sanitization, and extensive browser tests are valuable existing work.
10. **The voice is inviting.** Many explanations make an intimidating subject approachable without abandoning precision. Revision should reduce unnecessary cognitive load while retaining that character.

## 4. Confirmed defects and concrete corrections

### F01 — P1: The symbol inspector calls a coordinate “proper time”

**Evidence.** In the Chapter 17 `horizon-directions` bridge, the text correctly defines

\[
\rho=r/r_s,\qquad \tau_{\rm plot}=cv/r_s-\rho
\]

and explicitly says that the second quantity is a dimensionless coordinate, not a traveler's proper time. Clicking its marked symbol opens the authored **Proper time / Time recorded by a clock** card. The same bridge contains seven such marked occurrences in its derivation layer.

The cause is [scripts/math-system.mjs:107](/Users/neo/repos/general-relativity/scripts/math-system.mjs:107): the heuristic identifies essentially every `\tau` as proper time, excluding an Euclidean-time subscript but not `plot`. The conflicting definition is [web/symbols.js:20](/Users/neo/repos/general-relativity/web/symbols.js:20); the correct local definition is [content/bridge-lessons.mjs:81](/Users/neo/repos/general-relativity/content/bridge-lessons.mjs:81).

**Correction.** Give mathematical occurrences an explicit semantic identity scoped to the equation or lesson. For this occurrence, use “dimensionless plotting time” with its definition and domain. Suppress a tooltip when meaning is unresolved. A short-term exception for `plot` repairs this case; an exception list is not a durable semantic model. Merely renaming the coordinate would leave the underlying failure mode intact.

**Acceptance.** Test proper time, Euclidean time, plotting time, and arbitrary parameters in the actual rendered lessons. Check that the visible label, definition, units, color role, source link, and spoken description agree. Include deliberately ambiguous symbols for which no meaning should be guessed.

### F02 — P1: One chapter uses the same symbol for quantities with different dimensions

**Evidence.** [book.md:2845](/Users/neo/repos/general-relativity/book.md:2845) defines the Kretschmann scalar

\[
\mathcal K=R_{\alpha\beta\gamma\delta}R^{\alpha\beta\gamma\delta},
\qquad [\mathcal K]=L^{-4}.
\]

Then [book.md:2918](/Users/neo/repos/general-relativity/book.md:2918) reuses `\mathcal K` for the magnitude of one radial tidal-curvature component,

\[
\frac{2G_NM_\oplus}{c^2R_\oplus^3},\qquad [\,cdot\,]=L^{-2},
\]

and takes its inverse square root to make a length. The prose identifies the latter as a component, and its numerical result is correct. The notation nevertheless tells a learner that the previously defined invariant has changed dimensions.

**Correction.** Retain `\mathcal K` for the Kretschmann scalar; call the second quantity, for example,

\[
\mathcal R_{\rm tidal}:=
\left|R_{\hat r\hat0\hat r\hat0}\right|
=\frac{2G_NM_\oplus}{c^2R_\oplus^3},
\qquad L_{\rm tidal}=\mathcal R_{\rm tidal}^{-1/2}.
\]

State the chosen orthonormal observer frame. With \(m=G_NM/c^2\), Schwarzschild gives \(\mathcal K=48m^2/r^6=12\mathcal R_{\rm tidal}^2\) for this radial component magnitude. A length formed from the invariant is \(\mathcal K^{-1/4}\), with a different numerical factor.

**Acceptance.** Definitions and units remain consistent across prose, equation summaries, diagrams, search results, tutor context, and narration. This is a notation defect, not evidence that the Earth calculation or the Schwarzschild invariant formula is wrong.

### F03 — P1: All 13 conceptual checks put the correct answer first

**Evidence.** Every `practice.choices` array in [content/geometry-lessons.mjs](/Users/neo/repos/general-relativity/content/geometry-lessons.mjs) and [content/bridge-lessons.mjs](/Users/neo/repos/general-relativity/content/bridge-lessons.mjs) has its single correct answer at index zero. [scripts/course-content.mjs:17](/Users/neo/repos/general-relativity/scripts/course-content.mjs:17) renders that order. There is no learner-facing shuffle.

**Consequence.** A learner can succeed on every conceptual check without knowing GR. Several correct options are also more qualified or technically polished than the distractors, providing additional cues.

**Correction.** Use stable option IDs and balanced authored ordering or a persisted, reproducible shuffle. Rewrite distractors from plausible learner reasoning, keeping options comparable in style. Ask for a prediction before revealing the explanation, then ask why it holds.

**Acceptance.** A build check catches systematic answer-position patterns. Saved attempts remain associated with option identities after reordering. Pilot learners who misunderstand the concept select recognizable distractors rather than simply detecting the most carefully written sentence.

### F04 — P2: The evidence model cannot represent learning after help

**Evidence.** [web/course.js:37](/Users/neo/repos/general-relativity/web/course.js:37) labels any successful calculation with `solutionSeen` as “Worked through · try again unaided.” Opening a solution sets that boolean permanently for the lesson ([line 88](/Users/neo/repos/general-relativity/web/course.js:88)); subsequent submissions preserve it. Records store the latest answer and an attempt count, rather than the history of which attempt was assisted. Conversely, viewing only a hint is not recorded as assistance. A later incorrect submission also replaces the previous transfer result.

**Correction.** Record attempts separately: item/version, parameters, submitted reasoning or answer, correctness, help used, time, and whether it was a fresh or repeated item. Retain successful evidence while also recording later difficulty. Offer a fresh variant after a worked solution; use delayed, unassisted success as new evidence. Avoid treating “has ever seen a solution” as a permanent learner property.

**Acceptance.** A learner can move from assisted completion to a new unaided success without losing the earlier history. Hints, solutions, and independent work are distinguishable. A mistake on review triggers useful feedback rather than erasing all evidence of prior progress.

### F05 — P1: Essential bridge text disappears when JavaScript is unavailable

**Evidence.** [scripts/course-content.mjs:13](/Users/neo/repos/general-relativity/scripts/course-content.mjs:13) emits the derivation and formal panels with `hidden`. JavaScript is required to expose them. In a JavaScript-disabled browser, the Chapter 17 bridge's `derive` and `formal` panels both have `display:none`; the “Work it out” and “Go deeper” buttons do nothing. Its visual area indefinitely says that the model is loading and that the worked calculation above explains the example—even though that calculation is hidden. Failure to fetch course data also leaves the tabs unbound while the error message says the worked text remains available.

**Correction.** Render all educational content accessible by default, using native details or an ordinary linear reading view. Apply tabs only after successful enhancement. Supply meaningful static content in every visual container before JavaScript starts; remove loading language when enhancement cannot occur. Hide or disable nonfunctional interactive controls with an explanation of the available alternative.

**Acceptance.** With JavaScript disabled, its entry script blocked, and course-data retrieval failed separately, all required derivations and qualifications remain readable. This finding concerns the bridges; the main manuscript itself remains substantially readable without JavaScript.

### F06 — P2: Browser Back loses the learner's reading location

**Evidence.** [src/App.svelte:43](/Users/neo/repos/general-relativity/src/App.svelte:43) pushes empty history state, and navigation without a hash scrolls to the top, including `popstate`. Reproduction: scroll Chapter 9 to about 3,200 px, follow an internal link to Chapter 10, then use browser Back. The reader returns near the top—75 px in the observed run—instead of the departure location.

**Correction.** Save a stable passage/section anchor plus local offset in each history entry, with pixel fallback. Restore after content and layout are ready. Preserve keyboard focus appropriately and distinguish ordinary Back from deliberate navigation to a new source.

**Acceptance.** Back and Forward restore position across chapters, long equations, open derivation tabs, font-size changes, and a paused narrator, without jumping again after fonts or a scene initialize.

### F07 — P2: Notebook export/import is not a complete round trip

**Evidence.** JSON export writes the entire course state, including route and selected depths. Import at [web/course.js:103](/Users/neo/repos/general-relativity/web/course.js:103) merges only notes, evidence, and visuals. Importing into a fresh browser therefore does not restore the exported route or selected layers. When entries conflict, existing local records win wholesale; the UI explains this, but provides no comparison or selective merge.

**Correction.** Define the backup contract explicitly. Either restore all advertised learning state or clearly label the operation a merge of observations and attempts. Prefer a preview with keep-local, use-imported, and preserve-both options where meaningful; version migrations should be deliberate.

**Acceptance.** Export from browser A, import into an empty browser B, and compare every field included in the published backup contract. Test edited lessons, unknown IDs, unavailable storage, and conflicting newer notes. Never include credentials in a notebook.

### F08 — P2: Route validity is weaker than the UI suggests

**Evidence.** [content/course.mjs:6](/Users/neo/repos/general-relativity/content/course.mjs:6) contains chapter-level dependencies; its validation checks ordering and closure against those authored edges. It cannot detect a prerequisite that the author omitted. The Lie bracket appears in Chapter 7 well before its developed treatment in Chapter 15. Conversely, Chapter 21 requires Chapter 20, which requires gravitational waves and cosmology; the black-hole route consequently includes every chapter from 0 through 22. That sequence is valid against the current graph, but much of it is unnecessary for learning coframes or horizon geometry.

The manuscript's reading guide and the interactive picker also offer different route sets. Finally, `updateRoute()` displays “Route complete” solely from the current chapter's position, not completed learning evidence. This is navigation completion language, but a new visitor can understandably read it as personal progress.

**Correction.** Model section-level skills and separate necessary prerequisites, useful background, previews, and optional extensions. Generate the guide, picker, tutor context, and return links from the same graph. Label the final chapter “End of this route” until actual progress warrants stronger wording.

**Acceptance.** A route is checked against each lesson's required skills, not merely chapter numbers. The short horizon route reaches causal black-hole physics without unrelated ADM examples; the advanced route can still include those examples by choice.

### F09 — P3: Repetition and notation drift weaken otherwise good material

**Evidence.** The sphere/coframe computation in [book.md:6409](/Users/neo/repos/general-relativity/book.md:6409) is repeated at [book.md:6492](/Users/neo/repos/general-relativity/book.md:6492). Its curvature two-form changes from `\mathcal R` to `\Omega` without a useful reason. Some historical framing and introductory warnings recur. The Rindler capstone intentionally revisits an earlier example, but currently supplies most of the answer again.

**Correction.** Keep one authoritative derivation; use the second encounter for retrieval, a changed metric, a different frame, or an error diagnosis. Announce deliberate notation translations. Preserve valuable spaced revisiting while removing repetitions that ask nothing new of the reader.

**Acceptance.** Each recurrence has a stated new job. A learner returning to a familiar example must predict, recover, generalize, or test something rather than simply reread it.

## 5. Prerequisites: what the entry promise still needs

Chapter 0 is a useful refresher. It is too short to substitute for the relevant parts of mechanics, differential equations, fields, electromagnetism, and thermal physics. The right remedy is a collection of short, assessable foundations inserted just before use, with an optional preparatory route collecting them.

| Needed skill | First important demand | Present situation | Recommended teaching bridge and exit task |
|---|---|---|---|
| Physical dimensions and coordinate dimensions | Conventions; Chapters 3–5 | Units receive good attention, but dimensional reasoning is not practiced systematically. | Convert the same interval using `t` and `ct`; determine the dimensions of each metric component and Christoffel symbol. |
| Vector calculus on fields | Chapters 0, 2, 11–12 | Partial derivatives and flux are introduced briefly. | Follow a particle through a scalar field, distinguish gradient from directional derivative, and derive a flux law on a sphere. |
| ODE solutions and initial data | Chapters 5, 7–8, 16, 18, 20 | Constant acceleration is taught; later examples demand oscillatory, coupled, and second-order systems. | Solve exponential growth, an oscillator, and a two-component transport ODE; verify solutions by substitution and distinguish initial from boundary data. |
| Hyperbolic functions | Chapter 3 rapidity; Chapter 5 Rindler map | `sinh`, `cosh`, and `tanh` appear without an adequate elementary construction. | Define them using exponentials; derive the identity and derivatives; build a boost from a hyperbola. Include inverse hyperbolic functions before Shapiro delay. |
| Lie brackets and commuting flows | Chapter 7 torsion; Chapter 8 curvature | The bracket is named before its operational calculation is taught. | Define `[X,Y]f=X(Yf)-Y(Xf)` and `[X,Y]^a=X^b∂_bY^a−Y^b∂_bX^a`; compute `[∂_x,x∂_y]=∂_y`; compare the two orders of small moves. |
| Energy, momentum, work, angular momentum | Chapters 3, 5, 11, 16 | Definitions exist; orbit conservation now has a helpful bridge. Physical fluency is still assumed elsewhere. | Derive energy conservation for a particle in a potential and angular momentum for a central force. Interpret pressure work by moving a piston. |
| Field Lagrangians and electromagnetism | Chapter 11.6 | Scalar and electromagnetic stress tensors appear before the general field-action lesson. The text explicitly expects recognition of the Poynting vector. | Teach what a classical field is and how it stores/transports energy. Supply a minimal EM path or make this an explicitly optional worked preview with a return after Chapter 13. |
| Poisson equations, singular sources, Green functions | Chapters 12 and 18; Appendix A.5 | Poisson normalization and retarded solutions are used; distributions are only touched upon. | Derive `∇²Φ=4πG_Nρ` from inverse-square gravity and flux; distinguish vacuum from the point source; construct a retarded solution and verify its normalization. |
| Waves and complex notation | Chapter 18; quantum continuation | The new traveling-wave/retarded-time bridge is useful and should remain. | Extend it to superposition, polarization, Fourier components, wave packets, and a solved initial-value problem. Separate phase velocity, signal propagation, and detector response. |
| Constrained variations and boundary data | Chapters 13–15, 20 | The treatment is better than a terse textbook introduction, but unfamiliar symbols accumulate quickly. | Vary a finite-dimensional function, a path, and a field in succession; explicitly contrast fixed endpoint values with fixed endpoint derivatives. |
| Global causal definitions | Chapters 17, 20, 22 | Causal maps are taught, but some theorems use concepts before their full definitions. | Teach chronological/causal futures, domains of dependence, Cauchy surfaces, and completeness before the singularity theorem discussion. Include examples where the notions differ. |
| Probability, thermal physics, quantum states | Chapters 22–23 | New input is now acknowledged honestly; the bridge supplies algebra, not the underlying subjects. | Provide optional foundations in probability, ensembles, density matrices, unitary evolution, field modes, and entropy. Keep a clearly labeled conceptual route for readers not taking that preparation. |

Two precise repairs should happen early. First, add the Lie-bracket bridge before torsion ([book.md:1954](/Users/neo/repos/general-relativity/book.md:1954)). Second, replace “You recognize the energy density and Poynting vector from electromagnetism” ([book.md:3282](/Users/neo/repos/general-relativity/book.md:3282)) with an actual explanation or an explicit optional prerequisite path. The current sentence directly contradicts the no-prior-physics premise.

Not every forward reference is a defect. The worldline chapter actually derives its Euler–Lagrange equation; it need not wait for the full variational chapter. A result can motivate later study if it is marked as a preview, its assumptions are stated, and no essential exercise silently depends on its unprovided derivation. The problem is an unmarked or inaccessible dependency, not simply using a concept before its longest treatment.

## 6. Recommended learning architecture

Retain the existing book as the narrative spine. Add routes that change required work and available scaffolding without fragmenting definitions or maintaining several inconsistent textbooks.

| Path | Who enters | What completion should demonstrate |
|---|---|---|
| Foundations | Basic calculus and linear algebra, little physics | Solve the small mechanics, ODE, field, and measurement problems required by GR. |
| Core GR | Foundations understood, possibly through diagnostic exemptions | Calculate in an unfamiliar metric, interpret observers and curvature, derive and use Einstein's equation in representative cases. |
| Applications | Core skills or appropriate diagnostic success | Solve orbit, clock, lensing, wave, stellar, and cosmological problems; connect predictions to measured quantities. |
| Graduate methods | Core competence | Work with causal structure, PDE/initial data, perturbations, differential forms, asymptotic charges, and rotating solutions at derivation level. |
| Research studios | Relevant graduate preparation | Reproduce a bounded result from a paper or dataset, identify approximations, test sensitivity, and explain unresolved issues. |

Depth should be local and reversible. A strong student should be able to prove they understand covectors and skip that bridge; a graduate student should be able to ask for a basic explanation of a particular unfamiliar topic without changing their entire identity to “beginner.” Avoid permanent ability labels.

For each substantial concept, require: a motivating measurement or question; a prediction; a concrete model; a derivation; a plain-language interpretation; an explicit domain of validity; an independent task; and a later transfer task. Not all must fit on one screen. Distinguish “shown here,” “derived here,” “proved under these assumptions,” and “introduced for later study.”

Introduce physical payoffs earlier, but keep their status honest. A learner should calculate a small clock effect or compare two free-fall experiments well before finishing ten chapters of geometry. Then revisit the same experiment as the necessary machinery becomes available. This gives the abstraction a continuing purpose without pretending that an early analogy is a proof.

The ability to derive Einstein's equation is one milestone. The ability to decide **which problem is well posed, which observers measure what, and what an approximation permits** should be the larger course outcome.

## 7. Chapter-by-chapter review

These recommendations distinguish a sound explanation that needs more practice from a missing subject or an actual error. Section numbers refer to the current manuscript; inserted bridges also live in the content modules.

| Chapter | Assessment | Specific improvements and a useful exit task |
|---|---|---|
| **0 — Preparation** | A friendly refresher, not yet a sufficient physics preparation course. | Add the bridges in Section 5. Make the entry diagnostic test interpretation as well as differentiation. Exit task: model a falling particle, identify assumptions, solve an ODE, and check dimensions without following an adjacent example. |
| **1 — Measuring equipment and gravity** | Strong motivation and careful separation of free fall from support. The falling-grid explanation properly restricts the observer family. | Introduce a two-laboratory experiment the learner will revisit throughout the course. Call the Schwarzschild radial label an **areal radius** when precision is needed. Explain the rain grid as a preview before displaying its velocity law; do not expect Chapter 1 learners to justify Schwarzschild coordinates yet. |
| **2 — Vectors, covectors, tensors** | One of the strongest foundations. The Jacobian and pairing bridge addresses a central misconception. | Add nonorthogonal-basis calculations, a covector with negative pairing, and a genuinely bilinear tensor example. State explicitly that a type `(r,s)` tensor, as a multilinear map, takes `r` covectors and `s` vectors. The opening covector lab should be marked as an exploration preview or follow the relevant definitions. |
| **3 — Special relativity** | Good interval, proper-time, observer-energy, and twin reasoning. | Add operational synchronization, relativity of simultaneity with two spatially separated clocks, rapidity foundations, relativistic Doppler shift, and a collision/conservation problem. Exit task: calculate the same pair of events and the same photon measurement in two frames; explain why an observer-dependent scalar is still coordinate invariant. |
| **4 — Manifolds and metrics** | Good local/global distinction, two-chart sphere, inverse metric, determinant, and frame discussion. | Give the exponential-map construction and its local domain a more concrete treatment at the appropriate depth. Add a non-diagonal metric calculation and a chart-overlap exercise with a transformed metric. Do not let familiarity with embedded surfaces become the only available intuition for a manifold. |
| **5 — Free fall and worldline action** | The action calculation is genuinely taught, including affine/null subtleties. Rindler is an excellent counterexample to careless gravity slogans. | Supply the hyperbolic-function bridge. Introduce what an ideal gyroscope measures before appealing to it later. Compare three paths between endpoints numerically, then distinguish stationarity, local maximization, and global maximization. |
| **6 — Covariant differentiation** | The changing-basis derivation, covector minus sign, scalar Hessian, and divergence are well chosen. | Add a learner-completed derivative of a mixed tensor. Have the learner compare a coordinate basis with an orthonormal polar frame. Link the determinant identity to its later proof precisely, without implying that its proof has already occurred. |
| **7 — Connection and transport** | Christoffel derivation and polar examples are effective. | Repair the Lie-bracket prerequisite before torsion. Distinguish connection coefficients in coordinate and non-coordinate frames with one computation. Add Fermi–Walker transport at advanced depth, with the operational role of nonrotating accelerated laboratories. |
| **8 — Riemann curvature** | Strong commutator, holonomy, sphere, and component-count teaching. | Explain oriented loop order carefully whenever comparing signs across books. Give a small counterexample showing that one loop can return a vector unchanged despite nonzero curvature. Ask learners to calculate a new two-dimensional metric rather than only reproduce the sphere. |
| **9 — Ricci, Weyl, Einstein** | Particularly good distinction between contractions and full curvature. The differential Bianchi treatment is valuable. | Add an explicit contraction exercise using a small supplied component table and a worked Ricci/Weyl decomposition in a representative spacetime. Teach “divergence free” versus “constant” by a concrete field, then use the lesson to motivate the Einstein tensor. |
| **10 — Tides and normal coordinates** | Strong observer-based curvature measurement, vacuum cloud cautions, and the vanishing-invariants example. | Repair F02. Show exactly what local experiments can recover, with apparatus size and neglected derivative terms. Explain that electric tidal measurements for one observer do not by themselves determine all curvature components; add the magnetic Weyl part and boosted observers in an advanced layer. |
| **11 — Stress-energy** | Excellent physical emphasis on energy, momentum flux, pressure, and observer decomposition. | Teach the field/EM prerequisites or move those examples behind an explicit preview. Add a boosted dust or fluid calculation, an anisotropic stress example, and a full derivation of radiation pressure. Distinguish mass density, energy density, coordinate components, and tetrad components in every worked problem. |
| **12 — Einstein equation** | Trace reversal, coupling normalization, and the Newtonian limit are carefully handled. | Derive Poisson's equation from flux in a worked bridge. Add a complete matter-sourced solution shortly after this chapter so the equation becomes a tool rather than a destination. Have learners identify what symmetry and boundary assumptions are required to solve it. |
| **13 — Variational calculus** | The progressive path/field/metric development is a strength. | Teach the oscillator before using it as a familiar stationary-action example. Add a boundary-condition counterexample and a variation with a constraint. Require a derivation with some steps omitted, then a different Lagrangian solved independently. |
| **14 — Einstein–Hilbert action** | The boundary term and sign qualifications are more careful than many introductions. | Separate the minimal core derivation from the graduate boundary analysis visually. Give an explicit boundary example, state admissible variations, and derive or clearly label the imported Palatini equation. Connect the boundary sign convention to ADM through one worked hypersurface calculation. |
| **15 — Symmetry and conservation** | The actual map/flow/Lie-derivative material is now substantial. Local conservation is not confused with a universal global energy. | Move the elementary bracket material earlier. Teach a concrete Noether first-theorem example before contrasting it with the second theorem. Compute one Killing charge and one energy flux; supply an advanced path to ADM/Bondi/quasilocal constructions beyond the names in the table. |
| **16 — Experiments** | Strong clock, GPS, deflection, Shapiro, and perihelion material; the orbit and resonance bridges are useful additions. | Derive the optical path/ray equation rather than assume geometrical optics. Introduce inverse hyperbolic functions. Either derive the needed Schwarzschild orbit equation here with an explicit preview or teach the relevant part of Chapter 17 first. Add measurement uncertainty and comparison with data. |
| **17 — Black holes** | The Schwarzschild derivation, regular horizon coordinates, photon sphere/ISCO distinction, and causal bridges form a good introductory chapter. | Add stellar collapse/interior matching, a quantitative redshift-and-reception experiment, impact parameter versus areal radius, and substantial Kerr work. Develop charged holes and Cauchy horizons in the graduate path. One paragraph about Kerr is an orientation, not competence in rotating spacetime. |
| **18 — Gravitational waves** | Linearization, gauge reduction, strain, quadrupole generation, and binary chirp give a coherent introduction. | Strengthen PDE/Green-function foundations; derive detector response from the specified measurement protocol. Add antenna patterns, network timing, noise and matched filtering, ringdown, and a real-data exercise. Teach the limitations of a test-particle ring versus a finite-arm interferometer. |
| **19 — Cosmology** | Units are declared, equations are developed, and Hubble/particle/event horizons are distinguished correctly. | Add critical density and density parameters, `H(z)`, distance measures, luminosity/angle relations, and a worked expansion-history inference. Then offer perturbations, structure growth, and inflation/CMB foundations as an advanced continuation. A finite grid is useful, but does not supply cosmological dynamics. |
| **20 — Initial data and numerical GR** | Constraints, lapse/shift, extrinsic curvature conventions, and the phase-space count are meaningfully explained. | Add an actual constrained initial-data calculation and a small evolution exercise. Teach stability, convergence, gauge behavior, constraint monitoring, and why a visually plausible animation is not a numerical-relativity solution. Give a route into PDE well-posedness without pretending a short overview proves it. |
| **21 — Tetrads, forms, gauge viewpoint** | Cartan calculations and the oriented Stokes bridge make the formalism tangible. | Consolidate the repeated sphere computation. Teach Hodge duality, pullback/integration, and Maxwell theory in forms. Separate the needed geometry from the ADM prerequisite chain. Offer spinor representations, bundle language, and holonomy only with real prerequisite paths and calculations. |
| **22 — Focusing, singularities, thermodynamics** | The limitations of focusing and singularity conclusions are careful. The new quantum-input bridge rightly says what the Euclidean argument does and does not establish. | Define Cauchy/global causal concepts before theorem use. Construct the null screen space, explain Frobenius at the selected depth, and walk through a theorem's logic. Split classical focusing from thermal/quantum material into independently navigable modules. Add state-dependent quantum-field teaching before claiming a derivation of Hawking flux. |
| **23 — EFT and frontier** | A good conceptual account of approximation, higher-curvature terms, and semiclassical limits. The current GWTC-5.0 citation is real and appropriately cautious. | Add a worked power-counting example and an observable correction with stated scheme/field-redefinition issues at graduate depth. Provide QFT preparation for loops and renormalization. Separate durable foundations from dated observational updates. |
| **24 — Synthesis** | Rindler is a useful full-chain check that coordinates alone do not create curvature. | Add a second capstone with nonzero curvature and matter. Let the learner choose observers, compute geometry, infer/verify a source, solve motion, and make a measurement prediction. Supply solutions only after a complete attempt; a second fully worked familiar example is not sufficient assessment. |
| **Appendix A** | Thirty relevant exercises, with useful traps and solutions. | Build sequences at several levels, distribute them at the moment of use, and add multi-step derivations, computational work, and unseen transfer. Several current items are one-line checks or verbal distinctions; retain these as formative items, not as evidence of graduate competence. |
| **Appendix B** | Helpful equation/reference ladder. | Add assumptions, dimensions, domain, and convention-translation links for each formula family. A compact reference should tell the reader when a formula is allowed. |
| **Appendix C** | A useful glossary. | Link meanings to actual occurrences and prerequisites. Distinguish mathematical definition, physical interpretation, and common alternate conventions. Repair glossary/parser consistency before expanding the vocabulary. |
| **Appendix D** | Valuable source and continuation guidance. | Mark which references supply proofs the course currently imports. Add dated source-review metadata and primary-data tutorials. External reading is a valuable extension, but should not silently bear the beginner route's prerequisites. |
| **Appendix E** | Good index practice and three useful extra calculations. | Integrate the index checklist into early exercises. The scalar-field example belongs after the relevant field/ODE preparation; the pressure-versus-deflection problem is an excellent model for misconception assessment. |

## 8. Missing or underdeveloped subject areas

“Missing” here means missing at the level required by the project's ambition. It does not mean that every introductory GR book must include all of these topics in its main route.

### 8.1 Essential additions to the broad core

**Relativistic stars and matter interiors.** The course devotes substantial attention to vacuum exteriors and homogeneous cosmology, but lacks a worked static matter interior, hydrostatic balance, and the Tolman–Oppenheimer–Volkoff equation. This leaves a large gap between a stress tensor and an astrophysical object. Teach an equation of state, a mass function, regularity at the center, pressure at the surface, and matching to the exterior. Derive the Newtonian limit. A constant-density example can expose pressure growth and compactness limitations; explain its idealizations. A numerical mass–radius family would be an excellent first authentic GR computation.

**Light propagation as observation.** Add the difference between an emitted photon, a null geodesic, and an observed image. Derive frequency from `−p·U`, angular measurements from an observer's tetrad, and distance from a specified observing procedure. Teach lens equations and magnification at an appropriate level. The Schwarzschild horizon, photon sphere, critical impact parameter, and observed bright ring must never be conflated.

**Observational cosmology.** Derive comoving, proper, angular-diameter, and luminosity distances and the reciprocity relation under its assumptions. Connect redshift, `H(z)`, and expansion parameters to a small dataset. Without this bridge, the claim that supernovae support acceleration remains a report about an inference the learner cannot reproduce.

**Computational methods.** Teach a minimal numerical toolkit: nondimensionalization, integration error, convergence under step refinement, conserved-quantity drift, coordinate singularities, and event detection. Give reproducible notebooks or browser calculations with a transparent model and solver. This is required both for modern practice and for making sophisticated demos scientifically trustworthy.

**More demanding special relativity.** GR learning depends on comfort with simultaneity, four-momentum, observer frames, Doppler effects, and acceleration. Add enough problems to establish that comfort before curved-spacetime calculations depend on it.

### 8.2 A credible graduate path

**Rotating and charged black holes.** Develop Kerr's geometry, constants of motion, frame dragging, ergoregions, energy extraction, separability/Carter constant, and representative orbits. Add Reissner–Nordström, extremality, inner/Cauchy horizons, and the distinction between exact idealized extensions and stability under perturbations. Derivation of the full Kerr solution is not a necessary beginner requirement; using and interrogating it should be a graduate outcome.

**Global Lorentzian geometry.** Add causal hierarchy, domains of dependence, global hyperbolicity, geodesic completeness, conjugate points, trapped surfaces, and clear theorem statements. Explain why local curvature measurements cannot determine an event horizon without global information. Use counterexamples and diagrams with specified conformal maps.

**Geometric methods.** Add the exponential map and Jacobi fields in greater depth, Hodge duality, hypersurface geometry/Gauss–Codazzi, orientation and integration, and coherent coordinate/frame translations. Petrov classification and Newman–Penrose methods are useful specialized continuations, not requirements to front-load into the introductory path.

**Perturbations and radiation.** Add perturbations of black holes, effective radial potentials, quasinormal modes, gauge-invariant quantities, cosmological perturbations, and the relation between analytic approximations and numerical waveforms. Distinguish a local averaged stress description from asymptotic energy flux.

**Asymptotics and charges.** Develop ADM and Bondi energy with actual calculations, appropriate falloff conditions, and a route into asymptotic symmetries and gravitational memory. Their presence as names in a table is useful orientation but insufficient for expert study.

**Collapse, matching, and initial data.** Add a simple collapse model, junction conditions at the selected depth, a solved constraint example, gauge choices, and an evolution/convergence project. Avoid allowing “numerical relativity” to mean only an animation of slices.

### 8.3 Research-level continuations with explicit preparation

**Quantum fields in curved spacetime.** Supply quantum/statistical prerequisites, mode decompositions, the role of positive frequency and states, detector response, Bogoliubov transformations, and the distinction between Unruh, Hartle–Hawking, and Boulware states. Derive a controlled result before extending to evaporation. Euclidean periodicity, outgoing flux in collapse, and a microscopic entropy count are different claims.

**EFT calculations.** Develop power counting, local operators, renormalization, field redefinitions, nonlocal effects, and the domain of a computed correction. Include a worked example of what low-energy predictivity means. A correct overview of loops is not a substitute for teaching the calculation.

**Information and modern gravity.** Offer a carefully scoped path to generalized entropy, quantum extremal surfaces, Page curves, islands, holography, and their assumptions. Pair each with a statement of what is controlled, what is model dependent, and what is not experimentally established. These should be genuine studios, not a collection of impressive terms.

**Mathematical frontiers.** Explain what a stability theorem asserts, which class of initial data it addresses, and how the norms and asymptotics matter. For example, the primary [Kerr stability work for small angular momentum](https://arxiv.org/abs/2104.11857) is a valuable case study in why qualifiers belong to the theorem. Do not turn a restricted theorem into a claim about all black holes.

## 9. Current science: keep the course current without making it fragile

The manuscript already cites the **21 July 2026 GWTC-5.0 tests paper**, and its summary that the combined tests find no overall evidence beyond GR agrees with the paper. This should be retained; it is not a stale or invented reference. A useful improvement would let the learner inspect what a residual, polarization, or remnant test actually compares, including stated limitations. [LVK, GWTC-5.0 tests](https://arxiv.org/abs/2607.19293).

Add a small set of dated observational and theoretical case studies:

| Case study | What the learner should learn | Necessary qualification |
|---|---|---|
| Multi-messenger neutron-star merger | Turn a time delay and distance into a conditional propagation-speed constraint. | Source emission delay is part of the inference; the arrival-time difference alone is not a direct speed measurement. [GW170817/GRB 170817A primary analysis](https://arxiv.org/abs/1710.05834). |
| Black-hole imaging | Distinguish spacetime ray propagation, emitting plasma, interferometric data, and reconstructed images. | A bright ring is not a photograph of the event-horizon surface. The original M87 analysis explicitly uses emission models and parameter inference. [EHT M87 shadow/mass analysis](https://arxiv.org/abs/1906.11243). |
| Pulsar timing arrays | Understand a very different frequency band and why correlations across many pulsars matter. | Evidence for a background is not identification of every contributing source. [NANOGrav 15-year primary result](https://arxiv.org/abs/2306.16213). |
| Expansion and structure inference | Learn how BAO, distances, and other datasets constrain a joint model. | Do not teach evolving dark energy as an established discovery. Compare model and dataset dependence. DESI's official index includes 2025 and July 2026 DR2 releases. [DESI DR2 publication index](https://data.desi.lbl.gov/doc/papers/dr2/), [DR2 BAO/cosmology analysis](https://arxiv.org/abs/2503.14738). |
| Stability and information | Learn to read the assumptions and scope of a research claim. | A theorem, semiclassical calculation, observational constraint, and speculative proposal require different kinds of evidence. |

Use a maintained “research window” attached to a stable concept. Every card should record the source/version, review date, what was measured or proved, assumptions, uncertainty, and the exact relationship to the lesson. Do not make headline recency the measure of sophistication. Teaching how to interpret a result is more durable than listing the latest result.

## 10. Teaching for understanding, retention, and delight

### 10.1 Make the learner do something the explanation cannot do for them

The course currently offers 13 conceptual checks, 13 numerical transfers, 30 Appendix A exercises, and three additional Appendix E calculations. These are useful ingredients. They are not yet an adequate practice structure for 25 chapters and multiple levels of expertise. Several transfers can be answered by substituting changed numbers into a visible formula; some can be answered by a method other than the one the prompt intends to assess. For example, the coordinate-change transfer asks for a rate using the new coordinates, but the checker accepts only the final number and cannot tell whether the transformation was performed.

Build sequences with distinct roles:

1. **Predict:** choose or sketch a result before seeing the demonstration.
2. **Complete:** finish a missing step in a worked derivation.
3. **Explain:** identify why the step is legal and which assumptions it uses.
4. **Calculate:** solve a changed problem without the worked template visible.
5. **Diagnose:** repair a plausible incorrect solution.
6. **Transfer:** choose the appropriate method for an unfamiliar representation or physical setting.
7. **Retrieve later:** solve a fresh item after a delay, with assistance available but recorded.

The key improvement is not a larger question count by itself. It is alignment between the promised skill and what the learner must actually produce. Use numerical checks for numerical claims, structured intermediate steps for methods, and an expert rubric for explanations and proofs. AI can supply feedback; it should not be the sole authority for high-stakes mastery decisions.

Evidence from STEM education supports active participation over explanation alone, but it does not prescribe a universally optimal GR sequence. [Freeman et al.'s primary meta-analysis](https://doi.org/10.1073/pnas.1319030111) supports building meaningful activity into instruction. [Deslauriers et al.](https://doi.org/10.1073/pnas.1821936116) also illustrates why perceived fluency and measured learning can diverge. Apply those lessons by measuring performance on new problems as well as enjoyment; do not promise that effortless-feeling study is necessarily effective study.

### 10.2 Turn warnings into discriminating experiments

The manuscript already contains many good warnings. Convert them into recurring diagnostic tasks:

| Misconception | Task that reveals it |
|---|---|
| Nonzero Christoffel symbols prove gravitational curvature | Compare Cartesian, polar, and Rindler coordinates in flat spacetime with a genuinely curved example. Compute or measure what distinguishes them. |
| A coordinate scalar is observer independent | Hold one photon fixed and change the observer in `E=−p·U`; separately change coordinates for the same observer. |
| A vanishing Ricci scalar means flat spacetime | Compare flat spacetime, Schwarzschild vacuum, and a wave example. Ask what additional evidence is necessary. |
| All effects of gravity vanish in a freely falling laboratory | Compare one accelerometer with the changing separation of two free particles; vary apparatus size. |
| Trace-free tides preserve volume forever | Predict the initial volume acceleration and then the later cloud volume. Explain the different statements. |
| A horizon is a place where light locally stops | Trace future null directions in regular coordinates and calculate a local observer's measurement. |
| The photon sphere is the visible edge of the horizon | Compare `2m`, `3m`, and the Schwarzschild critical impact parameter `3√3m`, defining what each measures. |
| Cosmic expansion stretches everything automatically | Compare freely comoving markers with a bound system and state the forces and approximation used. |
| Covariant conservation gives a globally conserved energy in every spacetime | Identify the symmetry and boundary conditions needed for a proposed charge. |
| The Euclidean temperature argument derives all of Hawking radiation | Mark each classical, quantum-statistical, and quantum-field input in the argument. |
| Higher derivatives automatically invalidate EFT | Separate exact treatment of a truncated higher-derivative equation from a controlled perturbative expansion. |
| Twenty curvature components imply twenty wave polarizations | Distinguish data at one event from constrained propagating degrees of freedom. |

Use the learner's explanation of the wrong alternative to choose the next bridge. A list of misconceptions is less useful than a system that can recognize and repair one.

### 10.3 A concrete example of a better transfer task

After the Rindler and connection material, provide

\[
ds^2=-N(z)^2c^2dt^2+dz^2+dx^2+dy^2,
\qquad N(z)>0.
\]

First let the learner predict whether different clock rates at different heights necessarily imply curvature. Supply enough scaffold to obtain `Γᵗ_tz=N′/N` and `Γᶻ_tt=c²NN′`. Then ask them to calculate the scalar curvature and compare two choices:

\[
R=-2\frac{N''}{N},\qquad
N_1=1+az/c^2,\qquad N_2=e^{kz}.
\]

The first is flat on its regular domain; the second has `R=−2k²`. Both can have nonzero coordinate connection coefficients and height-dependent clock rates. Ask for a local measurement that distinguishes them. Finally, give a different lapse function without the intermediate steps.

This task combines an emotionally satisfying surprise with a calculation, an operational interpretation, and a reusable diagnostic. The constants and domains must be defined: `a` is an acceleration and `k` an inverse length. It assesses understanding of a relationship, rather than recognition of a familiar drawing.

### 10.4 Editorial and motivational changes

Keep humor where it releases tension or makes an idea memorable. Reduce repeated jokes about notation, “bookkeeping,” and symbols behaving badly when they distract from the mathematical step. Avoid repeatedly telling a novice that something is easy or “just” an operation. Name the exact operation instead.

Give each section a small, observable goal: “By the end, you can calculate the reading of a moving clock,” rather than “understand spacetime.” Explain why productive difficulty is expected. Offer a short worked restart after an incorrect attempt, without a punitive score or forced lockout.

Make reading-time labels clearly distinct from study effort. A nine-minute reading estimate beside a dense tensor chapter is not a reasonable promise of nine-minute competence. Prefer estimated reading length plus a visible count of activities; calibrate study estimates with learners before publishing them.

Use fewer simultaneous demands in the first encounter: one visual, one question, a small set of symbols, and a clear next action. Keep derivations, controls, definitions, and source discussion available nearby. Delight should come from discovering an invariant, making a successful prediction, or seeing a computation explain a puzzling observation—not only from animation and typography.

## 11. Demos: from illustrations to scientific laboratories

The existing labs are often carefully bounded. Preserve their physical qualifications and independent model checks. Three-dimensional rotation is useful for tangent planes, cloud volume, and suppressed dimensions. A two-dimensional linked diagram is often better for a derivation or causal argument. Choose the representation for the question, not to maximize visual spectacle.

### A specification every demo should satisfy

Each model should declare the physical question, geometry/background, observer family, coordinates, units, initial/boundary data, approximation, controlled variables, measured outputs, and a static alternative. A learner-facing short version can say “What you control / What is measured / Where this model applies”; full details can remain expandable.

Include a prediction before manipulation, a useful reset, a reproducible saved state, a comparison state, and a task that changes the example. Separate camera motion from physical parameter changes. Export or copy the experiment's parameters and equations. Make the same state available to narration and the tutor through a shared schema.

The numerical engine should have invariant and convergence checks where applicable. The current repository already has several independent checks—for example, radial quadrature against the Schwarzschild ruler and polarization/propagation checks. Extend that practice rather than testing only that a displayed number matches the function which generated it.

### Prioritized laboratory additions

| Laboratory | Learning payoff | Required validation and boundary |
|---|---|---|
| **Clock-and-radar laboratory** | Synchronization, simultaneity, proper time, Doppler shift, and accelerated observers become related measurements. | Recover Lorentz transformations and known inertial results; distinguish signal travel time from a clock-rate comparison. |
| **One geometry, several coordinate systems** | Link Cartesian/polar or inertial/Rindler components while keeping a specified invariant fixed. | Transform the metric and vectors consistently; flag chart boundaries; preserve pairings and interval values. |
| **Connection-to-curvature experiment** | Carry vectors, shrink loops, and connect measured holonomy to curvature. | Show orientation, area, and the small-loop approximation; compare flat and curved examples. |
| **Metric investigation workbench** | Given a small metric family, compute connection, curvature, geodesics, and observer measurements. | State conventions, domains, symbolic assumptions, and numerical error; verify against independently known metrics. |
| **Schwarzschild ray-and-clock laboratory** | Distinguish horizon, photon sphere, capture threshold, local angles, coordinate time, and proper time. | Integrate actual null/timelike equations, monitor conserved quantities, and switch to regular coordinates near the horizon. Keep emission models separate from ray geometry. |
| **Relativistic star builder** | Connect stress, pressure support, equation of state, mass, radius, and exterior geometry. | Center regularity, surface condition, matching, Newtonian limit, and convergence. Label simplified equations of state. |
| **Interferometer and waveform laboratory** | Connect a polarization tensor to detector response and noisy measured strain. | Derive the response regime; add finite-arm effects only with the relevant model; separate sample data, synthetic data, and fitted waveforms. |
| **Cosmological distance laboratory** | Link expansion history, redshift, horizons, and observations. | Verify analytic radiation/matter/de Sitter cases, distance definitions, and integration accuracy; include uncertainty and degeneracy. |
| **Initial-data laboratory** | Demonstrate that plausible metric and matter choices can violate constraints. | Display constraint residuals and convergence; do not advertise a full numerical-relativity solver until one exists and is verified. |
| **Graduate research studios** | Reproduce a bounded result involving ringdown, Kerr orbits, memory, or a semiclassical model. | Pin source/version and code, identify assumptions, and require a sensitivity or limiting-case analysis. |

### Refinements to existing labs

- **Falling Earth grid:** keep the rest-at-infinity rain-observer qualification visible. Add a comparison with a particle released from rest at finite radius; explain why the velocity law changes. A stationary geometry need not have a stationary chosen grid.
- **Covector planes:** add negative displacement, a different covector, and a nonorthogonal basis. The pairing includes signed fractional intervals; it is not merely counting visible rings.
- **Tidal cloud:** the introductory deformation uses `(1+2s,1−s,1−s)` and correctly claims volume preservation only to first order. Define the relationship between `s` and short proper time, such as `s≈GM Δτ²/(2r³)` for the frozen leading tide, and show when that approximation ceases to be accurate. Compare with the existing constant-matrix model, without claiming that either is an entire Schwarzschild congruence.
- **Precession:** keep the magnification explicit. Add a switch between the pedagogical phase model and an actual geodesic calculation, with a clear explanation of the different regimes.
- **Wave ring:** retain strain/frequency separation and the first-order limitation. Show the detector-frame interpretation and explain that finite visual area changes at exaggerated strain are not a second-order prediction of the linear model.
- **Cosmic grid:** connect the scale-factor control to selectable solved histories and a light ray. The existing model properly says that the slider alone does not determine a cosmology.
- **ADM slices:** let the learner change lapse and shift independently while preserving a specified underlying spacetime, before introducing genuinely different evolution data.

## 12. AI integration: a scientific tutor with accountable behavior

### 12.1 What is already good

The companion has exact passage tools, bounded navigation, current reader/lesson context, model-state awareness, hint-first instructions, separate listening history, and explicit cautions against equating exposure with mastery. Retrieved content and learner notes are labeled as reference material. Rendering uses restricted Markdown, KaTeX, and sanitization. The voice system distinguishes narration from conversation and can resume a paused passage. These are meaningful design choices, not cosmetic AI additions.

There is also a useful distinction between authored text and generated spoken explanations. Some visual experiences already provide authored narration. The documentation acknowledges that generated explanations are not independently verified textbook text. Preserve and make this distinction understandable in the product.

### 12.2 The largest gap is scientific validation

The instructions in [src/lib/book.js:46](/Users/neo/repos/general-relativity/src/lib/book.js:46) ask the model to preserve signs, units, prerequisites, and coordinate distinctions. The integration tests verify that tools and context behave properly. Neither establishes that a model consistently follows those instructions on difficult GR questions.

Create an expert-reviewed evaluation set with a small public example set and a separate held-out set. Include correct answers, plausible wrong derivations, convention changes, insufficiently specified problems, ambiguous notation, missing prerequisites, and adversarial text inside learner notes. Grade scientific correctness and teaching behavior separately.

At minimum, include these families:

| Evaluation family | What a reliable tutor must do |
|---|---|
| Sign/convention translation | State and translate the Riemann convention and signature consistently; identify the exact changed definition. |
| Coordinate versus physical claims | Reject the inference that a coordinate velocity is a local measured speed; ask which observer is intended when necessary. |
| Curvature diagnostics | Distinguish zero scalar, zero Ricci, zero full Riemann, and exceptional vanishing-invariant geometries. |
| Index and unit errors | Identify a mismatched free index, repeated dummy index, missing `c`, or component/unit confusion at the earliest faulty step. |
| Null/geodesic subtleties | Handle affine versus nonaffine parameters and the inadequacy of extremizing a trivially zero null proper-time integral. |
| Approximation boundaries | Refuse to extrapolate the weak-field orbit or linear strain model as an exact strong-field result. |
| Horizons and quantum input | Distinguish local horizon crossing, global event horizons, equilibrium temperature arguments, and outgoing Hawking flux. |
| Pedagogy | Diagnose the student's error, offer the smallest useful hint, and check a new example rather than merely restating a polished solution. |
| Source fidelity | Quote only real source text, link the correct equation/section, and distinguish an extension beyond the book from what the book actually proves. |
| Speech fidelity | Preserve negations, inequality direction, powers, indices, units, and the distinction between coordinate and proper quantities through rewriting and speech. |

Model, prompt, retrieval, content, and narration changes should trigger the relevant evaluations. Use deterministic algebra/unit checks for claims that can be checked, expert rubrics for conceptual explanations, and human review for failures. Agreement between two models is useful evidence to investigate, not a proof of correctness.

### 12.3 Build a shared scientific content model

The F01 tooltip contradiction shows why this matters even without generative AI. Give important equations and claims stable identities carrying: symbol definitions and units; tensor type; coordinate and observer conventions; domain; approximation order; required concepts; proof/source links; known misconceptions; and a verification status.

Generate the symbol inspector, formula references, scene context, tutor retrieval metadata, and critical narration from that record. Keep occurrence-specific overrides for overloaded symbols. Distinguish exact source, authored explanation, generated explanation, and independently checked calculation in the interface.

Current retrieval in [src/lib/book.js:22](/Users/neo/repos/general-relativity/src/lib/book.js:22) is a lexical ranking system with helpful aliases. Extend it with mathematical/concept identifiers and prerequisite-aware retrieval. Evaluate equation-only queries, alternate terminology, and wrong-sign questions. Do not assume that adding embeddings alone solves scientific grounding.

The tutor's default prompt assumes basic calculus and linear algebra. Add an editable goal and per-topic evidence of readiness so experienced readers can request a proof, an alternative formalism, a counterexample, or a research-level limitation without repeatedly bypassing elementary explanations. Keep the ability to ask for a simple explanation at any level.

### 12.4 Features worth building

**“Find my first wrong step.”** Let the learner submit a derivation. Check index structure, units, assumptions, and algebra where possible; give feedback on the earliest supported error. Show the evidence behind the diagnosis.

**“Explain this exact state.”** The tutor should refer to the current scene's parameters, observer, view, and model limitations. For a prediction, it should consult the trusted simulation result or a checked calculation. It should not invent a trajectory from an attractive screenshot.

**“Give me a smaller bridge.”** Connect an error to a short prerequisite lesson, preserve the departure point, and return with a fresh task. A generic paragraph defining every unfamiliar word is a poor substitute for a targeted bridge.

**“Test my explanation.”** Ask for a counterexample, a limiting case, or a changed observer. This makes the model a partner in checking understanding rather than a machine for supplying finished prose.

**“Compare formulations.”** For advanced readers, translate a coordinate derivation into tetrads/forms, or a geodesic calculation into Hamiltonian language, with the conventions and domain explicitly matched.

### 12.5 Preserve independent learning and accessible access

Offer an optional practice mode that records hints and solutions and schedules a fresh unaided attempt. Do not deny a requested explanation or trap the learner behind a score. Measure what the learner can do when assistance is removed.

The evidence on AI tutoring is design- and context-dependent. A [2025 randomized college-physics study](https://www.nature.com/articles/s41598-025-97652-6) reports benefits from a deliberately designed tutor. A [2025 high-school mathematics field experiment](https://doi.org/10.1073/pnas.2422633122) found that an unrestricted assistant could improve assisted performance while harming later unassisted performance; its tutor safeguards changed that outcome. Neither study validates this GR product, its models, or long-term PhD-level learning. Together they support evaluating the teaching design and unaided outcomes, rather than treating model fluency as educational evidence.

The current bring-your-own-key design is a legitimate personal-use architecture and is documented honestly. It is a substantial access barrier for a broad public learning resource: readers must arrange provider accounts, keys, model access, voices, and billing. For a public service, consider a hosted access layer with server-held application credentials, bounded usage, transparent costs, account recovery, and short-lived browser credentials where supported. Keep the non-AI course fully usable and provide a useful authored baseline for readers without paid access.

This is a product recommendation, not a finding of an observed credential leak. Do not silently transmit an entire notebook or learning history when a small selected excerpt suffices. Give readers understandable control over what reaches a provider and what is retained.

## 13. Software quality, accessibility, and maintainability

### Reading continuity and resilience

Repair F05–F07 first. Also test slow loading, a failed chapter request, interrupted narration, unavailable storage, an edited lesson after a saved attempt, and recovery after closing the tab. Preserve the scientific source and current activity even when a provider is down.

Allow a general notebook entry tied to any passage, equation, or experiment. Current observations are organized around the 13 bridges; a graduate student needs to save a proof attempt, a counterexample, a paper annotation, or a longer computation elsewhere in the course. Retain stable source/version references so old notes remain interpretable after revision.

### Accessibility beyond screenshots

Existing keyboard, mobile, theme, and reduced-motion checks are valuable. Complete the evaluation with real screen readers, keyboard-only study, touch devices, zoom/reflow, high contrast, and a learner who cannot use spatial/color cues. Test the *task*: can the learner discover a changed parameter, hear the mathematical relation accurately, make a prediction, receive feedback, and return to the source?

Pre-rendered MathML is helpful but does not by itself certify a complete accessible learning experience. Dense equations need meaningful speech and navigation. Visuals need structured descriptions and an equivalent way to inspect outputs, not only an image label. Controls should state what changed without flooding a screen reader with animation updates. Keep nonessential motion pausable.

### Performance

The reader build reports a 529.19 kB minified JavaScript entry chunk, 183.27 kB gzip, exceeding Vite's default chunk warning threshold. This is a measurement and a reason to profile, not proof that the site is unacceptably slow. The source already lazy-initializes scenes near the viewport.

Measure first readable content, first usable activity, memory, and battery behavior on a lower-powered phone and constrained connection. Consider deferring the AI companion and scene modules until needed, with explicit performance budgets. Keep mathematics and required prose readable before expensive enhancements initialize. Avoid repeated GPU/DOM work for hidden scenes; the current visibility and disposal logic is worth preserving and testing.

### Maintainability

The codebase's compact one-line implementations and long authored strings make scientific review and precise changes harder than necessary. Reformat and type the shared contracts during focused maintenance. Consolidate duplicated course-context assembly between the runtime and companion. Introduce versioned schemas for equations, lessons, scene state, and attempts.

Build checks should verify semantic contracts as well as existence: valid prerequisite targets, definition-before-required-use, option identities, units/conventions, source versions, static fallbacks, narration exclusions, and content migrations. Automated checks cannot decide that every prerequisite has been identified; pair them with a documented editorial review.

Maintain a visible errata route. A learner should be able to report an issue with the exact equation, passage version, and model state attached. Record the correction and whether saved exercises or narration need invalidation. Accountability is a more credible promise than “flawless forever.”

## 14. Verification results and remaining limits

| Check run for this review | Result | What it establishes |
|---|---|---|
| `npm run build:reader` | Passed; bundle-size warning | The current reader builds against the existing figure assets. This did not regenerate all figures from their original authoring sources. |
| `npm test` | Passed | 37 pages, 3,072 local links/assets, 40 placements, and the included numerical calibrations. |
| `npm run check` | Passed: zero errors/warnings | Svelte/type diagnostics for the current code. |
| `npm run test:course` | Passed | 13 lessons, three routes against the encoded dependency graph, 260 interactions, keyboard/deep-link and notebook behavior covered by that suite. |
| `npm run test:study` | Passed | Source/context handling, narration selection and coverage, storage, playback, tutor tools, Realtime lifecycle, visual states, and selection behavior with mocked providers. |
| `npm run test:browser` | Passed | 74 page/viewport combinations plus navigation and symbol-inspector checks. |
| `npm run test:figures` | Passed | All 40 SVGs in both themes and 36 responsive figure compositions under the implemented checks. |
| `npm run test:experience` | **Initial timeout; unchanged rerun passed** | The first run timed out at `scripts/check-experience.mjs:154` waiting for wave frames to advance. A subsequent unchanged run and a diagnostic copy both passed, including 36 scene/theme/viewport combinations. |
| `npm run test:visual-lessons` | Passed | The authored synchronized visual-lesson suite. |
| `npm run test:geometry-experiences` | Passed | The manifold/precession experience suite. |
| `npm run test:curvature-experiences` | Passed | The integrated curvature experience suite. |
| Targeted browser reproductions | Confirmed F01, F05, F06 | Wrong proper-time card, hidden no-JavaScript derivations, and loss of Back position. |
| Source/data inspection | Confirmed F02–F04, F07–F09 | Notation collision, answer ordering, evidence/import behavior, dependency limitations, and duplicated derivation. |

The intermittent wave-test timeout remains an unresolved validation issue. The failed wait follows a tall-scene screenshot that temporarily changes viewport height, so visibility/resize synchronization is a reasonable **hypothesis**, not an established cause. Preserve the initial failure, capture scene visibility and playback state on future failures, and distinguish intentional offscreen suspension from failed animation. Do not “fix” this by simply increasing the timeout or ignoring failures. There is insufficient evidence here to declare a persistent wave-physics or rendering defect.

Passing these suites is valuable, but the observed tooltip error and prerequisite issues demonstrate the boundary of the current assertions. The tests verify what they ask. A link check cannot establish that its target teaches the prerequisite; a correct numeric answer cannot establish the requested method; a mocked provider cannot establish a live model's physics accuracy.

Evidence retained with this review:

- [Targeted browser observations](/Users/neo/repos/general-relativity/docs/review-evidence/2026-09-09/targeted-findings.json).
- [Incorrect contextual proper-time card](/Users/neo/repos/general-relativity/docs/review-evidence/2026-09-09/incorrect-proper-time-tooltip.png).
- [JavaScript-disabled horizon bridge](/Users/neo/repos/general-relativity/docs/review-evidence/2026-09-09/no-javascript-horizon.png).
- [Validation record](/Users/neo/repos/general-relativity/docs/review-evidence/2026-09-09/validation.txt).

Full local test logs and additional screenshots are in `qa/comprehensive-review-2026-09-09/`, which is ignored by Git. The durable evidence above is included alongside the report.

## 15. Implementation roadmap and acceptance gates

### Stage 1 — Repair trust and continuity

Address F01–F08, beginning with false symbol meanings, dimensional notation, predictable answers, and unavailable bridge content. Consolidate the repeated Cartan derivation. Triage the intermittent experience-test failure. Add targeted regression checks tied to the actual failures, including negative semantic examples and backup round trips.

**Gate:** no known false contextual definitions in the audited examples; every required bridge is readable without successful enhancement; evidence distinguishes assisted and fresh independent attempts; navigation and backup restoration honor their stated contracts. Resolve or explicitly track the animation-test instability with diagnostic evidence.

### Stage 2 — Complete the beginner-to-core learning path

Build the mechanics, ODE, hyperbolic-function, bracket, field, wave/Green-function, and thermal entry bridges. Define skills and migrate route/guide metadata to one source. Add independent problem sequences to Chapters 0–19 and a meaningful curved/matter capstone. Include diagnostics that let prepared learners skip scaffolding.

**Gate:** every required core skill has a teachable path and an assessment that actually requires it. Learners at the advertised entry level can complete representative unseen problems without an instructor quietly supplying missing physics. Record where they need help and revise those bridges.

### Stage 3 — Make the AI and demos scientifically accountable

Create shared equation/claim/state records, a reviewed tutor evaluation set, authored critical narration, and explicit provenance for generated explanations. Add the derivation-debugging and exact-state tutoring workflows. Expand saved experiments and general notebook entries. Profile and validate accessibility on representative devices and assistive technology.

**Gate:** expert review finds no critical scientific failure in the release evaluation set; held-out results, known limitations, and regression results are documented. Each major demo has an independent physical check and an accessible equivalent. This gate supports a release decision; it does not certify every possible future model response.

### Stage 4 — Fill the large application gaps

Build relativistic stars, observational distances/lensing, an authentic wave-data laboratory, and a transparent numerical-methods path. Add substantial Kerr and collapse material. Connect the scientific narrative to real measurements with uncertainty and model assumptions.

**Gate:** a learner can reproduce a bounded observational or numerical result, explain the assumptions, change a parameter or model, and diagnose the resulting difference.

### Stage 5 — Earn the graduate and research promise

Expand global geometry, perturbations, charges/asymptotics, geometric methods, and quantum/EFT preparation into coherent advanced paths. Commission specialist review of the relevant modules and test them with graduate students. Add a small number of demanding research studios with reproducible calculations before broadening the frontier catalog.

**Gate:** each advertised advanced outcome is demonstrated by a substantial independent derivation or project. A topic that remains an overview is labeled as an overview, with an explicit route to the necessary preparation and deeper treatment.

These stages are dependency order, not calendar estimates. Content authoring, scientific review, accessibility work, and learner testing determine the schedule. The immediate repair work should not wait for the full advanced curriculum.

## 16. How to find out whether the course actually teaches this well

Recruit learners from at least three relevant starting points: calculus/linear-algebra learners without much physics; physics undergraduates new to GR; and graduate students or researchers revisiting particular methods. Include people who study primarily by audio or assistive technology. Use per-topic readiness rather than assuming a degree certifies every prerequisite.

For early pilots, observe complete tasks rather than ask only whether the site looks clear. Have learners think aloud while predicting, calculating, using a demo, asking the tutor, recovering from an error, and returning after a delay. Record the first unintroduced concept, the first wrong inference, and the point at which the UI rather than the physics becomes the obstacle.

Use unseen transfer problems and delayed checks, with and without assistance. Compare time to a correct independent explanation, quality of reasoning, confidence calibration, retention, accessibility failures, and enjoyment. Do not make time on site, number of messages, audio listened, or chapters opened the primary measures of success.

For graduate readers, ask for a derivation in another convention, a counterexample to an overbroad claim, or reproduction of a bounded research result. For beginners, ask for an operational explanation and a small calculation in a genuinely new example. An outstanding resource must make both groups more capable, not merely show each group more material.

The central standard should be: **Can this learner now ask a better question, carry out a justified calculation, and notice when an answer is wrong?** The current course already provides many of the explanations needed to get there. The next major work is to make that capability reliable across the intended audience.
