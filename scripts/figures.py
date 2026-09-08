"""Reproducible, accessible vector figures. Coordinates follow stated models.

All figures are original schematic/analytic diagrams, not external illustrations.
The manifest supplies chapter placement, limitations, and explanatory captions.
"""
from pathlib import Path
from math import sin, cos, pi, sqrt, exp
import json, html

OUT=Path('assets/figures'); OUT.mkdir(parents=True,exist_ok=True)
INK='#183746'; MUTED='#526e7b'; TEAL='#087f8c'; ORANGE='#b95730'; BLUE='#4267a1'; GOLD='#b18225'; LINE='#d5e2e7'
manifest=[]
def text(x,y,s,size=20,color=INK,anchor='start',weight=400):
 return f'<text x="{x:.2f}" y="{y:.2f}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{html.escape(str(s))}</text>'
def line(x1,y1,x2,y2,color=LINE,w=2,dash='',arrow=False):
 return f'<path d="M{x1:.2f},{y1:.2f} L{x2:.2f},{y2:.2f}" fill="none" stroke="{color}" stroke-width="{w}"'+(f' stroke-dasharray="{dash}"' if dash else '')+(f' marker-end="url(#{color[1:]})"' if arrow else '')+'/>'
def poly(points,color=TEAL,w=3,fill='none',dash=''):
 return f'<path d="'+ ' '.join(('M' if i==0 else 'L')+f'{x:.2f},{y:.2f}' for i,(x,y) in enumerate(points))+f'" stroke="{color}" stroke-width="{w}" fill="{fill}"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'
def circle(x,y,r=5,color=TEAL,fill=None):
 return f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r:.2f}" stroke="{color}" fill="{fill or color}" stroke-width="2"/>'
def ellipse(x,y,rx,ry,color=TEAL,fill='none',dash=''):
 return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{color}" stroke-width="3" stroke-dasharray="{dash}"/>'
def rect(x,y,w,h,fill='#fff',stroke=LINE,rx=8):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'
def label(x,y,title,subtitle=None,color=TEAL):
 return text(x,y,title,22,color,weight=650)+(text(x,y+28,subtitle,17,MUTED) if subtitle else '')
def axes(x,y,w,h,xlabel,ylabel):
 vertical=f'<g transform="rotate(-90 {x-40} {y-h/2})">'+text(x-40,y-h/2,ylabel,18,MUTED,'middle')+'</g>'
 return line(x,y,x+w,y,MUTED,2,arrow=True)+line(x,y,x,y-h,MUTED,2,arrow=True)+text(x+w,y+35,xlabel,18,MUTED,'end')+vertical
def plot(fn,x0,x1,px,py,w,h,ymin,ymax,n=150,color=TEAL,dash=''):
 pts=[(px+w*i/n,py-h*(fn(x0+(x1-x0)*i/n)-ymin)/(ymax-ymin)) for i in range(n+1)]
 return poly(pts,color,3,dash=dash)
def save(id,ch,title,alt,caption,body,height=480,after=None):
 number=len(manifest)+1
 defs=''.join(f'<marker id="{c[1:]}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{c}"/></marker>' for c in [INK,MUTED,TEAL,ORANGE,BLUE,GOLD,LINE])
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {height}" width="1000" height="{height}" role="img" aria-labelledby="title desc"><title id="title">{html.escape(title)}</title><desc id="desc">{html.escape(alt+" "+caption)}</desc><defs>{defs}</defs><rect width="1000" height="{height}" fill="#f6f9fa"/><g font-family="Arial, Helvetica, sans-serif" stroke-linejoin="round" stroke-linecap="round">'+text(36,37,f'{number:02d} / '+title.upper(),14,MUTED,weight=650)+body+'</g></svg>'
 (OUT/f'{id}.svg').write_text(svg)
 manifest.append(dict(id=id,number=number,chapter=ch,title=title,alt=alt,caption=caption,width=1000,height=height,after=after))

# 0: a numerical tangent-line comparison.
b=axes(85,375,420,255,'time t','position x')
b+=plot(lambda t:t*t,0,3,85,375,390,240,0,9)
b+=plot(lambda t:4*t-4,1,3,215,375,260,240,0,9,color=ORANGE,dash='7 5')
b+=circle(345,375-240*4/9,6,TEAL)+text(355,250,'t = 2',17)
b+=label(565,130,'Derivative → local slope','At t = 2, the slope of x = t² is 4.')
b+=line(570,191,920,191)+text(565,234,'x(2 + Δt) ≈ 4 + 4Δt',28,ORANGE)
b+=text(565,283,'The line matches value and slope.',19)+text(565,316,'The curve reveals the next-order change.',19)
b+=text(85,435,'Curve: x = t²',18,TEAL)+text(285,435,'Tangent: x = 4t − 4',18,ORANGE)
save('local-prediction',0,'A derivative predicts the next small step','A parabola and its tangent at t=2. They meet with equal slope but differ away from the contact point.','The tangent captures the value and first derivative. Curvature enters at the next order; the same hierarchy will appear in a local expansion of the metric.',b)

# 1: relative motion, not a force-field cartoon.
b=label(55,90,'One falling observer','An accelerometer reads zero.')+label(545,90,'Two falling observers','Their separation can change.')
b+=line(480,80,480,390)
b+=axes(115,370,275,210,'position','time')
b+=poly([(240+28*sin(i/50),355-i*4) for i in range(50)],TEAL,4)
b+=circle(253,265,7,TEAL)+text(280,260,'0 g',26,TEAL)
b+=axes(595,370,330,210,'position','time')
for sign in [-1,1]:b+=poly([(760+sign*(70-35*(i/50)**2),355-i*4) for i in range(50)],TEAL,4)
b+=line(690,350,830,350,ORANGE,2,arrow=True)+text(760,335,'initial gap',17,ORANGE,'middle')
b+=line(725,156,795,156,ORANGE,2,arrow=True)+text(822,166,'smaller gap',17,ORANGE)
b+=text(55,440,'A schematic of tangential convergence near Earth. Neither observer feels a local force.',19,MUTED)
save('free-fall-comparison',1,'One laboratory is not enough','One worldline is compared with a pair of approaching free-fall worldlines, with time increasing upward.','The paired experiment measures relative acceleration. Curved drawn paths are coordinate schematics; their appearance alone is not evidence of curvature.',b)

# 2: covector level sets and pairing.
b=label(50,90,'A vector supplies a displacement','v = (3, 2)')+label(545,90,'A covector asks a linear question','ω = dx, so ω(v) = 3')
b+=axes(90,360,340,210,'x','y')
for i in range(5):b+=line(90+i*70,345,90+i*70,160,LINE,2)+text(90+i*70,387,str(i),17,MUTED,'middle')
b+=line(90,360,300,220,TEAL,4,arrow=True)+text(280,200,'v',27,TEAL)
b+=line(90,360,300,360,ORANGE,4,arrow=True)
for i in range(5):b+=line(590+i*70,365,590+i*70,170,BLUE,2)+text(590+i*70,396,f'x = {i}',16,MUTED,'middle')
b+=line(590,360,800,220,TEAL,4,arrow=True)+text(625,435,'Three level intervals crossed → answer 3',18,TEAL)
save('vector-covector',2,'Arrows and the questions they answer','A diagonal vector crosses three evenly spaced level intervals of the function x.','The covector dx returns the change in x, not the Euclidean length of the arrow. Changing the coordinate scale changes both components so their pairing stays the same.',b)

# 3: light cones and twins.
b=axes(460,390,430,290,'space x','time ct')
b+=poly([(180,110),(460,390),(740,110)],TEAL,2,fill='#dff0f0')
b+=line(180,110,460,390,TEAL,3)+line(460,390,740,110,TEAL,3)
b+=line(460,390,535,155,ORANGE,4,arrow=True)+text(570,180,'timelike',21,ORANGE)
b+=line(460,390,830,300,BLUE,3,arrow=True)+text(720,280,'spacelike',21,BLUE)
b+=text(460,92,'FUTURE LIGHT CONE',16,TEAL,'middle',650)+text(194,250,'light: |Δx| = cΔt',18,TEAL)
b+=text(52,443,'Signals from the starting event remain on or inside this cone. One space dimension is shown.',18,MUTED)
save('light-cone',3,'The minus sign creates a light cone','Two light rays bound the possible future of an event. A slower-than-light path lies inside, and a spacelike displacement lies outside.','The graph uses the same scale for x and ct. A massive observer follows a timelike worldline; no rest frame exists for a light ray.',b)
b=axes(100,380,470,260,'distance (light-years)','time (years)')
b+=line(160,370,160,120,TEAL,4)+poly([(160,370),(310,245),(160,120)],ORANGE,4)
b+=circle(160,370,6,INK)+circle(160,120,6,INK)
b+=text(130,375,'0',17,MUTED,'end')+text(130,250,'5',17,MUTED,'end')+text(130,125,'10',17,MUTED,'end')+text(310,411,'3',17,MUTED,'middle')
b+=label(630,150,'Home clock','10 years along the vertical path.',TEAL)+label(630,245,'Travelling clock','8 years at speed 0.6c.',ORANGE)
b+=text(630,345,'Same departure. Same reunion.',19)+text(630,376,'Different lengths in spacetime.',19)
save('twin-worldlines',3,'Two histories between the same events','A home clock follows a vertical worldline for ten years. A traveller reaches three light-years in five years and returns in another five.','The idealized travelling clock accumulates 10√(1 − 0.6²) = 8 years. The sharp turnaround is an approximation; the path integral, not a local feeling of slow time, gives the age difference.',b,after='3.5')

# 4: polar grid and metric cell.
b=label(55,90,'A flat plane, with polar labels','A grid can bend without the surface curving.')
ox,oy=265,325
for r in [65,125,185]:b+=poly([(ox+r*cos(t*pi/100),oy-r*sin(t*pi/100)) for t in range(101)],LINE,2)
for t in [0,pi/6,pi/3,pi/2,2*pi/3,5*pi/6,pi]:b+=line(ox,oy,ox+185*cos(t),oy-185*sin(t))
r1,r2,t1,t2=125,185,.5,.9
cell=[(ox+r1*cos(t1+i*(t2-t1)/30),oy-r1*sin(t1+i*(t2-t1)/30)) for i in range(31)]+[(ox+r2*cos(t2-i*(t2-t1)/30),oy-r2*sin(t2-i*(t2-t1)/30)) for i in range(31)]
b+=poly(cell+[cell[0]],TEAL,3,'#d9eeee')+line(ox,oy,ox+125*cos(.5),oy-125*sin(.5),ORANGE,2)+text(330,323,'r',22,ORANGE)
b+=text(428,205,'dr',20,TEAL)+text(380,151,'r dθ',20,TEAL)
b+=label(565,150,'Two physical edge lengths')+text(565,205,'Radial: dr',26,TEAL)+text(565,252,'Angular: r dθ',26,ORANGE)+text(565,320,'ds² = dr² + r²dθ²',29)+text(565,365,'Cell area ≈ r dr dθ',21,MUTED)
save('polar-metric',4,'Coordinates are not rulers','A polar grid has an annular sector highlighted; its radial and angular edges have different measuring factors.','For an infinitesimal cell, the angular edge is r dθ and the radial edge is dr. The finite cell is enlarged for visibility; the plane is intrinsically flat.',b)

# 5: true Rindler hyperbolae x²−(ct)²=ξ².
b=axes(100,375,450,265,'inertial position X','inertial time cT')
for xi,col in [(1,TEAL),(1.65,BLUE),(2.3,ORANGE)]:
 pts=[(100+105*sqrt(xi*xi+t*t),375-85*t) for t in [i*3/120 for i in range(121)]]
 b+=poly(pts,col,3)
b+=line(100,375,415,120,MUTED,2,'6 5')
b+=label(620,150,'Stationary in the rocket','Accelerated in inertial coordinates.')
b+=text(620,223,'X² − (cT)² = ξ²',27,TEAL)+text(620,281,'Different ξ → different accelerations',18)+text(620,321,'Riemann curvature = 0',23,ORANGE)+text(620,359,'A varying clock rate is not proof of tides.',17,MUTED)
save('rindler-worldlines',5,'Acceleration without curvature','Three Rindler hyperbolae lie inside a lightlike asymptote in an inertial spacetime diagram.','Each curve is a stationary rocket-frame observer. In a rigid accelerated laboratory, different heights require different proper accelerations. These worldlines occupy flat Minkowski spacetime.',b)

# 6: east arrows versus polar basis.
b=label(45,90,'Same arrow. Changing local basis.','Each teal arrow points east in the same flat plane.')
ox,oy=370,360
b+=line(100,oy,800,oy)+line(ox,410,ox,140)
for angle in [25,65,125]:
 t=angle*pi/180;x=ox+210*cos(t);y=oy-210*sin(t)
 b+=line(ox,oy,x,y,LINE,2,'5 5')+circle(x,y,4,INK)
 b+=line(x,y,x+95,y,TEAL,4,arrow=True)
 b+=line(x,y,x+60*cos(t),y-60*sin(t),ORANGE,2,arrow=True)
 b+=line(x,y,x-48*sin(t),y-48*cos(t),BLUE,2,arrow=True)
b+=text(690,140,'eastward field',21,TEAL)+text(690,183,'radial direction',21,ORANGE)+text(690,226,'angular direction',21,BLUE)
b+=text(180,443,'Component change + basis change = zero geometric change',23,INK)
save('moving-basis',6,'Different components can describe the same arrow','At three points on a circle the eastward vector stays horizontal while radial and angular basis directions rotate.','The ordinary component derivatives see changing numbers. The connection correction accounts for the basis change. Together they report that this field is constant.',b)

# 7: transport rule, explicit cancellation.
b=label(50,100,'Polar components of an eastward unit vector')
b+=rect(50,145,400,115)+text(250,190,'Vʳ = cos θ',29,TEAL,'middle')+text(250,235,'Vᶿ = −sin θ / r',29,TEAL,'middle')
b+=rect(550,145,400,115)+text(750,186,'Relevant connection coefficient',20,ORANGE,'middle')+text(750,231,'−r',32,ORANGE,'middle')
b+=line(250,275,250,313,TEAL,2,arrow=True)+line(750,275,750,313,ORANGE,2,arrow=True)
b+=text(500,365,'−sin θ  +  (−r)(−sin θ/r)  =  0',31,INK,'middle')
b+=text(500,425,'Partial change + basis correction = zero covariant change.',21,MUTED,'middle')
save('connection-cancellation',7,'The connection cancels a false change','The partial derivative of the radial vector component is minus sine theta; its Christoffel correction is plus sine theta.','This is an exact calculation on the flat polar plane. The derivative direction is θ. The full indexed equation in the chapter identifies the single connection coefficient used in this cancellation.',b)

# 8: orthographic projection of an octant and true parallel transport.
def project(v):
 x,y,z=v;return (330+235*(.70710678*x-.70710678*y),290+235*(.40824829*x+.40824829*y-.81649658*z))
b=label(585,105,'Three right-angle turns','A spherical octant has angle excess π/2.')
b+=circle(330,290,235,LINE,'#e9f0f3')
for z in [-.5,0,.5]:
 rr=sqrt(1-z*z);b+=poly([project((rr*cos(i*pi/60),rr*sin(i*pi/60),z)) for i in range(121)],LINE,1)
paths=[[(sin(t*pi/200),0,cos(t*pi/200)) for t in range(101)],[(cos(t*pi/200),sin(t*pi/200),0) for t in range(101)],[(0,cos(t*pi/200),sin(t*pi/200)) for t in range(101)]]
for pts in paths:b+=poly([project(p) for p in pts],TEAL,4)
P,A,B=project((0,0,1)),project((1,0,0)),project((0,1,0))
for name,p,dx,dy in [('P',P,-20,-14),('A',A,14,5),('B',B,-23,5)]:b+=circle(*p,5,INK)+text(p[0]+dx,p[1]+dy,name,22)
b+=line(*P,P[0]+65*.707,P[1]+65*.408,ORANGE,3,arrow=True)
b+=line(*P,P[0]-65*.707,P[1]+65*.408,BLUE,3,arrow=True)
b+=text(585,195,'Start: toward A',22,ORANGE)+text(585,239,'Return: perpendicular to start',22,BLUE)
b+=text(585,310,'Transport: P → A → B → P',21,TEAL)+text(585,361,'Rotation = area / radius² = π/2',21)
b+=text(585,414,'The arrow never twists within its tangent plane.',17,MUTED)
save('sphere-holonomy',8,'A sphere remembers the loop','An orthographic spherical octant connects the north pole with two equatorial points ninety degrees apart. The returned tangent arrow differs from the initial arrow.','Great-circle transport around this octant rotates a tangent vector by 90°. Projection changes apparent angles on the page; the right angles and 90° rotation are intrinsic to the sphere.',b,height=560)

# 9: initial trace versus shear. Ellipses represent principal cross-sections.
b=label(50,100,'Isotropic initial squeeze','The trace is nonzero.')+label(555,100,'Trace-free initial distortion','Stretch one way; squeeze another.')
for cx in [230,745]:b+=circle(cx,280,95,MUTED,'none')
b+=circle(230,280,72,TEAL,'#e3f0f0')
b+=ellipse(745,280,120,70,ORANGE,'#f8ebe4')
b+=text(230,420,'Volume acceleration is negative',20,TEAL,'middle')+text(745,420,'Initial volume acceleration can be zero',20,ORANGE,'middle')
save('ricci-weyl',9,'Volume and shape ask different questions','An initial circular section is compared with a smaller circle and with a stretched ellipse.','These are exaggerated cross-sections of infinitesimal clouds, not exact finite volume-preserving motions. The trace controls initial volume acceleration for an initially comoving cloud; shear can later change the volume.',b)

# 10: Newtonian tidal eigenvalues, a cloud and values.
b=label(50,95,'Vacuum tides near a spherical mass','Radial stretching balances two tangential squeezes.')
cx,cy=270,280
b+=circle(cx,cy,65,MUTED,'none')
for x,y,dx,dy in [(270,215,0,-55),(270,345,0,55),(205,280,35,0),(335,280,-35,0)]:b+=circle(x,y,5,TEAL)+line(x,y,x+dx,y+dy,TEAL,3,arrow=True)
b+=text(250,165,'radial',18,TEAL,'end')
b+=rect(590,145,345,255)+text(625,190,'Relative acceleration / separation',16,MUTED)+text(625,245,'radial      +2GM/r³',25,TEAL)+text(625,291,'tangent    −GM/r³',25,ORANGE)+text(625,337,'tangent    −GM/r³',25,ORANGE)+text(625,377,'sum = 0 in exterior vacuum',18)
b+=text(45,448,'Earth, at its surface: radial separation acceleration ≈ 3.08 μm/s² per metre of separation.',18,MUTED)
save('tidal-eigenvalues',10,'Stretching and squeezing near Earth','Radial particles accelerate apart; tangential particles accelerate toward one another. The three tidal acceleration eigenvalues sum to zero.','The labels give eigenvalues of the Newtonian relative-acceleration matrix, not curvature components: divide by c² for the corresponding curvature scale, with the convention-dependent sign tracked in the text.',b)

# 11: source matrix; units explicit.
b=label(50,100,'Energy and momentum, in one local inertial frame','Coordinates x⁰ = ct. Every entry has energy-density units.')
labels=[['ε','Sₓ/c','Sᵧ/c','S𝓏/c'],['cπₓ','σₓₓ','σₓᵧ','σₓ𝓏'],['cπᵧ','σᵧₓ','σᵧᵧ','σᵧ𝓏'],['cπ𝓏','σ𝓏ₓ','σ𝓏ᵧ','σ𝓏𝓏']]
for i in range(4):
 for j in range(4):
  color='#d9eeee' if i==j==0 else '#f6e8de' if i==0 or j==0 else '#e3eaf5'
  b+=rect(75+j*90,155+i*60,85,55,color,LINE,4)+text(117+j*90,191+i*60,labels[i][j],24,INK,'middle')
b+=label(535,177,'Energy density','ε: what the observer finds locally.',TEAL)+label(535,261,'Energy flow ↔ momentum density','For symmetric T: S/c = cπ.',ORANGE)+label(535,345,'Stress','Diagonal pressure; off-diagonal shear.',BLUE)
save('stress-energy',11,'The source has more than one kind of entry','A four-by-four stress-energy matrix colors energy density, mixed energy-momentum entries, and spatial stresses differently.','S is energy flux, π is momentum density, and σ denotes the spatial stress entries using the momentum-flux convention. The tensor is symmetric in ordinary metric GR.',b)

# 12: geometry-to-matter equation anatomy.
b=label(50,100,'A local equation at every event','Ten symmetric component equations, tied together by identities and constraints.')
for x,w,title,sub,color in [(50,280,'Einstein tensor','Ricci − ½ trace × metric',TEAL),(360,230,'Vacuum term','Λ × metric',GOLD),(640,310,'Matter & energy','(8πG/c⁴) × stress-energy',ORANGE)]:
 b+=rect(x,155,w,155,'#fff',color)+text(x+w/2,213,title,25,color,'middle',650)+text(x+w/2,260,sub,17,MUTED,'middle')
b+=text(345,243,'+',30,INK,'middle')+text(615,243,'=',30,INK,'middle')
b+=text(195,377,'Geometric response',20,TEAL,'middle')+text(795,377,'Physical source',20,ORANGE,'middle')
b+=line(320,366,630,366,MUTED,2,arrow=True)+text(500,442,'Each term is a tensor. A single component depends on the chosen frame.',19,MUTED,'middle')
save('einstein-anatomy',12,'Read the equation as a relationship','The Einstein tensor and vacuum term stand opposite the coupled stress-energy tensor.','The equation constrains spacetime geometry and matter together. It is not a recipe that chooses arbitrary matter independently of its own dynamics and conservation.',b)

# 13: variations with endpoints fixed.
b=axes(85,375,450,255,'time','position')
for eps,col in [(-.42,BLUE),(.42,ORANGE),(0,TEAL)]:b+=plot(lambda t:.3+.45*t+eps*sin(pi*t),0,1,120,375,370,250,0,1,color=col)
for x,y in [(120,300),(490,187.5)]:b+=circle(x,y,6,INK)
b+=label(590,140,'Vary the route, not its endpoints','xε(t) = x(t) + εη(t)')
b+=text(590,222,'η(t₁) = η(t₂) = 0',27,TEAL)+text(590,290,'Every nearby path has an action S(ε).',18)+text(590,332,'Stationarity asks for dS/dε = 0.',21,ORANGE)
b+=text(590,380,'The varied paths need not obey the motion law.',16,MUTED)
save('action-variation',13,'A derivative of whole paths','Three curves share fixed initial and final positions; a smooth variation changes their interiors.','A variation is a mathematical comparison with nearby candidate histories. The physical stationary path is found by requiring the first action change to vanish for every allowed variation.',b)

# 14: product-rule variation flow.
b=label(50,100,'The product rule behind Einstein’s equation','Vary both factors in √−g R.')
for x,title,formula,color in [(65,'Curvature changes','√−g δR',TEAL),(545,'Volume changes','R δ√−g',ORANGE)]:
 b+=rect(x,150,385,95,'#fff',color)+text(x+192,190,title,23,color,'middle')+text(x+192,224,formula,24,color,'middle')
 b+=line(x+192,255,x+192,295,color,2,arrow=True)
b+=text(258,333,'Ricci + a boundary divergence',23,TEAL,'middle')+text(738,333,'−½ scalar curvature × metric',23,ORANGE,'middle')
b+=line(258,350,460,398,TEAL,2,arrow=True)+line(738,350,540,398,ORANGE,2,arrow=True)+text(500,440,'Together: the Einstein tensor',26,INK,'middle')
save('action-product-rule',14,'Two variations make one field equation','A two-branch flowchart separates the variation of scalar curvature from the variation of the invariant volume.','The boundary divergence requires its own treatment. After that treatment, the bulk coefficient of the arbitrary inverse-metric variation is the Einstein tensor.',b)

# 15: symmetry and conserved energy.
b=label(45,95,'A time-translation symmetry','The geometry repeats under a shift in time.')
b+=axes(100,365,350,220,'space','time')
for y in [180,245,310]:
 b+=poly([(120+i*3,y+15*sin(i/13)) for i in range(100)],TEAL,2)
b+=line(420,320,420,180,ORANGE,3,arrow=True)+text(440,258,'ξ',27,ORANGE)
b+=label(565,145,'Killing vector ξ','A direction along which the metric is unchanged.')
b+=text(565,230,'Eξ = −p · ξ',30,TEAL)+text(565,280,'Constant along a free geodesic.',20)
b+=text(565,345,'No such symmetry in general?',21,ORANGE)+text(565,385,'Then no automatic conserved energy of this form.',16,MUTED)
save('killing-energy',15,'A symmetry supplies an energy comparison','Repeated geometric slices are connected by a time-translation vector, next to the conserved pairing minus p dot xi.','The drawing is schematic. A timelike Killing vector provides a stationary energy; normalization and the observer’s local energy measurement must still be specified.',b)

# 16: numerical GPS graph.
R=6371000;GM=3.986004418e14;c=299792458
def gps(h):r=R+h*1000;return GM/c**2*(1/R-1.5/r)*86400*1e6
b=axes(105,380,510,260,'','net clock gain (μs/day)')+text(345,451,'altitude (thousand km)',18,MUTED,'middle')
ymin,ymax=-35,60
b+=line(105,380-260*(0-ymin)/(ymax-ymin),600,380-260*(0-ymin)/(ymax-ymin),MUTED,1,'6 5')
b+=plot(gps,0,36000,105,380,480,260,ymin,ymax)
for h in [0,10000,20000,30000]:b+=text(105+480*h/36000,407,str(h//1000),16,MUTED,'middle')
for v in [-30,0,30,60]:b+=text(90,385-260*(v-ymin)/(ymax-ymin),str(v),16,MUTED,'end')
b+=circle(105+480*20200/36000,380-260*(gps(20200)-ymin)/(ymax-ymin),6,ORANGE)
b+=label(655,145,'GPS altitude ≈ 20,200 km','Net: about +38.5 μs per day.',ORANGE)
b+=label(655,255,'Crossover at h = R / 2','About 3,186 km above the surface.',TEAL)
b+=text(655,349,'Above: orbital clock gains time.',19)+text(655,387,'Below: orbital clock loses time.',19)
save('gps-clocks',16,'Altitude and motion compete','A net orbital-clock gain curve crosses zero near 3186 km and is positive at GPS altitude.','Calculated for circular orbits around a nonrotating spherical Earth and compared with a stationary surface clock. Real GPS also models rotation, eccentricity, the geoid, and signal propagation.',b,after='16.7')
# A lensing ray represented by integrated first-order slope.
b=label(50,90,'Both clock and spatial terms affect light','A weak-field ray past a spherical mass; deflection exaggerated.')
b+=circle(490,305,48,ORANGE,'#f4e5db')+text(490,312,'M',27,ORANGE,'middle')
b+=line(65,185,930,185,MUTED,2,'6 5')
pts=[]
for i in range(251):
 x=-5+10*i/250;y=.045*(x+sqrt(x*x+1));pts.append((70+85*i/25,190+130*y))
b+=poly(pts,TEAL,4)+line(490,305,490,190,BLUE,2)+text(506,258,'b',24,BLUE)
b+=text(85,165,'incoming direction',18,MUTED)+text(685,342,'α ≈ 4GM / (c²b)',30,TEAL)
b+=text(55,440,'b is the impact parameter in the weak-field, asymptotically flat description.',19,MUTED)
save('light-bending',16,'A ray samples more than the clock rate','A light ray bends toward a mass relative to its straight incoming reference line; the impact parameter is marked.','This is the shape from a first-order weak-field deflection profile, with its amplitude enlarged. The book derives why keeping only the clock term misses half the leading GR deflection.',b,after='16.4')

# 17: EF light cones, exact outgoing slope in v,r mapped to T=v-r.
b=label(50,90,'Regular horizon coordinates','Ingoing Eddington–Finkelstein time, drawn with T = v − r and c = 1.')
b+=axes(80,390,840,250,'radius r / rₛ','T / rₛ')
hx=80+240;b+=rect(hx,155,2,235,ORANGE,ORANGE,0)+text(hx+15,178,'horizon r = rₛ',18,ORANGE)
for r in [.5,1,1.6,2.7]:
 x=80+240*r;y=345;dt=115
 # ingoing dr/dT=-1; outgoing dr/dT=(r-1)/(r+1)
 left=(x-80,y-dt);right=(x+80*(r-1)/(r+1),y-dt)
 b+=poly([left,(x,y),right,left],TEAL,2,'#dceeee')+line(x,y,*left,TEAL,2,arrow=True)+line(x,y,*right,TEAL,2,arrow=True)
 b+=text(x,420,str(r),17,MUTED,'middle')
b+=text(70,462,'Inside: every future light direction goes to smaller r.',19,ORANGE)+text(580,462,'Outside: an outward ray can escape.',19,TEAL)
save('horizon-cones',17,'A horizon changes which way the future goes','At four radii, future radial light cones tilt inward. The outward generator is vertical at the horizon and points toward smaller radius inside.','The diagram uses regular ingoing coordinates, not singular Schwarzschild time. Cone slopes follow dr/dT = −1 and (r − rₛ)/(r + rₛ). T is a drawing coordinate, not a freely falling clock reading.',b,height=505,after='17.3')
b=label(45,90,'Three radii, three questions','For a nonrotating, uncharged black hole.')
cx,cy=320,290
for radius,col in [(170,BLUE),(85,GOLD),(56.6667,TEAL)]:b+=circle(cx,cy,radius,col,'none')
b+=circle(cx,cy,4,INK)
for yy,title,sub,col in [(170,'Horizon · 2GM/c²','Boundary of causal escape',TEAL),(265,'Photon sphere · 3GM/c²','Unstable circular light orbits',GOLD),(360,'ISCO · 6GM/c²','Innermost stable circular timelike orbit',BLUE)]:
 b+=label(565,yy,title,sub,col)
save('black-hole-radii',17,'Do not merge these three radii','Three concentric circles have coordinate radii in the ratio two to three to six.','Circle radii are proportional to the Schwarzschild areal coordinate r. The drawing is a radial coordinate guide, not an isometric picture of spatial proper distances.',b)

# 18: polarizations exact first-order displacement at maximum strain.
b=label(50,90,'Plus polarization','Axes stretch and squeeze in alternation.')+label(555,90,'Cross polarization','The same pattern, rotated by 45°.')
for cx,angle in [(250,0),(750,pi/4)]:
 b+=circle(cx,285,105,MUTED,'none')
 pts=[]
 for i in range(129):
  a=2*pi*i/128;x=132*cos(a);y=78*sin(a);pts.append((cx+x*cos(angle)-y*sin(angle),285+x*sin(angle)+y*cos(angle)))
 b+=poly(pts,TEAL if angle==0 else ORANGE,3)
 for i in range(16):
  a=2*pi*i/16;x=132*cos(a);y=78*sin(a);b+=circle(cx+x*cos(angle)-y*sin(angle),285+x*sin(angle)+y*cos(angle),5,TEAL if angle==0 else ORANGE)
b+=text(500,447,'Reference ring: gray. One exaggerated wave phase: colored. Propagation is perpendicular to the page.',17,MUTED,'middle')
save('wave-polarizations',18,'Two independent patterns of strain','Two test-particle rings are distorted into ellipses along axes separated by forty-five degrees.','The figure shows a local detector-frame interpretation at one phase, to first order in strain. Real astrophysical strains at Earth are vastly smaller; the interactive figure lets you move through a cycle.',b)

# 19: analytic scale factors, all a(1)=1.
b=axes(85,380,500,255,'','scale factor a / a₀')+text(325,453,'time / reference time',18,MUTED,'middle')
for fn,col in [(lambda t:sqrt(t),ORANGE),(lambda t:t**(2/3),TEAL),(lambda t:exp((t-1)*2/3),BLUE)]:b+=plot(fn,0,3,85,380,465,240,0,4,color=col)
for i in range(4):b+=text(85+155*i,411,str(i),17,MUTED,'middle')+text(70,386-i*60,str(i),17,MUTED,'end')
b+=label(635,150,'Radiation: a ∝ t¹ᐟ²','Expands, but decelerates.',ORANGE)+label(635,248,'Dust: a ∝ t²ᐟ³','Expands, but decelerates.',TEAL)+label(635,346,'Positive Λ: a ∝ exp(Ht)','Accelerated expansion.',BLUE)
save('cosmic-expansion',19,'Expansion is not the same as acceleration','Radiation and dust scale factors grow with downward curvature; a positive cosmological-constant model grows exponentially.','Each ideal flat model is normalized to a(1)=1. The exponential curve uses H=2/3 in these plot units; it does not begin with a finite-time big bang in this slicing. These are separate single-component universes.',b)

# 20: ADM geometrical projection.
b=label(45,90,'A coordinate step between spatial slices','The split is bookkeeping, not a preferred cosmic clock.')
for y,name in [(200,'next slice'),(370,'initial slice')]:
 b+=poly([(100,y),(730,y),(865,y-65),(235,y-65),(100,y)],MUTED,2,fill='#e9f0f3')+text(785,y+5,name,18,MUTED)
p=(325,335);q=(465,165);n=(325,165)
b+=line(*p,*n,TEAL,4,arrow=True)+line(*n,*q,ORANGE,4,arrow=True)+line(*p,*q,BLUE,3,arrow=True)
b+=circle(*p,5,INK)+text(220,270,'lapse × normal',19,TEAL)+text(390,145,'shift',20,ORANGE,'middle')+text(480,270,'coordinate-time step',20,BLUE)
b+=text(70,445,'Spatial metric γ: measurements within a slice. Extrinsic curvature K: how that slice sits in spacetime.',17,MUTED)
save('adm-slicing',20,'Lapse and shift separate two choices','A diagonal coordinate-time step is decomposed into a normal step between slices and a tangential shift.','Lapse controls normal proper-time separation; shift controls the tangential relabeling. Arrow lengths are schematic and do not represent an ordinary Euclidean decomposition of a Lorentzian norm.',b)

# 21: frame and coordinate lengths on sphere.
b=label(45,95,'Coordinates versus local physical components','A coframe converts coordinate changes into ruler readings.')
for x,title,rows,col in [(55,'Flat polar plane',['e¹ = dr','e² = r dθ','ω¹₂ = −dθ','Ω¹₂ = 0'],TEAL),(550,'Round sphere of radius a',['e¹ = a dθ','e² = a sinθ dφ','ω¹₂ = −cosθ dφ','Ω¹₂ = e¹ ∧ e² / a²'],ORANGE)]:
 b+=rect(x,145,395,255,'#fff',col)+text(x+197,184,title,24,col,'middle',650)
 for i,row in enumerate(rows):b+=text(x+35,232+i*43,row,25,col if i==3 else INK)
b+=text(500,449,'A nonzero connection occurs in both. A nonzero curvature two-form distinguishes the sphere.',18,MUTED,'middle')
save('cartan-comparison',21,'Same method, different curvature','Side-by-side coframe, connection, and curvature formulas compare the polar plane with the sphere.','These are local formulas on regular angular charts. The polar origin and sphere poles need other frames; a singular coordinate expression there is not an extra curvature singularity.',b)

# 22: caustic and focusing inequality.
b=axes(80,385,400,250,'position','affine time')
for x in [140,205,270,335,400]:b+=line(x,365,270,165,TEAL,3)
b+=circle(270,165,7,ORANGE)+text(300,150,'caustic',21,ORANGE)
b+=label(565,140,'Convergence can have a deadline','If θ₀ < 0 and dθ/dτ ≤ −θ²/3,')
b+=text(565,233,'τfocus ≤ 3 / |θ₀|',31,TEAL)+text(565,297,'But straight lines can cross in flat spacetime.',17)+text(565,345,'Caustic ≠ singular spacetime',24,ORANGE)+text(565,390,'Global hypotheses do the extra work.',18,MUTED)
save('focusing-caustic',22,'Focusing is not yet a singularity','Five straight timelike paths converge to a caustic, alongside the focusing time bound.','This flat-spacetime schematic intentionally has no curvature. Raychaudhuri can force a congruence to focus, but singularity theorems require additional causal and global assumptions to conclude geodesic incompleteness.',b)

# 23: effective theory scale hierarchy.
b=label(45,95,'Ask a theory questions at the scale it resolves','The expansion parameter is energy / cutoff, or microscopic length / wavelength.')
b+=line(100,260,900,260,INK,3,arrow=True)
for x,name,col in [(150,'long wavelength',TEAL),(485,'shorter wavelength',BLUE),(815,'near the cutoff',ORANGE)]:
 b+=line(x,250,x,270,col,3)+text(x,307,name,20,col,'middle')
b+=text(180,202,'controlled corrections',22,TEAL)+text(680,202,'no small parameter',22,ORANGE)
b+=text(500,380,'Leading theory + smaller terms + smaller terms + …',29,INK,'middle')
b+=text(500,432,'The coefficients encode unresolved physics; the ordering makes low-energy calculations useful.',17,MUTED,'middle')
save('effective-theory',23,'A theory has a resolution scale','A scale axis progresses from long wavelengths with controlled corrections toward a cutoff with no small expansion parameter.','This is a hierarchy diagram, not a measured error curve. The cutoff depends on the theory and physical setting; the text distinguishes gravitational scales from other possible new-physics scales.',b)

# 24: calculation map.
b=''
steps=[('1','Specify the metric','Coordinates and units'),('2','Compute the connection','First derivatives of g'),('3','Compute curvature','Derivatives + products of Γ'),('4','Choose the observer','Four-velocity or tetrad'),('5','Predict a measurement','Clock, ray, orbit, or tide'),('6','Check a familiar limit','Signs, units, and physics')]
for i,(n,title,sub) in enumerate(steps):
 col=i%3;row=i//3;x=45+col*322;y=105+row*180
 b+=rect(x,y,285,125,'#fff',TEAL if row==0 else ORANGE)+text(x+20,y+32,n,18,TEAL if row==0 else ORANGE,weight=700)+text(x+20,y+64,title,21,INK,weight=650)+text(x+20,y+96,sub,16,MUTED)
 if col<2:b+=line(x+291,y+63,x+313,y+63,MUTED,2,arrow=True)
b+=text(500,467,'The invariant prediction is the destination. The coordinates are the route.',20,INK,'middle')
save('calculation-map',24,'From a metric to a measurement','Six stages organize a general relativity calculation, from specifying the metric to checking physical limits.','The observer can often be chosen earlier. This map is a practical organizing sequence; it is not a claim that every problem needs every tensor computed explicitly.',b,height=505)

# Additional figures sit at the exact argument they clarify, beyond chapter openers.
b=label(45,90,'A route through discovery','The teaching sequence is not the historical sequence.')
events=[('1687','Newton','one law of gravity'),('1905','Einstein','special relativity'),('1907','Free fall','equivalence principle'),('1908','Minkowski','spacetime geometry'),('1912–13','Grossmann','geometric collaboration'),('1915','Field equation','the November papers'),('1916','Schwarzschild','a spherical solution'),('1963','Kerr','a rotating solution'),('1974','Hawking','black-hole radiation'),('2015','LIGO','first direct GW detection')]
for i,(date,name,note) in enumerate(events):
 col=i%5;row=i//5;x=55+190*col;y=175+row*175
 b+=line(x,y,x+145,y,LINE,3)+circle(x,y,5,TEAL)+text(x,y-20,date,23,TEAL,weight=650)+text(x,y+37,name,19,INK,weight=600)
 for j,part in enumerate(note.split(' ',1)):b+=text(x,y+66+23*j,part,16,MUTED)
save('historical-timeline',1,'A century of consequences','Ten dated milestones progress from Newton’s Principia to the first direct gravitational-wave detection.','Dates label selected developments, not a complete priority history. The 2015 LIGO event was publicly reported in 2016. The text discusses the collaborative and iterative development of the field equations.',b,height=495,after='1.9')

b=label(45,95,'The determinant measures area scaling','A unit coordinate square maps to a parallelogram.')
b+=axes(85,370,330,215,'x','y')+poly([(125,330),(265,330),(265,190),(125,190),(125,330)],TEAL,3,'#dceeee')
b+=line(430,270,535,270,MUTED,2,arrow=True)
b+=poly([(610,350),(840,350),(910,180),(680,180),(610,350)],ORANGE,3,'#f7e7dd')
b+=text(195,410,'coordinate area = 1',20,TEAL,'middle')+text(760,410,'physical area = |det A|',20,ORANGE,'middle')
b+=text(500,465,'For a Euclidean Gram metric g = AᵀA, √det g = |det A|.',23,INK,'middle')
save('metric-volume',4,'Why a determinant belongs in the volume','A square transforms into a parallelogram under a linear map; the absolute determinant is its area scaling.','This Euclidean two-dimensional example explains the square root of the metric determinant. In four-dimensional Lorentzian geometry the positive measure uses √(−g). The drawn transformation is illustrative.',b,height=505,after='4.7')

b=label(45,95,'The same path can wear different parameters','The curve stays fixed; the labels along it can speed up or slow down.')
for y,title,pts,col in [(200,'Affine parameter',[80+i*110 for i in range(8)],TEAL),(350,'Non-affine parameter',[80+770*(.15*i/7+.85*(i/7)**2) for i in range(8)],ORANGE)]:
 b+=line(65,y,920,y,MUTED,2)
 for i,x in enumerate(pts):b+=circle(x,y,6,col)+text(x,y+36,str(i),17,col,'middle')
 b+=text(65,y-42,title,23,col)
b+=text(500,442,'A non-affine parameter can add a tangent-proportional term to the geodesic equation.',19,MUTED,'middle')
save('affine-parameter',5,'Do not confuse a route with its parameter','Two identical straight paths have respectively equally spaced and nonuniformly spaced parameter labels.','This flat straight-line illustration isolates parameter choice. Affine parameters are related by λ ↦ aλ + b; an arbitrary nonlinear relabeling changes the standard coordinate form of the geodesic equation.',b,after='5.6')

b=label(45,95,'Two antisymmetric index pairs','In four dimensions there are six possible independent pairs.')
pairs=['01','02','03','12','13','23']
for i,s in enumerate(pairs):
 b+=text(140+i*42,159,s,15,MUTED,'middle')+text(103,195+i*38,s,15,MUTED,'end')
 for j in range(6):b+=rect(122+j*42,171+i*38,36,32,'#c9e4e7' if j>=i else '#e8eef0',LINE,3)
b+=label(515,175,'A symmetric 6 × 6 pair matrix','6 diagonal + 15 off-diagonal = 21')
b+=text(515,275,'One algebraic Bianchi relation',23,ORANGE)+line(650,300,650,332,ORANGE,2,arrow=True)+text(515,385,'20 independent curvature components',25,TEAL)
save('curvature-count',8,'From 256 slots to 20 independent entries','A six-by-six matrix of antisymmetric index pairs has one triangular half highlighted, representing twenty-one symmetric entries before Bianchi.','Riemann antisymmetry creates six pair labels; pair-exchange symmetry leaves 21 entries. The algebraic Bianchi identity removes one in four dimensions. This counts local tensor components, not propagating gravitational degrees of freedom.',b,after='8.5')

b=label(45,95,'The Newtonian calibration','Use the trace-reversed equation for slowly moving dust.')
rows=[('Geometry','R₀₀ ≈ ∇²Φ / c²',TEAL),('Matter','T₀₀ − ½Tg₀₀ ≈ ½ρc²',ORANGE),('Newton','∇²Φ = 4πGρ',BLUE)]
for i,(name,eq,col) in enumerate(rows):
 y=155+i*85;b+=text(65,y+31,name,20,col,weight=650)+rect(205,y,390,63,'#fff',col)+text(400,y+41,eq,28,col,'middle')
b+=line(625,252,682,252,MUTED,2,arrow=True)+text(800,225,'Match the two',20,MUTED,'middle')+text(800,277,'κ = 8πG / c⁴',30,INK,'middle')
b+=text(500,449,'The 4π comes from spherical flux. The additional 2 compensates for the half-sized dust source.',18,MUTED,'middle')
save('newtonian-calibration',12,'Where the factor of eight comes from','Geometry, the trace-reversed dust source, and Poisson’s equation combine to fix the coupling constant.','The displayed component estimates assume weak, stationary fields and slow pressureless matter, with x⁰=ct. The matching is performed in the chapter with the full index conventions.',b,after='12.4')

b=axes(80,370,420,240,'coordinate normal to boundary','allowed variation')
b+=plot(lambda x:x*(1-x),0,1,105,370,355,220,0,.3)
b+=circle(105,370,6,INK)+circle(460,370,6,INK)
b+=line(105,370,168,253,ORANGE,3)+line(397,253,460,370,ORANGE,3)
b+=label(565,140,'Zero value at the boundary','Does not imply zero normal derivative.')
b+=text(565,228,'δg = 0',30,TEAL)+text(565,285,'∂ₙ(δg) can be nonzero',27,ORANGE)+text(565,354,'A boundary term may therefore survive.',19)+text(565,397,'The variational problem needs a boundary policy.',16,MUTED)
save('boundary-variation',14,'Fixing the value does not fix the slope','A variation vanishes at both endpoints while having nonzero slopes there.','The scalar graph is an analogy for each metric variation component along a normal direction. It explains why the Einstein–Hilbert action needs appropriate boundary treatment even when the boundary metric is fixed.',b,after='14.6')

b=axes(90,375,440,230,'','height h / hmax')+text(315,450,'time t / T',18,MUTED,'middle')
b+=plot(lambda t:4*t*(1-t),0,1,115,375,380,220,0,1.1)
b+=line(115,375,495,375,ORANGE,4)+circle(115,375,6,INK)+circle(495,375,6,INK)
b+=text(115,408,'0',17,MUTED,'middle')+text(305,408,'½',17,MUTED,'middle')+text(495,408,'1',17,MUTED,'middle')
b+=label(590,140,'Height wins over speed loss','For a one-second toss near Earth:')
b+=text(590,220,'height contribution    +89.2 as',23,TEAL)+text(590,272,'motion contribution   −44.6 as',23,ORANGE)+line(590,293,945,293)+text(590,342,'net proper-time gain  +44.6 as',23,INK)
b+=text(590,405,'1 attosecond = 10⁻¹⁸ seconds',18,MUTED)
save('tossed-clock',16,'The tossed clock records more time','A parabolic height-time trajectory returns to the shelf after one second; its altitude and motion clock effects are compared.','This calculation assumes uniform g, weak gravity, slow motion, and negligible launch/catch durations. The shelf clock and tossed clock share both comparison events.',b,after='16.8')

b=label(45,95,'An ellipse whose closest point slowly rotates','A leading-order orbit picture, with precession greatly enlarged.')
cx,cy=310,300;ecc=.55
for orbit,col in [(0,TEAL),(1,BLUE),(2,ORANGE)]:
 pts=[]
 for i in range(241):
  phi=2*pi*i/240+orbit*.23;r=135/(1+ecc*cos(2*pi*i/240));pts.append((cx+r*cos(phi),cy-r*sin(phi)*.65))
 b+=poly(pts,col,2)
 px=cx+135/(1+ecc)*cos(orbit*.23);py=cy-135/(1+ecc)*sin(orbit*.23)*.65
 b+=circle(px,py,5,col)
b+=circle(cx,cy,9,GOLD)+text(610,178,'Perihelion = closest approach',22,TEAL)+text(610,252,'Δφ ≈ 6πGM / [c²a(1 − e²)]',24,INK)
b+=text(610,326,'Mercury’s extra advance:',20,MUTED)+text(610,365,'about 43 arcseconds per century',22,ORANGE)
save('perihelion-precession',16,'A slowly turning orbit','Three aligned-focus ellipses have progressively rotated perihelia. Their offset is greatly exaggerated.','The curves are schematic successive Kepler ellipses, compressed vertically for layout, not a numerical integration of an exact relativistic orbit. The text derives the small secular advance and states its regime.',b,height=505,after='16.6')

b=label(45,95,'Three quantities that should not share one name','Here χ is comoving distance and η is conformal time; c = 1.')
b+=axes(90,385,440,235,'comoving distance χ','conformal time η')
p=(285,205);b+=circle(*p,6,TEAL)+poly([(105,385),p,(465,385)],TEAL,3)
b+=line(100,165,500,165,ORANGE,2,'6 5')+line(285,205,245,165,ORANGE,3)+line(285,205,325,165,ORANGE,3)
b+=text(290,234,'now',17,TEAL)+text(105,445,'initial conformal boundary',16,MUTED)+text(108,153,'finite future conformal boundary',16,ORANGE)
b+=label(585,155,'Particle horizon','How far light has reached us since the start.',TEAL)+label(585,255,'Event horizon','How far a signal sent now can ever reach.',ORANGE)+label(585,355,'Hubble radius: c/H','An expansion scale; not generally a causal horizon.',BLUE)
save('cosmic-horizons',19,'A causal horizon is not just a distance scale','Past and future light rays in conformal coordinates meet initial and finite future boundaries.','The diagram depicts a model with finite past and future conformal intervals. Their lengths determine particle and event horizons. Other expansion histories can lack one or both boundaries; c/H is a different construction.',b,after='19.8')

b=label(45,95,'Count initial data in phase space','Positions and their conjugate momenta are counted separately.')
items=[(60,'12','6 metric + 6 momentum'),(365,'−4','constraint equations'),(670,'−4','gauge directions')]
for x,n,desc in items:b+=rect(x,150,265,125,'#fff',TEAL)+text(x+132,207,n,43,TEAL,'middle')+text(x+132,247,desc,17,MUTED,'middle')
b+=text(500,353,'4 physical phase-space functions',30,INK,'middle')+text(500,410,'= 2 configurations + 2 conjugate momenta',25,ORANGE,'middle')
save('constraint-count',20,'Two physical degrees of freedom, counted honestly','Twelve initial-data functions lose four constraints and four gauge directions, leaving four phase-space functions.','This is the local canonical count for ordinary four-dimensional GR, with first-class constraints. Four remaining phase-space functions describe two propagating configuration degrees of freedom.',b,after='20.6')

b=label(45,95,'Area increase is a bound, not an efficiency prediction','An ideal comparison of nonspinning black holes.')
for x in [160,350]:b+=circle(x,270,60,TEAL,'#dceeee')+text(x,276,'M',25,TEAL,'middle')
b+=text(255,278,'+',30,INK,'middle')+line(450,270,595,270,MUTED,3,arrow=True)
b+=circle(740,270,60*sqrt(2),ORANGE,'#f7e7dd')+text(740,276,'√2 M',27,ORANGE,'middle')
b+=text(250,382,'Initial area: 2A(M)',22,TEAL,'middle')+text(740,397,'Minimum final mass from area alone',18,ORANGE,'middle')
b+=text(500,452,'Radiated fraction ≤ 1 − 1/√2 ≈ 29.3%, under these idealizations.',23,INK,'middle')
save('horizon-area',22,'Two areas constrain one remnant','Two equal initial Schwarzschild horizons are compared with a limiting final circle whose area equals their sum.','The equality illustration is the bound’s limiting case, not an achievable merger prediction. Initial binding energy is neglected, and all holes are assumed nonspinning; Kerr horizons require a different area formula.',b,after='22.9')

b=axes(80,380,465,240,'fraction of evaporation elapsed','radiation entropy (schematic)')
b+=poly([(105,375),(315,160),(520,375)],TEAL,4)+poly([(105,375),(520,140)],ORANGE,3,dash='7 5')
b+=label(610,155,'Unitary expectation','Rise, then fall as information is recovered.',TEAL)+label(610,260,'Uncorrected semiclassical trend','Keeps growing in the leading approximation.',ORANGE)
b+=text(610,363,'A thermal-looking spectrum can still',19)+text(610,394,'contain correlations between quanta.',19)
save('page-curve',22,'The information question has a shape','A schematic entropy curve rises and returns to zero, while a dashed comparison curve continues to rise.','Axes are qualitative and the curves are not a quantitative evaporation solution. A final pure radiation state has zero fine-grained entropy for the whole radiation system; individual portions can remain mixed.',b,after='22.10')

manifest.sort(key=lambda f:(f['chapter'],tuple(map(int,f['after'].split('.'))) if f['after'] else (0,0)))
for number,f in enumerate(manifest,1):
 old=f['number'];f['number']=number
 p=OUT/(f['id']+'.svg');p.write_text(p.read_text().replace(f'{old:02d} / ',f'{number:02d} / ',1))
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
print(f'Generated {len(manifest)} original SVG figures.')
