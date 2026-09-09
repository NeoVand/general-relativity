# Aesthetic review of figures 21–40

Reviewed 8 September 2026. This is an inspection of the rendered figures, not a review inferred from SVG source. I inspected all forty native 1000-pixel light/dark captures, paired at their original resolution in `qa/aesthetic-pair-21-22.png` through `qa/aesthetic-pair-39-40.png`. The original captures are `qa/figure-{id}-light.png` and `qa/figure-{id}-dark.png`. The findings below refer to those **before** captures; figure 35 also has a separately documented rebuild and isolated after captures below. I read the existing `docs/visualization-audit.md` first and concentrated on composition, visual evidence, and precise next changes rather than repeating its general requests for interactivity.

The honest result: the collection is legible and already changes its colors correctly with the theme. It does not yet have consistently exceptional visual authorship. The best drawings let the eye discover a fact. The weakest typeset a paragraph inside a conventional presentation-slide layout and call it a visualization. Large empty areas are often the by-product of the common 1000 × 480 template rather than intentional breathing room around an important construction. Adding a third dimension would help only some of them.

“Keep” retains the representation; it does not mean no small refinements are possible. “Polish” means the present representation can become strong through concrete revisions. “Rebuild” means the reader needs a different visual argument.

## Per-figure findings

### 21 · Two variations make one field equation — POLISH

Evidence: [light](../qa/figure-action-product-rule-light.png), [dark](../qa/figure-action-product-rule-dark.png).

The two equally sized outlined cards, straight downward arrows, and diagonal merge arrows make this look like a generic process diagram. The boxes carry almost no information that requires a box. The lower composition is especially weak: the branches point into blank space above “Together,” leaving the actual tensor absent at the moment the figure promises a result. The title and purple/teal branches remain clear in both themes; dark mode is visually stronger because its white space is less conspicuous.

Retain the two-factor comparison, but typeset the product rule as a single large aligned expression. Place short branch annotations directly beneath the two terms, with the resulting tensor aligned below. Route the boundary divergence into its own quiet annotation rather than visually merging it into the Einstein tensor. This is a mathematical expansion, so a clear equation composition is more appropriate than another decorative surface.

### 22 · Fixing the value does not fix the slope — KEEP

Evidence: [light](../qa/figure-boundary-variation-light.png), [dark](../qa/figure-boundary-variation-dark.png).

This is one of the best figures in this half. The colored tangents and common endpoint dots let a learner see the distinction before reading the equations. It has no enclosing cards or unnecessary legend. The curve itself occupies enough space to matter, and its normal-coordinate axis says what is being varied. Dark mode's pale endpoint dots remain clean against both the axis and tangent.

The subtle weakness is that the tangent strokes nearly follow the curve over their visible length; at small sizes the pink strokes can look like parts of the same curve. A slightly longer straight tangent extension outside the allowed interval, with the endpoint still fixed, would make the difference easier to see. Move the final “boundary policy” sentence into surrounding HTML prose; its small type contributes little to the image. Do not rebuild this into 3D.

### 23 · A symmetry supplies an energy comparison — REBUILD

Evidence: [light](../qa/figure-killing-energy-light.png), [dark](../qa/figure-killing-energy-dark.png).

The large arrow is attractive enough, but the three wavy lines have no defined quantity. They can be read as waves, stacked spatial slices, or a repeated decorative profile. Nothing in the drawing shows a conserved energy or a measuring experiment carried along the symmetry. The formula and surrounding text do almost all the teaching. The bright warning question on the right also competes with the main equation for attention.

Replace the anonymous profiles with two small copies of the **same local metric measurement**, separated along an explicitly labeled symmetry flow. Carry the same small ruler/clock construction between them. Then place the energy comparison below those two events, distinguishing the conserved Killing quantity from the local observer's measurement. A subtle animation of that mapping could be valuable after the static correspondence is unambiguous. Simply adding more wavy lines or glow would make the figure worse.

### 24 · A ray samples more than the clock rate — POLISH

Evidence: [light](../qa/figure-light-bending-light.png), [dark](../qa/figure-light-bending-dark.png).

The long ray, restrained mass disk, and isolated impact-parameter bracket make a pleasing, economical composition. The mass disk reads particularly well in dark mode. But the right-hand space is used by a floating formula rather than the geometric angle that formula predicts. The ray nearly coincides with the dashed incoming direction for half its width, while the exit tangent is absent.

Use a slightly shorter ray, construct its outgoing asymptote, and show a small, explicitly exaggerated deflection-angle arc between asymptotes. Place the equation at that angle rather than below an unrelated portion of the curve. Keep the gold mass and blue impact parameter. Reduce the long sentence at the bottom to a caption outside the SVG; it is already unusually small and serif-heavy compared with the figure's plain-language heading.

### 25 · A slowly turning orbit — POLISH

Evidence: [light](../qa/figure-perihelion-precession-light.png), [dark](../qa/figure-perihelion-precession-dark.png).

The repeated ellipses are graceful, but their leftmost edge comes within about ten pixels of the canvas. That makes the figure look accidentally cropped even though the paths remain inside it. The right-hand explanation sits far away, with its equation fraction much smaller than the nearby sentence about the measured advance. The three perihelion dots cluster without an ordering cue, so color is doing a job it cannot do alone.

Inset the orbit by another 35–45 pixels, reduce its vertical size slightly, and attach a compact magnified perihelion inset to the three dots. Label the turns in order or draw a single quiet direction arc around the focus. Give the predicted advance a readable display equation instead of a tiny inline fraction. Keep the statement that the precession is exaggerated. A permanently spinning family of ellipses would be less instructive than an explicit sequence.

### 26 · Altitude and motion compete — POLISH

Evidence: [light](../qa/figure-gps-clocks-light.png), [dark](../qa/figure-gps-clocks-dark.png).

This graph has a real scale, a meaningful zero, and a clear selected GPS point. Those features make it more valuable than a satellite illustration. Its weakness is visual disconnection: the crossover and GPS altitude are written in a separate column without direct annotations to the corresponding positions on the curve. The small tick labels and mixed LaTeX/plain-text typography make the graph feel older than the surrounding application.

Attach a small label directly to the GPS point and mark the zero crossing with a dot and short leader. Put the altitude and motion contributions in the same graph as quiet, independently identified curves, emphasizing their sum. Direct labeling would remove most of the need for the right column and allow a larger plot at mobile width. Maintain the dashed zero reference; it has mathematical meaning and is not an ornamental divider.

### 27 · The tossed clock records more time — KEEP

Evidence: [light](../qa/figure-tossed-clock-light.png), [dark](../qa/figure-tossed-clock-dark.png).

Shared endpoints, one clean parabola, and the numerical accounting make an unusually approachable argument. The pale endpoint dots and restrained pink line work well in dark mode. The problem is emphasis: the tossed trajectory and stationary baseline use the same color and line weight, so their distinct roles are not immediately apparent. The “height wins” title also states the answer before the picture has offered much explanation.

Keep the curve and arithmetic. Give the stationary reference a neutral dashed stroke and the tossed clock the observer color. If this receives an interactive counterpart, link it to accumulated proper-time contributions, not merely a dot moving over the parabola. The small rule above the net result is justified as arithmetic alignment, unlike the decorative boxes elsewhere; it does not need to be removed simply because the user dislikes dividers.

### 28 · Do not merge these three radii — KEEP

Evidence: [light](../qa/figure-black-hole-radii-light.png), [dark](../qa/figure-black-hole-radii-dark.png).

This is calm, proportionate, and useful. The geometry occupies one side; three well-spaced explanations occupy the other. The outer radius is exactly twice the middle radius and three times the inner radius, so the drawing carries information rather than serving as a symbol. Theme colors preserve the hierarchy without depending on black fills or a photorealistic “black hole.”

The circles currently rely entirely on matching three colors to the list. Place short direct labels along the right side of each circle, with quiet leaders if necessary, and keep the longer explanations outside the SVG. A small shared scale would help readers notice the actual proportions. Do not replace the concentric construction with a dramatic accretion disk; that would discard its main educational benefit.

### 29 · A horizon changes which way the future goes — POLISH

Evidence: [light](../qa/figure-horizon-cones-light.png), [dark](../qa/figure-horizon-cones-dark.png).

The causal idea is substantially better than a funnel, and the contrast of the horizon with the null directions is effective in both themes. The composition still looks like four clipped pennants: each future wedge has a strong horizontal cap, but the cap has no causal meaning. The vertices have no event dots, making it harder to identify the point whose future is shown. All four triangles have the same visual weight, even though the horizon case is the pivotal comparison.

Keep the analytic directions. Remove or greatly soften the horizontal caps, add a small event at each vertex, and identify “inside / on / outside” directly above the selected examples. A three-state comparison could be cleaner than four equally weighted examples. The new interactive horizon lesson can carry continuous event selection; the static alternative should be its concise reading guide, not a second full introduction.

### 30 · Two independent patterns of strain — KEEP

Evidence: [light](../qa/figure-wave-polarizations-light.png), [dark](../qa/figure-wave-polarizations-dark.png).

The paired circles are balanced, the unperturbed reference is retained, and the particle markers make the deformation legible. Both themes are strong. The representation deserves its space: rotating the second deformation gives a visible correspondence that a prose paragraph cannot replace. It is one of the rare figures that is already close to an elegant textbook plate.

Refine the two diagrams into exactly equal bounding regions and use the same typographic treatment for both subcaptions; currently the “45 degrees” sentence changes to a different serif texture. A very faint central cross or direct stretch/squeeze cues would help identify the orientation without adding a new legend. Keep the stipulation that this is one exaggerated phase and that propagation is perpendicular to the page.

### 31 · Expansion is not the same as acceleration — POLISH

Evidence: [light](../qa/figure-cosmic-expansion-light.png), [dark](../qa/figure-cosmic-expansion-dark.png).

The graph does useful comparative work, but its right-hand legend is ordered radiation–dust–vacuum while the curves' right-edge vertical order is vacuum–dust–radiation. The learner repeatedly has to match colors rather than following a label from its curve. The nearly coincident region around the reference epoch is important, but it has no explicit reference marker. The top left contains a large empty region that could accommodate a better annotation.

Direct-label the curves at their right ends, identify the common normalization point, and add a short pair of tangents to one decelerating curve and the accelerating curve. Those slope changes would visually establish acceleration instead of requiring the learner to infer it from the formula. Retain the quantitative axes; an expanding galaxy lattice cannot do this job.

### 32 · A causal horizon is not just a distance scale — REBUILD

Evidence: [light](../qa/figure-cosmic-horizons-light.png), [dark](../qa/figure-cosmic-horizons-dark.png).

The hourglass is simple and clean, but the title promises three quantities while only two colored constructions exist. The “now” point is understandable, yet the observing worldline is missing, so the relation between a future conformal boundary and an observer's causal reach remains implicit. The dominant dashed pink top edge risks being remembered as a physical wall. The composition gives much more space to three definitions than to the actual spacetime diagram.

Start with an observer worldline and one expansion history, draw the past and future light-ray constructions from its current event, and add the two corresponding distance brackets. Put the Hubble radius in a separate linked spatial strip, where its status as an expansion scale is visibly different. Then make the history selectable. The absent-boundary cases matter more than adding polish to a permanently finite hourglass.

### 33 · Lapse and shift separate two choices — KEEP

Evidence: [light](../qa/figure-adm-slicing-light.png), [dark](../qa/figure-adm-slicing-dark.png).

This is a successful explanatory diagram. Two translucent planes and three vectors are enough; the shared vector endpoints tell the story. It avoids the standard diagram-plus-paragraph split and uses the width well. The long, thin parallelograms do feel a little like presentation software, but here their geometry has a purpose. Pink lapse, blue shift, and neutral total remain distinguishable in dark mode.

The coordinate-time-step label sits a long way from the diagonal it names. Move it closer without touching the arrow and position the shift label above its vector, where it will no longer appear visually attached to the upper plane's outline. Keep the transparent plane fills subdued. Do not add a textured space grid just to make the diagram more cinematic; it would distract from the vector decomposition.

### 34 · Two physical degrees of freedom, counted honestly — REBUILD

Evidence: [light](../qa/figure-constraint-count-light.png), [dark](../qa/figure-constraint-count-dark.png).

This is a clean piece of arithmetic inside three padded cards. It is not yet a visual explanation of degrees of freedom. All twelve starting functions have vanished into the number “12”; the two removals look identical and their separate meanings must be supplied by prose. Large teal boxes and another large answer line give the figure the aesthetic of a slide deck. Dark mode improves contrast but not the representation.

Use twelve small, clearly grouped configuration/momentum markers. Show four independent constraint conditions and four gauge directions as different operations, with the final four markers paired into two configurations and two momenta. The accompanying simple constrained-system lesson must still do the mathematical work; a graphic cannot prove independence or first-class status. Remove the cards once the markers carry the comparison.

### 35 · Same method, different curvature — REBUILD; IMPLEMENTED IN THIS PASS

Before evidence: [light](../qa/cartan-before-light.png), [dark](../qa/cartan-before-dark.png); the native before pairing is [35–36](../qa/aesthetic-pair-35-36.png).

This was one of the weakest figures. Two outlined formula cards announced a flat plane and a sphere without showing either. The connection and curvature equations were presented as four lines of almost equal weight, leaving no focal result. The serif mathematical heading in the right card also made the two otherwise parallel headings look inconsistent. Most importantly, the learner could not *see* what distinguished intrinsic curvature from a rotating coordinate frame.

Implemented a genuine matched comparison: an original vector polar plane and sphere, a marked closed transport circuit on each, explicit coframe ruler readings, and a comparison of initial/returned directions in the same orthonormal tangent plane. The plane returns the arrow unchanged; the sphere returns it through the signed angle equal to enclosed area divided by radius squared. Neutral dashed reference directions, blue transport, teal ruler components, and purple holonomy keep distinct roles. No enclosing cards, fictitious funnel, or decorative physical distortion.

The sphere circuit spans colatitude from pi/3 to pi/2 and longitude from −pi/6 to pi/6, oriented first toward increasing colatitude and then increasing longitude. Its area is pi times radius squared divided by six; the inset therefore shows a true 30-degree return angle. The projection of the surface is explicitly not the measuring plane. This is a consequence of the local Cartan calculation, not a claim to visually derive the whole formalism. Local-frame domain restrictions and the rotation's full-turn ambiguity remain in the caption.

Each half is self-contained and stacks into a 500-unit mobile viewBox without duplicating math or IDs. Isolated after evidence: [desktop light](../qa/cartan-rebuilt-desktop-light.png), [desktop dark](../qa/cartan-rebuilt-desktop-dark.png), [mobile light](../qa/cartan-rebuilt-mobile-light.png), [mobile dark](../qa/cartan-rebuilt-mobile-dark.png). Those previews passed text overlap and clipping checks in both themes. Final integrated site checks are a separate step.

### 36 · Focusing is not yet a singularity — POLISH, HIGH PRIORITY

Evidence: [light](../qa/figure-focusing-caustic-light.png), [dark](../qa/figure-focusing-caustic-dark.png).

The converging rays are immediately legible, and the large caustic dot is a strong focus. However, **every path ends at the caustic in the picture**. The adjacent text says straight paths can cross in flat spacetime, but the eye sees termination. This is a missed opportunity to demonstrate the central distinction directly. The small inequality above the large focusing bound is also markedly undersized.

Extend the same straight paths beyond the crossing with lighter strokes. The image would then show, without argument, that the congruence description can fail while spacetime and individual paths continue. Keep the caustic point, reduce the right-hand text, and give the assumption inequality a readable display size. This is a small graphical intervention with unusually high teaching value.

### 37 · Two areas constrain one remnant — KEEP

Evidence: [light](../qa/figure-horizon-area-light.png), [dark](../qa/figure-horizon-area-dark.png).

Two equal disks becoming one larger disk makes the area bound easy to compare. The common baseline, modest fills, and short mass labels are well composed. The final disk's larger area genuinely supports the mathematics, unlike a purely illustrative merger image. The limiting-case wording is prominent enough that it should survive later aesthetic revisions.

The long bottom formula sits very near the footer and has a different texture from the sans-serif headline. Put the limiting inequality below the final disk, with a shorter note underneath, rather than running a sentence across the entire canvas. A subtle inequality sign near the final state could further discourage reading the arrow as an efficiency prediction. Do not replace the area comparison with a simulated merger unless both views remain clearly distinct.

### 38 · The information question has a shape — POLISH, HIGH PRIORITY

Evidence: [light](../qa/figure-page-curve-light.png), [dark](../qa/figure-page-curve-dark.png).

The triangular teal curve and dashed pink trend are easy to distinguish, and the figure wisely calls the axes schematic. But the solid unitary curve rises **faster than the semiclassical trend at early times**, then intersects it after the peak. That drawing distracts from the usual Page-curve comparison, where the early radiation-entropy behavior agrees and a late departure is the important point. This is not a request to smooth the peak for beauty; it is a request to align the visual argument with the physical comparison.

Give the two curves a shared early segment, then let the unitary curve turn down near a marked Page transition while the semiclassical trend continues upward. Direct labels near their late branches would eliminate much of the separate legend. State in the surrounding text that the plotted entropy is fine-grained entropy of the radiation subsystem. A sharply schematic turning point is acceptable if the figure says so.

### 39 · A theory has a resolution scale — REBUILD

Evidence: [light](../qa/figure-effective-theory-light.png), [dark](../qa/figure-effective-theory-dark.png).

The long arrow and three ticks are tidy, but the figure shows no actual resolution and no actual hierarchy of correction sizes. Most of its area is occupied by sentences, including a large “leading theory + smaller terms” line. The arrow's quantity is not labeled; “long wavelength” on the left and “near the cutoff” on the right require the learner to infer that the increasing coordinate is energy or inverse wavelength.

Use one explicitly labeled dimensionless expansion parameter and show the relative sizes of a leading term and two corrections at three values of it. A small linked view of a long versus short wavelength sampling the same structure would earn the title “resolution scale.” Preserve the distinction between a model-dependent cutoff and a universal physical boundary. The comparison can stay static and elegant; it does not require WebGL.

### 40 · From a metric to a measurement — REBUILD AS INTERFACE, NOT ARTWORK

Evidence: [light](../qa/figure-calculation-map-light.png), [dark](../qa/figure-calculation-map-dark.png).

This is six cards of text with arrows between columns. The arrows do not connect the third card to the fourth, even though the numbering suggests one mandatory process. The lower row's pink framing looks like a category change but has no stated meaning. It is readable, but it occupies an illustration-sized rectangle for material that would be easier to scan, resize, link, and use as HTML.

Convert it into a compact, responsive calculation checklist with links to relevant worked examples. Start by naming the desired measurement and observer. Let a selected problem reveal the steps it actually requires, including when connection or curvature calculations can be skipped. Keep a static print-friendly summary if useful, but do not spend the visual budget making six boxes appear more luxurious.

## Priorities with the largest visible payoff

1. **Make geometric claims visible.** The coframe rebuild is the clearest example. Next are Killing symmetry (23), cosmic causal horizons (32), and the difference between focusing and singularity (36). A reader should be able to point at the part of the image that justifies the caption.
2. **Use direct labels and meaningful constructions.** Attach the bending angle to the ray (24), values to their GPS points (26), and labels to the expansion curves (31). These changes improve beauty because they remove the separate legend burden, not because they add effects.
3. **Reserve SVG for visual relationships.** Constraint arithmetic (34), the resolution slogan (39), and the calculation checklist (40) need a new representation or responsive HTML. Two polished formula cards are still two formula cards.
4. **Give mathematics a consistent optical size.** The perihelion fraction and focusing assumptions are conspicuously smaller than neighboring prose. Equations should be set as displays when their numerator, denominator, or indices matter. Nonmathematical labels should retain the same sans-serif treatment on both sides of a comparison, while mathematical symbols remain LaTeX.
5. **Fit composition to the argument.** The repeated picture-left/paragraph-right template causes remote legends, awkward empty space, and tiny mobile plots. Stack genuine comparisons, move explanatory paragraphs into HTML, and keep the graphic focused on its new evidence. The before/after version of 35 demonstrates how responsive panels can retain all mathematical labels without shrinking two columns together.

The light/dark palette itself is not the main defect in this subset. All inspected captures respond to theme changes, and no figure needs ornamental gradients, glass, or glow to become understandable. The goal is stronger visual reasoning, generous and intentional placement, and readable typography at the size at which the book is actually read.


## Figure 35: mathematical and integration checks

The coframes agree with the existing chapter 21 convention. For the polar plane, $e^1=dr$, $e^2=r\,d\theta$ and $\omega^1{}_2=-d\theta$, so $\Omega^1{}_2=0$ away from the polar origin. On a sphere of radius $a$, $e^1=a\,d\theta$, $e^2=a\sin\theta\,d\varphi$, and $\omega^1{}_2=-\cos\theta\,d\varphi$, so $\Omega^1{}_2=\sin\theta\,d\theta\wedge d\varphi=e^1\wedge e^2/a^2$. These are the standard local orthonormal-frame calculation, consistent with [Tong’s differential-geometry/curvature notes](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf) and the book’s explicit sign convention.

For the drawn sphere loop, start at $(\theta,\varphi)=(\pi/3,-\pi/6)$ and follow increasing $\theta$, increasing $\varphi$, decreasing $\theta$, then decreasing $\varphi$. This orientation is positive relative to $e^1\wedge e^2$. If a transported unit vector is written as $\cos\beta\,E_1+\sin\beta\,E_2$, the parallel-transport equation is $d\beta=-\cos\theta\,d\varphi$. Hence $\Delta\beta=(\pi/3)(\cos(\pi/3)-\cos(\pi/2))=\pi/6$. The patch area is $A=a^2(\pi/3)(1/2)=\pi a^2/6$. The inset’s 30-degree angle is therefore computed, not chosen for appearance. The plane’s corresponding contractible loop has zero return rotation. The caption states that holonomy angles are defined modulo full turns and that the coframes exclude their coordinate singularities.

Validation completed after integration: the full 40-figure light/dark geometry suite passed; the root task inspected figure 35 in the application and confirmed the responsive compact-layout checks passed. The isolated four-state previews also show no clipped or overlapping text. Changes are limited to figure 35’s Python block, four explicit figure-TeX mappings, and four caption-TeX mappings. No new bitmap artwork or external image license was introduced.
