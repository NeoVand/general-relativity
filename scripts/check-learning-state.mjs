import assert from 'node:assert/strict';
import {emptyNotebook,validateNotebook,recordCalculation,recordConcept,recordHelp,beginCalculation,evidenceLabel,mergeNotebooks,parseNumericAnswer} from '../web/learning-state.js';

let e=recordHelp(null,'solution');
e=recordCalculation(e,{id:'original'},'5',true,{id:'first',at:100});
assert(!e.independent);assert.match(evidenceLabel(e),/Worked through/);
e=beginCalculation(e,'different-geometry');
e=recordCalculation(e,{id:'different-geometry'},'13',true,{id:'second',at:200});
assert(e.independent);assert.equal(e.history[0].help,'solution');assert.equal(e.history[1].help,'none');
e=recordHelp(e,'hint');
e=recordCalculation(e,{id:'different-geometry'},'12',false,{id:'third',at:300});
assert(e.transfer);assert(e.independent);assert.equal(e.latestCorrect,false);assert.match(evidenceLabel(e),/earlier success saved/);
const before=e.history.map(a=>({...a}));recordHelp(e,'solution');assert.deepEqual(e.history,before,'looking at a solution never retroactively changes an attempt');
const c=recordConcept(null,{id:'invariant-pairing',correct:true},2,{id:'concept-check',at:10});
assert.equal(c.choiceId,'invariant-pairing');assert.equal(c.history[0].choiceId,'invariant-pairing');

const old=validateNotebook({version:1,route:'horizons',depths:{test:'formal'},notes:{test:{text:'My proof',saved:10}},evidence:{test:{transfer:true,attempts:5,answer:'4',updated:25}}});
assert.equal(old.version,2);assert.equal(old.evidence.test.history[0].help,'unknown','old records cannot prove independence');assert.equal(old.evidence.test.attempts,5);
old.experiments.star={version:1,parameters:{central:.4,step:.01},note:'Pressure supports the star',saved:20};old.journal={text:'A question beyond a chapter',saved:25};
const restored=mergeNotebooks(emptyNotebook(),old);assert.deepEqual(restored,old,'every exported field survives a fresh-browser restore');
const local=emptyNotebook();local.notes.test={text:'Local proof',saved:30,visual:null};local.evidence.test=e;
const merged=mergeNotebooks(local,old);assert.equal(merged.notes.test.text,'Local proof');assert.equal(merged.route,'horizons');assert.equal(merged.evidence.test.history.length,4);assert.equal(merged.evidence.test.attempts,8,'preserve the old aggregate count plus the new attempts');
assert.equal(mergeNotebooks(local,old,{preferImported:true}).notes.test.text,'My proof');
assert.deepEqual(mergeNotebooks(merged,old),merged,'re-importing the same evidence is idempotent');
for(const [source,value] of [['1/12',1/12],[' -1 / 7 ',-1/7],['2.5e-3',.0025],['.5',.5],['+3',3]])assert.equal(parseNumericAnswer(source),value);
for(const source of ['', 'Infinity','1/0','2+3','0x12','alert(1)','NaN','1/2/3'])assert.equal(parseNumericAnswer(source),null);
assert.throws(()=>validateNotebook({version:99}));
console.log('Verified honest assisted/independent attempt history, stable answer identities, v1 migration, full backup restoration, conflict handling, idempotent evidence merge, and finite decimal/fraction input.');
