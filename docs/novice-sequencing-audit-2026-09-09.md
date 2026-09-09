# Novice entry and reading-order audit

This audit responds to a reader finding “Units belong to coordinates, too” at the beginning of Chapter 0. The example had been added in `63ef8c6`. Its calculations were appropriate for a later geometry chapter; its placement, question, and empty prerequisite display were inappropriate for a first-time reader. This was an authoring and review failure, not a missing prerequisite on the reader's part.

The earlier comprehensive review and automated checks did not establish that the course was ready for a novice. This document corrects that impression and records a narrower, inspectable repair. It is not a certification of the entire book.

## How widespread is the problem?

It is not isolated. Close reading confirmed repeated premature concepts in Chapters 0–3, an early field-theory units jump in Chapter 11, and a dependency reversal in Chapter 22. The publishing mechanism also placed every one of the existing 36 worked lessons immediately after its section heading. It did not distinguish preparation that should precede exposition from practice that should follow it.

All 36 existing lesson placements have now received an explicit editorial classification. Twenty-six follow their section's exposition; ten supply preparation before it. One new elementary measurement lesson brings the total to 37. These are placement counts, **not a claim that precisely 26 lessons were incomprehensible**. Some earlier bridges were already self-contained. Nor does changing placement certify their explanations, distractors, or difficulty.

The full text of Chapters 0 and 1 and the first interval presentation in Chapter 3 received close revision. The 37 generated lesson locations and declared prerequisite destinations were inspected mechanically. Later chapters have not yet received the same complete first-use reading audit. There is no defensible whole-book failure percentage from this evidence.

## Confirmed failures and repairs

| Location before this repair | What the reader was being asked to know | Repair |
|---|---|---|
| Arrival / reading guide | Einstein's tensor equation and a long convention sheet before an experiment | Lead with physical destinations and an entry link; retain conventions in a native disclosure for returning readers. |
| Chapter 0 opening | The ambiguous claim that a second astronaut can measure something the first cannot | Replace the riddle with a cart, ruler, clock, and measured positions. Chapter 1 explicitly distinguishes two test bodies from two observers. |
| First Chapter 0 bridge | Metric, interval, chart, component subscripts, polar metric, and connection coefficients | Move the existing practice identity to §4.5, after the interval and polar metric; replace its future-connection detour with a worked mixed-coordinate unit check. Add a separate elementary units lesson. |
| §0.1 | Metric derivatives, curvature, and local flatness while introducing ordinary derivatives | Use a numerical velocity prediction and its acceleration correction. Give the coefficient physical units. |
| §0.2 | Implicitly dimensionally inconsistent temperature polynomial; four-index shorthand before Chapter 2 | Use explicitly dimensionless inputs and the ordinary two-input chain rule. |
| §0.3 | Proper-time integral before special relativity; polar area before polar coordinates | Use flow rate integrated to tank volume, then density integrated to mass. |
| §§0.4–0.6 | Einstein's metric equations, tensor language for pressure, and metric-index notation inside entry refreshers | Keep the ball's initial data, define mechanics quantities and units, and use a calibrated map to motivate the matrix operation. |
| §0.7 | Direction superscripts and flux units left implicit | Define the mass flow density, direction-label notation, units, and conservation through a box. |
| §§0.8–0.9 | Relativistic expansion parameters and polar/clock questions in entry checks | Use elementary dimensionless ratios, a water integral, and a numerical square-root estimate. |
| Chapter 0 bridge layers | Oscillator dot notation and quasistatic thermodynamics insufficiently explained; an unrelated angular-momentum detour | Define dots, frequency, the oscillator law, insulation, internal energy, and quasistatic motion. Use potential-energy reference choices and pressure-work units for the deeper energy layer. Angular momentum is taught with the orbit example. |
| §1.1 | An accelerometer assumed familiar; connection coefficients used as the first explanation of weightlessness | Start with a supporting spring scale, define the accelerometer, then release two test masses with stated initial conditions. |
| §§1.2–1.4 and 1.7 | Metric, interval, null direction, Ricci, Weyl, field dynamics, and action variation as motivation | State clock and free-fall experiments and the jobs of the theory in ordinary language. Reserve component equations for their teaching chapters. |
| §1.10 | Exact relativistic rain-coordinate terminology in the first animated explanation | Explain which laboratories move and derive the Newtonian speed from energy. Identify the animation's relativistic model as later material and further reading. |
| §3.1 | The “metric's sign” before an interval is defined; synchronization named without its procedure | Define events, worldlines, inertial clock networks, and the reflected-light synchronization procedure. |
| §3.3 | A differential interval formula presented before its meaning and before a finite example | Define event differences, propose the signed combination, verify its invariance, calculate a numerical example, then introduce differentials and the Minkowski metric. Define hyperbolic functions before using them. |
| Rapidity bridge | Boosts and intervals assumed before the corresponding exposition | Move it after §3.3; add the Lorentz-transformation prerequisite and define beta and rapidity. |
| §4.1 interactive chart experience | Chart machinery displayed immediately after the heading | Move the experience after the chart, overlap, topology, and transition-map explanations. |
| §11.6 | Quantum natural units and mass-dimension counting before quantum foundations | Use a classical field normalization with explicit derivative-energy units. State the matter model and the later variational derivation. |
| §22.7 bridges | Horizon temperature before the newly added probability and quantum-state preparation | Order probability → quantum states → near-horizon exposition → temperature synthesis, and add prerequisite links. |
| Renderer | A heading treated as though it were the preceding explanation | Insert lessons at explicitly reviewed section starts or ends; reject missing or unreviewed placements during build. |
| Reader enhancement | Required preparation hidden behind optional-looking depth tabs | Keep all explanation layers of prerequisite bridges in the continuous reading flow. Retain depth tabs for worked practice after exposition. |
| Prerequisite display and entry links | Empty “Builds on”; a dimensional skill that mixed basic units with advanced metric components | Omit empty lists and separate measurement units from metric-component units in the curriculum. Preserve the former Chapter 0 link with a native relocation notice. |
| Mobile first experiment | A two-column measurement table inherited a desktop minimum width | Fit both columns within the phone viewport. |

## What now comes first

Chapter 0 follows a measurement-led sequence: position and time → velocity and acceleration → units → partial derivatives → integrals → initial-value equations → force and energy → calibrated matrix measurements → flux → approximation. The worked oscillator extends the differential-equation section after the basic example. The pressure-work calculation follows the mechanics definitions.

Chapter 1 starts with what a spring scale measures, then free fall, then the comparison of two initially comoving test bodies. It distinguishes weightlessness from absence of tidal effects without requiring curvature components. The later terminology points back to a stated experiment.

Chapter 3 defines the interval for a pair of events before introducing its differential form. The example uses a five-second time separation and a three-light-second spatial separation. A boost at `0.6c` makes the events occur at the same position, four seconds apart; both frames give `−16` square light-seconds. The invariant calculation prepares the clock interpretation in §3.4.

## Regression checks and their limits

`npm run test:sequence` checks the generated HTML, not only source metadata. It verifies that each of the 37 lessons is on its authored side of the section's actual exposition, that its declared same-chapter preparation occurs earlier, and that empty prerequisites are absent. Targeted entry checks prevent the known premature GR vocabulary from reappearing in Chapter 0. Numerical checks independently verify the cart correction, unit conversions, and finite Lorentz example. Browser checks cover desktop, phone, continuously visible preparation, and relocated links with and without JavaScript.

The ordinary course tests still exercise conceptual choices, feedback, both numerical examples, notebooks, routes, and depth controls where appropriate. The resilience tests verify that explanation layers and solutions remain readable when JavaScript, the reader bundle, or course data are unavailable. None of these tests establish how a human learner understands a paragraph.

A keyword guard is deliberately narrow. It will not catch an unexplained idea expressed with ordinary words. A valid dependency link can point to an inadequate explanation. A numerical answer can be correct while its question is bewildering. This audit must not become another proxy for a teaching review.

## Remaining teaching review

The next close-reading pass must follow every main-text dependency through Chapters 2 and 4–24, including all diagrams, controls, problem statements, feedback, and advanced layers. Prioritize these known risk areas:

- The action introduced for particle paths in Chapter 5, before the general variational chapter: verify that every required operation is taught at first use.
- Curvature contractions and tidal interpretation in Chapters 8–10: distinguish definitions from interpretations whose derivations arrive later.
- Classical field energy, the field action, and Maxwell theory in Chapters 11 and 13: a stated model is legitimate input, but readers need enough mechanics and electromagnetism to use and interpret it.
- Retarded distributions and wave modes in Chapter 18: verify the distributional operations, rather than relying on a source link as explanation.
- The optional thermal and quantum trail: ordering finite-state examples before Hawking temperature does not constitute a self-contained course in quantum field theory in curved spacetime. Its boundaries and missing derivations still need treatment.
- Every advanced preview: decide whether it offers a concrete question the reader can understand, or merely adds unfamiliar nouns. An optional label is not a cure for an unintelligible paragraph.

For each new concept, record the motivating measurement, plain definition, symbols and units, a worked example, a misconception, and a fresh task. Then observe learners with different starting backgrounds explaining it in their own words. Expert mathematical review and learner observation test different things; both remain necessary for the project's ambition.

Physical cross-checks used for this repair include the course's existing derivations, [Einstein Online's account of free fall and tidal limitations](https://www.einstein-online.info/en/spotlight/equivalence_principle/), and [David Tong's general relativity notes](https://www.davidtong.org/teaching/general-relativity/). The rewritten examples and numerical checks are independently authored; these references are further verification, not prerequisites for reading the opening.
