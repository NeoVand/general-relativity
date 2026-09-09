# Particle transport before the stress–energy matrix

Chapter 11 now begins §11.1 with a detector experiment before the matrix. A stream shows advective transport; equal populations in six opposing directions show zero bulk motion and positive normal momentum flux; tilted opposing streams show off-diagonal flux. Changing the carried component changes the measurement, not the trajectories.

The original model contains 96 collisionless massive particles in a periodic cube. It uses a fixed deterministic set of initial positions and exact free trajectories. Each detector spans an internal plane of area L². Crossing times are counted from intersections with the translated planes of the periodic domain. Positive and negative crossing directions multiply the carried component before division by area and time. A latest-crossing line exposes one signed contribution. The volume moment and finite-time detector estimate are displayed separately; no smoothing forces agreement.

All velocities are below c. Units are L, L/c, mc, and mc²; all displayed tensor entries are scaled by mc²/L³. The time row gives densities with the required c conversion for momentum, while the spatial energy entries give energy flux divided by c. The first index is the direction crossed, the second the quantity carried, consistently with the manuscript. This model is symmetric, so the alternative index interpretation in some sources has the same numerical matrix.

The figure shows the actual three-dimensional positions in a fixed orthographic projection. The detector can move and change normal direction. Trails and crossing flashes follow the same particles used in the tally. The six-direction distribution has an isotropic second moment, but is not represented as a thermal equilibrium calculation. Viscosity, collisions, observer changes, and a movable subvolume are not supplied by this initial particle experiment. The continuum-fluid and boosted-observer work remain separate tasks.

Sources checked: [Bertschinger, Number-Flux Vector and Stress-Energy Tensor](https://web.mit.edu/edbert/GR/gr2b.pdf), and [Tong, Fluid Mechanics](https://www.damtp.cam.ac.uk/user/tong/fluids/fluids1.pdf). Implementation and drawings are original.

Validation:

- Mass-shell relation, full tensor symmetry and trace, equal diagonal pressures with zero momentum density, and the sign of tilted-stream off-diagonal flux.
- Detector counts checked against independently solved crossing times, including a negative-direction crossing exactly at the end of the interval.
- Long-time detector estimates converge to the volume moments with an explicit finite-count error bound. Particle energies and momenta remain fixed along the free trajectories.
- All 16 row/column selections, three preparations, live keyboard/slider changes, reset and saved-state restoration, playback, both themes at 1440/390 widths, and disclosures without JavaScript.
- Visual review caught and fixed the clipped z label, legend-color specificity, and separated momentum subscripts. Annotation bounds and distinct legend colors are now checked.
- Build, site/link checks, and novice-sequence checks passed.

The particle model establishes the measurement meaning of the tensor. It does not complete the full Chapter 11 visual roadmap.
