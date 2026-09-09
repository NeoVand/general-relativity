import katex from 'katex';

// Color mathematical objects, never characters inside prose, command names,
// units or operator names. Indices retain their usual neutral ink.
export function semanticTex(tex, context='', inspect=false) {
 const scalarCurvature=/^(8|9|10|12|13|14|15|21|22|23)$/.test(String(context));
 const protectedCommands=new Set(['begin','end','mathbb','mathcal','mathfrak','mathrm','mathsf','mathtt','text','textrm','textsf','texttt','operatorname','color','htmlClass','class','href','url']);
 function groupEnd(i){let depth=0;for(let j=i;j<tex.length;j++){if(tex[j]==='{')depth++;if(tex[j]==='}'&&!--depth)return j+1;}return tex.length;}
 // Inspection is stricter than color: a power is not an index, and a familiar
 // letter is not enough to identify the physical object being discussed.
 function indexPartsAt(start){
  const parts=[];let at=start;
  while(at<tex.length){
   while(/\s/.test(tex[at]||'x'))at++;
   if(tex.slice(at,at+2)==='{}'){at+=2;continue}
   const kind=tex[at];if(kind!=='_'&&kind!=='^')break;at++;
   while(/\s/.test(tex[at]||'x'))at++;
   let value;
   if(tex[at]==='{'){const next=groupEnd(at);value=tex.slice(at+1,next-1);at=next}
   else{value=tex.slice(at).match(/^\\[a-zA-Z]+|^./s)?.[0]||'';at+=value.length}
   parts.push({kind,value});
  }
  return parts;
 }
 function indexCount(parts){
  let total=0;
  for(const {value} of parts){
   if(/\\(?:text|mathrm|rm|operatorname)\b/.test(value))continue;
   const tokens=value.replace(/\\(?:hat|bar)\b/g,'').replace(/[{}\s]/g,'').match(/\\[a-zA-Z]+|./g)||[];
   if(tokens.some(t=>!(/^[a-zA-Z0-9]$/.test(t)||/^\\(?:mu|nu|rho|sigma|alpha|beta|gamma|delta|lambda|theta|varphi|phi|chi|eta|tau)$/.test(t))))return null;
   total+=tokens.length;
  }
  return total;
 }
 let result='';
 for(let i=0;i<tex.length;){
  const m=tex.slice(i).match(/^\\[a-zA-Z]+|^\\.|^./s);const token=m[0];let end=i+token.length;
  if(token==='_'||token==='^'){
   while(/\s/.test(tex[end]||'x'))end++;
   if(tex[end]==='{')end=groupEnd(end);
   else end+=(tex.slice(end).match(/^\\[a-zA-Z]+|^\\.|^./s)?.[0].length||0);
   result+=tex.slice(i,end);i=end;continue;
  }
  if(protectedCommands.has(token.slice(1))){while(/\s/.test(tex[end]||'x'))end++;if(tex[end]==='{')end=groupEnd(end);else end+=(tex.slice(end).match(/^\\[a-zA-Z]+|^./s)?.[0].length||0);result+=tex.slice(i,end);i=end;continue;}
  const indexed=/^\s*[_^]/.test(tex.slice(end));
  const tensorIndex=/^\s*[_^]\s*(?:\{(?:\\(?:mu|nu|rho|sigma|alpha|beta|gamma|lambda)|[a-dijk]|[0-3]{2})|\\(?:mu|nu|rho|sigma|alpha|beta|gamma|lambda))/.test(tex.slice(end));
  const metricScalar=/^(4|6|7|8|9|10|12|13|14|15|17|18|19|20|21|22|23|24)$/.test(String(context));
  const metricEta=/^\s*[_^]\s*\{\\[a-z]+\s*\\[a-z]+\}/.test(tex.slice(end));
  const scripts=tex.slice(end).match(/^(?:\s*(?:[_^]\s*(?:\{[^}]*\}|\\[a-z]+)|\{\}))+/)?.[0]||'';
  const weylIndices=(scripts.match(/\\(?:mu|nu|rho|sigma|alpha|beta|gamma|lambda)/g)||[]).length>=4;
  const curvatureForm=/^\s*\^\s*(?:\{[a-d0-3]\}|[a-d0-3])\s*(?:\{\})?\s*_\s*(?:\{[a-d0-3]\}|[a-d0-3])/.test(tex.slice(end));
  let role=null;
  if(token==='g'&&(indexed||metricScalar)||token==='\\eta'&&metricEta)role='geometry';
  if(token==='h'&&indexed&&String(context)==='18'||token==='a'&&String(context)==='19'||token==='\\gamma'&&tensorIndex&&String(context)==='20')role='geometry';
  if(token==='\\Gamma'&&indexed||token==='\\nabla'||token==='\\omega'&&indexed&&String(context)==='21')role='transport';
  if(token==='R'&&(tensorIndex||scalarCurvature)||token==='C'&&weylIndices||token==='G'&&tensorIndex&&!/^\s*_\s*(?:N|\{N\})/.test(tex.slice(end))||token==='\\Omega'&&curvatureForm)role='curvature';
  if(token==='T'&&tensorIndex||token==='\\rho'&&/^(0|11|12|15|16|18|19|22|23)$/.test(String(context)))role='matter';
  if(token==='\\tau'||token==='u'&&indexed)role='observer';
  let key=null;
  if(inspect){
   const parts=indexPartsAt(end),count=indexCount(parts),chapter=String(context);
   const powerOnly=parts.length===1&&parts[0].kind==='^'&&/^\d+$/.test(parts[0].value.trim());
   const tail=tex.slice(end),before=tex.slice(0,i);
   if(role==='geometry'){
    if(token==='g'){
     if((indexed&&!powerOnly&&count===2)||/^\s*(?:\\left\s*)?\([^)]*,/.test(tail))key='metric';
     else if(!indexed&&(/\\sqrt\s*\{?\s*[-|]?\s*$/.test(before)||/^\s*=\s*\\det\b/.test(tail)))key='metric-determinant';
    }else if(token==='\\eta'&&count===2)key='minkowski';
    else if(token==='a')key='scale-factor';
    else if(token==='h'&&count===2)key='perturbation';
    else if(token==='\\gamma'&&count===2)key='spatial-metric';
   }
   if(role==='transport'){
    if(token==='\\Gamma'&&count===3&&!powerOnly)key='connection';
    else if(token==='\\nabla'&&indexed&&!powerOnly&&!/\\(?:boldsymbol|mathbf)\s*\{?\s*$/.test(before))key='covariant-derivative';
    else if(token==='\\omega'&&count===2)key='spin-connection';
   }
   if(role==='curvature'){
    if(token==='R'){
     if(!powerOnly&&count===4)key='riemann';
     else if(!powerOnly&&count===2)key='ricci';
     else if(!indexed&&!/^\s*(?:\\left\s*)?\(/.test(tail)&&scalarCurvature)key='scalar-curvature';
     else if(!indexed&&/^\s*(?:\\left\s*)?\([^)]*,/.test(tail)&&/^(8|10)$/.test(chapter))key='riemann';
    }else if(token==='G'&&count===2)key='einstein';
    else if(token==='C'&&count===4)key='weyl';
    else if(token==='\\Omega'&&count===2)key='curvature-form';
   }
   if(role==='matter')key=token==='T'&&count===2&&/^(11|12|13|14|15|16|17|18|19|20|22|23|24)$/.test(chapter)?'stress-energy':token==='\\rho'?'density':null;
   if(role==='observer'){
    if(token==='\\tau'&&!parts.some(p=>/(?:^|[^a-z])E(?:$|[^a-z])/i.test(p.value)))key='proper-time';
    if(token==='u'&&count===1&&!powerOnly&&/^(3|4|5|9|10|11|12|15|17|19|22|24)$/.test(chapter))key='four-velocity';
   }
   if(token==='\\Lambda'&&!indexed&&/^(1|12|15|19)$/.test(chapter))key='cosmological-constant';
  }
  const classes=[role&&`math-${role}`,key&&`symbol-${key}`].filter(Boolean).join(' ');
  result+=classes?`{\\htmlClass{${classes}}{${token}}}`:token;i=end;
 }
 return result;
}
export function math(tex, display=false, context='') {
 const html=katex.renderToString(semanticTex(tex,context,true),{displayMode:display,throwOnError:true,strict:'ignore',output:'htmlAndMathml',trust:c=>c.command==='\\htmlClass'});
 // Keep color/inspection metadata out of copied LaTeX and spoken source.
 return html.replace(/(<annotation encoding="application\/x-tex">)[\s\S]*?(<\/annotation>)/,(_,a,b)=>a+tex.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+b);
}
export function inline(text,context=''){
 const equations=[];
 const masked=String(text).replace(/\$([^$\n]+)\$/g,(_,tex)=>`INLINEGR${equations.push(math(tex,false,context))-1}END`);
 return masked.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).replace(/INLINEGR(\d+)END/g,(_,i)=>equations[+i]);
}
export const roles=[
 ['geometry','Measurement geometry',String.raw`g_{\mu\nu}`,'The metric turns coordinate steps into physical intervals.'],
 ['transport','Transport & comparison',String.raw`\Gamma^\rho_{\mu\nu}`,'The connection compares directions at neighboring events.'],
 ['curvature','Curvature',String.raw`R^\rho{}_{\sigma\mu\nu}`,'Curvature measures the failure of transport to close.'],
 ['matter','Matter & energy',String.raw`T_{\mu\nu}`,'Stress–energy describes energy, momentum, and pressure.'],
 ['observer','Clocks & observers',String.raw`u^\mu,\;\tau`,'An observer follows a worldline and carries a clock.'],
];
export function legend(compact=false){return `<details class="color-key" ${compact?'':'open'}><summary><span class="spectrum" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>The language of color<span class="key-hint">${compact?'Open the key':'One idea. One visual identity.'}</span></summary><div class="color-roles">${roles.map(([role,title,tex,desc])=>`<div class="color-role"><span class="role-example math-${role}">${math(tex)}</span><strong>${title}</strong><p>${desc}</p></div>`).join('')}</div><p class="key-note">Color follows the object, not its importance. Indices, algebra, constants, and ambiguous symbols stay neutral. A radius called ${math('R')} is not automatically curvature. Names, shapes, and equations carry the meaning even without color. <a href="visual-language.html">Read the design conventions →</a></p></details>`;}
