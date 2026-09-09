import {labRecords,defaultsFor} from '../web/lab-records.js';
import {labResultHTML,labReadoutsHTML,labDataHTML} from '../web/relativity-labs.js';
import {parameterControl,resetControl,esc} from './experiment-controls.mjs';
import {icon} from './scenes.mjs';
export function relativityLabHTML(id,render){
 const record=labRecords[id],state=defaultsFor(id),r=source=>render(source,{id:`lab-${id}`,chapter:record.chapter}).html;
 const views=id==='star'?['Star','Profiles']:id==='photon'?['Waves','Frequency plot']:null;
 return `<section class="spacetime-lab relativity-lab" id="lab-${id}" data-relativity-lab="${id}" data-lab-view="scene" aria-labelledby="lab-${id}-title">
 <header class="scene-heading"><span class="eyebrow">${icon('CubeIcon')} ${esc(record.labLabel)}</span><h2 id="lab-${id}-title">${esc(record.title)}</h2><p>${esc(record.question)}</p></header>
 <div class="scene-viewbar" data-lab-toolbar hidden>${views?`<div class="scene-view-switch" role="group" aria-label="View">${views.map((v,i)=>`<button type="button" data-lab-view-button="${i?'plot':'scene'}" aria-pressed="${!i}">${v}</button>`).join('')}</div>`:'<span></span>'}${resetControl('data-lab-reset')}</div>
 <div class="experiment-workbench"><div data-lab-result data-no-narration>${labResultHTML(id,state)}</div><div class="experiment-console"><form class="scene-controls" data-lab-controls data-no-narration hidden aria-label="${esc(record.title)} controls">${record.parameters.map(p=>parameterControl(`lab-${id}`,p)).join('')}${id==='photon'?'<p class="experiment-control-note">Velocity: − inward, + outward.</p>':''}</form><div data-lab-readouts data-no-narration>${labReadoutsHTML(id,state)}</div></div></div>
 <p class="experiment-hint">${esc(record.hint)}</p><p data-lab-status role="status"></p>
 <details class="lab-method"><summary>How this is calculated</summary><div class="experiment-detail"><p>${esc(record.units)}</p>${record.equations.map(e=>`<div data-scientific-equation="${e.id}">${r(`$$${e.tex}$$`)}</div>`).join('')}<ul>${record.assumptions.map(a=>`<li>${esc(a)}</li>`).join('')}</ul><p>${esc(record.limitation)}</p><a href="${record.source.url}" target="_blank" rel="noopener">${esc(record.source.title)} ↗</a></div></details>
 <details class="lab-data"><summary>Measurements and notebook</summary><div class="experiment-detail"><p>${esc(record.units)}</p><div data-lab-data>${labDataHTML(id,state)}</div><div data-lab-actions data-no-narration hidden><button class="experiment-text-button" type="button" data-lab-export>Download measurements · CSV ↓</button><label for="lab-${id}-note">Your observation</label><textarea id="lab-${id}-note" data-lab-observation maxlength="4000" placeholder="What changed? What would you try next?"></textarea><small>Saved with your settings in the <a href="notebook.html">field notebook</a>.</small></div></div></details></section>`;
}
