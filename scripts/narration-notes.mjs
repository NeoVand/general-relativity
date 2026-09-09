// Editorial narration for the opening covector example. Each slot contributes
// something new; the neighboring prose and equation are read separately.
export function narrationNote(el,kind){
 if(el.closest('[data-scene="covector"]')){
  if(kind==='visualization')return 'The arrow points from the origin through parallel planes. Follow the gaps between planes that it crosses; motion along a plane does not add to that count.';
  if(kind==='equation')return 'The covector called omega measures change in x. The displacement has components three, two, and one, so omega applied to that displacement returns three.';
  if(el.matches('.scene-note'))return 'The labels on the planes are x-coordinate values in ordinary three-dimensional Euclidean space.';
 }
 if(el.id==='figure-vector-covector')return 'The left panel shows an arrow and its horizontal displacement. The right panel shows the same displacement crossing three intervals between level lines. The covector measures that crossing count, not the arrow’s length. Changing coordinate scale changes the vector and covector components in compensating ways.';
}
