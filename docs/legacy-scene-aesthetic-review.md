# Aesthetic review of the nine original 3D scenes

This is a design critique, not a declaration that passing geometry and layout tests makes every scene excellent. The strongest scenes have an immediately legible subject and a useful reason to be three-dimensional. The weakest look like generic plotting examples: equal-weight marks, insufficient emphasis on a measurement, and a large frame around a small object.

## Evidence and scope

I inspected all **36** existing screenshots: Earth, covector, cone, sphere transport, tides, embedding, wave, expansion, and slices at **1440px and 390px**, each in **light and dark** themes. The files are `qa/lab-{earth,covector,cone,sphere,tides,embedding,wave,expansion,slices}-{1440,390}-{light,dark}.png`. I also inspected the scene construction, materials, labels, parameter updates, framing, and explanatory notes in `web/scenes.js` and `scripts/scenes.mjs`.

These images establish static composition, hierarchy, legibility, and material treatment. They are not sufficient evidence of excellent animation pacing or of clarity throughout arbitrary free camera rotations. The existing browser regression suite exercises controls and layout; it remains separate evidence from this aesthetic judgment.

Two screenshot artifacts require care. The bright ring around Earth comes from its keyboard focus outline; it is **not** a permanent geometric boundary. Some older captures also include a fixed listening launcher over the lower material. I did not treat these overlays as features of the mathematical drawing or infer a cropping defect solely from them.

## Scene-by-scene judgment

### Earth: keep the underlying experience; polish its visual density

**What works.** The real globe gives the scene a recognizable subject, and the inward-moving reference grid offers a genuinely spatial story. The restrained semantic colors and atmospheric lighting distinguish this from the other labs. A fading, continuously replenished field is a stronger opening experience than a conventional plot in a card.

**What falls short.** In both themes, and especially at 390px, the many intersecting grid strokes accumulate into a dense mesh around a relatively small globe. The eye struggles to follow one cell or one observer long enough to understand the changing separation. In a still image this can read as a starburst or tangled string. The globe's texture is more detailed than the available mobile size can usefully reveal.

**Best next changes.** Reduce visible cohort/line density while retaining the same flow; make a small number of neighboring observers and their connecting cell more prominent; evaluate that treatment in motion, including the initial frame. Preserve the distinction between a falling reference grid and a material substance called space. No Earth-flow code was changed in this pass.

### Covector planes: polish; retain the spatial construction

**What works.** A vector crossing level planes is a good use of 3D. The oblique view separates the planes, their numbered levels are legible, and the scene avoids unnecessary scenery. It has one clear geometric vocabulary.

**What falls short.** Four equally weighted translucent rectangles look like generic CAD panes. The arrow is thin relative to the panels, its starting event is insufficiently emphasized, and extending it does not make the successive crossings visually explicit. The viewer must do the counting even though that pairing is the main idea.

**Best next changes.** Mark the starting point; emphasize a plane only when the arrow crosses it; show the measured pairing adjacent to the moving endpoint with a persistent, quieter set of level planes. Retain translucency as a depth cue, not the main visual subject. This pass did not change the covector model.

### Light cone: keep, with a more purposeful instructional state

**What works.** The double cone reads immediately. The time axis, the event at the apex, and the differently colored timelike direction establish a usable hierarchy. Both themes remain coherent; the surface restores a spatial dimension that a flat cone drawing suppresses.

**What falls short.** The finite circular rims and equal treatment of future and past can make the object look like two physical funnels. The visual result of changing speed is only a tilted arrow, and the prominent surfaces can compete with that change. The floating null label is useful but does not by itself teach what belongs inside or outside the cone.

**Best next changes.** Introduce a guided future-cone state that classifies selected directions as timelike, null, or spacelike; let the past cone remain quieter until needed. Keep the full symmetric object available. Do not turn an illustrative cutoff rim into a purported physical boundary. The geometry was retained in this pass.

### Original sphere transport: keep in the atlas; prefer the guided lesson for teaching

**What works.** This is among the more composed original scenes. Its sphere fills the frame, its surface has readable depth, and the great-circle triangle is unmistakable. The intrinsic-versus-ambient comparison genuinely benefits from rotation. The start and moving arrows have distinct semantic colors.

**What falls short.** The route is much heavier than the arrow whose behavior is the lesson. At intermediate positions, the arrow's shaft and the tangent plane are easy to overlook. A generic percentage along a three-arc slider asks the learner to infer the local transport rule from a finished object.

**Best next changes.** Increase the moving arrow's hierarchy relative to the route and make the local tangent-plane comparison explicit. The new guided transport lesson already provides projection, verified arcs, and the final same-plane comparison; that should remain the teaching entrance. Keep this original continuous exploration as an atlas/reference experience rather than presenting two competing introductions.

### Tidal cloud: substantial polish implemented; the reference shape matters

**Before this pass.** The 240 similarly prominent beads and dense latitude/longitude wirework made the cloud look like a molecular model. Three long floating eigenvalue expressions took framing space from the shape itself; on phones the cloud became a small, busy object. The mild default deformation was hard to judge without a visual memory of the original sphere.

**Changes implemented.** Reduced the cloud to 96 smaller, less glossy markers; replaced the dense surface grid with three changing great circles; added faint dashed great circles fixed at the initial spherical shape. Compact local orthonormal-axis labels replace the long floating eigenvalue formulas. The complete ordered eigenvalues remain in the equation below, and the note explicitly identifies radial and transverse directions and the initial reference.

**What remains.** The two transverse directions deserve an explicit selectable comparison in a future guided lesson. The current model is an early-time deformation with a disclosed small-parameter approximation; a more spectacular stretch must not quietly imply exact long-time evolution or exact volume preservation.

### Schwarzschild embedding: rebuild the learning interaction; keep the mathematics

**What works.** The shape is recognizable, the horizon-radius circle has a clear accent, and the radial path introduces a measurement rather than decoration alone. The caption correctly identifies a spatial equatorial slice and warns that embedding height is not time or a force.

**What falls short.** A broad wirework mouth dominates the view while the measurement is a small red curve near its throat. Dense lines gather at the throat, especially on phones. The hard outer edge and familiar funnel silhouette encourage the very rubber-sheet interpretation that the note must subsequently undo. Moving a dot outward is not yet a strong demonstration of the intrinsic radial distance.

**Best next changes.** Build a paired intrinsic-distance experiment within one stage: mark a coordinate interval, compare its radial proper length, and show the corresponding embedded path. Use progressive disclosure of the embedding rather than relying on the funnel as the first explanatory object. Decrease mesh density selectively once the measured path has a clear hierarchy. No embedding code changed in this pass.

### Gravitational wave: detector hierarchy implemented; retain the propagation context

**Before this pass.** Seven equally prominent bead rings read as a spring or a material coil. Their overlaps compete for attention, and the free-floating transverse labels do not clearly belong to one detector plane. The useful idea—one local ring stretching in one direction while squeezing in the other—is submerged in repetition.

**Changes implemented.** Made the middle detector ring the primary subject, with larger, brighter markers and an emphasized outline. The six other rings remain at their existing positions and follow the same phase law, but become quieter with distance from the middle. Fixed transverse coordinate guides and their labels now belong to that middle plane. Notes distinguish the guides from material detector arms and the rings from a medium carrying sound.

**What remains.** A future lesson should let the learner hold one detector in view while switching polarization and comparing the displacement prediction with a measurement. The present change improves hierarchy without changing the first-order strain model or pretending to be a complete interferometer simulation.

### Cosmological expansion: measurement focus implemented; rebuild the observer comparison later

**Before this pass.** A small, undifferentiated wire cube floated inside a large stage. The only emphasis was a long relation hanging below the lattice. That relation also consumed label clearance, particularly on phones. Scaling the entire object can feel like zooming a specimen and does little to demonstrate the absence of a preferred center.

**Changes implemented.** Highlighted one actual separation between two fixed comoving markers and attached a compact length label to it. The complete scale-factor relation remains immediately below. The same parameter envelope and camera are retained through a scale change; the scene does not compensate by zooming differently for each value.

**What remains.** The next meaningful redesign is observer selection: choose any comoving marker, compare its relative separations, and see why no marker becomes a privileged expansion center. The finite cube must continue to be described as a viewing window, not an edge of the universe. Its point glyphs are markers, not a model of bound galaxies swelling with the scale factor.

### Lapse and shift: rebuild the instructional hierarchy

**What works.** Two spatial slices with a normal and a sideways displacement are an appropriate spatial scaffold. The separate colors for normal evolution and shift support the algebra, and the note avoids interpreting the Euclidean rendering as a spacetime distance measurement.

**What falls short.** The two planes dominate while the three short vectors—the actual argument—are compressed near their center. On a phone the entire construction is small. Changing shift moves the top grid, but a learner without the prior interpretation may see a sliding sheet rather than the decomposition of one evolution vector. The scene looks orderly without yet being explanatory enough.

**Best next changes.** Introduce one point and one evolution step first, then reveal the normal and shift components as an explicit vector sum, followed by the surrounding slices. Give the endpoint a stable visual identity. Use this same state to explain what is a coordinate choice and what is a physical normal separation. Retain the compact static diagram as an alternate view inside the same experience.

## Priority after the implemented refinements

1. **Rebuild the embedding and lapse/shift interactions around their measurements and vector operations.** Additional visual effects would not solve their main explanatory weakness.
2. **Make observer comparison the core of the expansion scene.** A selectable reference marker would teach more than a richer-looking cube.
3. **Simplify the Earth field in motion around a followable cell or observer group.** Judge the result through actual temporal viewing, not one attractive still.

The wave, tides, and expansion refinements in this pass address focal hierarchy and use of the available frame. They do not justify calling all nine experiences aesthetically finished. The full collection is coherent in palette and typesetting; its instructional and compositional quality remains uneven in the specific ways recorded above.

## Verification after the refinements

The coordinated build passed `npm run test:experience`: all 36 scene/theme/viewport combinations, model endpoints, keyboard controls, semantic math, and atlas inspection. I then visually inspected all twelve regenerated screenshots for tides, wave, and expansion at 1440 and 390 pixels in both themes. Tides has substantially less competing wirework, with a visible initial-shape reference and compact labels. The central wave detector is the clear subject while the surrounding phase samples remain visible. Expansion now has a recognizable measured separation; its fixed camera still reserves room for the maximum scale, so the initial lattice remains modest rather than filling the entire stage. No new clipping or scene-label collision appeared in those views. The viewport-fixed listening launcher visible over the lower equation area in some captured phone images is a separate overlay, not scene geometry.
