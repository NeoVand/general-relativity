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

## Two prescribed routes to a common endpoint

Chapter 8 now opens with an independent arrow carried directly A→C and a second carried A→B→C. This is explicitly distinguished from Chapter 6's two-flow experiment, whose endpoints differ. The two-route scene compares directions only at C, uses the same exact transport kernel as the loop experiment, and lets the learner replay both journeys, shrink the enclosed region, change radius, and compare the plane, rolled sheet and sphere. Progress is a fraction of each route length, not equal physical speeds. The default is the completed sphere comparison so the effect is visible immediately.

The direct arc is blue, the route via B pink. At C, a gold arc labels the angle and a face-on camera view removes foreshortening. Camera scale stays fixed during orbit. Both vectors keep unit length; equal directions overlap on intrinsically flat surfaces. The static fallback uses a view from which C is visible, retaining both arrows when WebGL or JavaScript is unavailable.

Validation: independent RK4 integration of the no-twist equation along both routes, coincident endpoints, vector norm and tangency over each journey, equality with closed-loop holonomy, full-octant 90° result, and radius/area scaling. Browser checks cover all three surfaces, both themes, 1440/390 widths, the actual angle marker and face-on perpendicularity, keyboard orbit and controls, playback, state restoration and static rendering. The shared loop tests also exercise reversal, context loss and reset.

A reload test exposed a visibility-handling defect: the newer transport and flow callbacks read the first entry in a batch rather than the latest. They now use the latest entry. A browser test deliberately delivers a stale hidden entry before a visible entry and verifies that 3D loads. The final full transport run passed. Site links, sequence checks and Svelte diagnostics also passed.
