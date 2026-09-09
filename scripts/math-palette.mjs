// Families remain stable across the book. Related mathematical objects receive
// distinguishable, contrast-checked tones within or beside that family.
export const mathPalette=[
 ['riemann','Riemann tensor','Complete curvature','#6340a7','#c3a7ff'],
 ['ricci','Ricci tensor','Contracted curvature','#7650ad','#bc9be9'],
 ['scalar-curvature','Ricci scalar','Metric trace of Ricci','#a13f78','#eea3c9'],
 ['weyl','Weyl tensor','Trace-free curvature','#9a368f','#e1a0df'],
 ['einstein','Einstein tensor','The divergence-free curvature combination','#553398','#bda8ee'],
 ['volume','Metric volume','The determinant in a volume measure','#33754c','#9ad7a6'],
 ['connection','Connection','Comparison of nearby bases','#275dc5','#91b8ff'],
 ['velocity','Four-velocity','An observer’s tangent direction','#a93458','#ffa6bf'],
 ['density','Energy density','Energy per local volume','#986000','#f1c572'],
 ['pressure','Pressure','Isotropic momentum flux','#a14c22','#f1af8b'],
 ['action','Action','The functional varied to obtain dynamics','#635283','#cab6ed'],
 ['coframe','Orthonormal coframe','Local physical ruler components','#25774d','#8fd9b3'],
 ['torsion','Torsion','The antisymmetric connection property','#346a9e','#92c3ec'],
];
export function mathPaletteCSS({svg=false}={}){
 const light=mathPalette.map(([id,,,color])=>`--math-${id}:${color}`).join(';');
 const dark=mathPalette.map(([id,,,,color])=>`--math-${id}:${color}`).join(';');
 const scope=svg?'svg.gr-figure:not(.embedded)':':root';
 const themed=svg?`@media(prefers-color-scheme:dark){${scope}{${dark}}}`:`:root[data-theme=dark]{${dark}}`;
 return `${scope}{${light}}${themed}`+mathPalette.map(([id,,,color])=>`${svg?'svg.gr-figure ':''}.math-detail-${id}{color:var(--math-${id},${color})}`).join('');
}
