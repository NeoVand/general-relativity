# Collection-wide aesthetic review

Reviewed 8 September 2026. The earlier work tested mathematical models, labels, clipping, accessibility and responsive layout, and included visual criticism. It did **not** give every illustration the same depth of aesthetic inspection. This pass separates three questions: is the statement correct, can a reader understand the picture, and is the composition beautiful enough to deserve its place in the book?

The answer is not uniformly yes. Much of the older collection still feels like a sequence of lecture slides. Consistent colors and clean TeX are necessary, but they do not supply a focal point, an economical visual argument, or excellent typography by themselves.

## Coverage and evidence

The review covers the 40 original SVG figures, nine legacy spatial models, five guided visual arguments, and two numerical experiments. Repeated appearances in the atlas or as alternate diagrams are counted once. It is a review of those authored visualizations, not a claim to inspect every possible camera orientation or to redesign every asset.

- [SVG figures 01–20](figure-aesthetic-review-01-20.md): individual full-size light inspection and both-theme comparison sheets, with additional dark inspections of weak compositions.
- [SVG figures 21–40](figure-aesthetic-review-21-40.md): both-theme comparison and individual inspection, with detailed critiques of representation, hierarchy and labels.
- [Nine legacy spatial models](legacy-scene-aesthetic-review.md): desktop and phone screenshots in both themes, including the three refinements made in this pass.
- [Five guided models](visual-lessons-review.md): the earlier mathematical review and its limits. The additional aesthetic judgments are recorded below.

The ignored `qa/` directory contains reproducible local captures. GitHub Actions preserves generated test captures in its `visual-inspection` artifact. Tests establish particular layout and behavior properties; their passing is not evidence that a composition is beautiful.

## What changed after this review

**Differential geometry now uses the requested Hugeicons `Cone01Icon`.** Its actual SVG path data was checked in the expanded contents and collapsed rail; the app's black-hole logo retains its separate role.

**Figure 12, connection cancellation:** removed the framed formula cards and anonymous coefficient. The actual indexed connection coefficient and derivative direction now make the cancellation readable. This remains a worked algebraic explanation, with the spatial intuition supplied by the preceding moving-basis lesson.

**Figure 18, Einstein-equation anatomy:** replaced three broad labels with six individually typeset ingredients: Ricci tensor, Ricci scalar, metric tensor, cosmological constant, Einstein constant and stress–energy tensor. Descriptions and colors stay attached to their own symbols.

**Figure 35, coframes:** replaced two formula cards with a matched polar plane and sphere. Closed oriented loops have a visible enclosed region; the return arrows are compared in an undistorted tangent-plane inset. Perspective is not used to measure their angle. The spherical patch and its return angle are computed explicitly, with the convention and limitations in the caption.

These three figures now rearrange their existing SVG panels into a narrow reading-column composition, instead of shrinking a landscape slide. This preserves a single set of labels, IDs and narration. Enlargement restores the original wide view; resizing back restores it as well. Atlas thumbnails retain their uniform wide previews. The other 37 SVGs have not acquired this responsive treatment by implication.

**Tidal cloud:** smaller, fewer particles, a quiet reference for the initial sphere, and compact local-axis labels give the deforming shape room to read. The complete eigenvalues remain in the adjacent equation.

**Wave:** one central detector ring supplies the focal point. Quieter rings locate the phase at other positions. Fixed coordinate guides belong to that detector plane; the scene does not imply material arms or a material wave medium.

**Expansion:** a highlighted separation between comoving markers makes the scale factor an observable comparison. A compact distance label leaves more room for the lattice. The finite viewing window still needs a more ambitious observer-recentering design.

## Additional review of the five guided models

All five were compared in the 1440px and 390px captures, in both themes (`qa/visual-lesson-{type}-{width}-{theme}.png`). The full-resolution mobile chart and dark transport views received additional inspection. These are calmer, more responsive compositions than the old SVG slides, but they also have limits.

| Model | Aesthetic judgment | Remaining improvement |
| --- | --- | --- |
| Two charts, one sphere | The point and the two addresses form a coherent comparison. The sphere's silhouette and coordinate grid establish a useful spatial object. | The projected plane and ray can compete with the sphere; a projection sequence would teach their relationship more clearly. Light-mode grid contrast and several tiny controls need further attention. |
| Polar metric | The local cell and the two physical lengths are clear; the numerical comparison is the correct focal point. | Tiny-cell states become almost rectangular and visually uneventful. A linked overview showing the cell's radial location would explain the magnification more gracefully. |
| Moving basis | A fixed arrow, moving axes and changing components are an economical visual argument. | At nearly aligned angles, multiple arrows almost coincide; a small local component decomposition would help. The derivative identity is dense, especially on a phone. |
| Parallel transport | The opaque sphere and blue loop have a clear silhouette and hierarchy. The staged path improves the teaching order. | The small return arrows sit in a foreshortened plane. An enlarged tangent-plane inset, like the rebuilt coframe figure, should make the measured angle more immediate. |
| Horizon directions | Restrained shading, equal coordinate units and a magnified local window give the causal direction priority. | Sparse arrows can look like a generic graph without the explanation. A later linked global view should distinguish a local light direction from a finite ray and from the global event horizon. |

## The two numerical experiments

Fresh captures were made of the twins and orbital-clock experiments at 1440px and 390px in both themes (`qa/aesthetic-experiment-*`). Representative desktop and mobile captures in both palettes were inspected individually.

The twins experiment has a clear pair of bars, direct labels and an effective common starting edge. It can remain two-dimensional. The large heading, heavy bar fills and small concluding formula still look like an older widget; a synchronized elapsed-time construction would improve its teaching value more than decorative 3D.

The orbital-clock experiment gives the three contributions ample mathematical type and stacks them legibly on phones. It presents numbers rather than a visual comparison, however. A common signed scale for the gravitational and motion terms would make their competition visible. The repeated explanatory sentence and divider below the results can be quieter in a future shared experiment layout.

## Remaining priorities

1. Turn the disconnected historical cards into a genuine responsive timeline.
2. Rebuild stress–energy around a local face and a measured flux, then connect that experiment to the matrix.
3. Make the curvature-component count visible: paired matrix entries, one independent triangle, then the algebraic relation. A grid of blank cells does not explain a count.
4. Move long SVG prose into responsive book typography and give the remaining diagrams deliberate phone compositions.
5. Link each spatial model to a selected measurement or local frame. Additional surfaces, beads and animation should earn their place by revealing that relation.

These are unresolved design tasks, not features delivered by writing this audit. The collection has now received a systematic aesthetic pass; it has not yet reached the same high standard in every figure.

## Validation

The normal 40-figure, two-theme checks test label clipping, text collisions, stroke crossings and overpainting. A new responsive suite tests the three rearranged figures at 1440, 390 and 320 pixels in both themes: 18 compositions, minimum mathematical label height, no text overlap or page overflow, reversible layout, unchanged label counts and proper enlargement. The existing scene suite checks all nine models at both viewport sizes and themes, including parameter extremes, camera controls, theme changes and fallbacks. Navigation and reading suites check that these changes preserve the course interface and listening behavior.
