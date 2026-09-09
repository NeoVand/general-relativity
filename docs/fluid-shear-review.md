# Fluid layers, shear forces, and momentum flux

A second Chapter 11 experiment now introduces viscosity before the perfect-fluid approximation. It compares steady Couette flow driven by a moving plate with steady plane Poiseuille flow driven by a pressure gradient. Passive dye markers, velocity arrows, a linked velocity profile and a movable cut use the same analytic solution.

The two gold arrows act on different fluid regions and obey action–reaction. The positive shear readout is the force per area exerted on the fluid below the cut by the fluid above it. The flux of x-momentum toward positive y is its negative. The text derives this sign from the direction in which momentum enters the lower region, then relates it to Πᵢⱼ = ρvᵢvⱼ + pδᵢⱼ − τᵢⱼ and to Cauchy stress. Dye is explicitly a tracer of mean motion, not a molecular simulation of shear.

The scenes use H = 0.02 m, a 0.12 m viewing window, constant dynamic viscosity, no slip and steady incompressible unidirectional flow. Control changes select steady solutions, rather than pretending to show startup transients. Height is exaggerated in the drawing and labeled. A repeating train of dye markers passes through the window. Time is in physical seconds and plays at one tenth speed. Pressure readings are gauge pressures relative to a constant background; pressure differences drive the flow.

Two comparisons are explained directly: increasing viscosity at a fixed plate speed increases force but preserves the velocity profile; increasing viscosity at fixed pressure gradient slows flow while preserving the shear profile. The center of the pressure-driven channel has maximum speed and zero shear. The cut can cross that point to reveal the sign reversal.

Validation:

- An independent tridiagonal finite-difference solution of μu″ + G = 0 matches the analytic profiles for positive, zero and negative drives, both models, and the viscosity range.
- Wall velocities, pressure differences, force/flux signs, integrated volume flow and work/dissipation balance pass. The latter compares the moving wall's work or pressure work with integrated μ(u′)².
- Browser checks cover both modes/themes at 1440/390 widths, annotation bounds, aligned pressure/viscosity sliders, the zero-shear crossing, live viscosity changes, playback, saved-state restoration, reset and all derivations without JavaScript.
- Visual review corrected phone control wrapping, axis-label placement, stale mode instructions, small chart labels and the velocity-profile width.
- Build, link/site checks, novice sequence checks and Svelte diagnostics pass.

Sources: [Tong, Fluid Mechanics](https://www.damtp.cam.ac.uk/user/tong/fluids/fluids.pdf), and [Cambridge, Fluid Dynamics II](https://www.damtp.cam.ac.uk/user/examples/D23Le.pdf). The implementation and drawings are original.

This completes the planned elementary continuum comparison. Observer-dependent tensor readings, a movable particle subvolume, and a broader field-energy visual remain outstanding in Chapter 11.
# Phone control alignment follow-up

The Linux browser run exposed a wrapped value in the moving-plate control at phone width, shifting its slider below the viscosity slider. Each label/value pair now uses separate grid columns, and neighboring control groups align their sliders at the bottom even when a label needs another line. Both physical models and the full browser checks pass locally. Additional inspection at 320/390 px with wider fallback glyphs verifies both rows remain aligned. The deployment run must still confirm the Linux result.
