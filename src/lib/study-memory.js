const key='gr-listening-history-v1';
export function loadHistory(){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}}
export function saveHistory(history){try{localStorage.setItem(key,JSON.stringify(history))}catch{}}
export function recordListening(history,page,segment,{word=0,seconds=0,completed=false,excerpt=''}={}){
 const chapter=history[page]||{heard:{}};
 const previous=chapter.heard?.[segment.id];
 chapter.heard||={};chapter.heard[segment.id]={hash:segment.hash,completed:completed||(previous?.hash===segment.hash&&previous.completed)||false,word,seconds};
 chapter.last={passage:segment.id,heading:segment.heading,word,seconds,excerpt:excerpt.slice(0,350),at:Date.now()};
 history[page]=chapter;saveHistory(history);
}
export function historyContext(history,pages){
 return pages.filter(p=>history[p.id]).map(p=>{const h=history[p.id];const heard=p.segments.filter(s=>h.heard?.[s.id]?.hash===s.hash&&h.heard[s.id].completed);const ranges=[];for(const s of heard){const last=ranges.at(-1);if(last&&last.endIndex===s.index-1){last.end=s.id;last.endIndex=s.index}else ranges.push({start:s.id,end:s.id,endIndex:s.index});}return {page:p.id,completed:heard.length,total:p.segments.length,ranges:ranges.slice(-30).map(({endIndex,...r})=>r),last:h.last};});
}
export function compactHistory(history,pages,currentPage){
 const entries=historyContext(history,pages);
 const recent=new Set([...entries].sort((a,b)=>(b.last?.at||0)-(a.last?.at||0)).slice(0,4).map(e=>e.page));recent.add(currentPage);
 return entries.map(e=>recent.has(e.page)?{...e,ranges:e.ranges.slice(-12)}:{page:e.page,completed:e.completed,total:e.total,lastPassage:e.last?.passage});
}
