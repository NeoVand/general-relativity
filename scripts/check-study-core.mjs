import assert from 'node:assert/strict';
import fs from 'node:fs';
import {wordsFor,alignedWords,wordAt,matchWords,captionTokens} from '../src/lib/speech.js';
import {recordListening,historyContext} from '../src/lib/study-memory.js';
import {instruction,scriptKey} from '../src/lib/narration.js';
const characters=['A ','clock',' ','records',' ','3.14',' ','seconds.'];
const words=alignedWords({characters,character_start_times_seconds:[0,.1,.5,.6,1,1.1,1.7,1.8],character_end_times_seconds:[.1,.5,.6,1,1.1,1.7,1.8,2.4]});
assert.equal(words[1].word,'clock');assert.equal(words[1].startTime,.1);assert.equal(words[1].endTime,.5);assert.equal(wordAt(words,.3),1);assert.equal(wordAt(words,5),-1);
assert.equal(words.find(w=>w.word==='3.14').startTime,1.1);
assert.ok(captionTokens(characters.join(''),words,1).some(t=>t.text.includes('clock')));
const spoken=wordsFor('A vector V equals three e one plus four e two. The components change.');const visible=wordsFor('A vector. The components change.');
const matched=matchWords(spoken,visible);assert.equal(matched.get(spoken.findIndex(w=>w.text==='components')),visible.findIndex(w=>w.text==='components'));
const history={};const segment={id:'p1',hash:'a',heading:'A clock',index:0};recordListening(history,'chapter-3',segment,{completed:true,word:4});recordListening(history,'chapter-3',segment,{completed:false,word:1});assert.equal(history['chapter-3'].heard.p1.completed,true);
assert.equal(historyContext(history,[{id:'chapter-3',segments:[segment]}])[0].completed,1);
assert.equal(historyContext(history,[{id:'chapter-3',segments:[{...segment,hash:'edited'}]}])[0].completed,0,'Changed book content is not marked already heard');
assert.notEqual(scriptKey({model:'a'},segment,'flow'),scriptKey({model:'a'},segment,'standalone'));
assert.ok(instruction.includes('keep its wording'));assert.ok(instruction.includes('Do not repeat them'));
const index=JSON.parse(fs.readFileSync('site/reading-index.json'));const map=JSON.parse(fs.readFileSync('site/book-map.json'));
for(const p of map){const source=index.find(t=>t.id===p.id);for(const section of p.outline){assert.equal(source.segments[section.start].id,section.id);assert.equal(source.segments[section.end].id,section.endPassage);assert.ok(section.end>=section.start);}}
const figure=index.find(p=>p.id==='chapter-2').segments.find(s=>s.kind==='figure');assert.equal(figure.text.match(/The covector dx returns/g).length,1);
// Every source passage is addressable directly through the outline, not search.
for(const p of map)for(const s of index.find(t=>t.id===p.id).segments)assert.ok(p.outline.some(o=>o.start<=s.index&&o.end>=s.index));
console.log('Verified timestamp tokenization, math/prose matching, listening history invalidation, narration deduplication and all section targets.');
