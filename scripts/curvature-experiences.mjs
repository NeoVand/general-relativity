import katex from 'katex';
import {curvatureExperienceMarkup,curvatureExperienceSource,curvatureDefaults} from '../web/curvature-experiences.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ids={pairs:'curvature-pair-explorer',cloud:'curvature-cloud-explorer'};
export function curvatureExperienceHTML(type,{reference=''}={}){
 if(!ids[type])throw Error('Unknown curvature experience: '+type);
 const state={...curvatureDefaults[type]};
 const math=(tex,role='',display=false)=>`<span class="cx-math ${role?'cx-'+role:''}">${katex.renderToString(tex,{throwOnError:true,strict:false,displayMode:display})}</span>`;
 return `<section id="${ids[type]}" class="curvature-experience" data-curvature-experience="${type}" data-visual-state="${esc(JSON.stringify(state))}" data-narration-source="${esc(curvatureExperienceSource(type,state))}" aria-label="${type==='pairs'?'Independent components of curvature':'Shape and volume of a freely falling particle cloud'}">${curvatureExperienceMarkup(type,state,math)}${reference?`<details class="cx-reference" data-no-narration><summary>Reference diagram</summary>${reference}</details>`:''}</section>`;
}
