// Both tutoring entry points consume exactly the context visible beside a lab.
export function visibleExperiments(){
 return [...document.querySelectorAll('[data-scientific-context]')].filter(root=>{const box=root.getBoundingClientRect();return box.bottom>90&&box.top<innerHeight*.85}).slice(0,2).flatMap(root=>{try{return [{...JSON.parse(root.dataset.scientificContext),learnerObservation:root.querySelector('[data-lab-observation]')?.value?.slice(0,1600)||''}]}catch{return []}});
}
