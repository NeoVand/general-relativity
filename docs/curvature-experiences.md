# Curvature experiences: mathematical and visual review

The chapter 8 component count and chapter 9 cloud are original interactive arguments. Both have typeset server-rendered starting views, keyboard controls, theme-aware color, current-state narration, and an optional earlier reference diagram. The controls operate locally; changing a model makes no provider request.

## Counting components at one event

The convention is the book's all-lowered Levi-Civita curvature tensor, with row pair followed by column pair. The six increasing pairs are `01, 02, 03, 12, 13, 23`. Antisymmetry removes repeated indices and fixes signs under reversal, leaving 36 array slots. Whole-pair exchange makes the array symmetric: six diagonal values plus fifteen mirrored pairs give 21 independent values. The algebraic Bianchi identity leaves one further independent restriction in four dimensions:

\[
R_{0123}-R_{0213}+R_{0312}=0.
\]

The minus sign follows from \(R_{0231}=-R_{0213}\). Calling the first two entries \(a\) and \(b\) fixes the third as \(b-a\). Other cyclic identities either follow from this one or are already implied by the pair symmetries. The displayed tiles contain component names, never empty answer boxes. Selecting one exposes its actual four indices, reflected partner, and both reversal signs. This is an algebraic component count, not a count of propagating degrees of freedom or a claim about raising bivector indices with a Euclidean metric.

Primary source: [David Tong, General Relativity, §3.4](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf).

## Evolving a three-dimensional cloud

The model solves local linear relative acceleration in an orthonormal freely falling frame:

\[
\ddot{\boldsymbol\xi}=\mathsf A\boldsymbol\xi,
\qquad \mathsf A=-c^2\mathcal E,
\qquad \mathcal E_{ij}=R_{\hat i\hat0\hat j\hat0}.
\]

The tidal matrix is held constant. Dimensionless time is \(s=\omega\tau\), with \(\omega>0\). The principal acceleration values divided by \(\omega^2\) are either \((-1,-1,-1)\) or \((2,-1,-1)\). All normalized lengths start at one with zero derivative. The corresponding exact solutions are \((\cos s,\cos s,\cos s)\) and \((\cosh\sqrt2s,\cos s,\cos s)\). Time stops at \(s=0.9<\pi/2\), before any principal length vanishes.

The displayed volume is the product of all three principal lengths, not a projected area. Initial volume acceleration equals the acceleration trace because all initial relative velocities vanish. In the trace-free case,

\[
\frac{\mathcal V(s)}{\mathcal V_0}
=\cosh(\sqrt2s)\cos^2s
=1-\frac12s^4+O(s^6).
\]

Thus zero initial volume acceleration does not imply constant later volume. The plot retains the undeformed sphere, projects actual three-dimensional particle coordinates orthographically, and sorts particles by depth. The faint ellipse is the mathematically projected ellipsoid, obtained from the eigenvalues of its projected shape matrix. Neither the silhouette nor its area supplies the volume readout.

The model illustrates the local geodesic-deviation equation, not an entire black-hole spacetime. A vacuum tide is Weyl curvature, but a trace-free spatial tidal matrix alone does not prove the full Ricci tensor vanishes. Ricci curvature may also contribute anisotropic distortion, so these two selected matrices are not a universal Ricci/Weyl decomposition.

Primary sources: [Tong, geodesic deviation, §3.3.4](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf), and [the Weyl tensor and its vanishing traces](https://davidtong.org/pdfs/teaching/general-relativity/gr.pdf#page=177).

## Verification and integration

`node scripts/check-curvature-experiences.mjs` checks all 256 component signs and cyclic identities, the two exact Jacobi equations, initial and finite volume behavior, orthographic projection, and strict server-rendered LaTeX. Browser checks cover six theme/width combinations with the real book stylesheet, keyboard selection, mode/time controls, current-state narration, preserved reference content, playback, offscreen suspension, reduced-motion changes, orbit restoration, and cleanup.

`node scripts/check-curvature-experiences.mjs --integrated` additionally checks the built chapters 8 and 9 at 1440 and 390 pixels in both themes. It verifies inherited CSS, document overflow, typeset-math bounds and size, current source text, and persistence of narration actions and optional references through model changes. Screenshots are saved as `qa/curvature-integrated-{pairs,cloud}-{width}-{theme}.png`.

The public markup helper is `curvatureExperienceHTML(type, {reference})`. Runtime exports initialize/clean up, retrieve/restore serializable state, and obtain the current source. Every model publishes `data-visual-state` and `data-narration-source`; the latter describes only the current phase or cloud state. The existing book reader owns speech and assistant actions.
