import {icon} from './scenes.mjs';
export const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function parameterControl(id,p) {
 const key=`${id}-${p.id}`;
 if(p.options)return `<fieldset class="experiment-choice"><legend>${esc(p.label)}</legend><div class="scene-view-switch">${p.options.map(value=>`<label><input type="radio" name="parameter-${p.id}" value="${value}" ${value===p.value?'checked':''}><span>${esc(p.optionLabels?.[value]??value)}</span></label>`).join('')}</div></fieldset>`;
 return `<div class="experiment-range"><div class="scene-parameter"><label for="${key}">${esc(p.label)}</label><output data-lab-value="${p.id}" for="${key}">${esc(p.value)}</output></div><input type="range" name="parameter-${p.id}" id="${key}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.value}" style="--range-fill:${100*(p.value-p.min)/(p.max-p.min)}%"></div>`;
}
export const resetControl=attribute=>`<div class="scene-actions"><button type="button" ${attribute} aria-label="Reset experiment" title="Reset experiment">${icon('RefreshIcon')}</button></div>`;
