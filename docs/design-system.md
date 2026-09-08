# Visual language of the explorable edition

The reader-facing guide is generated at `visual-language.html`. The implementation uses a shared set of semantic CSS custom properties:

| Role | Light | Dark | Recognized examples |
| --- | --- | --- | --- |
| Measurement geometry | `#007c78` | `#64d9c9` | Metric, spatial metric, identified metric perturbations |
| Transport and comparison | `#275dc5` | `#8bb5ff` | Connection, covariant derivative, transport path |
| Curvature | `#7951bb` | `#bd9cff` | Riemann, Ricci, identified scalar curvature |
| Matter and energy | `#a25e00` | `#f3c16e` | Stress–energy, identified mass density |
| Clocks and observers | `#bb365d` | `#ff99b4` | Proper time, four-velocity, detector particles |

Classification is conservative and context-sensitive, not a Unicode character replacement. Scripts and indices, font commands, operator names, prose, constants, and ambiguous uses stay neutral. In particular: Earth’s radius R is not curvature; an index rho is not density; a variation vector eta is not the Minkowski metric; a Cartan torsion symbol is not stress–energy. Comparative plots may use locally labeled series; the physical glyph identities remain fixed.

## Typesetting

- Book math and 3D labels: locally hosted KaTeX, retaining accessible MathML.
- Static figure math: explicit source in `content/figure-math.json`; MathJax emits scalable glyph paths. No Unicode superscripts substitute for typesetting.
- Figure captions: explicit source fragments in `content/caption-math.json`.
- Guides and checkpoints: dollar-delimited TeX, rendered by the same math system.
- General prose: Newsreader; interface and diagram descriptions: Manrope. Both font licenses ship with the site.
- Interface icons: Hugeicons Stroke Rounded, emitted as individual inline SVGs. The entire icon package is not sent to the browser.

Inline SVGs inherit the selected reading theme. Resource IDs are namespaced per figure and again for the fallback and full-size viewer. Standalone SVG files respect the browser’s preferred color scheme. No inversion filter is used.

## Three-dimensional models

Eight lazy-initialized Three.js scenes render on input, rotation, theme changes, and resize. They do not run perpetual animation loops. Each has keyboard-operable controls, a reset view, an explicit interpretation and limitations, and a theme-aware vector fallback. Camera framing adapts to the available aspect ratio. The sphere uses actual great-circle transport, not an arbitrary rotation of an arrow. Flamm’s paraboloid is explicitly a spatial embedding, not a representation of time or the whole spacetime.

## Review evidence

`npm run test:experience` exercises all eight scenes at desktop and phone widths in both themes, checks analytic endpoint values, inspects label bounds and overlaps, tests reset and atlas inspection, and verifies key semantic-classification exclusions. `npm run test:figures` measures both ordinary text and the bounding boxes of mathematical SVG labels. `npm run test:browser` checks every page at two widths and the original clock, GPS, and wave experiments. GitHub Actions runs all checks before deploying and retains screenshots and reports as an artifact.
