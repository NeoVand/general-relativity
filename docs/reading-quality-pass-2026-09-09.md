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

## Verification

Local checks during this pass: static pages and links; all 37 lesson placements; eight lab placements and the two opening figures; Svelte checks; 74 browser page/viewport combinations; desktop/mobile navigation; all 40 figures in both themes; 42 responsive figure/theme/width compositions; all 36 3D scene/theme/viewport combinations; reading position; reading-source and narration unit checks. Screenshot evidence accompanies this note.

These checks establish specific software behavior and catch the named sequencing regressions. They do not establish that a novice can understand every remaining chapter. The ongoing sentence-level pass continues from Chapter 2.
