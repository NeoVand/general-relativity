// Word segmentation and character timing adapted from Voicebook (MIT).
export function wordsFor(text){
 if(typeof Intl.Segmenter==='function')return [...new Intl.Segmenter('en',{granularity:'word'}).segment(text)].filter(p=>p.isWordLike).map(p=>({text:p.segment,start:p.index,end:p.index+p.segment.length}));
 return [...text.matchAll(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)].map(m=>({text:m[0],start:m.index,end:m.index+m[0].length}));
}
export function alignedWords(alignment){
 if(!alignment?.characters?.length)return [];
 let text='';const starts=[],ends=[];
 alignment.characters.forEach((c,i)=>{for(let j=0;j<c.length;j++){starts.push(alignment.character_start_times_seconds[i]);ends.push(alignment.character_end_times_seconds[i]);}text+=c;});
 return wordsFor(text).map(w=>({...w,word:w.text,startTime:starts[w.start],endTime:ends[w.end-1]})).filter(w=>Number.isFinite(w.startTime)&&Number.isFinite(w.endTime));
}
export function wordAt(words,time){
 let lo=0,hi=words.length-1,found=-1;
 while(lo<=hi){const mid=(lo+hi)>>1;if(words[mid].startTime<=time){found=mid;lo=mid+1}else hi=mid-1;}
 return found>=0&&time<=words[found].endTime+.12?found:-1;
}
export function captionTokens(text,words,index){
 if(!words.length)return [];
 const at=Math.max(0,index);let start=at,end=at+1;
 while(start>0&&at-start<12&&!/[.!?]\s*$/.test(text.slice(words[start-1].end,words[start].start)))start--;
 while(end<words.length&&end-start<25&&!/[.!?]\s*$/.test(text.slice(words[end-1].end,words[end].start)))end++;
 return words.slice(start,end).map((w,i)=>({index:start+i,text:text.slice(w.start,words[start+i+1]?.start??text.length)}));
}
const normalize=s=>s.toLocaleLowerCase().replace(/[’]/g,"'");
// A sequence match preserves source wording around spoken inline math. We never
// pretend a rewritten equation is a word-for-word copy of its rendered glyphs.
export function matchWords(spoken,visible){
 const a=spoken.map(w=>normalize(w.word||w.text)),b=visible.map(w=>normalize(w.text));
 const rows=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)rows[i][j]=a[i]===b[j]?1+rows[i+1][j+1]:Math.max(rows[i+1][j],rows[i][j+1]);
 const map=new Map();let i=0,j=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){map.set(i,j);i++;j++;}else if(rows[i+1][j]>=rows[i][j+1])i++;else j++;}return map;
}
export function sourceHighlighter(element,spoken,kind){
 const clear=()=>globalThis.CSS?.highlights?.delete('spoken-word');
 if(!element||!['text','heading'].includes(kind)||!globalThis.Highlight||!CSS.highlights)return {show:clear,clear};
 const visible=[];const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.katex,svg,button,.heading-link,[hidden],.passage-tools')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 let node;while((node=walker.nextNode()))for(const w of wordsFor(node.textContent))visible.push({...w,node});
 const map=matchWords(spoken,visible);
 return {clear,show(index){clear();const word=visible[map.get(index)];if(!word)return;const range=new Range();range.setStart(word.node,word.start);range.setEnd(word.node,word.end);CSS.highlights.set('spoken-word',new Highlight(range));}};
}
