import {mechanicsDefaults,mechanicsState,oscillator,hamiltonianFlow} from './mechanics-model.js';

const fmt=(n,d=2)=>Math.abs(n)<.5*10**-d?(0).toFixed(d):n.toFixed(d);
const arrow=(x,y,dx,dy,role,wide=false)=>{
  const length=Math.hypot(dx,dy);if(length<.2)return '';
  const ux=dx/length,uy=dy/length,tip=[x+dx,y+dy],h=Math.min(wide?12:6,length*.45),w=h*.48;
  return `<path class="mx-arrow mx-${role}" d="M${x},${y}l${dx},${dy}M${tip[0]-h*ux+w*uy},${tip[1]-h*uy-w*ux}L${tip}l${-h*ux-w*uy},${-h*uy+w*ux}"/>`;
};
const curve=points=>points.map((p,i)=>`${i?'L':'M'}${p.map(n=>n.toFixed(3)).join(',')}`).join(' ');

export function cartView(state=mechanicsDefaults) {
  const value=oscillator(state),x=300+65*value.q,wall=38,edge=x-34;
  const spring=[[wall,183],[wall+12,183]];
  for(let i=0;i<=20;i++)spring.push([wall+12+(edge-wall-24)*i/20,183+(i===0||i===20?0:i%2?10:-10)]);
  spring.push([edge,183]);
  const direction=value.p>1e-8?'moving right':value.p<-1e-8?'moving left':'momentarily at rest';
  return `<svg viewBox="0 0 600 318" class="mx-cart" role="img" aria-label="Spring and cart. Displacement ${fmt(value.q)} metres; ${direction}. Momentum arrow p and restoring-force arrow F are drawn in separate rows.">
    <defs><linearGradient id="mx-cart-surface" x1="0" y1="0" x2="0.9" y2="1"><stop stop-color="var(--geometry)" stop-opacity=".22"/><stop offset="1" stop-color="var(--geometry)" stop-opacity=".6"/></linearGradient><linearGradient id="mx-wheel-surface" x2="0" y2="1"><stop stop-color="var(--paper)"/><stop offset="1" stop-color="var(--wash)"/></linearGradient></defs>
    <path class="mx-track" d="M28 220H574M300 224v5"/><path class="mx-wall" d="M38 132v82M26 136l12 12M26 158l12 12M26 180l12 12M26 202l12 12"/>
    <path class="mx-guide" d="M300 144v74"/>
    <path class="mx-spring" d="${curve(spring)}"/>
    <rect class="mx-cart-body" x="${edge}" y="151" width="68" height="54" rx="12"/>
    <circle class="mx-wheel" cx="${x-21}" cy="212" r="8"/><circle class="mx-wheel" cx="${x+21}" cy="212" r="8"/>
    <text x="${x}" y="186" text-anchor="middle" class="mx-cart-label">m</text>
    ${arrow(x,68,30*value.p,0,'momentum',true)}
    <text x="${x}" y="39" text-anchor="middle" class="mx-momentum">p = ${fmt(value.p)}</text>
    ${arrow(x,125,28*value.force,0,'force',true)}
    <text x="${x}" y="104" text-anchor="middle" class="mx-force">F = ${fmt(value.force)} N</text>
    ${Math.abs(value.q)>.006?`<path class="mx-displacement" d="M300 265H${x}M300 258v14M${x} 258v14"/>`:''}
    <text x="${(300+x)/2}" y="297" text-anchor="middle" class="mx-displacement">q = ${fmt(value.q)} m</text>
    <text x="300" y="254" text-anchor="middle" class="mx-origin">0</text>
  </svg>`;
}

export function energyView(state=mechanicsDefaults) {
  const v=oscillator(state),fraction=v.initialEnergy>0?v.kinetic/v.initialEnergy:0,potentialFraction=v.initialEnergy>0?1-fraction:0;
  return `<div class="mx-energy-total"><span>Total energy</span><strong>${fmt(v.initialEnergy)} <small>J</small></strong></div>
    <div class="mx-energy-track" role="img" aria-label="Kinetic energy ${fmt(v.kinetic)} joules; potential energy ${fmt(v.potential)} joules; total ${fmt(v.initialEnergy)} joules."><div class="mx-kinetic-fill" style="width:${100*fraction}%"></div><div class="mx-potential-fill" style="width:${100*potentialFraction}%"></div></div>
    <div class="mx-energy-key"><div><i class="mx-kinetic-dot"></i><span>Motion · kinetic energy</span><strong>${fmt(v.kinetic)} J</strong></div><div><i class="mx-potential-dot"></i><span>Spring · potential energy</span><strong>${fmt(v.potential)} J</strong></div></div>`;
}

export function phaseView(state=mechanicsDefaults) {
  const v=oscillator(state),to=(q,p)=>[205+62*q,190-50*p];
  let field='';
  for(let q=-2.2;q<2.3;q+=.55)for(let p=-2.5;p<2.6;p+=.625){const [dx,dy]=hamiltonianFlow(q,p,state),[x,y]=to(q,p);field+=arrow(x,y,62*dx*.065,-50*dy*.065,'flow');}
  const contours=[.25,.5,.75,1].map(f=>{const H=f*v.initialEnergy;return `<ellipse class="mx-energy-contour ${f===1?'mx-current-orbit':''}" cx="205" cy="190" rx="${62*Math.sqrt(2*H/state.stiffness)}" ry="${50*Math.sqrt(2*state.mass*H)}"/>`;}).join('');
  const trail=Array.from({length:81},(_,i)=>{const w=oscillator({...state,time:state.time*i/80});return to(w.q,w.p)});
  const [x,y]=to(v.q,v.p);
  return `<svg class="mx-phase" viewBox="0 0 410 386" role="img" aria-label="Phase space. Horizontal position q in metres; vertical momentum p in kilogram metres per second. The highlighted energy ellipse carries a state with q ${fmt(v.q)} and p ${fmt(v.p)}. Arrows show Hamiltonian flow.">
    <path class="mx-phase-axes" d="M38 190H375M205 42V342"/>
    ${[-2,2].map(q=>`<path class="mx-phase-tick" d="M${205+62*q} 187v6"/><text x="${205+62*q}" y="213" text-anchor="middle">${q}</text>`).join('')}
    ${[-2,2].map(p=>`<path class="mx-phase-tick" d="M202 ${190-50*p}h6"/><text x="194" y="${195-50*p}" text-anchor="end">${p}</text>`).join('')}
    <text x="209" y="211">0</text><text x="205" y="373" text-anchor="middle">Position q [m]</text><text x="20" y="23">Momentum p [kg m/s]</text>
    ${field}${contours}<path class="mx-phase-trail" d="${curve(trail)}"/><circle class="mx-state-dot" cx="${x}" cy="${y}" r="6"/>
  </svg>`;
}

export function mechanicsSource(type,state=mechanicsDefaults) {
  const v=oscillator(state);
  return `A frictionless cart of mass ${fmt(state.mass)} kilograms is attached to a spring of stiffness ${fmt(state.stiffness)} newtons per metre. At time ${fmt(state.time)} seconds its displacement is ${fmt(v.q)} metres and its momentum is ${fmt(v.p)} kilogram metres per second. The spring and motion exchange energy: kinetic energy ${fmt(v.kinetic)} joules, potential energy ${fmt(v.potential)} joules, with total ${fmt(v.initialEnergy)} joules. ${type==='phase'?'The second view uses position and momentum as coordinates. Its moving dot represents the same cart state; the highlighted ellipse has constant Hamiltonian. Flow arrows have a common time scale.':'The momentum arrow changes direction when the cart reverses. Energy bars remain nonnegative even when momentum is negative.'} The calculation uses the exact Hooke-law solution, with no damping or driving.`;
}

export function initMechanicsExperiences() {
  const cleanups=[];
  for(const root of document.querySelectorAll('[data-mechanics-experience]')) {
    const abort=new AbortController(),on=(target,name,fn)=>target.addEventListener(name,fn,{signal:abort.signal});
    const type=root.dataset.mechanicsExperience;
    let state={...mechanicsDefaults},playing=false,visible=false,frame=0,previous=0,disposed=false,phaseKey='';
    try{const saved=JSON.parse(localStorage.getItem('gr-course-v1'))?.visuals?.[root.id]?.state;if(saved)state=mechanicsState(saved);}catch{}
    const cart=root.querySelector('[data-mx-cart]'),energy=root.querySelector('[data-mx-energy]'),phase=root.querySelector('[data-mx-phase]');
    const time=root.querySelector('[data-mx-time]'),play=root.querySelector('[data-mx-play]'),status=root.querySelector('[data-mx-status]');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    function draw(user=false) {
      const v=oscillator(state);
      cart.innerHTML=cartView(state);energy.innerHTML=energyView(state);
      if(phase){
        const key=JSON.stringify([state.mass,state.stiffness,state.position,state.momentum]);
        if(key!==phaseKey){phase.innerHTML=phaseView(state);phaseKey=key;}
        else {
          const point=phase.querySelector('.mx-state-dot');point.setAttribute('cx',205+62*v.q);point.setAttribute('cy',190-50*v.p);
          const trail=Array.from({length:81},(_,i)=>{const w=oscillator({...state,time:state.time*i/80});return [205+62*w.q,190-50*w.p]});
          phase.querySelector('.mx-phase-trail').setAttribute('d',curve(trail));
          phase.querySelector('svg').setAttribute('aria-label',`Position q ${fmt(v.q)} metres and momentum p ${fmt(v.p)} kilogram metres per second. The dot follows an energy contour in phase space.`);
        }
      }
      time.max=v.period;time.value=state.time;time.style.setProperty('--range-fill',`${100*state.time/v.period}%`);
      root.querySelector('[data-mx-clock]').textContent=`${fmt(state.time)} s / ${fmt(v.period)} s`;
      root.querySelector('[data-mx-p]').textContent=`${fmt(v.p)} kg m/s`;
      root.querySelector('[data-mx-direction]').textContent=v.p>1e-8?'Moving right':v.p<-1e-8?'Moving left':'Momentarily at rest';
      root.querySelector('[data-mx-insight]').textContent=v.initialEnergy<1e-12?'The cart is at rest at the unstretched position. With no spring force and no momentum, it stays there.':v.kinetic/v.initialEnergy>.995?'Near the unstretched position, almost all the energy is kinetic. The cart keeps moving through.':v.kinetic/v.initialEnergy<.001?'Near a turning point, almost all the energy is stored in the spring. The restoring force reverses the motion.':v.force*v.velocity>0?'The spring is speeding the cart up. Stored energy is becoming kinetic energy.':'The cart is moving against the spring force. Kinetic energy is being stored in the spring.';
      play.textContent=playing?'Pause':'Play';play.setAttribute('aria-pressed',String(playing));
      root.dataset.visualState=JSON.stringify(state);root.dataset.narrationSource=mechanicsSource(type,state);
      root.dataset.scientificContext=JSON.stringify({id:root.id,version:1,model:'Exact undamped Hooke-law oscillator',parameters:{...state},readouts:v,units:'SI: m, kg, s, J; stiffness N/m',assumptions:['Frictionless one-dimensional track','Ideal massless Hooke-law spring','No driving'],equations:['qdot=p/m','pdot=-k q','H=p²/(2m)+kq²/2']});
      if(user){document.dispatchEvent(new CustomEvent('gr:visual-change',{detail:{id:root.id,type:'mechanics',state:{...state}}}));status.textContent=`${root.querySelector('[data-mx-direction]').textContent}. Kinetic energy ${fmt(v.kinetic)} joules; spring energy ${fmt(v.potential)} joules.`;}
    }
    function sync() {for(const input of root.querySelectorAll('[data-mx-parameter]')){input.value=state[input.dataset.mxParameter];input.parentElement.querySelector('output').textContent=fmt(+input.value);input.style.setProperty('--range-fill',`${100*(+input.value-input.min)/(input.max-input.min)}%`);}draw();}
    function stopFrame(){cancelAnimationFrame(frame);frame=0;previous=0;}
    function tick(now){frame=0;if(disposed||!playing||!visible||document.hidden)return;if(previous)state.time=(state.time+Math.min((now-previous)/1000,.06))%oscillator(state).period;previous=now;draw();frame=requestAnimationFrame(tick);}
    function schedule(){stopFrame();if(playing&&visible&&!document.hidden&&!disposed)frame=requestAnimationFrame(tick);}
    on(play,'click',()=>{playing=!playing;draw(true);schedule()});
    on(time,'input',()=>{playing=false;state.time=+time.value;draw(true);schedule()});
    on(root.querySelector('[data-mx-quarter]'),'click',()=>{playing=false;const T=oscillator(state).period;state.time=(Math.floor(state.time/(T/4)+1e-6)+1)*T/4;if(state.time>T+1e-6)state.time=0;draw(true);schedule()});
    on(root.querySelector('[data-mx-reset]'),'click',()=>{playing=false;state={...mechanicsDefaults};sync();draw(true);schedule()});
    for(const input of root.querySelectorAll('[data-mx-parameter]'))on(input,'input',()=>{playing=false;state=mechanicsState({...state,[input.dataset.mxParameter]:+input.value,time:0});sync();draw(true);schedule()});
    on(document,'visibilitychange',schedule);
    on(reduced,'change',()=>{if(reduced.matches){playing=false;draw();schedule()}});
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.target===root)visible=entry.isIntersecting;schedule()},{threshold:0});observer.observe(root);
    root.querySelector('[data-mx-controls]').hidden=false;root.querySelector('[data-mx-setup]').hidden=false;
    sync();root.dataset.mechanicsReady='true';
    cleanups.push(()=>{disposed=true;stopFrame();observer.disconnect();abort.abort()});
  }
  return ()=>cleanups.forEach(fn=>fn());
}
