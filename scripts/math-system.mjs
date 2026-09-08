import katex from 'katex';

// Color mathematical objects, never characters inside prose, command names,
// units or operator names. Indices retain their usual neutral ink.
export function semanticTex(tex, context='') {
 const scalarCurvature=/^(8|9|10|12|13|14|15|21|22|23)$/.test(String(context));
 const protectedCommands=new Set(['begin','end','mathbb','mathcal','mathfrak','mathrm','mathsf','mathtt','text','textrm','textsf','texttt','operatorname','color','htmlClass','class','href','url']);
 function groupEnd(i){let depth=0;for(let j=i;j<tex.length;j++){if(tex[j]==='{')depth++;if(tex[j]==='}'&&!--depth)return j+1;}return tex.length;}
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
  result+=role?`{\\htmlClass{math-${role}}{${token}}}`:token;i=end;
 }
 return result;
}
export function math(tex, display=false, context='') {
 return katex.renderToString(semanticTex(tex,context),{displayMode:display,throwOnError:true,strict:'ignore',output:'htmlAndMathml',trust:c=>c.command==='\\htmlClass'});
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
