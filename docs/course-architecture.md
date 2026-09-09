# A course built from connected arguments

This edition adds thirteen original worked bridges at the points where the
manuscript needs a concrete calculation, and five synchronized visual models.
It is an introductory GR course with explicit advanced continuations, not a
claim that quantum field theory or global analysis can be derived from basic
calculus in a few paragraphs.

## Educational decisions

- **A physical or geometric question before a symbolic procedure.** Every
  bridge starts with a question and a short intuitive account. The same
  example is then worked out, with a reason for each step.
- **Separate the object from its description.** The charts, polar metric, and
  moving-frame examples repeatedly distinguish a measurement from a list of
  coordinates. They prepare the learner for connections and curvature.
- **Measure intrinsic geometry.** The transported arrow and the geodesic-circle
  calculation supply two measurements of curvature. Neither relies on an
  embedding height being a gravitational potential.
- **Make necessary knowledge visible.** Every route includes its direct and
  transitive prerequisites. The focused geometry route ends at Chapter 10;
  the advanced chapters depend on physical and mathematical work later in the
  main course. Links from a bridge leave an exact return link.
- **Require a new calculation.** Each conceptual prediction has feedback for
  every choice, followed by a numerical problem with changed data. Checking
  these problems requires no API. The record describes that particular
  attempt, not a percentage of all relativity mastered.
- **Make detail available without repeating it.** The three authored layers
  are See the idea, Work it out, and Go deeper. Continuous listening follows
  the visible layer and skips practice solutions, reference figures, and
  navigation furniture. Directly requested equations remain listenable.

These decisions draw on Feynman's use of intrinsic experiments in
[Curved Space, Lectures II.42](https://www.feynmanlectures.caltech.edu/II_42.html),
Needham's emphasis on geometric arguments in
[Visual Differential Geometry and Forms](https://www.vdgf.space/), and the
alignment of prerequisite knowledge, practice, and feedback in
[Carnegie Mellon’s teaching principles](https://www.cmu.edu/teaching/principles/).
All new prose and figures are original. Technical sources and explicit proof
boundaries are listed within each lesson's deeper layer and in the two
scientific review records.

## Authoring and runtime

`content/geometry-lessons.mjs` and `content/bridge-lessons.mjs` own the authored
arguments, checks, feedback, and source links. `content/course.mjs` owns the
chapter dependency graph and routes. Build validation rejects incomplete
lessons, ambiguous answer records, invalid numerical tolerances, cyclic
prerequisites, skipped dependencies, and missing insertion headings.

The HTML build inserts lessons immediately after exact existing section
headings. It renders their LaTeX through the same semantic color pipeline as
the manuscript. Original polar, basis, transport, and horizon reference
figures remain in collapsible reference views. The new three-arc transport
lesson replaces the chapter's old opening animation; the older example remains
available in the visual atlas. Existing chapter and figure links still work.

`web/course.js` enhances the authored HTML with keyboard-accessible tabs,
checks, routes, and notebook controls. `web/visual-lessons.js` supplies two
Three.js models and three SVG models with KaTeX labels. Their fallback diagrams
remain usable without WebGL. The Svelte reader owns mounting, disposal, route
changes, and restoration of saved model snapshots.

The notebook stays in this browser. It stores notes, attempts, selected layers,
and diagram settings, and supports validated JSON import plus JSON/Markdown
export. Existing notes win when importing duplicates. The review queue returns
unfinished calculations first and solved examples after three days. This is a
simple review schedule, not a validated adaptive mastery model.

The tutor receives a compact current lesson record: exact prerequisite links,
selected depth, attempt evidence, model settings, and a bounded note excerpt.
It can use the existing book outline and passage tools to expand context on
demand. Notes are reference material, never instructions. Live provider calls
still require the reader's own API keys; the new core learning tools do not.

## Verification and boundaries

The geometry and causality authors cross-reviewed one another's results.
Independent checks include coordinate/covector invariance, transition maps,
metric units and finite-step limits, moving-basis cancellation, tangent-vector
transport along all three arcs, local EF null directions, Kruskal metric
coefficients, Stokes orientation, and thermodynamic scaling. See
[geometry-review.md](geometry-review.md) and
[causality-review.md](causality-review.md).

`test:course` exercises all authored choices and transfer problems, route
closure, deep links, keyboard behavior, note persistence, exports and imports
at desktop and mobile sizes. `test:visual-lessons` independently verifies
geometry, all model presets, labels, themes, responsive layouts, saved state,
and fallback behavior. Existing reading, selection, narration, sidebar,
search, figure, and legacy-scene suites remain part of deployment.

Advanced constraint classification, spinor representation theory, global
causal theorems, and Hawking's quantum calculation are explicitly identified
as additional structure or stated results. Introducing their vocabulary and
motivation is not a substitute for their full theories.
