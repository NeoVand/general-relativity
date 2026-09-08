## A visual reading edition

This edition preserves the complete 24-chapter derivation sequence and adds a prerequisite Chapter 0, new worked calculations, historical context, an index-practice appendix, chapter questions and checkpoints, original SVG diagrams, and three interactive experiments. The intended entry point is basic calculus and linear algebra. The later quantum and global-geometry discussions distinguish explanations from complete proofs and mark their additional assumptions.

The supplied comparison document was treated as reference material, not as instructions. Its coverage was compared with the manuscript, and useful gaps were filled. Several of its claims needed correction: a massless homogeneous scalar is not dust; curvature gives relative acceleration per separation; Kerr merger areas cannot be inferred from mass squared alone; and the two common factors of two involving pressure and light bending answer different questions. The [editorial comparison in the repository](https://github.com/NeoVand/general-relativity/blob/main/docs/reference-comparison.md) records the decisions.

## The original diagrams

Every diagram in the [visual atlas](figure-atlas.html) is an original, reproducible SVG generated from the geometric or schematic construction stated in its caption. Axes, units, projection effects, approximation regimes, and exaggerated amplitudes are identified where relevant. SVG keeps the labels and lines sharp at any zoom. The equations are rendered as HTML and MathML, with locally hosted math fonts; no remote equation-rendering service is required.

The diagrams are teaching models, not photographs of spacetime. A grid drawn with curved lines does not establish intrinsic curvature. A spacetime sketch does not preserve ordinary Euclidean lengths. Large visible gravitational-wave distortions are deliberate magnifications of a first-order model.

## Historical photographs and documents

Four historical assets are used in Chapter 1. Source pages identify these as public-domain works or faithful reproductions of public-domain two-dimensional works. Dates below refer to the original work. The files were proportionally resized and JPEG-compressed without new cropping or retouching. The [asset manifest](assets/history/manifest.json) records source URLs, creator, copyright rationale, processing, and file hashes, checked on September 8, 2026.

| Image | Creator and date | Source and rights |
|---|---|---|
| Einstein beside a chalkboard | Ferdinand Schmutzer, 1921 | [Commons source](https://commons.wikimedia.org/wiki/File:Einstein_1921_by_F_Schmutzer.jpg); public domain under the source page's Austrian and US rationales. |
| Portrait of Isaac Newton | Godfrey Kneller, 1689 | [Commons source](https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Isaac_Newton,_1689.jpg); expired copyright, PD-Art reproduction. |
| First-edition *Principia* title page | Isaac Newton, 1687 | [Commons source](https://commons.wikimedia.org/wiki/File:Newton_-_Principia_(1687),_title,_p._5,_color.jpg); public domain. |
| *Die Grundlage der allgemeinen Relativitätstheorie* title page | Albert Einstein, 1916 | [Commons source](https://commons.wikimedia.org/wiki/File:Einstein_Die_Grundlage_der_allgemeinen_Relativit%C3%A4tstheorie_Sonderdruck_1916_Titel.jpg); pre-1931 US publication, life-plus-70 term expired at the end of 2025, PD-Art reproduction. |

The final image is a printed 1916 title page. It is not Einstein's November 1915 paper, a notebook, or a handwritten field equation. Public-domain status is jurisdiction-dependent; the manifest preserves the source's rationale rather than applying one blanket license to every historical work.

## Sources and reproducibility

Research and historical references appear at the point of use and in [Appendix D](appendix-d.html). A successful render is a typesetting check, not an independent peer review of an entire general-relativity textbook. The edition's numerical checks cover the new clock and curvature examples and selected geometric models, and the visual review checks the exported diagrams and desktop and mobile layouts.

The current publication target is this HTML book. The older PDF and LaTeX files in the repository are archival material from the previous edition; they do not contain these revisions. The HTML is built and deployed through the repository's GitHub Actions workflow.
