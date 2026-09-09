// A notebook is evidence about attempts, not a permanent label on a learner.
export const notebookVersion = 2;
const validId = value => typeof value === 'string' && /^[a-z0-9-]{1,160}$/.test(value);
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const text = (value, limit) => typeof value === 'string' ? value.slice(0, limit) : '';
const time = value => Number.isFinite(value) && value >= 0 ? value : 0;
const helpLevels = ['none', 'hint', 'solution', 'unknown'];
export const emptyNotebook = () => ({version:notebookVersion,route:'core',depths:{},evidence:{},notes:{},visuals:{},experiments:{},journal:{text:'',saved:0}});

function cleanAttempt(a) {
 if (!object(a) || !validId(a.id) || !['transfer','concept','legacy'].includes(a.kind)) return null;
 return {
  id:a.id,kind:a.kind,itemId:validId(a.itemId)?a.itemId:'original',
  itemVersion:Number.isInteger(a.itemVersion)?a.itemVersion:1,
  answer:text(a.answer,120),choiceId:validId(a.choiceId)?a.choiceId:null,
  correct:a.correct===true,help:helpLevels.includes(a.help)?a.help:'unknown',
  at:time(a.at),...(a.kind==='legacy'?{aggregate:true,aggregateCount:Math.max(1,Math.min(1e6,Number(a.aggregateCount)||1))}:{})
 };
}
function summarize(e) {
 const calculations=e.history.filter(a=>a.kind==='transfer'||a.kind==='legacy');
 const last=calculations.at(-1);
 return {...e,transfer:calculations.some(a=>a.correct),
  independent:calculations.some(a=>a.kind==='transfer'&&a.correct&&a.help==='none'),
  latestCorrect:last?.correct??null,
  lastSuccess:Math.max(0,...calculations.filter(a=>a.correct).map(a=>a.at))};
}
function cleanEvidence(e,version) {
 if(!object(e))return null;
 let history=Array.isArray(e.history)?e.history.map(cleanAttempt).filter(Boolean):[];
 if(version===1&&!history.length&&(e.attempts||e.transfer))history=[{
  id:`legacy-${time(e.updated)}`,kind:'legacy',itemId:'original',itemVersion:1,
  answer:text(e.answer,120),choiceId:null,correct:e.transfer===true,
  help:e.solutionSeen?'solution':'unknown',at:time(e.updated),aggregate:true,aggregateCount:Math.max(1,Number(e.attempts)||1)
 }];
 return summarize({
  history,attempts:Math.max(history.filter(a=>a.kind==='transfer').length,Math.min(1e6,Number(e.attempts)||0)),
  choice:Number.isInteger(e.choice)?e.choice:null,choiceId:validId(e.choiceId)?e.choiceId:null,
  predicted:e.predicted===true,answer:text(e.answer,120),updated:time(e.updated),
  solutionSeen:e.solutionSeen===true,
  active:{itemId:validId(e.active?.itemId)?e.active.itemId:'original',
   help:helpLevels.includes(e.active?.help)?e.active.help:(version===1?(e.solutionSeen?'solution':'unknown'):'none'),
   conceptHelp:helpLevels.includes(e.active?.conceptHelp)?e.active.conceptHelp:'none'}
 });
}
export function validateNotebook(input) {
 if(!object(input)||![1,notebookVersion].includes(input.version))throw Error('This is not a compatible field notebook.');
 const out=emptyNotebook();
 out.route=validId(input.route)?input.route:'core';
 for(const [id,depth] of Object.entries(input.depths||{}))if(validId(id)&&['intuition','derive','formal'].includes(depth))out.depths[id]=depth;
 for(const [id,note] of Object.entries(input.notes||{}))if(validId(id)&&object(note)&&typeof note.text==='string')out.notes[id]={text:text(note.text,12000),saved:time(note.saved),visual:object(note.visual)?structuredClone(note.visual):null};
 for(const [id,e] of Object.entries(input.evidence||{}))if(validId(id)){const clean=cleanEvidence(e,input.version);if(clean)out.evidence[id]=clean;}
 for(const [id,value] of Object.entries(input.visuals||{}))if(validId(id)&&object(value))out.visuals[id]=structuredClone(value);
 for(const [id,e] of Object.entries(input.experiments||{}))if(validId(id)&&object(e)&&object(e.parameters))out.experiments[id]={version:Number.isInteger(e.version)?e.version:1,parameters:structuredClone(e.parameters),note:text(e.note,4000),saved:time(e.saved)};
 if(object(input.journal))out.journal={text:text(input.journal.text,12000),saved:time(input.journal.saved)};
 return out;
}
export function evidenceFor(e) {return cleanEvidence(e||{},notebookVersion);}
const eventId = () => `attempt-${globalThis.crypto.randomUUID()}`;
export function recordConcept(previous,choice,index,{at=Date.now(),id=eventId()}={}) {
 const e=evidenceFor(previous);
 e.history.push({id,kind:'concept',itemId:'concept',itemVersion:1,answer:'',choiceId:choice.id,correct:choice.correct,help:e.active.conceptHelp,at});
 return {...e,choice:index,choiceId:choice.id,predicted:choice.correct,updated:at};
}
export function recordCalculation(previous,item,answer,correct,{at=Date.now(),id=eventId()}={}) {
 const e=evidenceFor(previous);
 e.history.push({id,kind:'transfer',itemId:item.id,itemVersion:item.version||1,answer,choiceId:null,correct,help:e.active.help,at});
 return summarize({...e,attempts:e.attempts+1,answer,updated:at});
}
export function recordHelp(previous,kind,which='transfer',at=Date.now()) {
 const e=evidenceFor(previous),field=which==='concept'?'conceptHelp':'help';
 const rank={none:0,hint:1,solution:2,unknown:3};
 if(rank[kind]>rank[e.active[field]])e.active[field]=kind;
 return {...e,solutionSeen:e.solutionSeen||kind==='solution',updated:at};
}
export function beginCalculation(previous,itemId) {
 const e=evidenceFor(previous);
 return {...e,answer:'',active:{...e.active,itemId,help:'none'}};
}
export function evidenceLabel(previous) {
 const e=evidenceFor(previous);
 if(e.latestCorrect===false)return e.transfer?'Review this method · earlier success saved':'Keep exploring';
 if(e.independent)return 'Independent check recorded';
 if(e.transfer)return 'Worked through · try a new example';
 if(e.predicted)return 'Prediction checked';
 return e.attempts?'Keep exploring':'Explore & test';
}
export function parseNumericAnswer(value) {
 const source=value.trim(),number='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?';
 if(!new RegExp(`^${number}(?:\\s*/\\s*${number})?$`).test(source))return null;
 const terms=source.split('/').map(Number),result=terms.length===2?terms[0]/terms[1]:terms[0];
 return Number.isFinite(result)?result:null;
}
export function mergeNotebooks(local,imported,{preferImported=false}={}) {
 const a=validateNotebook(local),b=validateNotebook(imported),out=emptyNotebook();
 // Route and depth are part of the exported backup contract, even in a fresh browser.
 out.route=b.route;out.depths={...a.depths,...b.depths};
 out.notes=preferImported?{...a.notes,...b.notes}:{...b.notes,...a.notes};
 out.experiments=preferImported?{...a.experiments,...b.experiments}:{...b.experiments,...a.experiments};
 out.journal=preferImported||!a.journal.text?b.journal:a.journal;
 out.visuals=preferImported?{...a.visuals,...b.visuals}:{...b.visuals,...a.visuals};
 for(const id of new Set([...Object.keys(a.evidence),...Object.keys(b.evidence)])) {
  if(!a.evidence[id]||!b.evidence[id]){out.evidence[id]=a.evidence[id]||b.evidence[id];continue;}
  const x=a.evidence[id],y=b.evidence[id],latest=x.updated>=y.updated?x:y;
  const history=[...new Map([...y.history,...x.history].map(event=>[event.id,event])).values()].sort((u,v)=>u.at-v.at||u.id.localeCompare(v.id));
  out.evidence[id]=summarize({...latest,history,attempts:Math.max(x.attempts,y.attempts,history.filter(e=>e.kind==='transfer').length+Math.max(0,...history.filter(e=>e.kind==='legacy').map(e=>e.aggregateCount||1)))});
 }
 return out;
}
