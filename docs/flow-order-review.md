# Flow order before torsion

Review found that §7.2 used the Lie bracket without prior teaching and referred to a flat-plane example that did not exist. New §6.6 supplies that example, introduces flows and their parameter, derives the bracket from the leading endpoint difference, and relates it to the commutator on scalar functions. An optional calculation distinguishes the commuting polar coordinate fields from the noncommuting polar unit frame. §7.2 now links to the actual preparation.

The experiment compares exact flows of X=(1,0) and Y=(0,x), starting at (1,0). The same parameter step h is used for both fields. X then Y ends at (1+h,h+h²), whereas Y then X ends at (1+h,h). The plotted gap is h², and the bracket is the upward vector (0,1). Coordinates and the flow parameter are explicitly dimensionless. This is a prescribed mathematical flow, not a fluid simulation or a claim about physical clocks.

Both routes appear on one fixed grid, with endpoint labels, a gap bracket and the sampled Y field. Playback shows the two moves; the final endpoint markers remain outlined as references. The view precedes the bracket formula. It explicitly explains why a nonzero bracket of these fields does not indicate curvature or torsion of the flat plane.

Tests independently integrate the two fields, check the sign and h² scaling of the endpoint gap, and check continuity between stages. Browser checks cover 390 px and 1440 px, both themes, labels at small and large steps, keyboard, playback, saved-state recovery and the static diagram. They also check that the play button uses the shared border reset and that the phone sliders align. Site and prerequisite-sequence checks pass. Screenshots are under `qa/flow-order-*`.

Reference for the general bracket formula: [Tong, differential geometry](https://www.damtp.cam.ac.uk/user/tong/gr/grhtml/S2.html). The example, implementation and drawing are original.
