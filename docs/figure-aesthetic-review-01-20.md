# Aesthetic review of vector figures 01–20

Review date: 8 September 2026. This is a critique of the **rendered SVG artwork**, using the manifest order in `assets/figures/manifest.json`, rather than another inventory of mathematical features. It supplements [the visualization audit](visualization-audit.md). The existing audit correctly identifies many teaching gaps; this review concentrates on what the pictures actually look like and where their visual grammar helps or hinders comprehension.

All twenty light captures were inspected individually at their native 1000-unit design width. All twenty were also compared in light and dark contact sheets; figures 03, 14, 17 and 19 received additional native-size dark inspection. Evidence links refer to locally generated QA artifacts. The contact sheets are [01–05 light](../qa/aesthetic-01-20-light-1.png), [dark](../qa/aesthetic-01-20-dark-1.png); [06–10 light](../qa/aesthetic-01-20-light-2.png), [dark](../qa/aesthetic-01-20-dark-2.png); [11–15 light](../qa/aesthetic-01-20-light-3.png), [dark](../qa/aesthetic-01-20-dark-3.png); and [16–20 light](../qa/aesthetic-01-20-light-4.png), [dark](../qa/aesthetic-01-20-dark-4.png).

This is a **baseline review, not a claim that these changes have been implemented**. In particular, the new polar-metric, moving-basis and transport lessons now provide richer experiences around figures 07, 11 and 13. Their old SVGs can remain useful reference diagrams, but their pixels have not thereby become a new visual explanation. Planned work on 12 and 18 must be judged against fresh captures after regeneration.

## Overall judgment

The linework is mostly clean and the mathematical typesetting is substantially better than plain-text notation. The best drawings—05, 10 and 20—find a simple visual form for a precise question. The collection nevertheless looks more like a consistent set of lecture slides than an exceptionally designed illustrated book. Almost every asset begins with a small uppercase numbered title, often followed by a second colored headline and subtitle, then a split diagram/text layout, then another takeaway. The repetition, rather than a lack of decorative effects, makes the book feel mechanical.

The light theme is quiet but sometimes nearly featureless: pale shapes, pale grids and a pale background flatten together. The dark palette gives the important lines more presence, yet repeated slate rectangles can make a long chapter feel like a stack of presentation cards. Both are theme aware; neither fact alone establishes excellent art direction.

The figures are not satisfactorily readable at ordinary phone width. This review did not run a fresh phone browser session, so this is a scaling observation, not a new mobile test claim. A 1000-unit SVG fitted to a 350-pixel column reduces a nominal 20-unit label to 7 pixels and its 14-unit embedded heading to 4.9 pixels. Even at a 700-pixel desktop reading width, the heading becomes 9.8 pixels. Enlargement makes the information accessible after an extra action; it does not make the normal reading experience elegant. Long explanatory prose should be responsive HTML; diagrams should retain only the labels necessary to read the construction.

Color also needs more discipline. In 06 both paths share one color despite different roles. In 07 the pink radial line sits beside a pink *angular* entry while both highlighted cell edges are teal. In 09 three colors distinguish otherwise unidentified curves. In 11 colors genuinely distinguish the fixed arrow and two basis directions. The latter is the better model: one role, one color, supported by labels or shape so color is never the only identifier.

## Per-figure findings

### 01 · A derivative predicts the next small step — Polish

**Evidence:** [light](../qa/figure-local-prediction-light.png), [dark](../qa/figure-local-prediction-dark.png). The parabola/tangent comparison is readable and the repaired contact label has clear separation and a short leader. Preserve that work. The right side is essentially a miniature article: headline, prose, horizontal rule, equation, two concluding sentences. The rule interrupts the connection between the picture and its approximation; the two-column layout leaves the construction too small when scaled.

**Concrete treatment:** keep `assets/figures/local-prediction.svg` as a plot with a compact directly attached approximation label. Move the explanatory sentences to HTML, remove the internal rule and embedded repeat heading, and give the plot more of the available width. If adding a visual detail, mark one small tangent-to-curve error; it earns its space by explaining the approximation.

### 02 · One laboratory is not enough — Rebuild

**Evidence:** [light](../qa/figure-free-fall-comparison-light.png), [dark](../qa/figure-free-fall-comparison-dark.png). The split comparison is sensible, but the large center divider and empty panels overstate the amount of visual information. A thick curved stroke with a dot is a weak visual stand-in for a laboratory. The right-hand pair and gap arrows look more like a geometric arch than two measurements made at specified times. The extensive footer has to explain what the picture itself does not establish.

**Concrete treatment:** rebuild `assets/figures/free-fall-comparison.svg` around two aligned time slices with measured separation, and small plainly drawn zero-reading instruments. Use a shared timeline instead of the divider. Make the single-laboratory and paired-laboratory experiments visibly comparable; avoid decorative rockets or arbitrary spacetime curvature.

### 03 · A century of consequences — Rebuild

**Evidence:** [light](../qa/figure-historical-timeline-light.png), [dark](../qa/figure-historical-timeline-dark.png). This is a ten-card roster rather than a timeline: the horizontal rules stop between milestones and the two rows have no visual continuation. The dates mostly use fine serif math, but `1912–13` is bold sans serif. Several descriptions strand “one,” “the,” or “a” on a line by themselves. People, ideas and papers alternate as the primary labels without an evident hierarchy. “A century” also poorly describes a sequence spanning 1687–2015.

**Concrete treatment:** replace `assets/figures/historical-timeline.svg` with a responsive HTML timeline with consistent dates and connected reading order. Distinguish the Newtonian prelude from twentieth-century developments. A few properly credited document details could provide historical texture, but a portrait on every card would only add noise. A static fallback can be a simpler connected timeline with substantially less text.

### 04 · Arrows and the questions they answer — Polish

**Evidence:** [light](../qa/figure-vector-covector-light.png), [dark](../qa/figure-vector-covector-dark.png). The large diagonal arrows are confident and the paired composition is clear. The right-hand level lines, however, are so equally prominent that the picture asks the reader to count boundaries while the caption asks them to count intervals. On the left, the pink horizontal projection is almost as emphatic as the vector and is not directly named. Two bulky headings compete with the actual measurement.

**Concrete treatment:** retain `assets/figures/vector-covector.svg`, but show three lightly tinted crossed intervals, with a smaller neutral treatment for unused level boundaries. Directly label the horizontal projection or remove it if the interval picture already supplies that information. Keep the covector pairing output attached to the measurement, not in a detached legend.

### 05 · The minus sign creates a light cone — Keep

**Evidence:** [light](../qa/figure-light-cone-light.png), [dark](../qa/figure-light-cone-dark.png). This is among the strongest assets: one generous construction, a restrained fill, and distinct timelike and spacelike directions. The figure does not need a formula card or a third dimension to justify itself. The main weaknesses are small: heavy arrowheads, a floating light-condition label, and a cone fill with a visually abrupt flat truncation at the drawing boundary.

**Concrete treatment:** preserve `assets/figures/light-cone.svg`. Attach the null condition to one boundary ray, mark the originating event clearly, and reduce axis/arrowhead weight slightly. Let the caption explain the finite drawing window. Do not sacrifice equal axis scales or causal distinctions for a more dramatic cone shape.

### 06 · Two histories between the same events — Polish, high priority

**Evidence:** [light](../qa/figure-twin-worldlines-light.png), [dark](../qa/figure-twin-worldlines-dark.png). Both histories and both headings use the same pink. The resulting closed triangular outline can read as one play-button shape, rather than two competing routes. The event dots are effective, but the 10-year and 8-year clock readings float far away as prose. A large unused horizontal axis extends beyond the turning point without helping the comparison.

**Concrete treatment:** in `assets/figures/twin-worldlines.svg`, distinguish the home and travelling histories by color plus direct names, attach their elapsed-time readings near the routes, and tighten the plot extent. Keep the shared endpoint dots and the quantitative turnaround. This is an inexpensive change with a large gain in both polish and interpretation.

### 07 · Coordinates are not rulers — Polish as a reference diagram

**Evidence:** [light](../qa/figure-polar-metric-light.png), [dark](../qa/figure-polar-metric-dark.png). The annular cell is an economical drawing, but the two-column slide layout is top-heavy and leaves a large empty lower region. The color coding is internally awkward: the radius is pink, the radial edge text is teal, the angular edge text is pink, and both drawn cell edges are teal. The reader cannot trace the two lengths by color.

**Concrete treatment:** keep `assets/figures/polar-metric.svg` as the compact reference for the new shrinking-cell lesson. Give the radial and angular edges separate, consistently repeated roles, show the angle at the origin, and attach the two length labels to the corresponding edges. The metric equation can sit directly underneath at reading size. The lesson already supplies the finite-cell caveat and limiting argument; do not duplicate its prose inside the drawing.

### 08 · Why a determinant belongs in the volume — Polish

**Evidence:** [light](../qa/figure-metric-volume-light.png), [dark](../qa/figure-metric-volume-dark.png). The square and parallelogram are clean, but the large empty gap and isolated arrow make the transformation feel disconnected. The picture says “area scaling” without showing what the map does to the two basis directions. The full-width bottom sentence is fine mathematical prose forced into an inflexible image.

**Concrete treatment:** in `assets/figures/metric-volume.svg`, put the map name on the connecting arrow and show its two column vectors on the parallelogram. Use corresponding edge colors on the source square. Remove the long bottom sentence to HTML and display the area relation beside the relevant shape. Preserve the distinction between signed determinant and positive area.

### 09 · Acceleration without curvature — Rebuild around measurement

**Evidence:** [light](../qa/figure-rindler-worldlines-light.png), [dark](../qa/figure-rindler-worldlines-dark.png). The hyperbolas have appealing simple linework. The different colors do little work, however: there are no curve labels, clock readings or accelerations attached to them. The dashed asymptote is visually strong but unnamed. Nearly every physical conclusion lives in the right-hand text, so the diagram has the feel of a decorative graph accompanying an explanation.

**Concrete treatment:** rebuild `assets/figures/rindler-worldlines.svg` around two selected rocket positions with matched local instruments. Directly label the selected worldlines and the null asymptote, make a common comparison slice visible, and tie each measurement to its observer. The underlying hyperbolic drawing can remain; the new work should be an explanatory composition, not added gloss.

### 10 · Do not confuse a route with its parameter — Keep

**Evidence:** [light](../qa/figure-affine-parameter-light.png), [dark](../qa/figure-affine-parameter-dark.png). Two lines of dots express the distinction immediately. This is visual economy worth preserving. Unlike many neighboring figures, it does not need a second panel of explanatory equations. Its heading/subtitle stack is too crowded above the first row, while the concluding sentence is detached at the bottom.

**Concrete treatment:** retain `assets/figures/affine-parameter.svg`, reduce the introductory stack to one sentence outside the drawing, and align the two row labels and baselines more deliberately. An explicit parameter map can accompany the diagram in text. Do not introduce a slider unless the changing dot spacing answers a question the static pair cannot.

### 11 · Different components can describe the same arrow — Polish as a reference diagram

**Evidence:** [light](../qa/figure-moving-basis-light.png), [dark](../qa/figure-moving-basis-dark.png). The three identical eastward arrows establish an invariant convincingly. The small basis arrows, long dashed radii and detached three-line legend are less immediately connected. The huge bottom slogan is more visually forceful than the basis information it summarizes. Pale axes occupy space without naming the origin or the angles.

**Concrete treatment:** retain `assets/figures/moving-basis.svg` alongside the new linked lesson. Give one selected location a clear local basis label and component decomposition; let the other two demonstrate repetition quietly. Reduce the oversized footer and avoid showing three equally emphasized numerical examples at once. Preserve the distinction between unit polar basis and coordinate basis.

### 12 · The connection cancels a false change — Polish, urgent

**Evidence:** [light](../qa/figure-connection-cancellation-light.png), [dark](../qa/figure-connection-cancellation-dark.png). Two large rounded cards look like empty form fields, with a great deal of space around very little mathematics. The right card says “Relevant connection coefficient” but shows only minus radius. The down arrows feed an unannotated equation, so the framing conveys a derivation more strongly than the content actually does.

**Concrete treatment:** replace the cards in `assets/figures/connection-cancellation.svg` with aligned mathematical steps. Name `Γ^r_{θθ} = −r`, identify differentiation in the angular direction, and visibly connect the component derivative and basis correction to their cancelling terms. Give the full covariant derivative the final line. This can become an elegant compact worked calculation without adding any 3D scene.

### 13 · A sphere remembers the loop — Polish as the concluding reference

**Evidence:** [light](../qa/figure-sphere-holonomy-light.png), [dark](../qa/figure-sphere-holonomy-dark.png). The large soft sphere and triangular loop are materially more evocative than a formula card. The faint globe lines are restrained. However, the returning arrow shares the blue loop color and partly merges with it; the important mismatch looks like an arrowhead decoration at the top. The right-hand labels alternate bulky sans lines with delicate serif sentences and leave the actual angle mostly to prose.

**Concrete treatment:** retain `assets/figures/sphere-holonomy.svg` as the destination of the new projection/arc/loop sequence. De-emphasize the route relative to the two arrows, and add a small starting-tangent-plane inset that measures the right angle without perspective distortion. Label orientation and loop convention consistently with the lesson. Do not imply that the projected angle in the globe view is itself the measured angle.

### 14 · From 256 slots to 20 independent entries — Rebuild the matrix drawing

**Evidence:** [light](../qa/figure-curvature-count-light.png), [dark](../qa/figure-curvature-count-dark.png). Thirty-six identical empty rounded squares resemble a disabled keypad. They neither display the symmetric pairing nor visually account for the stated 21 independent entries. The matrix is particularly faint in light mode, while the result text is disproportionately large. The arrow below “one relation” indicates arithmetic but supplies no visual relation between the grid and the count.

**Concrete treatment:** rebuild `assets/figures/curvature-count.svg` as a genuine pair-index matrix: distinguish six diagonal entries, tint one triangle, mirror a selected off-diagonal pair, then identify the Bianchi relation. Use a matrix rather than thirty-six separate button-like cards. Keep the result subordinate to the counted construction. This is a high-value static rewrite even without animation.

### 15 · Volume and shape ask different questions — Rebuild

**Evidence:** [light](../qa/figure-ricci-weyl-light.png), [dark](../qa/figure-ricci-weyl-dark.png). The matched circles are orderly, but the right ellipse and circle look like overlapping logos. Neither panel shows particles, motion or acceleration; the before/after relation is carried by color alone. The large empty upper-middle area and repeated heading/caption framing create a polished-looking comparison that still asks the reader to supply most of its meaning.

**Concrete treatment:** rebuild `assets/figures/ricci-weyl.svg` as two matched short sequences with marked particles and acceleration arrows, beginning from the same cloud. Keep the display honest about initial volume acceleration versus finite accumulated deformation. Two-dimensional slices should be identified as such. Do not simply animate the existing ellipse and declare it a general Ricci/Weyl decomposition.

### 16 · Stretching and squeezing near Earth — Polish

**Evidence:** [light](../qa/figure-tidal-eigenvalues-light.png), [dark](../qa/figure-tidal-eigenvalues-dark.png). The radial stretch and transverse squeeze are legible at a glance. The arrowheads are large relative to the small cloud, and the almost-square equation card occupies more visual weight than the experiment. “Tangent” appears twice in the list without showing how the two directions differ; the companion spatial model is therefore useful rather than redundant.

**Concrete treatment:** retain `assets/figures/tidal-eigenvalues.svg`, enlarge the construction slightly, slim the arrowheads and turn the eigenvalue card into an unboxed aligned list. Tie the radial entry to its direction and explicitly acknowledge the suppressed second transverse direction. Put the tiny Earth-surface numerical example in normal HTML text. Preserve the distinction between acceleration-per-separation and curvature units.

### 17 · The source has more than one kind of entry — Rebuild as a measurement plus matrix

**Evidence:** [light](../qa/figure-stress-energy-light.png), [dark](../qa/figure-stress-energy-dark.png). The amber palette is attractive, and the emphasis on the energy-density cell is a useful start. Still, this looks like a golden spreadsheet, with sixteen rounded rectangles and a glossary to the right. There are no row/column headings to orient the indexed quantities and no drawn flux or measuring face. The typography shifts from serif mathematical prose to sans explanations mid-legend.

**Concrete treatment:** replace the principal form of `assets/figures/stress-energy.svg` with a small local measuring volume and one selected face linked to the corresponding matrix entry. A compact unboxed matrix can remain for orientation, with row/column meaning explicit. This should be a staged explanation of energy, momentum and flux, not sixteen simultaneous arrows. Its visual ambition should serve the measurement convention.

### 18 · Read the equation as a relationship — Polish, urgent

**Evidence:** [light](../qa/figure-einstein-anatomy-light.png), [dark](../qa/figure-einstein-anatomy-dark.png). The equation is generously set and pleasantly open. The three annotation stems are neither connected to individual symbols nor sufficient to explain them. The Ricci tensor and scalar collapse into “Curvature”; the cosmological constant and coupling remain anonymous; the metric label points vaguely into the middle. The header repeats a broad message instead of helping decode the expression.

**Concrete treatment:** revise `assets/figures/einstein-anatomy.svg` into six precise symbol explanations, matching the homepage: Ricci tensor, Ricci scalar, metric tensor, cosmological constant, Einstein coupling and stress-energy tensor. Keep the equation large and use restrained leaders or a deliberate indexed legend. Do not solve the problem by shrinking six paragraphs under the same 1000-unit image; move longer explanations to responsive HTML.

### 19 · Where the factor of eight comes from — Polish, high priority

**Evidence:** [light](../qa/figure-newtonian-calibration-light.png), [dark](../qa/figure-newtonian-calibration-dark.png). Three outlined rounded equation boxes look like colored input controls. The labels are far to the left and the result far to the right, so the derivation is spatially dispersed. “Match the two” is especially awkward beside three displayed source rows. The violet, amber and blue already communicate the roles; the matching borders do not add information.

**Concrete treatment:** in `assets/figures/newtonian-calibration.svg`, remove the three cards and align the equations as a worked substitution. Make clear that geometry and matter are combined, then calibrated against Poisson's equation. Keep the final coupling adjacent to that comparison. The tiny explanatory footer belongs in the chapter's prose, where it can be read without enlargement.

### 20 · A derivative of whole paths — Keep

**Evidence:** [light](../qa/figure-action-variation-light.png), [dark](../qa/figure-action-variation-dark.png). The colored family with common endpoint dots is one of the most effective drawings in the set. It has a recognizable shape, a clear invariant and enough openness to read instantly. The weakness is the familiar right-hand miniature lecture: the path-family definition is tiny while its consequence is large, and the candidate curves are not directly identified by their variation parameter.

**Concrete treatment:** preserve `assets/figures/action-variation.svg`, move the prose outside, and attach a compact parameter label to the family or a variation displacement at one interior time. Keep endpoint conditions visible. If expanded interactively, vary a whole path and its action together; a particle moving along a path would introduce the wrong kind of motion.

## Best implementation order

1. **Remove accidental slide-deck framing:** repeated in-figure headlines, long footer prose and rounded formula cards. Begin with 01, 12, 16 and 19. Treat standalone exports separately so removing embedded metadata does not make exported figures unidentified.
2. **Repair semantic emphasis cheaply:** distinguish the two histories in 06; reconcile edge colors in 07; give 18 its six precise symbol meanings. Make no mathematical information depend on color alone.
3. **Replace the most misleading visual forms:** 14's blank keypad, 17's glossary spreadsheet, 15's static logos and 03's disconnected timeline. These require bespoke construction, not a new global border radius.
4. **Integrate the reference diagrams with the new lessons:** 07, 11 and 13 should read as compact summaries after their experiments, with matching notation and roles, rather than compete as second introductions.
5. **Design responsive artwork explicitly:** stack or simplify panels, keep explanatory text in HTML, and verify actual phone reading size before calling any of these finished. Do not count the existence of an enlargement control as normal-size legibility.

The strongest direction is generous, precise geometric drawing surrounded by readable editorial text. Several current figures can reach that standard with restraint. Others need a different explanatory construction. None of the evidence supports claiming that all twenty are already exceptional, or that removing borders alone will make them so.
