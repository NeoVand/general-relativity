# From a beautiful reader to a complete GR learning environment

Audit date: 8 September 2026. This is a curriculum and application proposal, not a claim that the proposed features or missing lessons already exist. It reviews the manuscript in `book.md`, the chapter contracts in `content/guides.json`, the navigation in `scripts/build-site.mjs`, the implemented study companion, and `docs/experience-ideas.md`.

The gap inventory records the starting state of this audit. Limited manuscript repairs made after the review are listed at the end; they do not complete the proposed full geometry or black-hole curricula.

The book already contains serious mathematics and unusually careful physical distinctions. Its larger weakness is that the application does not yet turn that material into an explicit, dependable apprenticeship. A reader can open, listen to, and question almost anything, but cannot reliably see what they need first, how deeply a topic is taught, what they have demonstrated, or which next step will address their confusion.

The most valuable transformation is a coherent course with beautiful reading, mathematics, figures, practice, and assistance working from the same curriculum. Twenty disconnected demonstrations would not achieve that.

## What is already strong—and what is actually missing

Section numbers below refer to the current [manuscript](../book.md). The findings concern the depth and sequence of the teaching, not only the presence of a keyword.

| Area | Actual coverage | Gap or learning risk |
|---|---|---|
| Entry from basic mathematics | §§0.1–0.8 explain partial derivatives, the chain rule, simple initial-value problems, mechanics, matrix metrics, divergence, and approximation. §0.9 contains five checks. | This is a useful bridge, not a full diagnostic or a substitute for repeated practice. The app cannot yet distinguish “I can differentiate” from “I can use a Jacobian along a curve.” |
| Vectors and covectors | §§2.1–2.5 build bases, linear maps, dual measurements, Jacobians, tensor products, and contractions. | A transformation formula is not yet a sequence of increasingly independent calculations. The short guide title is clear, but the mathematical survival-kit framing can make this foundational material look skippable. |
| Manifolds | §4.1 explicitly defines charts, an atlas, and smooth transition maps. §4.2 separates chart failure from physical singularity. §4.3 defines tangent vectors as derivations and distinguishes tangent spaces at different events. | It is incorrect to say manifolds are absent. What is missing is a worked atlas with overlapping charts, a complete transition-map calculation with its domain, and a guided progression from curves to smooth maps, pushforwards, pullbacks, and flows. The technical topological conditions are acknowledged but not developed. |
| Differential geometry | Chapters 6–10 derive covariant derivatives, the Levi-Civita connection, Riemann curvature, contractions, and geodesic deviation. §§7.5 and 8.6 work through the polar plane and sphere; §4.8 treats intrinsic versus extrinsic geometry. | This is real differential geometry, but the route is mainly an index-calculus route. There is no sustained development of curve curvature, geodesic curvature, a geometric proof of the intrinsic-curvature theorem, or the two-dimensional local-to-global Gauss–Bonnet story. The four-dimensional Gauss–Bonnet combination in §23.2 does not fill that teaching gap. |
| Forms and frames | §21.2 defines wedge products and exterior differentiation and states Stokes' theorem. §§21.5 and 21.8 compute with moving frames on the plane and sphere. | The material exists late in an optional chapter. Oriented integration, boundary orientation, and a worked Stokes calculation are compressed. It does not constitute an independent forms course. |
| Einstein equation and action | Chapters 11–15 develop stress-energy, trace reversal, Newtonian normalization, variational calculus, Einstein–Hilbert variation, boundary terms, symmetry, and conservation. | The subject grouping hides Chapters 11 and 12 under “Curvature,” even though Chapter 11 introduces matter and Chapter 12 contains the field equation. The app offers little help keeping a long derivation's assumptions and intermediate results in view. |
| Schwarzschild and Kerr | §§17.1–17.5 derive the spherical vacuum metric, repair the horizon with Eddington–Finkelstein coordinates, and distinguish horizon, photon sphere, and ISCO. §17.7 presents the Kerr metric, frame dragging, its horizons and ergoregion, and qualified uniqueness claims. | This is substantive coverage, not a missing black-hole chapter. Kerr is honestly a guided reading rather than a derivation. There is no developed Kruskal construction, sequence of Penrose diagrams, charged-hole geometry, Penrose energy-extraction calculation, superradiance, or Kerr orbit calculation using the Carter constant. “Advanced black holes” would overstate current coverage. |
| Causality, focusing, and thermodynamics | §§22.1–22.6 cover Raychaudhuri, energy conditions, trapped surfaces, geodesic incompleteness, domains of dependence, and Cauchy horizons. §§22.7–22.10 carefully distinguish classical laws, semiclassical temperature, entropy, and the information question. | These are important advanced introductions. Definitions of global causal structure are concentrated late and have little worked diagrammatic practice. The Euclidean temperature argument explicitly uses quantum statistical mechanics; the app must not imply that a basic-calculus reader has thereby derived quantum-field Hawking radiation. |
| Exercises | Appendix A has thirty worked exercises; Appendix E adds index practice and extra calculations. Chapter guides supply one conceptual check each. | Practice is largely segregated from the moment a skill is acquired. Revealing a solution is not evidence that the learner can perform the calculation independently. No linked hint sequence or transfer assessment currently establishes readiness. |
| Listening and tutor | The app has section-addressable narration, word timing, a persistent tutor, source navigation, a compact whole-book topic map, and completed-listening history. | These are already implemented. A topic map is not a prerequisite graph; listening history is not understanding; a conversational answer is not an authored lesson. The next work should build on these foundations rather than re-propose them as new features. |

The scope statement in the introduction should promise an accessible starting point and clearly marked levels of depth. “Introduced here,” “worked through here,” and “proved here” are different promises. A self-contained core is achievable; a claim to complete all graduate geometry and quantum prerequisites in short optional sections would not be credible.

## What to borrow from strong references

Tristan Needham's *Visual Differential Geometry and Forms* develops geometric arguments, including intrinsic curvature, Gauss–Bonnet, higher-dimensional Riemann curvature, and forms. Its relevance is the explanatory role of a picture: it helps establish why a result is true. The useful inspiration is a progression of concrete geometries and carefully motivated operations, not its exact drawings or visual ornament. Our figures and proofs should be independently authored. [Needham's official book site](https://www.vdgf.space/), [author's contents](https://www.vdgf.space/table-of-contents).

David Tong's Cambridge course explicitly progresses through manifolds and maps, tangent spaces and flows, forms, metric geometry, curvature, field equations, and applications. Its black-hole route includes Kruskal geometry, charged holes, Kerr, and energy extraction. This is a useful check on what a substantial geometry or black-hole pathway must eventually contain, rather than a reason to transplant a master's course unchanged into a beginner's book. [Tong's official course and chapter descriptions](https://davidtong.org/teaching/general-relativity/).

MIT's graduate course requires differential equations, linear algebra, and electromagnetism, with familiarity with actions, Green's functions, and numerical methods. Our reader starts earlier. Therefore every use of those tools needs either a real bridge or an explicit boundary on the expected depth. MIT also separates foundations from applications and includes sustained problem work. [MIT 8.962 syllabus](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/syllabus/). Its lecture sequence links compact stars to horizons and orbits, and distinguishes introductions to advanced methods from full treatments. [MIT lecture summaries](https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/lecture-summaries/).

These comparisons inform the proposed architecture below; they are not evidence that a particular interface will improve learning. That needs observation of actual learners.

## Prerequisite bridges that need concrete work

| Bridge | Existing foothold and first important demand | Small, teachable addition |
|---|---|---|
| Functions, sets, and coordinate domains | §4.1 uses open regions, maps, inverse maps, and chart overlap. | A two-chart sphere example, with precisely specified excluded points; compose the two maps; explain why a Jacobian being nonsingular matters locally. Introduce only the topology needed for the claim being made. |
| Multivariable chain rule in practice | §0.2 works along a path; §2.4 gives the Jacobian transformation laws. | One full nonlinear coordinate conversion of a curve, its tangent, a scalar differential, and their invariant pairing. Follow it with a changed-number problem before the metric chapter. |
| Linear algebra beyond matrix multiplication | §§2.5, 4.6–4.7, and 18.5 use contractions, inverse metrics, determinants, and projectors. | Short checks for inverse versus transpose, dual basis versus metric dual, determinant as oriented scaling, and idempotent projection. Separate a refresher from a genuinely new tensor concept. |
| Angular momentum and central motion | §0.5 covers force and energy; §16.6 introduces conserved specific angular momentum and an orbit equation. | Derive planar angular momentum, explain why a central force conserves it, and connect a rotational symmetry to the conserved geodesic quantity. Link this bridge before Mercury and ISCO calculations. |
| Oscillations and perturbative ODEs | §0.4 integrates constant acceleration; §16.6 uses a resonantly forced oscillator in the orbital angle. | Derive the elementary harmonic solution, verify a particular solution, and explain the accumulating phase correction with a worked small-parameter example. |
| Wave equations and complex notation | §18.3 uses the real part of a complex exponential without an earlier complex-number lesson; §18.5 gives a retarded integral. | Start with real sine/cosine waves, introduce complex exponentials as optional bookkeeping, derive the elementary traveling-wave equation, and distinguish explaining a retarded solution from deriving its Green's function. A Green's-function lesson is new content. |
| Surface integration and orientation | §0.7 explains flux; §21.2 states generalized Stokes. | Work one line integral and one oriented surface integral over the same boundary problem; show internal-edge cancellation before generalizing. |
| Flows and Lie differentiation | §15.1 names a pullback and supplies Lie-derivative formulas; §20.3 uses a Lie derivative in evolution. | Carry a scalar along a simple vector-field flow, compare “move then measure” with “measure then move,” and build the pullback and Lie derivative from that example. |
| Thermodynamics and quantum inputs | §§22.7–22.10 responsibly identify their additional inputs. | Supply a short conceptual bridge for temperature, entropy, pure/mixed states, and equilibrium, while retaining clear labels on imported quantum results. Do not advertise a derivation of quantum field theory. |

These should become linked lessons with a worked example and an independent check, not more tooltip definitions. They can be introduced where needed; requiring an entire preliminary textbook would defeat the intended audience.

## A coherent curriculum architecture

Keep chapter numbers and existing URLs stable while repairing labels and route logic. A beginner should see one recommended sequence, with optional detours that preserve the place they left. Topic-directed routes should show the prerequisites they include or omit.

| Course stage | Existing chapters | Completion question |
|---|---|---|
| Foundations: measurements and mathematical objects | 0–5 | Can I distinguish an event, coordinates, a vector, a metric, and a clock reading, then follow the geodesic derivation? |
| Differential geometry: comparison and curvature | 6–10, with explicit return links to 2 and 4 | Can I compute connection and curvature in a simple geometry and distinguish coordinate effects from tides? |
| Matter and Einstein's equation | 11–15 | Can I read stress-energy, recover the Newtonian coefficient, and explain each stage of the action variation? |
| Predictions and spacetime models | 16–19 | Can I specify the observer and approximation behind a clock, orbit, wave, or cosmological prediction? |
| Further paths | 20–23 | Which methods are being introduced, and what extra study is needed to use them independently? |
| Synthesis | 24 | Can I carry a metric-to-measurement calculation through and justify its interpretation? |

Chapter 24 belongs to the main course's completion, not to a group labeled optional. Chapters 11–12 should appear with matter and field equations. If six visible groups feel crowded, use five groups and present the synthesis as a distinct final destination. Colors should follow the same grouping in the sidebar and contents; their job is orientation, not a claim that every symbol in a chapter has one semantic role.

### Routes that can be offered honestly now

- **Recommended course:** Chapters 0–19, then 24; Chapters 20–23 are clearly marked further paths. A reader who passes the entry checks may bypass the corresponding Chapter 0 refreshers.
- **Understand Einstein's equation:** start with the Chapter 0 check, then 1–15 and 24. An experienced reader may skip the Chapter 1 motivation. The current “2–15” list should not silently omit needed preparation for a beginner.
- **Understand black-hole geometry:** preparation in 0–5, geometry in 6–10, sources and field equations in 11–12, the symmetry material in §15.4, then 17 and selected 22 sections. This is a foundations route plus a focused destination, not a short route to advanced mastery. A shorter preview may skip derivations but must say so.
- **Study differential geometry:** 2, 4, 6–10, 21, with §15.1 for the current introduction to flows. Label this “geometry for GR.” It is not yet a complete standalone differential-geometry course.

The existing physical expedition skips Chapters 2, 6, and 7 before assigning Chapters 8–12. That is suitable only as a conceptual preview whose equations are not all expected to be derived. For a calculation-capable route, restore those dependencies.

### New content needed before stronger route claims

A **full geometry apprenticeship** needs the worked atlas/maps/flows bridge, a progression of intrinsic surface arguments, and a developed orientation-and-Stokes sequence. A **deeper black-hole course** needs causal compactification and Kruskal diagrams before global-structure claims; then explicit charged-hole and rotating-hole calculations, energy extraction and superradiance, and carefully separated observational, classical, and semiclassical questions. These are authoring projects, not navigation fixes. Proposed lessons must not appear as completed chapters or playable narration until they exist and have been checked.

Use one curriculum data model for `requires`, `introduces`, `practices`, `demonstrates`, and `coverage` on stable section or lesson IDs. Generate course navigation, prerequisite links, route descriptions, practice queues, and the tutor's compact guidance from that model. Keep `visited`, `listened`, `attempted`, and `demonstrated` separate. This extends the existing book map rather than creating a competing map.

## Twenty application-level proposals

Each proposal changes a reusable part of the learning experience. The examples describe applications of that system, not twenty unrelated physics widgets.

1. **A course compass that always answers “where am I going?”** Show the current stage, the next meaningful outcome, and one recommended next step. Readers can change destination without losing their main route. This goes beyond the current chapter list and last-opened-page link: it explains why the next lesson follows and distinguishes a preview from a full learning path.

2. **A prerequisite clinic that repairs one obstacle at a time.** A short optional entry check locates specific difficulties; later “I don't understand this step” actions open the relevant bridge. Each bridge has an example and a transfer problem, then returns to the original sentence. Unlike the existing prose `needs` field, it provides the missing teaching and checks whether the obstacle was resolved.

3. **An inspectable dependency map of the whole course.** Readers can trace a destination back through the concepts it uses and inspect which links are required versus helpful. The view opens on demand, not as a permanent dashboard. It adds actual dependency relationships to today's topic map and prevents the tutor from recommending impressive but unprepared jumps.

4. **One continuous study workspace.** Reading position, open derivation steps, selected symbols, active scene state, notes, and a parked question survive route changes. A visible return trail takes the reader back from a prerequisite detour. The existing persistent audio and tutor become part of a wider session, instead of the only stateful parts of the book.

5. **Three coordinated depths of explanation.** Let a reader move between an intuitive account, a worked calculation, and a careful mathematical account of the same authored idea. Preserve the same anchors, definitions, and assumptions in all views. This is not an AI simplification button: each layer must be written, cross-checked, and explicit about what it leaves out.

6. **A derivation system with reasons, not just animated algebra.** Every long proof becomes a traversable chain: current claim, operation, assumption used, and earlier result invoked. Readers can expand a skipped step or hide familiar ones. This adds a durable explanatory structure to displayed equations and lets the tutor answer “why is this allowed?” at the correct step.

7. **A contextual language of symbols.** A single semantic registry connects each symbol occurrence to its mathematical type, units, local meaning, and defining lesson. Tapping it opens a compact inspector with one relevant example. Existing color and glossary infrastructure provide the foundation; contextual identity prevents radius $R$, curvature $R$, and reused $u$ from being treated as the same object.

8. **Figures that participate in an argument.** Use a common visual-lesson contract: question, predicted result, permitted manipulation, observation, mathematical conclusion, and limitations. It governs SVG, Three.js, static, and narrated versions alike. The gain over more beautiful scenes is that each figure becomes a legible reasoning step with accessible alternatives and consistent controls.

9. **A geometric apprenticeship across the book.** A small family of authored geometries recurs as the reader learns charts, tangent spaces, metrics, connections, curvature, and forms. Each revisit exposes the next structure while retaining earlier constructions. This turns existing plane and sphere examples into a cumulative course thread, with new lessons filling the identified geometry gaps.

10. **An integrated practice studio.** Place short problems at the points where their skills become usable, with layered hints, an explicit answer format, and a different transfer problem after the solution. Reuse Appendix A and E as a starting corpus. The change is from reading solutions at the end to a planned progression from recognition to independent calculation.

11. **Feedback that diagnoses the mathematical mistake.** Build common error categories—wrong object, wrong basis, illegal contraction, unit mismatch, lost assumption—and link feedback to a specific repair. Prefer deterministic checks when possible and clearly distinguish tutor suggestions from verified grading. This adds a reusable assessment language instead of rewarding a plausible-looking final expression.

12. **A record of understanding supported by evidence.** A private skill record shows what the learner has attempted and demonstrated, with links to their actual work. Reading or listening never silently becomes mastery. The reader can correct the record or decline tracking. This extends the current listening history into trustworthy learning state without inventing a universal “understanding percentage.”

13. **A review loop that reconnects ideas.** Offer a short optional queue of past predictions and calculations, selected from concepts about to be reused or previously missed. Review should bring the reader back to a meaningful context, not a random symbol flashcard. This creates continuity between sessions and makes earlier mathematics usable when advanced chapters need it.

14. **A tutor that follows the learner's chosen course contract.** Give the assistant compact route, prerequisite, depth, and skill evidence alongside the existing source map. It can offer a hint before a solution, distinguish confusion from missing preparation, and explain a proposed detour. This changes its pedagogy; it does not merely add more source text to its context.

15. **Listening as a fully authored learning mode.** Give each lesson a concise spoken argument, synchronized references to its figure or derivation, and optional pauses for prediction. Read, listen, and ask share the same location and completion semantics. Existing timestamped narration handles playback; the new work is editorial structure, attention cues, and nonrepetitive explanations across an entire lesson.

16. **A personal field notebook that preserves reasoning.** Save a question together with the source passage, chosen scene state, attempted calculation, tutor response, and later correction. Let the learner export it in open formats. This is more useful than bookmarks because it records how an idea changed and provides material for later review and synthesis.

17. **An advanced-pathway system that earns its labels.** Geometry, black holes, waves, cosmology, and mathematical methods each receive an explicit foundation, working level, and next-study boundary. The course distinguishes existing introductions from newly authored substantial treatments. This gives ambitious learners a credible future without burying beginners in everything at once or relabeling short surveys as mastery.

18. **An inspectable scholarly layer.** Every substantive result can reveal its assumptions, derivation status, source, approximation regime, and revision history. A notation translator explains how a cited source's sign and unit conventions differ from ours. Existing references become usable scholarly support rather than a list of links, and the tutor can state whether a claim is derived, imported, or unsettled.

19. **The same course at different access levels.** Provide keyboard and screen-reader operation, a comfortable static mode, downloadable lesson bundles, and an explicit offline reading state. Preserve lesson IDs and notes across these views. This goes beyond isolated fallbacks: a reader with reduced motion, limited bandwidth, no audio, or no API keys should still have a coherent complete core course.

20. **A sequence of culminating projects with honest evaluation.** At each major stage, ask the reader to produce a small explanation or calculation connecting several earlier skills; end with a metric-to-measurement project. Assess the reasoning against an authored rubric and retain the work in the notebook. Use recurring learner difficulties to improve the course, so visual polish and new features are judged by whether people can actually use GR.

## Priorities and a bounded first implementation

**First: repair the course's promises and wayfinding.** Make the group boundaries match the material, move synthesis out of the optional label, state what each route includes, and replace vague chapter prerequisites with links to exact existing sections. This can be done without changing URLs or claiming any new coverage.

**Second: build one complete learning sequence.** Use the route from a nonlinear coordinate change to covectors, a metric, and the flat polar connection. Add the missing worked transitions and several independent checks. Implement the prerequisite, derivation, symbol, and practice contracts on that sequence before applying them mechanically to the entire manuscript.

**Third: strengthen the geometry and black-hole curricula.** Author the identified missing lessons in a coherent order. A new scene should be commissioned with its argument and exercise, not added because the subject sounds spectacular. Have a mathematically competent reviewer check definitions, domains, assumptions, and limiting cases.

**Fourth: let the tutor, narration, notebook, and review system consume that structure.** Their continuity will be much more valuable once the underlying lesson graph and assessments are sound. Keep all generated advice distinct from authored book content and let the reader control retained learning state.

Concrete corrections that can be made immediately without pretending to complete new curriculum:

- Adjust navigation ranges and labels as above, using one shared source for sidebar and contents colors.
- Make the recommended route `0–19 → 24`, with optional `20–23`; clearly qualify the abbreviated physical route.
- Add exact prerequisite references before §16.6 (angular momentum and oscillator bridge still needs authoring), §18.3 (complex notation bridge still needs authoring), §15.1 (flows/pullback bridge still needs authoring), and §21.2 (oriented integration bridge still needs authoring). Where no lesson exists, say that plainly in planning metadata rather than linking to a placeholder in the public course.
- In the current chapter guides, distinguish “follow the argument” from “derive independently,” particularly for Kerr, causal theorems, quantum temperature, and effective theory.
- Introduce a small reviewed curriculum metadata file with only verified existing section targets and honest coverage levels. Validate all targets at build time.
- Link a few relevant existing exercises directly after their prerequisite lessons, with the answer initially concealed. Do not mark the learner proficient merely because they open the answer.

Success should be evaluated with representative readers: can someone with the stated starting knowledge explain the invariant relationship, complete a changed-example calculation, recognize a coordinate artifact, and find a needed prerequisite without losing their place? Those outcomes are a stronger definition of an astonishing learning app than the number of effects on screen.

## Limited repairs completed after this audit

The manuscript's reading routes now retain the tensor and curvature prerequisites for applications, identify where an action argument is only a preview, finish the main course at Chapter 24, and recommend existing exercises along the way. The existing chapter and section anchors remain unchanged.

Section 4.1 now explains open sets, continuity, chart inverses, and smooth transition functions, with the standard separation/countability conditions stated. An original two-chart sphere calculation gives both chart formulas, one full inverse, the overlap transition, its domain and determinant, and a numerical point represented in both charts. This fills one specific foundational gap; it does not turn the chapter into a complete topology course.

Section 15.1 now builds pushforward from a mapped curve, pullback from covector pairing, and Lie differentiation from a flow. An elementary dilation example distinguishes a diffeomorphism from an isometry. The coordinate formula for the metric's Lie derivative connects those constructions to the covariant expression already used by the action argument. The definitions and sign convention were checked against [Tong's differential-geometry chapter, §§2.2.4 and 2.3.2](https://davidtong.org/pdfs/teaching/general-relativity/gr2.pdf); the examples and explanations were independently written.

Verification: exact rational-arithmetic checks of sphere membership, chart inverse, overlap round trip, Jacobian determinant, and pushforward/pullback pairing; numerical checks of the dilation derivative; successful rendering through the book's actual math system of all 74 displayed equations and 152 inline formulas in Chapters 4 and 15; comparison with the prior manuscript confirmed that every existing numbered heading and explicit chapter anchor was preserved. Full app/build validation remains the responsibility of the integrating change.

## Guided course implementation

The next implementation adds thirteen reviewed bridges across Chapters 2, 4,
6, 8, 16, 17, 18, 21, and 22. They provide three authored depths, reasoned
calculation steps, exact prerequisite links, conceptual feedback, and separate
transfer calculations. Five of these arguments have synchronized visual models.
The application now has dependency-complete routes, matching chapter navigation,
local attempt evidence, a review queue, a field notebook with model snapshots,
and compact course context for the tutor. Narration follows the selected layer.
See [the implementation and verification record](course-architecture.md),
[geometry review](geometry-review.md), [causality review](causality-review.md),
and [visual argument review](visual-lessons-review.md).

The proposal above remains a roadmap, not a claim that all twenty systems are
complete throughout the manuscript. In particular, the current checks validate
specific examples; they are not a symbolic-algebra grader or universal mastery
assessment. The new diagrams are bounded arguments, not arbitrary ray tracers
or manifold laboratories. Quantum and global-analysis inputs remain identified
as additional structure rather than being hidden behind an introductory label.
