/* Original linked surface/chart and apsidal-precession experiments.
 * Rendering is deliberately separate from the mathematical models below. */
import {initMechanicsExperiences} from './mechanics-experience.js';
const TAU = 2 * Math.PI;
export const SURFACE_CHART_RADIUS = 1.35;
export const MERCURY = Object.freeze({a: 5.7909e10, eccentricity: .2056, gravitationalRadius: 1476.625, periodDays: 87.969});
export const chartDefinitions = Object.freeze({a: {center: [-.55, 0], angle: 0}, b: {center: [.55, .15], angle: Math.PI / 5}});
export function surfaceHeight(x, y) { return .38 * Math.sin(1.3 * x) * Math.cos(1.15 * y) + .16 * (x * x - y * y); }
export function surfaceDerivatives(x, y) { return [.494 * Math.cos(1.3 * x) * Math.cos(1.15 * y) + .32 * x, -.437 * Math.sin(1.3 * x) * Math.sin(1.15 * y) - .32 * y]; }
export function surfacePoint(x, y) { return [x, y, surfaceHeight(x, y)]; }
export function chartToSurface(u, v, chart = 'a') { const {center: [cx, cy], angle} = chartDefinitions[chart], c = Math.cos(angle), s = Math.sin(angle); return surfacePoint(cx + c * u - s * v, cy + s * u + c * v); }
export function surfaceToChart(point, chart = 'a') { const {center: [cx, cy], angle} = chartDefinitions[chart], x = point[0] - cx, y = point[1] - cy, c = Math.cos(angle), s = Math.sin(angle); return [c * x + s * y, -s * x + c * y]; }
export function inChart(point, chart = 'a') { return Math.hypot(...surfaceToChart(point, chart)) < SURFACE_CHART_RADIUS; }
export function perihelionAdvance(e = MERCURY.eccentricity) { return 6 * Math.PI * MERCURY.gravitationalRadius / (MERCURY.a * (1 - e * e)); }
export function orbitAt(cycles, e = MERCURY.eccentricity, magnification = 1) {
  const orbit = Math.floor(cycles), mean = TAU * (cycles - orbit);
  let eccentric = mean;
  for (let i = 0; i < 12; i++) eccentric -= (eccentric - e * Math.sin(eccentric) - mean) / (1 - e * Math.cos(eccentric));
  let anomaly = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(eccentric / 2), Math.sqrt(1 - e) * Math.cos(eccentric / 2));
  if (anomaly < 0) anomaly += TAU;
  anomaly += orbit * TAU;
  const radius = 1 - e * Math.cos(eccentric), advance = perihelionAdvance(e), angle = anomaly * (1 + magnification * advance / TAU);
  return {radius, anomaly, angle, advance, newton: [radius * Math.cos(anomaly), radius * Math.sin(anomaly), 0], relativistic: [radius * Math.cos(angle), radius * Math.sin(angle), 0]};
}
export function orbitCurve(anomaly, e, magnification = 1) { const r = (1 - e * e) / (1 + e * Math.cos(anomaly)), angle = anomaly * (1 + magnification * perihelionAdvance(e) / TAU); return [r * Math.cos(angle), r * Math.sin(angle), 0]; }
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const fmt = (x, digits = 3) => Math.abs(x) < 10 ** (-digits) ? '0' : Number(x.toFixed(digits)).toString();
const active = new Map();
const m = (tex, role = '') => `<span class="gx-math ${role ? 'math-' + role : ''}">${window.katex.renderToString(tex, {throwOnError: true, strict: false})}</span>`;
const pointPath = points => points.map((p, i) => `${i ? 'L' : 'M'}${p.slice(0, 2).map(x => fmt(x, 4)).join(',')}`).join(' ');
const svg = (description, body, viewBox = '0 0 600 430') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${esc(description)}">${body}</svg>`;
const project = ([x, y, z]) => [300 + 76 * (.84 * x - .54 * y), 225 + 76 * (.30 * x + .47 * y - .83 * z)];
const poly = (points, cls, extra = '') => `<path class="${cls}" d="${pointPath(points)}" ${extra}/>`;
const circ = (p, r, cls) => `<circle class="${cls}" cx="${p[0]}" cy="${p[1]}" r="${r}"/>`;
const sampleCircle = (radius, map) => Array.from({length: 97}, (_, i) => map(radius * Math.cos(i * TAU / 96), radius * Math.sin(i * TAU / 96)));
const initial = type => type === 'manifold' ? {chart: 'a', point: [.12, .28], tangent: false} : {eccentricity: MERCURY.eccentricity, magnification: 300000, cycles: .14, playing: false};

export function manifoldFallback(state = initial('manifold')) {
  const facets = [];
  for (let j = 0; j < 32; j++) for (let i = 0; i < 32; i++) {
    const x = -2.4 + i * .15, y = -2.4 + j * .15, d = Math.hypot(x + .075, y + .075);
    if (d > 2.45) continue;
    const points = [[x,y],[x+.15,y],[x+.15,y+.15],[x,y+.15]].map(p => project(surfacePoint(...p)));
    facets.push({depth: x*.3+y*.47, path: poly([...points, points[0]], 'gx-surface-facet', `style="opacity:${Math.min(1,(2.5-d)*3)}"`)});
  }
  let body = facets.sort((a,b) => a.depth-b.depth).map(f => f.path).join('');
  for (const chart of ['a','b']) body += poly(sampleCircle(SURFACE_CHART_RADIUS, (u,v) => project(chartToSurface(u,v,chart))), `gx-patch-outline gx-chart-${chart}`, chart === state.chart ? '' : 'stroke-dasharray="4 5"');
  for (let k = -4; k <= 4; k++) {
    const t = k * .27, extent = Math.sqrt(SURFACE_CHART_RADIUS ** 2 - t ** 2);
    for (const transpose of [false,true]) body += poly(Array.from({length:41},(_,i)=>{const a=-extent+2*extent*i/40;return project(chartToSurface(...(transpose?[t,a]:[a,t]),state.chart));}), `gx-coordinate-line gx-chart-${state.chart}`);
  }
  if(state.tangent){const [x,y]=state.point,z=surfaceHeight(x,y),[hx,hy]=surfaceDerivatives(x,y);body+=poly([[-.4,-.4],[.4,-.4],[.4,.4],[-.4,.4],[-.4,-.4]].map(([a,b])=>project([x+a,y+b,z+hx*a+hy*b])),'gx-tangent-fallback');}
  body += circ(project(surfacePoint(...state.point)),7,'gx-point');
  return svg('A smooth curved surface with two overlapping coordinate patches and one selected point. The flat map below controls the same point.', body);
}
export function orbitFallback(state = initial('precession')) {
  const to = ([x,y]) => [300+115*x,215-115*y], frame = orbitAt(state.cycles,state.eccentricity,state.magnification), n = Math.floor(state.cycles);
  let body = poly(Array.from({length:181},(_,i)=>to(orbitCurve(i*TAU/180,state.eccentricity,0))),'gx-orbit-newton');
  const start = Math.max(0,frame.anomaly-2*TAU), points=Array.from({length:301},(_,i)=>to(orbitCurve(start+(frame.anomaly-start)*i/300,state.eccentricity,state.magnification)));
  body += poly(points,'gx-orbit-gr');
  for(let k=Math.max(0,n-5);k<=n;k++){const p=to(orbitCurve(k*TAU,state.eccentricity,state.magnification));body+=poly([[300,215],p],'gx-peri-line',`opacity="${.2+.12*(k-Math.max(0,n-5))}"`)+circ(p,3.5,'gx-peri-dot');}
  body += circ([300,215],13,'gx-sun')+circ(to(frame.newton),5,'gx-newton-point')+circ(to(frame.relativistic),6,'gx-point');
  return svg('A Newtonian ellipse and a relativistic perihelion advance, with exaggerated rotation explicitly reported in the controls.',body);
}

export function domainLayout(chart = 'a') {
  const other = chart === 'a' ? 'b' : 'a';
  const otherOrigin = surfaceToChart(chartDefinitions[other].center, chart);
  const center = otherOrigin.map(x => x / 2);
  // Frame both disks about their midpoint. Their separation is unchanged by
  // switching charts, so the scale stays fixed even as the axes rotate.
  const scale = 150 / (SURFACE_CHART_RADIUS + Math.hypot(...otherOrigin) / 2 + .18);
  return {
    other, otherOrigin, scale,
    to: ([u, v]) => [150 + scale * (u - center[0]), 150 - scale * (v - center[1])],
    from: ([x, y]) => [center[0] + (x - 150) / scale, center[1] + (150 - y) / scale],
  };
}
export function domainView(state = initial('manifold')) {
  const R = SURFACE_CHART_RADIUS, {other, otherOrigin, scale, to} = domainLayout(state.chart), q = surfaceToChart(state.point,state.chart);
  let body = circ(to([0,0]),scale*R,`gx-domain-fill gx-domain-fill-${state.chart}`);
  for(let k=-4;k<=4;k++){const t=k*.27,ext=Math.sqrt(R*R-t*t);body+=poly([to([t,-ext]),to([t,ext])],'gx-domain-grid')+poly([to([-ext,t]),to([ext,t])],'gx-domain-grid');}
  body += circ(to(otherOrigin),scale*R,`gx-domain-other gx-chart-${other}`);
  body += circ(to([0,0]),scale*R,`gx-domain-rim gx-chart-${state.chart}`)+circ(to(q),6,'gx-point');
  return svg('Flat coordinate domain. Drag or click to move the point. Arrow keys change its coordinates; Home selects the overlap.',body,'0 0 300 300');
}
function publish(instance, interacted = false) {
  const {el,type,state} = instance, copy = {...state};
  el.dataset.experienceState=JSON.stringify(copy);
  el.dataset.visualState=JSON.stringify(copy);
  el.dataset.narrationSource=getGeometryExperienceSource(el);
  if(interacted)document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:el.id,type,state:copy}}));
}
export function getGeometryExperienceState() { return [...active.values()].map(({el,type,state})=>({id:el.id,type,state:{...state}})); }
export function getGeometryExperienceSource(elementOrId){
  const el=typeof elementOrId==='string'?document.getElementById(elementOrId):elementOrId;
  const instance=el&&active.get(el.id);if(!instance)return '';
  const {type,state}=instance;
  if(type==='manifold'){
    const p=surfacePoint(...state.point),q=surfaceToChart(p,state.chart),other=state.chart==='a'?'b':'a',q2=surfaceToChart(p,other);
    return `The surface is a two-dimensional smooth graph in Euclidean three-space. The selected point is $P=(${p.map(x=>fmt(x)).join(',')})$. Chart ${state.chart.toUpperCase()} ${inChart(p,state.chart)?`assigns $${state.chart==='a'?'(u,v)':"(u',v')"}=(${q.map(x=>fmt(x)).join(',')})$`:'does not cover this point'}. Chart ${other.toUpperCase()} ${inChart(p,other)?`assigns the same point coordinates $${other==='a'?'(u,v)':"(u',v')"}=(${q2.map(x=>fmt(x)).join(',')})$`:'does not cover this point'}. Changing the chart keeps the physical point fixed. The tangent plane is ${state.tangent?'visible':'hidden'}. Coordinates are dimensionless. This graph admits a global projection chart; the displayed patches are restricted open disks that illustrate overlap. The faded rim is a viewing window, not a surface boundary.`;
  }
  const arc=perihelionAdvance(state.eccentricity)*180/Math.PI*3600;
  return `The orbit has eccentricity $e=${fmt(state.eccentricity,4)}$, Mercury's semi-major axis, and the Sun's mass. The leading weak-field GR advance is $${fmt(arc,4)}$ arcseconds per radial cycle. Extra perihelion rotation is displayed at ${state.magnification} times its physical angle. ${Math.floor(state.cycles)} radial cycles have completed; animation is ${state.playing?'playing':'paused'}. The teal Newtonian ellipse closes. The rose precessing-ellipse construction rotates its closest-approach direction. It is not an exact Schwarzschild geodesic; the reveal setting is not stronger physical gravity. Kepler timing is used, seven screen seconds per radial cycle. The eccentricity control changes a hypothetical orbit while keeping its semi-major axis fixed.`;
}

function mount(el) {
  if(el.dataset.experienceReady)return null;
  const type=el.dataset.geometryExperience,state=initial(type),abort=new AbortController(),instance={el,type,state};
  active.set(el.id,instance);
  const fallback=el.querySelector('.gx-fallback'),stage=el.querySelector('.gx-spatial'),readout=el.querySelector('.gx-readout'),status=el.querySelector('.gx-live'),domain=el.querySelector('.gx-domain');
  const alignTools=()=>{const tools=el.querySelector(':scope > .passage-tools');if(tools)el.querySelector('.gx-topline').append(tools);};
  alignTools();const toolsObserver=new MutationObserver(alignTools);toolsObserver.observe(el,{childList:true});
  let spatial=null,disposed=false,visible=false,raf=0,previousTime=0,lastReadout=-1;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const drawFallback=()=>{fallback.innerHTML=type==='manifold'?manifoldFallback(state):orbitFallback(state);};
  function update({user=false,geometry=true}={}) {
    if(disposed)return;
    if(type==='manifold') {
      const q=surfaceToChart(state.point,state.chart),other=state.chart==='a'?'b':'a',q2=surfaceToChart(state.point,other),p=surfacePoint(...state.point),inside=inChart(state.point,state.chart);
      domain.innerHTML=domainView(state);
      const selectedSymbols=state.chart==='a'?'(u,v)':"(u',v')",otherSymbols=other==='a'?'(u,v)':"(u',v')";
      el.querySelector('.gx-panel-heading .gx-math').outerHTML=m(selectedSymbols,state.chart==='a'?'geometry':'transport');
      readout.innerHTML=`<div><span>Same surface point</span><strong>${m(String.raw`P=(${fmt(p[0])},\,${fmt(p[1])},\,${fmt(p[2])})`,'observer')}</strong></div><div><span>Selected chart ${state.chart.toUpperCase()}</span><strong>${inside?m(String.raw`${selectedSymbols}=(${fmt(q[0])},\,${fmt(q[1])})`,state.chart==='a'?'geometry':'transport'):'Point outside this patch'}</strong></div><div><span>Chart ${other.toUpperCase()} at that point</span><strong>${inChart(state.point,other)?m(String.raw`${otherSymbols}=(${fmt(q2[0])},\,${fmt(q2[1])})`,other==='a'?'geometry':'transport'):'Point outside this patch'}</strong></div>`;
      el.querySelector('.gx-insight').textContent=inside?(inChart(state.point,other)?'Both maps name this point. Switching charts changes its coordinates, not the surface.':'This chart covers the point. The other chart does not; the point itself still exists.'):'The selected chart does not cover this point. Choose a point inside its disk, or switch charts.';
      if(state.tangent)el.querySelector('.gx-insight').textContent+=' The rose tangent plane matches the surface’s slope at this point.';
      el.querySelectorAll('[data-gx-chart]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gxChart===state.chart)));
      el.querySelector('[data-gx-tangent]').setAttribute('aria-pressed',String(state.tangent));
    } else {
      const delta=perihelionAdvance(state.eccentricity),arc=delta*180/Math.PI*3600,century=arc*36525/MERCURY.periodDays,count=Math.floor(state.cycles),degrees=delta*state.magnification*180/Math.PI;
      readout.innerHTML=`<div><span>Physical advance per orbit</span><strong>${m(String.raw`\Delta\varpi=${fmt(arc,4)}\text{ arcsec}`,'curvature')}</strong></div><div><span>Rotation shown per orbit</span><strong>${m(String.raw`${fmt(degrees,5)}^\circ`,'observer')}</strong></div><div><span>Completed radial cycles</span><strong>${m(String(count))}</strong></div>`;
      el.querySelector('.gx-e-value').innerHTML=m(String.raw`e=${fmt(state.eccentricity,4)}`,'geometry');
      el.querySelector('.gx-magnification').innerHTML=state.magnification===1?'Actual angular scale':`Perihelion rotation ${m(String.raw`\times ${state.magnification.toLocaleString('en-US').replaceAll(',','\,')}`,'observer')}`;
      el.querySelector('.gx-insight').textContent=state.magnification===1?'At the real scale the paths almost coincide. That tiny difference accumulates; it is not absent.':'Only the extra apsidal rotation is magnified. The orbit shape stays fixed; this is an explanatory construction, not a strong-gravity simulation.';
      el.querySelector('.gx-mercury-result').innerHTML=Math.abs(state.eccentricity-MERCURY.eccentricity)<1e-6?`For Mercury’s shape: ${m(String.raw`${fmt(century,1)}\text{ arcsec per century}`)} from the leading GR correction.`:'The orbital size and solar mass stay at Mercury’s values; changing eccentricity makes a hypothetical orbit.';
      el.querySelectorAll('[data-gx-scale]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.gxScale===state.magnification)));
      el.querySelector('[data-gx-play]').setAttribute('aria-pressed',String(state.playing));
      el.querySelector('[data-gx-play] .gx-button-label').textContent=state.playing?'Pause':'Play';
      el.querySelector('[data-gx-play]').setAttribute('aria-label',state.playing?'Pause orbit animation':'Play orbit animation');
      el.querySelectorAll('[data-gx-play] [data-gx-playing]').forEach(icon=>{icon.hidden=(icon.dataset.gxPlaying==='true')!==state.playing;});
      if(user)status.textContent=`${state.playing?'Animation playing. ':'Animation paused. '}Eccentricity ${fmt(state.eccentricity,4)}. Perihelion rotation magnification ${state.magnification}. ${count} completed radial cycles.`;
    }
    if(geometry){if(!spatial)drawFallback();spatial?.update();}
    publish(instance,user);
  }
  function animate(time) {
    raf=0;if(disposed||!visible||document.hidden||type!=='precession'||!state.playing)return;
    if(previousTime)state.cycles+=Math.min((time-previousTime)/1000,.06)/7;
    previousTime=time;
    if(spatial)spatial.update();else drawFallback();
    if(Math.floor(state.cycles*12)!==lastReadout){lastReadout=Math.floor(state.cycles*12);update({geometry:false});}
    raf=requestAnimationFrame(animate);
  }
  function animationState(){previousTime=0;cancelAnimationFrame(raf);raf=0;if(visible&&!document.hidden&&state.playing)raf=requestAnimationFrame(animate);}
  function movePoint(u,v){const length=Math.hypot(u,v),max=SURFACE_CHART_RADIUS*.975;if(length>max){u*=max/length;v*=max/length;}state.point=chartToSurface(u,v,state.chart).slice(0,2);update({user:true});}
  if(domain){
    function pointer(event){const box=domain.getBoundingClientRect(),size=Math.min(box.width,box.height),left=box.left+(box.width-size)/2,top=box.top+(box.height-size)/2;movePoint(...domainLayout(state.chart).from([(event.clientX-left)/size*300,(event.clientY-top)/size*300]));}
    domain.addEventListener('pointerdown',event=>{domain.setPointerCapture(event.pointerId);pointer(event);},{signal:abort.signal});
    domain.addEventListener('pointermove',event=>{if(domain.hasPointerCapture(event.pointerId))pointer(event);},{signal:abort.signal});
    domain.addEventListener('keydown',event=>{const q=surfaceToChart(state.point,state.chart),step=event.shiftKey?.2:.06;if(event.key==='Home'){state.point=[.12,.28];update({user:true});event.preventDefault();return;}const d={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,step],ArrowDown:[0,-step]}[event.key];if(d){movePoint(q[0]+d[0],q[1]+d[1]);event.preventDefault();}},{signal:abort.signal});
  }
  el.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-gx-chart'))state.chart=b.dataset.gxChart;
    else if(b.hasAttribute('data-gx-tangent'))state.tangent=!state.tangent;
    else if(b.hasAttribute('data-gx-point'))state.point=b.dataset.gxPoint==='overlap'?[.12,.28]:chartToSurface(state.chart==='a'?-1.1:1.1,0,state.chart).slice(0,2);
    else if(b.hasAttribute('data-gx-play'))state.playing=!state.playing;
    else if(b.hasAttribute('data-gx-step')){state.playing=false;state.cycles=Math.floor(state.cycles)+1;}
    else if(b.hasAttribute('data-gx-reset')){Object.assign(state,initial(type));if(type==='precession')el.querySelector('[data-gx-e]').value=state.eccentricity;spatial?.reset();}
    else if(b.hasAttribute('data-gx-scale')){state.magnification=+b.dataset.gxScale;state.cycles=.14;}
    else if(b.hasAttribute('data-gx-mercury')){state.eccentricity=MERCURY.eccentricity;state.cycles=.14;el.querySelector('[data-gx-e]').value=state.eccentricity;}
    else return;
    update({user:true});animationState();
  },{signal:abort.signal});
  el.addEventListener('input',event=>{if(!event.target.matches('[data-gx-e]'))return;state.eccentricity=+event.target.value;state.cycles=.14;event.target.setAttribute('aria-valuetext',`Eccentricity ${state.eccentricity}`);update({user:true});},{signal:abort.signal});
  const observer=new IntersectionObserver(entries=>{visible=entries.at(-1).isIntersecting;animationState();if(visible)spatial?.render();},{threshold:.05});observer.observe(el);
  document.addEventListener('visibilitychange',animationState,{signal:abort.signal});
  reduced.addEventListener('change',()=>{if(reduced.matches){state.playing=false;update();animationState();}},{signal:abort.signal});
  // Explicit play is allowed under reduced motion. Nothing auto-starts.
  update();el.dataset.experienceReady='true';
  initSpatial(instance).then(result=>{if(disposed){result?.dispose();return;}spatial=result;if(result){fallback.hidden=true;stage.hidden=false;el.dataset.spatialReady='true';result.update();}else el.dataset.spatialReady='fallback';}).catch(()=>{el.dataset.spatialReady='fallback';});
  instance.restore=s=>{if(type==='manifold'){if(['a','b'].includes(s.chart))state.chart=s.chart;if(Array.isArray(s.point)&&s.point.length===2&&s.point.every(x=>Number.isFinite(x)&&Math.abs(x)<2.4))state.point=s.point.slice();if(typeof s.tangent==='boolean')state.tangent=s.tangent;}else{if(Number.isFinite(s.eccentricity)&&s.eccentricity>=.05&&s.eccentricity<=.7)state.eccentricity=s.eccentricity;if([1,300000].includes(s.magnification))state.magnification=s.magnification;if(Number.isFinite(s.cycles)&&s.cycles>=0&&s.cycles<10000)state.cycles=s.cycles;state.playing=false;el.querySelector('[data-gx-e]').value=state.eccentricity;}update();animationState();};
  return ()=>{disposed=true;abort.abort();observer.disconnect();toolsObserver.disconnect();cancelAnimationFrame(raf);spatial?.dispose();active.delete(el.id);delete el.dataset.experienceReady;};
}

async function initSpatial(instance) {
  const {el,type,state}=instance;
  const [THREE,{OrbitControls}]=await Promise.all([import('three'),import('./assets/three/OrbitControls.js')]);
  const stage=el.querySelector('.gx-spatial');if(!stage.isConnected)return null;
  let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{return null;}
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
  const canvas=renderer.domElement;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',type==='manifold'?'Curved surface with overlapping coordinate patches. Drag to rotate; arrow keys orbit; Home resets.':'Orbit comparison around the Sun. Drag to inspect the orbital plane; arrow keys orbit; Home resets.');stage.append(canvas);stage.tabIndex=0;stage.setAttribute('aria-label',canvas.getAttribute('aria-label'));
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.up.set(0,0,1);
  const origin=type==='manifold'?[.1,0,.05]:[-.1,0,0],position=type==='manifold'?[3.6,-5.0,4.15]:[.5,-2.1,5.8];camera.position.set(...position);
  const controls=new OrbitControls(camera,canvas);controls.target.set(...origin);controls.enablePan=false;controls.enableZoom=false;controls.enableDamping=false;controls.minPolarAngle=.12;controls.maxPolarAngle=Math.PI*.78;controls.update();
  canvas.style.touchAction='pan-y';
  const base=new THREE.Group(),dynamic=new THREE.Group();scene.add(base,dynamic);
  const materials=new Set(),V=p=>new THREE.Vector3(...p);let disposed=false,available=true;
  function material(role,kind='basic',opacity=1){const Constructor=kind==='standard'?THREE.MeshStandardMaterial:kind==='line'?THREE.LineBasicMaterial:THREE.MeshBasicMaterial;const mat=new Constructor({transparent:opacity<1,opacity,...(kind!=='line'?{side:THREE.DoubleSide}:{}),...(kind==='standard'?{roughness:.62,metalness:.08}:{} )});mat.userData.role=role;materials.add(mat);return mat;}
  function line(points,role,opacity=1,parent=base){const obj=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(V)),material(role,'line',opacity));parent.add(obj);return obj;}
  function ball(radius,role,parent=dynamic){const obj=new THREE.Mesh(new THREE.SphereGeometry(radius,28,20),material(role,'standard'));parent.add(obj);return obj;}
  function disposeGroup(group){group.traverse(o=>{o.geometry?.dispose();for(const mat of (Array.isArray(o.material)?o.material:[o.material]).filter(Boolean)){materials.delete(mat);mat.dispose();}});group.clear();}
  scene.add(new THREE.HemisphereLight(0xffffff,0x7b8da0,1.5));const light=new THREE.DirectionalLight(0xffffff,2.4);light.position.set(-3,-4,7);scene.add(light);const rim=new THREE.DirectionalLight(0x99dfee,.8);rim.position.set(4,2,2);scene.add(rim);
  let surface,surfaceUniforms,point,normalPlane,newtonPoint,grPoint,grTrail,periGroup,newtonOrbit;
  function graphGeometry(radius,resolution=70){
    const positions=[],normals=[],indices=[];
    for(let j=0;j<=resolution;j++)for(let i=0;i<=128;i++){
      const r=radius*j/resolution,t=i*TAU/128,x=r*Math.cos(t),y=r*Math.sin(t);
      const [hx,hy]=surfaceDerivatives(x,y),length=Math.hypot(hx,hy,1);
      positions.push(x,y,surfaceHeight(x,y));normals.push(-hx/length,-hy/length,1/length);
    }
    for(let j=0;j<resolution;j++)for(let i=0;i<128;i++){const a=j*129+i,b=a+129;indices.push(a,b,a+1,b,b+1,a+1);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));g.setIndex(indices);return g;
  }
  if(type==='manifold'){
    const mat=material('surface','standard');
    surfaceUniforms={
      gxChartA:{value:new THREE.Color()},gxChartB:{value:new THREE.Color()},gxInk:{value:new THREE.Color()},
      gxSelectedB:{value:0},gxRadius:{value:SURFACE_CHART_RADIUS},
      gxOriginA:{value:new THREE.Vector2(...chartDefinitions.a.center)},
      gxOriginB:{value:new THREE.Vector2(...chartDefinitions.b.center)},
      gxAngleB:{value:chartDefinitions.b.angle},
    };
    // Paint the patches, rims and grid onto a single surface. Separate meshes
    // and lifted polylines competed for depth and flickered during rotation.
    // Derivatives keep strokes about a pixel wide and fade an unresolved grid
    // at grazing angles rather than letting it alias into a flashing pattern.
    mat.roughness=.85;mat.metalness=0;mat.transparent=true;mat.depthWrite=true;
    mat.onBeforeCompile=shader=>{
      Object.assign(shader.uniforms,surfaceUniforms);
      shader.vertexShader='varying vec2 gxPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngxPosition=position.xy;');
      shader.fragmentShader=`
        varying vec2 gxPosition;
        uniform vec3 gxChartA, gxChartB, gxInk;
        uniform vec2 gxOriginA, gxOriginB;
        uniform float gxSelectedB, gxRadius, gxAngleB;
        float gxGrid(vec2 q, float spacing) {
          vec2 pixel=max(fwidth(q),vec2(0.00001));
          vec2 distance=abs(q-spacing*floor(q/spacing+0.5));
          vec2 stroke=1.0-smoothstep(0.2*pixel,0.9*pixel,distance);
          stroke*=1.0-smoothstep(vec2(0.2*spacing),vec2(0.45*spacing),pixel);
          return max(stroke.x,stroke.y);
        }
        float gxDisk(vec2 q) {
          float r=length(q),pixel=max(fwidth(r),0.00001);
          return 1.0-smoothstep(gxRadius-pixel,gxRadius+pixel,r);
        }
        float gxRim(vec2 q, float selected) {
          float r=length(q),pixel=max(fwidth(r),0.00001);
          float ring=1.0-smoothstep(0.4*pixel,1.4*pixel,abs(r-gxRadius));
          float wave=cos(18.0*atan(q.y,q.x)),edge=max(fwidth(wave),0.0001);
          float dash=smoothstep(-edge,edge,wave+0.15);
          return ring*mix(dash*0.65,1.0,selected);
        }
      `+shader.fragmentShader.replace('#include <color_fragment>',`
        #include <color_fragment>
        vec2 qA=gxPosition-gxOriginA, offsetB=gxPosition-gxOriginB;
        float c=cos(gxAngleB),s=sin(gxAngleB);
        vec2 qB=vec2(c*offsetB.x+s*offsetB.y,-s*offsetB.x+c*offsetB.y);
        float diskA=gxDisk(qA),diskB=gxDisk(qB);
        vec3 chosen=mix(gxChartA,gxChartB,gxSelectedB);
        vec3 other=mix(gxChartB,gxChartA,gxSelectedB);
        float chosenDisk=mix(diskA,diskB,gxSelectedB),otherDisk=mix(diskB,diskA,gxSelectedB);
        diffuseColor.rgb=mix(diffuseColor.rgb,gxInk,0.065*gxGrid(gxPosition,0.4)*(1.0-chosenDisk));
        diffuseColor.rgb=mix(diffuseColor.rgb,other,0.12*otherDisk);
        diffuseColor.rgb=mix(diffuseColor.rgb,chosen,0.32*chosenDisk);
        float grid=mix(gxGrid(qA,0.27),gxGrid(qB,0.27),gxSelectedB);
        diffuseColor.rgb=mix(diffuseColor.rgb,chosen,0.65*grid*chosenDisk);
        diffuseColor.rgb=mix(diffuseColor.rgb,gxChartA,0.9*gxRim(qA,1.0-gxSelectedB));
        diffuseColor.rgb=mix(diffuseColor.rgb,gxChartB,0.9*gxRim(qB,gxSelectedB));
      `).replace('#include <dithering_fragment>',
        'gl_FragColor.a *= 1.0-smoothstep(2.32,2.46,length(gxPosition));\n#include <dithering_fragment>');
    };
    surface=new THREE.Mesh(graphGeometry(2.46),mat);base.add(surface);
    point=ball(.072,'observer');
    normalPlane=new THREE.Mesh(new THREE.PlaneGeometry(.88,.88),material('observer','basic',.2));normalPlane.material.depthWrite=false;dynamic.add(normalPlane);
    normalPlane.add(new THREE.LineSegments(new THREE.EdgesGeometry(normalPlane.geometry),material('observer','line',.85)));
  }else{
    const sun=ball(.095,'matter',base);sun.material.emissive=new THREE.Color('#ad5500');sun.material.emissiveIntensity=.22;
    newtonOrbit=line([[0,0,0],[1,0,0]],'geometry',.65);grTrail=line([[0,0,0],[1,0,0]],'observer',1);newtonPoint=ball(.036,'geometry');grPoint=ball(.043,'observer');periGroup=new THREE.Group();dynamic.add(periGroup);
    line([[-2.0,0,-.025],[2.0,0,-.025]],'line',.4);line([[0,-1.75,-.025],[0,1.75,-.025]],'line',.4);
  }
  const label=document.createElement('span');label.className='gx-space-label';label.innerHTML=m(type==='manifold'?'P':String.raw`M_\odot`,type==='manifold'?'observer':'matter');stage.append(label);
  function theme(){const css=getComputedStyle(el);for(const mat of materials)mat.color.set(mat.userData.role==='surface'?(document.documentElement.dataset.theme==='dark'?'#3d626d':'#9fbfbc'):css.getPropertyValue('--'+mat.userData.role).trim()||({geometry:'#007c78',transport:'#275dc5',observer:'#bb365d',matter:'#a25e00','figure-tint':'#dce9e4',line:'#d9dddf'}[mat.userData.role])||'#354951');if(surfaceUniforms){surfaceUniforms.gxChartA.value.set(css.getPropertyValue('--geometry').trim());surfaceUniforms.gxChartB.value.set(css.getPropertyValue('--transport').trim());surfaceUniforms.gxInk.value.set(css.getPropertyValue('--ink').trim());}render();}
  function setLine(obj,points){obj.geometry.dispose();obj.geometry=new THREE.BufferGeometry().setFromPoints(points.map(V));}
  let lastE=-1,lastCycle=-1,lastMagnification=-1;
  function update(){
    if(type==='manifold'){
      surfaceUniforms.gxSelectedB.value=state.chart==='b'?1:0;
      const p=surfacePoint(...state.point);point.position.set(...p);point.position.z+=.045;const [hx,hy]=surfaceDerivatives(...state.point);normalPlane.position.set(...p);normalPlane.position.z+=.017;normalPlane.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(-hx,-hy,1).normalize());normalPlane.visible=state.tangent;
    }else{
      const frame=orbitAt(state.cycles,state.eccentricity,state.magnification),n=Math.floor(state.cycles);newtonPoint.position.set(...frame.newton);grPoint.position.set(...frame.relativistic);newtonPoint.position.z=.025;grPoint.position.z=.045;
      if(lastE!==state.eccentricity){setLine(newtonOrbit,Array.from({length:361},(_,i)=>orbitCurve(i*TAU/360,state.eccentricity,0)));fitOrbit();}
      const start=Math.max(0,frame.anomaly-2*TAU);setLine(grTrail,Array.from({length:361},(_,i)=>{const p=orbitCurve(start+(frame.anomaly-start)*i/360,state.eccentricity,state.magnification);p[2]=.017;return p;}));
      if(lastCycle!==n||lastE!==state.eccentricity||lastMagnification!==state.magnification){disposeGroup(periGroup);for(let k=Math.max(0,n-5);k<=n;k++){const p=orbitCurve(k*TAU,state.eccentricity,state.magnification);line([[0,0,.01],[p[0],p[1],.01]],'observer',.16+.10*(k-Math.max(0,n-5)),periGroup);const marker=ball(.018,'observer',periGroup);marker.position.set(...p);marker.position.z=.02;}lastCycle=n;lastMagnification=state.magnification;lastE=state.eccentricity;theme();}
    }
    render();
  }
  function render(){if(disposed||!available)return;renderer.render(scene,camera);stage.dataset.cameraDistance=String(camera.position.distanceTo(controls.target));const p=(type==='manifold'?point.position.clone():new THREE.Vector3(0,0,.16)).project(camera);label.style.left=`${(p.x+1)/2*stage.clientWidth}px`;label.style.top=`${(1-p.y)/2*stage.clientHeight-20}px`;label.hidden=p.z>1;}
  function fitOrbit(){if(type!=='precession')return;const direction=camera.position.clone().sub(controls.target).normalize(),distance=(1+state.eccentricity+.13)*1.10/(Math.tan(camera.fov*Math.PI/360)*Math.min(1,camera.aspect));camera.position.copy(direction.multiplyScalar(distance).add(controls.target));controls.update();}
  // A sphere about the orbit target encloses every surface triangle in every
  // orientation. Fit it only when the viewport changes or the view is reset;
  // fitting the current silhouette on each drag makes the surface "breathe".
  let surfaceRadius=0;
  if(surface){const positions=surface.geometry.attributes.position,p=new THREE.Vector3();for(let i=0;i<positions.count;i++)surfaceRadius=Math.max(surfaceRadius,p.fromBufferAttribute(positions,i).distanceTo(controls.target));}
  function fitSurface(){
    if(type!=='manifold')return;
    const halfAngle=Math.atan(Math.tan(camera.fov*Math.PI/360)*Math.min(1,camera.aspect));
    const distance=surfaceRadius*1.1/Math.sin(halfAngle);
    const direction=camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(direction.multiplyScalar(distance).add(controls.target));controls.update();
  }
  function resize(){const rect=el.querySelector('.gx-stage').getBoundingClientRect();camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();if(type==='precession')fitOrbit();else fitSurface();renderer.setSize(rect.width,rect.height,false);render();}
  controls.addEventListener('change',render);const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(el.querySelector('.gx-stage'));
  const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','class']});
  function reset(){camera.position.set(...position);controls.target.set(...origin);fitOrbit();fitSurface();controls.update();render();}
  function keyboard(event){
    if(event.key==='Home'){reset();event.preventDefault();return;}
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();
    // Spherical uses Y-up; OrbitControls uses camera.up (Z-up here).
    const toY=new THREE.Quaternion().setFromUnitVectors(camera.up,new THREE.Vector3(0,1,0));
    const spherical=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target).applyQuaternion(toY));
    const step=.12;
    if(event.key==='ArrowLeft')spherical.theta-=step;
    if(event.key==='ArrowRight')spherical.theta+=step;
    if(event.key==='ArrowUp')spherical.phi-=step;
    if(event.key==='ArrowDown')spherical.phi+=step;
    spherical.phi=Math.max(controls.minPolarAngle,Math.min(controls.maxPolarAngle,spherical.phi));
    camera.position.copy(new THREE.Vector3().setFromSpherical(spherical).applyQuaternion(toY.invert()).add(controls.target));controls.update();render();
  }
  stage.addEventListener('keydown',keyboard);
  function lost(event){event.preventDefault();available=false;stage.hidden=true;const fallback=el.querySelector('.gx-fallback');fallback.hidden=false;fallback.innerHTML=type==='manifold'?manifoldFallback(state):orbitFallback(state);el.dataset.spatialReady='fallback';}
  canvas.addEventListener('webglcontextlost',lost);
  resize();theme();update();
  return {update:()=>{if(available)update();else el.querySelector('.gx-fallback').innerHTML=type==='manifold'?manifoldFallback(state):orbitFallback(state);},render,reset,dispose(){disposed=true;controls.dispose();resizeObserver.disconnect();themeObserver.disconnect();stage.removeEventListener('keydown',keyboard);canvas.removeEventListener('webglcontextlost',lost);disposeGroup(base);disposeGroup(dynamic);renderer.dispose();canvas.remove();label.remove();}};
}
export function restoreGeometryExperienceState(id,state){const instance=active.get(id);if(!instance||!state||typeof state!=='object')return false;instance.restore(state);return true;}
export function initGeometryExperiences(){if(!window.katex)return ()=>{};const cleanups=[initMechanicsExperiences(),...[...document.querySelectorAll('[data-geometry-experience]')].map(mount).filter(Boolean)];return ()=>cleanups.forEach(cleanup=>cleanup());}
