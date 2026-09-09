# General Relativity, From the Inside Out

### How clocks, light, and falling objects reveal gravity

## Begin with measurements

**For a reader with basic calculus and linear algebra.** Chapter 0 builds the needed mechanics, partial derivatives, differential equations, and flux accounting. You do not need a prior course in physics or relativity. The geometric language is developed as it becomes useful. Later chapters extend the same measurement questions into graduate material; each new mathematical tool needs its own explanation.

Begin with a ruler, a clock, and a moving object. By the end, we want to calculate what clocks record near stars, how falling bodies move relative to one another, and what light can tell us about the universe. Einstein's equation will become useful after we have built the ideas it connects.

[Start with measurements and motion in Chapter 0](#chapter-0), or use the route guide below to find a refresher.

## How to travel through this book

Read with a pencil and occasionally pause to predict the next step. What quantity should the answer measure? Which direction should an object move? As new notation is introduced, use it to check your reasoning.

Begin with Chapter 0 if mechanics or multivariable calculus is unfamiliar. Use its five checks to decide which refreshers you need. The recommended course runs through Chapters 0–19 and finishes with Chapter 24. Chapters 20–23 are optional deeper trails; their introductions explain the physical questions and identify additional mathematical or quantum input. Chapter 24 is the main course's synthesis, not an optional prerequisite for those trails.

| Route | Read | What it builds |
|---|---|---|
| The main course | Chapters 0–19, then 24; add 20–23 when their questions interest you | A connected foundation, applications, and a final metric-to-measurement calculation |
| The equation route | Chapter 0's checks, then Chapters 1–15 and 24 | The meaning of every term and the action derivation; Chapter 1 supplies the motivation |
| The applications route | Chapters 0–12, then 15–19 and 24; return to 13–14 for the full action derivation | Clocks, tides, matter, black holes, waves, and cosmology with their tensor and curvature prerequisites intact |

For the applications route, the opening action argument in §15.2 may be read as a preview; §15.4's symmetry and conserved-current calculation is the immediate tool for later applications. A shorter tour through Chapters 1, 3–5, and 16–19 can give you the physical questions, but it skips mathematical dependencies. Treat that as a preview, not as a promise that every displayed calculation will already be within reach.

Do some exercises while the corresponding ideas are fresh rather than saving all of Appendix A for the end. After Chapter 2, try A.1; after Chapter 4, A.2; after Chapter 7, A.4 and A.6; after Chapter 10, A.9. Each problem asks you to use an operation, which is a stronger check than recognizing its finished formula.

**Analogies are scaffolding.** A good analogy reveals a relationship. It does not provide a license to import every feature of the familiar object. A map can help distinguish a coordinate choice from the place being described; a rotating compass can help explain changing components. Each comparison has limits that the calculation must make clear.

**“Derive” has several meanings.** We can derive a consequence from assumptions, derive an equation from a chosen action, or motivate why that action is a good low-energy model. These are different accomplishments. General relativity is not forced on us by pure logic or by the equivalence principle alone. Its assumptions must meet experiment.

**About the sources.** The explanations, analogies, and worked calculations are written as an independent tutorial. Links identify historical evidence, research results, and places to pursue particular ideas; the book is not a paraphrase of a single textbook. The final reading guide distinguishes foundational notes from original research. Exact contemporary parameter estimates and speculative claims are deliberately unnecessary to the main argument.

<details class="course-conventions" data-no-narration>
<summary>Notation reference for returning readers</summary>

### Conventions used in later chapters

Books differ in their sign and unit conventions. Compare those choices before comparing component formulas. This book uses the following conventions.

| Symbol or convention | Meaning |
|---|---|
| Metric signature | $(-,+,+,+)$ |
| Coordinates | $x^\mu=(ct,x,y,z)$ when using standard SI component formulas; special charts explicitly say when they use $t$ |
| Indices | Greek $\mu,\nu,\ldots=0,1,2,3$; spatial Latin $i,j,\ldots=1,2,3$ |
| Summation | A repeated upper–lower pair is summed unless stated otherwise |
| $g_{\mu\nu}$ and $g^{\mu\nu}$ | Metric matrix and its inverse, not componentwise reciprocals |
| $g$ | $\det(g_{\mu\nu})$, negative for a nondegenerate Lorentzian metric in four dimensions |
| $G_N$ | Newton's gravitational constant |
| $G_{\mu\nu}$ | Einstein tensor, $R_{\mu\nu}-\tfrac12Rg_{\mu\nu}$ |
| $\epsilon$ | Rest-frame energy density, in joules per cubic metre |
| $\rho$ | Mass-equivalent density $\epsilon/c^2$, when that notation is used |
| $p$ | Pressure; it has the same dimensions as energy density |
| $u^\mu$ | Four-velocity $dx^\mu/d\tau$, with $u^\mu u_\mu=-c^2$ |
| $\Lambda$ | Cosmological constant, with dimensions inverse length squared |
| Natural units | A section using $c=1$ says so; powers of $c$ return for physical numerical results |

Our curvature convention is

$$
R^\rho{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^\rho{}_{\nu\sigma}
-\partial_\nu\Gamma^\rho{}_{\mu\sigma}
+\Gamma^\rho{}_{\mu\lambda}\Gamma^\lambda{}_{\nu\sigma}
-\Gamma^\rho{}_{\nu\lambda}\Gamma^\lambda{}_{\mu\sigma},
$$

with

$$
[\nabla_\mu,\nabla_\nu]V^\rho
=R^\rho{}_{\sigma\mu\nu}V^\sigma,
\qquad
R_{\mu\nu}=R^\rho{}_{\mu\rho\nu}.
$$

This reference collects notation taught in Chapters 2–14. With these conventions, a round two-sphere has positive scalar curvature.

The physical point-particle action is $S=-mc^2\int d\tau$. In coordinates with $x^0=ct$, our gravitational action is

$$
S_{\mathrm{EH}}=
\frac{c^3}{16\pi G_N}
\int d^4x\,\sqrt{-g}\,(R-2\Lambda),
$$

and the stress tensor is normalized by

$$
\delta S_m=-\frac{1}{2c}\int d^4x\,\sqrt{-g}\,
T_{\mu\nu}\,\delta g^{\mu\nu}.
$$

The action is called **Einstein–Hilbert**, after Einstein and David Hilbert. The determinant, inverse-metric variation, boundary terms, and factors of $c$ will all get their own explanations.

Coordinate units: angular coordinates are dimensionless. In $ds^2=dr^2+r^2d\theta^2$, $g_{\theta\theta}=r^2$ has dimensions of length squared. It is the whole line element that must have the correct units, not every coordinate component separately.


</details>

## Contents

- [0. Measurements and motion](#chapter-0)
- [1. Gravity, free fall, and clocks](#chapter-1)
- [2. Vectors, covectors, and tensors](#chapter-2)
- [3. Special relativity: learning what a clock is actually measuring](#chapter-3)
- [4. Spacetime as a manifold: maps, rulers, and the geometry beneath them](#chapter-4)
- [5. Free fall, the equivalence principle, and the worldline action](#chapter-5)
- [6. Differentiation in a changing basis](#chapter-6)
- [7. The connection: how neighboring laboratories compare directions](#chapter-7)
- [8. Curvature and transport around a loop](#chapter-8)
- [9. Ricci, Weyl, and Einstein: different questions asked of curvature](#chapter-9)
- [10. Tides: how to measure curvature without seeing spacetime from outside](#chapter-10)
- [11. Energy, momentum, and stress](#chapter-11)
- [12. Einstein's field equation](#chapter-12)
- [13. Variational calculus for paths and fields](#chapter-13)
- [14. Deriving Einstein’s equation from an action](#chapter-14)
- [15. Symmetry, conservation, and vacuum energy](#chapter-15)
- [16. Turning geometry into experiments: clocks, light, and Mercury](#chapter-16)
- [17. Black holes: horizons, falling clocks, and orbits](#chapter-17)
- [18. Gravitational waves: from moving masses to a detector](#chapter-18)
- [19. Cosmology: Einstein's equation for the large-scale universe](#chapter-19)
- [20. Initial data, constraints, and numerical relativity](#chapter-20)
- [21. Local laboratory frames and differential forms](#chapter-21)
- [22. Focusing, singularities, and black-hole thermodynamics](#chapter-22)
- [23. Gravity as an effective theory and its open questions](#chapter-23)
- [24. Calculating and interpreting a spacetime](#chapter-24)
- [Appendix A. Thirty exercises that turn recognition into understanding](#appendix-a)
- [Appendix B. A working reference sheet](#appendix-b)
- [Appendix C. A plain-language glossary](#appendix-c)
- [Appendix D. Where to go next](#appendix-d)
- [Appendix E. Index practice and three extra calculations](#appendix-e)



---

<a id="chapter-0"></a>

## 0. Measurements and motion

Watch a small cart move along a straight track. Mark its position with a ruler and record the time with a clock. From those readings, can we work out how fast it is moving—and predict where it will be a moment later?

We will use this experiment to connect calculus with motion. Then we will add the ideas of force, energy, and flow that we need for gravity. If you have studied mechanics before, you can start with the five checks in §0.9.

### 0.1 A derivative is a local prediction

Choose a mark on the track as the starting position and call it $x=0$. The number $x$ tells us how far the cart is from that mark, with positive values to the right. Start the clock at $t=0$. Suppose the measurements follow this pattern:

| Time $t$ in seconds | Position $x$ in metres |
|---|---|
| 0 | 0 |
| 1 | 3 |
| 2 | 12 |
| 3 | 27 |

During successive seconds the cart travels 3, then 9, then 15 metres. It is speeding up. One formula that fits these measurements is

$$
x(t)=At^2,\qquad A=3\,\mathrm{m/s^2}.
$$

Four readings do not prove that this formula works at every time. We will use it as a model and see what it predicts.

The coefficient $A$ has units too: multiplying metres per second squared by seconds squared gives metres. A **unit** specifies what we count, such as metres or seconds. The **dimension** describes the kind of quantity, such as length or time. Metres and centimetres are different units of the same dimension.

The cart's **velocity** is its rate of change of position, including direction. Its **acceleration** is the rate of change of velocity:

$$
v(t)=\frac{dx}{dt}=2At,\qquad a(t)=\frac{dv}{dt}=2A.
$$

At $t=2\,\mathrm s$, these give $x=12\,\mathrm m$, $v=12\,\mathrm{m/s}$ and $a=6\,\mathrm{m/s^2}$. The velocity predicts the next small change. Over $\Delta t=0.1\,\mathrm s$, it predicts an extra $v\Delta t=1.2\,\mathrm m$. The exact change is $A[(2.1\,\mathrm s)^2-(2\,\mathrm s)^2]=1.23\,\mathrm m$. The extra $0.03\,\mathrm m$ comes from the increase in velocity during that tenth of a second.

Taylor's formula keeps track of that correction:

$$
x(t+\Delta t)=x(t)+v(t)\Delta t+\frac12a(t)(\Delta t)^2+\cdots.
$$

The symbol $\Delta$ means a change; the dots stand for higher powers of that change. For this quadratic motion the displayed expression is exact. For a general smooth motion, keeping only the velocity term gives a local approximation. Shorten the time step, and the acceleration correction shrinks faster than the velocity contribution. **A derivative predicts a small change, not a whole future at one fixed rate.**

### 0.2 Partial derivatives: change one input at a time

Suppose a calculator takes two numbers and returns $f(x,y)=x^2+3y$. Here $x$, $y$, and $f$ are dimensionless numbers. There are two different ways to change its output: change $x$, or change $y$.

The **partial derivative** $\partial f/\partial x=2x$ holds $y$ fixed and differentiates with respect to $x$. The other partial derivative is $\partial f/\partial y=3$. We also write them as $\partial_x f$ and $\partial_y f$. The symbol $\partial$ is a derivative with an instruction about what to hold fixed.

If a path through the inputs supplies $x=x(s)$ and $y=y(s)$, both can change. The chain rule adds their contributions:

$$
\frac{df}{ds}=\frac{\partial f}{\partial x}\frac{dx}{ds}
+\frac{\partial f}{\partial y}\frac{dy}{ds}.
$$

Try $x=s$, $y=s^2$, with dimensionless $s$. Substitution gives $f=4s^2$, so $df/ds=8s$. The chain rule gives $(2s)(1)+(3)(2s)=8s$ too. Later we will use the same operation when a measurement depends on where and when we make it.

### 0.3 An integral adds local measurements

Water flows into an initially empty tank at a rate $q(t)$. The rate is measured in litres per second. If it is nearly constant during a short time $\Delta t$, the added volume is approximately $q(t)\Delta t$. Add the contributions from many short time steps. An **integral** is the limit as those steps become arbitrarily fine:

$$
V(T)=\int_0^T q(t)\,dt.
$$

For $q(t)=bt$ with $b=2\,\mathrm{litres/s^2}$, the flow increases steadily. After three seconds,

$$
V(3\,\mathrm s)=\left[\frac12bt^2\right]_0^{3\,\mathrm s}=9\,\mathrm{litres}.
$$

The brackets mean evaluate at the upper limit and subtract the value at the lower limit. The $dt$ contributes a time unit: flow rate multiplied by time gives volume. This is why checking units is part of understanding an integral.

The same addition works across a region of space. **Mass density**, written $\rho$, is mass per volume. A small piece of volume $dV$ contains approximately $\rho\,dV$ of mass. Adding all the pieces gives $M=\int\rho\,dV$. For a uniform density $2\,\mathrm{kg/m^3}$ in a rectangular box of volume $3\,\mathrm{m^3}$, the integral is simply $M=6\,\mathrm{kg}$.

### 0.4 A differential equation needs starting measurements

Near Earth's surface, an ideal falling ball speeds up downward at nearly $g=9.8\,\mathrm{m/s^2}$. Ignore air resistance and restrict attention to heights small compared with Earth's radius. Choose upward as the positive $x$ direction. Its acceleration is then negative:

$$
\frac{d^2x}{dt^2}=-g.
$$

This is a **differential equation**: it specifies a derivative of the unknown function $x(t)$. Integrate once and then again:

$$
v(t)=v_0-gt,\qquad x(t)=x_0+v_0t-\frac12gt^2.
$$

The two constants have physical meanings: starting position $x_0$ and starting velocity $v_0$. For a ball released from rest 20 metres above the ground, set $x_0=20\,\mathrm m$ and $v_0=0$. After one second, the formulas give $x=15.1\,\mathrm m$ and $v=-9.8\,\mathrm{m/s}$. The negative velocity means downward motion. The model describes the fall until the ball hits the ground.

The acceleration law alone does not say whether the ball was dropped, thrown up, or thrown down. Those choices give different motions that obey the same law. **A law plus starting measurements gives a prediction.**

### 0.5 The mechanics we will use

A **force** is a push or pull, such as a floor pushing on your shoes. To calculate what it does, introduce **momentum** $\mathbf p=m\mathbf v$: mass times velocity. Bold symbols here are arrows with a magnitude and a direction. In Newton's mechanics the total force changes momentum:

$$
\mathbf F=\frac{d\mathbf p}{dt}=m\mathbf a
\quad\text{for constant mass}.
$$

The force unit is the newton: $1\,\mathrm N=1\,\mathrm{kg\,m/s^2}$. These equations describe ordinary speeds well; Chapter 3 develops their relativistic replacements.

Push a cart with a constant force of 6 newtons while it moves 2 metres in the direction of the push. The force transfers $6\times2=12$ joules of energy to the cart. This transfer is called **work**. For a force along a straight track,

$$
W=\int_{x_A}^{x_B}F(x)\,dx.
$$

A force in the direction of motion does positive work; a force opposing the motion does negative work. One **joule** is one newton metre, so $1\,\mathrm J=1\,\mathrm{kg\,m^2/s^2}$.

Where does this energy appear? For a cart of constant mass whose wheels have negligible mass, use $F=ma$ and $v=dx/dt$:

$$
\frac{d}{dt}\left(\frac12mv^2\right)=mv\frac{dv}{dt}=Fv=\frac{dW}{dt}.
$$

Thus the work changes the quantity $K=mv^2/2$, called **kinetic energy**. If our cart starts at rest and no other force does work, it gains 12 joules of kinetic energy. For a mass of 6 kilograms, $mv^2/2=12\,\mathrm J$ gives $v=2\,\mathrm{m/s}$.

A thrown ball gives us another way to store energy. As it rises, gravity does negative work and the ball loses kinetic energy. Near Earth's surface, we assign it **gravitational potential energy** $U=mgh$, where $h$ is its height above a chosen zero. A rise of $\Delta h$ increases $U$ by $mg\Delta h$, exactly the kinetic energy lost to gravity. Ignoring air resistance, $K+U$ stays constant. On the way down, the exchange reverses.

A spring lets us watch this exchange repeatedly. Attach a cart to a spring on a level, frictionless track. Call its displacement from the unstretched position $q$, positive to the right. A stretched spring pulls the cart left; a compressed spring pushes it right. Its **stiffness** $k$ is the restoring force per metre of displacement. The experiment starts with a 1 kg cart, a stiffness of 1 N/m, and a stretch of 1 metre.

Release the cart and follow the two energy amounts. At the middle, the spring is unstretched but the cart is moving. At either end of the motion, the cart is momentarily at rest but the spring stores energy. The cart's momentum changes sign when it reverses; its kinetic energy remains nonnegative.

<div data-mechanics-insert="energy"></div>

For this ideal spring the force is $F=-kq$, called **Hooke's law**. To stretch it slowly, we apply the opposite force, $kq$. The work stored in the spring is

$$
U(q)=\int_0^q kx\,dx=\frac12kq^2.
$$

This also gives positive stored energy for compression, where $q<0$: our applied force and displacement both point left. The default stretch stores $0.5\,\mathrm J$. At the middle, all of that energy is kinetic, so $mv^2/2=0.5\,\mathrm J$ gives a speed of $1\,\mathrm{m/s}$. On successive passes the momentum is $+1$ or $-1\,\mathrm{kg\,m/s}$, although the kinetic energy is the same. A real spring can dissipate energy into heating; this experiment omits that effect so the exchange is visible on its own.

More generally write $U=m\Phi$, where $\Phi$ is potential energy per unit mass. Outside a spherical body of mass $M$,

$$
\Phi(r)=-\frac{G_NM}{r},\qquad
\mathbf a=-\boldsymbol\nabla\Phi.
$$

Here $r$ is distance from the center and $G_N$ is Newton's gravitational constant. This choice makes $\Phi$ approach zero far away. This is Newton's model; the near-Earth experiments here lie in its useful range. Later chapters quantify its limits at high speeds and near very compact massive objects. The **gradient** $\boldsymbol\nabla\Phi$ is the arrow whose Cartesian components are the partial derivatives of $\Phi$. It points toward fastest increase. For this spherical example, differentiating with respect to $r$ gives $d\Phi/dr=G_NM/r^2$. The minus sign in the acceleration law therefore gives inward acceleration of magnitude $G_NM/r^2$.

**Pressure** is force per area. A gas exerts pressure on a wall because collisions transfer momentum to it. The pressure unit is the pascal, $1\,\mathrm{Pa}=1\,\mathrm{N/m^2}$. Pressure will matter when we ask how fluids move and how they affect gravity. The worked example below first shows how pressure can transfer energy.

### 0.6 Measuring with matrices

A map uses one metre per horizontal square and two metres per vertical square. An instruction to move two squares right and one square up has map components $v=(2,1)$, but its physical displacement is two metres right and two metres up. Pythagoras gives squared length $2^2+2^2=8$ square metres.

We can keep the map components and let a matrix carry the scale factors. With distances expressed in metres, define

$$
M=\begin{pmatrix}1&0\\0&4\end{pmatrix},\qquad
v^{\mathsf T}Mv=(2)(2)+4(1)(1)=8.
$$

The superscript $\mathsf T$ means transpose: turn the column into a row for matrix multiplication. The vertical scale factor is squared because we are computing squared length. If the second instruction is $w=(1,3)$, their physical dot product is

$$
v^{\mathsf T}Mw=(2)(1)+4(1)(3)=14
$$

in square metres. The same rule accepts two arrows as inputs. Double either input while holding the other fixed, and the result doubles; adding two arrows in one input adds their results. These two properties are what **linear in each input** means. A rule with this property is called a **bilinear form**.

Squared length uses the same arrow in both inputs. Doubling that arrow doubles both inputs, so its squared length becomes four times as large. This is why a bilinear rule can describe lengths even though length squared is not linear in the arrow.

An inverse matrix undoes a linear map. It is not obtained by taking the reciprocal of every entry. For example,

$$
\begin{pmatrix}2&1\\1&2\end{pmatrix}^{-1}
=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

Multiply them to check that the diagonal entries become one and the other entries zero. The result is the identity matrix, which leaves every input unchanged.

### 0.7 Flow through a box: flux and divergence

Imagine water flowing through an imaginary box. Let the arrow $\mathbf J$ describe the mass crossing a unit area per unit time, in $\mathrm{kg/(m^2s)}$. This is a **flux density**. Only the part of the flow perpendicular to a face crosses that face. Multiply that component by the face area to obtain a mass flow rate.

For a numerical example, suppose 10 kilograms per second enter a one-cubic-metre box and 12 kilograms per second leave it. The box loses 2 kilograms each second. Its average mass density therefore decreases at $2\,\mathrm{kg/(m^3s)}$.

To describe a small box at any position, let its side lengths be $\Delta x,\Delta y,\Delta z$. Write $J^x$ for the flux-density component pointing along $x$; the superscript is a direction label, not a power. The left and right faces each have area $\Delta y\Delta z$, so their net outward flow is

$$
\begin{aligned}
&[J^x(x+\Delta x)-J^x(x)]\,\Delta y\Delta z\\
&\simeq(\partial_xJ^x)\,\Delta x\Delta y\Delta z.
\end{aligned}
$$

The approximation is the local derivative rule from §0.1. Repeat it for the other two pairs of faces, add the results, and divide by the box's volume. As the box shrinks, the result is

$$
\boldsymbol\nabla\cdot\mathbf J
=\partial_xJ^x+\partial_yJ^y+\partial_zJ^z.
$$

This quantity is **divergence**, the net outflow per volume. Its units here are $\mathrm{kg/(m^3s)}$. If more mass leaves than enters, the density $\rho$ inside decreases. Local conservation of mass is therefore

$$
\partial_t\rho+\boldsymbol\nabla\cdot\mathbf J=0.
$$

Add this accounting over many little boxes. Flow across a shared face is outflow from one box and inflow to its neighbor, so it cancels. Only the outer boundary remains. That cancellation is the idea behind the **divergence theorem**: total divergence over a volume equals net flux through its boundary.

### 0.8 Estimating with a small parameter

Suppose we need $\sqrt{1.04}$. It is close to $\sqrt1=1$. How much should we add? Let $f(q)=\sqrt{1+q}$. Its value at zero is 1 and its derivative there is $f'(0)=1/2$. The local prediction from §0.1 gives $f(q)\simeq1+q/2$, so $\sqrt{1.04}\simeq1.02$.

The symbol $\simeq$ means approximately equal. Here $q=0.04$ is a dimensionless fractional change. The same method gives several useful estimates:

$$
\sqrt{1+q}\simeq1+\frac q2,\qquad
\frac1{1-q}\simeq1+q,\qquad e^q\simeq1+q.
$$

Each approximation discards terms beginning at order $q^2$. For $q=0.01$, those terms are on the scale of $10^{-4}$, though the coefficient depends on the function. “Small” requires a comparison: an extra centimetre compared with one metre is the ratio $0.01$. An extra centimetre compared with a millimetre is not small.

Check dimensions before arithmetic. An acceleration must have length/time squared units on both sides of its equation. A distance and a time cannot be added directly. Different units of the same dimension, such as metres and centimetres, must first be expressed consistently. These checks often catch a mistake before a page of algebra does.

### 0.9 Check your understanding

Try these before revealing the answers. They test operations taught above.

<details class="checkpoint"><summary>1. If $x(t)=Bt^3$ with $B=2\,\mathrm{m/s^3}$, what are its velocity and acceleration?</summary>

$v=3Bt^2$ and $a=6Bt$. At $t=1\,\mathrm s$, these are $6\,\mathrm{m/s}$ and $12\,\mathrm{m/s^2}$. The units of $B$ make both dimension checks work.

</details>

<details class="checkpoint"><summary>2. For $f(x,y)=xy^2$, what is $df/ds$ along $x=s$, $y=2s$? All inputs are dimensionless.</summary>

Substitution gives $f=4s^3$, so $df/ds=12s^2$. The chain rule gives $y^2(1)+2xy(2)=4s^2+8s^2$, the same result.

</details>

<details class="checkpoint"><summary>3. A tank receives water at $2\,\mathrm{litres/s}$ for three seconds. How much volume is added?</summary>

$\Delta V=\int_0^{3\,\mathrm s}(2\,\mathrm{litres/s})dt=6\,\mathrm{litres}$. The time unit cancels the rate's denominator.

</details>

<details class="checkpoint"><summary>4. Why does $d^2x/dt^2=-g$ fail to specify one particular throw?</summary>

It specifies acceleration but leaves starting position and starting velocity free. Integrating twice exposes those two constants.

</details>

<details class="checkpoint"><summary>5. Estimate $\sqrt{1.04}$ to first order. What is the small parameter?</summary>

Write $1.04=1+q$ with $q=0.04$. Then $\sqrt{1.04}\simeq1+0.04/2=1.02$. Squaring this estimate gives $1.0404$, close to the original input. The first discarded term in the square-root expansion is $-q^2/8=-0.0002$.

</details>

Chapter 1 uses these ideas to ask a new question: what would a scale read if you and the scale were falling together?


<a id="chapter-1"></a>

## 1. Gravity, free fall, and clocks

### 1.1 Why does a falling scale read zero?

Stand on a spring scale. Its spring compresses because it supports you. The scale measures the force with which it pushes on your feet; its familiar kilogram display converts that force using Earth's usual surface gravity. Your mass and this supporting force are different quantities.

Now imagine you and the scale inside a cabin that is falling freely. This is a thought experiment: ignore air resistance, rotation, and any contact with the outside. You, the scale, and the cabin all fall together. The scale no longer needs to support you, so its reading drops to zero. Your mass has not vanished. Neither has Earth.

This is **weightlessness**: the absence of a supporting force. **Free fall** means motion with no rocket thrust, floor, or other nongravitational push. It need not mean falling straight down; an orbiting spacecraft can be in free fall too.

An **accelerometer** makes a related measurement. Imagine a small test mass suspended by springs inside a case. When the case pushes the mass away from its natural free fall, the springs deform. Their deformation gives an acceleration reading. On the ground the reading is about $9.8\,\mathrm{m/s^2}$; in ideal free fall it is zero. We call this instrument reading **proper acceleration**. Acceleration obtained by differentiating a position on a ground-based map answers a different question. A falling ball has nonzero downward acceleration on that map while its ideal accelerometer reads zero.

So far, a small falling cabin can imitate a cabin drifting far from significant gravity. There is a more revealing experiment. Release two small test balls at rest relative to one another, with no springs joining them. Ignore their mutual attraction. Track the distance between them over time.

If the balls start side by side at the same height near Earth, their downward directions point toward the same center: they tend to approach one another. If one starts directly above the other, the lower one falls more strongly, so their separation tends to grow. These are **tidal effects**: differences in free-fall acceleration across a region. The effect is very small in a small cabin over a short time, but it is a measurable prediction.

**Predict before continuing:** could a zero scale reading establish that gravity is absent?

<details class="checkpoint"><summary>Compare your reasoning</summary>

No. The scale tests whether it must support you. Comparing two freely falling test balls tests whether free fall changes from place to place. You can have zero support and still detect a changing relative acceleration. One observer can carry out this comparison; the experiment requires two test bodies, not two people with different powers of observation.

</details>

General relativity will describe these tidal effects using **spacetime curvature**. For now, that name points to an experiment we can state without knowing its mathematics. Chapters 8–10 build and measure the corresponding geometry. The small-region qualification is essential to the equivalence principle: a finite falling room does not remove tidal effects. [Einstein Online: the equivalence principle](https://www.einstein-online.info/en/spotlight/equivalence_principle/).

### 1.2 Comparing clocks

Ordinary mechanics treats rulers and clocks as a fixed background: we first agree on distances and times, then use forces to predict motion. Relativity asks us to examine the measuring procedures too.

Imagine two identical clocks meeting, separating, and later meeting again. They can compare their elapsed times directly at reunion. Could their readings depend on their journeys? Special relativity says yes, even when gravity is negligible. Chapter 3 will derive that prediction from the measured speed of light and a careful definition of distant clock synchronization.

Gravity adds another question. Hold one clock higher above Earth than the other and compare their rates using light signals. General relativity predicts a difference even though the clocks are stationary relative to the ground. Chapter 16 will calculate it, with the clocks and comparison procedure specified.

A theory of gravity must therefore predict both falling motion and clock comparisons. **Spacetime** is our name for considering where and when things happen together. An **event** is one occurrence with a place and a time, such as a particular flash or two clocks meeting. These words help us describe the experiments; the mathematical measuring rule comes later, in Chapters 3 and 4.

The point is already concrete: a path on a map does not tell the whole story. We must also ask what a clock carried along that path records.

### 1.3 What Einstein’s equation must predict

Earth's mass affects the motion of a nearby ball. The ball also contributes, by a much smaller amount, to the gravitational situation. A complete theory must describe this mutual influence.

Einstein's equation is the rule connecting the distribution and motion of matter with the geometry that determines clock readings and free-fall behavior. Its source includes energy and pressure as well as mass. We have begun defining those quantities in Chapter 0; Chapter 11 will show how to collect the relevant measurements.

There is an essential limit to the slogan “matter determines geometry.” An empty region can still have tidal effects because matter lies elsewhere. Gravitational disturbances can also travel through an empty region. Specifying the local matter alone does not settle the whole problem: we need suitable starting and boundary information, just as an acceleration law alone did not specify a particular throw.

Chapter 12 will state the equation precisely, after we have built its ingredients. For now, its job is to connect the behavior of matter with a consistent account of clocks, light, and falling bodies.

### 1.4 Predicting motion and predicting gravity

There are two different calculations ahead of us:

1. Given a gravitational situation, predict how a test clock, a light pulse, or a freely falling object behaves.
2. Determine the gravitational situation itself from matter and suitable starting or boundary information.

A **test object** is small enough that we can neglect its effect on the situation we are studying. Predicting the fall of one small ball near Earth usually uses this approximation. Predicting two stars orbiting each other requires accounting for both stars.

We must also describe how matter behaves. Does a gas resist compression? Does it exchange heat? The gravitational equation alone does not answer those questions. We supply physical models for the matter and solve them together with gravity. A successful calculation states those assumptions and ends with a measurement we could compare with an experiment.

### 1.5 What a rubber sheet can show

You may have seen a heavy ball make a dip in a rubber sheet while smaller balls roll around it. The picture helps suggest that geometry can differ from a flat plane. It is a poor explanation of why gravity works.

The small balls roll because ordinary gravity pulls them downward; the demonstration already uses the effect it is meant to explain. It also leaves out clocks. A picture of space at one instant cannot show how elapsed times depend on a journey.

Nor does the sheet's outside room belong to the theory. In Chapter 4 we will learn how inhabitants can study a surface's geometry using measurements within it, without looking from outside.

Keep the falling cabin, the two test balls, and the two clocks as our starting experiments. A useful picture should help us predict one of those measurements. A distorted grid by itself is not evidence of gravity.

### 1.6 From free fall to a theory

A falling cabin suggests that some effects we attribute to gravity can disappear when we change how the laboratory moves. The two-ball experiment shows the limit: neighboring falls can still converge or separate. A theory has to account for both observations at once.

It also has to recover the successful predictions of Newton's theory where we have already tested them. Free fall is a clue toward a new theory, but it does not uniquely determine its equations. Clock comparisons, light propagation, and planetary motion provide further tests. We will return to these tests after developing the mathematics.

### 1.7 What comes next

Our next task is to describe the same motion using different axes without changing what is being predicted. Chapter 2 introduces vectors and the measuring rules called covectors. Chapter 3 then uses light signals to compare clocks in relative motion.

These are the first steps toward a common account of clocks and free fall. The [learning path](course-map.html) shows where the later calculations fit.

### 1.8 Try the falling-cabin experiment

Imagine three cabins. One rests on Earth, one falls freely near Earth, and one is far from significant gravity with a rocket accelerating it upward. The rocket gives its cabin the same accelerometer reading as the cabin on Earth. Each cabin contains a person standing on a scale.

<details class="checkpoint"><summary>Which scales read zero? What can the readings tell us?</summary>

The freely falling cabin's scale reads zero. The ground and the rocket each push their cabin into the person's feet, so those scales give a nonzero reading. With the stated accelerations, they give the same reading for the same person.

That scale reading alone cannot tell the person whether a planet is nearby. To investigate further, compare the motion of separated test objects or exchange signals with the outside. Near Earth, the two-ball experiment can reveal tidal effects even in the falling cabin.

</details>

### 1.9 How the theory developed

The experiments above organize our route through the subject. The historical route involved years of revisions and collaboration.

<details class="history-note" data-no-narration>
<summary>Read the illustrated history: Newton to Einstein and beyond</summary>

The order in this book is designed for learning. Discovery followed a much less direct route. Keep these two stories separate: a clean derivation tells us how ideas fit together now; a historical account asks what the people involved actually knew then.

<div class="history-grid">
<figure><a href="assets/history/newton-1689.jpg"><img src="assets/history/newton-1689.jpg" width="1162" height="1400" alt="Godfrey Kneller’s painted portrait of Isaac Newton, 1689." loading="lazy"></a><figcaption>Isaac Newton, painted by Godfrey Kneller in 1689. Public domain. <a href="https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Isaac_Newton,_1689.jpg">Source and provenance</a>.</figcaption></figure>
<figure><a href="assets/history/einstein-1921.jpg"><img src="assets/history/einstein-1921.jpg" width="1066" height="1400" alt="Albert Einstein beside a chalkboard in Vienna, photographed by Ferdinand Schmutzer in 1921." loading="lazy"></a><figcaption>Albert Einstein in 1921, photographed by Ferdinand Schmutzer. Public domain. <a href="https://commons.wikimedia.org/wiki/File:Einstein_1921_by_F_Schmutzer.jpg">Source and provenance</a>.</figcaption></figure>
</div>

**1687: one law for terrestrial and celestial motion.** Newton's *Principia* brought the motion of falling bodies and planets into the same mathematical account. His gravity was enormously successful. Its instantaneous interaction and the unexplained proportionality of inertial and gravitational mass later became productive questions, not reasons to dismiss its achievements.

**1905–1908: clocks and geometry become inseparable.** Einstein's special relativity replaced universal simultaneity with a consistent account of measurements by moving observers. Minkowski organized the theory geometrically in four-dimensional spacetime. That did not yet make the geometry dynamical.

**1907: free fall becomes the clue.** Einstein recognized the special status of a freely falling observer. The equivalence principle suggested a link between acceleration, gravitational clock shifts, and gravity. It did not by itself supply the final field equation.

**1912–1913: mathematical collaboration and a wrong turn.** Marcel Grossmann helped Einstein bring differential geometry into the problem. Their *Entwurf* theory used a mathematical rule for distances and times but had restricted gravitational equations. Recovering Newtonian gravity and deciding which changes of description those equations should permit were entangled difficulties. The route was not “notice curvature, write the answer.”

**November 1915: revision in public.** Einstein presented successive communications on November 4, 11, 18, and 25. The November 18 calculation explained Mercury's anomalous perihelion advance. The November 25 paper gave the final field equations. Hilbert was developing an action-based approach in the same period. The surviving documents matter more than a simple race narrative; a paper's submission date and the content of its later printed version are different evidence. [Einstein's November 25 paper](https://de.wikisource.org/wiki/Die_Feldgleichungen_der_Gravitation), [Norton's historical analysis](https://sites.pitt.edu/~jdnorton/papers/Einstein_field_eqn_1-4.pdf).

<div class="history-grid">
<figure><a href="assets/history/principia-1687.jpg"><img src="assets/history/principia-1687.jpg" width="1188" height="1400" alt="The printed title page of Newton’s first-edition Principia, 1687." loading="lazy"></a><figcaption>The 1687 <em>Principia</em> title page. This is an original historical publication, not a modern typeset facsimile. <a href="https://commons.wikimedia.org/wiki/File:Newton_-_Principia_(1687),_title,_p._5,_color.jpg">Public-domain source</a>.</figcaption></figure>
<figure><a href="assets/history/einstein-gr-1916.jpg"><img src="assets/history/einstein-gr-1916.jpg" width="924" height="1400" alt="Printed title page of Einstein’s 1916 separate edition of The Foundation of the General Theory of Relativity." loading="lazy"></a><figcaption>Einstein's 1916 exposition, separate-edition title page. This is not the November 1915 paper or a handwritten manuscript. <a href="https://commons.wikimedia.org/wiki/File:Einstein_Die_Grundlage_der_allgemeinen_Relativit%C3%A4tstheorie_Sonderdruck_1916_Titel.jpg">Public-domain source</a>.</figcaption></figure>
</div>

**After the field equation: interpretation remained hard.** Schwarzschild's spherical solution, expanding cosmological models, rotating black holes, gravitational radiation, and singularity theorems exposed consequences that were not obvious from the equation. Observations eventually made these subjects experimentally accessible. Chapter 18 follows one concrete landmark: the first direct gravitational-wave detection in 2015, reported in 2016. Chapter 19 explains what an expanding solution means before asking what data favor it.

Einstein and Grossmann’s work, including the unsuccessful 1913 theory, is examined in [Janssen and Renn, *Untying the Knot*](https://www.mpiwg-berlin.mpg.de/Preprints/P264.PDF).

</details>

### 1.10 Watching neighboring objects fall

The animation below draws lines between imagined small laboratories falling toward Earth. The laboratories move; the lines let us compare their positions. A changing grid does not mean that Earth consumes space.

Compare neighbors. Along the same outward radial line, the inner laboratory falls faster and the radial gap grows. Side-by-side laboratories fall toward the same center and their sideways gap shrinks. The grid makes the tidal pattern from §1.1 visible. Its motion is accelerated for display and stops at Earth's surface.

The illustration chooses one particular family of falls. Each laboratory starts from rest infinitely far away, so it already has an inward speed when it enters the scene. It does not depict objects released from rest at the edge of the picture. Starting conditions matter here just as they did for the ball in Chapter 0.

In the Newtonian approximation, the speed follows from the energy calculation in §0.5. Starting from rest infinitely far away gives total energy zero. At distance $r$ from a spherical body of mass $M$,

$$
\frac12mv^2-\frac{G_NMm}{r}=0,
\qquad v=\sqrt{\frac{2G_NM}{r}}.
$$

Here $m$ is a test body's mass and $v$ is its speed. For inward motion, distance from the center decreases, so $dr/dt=-v$. The test mass cancels: within this approximation, all of these laboratories obey the same speed rule.

The full relativistic model used by the animation has additional coordinate assumptions. Its numerical motion is not a general formula for every possible observer's speed. We return to the distinction between chosen position labels and measured speeds in Chapters 16–17. The [river-model paper by Hamilton and Lisle](https://arxiv.org/abs/gr-qc/0411060) documents that model; it is further reading, not preparation for the next chapter.

**What to read from the picture:** compare how neighboring falls change relative to one another. The connecting lines are a drawing aid. Their bend alone does not establish curvature. The [ScienceClic visualization by Alessandro Roussel](https://www.youtube.com/watch?v=wrwgIjBUYVc) motivates the moving-grid presentation.

---

<a id="chapter-2"></a>

## 2. Vectors, covectors, and tensors

### 2.1 Vectors and their components

A drone must move three metres east and four metres north. You can draw that displacement as an arrow from its starting point to its destination. Rotating the map changes the arrow's horizontal and vertical components on the screen, but the destination stays the same.

We need to distinguish the displacement from the numbers used to describe it. Choose two **basis vectors**: $e_1$, one metre east, and $e_2$, one metre north. Any displacement in this plane can be written as a unique combination of these two arrows. Our drone's displacement is

$$
V=3e_1+4e_2.
$$

The numbers 3 and 4 are its **components in this basis**. The basis vectors need not have unit length or meet at right angles. In a plane, they must be nonparallel and nonzero, so that they can describe both independent directions.

For a general vector, write the components as $V^1$ and $V^2$:

$$
V=V^1e_1+V^2e_2=\sum_{i=1}^2 V^ie_i=V^ie_i.
$$

The superscripts 1 and 2 label components; they are not powers. The last expression uses **Einstein summation**: when an index appears once upstairs and once downstairs in a term, sum over its allowed values. Here $i$ takes the values 1 and 2. The index is an instruction to add the two contributions.

Now keep the drone's destination fixed but choose a longer first basis vector:

$$
e'_1=2e_1,\qquad e'_2=e_2.
$$

A prime labels the new description. How many copies of the new first arrow do we need? Each copy covers twice the distance, so we need half as many:

$$
V=3e_1+4e_2=\frac32e'_1+4e'_2.
$$

Thus $V'^1=3/2$ and $V'^2=4$. The vector has stayed the same while its components have changed. This compensating behavior is called **contravariant transformation**. We will calculate more general changes in §2.4.

Changing the basis while keeping $V$ fixed is a **passive transformation**. Rotating the actual displacement while keeping the basis fixed is an **active transformation**. In the first case the drone reaches the same place; in the second it generally does not.

### 2.2 Linear maps and matrices

A **linear map** takes a vector as input and gives a vector as output, respecting addition and scaling:

$$
A(aV+bW)=aA(V)+bA(W).
$$

Here $a$ and $b$ are numbers. Knowing what $A$ does to the basis vectors determines what it does to every vector. Suppose

$$
A(e_1)=2e_1,\qquad A(e_2)=e_1+3e_2.
$$

For the drone's vector, linearity gives

$$
A(3e_1+4e_2)=3(2e_1)+4(e_1+3e_2)=10e_1+12e_2.
$$

The matrix stores the components of $A(e_1)$ and $A(e_2)$ in its first and second columns:

$$
\begin{pmatrix}2&1\\0&3\end{pmatrix}
\begin{pmatrix}3\\4\end{pmatrix}
=\begin{pmatrix}10\\12\end{pmatrix}.
$$

Index notation expresses this same multiplication as

$$
(AV)^i=A^i{}_jV^j.
$$

The summed index $j$ selects the input components. The unsummed index $i$ selects the output component: setting $i=1$ gives $2V^1+V^2$, while setting $i=2$ gives $3V^2$. We call $j$ a **dummy index** and $i$ a **free index**.

The identity map leaves each basis vector unchanged. Its matrix has ones on the diagonal and zeros elsewhere. Its components have a special name, the **Kronecker delta**:

$$
\delta^i{}_j=
\begin{cases}1&i=j,\\0&i\ne j.\end{cases}
\qquad \delta^i{}_jV^j=V^i.
$$

A matrix can also represent a rule with a different job. The matrix in §0.6 accepted two vectors and returned a dot product. The matrix here accepts one vector and returns another vector. When a matrix appears, identify its inputs and output before using it.

### 2.3 Covectors measure vectors

Suppose a measuring rule takes a vector's first component and adds twice its second component:

$$
\omega(V)=V^1+2V^2.
$$

For $V=(3,4)$, it returns $3+2(4)=11$. If we double the vector, the answer doubles. If we add two vectors, their answers add. A linear rule of this kind, taking a vector and returning one number, is called a **covector**.

More generally, write

$$
\omega(V)=\omega_1V^1+\omega_2V^2=\omega_iV^i.
$$

The coefficients $\omega_1$ and $\omega_2$ specify the rule in this basis. In our example they are 1 and 2. This operation is called the **pairing** of a covector with a vector. It does not require an angle or a length.

There is a useful covector for each component: the rule that extracts just that component. Call these rules $\theta^1$ and $\theta^2$. Then $\theta^1(V)=V^1$ and $\theta^2(V)=V^2$. Applied to the basis vectors themselves, they obey

$$
\theta^i(e_j)=\delta^i{}_j.
$$

These component extractors form the **dual basis**. Any covector can be assembled from them:

$$
\omega=\omega_1\theta^1+\omega_2\theta^2=\omega_i\theta^i.
$$

In particular, $\omega_i=\omega(e_i)$: the coefficient tells us what the rule returns for one basis vector.

Now reuse the longer basis vector $e'_1=2e_1$. The same rule returns $\omega(e'_1)=2\omega(e_1)$, so its new first coefficient is $\omega'_1=2\omega_1$. The drone's first component halved, but the measuring rule's coefficient doubled:

$$
\omega(V)=\omega'_iV'^i=(2)(3/2)+(2)(4)=11.
$$

The answer is unchanged. Lower indices mark this transformation behavior of covector components. The dual basis changes too: $\theta'^1=\theta^1/2$, because its job is to extract the new, halved component.

A **scalar field** assigns one value to each point: for example, the temperature $T(x,y)$ at each position on a plate. For this example, $x$ and $y$ are dimensionless labels counting steps on the plate’s grid. The first-order temperature change under a displacement with components $V^1,V^2$ is

$$
dT(V)=(\partial_xT)V^1+(\partial_yT)V^2.
$$

The measuring rule $dT$, called the **differential** of $T$, is a covector. It is exactly linear in its input. Its prediction of a finite temperature change is an approximation when the temperature field varies nonlinearly.

In Cartesian calculus we also arrange these partial derivatives into a gradient arrow. Converting a covector into that arrow uses the lengths and angles of the axes. Chapter 4 develops this conversion; a covector by itself only supplies the measuring rule.

### 2.4 Changing coordinates with the chain rule

Consider a path whose position is described by $x=x(s)$ and $y=y(s)$, with $s$ a dimensionless parameter marking progress along the path. Its tangent vector has components $V^1=dx/ds$ and $V^2=dy/ds$: the rates at which the position labels change along the path.

Relabel the same positions using $x'=x/2$ and $y'=y$. The chain rule gives $V'^1=V^1/2$ and $V'^2=V^2$. This is the longer-first-basis example again, expressed as a change of coordinates.

For a general smooth, invertible change, each new coordinate can depend on several old ones. We will use Greek indices for general coordinates. In a two-dimensional example their range has two values; in spacetime it will be $0,1,2,3$. The chain rule reads

$$
V'^\alpha=\frac{dx'^\alpha}{ds}
=\frac{\partial x'^\alpha}{\partial x^\mu}\frac{dx^\mu}{ds}
=J^\alpha{}_{\mu}V^\mu.
$$

The **Jacobian** $J$ is the matrix of first partial derivatives. Differentiating the inverse coordinate change gives its inverse matrix $K$:

$$
J^\alpha{}_{\mu}=\frac{\partial x'^\alpha}{\partial x^\mu},
\qquad K^\mu{}_{\alpha}=\frac{\partial x^\mu}{\partial x'^\alpha},
\qquad K^\mu{}_{\alpha}J^\alpha{}_{\nu}=\delta^\mu{}_{\nu}.
$$

For $x'=x/2$, $y'=y$, these are $J=\operatorname{diag}(1/2,1)$ and $K=\operatorname{diag}(2,1)$. The notation $\operatorname{diag}$ lists the diagonal entries; the other entries are zero.

To find how a covector transforms, require it to give the same answer on the same vector. Substitute $V^\mu=K^\mu{}_{\alpha}V'^\alpha$ into its pairing:

$$
\omega_\mu V^\mu
=\omega_\mu K^\mu{}_{\alpha}V'^\alpha
=\omega'_\alpha V'^\alpha.
$$

Since this must hold for every input vector, the new coefficients are

$$
\omega'_\alpha=K^\mu{}_{\alpha}\omega_\mu.
$$

The vector uses $J$; the covector uses $K$. This is how their changes compensate.

For a scalar field $f$, the value at a given point is unchanged by relabeling: $f'(x')=f(x)$. Applying the chain rule to its derivatives gives the same covector law:

$$
\partial'_\alpha f'=K^\mu{}_{\alpha}\partial_\mu f,
\qquad \partial_\mu=\frac{\partial}{\partial x^\mu}.
$$

The differential is written

$$
df=(\partial_\mu f)dx^\mu,
\qquad df(V)=(\partial_\mu f)V^\mu.
$$

Here $dx^\mu$ denotes a coordinate component extractor: $dx^\mu(V)=V^\mu$. This connects two familiar uses of $dx$. Along a path, $dx/ds$ is a tangent component; the covector $dx$ measures exactly that component when applied to the tangent. In the illustration below, $dx$ counts the change in the $x$ label as we follow a vector through planes of constant $x$.

For a nonlinear coordinate change, $J$ and $K$ vary from point to point. The transformation rules above still work at each point. Chapter 6 will examine the extra term that appears when we differentiate components while the Jacobian itself changes.

### 2.5 Tensors, products, and contractions

Chapter 0 introduced a bilinear form: a rule that takes two vectors and returns a number, linear in each input separately. Write it as

$$
B(V,W)=B_{\mu\nu}V^\mu W^\nu.
$$

There are two independent sums. The components are the values on pairs of basis vectors: $B_{\mu\nu}=B(e_\mu,e_\nu)$.

Change coordinates in each input, using $V^\mu=K^\mu{}_{\alpha}V'^\alpha$ and $W^\nu=K^\nu{}_{\beta}W'^\beta$. Then

$$
B(V,W)=B_{\mu\nu}K^\mu{}_{\alpha}K^\nu{}_{\beta}V'^\alpha W'^\beta,
$$

so the new components are

$$
B'_{\alpha\beta}=K^\mu{}_{\alpha}K^\nu{}_{\beta}B_{\mu\nu}.
$$

Each lower index contributes one inverse Jacobian. For the linear map in §2.2, the output vector contributes a forward Jacobian and the input contributes an inverse Jacobian:

$$
A'^\alpha{}_{\beta}=J^\alpha{}_{\mu}K^\nu{}_{\beta}A^\mu{}_{\nu}.
$$

These are examples of **tensors**. A tensor of type $(r,s)$ has $r$ upper and $s$ lower indices in its component description, transforming with one $J$ for each upper index and one $K$ for each lower index. Equivalently, it can be viewed as a multilinear rule taking $r$ covectors and $s$ vectors and returning a number. A bilinear form is type $(0,2)$. A linear map is type $(1,1)$: apply it to a vector, then let a covector measure its output.

The total number of indices, $r+s$, is sometimes called tensor rank. This differs from **matrix rank**, the number of independent output directions of a linear map. A two-index tensor can have a matrix of rank one.

A **tensor product** builds a rule with separate inputs. For two covectors,

$$
(\omega\otimes\eta)(V,W)=\omega(V)\eta(W).
$$

For example, let $\omega=(1,2)$ and $\eta=(2,-1)$ in our two-dimensional basis. If $V=(3,4)$ and $W=(1,3)$, the result is $11\times(-1)=-11$. Exchanging the inputs gives $7\times2=14$. The order of the inputs matters.

**Contraction** sums a matching upper and lower index. For a linear map, contracting its two indices gives its **trace**:

$$
A^i{}_i=A^1{}_1+A^2{}_2.
$$

The matrix in §2.2 has trace $2+3=5$. Under a basis change, the $J$ and $K$ factors cancel in this sum, leaving the same answer. More generally, contraction removes one upper and one lower index and produces another tensor.

The indices also help check an equation before calculating:

| Expression | How to read it |
|---|---|
| $V^\mu\omega_\mu$ | Sum over $\mu$; the result is a number. |
| $A^\mu{}_{\nu}V^\nu=W^\mu$ | Sum over $\nu$; one equation remains for each value of $\mu$. |
| $A^\mu{}_{\nu}=B^\mu{}_{\rho}$ | The free labels differ, so this does not state a consistent component equation. |
| $V^\mu W^\mu$ | Two upper indices do not form an Einstein contraction. A rule for pairing two vectors is additional information. |
| $A^\mu{}_{\nu}B^\nu{}_{\rho}C^\rho{}_{\mu}$ | All three labels are summed; the result is a number. |

A dummy index can be renamed without changing the sum: $V^\mu\omega_\mu=V^\alpha\omega_\alpha$. Free indices must match on both sides of an equation. A label must not appear three times in one product under this convention.

Finally, any two-input bilinear form can be split into a symmetric part and an antisymmetric part:

$$
B_{(\mu\nu)}=\frac12(B_{\mu\nu}+B_{\nu\mu}),
\qquad B_{[\mu\nu]}=\frac12(B_{\mu\nu}-B_{\nu\mu}).
$$

Parentheses denote **symmetrization**; square brackets denote **antisymmetrization**. Swapping the inputs leaves the first part unchanged and reverses the sign of the second. Adding the two parts recovers $B_{\mu\nu}$. For example, entries $B_{12}=5$ and $B_{21}=1$ give symmetric entry 3 and antisymmetric entry 2.

### 2.6 Approximations and oriented area

The same notation lets us write Taylor's formula for several inputs:

$$
f(x+\delta x)=f(x)+\partial_\mu f\,\delta x^\mu
+\frac12\partial_\mu\partial_\nu f\,\delta x^\mu\delta x^\nu+\cdots.
$$

Here $x$ stands for the full coordinate list and $\delta x$ for a small change in that list. Repeated indices add the contributions from every direction. For $f(x,y)=x^2+3y$ near $(2,1)$, the expansion is

$$
f(2+\delta x,1+\delta y)=7+4\delta x+3\delta y+(\delta x)^2.
$$

In this example the expression is exact. For a general smooth function, more terms remain. The notation $F=F_0+\varepsilon F_1+O(\varepsilon^2)$ means that the omitted remainder is bounded in magnitude by a constant times $\varepsilon^2$ as the chosen small parameter approaches zero, within the specified regime.

A small function need not have small derivatives. For dimensionless $x$, consider $f(x)=\varepsilon\sin(kx)$. Its magnitude is at most $|\varepsilon|$, but $f'(x)=\varepsilon k\cos(kx)$. If $\varepsilon=0.001$ and $k=10{,}000$, the function never exceeds 0.001 in magnitude while its slope can reach 10. This distinction will matter when we approximate fields and then differentiate them.

<details class="history-note" data-no-narration>
<summary>Further example: oriented area and differential forms</summary>

The antisymmetric rule

$$
(dx\wedge dy)(V,W)=V^xW^y-V^yW^x
$$

computes the signed coordinate area of the parallelogram spanned by two vectors. The symbol $\wedge$ is called the **wedge product**. For $V=(2,1)$ and $W=(1,3)$, the area is $2(3)-1(1)=5$. Swapping the vectors gives $-5$; parallel vectors give zero. This is the two-by-two determinant from linear algebra, now written as a rule for two inputs.

A smoothly varying antisymmetric covariant tensor is called a **differential form**. A one-form assigns a covector smoothly to each point; a two-form has two antisymmetric vector inputs, as in this area rule. Chapter 21 develops how these objects are integrated over curves and surfaces.

</details>

For now, practice expanding an indexed expression into its ordinary sums, and checking that a change of basis leaves a completed measurement unchanged. These operations will let us compare moving observers in the next chapter. [David Tong's differential-geometry notes](https://davidtong.org/pdfs/teaching/general-relativity/gr2.pdf) provide a further formal treatment of vector and dual spaces.

<a id="chapter-3"></a>

## 3. Special relativity: learning what a clock is actually measuring

### 3.1 Events, clocks, and reference frames

A particular flash is an **event**: something happening at one place and one time. To describe it, we need an address and a clock reading. A sequence of events along an object's motion is its **worldline**—its history, not a photograph at one instant.

Begin with an ideal laboratory drifting without acceleration or rotation, far from significant gravity. Place mutually stationary rulers and clocks throughout it. Such a network defines an **inertial frame**. We want every observer using this network to assign the same time to a given distant event, so we must say how its clocks are synchronized.

Send a light pulse from clock A to clock B and immediately reflect it back. If A sends it at $t_1$ and receives it at $t_2$, set B's reading at the reflection to $(t_1+t_2)/2$. This is Einstein synchronization: the outward and return light travel times are assigned equal values. It accounts for the travel delay; seeing a distant clock now is not the same as assigning a time to the event happening there.

The physical starting points are that the laws of physics are the same in all inertial frames and that light in vacuum has the same speed $c$ in each. These are assumptions supported by experiment, not consequences of a coordinate trick. A laboratory moving relative to the first one builds its own synchronized network using the same procedure.

For an event, collect the labels in one list:

$$
x^\mu=(ct,x,y,z).
$$

The index $\mu$ runs over $0,1,2,3$, as introduced in Chapter 2. The symbol $c$ is the vacuum speed of light. Multiplying a time by $c$ gives a length: $ct$ is how far light travels during that time. Thus all four entries in this list have length units. We have changed how we label time, not turned a clock into a ruler.

Einstein's original account starts with this operational treatment of clocks. [Einstein's 1905 paper, in English translation](https://sites.pitt.edu/~jdnorton/teaching/Einstein_graduate/pdfs/Einstein_STR_1905_English.pdf).

### 3.2 Deriving the Lorentz transformation

Let frame $S'$ move at speed $v$ in the positive $x$ direction relative to $S$. Their origins meet at $t=t'=0$. Each frame uses its own synchronized clocks and the same units of length and time. We want formulas that turn one frame's labels for an event into the other's.

We assume that the laws do not favor a particular position or starting time. These assumptions are called spatial and time **homogeneity**. With uniform relative motion and the stated synchronization, the relation between the two coordinate lists is linear. We can therefore find it by determining a few coefficients. This change of inertial frame is called a **Lorentz boost**.

The moving origin obeys $x=vt$ and must have $x'=0$, so

$$
x'=A(x-vt)
$$

for some factor $A$ depending on $v$. Write the most general linear time transformation as $t'=B t+C x$.

Now send light to the right, so $x=ct$ and $x'=ct'$. Substitution gives

$$
A(c-v)=c(B+Cc).
$$

Send light to the left, so $x=-ct$ and $x'=-ct'$. This gives

$$
A(c+v)=c(B-Cc).
$$

Add the equations: $2Ac=2cB$, hence $B=A$. Subtract them: $-2Av=2c^2C$, hence $C=-Av/c^2$. Therefore

$$
x'=A(x-vt),
\qquad
t'=A\left(t-\frac{vx}{c^2}\right).
$$

We have not guessed that time must mix with space. The two light directions forced it.

The moving frame sees the first frame receding at velocity $-v$. Neither frame is privileged, and reversing the spatial direction must not change the scale factor. These requirements are called **reciprocity** and spatial **isotropy**. The inverse relation therefore has the form $x=A(x'+vt')$. Substitute the expressions above:

$$
x=A^2\left[(x-vt)+v\left(t-\frac{vx}{c^2}\right)\right]
=A^2\left(1-\frac{v^2}{c^2}\right)x.
$$

For the inverse to return every value of $x$, we need

$$
A^2\left(1-\frac{v^2}{c^2}\right)=1.
$$

Choose the positive root continuously connected to $A=1$ at $v=0$:

$$
\boxed{\gamma=\frac1{\sqrt{1-v^2/c^2}},\qquad
x'=\gamma(x-vt),\qquad
t'=\gamma\left(t-\frac{vx}{c^2}\right).}
$$

For this standard boost, $y'=y$ and $z'=z$. The time transformation has a measurable consequence. Two events with $\Delta t=0$ but different $x$ generally have

$$
\Delta t'=-\gamma\frac{v\Delta x}{c^2}\ne0.
$$

For example, take $v=0.6c$, so $\gamma=1.25$. Two flashes separated by one **light-second**—the distance light travels in one second—along $x$ are simultaneous in $S$. The moving frame assigns them a time difference of $-0.75\,\mathrm s$: the flash at the larger $x$ coordinate happened earlier in its synchronized-clock system.

This is **relativity of simultaneity**. It concerns the times assigned by synchronized clocks after accounting for signal travel, not merely the order in which someone sees the flashes.

The everyday limit is sensible. If $v/c\ll1$, then $\gamma\approx1$ and $vx/c^2$ becomes negligible for ordinary distances and timing precision. We recover the Galilean approximation $x'\approx x-vt$, $t'\approx t$.

### 3.3 The spacetime interval

Choose two events, A and B. Write $\Delta t=t_B-t_A$ for their time difference in one inertial frame, and similarly $\Delta x$, $\Delta y$, and $\Delta z$ for their position differences. Different moving frames generally assign different values to all of these differences. Is there a combination they agree on?

There is a useful clue from ordinary geometry. Rotate a map and a displacement's horizontal and vertical components change, but the sum of their squares stays equal to the squared length. Try a related combination for time and position: square the spatial differences and **subtract** the squared time difference expressed as a length.

Define the **spacetime interval** between the two events in flat spacetime by

$$
\Delta s^2=-c^2(\Delta t)^2+(\Delta x)^2+(\Delta y)^2+(\Delta z)^2.
$$

The symbol $\Delta s^2$ names this signed quantity. Despite the square in its notation, it can be negative; it is not the square of an ordinary positive distance. Every term has square-length units. The minus sign is a physical distinction between time and space, not a units conversion.

Now test the proposed combination using the Lorentz transformation from §3.2. For the time and $x$ terms,

$$
\begin{aligned}
-c^2(\Delta t')^2+(\Delta x')^2
&=\gamma^2\left[-c^2\left(\Delta t-\frac{v\Delta x}{c^2}\right)^2
+(\Delta x-v\Delta t)^2\right]\\
&=\gamma^2\left(1-\frac{v^2}{c^2}\right)
\left[-c^2(\Delta t)^2+(\Delta x)^2\right]\\
&=-c^2(\Delta t)^2+(\Delta x)^2.
\end{aligned}
$$

The expansion produces $+2v\Delta t\Delta x$ from the time square and $-2v\Delta t\Delta x$ from the space square; they cancel. The transverse differences do not change in this boost. All inertial frames therefore assign the same interval, even when they disagree about the separate time and position differences. This agreement is what makes the interval useful.

For a concrete example, one frame assigns $\Delta t=5\,\mathrm s$ and $\Delta x=c(3\,\mathrm s)$, with no sideways separation. The spatial gap is three **light-seconds**: the distance light travels in three seconds. The interval is $(-25+9)=-16$ square light-seconds. In a frame moving at $v=0.6c$, the Lorentz formulas give $\Delta x'=0$ and $\Delta t'=4\,\mathrm s$. Its answer is also $-16$ square light-seconds. The next section explains why the four seconds have a direct clock interpretation.

The sign tells us which connections are possible:

| Separation | Interval sign | Meaning in flat spacetime |
|---|---|---|
| Timelike | $\Delta s^2<0$ | Light has more than enough time to cross the gap; an object traveling below $c$ can connect the events. |
| Null | $\Delta s^2=0$ | For distinct events, light has exactly enough time to connect them. |
| Spacelike | $\Delta s^2>0$ | Crossing the gap in that time would require a speed greater than $c$. |

For a signal emitted at A, also require B to be in A's future. The possible light signals form a **light cone**: after elapsed time $\Delta t$, light has reached a sphere of radius $c\Delta t$. Stack these spheres in a diagram that includes time, and they form a cone. Slower objects travel inside it. The surface is null; the interior is timelike. The spatially separated region outside is spacelike. Observers can disagree about the time order of spacelike events, but not about the order of two events joined by a future-directed signal.

For small displacements we use differentials rather than finite changes:

$$
ds^2=-c^2dt^2+dx^2+dy^2+dz^2
=\eta_{\mu\nu}dx^\mu dx^\nu,\qquad
\eta_{\mu\nu}=\operatorname{diag}(-1,1,1,1).
$$

The last expression uses Chapter 2's summation rule and the coordinates $x^0=ct$. The diagonal matrix packages the coefficients of the measuring rule; its other entries are zero. It is called the **Minkowski metric**. A metric is a rule for obtaining an interval from small coordinate displacements. Chapter 4 develops that rule on more general spaces. There the local formula cannot in general be turned into a finite separation by simply replacing every $d$ by $\Delta$.

<details class="history-note" data-no-narration>
<summary>Further calculation: rapidity and successive boosts</summary>

To compose boosts conveniently, we can build two new functions from exponentials. For a dimensionless number $\chi$, define $\cosh\chi=(e^\chi+e^{-\chi})/2$ and $\sinh\chi=(e^\chi-e^{-\chi})/2$, then $\tanh\chi=\sinh\chi/\cosh\chi$. Squaring and subtracting gives $\cosh^2\chi-\sinh^2\chi=1$. This resembles the circular identity $\cos^2\theta+\sin^2\theta=1$, with the sign needed for an interval.

The parameter $\chi$ is called **rapidity**. Choosing it so that $\tanh\chi=v/c$ gives

$$
\tanh\chi=\frac vc,\qquad
\cosh\chi=\gamma,\qquad
\sinh\chi=\gamma\frac vc.
$$

Then

$$
\begin{pmatrix}ct'\\x'\end{pmatrix}
=
\begin{pmatrix}\cosh\chi&-\sinh\chi\\-\sinh\chi&\cosh\chi\end{pmatrix}
\begin{pmatrix}ct\\x\end{pmatrix}.
$$

Multiplying two of these matrices and using the exponential definitions replaces $\chi$ by $\chi_1+\chi_2$. Thus rapidities add for boosts along the same line. Writing the result in terms of the two speeds gives

$$
v_{\rm combined}=\frac{v_1+v_2}{1+v_1v_2/c^2}.
$$

Two successive boosts of $0.8c$ give $1.6c/1.64\approx0.976c$, not $1.6c$. The combined speed remains below the speed of light.

</details>

### 3.4 Adding up a clock’s elapsed time

Take a clock on a journey. During a sufficiently short part of the journey, use an inertial frame in which the clock is momentarily at rest. Its spatial displacement is zero in that frame, so the interval is $ds^2=-c^2d\tau^2$, where $d\tau$ is the time recorded by the clock.

Other inertial frames agree on this interval. In a frame where the clock is moving, substitute $dx=v_xdt$, $dy=v_ydt$, and $dz=v_zdt$ into the interval formula:

$$
ds^2=-c^2dt^2+(v_x^2+v_y^2+v_z^2)dt^2.
$$

Writing $v^2=v_x^2+v_y^2+v_z^2$ for the ordinary speed squared, the clock's elapsed time is therefore

$$
d\tau=\frac{\sqrt{-ds^2}}c
=dt\sqrt{1-\frac{v^2}{c^2}}.
$$

This is called **proper time**. An ideal clock is assumed to measure it even when the clock accelerates, provided its mechanism is not disturbed. Acceleration changes the journey; we do not add a separate acceleration term to this clock rule. This assumption is often called the **clock hypothesis**.

For constant speed the square-root factor stays constant, giving

$$
\Delta\tau=\Delta t\sqrt{1-v^2/c^2}=\frac{\Delta t}{\gamma}.
$$

At $v=0.6c$, the factor is 0.8. A journey taking five years according to the frame's synchronized clocks takes four years on the traveling clock. This is the same calculation as the five-second, three-light-second example in §3.3, with a different unit of time.

If the speed varies, add the contributions from each small part of the journey:

$$
\tau=\int_{t_A}^{t_B}\sqrt{1-\frac{v(t)^2}{c^2}}\,dt.
$$

The rule takes a whole path as input; such a rule is called a **functional**. Two clocks that start together and meet again can compare the accumulated results directly at their reunion.

There is a useful consequence in flat spacetime. Choose the inertial frame in which the departure and reunion occur at the same position. A clock that stays there records $t_B-t_A$. Every other future-directed timelike path between those same events has a square-root factor no greater than one at each step. It therefore records no more time than the stationary clock.

Thus the inertial path between these events gives the greatest elapsed time. The result follows from the clock formula; it differs from the shortest-distance rule for straight lines in ordinary spatial geometry.

### 3.5 Two clocks meet again

Two clocks start together. One stays at rest in an inertial frame. The other travels outward at $0.6c$ for five years of that frame's time and returns at the same speed for another five years. We idealize the turnaround as brief. This is the experiment often described using twins, with their ages playing the role of the clock readings. At reunion,

$$
\tau_{\rm home}=10\ \text{years},
\qquad
\tau_{\rm traveler}=2\times5\sqrt{1-0.6^2}=8\ \text{years}.
$$

The traveling clock must change velocity to return. The stay-at-home clock does not, so we cannot exchange their roles while keeping the same experiment. Still, the age difference is accumulated during the journeys: each five-year leg contributes four years to the traveling clock.

A finite turnaround contributes its own elapsed time, found using the variable-speed integral. Making the turn brief makes that contribution small; it does not remove the difference accumulated on the long legs. Neither clock experiences a locally slow mechanism. Each records the proper time along its own path.

This calculation uses special relativity throughout. An accelerated observer can move in flat spacetime; introducing acceleration does not by itself require a gravitational field.

### 3.6 Four-velocity and four-momentum

To describe motion using one time measured by the moving particle, differentiate its four position coordinates with respect to proper time. The result is its **four-velocity**. Since $dt/d\tau=\gamma$, the chain rule gives

$$
u^\mu\equiv\frac{dx^\mu}{d\tau}
=\gamma(c,\mathbf v).
$$

Use the Minkowski metric from §3.3 to pair the four-velocity with itself. The result is its **squared spacetime norm**:

$$
\eta_{\mu\nu}u^\mu u^\nu
=\gamma^2(-c^2+\mathbf v^2)=-c^2.
$$

The minus sign comes from the time component. This squared norm stays $-c^2$ even when the ordinary speed changes.

The relativistic extension of momentum for a particle with constant rest mass $m$ is its **four-momentum**, $p^\mu=mu^\mu$. Its time component is energy divided by $c$, while its three spatial components are ordinary momentum:

$$
p^\mu=mu^\mu=\left(\frac Ec,\mathbf p\right),
\qquad
E=\gamma mc^2,
\qquad
\mathbf p=\gamma m\mathbf v.
$$

We can shorten metric pairings by defining a lowered-index component:

$$
p_\mu=\eta_{\mu\nu}p^\nu,
\qquad(p_0,p_1,p_2,p_3)=(-E/c,p_x,p_y,p_z).
$$

This operation is called **lowering an index**. In these coordinates it reverses the sign of the time component and leaves the spatial components unchanged. The same rule applies to $u_\mu$ or any other vector. Now its squared spacetime norm can be written

$$
p_\mu p^\mu=-m^2c^2,
$$

or, after expanding,

$$
\boxed{E^2=\mathbf p^2c^2+m^2c^4.}
$$

The familiar $E=mc^2$ is the special case of zero spatial momentum in the particle's rest frame. At small speed, the binomial expansion $\gamma=1+\frac12v^2/c^2+O(v^4/c^4)$ gives

$$
E=mc^2+\frac12mv^2+O(mv^4/c^2).
$$

Newtonian kinetic energy appears as the first correction to rest energy.

Light exchanges energy and momentum in packets called **photons**. A photon has zero rest mass, so the energy–momentum relation gives $E=c|\mathbf p|$. Its four-momentum has zero squared spacetime norm: it is null.

A photon has no rest frame. Along its lightlike path, $d\tau=0$, so we cannot define a four-velocity by dividing displacement by proper time. Its energy and momentum remain well-defined; the massive-particle formula $p^\mu=mu^\mu$ is not how we construct photon momentum.

> **The mass of two light pulses.** To find a system’s invariant mass, first add its four-momenta and then use the energy–momentum relation for that total. Consider two photons, each of energy $E_\gamma$, traveling in opposite directions. Total momentum is zero and total energy is $2E_\gamma$, so the system has invariant mass $M=2E_\gamma/c^2$. The combined system has a rest frame even though neither photon does. This example shows why simply adding the individual rest masses would give the wrong result.

### 3.7 Energy is a measurement made by an observer

Let an observer have four-velocity $U^\mu$, with $U_\mu U^\mu=-c^2$. The energy that observer measures for a particle with four-momentum $p^\mu$ is

$$
\boxed{E_{(U)}=-p_\mu U^\mu.}
$$

We can establish this formula by checking it in the observer’s rest frame and then using invariance of the pairing under a change of coordinates. In that frame, $U^\mu=(c,0,0,0)$ and $p_0=-E/c$, so $-p_\mu U^\mu=E$. Both four-vectors describe a specified particle and a specified observer, so changing the coordinates leaves their pairing unchanged. Choosing a different observer changes $U$ and can change the measured energy. These are different operations, as in Chapter 2’s distinction between an object and its description.

For a massive particle, define the relative Lorentz factor

$$
\gamma_{\rm rel}=-\frac{u_\mu U^\mu}{c^2}.
$$

Then $E_{(U)}=\gamma_{\rm rel}mc^2$. Decompose the momentum into the observer's temporal and spatial parts:

$$
p^\mu=\frac{E_{(U)}}{c^2}U^\mu+p_\perp^\mu,
\qquad
U_\mu p_\perp^\mu=0.
$$

The symbol $\perp$ marks the part orthogonal to $U$. Subtracting the first term from $p$ and pairing with $U$ gives $-E_{(U)}+E_{(U)}=0$, which verifies the condition. In the observer's rest frame, it says $p_\perp^0=0$: the remaining components describe spatial momentum. This three-dimensional set of directions is the observer's **instantaneous rest space**.

For a photon moving in the $+x$ direction, take $p^\mu=(E/c,E/c,0,0)$ and an observer chasing it with $U^\mu=\gamma(c,v,0,0)$. The energy measured by that observer is

$$
E_{(U)}=\gamma E(1-v/c)
=E\sqrt{\frac{1-v/c}{1+v/c}}.
$$

At $v=0.6c$, the square root is $\sqrt{0.4/1.6}=1/2$: this observer measures half the original photon energy.

To translate that energy change into a color or frequency change, we use a physical input about light: a photon has energy $E=h\nu$, where $\nu$ is frequency (oscillations per second) and $h$ is Planck's constant, with units of joule seconds. This is a quantum relation, not a result of the Lorentz algebra above. Since $h$ is the same, half the energy means half the frequency. A decrease in light's frequency is called a **redshift**. The observer still measures the light's speed as $c$. [Einstein Online: waves, motion, and frequency](https://www.einstein-online.info/en/spotlight/doppler/).

Chapter 11 will extend this measuring procedure from one particle to energy and momentum distributed through a region.

### 3.8 Proper acceleration

In inertial Minkowski coordinates, define four-acceleration

$$
a^\mu=\frac{du^\mu}{d\tau}.
$$

Differentiate $u_\mu u^\mu=-c^2$. Because the Minkowski metric is constant,

$$
2u_\mu a^\mu=0.
$$

Four-acceleration is orthogonal to four-velocity. In the instantaneous rest frame, $u^\mu=(c,0,0,0)$, so $a^0=0$ and $a^\mu$ is purely spatial. Its magnitude

$$
\alpha=\sqrt{a_\mu a^\mu}
$$

is the **proper acceleration**, measured by an ideal accelerometer. In the instantaneous rest frame, $a^0=0$, so the quantity under the square root is the sum of the three spatial component squares. It is nonnegative.

The coordinate derivative used here works in inertial Cartesian coordinates. If the measuring axes vary from place to place, differentiating components alone also counts the change in the axes. Chapter 6 develops the correction. It will let us calculate an accelerometer reading in general coordinates, including the falling laboratories of Chapter 1.

<a id="chapter-4"></a>

## 4. Spacetime as a manifold: maps, rulers, and the geometry beneath them

### 4.1 A manifold is a place where local coordinates work

Imagine finding a place on Earth using latitude and longitude. Two numbers locate a point on the surface, even though we draw the globe in three-dimensional space. The point needs two independent coordinates because we can move along the surface in two independent directions.

The labels have limits. At the north pole, all longitudes meet. A small map centered on that pole can instead use two directions across the map. The place is ordinary; our first set of labels was unsuitable there.

A **manifold** is a space that can be described this way: each point has a surrounding region with an ordinary coordinate list. The number of entries is its **dimension**. A sphere's surface is two-dimensional; spacetime is four-dimensional, with one time coordinate and three space coordinates. We use a collection of overlapping maps when one set of coordinates cannot cover everything.

A **coordinate chart** is the rule assigning a coordinate list to each point in one such region. It must work both ways: each point has one list, and each list in the chart's range identifies one point. Nearby points must have nearby lists, and vice versa. Symbolically,

$$
x:U\subset M\longrightarrow x(U)\subset\mathbb R^n.
$$

Here $M$ is the manifold, $U$ is the region covered by this chart, and $x(U)$ is its set of coordinate lists. The notation $\mathbb R^n$ means lists of $n$ real numbers. In this formula $x$ names the whole chart, rather than just one horizontal coordinate.

An **atlas** is a collection of charts covering the space. Where two charts overlap, we can translate between their labels. Starting with one list, use the first chart's inverse to find the point, then the second chart to label it:

$$
y\circ x^{-1}:x(U\cap V)\longrightarrow y(U\cap V).
$$

The symbol $\cap$ means the common region of the two patches; $\circ$ means composition, applying the right-hand map first. This translation is a **transition map**. On a **smooth manifold**, the transition maps and their inverses can be differentiated repeatedly, with continuous derivatives of every order. That is what lets us use calculus consistently on overlapping maps.

**A complete two-chart example.** Describe the unit sphere temporarily by $X^2+Y^2+Z^2=1$ in ordinary three-dimensional space. Capital letters are only a convenient construction aid. The surface itself has two independent coordinates. Let $N=(0,0,1)$ and $S=(0,0,-1)$ be its poles.

On the sphere with $N$ removed, use the chart

$$
(u,v)=\left(\frac{X}{1-Z},\frac{Y}{1-Z}\right).
$$

Every finite pair $(u,v)$ corresponds to exactly one point of that patch. To see this without trusting a picture, put $s=u^2+v^2$ and write the inverse:

$$
(X,Y,Z)=\left(\frac{2u}{1+s},\frac{2v}{1+s},\frac{s-1}{1+s}\right).
$$

The squared components sum to one, and substituting them back into the chart returns $u$ and $v$. The denominator $1+s$ never vanishes. The north pole is approached only as the coordinate radius becomes unbounded; the south pole is the perfectly ordinary coordinate pair $(0,0)$.

The second chart removes $S$ instead:

$$
(p,q)=\left(\frac{X}{1+Z},\frac{Y}{1+Z}\right).
$$

It covers the missing north pole, where $(p,q)=(0,0)$. On the overlap, substitute the first chart's inverse into the second chart. Since $1+Z=2s/(1+s)$, the transition is

$$
(p,q)=\left(\frac{u}{u^2+v^2},\frac{v}{u^2+v^2}\right),
\qquad (u,v)\ne(0,0).
$$

The excluded origin represents $S$, which is outside the second chart. The transition applies only where both charts cover the point. Applying the same formula to $(p,q)$ returns $(u,v)$, so the transition has a smooth inverse everywhere on the overlap. Its Jacobian has determinant

$$
\det\frac{\partial(p,q)}{\partial(u,v)}
=-\frac{1}{(u^2+v^2)^2}\ne0.
$$

The minus sign reverses the orientation of these coordinate lists; the nonzero value says no infinitesimal direction has been collapsed. Two overlapping charts therefore cover the whole sphere, even though neither chart does so alone. These coordinate lists locate points. To calculate distances between them, we still need a measuring rule.

As a numerical check, the first coordinates $(u,v)=(2,1)$ locate $(X,Y,Z)=(2/3,1/3,2/3)$ and give second coordinates $(p,q)=(2/5,1/5)$. Those are two addresses for one point. Chapter 2's Jacobian rule tells us how a tangent's components change between them; §4.3 will make the tangent itself precise.

A small globe and a globe twice its size can use the same latitude and longitude labels. The distance between two given labels doubles. This separates the two ingredients we need: the manifold and its charts locate points; a metric supplies the measuring rule.

We used an outside picture to construct the sphere's charts, but the final coordinate translations work without it. In the same way, describing four-dimensional spacetime does not require an additional physical space surrounding it.

<details class="history-note" data-no-narration>
<summary>The precise topological conditions</summary>

Charts cover **open regions**: around each point there is a smaller patch still inside the region. Openness on a surface is measured within the surface; a patch need not contain a three-dimensional ball.

A chart and its inverse must be **continuous**. The general definition says that the preimage of every open set is open. A preimage consists of all starting points mapped into the chosen set. This defines continuity before any particular distance formula is chosen. Continuity alone does not imply differentiability: the function $f(x)=|x|$ is continuous but has a corner at zero.

The usual manifold definition includes two further conditions. **Hausdorff separation** means that two distinct points have disjoint surrounding neighborhoods. On a sphere, sufficiently small separate disks around any two distinct points illustrate this condition. **Second countability** means that a countable collection of basic open regions suffices to build all open regions by unions. In the plane, rectangles with rational-number corners form such a collection. These conditions exclude spaces with pathological global behavior even when their small patches resemble ordinary coordinate space.

The sphere and spacetime models used here satisfy these conditions. The calculations below use their charts and smooth transitions; no further topology theorem is needed to follow them.

</details>

### 4.2 Where coordinates fail

On an ordinary flat plane, **polar coordinates** describe a point by its distance $r$ from the origin and the angle $\theta$ from the positive $x$ axis. We measure the angle in radians: arc length divided by radius, so a full turn is $2\pi$. Before calculating, try changing the distance and angle separately. A change in distance takes you along a spoke; a change in angle takes you around a circle.

<div data-foundation-insert="polar"></div>

The horizontal and vertical sides of the triangle from the origin to P are $r\cos\theta$ and $r\sin\theta$. Thus the same point has Cartesian coordinates

$$
x=r\cos\theta,\qquad y=r\sin\theta.
$$

At $r=0$, every value of $\theta$ labels the same point. Polar coordinates fail there. A Cartesian map still describes the origin normally.

Likewise, longitude fails to distinguish directions at a sphere's poles. One can use another chart near a pole. The original labels were inadequate; the geometry is regular.

We will meet the same distinction at a black-hole horizon in Chapter 17. A coordinate expression can become infinite while a different chart describes the same location regularly. To establish a physical problem, we need more than the behavior of one set of labels.

A coordinate list is also different from a vector. Consider the simple relabeling $x'=x+10$. A point formerly labeled 2 is now labeled 12. But a displacement of 3 coordinate units is still a displacement of 3 units: the added 10 cancels when we subtract the endpoints. The point labels and displacement components follow different rules.

For nonlinear changes, even subtracting two widely separated coordinate lists does not generally produce a vector. Tangent vectors use the local Jacobian rule from Chapter 2. We now make their local meaning precise.

### 4.3 Tangent vectors live at events

Take a curve through an event $p$, written $x^\mu(\lambda)$. Its tangent components are

$$
V^\mu=\left.\frac{dx^\mu}{d\lambda}\right|_p.
$$

We can identify this tangent by the rate of change it produces in a scalar field $f$ along the curve:

$$
V[f]=\left.\frac{d}{d\lambda}f(x(\lambda))\right|_p
=V^\mu\partial_\mu f\big|_p.
$$

For example, take $f(x,y)=x+2y$ and a tangent with components $(3,4)$. Then $V[f]=3+2(4)=11$, the same vector–covector pairing we calculated in Chapter 2. Here we are viewing the vector as an instruction to differentiate a function in a specified direction. The brackets in $V[f]$ mean applying that instruction to $f$.

The operator satisfies linearity and the product rule,

$$
V[af+bg]=aV[f]+bV[g],
\qquad
V[fg]=V[f]g(p)+f(p)V[g].
$$

All tangent vectors at $p$ form the tangent space $T_pM$. A coordinate basis is

$$
e_\mu=\partial_\mu\big|_p,
\qquad
V=V^\mu e_\mu.
$$

Its dual basis is $dx^\mu|_p$, with $dx^\mu(e_\nu)=\delta^\mu{}_{\nu}$.

There is an additional question when we compare two different points. A vector at $p$ belongs to $T_pM$; a vector at a neighboring event $q$ belongs to $T_qM$. They are elements of different vector spaces. Subtracting them requires a rule for comparing those spaces.

On a flat Cartesian grid, an obvious translation rule is already operating in the background. On a general manifold there is no preferred rule supplied by the manifold alone. A **connection** will provide the missing comparison procedure. We will construct and use that rule in Chapters 6 and 7.

### 4.4 The metric is a local measuring operation

In Chapter 3, the Minkowski metric turned a small displacement into an interval. Now allow the measuring rule to vary from place to place. We also give it two vector inputs, because this lets us describe their relation as well as each vector separately.

The ordinary dot product is a familiar example: $V\cdot V$ gives squared length and $V\cdot W=|V||W|\cos\theta$ relates two lengths to the angle between the arrows. If $W$ has unit length, the latter measures the component of $V$ along $W$. Expanding the square of $V+W$ gives

$$
2V\cdot W=|V+W|^2-|V|^2-|W|^2.
$$

So the rule for squared lengths already determines a rule for pairs. The same identity works for a symmetric bilinear form even when its squared values can be negative. At every event, the metric is such a form on the tangent vectors:

$$
g(V,W)=g_{\mu\nu}V^\mu W^\nu.
$$

It is symmetric,

$$
g_{\mu\nu}=g_{\nu\mu},
$$

and **nondegenerate**: no nonzero vector pairs to zero with every vector. Here **orthogonal** means $g(V,W)=0$, extending the zero-dot-product condition. In GR it has Lorentzian signature $(-,+,+,+)$. At a point, there is a basis in which its components are $\eta_{\mu\nu}$, with one negative and three positive eigenvalue directions. The number of positive and negative directions cannot be changed by a nonsingular real basis transformation.

Nondegenerate does **not** mean $g(V,V)$ is nonzero for every nonzero $V$. Null vectors have $g(V,V)=0$, but a nonzero null vector still has nonzero pairing with some other vectors. For example, with the two-dimensional matrix $\operatorname{diag}(-1,1)$, $V=(1,1)$ pairs to zero with itself but gives $g(V,W)=-2$ for $W=(1,-1)$. The matrix is invertible despite having nonzero vectors with zero self-pairing.

The line element

$$
ds^2=g_{\mu\nu}(x)dx^\mu dx^\nu
$$

encodes the local geometry. For a timelike worldline, $d\tau=\sqrt{-ds^2}/c$. For a spacelike curve, its length is obtained from $\int\sqrt{ds^2}$. Defining a finite spatial distance between distant observers requires a specified spacelike slice or measurement protocol; the metric does not hand everyone the same universal “distance right now.”

The metric also defines the light cone by $g(V,V)=0$. The metric therefore tells us about clock readings and possible light signals as well as spatial lengths.

In four dimensions, a symmetric $4\times4$ metric has $4(4+1)/2=10$ independent components. Those are ten functions in a coordinate description, **not ten independent propagating gravitational modes**. Coordinate freedom and the structure of the field equations will substantially change that counting.

### 4.5 A complete metric calculation in flat polar coordinates

Return to the angular-step view in the [polar-coordinate experiment](#polar-coordinates). Moving outward by a small amount changes your position by that same length. Turning through a small angle changes it by a length proportional to $r$: the little arc is longer on a larger circle. At the point where you stand, these radial and tangential directions are perpendicular.

This gives us a prediction. The two perpendicular legs of a very small displacement have lengths $dr$ and $r\,d\theta$, so Pythagoras should give $d\ell^2=dr^2+r^2d\theta^2$. The differentials describe the local limit; a finite straight chord need not equal a finite arc. We can now check the prediction by differentiating the coordinate formulas:

$$
dx=\cos\theta\,dr-r\sin\theta\,d\theta,
\qquad
dy=\sin\theta\,dr+r\cos\theta\,d\theta.
$$

Square and add. The mixed terms cancel, and $\sin^2\theta+\cos^2\theta=1$ gives

$$
d\ell^2=dx^2+dy^2=dr^2+r^2d\theta^2.
$$

Therefore the spatial metric is

$$
(g_{ij})=
\begin{pmatrix}1&0\\0&r^2\end{pmatrix}.
$$

The coefficient $r^2$ is necessary because one radian of angular change spans a longer arc farther from the origin. It is not evidence of curved space. We obtained the metric from the flat Euclidean plane by changing labels.

Units deserve attention. If $r$ is measured in meters and $\theta$ is dimensionless, $g_{rr}$ is dimensionless but $g_{\theta\theta}$ has units of square meters. It is the full line element that must have consistent units. The statement “the metric is dimensionless” is only true in suitable coordinate conventions.

Off-diagonal terms also have a simple meaning. On the same plane, choose oblique coordinates with position

$$
\mathbf r(q^1,q^2)=q^1\hat{\mathbf x}
+q^2(\hat{\mathbf x}+\hat{\mathbf y}).
$$

Then

$$
d\ell^2=(dq^1)^2+2dq^1dq^2+2(dq^2)^2,
\qquad
(g_{ij})=\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

The cross term tells you the coordinate basis directions are not orthogonal. Its coefficient is $2g_{12}$ because the Einstein sum includes both $g_{12}dq^1dq^2$ and $g_{21}dq^2dq^1$.

### 4.6 Inverse metrics and raising or lowering indices

The inverse metric is defined by

$$
g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_{\nu}.
$$

It is the matrix inverse, not component-by-component reciprocation except when the metric is diagonal. For our oblique metric,

$$
(g^{ij})=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}.
$$

Multiplying the two matrices verifies the identity directly.

The metric converts a vector into a covector:

$$
V_\mu=g_{\mu\nu}V^\nu.
$$

The new covector asks another vector $W$ the question $V_\mu W^\mu=g(V,W)$. The inverse conversion is

$$
\omega^\mu=g^{\mu\nu}\omega_\nu.
$$

For the oblique example, $V^i=(1,2)$ gives $V_i=(3,5)$, and

$$
g(V,V)=V_iV^i=3\cdot1+5\cdot2=13.
$$

The corresponding ordinary Cartesian vector is $3\hat{\mathbf x}+2\hat{\mathbf y}$, whose Euclidean norm squared is indeed $9+4=13$. The components changed from $(1,2)$ to $(3,5)$ because the lowered object is a measuring rule. Applying it to the original vector gives the squared length in either description.

In inertial spacetime coordinates,

$$
V^\mu=(V^0,V^1,V^2,V^3)
\quad\Longrightarrow\quad
V_\mu=(-V^0,V^1,V^2,V^3).
$$

For example, $u_0=-\gamma c$ while $u^0=\gamma c$. Lowering the time index accounts for the minus sign in the energy contraction below.

The gradient distinction from Chapter 2 now resolves:

$$
(df)_\mu=\partial_\mu f,
\qquad
(\operatorname{grad}f)^\mu=g^{\mu\nu}\partial_\nu f.
$$

The differential was available before the metric. The gradient vector was not. In Lorentzian geometry it is also unsafe to carry over every Euclidean slogan about a gradient “pointing uphill most steeply,” because the unit-vector set and norm structure are different.

### 4.7 Measuring volume with a determinant

On a plane, a narrow polar cell has physical area approximately $dr\times r\,d\theta$, so

$$
dA=r\,dr\,d\theta=\sqrt{\det g_{ij}}\,dr\,d\theta.
$$

For a small coordinate cell in more dimensions, the same idea applies. A matrix that converts coordinate components to components in a laboratory basis with metric matrix $\eta$ changes cell volumes by the absolute value of its determinant. The metric contains this conversion twice, once for each vector input, so its determinant contains the square of the volume factor. Let

$$
g\equiv\det(g_{\mu\nu}).
$$

With Lorentzian signature $(-,+,+,+)$, $g<0$ in every regular coordinate chart. Write $d^4x=dx^0dx^1dx^2dx^3$ for the product of the four small coordinate widths. This notation is not a fourth power of one coordinate. The invariant spacetime volume measure is

$$
\boxed{dV_4=\sqrt{-g}\,d^4x.}
$$

Why exactly this factor? Under $x\mapsto x'$, the covariant metric transforms as a matrix according to

$$
g'=K^{\mathsf T}gK,
\qquad
\det(g')=(\det K)^2\det(g),
$$

where the first equation uses $g$ for the metric matrix and the second its determinant. Thus the square root picks up $|\det K|$. Meanwhile $d^4x'=|\det J|d^4x$, and $K=J^{-1}$. The factors cancel:

$$
\sqrt{-g'}\,d^4x'=\sqrt{-g}\,d^4x.
$$

An oriented volume **form** additionally tracks the sign of orientation using a wedge product. The positive integration measure above uses absolute Jacobians. These are compatible viewpoints, but changing orientation is where their notation must be handled carefully. A formal treatment is available in [Tong's discussion of the metric volume form](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf).

For a concrete four-dimensional example, keep $x^0=ct$ and describe space with spherical coordinates. The radius $r$ measures distance from the origin, $\theta$ measures angle down from the north axis, and $\phi$ measures angle around that axis:

$$
x=r\sin\theta\cos\phi,\qquad
y=r\sin\theta\sin\phi,\qquad z=r\cos\theta.
$$

Away from the origin and poles, the three coordinate directions are perpendicular. A radial step has length $dr$. A small change in $\theta$ has length $r\,d\theta$. A circle at fixed $r,\theta$ has radius $r\sin\theta$, so a small change in $\phi$ has length $r\sin\theta\,d\phi$. Squaring and adding these lengths, and including the time term, gives

$$
ds^2=-(dx^0)^2+dr^2+r^2d\theta^2+r^2\sin^2\theta\,d\phi^2,
$$

so

$$
g=-r^4\sin^2\theta,
\qquad
dV_4=c\,dt\,r^2\sin\theta\,dr\,d\theta\,d\phi.
$$

The factor $r^2\sin\theta$ converts the two angular widths and the radial width into physical spatial volume. The factor $c\,dt$ supplies the fourth, time-directed width. The vanishing determinant at $r=0$ or at a polar axis signals failure of this chart there; it does not mean the regular Minkowski metric becomes physically degenerate.

### 4.8 Curvature, bending, and local frames

A sheet can be rolled into a cylinder without stretching it. Distances and angles measured within a sufficiently small patch are unchanged, so its intrinsic curvature is zero. Its embedding in three-dimensional space is visibly bent. A flat sheet cannot smoothly cover a patch of a sphere while preserving all its lengths. The sphere’s intrinsic geometry differs from a plane’s.

Intrinsic curvature concerns measurements available to inhabitants of the geometry. Extrinsic curvature concerns how a chosen surface or other lower-dimensional space sits inside a larger geometry. Such an embedded space is called a **submanifold**. Both ideas occur in relativity: spacetime has intrinsic curvature, and a spatial slice can have extrinsic curvature within spacetime. They are different objects answering different questions.

Coordinate basis vectors need not be unit length or orthogonal. A physical laboratory instead likes an **orthonormal frame** $e_{\hat a}$ satisfying

$$
g(e_{\hat a},e_{\hat b})=\eta_{\hat a\hat b}.
$$

Hats here label laboratory directions. For an observer of four-velocity $U$, choose $e_{\hat0}=U/c$. The other three frame vectors specify their instantaneous spatial axes.

On the polar plane, $g_{rr}=1$ and $g_{\theta\theta}=r^2$. Thus $\partial_r$ already has unit length, while $\partial_\theta$ has length $r$. Divide the latter by $r$ to obtain an orthonormal frame:

$$
e_{\hat r}=\partial_r,
\qquad
e_{\hat\theta}=\frac1r\partial_\theta.
$$

Thus $V^{\hat r}=V^r$ and $V^{\hat\theta}=rV^\theta$. The physical tangential component includes the conversion from angle to arc length.

There is a subtle distinction between making the metric's components constant in a **frame** and finding **coordinates** in which they are constant throughout a neighborhood. The first is possible locally for a smooth Lorentzian metric. The second would make the neighborhood flat. A varying orthonormal frame generally cannot be the coordinate basis of one coordinate system; its axes can turn relative to one another from point to point. The connection keeps track of that turning.

At any ordinary event of a smooth spacetime, one can choose locally inertial coordinates with

$$
g_{\mu\nu}(p)=\eta_{\mu\nu},
\qquad
\partial_\rho g_{\mu\nu}(p)=0.
$$

This is stronger than merely choosing an orthonormal basis at the point, but it does not generally remove second-order departures from flatness. It is the mathematical doorway to the equivalence principle.

<a id="chapter-5"></a>

## 5. Free fall, the equivalence principle, and the worldline action

### 5.1 Coordinate acceleration and accelerometer readings

Standing on the ground, you assign yourself constant spatial coordinates. A dropped ball's coordinates accelerate downward. Everyday language calls you unaccelerated and the ball accelerated.

Now ask an accelerometer. Yours reads approximately the local gravitational acceleration because the floor pushes upward on you. An ideal accelerometer falling with the ball reads zero, ignoring air resistance and finite-size effects. Its case and internal proof mass follow free fall together, so the proof mass does not deflect relative to the case.

GR organizes its local inertial physics around that second distinction. **Free fall is zero proper acceleration.** Remaining at a fixed altitude near Earth requires a nongravitational force.

This does not make Newton's description useless or make gravity imaginary. It distinguishes a coordinate acceleration from a physical acceleration measured along a worldline. Later, tidal effects will reveal gravitational structure even when every individual accelerometer reads zero.

### 5.2 The equivalence principle

Newton’s equation can distinguish two roles for mass. **Inertial mass** $m_{\rm I}$ determines how much acceleration a force produces. **Passive gravitational mass** $m_{\rm G}$ determines the force exerted on the body by a given gravitational potential. Write

$$
m_{\rm I}\frac{d^2\mathbf x}{dt^2}=-m_{\rm G}\boldsymbol\nabla\Phi.
$$

Universality of free fall says the ratio $m_{\rm G}/m_{\rm I}$ is independent of a sufficiently small test body's composition and internal constitution, under the appropriate idealizations. A universal proportionality can be absorbed into the definition of the gravitational coupling, leaving $m_{\rm G}=m_{\rm I}$. Bodies with the same initial position and velocity then follow the same trajectory.

The **Einstein equivalence principle** extends the idea to local nongravitational physics: freely falling laboratories obey special relativity locally, and local nongravitational experiments do not acquire different laws merely from the laboratory's velocity or location. The **strong equivalence principle** extends the scope to gravitational experiments and self-gravitating bodies. The distinctions and their experimental roles are carefully organized in [Clifford Will's review of tests of gravitation](https://arxiv.org/abs/1403.7377).

To apply these principles, keep track of the size of the laboratory and the kind of body being modeled.

First, *local* matters. In freely falling coordinates the metric can be Minkowskian and its first derivatives zero at an event. Curvature can still produce measurable effects across a finite laboratory or after a finite time. Making the laboratory smaller suppresses such effects; it does not declare curvature nonexistent.

Second, the test-particle model neglects the body’s effect on the surrounding gravity and treats its size as negligible. Rotation, an uneven mass distribution, or an appreciable gravitational influence of the body itself can require additional terms in its motion law. Here we are deriving the simpler limit in which those effects can be neglected.

Third, the equivalence principle does not uniquely imply Einstein's field equation. Multiple theories can use a metric, respect the local free-fall picture, and supply different dynamics for that metric. We have learned how the local measuring system behaves; we have not yet derived what creates the gravitational field.

### 5.3 An accelerating laboratory in flat spacetime

Can clocks held at different positions run at different rates even in flat spacetime? An accelerating array of clocks gives a concrete example. We will construct its coordinates from the inertial coordinates we already know.

We will use $\sinh\chi=(e^\chi-e^{-\chi})/2$ and $\cosh\chi=(e^\chi+e^{-\chi})/2$, introduced in §3.3. Differentiating these definitions gives $d(\sinh\chi)/d\chi=\cosh\chi$ and $d(\cosh\chi)/d\chi=\sinh\chi$. Their identity $\cosh^2\chi-\sinh^2\chi=1$ will simplify the interval.

Start in flat spacetime with inertial coordinates $(T,X,Y,Z)$. Introduce an accelerating chart $(t,X,Y,z)$ through

$$
cT=\left(\frac{c^2}{a}+z\right)\sinh\left(\frac{at}{c}\right),
$$

$$
Z=\left(\frac{c^2}{a}+z\right)\cosh\left(\frac{at}{c}\right)-\frac{c^2}{a},
$$

with $a>0$ and $z>-c^2/a$. These are Rindler coordinates on a region of Minkowski spacetime. We are explicitly using $t$, rather than $ct$, as the time coordinate in this chart.

To differentiate these expressions, abbreviate $L=c^2/a+z$ and $\chi=at/c$. Then $dL=dz$ and $d\chi=(a/c)dt$, giving

$$
d(cT)=\sinh\chi\,dz+\frac{aL}{c}\cosh\chi\,dt,
\qquad
dZ=\cosh\chi\,dz+\frac{aL}{c}\sinh\chi\,dt.
$$

In $-[d(cT)]^2+dZ^2$, the two mixed terms cancel. The $dz^2$ coefficient becomes $\cosh^2\chi-\sinh^2\chi=1$ and the $dt^2$ coefficient becomes $-a^2L^2/c^2$. Restoring $L$ and adding the unchanged sideways terms gives

$$
ds^2=-\left(1+\frac{az}{c^2}\right)^2c^2dt^2
+dz^2+dX^2+dY^2.
$$

A clock at fixed $z,X,Y$ measures

$$
d\tau=\left(1+\frac{az}{c^2}\right)dt.
$$

Stationary clocks at different heights in this accelerating chart accumulate different proper times per coordinate time. Yet spacetime is exactly flat: we constructed the metric by changing coordinates in Minkowski space.

We can also calculate each clock's accelerometer reading. At fixed $z$, keep using $L=c^2/a+z$ and $\chi=at/c$. The clock rule above gives $d\chi/d\tau=c/L$. Differentiating the inertial coordinates with respect to proper time gives the four-velocity components $u^0=d(cT)/d\tau$ and $u^Z=dZ/d\tau$,

$$
u^0=c\cosh\chi,\qquad u^Z=c\sinh\chi.
$$

Differentiate once more. The two four-acceleration components are $(c^2/L)\sinh\chi$ and $(c^2/L)\cosh\chi$. Their squared spacetime norm is $(c^2/L)^2$, because $\cosh^2\chi-\sinh^2\chi=1$. Taking its positive square root gives the proper acceleration

$$
\alpha(z)=\frac{a}{1+az/c^2}.
$$

At $z=0$ the result is $a$, explaining the constant used in the coordinate transformation. Higher clocks have smaller proper acceleration. An array that maintains fixed separations therefore needs different accelerometer readings at different heights. Relativity puts restrictions on the notion of an accelerating rigid elevator.

The metric varies with $z$ and the clock rates differ, but the spacetime is flat: we constructed the whole example by relabeling Minkowski coordinates. A clock-rate difference alone therefore does not establish curvature. For a complementary derivation of these accelerating coordinates, see [Tong's treatment of the equivalence principle and Rindler motion](https://davidtong.org/pdfs/teaching/general-relativity/gr1.pdf).

### 5.4 An action for free fall

In flat spacetime, Chapter 3 showed that an inertial clock records the greatest proper time between fixed departure and reunion events. We now seek a motion law that uses the same local clock measurements when the metric varies from place to place.

An **action** assigns a number to an entire candidate history by integrating a chosen expression along it. We postulate that the actual free-particle history makes its first-order change vanish when the endpoints are fixed. For a massive test particle described only by its position, the standard model uses

$$
\boxed{S_{\rm particle}=-mc^2\int d\tau.}
$$

The action has units of energy times time. When we write $S=\int L\,dt$, the integrand $L$ is called the **Lagrangian**. In flat spacetime, this particle model gives $L=-mc^2\sqrt{1-v^2/c^2}$. Chapter 0’s square-root expansion gives $-mc^2+mv^2/2$ at low speed. The constant term has the same integral for every path between fixed endpoint times, leaving the familiar positive kinetic-energy term. The fixed overall factor does not affect the free trajectory for $m\ne0$.

Why this form? Proper time is a scalar quantity attached to the path, and the integral is unchanged if we relabel points along that path. With no additional internal structure or higher-derivative couplings, it is the simplest local relativistic free-particle action. We are adopting this model for structureless test particles. Bodies whose internal motion or gravitational influence matters can need additional terms.

“Stationary” means that the first-order action change vanishes for every sufficiently small change of the path that leaves its endpoints fixed. The comparison is a calculation we perform; the particle does not need to explore alternative paths. The next section translates this condition into a differential equation at each point of its motion.

A timelike **geodesic** is the free-fall path described by this model; the next section derives its equation. Sufficiently short segments locally maximize proper time. A long geodesic need not give the greatest elapsed time among every possible connecting path. Chapter 22 studies how families of such paths focus and why global maximizing claims need extra conditions.

### 5.5 Deriving the geodesic equation, one operation at a time

Choose an arbitrary increasing parameter $\lambda$ along a timelike path. A dot in this subsection means $d/d\lambda$. Define

$$
\ell=\sqrt{-g_{\mu\nu}(x)\dot x^\mu\dot x^\nu},
\qquad
d\tau=\frac{\ell}{c}\,d\lambda.
$$

Then $S_{\rm particle}=-mc\int\ell\,d\lambda$. Because the nonzero constant $-mc$ does not change the stationary paths, vary $I=\int\ell\,d\lambda$ instead.

Perturb the curve by

$$
x^\mu(\lambda)\longrightarrow x^\mu(\lambda)+s\,\eta^\mu(\lambda),
$$

where $s$ is a small number and $\eta^\mu$ vanishes at both endpoints. We take the derivative with respect to $s$ at $s=0$ and denote it by $\delta$.

Two things change: the metric is sampled at a slightly different point, and the tangent to the path changes. Specifically,

$$
\delta g_{\mu\nu}=\partial_\rho g_{\mu\nu}\,\eta^\rho,
\qquad
\delta\dot x^\mu=\dot\eta^\mu.
$$

Differentiate the square root using $\delta\sqrt{Q}=\delta Q/(2\sqrt Q)$. Metric symmetry combines the two tangent variations into one term:

$$
\delta\ell
=-\frac{1}{2\ell}\partial_\rho g_{\mu\nu}\,
\dot x^\mu\dot x^\nu\eta^\rho
-\frac{g_{\rho\nu}\dot x^\nu}{\ell}\dot\eta^\rho.
$$

The variation contains a derivative of the arbitrary deformation $\eta$. Recall integration by parts: integrate the product rule $(F\eta)'=F'\eta+F\eta'$ and rearrange to obtain $\int F\eta'=[F\eta]-\int F'\eta$. This transfers a derivative from the deformation to its coefficient:

$$
\delta I
=\left[-\frac{g_{\rho\nu}\dot x^\nu}{\ell}\eta^\rho\right]_{A}^{B}
+\int d\lambda\left[
\frac{d}{d\lambda}\left(\frac{g_{\rho\nu}\dot x^\nu}{\ell}\right)
-\frac{1}{2\ell}\partial_\rho g_{\mu\nu}\dot x^\mu\dot x^\nu
\right]\eta^\rho.
$$

The boundary term vanishes because the endpoint events are fixed. Inside the interval, each $\eta^\rho$ can be chosen freely. The only way the integral can vanish for every such deformation is for its coefficient to vanish:

$$
\frac{d}{d\lambda}\left(\frac{g_{\rho\nu}\dot x^\nu}{\ell}\right)
-\frac{1}{2\ell}\partial_\rho g_{\mu\nu}\dot x^\mu\dot x^\nu=0.
$$

This is an example of the **Euler–Lagrange equation**. For a general integrand $L(x,\dot x,\lambda)$, the same integration by parts gives

$$
\frac{d}{d\lambda}\frac{\partial L}{\partial\dot x^\rho}
-\frac{\partial L}{\partial x^\rho}=0.
$$

The partial derivatives treat position and tangent as separate inputs of $L$. Our calculation used $L=\ell$. To put that result into a motion equation, multiply by $\ell$ and expand the ordinary derivative:

$$
g_{\rho\nu}\ddot x^\nu
+\partial_\mu g_{\rho\nu}\dot x^\mu\dot x^\nu
-\frac12\partial_\rho g_{\mu\nu}\dot x^\mu\dot x^\nu
-\frac{\dot\ell}{\ell}g_{\rho\nu}\dot x^\nu=0.
$$

The product $\dot x^\mu\dot x^\nu$ is symmetric in $\mu,\nu$. Therefore the second term is unchanged if we replace its coefficient by its symmetrized version:

$$
\partial_\mu g_{\rho\nu}\dot x^\mu\dot x^\nu
=\frac12\left(\partial_\mu g_{\rho\nu}
+\partial_\nu g_{\rho\mu}\right)\dot x^\mu\dot x^\nu.
$$

Multiply by $g^{\alpha\rho}$ to remove the metric in front of $\ddot x^\nu$. The combination of metric derivatives that emerges is denoted

$$
\Gamma^\alpha{}_{\mu\nu}
\equiv\frac12g^{\alpha\rho}
\left(\partial_\mu g_{\rho\nu}
+\partial_\nu g_{\rho\mu}
-\partial_\rho g_{\mu\nu}\right).
$$

These are the Christoffel symbols of the Levi-Civita connection. For now they are the coefficients our variation has produced. Chapter 7 will explain their geometric origin and why they transform differently from tensor components.

Our result is

$$
\ddot x^\alpha+\Gamma^\alpha{}_{\mu\nu}\dot x^\mu\dot x^\nu
=\frac{d\ln\ell}{d\lambda}\dot x^\alpha.
$$

If we choose $\lambda=\tau$, then $\ell=c$, so its derivative vanishes. We obtain

$$
\boxed{\frac{d^2x^\alpha}{d\tau^2}
+\Gamma^\alpha{}_{\mu\nu}
\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}=0.}
$$

This is the timelike geodesic equation. It contains an ordinary coordinate acceleration plus a correction describing how the local coordinate basis and geometry change along the path. The whole combination is the covariant acceleration, which is zero in free fall.

Notice what disappeared: the test particle's mass. That is the universality of free fall appearing in the variational description.

### 5.6 Affine parameters

The same curve can be labeled in different ways. Numbering its points by a parameter $\lambda$ determines how quickly the coordinate functions change with $\lambda$, even when the geometric route stays fixed.

The geodesic equation with zero right-hand side chooses an **affine parameter**. For a timelike geodesic, proper time is affine, and so is

$$
\lambda=A\tau+B
$$

for constants $A\ne0$ and $B$. An increasing parameter uses $A>0$. A general nonlinear relabeling introduces a term parallel to the tangent, as the preceding derivation showed. Such a term changes the parameter’s rate along the curve while leaving the geodesic route unchanged.

One-dimensional flat-space example: the straight line $x(s)=s$ has $d^2x/ds^2=0$. Relabel it using $s=e^\lambda$. Now $x(\lambda)=e^\lambda$ and $d^2x/d\lambda^2=dx/d\lambda\ne0$. The line did not become geometrically curved. Its parameter became nonaffine.

The same issue occurs if coordinate time $t$ is used to parameterize a relativistic geodesic. In a general spacetime it need not be affine, so one must transform the equation correctly including the extra term when $t$ is nonaffine. These parameter subtleties and the null case are discussed in [Sean Carroll's notes, in the geodesics section](https://arxiv.org/pdf/gr-qc/9712019).

### 5.7 Following light with a null geodesic

For a light ray, $ds^2=0$ and $d\tau=0$. Proper time cannot parameterize the path. We therefore use an affine parameter $\lambda$ and write

$$
k^\mu=\frac{dx^\mu}{d\lambda},
\qquad
g_{\mu\nu}k^\mu k^\nu=0,
$$

with

$$
\frac{dk^\mu}{d\lambda}
+\Gamma^\mu{}_{\alpha\beta}k^\alpha k^\beta=0.
$$

We use this law for vacuum light when its wavelength is much smaller than the distances over which the geometry changes appreciably. In this **geometric-optics approximation**, a narrow wave packet follows a ray. Wave effects at longer wavelengths and propagation through matter require further analysis.

For a null geodesic, changing the affine scale changes $k^\mu$ without changing the route. The ray's geometry alone therefore does not fix a photon's energy. To identify the tangent with a physically normalized wave-vector or momentum, supply frequency or energy data from an observer.

Simply putting $m=0$ into $-mc^2\int d\tau$ makes the action vanish and yields no equation. A correct variational shortcut is the quadratic functional

$$
I_2=\frac12\int g_{\mu\nu}\dot x^\mu\dot x^\nu\,d\lambda.
$$

Here the partial derivatives of the integrand are $\partial L/\partial\dot x^\rho=g_{\rho\nu}\dot x^\nu$ and $\partial L/\partial x^\rho=\tfrac12\partial_\rho g_{\mu\nu}\dot x^\mu\dot x^\nu$. Substituting them into the Euler–Lagrange equation gives the affine geodesic equation from §5.5. Choose an initial tangent with $g_{\mu\nu}k^\mu k^\nu=0$; the motion equation preserves this value. Indeed, differentiating $g_{\mu\nu}k^\mu k^\nu$ and substituting the displayed Christoffel formula makes its derivative zero. **Do not restrict the entire family of varied curves to have identically zero integrand first** and then expect varying zero to provide dynamics.

<details class="history-note" data-no-narration>
<summary>Further calculation: imposing the null condition with a multiplier</summary>

We can impose the null condition within the variation itself. Introduce a positive function $e(\lambda)$ and vary it as well as the path. It is an **auxiliary field**: an extra quantity used to impose a condition, rather than a new moving particle. Consider

$$
I_0=\frac12\int e^{-1}g_{\mu\nu}\dot x^\mu\dot x^\nu\,d\lambda.
$$

The integrand contains $e$ but no derivative of $e$, so its equation is simply

$$
\frac{\partial L}{\partial e}
=-\frac{1}{2e^2}g_{\mu\nu}\dot x^\mu\dot x^\nu=0.
$$

This imposes nullness. Varying the path with the same Euler–Lagrange procedure gives

$$
\ddot x^\mu+\Gamma^\mu{}_{\alpha\beta}\dot x^\alpha\dot x^\beta
=\frac{\dot e}{e}\dot x^\mu.
$$

To see how the parameter can absorb $e$, set $d\sigma/d\lambda=e(\lambda)/e_0$ for a positive constant $e_0$. The action in the new parameter has the same form with $e$ replaced by $e_0$. Its derivative term vanishes, leaving an affine geodesic equation. The auxiliary function has enforced nullness while allowing us to choose a convenient parameter.

</details>

The parameter still is not time on a clock traveling with light. As in Chapter 3, a photon has no inertial rest frame; its energy is specified by a physical observer’s measurement.

### 5.8 Recovering Newton’s law of motion

Chapter 12 will relate the weak gravitational field to the Newtonian potential. Preview its slowly varying, weak-field result in a suitable nearly Cartesian chart:

$$
ds^2\simeq-\left(1+\frac{2\Phi}{c^2}\right)c^2dt^2+d\mathbf x^2,
$$

where $|\Phi|/c^2\ll1$, particle speeds obey $v^2/c^2\ll1$, and spatial-metric corrections affect the calculation below only at higher combined order. The potential $\Phi$ has units of velocity squared; for a localized spherical mass, $\Phi=-G_NM/r$ when its zero is chosen at infinity.

The clock rate along a slow timelike path is

$$
\frac{d\tau}{dt}
\simeq\sqrt{1+\frac{2\Phi}{c^2}-\frac{v^2}{c^2}}
\simeq1+\frac{\Phi}{c^2}-\frac{v^2}{2c^2}.
$$

Insert this into the particle action:

$$
S_{\rm particle}
\simeq\int dt\left[-mc^2+\frac12mv^2-m\Phi\right].
$$

For fixed endpoint times, the constant rest-energy term does not affect the path variation. The remaining Lagrangian is $L=mv^2/2-m\Phi=K-U$. For each Cartesian component, $\partial L/\partial v^i=mv^i$ and $\partial L/\partial x^i=-m\partial_i\Phi$. Substitution into the Euler–Lagrange equation gives

$$
m\frac{d^2\mathbf x}{dt^2}=-m\boldsymbol\nabla\Phi.
$$

The relativistic action has combined what Newton separated into kinetic and potential terms. This is not a derivation of the gravitational field equation: we supplied the appropriate weak-field metric as a preview. It is a consistency check that, given that metric, the relativistic motion law has the expected limit.

One should also resist the slogan “objects fall toward slower time” as a universal replacement for GR. It can convey part of slow motion in a static weak field. It does not contain spatial curvature, frame dragging, null propagation in full generality, or the behavior of time-dependent geometries.

### 5.9 Relative acceleration and tides

Take two nearby freely falling particles in Newtonian gravity, separated by $\xi^i$. Their individual accelerations are approximately $a^i=-\delta^{ij}\partial_j\Phi$. Subtract their equations and Taylor-expand the acceleration of the second particle about the first:

$$
\frac{d^2\xi^i}{dt^2}
=-\delta^{ik}\partial_k\partial_j\Phi\,\xi^j
+O(|\boldsymbol\xi|^2).
$$

The gradient of $\Phi$ controls the common acceleration. Its Hessian, the matrix of second derivatives, controls the relative acceleration. A falling frame can cancel the former at its origin; it cannot generally cancel the latter throughout its neighborhood.

For $\Phi=-G_NM/r$,

$$
\frac{d\Phi}{dr}=\frac{G_NM}{r^2},
\qquad
\frac{d^2\Phi}{dr^2}=-\frac{2G_NM}{r^3}.
$$

Two radially separated falling particles therefore have relative radial acceleration

$$
\frac{d^2\xi^{\hat r}}{dt^2}
\simeq\frac{2G_NM}{r^3}\xi^{\hat r}.
$$

They stretch apart radially because the lower one falls more strongly. Neighboring side-by-side particles instead converge toward the central mass. A cloud of freely falling beads changes shape even though each bead's ideal accelerometer reads zero.

This supplies an operational distinction:

| Question | Instrument or comparison | Geometric quantity to come |
|---|---|---|
| Am I being pushed away from free fall? | One ideal accelerometer | Proper acceleration of my worldline |
| How do these coordinate components change along my path? | A coordinate description and comparison rule | Connection coefficients |
| Do neighboring free-fall trajectories converge, diverge, or shear? | A finite arrangement of freely falling bodies | Spacetime curvature |

The next chapters build the language needed to express the last row without borrowing a preferred Newtonian frame. The connection will tell us how to compare directions. Curvature will tell us why those comparisons can fail to fit together around a loop. Einstein's equation will then say how that geometry is related to matter, energy, momentum, and stress.

<a id="chapter-6"></a>

## 6. Differentiation in a changing basis

### 6.1 A fixed arrow with changing components

Draw an arrow pointing east on a flat sheet. At each point of a circle around the origin, describe that same eastward direction using two local unit arrows: one pointing outward and one pointing around the circle. At the rightmost point, east is outward. At the top, east is opposite the direction of increasing angle. The direction stayed fixed, but its components changed.

A **vector field** assigns a vector to each position. A velocity field, for example, tells you the direction and speed of flow at every location. Its arrows are instructions about motion at those locations; they are not a photograph of separate particles. Start with the uniform eastward field below. Move P and Q around the circle and compare their component readouts. Then bring the two physical arrows to the same origin, where their difference is easy to see.

<div data-foundation-insert="vector-field"></div>

The uniform field and the rotating field give opposite surprises. A fixed physical arrow can have changing components. A turning physical arrow can have constant components. In both cases, the missing information is how the local frame changes. Our derivative must keep track of the whole arrow.

We can check the eastward example with the unit basis from §4.8. For the algebra, let $V$ denote the unit direction of the eastward flow. In fixed Cartesian components,

$$
\begin{aligned}
\hat e_r&=(\cos\theta,\sin\theta),\\
\hat e_\theta&=(-\sin\theta,\cos\theta).
\end{aligned}
$$

The eastward unit vector $V=(1,0)$ can therefore be written as

$$
V=\cos\theta\,\hat e_r-\sin\theta\,\hat e_\theta.
$$

Differentiating its two coefficients gives $-\sin\theta$ and $-\cos\theta$. If we stop there, we predict a changing vector. But the basis vectors also change:

$$
\frac{d\hat e_r}{d\theta}=\hat e_\theta,\qquad
\frac{d\hat e_\theta}{d\theta}=-\hat e_r.
$$

Apply the product rule to the whole expression for $V$:

$$
\begin{aligned}
\frac{dV}{d\theta}
&=(-\sin\theta\,\hat e_r+\cos\theta\,\hat e_\theta)\\
&\quad+(-\cos\theta\,\hat e_\theta+\sin\theta\,\hat e_r)=0.
\end{aligned}
$$

The cancellation agrees with the drawing. A useful derivative must account for changes of basis as well as changes of components.

This example used unit vectors. The polar *coordinate* basis is $\partial_r=\hat e_r$, $\partial_\theta=r\hat e_\theta$: its angular vector also changes length with radius. We now work in coordinate bases and use the chain rule to identify the general problem.

Let a vector field have components $V^\alpha$ in coordinates $x^\mu$. Under new coordinates $x'^\alpha(x)$, define the Jacobian and its inverse by

$$
J^\alpha{}_{\beta}=\frac{\partial x'^\alpha}{\partial x^\beta},
\qquad
K^\nu{}_{\mu}=\frac{\partial x^\nu}{\partial x'^\mu}.
$$

Then $V'^\alpha=J^\alpha{}_{\beta}V^\beta$. Apply the chain rule and the ordinary product rule:

$$
\partial'_\mu V'^\alpha
=
K^\nu{}_{\mu}J^\alpha{}_{\beta}\partial_\nu V^\beta
+
K^\nu{}_{\mu}(\partial_\nu J^\alpha{}_{\beta})V^\beta.
$$

The first term is exactly how a tensor with one upper and one lower index should transform. The second term is the trouble: it involves derivatives of the coordinate transformation itself. A tensor transformation changes the description of an object using the Jacobian at the point; it does not need second derivatives of the map.

Notice when the trouble disappears. A Cartesian rotation or a Lorentz transformation has a constant Jacobian, so the extra term vanishes. For these transformations, differentiating the components already gives a tensor. A position-dependent change of coordinates requires the extra correction.

The solution is to differentiate the geometric vector, accounting for the changing local basis. We call the resulting operation the **covariant derivative**.

### 6.2 What a derivative must be able to compare

There is a subtlety even before the algebra. A vector at event $p$ belongs to $T_pM$, the tangent space at $p$. A vector at a neighboring event $q$ belongs to $T_qM$. These are different vector spaces. Subtracting their component lists does not, by itself, define a geometric subtraction.

On the plane we could compare arrows using one fixed Cartesian basis. A general manifold does not come with that common basis. A **connection** supplies a rule for comparing vectors at neighboring points. Repeating the comparison along a path will let us transport a vector from one point to another; different paths can give different results.

In a coordinate basis $e_\nu=\partial/\partial x^\nu$, define connection coefficients by

$$
\nabla_\mu e_\nu=\Gamma^\rho{}_{\mu\nu}e_\rho.
$$

Here $\nabla_\mu$ means differentiation along coordinate direction $\mu$ using the chosen comparison rule. The coefficients $\Gamma^\rho{}_{\mu\nu}$ describe the resulting change of basis vector $e_\nu$. They generalize the basis derivatives we just calculated on the plane.

Apply the product rule to $V=V^\nu e_\nu$:

$$
\begin{aligned}
\nabla_\mu V
&=\partial_\mu V^\nu\,e_\nu+V^\nu\nabla_\mu e_\nu\\
&=\left(\partial_\mu V^\rho+\Gamma^\rho{}_{\mu\nu}V^\nu\right)e_\rho.
\end{aligned}
$$

Therefore

$$
\boxed{\nabla_\mu V^\rho
=\partial_\mu V^\rho+\Gamma^\rho{}_{\mu\nu}V^\nu.}
$$

The first term measures changing components. The second corrects for the comparison of local bases. Neither term separately has to be a tensor; their sum does.

The derivative index $\mu$ is a lower index because differentiation asks for a direction as its input. If $X^\mu$ specifies that direction, then $\nabla_XV=X^\mu\nabla_\mu V$ is a vector. Before choosing $X$, $\nabla V$ is a tensor with an extra covector slot waiting to receive it.

### 6.3 Why covectors acquire a minus sign

A covector $\omega$ assigns a scalar to a vector $V$. In components,

$$
f=\omega_\nu V^\nu.
$$

A scalar has no moving basis indices to correct, so $\nabla_\mu f=\partial_\mu f$. We also require a derivative to obey the product rule and respect contractions:

$$
\partial_\mu(\omega_\nu V^\nu)
=(\nabla_\mu\omega_\nu)V^\nu
+\omega_\nu\nabla_\mu V^\nu.
$$

Substitute the vector derivative. The final term contributes $+\omega_\nu\Gamma^\nu{}_{\mu\lambda}V^\lambda$. There is no corresponding connection term in the ordinary derivative of the scalar on the left. The covector derivative must cancel it, for every possible vector. Thus

$$
\boxed{\nabla_\mu\omega_\nu
=\partial_\mu\omega_\nu-\Gamma^\lambda{}_{\mu\nu}\omega_\lambda.}
$$

The opposite signs keep differentiation of the scalar pairing consistent: the vector correction and covector correction cancel.

For a general tensor, every upper index gets a plus correction and every lower index gets a minus correction. For example,

$$
\begin{aligned}
\nabla_\mu T^{\alpha\beta}{}_{\gamma}
={}&\partial_\mu T^{\alpha\beta}{}_{\gamma}
+\Gamma^\alpha{}_{\mu\lambda}T^{\lambda\beta}{}_{\gamma}
+\Gamma^\beta{}_{\mu\lambda}T^{\alpha\lambda}{}_{\gamma}\\
&-\Gamma^\lambda{}_{\mu\gamma}T^{\alpha\beta}{}_{\lambda}.
\end{aligned}
$$

Each correction replaces exactly one index with a summed index. Every term retains the same free indices $\mu,\alpha,\beta,\gamma$. Checking those free indices helps catch an incorrectly placed index.

Respecting contractions means, for example,

$$
\nabla_\mu(T^\alpha{}_{\alpha})
=(\nabla_\mu T)^\alpha{}_{\alpha}.
$$

The two connection corrections cancel after a dummy-index relabeling. However, **raising an index is an additional operation involving the metric**. Commuting differentiation with raising and lowering requires metric compatibility, $\nabla g=0$, which we will impose and examine in §7.2. Compatibility with vector–covector contraction and compatibility with the metric are related ideas, but are not identical assumptions.

### 6.4 Taking a second derivative of a scalar

For a scalar field $f$,

$$
\nabla_\mu f=\partial_\mu f.
$$

After one differentiation, the result is the **covector** $df$, with components $\partial_\nu f$. Its derivative therefore needs the covector correction:

$$
\boxed{\nabla_\mu\nabla_\nu f
=\partial_\mu\partial_\nu f
-\Gamma^\lambda{}_{\mu\nu}\partial_\lambda f.}
$$

This is the **covariant Hessian**. The metric connection derived in §5.5 has $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$, so this Hessian is symmetric in $\mu,\nu$. Section 7.2 will explain the name *torsion-free* for that symmetry in a coordinate basis. Ordinary second partial derivatives are symmetric too, but generally lack the correction needed to transform as a tensor.

There is one useful special case. At a critical point, where $\partial_\lambda f=0$, the correction vanishes. The Hessian computed there with ordinary second derivatives has a coordinate-independent meaning as a bilinear form. This is why classifying a stationary point as a maximum, minimum, or saddle can be done intrinsically despite using coordinate derivatives.

A related distinction: $df$, with components $\partial_\mu f$, is a covector defined without a metric. The **gradient vector** is

$$
(\operatorname{grad}f)^\mu=g^{\mu\nu}\partial_\nu f,
$$

and does require a metric. In Euclidean space these objects are often merged into one mental image. For example, in Cartesian Minkowski coordinates, $(\operatorname{grad}f)^0=-\partial_0f$. The covector and gradient vector therefore need different component lists even in this simple frame.

### 6.5 Divergence and physical volume

The **divergence** contracts the derivative index with the vector index. It extends the net-outflow calculation from Chapter 0 to general coordinates:

$$
\nabla_\mu V^\mu
=\partial_\mu V^\mu+\Gamma^\mu{}_{\mu\nu}V^\nu.
$$

Use the Christoffel formula obtained from the free-particle action in §5.5. We will derive it again from geometric requirements in §7.3. In its trace $\Gamma^\mu{}_{\mu\nu}$, the first and third metric-derivative terms cancel after relabeling their summed indices. The remaining term gives

$$
\Gamma^\mu{}_{\mu\nu}
=\frac12g^{\alpha\beta}\partial_\nu g_{\alpha\beta}
=\partial_\nu\ln\sqrt{-g},
\qquad g=\det(g_{\alpha\beta}).
$$

Here $g$ is the metric determinant, which is negative for our spacetime signature. The logarithmic derivative is shorthand for $(1/\sqrt{-g})\partial_\nu\sqrt{-g}$; equivalently one can take the logarithm of the ratio to a fixed reference with the same units.

To see the matrix identity behind this step, perturb an invertible matrix $A$ by a small amount $\epsilon B$:

$$
\begin{aligned}
\det(A+\epsilon B)
&=\det A\,\det(I+\epsilon A^{-1}B)\\
&=\det A\left[1+\epsilon\operatorname{tr}(A^{-1}B)
+O(\epsilon^2)\right].
\end{aligned}
$$

Why does the trace appear? In the determinant of $I+\epsilon C$, a first-order contribution chooses one diagonal perturbation and leaves every other diagonal entry equal to one. Their sum is $\epsilon\sum_i C^i{}_i$. Terms involving off-diagonal entries require at least two perturbations. Thus the fractional change of $\det A$ is $\epsilon\operatorname{tr}(A^{-1}B)$ to first order. Taking its square root supplies the factor $1/2$ used above.

Combining the two terms by the product rule gives

$$
\boxed{\nabla_\mu V^\mu
=\frac{1}{\sqrt{-g}}\partial_\mu\left(\sqrt{-g}\,V^\mu\right).}
$$

Why should the determinant appear? A coordinate box of side lengths $dx^\mu$ represents physical four-volume $\sqrt{-g}\,d^4x$. A flow can have changing coordinate components merely because the coordinate boxes expand or shrink. Divergence measures net outflow per physical volume, so it must include that change in the measuring boxes.

In an $n$-dimensional Riemannian space, replace $\sqrt{-g}$ by $\sqrt{g}$; the general expression uses $\sqrt{|g|}$. The idea is the same.

We can now take the divergence of a gradient. In spacetime this combination is called the **wave operator**, written $\Box$ (read “box”):

$$
\boxed{\Box f
=\nabla_\mu\nabla^\mu f
=\frac{1}{\sqrt{-g}}\partial_\mu
\left(\sqrt{-g}\,g^{\mu\nu}\partial_\nu f\right).}
$$

In Cartesian Minkowski coordinates, the metric and its determinant are constant. The inverse metric supplies one minus sign; $x^0=ct$ gives $\partial_0=c^{-1}\partial_t$. Therefore

$$
\Box f=-\frac1{c^2}\frac{\partial^2 f}{\partial t^2}
+\frac{\partial^2 f}{\partial x^2}
+\frac{\partial^2 f}{\partial y^2}
+\frac{\partial^2 f}{\partial z^2}.
$$

In the simplest scalar wave model, the field obeys the **wave equation** $\Box f=0$. As in Chapter 2, a scalar field assigns one coordinate-independent value to each event. We can see why this equation describes waves by constructing a solution. Choose a smooth profile $F$ and set $f(t,x)=F(x-ct)$, with no $y$ or $z$ dependence. The profile moves to the right at speed $c$: after time $\Delta t$, the same value of its argument occurs a distance $c\Delta t$ farther right. Differentiating gives

$$
\partial_t^2f=c^2F''(x-ct),\qquad
\partial_x^2f=F''(x-ct),\qquad \Box f=0.
$$

The primes here mean derivatives of $F$ with respect to its one argument. We have verified a traveling-wave solution. The curved-spacetime formula above includes the metric and volume factors needed to state the same scalar-field law in other geometries. Other kinds of field can have different equations; this is the scalar example.

A tensor with two upper indices has a second basis index to correct. Contracting one with the derivative index does not remove the other. Thus

$$
\nabla_\mu T^{\mu\nu}
=\frac{1}{\sqrt{-g}}\partial_\mu
\left(\sqrt{-g}\,T^{\mu\nu}\right)
+\Gamma^\nu{}_{\mu\lambda}T^{\mu\lambda}.
$$

The volume factor accounts for the contracted index $\mu$; the final connection term accounts for the remaining index $\nu$. We will need both terms when differentiating the stress-energy tensor in Chapter 11.

### 6.6 When the order of two flows matters

A vector field can tell a point how to move: at every instant, follow the arrow at the point’s current location. The resulting motion is called the field’s **flow**. A velocity field uses time as its parameter; a mathematical flow can use another curve parameter.

Consider two instructions on a flat plane. The field $X$ moves a point horizontally at unit rate. The field $Y$ moves it vertically at rate $x$, so its arrows get longer farther to the right. Follow each instruction for a small parameter step $h$. The coordinates $x,y$ and the parameter $h$ are dimensionless in this example.

Starting from $(1,0)$, does X followed by Y reach the same place as Y followed by X? The **Lie bracket**—pronounced “lee”—measures the leading difference between these orders. First watch the two routes.

<div data-foundation-insert="flow-order"></div>

For X then Y, the horizontal step first changes $x$ to $1+h$. The vertical flow is now stronger, and its step raises $y$ by $h(1+h)$. For Y then X, the vertical step happens while $x$ is still one, so it raises $y$ only by $h$. The endpoints are

$$
A=(1+h,h+h^2),\qquad B=(1+h,h).
$$

Their difference is $(0,h^2)$. A smaller step makes the gap smaller, but dividing the gap by $h^2$ always gives the same upward vector $(0,1)$. This remaining vector is $[X,Y]$ for these fields.

Why does the square of the step appear? The first move changes where the second instruction is sampled. Over a small X step, the component $Y^i$ changes by $hX^j\partial_jY^i$ to first order. Following that changed field for another step $h$ contributes $h^2X^j\partial_jY^i$. Reversing the order gives $h^2Y^j\partial_jX^i$ instead. The other second-order terms occur in both routes and cancel. Thus, for smooth fields, the leading endpoint difference is $h^2[X,Y]$, where

$$
\boxed{[X,Y]^i=X^j\partial_jY^i-Y^j\partial_jX^i.}
$$

The $i$ index labels the component of the resulting vector; $j$ is summed over the coordinate directions. In our example, $X=(1,0)$ and $Y=(0,x)$. Only $\partial_xY^y=1$ contributes, so $[X,Y]=(0,1)=\partial_y$.

We can also recognize this vector by its action on a scalar function. Recall from §4.3 that $X[f]$ means the directional derivative of $f$ along $X$. The ordinary product rule gives

$$
X[Y[f]]-Y[X[f]]
=\left(X^j\partial_jY^i-Y^j\partial_jX^i\right)\partial_i f
=[X,Y][f].
$$

The mixed second derivatives of the smooth function $f$ cancel. In this operator language, the bracket is a **commutator**: one composition minus the reversed composition. A bracket of zero means the flows agree through this leading comparison; constant coordinate directions such as $\partial_x$ and $\partial_y$ have zero bracket.

The plane in the experiment has remained flat throughout. The endpoint gap comes from position-dependent instructions. In §7.2, subtracting this effect will be essential to defining torsion without confusing it with the behavior of the chosen vector fields.

<details class="history-note" data-no-narration>
<summary>Check the distinction in a polar frame</summary>

On a regular polar patch with $r>0$, the coordinate fields $\partial_r$ and $\partial_\theta$ commute. Their components in their own coordinate basis are constant. The unit angular direction is instead $\hat e_\theta=r^{-1}\partial_\theta$, while $\hat e_r=\partial_r$. Its factor $1/r$ changes with position:

$$
[\hat e_r,\hat e_\theta]
=[\partial_r,r^{-1}\partial_\theta]
=-r^{-2}\partial_\theta
=-\frac1r\hat e_\theta.
$$

The nonzero bracket belongs to this choice of unit frame on an ordinary flat plane. It does not indicate curvature or torsion. This is why a formula stated for a coordinate basis cannot always be copied unchanged into a moving unit frame.

</details>

<a id="chapter-7"></a>

## 7. The connection: how neighboring laboratories compare directions

### 7.1 Parallel transport along a path

Put a small arrow on a flat sheet. Slide its base around a triangle without turning the arrow. At a corner, your route changes direction, but the arrow keeps pointing the same way. Back at the starting point, its direction is unchanged.

Now roll the sheet into a cylinder. The arrow must tip in the surrounding room to stay flat against the sheet. That tipping is unavoidable; an extra twist within the sheet is not. **Parallel transport** carries a direction while allowing only the change required by the local geometry. On these surfaces, we can see it as keeping the arrow tangent without turning it within its tangent plane.

Try the plane and rolled sheet first. Then try the sphere. Its path follows **great circles**: intersections of the sphere with planes through its center. The equator is one example. Three arcs make the triangle. The blue arrow records the starting direction at A; the pink arrow travels. The question is what happens when both arrows can be compared at A again.

<div data-foundation-insert="transport"></div>

On the plane and cylinder the arrow returns unchanged. On the sphere, it can return rotated even though we added no local twist along the way. We have separated two questions: how to carry a vector through each small step, and whether carrying it around a whole loop returns it unchanged. The connection answers the first. Curvature, developed in Chapter 8, answers the local version of the second.

To express the carrying rule in coordinates, take a curve $x^\mu(\lambda)$ and a vector $V^\mu(\lambda)$ attached to its points. The covariant derivative along the curve is

$$
\frac{DV^\mu}{d\lambda}
=\frac{dV^\mu}{d\lambda}
+\Gamma^\mu{}_{\alpha\beta}
\frac{dx^\alpha}{d\lambda}V^\beta.
$$

We say $V$ is **parallel transported** when this derivative vanishes:

$$
\frac{DV^\mu}{d\lambda}=0.
$$

To carry this out, choose the vector at the starting point and rearrange the equation as $dV^\mu/d\lambda=-\Gamma^\mu{}_{\alpha\beta}\dot x^\alpha V^\beta$. The known path and connection tell us how to update its components at each step. This is a linear first-order differential equation, with a locally unique solution for smooth coefficients. In a flat Cartesian basis, $\Gamma=0$ and the components simply stay constant.

If the transported vector is the tangent to the path itself, the prescription becomes

$$
\frac{D}{d\lambda}\frac{dx^\mu}{d\lambda}=0,
$$

which is the affinely parameterized geodesic equation. A geodesic transports its own direction. This supplies a precise meaning of “as straight as possible” that does not require drawing the curve inside a larger space.

An ideal gyroscope carried by a freely falling laboratory gives a physical example: its spin orientation is parallel transported when no torque acts on it. This example assumes free fall as well as the absence of torque.

### 7.2 Two requirements that select ordinary GR's connection

A manifold can carry many connections. Standard metric GR chooses the **Levi-Civita connection**, characterized by two conditions.

First, **metric compatibility**:

$$
\nabla_\lambda g_{\mu\nu}=0.
$$

This says the connection preserves the metric's inner products. If $V$ and $W$ are parallel transported along the same curve, the product rule gives

$$
\frac{d}{d\lambda}g(V,W)
=(\nabla_{\dot x}g)(V,W)
+g(\nabla_{\dot x}V,W)+g(V,\nabla_{\dot x}W)=0.
$$

Thus their lengths and mutual inner product remain fixed under transport. In Lorentzian geometry, causal character is preserved too: timelike vectors remain timelike, and null vectors remain null.

The condition does **not** say $\partial_\lambda g_{\mu\nu}=0$ everywhere. Metric components may vary because the coordinates vary. Compatibility says the connection accounts for that variation consistently.

Second, **zero torsion**. For vector fields $X,Y$, torsion is

$$
\mathcal T(X,Y)=\nabla_XY-\nabla_YX-[X,Y],
$$

where $[X,Y]$ is their Lie bracket. The subtraction removes the failure of the vector fields themselves to form commuting coordinate directions. In a coordinate basis, $[\partial_\mu,\partial_\nu]=0$, so

$$
\mathcal T^\rho{}_{\mu\nu}
=\Gamma^\rho{}_{\mu\nu}-\Gamma^\rho{}_{\nu\mu}.
$$

Torsion-free therefore means symmetry of the lower two connection indices **in a coordinate basis**. For a frame whose basis fields have a nonzero bracket, that bracket must still be subtracted. Symmetry of the connection coefficients alone would then be a different condition.

The flat-plane example in [§6.6](chapter-6.html#6-6-when-the-order-of-two-flows-matters) already has $[\partial_x,x\partial_y]=\partial_y$. Its ordinary Euclidean connection nevertheless has zero torsion: $\nabla_{\partial_x}(x\partial_y)=\partial_y$ and $\nabla_{x\partial_y}\partial_x=0$, so the bracket cancels their difference. A nonzero bracket of chosen fields therefore does not imply torsion. We choose zero torsion in ordinary GR; other gravity theories can make a different choice.

### 7.3 Deriving the Christoffel symbols

Expand metric compatibility:

$$
\partial_\mu g_{\nu\sigma}
=g_{\lambda\sigma}\Gamma^\lambda{}_{\mu\nu}
+g_{\nu\lambda}\Gamma^\lambda{}_{\mu\sigma}.
$$

There are two connection terms because the metric has two lower indices. Now write the same statement with the indices permuted:

$$
\begin{aligned}
\partial_\nu g_{\mu\sigma}
&=g_{\lambda\sigma}\Gamma^\lambda{}_{\nu\mu}
+g_{\mu\lambda}\Gamma^\lambda{}_{\nu\sigma},\\
\partial_\sigma g_{\mu\nu}
&=g_{\lambda\nu}\Gamma^\lambda{}_{\sigma\mu}
+g_{\mu\lambda}\Gamma^\lambda{}_{\sigma\nu}.
\end{aligned}
$$

Add the first two equations and subtract the third. Why this particular maneuver? We want to isolate the connection with lower indices $\mu\nu$. The unwanted terms pair off because torsion-free symmetry lets us exchange the lower two indices of $\Gamma$:

$$
\partial_\mu g_{\nu\sigma}
+\partial_\nu g_{\mu\sigma}
-\partial_\sigma g_{\mu\nu}
=2g_{\sigma\lambda}\Gamma^\lambda{}_{\mu\nu}.
$$

The inverse metric removes $g_{\sigma\lambda}$. Multiply by $\tfrac12g^{\rho\sigma}$:

$$
\boxed{
\Gamma^\rho{}_{\mu\nu}
=\frac12g^{\rho\sigma}
\left(
\partial_\mu g_{\nu\sigma}
+\partial_\nu g_{\mu\sigma}
-\partial_\sigma g_{\mu\nu}
\right).
}
$$

This proves uniqueness: any torsion-free, metric-compatible connection must have these coefficients. Existence follows by checking the formula: it is symmetric in $\mu\nu$, substitution gives $\nabla g=0$, and the chain rule supplies the connection transformation law below. There is exactly one such connection for every smooth nondegenerate metric.

This is the same formula that appeared in the free-particle equation in §5.5. It now has a second interpretation: it is the comparison rule that preserves inner products and has zero torsion.

Metric compatibility also gives $\nabla_\lambda g^{\mu\nu}=0$. Differentiate $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_{\nu}$, use the product rule and $\nabla g=0$, and multiply by the inverse metric. Raising and lowering indices now commute with covariant differentiation.

### 7.4 Why a connection is geometric but its coefficients are not a tensor

Under a coordinate change,

$$
\boxed{
\begin{aligned}
\Gamma'^\alpha{}_{\mu\nu}
={}&\frac{\partial x'^\alpha}{\partial x^\rho}
\frac{\partial x^\sigma}{\partial x'^\mu}
\frac{\partial x^\lambda}{\partial x'^\nu}
\Gamma^\rho{}_{\sigma\lambda}\\
&+\frac{\partial x'^\alpha}{\partial x^\rho}
\frac{\partial^2x^\rho}{\partial x'^\mu\partial x'^\nu}.
\end{aligned}}
$$

The first line resembles the transformation of a $(1,2)$ tensor. The second line is the essential extra term.

Here is the product-rule step. Using the Jacobian $J$ and its inverse $K$ from Chapter 6, write $e'_\nu=K^\lambda{}_{\nu}e_\lambda$. Then

$$
\nabla_{e'_\mu}e'_\nu
=K^\sigma{}_{\mu}(\partial_\sigma K^\rho{}_{\nu})e_\rho
+K^\sigma{}_{\mu}K^\lambda{}_{\nu}
\Gamma^\rho{}_{\sigma\lambda}e_\rho.
$$

Replace $e_\rho$ by $J^\alpha{}_{\rho}e'_\alpha$ and read off its coefficient. The second term gives the first line of the transformation law. In the first term, $K^\sigma{}_{\mu}\partial_\sigma=\partial'_\mu$ differentiates $K^\rho{}_{\nu}=\partial x^\rho/\partial x'^\nu$, producing the second derivative on the second line.

The inhomogeneous term cancels the unwanted second derivatives in $\partial'_\mu V'^\alpha$. This cancellation makes the complete covariant derivative transform as a tensor.

A tensor that vanishes in one coordinate system at a point vanishes in every coordinate system there. Connection coefficients can vanish at a point in one system and be nonzero in another. They therefore cannot themselves be a tensor measuring gravitational curvature.

Nevertheless, the **difference of two connections** is a tensor. If $A^\rho{}_{\mu\nu}=\Gamma^\rho{}_{\mu\nu}-\widetilde\Gamma^\rho{}_{\mu\nu}$, the second-derivative terms cancel under transformation. This fact underlies comparisons between a background connection and a perturbed connection. Also, $\delta\Gamma$ in a metric variation is tensorial when comparing connections on the same manifold with the same coordinate identification. That observation will become useful in the action derivation.

For additional derivations of connections and their relation to transport, see [Sean Carroll's university lecture notes, “Curvature”](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll3.html). The calculations here use the conventions stated in this book.

### 7.5 Five calculations on the polar plane

We can test the formulas by describing a flat plane in polar coordinates. The geometry is already known, so each calculation has an independent Cartesian check. Away from the origin, use

$$
x=r\cos\theta,\qquad y=r\sin\theta,
$$

and

$$
ds^2=dr^2+r^2d\theta^2.
$$

Thus $g_{rr}=1$, $g_{\theta\theta}=r^2$, and $g^{\theta\theta}=r^{-2}$. An angular coordinate is dimensionless, so $g_{\theta\theta}$ has units of length squared. Metric components need not all have the same units when their coordinates do not.

Only one metric derivative is nonzero: $\partial_rg_{\theta\theta}=2r$. For example, set the three free indices in the Christoffel formula to $r,\theta,\theta$. Since the inverse metric is diagonal, only its $rr$ entry contributes:

$$
\Gamma^r{}_{\theta\theta}
=\frac12g^{rr}\left(2\partial_\theta g_{r\theta}
-\partial_rg_{\theta\theta}\right)
=\frac12(0-2r)=-r.
$$

Doing the same substitution for the other indices gives the complete nonzero list:

$$
\Gamma^r{}_{\theta\theta}=-r,
\qquad
\Gamma^\theta{}_{r\theta}
=\Gamma^\theta{}_{\theta r}=\frac1r,
$$

with every other coefficient zero.

These values have simple origins. Moving around a circle changes the radial direction, while the angular coordinate basis vector $\partial_\theta$ has length $r$. Its scale changes when you move radially. The connection records both effects.

**Experiment 1: a vector that is actually constant.** Take $V=\partial_x$, a unit vector pointing in the same Cartesian direction everywhere. Its polar components are

$$
V^r=\cos\theta,
\qquad
V^\theta=-\frac{\sin\theta}{r}.
$$

The ordinary derivatives are not all zero. But the covariant derivatives are:

$$
\begin{aligned}
\nabla_rV^r&=0,\\
\nabla_\theta V^r
&=-\sin\theta+(-r)\left(-\frac{\sin\theta}{r}\right)=0,\\
\nabla_rV^\theta
&=\frac{\sin\theta}{r^2}
+\frac1r\left(-\frac{\sin\theta}{r}\right)=0,\\
\nabla_\theta V^\theta
&=-\frac{\cos\theta}{r}+\frac1r\cos\theta=0.
\end{aligned}
$$

Every covariant derivative vanishes, agreeing with the constant Cartesian vector. Here $V^\theta=-\sin\theta/r$, while the unit-frame component in §6.1 was $V^{\hat\theta}=-\sin\theta$. The factor $1/r$ comes from the length of the angular coordinate basis vector.

**Experiment 2: compatibility with a visibly changing metric.** Although $\partial_rg_{\theta\theta}=2r$,

$$
\nabla_rg_{\theta\theta}
=2r-2\Gamma^\theta{}_{r\theta}g_{\theta\theta}
=2r-2\frac1r r^2=0.
$$

There is no contradiction between nonconstant metric components and a covariantly constant metric.

**Experiment 3: a straight line with coordinate acceleration.** The geodesic equations are

$$
\ddot r-r\dot\theta^2=0,
\qquad
\ddot\theta+\frac{2\dot r\dot\theta}{r}=0,
$$

where dots mean differentiation with respect to an affine parameter. The second equation says $d(r^2\dot\theta)/d\lambda=0$.

For a concrete check, choose $\lambda$ to be time and take the Cartesian motion $x=v\lambda$, $y=b$, with constant speed $v>0$ and fixed distance $b>0$. Transforming to polar coordinates and differentiating gives

$$
r=\sqrt{v^2\lambda^2+b^2},
\qquad
\dot\theta=-\frac{bv}{r^2},
\qquad
\ddot r=\frac{v^2b^2}{r^3}=r\dot\theta^2.
$$

Its radial coordinate accelerates even though the path is perfectly straight. The $r\dot\theta^2$ term is the coordinate accounting needed to express zero geometric acceleration. A nonzero $d^2x^\mu/d\lambda^2$ is not, by itself, a physical acceleration measurement.

**Experiment 4: transporting around a full circle.** Along $r=r_0$, parallel transport obeys

$$
\frac{dV^r}{d\theta}=r_0V^\theta,
\qquad
\frac{d(r_0V^\theta)}{d\theta}=-V^r.
$$

These are the equations for a rotating pair of components. The vector remains fixed in Cartesian space while the polar basis rotates underneath it. After $2\pi$, the components return to their initial values. The loop causes no net geometric rotation.

**Experiment 5: divergence and the Laplacian.** Since $\sqrt{g}=r$,

$$
\nabla_aV^a
=\frac1r\partial_r(rV^r)+\partial_\theta V^\theta,
$$

where $a$ here ranges over the two coordinates. The physical angular component in a unit-length basis is $V^{\hat\theta}=rV^\theta$. Replacing $V^\theta$ by $V^{\hat\theta}/r$ gives the angular divergence term $r^{-1}\partial_\theta V^{\hat\theta}$. The factor $1/r$ converts change per angular increment into change per physical length.

In this spatial geometry, the divergence of a gradient is called the **Laplacian**, written $\Delta$. Insert $(\operatorname{grad}f)^r=\partial_rf$ and $(\operatorname{grad}f)^\theta=r^{-2}\partial_\theta f$ into the divergence formula:

$$
\Delta f
=\frac1r\partial_r(r\partial_rf)
+\frac1{r^2}\partial_\theta^2f.
$$

Check it on $f=r^2=x^2+y^2$. The polar formula gives

$$
\Delta f=\frac1r\partial_r(r\,2r)
+\frac1{r^2}\partial_\theta^2(r^2)=4.
$$

In Cartesian coordinates, the same operator is $\partial_x^2+\partial_y^2$, giving $2+2=4$. Using just $\partial_r^2f+\partial_\theta^2f$ would instead give 2. The metric and volume factors are needed for the two calculations to agree.

We have nonzero Christoffel symbols, changing basis components, and coordinate acceleration, all in flat space. The final experiment—checking the curvature itself—belongs to the next chapter.

<a id="chapter-8"></a>

## 8. Curvature and transport around a loop

In the [transport experiment](chapter-7.html#parallel-transport-lab), the plane and rolled sheet returned the arrow unchanged, while the sphere could return it rotated. Both directions are compared at the same starting point, so changing coordinate labels cannot remove their mismatch. This return transformation is called **holonomy**. For the sphere’s tangent plane, it is a rotation.

Shrink the sphere’s triangle. The return angle becomes smaller, approaching zero with the enclosed area. What remains after dividing by that small area is a local measure of curvature. On a sphere of radius $R$, its magnitude is $1/R^2$. Increasing $R$ while keeping the same angular triangle does not change the rotation: the physical area grows as $R^2$ while the curvature falls as $1/R^2$.

There is another way to make the comparison: start with two identical arrows at A, carry them along different routes, and let them meet at C. Now both arrows live in C’s tangent plane. Their angle can be measured there with no further transport.

<div data-foundation-insert="transport-routes"></div>

The arrows meet at the same point in every version of this experiment. On the plane and rolled sheet, their directions agree. On the sphere, they generally disagree. This differs from the [two-flow experiment](chapter-6.html#flow-order): there, changing instructions carried the points to different destinations even on a flat plane. Here, the destinations are fixed; it is the transported direction that remembers the route.

Following the route via B from A to C and the direct route backward from C to A makes a closed loop. Transport along that last leg preserves the angle between the arrows, so the mismatch at C is exactly the return rotation at A. The open-route comparison and the closed-loop experiment measure the same effect.

To calculate this effect for a small loop, we need to compare derivatives taken in two different orders.

### 8.1 Comparing two orders of differentiation

For an ordinary smooth scalar in ordinary coordinates, mixed partial derivatives commute:

$$
\partial_\mu\partial_\nu f=\partial_\nu\partial_\mu f.
$$

But a vector transported and compared through changing tangent spaces contains extra structure. Differentiating first in one direction and then another need not give the same answer as reversing the order.

Using the torsion-free Levi-Civita connection, define curvature by

$$
\boxed{[\nabla_\mu,\nabla_\nu]V^\rho
=R^\rho{}_{\sigma\mu\nu}V^\sigma.}
$$

The brackets denote a commutator: the first operation order minus the reverse. The placement of indices encodes the roles. The final pair $\mu,\nu$ identifies the two differentiation directions; $\sigma$ receives the original vector; $\rho$ labels the output vector.

Let us derive the components. Because $\nabla_\nu V^\rho$ has both an upper index and a lower index,

$$
\begin{aligned}
\nabla_\mu\nabla_\nu V^\rho
={}&\partial_\mu\left(\partial_\nu V^\rho
+\Gamma^\rho{}_{\nu\sigma}V^\sigma\right)\\
&+\Gamma^\rho{}_{\mu\lambda}
\left(\partial_\nu V^\lambda
+\Gamma^\lambda{}_{\nu\sigma}V^\sigma\right)\\
&-\Gamma^\lambda{}_{\mu\nu}
\left(\partial_\lambda V^\rho
+\Gamma^\rho{}_{\lambda\sigma}V^\sigma\right).
\end{aligned}
$$

The last line is the commonly forgotten correction for the derivative index $\nu$. Swap $\mu$ and $\nu$, then subtract.

The ordinary second derivatives cancel because mixed partials commute. The final line cancels because $\Gamma^\lambda{}_{\mu\nu}$ is symmetric. The terms containing first derivatives of $V$ also cancel in pairs. What survives is proportional to $V$ itself, with no derivatives of $V$ remaining:

$$
\boxed{
R^\rho{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^\rho{}_{\nu\sigma}
-\partial_\nu\Gamma^\rho{}_{\mu\sigma}
+\Gamma^\rho{}_{\mu\lambda}\Gamma^\lambda{}_{\nu\sigma}
-\Gamma^\rho{}_{\nu\lambda}\Gamma^\lambda{}_{\mu\sigma}.
}
$$

That cancellation is conceptually important. The mismatch depends on the vector's value at the event, not on how you happened to extend it into a vector field around the event. Curvature is a local multilinear geometric object: a tensor.

The derivative terms measure variation of the connection; the quadratic terms account for successive changes of basis acting on each other. Schematically,

$$
R\sim\partial\Gamma+\Gamma\Gamma
\sim g^{-1}\partial^2g+g^{-2}(\partial g)^2,
$$

where the schematic final expression suppresses index contractions. On the flat polar plane, the derivative and product terms will cancel. Keeping both is necessary to recover zero curvature.

### 8.2 Curvature takes three vector inputs

We can express the same operation using vector fields $X,Y,Z$ rather than coordinate directions:

$$
R(X,Y)Z
=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z.
$$

Why subtract the Lie-bracket term? If $X$ and $Y$ themselves do not commute, their flows reach slightly different points when taken in opposite orders. We must remove that displacement effect before interpreting the remaining mismatch as curvature. In a coordinate basis the bracket vanishes, giving the component formula above.

The inputs have different jobs. $X$ and $Y$ specify the two directions of comparison, while $Z$ is the vector being compared. The output $R(X,Y)Z$ is a vector, and it depends linearly on each input at the point. The sign relating it to an actual transport loop depends on the order in which we walk the loop, as we now specify.

For a covector the curvature acts with the opposite sign:

$$
[\nabla_\mu,\nabla_\nu]\omega_\rho
=-R^\sigma{}_{\rho\mu\nu}\omega_\sigma.
$$

For a tensor, one curvature term acts on each index, with the same upper-plus/lower-minus pattern as covariant differentiation. The scalar pairing is again the consistency check.

### 8.3 Parallel transport around a loop

Transport a vector around a small coordinate parallelogram. Let $a^\mu$ and $b^\mu$ be the small side displacements, and traverse the sides in the order $+a,+b,-a,-b$. With our curvature convention and the transport equation $dV=-\Gamma_\mu V\,dx^\mu$, the returned vector satisfies

$$
\Delta V^\rho
=-R^\rho{}_{\sigma\mu\nu}V^\sigma a^\mu b^\nu
+O(\ell^3),
$$

where all side lengths scale with a small parameter $\ell$. Reverse the loop and the leading sign reverses. Defining the difference by subtracting the two open-path results in the opposite order also reverses it. These orientation choices explain many apparent sign disagreements in pictures of holonomy.

The net transformation obtained around a closed loop is called **holonomy**. Because the initial and final vectors live in the same tangent space, their mismatch is a genuine comparison. There is no need to argue about how to compare vectors at different endpoints.

For a concrete loop, start on the equator, follow a meridian to the north pole, descend along a meridian a quarter-turn farther east, and return along the equator. These three great-circle arcs form a triangle with three right angles. A **great circle** is the intersection of the sphere with a plane through its center; its arcs are geodesics of the sphere.

Carry an arrow initially pointing north along the first arc. Keep it continuous at each corner, without rotating it to follow the next side. The worked example below calculates all three legs. On returning, the arrow points east: a right-angle change at the very same point. The loop encloses one eighth of the sphere, with area $\pi a^2/2$ for sphere radius $a$.

In the calculation we draw the sphere in three dimensions. The vector must remain tangent to it. Its ordinary three-dimensional derivative can point normally to the surface; parallel transport requires that derivative to have no tangential part. This is a convenient way to implement the intrinsic comparison rule on this particular surface. The rule itself was already defined without an embedding.

<details class="history-note" data-no-narration>
<summary>Further calculation: why spherical area determines the transport angle</summary>

Use the spherical angles from §4.7: $\theta$ measures angle down from the north pole and $\phi$ measures angle around the axis. In fixed Cartesian components the two unit tangent vectors are

$$
\begin{aligned}
\hat e_\theta&=(\cos\theta\cos\phi,\cos\theta\sin\phi,-\sin\theta),\\
\hat e_\phi&=(-\sin\phi,\cos\phi,0).
\end{aligned}
$$

Differentiate these expressions and retain only the tangent part, calling that change $D$. In the $\theta$ direction the change of $\hat e_\theta$ is entirely normal, while $\hat e_\phi$ is constant. In the $\phi$ direction, projecting onto the two unit tangents gives

$$
D\hat e_\theta=\cos\theta\,d\phi\,\hat e_\phi,
\qquad D\hat e_\phi=-\cos\theta\,d\phi\,\hat e_\theta.
$$

For a unit arrow $V=\cos\psi\,\hat e_\theta+\sin\psi\,\hat e_\phi$, the product rule then gives $DV=0$ precisely when $d\psi=-\cos\theta\,d\phi$.

Walk a small coordinate rectangle in the positive order: increasing $\theta$, increasing $\phi$, decreasing $\theta$, decreasing $\phi$. The two meridian sides have $d\phi=0$. The other two give

$$
\Delta\psi=[\cos\theta-\cos(\theta+\Delta\theta)]\Delta\phi
\simeq\sin\theta\,\Delta\theta\,\Delta\phi.
$$

Tile a region with these rectangles and add their contributions. Shared interior edges cancel, leaving its boundary integral. The sphere's area element is $dA=a^2\sin\theta\,d\theta\,d\phi$, so

$$
\Delta\psi=-\oint\cos\theta\,d\phi
=\frac{\text{oriented area}}{a^2}.
$$

This expression applies directly to a loop bounding a region inside the chosen frame patch. Changing patches lets us describe other loops, with the final rotation defined modulo $2\pi$. The octant example in §8.3 independently verifies a rotation magnitude $\pi/2$ for area $\pi a^2/2$.

For a positively oriented geodesic triangle, the path's tangent turns by $\pi-\alpha_i$ at a corner with interior angle $\alpha_i$, while the transported arrow stays continuous. Comparing after the three corners gives a rotation equivalent to $-\sum_i(\pi-\alpha_i)$, or $\alpha_1+\alpha_2+\alpha_3-\pi$ modulo a full turn. This **angular excess** is therefore related to the triangle's area. For an ordinary convex spherical triangle, choosing the area between zero and $2\pi a^2$ gives the familiar equality $\text{area}=a^2(\alpha_1+\alpha_2+\alpha_3-\pi)$.

</details>

**Local and global comparisons.** A loop is *contractible* if it can be shrunk continuously to a point while staying in the region under discussion. A flat connection has no net transport change around such a loop. A loop surrounding an excluded point may behave differently, even when the geometry is flat everywhere along it.

<details class="history-note" data-no-narration>
<summary>Further example: a flat cone with its tip removed</summary>

Cut a wedge of angle $0<\delta<2\pi$ from a flat sheet and join its edges into a cone. Away from the tip, the sheet has the same local lengths as before. If we exclude the tip, a loop around it cannot shrink to a point without leaving the surface.

Use distance $r$ from the tip along the sheet and angle $\phi$ with period $2\pi$. Put $\alpha=1-\delta/(2\pi)$. A full circle has circumference $2\pi\alpha r$, giving the metric

$$
ds^2=dr^2+\alpha^2r^2d\phi^2.
$$

The calculation from Chapter 7 now gives $\Gamma^r{}_{\phi\phi}=-\alpha^2r$ and $\Gamma^\phi{}_{r\phi}=1/r$. Along a circle, write $W=\alpha rV^\phi$ for the angular component in a unit basis. Parallel transport becomes

$$
\frac{dV^r}{d\phi}=\alpha W,\qquad
\frac{dW}{d\phi}=-\alpha V^r.
$$

These are the sine-and-cosine equations for component rotation by $-\alpha\phi$. After a full circuit, the rotation is $-2\pi\alpha=\delta-2\pi$, equivalent to $\delta$ for the final arrow. The missing wedge can therefore be detected by a loop, although every small patch away from the tip is flat.

</details>

### 8.4 The curvature of the polar plane

Using the polar connection from Chapter 7, calculate

$$
\begin{aligned}
R^r{}_{\theta r\theta}
&=\partial_r\Gamma^r{}_{\theta\theta}
-\partial_\theta\Gamma^r{}_{r\theta}
+\Gamma^r{}_{r\lambda}\Gamma^\lambda{}_{\theta\theta}
-\Gamma^r{}_{\theta\lambda}\Gamma^\lambda{}_{r\theta}\\
&=-1-0+0-(-r)(1/r)\\
&=0.
\end{aligned}
$$

In two dimensions the Riemann symmetries leave only one independent curvature component, so this establishes that the plane is flat wherever the polar chart is valid. The apparent singularity at $r=0$ is a failure of the chart; Cartesian coordinates cover the origin smoothly.

The derivative term was $-1$; the connection-product term was $+1$. Their cancellation agrees with the Cartesian calculation, where every connection coefficient and curvature component is zero.

### 8.5 Counting independent curvature components

Lower the first index with the metric:

$$
R_{\rho\sigma\mu\nu}=g_{\rho\lambda}R^\lambda{}_{\sigma\mu\nu}.
$$

For the Levi-Civita connection,

$$
\begin{aligned}
R_{\rho\sigma\mu\nu}&=-R_{\sigma\rho\mu\nu},\\
R_{\rho\sigma\mu\nu}&=-R_{\rho\sigma\nu\mu},\\
R_{\rho\sigma\mu\nu}&=R_{\mu\nu\rho\sigma},\\
R_{\rho\sigma\mu\nu}
+R_{\rho\mu\nu\sigma}
+R_{\rho\nu\sigma\mu}&=0.
\end{aligned}
$$

The second symmetry follows directly from reversing the derivative order. To check the others without a long expansion, we can choose coordinates with $\Gamma=0$ at the point under study. Here is why those coordinates exist locally. Put the old coordinate origin at that point and set

$$
x'^\rho=x^\rho+\frac12\Gamma^\rho{}_{\mu\nu}(0)x^\mu x^\nu.
$$

The Jacobian is the identity at the origin. The inverse map has second derivatives $-\Gamma^\rho{}_{\mu\nu}(0)$ there, which cancel the old coefficients in the transformation law from §7.4. The invertible Jacobian makes this a valid chart sufficiently near the origin. Metric compatibility then gives $\partial g=0$ at the point as well.

At that point the curvature reduces to second derivatives of the metric:

$$
\begin{aligned}
R_{\rho\sigma\mu\nu}=\frac12\big(&
\partial_\mu\partial_\sigma g_{\rho\nu}
-\partial_\mu\partial_\rho g_{\sigma\nu}\\
&-\partial_\nu\partial_\sigma g_{\rho\mu}
+\partial_\nu\partial_\rho g_{\sigma\mu}\big).
\end{aligned}
$$

Exchanging $\rho,\sigma$ reverses the sign. Exchanging the two index pairs preserves it, using $g_{ab}=g_{ba}$ and commuting partial derivatives. Adding the three cyclic terms makes each second derivative cancel against its opposite. This last relation is called the **algebraic Bianchi identity**. All are tensor equations, so a check in this convenient chart establishes them in every chart at the same point.

In four dimensions, an antisymmetric pair has six choices: $01,02,03,12,13,23$. Reversing a pair changes only a sign; repeating an index gives zero. Treat each pair as one label. Pair exchange makes curvature a symmetric $6\times6$ array, with six diagonal entries and $6\times5/2=15$ entries above the diagonal: 21 in total.

For four distinct indices, the algebraic Bianchi identity supplies one independent relation,

$$
R_{0123}+R_{0231}+R_{0312}=0.
$$

Its other versions follow by relabeling and the pair symmetries; versions with repeated indices already follow from those symmetries. Thus 20 independent components remain. In two dimensions there is only one pair, $12$, and one independent curvature entry. This justifies the single-component flatness check in §8.4.

Twenty counts independent curvature values at one event. It does not tell us how many independent wave patterns can propagate. Answering that requires the field equations; Chapter 18 derives the two independent polarizations of a gravitational wave, meaning its two independent transverse stretching patterns.

### 8.6 Calculating curvature on a sphere

Now take a sphere of fixed radius $a$. As in §4.7, $\theta$ is the angle down from the north pole and $\phi$ is the angle around the axis. A meridian step has length $a\,d\theta$ and a latitude step has length $a\sin\theta\,d\phi$, giving

$$
ds^2=a^2d\theta^2+a^2\sin^2\theta\,d\phi^2.
$$

Insert $g_{\theta\theta}=a^2$, $g_{\phi\phi}=a^2\sin^2\theta$, and $\partial_\theta g_{\phi\phi}=2a^2\sin\theta\cos\theta$ into the Christoffel formula. The nonzero coefficients are

$$
\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta,
\qquad
\Gamma^\phi{}_{\theta\phi}
=\Gamma^\phi{}_{\phi\theta}=\cot\theta.
$$

Here $\cot\theta=\cos\theta/\sin\theta$. We work away from the poles, where this angular chart is valid. The circumference scale is $a\sin\theta$, instead of the plane’s linear factor $r$; the two terms in the curvature calculation will no longer cancel.

Compute one component:

$$
\begin{aligned}
R^\theta{}_{\phi\theta\phi}
&=\partial_\theta(-\sin\theta\cos\theta)
-\Gamma^\theta{}_{\phi\phi}\Gamma^\phi{}_{\theta\phi}\\
&=(\sin^2\theta-\cos^2\theta)+\cos^2\theta\\
&=\sin^2\theta.
\end{aligned}
$$

Thus

$$
R_{\theta\phi\theta\phi}=a^2\sin^2\theta.
$$

This component has units of length squared because all its slots refer to angular coordinate vectors. In a unit orthonormal basis the corresponding component is $1/a^2$. In two dimensions, we can express the one independent curvature entry per unit area. This scalar is the **Gaussian curvature**:

$$
K=\frac{R_{\theta\phi\theta\phi}}
{g_{\theta\theta}g_{\phi\phi}-g_{\theta\phi}^2}
=\frac1{a^2}.
$$

We can summarize some of this curvature by contracting indices, using the operation from Chapter 2. Define the **Ricci tensor** by $R_{ab}=R^c{}_{acb}$ and the **Ricci scalar** by $R=g^{ab}R_{ab}$. Here each index runs over $\theta,\phi$. For example, $R_{\theta\theta}=g^{\phi\phi}R_{\phi\theta\phi\theta}=(a^2\sin^2\theta)^{-1}(a^2\sin^2\theta)=1$. The complete result is

$$
R_{\theta\theta}=1,
\qquad R_{\phi\phi}=\sin^2\theta,
\qquad R=\frac2{a^2}>0.
$$

This also fixes our sign convention operationally: a round sphere has positive scalar curvature. Some books reverse the sign of the Riemann tensor. Equations borrowed from them must be translated consistently, especially geodesic deviation and the Einstein equation.

An inhabitant of the sphere need not see its embedding. Draw a circle of geodesic radius $s$ around a point. Its circumference is

$$
C(s)=2\pi a\sin(s/a)
=2\pi s\left(1-\frac{s^2}{6a^2}+\cdots\right).
$$

It is shorter than the Euclidean prediction. Curvature can be discovered with intrinsic distance measurements alone.

A cylinder illustrates the opposite lesson. A sheet can be rolled into a cylinder without locally stretching it. Its embedding looks bent, but its intrinsic metric is locally flat. **Extrinsic bending** describes the relation to an ambient space; **intrinsic curvature** describes the metric geometry experienced by inhabitants. Spacetime curvature does not demand an invisible higher-dimensional room into which spacetime bends.



<a id="chapter-9"></a>

## 9. Ricci, Weyl, and Einstein: different questions asked of curvature

### 9.1 What a curvature trace leaves out

The Riemann tensor is richly directional. Einstein's equation uses a particular contraction of it, the Ricci tensor:

$$
\boxed{R_{\mu\nu}=R^\rho{}_{\mu\rho\nu}.}
$$

This identifies the output index with one curvature-direction index and sums. It is a trace of a curvature map. Because of the Riemann symmetries, $R_{\mu\nu}=R_{\nu\mu}$.

Contract again to obtain the Ricci scalar:

$$
\boxed{R=g^{\mu\nu}R_{\mu\nu}.}
$$

A trace adds selected entries. Consider $A=\operatorname{diag}(2,-1,-1)$. Its trace is $2-1-1=0$, but $A(1,0,0)=(2,0,0)$, so the linear map is not zero. On the other two axes it reverses arrows without shortening them. If such a matrix instead represents an acceleration law, its signs describe the directions of acceleration; that is a separate physical interpretation. A vanishing Ricci scalar is even less informative than a vanishing Ricci tensor, and a vanishing Ricci tensor is less informative than a vanishing Riemann tensor.

The hierarchy is

$$
R_{\rho\sigma\mu\nu}=0
\ \Longrightarrow\ R_{\mu\nu}=0
\ \Longrightarrow\ R=0,
$$

with neither reverse implication valid in general four-dimensional spacetime.

This is crucial for understanding gravity in empty space. For $\Lambda=0$, the vacuum Einstein equation gives $R_{\mu\nu}=0$. A black hole exterior can still have large tidal curvature, and gravitational waves can still propagate through vacuum. Ricci-flat does not mean Riemann-flat.

### 9.2 Ricci curvature and an initially stationary cloud

Choose a freely falling observer with unit orthonormal frame and $e_{\hat0}=u/c$. The spatial tidal matrix is

$$
\mathcal E_{ij}=R_{\hat i\hat0\hat j\hat0}.
$$

It is symmetric. The next chapter derives the measurable relative acceleration it produces:

$$
\frac{d^2\xi^{\hat i}}{d\tau^2}
=-c^2\mathcal E^i{}_{j}\xi^{\hat j}.
$$

The trace of this matrix is

$$
\delta^{ij}\mathcal E_{ij}=R_{\hat0\hat0}
=\frac1{c^2}R_{\mu\nu}u^\mu u^\nu.
$$

Thus Ricci curvature evaluated on the observer's time direction measures the sum of the three principal tidal effects. One direction can stretch while another compresses; the trace tells you the aggregate.

To turn that into a volume statement, release an infinitesimal ball of freely falling particles initially at rest relative to one another in the observer's frame. Let $\lambda_i$ be the three eigenvalues of $\mathcal E$. An initial edge length $L_i$ has zero initial rate and acceleration $-c^2\lambda_iL_i$, so its short-time length is $L_i[1-\tfrac12c^2\lambda_i(\Delta\tau)^2]+O((\Delta\tau)^3)$. Multiply the three lengths. The leading fractional volume change contains their sum, $c^2\sum_i\lambda_i=R_{\mu\nu}u^\mu u^\nu$. Thus initially

$$
\frac{\ddot{\mathcal V}}{\mathcal V}
=-R_{\mu\nu}u^\mu u^\nu,
$$

and, for a short proper-time interval,

$$
\frac{\mathcal V(\Delta\tau)}{\mathcal V_0}
=1-\frac12R_{\mu\nu}u^\mu u^\nu(\Delta\tau)^2
+O((\Delta\tau)^3).
$$

Why the trace? At first, each principal edge changes by its own small fractional amount. Multiplying the three edge lengths, the leading fractional volume change is the sum of those changes. Products of the small changes enter at higher order.

This result uses zero initial relative velocity. A cloud already expanding, changing shape, or rotating can have additional contributions to its volume change. Chapter 22 derives the more general volume-evolution law, called the Raychaudhuri equation.

### 9.3 Separating Ricci and Weyl curvature

In four dimensions the Riemann tensor can be decomposed as

$$
\boxed{
\begin{aligned}
R_{\rho\sigma\mu\nu}
={}&C_{\rho\sigma\mu\nu}\\
&+\frac12\left(
 g_{\rho\mu}R_{\sigma\nu}
-g_{\rho\nu}R_{\sigma\mu}
-g_{\sigma\mu}R_{\rho\nu}
+g_{\sigma\nu}R_{\rho\mu}
\right)\\
&-\frac{R}{6}\left(
 g_{\rho\mu}g_{\sigma\nu}
-g_{\rho\nu}g_{\sigma\mu}
\right).
\end{aligned}}
$$

The tensor $C_{\rho\sigma\mu\nu}$ is the **Weyl tensor**. It has the Riemann symmetries and every metric trace vanishes. It is the curvature information left after removing Ricci's traces.

The factors $1/2$ and $1/6$ can be derived rather than memorized. Write the four-term Ricci combination in parentheses as $Q_{\rho\sigma\mu\nu}$ and the two-term metric combination as $P_{\rho\sigma\mu\nu}$. Suppose

$$
R_{\rho\sigma\mu\nu}
=C_{\rho\sigma\mu\nu}+A Q_{\rho\sigma\mu\nu}
+B R P_{\rho\sigma\mu\nu}.
$$

Contract the first and third indices. In $n$ dimensions,

$$
\begin{aligned}
g^{\rho\mu}Q_{\rho\sigma\mu\nu}
&=(n-2)R_{\sigma\nu}+g_{\sigma\nu}R,\\
g^{\rho\mu}P_{\rho\sigma\mu\nu}
&=(n-1)g_{\sigma\nu}.
\end{aligned}
$$

The Weyl contribution must vanish under this contraction, and the left side must equal $R_{\sigma\nu}$. Therefore $A(n-2)=1$ and $A+B(n-1)=0$. With $n=4$, $A=1/2$ and $B=-1/6$. The coefficients are forced by trace removal.

At an event in four dimensions, Ricci carries ten independent components and Weyl carries the remaining ten. Again, this is algebraic information, not ten freely propagating fields.

Weyl curvature is often described as “shape-changing curvature.” Its contribution to the tidal matrix is trace-free, so it produces no leading initial volume acceleration for the initially comoving ball just described. It can stretch a sphere into an ellipsoid while preserving volume to that leading order.

Two qualifications prevent this useful slogan from becoming misleading:

- Ricci curvature can also contribute to anisotropic distortion; it is not generally a purely isotropic squeeze. The Weyl/Ricci split is a decomposition of the full spacetime curvature, while “shape versus volume” refers to a chosen observer's spatial tidal problem.
- Weyl-induced shear can subsequently affect volume evolution. A Ricci-flat cloud is not guaranteed to maintain its initial volume forever. Trace-free initial acceleration is weaker than an exact volume-preservation theorem.

When $R_{\mu\nu}=0$, the whole Riemann tensor equals Weyl. This is the curvature of vacuum tidal fields and vacuum gravitational waves. If $\Lambda\ne0$, vacuum instead has $R_{\mu\nu}=\Lambda g_{\mu\nu}$, and the Ricci part need not vanish.

<details class="history-note" data-no-narration>
<summary>Further calculation: rescaling the metric and the Weyl tensor</summary>

A **conformal rescaling** multiplies the metric by a smooth positive function squared: $\widetilde g_{ab}=\Omega^2g_{ab}$. Local lengths and proper times acquire the factor $\Omega$. Null directions remain null because multiplying zero by $\Omega^2$ still gives zero.

Put $f=\ln\Omega$, taking $\Omega$ dimensionless. Substituting $\widetilde g$ into the Christoffel formula and differentiating the product gives

$$
\widetilde\Gamma^a{}_{bc}-\Gamma^a{}_{bc}
=\delta^a_b\partial_cf+\delta^a_c\partial_bf
-g_{bc}g^{ad}\partial_df.
$$

Define the symmetric tensor

$$
B_{ab}=\nabla_a\partial_bf-\partial_af\,\partial_bf
+\frac12g_{ab}g^{cd}\partial_cf\,\partial_df.
$$

Using the connection difference in the curvature formula, the new first derivatives give the Hessian terms in $B$ and the connection products give its squared-gradient terms. Collecting them yields

$$
\begin{aligned}
\widetilde R_{abcd}=\Omega^2\big(&R_{abcd}
+g_{ad}B_{bc}+g_{bc}B_{ad}\\
&-g_{ac}B_{bd}-g_{bd}B_{ac}\big).
\end{aligned}
$$

Every added term has exactly the metric-times-symmetric-tensor form removed by the Ricci subtraction. For a direct check in $n$ dimensions, contracting the added four-term combination gives $-(n-2)B_{bd}-g_{bd}B^a{}_a$. The same trace removal that fixed the decomposition coefficients therefore leaves

$$
\widetilde C_{abcd}=\Omega^2 C_{abcd},\qquad
\widetilde C^a{}_{bcd}=C^a{}_{bcd}.
$$

The inverse metric used to raise the first index supplies $\Omega^{-2}$. Thus the mixed-index Weyl tensor is unchanged. In particular, a metric of the form $g_{ab}=\Omega^2\eta_{ab}$ has zero Weyl curvature. Such a metric is called **conformally flat** in that coordinate region. For further conformal geometry, see [Tong's curvature notes](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf).

</details>

### 9.4 The differential Bianchi identity

A metric can vary from point to point, but the resulting curvature is not an arbitrary tensor field with 20 freely assignable functions. Because it comes from a connection, it obeys a differential identity:

$$
\boxed{
\nabla_\lambda R^\rho{}_{\sigma\mu\nu}
+\nabla_\mu R^\rho{}_{\sigma\nu\lambda}
+\nabla_\nu R^\rho{}_{\sigma\lambda\mu}=0.
}
$$

This is the **differential or second Bianchi identity**. It is an identity of Levi-Civita geometry, before Einstein's equation or any matter model is introduced.

Here is a local proof that shows why it exists. At an arbitrary point choose normal coordinates so that $\Gamma=0$ there. At that point $\nabla R=\partial R$. Differentiating $R=\partial\Gamma-\partial\Gamma+\Gamma\Gamma-\Gamma\Gamma$ gives second derivatives of $\Gamma$; the derivatives of its quadratic products contain an undifferentiated $\Gamma$ and vanish at the point. Add the three cyclic terms. Every second derivative appears twice with opposite sign, so commutation of ordinary mixed partial derivatives makes the sum zero.

The expression is tensorial, so if it vanishes in normal coordinates it vanishes in every chart at that point. The point was arbitrary, so the identity holds throughout the smooth region. The convenient chart simplified the calculation without restricting the metric.

The related algebraic consistency rule is the **Jacobi identity**. For operators $A,B,C$ and commutator $[A,B]=AB-BA$,

$$
[A,[B,C]]+[B,[C,A]]+[C,[A,B]]=0.
$$

To verify it, expand each bracket. For example, the first contributes $ABC-ACB-BCA+CBA$; each of these ordered products appears with the opposite sign in one of the other two brackets. Thus failures of pairwise commutation cannot be assigned independently. The direct normal-coordinate calculation above establishes the corresponding differential identity for curvature.

### 9.5 A divergence-free curvature tensor

Set the differentiation index $\lambda$ equal to the upper curvature index $\rho$ and sum in the identity above. The second term contains $R^\rho{}_{\sigma\nu\rho}=-R_{\sigma\nu}$, while the third contains $R^\rho{}_{\sigma\rho\mu}=R_{\sigma\mu}$. Moving those two terms to the right gives

$$
\nabla_\rho R^\rho{}_{\sigma\mu\nu}
=\nabla_\mu R_{\sigma\nu}
-\nabla_\nu R_{\sigma\mu}.
$$

Now contract with $g^{\sigma\nu}$. Compatibility allows the metric to move through the derivative. The left side becomes $\nabla_\rho R^\rho{}_{\mu}$; the right side becomes $\nabla_\mu R-\nabla_\nu R^\nu{}_{\mu}$. Thus

$$
\nabla_\rho R^\rho{}_{\mu}
=\nabla_\mu R-\nabla_\nu R^\nu{}_{\mu}.
$$

The two Ricci-divergence expressions differ only by the name of their summed index. Bring them together:

$$
\boxed{\nabla^\mu R_{\mu\nu}=\frac12\nabla_\nu R.}
$$

This tells us exactly how to repair the Ricci tensor's divergence. Define

$$
\boxed{G_{\mu\nu}=R_{\mu\nu}-\frac12Rg_{\mu\nu}.}
$$

Then

$$
\begin{aligned}
\nabla^\mu G_{\mu\nu}
&=\nabla^\mu R_{\mu\nu}
-\frac12(\nabla^\mu R)g_{\mu\nu}
-\frac12R\nabla^\mu g_{\mu\nu}\\
&=\frac12\nabla_\nu R-\frac12\nabla_\nu R-0\\
&=0.
\end{aligned}
$$

The coefficient $1/2$ is exactly what cancels the Ricci divergence. The remaining derivative of the metric is zero by compatibility.

**Divergence-free does not mean covariantly constant.** The identity is $\nabla^\mu G_{\mu\nu}=0$, involving a contraction. It does not say $\nabla_\lambda G_{\mu\nu}=0$ for every choice of indices. A fluid can have zero net outflow from each small region while still varying across the room; similarly, divergence-free geometry can vary.

The result prepares the field equation. A consistent geometric left side can be matched to a covariantly conserved stress-energy tensor on the right. A constant multiple of $g_{\mu\nu}$ is also divergence-free, allowing the cosmological term $\Lambda g_{\mu\nu}$. Geometry alone has not yet fixed the physical coupling, matter content, or the theory's full action. Those are the next stage.

### 9.6 Why dimension matters

For the two-sphere we found $R_{ab}=a^{-2}g_{ab}$ and $R=2/a^2$. Consequently,

$$
G_{ab}=R_{ab}-\frac12Rg_{ab}=0
$$

for that intrinsically curved surface. The cancellation holds for every two-dimensional metric. There is only one independent curvature entry, so the tensor has the form

$$
R_{abcd}=K(g_{ac}g_{bd}-g_{ad}g_{bc}).
$$

Contracting gives $R_{ab}=Kg_{ab}$ and $R=2K$, hence $G_{ab}=Kg_{ab}-Kg_{ab}=0$, whether or not $K$ vanishes.

This is not a counterexample to the usefulness of Einstein's equation in four dimensions. It shows that a tensor's information content depends on dimension. In two dimensions all intrinsic curvature is summarized by one scalar, and the Einstein combination cancels it. In three dimensions Weyl vanishes identically and Ricci determines the full Riemann tensor. Four dimensions are the first in which a nonzero Weyl tensor carries local curvature information independent of Ricci.

<a id="chapter-10"></a>

## 10. Tides: how to measure curvature without seeing spacetime from outside

### 10.1 Accelerometers and tidal measurements

An ideal accelerometer carried by a freely falling point particle reads zero. This is true in Minkowski space and beside a black hole, provided the particle follows a geodesic and is treated as an ideal test body.

Release a **collection** of particles, however, and their separations can accelerate. Near a gravitating body, one part of the collection may be pulled into a different geodesic than another. A sufficiently extended astronaut cannot follow every nearby geodesic simultaneously while maintaining an unchanged shape. Internal stresses arise because the body resists that relative motion.

An accelerometer measures proper acceleration: how its own motion departs from free fall. A **gravity gradiometer** compares nearby freely falling bodies to measure the spatial variation of their motion. A single laboratory can contain several test masses and make this comparison internally.

The governing equation is geodesic deviation, also called the Jacobi equation. We will derive it using only concepts already assembled.

### 10.2 Organize the experiment as a family of worldlines

Consider a smooth local family of timelike geodesics

$$
x^\mu=x^\mu(\tau,s),
$$

where $\tau$ is proper time along each geodesic and $s$ labels neighboring geodesics. Picture a smooth strip of paths: one direction runs along a particle’s history, and the other runs across the strip to a neighboring particle. Restrict attention to a patch where these two labels are independent and the strip has no crossings. Define

$$
u^\mu=\frac{\partial x^\mu}{\partial\tau},
\qquad
\xi^\mu=\frac{\partial x^\mu}{\partial s}.
$$

The first vector moves along one worldline. The second moves across the family at fixed $\tau$. More precisely, $\xi^\mu ds$ describes an infinitesimal connecting displacement. A finite separation between distant events does not automatically define a unique tangent vector; the family and the infinitesimal limit supply the meaning here.

Because $\tau$ and $s$ are commuting parameters,

$$
[u,\xi]=0.
$$

With zero torsion, the definition of torsion therefore gives

$$
\nabla_u\xi=\nabla_\xi u.
$$

Read this as a statement about the same smoothly labeled grid of paths. The rate at which the separation changes along a trajectory equals the change in velocity across neighboring trajectories. It is the curved-space version of exchanging $\partial_\tau\partial_sx$ with $\partial_s\partial_\tau x$.

Proper-time parameterization gives $u^\mu u_\mu=-c^2$. Geodesic motion gives

$$
\nabla_u u=0.
$$

These assumptions have different jobs: normalization makes $\tau$ a physical clock reading; affine geodesic motion removes a tangential reparameterization term from the acceleration equation.

### 10.3 Deriving geodesic deviation

The covariant relative acceleration is

$$
\frac{D^2\xi}{d\tau^2}=\nabla_u\nabla_u\xi.
$$

Replace the inner derivative using $\nabla_u\xi=\nabla_\xi u$:

$$
\frac{D^2\xi}{d\tau^2}=\nabla_u\nabla_\xi u.
$$

Now use the definition of curvature to interchange the two derivatives:

$$
\nabla_u\nabla_\xi u
=\nabla_\xi\nabla_u u+R(u,\xi)u+\nabla_{[u,\xi]}u.
$$

The first term vanishes because every worldline in the family is geodesic. The final term vanishes because the parameters commute. We are left with

$$
\frac{D^2\xi}{d\tau^2}=R(u,\xi)u.
$$

In components, this is $R^\mu{}_{\alpha\beta\nu}u^\alpha u^\beta\xi^\nu$. Use antisymmetry in the last pair to place the separation index before the final velocity index:

$$
\boxed{
\frac{D^2\xi^\mu}{d\tau^2}
=-R^\mu{}_{\alpha\nu\beta}
 u^\alpha\xi^\nu u^\beta.
}
$$

The minus sign follows from the stated curvature convention and this index ordering. It is not an independently adjustable physical sign.

The equation is exact for a Jacobi field generated by an infinitesimal variation of geodesics. Using it for particles separated by a finite distance is a linear approximation in their separation. Higher-order separation effects involve additional geometric information, including curvature variation. The same geometric derivation works for null geodesics with an affine parameter, but a null worldline has no proper-time parameter or timelike rest frame.

To interpret $\xi$ as spatial separation for the reference observer, choose it initially orthogonal to $u$. This orthogonality persists:

$$
\begin{aligned}
\frac{d}{d\tau}(u\cdot\xi)
&=u\cdot\nabla_u\xi\\
&=u\cdot\nabla_\xi u\\
&=\frac12\nabla_\xi(u\cdot u)=0.
\end{aligned}
$$

The first equality uses geodesic motion; the last uses the equal normalization of the family. This is why the separation can consistently be discussed in the reference observer's instantaneous rest space.

### 10.4 Put an instrument frame on the reference geodesic

Choose a parallel-transported orthonormal frame along the reference trajectory, with $e_{\hat0}=u/c$. In this frame $u^{\hat0}=c$, $u^{\hat i}=0$, and the frame itself has zero covariant rate of change along the trajectory. Covariant differentiation of vector components along it becomes ordinary differentiation.

The spatial deviation equation reduces to

$$
\boxed{
\frac{d^2\xi^{\hat i}}{d\tau^2}
=-c^2R^{\hat i}{}_{\hat0\hat j\hat0}\xi^{\hat j}.
}
$$

The matrix $c^2R_{\hat i\hat0\hat j\hat0}$ has units of inverse time squared. Its eigenvectors identify the principal tidal directions. With our sign convention, a positive eigenvalue produces relative acceleration toward the reference trajectory in that direction; a negative eigenvalue produces relative acceleration away.

This matrix is an observer-dependent projection of the invariant Riemann tensor. Another observer with a different four-velocity can obtain a different tidal matrix. That does not make the effect a coordinate illusion: they are physically different observers performing different local experiments. A complete reconstruction of curvature requires enough independent relative-motion measurements, not merely one three-dimensional tidal matrix.

### 10.5 Recovering Newtonian tides

Let $\Phi$ be a weak, slowly varying Newtonian potential. For this calculation use $x^0=ct$ and retain leading weak-field terms:

$$
g_{00}\simeq-\left(1+\frac{2\Phi}{c^2}\right),
\qquad g_{0i}\simeq0.
$$

The spatial inverse metric can be replaced by $\delta^{ij}$ at this order in the particular expression we need. For an approximately static field,

$$
\Gamma^i{}_{00}
\simeq-\frac12\delta^{ij}\partial_jg_{00}
=\frac1{c^2}\partial^i\Phi.
$$

Therefore

$$
R^i{}_{0j0}
\simeq\partial_j\Gamma^i{}_{00}
=\frac1{c^2}\partial_j\partial^i\Phi.
$$

Time-derivative terms have been neglected by the static approximation, and products of weak-field connection coefficients are higher order. With $u^0\simeq c$ and slow reference motion, geodesic deviation gives

$$
\boxed{
\ddot\xi^i\simeq
-\partial_j\partial^i\Phi\,\xi^j.
}
$$

This is precisely Newtonian relative acceleration. If a nearby particle is at $\mathbf x+\boldsymbol\xi$, subtract the reference particle’s acceleration from the nearby particle’s acceleration and Taylor-expand:

$$
a^i(\mathbf x+\boldsymbol\xi)-a^i(\mathbf x)
=-\partial^i\Phi(\mathbf x+\boldsymbol\xi)
+\partial^i\Phi(\mathbf x)
\simeq-\partial_j\partial^i\Phi\,\xi^j.
$$

The common acceleration disappears. Only the spatial gradient of acceleration remains. This is the mathematical content of the elevator argument: free fall removes a shared gravitational acceleration locally; it does not remove differences in gravitational acceleration across a finite laboratory.

For a point mass, let $r=\sqrt{x_ix_i}$ and $n_i=x_i/r$ be the components of the radial unit vector. Differentiation gives $\partial_jr=n_j$ and $\partial_jn_i=(\delta_{ij}-n_in_j)/r$. Outside the source, $\Phi=-G_NM/r$ has gradient $\partial_i\Phi=G_NM n_i/r^2$. Differentiate once more:

$$
\Phi=-\frac{G_NM}{r},
\qquad
\partial_i\partial_j\Phi
=\frac{G_NM}{r^3}(\delta_{ij}-3n_in_j),
\qquad n_i=\frac{x_i}{r}.
$$

The Hessian has radial eigenvalue $-2G_NM/r^3$ and two tangential eigenvalues $+G_NM/r^3$. The actual relative accelerations carry the minus sign:

$$
\ddot\xi_{\rm radial}
=\frac{2G_NM}{r^3}\xi_{\rm radial},
\qquad
\ddot\xi_{\rm tangential}
=-\frac{G_NM}{r^3}\xi_{\rm tangential}.
$$

A falling cloud stretches radially and squeezes sideways. The eigenvalues of the acceleration map add to zero outside the source. This is the Newtonian shadow of vacuum Ricci-flatness, while the nonzero trace-free tidal field is the shadow of Weyl curvature.

The ratio $2:-1:-1$ compares radial stretching acceleration with the two transverse squeezing accelerations for equal initial separations. This pattern explains how strong tides can lengthen a falling body while narrowing it.

### 10.6 Normal coordinates and the size of a laboratory

At any regular event $p$, choose Riemann normal coordinates with an orthonormal basis at the origin. Then

$$
g_{\mu\nu}(p)=\eta_{\mu\nu},
\qquad
\partial_\alpha g_{\mu\nu}(p)=0,
\qquad
\Gamma^\rho{}_{\mu\nu}(p)=0.
$$

Section 8.5 showed how a quadratic coordinate change cancels the connection at one event. Riemann normal coordinates have a further geometric definition. Choose an initial tangent $X$ at $p$, follow the geodesic with that tangent from affine parameter 0 to 1, and assign its endpoint the coordinate list $X^\mu$. This endpoint rule is called the **exponential map**, written $\exp_p(X)$. It is a smooth invertible map sufficiently near $X=0$, where its derivative is the identity. The resulting **normal neighborhood** is a region small enough that these geodesic labels remain unique.

But the derivatives of $\Gamma$ generally survive. The metric expansion is

$$
\boxed{
g_{\mu\nu}(X)
=\eta_{\mu\nu}
-\frac13R_{\mu\alpha\nu\beta}(p)X^\alpha X^\beta
+O(|X|^3).
}
$$

<details class="history-note" data-no-narration>
<summary>Further calculation: the factor one third in the normal-coordinate metric</summary>

Radial geodesics have $X^\mu(\lambda)=\lambda v^\mu$, so their equation requires $\Gamma^\rho{}_{\mu\nu}(X)X^\mu X^\nu=0$. Write $C^\rho{}_{\mu\nu\alpha}=\partial_\alpha\Gamma^\rho{}_{\mu\nu}(0)$. Torsion-free symmetry and the cubic term of the radial condition give

$$
C^\rho{}_{\mu\nu\alpha}=C^\rho{}_{\nu\mu\alpha},
\qquad C^\rho{}_{\mu\nu\alpha}
+C^\rho{}_{\nu\alpha\mu}+C^\rho{}_{\alpha\mu\nu}=0.
$$

At the origin, curvature is $R^\rho{}_{\sigma\mu\nu}=C^\rho{}_{\nu\sigma\mu}-C^\rho{}_{\mu\sigma\nu}$. Solving these linear relations gives

$$
C^\rho{}_{\mu\nu\alpha}
=-\frac13\left(R^\rho{}_{\mu\nu\alpha}
+R^\rho{}_{\nu\mu\alpha}\right).
$$

Substitution checks the symmetry and cyclic relation directly. Differentiate metric compatibility once, using $\partial g=\Gamma=0$ at the origin, and substitute this value of $C$:

$$
\partial_\alpha\partial_\beta g_{\mu\nu}(0)
=-\frac13\left(R_{\mu\alpha\nu\beta}
+R_{\mu\beta\nu\alpha}\right).
$$

Taylor's formula multiplies this by $X^\alpha X^\beta/2$. The two curvature terms contribute equally after relabeling the summed indices, producing the displayed coefficient $-1/3$.

</details>

The metric is Minkowskian through first order in displacement, while curvature enters at second order. This is the precise limitation of a local inertial frame. Making the connection vanish at one point does not make all second derivatives of the metric vanish there, and does not make the surrounding neighborhood flat.

Riemann normal coordinates make the geodesics launched from the origin straight coordinate rays. They do not make every geodesic in the neighborhood a straight coordinate line. If they did, they would have erased curvature rather than merely chosen convenient labels.

For a moving freely falling laboratory, **Fermi normal coordinates** extend the construction along a reference timelike geodesic. Parallel transport a nonrotating orthonormal frame along it, then use short spacelike geodesics orthogonal to the reference worldline to label nearby events. Locally, the metric is Minkowskian and its first derivatives vanish on the entire reference geodesic, while transverse second-order terms contain curvature. This construction and its quadratic expansion are developed in [Manasse and Misner's original Fermi-coordinate paper](https://doi.org/10.1063/1.1724316).

For example, with $X^0=c\tau$ and spatial distances $X^i$,

$$
g_{00}
=-1-R_{\hat0\hat i\hat0\hat j}(\tau)X^iX^j
+O(|\mathbf X|^3).
$$

At the reference worldline, the time coordinate is the observer's clock and the first-order gravitational terms are absent. Away from it, a quadratic tidal potential remains. The coefficient differs from the Riemann-normal expansion because these are different coordinate constructions, one centered on an event and the other on a worldline.

If the laboratory accelerates, its comoving nonrotating coordinates acquire acceleration terms already at first order in distance. A rocket can keep itself fixed in its own coordinates, but it cannot make its accelerometer reading disappear by relabeling events.

The size of an approximately inertial laboratory is controlled by quantities such as $|R_{\hat a\hat b\hat c\hat d}|L^2\ll1$, together with sufficiently small curvature-variation effects across the region. A nominal curvature radius alone is not enough if the curvature changes rapidly. The length and time scales of a measurement must therefore be compared with both the curvature and its variation.

### 10.7 Curvature scalars and their limits

Coordinates can become singular while geometry remains regular. To distinguish a coordinate problem from a physical curvature problem, form scalars such as

$$
R,
\qquad
R_{\mu\nu}R^{\mu\nu},
\qquad
\mathcal K=R_{\rho\sigma\mu\nu}R^{\rho\sigma\mu\nu}.
$$

The last is the Kretschmann scalar. In Schwarzschild spacetime,

$$
\mathcal K=\frac{48G_N^2M^2}{c^4r^6}.
$$

It stays finite at $r=2G_NM/c^2$ and diverges as $r\to0$. This helps show why the standard Schwarzschild-coordinate problem at the horizon is removable, while the central curvature divergence is not. Establishing smooth extension through a horizon still requires regular coordinates; finiteness of one scalar by itself is not an extension theorem.

A limitation of these scalar tests is that **even all polynomial scalar curvature invariants can vanish while the Riemann tensor is nonzero**. Lorentzian contractions are not positive sums of squares. A nonzero null vector already demonstrates the basic logic: its norm can be zero without the vector being zero.

<details class="history-note" data-no-narration>
<summary>Further example: a curved wave spacetime with zero scalar contractions</summary>

Start with flat coordinates $U=(ct-z)/\sqrt2$, $V=(ct+z)/\sqrt2$, both with length units. Then $-c^2dt^2+dz^2=-2\,dU\,dV$. To construct a wave geometry, add a position-dependent term:

$$
ds^2=-2\,dU\,dV+dx^2+dy^2+H(U,x,y)\,dU^2,
$$

where

$$
H=A(U)(x^2-y^2)+2B(U)xy.
$$

The profiles $A(U)$ and $B(U)$ have units of inverse length squared, so $H$ is dimensionless. The inverse of the $U,V$ metric block is

$$
\begin{pmatrix}H&-1\\-1&0\end{pmatrix}^{-1}
=\begin{pmatrix}0&-1\\-1&-H\end{pmatrix}.
$$

Thus $g^{UU}=0$ throughout the wave geometry, while $g^{VV}$ need not vanish. The nonzero Christoffel coefficients are, apart from their lower-index symmetry,

$$
\Gamma^V{}_{UU}=-\frac12\partial_UH,
\qquad\Gamma^V{}_{Ui}=-\frac12\partial_iH,
\qquad\Gamma^i{}_{UU}=-\frac12\partial_iH.
$$

There are no coefficients with upper $U$, and $H$ is independent of $V$. In the curvature formula, $R^V{}_{iUj}=-\partial_j\Gamma^V{}_{Ui}=\tfrac12\partial_i\partial_jH$; the other terms vanish. Lowering the first index supplies $g_{UV}=-1$, giving

$$
R_{UiUj}=-\frac12\partial_i\partial_jH,
\qquad i,j\in\{x,y\},
$$

so it is nonzero whenever the profiles $A$ or $B$ are nonzero. Yet

$$
R_{UU}=-\frac12(\partial_x^2H+\partial_y^2H)=0,
$$

and the other Ricci components vanish: this is a vacuum plane gravitational wave.

Why does $\mathcal K$ vanish too? Every nonzero curvature component has lower $U$ indices, but the inverse metric has $g^{UU}=0$. Raising a $U$ slot pairs it with a $V$ slot, and there are no corresponding nonzero curvature components containing $V$. The full contraction therefore vanishes even though the tidal tensor does not. These plane waves belong to the class of geometries with vanishing scalar polynomial invariants; the broader classification is given by [Pravda, Pravdova, Coley, and Milson](https://arxiv.org/abs/gr-qc/0209024).

</details>

A vanishing scalar contraction does not establish that the full tensor vanishes. For difficult spacetime classification or singularity questions, curvature components in physically or geometrically specified frames, covariant derivatives, geodesic behavior, and extension properties may all matter.

### 10.8 From the metric to curvature

The calculations in these chapters distinguish several kinds of measurement:

| Object | What it lets you ask | What it does not imply by itself |
|---|---|---|
| $g_{\mu\nu}$ | What are intervals, inner products, and causal directions? | Changing components do not by themselves prove curvature. |
| $\Gamma^\rho{}_{\mu\nu}$ | How does this connection compare neighboring directions in this chart? | Nonzero coefficients do not prove a curved geometry. |
| $R^\rho{}_{\sigma\mu\nu}$ | How does transport depend on route, and how do free paths deviate? | Twenty algebraic components do not mean twenty propagating modes. |
| $R_{\mu\nu}$ | What directional traces of curvature survive contraction? | Zero Ricci does not rule out vacuum tides. |
| $R$ | What fully contracted curvature remains? | Zero scalar curvature does not mean flatness. |
| $C_{\rho\sigma\mu\nu}$ | What trace-free curvature remains after Ricci is removed? | Trace-free initial tides do not preserve a cloud's volume forever. |
| $G_{\mu\nu}$ | Which Ricci combination has identically zero covariant divergence? | Zero divergence is not constancy in every direction. |

The next step is physical rather than merely geometrical: identify the tensor that describes matter's energy, momentum, and stresses, then find the dynamical equation and action that relate it to the geometry you have just learned to measure.

### 10.9 Measuring tides near Earth

The tidal equation lets us estimate an experiment near Earth’s surface. Outside a spherical Earth, the radial relative acceleration of two nearby freely falling particles separated by $\ell$ is approximately

$$
\Delta a_r\simeq \frac{2G_NM_\oplus}{R_\oplus^3}\ell.
$$

Use $G_NM_\oplus=3.9860\times10^{14}\,\mathrm{m^3/s^2}$ and $R_\oplus=6.371\times10^6\,\mathrm m$. For $\ell=1\,\mathrm m$, this gives $\Delta a_r\simeq3.08\times10^{-6}\,\mathrm{m/s^2}$. It is a few millionths of a metre per second squared, not the approximately $9.8\,\mathrm{m/s^2}$ of a supported laboratory's accelerometer.

In the static orthonormal frame outside Earth, the magnitude of the corresponding radial curvature component is

$$
\mathcal R_{\rm tidal}=\frac{2G_NM_\oplus}{c^2R_\oplus^3}
\simeq3.43\times10^{-23}\,\mathrm{m^{-2}}.
$$

The associated scale $\mathcal R_{\rm tidal}^{-1/2}\simeq1.71\times10^{11}\,\mathrm m$ is about 1.14 astronomical units. One astronomical unit is approximately $1.496\times10^{11}\,\mathrm m$, the scale of the Earth–Sun distance. This is a scale constructed from one component, not a literal circle into which four-dimensional spacetime bends. Notice the units: restoring $c^2$ gives a relative acceleration **per unit separation**, and multiplying by $\ell$ gives the acceleration difference. Curvature by itself does not determine the weight of one supported object.

This symbol names a component magnitude, with units of inverse length squared. The Kretschmann scalar retains the symbol $\mathcal K$ and has units of inverse length to the fourth power. In Schwarzschild spacetime, $\mathcal K=12\mathcal R_{\rm tidal}^2$ for this radial component; the length $\mathcal K^{-1/4}$ differs from $\mathcal R_{\rm tidal}^{-1/2}$ by the factor $12^{-1/4}$.

Here is a second useful conversion. Earth's geometrized mass is $G_NM_\oplus/c^2\simeq4.44\,\mathrm{mm}$, and its Schwarzschild radius is twice that, about $8.87\,\mathrm{mm}$. These are compactness scales. Earth is not a black hole: its actual radius is hundreds of millions of times larger.

### 10.10 Counting curvature through coordinate freedom

Chapter 8 counted curvature components using tensor symmetries. There is a second useful perspective: compare the metric's Taylor coefficients with the coordinate freedom that can change them. This is a count that supports the normal-coordinate construction, not a substitute for its existence proof.

At an event, a symmetric four-by-four metric has ten independent entries. A linear coordinate transformation has sixteen coefficients. Once it puts the metric into Minkowski form, six continuous freedoms remain: three spatial rotations and three boosts. The first derivatives of the metric then have $4\times10=40$ entries. The quadratic part of a coordinate transformation also has $4\times10=40$ coefficients, symmetric in its two lower coordinate labels; normal coordinates use this freedom to eliminate those first derivatives.

At the next order, the second derivatives have $10\times10=100$ entries. The cubic coordinate change has four choices of output component and twenty symmetric triples of input labels, giving $4\times20=80$ coefficients. We can count the unordered triples directly: four have all labels equal; $4\times3=12$ have a repeated label and a different third label; four have three distinct labels. The total is $4+12+4=20$. The remaining $100-80=20$ independent combinations are precisely the curvature information that cannot be eliminated at the event.

This count explains the hierarchy: the metric's values supply local measuring units, its first derivatives can be simplified away at one event, and curvature survives in the quadratic spatial variation. It does not say that there are twenty propagating gravitational polarizations. Chapter 20 counts dynamical initial data and reaches a different answer to a different question.

<a id="chapter-11"></a>

## 11. Energy, momentum, and stress

Consider gas in a box. It has energy, pushes on the walls, and can carry energy and momentum from one part of the box to another. An observer moving past the box measures different particle energies and sees a different flow. We need a description that relates all these measurements consistently.

The **stress-energy tensor** provides that description. Once we understand its entries, we can connect matter to the geometry of the preceding chapters.

### 11.1 Energy density and momentum flux

Put an imaginary detector through the gas. It does not block the particles; it records each crossing. A particle carries energy and a momentum arrow. The arrow can point sideways to the detector, so we must specify both **which direction is crossed** and **which momentum component is carried**.

First watch a single stream cross the detector. Then choose balanced motion. There is no average motion of the gas, but particles still cross in both directions. Their energies can flow equally both ways while their normal momentum transfers add. This is how pressure can remain when the bulk flow is zero.

<div data-foundation-insert="particle-flow"></div>

A density measures what is present per volume. A flux measures what crosses a surface per area per time. The distinction is physical: counting the particles inside the cube and recording passages through the detector are different experiments. In the lab, selecting “In the box” performs the first; selecting “Across x,” “Across y,” or “Across z” performs the second. The finite crossing estimate fluctuates around the volume average because a short count samples only some of the particles.

Start in a tiny laboratory with orthonormal axes, using $x^{\hat 0}=ct$. Hats distinguish physically calibrated local axes from arbitrary coordinate axes. Let

- $\epsilon$ be energy per volume, in $\mathrm{J/m^3}$;
- $S_i$ be energy flux, in $\mathrm{J/(m^2\,s)}$;
- $\pi_i$ be momentum per volume, in $\mathrm{kg/(m^2\,s)}$;
- $\Pi_{ij}$ be the flux of $j$-momentum through a surface normal to direction $i$, in $\mathrm{N/m^2}$.

The stress–energy tensor packages these quantities as

$$
T^{\hat\mu\hat\nu}=
\begin{pmatrix}
\epsilon & c\pi_x & c\pi_y & c\pi_z\\
S_x/c & \Pi_{xx} & \Pi_{xy} & \Pi_{xz}\\
S_y/c & \Pi_{yx} & \Pi_{yy} & \Pi_{yz}\\
S_z/c & \Pi_{zx} & \Pi_{zy} & \Pi_{zz}
\end{pmatrix}.
$$

Every entry has energy-density units. In this display, the second index identifies which energy–momentum component is being tracked; the first identifies the direction through which it flows. The time row records what is present in a spatial volume. The spatial rows record transport through its faces.

For the symmetric stress tensor appearing in ordinary metric general relativity,

$$
T^{\mu\nu}=T^{\nu\mu},
\qquad
\boxed{\mathbf S=c^2\boldsymbol\pi.}
$$

This is a local relationship between energy flow and momentum density. It is one of the most useful ways to recognize that energy and momentum belong to one relativistic object. A beam of light has momentum because it transports energy; a moving lump of matter does too.

Check the packaging by taking a divergence in an inertial Cartesian laboratory:

$$
\partial_\mu T^{\mu\nu}=0.
$$

Set $\nu=0$. Since $\partial_0=c^{-1}\partial_t$,

$$
\frac1c\frac{\partial\epsilon}{\partial t}
+\partial_i\left(\frac{S_i}{c}\right)=0,
$$

or

$$
\boxed{\frac{\partial\epsilon}{\partial t}+\boldsymbol\nabla\cdot\mathbf S=0.}
$$

Energy disappearing from a little box must flow through its faces. Now set $\nu=j$:

$$
\boxed{\frac{\partial\pi_j}{\partial t}+\partial_i\Pi_{ij}=0.}
$$

That is the momentum balance law. A pressure gradient changes a fluid's momentum because one face receives a different momentum flux from the opposite face. Together, these are the four local balance equations: one for energy and one for each component of momentum.

**Coordinate components and instrument readings.** In spherical coordinates, $T^{\theta\theta}$ is not a pressure read directly from a gauge aligned with an angular ruler. The coordinate basis has its own normalization. Physical readings come from contraction with an observer's orthonormal frame.

**Lowering a time index.** In an orthonormal frame with signature $(-,+,+,+)$, lowering a single time index changes its sign. Thus a fluid at rest, with pressure $p$, has

$$
T^{\hat\mu\hat\nu}=\operatorname{diag}(\epsilon,p,p,p),
\qquad
T^{\hat\mu}{}_{\hat\nu}=\operatorname{diag}(-\epsilon,p,p,p).
$$

The measured energy density remains $T_{\hat0\hat0}=\epsilon$. The negative mixed component results from lowering just one time index; lowering both gives the positive energy-density component.

### 11.2 Measurements made by a chosen observer

A particle's energy depends on who measures it. So does a field's energy density. The covariant object is $T_{\mu\nu}$; “energy density” is one observer's projection of it.

Let an observer have four-velocity $w^\mu$, with $w_\mu w^\mu=-c^2$, and define the dimensionless unit timelike vector

$$
n^\mu=\frac{w^\mu}{c},\qquad n_\mu n^\mu=-1.
$$

The observer's spatial projector is

$$
H^\mu{}_{\nu}=\delta^\mu{}_{\nu}+n^\mu n_\nu.
$$

Why the plus sign? Apply it to $n^\nu$:

$$
H^\mu{}_{\nu}n^\nu=n^\mu+n^\mu(-1)=0.
$$

It removes the time direction, leaving precisely the observer's local three-dimensional rest space. The observer measures

$$
\epsilon_{(n)}=T_{\mu\nu}n^\mu n^\nu,
$$

$$
j^\mu=-H^\mu{}_{\alpha}T^{\alpha\beta}n_\beta,
\qquad
P^{\mu\nu}=H^\mu{}_{\alpha}H^\nu{}_{\beta}T^{\alpha\beta}.
$$

Here $j^\mu$ is spatial and has energy-density units: the physical energy-flux vector is $c j^\mu$, and momentum density is $j^\mu/c$. The tensor $P^{\mu\nu}$ is the spatial stress seen by that observer. Together they reconstruct the whole tensor:

$$
\boxed{
T^{\mu\nu}=\epsilon_{(n)}n^\mu n^\nu
+n^\mu j^\nu+j^\mu n^\nu+P^{\mu\nu}.
}
$$

Check these definitions in the observer's own orthonormal frame. There $n^\mu=(1,0,0,0)$, $n_\mu=(-1,0,0,0)$, and $H^\mu{}_{\nu}=\operatorname{diag}(0,1,1,1)$. Thus $\epsilon_{(n)}=T_{00}$, $j^i=T^{i0}=S_i/c$, and $P^{ij}=T^{ij}$. The minus sign in the definition of $j$ compensates for the negative lowered time component. We recover exactly the quantities in §11.1.

For a numerical observer change, take a sample with negligible pressure and no energy flow in its own frame, so its only nonzero component is $T_{00}=\epsilon$. An observer moving along $x$ has $n^\mu=\gamma(1,\beta,0,0)$ and measures

$$
\epsilon_{(n)}=\gamma^2\epsilon.
$$

At $v=0.6c$, $\gamma=1.25$, giving $1.5625\epsilon$. One factor of $\gamma$ reflects the increased energy of each particle; the other reflects the increased number of particles per volume measured in the moving frame. The tensor describes both observers' results.

Some matter admits a local rest frame with zero energy flux. A single beam of light does not: catching up with the beam would require a timelike observer to become null. Never assume that every stress tensor can be put into a perfect-fluid rest-frame form.

### 11.3 Dust: particles with negligible pressure

The pressureless sample just considered is called **dust**. Within a small fluid element, its particles share one velocity; their random motion and pressure are neglected. This is useful for sufficiently cold, dilute matter on scales where those approximations hold.

In the common rest frame of a small dust element, only the energy-density component is nonzero. If its four-velocity is $u^\mu$, the covariant expression reproducing this is

$$
\boxed{
T^{\mu\nu}_{\rm dust}=\frac{\epsilon}{c^2}u^\mu u^\nu
=\rho u^\mu u^\nu,
\qquad \rho=\frac{\epsilon}{c^2}.
}
$$

In the rest frame $u^{\hat\mu}=(c,0,0,0)$, so $T^{\hat0\hat0}=\rho c^2=\epsilon$. A moving observer sees energy flux and spatial momentum flux automatically, because $u^i$ is then nonzero.

The curved-spacetime conservation equation is

$$
0=\nabla_\mu T^{\mu\nu}
=u^\nu\nabla_\mu(\rho u^\mu)
+\rho u^\mu\nabla_\mu u^\nu.
$$

Contract this with $u_\nu$. The second term vanishes because

$$
u_\nu\nabla_\mu u^\nu=\frac12\nabla_\mu(u_\nu u^\nu)=0.
$$

The first term therefore gives

$$
\nabla_\mu(\rho u^\mu)=0.
$$

Insert that result back into the uncontracted equation. Wherever $\rho\ne0$,

$$
u^\mu\nabla_\mu u^\nu=0.
$$

The same conservation law has produced both continuity of dust mass and geodesic motion. For this pressureless model, continuity and free fall are two consequences of the same equation.

The qualification matters. Charged matter exchanging momentum with an electromagnetic field need not have a separately conserved matter stress tensor. A pressured fluid accelerates because neighboring fluid elements push it. Extended spinning bodies can have curvature-dependent corrections to simple geodesic motion. Dust is a controlled idealization, not a universal description of matter.

### 11.4 Perfect fluids, derived from isotropy

The particle experiment showed momentum crossing a surface because particles traveled through it. Real fluids also transmit tangential forces between neighboring layers. Slide a plate over a layer of oil: the oil beside the plate follows it and drags the oil farther away. The force required depends on how quickly velocity changes across the layers. The material coefficient relating that velocity gradient to force per area is its **viscosity**.

In the next experiment, the blue dots are dye following the average fluid motion. The gold arrows show the forces between layers. A faster flow need not have a larger shear force: inspect the middle of the pressure-driven channel, where the fluid moves fastest but the velocity profile has zero slope.

<div data-foundation-insert="fluid-shear"></div>

We now make a simpler approximation, setting aside those viscous shear forces. It is useful when their effect on the motion is negligible over the distances and times being studied. The remaining rest-frame stress is pressure, acting equally in every direction.

A **perfect fluid** can have pressure from microscopic particle motion, but its local rest frame has no preferred spatial direction and no net heat flow. The model neglects viscosity: the additional momentum transfer associated with neighboring layers moving differently. Rotating the rest-frame axes must leave its stress unchanged. This requires zero off-diagonal entries and equal diagonal entries, giving $p\delta^{ij}$, where $p$ is pressure.

Let

$$
H^{\mu\nu}=g^{\mu\nu}+\frac{u^\mu u^\nu}{c^2}
$$

be the projector onto the fluid's rest space. Its energy contribution must be $\epsilon u^\mu u^\nu/c^2$; its isotropic spatial stress must be $pH^{\mu\nu}$. Adding them gives

$$
\boxed{
T^{\mu\nu}=(\epsilon+p)\frac{u^\mu u^\nu}{c^2}
+p g^{\mu\nu}.
}
$$

The combination $\epsilon+p$ follows from the observer’s spatial projector. Pressure initially entered as a purely spatial stress. Expressing “spatial” covariantly requires a projector containing $u^\mu u^\nu$, so pressure also joins the coefficient of the velocity term.

For an observer moving at relative speed $v$ with respect to the fluid,

$$
\epsilon_{\rm measured}=(\epsilon+p)\gamma^2-p,
\qquad
\gamma=\frac{1}{\sqrt{1-v^2/c^2}}.
$$

This follows by contracting $T_{\mu\nu}$ with the observer's unit time vector and using $u\cdot w=-c^2\gamma$. Even the energy density measured by a moving observer knows about pressure.

To extract the fluid equations, first apply the product rule to the full tensor:

$$
\begin{aligned}
0={}&\frac{u^\nu}{c^2}\left[u^\mu\nabla_\mu(\epsilon+p)
+(\epsilon+p)\nabla_\mu u^\mu\right]\\
&+\frac{\epsilon+p}{c^2}a^\nu+\nabla^\nu p,
\qquad a^\nu=u^\mu\nabla_\mu u^\nu.
\end{aligned}
$$

Contract with $u_\nu$. Normalization gives $u_\nu u^\nu=-c^2$ and $u_\nu a^\nu=0$. The two derivatives of $p$ cancel, leaving

$$
\boxed{
u^\mu\nabla_\mu\epsilon+(\epsilon+p)\theta=0,
\qquad \theta=\nabla_\mu u^\mu.}
$$

Here $\theta$ measures fractional expansion of a small comoving volume. Write its proper volume as $V$ so that $dV/d\tau=\theta V$. Multiplying the equation by $V$ yields

$$
\frac{d(\epsilon V)}{d\tau}=-p\frac{dV}{d\tau}.
$$

This is the pressure–volume work law. To see the mechanical meaning, imagine a piston with area $A$ moving outward by $d\ell$. Pressure exerts force $pA$, doing work $pA\,d\ell=p\,dV$. The fluid’s energy decreases by that amount when there is no heat transfer.

Now apply the spatial projector $H^\alpha{}_{\nu}$ to the expanded equation. It removes the term proportional to $u^\nu$ and leaves $a^\alpha$ unchanged because $u\cdot a=0$. The result is

$$
\boxed{
\frac{\epsilon+p}{c^2}a^\alpha
=-H^{\alpha\mu}\nabla_\mu p,
\qquad a^\alpha=u^\mu\nabla_\mu u^\alpha.
}
$$

The pressure gradient supplies the force density; $(\epsilon+p)/c^2$ supplies the relativistic inertial coefficient. In a cold, slow fluid, $p\ll\epsilon\simeq\rho c^2$, recovering $\rho\mathbf a=-\boldsymbol\nabla p$ locally.

**Pressure and tension conventions.** Relativity's $T^{ij}$ is momentum flux. Some engineering conventions define Cauchy stress as positive in tension, giving a stationary fluid the mechanical stress $-p\delta^{ij}$. When comparing formulas, check whether the tensor describes momentum flux or mechanical traction with this tension convention.

### 11.5 Radiation pressure and the mass of a box

The field equation developed next implies, in an orthonormal frame comoving with an isotropic fluid,

$$
R_{\hat0\hat0}
=\frac{4\pi G_N}{c^4}(\epsilon+3p)-\Lambda.
$$

The factor $3p$ is the sum of the stresses in three spatial directions. It describes a particular Ricci-curvature projection relevant to focusing timelike geodesics. It is not a universal instruction to replace all mass densities everywhere by $(\epsilon+3p)/c^2$.

For isotropic radiation, $p=\epsilon/3$. Here is the momentum-flux calculation. A photon of energy $E$ traveling along a unit direction $n$ carries momentum $(E/c)n_j$ in direction $j$. Its crossing rate through a face normal to $i$ contains the velocity component $cn_i$. Thus a beam with energy density $\epsilon_{\rm beam}$ contributes $\epsilon_{\rm beam}n_in_j$ to the momentum flux.

Average over an isotropic distribution of directions. The three averages $\langle n_x^2\rangle$, $\langle n_y^2\rangle$, and $\langle n_z^2\rangle$ are equal and sum to one, so each is $1/3$. The off-diagonal averages vanish by symmetry. Each diagonal stress is therefore $\epsilon/3$.

Substituting gives $\epsilon+3p=2\epsilon$. Taken alone, this appears to assign radiation twice the gravitational effect expected from its energy. To determine the mass of a box containing radiation, however, we must include the box’s stresses too.

The missing member of that calculation is the box. Radiation pushes outward; walls develop stresses to hold it in. An isolated static system must include its supports in its total stress tensor. Wall tensions compensate the extra integrated radiation-pressure contribution in the regime of negligible internal self-gravity. This is the resolution studied explicitly by [Misner and Putnam in “Active Gravitational Mass”](https://link.aps.org/doi/10.1103/PhysRev.116.1045).

We can expose the mechanism with a short independent calculation. For a localized stationary system in approximately flat spacetime, total momentum conservation says

$$
\partial_kT^{kj}=0.
$$

Multiply by $x^i$ and use the product rule:

$$
\partial_k(x^iT^{kj})=T^{ij}.
$$

Integrate over a volume enclosing the system. The **divergence theorem** turns the integral of a divergence into outward flux through its boundary. It follows by assembling the small boxes from Chapter 0: neighboring boxes share a face with opposite outward normals, so their interior-face contributions cancel. Only the outer faces remain. Here the relevant flux is $x^iT^{kj}$. Take the enclosing boundary to infinity; if the complete system’s stresses decay sufficiently fast, its surface contribution vanishes. We obtain

$$
\int T^{ij}\,d^3x=0.
$$

The positive pressure stresses of the contents cannot be the whole story: other stresses must balance their integral. Consequently the leading static weak-field mass contribution

$$
\frac1{c^2}\int\left(T^{00}+\sum_iT^{ii}\right)d^3x
$$

reduces to total energy divided by $c^2$ for the complete system under these assumptions. If you supply additional energy $E$ without otherwise changing the total energy accounting, the leading mass increase is $E/c^2$. Gravitational binding corrections require the appropriate relativistic total-energy definition.

Pressure contributes to the field equation. In this stationary box, the wall tensions also contribute. Including both reconciles the local pressure term with the total mass inferred far from the complete system.

### 11.6 Two field examples: scalar waves and electromagnetism

For this scalar-field subsection only, choose time and length units with $c=1$. A real scalar field assigns one real number $\phi$ to each event. Choose its normalization so that squared derivatives have energy-density units, and let $V(\phi)$ be its potential energy density. A **Lagrangian density** is the local integrand used to build a field action, analogous to the particle Lagrangian of Chapter 5. The model considered here uses

$$
\mathcal L_\phi=-\frac12g^{\mu\nu}\partial_\mu\phi\partial_\nu\phi-V(\phi).
$$

This is a specified model for matter, an additional physical input to GR. Its kinetic sign is chosen for signature $(-,+,+,+)$, so time-dependent excitations have positive kinetic energy. For now we will evaluate its energy and pressure; Chapter 13 derives the field and stress equations by variation.

The metric-variation method of Chapter 13 gives

$$
T_{\mu\nu}^{(\phi)}
=\partial_\mu\phi\partial_\nu\phi
-g_{\mu\nu}\left[\frac12(\partial\phi)^2+V(\phi)\right],
$$

where $(\partial\phi)^2=g^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi$. In a local inertial frame,

$$
\epsilon_\phi=\frac12\dot\phi^2+\frac12|\boldsymbol\nabla\phi|^2+V.
$$

Time variation, spatial gradients, and potential energy all contribute. For a homogeneous field in its comoving frame,

$$
p_\phi=\frac12\dot\phi^2-V.
$$

Kinetic energy gives positive pressure; potential energy gives negative pressure. This prepares the intuition for scalar-field cosmology without requiring a field to be imagined as a literal fluid of tiny balls.

**Return to SI units and $x^0=ct$.** Before packaging electromagnetism into a tensor, give its two fields a measuring procedure. A small test body's **electric charge** $q$ determines its electromagnetic response; charge is measured in coulombs (C), and its sign can be positive or negative. The **electric field** $\mathbf E$ is the force per unit positive charge on a test body momentarily at rest. It is measured in newtons per coulomb. The **magnetic field** $\mathbf B$ describes an additional force on a moving charge. Together they enter the experimentally established Lorentz-force law:

$$
\frac{d\mathbf p}{dt}=q(\mathbf E+\mathbf v\times\mathbf B).
$$

Here $\mathbf p$ is the particle's ordinary three-momentum and $\mathbf v$ its velocity in the chosen local inertial frame. The magnetic field has units $\mathrm{N\,s/(C\,m)}$, called teslas. The **cross product** $\mathbf a\times\mathbf b$ is perpendicular to both arrows, with magnitude $|\mathbf a||\mathbf b|\sin\theta$ when the angle between them is $\theta$. Its direction follows the right-hand rule: curl the fingers from $\mathbf a$ toward $\mathbf b$; the thumb points along the product. In right-handed Cartesian axes its components are

$$
\mathbf a\times\mathbf b
=(a_yb_z-a_zb_y,\ a_zb_x-a_xb_z,\ a_xb_y-a_yb_x).
$$

For example, velocity along +x and magnetic field along +y give a magnetic force on a positive charge along +z. The magnetic force is perpendicular to the velocity, so it changes the momentum's direction without doing work on that particle. The electric contribution supplies power $q\mathbf E\cdot\mathbf v$.

Electric and magnetic fields depend on the observer. The **electromagnetic field-strength tensor** $F_{\mu\nu}$ packages their six components so another observer can transform them together. It is antisymmetric: $F_{\nu\mu}=-F_{\mu\nu}$. With our metric signature, choose

$$
F_{0i}=-\frac{E_i}{c},\qquad F_{ij}=\varepsilon_{ijk}B_k,
$$

in a local orthonormal frame. Here $\varepsilon_{ijk}$ is the three-dimensional antisymmetric symbol: $\varepsilon_{123}=+1$, exchanging two indices reverses the sign, and repeating an index gives zero. It is unrelated to energy density $\epsilon$.

The factor $1/c$ gives the temporal and spatial entries of $F$ the same units. It also makes the covariant force law $dp^\mu/d\tau=qF^\mu{}_{\nu}u^\nu$ reproduce the three-force above: insert $u^\nu=\gamma(c,\mathbf v)$ and divide by $dt/d\tau=\gamma$. The temporal contribution becomes $q\mathbf E$ and the spatial contribution becomes $q\mathbf v\times\mathbf B$.

Two vacuum constants set the SI normalization: the **permittivity** $\epsilon_0$ and **permeability** $\mu_0$. They relate the strengths of the electric and magnetic fields to charge, electric current (charge flowing past a point per unit time), and stored field energy. Their units are $\mathrm{C^2/(N\,m^2)}$ and $\mathrm{N\,s^2/C^2}$ respectively, and $\epsilon_0\mu_0c^2=1$. Thus $\epsilon_0E^2$ and $B^2/\mu_0$ both have units of energy per volume.

The electromagnetic Lagrangian energy density and stress tensor are

$$
\mathcal L_{\rm EM}=-\frac1{4\mu_0}F_{\alpha\beta}F^{\alpha\beta},
$$

$$
\boxed{
T_{\mu\nu}^{\rm EM}
=\frac1{\mu_0}\left(
F_{\mu\alpha}F_\nu{}^\alpha
-\frac14g_{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}
\right).
}
$$

These conventions produce

$$
\epsilon_{\rm EM}=
\frac{\epsilon_0E^2}{2}+\frac{B^2}{2\mu_0},
\qquad
\mathbf S=\frac1{\mu_0}\mathbf E\times\mathbf B,
\qquad
\epsilon_0\mu_0c^2=1.
$$

The energy-flux vector $\mathbf S$ is called the **Poynting vector**. Its direction is the direction of energy transport; its magnitude gives energy crossing a perpendicular unit area per unit time. The corresponding momentum density is $\mathbf S/c^2$, as in §11.1. The field-action formulas here preview the variational construction developed in Chapter 13. The same tensor includes electric and magnetic stresses, so a magnetic field can affect geometry even in a region containing no material particles.

**A light wave as a check.** A plane wave has the same field across each plane perpendicular to its direction of travel. At one event in such a wave traveling along +z, suppose $\mathbf E=(E,0,0)$ and $\mathbf B=(0,E/c,0)$. The two contributions to the energy density are equal because $1/(\mu_0c^2)=\epsilon_0$. Therefore

$$
\epsilon_{\rm EM}=\epsilon_0E^2,
\qquad
\mathbf S=(0,0,c\epsilon_{\rm EM}),
\qquad
\boldsymbol\pi=(0,0,\epsilon_{\rm EM}/c).
$$

The field energy moves at $c$ and carries forward momentum. Here $E$ is the instantaneous field value, which can vary along the wave. With other local field configurations, stored energy need not imply a nonzero net flux: if $\mathbf E$ and $\mathbf B$ are parallel, their cross product vanishes even when the energy density is positive.

Its classical trace in four spacetime dimensions vanishes:

$$
T^\mu{}_{\mu}=0.
$$

Contract the displayed tensor: the first term gives $F_{\mu\alpha}F^{\mu\alpha}$, and the second gives $4\times\frac14$ times that same quantity. They cancel. Zero trace does not mean zero energy, zero stress, or zero gravitational influence.

<a id="chapter-12"></a>

## 12. Einstein's field equation

The stress-energy tensor describes matter. The Einstein tensor describes a particular combination of curvature. Einstein’s field equation relates them:

$$
\boxed{
\underbrace{R_{\mu\nu}-\frac12R g_{\mu\nu}}_{G_{\mu\nu}}
+\Lambda g_{\mu\nu}
=\frac{8\pi G_N}{c^4}T_{\mu\nu}.
}
$$

This is a local differential equation for the spacetime metric, coupled to the matter equations. To make a prediction, solve for a metric and matter configuration together, with suitable initial or boundary conditions. Then use that metric to calculate clock readings, light signals, and free-fall trajectories.

### 12.1 Reading the field equation

| Symbol | What it is | What job it does |
|---|---|---|
| $g_{\mu\nu}$ | Lorentzian metric | Defines intervals, causal structure, contractions, and the Levi-Civita connection |
| $R_{\mu\nu}$ | Ricci curvature | Records a contraction of tidal curvature |
| $R=g^{\mu\nu}R_{\mu\nu}$ | Scalar curvature | Supplies the curvature trace |
| $G_{\mu\nu}$ | Einstein tensor | Combines Ricci curvature and its trace into an identically divergence-free tensor |
| $\Lambda$ | Cosmological constant | Adds a permitted curvature scale even without ordinary matter |
| $T_{\mu\nu}$ | Nongravitational stress–energy | Supplies energy, momentum, flux, and stress |
| $G_N$ | Newton's gravitational constant | Calibrates the strength of gravity using the Newtonian limit |
| $c$ | Speed of light | Relates temporal and spatial units and energy to mass |
| $\mu,\nu$ | Free tensor indices | Specify which pair of directions is being compared |

In local axes with all coordinates measured in length, curvature components have units $\mathrm{m^{-2}}$ and $T_{\mu\nu}$ has units $\mathrm{J/m^3}$. Since

$$
\left[\frac{G_N}{c^4}\right]=\mathrm{m/J},
$$

the right-hand side has curvature units. In angular or differently normalized coordinates, individual component units follow their coordinate bases; the tensor equation remains dimensionally consistent.

The equation is nonlinear. The inverse metric appears in contractions; the connection contains $g^{-1}\partial g$; curvature contains $\partial\Gamma+\Gamma\Gamma$. The object being solved for helps define the differential operator acting on itself.

For example, the field equation relates a fluid’s density and pressure to the metric. The fluid equation in Chapter 11 also contains that metric through its connection. Changing the geometry changes how the fluid moves, while changing the fluid changes the source of the geometry. These equations must be solved consistently.

### 12.2 Why subtract half the trace?

The contracted Bianchi identity derived in Chapter 9 is

$$
\nabla^\mu R_{\mu\nu}=\frac12\nabla_\nu R.
$$

Suppose we seek a particularly simple symmetric curvature tensor of the form

$$
A R_{\mu\nu}+B Rg_{\mu\nu}+C g_{\mu\nu},
$$

with constant coefficients. Metric compatibility gives $\nabla g=0$, so its divergence is

$$
\left(\frac A2+B\right)\nabla_\nu R.
$$

To make this vanish for arbitrary metrics, choose $B=-A/2$. Rescale the overall equation to set $A=1$. The surviving combination is

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}.
$$

The factor $1/2$ is required for the divergence to vanish within this chosen form of the equation. The coefficient multiplying the matter tensor still has to be fixed by measurement.

This does **not** establish that “the equivalence principle uniquely proves Einstein's equation.” We selected a metric theory with a particular low-derivative curvature structure. More general curvature actions, extra fields, independent connections, or other assumptions can change the dynamics while retaining coordinate covariance. The equivalence principle guides the local relation between matter and geometry; it does not provide every dynamical postulate by itself.

The action principle in Chapter 14 will supply a second route to precisely the same trace subtraction. That derivation will identify which part of the metric variation produces the trace term.

### 12.3 Trace reversal: the most useful algebraic rearrangement

Define

$$
\kappa=\frac{8\pi G_N}{c^4},\qquad
T=g^{\mu\nu}T_{\mu\nu}.
$$

Contract Einstein's equation with $g^{\mu\nu}$. In four dimensions $g^{\mu\nu}g_{\mu\nu}=4$, so

$$
R-\frac12R(4)+4\Lambda=\kappa T.
$$

Thus

$$
\boxed{R=4\Lambda-\kappa T.}
$$

Substitute this back into the original equation:

$$
\boxed{
R_{\mu\nu}=\kappa\left(T_{\mu\nu}-\frac12Tg_{\mu\nu}\right)
+\Lambda g_{\mu\nu}.
}
$$

This is the **trace-reversed form**. It is mathematically equivalent in four dimensions, but often much easier to use. For a perfect fluid, $T=-\epsilon+3p$. Therefore

$$
R_{\hat0\hat0}
=\kappa\left[\epsilon+\frac12(-\epsilon+3p)\right]-\Lambda
=\frac\kappa2(\epsilon+3p)-\Lambda,
$$

which explains the pressure result from Chapter 11.

If $T_{\mu\nu}=0$ and $\Lambda=0$, then $R_{\mu\nu}=0$. This does not force the entire Riemann tensor to vanish: Weyl curvature can remain. Black-hole exteriors and gravitational waves provide examples with nonzero vacuum curvature.

If $T=0$ but $T_{\mu\nu}\ne0$, then $R=4\Lambda$ while Ricci curvature still responds to matter. An electromagnetic field is the standard counterexample to the false statement “zero scalar curvature means empty, flat spacetime.”

The coefficient changes with dimension. In $d>2$ dimensions,

$$
R_{\mu\nu}=\kappa\left(T_{\mu\nu}-\frac{T}{d-2}g_{\mu\nu}\right)
+\frac{2\Lambda}{d-2}g_{\mu\nu}.
$$

The four-dimensional $1/2$ in trace reversal is dimension dependent. The $1/2$ in the definition of the Einstein tensor is not.

### 12.4 Matching Newtonian gravity

We still owe an explanation of $8\pi G_N/c^4$. Temporarily write an unknown coupling $\kappa$ on the right-hand side.

Assume a weak, nearly static field, slow matter and test particles, negligible pressure compared with rest energy, and a region where coordinates are approximately Minkowskian. Let $\Phi$ denote the ordinary Newtonian gravitational potential, with dimensions of velocity squared.

First establish what $\Phi$ has to do with the metric. For a slow particle, the spatial geodesic equation is dominated by its two temporal velocities:

$$
\frac{d^2x^i}{dt^2}\simeq-c^2\Gamma^i{}_{00}.
$$

This follows from the proper-time equation using $dt/d\tau\simeq1$ at leading order. Terms involving spatial velocities and the associated nonaffine corrections in $t$ are higher order in this limit.

With $g_{0i}$ negligible and time derivatives negligible,

$$
\Gamma^i{}_{00}\simeq-\frac12\delta^{ij}\partial_jg_{00}.
$$

To reproduce Newton's $d^2x^i/dt^2=-\partial_i\Phi$, we require

$$
\boxed{g_{00}\simeq-\left(1+\frac{2\Phi}{c^2}\right).}
$$

This step is kinematical: it identifies the Newtonian potential through the behavior of slow free fall. It has not yet used Einstein's field equation.

Next calculate $R_{00}$. With our curvature convention,

$$
R_{00}
=\partial_\rho\Gamma^\rho{}_{00}
-\partial_0\Gamma^\rho{}_{\rho0}
+\Gamma^\rho{}_{\rho\lambda}\Gamma^\lambda{}_{00}
-\Gamma^\rho{}_{0\lambda}\Gamma^\lambda{}_{\rho0}.
$$

Staticity removes the time-derivative term; weakness lets us discard products of first-order connections. What remains is

$$
R_{00}\simeq\partial_i\Gamma^i{}_{00}
=\frac{\boldsymbol\nabla^2\Phi}{c^2}.
$$

For slow, pressureless matter,

$$
T_{00}\simeq\rho c^2,
\qquad
T\simeq-\rho c^2,
\qquad
 g_{00}\simeq-1.
$$

The trace-reversed source is consequently

$$
T_{00}-\frac12Tg_{00}
\simeq\rho c^2-\frac12\rho c^2
=\frac12\rho c^2.
$$

Setting $\Lambda=0$ for the local matching calculation,

$$
\frac{\boldsymbol\nabla^2\Phi}{c^2}
=\frac\kappa2\rho c^2.
$$

We also need the Newtonian equation relating potential to matter density. Its normalization follows from the inverse-square force law. For a spherical mass, $\partial_r\Phi=G_NM/r^2$, so the outward flux of $\boldsymbol\nabla\Phi$ through a sphere is $(G_NM/r^2)(4\pi r^2)=4\pi G_NM$.

In Newtonian gravity the contributions from separate masses add. Summing them and applying the divergence theorem from §11.5 gives, for an enclosing volume,

$$
\int\boldsymbol\nabla^2\Phi\,d^3x
=4\pi G_N\int\rho\,d^3x.
$$

Away from a point source, the flux through a small box is zero because the Hessian trace from §10.5 vanishes. Each enclosed point source contributes its spherical flux. Passing to a smooth density and requiring the relation for every small volume gives **Poisson's equation**:

$$
\boldsymbol\nabla^2\Phi=4\pi G_N\rho.
$$

Comparing coefficients yields

$$
\boxed{\kappa=\frac{8\pi G_N}{c^4}.}
$$

The $4\pi$ came from spherical flux. Trace reversal supplied the additional factor of two. The powers of $c$ came from relating temporal curvature to acceleration and energy density to mass density.

Keeping the cosmological constant gives, in this same static weak-field approximation,

$$
\boldsymbol\nabla^2\Phi=4\pi G_N\rho-\Lambda c^2.
$$

For example, a local vacuum solution includes $\Phi_\Lambda=-\Lambda c^2r^2/6$. Its acceleration is $-\boldsymbol\nabla\Phi_\Lambda=+\Lambda c^2\mathbf r/3$: positive $\Lambda$ produces an outward contribution in this approximation. This is not a Newtonian description valid across an arbitrary cosmological spacetime.

### 12.5 Why the spatial metric matters

The preceding calculation needed $R_{00}$ at leading order. Computing $G_{00}$ also needs the scalar curvature $R$, which includes spatial metric derivatives. We can see their effect explicitly.

Use two independent small, time-independent functions $\varphi$ and $\psi$:

$$
ds^2\simeq-(1+2\varphi)c^2dt^2
+(1-2\psi)\delta_{ij}dx^i dx^j.
$$

Slow-particle motion identifies $\varphi=\Phi/c^2$, as just derived. We have not yet assumed a relation between the temporal change $\varphi$ and spatial change $\psi$.

Keeping only first-order terms in these functions, the nonzero connection types are

$$
\Gamma^0{}_{0i}=\partial_i\varphi,\qquad
\Gamma^i{}_{00}=\partial^i\varphi,
$$

$$
\Gamma^i{}_{jk}
=-\delta^i_k\partial_j\psi-\delta^i_j\partial_k\psi
+\delta_{jk}\partial^i\psi.
$$

The indices on spatial derivatives are raised with $\delta^{ij}$ at this order. Products of connection coefficients are second order, so the Ricci formula uses only their derivatives. Substitution gives

$$
\begin{aligned}
R_{00}&\simeq\boldsymbol\nabla^2\varphi,\\
R_{ij}&\simeq\delta_{ij}\boldsymbol\nabla^2\psi
+\partial_i\partial_j(\psi-\varphi),\\
R&\simeq4\boldsymbol\nabla^2\psi-2\boldsymbol\nabla^2\varphi.
\end{aligned}
$$

For example, the trace of the spatial connection is $\Gamma^k{}_{ki}=-3\partial_i\psi$. Together with $\Gamma^0{}_{0i}=\partial_i\varphi$, it supplies the second derivative of $\psi-\varphi$ in $R_{ij}$. Taking the Einstein combination yields

$$
\begin{aligned}
G_{00}&\simeq2\boldsymbol\nabla^2\psi,\\
G_{ij}&\simeq\partial_i\partial_j(\psi-\varphi)
-\delta_{ij}\boldsymbol\nabla^2(\psi-\varphi).
\end{aligned}
$$

In the leading static, pressureless Newtonian approximation, $T_{ij}$ is negligible. With $\Lambda=0$, set the displayed $G_{ij}$ to zero. Taking its spatial trace gives $\boldsymbol\nabla^2(\psi-\varphi)=0$, and substitution gives $\partial_i\partial_j(\psi-\varphi)=0$. Thus the difference is at most a constant plus a linear function. Boundary conditions that make both perturbations decay away from an isolated source set this difference to zero: $\psi=\varphi$.

The consistent metric therefore has both $g_{00}\simeq-(1+2\Phi/c^2)$ and $g_{ij}\simeq(1-2\Phi/c^2)\delta_{ij}$. It gives $G_{00}\simeq2\boldsymbol\nabla^2\Phi/c^2$.

If instead we set $\psi=0$ while retaining a nonzero $\varphi$, then $G_{00}$ vanishes to first order. That metric still predicts the chosen slow-particle acceleration, but it fails the density-sourcing part of Einstein's equation. An approximation sufficient for one measurement can omit terms essential for another calculation.

### 12.6 Coordinate choices and dependent equations

A symmetric four-by-four tensor has ten independent components. Einstein's equation supplies ten component equations, but the Bianchi identity imposes four differential relations among the geometric expressions. We may also choose the four coordinate functions used to label events. This freedom is called **coordinate gauge freedom**: different labels can describe the same physical geometry. The resulting initial-value system contains constraint equations as well as evolution equations; Chapter 20 will unpack it.

The component equations must satisfy these relations together. In particular, specifying an arbitrary $T_{\mu\nu}$ that fails $\nabla_\mu T^{\mu\nu}=0$ is incompatible with the geometric identity on the other side. The matter equations are part of the problem.

Finally, $T_{\mu\nu}$ here does not contain a universal local gravitational stress tensor added by hand. Gravitational self-interaction is already present in the nonlinear left-hand side. We will return to the important distinction between that fact and the existence of physically meaningful gravitational-wave energy or total mass.

### 12.7 Checking the size and units of the coupling

Curvature in an orthonormal frame has units $\mathrm{m^{-2}}$. Energy density has units $\mathrm{J/m^3}=\mathrm{N/m^2}$. To turn the latter into the former, the coupling must have units $\mathrm{N^{-1}}$:

$$
\left[\frac{G_N}{c^4}\right]
=\frac{\mathrm{m^3\,kg^{-1}\,s^{-2}}}{\mathrm{m^4\,s^{-4}}}
=\mathrm{N^{-1}}.
$$

Using $G_N\simeq6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ gives $c^4/(8\pi G_N)\simeq4.82\times10^{42}\,\mathrm N$. Multiplying curvature by this factor produces the energy-density scale on the other side of Einstein's equation.

For a concrete scale, matter with negligible pressure and mass density $3000\,\mathrm{kg/m^3}$ has rest energy density about $2.70\times10^{20}\,\mathrm{J/m^3}$. Multiplying by $8\pi G_N/c^4$ gives about $5.60\times10^{-23}\,\mathrm{m^{-2}}$. This is the source of the time-time field-equation component in the matter’s rest frame. Determining the full curvature still requires solving the field equation, but the units and the scale of this contribution are now explicit.

<a id="chapter-13"></a>

## 13. Variational calculus for paths and fields

An equation of motion tells you how a system evolves. An action assigns a number to an entire candidate history. The physical history makes that number stationary under appropriate small changes.

Chapter 5 varied a particle’s path in a fixed metric. We now extend that procedure to matter fields and then to the metric itself. The position of a particle, the value of a field, and the geometry can each be varied independently when deriving their equations.

### 13.1 From an ordinary derivative to a variation

For an ordinary function $f(x)$, a stationary point satisfies $df/dx=0$. Change $x$ by a small amount, and the first-order change in $f$ vanishes.

For mechanics, consider a candidate trajectory $q(t)$ and its action

$$
S[q]=\int_{t_1}^{t_2}L(q,\dot q,t)\,dt.
$$

The input of the functional $S[q]$ is the whole path $q(t)$; its output is one number. To differentiate it, introduce a one-parameter family of nearby histories,

$$
q_\lambda(t)=q(t)+\lambda\eta(t),
\qquad
\eta(t_1)=\eta(t_2)=0.
$$

The function $\eta(t)$ specifies a proposed displacement at each time, and the dimensionless parameter $\lambda$ controls its size. The displacement has the same units as $q$. Define

$$
\delta S=\left.\frac{d}{d\lambda}S[q_\lambda]\right|_{\lambda=0}.
$$

The endpoints are held fixed because we are comparing histories connecting the same endpoint data. Other physical questions can require other boundary conditions; they must be specified rather than guessed.

Differentiate inside the integral using the chain rule:

$$
\delta S=\int_{t_1}^{t_2}
\left(\frac{\partial L}{\partial q}\eta
+\frac{\partial L}{\partial\dot q}\dot\eta\right)dt.
$$

To extract an equation for $q(t)$, collect terms proportional to the allowed displacement $\eta$. Integration by parts transfers the derivative from $\dot\eta$ to its coefficient:

$$
\delta S=
\left[\frac{\partial L}{\partial\dot q}\eta\right]_{t_1}^{t_2}
+\int_{t_1}^{t_2}
\left[
\frac{\partial L}{\partial q}
-\frac{d}{dt}\frac{\partial L}{\partial\dot q}
\right]\eta\,dt.
$$

The boundary term vanishes by the endpoint condition. Since $\eta$ can be chosen to have support in any small interior interval, the coefficient must vanish pointwise:

$$
\boxed{
\frac{d}{dt}\frac{\partial L}{\partial\dot q}
-\frac{\partial L}{\partial q}=0.
}
$$

That last inference is the fundamental lemma of the calculus of variations. If a continuous coefficient were positive somewhere, we could choose a smooth positive displacement that vanishes outside that small region. The integral would then be positive. A negative coefficient can be excluded in the same way. Stationarity for every allowed displacement therefore requires the coefficient to vanish at each interior time.

For $L=\frac12m\dot q^2-V(q)$, the result is

$$
m\ddot q=-V'(q).
$$

Newton's equation has emerged from a statement about a complete history.

### 13.2 Stationary does not mean minimal

An action principle is often called a principle of “least action,” but its defining condition is stationarity. A stationary value can be a minimum, a maximum, or a saddle. The variation above only tests the first-order change.

For a harmonic oscillator, $L=\frac12m\dot q^2-\frac12m\omega^2q^2$. About a solution, the quadratic change in action is

$$
\Delta S=\frac{m\lambda^2}{2}
\int_{t_1}^{t_2}(\dot\eta^2-\omega^2\eta^2)\,dt.
$$

Let $T=t_2-t_1$ and choose $\eta=A\sin[\pi(t-t_1)/T]$, where $A$ has the same units as $q$. This displacement vanishes at both endpoints. The integrals of sine squared and cosine squared are each $T/2$, so

$$
\Delta S=\frac{m\lambda^2A^2T}{4}
\left(\frac{\pi^2}{T^2}-\omega^2\right).
$$

For a sufficiently long interval, this variation decreases the action. Choosing $\eta=A\sin[k\pi(t-t_1)/T]$ with a sufficiently large positive integer $k$ replaces $\pi^2/T^2$ by $k^2\pi^2/T^2$ and increases the action. The physical path is then a saddle, not a minimum.

The comparison is a calculation we perform on candidate paths. Under the stated endpoint conditions, requiring stationarity gives the same local differential equation as Newton’s force law. It also provides a systematic way to derive the equations of coupled fields.

### 13.3 Fields: a degree of freedom at every point

For a scalar field in curved spacetime, use an SI Lagrangian energy density $\mathcal L$ and write

$$
S_\phi=\frac1c\int d^4x\,\sqrt{-g}\,
\mathcal L(\phi,\nabla_\mu\phi,g^{\mu\nu}).
$$

The $1/c$ compensates for $dx^0=c\,dt$, so the action has units of energy times time. While varying $\phi$, hold the metric fixed. Define

$$
P^\mu=\frac{\partial\mathcal L}{\partial(\nabla_\mu\phi)}.
$$

Since $\phi$ is a scalar, $\nabla_\mu\phi=\partial_\mu\phi$, and

$$
\delta S_\phi=\frac1c\int\sqrt{-g}
\left[\frac{\partial\mathcal L}{\partial\phi}\delta\phi
+P^\mu\nabla_\mu\delta\phi\right]d^4x.
$$

The covariant product rule gives

$$
P^\mu\nabla_\mu\delta\phi
=\nabla_\mu(P^\mu\delta\phi)-(\nabla_\mu P^\mu)\delta\phi.
$$

The divergence becomes a boundary integral, using $\sqrt{-g}\nabla_\mu J^\mu=\partial_\mu(\sqrt{-g}J^\mu)$ from Chapter 6. It vanishes if the variation is identically zero near the boundary, as for a compactly supported interior variation. Suitable fixed boundary values can also remove this first-derivative boundary term. The field equation is

$$
\boxed{
\frac{\partial\mathcal L}{\partial\phi}-\nabla_\mu P^\mu=0.
}
$$

In the natural-unit scalar example of Chapter 11, $P^\mu=-\nabla^\mu\phi$ and $\partial\mathcal L/\partial\phi=-V'(\phi)$, giving

$$
\Box\phi-V'(\phi)=0,
\qquad
\Box=\nabla_\mu\nabla^\mu.
$$

A quadratic potential gives a useful extension of the massless wave equation in Chapter 6. Write $V=\tfrac12\mu^2\phi^2$, where $\mu$ is a constant with inverse-length units. The result is the **Klein–Gordon equation**, $\Box\phi-\mu^2\phi=0$.

In flat spacetime with $c=1$, try a wave $\phi=A\cos(\mathbf k\cdot\mathbf x-\omega t)$. Here $\mathbf k$ specifies how rapidly its phase changes with position and $\omega$ specifies how rapidly it changes with time. Substitution gives

$$
\omega^2=|\mathbf k|^2+\mu^2.
$$

If the field is interpreted quantum mechanically as particles of rest mass $m$, the quantum relations $E=\hbar\omega$ and $\mathbf p=\hbar\mathbf k$, together with $E^2=p^2c^2+m^2c^4$, identify $\mu=mc/\hbar$. Here $\hbar=h/(2\pi)$ is the reduced Planck constant, with units of action. This is the additional conversion behind writing $\mu=m$ in units $c=\hbar=1$. The classical field variation itself does not require that quantum interpretation.

**Varying the comparison rule.** The variation $\delta$ commutes with coordinate partial derivatives when comparing fields at the same coordinates. When the metric varies, the covariant derivative varies through its connection as well. For a vector,

$$
\delta(\nabla_\mu V^\nu)
=\nabla_\mu\delta V^\nu
+\delta\Gamma^\nu{}_{\mu\rho}V^\rho.
$$

The second term accounts for the changed rule for comparing vector directions. It remains even if the coordinate components of the vector are held fixed.

### 13.4 Varying a metric and its inverse

The covariant and inverse metrics are not independent fields. They obey

$$
g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_{\nu}.
$$

Vary this product:

$$
(\delta g^{\mu\alpha})g_{\alpha\nu}
+g^{\mu\alpha}\delta g_{\alpha\nu}=0.
$$

Multiply by $g^{\nu\beta}$ to isolate the inverse-metric variation:

$$
\boxed{
\delta g^{\mu\beta}
=-g^{\mu\alpha}g^{\beta\nu}\delta g_{\alpha\nu}.
}
$$

Equivalently,

$$
\boxed{
\delta g_{\mu\nu}
=-g_{\mu\alpha}g_{\nu\beta}\delta g^{\alpha\beta}.
}
$$

The matrix identity underneath is $\delta(M^{-1})=-M^{-1}(\delta M)M^{-1}$. Enlarging a positive eigenvalue of a matrix shrinks the corresponding inverse eigenvalue, which makes the minus sign intuitive. The identity itself holds for every invertible matrix, including Lorentzian metrics.

A common notation hazard is to define $k_{\mu\nu}=\delta g_{\mu\nu}$ and then raise its indices. The raised tensor $k^{\mu\nu}=g^{\mu\alpha}g^{\nu\beta}k_{\alpha\beta}$ satisfies

$$
k^{\mu\nu}=-\delta g^{\mu\nu}.
$$

“Raise the metric perturbation” and “vary the inverse metric” differ by a minus sign. Keeping these operations separate fixes the sign of the later volume and curvature variations.

### 13.5 Why the volume element varies

A spacetime region's invariant volume is not simply its coordinate volume. It is

$$
dV_4=\sqrt{-g}\,d^4x,
\qquad g=\det(g_{\mu\nu}).
$$

For signature $(-,+,+,+)$ the determinant is negative in any real nonsingular coordinate chart, hence the real positive square root of $-g$.

To vary it, first recall Jacobi's determinant identity:

$$
\delta\det M=(\det M)\operatorname{tr}(M^{-1}\delta M).
$$

Here is a short derivation. Factor

$$
\det(M+\lambda\delta M)=\det M\,
\det(I+\lambda M^{-1}\delta M).
$$

To first order, the determinant of $I+\lambda A$ is $1+\lambda\operatorname{tr}A$. In the determinant expansion, a term with exactly one perturbation contributes only when it occupies a diagonal position; off-diagonal contributions need at least two perturbations. Differentiating at $\lambda=0$ gives the identity.

Apply it to the metric:

$$
\delta g=g\,g^{\mu\nu}\delta g_{\mu\nu}.
$$

The square-root chain rule then gives

$$
\boxed{
\delta\sqrt{-g}
=\frac12\sqrt{-g}\,g^{\mu\nu}\delta g_{\mu\nu}
=-\frac12\sqrt{-g}\,g_{\mu\nu}\delta g^{\mu\nu}.
}
$$

The final minus sign comes from inverse-metric variation. It does not mean the Lorentzian volume element is imaginary or negative.

Geometrically, the trace measures the infinitesimal fractional change of a volume. A trace-free metric deformation can change a little region's shape without changing its volume to first order. In gravity, both curvature and the volume used to integrate that curvature change under variation. Ignoring the second effect would lose the $-\frac12Rg_{\mu\nu}$ term in Einstein's equation.

### 13.6 The stress tensor as the response to changing geometry

A precise definition of the matter stress tensor, with our SI action convention, is

$$
\boxed{
\delta S_m=-\frac1{2c}\int d^4x\,\sqrt{-g}\,
T_{\mu\nu}\,\delta g^{\mu\nu},
}
$$

when the matter fields themselves are held fixed and appropriate integrations by parts have been performed. Equivalently,

$$
T_{\mu\nu}=-\frac{2c}{\sqrt{-g}}
\frac{\delta S_m}{\delta g^{\mu\nu}}.
$$

A functional derivative is defined by its role in the integral giving the first variation. It is the continuum analogue of the coefficients $\partial f/\partial x_i$ in $\delta f=\sum_i(\partial f/\partial x_i)\delta x_i$.

Metric variations are symmetric. In particular,

$$
\frac{\partial g^{\alpha\beta}}{\partial g^{\mu\nu}}
=\delta^\alpha{}_{(\mu}\delta^\beta{}_{\nu)}
=\frac12\left(
\delta^\alpha{}_{\mu}\delta^\beta{}_{\nu}
+\delta^\alpha{}_{\nu}\delta^\beta{}_{\mu}
\right).
$$

There are ten independent variations, and the resulting metric stress tensor is symmetric. If one instead varies $g_{\mu\nu}$, the definition becomes

$$
\delta S_m=+\frac1{2c}\int\sqrt{-g}\,
T^{\mu\nu}\delta g_{\mu\nu}\,d^4x.
$$

Changing metric variables changes the sign convention in the variation formula, not the physical stress tensor.

For a matter Lagrangian with no derivatives of the metric, the determinant identity immediately yields

$$
\boxed{
T_{\mu\nu}=-2\frac{\partial\mathcal L_m}{\partial g^{\mu\nu}}
+g_{\mu\nu}\mathcal L_m.
}
$$

Apply this in natural units to the scalar Lagrangian. Its explicit metric derivative is $-\frac12\partial_\mu\phi\partial_\nu\phi$. The first term in $T_{\mu\nu}$ becomes $\partial_\mu\phi\partial_\nu\phi$, and the volume variation supplies $g_{\mu\nu}\mathcal L_\phi$, reproducing Chapter 11's tensor.

For electromagnetism, return to SI units. A convenient field variable is the **electromagnetic potential**, a covector field $A_\mu$. It determines the field tensor locally by

$$
F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu.
$$

Its antisymmetry is explicit. Changing $A_\mu$ to $A_\mu+\partial_\mu\chi$, for any smooth scalar $\chi$, leaves $F$ unchanged because the two mixed derivatives of $\chi$ cancel. This is electromagnetic **gauge freedom**: more than one potential describes the same electric and magnetic fields.

Hold the functions $A_\mu$ fixed while varying the metric. Then the displayed $F_{\mu\nu}$ remains fixed, but raising its indices uses the changing metric. Write its contraction as

$$
F_{\alpha\beta}F^{\alpha\beta}
=g^{\alpha\rho}g^{\beta\sigma}F_{\alpha\beta}F_{\rho\sigma}.
$$

The two inverse metrics each contribute a variation. Antisymmetry of $F$ and renaming dummy indices show that the two contributions are equal:

$$
\delta(F_{\alpha\beta}F^{\alpha\beta})
=2F_{\mu\alpha}F_\nu{}^\alpha\delta g^{\mu\nu}.
$$

Thus the explicit metric derivative of $\mathcal L_{\rm EM}$ gives the $F_{\mu\alpha}F_\nu{}^\alpha/\mu_0$ term in its stress tensor, and the volume variation gives the $-g_{\mu\nu}F^2/(4\mu_0)$ term. Even when the field components held fixed do not change, the metric changes how they are contracted into a physical energy density.

The resulting physical interpretation is: **stress–energy measures how the matter action responds when its spacetime measuring apparatus is changed.** Spatial deformations reveal stress; temporal deformations reveal energy; mixed deformations reveal momentum and energy flow. The familiar idea of stress as a response to strain has become a spacetime statement.

For matter actions containing curvature or metric derivatives, use the full functional definition rather than the short partial-derivative formula. Likewise, a fluid's energy density depends on proper volume and other constrained variables. Treating it as a metric-independent number during a naive variation will generally produce the wrong fluid stress tensor.

### 13.7 From a history to a state: Hamilton's equations

At the same position, a cart can be moving right, moving left, or standing still. Position alone cannot predict what it does next. Chapter 0 supplied both position and velocity as starting measurements. For the spring cart, momentum supplies the same missing information because $p=m\dot q$.

Make a new plot: position on the horizontal axis, momentum on the vertical axis. The pair $(q,p)$ is one point, called a **state**. The space of such pairs is **phase space**. As time passes, the point traces a curve. This curve is not the cart's path on the track: its vertical coordinate is momentum, not a second spatial direction.

Watch the cart pass the unstretched position twice. Both passages have $q=0$, but one has positive momentum and the other negative momentum. They are distinct points on the phase-space plot. At a turning point, the phase-space curve crosses $p=0$; it does not stop there, because the force is changing momentum.

<div data-mechanics-insert="phase"></div>

For the spring, the total energy expressed in these coordinates is

$$
H(q,p)=\frac{p^2}{2m}+\frac12kq^2.
$$

Holding $H$ fixed gives the ellipses in the plot. The actual motion follows one of them. Its direction can be found from two derivatives:

$$
\frac{\partial H}{\partial p}=\frac pm=\dot q,
\qquad
-\frac{\partial H}{\partial q}=-kq=\dot p.
$$

The first tells us how position changes; the second tells us how momentum changes. These are **Hamilton's equations** for this example. The function that generates them is the **Hamiltonian**. Here it is total mechanical energy. We next derive the general construction, including when that energy interpretation needs qualification.

#### Replacing velocity by momentum

Start with a Lagrangian $L(q,v,t)$, writing $v$ as a separate variable while taking partial derivatives. Define the **conjugate momentum**

$$
p=\frac{\partial L}{\partial v}.
$$

For $L=mv^2/2-U(q)$ this gives $p=mv$, so we can replace $v$ by $p/m$. More generally, suppose the momentum equation can be solved locally for $v=v(q,p,t)$. Define

$$
H(q,p,t)=p\,v(q,p,t)-L\bigl(q,v(q,p,t),t\bigr).
$$

This replacement is called a **Legendre transform**. It changes the independent variable from velocity to momentum. The cancellation that makes it useful is an ordinary product rule:

$$
\begin{aligned}
dH&=v\,dp+p\,dv-
\left(L_q\,dq+L_v\,dv+L_t\,dt\right)\\
&=v\,dp-L_q\,dq-L_t\,dt,
\end{aligned}
$$

because $L_v=p$. Subscripts here mean partial derivatives, with the other independent inputs held fixed. Compare this result with $dH=H_q\,dq+H_p\,dp+H_t\,dt$. The Euler–Lagrange equation already gives $\dot p=L_q$. Therefore

$$
\boxed{\dot q=H_p,\qquad\dot p=-H_q},
\qquad H_t=-L_t.
$$

One second-order equation for $q$ has become two first-order equations for $(q,p)$. They need the same amount of initial information. For several coordinates, use one conjugate momentum $p_i=\partial L/\partial\dot q^i$ for each coordinate and replace $pv$ by $\sum_i p_i\dot q^i$.

The local inversion is a real condition, not an automatic step. In one degree of freedom, $\partial^2L/\partial v^2\ne0$ ensures it locally. With several velocities, the matrix of second velocity derivatives must be invertible. When it is singular, relations among positions and momenta can become **constraints**. That possibility is central to relativity.

#### Energy conservation and the direction of flow

Along a solution,

$$
\frac{dH}{dt}=H_q\dot q+H_p\dot p+H_t
=H_qH_p-H_pH_q+H_t=H_t.
$$

Thus a Hamiltonian with no explicit time dependence is conserved. For a particle with ordinary quadratic kinetic energy and a time-independent potential, the construction gives $H=K+U$. A time-dependent drive can change $H$, and an arbitrary coordinate choice or Lagrangian does not let us identify it with a chosen observer's energy without further argument.

The oscillator's phase-space arrows follow $(\dot q,\dot p)=(p/m,-kq)$. At the rightmost point they point down, so the motion runs clockwise. That orientation is information beyond the shape of an energy ellipse. If the equations have no explicit time dependence, the system is called **autonomous**. When its smooth equations have unique solutions, distinct phase-space trajectories cannot cross at the same state: the same position and momentum cannot have two different next steps. A time-dependent system requires specifying the time as well.

For any observable $f(q,p,t)$, meaning a quantity calculated from the state, the chain rule gives

$$
\frac{df}{dt}=f_qH_p-f_pH_q+f_t.
$$

Define the **Poisson bracket** by $\{f,g\}=f_qg_p-f_pg_q$. Then $df/dt=\{f,H\}+f_t$. For several canonical pairs, sum that expression over $i$. For example, $\{q,p\}=1$, $\{q,H\}=p/m$, and $\{p,H\}=-kq$ for the spring. The bracket records how a quantity changes under a specified Hamiltonian flow; it is not ordinary multiplication with different brackets.

<details class="checkpoint"><summary>Try a state before revealing its next motion</summary>

Take $m=2\,\mathrm{kg}$, $k=2\,\mathrm{N/m}$, $q=1\,\mathrm m$, and $p=-1\,\mathrm{kg\,m/s}$. Find the velocity, force, kinetic energy, potential energy, and total energy. Is the cart's speed increasing at this instant?

<details><summary>Compare the calculation</summary>

The velocity is $p/m=-0.5\,\mathrm{m/s}$ and the force is $-kq=-2\,\mathrm N$. They both point left, so the speed is increasing. The energies are $K=p^2/(2m)=0.25\,\mathrm J$ and $U=kq^2/2=1\,\mathrm J$, giving $H=1.25\,\mathrm J$. The instantaneous exchange rates are $dK/dt=Fv=+1\,\mathrm{J/s}$ and $dU/dt=kqv=-1\,\mathrm{J/s}$.

</details>
</details>

<details class="history-note"><summary>Why conjugate momentum can differ from mass times velocity</summary>

Add a total derivative to the spring Lagrangian:

$$
\widetilde L=\frac12m\dot q^2-\frac12kq^2+
\frac{d}{dt}\left(\frac12\alpha q^2\right)
=L+\alpha q\dot q.
$$

Here $\alpha$ is a constant with units $\mathrm{kg/s}$. The action changes only by an endpoint term. With fixed endpoint positions, its variation is unchanged, so the physical equation of motion is unchanged. But the conjugate momentum becomes $\widetilde p=m\dot q+\alpha q$. Solving for velocity gives

$$
\widetilde H(q,\widetilde p)
=\frac{(\widetilde p-\alpha q)^2}{2m}+\frac12kq^2.
$$

The mechanical momentum remains $m\dot q=\widetilde p-\alpha q$. The example explains why the derivative definition of conjugate momentum matters even when the physical motion is familiar.

</details>

<details class="history-note"><summary>How the relativistic particle prepares us for constraints</summary>

For a timelike worldline parametrized by $\lambda$, Chapter 5 used the action with Lagrangian

$$
L=-mc\sqrt{-g_{\mu\nu}\dot x^\mu\dot x^\nu},
\qquad \dot x^\mu=\frac{dx^\mu}{d\lambda}.
$$

The conjugate momentum is

$$
p_\mu=\frac{mc\,g_{\mu\nu}\dot x^\nu}
{\sqrt{-g_{\alpha\beta}\dot x^\alpha\dot x^\beta}},
\qquad
g^{\mu\nu}p_\mu p_\nu=-m^2c^2.
$$

Multiplying every velocity by the same positive factor leaves these momenta unchanged. Therefore the momenta cannot determine the arbitrary rate at which the parameter labels the worldline. The velocity-to-momentum map is not invertible. Direct contraction also gives $p_\mu\dot x^\mu=L$, so the naive canonical Hamiltonian $p_\mu\dot x^\mu-L$ vanishes. The particle still moves; its parametrization is redundant.

The mass-shell relation $C=g^{\mu\nu}p_\mu p_\nu+m^2c^2=0$ is a constraint. Introduce an auxiliary function $N(\lambda)$ that multiplies this constraint, and use the phase-space action

$$
S=\int\left[p_\mu\dot x^\mu-\frac N2 C\right]d\lambda.
$$

Varying $N$ enforces $C=0$. Varying $p_\mu$ gives $\dot x^\mu=Ng^{\mu\nu}p_\nu$. Changing the positive multiplier changes how quickly the parameter runs along the same future-directed worldline. Chapter 20 returns to this freedom in labeling time when it introduces the lapse and constraints for spacetime geometry.

</details>

<a id="chapter-14"></a>

## 14. Deriving Einstein’s equation from an action

The **Einstein–Hilbert action** integrates scalar curvature over spacetime volume. We will vary both the curvature and the volume, then combine their changes with the matter response derived in Chapter 13.

Our dynamical variable will be the inverse metric $g^{\mu\nu}$. The connection is its Levi-Civita connection, not an independent field in this derivation. Matter fields are collectively denoted $\psi$.

### 14.1 Choosing the gravitational action

Take

$$
\boxed{
S[g,\psi]=
\frac{c^3}{16\pi G_N}
\int_{\mathcal M}d^4x\,\sqrt{-g}\,(R-2\Lambda)
+S_m[g,\psi]+S_{\rm boundary}.
}
$$

Why this structure? An action should not depend on arbitrary coordinate labels, so integrate a scalar using invariant volume. A constant scalar gives a cosmological term. The simplest nontrivial scalar built from a metric and its curvature at two-derivative order is $R$.

This is a choice of theory with substantial motivation, not a proof that other terms are forbidden. Scalars such as $R^2$ and $R_{\mu\nu}R^{\mu\nu}$ are also coordinate invariant; Chapter 23 explains why a modern effective theory expects higher-order terms. Here we derive the dynamics of the Einstein–Hilbert choice.

The coefficient is already calibrated by the Newtonian limit. With $x^0=ct$,

$$
\left[\frac{c^3}{G_N}\right]=\mathrm{kg/s},
\qquad
\left[\int d^4x\sqrt{-g}\,R\right]=\mathrm{m^2},
$$

so $S$ has units $\mathrm{kg\,m^2/s}=\mathrm{J\,s}$. Under an actual coordinate change from $x^0=ct$ to $t$, the invariant action keeps its $c^3$ prefactor: the transformed metric has $g_{tt}=c^2g_{00}$ and its determinant contributes $\sqrt{-g_{(t)}}=c\sqrt{-g_{(x^0)}}$. Some presentations factor that $c$ out of the determinant and write a $c^4$ prefactor with a reduced determinant convention. These are consistent bookkeeping choices. Do not transplant their prefactor into our $x^0=ct$ formula.

The boundary term specifies part of the variational problem. For deriving the local bulk equations, we may initially choose variations supported strictly inside the region. For a finite-region variational problem that fixes the boundary geometry, an additional boundary action will be required.

### 14.2 Varying curvature and volume

Write $A=c^3/(16\pi G_N)$ and vary the gravitational bulk term:

$$
\delta S_g=A\int d^4x\left[
\sqrt{-g}\,\delta R+(R-2\Lambda)\delta\sqrt{-g}
\right].
$$

Here $\Lambda$ is a fixed parameter, so $\delta\Lambda=0$. Since $R=g^{\mu\nu}R_{\mu\nu}$, the product rule gives

$$
\delta R=R_{\mu\nu}\delta g^{\mu\nu}
+g^{\mu\nu}\delta R_{\mu\nu}.
$$

The first term comes from changing the inverse metric used to take the trace. The second comes from changing curvature itself. Substituting the volume identity,

$$
\delta S_g=A\int\sqrt{-g}\left[
\left(R_{\mu\nu}-\frac12Rg_{\mu\nu}+\Lambda g_{\mu\nu}\right)
\delta g^{\mu\nu}
+g^{\mu\nu}\delta R_{\mu\nu}
\right]d^4x.
$$

Most of Einstein's equation is already visible. The trace subtraction came from volume variation, and $+\Lambda g_{\mu\nu}$ came from multiplying $-2\Lambda$ by the $-1/2$ in that same variation. The remaining term contains the variation of Ricci curvature. We must calculate it before deciding whether it contributes to the interior equation or to the boundary.

### 14.3 How a changing metric changes the connection

Set

$$
k_{\mu\nu}=\delta g_{\mu\nu},
\qquad k=g^{\mu\nu}k_{\mu\nu}.
$$

Metric compatibility says $\nabla_\lambda g_{\mu\nu}=0$. Varying it gives

$$
\nabla_\lambda k_{\mu\nu}
=\delta\Gamma^\rho{}_{\lambda\mu}g_{\rho\nu}
+\delta\Gamma^\rho{}_{\lambda\nu}g_{\mu\rho}.
$$

We have used the fact that varying the covariant derivative also varies its two connection terms. Now write the analogous equations with cyclic permutations of the indices. Add the versions with derivative indices $\mu$ and $\nu$, and subtract the version with derivative index $\sigma$. Symmetry of the lower two connection indices makes the unwanted terms cancel. The result is

$$
\boxed{
\delta\Gamma^\rho{}_{\mu\nu}
=\frac12g^{\rho\sigma}
\left(
\nabla_\mu k_{\nu\sigma}
+\nabla_\nu k_{\mu\sigma}
-\nabla_\sigma k_{\mu\nu}
\right).
}
$$

It resembles the Christoffel formula, but ordinary derivatives have become covariant derivatives of the metric variation.

Why is this a tensor, when a connection is not? Two connections transform with the same inhomogeneous coordinate term, so their difference transforms tensorially. $\delta\Gamma$ is an infinitesimal difference of connections. Its covariant derivative therefore follows the $(1,2)$ tensor rule from Chapter 6.

This comparison holds the coordinate identification of the underlying manifold fixed. A separate coordinate transformation is a different operation, even though both can be written with small parameters.

### 14.4 The Palatini identity: curvature variation becomes a derivative

Start with our Ricci convention:

$$
R_{\mu\nu}
=\partial_\rho\Gamma^\rho{}_{\nu\mu}
-\partial_\nu\Gamma^\rho{}_{\rho\mu}
+\Gamma^\rho{}_{\rho\lambda}\Gamma^\lambda{}_{\nu\mu}
-\Gamma^\rho{}_{\nu\lambda}\Gamma^\lambda{}_{\rho\mu}.
$$

Vary every connection. The first two terms give derivatives of $\delta\Gamma$; the product terms each give two terms containing one $\Gamma$ and one $\delta\Gamma$. Those product terms are exactly the connection corrections required to turn the derivatives into covariant derivatives:

$$
\boxed{
\delta R_{\mu\nu}
=\nabla_\rho\delta\Gamma^\rho{}_{\nu\mu}
-\nabla_\nu\delta\Gamma^\rho{}_{\rho\mu}.
}
$$

This is the **Palatini identity**. A clean way to verify the algebra is to choose normal coordinates for the unvaried metric at one point. There $\Gamma=0$, all the product-variation terms vanish at that point, and the identity reduces to varying the two ordinary derivative terms. Both sides are tensors, so equality established that way holds in every chart. Normal coordinates simplify a tensor calculation; they do not make curvature vanish.

Contract with $g^{\mu\nu}$. Because $\nabla g=0$, the inverse metric moves through the derivatives:

$$
g^{\mu\nu}\delta R_{\mu\nu}=\nabla_\rho V^\rho,
$$

where

$$
\boxed{
V^\rho=g^{\mu\nu}\delta\Gamma^\rho{}_{\mu\nu}
-g^{\rho\mu}\delta\Gamma^\nu{}_{\nu\mu}.
}
$$

Substitute the connection variation to make its content more explicit:

$$
V^\rho=\nabla_\mu k^{\mu\rho}-\nabla^\rho k.
$$

If $q^{\mu\nu}=\delta g^{\mu\nu}$ and $q=g_{\mu\nu}q^{\mu\nu}$, then $k^{\mu\nu}=-q^{\mu\nu}$ and $k=-q$, so equivalently

$$
\boxed{V^\rho=\nabla^\rho q-\nabla_\mu q^{\mu\rho}.}
$$

This is the key structural result. The remaining variation of curvature contributes a total divergence, rather than an additional bulk field equation.

The Einstein–Hilbert integrand contains second derivatives of the metric. Nevertheless its bulk Euler–Lagrange equations contain only second derivatives, not generic fourth derivatives: for an action linear in $R$, the terms containing derivatives of the metric variation combine into this boundary divergence. Curvature-squared actions do not generally share that simplification.

### 14.5 Obtaining the field equation

We have established

$$
\delta S_g=A\int_{\mathcal M}\sqrt{-g}
(G_{\mu\nu}+\Lambda g_{\mu\nu})\delta g^{\mu\nu}\,d^4x
+A\int_{\mathcal M}\sqrt{-g}\,\nabla_\rho V^\rho\,d^4x.
$$

For a variation supported inside the region, the second integral vanishes by the divergence theorem. Add the matter variation:

$$
\delta S_m=-\frac1{2c}\int_{\mathcal M}\sqrt{-g}\,
T_{\mu\nu}\delta g^{\mu\nu}\,d^4x.
$$

Therefore

$$
\delta S=
\int_{\mathcal M}\sqrt{-g}
\left[
\frac{c^3}{16\pi G_N}(G_{\mu\nu}+\Lambda g_{\mu\nu})
-\frac1{2c}T_{\mu\nu}
\right]\delta g^{\mu\nu}\,d^4x.
$$

The ten symmetric metric variations can be chosen arbitrarily in the interior, so their coefficient vanishes:

$$
\frac{c^3}{16\pi G_N}(G_{\mu\nu}+\Lambda g_{\mu\nu})
=\frac1{2c}T_{\mu\nu}.
$$

Multiply by $16\pi G_N/c^3$:

$$
\boxed{
G_{\mu\nu}+\Lambda g_{\mu\nu}
=\frac{8\pi G_N}{c^4}T_{\mu\nu}.
}
$$

The geometry and matter equations arise by independent variations of the metric and matter fields. When varying the metric to derive this equation, matter fields are held fixed as field variables; when varying matter, the metric is held fixed. A physical solution must satisfy both resulting sets of equations.

We have now derived the field equation in words as well as symbols: change the metric, account for the changed trace of curvature, account for the changed spacetime volume, separate a divergence from the curvature variation, measure the matter response by its stress tensor, and require the total first-order response to vanish.

### 14.6 What fixed boundary values leave free

In mechanics with a first-derivative Lagrangian, fixing $\delta q=0$ at the endpoints makes the integration-by-parts boundary term zero. Here $V^\rho$ contains derivatives of $\delta g$. Fixing the metric on a boundary does not fix its normal derivative there.

The one-dimensional analogy is a function satisfying $f(0)=0$ while $f'(0)$ is completely arbitrary. The function can meet the wall at any slope. A fixed boundary metric likewise does not prevent its variation from changing immediately away from the boundary.

There are two different legitimate problems:

1. To derive **local bulk equations**, use compactly supported variations. No boundary term survives.
2. To define a **finite-region Dirichlet variational principle**, fix the induced boundary geometry and add a term cancelling normal derivatives of its variation. “Dirichlet” means fixing the field values at the boundary; here those values specify its geometry.

The second problem is solved, for smooth non-null boundaries, by the Gibbons–Hawking–York term.

### 14.7 Induced geometry and the Gibbons–Hawking–York term

Let $n^\mu$ be the outward-directed unit normal to a smooth boundary segment. Set

$$
s=n_\mu n^\mu=\begin{cases}
+1,&\text{spacelike normal, timelike boundary},\\
-1,&\text{timelike normal, spacelike boundary}.
\end{cases}
$$

We use $s$ for this sign so it cannot be confused with energy density $\epsilon$. Define a tensor that removes the normal direction:

$$
h_{\mu\nu}=g_{\mu\nu}-s n_\mu n_\nu.
$$

It obeys $h_{\mu\nu}n^\nu=0$; raising its first index gives the tangent projector. In boundary coordinates $y^a$ with tangent vectors $e_a^\mu=\partial x^\mu/\partial y^a$, the induced metric is

$$
h_{ab}=g_{\mu\nu}e_a^\mu e_b^\nu.
$$

It measures distances and, for a timelike boundary, times along the boundary. Its determinant gives the surface measure $\sqrt{|h|}\,d^3y$.

The extrinsic curvature is

$$
K_{ab}=e_a^\mu e_b^\nu\nabla_\mu n_\nu,
\qquad K=h^{ab}K_{ab}.
$$

It describes how the normal changes as one moves along the boundary: how the boundary bends within spacetime. This differs from its intrinsic curvature. A cylindrical surface, for example, can have nonzero extrinsic curvature even while its two-dimensional intrinsic geometry is locally flat.

With this definition of $K$ and outward normals, the appropriate term is

$$
\boxed{
S_{\rm GHY}=\frac{c^3}{8\pi G_N}
\int_{\partial\mathcal M}s\sqrt{|h|}\,K\,d^3y.
}
$$

Sum over boundary segments when needed. The Lorentzian divergence theorem in these conventions uses

$$
d\Sigma_\mu=s n_\mu\sqrt{|h|}\,d^3y,
$$

so the Einstein–Hilbert boundary variation is $A\int s\sqrt{|h|}n_\rho V^\rho d^3y$. Defining $K$ with an overall minus sign, or choosing different normal orientations, changes the displayed boundary-action signs. Always compare definitions before comparing formulas.

We can see the cancellation explicitly. Construct **Gaussian normal coordinates** by launching geodesics perpendicular to the boundary. Keep the boundary labels $y^a$ fixed along each such geodesic and use signed proper distance, or proper time multiplied by $c$, as $r$. Choose increasing $r$ outward. Sufficiently near the boundary these coordinates give

$$
ds^2=s\,dr^2+h_{ab}(r,y)dy^a dy^b,
\qquad n=\partial_r,
\qquad K_{ab}=\frac12\partial_rh_{ab}.
$$

For variations preserving this coordinate form near the boundary, with $\delta h_{ab}=0$ on the boundary itself,

$$
\delta K=\frac12h^{ab}\partial_r\delta h_{ab},
\qquad
n_\rho V^\rho=-h^{ab}\partial_r\delta h_{ab}=-2\delta K.
$$

Thus

$$
\delta S_{g,\rm boundary}
=-2A\int s\sqrt{|h|}\,\delta K\,d^3y,
$$

whereas, because fixed $h_{ab}$ also means $\delta\sqrt{|h|}=0$ there,

$$
\delta S_{\rm GHY}
=+2A\int s\sqrt{|h|}\,\delta K\,d^3y.
$$

They cancel. This local coordinate check isolates precisely the normal-derivative terms that made the original variation problematic.

More generally, for a smooth non-null boundary, the remaining metric boundary variation takes the form

$$
A\int_{\partial\mathcal M}s\sqrt{|h|}
(K_{ab}-Kh_{ab})\delta h^{ab}\,d^3y,
$$

up to boundary-of-boundary contributions and the specified boundary conventions. It vanishes when the induced metric is fixed. The boundary action makes the chosen variational problem well posed; it does not change Einstein's bulk field equation.

There are deliberate limits to this formula. Corners and joints generally require extra terms. Null boundaries have no unit normal and a degenerate induced metric, so the displayed GHY formula cannot simply be applied to them. Their boundary and joint terms require additional choices, including the normalization or parametrization of null generators. A detailed primary treatment is [Lehner, Myers, Poisson, and Sorkin, “Gravitational action with null boundaries”](https://arxiv.org/abs/1609.00207).

### 14.8 Palatini identity versus Palatini variation

The **Palatini identity** used above is an identity for the variation of curvature. We used it while the connection was determined by the metric.

The **Palatini formulation** changes the variational problem: it treats $g_{\mu\nu}$ and a connection $\widetilde\Gamma$ as independent fields. Assume the independent connection is torsion-free and matter does not couple to it. We will see how its equation recovers the metric connection for the Einstein–Hilbert action in dimension $d>2$.

Define $\mathcal H^{\mu\nu}=\sqrt{-g}\,g^{\mu\nu}$. This is a **tensor density of weight one**: under a coordinate change it transforms like an ordinary $(2,0)$ tensor, with an additional factor $|\det(\partial x/\partial x')|$ from the volume density. Its covariant derivative includes a correction for that factor:

$$
\begin{aligned}
\widetilde\nabla_\lambda\mathcal H^{\mu\nu}
={}&\partial_\lambda\mathcal H^{\mu\nu}
+\widetilde\Gamma^\mu{}_{\lambda\rho}\mathcal H^{\rho\nu}
+\widetilde\Gamma^\nu{}_{\lambda\rho}\mathcal H^{\mu\rho}\\
&-\widetilde\Gamma^\rho{}_{\rho\lambda}\mathcal H^{\mu\nu}.
\end{aligned}
$$

The final term differentiates the volume-density factor. For a weight-one vector density, contraction makes its connection terms cancel, so its covariant divergence equals its ordinary divergence. That allows integration by parts with these densities.

Hold the metric fixed and vary the independent connection in $\int\mathcal H^{\mu\nu}\widetilde R_{\mu\nu}\,d^dx$. The Palatini identity gives derivatives of $\delta\widetilde\Gamma$. Integrating them by parts and collecting the symmetric variations $\delta\widetilde\Gamma^\lambda{}_{\mu\nu}$ gives

$$
-\widetilde\nabla_\lambda\mathcal H^{\mu\nu}
+\delta^{(\mu}_{\lambda}
\widetilde\nabla_\rho\mathcal H^{\nu)\rho}=0.
$$

Set $\lambda=\mu$ and sum. The result is $(d-1)\widetilde\nabla_\rho\mathcal H^{\nu\rho}/2=0$. Substituting this back yields

$$
\widetilde\nabla_\lambda(\sqrt{-g}\,g^{\mu\nu})=0.
$$

To see why this implies metric compatibility, put $q_\lambda=\widetilde\nabla_\lambda\sqrt{-g}/\sqrt{-g}$. The product rule says $\widetilde\nabla_\lambda g^{\mu\nu}=-q_\lambda g^{\mu\nu}$. Contract with $g_{\mu\nu}$ to obtain $-d q_\lambda$. Independently, the determinant identity gives

$$
2q_\lambda=g^{\mu\nu}\partial_\lambda g_{\mu\nu}
-2\widetilde\Gamma^\rho{}_{\rho\lambda}
=g^{\mu\nu}\widetilde\nabla_\lambda g_{\mu\nu}.
$$

Differentiating the inverse-metric identity makes $g_{\mu\nu}\widetilde\nabla_\lambda g^{\mu\nu}=-2q_\lambda$. Thus $(d-2)q_\lambda=0$. For $d>2$, $q_\lambda=0$ and $\widetilde\nabla g=0$. Together with zero torsion, this selects the Levi-Civita connection by Chapter 7's uniqueness result.

This equivalence uses the stated action and matter assumptions. Changing the curvature action, allowing matter to couple to the independent connection, or allowing torsion changes the variational equations and requires a separate analysis.

<a id="chapter-15"></a>

## 15. Symmetry, conservation, and vacuum energy

We have reached the equation, but understanding it requires knowing what follows from its structure. Why is stress–energy conserved? What kind of conservation is that? Does the universe have one total energy? And why does an apparently harmless constant in a matter Lagrangian suddenly matter to gravity?

We will derive the local conservation law first, then identify the symmetry that turns it into a conserved integrated quantity.

### 15.1 Smooth maps and changes of fields

A **smooth map** $F:M\to N$ takes points of one manifold to points of another. “Smooth” means that its coordinate expression has continuous derivatives of every order in overlapping charts. Section 4.1's transition rules ensure this property does not depend on which compatible charts we choose. A **diffeomorphism** is a smooth map with a smooth inverse. It preserves the smooth structure; it need not preserve a chosen metric's distances. A diffeomorphism that does preserve the metric is an **isometry**.

Before using a map on an entire field, work out what it does to one arrow. A curve $x^\mu(\lambda)$ has tangent $V^\mu$ at a point $p$. Its image curve has coordinates $y^a(\lambda)=F^a(x(\lambda))$. The chain rule gives

$$
(F_*V)^a\big|_{F(p)}
=\left.\frac{\partial F^a}{\partial x^\mu}\right|_p V^\mu\big|_p.
$$

This is the **pushforward**: apply the map to the curve, then take its tangent. The Jacobian carries the tangent from $T_pM$ to $T_{F(p)}N$. An arbitrary smooth map can squash a direction to zero; a diffeomorphism cannot, because its inverse Jacobian undoes the operation. The formula resembles a coordinate transformation, but the interpretation can differ: a chart transition relabels the same point, whereas a map of the manifold may send a point elsewhere.

A covector is a linear measuring rule. We can use the map to define such a rule at its starting point. If $\omega$ measures vectors at $F(p)$, define a question at $p$ by first pushing a vector forward and then asking $\omega$:

$$
(F^*\omega)_p(V)=\omega_{F(p)}(F_*V),
\qquad
(F^*\omega)_\mu(p)
=\omega_a(F(p))\frac{\partial F^a}{\partial x^\mu}\bigg|_p.
$$

This is the **pullback**. It brings a measuring rule back to the starting point. The star placement keeps track of the direction: $F_*$ carries tangents forward, while $F^*$ brings covectors back. These constructions use the smooth map and the chain rule; no metric or parallel-transport connection is required.

For a scalar field, pullback is just composition, $F^*f=f\circ F$. For a metric it applies the same measuring procedure to both vector inputs:

$$
(F^*g)_p(V,W)=g_{F(p)}(F_*V,F_*W).
$$

Now make the map into a continuous motion. A **flow** $F_s$ follows the integral curves of a vector field $\xi$: each starting point moves with coordinate velocity $\xi^\mu$. For a sufficiently small parameter interval, the motion can be reversed, so these maps are local diffeomorphisms. At first order,

$$
F_s^\mu(x)=x^\mu+s\,\xi^\mu(x)+O(s^2),
\qquad F_0(x)=x.
$$

To compare a field before and after that motion, pull it back to the same starting points before subtracting. Its **Lie derivative** is the first-order change:

$$
\mathcal L_\xi f
=\left.\frac{d}{ds}F_s^*f\right|_{s=0},
\qquad
\mathcal L_\xi g
=\left.\frac{d}{ds}F_s^*g\right|_{s=0}.
$$

For a one-dimensional check, take $F_s(x)=e^sx$ and $f(x)=x^2$. Then $F_s^*f=e^{2s}x^2$, so $\mathcal L_\xi f=2x^2$, with $\xi=x\,\partial_x$. For the ordinary line metric $g=dx\otimes dx$, the map multiplies each vector input by $e^s$, hence $F_s^*g=e^{2s}g$ and $\mathcal L_\xi g=2g$. Dilation is a diffeomorphism but not an isometry of that fixed metric. This example contains the whole comparison rule without any curved-spacetime algebra.

For a general metric, differentiating its pullback gives three terms: one for moving to a new field value, and one for changing each vector input:

$$
(\mathcal L_\xi g)_{\mu\nu}
=\xi^\rho\partial_\rho g_{\mu\nu}
+g_{\rho\nu}\partial_\mu\xi^\rho
+g_{\mu\rho}\partial_\nu\xi^\rho.
$$

To rewrite this using the connection, lower $\xi$ and expand:

$$
\begin{aligned}
\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu
={}&g_{\rho\nu}\partial_\mu\xi^\rho+g_{\mu\rho}\partial_\nu\xi^\rho\\
&+\xi^\rho(\partial_\mu g_{\rho\nu}+\partial_\nu g_{\mu\rho}
-2\Gamma^\lambda{}_{\mu\nu}g_{\lambda\rho}).
\end{aligned}
$$

The Christoffel formula makes the bracket equal to $\partial_\rho g_{\mu\nu}$, reproducing the three terms above. This step uses the metric-compatible, torsion-free connection. The Lie derivative itself does not require a connection: it compares fields through the specified flow. In contrast, the covariant derivative $\nabla_\xi$ uses parallel transport to compare them.

For the metric,

$$
\delta_\xi g_{\mu\nu}=\mathcal L_\xi g_{\mu\nu}
=\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu.
$$

For the inverse metric,

$$
\delta_\xi g^{\mu\nu}
=-\nabla^\mu\xi^\nu-\nabla^\nu\xi^\mu.
$$

For a scalar field,

$$
\delta_\xi\phi=\mathcal L_\xi\phi=\xi^\mu\partial_\mu\phi.
$$

The sign convention here uses the pullback generated by $\xi$. One can formulate passive coordinate changes with the opposite infinitesimal sign; all terms must be changed consistently.

The essential idea is that the geometry and matter fields are transformed together. Changing only the matter field while leaving geometry fixed is generally a physical alteration, not the gauge redundancy being discussed.

The distinction can be checked on the dilation example. Pulling back both the metric and all matter fields describes the configuration consistently through the same map. Pulling back only a matter field while keeping the metric fixed can change measured lengths and energies. Whether a transformation counts as gauge freedom or as a physical boundary symmetry also depends on the boundary conditions.

### 15.2 Symmetry and local conservation

In mechanics, a continuous global symmetry produces a conserved quantity. Diffeomorphism invariance has an arbitrary spacetime-dependent vector field as its generator. This local freedom leads to differential identities among equations of motion—an instance of Noether's second theorem.

First consider the matter action. Assume its matter fields satisfy their equations of motion, so their first-order action variation vanishes apart from boundary terms. Choose $\xi^\mu$ with compact support to remove the boundary terms. Diffeomorphism invariance and the stress-tensor definition give

$$
0=\delta_\xi S_m
=-\frac1{2c}\int\sqrt{-g}\,T_{\mu\nu}\delta_\xi g^{\mu\nu}\,d^4x.
$$

Insert the inverse-metric Lie derivative. Symmetry of $T_{\mu\nu}$ makes its two terms equal:

$$
0=\frac1c\int\sqrt{-g}\,T^{\mu\nu}\nabla_\mu\xi_\nu\,d^4x.
$$

Integrate by parts:

$$
0=-\frac1c\int\sqrt{-g}\,(\nabla_\mu T^{\mu\nu})\xi_\nu\,d^4x.
$$

Since the interior vector field $\xi_\nu$ was arbitrary,

$$
\boxed{\nabla_\mu T^{\mu\nu}=0.}
$$

This derivation used the matter equations, but not Einstein's equation. Matter on a prescribed curved background can satisfy this conservation law if its action and equations have the stated covariance and no unaccounted external exchanges.

The phrase **on shell** means that the relevant equations of motion are satisfied. **Off shell** means we consider arbitrary field configurations. Conservation of the matter stress tensor is generally an on-shell statement. For the canonical scalar field in natural units, the more informative off-shell identity is

$$
\nabla_\mu T^{\mu\nu}
=(\Box\phi-V'(\phi))\nabla^\nu\phi.
$$

You can check it directly by differentiating the scalar stress tensor, using the product rule and commuting derivatives on a scalar. Its divergence vanishes once the scalar equation holds. Conversely, stress conservation alone need not imply every matter equation: if $\nabla^\nu\phi$ vanishes, that product can be zero without enforcing the scalar equation.

Apply the same diffeomorphism argument to the gravitational action. Its metric variation is proportional to $G_{\mu\nu}+\Lambda g_{\mu\nu}$. Because this is a pure geometric symmetry, the resulting identity

$$
\nabla^\mu(G_{\mu\nu}+\Lambda g_{\mu\nu})=0
$$

holds off shell for constant $\Lambda$. This reproduces the contracted Bianchi identity from the action’s symmetry. Einstein's equation joins an identically compatible geometric tensor to a matter tensor conserved when matter evolves consistently.

This is not circular reasoning. One route derives a geometric identity from curvature; another derives matter conservation from matter dynamics; the action explains why the two structures can be coupled.

### 15.3 From local balance to an integrated charge

Expand the covariant divergence:

$$
0=\nabla_\mu T^{\mu\nu}
=\frac1{\sqrt{-g}}\partial_\mu(\sqrt{-g}\,T^{\mu\nu})
+\Gamma^\nu{}_{\mu\lambda}T^{\mu\lambda}.
$$

For a vector current $J^\mu$, there is no last free-index connection term:

$$
\nabla_\mu J^\mu
=\frac1{\sqrt{-g}}\partial_\mu(\sqrt{-g}J^\mu).
$$

That difference matters. A divergence-free vector current can be integrated using the divergence theorem to obtain a scalar charge balance. A stress tensor still carries a free vector index, and vectors at different points cannot generally be added without specifying how their frames are related. Curvature makes that comparison path dependent.

A useful mixed-index version is

$$
\boxed{
\frac1{\sqrt{-g}}\partial_\mu(\sqrt{-g}\,T^\mu{}_{\nu})
=\frac12T^{\alpha\beta}\partial_\nu g_{\alpha\beta}.
}
$$

To derive it, the lower-index correction in $\nabla_\mu T^\mu{}_{\nu}$ moves to the right as $\Gamma^\lambda{}_{\mu\nu}T^\mu{}_{\lambda}$. Lower the first connection index and substitute the Christoffel formula:

$$
\Gamma^\lambda{}_{\mu\nu}T^\mu{}_{\lambda}
=\frac12 T^{\mu\alpha}
(\partial_\mu g_{\nu\alpha}+\partial_\nu g_{\mu\alpha}
-\partial_\alpha g_{\mu\nu}).
$$

The first and third terms cancel after exchanging the summed indices $\mu,\alpha$, since $T^{\mu\alpha}$ is symmetric. The middle term is the displayed metric derivative. If the metric depends on the time coordinate, the corresponding coordinate energy equation has a geometric term on its right-hand side. It is not generally the ordinary flat-spacetime continuity equation for one global energy.

In a sufficiently small freely falling laboratory, the connection vanishes at a chosen event and the law reduces there to the familiar local conservation equations. Across a finite curved region, comparing different local laboratories is part of the problem.

### 15.4 Conserved charges from Killing vectors

A Killing vector satisfies

$$
\nabla_{(\mu}\xi_{\nu)}=0,
\qquad\text{equivalently}\qquad
\mathcal L_\xi g_{\mu\nu}=0.
$$

It generates a symmetry of the metric itself. For a symmetric conserved stress tensor define

$$
J^\mu=-T^{\mu\nu}\xi_\nu.
$$

Its divergence is

$$
\nabla_\mu J^\mu
=-(\nabla_\mu T^{\mu\nu})\xi_\nu
-T^{\mu\nu}\nabla_\mu\xi_\nu.
$$

The first term vanishes by matter conservation. Since $T^{\mu\nu}$ is symmetric, only the symmetric part of $\nabla_\mu\xi_\nu$ contributes to the second term. The Killing equation makes that symmetric part zero. Therefore

$$
\boxed{\nabla_\mu J^\mu=0.}
$$

A timelike Killing vector supplies an energy symmetry; a rotational Killing vector supplies angular-momentum symmetry. The same construction works for the corresponding charges, with their conventional normalizations.

To make the energy case concrete, normalize a timelike $\xi^\mu$ so its components are dimensionless and it approaches a unit time direction in an appropriate asymptotically flat region. On a spacelike hypersurface $\Sigma$—a three-dimensional slice with a timelike normal—choose its future-directed unit normal $n^\mu$ and define the matter Killing energy

$$
\boxed{
E_\xi=\int_\Sigma T_{\mu\nu}n^\mu\xi^\nu\,dV_\Sigma.
}
$$

In Minkowski spacetime, with $n^\mu=\xi^\mu=(1,0,0,0)$, this is $\int\epsilon\,d^3x$. Apply the divergence theorem to a region between two such hypersurfaces: the change of $E_\xi$ equals minus the outward flux through the intervening side boundary. If there is no side flux, the charge is conserved.

The result requires the Killing symmetry, the field equations, and suitable boundaries or falloff. It is a **matter** Killing charge; it is not by itself a universal formula for the full gravitating system's total energy.

For a static chart, the metric is time independent and has $g_{0i}=0$. Take $\xi=\partial_{x^0}$ and let $N=\sqrt{-\xi^\mu\xi_\mu}=\sqrt{-g_{00}}$. Observers at fixed spatial coordinates have unit time direction $n^\mu=\xi^\mu/N$. A photon with four-momentum $p^\mu$ has symmetry energy $E_\xi=-c\,p_\mu\xi^\mu$; its local measured energy is $E_{\rm local}=-c\,p_\mu n^\mu$. Substitution gives

$$
E_\xi=N E_{\rm local}.
$$

The quantity $p\cdot\xi$ is conserved along the free ray: its derivative contracts the symmetric product of the ray tangent and momentum with $\nabla_{(\mu}\xi_{\nu)}=0$. Two static observers can therefore measure different local photon energies while agreeing on $E_\xi$. Gravitational redshift is consistent with energy conservation when the correct conserved quantity and observer normalization are used.

### 15.5 Energy of gravitational fields

Gravitational waves transfer energy to detectors, and black holes have measurable mass. Yet general relativity provides no universal, unique, exact local gravitational stress tensor playing the same role as matter's $T_{\mu\nu}$ in every spacetime.

The equivalence principle offers a useful warning: expressions constructed as a supposed gravitational energy density from connection coefficients can be changed dramatically by changing coordinates, including setting the connection to zero at one event. This warning is not by itself a complete mathematical proof of every nonexistence statement. Curvature tensors certainly exist. The full issue is finding an exact local object with all the desired covariance, conservation, normalization, and physical-energy properties without extra structure.

Several well-defined constructions answer more specific questions:

| Construction | Extra structure or regime | What it describes |
|---|---|---|
| ADM energy | Suitable asymptotic flatness at spatial infinity | Total energy of an isolated gravitating system |
| Bondi energy | Suitable asymptotic structure at null infinity | Energy remaining as radiation escapes to infinity |
| Quasilocal energy | A finite boundary and a chosen prescription | Energy associated with a bounded region and boundary observers |
| Averaged gravitational-wave stress tensor | A controlled short-wavelength approximation and averaging | Effective wave-energy transport relative to a background |

Each construction specifies its boundary conditions or approximation before defining an energy. Brown and York's quasilocal construction, for example, derives a boundary stress tensor from variation of a gravitational action with respect to the boundary metric; in the appropriate asymptotically flat limit it recovers ADM quantities. See their original [“Quasilocal Energy and Conserved Charges Derived from the Gravitational Action”](https://arxiv.org/abs/gr-qc/9209012).

A generic expanding cosmology has no global timelike Killing vector. Photons redshift, and matter still obeys local covariant conservation. Asking where every lost photon joule “went” presupposes a globally conserved energy account that the spacetime may not possess.

The comoving relation $d(\epsilon V)=-p\,dV$ remains useful and exact for a homogeneous perfect-fluid element under its assumptions. It does not require inventing an external reservoir into which “space stores the missing energy.” Nor is “the total energy of every universe is zero” a general theorem of Einstein's equation.

### 15.6 The cosmological constant as vacuum stress–energy

Move the cosmological term to the right-hand side:

$$
G_{\mu\nu}=\kappa\left(T_{\mu\nu}+T^{(\Lambda)}_{\mu\nu}\right),
$$

with

$$
\boxed{
T^{(\Lambda)}_{\mu\nu}
=-\frac{\Lambda}{\kappa}g_{\mu\nu}
=-\epsilon_\Lambda g_{\mu\nu},
\qquad
\epsilon_\Lambda=\frac{\Lambda c^4}{8\pi G_N}.
}
$$

For any unit timelike observer $n^\mu$,

$$
T^{(\Lambda)}_{\mu\nu}n^\mu n^\nu
=-\epsilon_\Lambda(-1)=\epsilon_\Lambda.
$$

Every such observer measures the same energy density and zero energy flux. Spatial projection gives isotropic pressure

$$
\boxed{p_\Lambda=-\epsilon_\Lambda.}
$$

This is precisely the perfect-fluid form with $\epsilon+p=0$: its velocity-dependent part disappears. Vacuum stress of this form does not select a preferred local rest frame.

Negative pressure is not merely a verbal synonym for repulsion. Its role follows from the equations. In the timelike Ricci projection,

$$
\epsilon_\Lambda+3p_\Lambda=-2\epsilon_\Lambda.
$$

For positive $\Lambda$, that contribution has the opposite sign from positive-density, nonnegative-pressure matter. The resulting expansion or focusing behavior also depends on the spacetime and family of observers being studied; Chapter 19 develops the cosmological case.

There is also a thermodynamic check. If $\epsilon_\Lambda$ is constant while a comoving volume changes, $E=\epsilon_\Lambda V$ implies $dE=\epsilon_\Lambda dV$. Comparing with $dE=-p\,dV$ gives $p=-\epsilon_\Lambda$. The energy in the volume grows with the volume; the local work relation is satisfied by negative pressure.

### 15.7 Adding a constant to the matter Lagrangian

In nongravitational mechanics, adding a constant to $L$ changes the action by a fixed amount for a fixed time interval and leaves the equations of motion unchanged.

In gravity, replace the matter Lagrangian energy density by

$$
\mathcal L_m\longrightarrow\mathcal L_m-C,
$$

where $C$ is a constant energy density. The matter field equations remain unchanged, but the metric varies the volume multiplying $C$. The stress tensor shifts by

$$
T_{\mu\nu}\longrightarrow T_{\mu\nu}-C g_{\mu\nu}.
$$

Consequently the effective cosmological constant becomes

$$
\boxed{\Lambda_{\rm eff}=\Lambda+\kappa C.}
$$

That is the conceptual doorway to the cosmological constant problem discussed in Chapter 23: gravity responds to the metric dependence of a vacuum-energy term even when nongravitational equations are insensitive to a constant offset.

A constant $\Lambda$ is consistent with the Bianchi identity because $\nabla g=0$. If someone simply replaces it by an arbitrary function $\Lambda(x)$ while keeping $\nabla^\mu T_{\mu\nu}=0$ and leaving the rest of the equation unchanged, taking the divergence forces

$$
\partial_\nu\Lambda=0.
$$

A varying dark-energy model therefore needs additional consistent dynamics or energy exchange. Changing a parameter into a function is not a free modification of a constrained field theory.

### 15.8 Coupling a matter model to curved spacetime

A common way to place a nongravitational field theory on curved spacetime is to begin with its special-relativistic action and make the replacements

$$
\eta_{\mu\nu}\longrightarrow g_{\mu\nu},
\qquad
 d^4x\longrightarrow\sqrt{-g}\,d^4x,
\qquad
\partial\longrightarrow\nabla
$$

where the last replacement is appropriate to the kind of field involved. Scalars have $\nabla_\mu\phi=\partial_\mu\phi$. For the electromagnetic field,

$$
F_{\mu\nu}=\nabla_\mu A_\nu-\nabla_\nu A_\mu
=\partial_\mu A_\nu-\partial_\nu A_\mu,
$$

because the two symmetric Levi-Civita connection terms cancel. Spinors require a local frame and spin connection, introduced in Chapter 21.

This procedure is called minimal coupling. Applying it at the action level is especially useful: it produces matter equations and a stress tensor with mutually consistent variational origins.

It is not a uniqueness theorem. In natural units, a term such as

$$
-\frac12\zeta R\phi^2
$$

is also generally covariant, with dimensionless coupling $\zeta$ in four dimensions, and vanishes in exactly flat spacetime. A flat-spacetime theory alone cannot tell you its coefficient. Moreover, expressions related by commuting derivatives in flat spacetime need not remain equivalent after covariantization, because covariant derivatives on tensors do not generally commute.

The equation's assumptions should now be visible: a Lorentzian metric, a specified connection structure, chosen gravitational and matter actions, appropriate boundary data, and a consistent coupling between them. With those in place, covariance, curvature identities, local energy–momentum balance, and dynamics reinforce one another.

### 15.9 Mach's question: what fixes an inertial frame?

Imagine a rotating bucket of water. The surface becomes concave. Rotating relative to what? Relative to the bucket cannot be the whole answer: once the water co-rotates with the bucket, the concavity remains. Mach's critique of absolute space encouraged the idea that inertia might ultimately be tied to the matter elsewhere in the universe. Einstein found this line of thought influential.

General relativity does not reduce to the claim that distant stars uniquely determine every local inertial frame. A simple counterexample is empty Minkowski spacetime: it contains no matter but has a well-defined family of inertial worldlines. A metric and suitable initial or boundary data remain part of the theory. Frame dragging shows that rotating matter does influence local inertial directions; it does not establish every stronger formulation of “Mach's principle.” The name covers several related proposals, not one universally accepted theorem. [Einstein's own 1918 discussion of the principles of GR](https://onlinelibrary.wiley.com/doi/10.1002/andp.19183600402).

This distinction is another application of the book's discipline. An idea can motivate a theory without becoming a theorem of the final theory. We test what the actual field equation predicts.

### 15.10 A tiny density that does not dilute

Use $\Lambda=1.1\times10^{-52}\,\mathrm{m^{-2}}$ as an illustrative cosmological scale, not a newly measured parameter estimate. The effective vacuum mass-equivalent density is

$$
\rho_\Lambda=\frac{\Lambda c^2}{8\pi G_N}
\simeq5.9\times10^{-27}\,\mathrm{kg/m^3}.
$$

Dividing by the mass of a hydrogen atom, about $1.67\times10^{-27}\,\mathrm{kg}$, gives the mass equivalent of roughly 3.5 hydrogen atoms per cubic metre. The vacuum component is not literally a gas of hydrogen. The comparison translates an unfamiliar density into a familiar mass scale.

For a cosmological constant, the energy density $\epsilon_\Lambda=\rho_\Lambda c^2$ remains constant while a comoving region expands, and its pressure is $p_\Lambda=-\epsilon_\Lambda$. For comparison, let $a$ denote a common scale factor multiplying all spatial lengths in a uniformly expanding region, so a comoving volume is proportional to $a^3$. Dust keeps the same rest energy in that volume and therefore has $\epsilon\propto a^{-3}$. For radiation, substitute $p=\epsilon/3$ into $d(\epsilon a^3)=-p\,d(a^3)$. Expanding gives $a^3d\epsilon+4\epsilon a^2da=0$, hence $\epsilon\propto a^{-4}$. A constant density can therefore become larger than these declining densities even if it starts smaller. That conclusion assumes the component really is constant and the cosmological solution evolves into that regime; it is not a general forecast for every possible dark-energy model.

<a id="chapter-16"></a>

## 16. Turning geometry into experiments: clocks, light, and Mercury

Two clocks start together. One stays on Earth; the other goes into orbit. When we compare their readings, how much time has each recorded? The field equation enters this question by determining the metric; the metric then determines the time accumulated along each clock’s path.

There is a repeatable answer. First solve, or approximate, the field equation for a metric. Then specify the worldlines of the source, detector, and light signals. Finally calculate quantities those observers can measure: elapsed proper time, frequency, angle, or separation. A coordinate component is an ingredient in that calculation; it is not automatically an observable.

### 16.1 How the metric changes clocks and rulers

For a weak, approximately static field with negligible rotation, choose Cartesian spatial coordinates and write

$$
ds^2=-\left(1+\frac{2\Phi}{c^2}\right)c^2dt^2
+\left(1-\frac{2\Psi}{c^2}\right)\delta_{ij}dx^i dx^j.
$$

Here $x^0=ct$, and $|\Phi|/c^2,|\Psi|/c^2\ll1$. Both potentials have units of velocity squared. The first alters the relation between coordinate time and clock time. The second alters the relation between coordinate distances and ruler lengths. We have omitted vector perturbations associated with mass currents, gravitational waves, and higher-order terms.

For an isolated, slowly moving, weakly gravitating source in GR, with pressure and directional stresses negligible compared with its rest-energy density and with the potentials vanishing far away,

$$
\Phi=\Psi=-\frac{G_NM}{r}
$$

outside a spherical body. In more general matter systems the equality needs justification; it is not part of the definition of a gravitational potential.

Section 12.5 derived this equality by keeping the temporal and spatial perturbations separate in the field equation. Here they are written as $\Phi=c^2\varphi$ and $\Psi=c^2\psi$, restoring velocity-squared units. We will use the same metric to calculate slow motion, clock readings, and light propagation.

For a slowly moving freely falling object, the leading spatial geodesic equation is

$$
\frac{d^2x^i}{dt^2}\simeq-c^2\Gamma^i{}_{00}.
$$

Staticity removes the time derivatives in the connection, giving

$$
\Gamma^i{}_{00}\simeq-\frac12\delta^{ij}\partial_jg_{00}
=\frac{1}{c^2}\partial^i\Phi.
$$

Consequently $d^2\mathbf x/dt^2=-\boldsymbol\nabla\Phi$: Newton emerges because the metric's clock coefficient has the appropriate gradient. Terms involving spatial velocities enter at higher order for this slow particle. They cannot be discarded for light.

This is a **coordinate acceleration**, measured using the positions and time labels of the chosen chart. The falling object's accelerometer reads zero. Its covariant four-acceleration $a^\mu=u^\nu\nabla_\nu u^\mu$ vanishes. A person standing on the floor has approximately zero coordinate acceleration in this chart but nonzero proper acceleration: the floor prevents a geodesic. A scale measures the supporting force that prevents this free fall.

### 16.2 What a clock actually accumulates

Substitute $dx^i=v^i dt$ and $ds^2=-c^2d\tau^2$ into the weak-field metric:

$$
\left(\frac{d\tau}{dt}\right)^2
=1+\frac{2\Phi}{c^2}
-\left(1-\frac{2\Psi}{c^2}\right)\frac{v^2}{c^2}.
$$

Keep terms first order in $\Phi/c^2$ and $v^2/c^2$, dropping their product. Using $\sqrt{1+q}\simeq1+q/2$ gives

$$
\boxed{\frac{d\tau}{dt}\simeq1+\frac{\Phi}{c^2}-\frac{v^2}{2c^2}.}
$$

The gravitational and kinematic clock corrections now occupy the same line. A lower, more negative potential reduces accumulated proper time relative to this coordinate time. Motion also reduces it at this order. To compare clocks following different routes, integrate each expression along its own route and specify how their readings are compared.

Near Earth's surface, two stationary clocks separated vertically by a small height $h$ have $\Delta\Phi\simeq gh$. For $h=1\,\mathrm m$,

$$
\frac{\Delta\dot\tau}{\dot\tau}\simeq\frac{9.81}{(2.998\times10^8)^2}
\simeq1.09\times10^{-16}.
$$

Multiply the fractional rate difference by $86{,}400$ seconds to get the difference after a day: about $9.4$ picoseconds, where one picosecond is $10^{-12}$ seconds. The higher clock gains time.

This effect alone does not establish nonzero curvature. Accelerated observers in flat spacetime can also have systematically different clock rates. Curvature concerns the obstruction to removing gravitational effects throughout an extended region, especially tidal effects. It is stronger information than one pair of differently ticking clocks.

### 16.3 Gravitational redshift and observer energy

In a stationary region, let $K^\mu$ be the timelike Killing field describing time-translation symmetry. Normalize it so that in an asymptotically flat static chart $K=\partial/\partial x^0$. Define its positive norm factor

$$
N=\sqrt{-K_\mu K^\mu}.
$$

An observer remaining on an orbit of this symmetry has four-velocity

$$
u^\mu=\frac{cK^\mu}{N}.
$$

Dividing by $N$ makes the norm of $K/N$ equal to $-1$; multiplying by $c$ then gives the required $u_\mu u^\mu=-c^2$.

Let $p^\mu$ be a photon's four-momentum, transported along its null geodesic. The Killing equation is $\nabla_{(\mu}K_{\nu)}=0$. Therefore

$$
p^\alpha\nabla_\alpha(p_\mu K^\mu)
=p^\alpha p^\mu\nabla_\alpha K_\mu=0.
$$

The term differentiating $p_\mu$ vanished by the geodesic equation. The remaining contraction vanishes because $p^\alpha p^\mu$ is symmetric while the relevant part of $\nabla_\alpha K_\mu$ is antisymmetric. Thus

$$
E_K=-c\,p_\mu K^\mu
$$

is conserved along the light ray. But the energy measured by a particular observer is

$$
E_{\rm local}=-p_\mu u^\mu=\frac{E_K}{N}.
$$

This is the energy convention used in Section 15.4: $p^0=E/c$, so the factor $c$ gives $E_K$ energy units. Observers at different values of $N$ measure different local energies even though the photon has the same conserved $E_K$ along its ray.

Since photon energy is proportional to measured frequency,

$$
\boxed{\frac{\nu_{\rm rec}}{\nu_{\rm em}}
=\frac{N_{\rm em}}{N_{\rm rec}}.}
$$

For the static weak-field metric, $N\simeq1+\Phi/c^2$. Thus

$$
z\equiv\frac{\nu_{\rm em}}{\nu_{\rm rec}}-1
\simeq\frac{\Phi_{\rm rec}-\Phi_{\rm em}}{c^2}.
$$

Light received higher in the potential has a lower measured frequency: it is **redshifted**. The conserved quantity is the symmetry energy $E_K$; the changing quantity is $E_{\rm local}=E_K/N$. In a time-dependent geometry without this timelike symmetry, the conserved quantity used in this derivation need not exist.

### 16.4 Deriving the bending of light

For a null trajectory, $ds^2=0$. Let $d\ell^2=\delta_{ij}dx^i dx^j$ denote Euclidean coordinate path length. Then

$$
c\,dt=n(\mathbf x)d\ell,
\qquad
n=\sqrt{\frac{1-2\Psi/c^2}{1+2\Phi/c^2}}
\simeq1-\frac{\Phi+\Psi}{c^2}.
$$

In this static chart, the light path makes the travel-time functional $\int n\,d\ell$ stationary. This is the same mathematics as ray optics in an inhomogeneous refractive medium. No material ether has appeared: $n$ is a coordinate description of null geometry, and every local freely falling observer still measures light speed $c$.

To calculate the path, let the mass sit at the origin and describe the ray in the $xz$ plane by $x(z)$. A prime here means $d/dz$, and $d\ell=\sqrt{1+x'^2}\,dz$. Apply the Euler–Lagrange equation from Chapter 13 to $L=n(x,z)\sqrt{1+x'^2}$:

$$
\frac{d}{dz}\left(\frac{n x'}{\sqrt{1+x'^2}}\right)
=\partial_xn\sqrt{1+x'^2}.
$$

For weak bending, $n-1$ and the small slope $x'$ are both first-order quantities. Drop products of small quantities to obtain $x''\simeq\partial_xn$. The slope is the small angle the ray makes with its original direction, so integrating this equation gives its angle change.

The unperturbed ray has $x=b$, where $b$ is its **impact parameter**: its perpendicular distance from the mass if it continued straight. In vector form, $\boldsymbol\nabla_\perp$ means derivatives in the two directions perpendicular to the unperturbed ray. Thus

$$
\Delta\boldsymbol\theta
\simeq\int_{-\infty}^{\infty}\boldsymbol\nabla_\perp n\,dz
=-\frac{1}{c^2}\int_{-\infty}^{\infty}
\boldsymbol\nabla_\perp(\Phi+\Psi)\,dz.
$$

Why can we integrate along a straight path if the path bends? Because the bending is already first order in $G_NM$. Correcting the path inside this first-order integrand would produce a second-order correction.

Write $\Psi=\gamma\Phi$ for a constant comparison parameter. At transverse position $b>0$,

$$
\partial_b(\Phi+\Psi)
=(1+\gamma)\frac{G_NMb}{(b^2+z^2)^{3/2}}.
$$

The transverse direction change is negative, toward the mass. Its magnitude is

$$
|\Delta\theta|=
\frac{(1+\gamma)G_NMb}{c^2}
\int_{-\infty}^{\infty}\frac{dz}{(b^2+z^2)^{3/2}}
=\frac{2(1+\gamma)G_NM}{bc^2}.
$$

The integral equals $2/b^2$; differentiating $z/[b^2\sqrt{b^2+z^2}]$ verifies it. GR gives $\gamma=1$, hence

$$
\boxed{|\Delta\theta|_{\rm GR}=\frac{4G_NM}{bc^2}.}
$$

For a ray grazing the Sun, set $b$ equal to the solar radius. The angle is about $1.75$ arcseconds; one arcsecond is $1/3600$ of a degree. Setting $\Psi=0$ while retaining the same $\Phi$ would halve the result.

The two contributions in this calculation belong to the chosen weak-field coordinates. Changing coordinates can change how we divide them between temporal and spatial metric terms. The predicted angle measured by the specified observer is independent of that division.

### 16.5 The extra travel time of a light signal

The effective index also produces an additional travel time. Along a nearly straight path,

$$
\Delta t=-\frac{1}{c^3}\int(\Phi+\Psi)\,d\ell.
$$

For a point mass, $\Phi+\Psi=-2G_NM/\sqrt{b^2+z^2}$ along the unperturbed ray. Its endpoints are at $z=-z_1$ and $z=z_2$, with $z_1,z_2>0$. The integral we need is

$$
\int\frac{dz}{\sqrt{b^2+z^2}}=\operatorname{arsinh}(z/b)+C.
$$

The **inverse hyperbolic sine** is $\operatorname{arsinh}q=\ln(q+\sqrt{1+q^2})$. Differentiating this logarithm gives $1/\sqrt{1+q^2}$ and verifies the antiderivative. It is an odd function, so evaluating the lower endpoint adds a second positive contribution:

$$
\Delta t\simeq\frac{2G_NM}{c^3}
\left[\operatorname{arsinh}\frac{z_1}{b}
+\operatorname{arsinh}\frac{z_2}{b}\right].
$$

For $q\gg1$, $\sqrt{1+q^2}\simeq q$, so the logarithm becomes $\operatorname{arsinh}q\simeq\ln(2q)$. When both endpoints are far from closest approach, $z_1,z_2\gg b$, this gives

$$
\Delta t\simeq\frac{2G_NM}{c^3}
\ln\frac{4r_1r_2}{b^2}.
$$

This is a leading one-way coordinate delay relative to the corresponding flat path; $r_1,r_2$ are approximately the endpoint distances from the mass. An actual radar experiment models the return trip and converts the result into the tracking station's proper time. Gravitational lensing more generally also involves different geometric path lengths. The observational model must keep both contributions.

The solar coefficient $2G_NM_\odot/c^3$ is about $9.85$ microseconds. For endpoints at about one astronomical unit on opposite sides of the Sun and a grazing ray, the logarithm is about 12.1. The one-way delay is then about $119$ microseconds in this approximation.

### 16.6 Mercury and the rotation of an orbit

The preparation above derived the Newtonian orbit equation. We now use its relativistic extension; Section 17.5 derives that extension from the Schwarzschild metric. For a massive test particle in that geometry, define the conserved specific angular momentum $\ell=r^2d\phi/d\tau$ and let $u=1/r$. The exact equatorial orbit equation is

$$
\boxed{\frac{d^2u}{d\phi^2}+u
=\frac{G_NM}{\ell^2}+\frac{3G_NM}{c^2}u^2.}
$$

Here $u$ denotes reciprocal radius. The first term gives the Newtonian orbit equation already derived in the preparation; the term proportional to $u^2$ is the relativistic addition.

Set $p_{\rm orb}=\ell^2/(G_NM)$ and $m=G_NM/c^2$. The unperturbed orbit is

$$
u_0=\frac{1}{p_{\rm orb}}(1+e\cos\phi).
$$

The dimensionless number $e$ is the **eccentricity**, describing the orbit’s shape. A circle has $e=0$; a bound ellipse has $0<e<1$. Choose $\phi=0$ at closest approach, called **perihelion** for an orbit around the Sun. Then

$$
r_{\min}=\frac{p_{\rm orb}}{1+e},\qquad
r_{\max}=\frac{p_{\rm orb}}{1-e}.
$$

The **semimajor axis** $a_{\rm orb}$ is half the ellipse’s longest diameter, so $a_{\rm orb}=(r_{\min}+r_{\max})/2=p_{\rm orb}/(1-e^2)$. This gives the geometric meaning of the parameters we will use in the measured precession.

Insert $u_0$ into the small correction $3mu^2$. Its term proportional to $\cos\phi$ is $6me\cos\phi/p_{\rm orb}^2$. This drives the same angular frequency as the homogeneous operator $d^2/d\phi^2+1$. The resulting resonant particular solution is

$$
\delta u_{\rm res}=\frac{3me}{p_{\rm orb}^2}\phi\sin\phi,
$$

because $(d^2/d\phi^2+1)(\phi\sin\phi)=2\cos\phi$. The other forcing terms produce bounded shape corrections, not the accumulated rotation we are seeking.

Now expand a slightly shifted oscillation:

$$
\frac{e}{p_{\rm orb}}\cos[(1-\delta)\phi]
\simeq\frac{e}{p_{\rm orb}}\cos\phi
+\frac{e\delta}{p_{\rm orb}}\phi\sin\phi.
$$

Matching coefficients gives $\delta=3m/p_{\rm orb}$. One radial cycle therefore takes slightly more than $2\pi$ in azimuth:

$$
\boxed{\Delta\phi\simeq\frac{6\pi G_NM}
{a_{\rm orb}(1-e^2)c^2}}
$$

per orbit, where $p_{\rm orb}=a_{\rm orb}(1-e^2)$ at the needed Newtonian order. For Mercury, using $a_{\rm orb}\simeq5.79\times10^{10}\,\mathrm m$ and $e\simeq0.206$, this gives about $0.104$ arcseconds per orbit. Mercury completes a revolution in about $87.97$ days, giving approximately $100(365.25)/87.97\simeq415$ orbits per century. Multiplying gives about $43$ arcseconds per century.

This is the relativistic contribution under the approximation of an isolated spherical Sun. Planetary perturbations, solar structure, and reference-frame modeling also affect the observed perihelion. The success lies in calculating the appropriate additional contribution, not declaring that every observed orbital change is relativistic.

### 16.7 GPS: calculate the competing clock effects

Start with the clock formula already derived here:

$$
\frac{d\tau}{dt}\simeq1+\frac{\Phi}{c^2}-\frac{v^2}{2c^2}.
$$

Use a nonrotating, spherical Earth model. Compare a clock in a circular orbit of radius $r$ with a stationary surface clock at radius $R$. The potential is $\Phi=-G_NM/r$. Circular motion requires $v^2/r=G_NM/r^2$, so $v^2=G_NM/r$. Subtract the surface rate from the orbital rate:

$$
\Delta\!\left(\frac{d\tau}{dt}\right)
\simeq\underbrace{\frac{G_NM}{c^2}\left(\frac1R-\frac1r\right)}_{\text{altitude gain}}
-\underbrace{\frac{G_NM}{2rc^2}}_{\text{motion loss}}.
$$

Take $R=6371\,\mathrm{km}$ and $r=26{,}571\,\mathrm{km}$, corresponding to an approximate GPS altitude of $20{,}200\,\mathrm{km}$. With $c=299{,}792{,}458\,\mathrm{m/s}$ and the Earth parameter from Section 10.9, multiply each dimensionless rate by $86{,}400$ seconds per day:

| Contribution | Approximate clock change per day | Physical reason |
|---|---|---|
| Altitude | $+45.7\,\mu\mathrm s$ | The orbital clock is at a less negative potential. |
| Motion | $-7.2\,\mu\mathrm s$ | The orbital clock moves relative to the chosen stationary coordinates. |
| Sum | $+38.5\,\mu\mathrm s$ | At this altitude, the potential contribution wins. |

A light signal travels about $11.5\,\mathrm{km}$ in $38.5\,\mu\mathrm s$. This converts a timing offset to a ranging scale; it is not a full prediction of an uncorrected receiver's position error, which depends on how it estimates its own clock bias and uses satellite data.

Set the net rate to zero. The result is $1/R=3/(2r)$, or $r=3R/2$. In this model, a circular-orbit clock matches the surface rate at altitude $R/2\simeq3186\,\mathrm{km}$. Below that, it loses time; above that, it gains time. This crossover is not exact for the rotating, nonspherical real Earth. Operational GPS also includes eccentricity, Earth rotation, a chosen reference time and geoid, and propagation corrections. [Ashby's account of relativity in GPS](https://pmc.ncbi.nlm.nih.gov/articles/PMC5253894/).

### 16.8 A tossed clock can age more than the clock on the shelf

Compare two ideal clocks that start together at height zero and reunite after coordinate time $T$. One remains supported at that height. The other is tossed vertically and falls freely between launch and catch. Ignore drag, recoil, and the brief launch and catch intervals; use a uniform $g$ and weak-field, slow-motion accuracy.

The free-fall path that returns after $T$ is

$$
h(t)=\frac g2t(T-t),\qquad
v(t)=g\left(\frac T2-t\right).
$$

Choose $\Phi=gh$, so the shelf's potential is zero. The tossed clock gains from height and loses from motion. Its net proper-time excess is

$$
\Delta\tau\simeq\frac1{c^2}\int_0^T
\left(gh(t)-\frac{v(t)^2}{2}\right)dt.
$$

Do the two elementary integrals separately:

$$
\int_0^Tgh(t)dt=\frac{g^2T^3}{12},\qquad
\int_0^T\frac{v(t)^2}{2}dt=\frac{g^2T^3}{24}.
$$

Thus $\Delta\tau=g^2T^3/(24c^2)>0$. With $g=9.81\,\mathrm{m/s^2}$ and $T=1\,\mathrm s$, the gain is approximately $4.46\times10^{-17}\,\mathrm s$, or 44.6 attoseconds, where one attosecond is $10^{-18}$ seconds. The height gain is twice the speed loss. In this short-path regime, the timelike free-fall path locally maximizes proper time between the endpoints. This does not make every geodesic a global maximum over arbitrary long journeys.

### 16.9 Gyroscopes and a compact experimental map

A gyroscope supplies a direction that can be transported. Around a gravitating body, its orientation need not stay fixed relative to distant reference directions. Even a nonrotating source produces geodetic precession. A rotating source adds frame dragging. These are different contributions, not two names for the same effect.

The leading frame-dragging result below comes from parallel-transporting the spin in a weak rotating metric. We will identify that metric’s new time-angle component in Section 17.7; here we use the resulting rate to interpret the experiment. For source angular momentum $\mathbf J$,

$$
\boldsymbol\Omega_{\rm LT}=\frac{G_N}{c^2r^3}
\left[3(\mathbf J\cdot\hat{\mathbf r})\hat{\mathbf r}-\mathbf J\right].
$$

Here $\hat{\mathbf r}$ is the radial unit vector. The expression is a vector: an orbital average must average its direction as well as its magnitude. For a circular polar orbit, choose $\mathbf J=J\hat{\mathbf z}$ and $\hat{\mathbf r}=(\sin\vartheta,0,\cos\vartheta)$. Over an orbit, the averages of $\sin\vartheta\cos\vartheta$ and $\cos^2\vartheta$ are 0 and $1/2$. Thus $\langle(\mathbf J\cdot\hat{\mathbf r})\hat{\mathbf r}\rangle=\mathbf J/2$, and the averaged precession vector is $G_N\mathbf J/(2c^2r^3)$. The measured projection also depends on the reference direction used by the experiment.

Gravity Probe B reported drift magnitudes of $6601.8\pm18.3$ milliarcseconds per year for the geodetic effect and $37.2\pm7.2$ for frame dragging, compared with predictions of $6606.1$ and $39.2$. A milliarcsecond is $10^{-3}$ arcseconds. The experiment’s signed drift convention is defined by its sky axes; magnitudes are quoted here to focus on scale. [The collaboration's 2011 final results](https://arxiv.org/abs/1105.3456).

| Experiment | What is measured | The theoretical relationship tested |
|---|---|---|
| Freely falling bodies of different composition | Differential acceleration | Universality of free fall; MICROSCOPE's 2022 results probed parts in $10^{15}$. |
| Clock comparisons and GPS | Frequency or accumulated time differences | Proper time along specified worldlines. |
| Light deflection and Shapiro delay | Angles and travel times | Null propagation through both temporal and spatial metric terms. |
| Mercury's orbit | Perihelion advance | Relativistic corrections to orbital geometry. |
| Gyroscope precession | Orientation drift | Parallel transport and rotation-induced frame dragging. |
| Binary pulsars and gravitational-wave detectors | Orbital decay and strain | Radiative dynamics and the energy lost through waves. |

This is a map of physical questions, not a ranking by a single “precision of GR.” Each measurement has its own model, observable, nuisance parameters, and uncertainty. MICROSCOPE does not establish exact equality or directly measure a metric coefficient. [MICROSCOPE's final analysis](https://arxiv.org/abs/2209.15487).

<a id="chapter-17"></a>

## 17. Black holes: horizons, falling clocks, and orbits

Imagine sending a light pulse outward as you fall toward a spherical object. At which events can that pulse escape to observers arbitrarily far away? We will answer by solving the field equation outside the object, following light through the resulting geometry, and identifying the boundary of escape. That boundary is the black-hole horizon in the spacetime we construct.

### 17.1 Solving the spherical vacuum equation

Set $\Lambda=0$. Outside a static spherical source, use the **areal radius** $r$: a symmetry sphere has area $4\pi r^2$. This is a geometrically meaningful definition, not a promise that radial proper distance equals $r$.

For this subsection the chart is $(t,r,\theta,\phi)$, with $t$ in seconds. Write

$$
ds^2=-e^{2\alpha(r)}c^2dt^2+e^{2\beta(r)}dr^2+r^2d\Omega^2,
\qquad d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2.
$$

Spherical symmetry forbids a preferred angular direction. Staticity permits a diagonal time-radial form in the exterior region. We have reduced ten metric components to two unknown functions, without assuming their values.

A few connection coefficients show the mechanism:

$$
\Gamma^t{}_{tr}=\alpha',\qquad
\Gamma^r{}_{tt}=c^2e^{2(\alpha-\beta)}\alpha',\qquad
\Gamma^r{}_{rr}=\beta',\qquad
\Gamma^r{}_{\theta\theta}=-re^{-2\beta}.
$$

A prime means $d/dr$. The last expression remembers that spheres change size as $r$ changes. Such angular terms are essential even though the unknown functions depend only on radius.

For example, the Ricci calculation gives

$$
R_{tt}=c^2e^{2(\alpha-\beta)}
\left[\alpha''+(\alpha')^2-\alpha'\beta'+\frac{2\alpha'}r\right].
$$

The second derivative comes from differentiating the connection; the products come from its $\Gamma\Gamma$ terms; the $2/r$ accounts for the two angular dimensions. Curvature is assembled from precisely the operations learned earlier.

Define $f(r)=e^{-2\beta(r)}$. Two convenient mixed Einstein components are

$$
G^t{}_t=\frac{f-1}{r^2}+\frac{f'}r,
\qquad
G^r{}_r=\frac{f-1}{r^2}+\frac{2f\alpha'}r.
$$

Vacuum requires both to vanish. The first equation can be reorganized as

$$
\frac{d}{dr}\big[r(1-f)\big]=0.
$$

A derivative is zero, so the bracket is a constant: $r(1-f)=C$. Thus $f=1-C/r$. This is the central integration, and it explains the inverse-radius form instead of merely announcing it.

Subtracting the two vacuum equations gives

$$
0=\frac{2f}{r}(\alpha'+\beta').
$$

In the static exterior $f\ne0$, hence $\alpha+\beta$ is constant. A constant rescaling of $t$ removes that constant. Therefore $e^{2\alpha}=e^{-2\beta}=f$. The remaining angular vacuum equation is satisfied by these functions; the contracted Bianchi identity explains why all the apparent equations are not independent.

At large $r$, match $g_{tt}=-c^2(1-C/r)$ to the Newtonian clock coefficient $-c^2(1-2G_NM/(rc^2))$. This fixes $C=2G_NM/c^2$. Define the length $m=G_NM/c^2$. The solution is

$$
\boxed{ds^2=-\left(1-\frac{2m}{r}\right)c^2dt^2
+\frac{dr^2}{1-2m/r}+r^2d\Omega^2.}
$$

We assumed staticity to make the derivation accessible. Birkhoff's theorem says something stronger: a spherically symmetric vacuum region with $\Lambda=0$ is locally Schwarzschild even if the spherical matter boundary moves. A perfectly spherical pulsating star does not broadcast tensor gravitational waves into its vacuum exterior. The theorem does not describe a region filled with an outgoing matter or radiation flux, which is not vacuum. The time-independence step can be checked in the calculation below. [David Tong’s black-hole lecture notes](https://davidtong.org/pdfs/teaching/general-relativity/gr6.pdf) discuss the coordinate construction and theorem.

<details class="history-note" data-no-narration>
<summary>Further calculation: where spherical time dependence goes</summary>

In a region where the gradient of the areal radius is spacelike, choose the same diagonal time-radius chart but initially allow $\alpha(t,r)$ and $\beta(t,r)$. The off-diagonal Ricci calculation now gives

$$
R_{tr}=\frac{2}{r}\partial_t\beta.
$$

For example, in $R_{tr}=\partial_\lambda\Gamma^\lambda{}_{rt}-\partial_r\Gamma^\lambda{}_{\lambda t}+\Gamma^\lambda{}_{\lambda\sigma}\Gamma^\sigma{}_{rt}-\Gamma^\lambda{}_{r\sigma}\Gamma^\sigma{}_{\lambda t}$, the differentiated terms cancel. The remaining terms involving $\partial_t\alpha$ and radial derivatives cancel in pairs. The angular trace $\Gamma^\theta{}_{\theta r}+\Gamma^\phi{}_{\phi r}=2/r$ multiplies $\Gamma^r{}_{rt}=\partial_t\beta$ and remains.

Vacuum therefore requires $\partial_t\beta=0$. The difference of the two diagonal equations still gives $\partial_r(\alpha+\beta)=0$, so $\alpha(t,r)=-\beta(r)+q(t)$. The metric’s only apparent time dependence is the factor $e^{2q(t)}dt^2$. Define $t'=\int e^{q(t)}dt$ to remove it. The radial integration then gives the same Schwarzschild function $f$ as above.

This proves the staticity step in this exterior chart. It does not use this chart through a null gradient of $r$; Section 17.3 supplies a regular extension through the horizon. A moving spherical matter boundary changes which region is vacuum, but does not add a freely varying time function to its vacuum metric.

</details>

### 17.2 Testing the horizon with curvature

The metric’s radial component diverges at $r=2m$. Its formula also fails as $r$ approaches zero. To distinguish a coordinate failure from a divergent tidal field, calculate curvature before drawing a conclusion.

In a static orthonormal frame outside $r=2m$, the six curvature entries have the pattern calculated in Chapter 9’s vacuum example: $(-2q,q,q,-q,-q,2q)$ with $q=m/r^3$. Their Ricci contractions cancel. Their full squared contraction is $4(4+1+1+1+1+4)q^2=48q^2$, giving the **Kretschmann scalar**:

$$
\mathcal K=R_{\alpha\beta\gamma\delta}R^{\alpha\beta\gamma\delta}
=\frac{48m^2}{r^6}.
$$

It is finite at $r=2m$ and diverges at $r=0$. Finite scalar invariants alone do not prove every conceivable spacetime point is regular, but here an explicit nonsingular chart will establish regularity at the horizon. At $r=0$, the divergent invariant proves the problem cannot be repaired by relabeling coordinates.

Meanwhile $R_{\mu\nu}=0$ and $R=0$ everywhere in the vacuum exterior. The remaining tidal field is Weyl curvature. Vacuum removes the Ricci source in this solution; it leaves these nonzero tidal components.

The horizon radius is

$$
r_s=2m=\frac{2G_NM}{c^2}\simeq2.95\,\mathrm{km}\left(\frac{M}{M_\odot}\right).
$$

At the horizon, the tidal scale $G_NM/r_s^3$ is proportional to $M^{-2}$. A larger black hole can have gentler horizon tides. Event-horizon status and local violence are different questions.

### 17.3 Repairing the horizon with Eddington–Finkelstein coordinates

Define the tortoise coordinate

$$
r_*=r+2m\ln\left|\frac{r}{2m}-1\right|,
\qquad \frac{dr_*}{dr}=\frac1f,
\qquad f=1-\frac{2m}{r}.
$$

Then introduce an advanced time $v=t+r_*/c$, still measured in seconds. Since $dt=dv-dr/(cf)$, substitution gives

$$
-fc^2\left(dv-\frac{dr}{cf}\right)^2+\frac{dr^2}{f}
=-fc^2dv^2+2c\,dv\,dr.
$$

The troublesome $dr^2/f$ terms cancel exactly. The metric becomes

$$
\boxed{ds^2=-fc^2dv^2+2c\,dv\,dr+r^2d\Omega^2.}
$$

Its time-radial block has determinant $-c^2$, including at $r=2m$. The time-radius block remains invertible at the future horizon. Away from the usual angular-coordinate poles, the full metric is smooth and nondegenerate there.

For radial light, set $d\Omega=0$ and $ds^2=0$. One family has $dv=0$: ingoing rays. The other satisfies

$$
\frac{dr}{dv}=\frac c2\left(1-\frac{2m}{r}\right).
$$

Outside, these outgoing rays increase their radius. At the horizon they remain on it. Inside, even this outgoing family decreases its areal radius. Future-directed timelike trajectories lie between the two null directions and also move toward smaller $r$.

An outward-directed engine can change the traveler’s timelike direction within the cone. It cannot produce a direction outside it. Local light still travels at $c$; the negative radial rate expresses the shape of the future cone in these coordinates.

The maximal mathematical extension of eternal Schwarzschild has additional regions. A black hole produced by stellar collapse need not contain its white-hole region or second exterior. An exact metric's maximal extension and the spacetime of a particular formation process are distinct objects.

### 17.4 A falling clock and a hovering rocket

For radial timelike motion, time-translation symmetry gives a dimensionless conserved energy per unit rest energy,

$$
\mathcal E=f\frac{dt}{d\tau}.
$$

Substitute this into $g_{\mu\nu}u^\mu u^\nu=-c^2$:

$$
\frac{1}{c^2}\left(\frac{dr}{d\tau}\right)^2=\mathcal E^2-f.
$$

For an object falling from rest at infinity, $\mathcal E=1$, so

$$
\frac{dr}{d\tau}=-c\sqrt{\frac{2m}{r}}.
$$

Nothing diverges at the horizon. In this idealized classical trajectory, proper time from horizon to $r=0$ is

$$
\Delta\tau=\frac1c\int_0^{2m}\sqrt{\frac r{2m}}\,dr
=\frac{4m}{3c}.
$$

This is specific to that radial energy and classical solution, not a universal countdown for every infaller. Schwarzschild coordinate time diverges at horizon crossing because that chart fails there. Signals reaching a distant observer become increasingly delayed and redshifted; the object does not remain as a permanently bright frozen photograph.

Now hold a rocket at constant $r>2m$. Its four-velocity has $u^t=1/\sqrt f$. Its radial four-acceleration is

$$
a^r=\Gamma^r{}_{tt}(u^t)^2=\frac{G_NM}{r^2}.
$$

This component happens to resemble Newton's acceleration, but the accelerometer measures the invariant magnitude

$$
\boxed{\sqrt{a_\mu a^\mu}=\frac{G_NM}{r^2\sqrt{1-2m/r}}.}
$$

It diverges on approach to the horizon. The diverging quantity belongs to the family of observers trying to remain static. It does not imply a freely falling observer measures infinite curvature there. At the horizon, being static would require following a null worldline; no massive rocket can do that.

### 17.5 Circular orbits and their stability

Spherical symmetry lets a geodesic lie in an equatorial plane. Define $\ell=r^2d\phi/d\tau$. The timelike normalization becomes

$$
\frac{\dot r^2}{c^2}+V_{\rm eff}(r)=\mathcal E^2,
\qquad
V_{\rm eff}=\left(1-\frac{2m}{r}\right)
\left(1+\frac{\ell^2}{c^2r^2}\right).
$$

Dots here mean proper-time derivatives. Expanding the potential reveals a term proportional to $-1/r^3$, absent from the Newtonian effective potential. It changes the centrifugal barrier near the hole.

A circular orbit requires $V'_{\rm eff}=0$. Solving this algebraic condition gives

$$
\frac{\ell^2}{c^2}=\frac{mr^2}{r-3m}.
$$

A small radial displacement is stable only when $V''_{\rm eff}>0$. At a circular orbit,

$$
V''_{\rm eff}=\frac{2m(r-6m)}{r^3(r-3m)}.
$$

Thus circular timelike geodesics exist for $r>3m$ and are stable for $r>6m$. The marginal boundary $r=6m$ is the **innermost stable circular orbit**, or ISCO. Unstable circular orbits can exist between $3m$ and $6m$; “unstable” does not mean “algebraically nonexistent.”

For null geodesics, the effective potential is proportional to $f/r^2$. Its derivative vanishes at $r=3m$, a maximum. That is the **photon sphere**. Its circular light orbits are unstable: a small displacement from the potential maximum grows rather than oscillating around it.

| Radius in Schwarzschild | Meaning |
|---|---|
| $2m$ | Event horizon of the black-hole solution |
| $3m$ | Unstable circular null orbits; photon sphere |
| $6m$ | Marginally stable circular timelike orbit; ISCO |

The photon sphere is not a material surface. Nor is a black-hole image a direct photograph of the horizon's coordinate radius: lensing, emission, absorption, and observer geometry intervene.

To recover the orbit equation used in Chapter 16, put $u=1/r$ and use $\dot r=-\ell u'$, where a prime now means $d/d\phi$. The radial energy equation becomes

$$
\frac{\ell^2}{c^2}u'^2+(1-2mu)\left(1+\frac{\ell^2u^2}{c^2}\right)=\mathcal E^2.
$$

Differentiate it and collect the common factor $2u'$:

$$
2u'\left[\frac{\ell^2}{c^2}(u''+u)-m-\frac{3m\ell^2}{c^2}u^2\right]=0.
$$

For a noncircular orbit with $\ell\ne0$, divide where $u'\ne0$ and extend the result continuously through isolated turning points. Since $mc^2=G_NM$, this gives $u''+u=G_NM/\ell^2+3mu^2$. Circular orbits satisfy the same equation by the separate condition $V'_{\rm eff}=0$.

### 17.6 An event horizon knows about the future

In an **asymptotically flat** spacetime, the geometry approaches flat spacetime sufficiently far from the isolated system. **Future null infinity** is the ideal destination of light that escapes indefinitely to larger distances. The black-hole region consists of events that cannot send a future-directed causal signal to that destination. Its boundary is the event horizon. The qualifier “future” means the entire future development matters.

A sufficiently small freely falling laboratory generally cannot determine by purely local experiments whether it has crossed an event horizon. It can measure curvature and tidal forces, but horizon membership is a global causal statement. Chapter 22 introduces another diagnostic by measuring whether both future-directed families of light leaving a closed surface initially decrease its area. That local area calculation answers a different question from whether a signal can escape forever.

### 17.7 The geometry of a rotating black hole

The **Kerr solution** describes a stationary, isolated rotating vacuum black hole. We will take this exact solution as given and calculate its rotational effects. Obtaining it from the field equation is a separate boundary-value problem; unlike the spherical calculation, we have not derived its metric functions here.

Define

$$
m=\frac{G_NM}{c^2},\qquad
a_K=\frac{J}{Mc},\qquad
\chi_{\rm spin}=\frac{a_K}{m}=\frac{cJ}{G_NM^2},
$$

and

$$
\Sigma=r^2+a_K^2\cos^2\theta,
\qquad \Delta=r^2-2mr+a_K^2.
$$

In Boyer–Lindquist coordinates, with $t$ in seconds, the metric is

$$
\begin{aligned}
ds^2={}&-\left(1-\frac{2mr}{\Sigma}\right)c^2dt^2
-\frac{4ma_Kr\sin^2\theta}{\Sigma}\,c\,dt\,d\phi
+\frac{\Sigma}{\Delta}dr^2+\Sigma d\theta^2\\
&+\left(r^2+a_K^2+
\frac{2ma_K^2r\sin^2\theta}{\Sigma}\right)\sin^2\theta\,d\phi^2.
\end{aligned}
$$

Setting $a_K=0$ recovers Schwarzschild. The new $dt\,d\phi$ term mixes time evolution with angular motion. Because a cross term in $ds^2$ is $2g_{t\phi}dt\,d\phi$, its displayed coefficient is twice the metric component. Read the metric component by dividing that coefficient by two before using it in a momentum or velocity calculation.

An observer with zero conserved axial angular momentum satisfies

$$
p_\phi=0
\quad\Longrightarrow\quad
\frac{d\phi}{dt}=-\frac{g_{t\phi}}{g_{\phi\phi}}.
$$

Zero angular momentum therefore does not mean zero coordinate angular velocity. This is one operational expression of **frame dragging**. It is an off-diagonal geometric effect, not viscous friction against an invisible fluid.

The roots of $\Delta=0$ are

$$
r_\pm=m\pm\sqrt{m^2-a_K^2}.
$$

For the Kerr black-hole family, $|\chi_{\rm spin}|\le1$. The outer root is the event-horizon radius. The surface where the stationary Killing field becomes null is instead $g_{tt}=0$:

$$
r_{\rm ergo}(\theta)=m+\sqrt{m^2-a_K^2\cos^2\theta}.
$$

Between this surface and the outer horizon lies the **ergoregion**. There, remaining at fixed spatial coordinates is impossible for a timelike observer, although escape can still be possible. At the poles the two surfaces meet. Elsewhere they differ: inability to remain stationary is weaker than inability to escape.

“No hair” is not a theorem that every possible gravitating theory has only two black-hole parameters. Kerr uniqueness results apply under substantial assumptions about vacuum Einstein gravity, stationarity, asymptotics, horizon structure, and regularity. For example, a rigorous result establishes Kerr uniqueness within a class of connected, nondegenerate, analytic regular vacuum black holes. Additional fields, different asymptotics, or dynamical settings change the question. See the primary mathematical result, [Chruściel and Costa, *On uniqueness of stationary vacuum black holes*](https://arxiv.org/abs/0806.0016).

The useful physical idea is that an isolated black hole settling into the appropriate stationary vacuum state is described by very few exterior parameters. The assumptions determine when this description applies.

### 17.8 A relativistic star has an interior

Imagine a small slab of material inside a star. Gravity pulls it inward. Pressure pushes on both sides; the pressure on its inner face must be greater if the slab is to remain at rest. This is why a supported star needs a pressure that decreases toward its surface. A large pressure with no pressure gradient would push equally from both sides.

Build the star outward from its centre. At each radius keep track of the mass enclosed and the pressure still needed to support the material above. The surface is where that pressure reaches zero. Increasing the central density changes the entire solution, including where its surface lies.

The following experiment uses one specified relation between density and pressure, called an **equation of state**. Its three curves show pressure falling, density falling, and enclosed mass growing. Each curve is divided by its own reference value so that their shapes can be compared. The horizontal coordinate runs from the centre to the surface. The mass and radius readouts use the model's chosen scales, rather than solar masses and kilometres; those scales are derived below.

<div data-lab-insert="star"></div>

**From pressure support to the spacetime equations.** Start with a static, spherical perfect fluid, meaning that the local pressure is the same in every spatial direction. Let $\epsilon(r)$ be its rest-frame **energy density**, including rest energy, and let $p(r)$ be its pressure. Write

$$
ds^2=-e^{2\Phi(r)}c^2dt^2+
\frac{dr^2}{1-2G_Nm(r)/(rc^2)}+r^2d\Omega^2.
$$

Here $r$ is areal radius, $m$ has units of mass, and $\Phi$ is dimensionless. Defining the mass function this way makes the radial metric coefficient a statement about the enclosed spherical gravitational mass; it is not simply the integral of rest-mass density over proper spatial volume.

The time-time Einstein equation and the radial equation give, respectively,

$$
\frac{dm}{dr}=4\pi r^2\frac{\epsilon}{c^2},\qquad
\Phi'=
\frac{G_N(m+4\pi r^3p/c^2)}{c^2r(r-2G_Nm/c^2)}.
$$

These equations can be checked from the spherical connection in §17.1: replace the constant exterior mass by $m(r)$ before differentiating and retain the nonzero fluid source. The mass equation is the time-time curvature equation; the pressure term in $\Phi'$ is the radial stress source. They are not obtained by assigning a Newtonian potential to a relativistic star.

Conservation supplies the mechanical balance. A static fluid has $u=e^{-\Phi}\partial_t$ and radial covariant acceleration $a_r=c^2\Phi'$. Projecting $\nabla_\mu T^{\mu\nu}=0$ orthogonal to $u$ gives

$$
\frac{dp}{dr}=-(\epsilon+p)\Phi'
=-\frac{G_N(\epsilon+p)(m+4\pi r^3p/c^2)}
{c^2r(r-2G_Nm/c^2)}.
$$

This is the **Tolman–Oppenheimer–Volkoff equation**. Three relativistic changes are visible: pressure contributes to inertial energy density, pressure also enters the source of the lapse gradient, and the radial geometry supplies a compactness factor. When $p\ll\epsilon$, $2G_Nm/(rc^2)\ll1$, and $\epsilon\simeq\rho c^2$, it reduces to $p'=-G_N\rho m/r^2$.

The equations need an **equation of state**, a relation between pressure and energy density supplied by matter physics. Choose central pressure $p_c>0$, impose a regular centre $m(0)=0$, integrate outward, and identify the first zero-pressure surface $R$. Then $M=m(R)$. With no material surface layer, match to an exterior Schwarzschild solution and normalize the clock by $e^{2\Phi(R)}=1-2G_NM/(Rc^2)$. The central lapse is fixed by integrating $\Phi'$ inward from that boundary; it is not an independently adjustable physical clock rate after exterior normalization.

The laboratory above uses an explicit, deliberately simple equation of state. In geometric units $G_N=c=1$, let $p=K\rho_0^2$ and $\epsilon=\rho_0+p$, where $\rho_0$ is rest-mass density in geometric units. Scale lengths and masses by $\sqrt K$ to set $K=1$. Its local sound-speed ratio is $dp/d\epsilon=2\rho_0/(1+2\rho_0)<1$. It is causal as a barotropic toy model, but it is not a fit to nuclear matter. Restoring a chosen $K$ sets the physical mass and radius scales; a plot without that choice is not a neutron-star prediction in solar masses and kilometres.

The numerical integration uses **enthalpy** $h=\int_0^p dp'/(\epsilon+p')=\ln(1+2\rho_0)$, for which $h'=-(m+4\pi r^3p)/[r(r-2m)]$. Near the centre,

$$
m(r)=\frac{4\pi\epsilon_c}{3}r^3+O(r^5),\qquad
h(r)=h_c-\frac{2\pi}{3}(\epsilon_c+3p_c)r^2+O(r^4).
$$

These expansions start the calculation away from the apparent $0/0$ at the origin. The displayed step-refinement difference measures numerical sensitivity. It is not a statement about uncertainty in the equation of state. The zero of enthalpy is located by linear interpolation, so the surface calculation can dominate the error even though the interior integrator is fourth order.

**An independent limiting check.** In the weak-gravity, low-density limit, this $K=1$ equation of state has the Newtonian solution $\rho_0(r)=\rho_c\sin(\sqrt{2\pi}r)/(\sqrt{2\pi}r)$. Its first zero is $R=\sqrt{\pi/2}$ and its mass is $M=\sqrt{2\pi}\rho_c$. Derive this by eliminating $m$ between $2\rho_0'=-m/r^2$ and $m'=4\pi r^2\rho_0$. The automated model check compares against this independently solved limit.

**A different analytic benchmark.** A constant-energy-density star, in $G_N=c=1$ units, has $m(r)=Mr^3/R^3$ and

$$
p(r)=\epsilon_0\,
\frac{\sqrt{1-2Mr^2/R^3}-\sqrt{1-2M/R}}
{3\sqrt{1-2M/R}-\sqrt{1-2Mr^2/R^3}}.
$$

Substitute it into the mass and pressure equations and check $p(R)=0$. Its central pressure diverges as $2M/R\to8/9$. This incompressible model has unphysical infinite sound speed and is a mathematical benchmark, not a viable matter model. The broader Buchdahl bound requires its own assumptions, including static spherical equilibrium, isotropic pressure, regularity, and a nonincreasing density profile; it is not a universal bound on every object called a star.

A turning point on a one-parameter equilibrium mass–radius family can signal a change of radial stability under appropriate assumptions. Establishing stability requires perturbing the equilibrium and checking the resulting mode problem. A visually impressive mass–radius curve alone has not done that calculation.

### 17.9 Separate the photon from the observers

A light signal can climb outward while its receiver moves inward to meet it. The climb tends to lower the received frequency; motion toward the incoming light tends to raise it. Compare the two effects by holding the emission and reception events fixed and changing the observers' velocities at those events.

In this experiment, the frequency ratio is the receiver's reading divided by the emitter's reading. One means equal readings; a value above one means a blueshift. Radii are multiples of the Schwarzschild radius. Both events stay outside it, where a hovering observer can provide a local reference for velocity. Each point on the graph describes a possible receiving observer, rather than successive positions of one moving receiver.

<div data-lab-insert="photon"></div>

Now derive the comparison. Let $f(r)=1-r_s/r$. A static observer measures photon energy $E_{\rm static}=E_\infty/\sqrt f$, where $E_\infty$ is the conserved energy associated with the stationary Killing vector normalized at infinity. Thus static source and receiver measure $\nu_r/\nu_e=\sqrt{f_e/f_r}$.

At either event, a radial observer with local velocity $\beta c$ measures a further Doppler factor $\gamma(1-n\beta)$, where $n=+1$ for outward light and $n=-1$ for inward light. Dividing the receiver factor by the emitter factor gives the laboratory’s combined formula. This is an instantaneous comparison of specified four-velocities; it does not assume the moving observer remains at a fixed radius.

For an outward radial null ray, $c\,dt/dr=1/f$. Integrating between exterior radii gives

$$
\frac{c\Delta t}{r_s}=(\rho_r-\rho_e)+
\ln\frac{\rho_r-1}{\rho_e-1},\qquad \rho=r/r_s.
$$

This is Schwarzschild coordinate time. A static local observer uses $d\tau=\sqrt f\,dt$ and radial proper length $d\ell=dr/\sqrt f$, obtaining $d\ell/d\tau=c$. A changing coordinate slope has not changed the locally measured light speed. Static reference observers require infinite support at the horizon and do not exist inside it; the regular-coordinate lessons handle that different domain.


<a id="chapter-18"></a>

## 18. Gravitational waves: from moving masses to a detector

The metric responds to matter, but it is not required to follow matter instantaneously. Einstein's equation is a dynamical field equation. Once disturbed, geometry has propagating degrees of freedom of its own.

The key conceptual distinction is between a field's **source** and the **field already present**. Maxwell's equations permit light in a charge-free region. Einstein's equation permits gravitational waves in a matter-free region. “The source is zero here” does not imply “the solution is zero here.”

### 18.1 Keeping the first-order gravitational field

Use Cartesian coordinates $x^0=ct$ on a Minkowski background, take $\Lambda=0$, and write

$$
g_{\mu\nu}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad |h_{\mu\nu}|\ll1.
$$

Smallness is asserted in a suitable background-adapted coordinate system; a wild coordinate transformation can make components large without creating strong physical gravity. We keep first-order terms in $h$. The inverse metric is

$$
g^{\mu\nu}=\eta^{\mu\nu}-h^{\mu\nu}+O(h^2),
$$

where perturbation indices are raised with $\eta$. Multiplying the two metrics verifies the minus sign: the first-order cross terms cancel.

The linearized connection is

$$
\Gamma^{(1)\rho}{}_{\mu\nu}
=\frac12\eta^{\rho\sigma}
(\partial_\mu h_{\sigma\nu}+\partial_\nu h_{\sigma\mu}
-\partial_\sigma h_{\mu\nu}).
$$

The correction to the inverse metric is first order. Multiplying it by $\partial h$ would give a second-order term, which we discard here. For the same reason, the $\Gamma\Gamma$ terms do not enter first-order curvature: each connection is first order around this constant background.

Contracting the derivative terms in Riemann gives

$$
R^{(1)}_{\mu\nu}=\frac12\left(
\partial_\rho\partial_\mu h^\rho{}_\nu
+\partial_\rho\partial_\nu h^\rho{}_\mu
-\Box h_{\mu\nu}-\partial_\mu\partial_\nu h\right),
$$

with

$$
h=\eta^{\mu\nu}h_{\mu\nu},
\qquad
\Box=\eta^{\mu\nu}\partial_\mu\partial_\nu
=-\frac1{c^2}\partial_t^2+\nabla^2.
$$

The trace is

$$
R^{(1)}=\partial_\mu\partial_\nu h^{\mu\nu}-\Box h.
$$

Two terms in Ricci involve divergences of $h$, one applies the wave operator to each component, and one differentiates the trace. Combining the trace with $h_{\mu\nu}$ will collect these terms into a simpler equation.

### 18.2 Trace reversal and Lorenz gauge

Define the trace-reversed perturbation

$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h.
$$

In four dimensions its trace is $\bar h=-h$, since contracting $\eta_{\mu\nu}$ produces four. Consequently the inverse operation has the same form:

$$
h_{\mu\nu}=\bar h_{\mu\nu}-\frac12\eta_{\mu\nu}\bar h.
$$

The name refers to the sign of the trace. It does not mean reversing every tensor component.

The linearized Einstein tensor becomes

$$
G^{(1)}_{\mu\nu}
=-\frac12\Box\bar h_{\mu\nu}
+\partial_{(\mu}\partial^\alpha\bar h_{\nu)\alpha}
-\frac12\eta_{\mu\nu}\partial^\alpha\partial^\beta\bar h_{\alpha\beta}.
$$

Symmetrization includes its factor of $1/2$. The terms beyond the wave operator all contain the divergence of $\bar h$. A coordinate choice that makes this divergence zero will remove them together.

Under an infinitesimal coordinate change $x'^\mu=x^\mu+\xi^\mu$, the first-order perturbation changes by

$$
h'_{\mu\nu}=h_{\mu\nu}-\partial_\mu\xi_\nu-\partial_\nu\xi_\mu.
$$

This is a different coordinate description of the same metric, to the stated order. Its trace-reversed divergence transforms as

$$
\partial^\mu\bar h'_{\mu\nu}
=\partial^\mu\bar h_{\mu\nu}-\Box\xi_\nu.
$$

Locally, with suitable initial and boundary conditions, solve
$\Box\xi_\nu=\partial^\mu\bar h_{\mu\nu}$. In the resulting coordinates,

$$
\partial^\mu\bar h_{\mu\nu}=0.
$$

This is usually called Lorenz, harmonic, or de Donder gauge in this context. It removes four coordinate-dependent combinations, not four physical forces.

The field equation collapses to

$$
\boxed{\Box\bar h_{\mu\nu}=-\frac{16\pi G_N}{c^4}T_{\mu\nu}.}
$$

The coefficient follows directly from $G^{(1)}_{\mu\nu}=-\Box\bar h_{\mu\nu}/2$ and Einstein's $8\pi G_N/c^4$. The extra factor of two comes from dividing by the coefficient $-1/2$ on the geometric side.

Taking a divergence requires $\partial^\mu T_{\mu\nu}=0$ at this order. The source cannot be chosen arbitrarily; its leading dynamics must be consistent with energy-momentum conservation. For a self-gravitating compact system, systematically including the gravitational contribution requires the appropriate perturbative expansion rather than inserting an inconsistent prescribed matter motion.

### 18.3 Why there are two polarizations, not ten

In vacuum, $\Box\bar h_{\mu\nu}=0$. A plane wave has the form

$$
\bar h_{\mu\nu}=\operatorname{Re}
\left[A_{\mu\nu}e^{ik_\alpha x^\alpha}\right].
$$

Applying $\Box$ multiplies this by $-k_\alpha k^\alpha$, so a nontrivial wave requires

$$
k_\alpha k^\alpha=0.
$$

Its wave covector is null; for a wave propagating along $z$, the phase depends on $t-z/c$. Gravitational disturbances propagate on the background light cone at this order.

The gauge condition gives $k^\mu A_{\mu\nu}=0$, four restrictions on a symmetric tensor's ten components. But this gauge is not fully fixed: transformations satisfying $\Box\xi^\mu=0$ preserve it. For a nonzero vacuum plane wave, four residual gauge choices remove four further amplitude combinations. What remains are two independent radiative polarizations.

This count applies to a nonzero vacuum plane wave satisfying both its field equation and gauge condition. The explicit reduction below shows which components disappear; counting alone would not establish their independence.

<details class="history-note" data-no-narration>
<summary>Further calculation: remove the four residual components</summary>

Write the unbarred amplitude as $H_{\mu\nu}$, so $h_{\mu\nu}=\operatorname{Re}[H_{\mu\nu}e^{ik_\alpha x^\alpha}]$. For propagation in the positive $z$ direction, take $k_\mu=(-q,0,0,q)$ with $q=\omega/c\ne0$. A residual coordinate change $\xi_\mu=\operatorname{Re}[B_\mu e^{ik_\alpha x^\alpha}]$ satisfies $\Box\xi_\mu=0$ because $k$ is null. It changes the amplitude by

$$
H'_{\mu\nu}=H_{\mu\nu}-i(k_\mu B_\nu+k_\nu B_\mu).
$$

The time-containing entries consequently obey

$$
\begin{aligned}
H'_{00}&=H_{00}+2iqB_0,\\
H'_{01}&=H_{01}+iqB_1,\qquad H'_{02}=H_{02}+iqB_2,\\
H'_{03}&=H_{03}+iq(B_3-B_0).
\end{aligned}
$$

Choose $B_0$ to set the first line to zero, $B_1,B_2$ to set the second line to zero, and then $B_3$ to set the third line to zero. Thus all $H'_{0\mu}$ vanish, while Lorenz gauge remains satisfied.

Since $k^\mu=(q,0,0,q)$, that gauge condition reads $\bar H'_{0\nu}+\bar H'_{3\nu}=0$. At $\nu=0$, the already zero time entries leave $H'/2=0$, where $H'$ is the trace. The remaining conditions then give $H'_{3\nu}=0$. Only $H'_{11}=-H'_{22}$ and $H'_{12}=H'_{21}$ are free. These are the two amplitudes displayed below.

</details>

A convenient representative is **transverse-traceless**, or TT, gauge. For propagation along $z$,

$$
h^{\rm TT}_{0\mu}=0,\qquad
h^{\rm TT}_{ij}=
\begin{pmatrix}
h_+&h_\times&0\\
h_\times&-h_+&0\\
0&0&0
\end{pmatrix},
\qquad h_+=h_+(t-z/c),\quad h_\times=h_\times(t-z/c).
$$

“Transverse” means the spatial perturbation has no component along the propagation direction. “Traceless” means its diagonal spatial entries sum to zero. Along the instantaneous principal axes, the two transverse eigenvalues are equal and opposite.

The plus polarization stretches an initially circular ring of free test particles along one axis and compresses it along the perpendicular axis. Half a cycle later the roles reverse. The cross polarization does the same with axes rotated by $45^\circ$. Superpositions produce elliptical or circular polarization.

Rotate the transverse basis by $\theta$, taking $e'_x=\cos\theta\,e_x+\sin\theta\,e_y$ and $e'_y=-\sin\theta\,e_x+\cos\theta\,e_y$. Applying the tensor transformation to its two inputs gives

$$
\begin{aligned}
h'_+&=h_+\cos2\theta+h_\times\sin2\theta,\\
h'_\times&=-h_+\sin2\theta+h_\times\cos2\theta.
\end{aligned}
$$

The double angle follows from $\cos^2\theta-\sin^2\theta=\cos2\theta$ and $2\sin\theta\cos\theta=\sin2\theta$. In particular, a $45$-degree rotation exchanges the two patterns up to sign. This transformation is the classical meaning of the wave’s **spin-2** angular response.

### 18.4 What a detector measures in TT coordinates

For initially stationary free test particles in TT coordinates, $\Gamma^i{}_{00}=0$ at first order. Their spatial coordinates can remain constant while the metric changes the distance between them. Along a short arm directed along $x$,

$$
L_x(t)=\int_0^{L_0}\sqrt{1+h_+}\,dx
\simeq L_0\left(1+\frac12h_+\right).
$$

Along $y$, the corresponding change is $-h_+/2$. This expression assumes an arm short compared with the wavelength, so the field is approximately uniform across it on the chosen time slice.

The same observable effect can be obtained from curvature, avoiding the impression that moving grid lines create physics. In a local inertial frame associated with the detector,

$$
R_{i0j0}=-\frac{1}{2c^2}\frac{\partial^2h^{\rm TT}_{ij}}{\partial t^2}.
$$

The geodesic-deviation equation therefore gives

$$
\frac{d^2\xi^i}{dt^2}
=-c^2R^i{}_{0j0}\xi^j
=\frac12\ddot h^{\rm TT\,i}{}_j\xi^j.
$$

To first order, with initial conditions corresponding to undisturbed separations before a passing wave,

$$
\xi^i(t)\simeq\left(\delta^i{}_j+\frac12h^{\rm TT\,i}{}_j(t)\right)\xi_0^j.
$$

In one coordinate description the masses stay at fixed coordinates and the metric changes their separation. In another their coordinates respond to tidal acceleration. They predict the same instrument response. Linearized Riemann is unchanged by a pure linearized gauge transformation about flat spacetime because the extra third derivatives cancel.

A laser interferometer compares the phases accumulated by light traversing differently oriented arms and returning to a common observer. In the ideal long-wavelength, favorably oriented case,

$$
\frac{\delta L_x-\delta L_y}{L_0}=h_+.
$$

For $L_0=4\,\mathrm{km}$ and $h_+=10^{-21}$, the differential equivalent length is $4\times10^{-18}\,\mathrm m$. Each individual arm's change in this idealized example is half that magnitude with opposite sign. Actual responses include source direction, polarization, optical configuration, and frequency-dependent light travel effects.

We can check the light signal explicitly in the same short-arm limit. During one round trip, treat $h_+$ as approximately constant. The null condition along the $x$ arm gives $c\,dt\simeq(1+h_+/2)|dx|$; the $y$ arm has the opposite sign. Their round-trip times are therefore

$$
T_x\simeq\frac{2L_0}{c}(1+h_+/2),\qquad
T_y\simeq\frac{2L_0}{c}(1-h_+/2).
$$

The clock at the beamsplitter measures this $t$ as proper time because $g_{00}=-1$ there. The arrival-time difference is $T_x-T_y=2L_0h_+/c$. A laser of local frequency $f_{\rm laser}$ converts it into a phase difference $2\pi f_{\rm laser}(T_x-T_y)$. Thus following the light gives a measurable change, consistent with the strain calculation. For longer arms relative to the wavelength, integrate the changing field along each outgoing and returning light path instead.

### 18.5 Waves from a changing source

With no incoming radiation and an appropriate localized weak source, the retarded solution is

$$
\bar h_{\mu\nu}(t,\mathbf x)
=\frac{4G_N}{c^4}\int
\frac{T_{\mu\nu}\left(t-|\mathbf x-\mathbf x'|/c,\mathbf x'\right)}
{|\mathbf x-\mathbf x'|}\,d^3x'.
$$

Every source element contributes at its own retarded time. The denominator gives the falloff with distance; the time argument samples the source when its signal had to leave to reach the observer now.

For a source much smaller than its characteristic gravitational wavelength, observed far away at distance $D$, approximate the denominator by $D$ and the leading source time by $t-D/c$. Then

$$
\bar h_{ij}\simeq\frac{4G_N}{c^4D}\int T_{ij}(t-D/c,\mathbf x')\,d^3x'.
$$

The spatial stresses look inconvenient. Conservation converts them into a more intuitive changing mass distribution. Define the leading mass quadrupole moment before trace removal,

$$
I_{ij}=\frac1{c^2}\int T^{00}x_i x_j\,d^3x
\simeq\int\rho\,x_i x_j\,d^3x.
$$

Here $\rho=\epsilon/c^2$ at leading nonrelativistic order. Spatial index positions in these Euclidean Cartesian formulas are interchangeable.

Use $\partial_tT^{00}=-c\partial_kT^{k0}$ and integrate by parts. Surface terms vanish for the localized source:

$$
\dot I_{ij}=\frac1c\int(T_i{}^0x_j+T_j{}^0x_i)\,d^3x.
$$

Differentiate again, use $\partial_tT_i{}^0=-c\partial_kT_i{}^k$, and integrate by parts again:

$$
\boxed{\ddot I_{ij}=2\int T_{ij}\,d^3x.}
$$

The factor of two comes from the two positions in the symmetric product $x_i x_j$. This manipulation is doing physical work: conservation relates momentum transport to changes in the shape of the mass distribution.

Define its trace-free part

$$
Q_{ij}=I_{ij}-\frac13\delta_{ij}\delta^{kl}I_{kl}.
$$

The leading radiative field is

$$
\boxed{h^{\rm TT}_{ij}(t,\mathbf x)
=\frac{2G_N}{c^4D}\,\mathcal P_{ij}{}^{kl}(\mathbf n)
\ddot Q_{kl}(t-D/c).}
$$

The unit vector $\mathbf n$ points toward the observer. The TT projector is

$$
P_{ij}=\delta_{ij}-n_i n_j,
\qquad
\mathcal P_{ij}{}^{kl}=P_i{}^kP_j{}^l-\frac12P_{ij}P^{kl},
$$

acting here on symmetric tensors. The first operation projects both indices into the observer's transverse plane. The second removes the trace within that two-dimensional plane, hence $1/2$ rather than the $1/3$ used to remove a three-dimensional trace. That difference is a useful check that the geometry remains attached to the algebra.

### 18.6 Which source motions radiate

The **mass monopole** is the total mass at the accuracy of this slow-motion calculation, $M=\int\rho\,d^3x$. The **mass dipole** is the vector $D_i=\int\rho x_i\,d^3x=M x_{{\rm CM},i}$, locating the center of mass. The quadrupole uses two position factors, as in $I_{ij}$ above.

Conservation gives $\dot M=0$, $\dot D_i=P_i$, and $\dot P_i=0$ for an isolated leading-order source, where $P_i$ is total momentum. Its dipole therefore has no second time derivative. The analogous first moment of the mass current describes total angular momentum, also conserved at this order. These lower moments cannot supply the varying radiative field. The quadrupole is the first available mass moment.

Two masses orbiting each other continually change their quadrupole even if their total mass and center of mass remain constant. A perfectly spherical body expanding and contracting has no trace-free mass quadrupole. Exact spherical symmetry also forbids tensor gravitational radiation beyond this approximation, consistent with Birkhoff's theorem in the vacuum exterior.

The tempting rule “anything accelerating emits gravitational waves” is therefore too crude. Radiation depends on the collective multipole structure and conservation laws, not a tally of individual accelerations. Other theories with additional radiative fields can have different multipole channels.

### 18.7 Wave energy lives one order beyond the linear equation

The field equation is nonlinear. Expand it schematically as

$$
G[g_{\rm background}+h]
=G[g_{\rm background}]+G^{(1)}[h]+G^{(2)}[h,h]+\cdots.
$$

The linear term describes propagation. Quadratic terms describe how the waves themselves influence the slowly varying background. When the wavelength is short compared with the background curvature scale, one can average over several wavelengths while remaining local relative to that background. This produces an effective wave stress-energy tensor.

The scale separation is essential. This is not an exact, generally covariant pointwise gravitational-energy tensor for arbitrary geometries. Isaacson's high-frequency treatment explicitly constructs the appropriate averaged effective description. See [Isaacson, *Gravitational Radiation in the Limit of High Frequency. II*](https://doi.org/10.1103/PhysRev.166.1272).

For a nearly planar wave in a locally flat wave zone, the average flux is

$$
F=\frac{c^3}{32\pi G_N}
\left\langle\dot h^{\rm TT}_{ij}\dot h_{\rm TT}^{ij}\right\rangle
=\frac{c^3}{16\pi G_N}
\left\langle\dot h_+^2+\dot h_\times^2\right\rangle.
$$

Angle brackets denote the averaging. The second equality uses the fact that the polarization matrix contributes twice each squared amplitude. Flux has units of power per area; $c^3/G_N$ times an inverse time squared has exactly those units.

The leading total radiated power from a slow isolated source is

$$
P_{\rm GW}=\frac{G_N}{5c^5}
\left\langle\dddot Q_{ij}\dddot Q^{ij}\right\rangle.
$$

The flux contains the square of a first time derivative of strain, whereas strain contains a second derivative of $Q$. That explains the third derivative in the power. The factor $1/5$ follows by integrating the transverse projection over all viewing directions, as we now calculate.

Write $A_{ij}=\dddot Q_{ij}$ at a fixed retarded time. Substituting the quadrupole strain into the flux and integrating over a large sphere gives

$$
P_{\rm GW}=\frac{G_N}{8\pi c^5}\int d\Omega\,
\left\langle A^{\rm TT}_{ij}A_{\rm TT}^{ij}\right\rangle.
$$

The distance cancels: wave amplitude falls as $1/D$, flux as $1/D^2$, and sphere area grows as $D^2$. The remaining calculation asks what fraction of a trace-free tensor survives transverse projection, averaged over viewing directions.

Define $S=A_{ij}A^{ij}$, $B_i=A_{ij}n^j$, and $s=A_{ij}n^i n^j$. Expanding the projector gives

$$
A^{\rm TT}_{ij}A_{\rm TT}^{ij}=S-2B_iB^i+\frac12s^2.
$$

For a uniform average over directions, isotropy requires

$$
\langle n_i n_j\rangle_\Omega=\frac{\delta_{ij}}3,
\qquad
\langle n_i n_j n_k n_l\rangle_\Omega
=\frac{\delta_{ij}\delta_{kl}+\delta_{ik}\delta_{jl}
+\delta_{il}\delta_{jk}}{15}.
$$

Why these forms? There is no preferred direction, so only Kronecker deltas can appear. Symmetry fixes the combinations. Contracting indices and using $n_i n^i=1$ fixes the denominators. Consequently $\langle B_iB^i\rangle_\Omega=S/3$ and, since $A$ is trace-free, $\langle s^2\rangle_\Omega=2S/15$. Therefore

$$
\langle A^{\rm TT}_{ij}A_{\rm TT}^{ij}\rangle_\Omega
=S-\frac{2S}3+\frac S{15}=\frac{2S}5.
$$

Multiplying by the sphere's solid angle $4\pi$ produces $8\pi S/5$. That cancels the flux prefactor's $8\pi$ and leaves precisely $G_N/(5c^5)$. The time average and the angular average serve different purposes; their labels keep those operations distinct.

The $c^{-5}$ suppression makes ordinary laboratory gravitational radiation extremely weak. Large masses, rapid asymmetric motion, and compact configurations help overcome that suppression.

For compact bodies, the leading quadrupole law can describe their slow orbital dynamics even when gravity inside each body is strong; its derivation must then be embedded in a consistent approximation for the effective orbital source. It is not a demand that each black hole itself be a weak-field object.

For a circular binary with total mass $M$, reduced mass $\mu=m_1m_2/M$, and separation $r$, the leading result is

$$
P_{\rm GW}=\frac{32}{5}\frac{G_N^4\mu^2M^3}{c^5r^5}.
$$

To see the binary coefficient, put the relative position at $\mathbf r=r(\cos\Omega t,\sin\Omega t,0)$ in its center-of-mass frame. The center-of-mass condition places the two bodies at $\mathbf r_1=(m_2/M)\mathbf r$ and $\mathbf r_2=-(m_1/M)\mathbf r$. Substituting these in $I_{ij}=m_1r_{1i}r_{1j}+m_2r_{2i}r_{2j}$ gives $I_{ij}=\mu r_i r_j$. The changing quadrupole components are

$$
\begin{aligned}
Q_{xx}&=\mu r^2\left(\frac16+\frac12\cos2\Omega t\right),\\
Q_{yy}&=\mu r^2\left(\frac16-\frac12\cos2\Omega t\right),\\
Q_{xy}&=Q_{yx}=\frac12\mu r^2\sin2\Omega t,\qquad
Q_{zz}=-\frac13\mu r^2.
\end{aligned}
$$

Three time derivatives remove the constant terms and give amplitudes $4\mu r^2\Omega^3$. Contracting the tensor counts both $xy$ and $yx$ and yields

$$
\dddot Q_{ij}\dddot Q^{ij}=32\mu^2r^4\Omega^6.
$$

Use $\Omega^2=G_NM/r^3$ in the quadrupole power law to obtain the displayed binary luminosity. This leading calculation treats the orbit as approximately circular and nearly unchanged over one cycle; the slow inspiral is then included through energy balance.

Its Newtonian binding energy is $E=-G_N\mu M/(2r)$. Because $dE/dt=-P_{\rm GW}<0$, the energy becomes more negative and $r$ decreases. Kepler's relation $\Omega^2=G_NM/r^3$ then makes the orbital frequency increase. Its speed increases while its total energy decreases: the drop in gravitational potential energy is greater than the gain in kinetic energy.

The quadrupole components repeat at twice the orbital frequency, so the dominant wave frequency is $f=\Omega/\pi$. Kepler’s relation gives $r=(G_NM)^{1/3}(\pi f)^{-2/3}$. Define $\mathcal M=\mu^{3/5}M^{2/5}$, so $\mathcal M^{5/3}=\mu M^{2/3}$. Substitution into the energy and power gives

$$
\begin{aligned}
E(f)&=-\frac12G_N^{2/3}\mathcal M^{5/3}(\pi f)^{2/3},\\
P(f)&=\frac{32}{5c^5}G_N^{7/3}\mathcal M^{10/3}(\pi f)^{10/3}.
\end{aligned}
$$

Differentiate $E$: $dE/df=-G_N^{2/3}\mathcal M^{5/3}\pi^{2/3}f^{-1/3}/3$. Energy balance, $(dE/df)\dot f=-P$, then yields

$$
\dot f=\frac{96}{5}\pi^{8/3}
\left(\frac{G_N\mathcal M}{c^3}\right)^{5/3}f^{11/3},
\qquad
\mathcal M=\mu^{3/5}M^{2/5}.
$$

The combination $\mathcal M$ is the **chirp mass**. Its name is operational: the measured rate at which the signal's pitch rises strongly constrains it. This is a leading inspiral formula, requiring slow enough orbital motion for the approximation. Near merger, higher-order analytic methods and numerical solutions of Einstein's equation become necessary.

### 18.8 Comparing the prediction with GW150914

On September 14, 2015, LIGO detected GW150914. The discovery report described a signal rising from approximately $35$ to $250$ Hz with peak strain about $10^{-21}$. Its inferred source was a merging binary black hole; the initial analysis estimated that roughly three solar masses of energy were radiated. These are findings of the original analysis, with model-dependent parameter estimates and uncertainties, rather than exact source properties. [LIGO Scientific Collaboration and Virgo Collaboration, *Observation of Gravitational Waves from a Binary Black Hole Merger*](https://arxiv.org/abs/1602.03837).

The measured signal includes the increase in frequency described by the inspiral calculation. The final merger and settling require stronger-field predictions than the leading quadrupole formula. Comparing the complete predicted waveform with detector data tests this progression through different regimes.

<a id="chapter-19"></a>

## 19. Cosmology: Einstein's equation for the large-scale universe

Follow three widely separated galaxies carried by an expanding background. If every separation grows by the same fraction during the same time, one function can describe that common change: the scale factor. We first study this smooth background, then use it to calculate the light received from a distant source. Individual galaxies and other departures from uniformity require additional structure.

Homogeneity says no spatial location is special in the background model. Isotropy says no spatial direction is special for its fundamental observers. Neither assumption requires time independence. The universe is allowed to evolve while treating every background location equivalently.

### 19.1 A metric for uniform expansion

Attach spatial labels to the background observers so their labels stay fixed during expansion. Such coordinates are called **comoving**. Use the chart $(t,\chi,\theta,\phi)$, with $t$ in seconds and the spatial labels dimensionless. The common scaling and spatial symmetries lead to

$$
\boxed{ds^2=-c^2dt^2+a^2(t)
\left[\frac{d\chi^2}{1-k\chi^2}+\chi^2d\Omega^2\right],}
$$

where $a(t)$ has units of length and $k\in\{-1,0,+1\}$ is dimensionless. This is the **Friedmann–Lemaître–Robertson–Walker (FLRW) metric**. For $k=+1$, the displayed radial chart has $0\le\chi<1$ and does not cover the whole closed spatial geometry; Section 19.7 gives a radial coordinate that continues past this patch. The angular coordinates have their usual pole limitations.

At fixed time, isotropy makes the sectional curvature the same for every spatial two-plane, and homogeneity makes it the same at each point. Call that value $K_s=k/a^2$. In an orthonormal spatial frame the curvature therefore has the form ${}^{(3)}R_{ijkl}=K_s(\delta_{ik}\delta_{jl}-\delta_{il}\delta_{jk})$. Contracting gives ${}^{(3)}R_{ij}=2K_s\delta_{ij}$, and a second contraction gives

$$
{}^{(3)}R=\frac{6k}{a^2}.
$$

Positive $k$ describes positive constant spatial curvature, negative $k$ negative curvature, and zero $k$ flat spatial slices. Local curvature does not by itself settle every global topology question.

Some books instead make $a$ dimensionless and place length units in the spatial coordinates or curvature parameter. Either convention works. Combining the formulas without converting conventions does not. Here, when we want a dimensionless normalized scale factor, we will explicitly write $A(t)=a(t)/a(t_0)$.

Observers at fixed comoving coordinates have $d\tau=dt$. The cosmic time is their proper time; it is not a new absolute Newtonian time available in every spacetime. It is singled out by this geometry and matter congruence.

The Hubble parameter is

$$
H=\frac{\dot a}{a},
$$

with units of inverse time. It measures the fractional expansion rate. An expansion factor is a ratio of scale factors, while $H$ is a rate of change. For example, doubling all distances is an expansion factor of two; taking a billion years to do so and taking two billion years imply different expansion rates.

### 19.2 Calculating the spacetime curvature

Write the spatial bracket as $\gamma_{ij}dx^i dx^j$, so $g_{ij}=a^2\gamma_{ij}$ and $\gamma$ has unit constant curvature $k$. The useful connection coefficients are

$$
\Gamma^t{}_{ij}=\frac{a\dot a}{c^2}\gamma_{ij},
\qquad
\Gamma^i{}_{tj}=H\delta^i{}_j,
\qquad
\Gamma^i{}_{jk}={}^{(3)}\Gamma^i{}_{jk}[\gamma].
$$

The first says spatial motion participates in time evolution because spatial distances depend on time. The second says a spatial basis carried through cosmic time changes its scale. The third contains the ordinary intrinsic connection of the constant-curvature spatial geometry.

For the time-time Ricci component, $\Gamma^i{}_{ti}=3H$. The relevant contraction gives

$$
R_{tt}=-\partial_t(3H)-3H^2
=-3\frac{\ddot a}{a}.
$$

The cancellation uses $\dot H=\ddot a/a-H^2$. There are three equal spatial contributions because there are three equivalent spatial directions.

For the spatial Ricci components, the intrinsic curvature contributes $2k\gamma_{ij}$. The time-dependent pieces are $\partial_t\Gamma^t{}_{ij}=(\dot a^2+a\ddot a)\gamma_{ij}/c^2$, the trace product $3H\Gamma^t{}_{ij}=3\dot a^2\gamma_{ij}/c^2$, and the two remaining mixed products totaling $-2\dot a^2\gamma_{ij}/c^2$. Adding them gives

$$
R_{ij}=\left(\frac{a\ddot a+2\dot a^2}{c^2}+2k\right)\gamma_{ij}.
$$

Contract with $g^{tt}=-1/c^2$ and $g^{ij}=\gamma^{ij}/a^2$:

$$
R=\frac6{c^2}\left(\frac{\ddot a}{a}+H^2+\frac{kc^2}{a^2}\right).
$$

Notice that $k=0$ does not generally make this vanish. Spatial flatness is not spacetime flatness. Evolving distances generate spacetime curvature even when every spatial slice is intrinsically Euclidean.

Combining Ricci and its trace gives

$$
G_{tt}=3\left(H^2+\frac{kc^2}{a^2}\right),
$$

and

$$
G^i{}_j=-\frac1{c^2}
\left(2\frac{\ddot a}{a}+H^2+\frac{kc^2}{a^2}\right)\delta^i{}_j.
$$

The $tt$ component has inverse-time-squared units because this chart uses $t$, not $ct$. The mixed spatial components have inverse-length-squared units. The coordinate units explain the difference, just as the metric’s $tt$ component carries $c^2$ when $t$ is measured in seconds.

### 19.3 The Friedmann equations: what controls expansion and acceleration

Homogeneity and isotropy select a perfect-fluid background stress-energy tensor. Let $\epsilon$ be physical rest-frame energy density and $p$ pressure. In the comoving chart,

$$
T^t{}_t=-\epsilon,\qquad T^i{}_j=p\delta^i{}_j,
\qquad T_{tt}=\epsilon c^2.
$$

Substitute the time-time components into
$G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi G_NT_{\mu\nu}/c^4$:

$$
3\left(H^2+\frac{kc^2}{a^2}\right)-\Lambda c^2
=\frac{8\pi G_N}{c^2}\epsilon.
$$

Divide by three and rearrange:

$$
\boxed{H^2=\frac{8\pi G_N}{3c^2}\epsilon
-\frac{kc^2}{a^2}+\frac{\Lambda c^2}{3}.}
$$

This is the first Friedmann equation. In mass-equivalent density $\rho=\epsilon/c^2$, the matter term is $8\pi G_N\rho/3$. That conversion explains many apparently different textbook versions.

The spatial equation gives

$$
2\frac{\ddot a}{a}+H^2+\frac{kc^2}{a^2}
=-\frac{8\pi G_N}{c^2}p+\Lambda c^2.
$$

Eliminate $H^2+kc^2/a^2$ using the first equation:

$$
\boxed{\frac{\ddot a}{a}
=-\frac{4\pi G_N}{3c^2}(\epsilon+3p)
+\frac{\Lambda c^2}{3}.}
$$

This is the acceleration equation. Energy density and isotropic pressure both gravitate. The factor three counts the three equal spatial pressures in the rest frame.

A positive expansion rate $H>0$ does not imply accelerating expansion $\ddot a>0$. A ball thrown upward moves upward while slowing. Likewise, a matter-filled model can grow in size while its growth rate decreases.

Conversely, a positive cosmological constant contributes positively to $\ddot a/a$. If it dominates, expansion accelerates. The equations make the condition quantitative instead of relying on the ambiguous phrase “repulsive gravity.”

### 19.4 Energy conservation during expansion

Use the mixed components $T^t{}_t=-\epsilon$ and $T^i{}_j=p\delta^i{}_j$. The time component of their covariant divergence is

$$
\begin{aligned}
\nabla_\mu T^\mu{}_t
&=\partial_t(-\epsilon)
+\Gamma^\mu{}_{\mu t}(-\epsilon)
-\Gamma^j{}_{it}p\delta^i{}_j\\
&=-\dot\epsilon-3H\epsilon-3Hp.
\end{aligned}
$$

Setting it to zero gives

$$
\boxed{\dot\epsilon+3H(\epsilon+p)=0.}
$$

For a fixed comoving volume, its physical volume is proportional to $a^3$. Multiply the conservation equation by $a^3$:

$$
\frac{d}{dt}(\epsilon a^3)=-p\frac{d}{dt}(a^3).
$$

This has the familiar form $dE=-p\,dV$. As the volume expands, positive pressure reduces the energy within that comoving volume. The fluid does expansion work in this local continuum sense.

These equations are not three independent pieces of information. Differentiate the first Friedmann equation and use the continuity equation; away from a turning point, dividing by $H$ recovers the acceleration equation. At $H=0$, use the original Einstein and conservation equations rather than dividing by zero. The undivided equations remain valid at a turning point.

For a separately conserved component with constant equation-of-state parameter

$$
w=\frac p\epsilon,
$$

the continuity equation becomes

$$
\frac{d\epsilon}{\epsilon}=-3(1+w)\frac{da}{a}.
$$

Integrate:

$$
\boxed{\epsilon=\epsilon_0A^{-3(1+w)},\qquad A=\frac{a}{a_0}.}
$$

The integration is a statement about dilution and work, not an additional gravitational law. If components exchange energy, each gets an exchange term and need not obey this separate scaling; the total still obeys conservation.

| Component | Approximate $w$ | Energy-density scaling | Physical reason |
|---|---:|---|---|
| Nonrelativistic matter, or dust | $0$ | $A^{-3}$ | Approximately fixed rest energy per particle, diluted by volume |
| Radiation | $1/3$ | $A^{-4}$ | Volume dilution plus redshift of each quantum's energy |
| Cosmological constant as a fluid | $-1$ | Constant | Negative pressure exactly offsets dilution in the continuity equation |

The dust model does not mean microscopic dust grains specifically. It means negligible pressure relative to energy density at the scale and accuracy being modeled.

If $\Lambda$ is moved to the matter side, its effective density and pressure are

$$
\epsilon_\Lambda=\frac{\Lambda c^4}{8\pi G_N},
\qquad p_\Lambda=-\epsilon_\Lambda.
$$

Either keep $\Lambda$ explicit in the Friedmann equations or include this component in total $\epsilon,p$ and remove the explicit term. Doing both counts the same effect twice.

A comoving volume filled with this effective component gains total energy as it grows, since its energy density remains constant. This does not violate the continuity equation; its negative pressure makes the right-hand side $-p\,dV$ positive. In a general expanding spacetime there is no global timelike translation symmetry supplying a universally conserved total energy of the elementary mechanics kind.

### 19.5 Solving for the scale factor

Consider a spatially flat universe dominated by a single separately conserved constant-$w$ component, with no additional explicit $\Lambda$. For $w>-1$, choose the expanding branch. Combining the first Friedmann equation with the density scaling gives

$$
\frac{\dot A}{A}=C A^{-3(1+w)/2},
$$

where $C>0$ is a constant with inverse-time units. Move the power of $A$ to the left and integrate:

$$
A^{3(1+w)/2}\propto t-t_B,
\qquad
\boxed{a(t)\propto(t-t_B)^{2/[3(1+w)]}.}
$$

The time $t_B$ is the integration constant locating $a=0$ in this classical idealized solution. The approximation is not a license to extrapolate an arbitrarily chosen matter model into the quantum-gravity regime.

For dust, $a\propto t^{2/3}$; for radiation, $a\propto t^{1/2}$ after shifting $t_B$ to zero. Both expand while decelerating. Radiation decelerates more strongly because its pressure also contributes to the acceleration equation.

For a positive cosmological constant alone in a spatially flat expanding slicing,

$$
H=\sqrt{\frac{\Lambda c^2}{3}}=\text{constant},
\qquad a(t)\propto e^{Ht}.
$$

For $w=-1$, the density is constant, so the first Friedmann equation makes $H$ constant. Integrating $\dot a/a=H$ gives the exponential directly. This case was excluded when we divided by $1+w$ in the power-law integration.

More generally, a positive-density single component with $w<-1/3$ produces acceleration in the flat model. That criterion depends on the total effective $\epsilon+3p$ when multiple components are present.

A realistic background calculation combines components with different scalings. Radiation fades fastest, matter more slowly, and a cosmological-constant density stays fixed. Different terms can therefore dominate at different epochs without any of them abruptly changing its fundamental identity.

### 19.6 Cosmological redshift, derived from neighboring wave crests

Define a radial comoving distance coordinate along a ray by

$$
d\psi=\frac{d\chi}{\sqrt{1-k\chi^2}}.
$$

Radial null propagation gives $c\,dt=\pm a(t)d\psi$. For a fixed comoving source and receiver, the comoving distance traversed by a light signal is

$$
\Delta\psi=\int_{t_{\rm em}}^{t_{\rm rec}}\frac{c\,dt}{a(t)}.
$$

A neighboring wave crest leaves at $t_{\rm em}+\delta t_{\rm em}$ and arrives at $t_{\rm rec}+\delta t_{\rm rec}$. It crosses the same comoving separation. Subtract the two integrals, treating the periods as short compared with the expansion time:

$$
\frac{\delta t_{\rm rec}}{a(t_{\rm rec})}
=\frac{\delta t_{\rm em}}{a(t_{\rm em})}.
$$

The comoving clocks measure these coordinate intervals as proper periods. Frequency is inverse period, so

$$
\boxed{1+z=\frac{\nu_{\rm em}}{\nu_{\rm rec}}
=\frac{a(t_{\rm rec})}{a(t_{\rm em})}.}
$$

A photon observed at redshift $z=2$ was emitted when the scale factor was one third its value at observation. Its observed wavelength is three times its emitted wavelength, assuming no additional peculiar-motion or local gravitational shifts.

Photon energy is proportional to frequency, so it scales as $a^{-1}$. Combined with number-density dilution $a^{-3}$, this independently explains radiation's $a^{-4}$ energy-density law. The light-propagation and fluid-conservation calculations give the same density scaling.

This redshift differs from comparing stationary observers in a static potential. Generic FLRW spacetime has no corresponding global timelike Killing symmetry. A useful alternative interpretation builds the redshift from many small local Doppler shifts between neighboring comoving observers. What one should not do is pretend all widely separated cosmological observers share one global special-relativistic inertial frame.

### 19.7 Conformal time and radial light rays

Define dimensionless conformal time by

$$
d\eta=\frac{c\,dt}{a(t)}.
$$

Then

$$
ds^2=a^2(\eta)\left[-d\eta^2+d\psi^2+
S_k^2(\psi)d\Omega^2\right],
$$

The radial functions follow by integrating $d\chi/d\psi=\sqrt{1-k\chi^2}$ near the origin: $\chi=\sin\psi$ for $k=+1$, $\chi=\psi$ for $k=0$, and $\chi=\sinh\psi$ for $k=-1$. Thus $S_{+1}(\psi)=\sin\psi$, $S_0(\psi)=\psi$, and $S_{-1}(\psi)=\sinh\psi$.

In the closed case, $0<\psi<\pi$ continues smoothly through $\psi=\pi/2$, where $\chi$ ceased to be a usable radial coordinate. The endpoints are the two poles of this spherical spatial chart. Radial light rays now satisfy $d\psi=\pm d\eta$.

A plot of $\psi$ against $\eta$ now draws radial light at slopes $+1$ and $-1$. Multiplying a metric by a positive conformal factor preserves its null cones. It does not preserve proper times, physical lengths, or affine parameters of null geodesics. The prefactor $a^2$ still determines the physical lengths and times represented by that plot.

This distinction becomes especially useful for horizons: what matters is how much conformal time has elapsed or remains, not merely whether today's expansion rate sounds large.

### 19.8 The Hubble radius and the two cosmological horizons

At fixed cosmic time, radial proper distance from the origin along a spatial slice is $D=a(t)\psi$. A comoving object has fixed $\psi$, so

$$
\dot D=HD.
$$

This rate can exceed $c$ at sufficiently large $D$. It is a rate of change of a nonlocal separation defined using cosmic simultaneity, not the velocity measured when one object passes another in the same local inertial frame. Special relativity's local causal limit remains intact.

For a radial light ray,

$$
\dot D=HD\pm c.
$$

An inward-directed ray can initially have increasing proper distance when $HD>c$. Whether it later approaches us depends on the subsequent expansion history. This makes the Hubble radius a useful instantaneous scale but not generally an event horizon.

| Distance at cosmic time $t$ | Formula | Question it answers |
|---|---|---|
| Hubble radius | $D_H=c/H$ | Where does recession rate $HD$ equal $c$ on this cosmic-time slice? |
| Particle-horizon distance | $D_p=a(t)\int_{t_B}^{t}c\,dt'/a(t')$ | How far could light have traveled to us since the model's initial boundary? |
| Event-horizon distance | $D_e=a(t)\int_t^{t_{\rm max}}c\,dt'/a(t')$ | Which comoving sources can ever communicate with us in the modeled future? |

The relevant horizon exists with finite distance only when the corresponding integral converges, with global topology and the spacetime's actual domain also taken into account. The event-horizon upper limit is the future endpoint, often infinity; its existence therefore depends on future evolution.

For an ideal flat dust universe $a\propto t^{2/3}$ beginning at $t=0$,

$$
D_p=3ct,\qquad D_H=\frac32ct.
$$

The future event-horizon integral diverges if that evolution continues forever: there is no cosmological event horizon in this model. Two distinct present-day distances and one absent horizon have emerged from a single simple scale factor.

For exponentially expanding flat de Sitter slicing, the future event horizon is $D_e=c/H$. Its equality with the Hubble radius is a property of that special evolution, not a universal identity.

### 19.9 Does expansion stretch your atoms? And what exactly is dark energy?

FLRW describes a smoothed cosmological background. A bound atom, planetary system, or galaxy is a local solution with its own stresses and gravitational field. You cannot obtain its size evolution by multiplying every internal distance by the background scale factor while ignoring the forces that bind it.

Cosmological effects can appear as tiny tidal terms in suitable local approximations. Whether they matter is determined by comparing them with binding dynamics. “Everything stretches” is not the field equation; neither is “cosmology can never affect a bound system.” Specify the system and compare scales.

Dark matter and dark energy also play different dynamical roles. In the usual cosmological modeling, cold dark matter behaves approximately as pressureless matter, contributes to gravitational clustering, and has background density scaling approximately as $a^{-3}$. Dark energy labels the component or effective physics invoked for accelerated expansion; a cosmological constant is the simplest constant-$w=-1$ realization. The equations alone do not identify dark matter's particle properties or prove that dark energy is exactly a cosmological constant.

Type Ia supernovae are stellar explosions whose brightness can be calibrated using their observed light curves and spectra. Comparing that calibrated luminosity with the received flux defines a **luminosity distance**, worked out in Section 19.11. Historically, the relation between these distances and redshifts supplied evidence for accelerated expansion. A primary account is [Riess and collaborators, *Observational Evidence from Supernovae for an Accelerating Universe and a Cosmological Constant*](https://arxiv.org/abs/astro-ph/9805201). Such an inference connects calibrated observations to a model for light propagation and cosmic evolution; it is not a direct photograph of negative pressure.

The modern task is to confront expansion, lensing, clustering, and other observables together while checking systematics and assumptions. A successful fit within GR supports that description. It does not establish that every alternative gravitational theory is mathematically incapable of producing the same particular observations.

### 19.10 Comparing cosmological and black-hole curvature

FLRW has zero Weyl curvature. To check this rather than infer it from spatial flatness, define

$$
\mathcal A=\frac{\ddot a}{ac^2},\qquad
\mathcal B=\frac{H^2}{c^2}+\frac{k}{a^2}.
$$

The orthonormal curvature components from the connection calculation are $R_{i0j0}=-\mathcal A\delta_{ij}$ and $R_{ijkl}=\mathcal B(\delta_{ik}\delta_{jl}-\delta_{il}\delta_{jk})$, with the time-space mixed triples zero. They give $R_{00}=-3\mathcal A$, $R_{ij}=(\mathcal A+2\mathcal B)\delta_{ij}$, and $R=6(\mathcal A+\mathcal B)$. Substituting these in Chapter 9’s Weyl decomposition gives, for example,

$$
C_{0i0j}=\left[-\mathcal A+\frac12(4\mathcal A+2\mathcal B)
-(\mathcal A+\mathcal B)\right]\delta_{ij}=0.
$$

The spatial components cancel as $\mathcal B-(\mathcal A+2\mathcal B)+(\mathcal A+\mathcal B)=0$. The mixed components are already zero. All curvature is therefore in the Ricci part; the metric is **conformally flat**, as defined in Chapter 9. The Schwarzschild vacuum exterior has the opposite pattern: its Ricci tensor vanishes while its Weyl tensor carries the tidal field.

There is a useful further check. A radiation-filled FLRW solution with $\Lambda=0$ has $T=-\epsilon+3p=0$, so the traced Einstein equation gives $R=0$. Yet $R_{\mu\nu}$ is nonzero. The zero scalar is a cancellation in the contraction, not the absence of the individual Ricci components.

| Geometry or region | Ricci tensor | Weyl tensor | What this teaches |
|---|---|---|---|
| Minkowski spacetime | Zero | Zero | Full spacetime curvature vanishes |
| Schwarzschild vacuum exterior | Zero | Nonzero | Vacuum can contain tidal curvature |
| Nonempty radiation FLRW, $\Lambda=0$ | Nonzero, with scalar trace $R=0$ | Zero | Even zero scalar curvature need not mean zero Ricci curvature |
| de Sitter spacetime | $R_{\mu\nu}=\Lambda g_{\mu\nu}$ | Zero | A cosmological constant curves spacetime without Weyl tides |

The Einstein equation controls a particular contraction of curvature. Matter-filled cosmology, vacuum black holes, and vacuum gravitational waves demonstrate why that distinction matters. Geometry has both locally sourced structure and dynamical information carried through the spacetime solution.

Vanishing Weyl curvature does not mean vanishing geodesic deviation. De Sitter spacetime, for example, has isotropic relative acceleration of neighboring comoving geodesics. The Ricci–Weyl split distinguishes parts of the tidal geometry; it does not assign all measurable gravitational effects to Weyl alone.

### 19.11 Observe an expansion history

Consider a comoving source seen at redshift $z$, at radial coordinate $\psi$ from us. Let $a_0$ be the scale factor when we observe it. Its present radial distance along the cosmic-time slice is $D_C=a_0\psi$. A sphere at that coordinate has present area $4\pi[a_0S_k(\psi)]^2$, which defines the transverse comoving distance $D_M=a_0S_k(\psi)$. For flat spatial geometry these distances agree.

Suppose a small transverse feature had proper size $\ell$ when its light was emitted. The angular part of the metric gives $\ell\simeq a_{\rm em}S_k(\psi)\theta$ for its small observed angle $\theta$. The **angular-diameter distance** is the distance a Euclidean observer would infer from that size and angle:

$$
D_A\equiv\frac{\ell}{\theta}
=a_{\rm em}S_k(\psi)=\frac{D_M}{1+z}.
$$

Brightness supplies another measurement. Let the source radiate isotropically with luminosity $L$, its emitted energy per unit proper time summed over all wavelengths. The received flux $F$ is energy per unit detector area per unit observer time, also summed over wavelengths. The photons spread over area $4\pi D_M^2$. Each loses an energy factor $1/(1+z)$, and their arrival intervals grow by $1+z$. Thus

$$
F=\frac{L}{4\pi D_M^2(1+z)^2}.
$$

Define the **luminosity distance** by $F=L/(4\pi D_L^2)$. Comparing the two expressions gives

$$
D_L=(1+z)D_M=(1+z)^2D_A.
$$

At $z=1$, the same source has $D_L=4D_A$. The definitions differ because the brightness measurement includes two redshift effects that the angle measurement does not. This calculation assumes the smooth FLRW model, light wavelengths short compared with the curvature scale, and no absorption or conversion of photons along the beam. The worked example now obtains these distances from an expansion history.

Compare those three distances below. Changing the Hubble constant changes the overall distance scale. Changing the matter and vacuum fractions changes how expansion proceeded and therefore changes the shapes of the curves. The vertical axis uses gigaparsecs; one gigaparsec is one thousand megaparsecs, the unit used in the readouts.

<div data-lab-insert="distances"></div>

### 19.12 A collapsing surface can cross its horizon in finite proper time

A useful exact collapse model is a homogeneous pressureless ball, matched without a surface layer to a Schwarzschild exterior. It neglects pressure, rotation, inhomogeneity, and radiation. Use a closed FLRW interior,

$$
ds^2=-c^2d\tau^2+a(\eta)^2[d\chi^2+\sin^2\chi\,d\Omega^2],
\qquad c\,d\tau=a\,d\eta.
$$

The surface follows a fixed $0<\chi_0<\pi/2$. Starting at rest at maximum size, the dust Friedmann equation has the parametric solution

$$
a(\eta)=\frac{a_{\max}}2(1+\cos\eta),\qquad
\tau(\eta)=\frac{a_{\max}}{2c}(\eta+\sin\eta),
\qquad0\le\eta<\pi.
$$

To check it, differentiate with respect to $\eta$, use $d\tau/d\eta=a/c$, and substitute into the closed dust Friedmann equation with conserved $\rho a^3$. The initial equation fixes $\rho_{\max}=3c^2/(8\pi G_Na_{\max}^2)$, where $\rho$ is mass-equivalent energy density. The areal surface radius is $R=a\sin\chi_0$, and the mass matching condition is

$$
M=\frac{4\pi}{3}\rho R^3
=\frac{c^2a_{\max}}{2G_N}\sin^3\chi_0.
$$

This spherical gravitational mass is not the integral of rest density over the curved proper volume. The matching conditions require continuity of the induced metric and extrinsic curvature in the absence of a surface stress tensor. Zero pressure at the dust boundary makes this interior/exterior matching possible.

The surface reaches $r_s=2G_NM/c^2$ when $a/a_{\max}=\sin^2\chi_0$, hence at $\eta_h=\pi-2\chi_0$. Its proper time then is finite and smaller than the singular endpoint $\tau_{\rm sing}=\pi a_{\max}/(2c)$. For $\chi_0=\pi/6$, crossing occurs at $\eta_h=2\pi/3$, while the surface has shrunk to one quarter of its initial radius.

The event horizon inside the dust is an outgoing radial null line, $d\chi/d\eta=1$, traced backward from that crossing event. It obeys $\chi=\eta-\pi+3\chi_0$ until it reaches the centre. For the specified $\chi_0=\pi/6$ example, it begins at the centre at $\eta=\pi/2$, before the surface reaches its Schwarzschild radius. The horizon’s global definition and its smooth crossing by infalling matter are visible in the same solution. This exact dust model illustrates collapse; it is not a model of realistic stellar microphysics or an extension through its singular endpoint.

<a id="chapter-20"></a>

## 20. Initial data, constraints, and numerical relativity

### 20.1 An equation is not yet a prediction

Chapter 19 found both an expanding and a contracting branch of a cosmological solution. The field equation alone did not choose one: we also needed an initial scale and rate of change. The same need appears without cosmological symmetry. To evolve a general gravitational field, specify its spatial geometry and how that geometry is changing, together with the matter data.

The rate-of-change information is carried by **extrinsic curvature**, which Chapter 14 introduced as the change of a boundary’s normal direction. We will relate that definition to the evolving spatial metric. Four projections of Einstein’s equation constrain the allowed initial geometry, extrinsic curvature, and matter; they cannot all be chosen independently.

For this chapter set $c=1$, so time and length have the same units. Keep $G_N$ explicit.

### 20.2 Spatial slices, lapse, and shift

Choose spacelike hypersurfaces $\Sigma_t$ labeled by a coordinate $t$. Locally, wherever this foliation is valid, write the metric in **3+1 form**:

$$
ds^2=-N^2dt^2+\gamma_{ij}(dx^i+\beta^i dt)(dx^j+\beta^jdt).
$$

Here are the three ingredients.

| Object | What it describes | What it does not mean |
|---|---|---|
| $\gamma_{ij}$, the spatial metric | Distances measured within a slice | The whole spacetime metric |
| $N>0$, the lapse | Proper time separation between nearby slices along their unit normals: $d\tau=Ndt$ | A universal cosmic clock |
| $\beta^i$, the shift | How the coordinate grid slides sideways between slices | Matter necessarily moving through space |

Let $n^\mu$ be the future-directed unit normal, $n^\mu n_\mu=-1$. The coordinate time vector decomposes as

$$
\partial_t=Nn+\beta^i\partial_i,
\qquad
n^\mu=\left(\frac1N,-\frac{\beta^i}{N}\right).
$$

The sign of the shift has operational meaning: someone following a normal worldline has $dx^i/dt=-\beta^i$. The coordinates drift relative to that person.

For a flat-spacetime example, start with $ds^2=-dT^2+dX^2+dY^2+dZ^2$ and set $T=2t$, $X=x+vt$, $Y=y$, $Z=z$, with constant dimensionless $v$. The metric becomes

$$
ds^2=-4dt^2+(dx+vdt)^2+dy^2+dz^2.
$$

Here $N=2$, $\beta^x=v$, and $\gamma_{ij}=\delta_{ij}$. A normal observer stays at fixed $X$, so $dx/dt=-v$ and $d\tau=2dt$. Lapse changes the clock labeling; shift changes the spatial labeling between slices. This example has no spacetime curvature.

There need not be a convenient global slicing of an arbitrary spacetime. We will meet the additional causal conditions that support one in Chapter 22.

### 20.3 Extrinsic curvature and the change of spatial geometry

Extend the spatial projector to spacetime:

$$
\gamma_{\mu\nu}=g_{\mu\nu}+n_\mu n_\nu.
$$

It removes a vector's component normal to the slice. Define extrinsic curvature with the following sign convention:

$$
K_{\mu\nu}
=-\gamma_\mu{}^\alpha\gamma_\nu{}^\beta\nabla_\alpha n_\beta.
$$

The derivative asks how the normals change as we move along the slice. The projectors retain the part visible within the slice. A plane has parallel normals; a curved surface generally does not.

For tangent indices this becomes

$$
K_{ij}=-\frac12\mathcal L_n\gamma_{ij}
=-\frac1{2N}\left(\partial_t\gamma_{ij}
-D_i\beta_j-D_j\beta_i\right),
$$

where $D_i$ is the Levi-Civita derivative of $\gamma_{ij}$. The Lie derivative $\mathcal L$ measures change under the flow of a vector field. In this equation it subtracts change caused merely by sliding the coordinates.

Equivalently,

$$
\partial_t\gamma_{ij}=-2NK_{ij}+\mathcal L_\beta\gamma_{ij}.
$$

This is a precise version of “extrinsic curvature contains the velocity of the spatial metric.” The qualification matters: it is velocity relative to the chosen slicing, after correcting for coordinate drift.

**Extrinsic-curvature convention.** Chapter 14 used the boundary convention $K_{\mathrm{boundary}}=h^{\mu\nu}\nabla_\mu n_\nu$. For the same spacelike hypersurface and the same normal, the present ADM convention gives $K=-K_{\mathrm{boundary}}$. Other textbooks also differ in this choice. Every equation containing an odd number of $K$ factors must be translated consistently. A sign difference here is not a disagreement about expanding universes.

**Intrinsic and extrinsic curvature.** extrinsic curvature need not indicate spacetime curvature. Curved slices can be drawn inside flat Minkowski spacetime. Intrinsic spatial curvature, extrinsic curvature, and four-dimensional spacetime curvature are related objects, not synonyms.

### 20.4 Four constraints on the initial data

Define the matter energy and momentum seen by the normal observers:

$$
E=T_{\mu\nu}n^\mu n^\nu,
\qquad
j_i=-\gamma_i{}^\mu n^\nu T_{\mu\nu}.
$$

$E$ is not automatically the fluid's rest-frame density $\epsilon$: a moving fluid has extra energy in the normal frame. The minus sign in $j_i$ compensates for the timelike metric sign so that its ordinary local interpretation is momentum density.

The normal-normal projection of Einstein's equation is the **Hamiltonian constraint**:

$$
\boxed{{}^{(3)}R+K^2-K_{ij}K^{ij}=16\pi G_N E+2\Lambda.}
$$

Here $K=\gamma^{ij}K_{ij}$ and ${}^{(3)}R$ is the scalar curvature of the spatial metric. The three mixed normal-spatial projections give the **momentum constraints**:

$$
\boxed{D_j\left(K^{ij}-\gamma^{ij}K\right)=8\pi G_Nj^i.}
$$

These combinations follow by comparing spacetime transport with transport restricted to the slice. To calculate that comparison at a chosen slice, use Gaussian normal coordinates locally: $N=1$, $\beta^i=0$, and $ds^2=-dt^2+\gamma_{ij}(t,x)dx^idx^j$. The normal geodesics construct this chart until they cross. Its connection contains

$$
\begin{aligned}
\Gamma^0{}_{ij}&=-K_{ij},\\
\Gamma^i{}_{0j}&=-K^i{}_j,\\
\Gamma^i{}_{jk}&={}^{(3)}\Gamma^i{}_{jk}.
\end{aligned}
$$

In the purely spatial Riemann components, the derivative terms and spatial connection products form ${}^{(3)}R_{ijkl}$. The two products with intermediate index 0 remain:

$$
{}^{(4)}R_{ijkl}={}^{(3)}R_{ijkl}
+K_{ik}K_{jl}-K_{il}K_{jk}.
$$

This is the **Gauss relation**. Contracting with $\gamma^{ik}\gamma^{jl}$ gives ${}^{(3)}R+K^2-K_{ij}K^{ij}$. The same contraction of spacetime curvature equals $2G_{\mu\nu}n^\mu n^\nu$: the normal contributions in $R+2R_{\mu\nu}n^\mu n^\nu$ cancel, leaving just the spatial contraction. Thus

$$
2G_{\mu\nu}n^\mu n^\nu
={}^{(3)}R+K^2-K_{ij}K^{ij}.
$$

Projecting $G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi G_NT_{\mu\nu}$ twice along $n$ contributes $-\Lambda$, because $g(n,n)=-1$. Move it across and multiply by two: the $+2\Lambda$ in the constraint follows. The mixed curvature components in this chart give the **Codazzi relation**,

$$
{}^{(4)}R_{0ijk}=D_jK_{ik}-D_kK_{ij}.
$$

The ordinary derivatives come from differentiating $\Gamma^0{}_{ij}=-K_{ij}$; the remaining products supply the spatial covariant-derivative corrections. Contracting yields $G_{0i}=R_{0i}=D_iK-D_jK^j{}_i$. Since $T_{0i}=-j_i$ in this normal chart, the mixed field equation gives exactly the momentum constraint above. These projected identities are tensorial, so the result does not depend on having used the convenient chart to derive them.

These equations contain no second time derivative of the geometry. They constrain what can consistently exist on one slice. The 3+1 projection and this extrinsic-curvature convention are developed systematically in [Éric Gourgoulhon's author-written notes on the 3+1 formalism](https://arxiv.org/abs/gr-qc/0703035).

Suppose we try to prescribe positive matter density together with an exactly Euclidean spatial metric and $K_{ij}=0$. With $\Lambda=0$, the left side of the Hamiltonian constraint is zero, so it requires $E=0$. To describe that matter, we must change the spatial geometry, its extrinsic curvature, or both.

This is analogous to specifying an electric field with zero divergence everywhere while also inserting a charge. Evolution cannot repair an inconsistent starting point without changing the data.

### 20.5 Worked check: the Friedmann equation is an initial-data constraint

For homogeneous, isotropic slices,

$$
\gamma_{ij}=a^2(t)\bar\gamma_{ij},
\qquad N=1,\qquad \beta^i=0,
\qquad {}^{(3)}R=\frac{6k}{a^2}.
$$

Take normal observers comoving with the fluid, so $E=\epsilon$. From the definition,

$$
K_{ij}=-\frac12\partial_t(a^2\bar\gamma_{ij})
=-H\gamma_{ij},
\qquad H=\frac{\dot a}{a}.
$$

Therefore $K=-3H$, while $K_{ij}K^{ij}=3H^2$. The difference is $9H^2-3H^2=6H^2$. The Hamiltonian constraint becomes

$$
\frac{6k}{a^2}+6H^2=16\pi G_N\epsilon+2\Lambda,
$$

or

$$
\boxed{H^2+\frac{k}{a^2}
=\frac{8\pi G_N}{3}\epsilon+\frac\Lambda3.}
$$

The familiar cosmological equation is the statement that the initial geometry, expansion rate, and matter density fit together. Homogeneity made the constraint algebraic. In a binary-black-hole calculation, solving its spatially varying version is substantial work.

### 20.6 Evolution and the two physical degrees of freedom

The spatial Ricci projection contains the time derivative absent from the constraints. In the Gaussian normal chart used above, direct substitution of the same connection gives

$$
{}^{(4)}R_{ij}={}^{(3)}R_{ij}-\partial_tK_{ij}
+KK_{ij}-2K_{ik}K^k{}_j.
$$

For general lapse and shift, the time derivative becomes $N^{-1}(\partial_t-\mathcal L_\beta)K_{ij}$ and the projection has an additional term $-N^{-1}D_iD_jN$. Setting the vacuum Ricci tensor to zero, with $\Lambda=0$, gives

$$
(\partial_t-\mathcal L_\beta)K_{ij}
=-D_iD_jN
+N\left({}^{(3)}R_{ij}+KK_{ij}-2K_{ik}K^k{}_j\right).
$$

Read it together with the equation for $\partial_t\gamma_{ij}$. Spatial curvature and extrinsic-curvature products govern the next change of $K$; lapse gradients describe the acceleration associated with the chosen normal observers. Matter adds appropriate spatial stress and energy terms.

The Einstein-Hilbert action, after separating its boundary contribution, contains the bulk combination

$$
S_{\mathrm{bulk}}=\frac1{16\pi G_N}\int dt\,d^3x\,
N\sqrt\gamma\left({}^{(3)}R+K_{ij}K^{ij}-K^2-2\Lambda\right).
$$

Here $\gamma=\det(\gamma_{ij})$. One way to track the boundary contribution is the scalar identity

$$
{}^{(4)}R={}^{(3)}R+K_{ij}K^{ij}-K^2
-2\nabla_\mu(Kn^\mu+a^\mu),
$$

where $a^\mu=n^\nu\nabla_\nu n^\mu$ is the normal observers’ acceleration. Multiplying the last term by $\sqrt{-g}=N\sqrt\gamma$ turns it into an ordinary divergence, as in Chapter 14. Its boundary integral must be treated with the prescribed boundary data. The remaining interior terms give the bulk action displayed above.

There are no independent time derivatives of lapse and shift. In the Hamiltonian formulation they act as multipliers enforcing the constraints, rather than adding propagating gravitational polarizations.

Before counting, give **phase space** a concrete meaning. For a particle with coordinate $q$ and Lagrangian $L(q,\dot q)$, its conjugate momentum is $p=\partial L/\partial\dot q$. For $L=m\dot q^2/2-V(q)$ this gives $p=m\dot q$. A state requires both position and momentum: $(q,p)$ is one point of a two-dimensional phase space. A field has a coordinate value and its conjugate momentum at each spatial point. Conjugate momentum need not equal mass times velocity in a general Lagrangian; the derivative definition is the rule.

A constraint is an equation restricting the allowed states. Removing a redundant description is a separate operation. As a small model, start with $(q_1,q_2,p_1,p_2)$, impose $p_2=0$, and declare that changing $q_2$ does not change the physical state. The constraint removes one direction and the equivalence removes another, leaving the physical pair $(q_1,p_1)$.

The formal test uses the **Poisson bracket**, defined for ordinary canonical coordinates by

$$
\{F,G\}=\sum_i\left(
\frac{\partial F}{\partial q_i}\frac{\partial G}{\partial p_i}
-\frac{\partial F}{\partial p_i}\frac{\partial G}{\partial q_i}
\right).
$$

A constraint is **first-class** when its bracket with every constraint vanishes on the allowed constraint surface. In the regular canonical formulation of GR, the Hamiltonian and three momentum constraints are first-class and supply the associated gauge redundancy. Establishing their complete bracket algebra is an additional Hamiltonian calculation; we use that result here rather than deriving it from a count of components. Field-theory brackets replace the coordinate derivatives and sum above with functional derivatives and a spatial integral. The reduction to independent canonical variables is developed in [Arnowitt, Deser, and Misner's original account of GR dynamics](https://arxiv.org/abs/gr-qc/0405109).

Now count the metric sector, excluding lapse and shift as multipliers. The symmetric $\gamma_{ij}$ has six components. Its six conjugate momenta make twelve phase-space variables per spatial point. The four independent first-class constraints each remove one phase-space direction by imposing an equation and one by identifying gauge-equivalent descriptions:

$$
12-2\times4=4\quad\text{physical phase-space dimensions}.
$$

That means **two configuration degrees of freedom**, each with its conjugate momentum. In weak gravitational waves, these become the two familiar polarizations. This is a local count in ordinary four-dimensional GR; boundaries, topology, special backgrounds, and matter require additional care.

“Ten minus four equals six” does not perform this count. It subtracts coordinate functions while overlooking the constrained dynamical structure.

### 20.7 A stable spacetime simulator needs a good coordinate policy

Begin with a smaller question: can a computed solution look convincing while violating an equation it is supposed to obey? We can test this in the flat dust universe already solved in Chapter 19.

Measure the scale factor relative to its initial value, calling the ratio $A$. Measure elapsed time in units of the initial Hubble time, and call the resulting dimensionless time $t$. Write $V=dA/dt$ for the expansion rate. The dust acceleration equation and initial conditions become

$$
\dot A=V,\qquad \dot V=-\frac{1}{2A^2},
\qquad A(0)=V(0)=1.
$$

The Friedmann constraint is $\mathcal C=V^2-1/A=0$. Differentiating it gives $\dot{\mathcal C}=2V\dot V+\dot A/A^2=0$: an exact evolution preserves the constraint. A numerical evolution uses finite steps, so this cancellation need not remain exact.

The known solution $A(t)=(1+3t/2)^{2/3}$ gives us two checks. Compare the computed scale factor with the exact curve, then inspect the constraint residual. Halve the step and repeat, keeping the final time fixed. A smaller residual and a more accurate scale factor are related evidence, but they are different measurements.

<div data-lab-insert="evolution"></div>

<details class="checkpoint"><summary>How does the computer take one time step?</summary>

The state is the pair $y=(A,V)$, and its derivative is $f(y)=(V,-1/(2A^2))$. **Forward Euler** follows the current slope for one step $h$: $y_{n+1}=y_n+h f(y_n)$. It treats that slope as constant across the step.

The fourth-order **Runge–Kutta method**, abbreviated RK4, samples a beginning slope, two trial midpoint slopes, and a trial endpoint slope:

$$
k_1=f(y_n),\qquad k_2=f(y_n+hk_1/2),
$$
$$
k_3=f(y_n+hk_2/2),\qquad k_4=f(y_n+hk_3),
$$
$$
y_{n+1}=y_n+\frac h6(k_1+2k_2+2k_3+k_4).
$$

The weighted slopes account for the changing derivative inside the step. For smooth solutions in the regime where truncation error dominates, halving $h$ reduces the accumulated Euler error by roughly two and the RK4 error by roughly sixteen. This is a convergence expectation to test, rather than an error bound for an arbitrary calculation.

</details>

**Returning to a general spacetime.** The experiment evolves a homogeneous universe with no spatial grid. A full spacetime evolution must also handle coordinate freedom, disturbances propagating across the grid, and boundaries.

Einstein's equations contain gauge freedom, so their unreduced component form is not simply ten independent wave equations. A coordinate condition can expose the wave structure. In harmonic coordinates, for example,

$$
\Box_g x^\mu=0,
$$

and the principal, highest-derivative part of the reduced metric equations is schematically

$$
g^{\alpha\beta}\partial_\alpha\partial_\beta g_{\mu\nu}
=\text{lower-derivative geometric terms and matter sources}.
$$

The metric itself supplies the coefficients that determine wave propagation: the unknown metric appears in the coefficients of its own highest derivatives. Those highest derivatives enter linearly, which is the meaning of **quasilinear**.

A **well-posed** formulation has a solution, has the appropriate uniqueness, and makes that solution depend continuously on the initial data. The last requirement bounds how errors in the starting data affect the solution over a specified time interval. A formulation can be mathematically equivalent on exact constraint-satisfying solutions yet behave very differently when roundoff and discretization introduce small constraint violations. Generalized harmonic formulations prescribe the contracted connection through coordinate equations. The BSSN formulation, named for Baumgarte, Shapiro, Shibata, and Nakamura, instead separates the spatial volume factor from a unit-determinant spatial metric and separates the trace of extrinsic curvature from its trace-free part. It also evolves auxiliary connection variables. These are distinct organizations of the same physical solution, with different responses to numerical errors; deriving a full implementation goes beyond the homogeneous benchmark above.

The contracted Bianchi identity supplies constraint-propagation relations. With consistent matter evolution, exact constraints that hold initially continue to hold in a suitable exact evolution. A discretized evolution introduces errors, so constraint residuals must still be monitored and checked for convergence.

Initial conditions and boundary conditions play different roles. Initial data describe a spatial slice. At a finite simulation boundary, combinations of field disturbances propagate inward or outward at speeds set by the chosen equations; these combinations are called **characteristic fields**. Boundary data must handle the incoming combinations consistently, including physical radiation and changes in coordinates or constraint errors. For an isolated system one often approximates an asymptotically flat exterior; a reflecting boundary can send outgoing radiation back into the modeled region.

Some constraint formulations give spatial boundary-value equations of the same general type as Poisson’s equation, called **elliptic equations**. Solving them across a slice does not transmit a physical signal instantly. It constructs a mutually compatible initial state. Subsequent physical disturbances propagate according to the causal equations.

### 20.8 What uniqueness means when coordinates are free

Imagine a smooth relabeling of spacetime that is exactly the identity near the initial slice but changes labels inside a later empty region—the “hole.” Apply it to the metric and all physical fields. General covariance produces a new coordinate description satisfying the same initial data. Does that destroy determinism?

Only if you assume that bare manifold points already possess observable identities independently of every field. The two descriptions preserve coincidences: where a detector meets a pulse, how much proper time its clock records, what curvature its instruments measure. They represent the same physical solution when related by the appropriate gauge diffeomorphism.

A prediction should concern “the curvature measured when this clock reads this value,” not “the curvature at a label whose attachment to any physical event I am free to change.” Boundary symmetries require care: transformations acting nontrivially on prescribed asymptotic data can carry physical charges and are not all disposable gauge.

For suitable constraint-satisfying vacuum data, and for appropriate well-posed matter systems, the relevant uniqueness statement is uniqueness of the maximal globally hyperbolic development **up to diffeomorphism**. “Maximal” does not promise geodesic completeness or a nonsingular future. This is the landmark result of [Choquet-Bruhat and Geroch's original Cauchy-problem paper](https://projecteuclid.org/journals/communications-in-mathematical-physics/volume-14/issue-4/Global-aspects-of-the-Cauchy-problem-in-general-relativity/cmp/1103841822.pdf).

<a id="chapter-21"></a>

## 21. Local laboratory frames and differential forms

### 21.1 Converting coordinates to laboratory components

Coordinate bases are versatile, but they need not look like a laboratory's orthogonal ruler-and-clock axes. In spherical coordinates, a change of one radian is not a change of one meter. For a local experiment we often want an orthonormal basis instead.

For example, in flat cylindrical coordinates,

$$
ds^2=-c^2dt^2+dr^2+r^2d\phi^2+dz^2,
$$

the one-forms $c\,dt$, $dr$, $r\,d\phi$, and $dz$ directly measure components along orthonormal clock-and-ruler directions. The factor $r$ converts an angular coordinate increment into a local length. Generalize this construction by introducing four one-forms

$$
e^a=e^a{}_\mu dx^\mu,
$$

such that

$$
\boxed{g_{\mu\nu}=\eta_{ab}e^a{}_\mu e^b{}_\nu,\qquad
\eta_{ab}=\operatorname{diag}(-1,1,1,1).}
$$

In this chapter only, $a,b,c,d=0,1,2,3$ label **internal orthonormal-frame directions**, not the spatial indices $i,j,k$ used elsewhere. Greek indices still label spacetime coordinate components.

The $e^a{}_\mu$ are called a **tetrad**, **vierbein**, or **coframe**. Its inverse $e_a{}^\mu$ defines basis vectors $e_a=e_a{}^\mu\partial_\mu$. Their duality says $e^a(e_b)=\delta^a_b$. A vector's laboratory components are

$$
V^a=e^a{}_\mu V^\mu.
$$

The metric is a kind of matrix square built from $e$, but not an ordinary unique positive square root. Six choices remain free: at every point we may rotate the three laboratory axes and boost the laboratory's time axis.

More precisely, if $L^a{}_b(x)$ obeys $L^T\eta L=\eta$, then

$$
e'^a=L^a{}_b e^b
$$

produces the same metric. Sixteen tetrad components minus six local Lorentz freedoms leave the metric's ten components. Coordinate freedom remains as well; this count describes the additional frame representation, not the physical degrees of freedom counted in Chapter 20.

An orthonormal frame makes the metric’s frame components equal to $\eta_{ab}$ at every point where that frame is defined. Curvature can still be nonzero: the frame’s comparison law changes across the region. The polar-frame calculation below will distinguish this comparison law from curvature itself.

### 21.2 Oriented measurements and differential forms

A one-form takes one vector and returns a number. A two-form takes two vectors and returns an antisymmetric number, naturally measuring oriented area. A $p$-form generalizes this to $p$ directions.

The **wedge product** antisymmetrizes:

$$
dx\wedge dy=-dy\wedge dx,
\qquad dx\wedge dx=0.
$$

For one-forms $\alpha$ and $\beta$,

$$
(\alpha\wedge\beta)(V,W)
=\alpha(V)\beta(W)-\alpha(W)\beta(V).
$$

This is the determinant of a two-by-two array. It measures the signed parallelogram area seen by the two measuring devices. Exchange the sides and orientation reverses; use the same side twice and the area vanishes.

For a $p$-form and a $q$-form,

$$
\alpha\wedge\beta=(-1)^{pq}\beta\wedge\alpha.
$$

Thus two two-forms commute under the wedge product, while two one-forms anticommute. The sign follows from moving $p$ directions past $q$ directions: $pq$ exchanges.

The **exterior derivative** differentiates the coefficient functions and adds the derivative’s coordinate one-form on the left. For

$$
\alpha=\frac1{p!}\alpha_{\mu_1\ldots\mu_p}
dx^{\mu_1}\wedge\cdots\wedge dx^{\mu_p},
$$

its rule is

$$
d\alpha=\frac1{p!}\partial_\nu\alpha_{\mu_1\ldots\mu_p}
dx^\nu\wedge dx^{\mu_1}\wedge\cdots\wedge dx^{\mu_p}.
$$

The coefficient array is antisymmetric; $1/p!$ compensates for summing its $p!$ signed permutations. The derivative raises the form degree by one. For a scalar,

$$
df=\partial_\mu f\,dx^\mu.
$$

For a one-form $A=A_\mu dx^\mu$,

$$
dA=\frac12(\partial_\mu A_\nu-\partial_\nu A_\mu)
\,dx^\mu\wedge dx^\nu.
$$

The factor $1/2$ prevents counting each antisymmetric pair twice. For example, if $A=x^2dy$, then $dA=2x\,dx\wedge dy$.

Two rules do most of the work:

$$
d^2=0,
\qquad
d(\alpha\wedge\beta)=d\alpha\wedge\beta+(-1)^p\alpha\wedge d\beta.
$$

Why does $d^2f=0$? The second partial derivatives are symmetric under index exchange, while the wedge basis is antisymmetric. Their contraction cancels. This is the common engine behind “the curl of a gradient vanishes” and “the divergence of a curl vanishes.”

The exterior derivative needs no metric or connection. It does not tell you the full directional variation of an arbitrary tensor. It extracts a particular antisymmetric derivative of differential forms. It therefore complements $\nabla$; it does not replace it.

Forms also make Stokes' theorem compact:

$$
\int_\Omega d\alpha=\int_{\partial\Omega}\alpha.
$$

The boundary integral and interior derivative are two descriptions of the same accumulated oriented change. Appropriate orientations and smoothness are part of the statement.

### 21.3 Why an orthonormal frame needs a spin connection

Two nearby laboratories may choose differently rotated or boosted axes. Differentiating their component lists naively confuses physical change with a change of reference frame. That is precisely the problem that connections solve.

Introduce the matrix of one-forms

$$
\omega^a{}_b=\omega^a{}_{b\mu}dx^\mu,
$$

and define, for internal vector components,

$$
D_\mu V^a=\partial_\mu V^a+\omega^a{}_{b\mu}V^b.
$$

This is the **spin connection**, despite its usefulness even before spinors appear. Metric compatibility in the orthonormal frame implies

$$
\omega_{ab}=-\omega_{ba},
\qquad \omega_{ab}=\eta_{ac}\omega^c{}_b.
$$

Antisymmetry applies after lowering the first frame index. A boost component can therefore satisfy $\omega^0{}_1=\omega^1{}_0$ with both indices in the displayed mixed positions. Lowering the first index of the time component multiplies it by $\eta_{00}=-1$, which accounts for the apparent difference between these two statements.

The relationship to Christoffel symbols follows by demanding that conversion between coordinate and frame components commute with differentiation:

$$
\boxed{
\partial_\mu e^a{}_\nu
-\Gamma^\rho{}_{\mu\nu}e^a{}_\rho
+\omega^a{}_{b\mu}e^b{}_\nu=0.
}
$$

This is the **tetrad postulate**. It is a compatibility relation among two representations of the same connection and the map between their bases. Once the tetrad and Levi-Civita connection are specified, it determines the associated spin connection.

Under $V'=LV$, require $DV$ to transform as $D'V'=L(DV)$. Expanding $d(LV)$ produces an unwanted $(dL)V$ term. The connection cancels it precisely if

$$
\boxed{\omega'=L\omega L^{-1}-(dL)L^{-1}.}
$$

This is why a connection transforms inhomogeneously. The derivative of the position-dependent frame change produces the extra term.

### 21.4 Torsion and curvature in a moving frame

The torsion two-form is

$$
\mathcal T^a=de^a+\omega^a{}_b\wedge e^b.
$$

For the Levi-Civita connection of ordinary GR, $\mathcal T^a=0$, so

$$
\boxed{de^a+\omega^a{}_b\wedge e^b=0.}
$$

This is the torsion-free first Cartan structure equation. To connect it to Chapter 7, antisymmetrize the tetrad postulate in $\mu,\nu$. The derivative and spin-connection terms give

$$
\mathcal T^a{}_{\mu\nu}
=e^a{}_\rho(\Gamma^\rho{}_{\mu\nu}-\Gamma^\rho{}_{\nu\mu}).
$$

Thus the two-form expresses the same torsion tensor in frame components. Zero torsion together with metric compatibility determines $\omega$ from the tetrad.

The curvature two-form is

$$
\boxed{\mathcal R^a{}_b=d\omega^a{}_b
+\omega^a{}_c\wedge\omega^c{}_b.}
$$

This is the second structure equation. The matrix product includes a sum over $c$ and a wedge product of its one-form entries. Curvature has components

$$
\mathcal R^a{}_b=\frac12R^a{}_{b\mu\nu}
\,dx^\mu\wedge dx^\nu.
$$

With our Riemann convention these agree with the curvature defined by $[\nabla_\mu,\nabla_\nu]$. For a vector-valued form, $D=d+\omega\wedge$ combines exterior differentiation with the frame correction. Apply it twice to the component functions $V$:

$$
\begin{aligned}
D^2V&=d(\omega V)+\omega\wedge dV+\omega\wedge\omega V\\
&=(d\omega)V-\omega\wedge dV+\omega\wedge dV
+\omega\wedge\omega V\\
&=\mathcal R V.
\end{aligned}
$$

The derivatives of $V$ cancel. The remaining matrix is the same curvature that controls infinitesimal loop transport.

The connection's inhomogeneous transformation disappears from curvature:

$$
\mathcal R'=L\mathcal R L^{-1}.
$$

This does not mean its component matrix is invariant. It means curvature transforms tensorially, so observers can compare the same geometric object in their different frames. For a detailed frame-based development, see [David Tong's author-written chapter on connections and Cartan geometry](https://davidtong.org/teaching/general-relativity/grhtml/S3).

### 21.5 Worked example: a rotating frame can have connection without curvature

Consider the Euclidean plane, away from the origin, in polar coordinates:

$$
dl^2=dr^2+r^2d\phi^2,
\qquad e^1=dr,\quad e^2=r\,d\phi.
$$

This two-dimensional example uses only spatial frame indices. Compute

$$
de^1=0,
\qquad de^2=dr\wedge d\phi.
$$

Choose

$$
\omega^2{}_1=d\phi,
\qquad\omega^1{}_2=-d\phi.
$$

The second first-structure equation reads

$$
de^2+\omega^2{}_1\wedge e^1
=dr\wedge d\phi+d\phi\wedge dr=0.
$$

The first equation vanishes too, because $d\phi\wedge d\phi=0$. The nonzero connection records how the radial and angular unit vectors rotate as $\phi$ changes.

But

$$
\mathcal R^1{}_2=d(-d\phi)=0
$$

on a regular angular coordinate patch; the matrix wedge contribution also vanishes here. The plane is flat. The polar frame is undefined at the origin, but a bad frame does not create a physical curvature singularity there.

Now replace the plane by a sphere of radius $a$:

$$
e^1=a\,d\theta,
\qquad e^2=a\sin\theta\,d\phi.
$$

Then $de^2=a\cos\theta\,d\theta\wedge d\phi$. The same cancellation method gives

$$
\omega^2{}_1=\cos\theta\,d\phi,
\qquad\omega^1{}_2=-\cos\theta\,d\phi.
$$

Now the connection's coefficient varies with latitude:

$$
\mathcal R^1{}_2
=d(-\cos\theta\,d\phi)
=\sin\theta\,d\theta\wedge d\phi
=\frac1{a^2}e^1\wedge e^2.
$$

Its Gaussian curvature is $1/a^2$, and its scalar curvature is $2/a^2$. The same two-line machinery has distinguished a rotating choice of axes from actual curved geometry.

### 21.6 Frame symmetry and other gauge theories

Electromagnetism uses a potential one-form $A$ and field strength $F=dA$. In a **non-Abelian** gauge theory the internal transformations need not commute. Its connection is matrix-valued, so products of different connection matrices need not cancel. The curvature has the form $F=dA+A\wedge A$. The spin connection obeys the same geometric pattern.

The shared idea is a freedom to choose a local reference convention, accompanied by a connection that compares neighboring conventions. It is not an assertion that gravity is ordinary electromagnetism with a larger alphabet.

In GR, the tetrad ties the internal Lorentz frame to actual tangent directions: it connects the gauge description to rods, clocks, causal cones, and volume. The Einstein-Hilbert action is linear in curvature, while the usual Yang-Mills action is quadratic in its field strength. The choice of action gives these theories different equations of motion even though their connection and curvature formulas resemble one another.

<details class="history-note" data-no-narration>
<summary>Further calculation: how spinor frames rotate</summary>

Tetrads also let us couple spin-$1/2$ fields to gravity. A **spinor** has complex components whose rotation and boost rules differ from those of a spacetime vector. For example, a spin-$1/2$ state acquires a minus sign under a full $2\pi$ rotation and returns to itself after $4\pi$; an overall sign alone does not change its measurement probabilities. This is a property of a quantum transformation law, not a small object literally spinning inside the particle. Constructing that representation is new material from quantum theory, not a consequence we have already proved using tensors.

For the four-component Dirac spinor $\psi$, use four $4\times4$ **gamma matrices** $\gamma^a$, one for each local frame direction. Their entries act on the spinor components; the label $a$ is not a matrix-row index. The **anticommutator** is $\{A,B\}=AB+BA$, where matrix multiplication need not commute. Choose matrices satisfying

$$
\{\gamma^a,\gamma^b\}=2\eta^{ab}I.
$$

Here $I$ is the identity matrix. In our signature, the relation says $(\gamma^0)^2=-I$, $(\gamma^i)^2=I$ for each spatial direction, and distinct gamma matrices anticommute. The relation imports the algebra used for spinors; it does not supply the dynamics of a quantum field. With this convention, a compatible spinor derivative is

$$
D_\mu\psi=\partial_\mu\psi
+\frac14\omega_{ab\mu}\gamma^a\gamma^b\psi.
$$

The matrix algebra lets us check this frame law. Define $\Sigma^{ab}=[\gamma^a,\gamma^b]/4$. Using the anticommutator twice gives

$$
[\Sigma^{ab},\gamma^c]=\eta^{bc}\gamma^a-\eta^{ac}\gamma^b.
$$

The spinor connection $\omega_{ab\mu}\Sigma^{ab}/2=\omega_{ab\mu}\gamma^a\gamma^b/4$ therefore transforms the gamma matrices consistently with a Lorentz vector index. For a rotation in the 1–2 plane, its finite matrix can be written

$$
S(\theta)=\exp(\theta\gamma^1\gamma^2/2)
=I\cos(\theta/2)+\gamma^1\gamma^2\sin(\theta/2).
$$

The equality follows by separating the even and odd powers and using $(\gamma^1\gamma^2)^2=-I$. At $2\pi$ it is $-I$; at $4\pi$ it is $I$. This derives the half-angle rotation rule from the supplied matrix algebra. The direction sign depends on whether we rotate a frame or a state; either convention has the same full-turn behavior. Constructing quantum-field dynamics still requires additional physical input. The connection is still solving the familiar problem of comparing components defined using different local frames. Globally, the spinor transformation rules on overlapping patches must fit together consistently. Such a choice is called a **spin structure**, and its existence depends on topology. Local gamma matrices alone do not establish it. [Tong's introduction to the spinor representation](https://davidtong.org/teaching/quantum-field-theory/qfthtml/S4) provides that continuation; translate its metric-sign convention when comparing formulas.

</details>

### 21.7 What changes with an independent connection

Three different geometric properties deserve three different names:

| Property | Representative definition | What it measures |
|---|---|---|
| Curvature | $R^\rho{}_{\sigma\mu\nu}$ | Failure of infinitesimal parallel transport around loops to agree |
| Torsion | $T^\rho{}_{\mu\nu}=\Gamma^\rho{}_{\mu\nu}-\Gamma^\rho{}_{\nu\mu}$ in a coordinate basis | Antisymmetric part of the connection; covariantly, $T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$ |
| Nonmetricity | $Q_{\rho\mu\nu}=-\nabla_\rho g_{\mu\nu}$, with this chosen sign | Failure of the connection to preserve the metric under parallel transport |

Standard GR uses a torsion-free, metric-compatible connection, while allowing curvature. More general theories can change these assumptions. Calling a curved spacetime “twisted” in ordinary speech does not imply nonzero mathematical torsion.

In the **Palatini approach**, vary the metric and connection independently in an Einstein-Hilbert-type action. Under the usual assumptions—four dimensions, a nondegenerate metric, a torsion-free independent connection, and matter action independent of that connection—the connection equation enforces the Levi-Civita connection. Substituting it back recovers metric GR.

Why does this work? The action's curvature is linear in derivatives of the connection. Integrating by parts transfers those derivatives onto $\sqrt{-g}g^{\mu\nu}$. The resulting equation requires compatibility of the connection with that metric density; in dimensions above two, under these assumptions, it reduces to metric compatibility. Torsion freedom then selects the unique Levi-Civita connection.

There are important exceptions to the slogan “independent connection variation always gives GR.” For a completely general connection, a change $\Gamma^\rho{}_{\mu\nu}\mapsto\Gamma^\rho{}_{\mu\nu}+\delta^\rho{}_\nu A_\mu$ changes Ricci only by $\partial_\mu A_\nu-\partial_\nu A_\mu$. Contracting that antisymmetric change with $g^{\mu\nu}$ gives zero, so the scalar-curvature action alone cannot determine $A_\mu$. This is **projective freedom**. The added term generally introduces torsion, so it was excluded by the torsion-free assumption in Chapter 14. Connection-dependent matter changes the connection equation; spinor matter can source torsion in Einstein-Cartan formulations. Replacing $R$ by a nonlinear function $f(R)$ generally makes metric and Palatini variation different theories. The careful equivalence statement is analyzed in [Dadhich and Pons's paper on Einstein-Hilbert and Einstein-Palatini formulations](https://arxiv.org/abs/1010.0869).

Using forms, a corresponding first-order gravitational action can be written, with $c=1$ and a consistently chosen orientation,

$$
S=\frac1{32\pi G_N}\int
\varepsilon_{abcd}\,e^a\wedge e^b\wedge
\left(\mathcal R^{cd}-\frac\Lambda6e^c\wedge e^d\right).
$$

Here $\varepsilon_{0123}=+1$ is the internal alternating symbol and $\mathcal R^{cd}=\eta^{de}\mathcal R^c{}_e$. For an invertible tetrad, a Lorentz-compatible independent connection, and no torsion-sourcing matter, varying the connection imposes zero torsion; varying the tetrad gives Einstein's equation. The apparent change of language has exposed a new organization of the same dynamics.

To check the action’s normalization, the alternating-symbol contraction gives $\varepsilon_{abcd}e^a\wedge e^b\wedge\mathcal R^{cd}=2R\,\mathrm{vol}$ and $\varepsilon_{abcd}e^a\wedge e^b\wedge e^c\wedge e^d=24\,\mathrm{vol}$, where $\mathrm{vol}=\sqrt{-g}\,d^4x$ in the chosen orientation. The two terms therefore reproduce $(R-2\Lambda)\mathrm{vol}/(16\pi G_N)$. The frame variables give the same gravitational action when the stated compatibility and torsion conditions hold.

### 21.8 Your turn: make the sphere calculation work harder

The plane and sphere calculations in Section 21.5 used the same structure equations. Recover that method on a surface of revolution,

$$
ds^2=du^2+f(u)^2d\phi^2,\qquad f(u)>0.
$$

Here $u$ and $f$ have units of length and $\phi$ is dimensionless. Choose $e^1=du$ and $e^2=f(u)d\phi$. Before calculating, predict what distinguishes a rotating coframe from a genuinely curved surface.

**Try independently.** Find the connection one-forms and $\mathcal R^1{}_2$. Obtain the Gaussian curvature. Then compare $f(u)=u$, $f(u)=a\sin(u/a)$, and $f(u)=a\sinh(u/a)$ on regular patches. Finally, explain what happens for a cylinder with constant $f=a$.

<details class="checkpoint"><summary>Compare your derivation, including the signs</summary>

Differentiation gives $de^2=f'(u)du\wedge d\phi$. The torsion-free equation requires

$$
\omega^2{}_1=f'(u)d\phi,\qquad
\omega^1{}_2=-f'(u)d\phi.
$$

The diagonal connection entries vanish, so the matrix wedge term in this curvature component vanishes. Therefore

$$
\mathcal R^1{}_2=-f''(u)du\wedge d\phi
=-\frac{f''(u)}{f(u)}e^1\wedge e^2,
\qquad K=-\frac{f''}{f},\qquad R=2K.
$$

The plane has $K=0$ despite a nonzero connection in this polar coframe. The sphere has $K=1/a^2$; the hyperbolic metric has $K=-1/a^2$. The cylinder has $K=0$: its bending in an ambient three-dimensional picture is extrinsic and does not create intrinsic Gaussian curvature. The condition $f>0$ defines the regular coordinate/frame patch, not a claim that every excluded endpoint is a physical singularity.

</details>

**Change the problem.** If $f(u)=a\exp(u/a)$, determine $K$ and decide whether a nonzero connection alone would have told you its sign. Check the answer by differentiating $f$ twice, without referring to the three cases above.

<a id="chapter-22"></a>

## 22. Focusing, singularities, and black-hole thermodynamics

### 22.1 From one falling observer to a cloud of them

A geodesic describes one freely falling observer. Geodesic deviation describes the changing separation of nearby observers. A **congruence** is a smooth family of worldlines filling a region without crossing there. Think of an enormous cloud of tiny spacecraft, each with its engines off, carrying rulers to monitor its neighbors.

The cloud can expand, distort, and rotate. Those are different effects. A sphere becoming a larger sphere expands. A sphere becoming a same-volume ellipsoid shears. An ellipsoid turning without changing shape rotates.

Use $c=1$ through the focusing discussion and let the congruence have unit tangent $u^\mu$, with $u^\mu u_\mu=-1$. Its local rest-space metric is

$$
h_{\mu\nu}=g_{\mu\nu}+u_\mu u_\nu.
$$

Define the projected velocity-gradient tensor

$$
B_{\mu\nu}=h_\mu{}^\alpha h_\nu{}^\beta\nabla_\beta u_\alpha.
$$

It tells neighboring observers how their relative velocity depends, to first order, on their spatial separation. Split this three-dimensional linear map into its trace, symmetric traceless part, and antisymmetric part:

$$
\boxed{B_{\mu\nu}=\frac13\theta h_{\mu\nu}
+\sigma_{\mu\nu}+\omega_{\mu\nu}.}
$$

Explicitly,

$$
\theta=\nabla_\mu u^\mu,
\qquad
\sigma_{\mu\nu}=B_{(\mu\nu)}-\frac13\theta h_{\mu\nu},
\qquad
\omega_{\mu\nu}=B_{[\mu\nu]}.
$$

The equality between the projected trace and $\nabla_\mu u^\mu$ follows from differentiating the fixed normalization of $u$.

$\theta$ is **expansion**, $\sigma$ is **shear**, and $\omega$ is **vorticity** or twist. For an infinitesimal comoving volume $\mathcal V$,

$$
\theta=\frac1{\mathcal V}\frac{d\mathcal V}{d\tau}
=\frac{d}{d\tau}\ln\mathcal V.
$$

The trace is the fractional volume-growth rate because the first-order fractional change of a determinant is the trace of the underlying linear deformation. That is the same determinant identity that appeared when varying $\sqrt{-g}$.

There is also a direct bridge to geodesic deviation. For a commuting family of geodesics with separation vector $\xi$, $[u,\xi]=0$ implies

$$
\nabla_u\xi=\nabla_\xi u.
$$

In a transported rest frame, this is “separation velocity equals $B$ times separation.” Differentiating again and using the geodesic-deviation equation gives a matrix evolution law with a term $-B^2$ and a curvature term. Raychaudhuri's equation is its trace.

### 22.2 Deriving the Raychaudhuri equation

Start with the expansion and differentiate along the flow:

$$
\frac{d\theta}{d\tau}
=u^\rho\nabla_\rho(\nabla_\mu u^\mu).
$$

Commute the derivatives, using the Riemann convention of this book. The contraction contributes a minus Ricci term. Then apply the product rule:

$$
\frac{d\theta}{d\tau}
=\nabla_\mu(u^\rho\nabla_\rho u^\mu)
-(\nabla_\mu u^\rho)(\nabla_\rho u^\mu)
-R_{\mu\nu}u^\mu u^\nu.
$$

The first term is $\nabla_\mu a^\mu$, where $a^\mu=\nabla_u u^\mu$. It vanishes for a geodesic congruence. The second is the trace of the square of the velocity-gradient map. For geodesic flow its rest-space decomposition gives

$$
\operatorname{tr}(B^2)
=\frac13\theta^2+\sigma_{\mu\nu}\sigma^{\mu\nu}
-\omega_{\mu\nu}\omega^{\mu\nu}.
$$

Why the vorticity minus sign? A real antisymmetric matrix squares to a matrix with nonpositive trace. In two dimensions, the rotation generator

$$
\begin{pmatrix}0&-w\\w&0\end{pmatrix}
$$

squares to $-w^2I$. The trace-free symmetric matrix has a positive sum of squared eigenvalues. Cross terms vanish because a symmetric tensor contracted with an antisymmetric tensor is zero, and shear has zero trace.

Therefore, for a timelike geodesic congruence in four spacetime dimensions,

$$
\boxed{
\frac{d\theta}{d\tau}
=-\frac13\theta^2
-\sigma_{\mu\nu}\sigma^{\mu\nu}
+\omega_{\mu\nu}\omega^{\mu\nu}
-R_{\mu\nu}u^\mu u^\nu.
}
$$

For a normalized accelerated congruence, add $+\nabla_\mu a^\mu$ to this expression, with the same projected definitions. Rockets can alter the cloud's behavior; geodesic focusing theorems do not silently include thrust.

The terms describe distinct contributions:

- $-\theta^2/3$: convergence can reinforce itself even without curvature.
- $-\sigma^2$: stretching along some directions can accelerate volume focusing.
- $+\omega^2$: rotation opposes the simple focusing tendency.
- $-R_{\mu\nu}u^\mu u^\nu$: curvature directly changes the trace of relative acceleration.

The Weyl tensor is absent from the explicit last term, but it can generate shear, which then affects expansion through $-\sigma^2$. Vacuum curvature can matter enormously even when $R_{\mu\nu}=0$.

### 22.3 How an inequality becomes a finite-time prediction

Suppose the geodesics are orthogonal to a family of spacelike slices. Locally their covector is then $u_\mu=-N\partial_\mu t$, where $t$ labels the slices and $N$ normalizes $u$. Antisymmetrizing its derivative cancels the second derivatives of $t$. The terms left contain a factor $\partial_\mu t$; projecting both indices into a slice removes them. Thus $\omega_{\mu\nu}=0$ for this flow.

The converse local statement, that zero twist allows such orthogonal slices, is the codimension-one Frobenius integrability theorem. The focusing calculation below needs only the forward implication just checked.

Also suppose the **timelike convergence condition** holds:

$$
R_{\mu\nu}u^\mu u^\nu\ge0.
$$

Raychaudhuri then implies

$$
\frac{d\theta}{d\tau}\le-\frac13\theta^2.
$$

If the cloud starts converging, $\theta_0<0$, divide by $\theta^2>0$ and differentiate its reciprocal:

$$
\frac{d}{d\tau}\left(\frac1\theta\right)\ge\frac13.
$$

If the geodesics extend through the required interval, this inequality forces the initially negative reciprocal toward zero within proper time no larger than $3/|\theta_0|$: $\theta$ becomes unboundedly negative, and the smooth congruence develops a focal point or **caustic** by that bound. An earlier incomplete geodesic endpoint is another possibility. The focusing argument does not by itself guarantee that the geodesics exist for the entire interval.

**This is not yet a spacetime singularity.** Aim a family of straight worldlines at the same event in Minkowski spacetime. Their congruence focuses; each worldline continues perfectly well. What breaks is the single-valued smooth velocity field used to describe that overlapping family.

The volume also makes the focusing bound explicit. Put $v=(\mathcal V/\mathcal V_0)^{1/3}$, with $v(0)=1$. While the congruence is regular,

$$
\frac{v''}{v}=\frac{\dot\theta}{3}+\frac{\theta^2}{9}\le0.
$$

Its initial slope is $v'(0)=\theta_0/3<0$. Since that slope cannot increase, $v(\tau)\le1+\theta_0\tau/3$. A positive smooth volume therefore cannot persist beyond $3/|\theta_0|$. This establishes focusing if the geodesics extend that far; inferring spacetime incompleteness still requires the additional global argument in a singularity theorem.

### 22.4 Energy conditions and focusing

Einstein's equation converts curvature conditions into matter conditions, but it does not itself require ordinary matter to satisfy those conditions. They are additional hypotheses.

For a perfect fluid, useful pointwise conditions are:

| Condition | General idea | Perfect-fluid inequalities |
|---|---|---|
| Null energy condition, NEC | $T_{\mu\nu}k^\mu k^\nu\ge0$ for every null $k$ | $\epsilon+p\ge0$ |
| Weak energy condition, WEC | Every timelike observer measures nonnegative local energy density | $\epsilon\ge0$, $\epsilon+p\ge0$ |
| Dominant energy condition, DEC | Energy density is nonnegative and its flux is causal | $\epsilon\ge\lvert p\rvert$ |
| Strong energy condition, SEC | $(T_{\mu\nu}-\tfrac12Tg_{\mu\nu})v^\mu v^\nu\ge0$ for all timelike $v$ | $\epsilon+p\ge0$, $\epsilon+3p\ge0$ |

To verify the fluid inequalities, use its orthonormal rest frame and a unit timelike observer $v^{\hat\mu}=\gamma(1,\boldsymbol\beta)$, with $|\boldsymbol\beta|<1$. The measured density is

$$
T_{\mu\nu}v^\mu v^\nu=(\epsilon+p)\gamma^2-p.
$$

At rest this is $\epsilon$; as $\gamma$ becomes large its sign is controlled by $\epsilon+p$. Nonnegativity for every observer therefore requires both WEC inequalities. A null vector has the form $k^{\hat\mu}=q(1,\mathbf n)$ with $|\mathbf n|=1$, giving $T_{\mu\nu}k^\mu k^\nu=q^2(\epsilon+p)$ and the NEC.

For the SEC, add $T/2=(-\epsilon+3p)/2$ to the timelike contraction. Its value at rest is $(\epsilon+3p)/2$ and its large-$\gamma$ coefficient is again $\epsilon+p$. For the DEC, the energy-flux vector seen by $v$ is $J^{\hat\mu}=-T^{\hat\mu}{}_{\hat\nu}v^{\hat\nu}=(\gamma\epsilon,-\gamma p\boldsymbol\beta)$. Requiring it to be future causal for every $|\boldsymbol\beta|<1$ gives $\epsilon\ge0$ and $\epsilon^2\ge p^2$, or $\epsilon\ge|p|$.

For $\Lambda=0$, the SEC implies timelike convergence. If $\Lambda$ remains on the geometric side, however,

$$
R_{\mu\nu}u^\mu u^\nu
=8\pi G_N\left(T_{\mu\nu}u^\mu u^\nu+\frac12T\right)-\Lambda.
$$

For a comoving perfect-fluid observer this is $4\pi G_N(\epsilon+3p)-\Lambda$. Positive $\Lambda$ can defeat timelike focusing. Equivalently, move it into an effective vacuum stress tensor with $p_\Lambda=-\epsilon_\Lambda$: it violates the SEC when its density is positive, while saturating the NEC.

For null vectors, the trace and cosmological terms vanish because $g_{\mu\nu}k^\mu k^\nu=0$. The NEC therefore implies null convergence in GR even with $\Lambda$.

Classical scalar potentials can violate the SEC, and quantum fields can violate classical pointwise energy conditions more broadly. These are reasons to inspect a theorem's hypotheses carefully, not to call the theorem mistaken.

### 22.5 Trapped surfaces and what Penrose actually proved

A null ray has no unit rest frame: its tangent $k$ is perpendicular to itself. To isolate the two transverse directions, choose another null vector $l$ with $k\cdot l=-1$ and define

$$
q_{\mu\nu}=g_{\mu\nu}+k_\mu l_\nu+l_\mu k_\nu.
$$

This tensor removes both $k$ and $l$ components and supplies a positive metric on the remaining two-dimensional **screen**. Project the separation-velocity map onto that screen and split it into trace, shear, and twist as before. The trace is now an area-growth rate, so the trace part of the two-dimensional map is $\theta q_{\mu\nu}/2$.

For affinely parametrized geodesic rays, taking the trace of the same evolution calculation gives

$$
\frac{d\theta}{d\lambda}
=-\frac12\theta^2-\sigma_{\mu\nu}\sigma^{\mu\nu}
+\omega_{\mu\nu}\omega^{\mu\nu}
-R_{\mu\nu}k^\mu k^\nu.
$$

The shear and twist here live on the positive-definite two-dimensional screen transverse to the rays. An affine parameter is essential; a nonaffine parameter introduces an additional term proportional to $\theta$.

Take a compact spacelike two-surface without a boundary, such as a sphere, and send future light rays orthogonally away from it in both null-normal directions. For an ordinary sphere in flat space, the outward bundle grows in area and the inward bundle shrinks. A **future trapped surface** has negative expansion in both directions. Even the outward-directed light bundle initially loses cross-sectional area.

This is a local geometric condition on the surface and its null normals. It does not say that a photon locally travels more slowly than light, nor does it require a coordinate speed to become negative.

One standard form of Penrose's theorem says that a sufficiently regular spacetime with a noncompact Cauchy hypersurface, null convergence, and a closed future trapped surface must be future null geodesically incomplete. The theorem combines focusing with global causal geometry; it does not assume spherical symmetry. The original result is [Penrose's 1965 paper, “Gravitational Collapse and Space-Time Singularities”](https://link.aps.org/doi/10.1103/PhysRevLett.14.57).

**Geodesic incompleteness** means at least one inextendible geodesic has finite affine length in the relevant direction; for timelike geodesics, proper time is the physical parameter. It does not universally mean that a curvature scalar tends to infinity. The theorem does not supply a location, a topology, or a detailed microscopic description of “the singularity.”

Even incompleteness must be interpreted carefully: deleting one point from otherwise regular Minkowski spacetime creates incomplete geodesics artificially. One must consider extendibility and which spacetime has actually been specified. Conversely, a coordinate singularity that disappears in a larger smooth chart is not evidence that physics has ended.

The theorem applies without assuming a spherical source. Its conclusion is incompleteness under the stated global and convergence conditions, even when the matter distribution is less symmetric than the examples solved earlier.

### 22.6 Horizons are about causal access; predictability needs another definition

In an asymptotically flat spacetime, the black-hole region consists of events unable to send a causal signal to future null infinity $\mathscr I^+$, the ideal destination of escaping light. Its boundary is the **event horizon**:

$$
\mathcal H^+=\partial J^-(\mathscr I^+).
$$

$J^-(\mathscr I^+)$ denotes the causal past of that destination. This definition depends on the entire future spacetime. An event horizon is not generally locatable using measurements made at one point and one instant.

A marginally outer trapped surface instead has vanishing outward null expansion, usually with negative inward expansion in the black-hole setting. Under suitable conditions an apparent horizon is the outer boundary of the trapped region on a chosen slice. These are valuable tools for dynamical calculations, but they depend on slicing and need not coincide with the event horizon.

For predictability, define the future **domain of dependence** $D^+(\Sigma)$: an event belongs to it if every past-inextendible causal curve through that event intersects $\Sigma$. No causal influence can arrive there without passing through the supplied initial data.

A **Cauchy surface** meets every inextendible causal curve exactly once. A spacetime admitting such a surface is globally hyperbolic, in the usual boundary-free setting. This is the natural arena for the initial-value description of Chapter 20.

A **Cauchy horizon** bounds a domain of dependence. Beyond it, initial data on the chosen surface no longer control every possible incoming influence. It is different from an event horizon: crossing a black-hole event horizon need not destroy local predictability. Inner horizons in idealized charged or rotating solutions motivate the question of whether such extendible boundaries survive generic perturbations. Strong cosmic censorship studies this issue, and its precise claims depend on the matter model and the allowed regularity of extensions.

A final geometric tool helps organize these questions. Under a smooth positive conformal rescaling $g_{\mu\nu}\mapsto\Omega^2g_{\mu\nu}$, null cones are unchanged. Proper times and distances change. Conformal diagrams exploit this separation to compress enormous regions while preserving causal relations; they are maps of who can signal whom, not faithful scale drawings.

### 22.7 A horizon gets a temperature

Restore $c$ and $\hbar$. For a Schwarzschild black hole,

$$
r_s=\frac{2G_NM}{c^2},
\qquad A=4\pi r_s^2.
$$

A short derivation reveals why a temperature appears. Near the horizon write $r=r_s+x$, with $x\ll r_s$, so $1-r_s/r\approx x/r_s$. Continue the stationary time coordinate to imaginary time $t=-i\tau_E$. The near-horizon radial-time metric becomes

$$
ds_E^2\approx\frac{x}{r_s}c^2d\tau_E^2+\frac{r_s}{x}dx^2.
$$

Introduce a radial proper-distance coordinate $\varrho=2\sqrt{r_sx}$. Direct substitution gives

$$
ds_E^2\approx d\varrho^2
+\varrho^2\left(\frac{c\,d\tau_E}{2r_s}\right)^2.
$$

This is a flat plane in polar coordinates. Its angular coordinate is $c\tau_E/(2r_s)$. Smoothness at the origin requires that angle to have period $2\pi$, so imaginary time has period

$$
\Delta\tau_E=\frac{4\pi r_s}{c}
=\frac{8\pi G_NM}{c^3}.
$$

Quantum statistical mechanics identifies thermal equilibrium with imaginary-time period $\hbar/(k_BT)$. Equating these periods yields

$$
\boxed{T_H=\frac{\hbar c^3}{8\pi G_NMk_B}.}
$$

This Euclidean argument characterizes the regular stationary thermal construction. Deriving the outgoing flux in a collapse spacetime involves a quantum-field calculation with the appropriate state and boundary conditions; it yields the same Hawking temperature at infinity, with frequency-dependent transmission factors modifying an ideal blackbody spectrum. The calculation is semiclassical, not a complete quantization of spacetime. See [Wald's research review of black-hole thermodynamics](https://arxiv.org/abs/gr-qc/9912119).

The commonly illustrated story of a particle pair appearing exactly on the horizon is a heuristic, not this derivation. Hawking radiation depends on quantum field modes, the state, and the global relation between early and late notions of positive frequency. It is not adequately explained by assigning ordinary local particle trajectories to vacuum fluctuations.

### 22.8 Entropy is written in area

For the nonrotating, uncharged family, the first law is

$$
d(Mc^2)=T_H\,dS_{\mathrm{BH}}.
$$

Substitute $T_H$ and solve for the entropy change:

$$
dS_{\mathrm{BH}}=\frac{8\pi k_BG_NM}{\hbar c}\,dM.
$$

Integrating gives, with the conventional additive normalization,

$$
S_{\mathrm{BH}}=\frac{4\pi k_BG_NM^2}{\hbar c}
=\boxed{\frac{k_BAc^3}{4\hbar G_N}
=\frac{k_BA}{4\ell_P^2}},
\qquad
\ell_P=\sqrt{\frac{\hbar G_N}{c^3}}.
$$

For ordinary extensive matter at fixed local conditions, doubling volume doubles entropy. Here the entropy scales with horizon area: doubling the Schwarzschild mass multiplies both area and entropy by four. The formula determines that scaling without specifying microscopic constituents of the horizon.

Since $T_H\propto M^{-1}$, a Schwarzschild black hole becomes hotter as it loses mass. Its **heat capacity**, $C=d(Mc^2)/dT_H=-Mc^2/T_H$, is negative. A slightly hotter hole loses energy to a bath and becomes hotter still, rather than relaxing back by the usual positive-heat-capacity mechanism. Equilibrium therefore requires an analysis of the whole system and its boundary conditions.

The classical horizon-area theorem requires the relevant convergence and global regularity assumptions. Hawking evaporation does not contradict it: the quantum stress tensor need not satisfy the classical energy hypothesis, and the horizon area can decrease. The thermodynamic quantity then involves generalized entropy,

$$
S_{\mathrm{gen}}=\frac{k_BA}{4\ell_P^2}+S_{\mathrm{outside}},
$$

with the quantum-field entropy and gravitational parameters treated consistently under **renormalization**. This means that when short-distance field contributions are regulated, the theory’s parameters must be adjusted consistently so the physical prediction does not depend on the arbitrary regulator. Chapter 23 develops that distinction between a regulated intermediate expression and a prediction. The generalized second law has substantial support and proofs in specified settings; it should not be promoted without qualifications to a theorem covering every unknown quantum-gravitational process.

### 22.9 Classical area increase, with the assumptions visible

For horizon-generating null geodesics, the vorticity vanishes and the screen has two dimensions. In an affine parameter $\lambda$, Raychaudhuri becomes

$$
\frac{d\theta}{d\lambda}
=-\frac12\theta^2-\sigma_{ab}\sigma^{ab}
-R_{\mu\nu}k^\mu k^\nu.
$$

The null energy condition, together with Einstein's equation, makes the last contraction nonnegative; the cosmological term drops out because $g_{\mu\nu}k^\mu k^\nu=0$. If the horizon expansion were negative, the inequality would force a future caustic. Under the global regularity and predictability assumptions of the classical area theorem, horizon generators cannot end in that way on the future horizon. This yields nonnegative expansion and nondecreasing horizon area. The global step is essential; a local differential equation alone does not prove the theorem.

For a simple numerical illustration, imagine two initially well-separated, nonspinning holes of equal mass $M$, ending in a nonspinning hole of mass $M_f$. Since a Schwarzschild area is $16\pi G_N^2M^2/c^4$, area increase requires

$$
M_f^2\ge2M^2,\qquad M_f\ge\sqrt2\,M.
$$

With initial total energy approximately $2Mc^2$, the radiated fraction is consequently at most $1-1/\sqrt2\simeq29.3\%$ under these idealizations. This is an upper bound, not the predicted emission efficiency. A spinning remnant requires the Kerr area formula, so applying $A\propto M^2$ blindly to a measured merger would be wrong.

For an uncharged stationary rotating black hole, the first law can be written in SI units as

$$
d(Mc^2)=\frac{\kappa_{\rm sg}c^2}{8\pi G_N}\,dA+\Omega_H\,dJ.
$$

Here $\kappa_{\rm sg}$ is **surface gravity** with acceleration units, $\Omega_H$ is horizon angular velocity, and $J$ is angular momentum. For Schwarzschild, surface gravity is the limiting hovering acceleration after correcting by its redshift factor:

$$
\kappa_{\rm sg}=\lim_{r\to r_s^+}N(r)a_{\rm proper}(r)
=\frac{G_NM}{r_s^2}=\frac{c^2}{2r_s}.
$$

The local hovering acceleration diverges; this redshifted limit remains finite and uses the clock normalization at infinity.

For the nonextremal Kerr family, $|a_K|<m$, the corresponding quantities are

$$
\begin{aligned}
A&=4\pi(r_+^2+a_K^2),\\
\Omega_H&=\frac{ca_K}{r_+^2+a_K^2},\\
\kappa_{\rm sg}&=\frac{c^2(r_+-r_-)}{2(r_+^2+a_K^2)}.
\end{aligned}
$$

These formulas use the horizon radii defined in Section 17.7. The area follows by integrating the horizon cross-section: $\sqrt{g_{\theta\theta}g_{\phi\phi}}=(r_+^2+a_K^2)\sin\theta$. The angular velocity is the horizon limit of $-g_{t\phi}/g_{\phi\phi}$. To check the first law within this family, differentiate $r_+^2-2mr_++a_K^2=0$, obtaining $(r_+-m)dr_+=r_+dm-a_Kda_K$. Substitute that relation into $dA$, with $M=c^2m/G_N$ and $J=c^3ma_K/G_N$. The two terms on the right reduce to $c^4dm/G_N=d(Mc^2)$. This family calculation verifies the coefficients; the general horizon mechanics law has broader hypotheses. With $T_H=\hbar\kappa_{\rm sg}/(2\pi c k_B)$ and $S_{\rm BH}=k_BAc^3/(4\hbar G_N)$, the area term equals $T_HdS_{\rm BH}$. Surface gravity is constant on an equilibrium horizon under the zeroth law's assumptions. The classical second law is area increase; quantum evaporation calls for generalized entropy instead. The various third-law formulations need additional qualifications and are not needed for this derivation. [Wald's account of the laws and their assumptions](https://arxiv.org/abs/gr-qc/9912119).

### 22.10 The black-hole information question

Classical uncertainty means we do not know which state a system has. Quantum theory also has **entanglement**: two subsystems can have a definite joint state even when neither has a definite pure state on its own. A **pure state** describes the complete quantum state; a **mixed state** describes uncertainty or the reduced description of a subsystem. **Unitary evolution** is the reversible state evolution of an isolated quantum system in ordinary quantum mechanics. These definitions are enough to state the puzzle, though not to reproduce a quantum-field calculation.

In the leading semiclassical account of a collapsing black hole, outgoing radiation is entangled with degrees of freedom behind the horizon. An observer with access only to the exterior describes approximately thermal radiation, modified by propagation through the surrounding geometry. A thermal-looking spectrum alone does not prove that all correlations are absent.

The tension appears when we combine several claims: a pure initial state, complete evaporation with no remaining hidden system, a final radiation state with irretrievably lost correlations, and unitary evolution of the entire isolated process. Those claims cannot all hold. The classical no-hair description of a stationary exterior is not, by itself, a proof that a quantum state has no microscopic information.

The entropy of radiation expected in a unitary evaporation rises while the radiation is entangled with the remaining hole, then eventually falls to zero if all that remains is the final pure radiation state. This qualitative rise-and-fall behavior is called the **Page curve**. In specified semiclassical models, calculations of radiation entropy include an **island**: an interior region whose field correlations contribute to the entropy assigned to the radiation. The calculation varies candidate island boundaries to make the generalized entropy stationary and selects the smallest admissible value. The no-island candidate can dominate early and an island candidate later, producing a Page-shaped curve. The underlying gravitational integral sums over candidate field and geometry histories weighted by their action. Its stationary contributions are called **saddle points**; additional contributions of this kind produce the island prescription in these models. These results concern specified quantum-gravitational calculations; they do not constitute direct measurements of astrophysical evaporation or a microscopic account valid for every black hole. [Almheiri and collaborators' review](https://arxiv.org/abs/2006.06872).

The boundary of the book is visible here. The classical Einstein equation alone cannot decide how quantum information is recovered. It supplies the geometry in which the question becomes sharp.

<a id="chapter-23"></a>

## 23. Gravity as an effective theory and its open questions

### 23.1 A theory can be incomplete without being unreliable

A laboratory measurement has a finite resolution. At wavelengths much longer than an unknown microscopic scale, we can organize possible gravitational corrections by how small they are at that resolution. This is the **effective field theory (EFT)** approach to quantum gravity.

An effective theory describes the degrees of freedom accessible at a chosen resolution. It represents unresolved shorter-distance physics through coefficients multiplying allowed local interactions. It does not require us to know every microscopic detail before predicting a long-wavelength experiment.

Think about sound in a solid. At long wavelengths, elasticity uses displacement, density, and a few elastic constants. Its predictions can be excellent without tracking every electron. If you demand wavelengths comparable to atomic separations, the continuum expansion loses its organizing advantage. Gravity's microscopic completion need not resemble a crystal; the analogy concerns separation of scales, not a claim that spacetime is an atomic material.

The quantum EFT treatment separates calculable long-distance effects from unknown short-distance coefficients. This is the central result of [Donoghue's original work on general relativity as an effective field theory](https://arxiv.org/abs/gr-qc/9405057).

### 23.2 Why unresolved heavy physics becomes derivatives

Use natural units $c=\hbar=1$ in this subsection. A simple algebraic model explains the expansion. Suppose a heavy field $X$ responds to a source $J$ through

$$
(M_*^2-\Box)X=J.
$$

Formally,

$$
X=\frac1{M_*^2-\Box}J
=\frac1{M_*^2}\left(1+\frac\Box{M_*^2}
+\frac{\Box^2}{M_*^4}+\cdots\right)J.
$$

This is the geometric series $1/(1-z)=1+z+z^2+\cdots$, now applied to a differential operator. It is useful when the source varies on scales for which the relevant derivatives are small compared with $M_*^2$. At higher frequencies the expansion fails, and the heavy field's independent dynamics must be restored.

The inverse operator also needs initial or boundary conditions, just as the Green function did in Chapter 18. The displayed series describes the slowly varying sourced response; it does not include an independently excited fast solution of the homogeneous heavy-field equation.

In a quantum calculation, **matching** means choosing the effective coefficients so that it reproduces the low-energy predictions of a more detailed theory. Perturbative quantum corrections involve integrals over intermediate modes. Some are called **loop corrections**, after the closed loops in diagrams that organize those integrals; they are not literal particle trajectories. Contributions from arbitrarily large momenta may require a regulator. **Renormalization** adjusts the coefficients consistently with that regulator, fixing measured quantities so that predictions to the retained order do not depend on this intermediate choice.

For a generally covariant metric theory, local gravitational interactions must be scalar combinations of curvature and covariant derivatives, integrated with the invariant volume. In these units, define the **reduced Planck mass** by

$$
M_{\mathrm{Pl}}^2=\frac1{8\pi G_N}.
$$

A schematic local EFT action is

$$
S_{\mathrm{local}}=\int d^4x\sqrt{-g}\left[
\frac{M_{\mathrm{Pl}}^2}{2}(R-2\Lambda)
+a_1R^2+a_2R_{\mu\nu}R^{\mu\nu}
+a_3R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}
+\sum_i\frac{b_i}{M_*^2}\mathcal O_i^{(6)}+\cdots
\right]+S_{\mathrm{light}}.
$$

The symbols $\mathcal O_i^{(6)}$ denote local scalar operators of mass dimension six, such as suitable cubic-curvature contractions. $S_{\mathrm{light}}$ contains the light matter fields retained explicitly.

Here **mass dimension** means the power of mass carried by a quantity’s units when $c=\hbar=1$. Length and time then have inverse-mass units. For the dimensional count, choose length-valued local coordinates and a dimensionless metric. A coordinate then has mass dimension $-1$, a derivative has dimension $+1$, and curvature has dimension $+2$. The measure $d^4x$ has dimension $-4$. Thus $M_{\mathrm{Pl}}^2R$, $R^2$, and $\mathcal O^{(6)}/M_*^2$ all have dimension $+4$, as required for a dimensionless action. The $a_i$ and $b_i$ are dimensionless in this notation. $M_*$ is a heavy-physics or cutoff scale; it need not equal $M_{\mathrm{Pl}}$.

Generic derivative power counting compares curvature-squared terms with the Einstein term at relative order $a_i\mathcal R_*/M_{\mathrm{Pl}}^2$, where $\mathcal R_*$ denotes a characteristic magnitude of curvature components in a physically specified orthonormal frame, with mass dimension two. This estimate organizes possible corrections; specific operators can vanish on particular backgrounds. In four dimensions, constant-coefficient local curvature-squared terms produce no bulk correction when evaluated on a Ricci-flat vacuum solution: variations of $R^2$ and $R_{\mu\nu}R^{\mu\nu}$ vanish there, and the remaining quadratic contraction is related to them by the Gauss–Bonnet combination below. Nonzero Weyl curvature still matters for higher operators and for EFT validity. The actual coefficients determine the suppression scale. “Low energy” is a quantitative hierarchy, not a promise that every coefficient is conveniently small.

The displayed curvature-squared basis is intentionally redundant. In four dimensions the constant-coefficient Gauss-Bonnet combination

$$
R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}
-4R_{\mu\nu}R^{\mu\nu}+R^2
$$

does not change local bulk equations under the appropriate variational boundary conditions. A **field redefinition** changes the variables used to describe the same low-energy configurations. For a small local change $g\mapsto g+\delta g$, the action changes at first order by its field equation contracted with $\delta g$, plus boundary terms. Operators proportional to the leading equations can therefore be exchanged for other terms at the corresponding perturbative order. In a coupled theory, this can move contributions into matter interactions; all fields and observables must be transformed consistently. Counting written terms is not the same as counting measurable new parameters.

Massless quantum fields also produce nonlocal contributions, schematically involving expressions such as $R\log(-\Box/\mu^2)R$. They cannot all be hidden in a finite list of local constants: massless particles propagate over long distances. Here $\mu$ is an arbitrary reference energy, the **renormalization scale**; its dependence cancels with the corresponding scale dependence of the coefficients in a physical prediction.

The logarithm of an operator can be understood through its modes. In Euclidean coordinates, a mode $e^{i\mathbf k\cdot\mathbf x}$ is an eigenfunction of $-\nabla^2$ with eigenvalue $|\mathbf k|^2$. Acting with $\log(-\nabla^2/\mu^2)$ multiplies that mode by $\log(|\mathbf k|^2/\mu^2)$. This multiplier cannot be represented by a finite polynomial in derivatives. Reassembling the modes produces a response depending on field values across a region, which is the meaning of **nonlocal** here. The Lorentzian expression needs an additional state and boundary prescription.

### 23.3 Nonrenormalizable does not mean nonpredictive

A perturbatively renormalizable theory can absorb ultraviolet divergences into a fixed finite set of couplings at all orders. Einstein gravity, treated as a quantum theory about a suitable background, requires successively higher-order operators. It is not perturbatively renormalizable in that narrow sense.

EFT asks a different question: **how many parameters contribute at the accuracy of this experiment?** At a fixed order in the low-energy expansion, only finitely many operators contribute. Determine their coefficients by measurement or matching to a more microscopic theory, and the remaining predictions at that order follow.

It resembles approximating a smooth function by a Taylor series. An arbitrary function contains infinitely many coefficients, but a controlled second-order approximation does not require knowing the coefficient of $x^{47}$. The crucial requirement is a valid small expansion parameter and an estimate of neglected terms.

Quantum gravitational loop corrections often carry powers of energy divided by the Planck scale, along with loop factors. In a long-distance problem, a characteristic quantum ratio is

$$
\frac{\ell_P^2}{L^2}
=\frac{\hbar G_N}{c^3L^2}.
$$

A classical strong-gravity ratio is instead

$$
\frac{G_NM}{c^2L}.
$$

These are different. Near the horizon of a large black hole, the second can be order unity while the first is tiny. Strong classical gravity is not automatically Planckian quantum gravity. Nor must one expand about flat space to use low-energy reasoning; curved backgrounds can be treated when their physical scales and the quantum state allow a controlled approximation. See [Donoghue's review of quantum GR and its effective-theory limits](https://arxiv.org/abs/2211.09902).

**Using a truncated equation.** if we truncate an EFT and then solve its higher-derivative equations exactly at arbitrarily high frequency, we may find extra exponentially growing solutions, called runaways, or extra modes with the wrong kinetic-energy sign, called ghosts. That extrapolates the truncated expression beyond the expansion that justified it. Consistent EFT calculations treat higher-order corrections perturbatively. For example, **order reduction** substitutes the leading equation into higher-derivative correction terms and retains only the desired perturbative order, rather than treating every new high-frequency solution as an independent physical mode. Suitable field redefinitions can serve a related purpose. An extra physical pole genuinely below the proposed cutoff would require reexamining the field content, not dismissing it by slogan. These distinctions are developed in [Solomon and Trodden's research on higher derivatives in EFT](https://arxiv.org/abs/1709.09695).

### 23.4 Consistent interactions of a spin-2 field

There is another way to approach Einstein's equation. Begin with a free massless spin-2 field $h_{\mu\nu}$ in Minkowski spacetime. Its linear gauge freedom has the form

$$
h_{\mu\nu}\mapsto h_{\mu\nu}
+\partial_\mu\xi_\nu+\partial_\nu\xi_\mu.
$$

This removes unphysical components and is related to the two propagating polarizations. Couple $h$ to matter schematically through

$$
S_{\mathrm{int}}\propto\int d^4x\,h_{\mu\nu}T^{\mu\nu}.
$$

Under the gauge transformation, integration by parts makes its variation proportional to $\xi_\nu\partial_\mu T^{\mu\nu}$. Linear gauge consistency therefore wants the source to be conserved.

But once matter interacts with gravity, it exchanges energy and momentum with the gravitational field. Matter stress alone cannot continue to serve as an independently conserved source in the naive flat-background equation. The field must also respond to its own contribution. That changes its dynamics, which changes its contribution again. The nonlinear completion reorganizes this self-coupling into GR under the relevant assumptions.

The logic is powerful: a universally interacting massless spin-2 field cannot consistently behave as if its own interactions are invisible to its source equation. It also explains why simple superposition fails. A primary presentation of the consistency construction is [Deser's “Self-Interaction and Gauge Invariance”](https://arxiv.org/abs/gr-qc/0411023).

This is not a theorem that any imaginable spin-2 system must equal pure GR at all energies. The argument relies on assumptions including locality, Lorentz-compatible dynamics, appropriate gauge consistency, field content, and the leading derivative structure. Field redefinitions and stress-tensor improvements affect intermediate expressions. Additional fields, higher-derivative terms, nonlocality, or different backgrounds require separate analysis. A Minkowski-background construction also presupposes an appropriate flat-background limit; it does not determine an arbitrary cosmological constant from nothing.

### 23.5 The assumptions behind uniqueness

In four dimensions, the Lovelock classification implies that a natural, symmetric, covariantly divergence-free rank-two tensor built locally from the metric and at most its second derivatives has the Einstein tensor and metric as the available gravitational ingredients, under the theorem's hypotheses. Consequently, a metric-only second-order field equation of this type takes the Einstein-plus-cosmological form, up to constants. A precise mathematical statement appears in [“Lovelock's theorem revisited”](https://arxiv.org/html/1005.2386v4).

Here “natural” means that the construction itself respects smooth coordinate changes, rather than depending on extra coordinate choices. The listed assumptions restrict the available tensors. Add another field, permit higher derivatives, change dimension, or change locality, and the conclusion changes. Thus GR's distinguished simplicity and EFT's higher-order corrections are compatible claims. One concerns a restricted class of exact equations; the other organizes small departures when that class is not assumed exact at every scale.

Einstein's equation is remarkably constrained at its leading level. That makes its success intelligible without making the unfinished parts of physics disappear.

### 23.6 Vacuum energy: the term that refuses to be a small correction

The cosmological constant is a special challenge because it multiplies the zero-derivative volume term. It is not automatically suppressed by the long-wavelength expansion that weakens higher-curvature terms.

A Lorentz-invariant vacuum has stress tensor

$$
T^{\mathrm{vac}}_{\mu\nu}=-\epsilon_{\mathrm{vac}}g_{\mu\nu}.
$$

It has positive energy density if $\epsilon_{\mathrm{vac}}>0$, and pressure $p=-\epsilon_{\mathrm{vac}}$. In Einstein's equation its effect has exactly the form of a cosmological constant. Schematically, restoring $c$,

$$
\Lambda_{\mathrm{effective}}
=\Lambda_{\mathrm{gravitational}}
+\frac{8\pi G_N}{c^4}\epsilon_{\mathrm{vac}},
$$

with the separate terms understood within a consistent renormalization prescription. Only their physical combination is measurable.

To understand the zero-point estimate, start with a quantum harmonic oscillator of frequency $\omega$. Its lowest energy is $\hbar\omega/2$, rather than zero. One can see the lower bound from the uncertainty relation $\Delta x\Delta p\ge\hbar/2$: the sum $(\Delta p)^2/(2m)+m\omega^2(\Delta x)^2/2$ is at least $\omega\Delta x\Delta p\ge\hbar\omega/2$. A Gaussian state with $\Delta x=\sqrt{\hbar/(2m\omega)}$ and $\Delta p=\sqrt{\hbar m\omega/2}$ attains the bound. This is additional quantum input, not a classical consequence of Einstein’s equation.

A free bosonic field decomposes into harmonic modes, one oscillator per wave vector. In a large periodic box of volume $V=L^3$, allowed wave-vector components are spaced by $2\pi/L$. Dividing the number of modes by volume gives the measure $d^3k/(2\pi)^3$. In natural units the mode frequency is $\omega_{\mathbf k}=\sqrt{|\mathbf k|^2+m^2}$, from the Klein–Gordon dispersion relation in Chapter 13. Adding their lowest energies suggests

$$
\epsilon_{\mathrm{zero\ point}}
=\frac12\int\frac{d^3k}{(2\pi)^3}\sqrt{k^2+m^2}.
$$

A large-momentum cutoff $M_*$ makes this grow roughly as $M_*^4$. You can see the fourth power without doing the integral: the three-dimensional momentum measure contributes three powers, and the high-momentum oscillator energy contributes one more.

That cutoff estimate is not a unique, covariant prediction of the measured cosmological constant. Renormalization, the regulator, masses, interactions, phase transitions, and the gravitational vacuum parameter all matter. The notorious “roughly 120 orders of magnitude” comparison uses a Planck-scale heuristic; it should not be presented as an exact regulator-independent prediction that an experiment simply refuted. [Jérôme Martin's review of the cosmological constant problem](https://arxiv.org/abs/1205.3365).

Nevertheless, the problem survives the correction to the slogan. In the standard cosmological interpretation, the effective dark-energy density corresponds to an energy scale of only a few millielectronvolts raised to the fourth power. An electronvolt is the energy gained by one elementary charge across one volt, $1\,\mathrm{eV}=1.602176634\times10^{-19}\,\mathrm J$; a millielectronvolt is $10^{-3}$ of that. In natural units energy density has energy-to-the-fourth units. Contributions associated with much higher known particle-physics scales naturally dwarf that. Why does the renormalized combination stay so small when such contributions change? This is the **radiative-stability** question: why does a small measured combination remain small after quantum corrections change its separate contributions? **Naturalness** asks whether that smallness is protected by a mechanism or requires a fine cancellation among much larger terms.

GR permits a small cosmological constant. It does not explain its observed value, and ordinary EFT bookkeeping does not supply the missing explanation by itself.

### 23.7 The semiclassical equation and its limits

An intermediate framework keeps the metric classical while treating matter quantum mechanically:

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}
+H^{\mathrm{higher\ curvature}}_{\mu\nu}
=\frac{8\pi G_N}{c^4}
\langle T_{\mu\nu}\rangle_{\mathrm{ren}}.
$$

The higher-curvature terms are included because renormalizing quantum matter on a curved background requires corresponding gravitational couplings. The state-dependent expectation value is a mean stress tensor, not a literal classical list of particles.

This approximation is most credible when the relevant curvature and momenta are below its cutoff, the quantum state is suitable, and neglected metric fluctuations or stress fluctuations do not undermine the mean-field description. Small curvature alone is not a universal certificate of validity. Long evolution, delicate quantum correlations, unusual states, or large fluctuations can raise additional issues.

Hawking radiation inhabits this framework. The endpoint of evaporation and the complete accounting of information generally do not follow just by extending the leading approximation until a black hole becomes arbitrarily small. The approximation must be checked as the mass and curvature evolve.

### 23.8 What experiments test—and what dark matter and dark energy mean

An observation does not compare “all of GR” with “all alternatives” in a single stroke. It constrains particular effects over particular scales and source conditions.

| Measurement family | Examples of what it can constrain |
|---|---|
| Freely falling bodies, clocks, and local laboratory tests | Composition dependence, local Lorentz behavior, gravitational redshift |
| Planetary motion, timing, and lensing | Weak-field metric structure and specified deviations from it |
| Binary pulsars | Strongly self-gravitating bodies, orbital dynamics, radiative energy loss |
| Gravitational-wave signals | Wave generation, propagation, polarization, and remnant dynamics within a chosen analysis |
| Cosmological expansion and structure | The joint behavior of gravity, matter content, initial conditions, and large-scale evolution |

For example, the July 2026 LIGO-Virgo-KAGRA GWTC-5.0 analysis compares waveform residuals, polarizations, generation, and remnant properties and reports no overall evidence for physics beyond GR in those tests. That is a strong set of constrained comparisons, with stated statistical and modeling limits. It is not a proof that every possible modification at every scale has vanished. [LVK's primary GWTC-5.0 tests paper](https://arxiv.org/abs/2607.19293).

**Dark matter** and **dark energy** also name different explanatory roles. In the usual cosmological model, dark matter behaves approximately as clustering, nearly pressureless matter on large scales. Dark energy denotes a component producing the observed accelerated expansion; a cosmological constant is its simplest standard representation. They are not two names for vacuum energy, nor does either term alone establish that Einstein's geometric equation is wrong.

The observational inference always depends on a combined model: gravitational laws, visible and invisible sources, their interactions, and initial conditions. A successful alternative must fit the web of measurements together. Matching one galaxy curve or one expansion history is a starting point, not the entire examination.

### 23.9 Open questions beyond the effective theory

The unresolved frontier contains concrete questions:

- What microscopic or nonperturbative description remains predictive where the gravitational low-energy expansion fails?
- How do smooth causal geometry and approximately local fields emerge, if they are not fundamental at every scale?
- What counts the black-hole entropy in sufficiently general situations, and how is information represented through formation and evaporation?
- What mechanism, if any, explains the small effective cosmological constant and its stability under quantum corrections?
- Which quantum properties of gravity can be isolated experimentally, rather than inferred solely from a classical gravitational fit?

Different research programs offer different partial answers and controlled special cases. The effective description does not select a unique microscopic theory. That requires additional theoretical consistency and empirical evidence.

The modern achievement is already substantial: the same geometry can be understood as a dynamical constrained system, a local-frame gauge structure, a theory of causal focusing, a thermodynamic participant, and a predictive low-energy quantum field theory. Those are independent pressures on the same equation. A future theory must explain why this structure works so well, as well as where its limits lie.

<a id="chapter-24"></a>

## 24. Calculating and interpreting a spacetime

### 24.1 From a spacetime model to a measurement

A calculation starts with physical assumptions and ends with an observer’s predicted reading. The intermediate steps have different jobs:

| Stage | Question | Mathematical object |
|---|---|---|
| Specify the model | Which fields exist, and what dynamics are assumed? | Action, matter model, coupling constants |
| Choose a description | How are events labeled? What symmetry can be used? | Coordinates, chart domain, ansatz, gauge |
| Measure locally | What are intervals, clocks, cones, and observer rest spaces? | Metric and orthonormal frames |
| Compare nearby | What does it mean to differentiate or transport a vector? | Connection and covariant derivative |
| Detect irreducible gravity | Do neighboring free-fall trajectories develop tidal acceleration? | Riemann tensor |
| Impose gravitational dynamics | Is this geometry compatible with this matter? | Einstein equation and matter equations |
| Specify a particular solution | Which physical history is being described? | Constraint-satisfying initial data and appropriate boundary/asymptotic information |
| Predict an experiment | What does a specified observer or detector record? | Proper times, frequency ratios, tidal response, scattering data |

A component formula is usually a middle step, not the final observable. A clock calculation needs both the metric and the clock’s worldline.

### 24.2 A complete check with accelerating observers

We will calculate the connection, curvature, accelerometer readings, and photon frequencies for the same family of accelerating observers.

Start in Minkowski spacetime, with inertial coordinates $(T,X,Y,Z)$:

$$
ds^2=-c^2dT^2+dX^2+dY^2+dZ^2.
$$

Introduce accelerated coordinates $(t,x,y,z)$ by

$$
cT=\left(\frac{c^2}{a_0}+z\right)
\sinh\left(\frac{a_0t}{c}\right),
$$

$$
Z+\frac{c^2}{a_0}
=\left(\frac{c^2}{a_0}+z\right)
\cosh\left(\frac{a_0t}{c}\right),
\qquad X=x,\quad Y=y,
$$

where $a_0>0$ is a constant acceleration scale. Work in the wedge with

$$
q(z)=1+\frac{a_0z}{c^2}>0.
$$

Differentiate the transformation. The mixed $dt\,dz$ terms from $-c^2dT^2$ and $dZ^2$ cancel, because the hyperbolic sine and cosine enter symmetrically. The remaining terms simplify using $\cosh^2\eta-\sinh^2\eta=1$:

$$
\boxed{ds^2=-q(z)^2c^2dt^2+dx^2+dy^2+dz^2.}
$$

This is the Rindler metric. We have changed coordinates, so spacetime must still be flat. But the metric now varies with position, and stationary clocks in these coordinates run at different rates relative to $t$:

$$
d\tau=q(z)\,dt.
$$

These stationary coordinate positions belong to accelerating observers. Their relative clock rates depend on that choice of worldlines, even though the underlying spacetime is flat.

#### Calculate the connection

Here the time coordinate is $t$ in seconds, so $g_{tt}=-c^2q^2$. The nonzero connection coefficients involving the $(t,z)$ sector are

$$
\Gamma^t{}_{tz}=\Gamma^t{}_{zt}=\frac{q'}{q},
\qquad
\Gamma^z{}_{tt}=c^2qq'=a_0q,
$$

where $q'=dq/dz=a_0/c^2$.

The first coefficient describes how the time basis changes as we move in $z$. The second is the coordinate acceleration term entering the $z$ geodesic equation.

An observer held at fixed $z$ has $u^t=dt/d\tau=1/q$ and $u^z=0$. Their four-acceleration is

$$
a^z=\Gamma^z{}_{tt}(u^t)^2=\frac{a_0}{q}.
$$

Because $g_{zz}=1$ and the acceleration is spatial in this observer's rest frame, the accelerometer magnitude is

$$
\boxed{a_{\mathrm{proper}}(z)=\frac{a_0}{q(z)}.}
$$

The observers at different heights require different proper accelerations to maintain this stationary arrangement. They are not a collection of freely falling observers.

#### Calculate the curvature

Compute a representative component directly:

$$
R^z{}_{tzt}
=\partial_z\Gamma^z{}_{tt}
-\Gamma^z{}_{tt}\Gamma^t{}_{zt}.
$$

The other terms vanish for this static diagonal metric. Substitute:

$$
R^z{}_{tzt}
=c^2\bigl[(q')^2+qq''\bigr]
-c^2(q')^2
=c^2qq''=0.
$$

The cancellation matters. A derivative of a connection coefficient alone is not generally curvature. The quadratic connection terms are part of the definition. Here $q$ is linear in $z$, so $q''=0$, and every Riemann component vanishes.

The Einstein tensor is therefore zero. In the idealized test-apparatus limit, this metric is compatible with vacuum and $\Lambda=0$.

#### Calculate the frequency shift

The metric is stationary, so the covariant photon momentum component $p_t$ is conserved along a null geodesic. A stationary observer measures

$$
E(z)=-p_\mu u^\mu=-\frac{p_t}{q(z)}.
$$

Since photon energy is proportional to frequency, a photon emitted at $z_e$ and received at $z_r$ satisfies

$$
\boxed{\frac{\nu_r}{\nu_e}=\frac{q(z_e)}{q(z_r)}.}
$$

If the receiver is at larger $z$, the received frequency is lower. There is a frequency shift between accelerated observers even though spacetime curvature is identically zero.

The inertial description interprets the same experiment in terms of the observers' motion during the light exchange. The accelerated description interprets it using a position-dependent lapse. Both predict the same detector readings.

> **What this calculation distinguishes.** Nonconstant metric components, nonzero Christoffel symbols, acceleration readings, and frequency shifts between a specified family of observers do not individually prove nonzero spacetime curvature. Tidal curvature requires the appropriate invariant geometric test.

The chart covers the wedge $Z+c^2/a_0>|cT|$. Its boundaries $Z+c^2/a_0=\pm cT$ are null acceleration horizons for the stationary Rindler observers. They are neither curvature singularities nor black-hole horizons in Minkowski spacetime. Inertial coordinates extend across these boundaries in the same smooth Minkowski spacetime.

### 24.3 How to calculate a spacetime without getting lost

Suppose someone hands you a metric and asks you to interpret it. Use this sequence.

1. **Check the chart and domain.** Which coordinate is time? Are angles dimensionless? Where is the matrix nondegenerate? Do any apparent singularities occur only at a chart boundary?
2. **Invert the matrix.** Verify $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_{\nu}$. For a nondiagonal metric, componentwise reciprocals are incorrect.
3. **Compute the determinant.** This controls the volume element and often reveals where a coordinate chart fails.
4. **Identify symmetries before differentiating.** Independence of a coordinate can provide a Killing vector and conserved quantities. Symmetry can save pages of algebra.
5. **Compute $\Gamma$ from $g$ and $\partial g$.** Exploit its lower-index symmetry only for the Levi-Civita connection in a coordinate basis.
6. **Compute Riemann with all its terms.** Form the derivative terms and both quadratic terms with the chosen convention.
7. **Contract carefully.** Obtain Ricci, scalar curvature, and Einstein tensor; free indices must remain in the right places.
8. **Compare with a physically admissible stress tensor.** Conservation, matter equations, and an equation of state may rule out an apparently convenient interpretation.
9. **Choose observers.** Build four-velocities or a local orthonormal frame and project coordinate tensors into quantities those observers measure.
10. **Check a known limit.** Flat space, weak fields, small velocities, spherical symmetry, or an independently known invariant can reveal an error that elegant notation concealed.

Symbolic software can carry out the matrix operations and derivatives. Its output still needs the chart domain, matter assumptions, and observer definitions to become a physical prediction. Independent limits and invariants provide checks on the calculation.

### 24.4 Four calibration geometries

These four known geometries test different parts of a hand calculation or computer implementation. Here $A$ is the radius of a sphere; in the Schwarzschild row, $m=G_NM/c^2$; in the FLRW row, use $c=1$ and a spatially flat cosmology with $H=\dot a/a$.

| Geometry | A result that must emerge | Error it often catches |
|---|---|---|
| Euclidean plane, $ds^2=dr^2+r^2d\theta^2$ | Nonzero $\Gamma$, but all $R^a{}_{bcd}=0$ | Mistaking curvilinear coordinates for curvature |
| Round sphere, $ds^2=A^2(d\theta^2+\sin^2\theta\,d\phi^2)$ | $R=2/A^2$ | Riemann sign and Ricci contraction errors |
| Schwarzschild exterior | $R_{\mu\nu}=0$, but $R_{\alpha\beta\gamma\delta}R^{\alpha\beta\gamma\delta}=48m^2/r^6$ | Mistaking Ricci-flatness for flatness |
| Flat FLRW | $G_{tt}=3H^2$ and $R=6(\ddot a/a+H^2)$ | Time-sign mistakes and missing quadratic connection terms |

The FLRW expression also shows that scalar curvature need not be positive even when the spatial slices are flat. “Spatially flat” is not “spacetime flat.”

### 24.5 Why substituting a solution into the action too early can destroy the question

For a vacuum Ricci-flat solution with $\Lambda=0$, the Einstein–Hilbert bulk integrand $\sqrt{-g}R$ vanishes. Does this mean the action could not possibly determine that solution?

No. A function can vanish at a point without having zero derivative in every direction there. More specifically, a field configuration can satisfy $R=0$ while nearby off-shell configurations do not.

**On shell** means the fields satisfy their equations of motion. **Off shell** means we allow variations that need not satisfy those equations. A variational principle compares nearby off-shell configurations and asks whether the first change in the total action vanishes.

If you impose the equations before varying, you discard the directions that the variation is supposed to test. It is like replacing a function by its value at the minimum and then trying to recover the slope from that single number.

Boundary contributions add another reason not to identify a vanishing bulk integrand with a physically empty action. In gravitational problems, boundary conditions and boundary terms can carry decisive information.

### 24.6 Reconstructing the field equation

Close the book for a moment and try to rebuild the logic.

A metric defines intervals and local causal structure. Its Levi-Civita connection supplies a derivative that respects the metric and has no torsion. The connection's failure to return transported vectors unchanged around infinitesimal loops is curvature. Curvature's contractions give the Ricci tensor and scalar.

A local gravitational action with the usual metric-only, two-derivative assumptions contains the scalar curvature and a constant term, integrated with the invariant volume measure. Matter has its own action and defines stress-energy through its response to a metric variation.

Vary the inverse metric. The curvature variation contributes $R_{\mu\nu}$ and a boundary divergence. The measure variation contributes $-\tfrac12Rg_{\mu\nu}$. The constant term contributes $\Lambda g_{\mu\nu}$. The matter variation contributes $-T_{\mu\nu}$ with the convention-dependent normalization already fixed.

Stationarity for arbitrary permitted interior variations gives

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}
=\frac{8\pi G_N}{c^4}T_{\mu\nu}.
$$

The Bianchi identity makes its left-hand side covariantly divergence-free. Diffeomorphism symmetry organizes the corresponding identity and matter balance law. The Newtonian limit fixes the coupling. Initial data and constraints select a physical history, up to gauge. Matter equations and the metric evolve together.

Then you ask an actual observer to make a measurement.

That final step is what keeps the entire geometric construction a theory of physics.

### 24.7 The highest-value change in intuition

Before studying general relativity, you may ask, “What force pulls the body along that curve?”

After studying it, you have more precise questions available:

- Is that curve a geodesic of the physical metric?
- Is an accelerometer measuring nonzero proper acceleration?
- Does a neighboring geodesic reveal tidal curvature?
- Is the apparent effect a coordinate feature, an observer choice, or an invariant property?
- Which degrees of freedom are fixed by matter, and which arrive as gravitational initial or radiative data?
- Which approximation connects this mathematical model to the experiment?

You have not merely acquired a new answer about gravity. You have acquired a better set of questions.

---

<a id="appendix-a"></a>

## Appendix A. Thirty exercises that turn recognition into understanding

These are not speed tests. Several are designed so that the tempting answer is wrong. Try the problem before reading the solution. If you obtain a different sign, first compare conventions; if you obtain a different physical prediction after doing so, investigate.

### A.1 Transforming a vector and a covector

**Problem.** In two dimensions, let $x'=2x+y$ and $y'=y$. A vector has components $(V^x,V^y)=(3,4)$ and a covector has components $(\omega_x,\omega_y)=(5,-2)$. Transform both and check their contraction.

**Solution.** The Jacobian is

$$
J=\begin{pmatrix}2&1\\0&1\end{pmatrix},
\qquad J^{-1}=\begin{pmatrix}1/2&-1/2\\0&1\end{pmatrix}.
$$

A vector transforms with $J$, so $V'=(10,4)$. A covector, represented as a row, transforms with $J^{-1}$, giving $\omega'=(5/2,-9/2)$. Thus

$$
\omega_\mu V^\mu=15-8=7,
\qquad
\omega'_{\mu'}V'^{\mu'}=25-18=7.
$$

The components changed while the pairing did not. Using the same transformation rule for both objects would lose this invariance. The upper and lower indices encode how the two kinds of components compensate each other.

### A.2 An inverse metric is a matrix inverse

**Problem.** For the positive-definite metric

$$
g_{ij}=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

and $V^i=(1,2)$, find $g^{ij}$, $V_i$, and $g(V,V)$.

**Solution.** Since the determinant is $3$,

$$
g^{ij}=\frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

Lowering gives $V_i=(4,5)$, and the norm squared is $V^iV_i=1\cdot4+2\cdot5=14$. Raising again returns $(1,2)$. Replacing each matrix entry by its reciprocal would fail even the identity check $g^{ik}g_{kj}=\delta^i{}_j$.

### A.3 Energy depends on the observer, even when it is a scalar

**Problem.** A massive particle moves at $v=0.6c$ relative to an inertial observer. Find its energy and momentum. What energy does an observer moving with the particle assign to it?

**Solution.** $\gamma=1/\sqrt{1-0.36}=1.25$. The first observer measures $E=1.25mc^2$ and $p=\gamma mv=0.75mc$. The comoving observer measures $mc^2$ and zero spatial momentum.

There is no contradiction with $E_{(U)}=-p_\mu U^\mu$ being a scalar. A coordinate change transforms both $p$ and the same observer $U$, leaving that number unchanged. Choosing a different observer replaces $U$ by a different vector and defines a different measurement.

### A.4 The Hessian knows about polar coordinates

**Problem.** On the Euclidean plane with $ds^2=dr^2+r^2d\theta^2$, let $f=r$. Although $\partial_\theta\partial_\theta f=0$, show that $\nabla_\theta\nabla_\theta f=r$ and $\nabla^2f=1/r$ for $r>0$.

**Solution.** The first derivative of a scalar is the covector $df$. Differentiating it requires a connection:

$$
\nabla_\theta\nabla_\theta f
=\partial_\theta\partial_\theta f
-\Gamma^r{}_{\theta\theta}\partial_rf
=0-(-r)(1)=r.
$$

The radial Hessian component vanishes. Contracting with $g^{\theta\theta}=1/r^2$ gives $\nabla^2r=r/r^2=1/r$. The second covariant derivative of a scalar is not generally just a matrix of ordinary second derivatives.

### A.5 A divergence-free field can hide a puncture

**Problem.** On the same plane, take $V^r=1/r$ and $V^\theta=0$. Compute its divergence for $r>0$. Why is the flux through a circle nonzero?

**Solution.** Since $\sqrt{g}=r$,

$$
\nabla_iV^i=\frac1r\partial_r(rV^r)=0
$$

away from the origin. But a circle of radius $r$ has outward flux $(1/r)(2\pi r)=2\pi$.

The field is undefined at the origin. Applying the divergence theorem to a disk without accounting for that singularity violates its smoothness assumptions. On an annulus, the outer and inner boundary fluxes cancel with their appropriate orientations. In a distributional extension to the whole plane, the divergence is $2\pi\delta^{(2)}(\mathbf{x})$.

The lesson applies far beyond this example: local equations plus domain assumptions determine whether an integral inference is legitimate.

### A.6 Constant Cartesian arrows have changing polar components

**Problem.** A constant Cartesian vector pointing in the $x$ direction has polar components $V^r=\cos\theta$ and $V^\theta=-\sin\theta/r$. Show that $\nabla_\theta V^r=0$.

**Solution.** The partial derivative is $\partial_\theta V^r=-\sin\theta$, which by itself falsely suggests the vector changes. The connection contribution is

$$
\Gamma^r{}_{\theta\theta}V^\theta
=(-r)\left(-\frac{\sin\theta}{r}\right)=\sin\theta.
$$

They cancel. This is a concrete example of a covariant derivative correcting the change in a coordinate basis. No physical bending of space was needed.

### A.7 The connection can vanish while curvature survives

**Problem.** At an event $P$, use normal coordinates so that $\Gamma^\rho{}_{\mu\nu}(P)=0$. Why does this not imply $R^\rho{}_{\sigma\mu\nu}(P)=0$?

**Solution.** At $P$, the terms quadratic in $\Gamma$ vanish, but

$$
R^\rho{}_{\sigma\mu\nu}(P)
=\partial_\mu\Gamma^\rho{}_{\nu\sigma}(P)
-\partial_\nu\Gamma^\rho{}_{\mu\sigma}(P)
$$

can remain nonzero. A function vanishing at a point need not have vanishing derivatives there. In normal coordinates the metric's first derivatives vanish at $P$, but its second derivatives contain curvature information.

### A.8 Measuring curvature with a circumference

**Problem.** On a sphere of radius $A$, a geodesic circle at geodesic distance $s$ from the north pole has circumference $C(s)=2\pi A\sin(s/A)$. Expand it for small $s$ and compare it with a flat circle.

**Solution.** Taylor expansion gives

$$
C(s)=2\pi s\left(1-\frac{s^2}{6A^2}+O(s^4/A^4)\right).
$$

It is smaller than $2\pi s$. Intrinsic measurements of radius and circumference reveal positive curvature without any view from an embedding space. The Gaussian curvature is $1/A^2$; in two dimensions the scalar curvature is twice that, $R=2/A^2$.

### A.9 Newtonian tides know the sign convention

**Problem.** For $\Phi=-G_NM/r$, derive the radial and transverse relative accelerations of nearby freely falling particles in the Newtonian limit.

**Solution.** In local Cartesian directions aligned with the radial axis, the Hessian of the potential has eigenvalues

$$
\left(-\frac{2G_NM}{r^3},\frac{G_NM}{r^3},\frac{G_NM}{r^3}\right).
$$

Relative acceleration is $\delta\ddot x^i=-\delta^{ik}\partial_k\partial_j\Phi\,\delta x^j$, so the corresponding tidal eigenvalues are

$$
\left(\frac{2G_NM}{r^3},-\frac{G_NM}{r^3},-\frac{G_NM}{r^3}\right).
$$

Radial separations stretch; transverse separations compress. The trace vanishes outside the source, consistent with the vacuum Poisson equation. In the relativistic convention used here, $R^i{}_{0j0}\simeq\delta^{ik}\partial_k\partial_j\Phi/c^2$, and geodesic deviation supplies the minus sign.

### A.10 Trace reversal produces the missing factor of two

**Problem.** With $\Lambda=0$, contract the four-dimensional Einstein equation and rewrite it as an equation for $R_{\mu\nu}$. Evaluate its $00$ source for slowly moving dust.

**Solution.** The trace is $R-2R=\kappa T$, so $R=-\kappa T$, where $\kappa=8\pi G_N/c^4$. Therefore

$$
R_{\mu\nu}=\kappa\left(T_{\mu\nu}-\frac12g_{\mu\nu}T\right).
$$

For slow dust, $T_{00}\simeq\rho c^2$, $T\simeq-\rho c^2$, and $g_{00}\simeq-1$. The parenthesis in the $00$ component becomes $\rho c^2/2$. Thus $R_{00}\simeq4\pi G_N\rho/c^2$, consistent with $R_{00}\simeq\nabla^2\Phi/c^2$ and Newton's Poisson equation.

### A.11 What zero scalar curvature implies

**Problem.** Does $R=0$ imply vacuum? Does vacuum with $\Lambda=0$ imply no gravitational waves?

**Solution.** Both answers are no. A classical electromagnetic field in four dimensions has a trace-free stress tensor. Einstein's trace equation gives $R=0$ when $\Lambda=0$, even though $T_{\mu\nu}$ and $R_{\mu\nu}$ may be nonzero. Vacuum implies $R_{\mu\nu}=0$, but the Weyl tensor can still describe gravitational waves or an exterior tidal field.

The three conditions are called scalar-flat, Ricci-flat, and Riemann-flat, respectively. Each sets a different tensor or contraction to zero.

### A.12 Pressure enters the local curvature source

**Problem.** In a perfect fluid's local orthonormal rest frame, find $T$ and the trace-reversed $00$ source.

**Solution.** With $T_{\hat\mu\hat\nu}=\operatorname{diag}(\epsilon,p,p,p)$,

$$
T=-\epsilon+3p,
$$

and

$$
T_{\hat0\hat0}-\frac12\eta_{\hat0\hat0}T
=\epsilon+\frac12(-\epsilon+3p)
=\frac12(\epsilon+3p).
$$

That is one precise sense in which pressure gravitates. It does not license adding $3p/c^2$ to the mass of every isolated box while ignoring stresses in its walls. A complete system includes its stresses, binding, and appropriate global mass definition.

### A.13 The determinant supplies the trace term

**Problem.** Starting from $\delta\ln|\det M|=\operatorname{tr}(M^{-1}\delta M)$, show why varying $g^{\mu\nu}$ produces a minus sign in $\delta\sqrt{-g}$.

**Solution.** Varying $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_\nu$ gives

$$
\delta g_{\mu\nu}=-g_{\mu\alpha}g_{\nu\beta}\delta g^{\alpha\beta}.
$$

Then

$$
\delta\sqrt{-g}
=\frac12\sqrt{-g}\,g^{\mu\nu}\delta g_{\mu\nu}
=-\frac12\sqrt{-g}\,g_{\alpha\beta}\delta g^{\alpha\beta}.
$$

The sign is a consequence of inverse-matrix variation. It is not an arbitrary special rule for gravity.

### A.14 A constant Lagrangian can affect gravity

**Problem.** In natural units $c=1$, shift the matter Lagrangian by a constant: $\mathcal L_m\mapsto\mathcal L_m-V_0$. Find the stress tensor change.

**Solution.** The action changes by $-V_0\int\sqrt{-g}\,d^4x$. Its variation is

$$
\delta S_{\mathrm{shift}}
=\frac12\int\sqrt{-g}\,V_0g_{\mu\nu}\delta g^{\mu\nu}\,d^4x.
$$

Comparing with $\delta S_m=-\tfrac12\int\sqrt{-g}\,T_{\mu\nu}\delta g^{\mu\nu}\,d^4x$ yields

$$
\Delta T_{\mu\nu}=-V_0g_{\mu\nu}.
$$

Every timelike observer measures energy density $V_0$ and isotropic pressure $-V_0$; this stress tensor selects no preferred rest frame. A constant can be dynamically irrelevant to nongravitational equations on a fixed background while affecting the metric equation when geometry is dynamical.

### A.15 Why a boundary condition on the metric is not automatically enough

**Problem.** Suppose $\delta g_{\mu\nu}=0$ on a boundary. Must the normal derivative of $\delta g_{\mu\nu}$ vanish there too?

**Solution.** No. The elementary function $f(x)=x$ satisfies $f(0)=0$ but $f'(0)=1$. The same distinction applies componentwise to a field variation. The Einstein–Hilbert bulk action produces boundary terms containing derivatives of the metric variation. For a suitable fixed-induced-metric problem on a non-null smooth boundary, the Gibbons–Hawking–York term supplies the required cancellation. Setting more boundary data to zero than the problem calls for can conceal rather than solve this issue.

### A.16 Constructing a conserved current

**Problem.** Let $T^{\mu\nu}$ be symmetric and covariantly conserved. If $\xi^\mu$ obeys $\nabla_{(\mu}\xi_{\nu)}=0$, prove that $J^\mu=T^{\mu\nu}\xi_\nu$ is conserved.

**Solution.** The product rule gives

$$
\nabla_\mu J^\mu
=(\nabla_\mu T^{\mu\nu})\xi_\nu
+T^{\mu\nu}\nabla_\mu\xi_\nu.
$$

The first term vanishes. A symmetric tensor contracts only the symmetric part of the second factor, so the second becomes $T^{\mu\nu}\nabla_{(\mu}\xi_{\nu)}=0$. Integrating this local conservation law into a conserved charge also requires an appropriate region, hypersurfaces, and control of boundary fluxes. The Killing field supplies an actual symmetry, not merely a preferred-looking coordinate label.

### A.17 A height difference changes a clock's rate

**Problem.** Estimate the fractional clock-rate difference between stationary clocks separated vertically by $100\,\mathrm m$ in a weak approximately uniform field with $g_{\mathrm{local}}=9.8\,\mathrm{m/s^2}$. Estimate the accumulated difference over one day.

**Solution.** The potential difference is $\Delta\Phi\simeq g_{\mathrm{local}}h=980\,\mathrm{m^2/s^2}$. Thus

$$
\frac{\Delta(d\tau/dt)}{d\tau/dt}
\simeq\frac{\Delta\Phi}{c^2}
\simeq1.09\times10^{-14}.
$$

Over $86{,}400$ seconds, the higher clock gains approximately $9.4\times10^{-10}$ seconds, or $0.94$ nanoseconds. This estimate isolates the gravitational height effect; Earth's rotation, the actual potential, motion, and the comparison protocol matter in a precision experiment.

### A.18 A horizon is not a place where every clock stops

**Problem.** In Schwarzschild spacetime, a static clock obeys $d\tau=\sqrt{1-2m/r}\,dt$. Why can't we infer that a freely falling clock physically stops at $r=2m$?

**Solution.** The formula applies to worldlines with fixed Schwarzschild $r,\theta,\phi$. Such worldlines require increasing proper acceleration as $r$ approaches $2m$ from outside. The limiting static worldline is not a timelike observer sitting on the horizon. A falling observer follows a different worldline, has a finite proper-time crossing for ordinary infall, and can use a regular horizon-crossing chart. A relation between one coordinate time and one family of clocks is not a universal claim about all clocks.

### A.19 Doubling a black hole changes horizon tides

**Problem.** The Schwarzschild Kretschmann scalar is $K=48m^2/r^6$, with $m=G_NM/c^2$. Evaluate it at $r=2m$ and determine its mass scaling.

**Solution.** At the horizon,

$$
K_H=\frac{48m^2}{64m^6}=\frac{3}{4m^4}\propto M^{-4}.
$$

Representative orthonormal curvature components scale as $m/r^3\sim M^{-2}$ at the horizon. Larger nonrotating black holes can therefore have weaker horizon-scale tidal curvature. “Bigger black hole” does not mean “more violent local horizon crossing.” This says nothing by itself about the singularity deeper inside.

### A.20 Gravitational-wave strain is a relative measurement

**Problem.** A plus-polarized wave has $h_+=10^{-21}$. For an ideal freely falling separation $L=4\,\mathrm{km}$ along one principal axis, estimate the leading displacement amplitude. What is the ideal differential change between orthogonal axes?

**Solution.** To leading order in the long-wavelength approximation,

$$
\delta L_x\simeq\frac12h_+L=2\times10^{-18}\,\mathrm m,
\qquad
\delta L_y\simeq-\frac12h_+L.
$$

The differential change is $\delta L_x-\delta L_y\simeq h_+L=4\times10^{-18}\,\mathrm m$. A real interferometer measures optical phase with a frequency-dependent response; this elementary estimate captures the geometric strain scale, not the full instrument transfer function.

### A.21 Why an isolated source has no leading mass-dipole gravitational radiation

**Problem.** In the slow-motion weak-field approximation, define $D^i=\int\rho x^i\,d^3x$. Explain why its second time derivative vanishes for an isolated system and what that implies.

**Solution.** The first derivative is total momentum, $\dot D^i=P^i$, assuming suitable mass conservation and vanishing boundary flux. For an isolated system $\dot P^i=0$, hence $\ddot D^i=0$. A putative leading radiative term based on that second derivative cannot carry changing dipolar structure. Together with conservation of the monopole at the relevant leading order, this helps explain why the mass quadrupole is the first generic radiative contribution in GR's slow-source expansion. The claim has an approximation and isolation regime; it is not a statement about arbitrary additional fields in modified gravity.

### A.22 An expanding box gives the fluid equation

**Problem.** For a homogeneous perfect fluid in a comoving cell with physical volume $V\propto a^3$, use $d(\epsilon V)=-p\,dV$ to derive the continuity equation and the scaling for $p=w\epsilon$, with constant $w$.

**Solution.** Expand the differential:

$$
V\,d\epsilon+\epsilon\,dV=-p\,dV.
$$

Divide by $Vdt$ and use $\dot V/V=3H$:

$$
\dot\epsilon+3H(\epsilon+p)=0.
$$

For constant $w$, $d\ln\epsilon=-3(1+w)d\ln a$, giving $\epsilon\propto a^{-3(1+w)}$. Dust has $a^{-3}$, radiation $a^{-4}$, and a cosmological-constant fluid $a^0$. This equation is a local covariant balance law specialized to the symmetry, not evidence for a universally defined conserved total cosmic energy.

### A.23 Derive a universe's power-law growth

**Problem.** In a spatially flat, single-fluid universe with $\Lambda=0$ and constant $w>-1$, combine $H^2\propto\epsilon$ with the previous result to derive $a(t)$.

**Solution.** We have

$$
\left(\frac{\dot a}{a}\right)^2\propto a^{-3(1+w)},
\qquad
\dot a\propto a^{-(1+3w)/2}.
$$

Integrating the expanding branch gives $a^{3(1+w)/2}\propto t-t_0$, hence

$$
a(t)\propto(t-t_0)^{2/[3(1+w)]}.
$$

Dust gives $t^{2/3}$, radiation $t^{1/2}$. The $w=-1$ case must be solved separately: constant positive energy density gives constant $H$ and exponential expansion. Substituting $w=-1$ into the power-law exponent is not a valid limiting derivation.

### A.24 When does pressure accelerate expansion?

**Problem.** With no separately written cosmological constant and $p=w\epsilon$, determine when a positive-density FLRW fluid drives $\ddot a>0$.

**Solution.** The acceleration equation is

$$
\frac{\ddot a}{a}
=-\frac{4\pi G_N}{3c^2}(\epsilon+3p)
=-\frac{4\pi G_N\epsilon}{3c^2}(1+3w).
$$

For $\epsilon>0$, acceleration requires $w<-1/3$. Ordinary positive pressure contributes toward deceleration in this equation. Sufficiently negative pressure reverses the sign. This cosmological statement must not be replaced by the indiscriminate slogan “pressure is repulsive” or “pressure is always attractive.”

### A.25 Four constraints do not mean four lost metric components

**Problem.** Explain why GR has two local propagating metric degrees of freedom in four spacetime dimensions using ADM phase space.

**Solution.** The spatial metric has six independent components, and its conjugate momentum adds six, for twelve phase-space variables per spatial point. Four first-class constraints each remove one constrained phase-space direction and one associated gauge direction. Thus $12-2\times4=4$ physical phase-space dimensions remain, corresponding to two configuration degrees of freedom and their conjugate momenta. Lapse and shift act as gauge multipliers rather than additional propagating fields in this count. This is a local count for ordinary GR; boundaries and global sectors require further care.

### A.26 The ADM constraint recognizes an expanding universe

**Problem.** Use $c=1$, a flat FLRW slice, and the convention $K_{ij}=-\tfrac12\mathcal L_n\gamma_{ij}$. Show that the Hamiltonian constraint reproduces the first Friedmann equation.

**Solution.** For comoving proper-time slicing, $K_{ij}=-H\gamma_{ij}$. Hence $K=-3H$ and $K_{ij}K^{ij}=3H^2$. Since the slice has ${}^{(3)}R=0$,

$$
{}^{(3)}R+K^2-K_{ij}K^{ij}=6H^2.
$$

Set this equal to $16\pi G_N\epsilon+2\Lambda$ to obtain

$$
H^2=\frac{8\pi G_N}{3}\epsilon+\frac{\Lambda}{3}.
$$

The expansion lives in the extrinsic curvature of the slices even when their intrinsic spatial curvature vanishes.

### A.27 Raychaudhuri gives a deadline for focusing

**Problem.** For a geodesic, hypersurface-orthogonal timelike congruence in four dimensions with $R_{\mu\nu}u^\mu u^\nu\ge0$, use $c=1$ and show that negative initial expansion $\theta_0<0$ must diverge to negative infinity within proper time at most $3/|\theta_0|$, provided the congruence remains defined up to that point.

**Solution.** Raychaudhuri gives

$$
\frac{d\theta}{d\tau}\le-\frac13\theta^2
$$

because shear contributes nonpositively and vorticity vanishes. For $\theta<0$,

$$
\frac{d}{d\tau}\left(\frac1\theta\right)
=-\frac{\dot\theta}{\theta^2}\ge\frac13.
$$

Starting from $1/\theta_0<0$, the reciprocal must reach zero no later than $3/|\theta_0|$, corresponding to focusing. A caustic is not by itself a spacetime singularity: geodesics can cross in perfectly regular spacetime. Singularity theorems require additional global assumptions to infer incompleteness.

### A.28 A pure frame rotation is not curvature

**Problem.** On the flat plane, use the orthonormal coframe $e^1=dr$, $e^2=r\,d\theta$. Why can the spin connection be nonzero while the curvature two-form vanishes?

**Solution.** Since $de^2=dr\wedge d\theta$, the torsion-free Cartan equation requires $\omega^2{}_1=d\theta$ and $\omega^1{}_2=-d\theta$. These one-forms record the rotation of the polar frame. But $d(d\theta)=0$ on a regular angular chart, and the relevant connection wedge products vanish in this two-dimensional example. Thus $\Omega^a{}_b=d\omega^a{}_b+\omega^a{}_c\wedge\omega^c{}_b=0$. The polar chart and frame fail at the origin; their behavior there must not be confused with a curved plane.

### A.29 Why black-hole entropy has the right dimensions

**Problem.** Verify that $S_{\mathrm{BH}}=k_BA/(4\ell_P^2)$ has entropy units, where $\ell_P^2=\hbar G_N/c^3$. For a Schwarzschild black hole, derive the $M^2$ dependence of entropy and check that $T_HdS=d(Mc^2)$.

**Solution.** $A/\ell_P^2$ is dimensionless, so $S$ has units of $k_B$. With $A=16\pi G_N^2M^2/c^4$,

$$
S_{\mathrm{BH}}=\frac{4\pi k_BG_NM^2}{\hbar c},
\qquad
\frac{dS_{\mathrm{BH}}}{dM}
=\frac{8\pi k_BG_NM}{\hbar c}.
$$

Multiply by $T_H=\hbar c^3/(8\pi G_NMk_B)$ to obtain $T_HdS=c^2dM$. This is a consistency check within the semiclassical result for an uncharged, nonrotating hole, not a derivation of its microscopic degrees of freedom.

### A.30 Estimating an effective-theory correction

**Problem.** In units $c=\hbar=1$, consider a schematic gravitational Lagrangian

$$
\mathcal L\sim M_*^2\left[R+\frac{a}{M_*^2}R^2+\cdots\right],
$$

with dimensionless coefficient $a$ of order unity. On a slowly varying geometry with typical curvature scale $R\sim L^{-2}$, estimate the relative size of the correction. State why $R=0$ alone is not a sufficient validity check.

**Solution.** Relative to the $R$ term, the displayed correction scales as $a/(M_*L)^2$. It is small when $M_*L\gg1$. This is generic power counting, not a prediction that this particular $R^2$ term changes a Ricci-flat vacuum solution: its variation vanishes on that solution, as discussed in Section 23.2. An effective action can also contain higher curvature contractions and derivative operators. The scalar $R$ may vanish while Riemann or Weyl curvature is nonzero, as in a Schwarzschild exterior. Validity requires control of the physically relevant curvature components, invariant scales, frequencies, and state-dependent effects, not a single convenient scalar. The effective theory can be predictive below its cutoff without claiming validity at arbitrarily short distances.

---

<a id="appendix-b"></a>

## Appendix B. A working reference sheet

Use this appendix to retrieve equations after their derivations. The formulas follow the book’s metric signature and curvature convention; their stated domains and approximation assumptions remain part of each result.

### B.1 The geometry ladder

**Interval and clock time**

$$
ds^2=g_{\mu\nu}dx^\mu dx^\nu,
\qquad d\tau^2=-ds^2/c^2\quad\text{on a timelike worldline}.
$$

**Inverse and index conversion**

$$
g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_\nu,
\qquad V_\mu=g_{\mu\nu}V^\nu,
\qquad V^\mu=g^{\mu\nu}V_\nu.
$$

**Levi-Civita connection in a coordinate basis**

$$
\Gamma^\rho{}_{\mu\nu}
=\frac12g^{\rho\sigma}
\left(\partial_\mu g_{\sigma\nu}
+\partial_\nu g_{\sigma\mu}
-\partial_\sigma g_{\mu\nu}\right).
$$

**Covariant derivatives**

$$
\nabla_\mu f=\partial_\mu f,
\qquad
\nabla_\mu V^\nu=\partial_\mu V^\nu
+\Gamma^\nu{}_{\mu\rho}V^\rho,
$$

$$
\nabla_\mu\omega_\nu=\partial_\mu\omega_\nu
-\Gamma^\rho{}_{\mu\nu}\omega_\rho.
$$

An upper tensor index gets a plus connection term; a lower index gets a minus term. This rule applies to ordinary tensors; tensor densities have an additional weight term.

**Geodesic with affine parameter $\lambda$**

$$
\frac{d^2x^\mu}{d\lambda^2}
+\Gamma^\mu{}_{\alpha\beta}
\frac{dx^\alpha}{d\lambda}
\frac{dx^\beta}{d\lambda}=0.
$$

Proper time is affine on a timelike geodesic. Null geodesics have no proper-time parameter.

**Riemann curvature**

$$
R^\rho{}_{\sigma\mu\nu}
=\partial_\mu\Gamma^\rho{}_{\nu\sigma}
-\partial_\nu\Gamma^\rho{}_{\mu\sigma}
+\Gamma^\rho{}_{\mu\lambda}\Gamma^\lambda{}_{\nu\sigma}
-\Gamma^\rho{}_{\nu\lambda}\Gamma^\lambda{}_{\mu\sigma}.
$$

**Contractions**

$$
R_{\mu\nu}=R^\rho{}_{\mu\rho\nu},
\qquad R=g^{\mu\nu}R_{\mu\nu},
\qquad G_{\mu\nu}=R_{\mu\nu}-\frac12Rg_{\mu\nu}.
$$

**Tidal acceleration**

$$
\frac{D^2\xi^\mu}{d\tau^2}
=-R^\mu{}_{\alpha\nu\beta}u^\alpha\xi^\nu u^\beta.
$$

This form assumes a neighboring family of affinely parameterized geodesics with the usual commuting tangent and separation fields.

**Volume, divergence, scalar wave operator**

$$
dV_4=\sqrt{-g}\,d^4x,
\qquad
\nabla_\mu V^\mu=
\frac1{\sqrt{-g}}\partial_\mu(\sqrt{-g}V^\mu),
$$

$$
\Box f=\nabla_\mu\nabla^\mu f
=\frac1{\sqrt{-g}}\partial_\mu
\left(\sqrt{-g}g^{\mu\nu}\partial_\nu f\right).
$$

In flat inertial coordinates, $\Box=-c^{-2}\partial_t^2+\nabla^2$.

### B.2 Matter, action, and dynamics

**Observer energy**

$$
E_{(U)}=-p_\mu U^\mu,
\qquad U^\mu U_\mu=-c^2.
$$

**Perfect fluid**

$$
T^{\mu\nu}=
\frac{\epsilon+p}{c^2}u^\mu u^\nu+pg^{\mu\nu},
\qquad T=-\epsilon+3p.
$$

**Einstein equation and trace reversal in four dimensions**

$$
G_{\mu\nu}+\Lambda g_{\mu\nu}=\kappa T_{\mu\nu},
\qquad \kappa=\frac{8\pi G_N}{c^4},
$$

$$
R=4\Lambda-\kappa T,
\qquad
R_{\mu\nu}
=\kappa\left(T_{\mu\nu}-\frac12Tg_{\mu\nu}\right)
+\Lambda g_{\mu\nu}.
$$

**Action and metric variation, with $x^0=ct$**

$$
S_{\mathrm{EH}}=\frac{c^3}{16\pi G_N}
\int d^4x\sqrt{-g}(R-2\Lambda),
$$

$$
\delta\sqrt{-g}=-\frac12\sqrt{-g}g_{\mu\nu}\delta g^{\mu\nu},
\qquad
\delta S_m=-\frac1{2c}\int d^4x\sqrt{-g}
T_{\mu\nu}\delta g^{\mu\nu}.
$$

The total variational problem also includes its appropriate boundary terms and boundary conditions. The bulk expression alone is not a universal boundary prescription.

**Identities and balance laws**

$$
\nabla_\mu G^{\mu\nu}=0,
\qquad
\nabla_\mu T^{\mu\nu}=0
$$

for matter compatible with the Einstein equation and constant $\Lambda$. The first is a geometric identity; the second is an on-shell matter balance law in the standard coupled theory. Neither is the assertion that all components are constant.

**Weak Newtonian limit**

$$
g_{00}\simeq-\left(1+\frac{2\Phi}{c^2}\right),
\qquad
\frac{d^2\mathbf{x}}{dt^2}\simeq-\boldsymbol\nabla\Phi,
\qquad
\nabla^2\Phi=4\pi G_N\rho
$$

for slow test motion, weak approximately static fields, negligible pressure, and negligible $\Lambda$ on the scales considered.

### B.3 Vacuum is a family of possibilities

| Condition | Consequence in four-dimensional GR | What is still possible |
|---|---|---|
| $T_{\mu\nu}=0$, $\Lambda=0$ | $R_{\mu\nu}=0$, $R=0$ | Weyl curvature, black-hole exterior tides, gravitational waves |
| $T_{\mu\nu}=0$, $\Lambda\ne0$ | $R_{\mu\nu}=\Lambda g_{\mu\nu}$, $R=4\Lambda$ | Additional Weyl curvature; maximal symmetry is an extra condition |
| $T=0$, $\Lambda=0$ | $R=0$ | Nonzero Ricci from trace-free matter, such as a classical Maxwell field |
| $R^\rho{}_{\sigma\mu\nu}=0$ on an open region | Locally flat geometry | Curvilinear/accelerated coordinates; possible global topology beyond a local chart |

### B.4 Six distinctions to keep beside your notebook

| Do not merge | The distinction |
|---|---|
| Coordinates and observers | A chart labels events; an observer is a physical timelike worldline, with additional frame choices for measurements |
| Connection and curvature | The connection compares nearby tangent spaces; curvature measures a particular failure of path-independent transport |
| Spatial curvature and spacetime curvature | Spatial slices depend on a slicing; the four-dimensional curvature describes spacetime |
| Local conservation and global conserved energy | A covariant balance law does not automatically provide a global time-translation symmetry or a total energy |
| Coordinate singularity and geometric singularity | A failing chart can be replaced; spacetime incompleteness requires a different analysis |
| Mathematical identity and equation of motion | An identity holds for every field of the relevant class; an equation of motion restricts the physically allowed fields |

<a id="appendix-c"></a>

## Appendix C. A plain-language glossary

| Term | Meaning |
|---|---|
| Affine parameter | A geodesic parameter for which the tangent transports parallel to itself; linear rescalings preserve this property |
| Atlas | A collection of overlapping coordinate charts covering a manifold |
| Boundary condition | A restriction on fields or their behavior at a boundary or asymptotic region |
| Causal curve | A timelike or null curve; with a chosen time orientation, it can represent future-directed causal influence |
| Chart | A smooth local system of coordinates; it need not cover the whole spacetime |
| Christoffel symbols | Coordinate-basis coefficients of the Levi-Civita connection; the coefficients alone are not tensor components |
| Connection | A rule for differentiation and infinitesimal parallel transport; in standard metric GR it is the torsion-free, metric-compatible one |
| Constraint | An equation restricting permissible initial data rather than independently specifying all their time derivatives |
| Covector | A linear map from a tangent vector to a scalar; the differential $df$, with components $\partial_\mu f$, is an example. Obtaining the gradient vector requires raising its index with the metric |
| Covariant derivative | A derivative that accounts for the connection so its output transforms as the intended tensor |
| Diffeomorphism | A smooth invertible map with smooth inverse; it underlies coordinate changes and GR's field-relabeling gauge symmetry |
| Effective field theory | An expansion valid below a specified scale, organized so that finitely many parameters control predictions to a chosen accuracy |
| Einstein tensor | The covariantly divergence-free combination of Ricci curvature and its scalar trace that appears in the field equation |
| Equivalence principle | A family of experimentally meaningful statements about universal free fall and the local behavior of nongravitational physics; its precise version matters |
| Event horizon | A global causal boundary separating events that can send signals to the relevant future infinity from those that cannot |
| Extrinsic curvature | How a hypersurface sits within a higher-dimensional geometry; in a spacetime slicing it encodes important information about the slices' evolution |
| Gauge freedom | Redundancy in a mathematical description; gauge-related descriptions represent the same physical situation when the transformations are treated as redundancies with the appropriate boundary conditions |
| Geodesic | A curve whose tangent is parallel-transported along itself with an affine parameter |
| Geodesic deviation | The evolution of separation between neighboring geodesics, governed by curvature |
| Global hyperbolicity | A strong causality condition associated with a well-defined Cauchy initial-value formulation |
| Holonomy | The net transformation produced by parallel transport around a closed loop |
| Killing vector | A vector field generating a continuous metric symmetry, with vanishing Lie derivative of the metric |
| Lapse | In a spacetime slicing, the factor converting coordinate-time separation into proper separation along the slice normal |
| Lie derivative | Change of a field under the flow generated by a vector field; it is distinct from covariant differentiation along that vector |
| Manifold | A space locally describable by ordinary coordinate neighborhoods with compatible smooth overlaps |
| Metric | A smoothly varying nondegenerate bilinear form defining intervals, causal character, and index conversion |
| Nonmetricity | Failure of a connection to preserve the metric under covariant differentiation |
| Null | Having zero spacetime norm; a nonzero null vector is not the zero vector |
| On shell | Satisfying the equations of motion; off shell means not imposing them |
| Orthonormal frame | A local basis in which the metric has the standard diagonal Minkowski form |
| Parallel transport | Moving a vector along a path so its covariant derivative along that path vanishes |
| Proper acceleration | The invariant magnitude of four-acceleration, measured by an ideal accelerometer |
| Proper time | The time accumulated by an ideal clock along its timelike worldline |
| Ricci curvature | A contraction of Riemann curvature, directly tied to stress-energy through Einstein's equation |
| Riemann curvature | The tensor encoding local curvature, including tidal and parallel-transport information |
| Scalar curvature | A further contraction of Ricci; useful but insufficient to describe all curvature |
| Shift | The tangential part of the coordinate-time flow relative to a chosen slicing |
| Stress-energy tensor | The local tensor encoding energy, momentum, their fluxes, and mechanical stresses |
| Tangent space | The vector space of possible tangent directions at one event |
| Tensor | A multilinear geometric object with components transforming by the appropriate Jacobian factors |
| Tetrad | A local orthonormal frame or its dual coframe in four-dimensional spacetime |
| Torsion | The antisymmetric failure of a connection's directional derivatives to match the Lie bracket; it vanishes for the Levi-Civita connection |
| Weyl curvature | The trace-free part of Riemann curvature; in four dimensions it can remain nonzero in Ricci-flat vacuum |
| Worldline | A path through spacetime representing the history of a localized object or observer |

<a id="appendix-d"></a>

## Appendix D. Where to go next

### D.1 Foundational lecture notes

Two substantial, freely accessible courses make good companions after this tutorial:

- [David Tong, General Relativity](https://davidtong.org/teaching/general-relativity/): a connected course spanning geometry, Einstein's equation, weak fields, waves, and black holes, with problem sheets.
- [Sean Carroll, Lecture Notes on General Relativity](https://preposterousuniverse.com/grnotes/): a full set of introductory graduate notes, including special relativity, manifolds, curvature, dynamics, and applications. Carroll's page also flags that the older notes are not maintained as comprehensively as the later textbook.

Do not compare a single curvature equation across books before comparing their signature, Riemann definition, Ricci contraction, and units. The physics can agree while several intermediate signs differ.

### D.2 Choose the next subject by the question that bothers you

| If your question is… | Study next | What to learn to do |
|---|---|---|
| “What does curvature do beyond symmetric examples?” | Differential geometry and Jacobi fields | Move between abstract, coordinate, and frame formulations |
| “How do we evolve a binary black hole?” | Initial-value GR and numerical relativity | Solve constraints, choose gauge, understand stability and waveform extraction |
| “How do I calculate what an observer sees?” | Relativistic astrophysics, ray tracing, and geometric optics | Connect tetrads, null geodesics, emission models, and detector quantities |
| “How do waves carry energy?” | Perturbation theory, asymptotic structure, and radiation theory | Distinguish local approximations from asymptotic flux definitions |
| “How can a horizon have entropy?” | Quantum fields in curved spacetime and black-hole thermodynamics | Separate classical horizon geometry from quantum state and detector effects |
| “Why this action rather than another?” | Effective field theory and gravitational amplitudes | State symmetry and scale assumptions and calculate controlled corrections |
| “What is conserved in a universe without a preferred time?” | Symmetries, Hamiltonian GR, and covariant phase space | Construct charges with explicit boundary and symmetry assumptions |
| “Why did this take Einstein so long?” | History based on notebooks and correspondence | Separate a modern textbook derivation from the actual process of discovery |

### D.3 Research and historical sources cited in the chapters

This list gathers the sources linked at the point of use. A link to a paper does not mean every interpretation of its subject is settled. The chapter text specifies whether a statement is classical, perturbative, semiclassical, observational, or an open problem.

1. [Janssen and Renn, *Untying the Knot*](https://www.mpiwg-berlin.mpg.de/Preprints/P264.PDF)
2. [Norton, *How Einstein Found His Field Equations: 1912–1915*](https://online.ucpress.edu/hsns/article/14/2/253/47626/How-Einstein-Found-His-Field-Equations-1912-1915)
3. [David Tong's differential-geometry chapter](https://davidtong.org/pdfs/teaching/general-relativity/gr2.pdf)
4. [Einstein's 1905 paper, in English translation](https://sites.pitt.edu/~jdnorton/teaching/Einstein_graduate/pdfs/Einstein_STR_1905_English.pdf)
5. [Tong's discussion of the metric volume form](https://davidtong.org/pdfs/teaching/general-relativity/gr3.pdf)
6. [Clifford Will's review of tests of gravitation](https://arxiv.org/abs/1403.7377)
7. [Tong's treatment of the equivalence principle and Rindler motion](https://davidtong.org/pdfs/teaching/general-relativity/gr1.pdf)
8. [Sean Carroll's notes, in the geodesics section](https://arxiv.org/pdf/gr-qc/9712019)
9. [Sean Carroll's university lecture notes, “Curvature”](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll3.html)
10. [David Tong's general relativity notes](https://davidtong.org/pdfs/teaching/general-relativity/gr.pdf)
11. [Manasse and Misner's original Fermi-coordinate paper](https://doi.org/10.1063/1.1724316)
12. [Pravda, Pravdova, Coley, and Milson](https://arxiv.org/abs/gr-qc/0209024)
13. [Misner and Putnam in “Active Gravitational Mass”](https://link.aps.org/doi/10.1103/PhysRev.116.1045)
14. [Lehner, Myers, Poisson, and Sorkin, “Gravitational action with null boundaries”](https://arxiv.org/abs/1609.00207)
15. [“Quasilocal Energy and Conserved Charges Derived from the Gravitational Action”](https://arxiv.org/abs/gr-qc/9209012)
16. [David Tong’s black-hole lecture notes](https://davidtong.org/pdfs/teaching/general-relativity/gr6.pdf)
17. [Chruściel and Costa, *On uniqueness of stationary vacuum black holes*](https://arxiv.org/abs/0806.0016)
18. [Isaacson, *Gravitational Radiation in the Limit of High Frequency. II*](https://doi.org/10.1103/PhysRev.166.1272)
19. [LIGO Scientific Collaboration and Virgo Collaboration, *Observation of Gravitational Waves from a Binary Black Hole Merger*](https://arxiv.org/abs/1602.03837)
20. [Riess and collaborators, *Observational Evidence from Supernovae for an Accelerating Universe and a Cosmological Constant*](https://arxiv.org/abs/astro-ph/9805201)
21. [Éric Gourgoulhon's author-written notes on the 3+1 formalism](https://arxiv.org/abs/gr-qc/0703035)
22. [Choquet-Bruhat and Geroch's original Cauchy-problem paper](https://projecteuclid.org/journals/communications-in-mathematical-physics/volume-14/issue-4/Global-aspects-of-the-Cauchy-problem-in-general-relativity/cmp/1103841822.pdf)
23. [David Tong's author-written chapter on connections and Cartan geometry](https://davidtong.org/teaching/general-relativity/grhtml/S3)
24. [Dadhich and Pons's paper on Einstein-Hilbert and Einstein-Palatini formulations](https://arxiv.org/abs/1010.0869)
25. [Penrose's 1965 paper, “Gravitational Collapse and Space-Time Singularities”](https://link.aps.org/doi/10.1103/PhysRevLett.14.57)
26. [Wald's research review of black-hole thermodynamics](https://arxiv.org/abs/gr-qc/9912119)
27. [Donoghue's original work on general relativity as an effective field theory](https://arxiv.org/abs/gr-qc/9405057)
28. [Donoghue's review of quantum GR and its effective-theory limits](https://arxiv.org/abs/2211.09902)
29. [Solomon and Trodden's research on higher derivatives in EFT](https://arxiv.org/abs/1709.09695)
30. [Deser's “Self-Interaction and Gauge Invariance”](https://arxiv.org/abs/gr-qc/0411023)
31. [“Lovelock's theorem revisited”](https://arxiv.org/html/1005.2386v4)
32. [Jérôme Martin's review of the cosmological constant problem](https://arxiv.org/abs/1205.3365)
33. [LVK's primary GWTC-5.0 tests paper](https://arxiv.org/abs/2607.19293)
34. [David Tong, General Relativity](https://davidtong.org/teaching/general-relativity/)
35. [Sean Carroll, Lecture Notes on General Relativity](https://preposterousuniverse.com/grnotes/)

---

**One final challenge:** explain the Einstein equation to a friend without saying “mass bends a rubber sheet.” Use a clock, two neighboring freely falling laboratories, a rule for comparing their directions, and an action whose stationary points determine the geometry. If you can do that—and explain why empty spacetime can still carry waves—you have moved well beyond recognizing the symbols.


<a id="appendix-e"></a>

## Appendix E. Index practice and three extra calculations

### E.1 An index-reading checklist

Before calculating, read the expression aloud. In $A^\mu B_\mu$, one index appears upstairs and downstairs, so sum over it and obtain a scalar. In $C^\mu{}_\nu v^\nu$, the $\nu$ is summed and the $\mu$ remains free: the result is a vector with one upper index.

| Check | A valid example | The mistake it prevents |
|---|---|---|
| Free indices match on both sides | $a^\mu=b^\mu$ | Equating objects of different tensor type. |
| A dummy appears twice in a term | $A^\mu B_\mu$ | An ambiguous threefold repetition. |
| Rename an entire dummy pair | $A^\mu B_\mu=A^\alpha B_\alpha$ | Changing only half a contraction. |
| An inverse is a matrix inverse | $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu{}_\nu$ | Taking elementwise reciprocals. |
| Raising uses the metric | $v^\mu=g^{\mu\nu}v_\nu$ | Changing an index position without applying the metric. |
| A trace knows the dimension | $\delta^\mu{}_\mu=4$ | Forgetting that the repeated pair is summed. |

For an antisymmetric $A^{\mu\nu}$ and symmetric $S_{\mu\nu}$, the contraction vanishes. Rename $\mu\leftrightarrow\nu$ throughout: $S_{\mu\nu}A^{\mu\nu}=S_{\nu\mu}A^{\nu\mu}=-S_{\mu\nu}A^{\mu\nu}$. A number equal to its own negative is zero. This small argument removes many apparently complicated terms.

### E.2 A scalar field: when is it dust, and when is it not?

**Problem.** In units $c=\hbar=1$, a homogeneous canonical scalar field has $\epsilon=\dot\phi^2/2+V(\phi)$ and $p=\dot\phi^2/2-V(\phi)$. Find its equation of state when $V=0$. Then explain how an oscillating massive scalar can instead act like dust.

<details class="checkpoint"><summary>Work it out, then reveal the solution</summary>

If $V=0$ and the field has nonzero kinetic energy, $p=\epsilon$, so $w=p/\epsilon=1$. This is called stiff matter, not dust. The continuity equation then gives $\epsilon\propto a^{-6}$.

For a quadratic potential $V=m^2\phi^2/2$, and oscillations much faster than cosmic expansion, a cycle average has $\langle\dot\phi^2/2\rangle=\langle V\rangle$. One way to see it is to approximate $\phi=A\cos(mt)$ over a cycle: sine squared and cosine squared have equal averages. Thus $\langle p\rangle\simeq0$ while $\langle\epsilon\rangle>0$, the dust-like result. It requires the massive potential and the separation of timescales. A field dominated by a slowly varying potential instead has $p\simeq-\epsilon$.

</details>

### E.3 Trace reversal in any dimension

**Problem.** Let spacetime have dimension $n$. Take the trace of $R_{\mu\nu}-Rg_{\mu\nu}/2+\Lambda g_{\mu\nu}=\kappa T_{\mu\nu}$, then solve for $R_{\mu\nu}$ when $n\ne2$.

<details class="checkpoint"><summary>Reveal the contraction, one step at a time</summary>

Contract with $g^{\mu\nu}$. Since $g^{\mu\nu}g_{\mu\nu}=n$, we get $(1-n/2)R+n\Lambda=\kappa T$. Therefore $R=2(n\Lambda-\kappa T)/(n-2)$. Substitute it back:

$$
R_{\mu\nu}=\kappa\left(T_{\mu\nu}-\frac{T}{n-2}g_{\mu\nu}\right)
+\frac{2\Lambda}{n-2}g_{\mu\nu}.
$$

In four dimensions this recovers the familiar half-trace term. In two dimensions division by $n-2$ is forbidden. Instead the trace equation gives $2\Lambda=\kappa T$, and the Einstein tensor vanishes identically. Other two-dimensional gravity theories can still have dynamics; this result concerns the Einstein–Hilbert metric theory.

</details>

### E.4 Pressure and light bending are different questions

**Problem.** In an isotropic rest frame with $\Lambda=0$, compare the initial small-ball focusing source for dust with that for radiation at the same energy density $\epsilon$. Does this derive the factor of two in deflection of a ray by the Sun?

<details class="checkpoint"><summary>Reveal the answer and the important distinction</summary>

For an initially comoving infinitesimal ball, the rest-frame focusing source is proportional to $\epsilon+3p$. Dust has $p=0$ and isotropic radiation has $p=\epsilon/3$, so their sources are $\epsilon$ and $2\epsilon$ respectively. This is a statement about different matter stress tensors sourcing Ricci curvature.

Deflection of a ray around the Sun is a different problem: the exterior is approximately vacuum and its metric has both temporal and spatial weak-field contributions. Their combined effect gives twice the deflection obtained from keeping the temporal contribution alone. The two factors of two should not be identified as the same derivation. Nor does the pressure of radiation double the total mass of a sealed photon box; the container's stresses must be included.

</details>
