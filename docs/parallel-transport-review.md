# Continuous parallel transport

The experiment in §7.1 connects a concrete carrying rule to the connection equation. The chapter first introduces a flat-sheet arrow, then a rolled sheet, then the sphere. It defines a great circle before using the term. Chapter 8 returns to the experiment to introduce holonomy and the small-loop, per-area meaning of curvature.

## Model

The plane keeps a direction constant. The cylinder uses a constant unit-frame direction on its unrolled sheet, mapped through the exact embedding. On the sphere, each side is an exact great-circle rotation. The path is piecewise geodesic, with no artificial rotation of the carried vector at a corner. The mesh path is evaluated from the same model along each separate leg, without fitting a spline across corners.

The size control shrinks the loop toward its fixed starting point. The radius changes physical area and curvature on the sphere while preserving angular size. A separate reverse control reverses the traversal with the original vertex labels preserved. The readout explicitly reports the rotation **on return**, rather than attributing the complete-loop rotation to a partially travelled path.

Tests integrate the induced-connection ODE independently. On the sphere, the numerical integration uses normalized chord interpolation, a different parameterization from the exact rotation. No projection or normalization of the integrated vector is used. The tests verify tangency and length, the octant’s 90-degree return, agreement with spherical excess, radius/area scaling, and recovery after retracing the route. Positive angle is defined by the outward-normal right-hand rule.

## Presentation

The main view is a rotatable shaded surface with a carried arrow, starting reference, tangent-plane patch, complete route and vertex labels. The default sphere camera sees all three vertices. The surface grid is shaded onto one mesh with screen-space antialiasing, avoiding competition between coincident surface and grid meshes. An orthographic camera uses fixed bounds while orbiting; changing a radius changes the drawn radius rather than causing the camera to compensate.

The controls and measurements sit beside the scene on wide screens and below it on narrow screens. “Look straight at A” gives an undistorted view of the initial tangent plane. A browser assertion checks that the projected octant return vectors are perpendicular in that view and that orbiting leaves the frustum unchanged. Orbit controls are reconstructed when changing the camera’s up direction, as required by their initialization behavior.

An exact, labeled SVG diagram remains available without JavaScript or WebGL. Hidden route portions are determined from the surface normal and view direction and drawn as continuous dashed paths. Camera-only actions are disabled when unavailable. Numerical controls and the static geometric explanation continue after a WebGL context loss.

Browser checks cover all three surfaces, both themes, 390 px and 1440 px widths, corner stepping, reverse, radius and loop size, keyboard orbit, face-on projection, playback, visibility pause, saved-state recovery, context loss and static disclosures. Screenshots are saved under `qa/transport-*`. Local site and prerequisite-sequence checks also pass. These checks verify the implementation; they do not replace learner testing.

Mathematical references: [Tong, parallel transport](https://www.damtp.cam.ac.uk/user/tong/gr/grhtml/S3.html) and [Crane, differential geometry notes](https://www.cs.cmu.edu/~kmcrane/Projects/DDG/paper.pdf). The implementation and illustrations are original.
