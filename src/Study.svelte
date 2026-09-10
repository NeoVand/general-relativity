<script>
 import {visibleExperiments} from '../web/scientific-context.js';
 import {onMount,tick} from 'svelte';
 import SafeHTML from './SafeHTML.svelte';
 import Icon from './Icon.svelte';
 import {loadSettings,saveSettings,forgetSettings,defaults,clearCache,cached,saveCache} from './lib/cache.js';
 import {voices,complete} from './lib/providers.js';
 import {narrationText,narrationAudio,splitSpeech,needsExplanation,scriptKey} from './lib/narration.js';
 import {catalog,currentPassage,showPassage,rankPassages,toolSpecs,teachingInstructions,bookMap,compactBookMap,focusContext,voiceTeachingInstructions,textTutorTool} from './lib/book.js';
 import {defaultShortcut,loadShortcut,saveShortcut,shortcutFromEvent,matchesShortcut,releasesShortcut,shortcutLabel} from './lib/voice-shortcut.js';
 import {voiceToolQueue,navigationOnlyRequest} from './lib/voice-tools.js';
 import {mintRealtimeSecret,connectRealtime} from './lib/openai-realtime.ts';
 import {wordAt,captionTokens,sourceHighlighter} from './lib/speech.js';
 import {loadHistory,recordListening,historyContext,compactHistory} from './lib/study-memory.js';
 import {answerHTML} from './lib/format.js';
 import {readingPosition,restoreReadingPosition} from './lib/reading-position.js';
 import {readingSelection,selectionPosition} from './lib/selection.js';
 import {extractPassageText,withNarrationContext,isReadingVisible,readingNeighborhood,explicitNarrationRange} from './lib/reading-context.js';
 let {page,navigate}=$props();
 let settings=$state(loadSettings());
 let open=$state(false),tab=$state('listen'),error=$state(''),notice=$state('');
 let voiceList=$state([]),loadingVoices=$state(false),selected=$state(null);
 let playback=$state('idle'),readingTitle=$state(''),readingPage=$state(''),readingIndex=$state(0),readingCount=$state(0),script=$state(''),progress=$state(0),rate=$state(1),follow=$state(true);
 let captionsOpen=$state(false),scriptOpen=$state(false),preparing=$state(false),prepared=$state(0),prepareCount=$state(0);
 let question=$state(''),messages=$state([]),thinking=$state(false),callState=$state('idle'),muted=$state(false),caption=$state('');
 let liveTokens=$state([]),spokenWord=$state(-1),readingHeading=$state(''),toolActivity=$state(''),narratorOwnsAudio=$state(false);
 let history=loadHistory(),wordHighlighter,wordElement,wordFrame=0,lastHistoryWrite=0,packet,hovered,readingMode='flow',voiceRequest='',voiceTurn=0,contextGeneration=0;
 let audio,callAudio,channel,microphone,playController,prepareController,chatController,callController;
 let run=0,callGeneration=0,chatGeneration=0,activeURL,queue=[],queuePage='',queueCursor=0,onceOnly=false,stopWait=()=>{},currentScriptSegment;
 const voiceTools=voiceToolQueue(executeVoiceTools,fail),voiceInputs=new Map(),manualItems=new Set();
 let selectionPinned=false,panelLayout=Promise.resolve();
 let shortcut=$state(loadShortcut()),recordingShortcut=$state(false),shortcutHeld=$state(false),pushToTalk=$state(false),shortcutCandidate;
 let manualReady=false,captureStarted=0,pendingCommits=[],interruptedReading=null;
 const shortcutText=$derived(shortcut?shortcutLabel(shortcut):'Shortcut disabled');
 const selection=$derived(selected?.page===page.id&&selected?.element?.isConnected?selected:null);
 const active=$derived(playback!=='idle');
 const calling=$derived(callState!=='idle');
 const busy=$derived(playback==='preparing');
 const voiceStatus=$derived(callState==='connecting'?'Connecting…':narratorOwnsAudio?'Microphone off':toolActivity?'Working…':callState==='speaking'?'Speaking':callState==='thinking'?'Thinking…':pushToTalk?(shortcutHeld&&!muted?'Listening · release to send':'Hold to ask'):muted?'Microphone muted':'Listening to you');
 function resolveSegment(segment){
  if(!segment)return segment;
  const element=document.getElementById(segment.id);
  if(element?.matches('.visual-lesson')){const text=extractPassageText(element,{live:true});const latex=[...text.matchAll(/\$([^$]+)\$/g)].map(match=>match[1]);return {...segment,text,description:text,latex,narration:undefined,sourceHash:segment.hash,hash:segment.hash+(element.dataset.visualState||'')};}
  const view=element?.closest('[data-scene]')?.dataset.activeView;
  const variant=segment.views?.[view];
  const liveSource=element?.dataset.narrationSource||(element?.matches('.scene-stage')?element.closest('[data-scene]')?.dataset.narrationSource:null);
  if(liveSource&&!variant){const latex=[...liveSource.matchAll(/\$([^$]+)\$/g)].map(match=>match[1]);return {...segment,text:liveSource,description:liveSource,latex,narration:undefined,sourceHash:segment.hash,hash:segment.hash+liveSource};}
  return variant?{...segment,...variant,sourceHash:segment.hash,view}:segment;
 }
 function visibleSegments(){return withNarrationContext(page.segments.filter(segment=>isReadingVisible(segment,document)).map(resolveSegment))}
 function visibleSegment(segment){
  if(!segment)return segment;
  const visible=visibleSegments(),found=visible.find(s=>s.id===segment.id);if(found)return found;
  return withNarrationContext(readingNeighborhood(page.segments,segment.id).map(resolveSegment)).find(s=>s.id===segment.id);
 }
 function sizeComposer(node){
  question;
  node.style.height='auto';
  node.style.height=`${Math.min(node.scrollHeight,160)}px`;
 }
 function fail(e){if(e?.name!=='AbortError')error=e?.message||'Something went wrong. Please retry.'}
 function pinSelection(){if(selection){selectionPinned=true;selected={...selection,anchor:null};getSelection()?.removeAllRanges()}}
 function clearSelection(){selected=null;selectionPinned=false}
 function preservePanelPosition(position,id,focus){panelLayout=tick().then(()=>{if(page.id===id)restoreReadingPosition(position,el=>el);document.querySelector(focus)?.focus({preventScroll:true});});}
 function closeStudy(){const position=readingPosition();open=false;clearSelection();preservePanelPosition(position,page.id,'.companion-dock button,.study-launcher button');}
 function cancelVoiceTurn(){voiceTurn++;voiceTools.interrupt();toolActivity='';}
 function requestVoiceResponse(){channel?.send({type:'response.create',response:{metadata:voiceTools.metadata()}})}
 function reveal(nextTab){const position=readingPosition();pinSelection();open=true;tab=nextTab;error='';notice='';preservePanelPosition(position,page.id,'#study-panel');}
 function persist(){notice=saveSettings($state.snapshot(settings))?'Connections saved.':'This browser cannot save connections; they remain available until you leave.';error='';}
 function forget(){stop();endCall();chatController?.abort();prepareController?.abort();forgetSettings();settings={...defaults};notice='API keys removed.';error='';}
 async function loadVoices(){loadingVoices=true;error='';try{voiceList=await voices(settings);if(voiceList.length&&!voiceList.some(v=>v.voice_id===settings.voiceId)){settings.voiceId=voiceList[0].voice_id;settings.voiceName=voiceList[0].name}}catch(e){fail(e)}finally{loadingVoices=false}}
 function requireKeys(narration=false){if(!settings.openaiKey||(narration&&!settings.elevenKey)){reveal('settings');notice=narration?'Add both API keys to listen with spoken mathematical explanations.':'Add an OpenAI API key to ask the tutor.';return false}return true}
 function remember(completed=false){const segment=queue[queueCursor];if(!segment||!packet)return;recordListening(history,queuePage,segment.sourceHash?{...segment,hash:segment.sourceHash}:segment,{word:Math.max(0,spokenWord),seconds:audio?.currentTime||0,completed:completed&&!segment.partial,excerpt:liveTokens.map(w=>w.text).join('')});}
 function clearWords(){cancelAnimationFrame(wordFrame);wordHighlighter?.clear();wordHighlighter=null;wordElement=null;}
 function handToNarrator({afterSpeech=false}={}){
  if(!calling)return;narratorOwnsAudio=true;callAudio.muted=true;
  microphone?.getAudioTracks().forEach(t=>t.enabled=false);
  if(!afterSpeech){cancelVoiceTurn();channel?.send({type:'response.cancel'});channel?.send({type:'output_audio_buffer.clear'});}
  channel?.send({type:'input_audio_buffer.clear'});
 }
 async function talkAboutReading(){pause();cancelVoiceTurn();if(!calling){await startCall();return}enableHandsFree();callState='listening';await syncVoiceContext().catch(fail);}
 function beginManualCapture(){
  if(!shortcutHeld||!pushToTalk||!manualReady||!channel||captureStarted)return;
  channel.send({type:'input_audio_buffer.clear'});captureStarted=performance.now();muted=false;
  microphone?.getAudioTracks().forEach(t=>t.enabled=true);callState='listening';
 }
 async function holdToTalk(){
  if(shortcutHeld)return;shortcutHeld=true;pause();
  const {interruptedReading:previous,...focus}=readerFocus(true);interruptedReading=JSON.parse(JSON.stringify(focus));
  cancelVoiceTurn();pushToTalk=true;manualReady=false;captureStarted=0;
  if(!calling){await startCall({manual:true});if(!calling)shortcutHeld=false;return;}
  narratorOwnsAudio=false;callAudio.muted=false;muted=true;microphone?.getAudioTracks().forEach(t=>t.enabled=false);
  channel?.send({type:'response.cancel'});channel?.send({type:'output_audio_buffer.clear'});
  channel?.send({type:'session.update',session:{type:'realtime',audio:{input:{turn_detection:null}}}});
 }
 function releaseToTalk({discard=false}={}){
  if(!shortcutHeld)return;shortcutHeld=false;muted=true;microphone?.getAudioTracks().forEach(t=>t.enabled=false);
  if(captureStarted&&!discard&&performance.now()-captureStarted>=100){const event_id=`hold-${voiceTurn}-${crypto.randomUUID()}`;pendingCommits.push({turn:voiceTurn,event_id});channel?.send({type:'input_audio_buffer.commit',event_id});callState='thinking';}
  else{channel?.send({type:'input_audio_buffer.clear'});if(calling&&callState!=='connecting')callState='listening';}
  captureStarted=0;
 }
 function setShortcut(value){releaseToTalk({discard:true});shortcut=value;saveShortcut(value);recordingShortcut=false;shortcutCandidate=null;}
 function enableHandsFree(){pushToTalk=false;shortcutHeld=false;manualReady=false;narratorOwnsAudio=false;muted=false;callAudio.muted=false;channel?.send({type:'session.update',session:{type:'realtime',audio:{input:{turn_detection:{type:'server_vad',create_response:false,interrupt_response:true}}}}});microphone?.getAudioTracks().forEach(t=>t.enabled=true);}
 function stop(){remember();run++;playController?.abort();stopWait();stopWait=()=>{};audio?.pause();clearWords();if(audio){audio.removeAttribute('src');audio.load()}if(activeURL)URL.revokeObjectURL(activeURL);activeURL=null;packet=null;playback='idle';progress=0;liveTokens=[];spokenWord=-1;document.querySelectorAll('.narration-active').forEach(n=>n.classList.remove('narration-active'));}
 function finishNarration(){stop();if(calling&&narratorOwnsAudio){narratorOwnsAudio=false;callAudio.muted=false;microphone?.getAudioTracks().forEach(t=>t.enabled=!muted);callState='listening';syncVoiceContext().catch(fail);}}
 function pause(){if(playback==='idle')return;playback='paused';audio?.pause();remember();}
 async function resume({afterSpeech=false}={}){handToNarrator({afterSpeech});if(playback==='error'){startQueue();return}if(!active){await listen('current');return}playback=audio?.src?'playing':'preparing';const token=run;if(audio?.src)try{await audio.play()}catch{if(token===run){playback='paused';error='Press play once more to allow audio in this browser.'}}}
 function toggle(){if(playback==='paused'||playback==='error')resume();else pause();}
 async function listen(mode='chapter',id,endId,{fromTool=false}={}){
  const excerpt=mode==='selection'?selection:null;
  if(excerpt)pinSelection();
  if(!requireKeys(true))return false;
  if(!fromTool){cancelAnswer();cancelVoiceTurn();}
  stop();
  const sourceStart=page.segments.findIndex(s=>s.id===(id||(mode==='selection'?selection?.start:currentPassage())));
  const end=page.segments.findIndex(s=>s.id===(endId||selection?.end));
  const ranged=mode==='selection'||mode==='range';
  const explicit=ranged&&id?explicitNarrationRange(page.segments,id,endId||id,{isVisible:s=>isReadingVisible(s,document,{includeNoNarration:true})}):null;
  const sources=mode==='one'&&id?[visibleSegment(page.segments.find(s=>s.id===id))].filter(Boolean):explicit?explicit.map(resolveSegment):visibleSegments();
  const requested=sources.findIndex(s=>s.index>=Math.max(0,sourceStart));
  queue=excerpt?.segments|| (ranged&&sourceStart>=0?sources.filter(s=>s.index>=sourceStart&&s.index<=Math.max(sourceStart,end)):sources);
  if(!excerpt&&mode!=='one'){if(!ranged&&mode!=='chapter')queue=queue.slice(Math.max(0,requested));queue=withNarrationContext(queue);}
  // A tutor may request just one proof equation. Keep the surrounding proof
  // as explanatory context without adding those steps to the playback queue.
  if(explicit)queue=queue.map(s=>s.supplement?visibleSegment(s):s);
  if(!queue.length){notice='There is no readable text in that range. Choose a visible lesson passage.';return false;}
  queuePage=page.id;queueCursor=0;onceOnly=mode==='one';readingMode=excerpt?'selection':onceOnly?'standalone':'flow';
  readingTitle=page.title;readingPage=page.id;readingCount=queue.length;
  handToNarrator({afterSpeech:fromTool});
  // Playback never expands the companion. Keep the reader's chosen layout.
  if(open&&!fromTool)tab='listen';startQueue();return true;
 }
 function updateWords(){
  if(!packet||!audio)return;
  const element=page.id===queuePage?document.getElementById(queue[queueCursor]?.id):null;
  if(element!==wordElement){wordHighlighter?.clear();wordElement=element;wordHighlighter=sourceHighlighter(element,packet.words,queue[queueCursor]?.kind,queue[queueCursor]?.selectionRange);wordHighlighter.show(spokenWord);}
  const next=wordAt(packet.words,audio.currentTime);
  if(next!==spokenWord){spokenWord=next;liveTokens=captionTokens(packet.text,packet.words,next);wordHighlighter?.show(next);}
  progress=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration:0;
  if(!audio.paused&&Date.now()-lastHistoryWrite>1000){remember();lastHistoryWrite=Date.now()}
  wordFrame=requestAnimationFrame(updateWords);
 }
 async function playBlob(clip,token){
  if(token!==run)return;
  clearWords();packet=clip;spokenWord=-1;liveTokens=captionTokens(clip.text,clip.words,0);
  wordElement=page.id===queuePage?document.getElementById(queue[queueCursor].id):null;wordHighlighter=sourceHighlighter(wordElement,clip.words,queue[queueCursor].kind,queue[queueCursor].selectionRange);
  if(activeURL)URL.revokeObjectURL(activeURL);activeURL=URL.createObjectURL(clip.blob);audio.src=activeURL;audio.playbackRate=rate;updateWords();
  if(!clip.words.length)notice='This audio has no word timing from ElevenLabs; synchronized highlighting is unavailable.';
  await new Promise((resolve,reject)=>{
   const finish=()=>{audio.onended=null;audio.onerror=null;stopWait=()=>{};resolve()};stopWait=finish;
   audio.onended=finish;audio.onerror=()=>{audio.onended=null;audio.onerror=null;stopWait=()=>{};reject(Error('The audio could not play. Please retry this passage.'))};
   if(playback!=='paused'){playback='playing';audio.play().catch(()=>{if(token===run){playback='paused';error='Press play to allow audio in this browser.'}})}
  });
 }
 async function startQueue(){
  stop();const token=run;playController=new AbortController();const signal=playController.signal;const voiceSettings=$state.snapshot(settings);error='';playback='preparing';
  const prepare=async segment=>{const text=await narrationText(voiceSettings,segment,signal,{mode:readingMode});const parts=splitSpeech(text);const first=await narrationAudio(voiceSettings,parts[0],signal);return {text,parts,first}};
  let ahead;
  try{
   for(;queueCursor<queue.length;queueCursor++){
    if(token!==run)return;
    const segment=queue[queueCursor];readingIndex=queueCursor;currentScriptSegment=segment;readingHeading=segment.heading;
    if(playback!=='paused')playback='preparing';progress=0;audio.removeAttribute('src');audio.load();clearWords();packet=null;
    const ready=ahead?await ahead:await prepare(segment);if(ready.error)throw ready.error;if(token!==run)return;script=ready.text;
    ahead=!onceOnly&&queueCursor+1<queue.length?prepare(queue[queueCursor+1]).catch(error=>({error})):null;
    const hidden=document.querySelector(`.narration-script[data-for="${CSS.escape(segment.id)}"]`);if(page.id===queuePage&&hidden&&!segment.partial)hidden.textContent=script;
    if(page.id===queuePage){document.querySelectorAll('.narration-active,.assistant-focus').forEach(n=>n.classList.remove('narration-active','assistant-focus'));const el=document.getElementById(segment.id);el?.classList.add('narration-active');if(follow&&el){document.dispatchEvent(new CustomEvent('gr:reveal-location',{detail:{element:el}}));let p=el.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}el.scrollIntoView({behavior:'instant',block:'center'})}}
    for(const [partIndex,part] of ready.parts.entries()){const clip=partIndex===0?ready.first:await narrationAudio(voiceSettings,part,signal);if(token!==run)return;await playBlob(clip,token);if(token!==run)return;}
    remember(true);if(onceOnly)break;
   }
   if(token===run){finishNarration();notice='You’ve reached the end of this reading.';}
  }catch(e){if(token===run){audio?.pause();clearWords();playback='error';fail(e)}}
 }
 function skip(delta){if(!queue.length)return;remember();stop();queueCursor=Math.max(0,Math.min(queue.length-1,queueCursor+delta));handToNarrator();startQueue();}
 async function regenerate(){if(!currentScriptSegment||!requireKeys())return;pause();error='';try{script=await narrationText(settings,currentScriptSegment,undefined,{refresh:true,mode:readingMode});notice='Spoken explanation updated. Replay this passage to hear it.'}catch(e){fail(e)}}
 async function saveScript(){if(!currentScriptSegment)return;await saveCache(scriptKey(settings,currentScriptSegment,readingMode),script);notice='Your spoken explanation is saved on this device. Replay to hear it.';}
 async function prepareChapter(){
  if(!requireKeys())return;preparing=true;prepared=0;prepareController=new AbortController();error='';
  const segments=visibleSegments().filter(needsExplanation);prepareCount=segments.length;
  try{for(const s of segments){const text=await narrationText(settings,s,prepareController.signal);const hidden=document.querySelector(`.narration-script[data-for="${CSS.escape(s.id)}"]`);if(hidden)hidden.textContent=text;prepared++;}notice='Spoken explanations are ready for this chapter.'}catch(e){fail(e)}finally{preparing=false}
 }
 function courseContext(){const el=[...document.querySelectorAll('[data-lesson]')].find(el=>{const b=el.getBoundingClientRect();return b.bottom>100&&b.top<innerHeight*.7});let memory={};try{memory=JSON.parse(localStorage.getItem('gr-course-v1'))||{}}catch{}const id=el?.dataset.lesson,lesson=page.course?.lessons.find(l=>l.id===id);return {experiments:visibleExperiments(),skills:page.course?.skills||[],prerequisites:page.course?.requires||[],route:memory.route||'core',lesson:lesson?{...lesson,depth:el.querySelector('[role=tab][aria-selected=true]')?.dataset.depth,transferProblem:el.querySelector('[data-transfer-prompt]')?.innerText||'',transferItem:el.dataset.transferItem,evidence:memory.evidence?.[id]||null,visual:el.querySelector('[data-visual-state]')?.dataset.visualState||null,note:memory.notes?.[id]?.text?.slice(0,1200)||''}:null};}
 function readerFocus(preferReading=false){
  const playhead=active?{page:queuePage,passage:queue[queueCursor]?.id,heading:readingHeading,status:playback,word:spokenWord,seconds:audio?.currentTime||0,spoken:liveTokens.map(w=>w.text).join('')}:null;
  const id=(preferReading&&playhead?.page===page.id?playhead.passage:null)||selection?.start||(hovered?.page===page.id?hovered.id:null)||(playhead?.page===page.id?playhead.passage:null)||currentPassage();
  const segment=visibleSegment(page.segments.find(s=>s.id===id));
  const nearbySegments=segment?.supplement?readingNeighborhood(page.segments,id).map(resolveSegment):visibleSegments();
  return {interruptedReading,course:courseContext(),page:page.id,title:page.title,selection:selection?.text||'',passage:segment?{id:segment.id,kind:segment.kind,heading:segment.heading,text:segment.text,latex:segment.latex}:null,playhead,nearby:focusContext({...page,segments:nearbySegments},id),controls:[...document.querySelectorAll('#main input[type="range"]')].filter(el=>{const b=el.getBoundingClientRect();return b.height>0&&b.bottom>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))&&b.top<innerHeight}).map(el=>({label:el.getAttribute('aria-label')||el.id,value:el.value}))};
 }
 async function runTool(name,args,signal,request=''){
  if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
  if((name==='play_section'||name==='control_narration'&&args.action==='resume')&&navigationOnlyRequest(request))throw Error('This request is navigation only. Use show_chapter or show_passage. Narration was not started.');
  if(name==='get_reader_focus')await panelLayout;
  if(name==='get_reader_focus')return {...readerFocus(),listeningHistory:compactHistory(history,await catalog(),page.id)};
  if(name==='clear_highlight'){document.querySelectorAll('.assistant-focus').forEach(n=>n.classList.remove('assistant-focus'));return {cleared:true};}
  if(name==='control_narration'){
   if(!['pause','resume','stop'].includes(args.action))throw Error('Unknown playback action.');
   if(args.action==='resume'&&!active)throw Error('No paused reading. Use play_section to select a starting passage.');
   if(args.action==='resume')await resume({afterSpeech:true});else if(args.action==='pause')pause();else finishNarration();
   return {playback:args.action==='resume'?'started':playback,provider:'ElevenLabs'};
  }
  if(name==='get_book_outline'){const map=await bookMap();if(!args.page)return map.map(({outline,...p})=>p);const p=map.find(p=>p.id===args.page);if(!p)throw Error('Unknown chapter.');return {...p,listeningHistory:historyContext(history,(await catalog()).filter(t=>t.id===p.id))[0]};}
  const pages=await catalog();
  if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
  if(name==='search_book'){if(typeof args.query!=='string'||args.query.length>1000)throw Error('Use a short search query.');return rankPassages(pages,args.query)}
  if(name==='consult_text_tutor'){
   if(typeof args.question!=='string'||!args.question.trim()||args.question.length>3000)throw Error('Use one focused question.');
   toolActivity=`Consulting ${settings.model.replace('gpt-','GPT-')}…`;
   try{const sources=rankPassages(pages,args.question).slice(0,4);const answer=await complete(settings,[{role:'system',content:await context()+'\nYou are supplying the voice tutor with one concise answer. Use the supplied exact source and focus first; the retrieved candidates may be irrelevant. Explain the physical idea in at most 180 words unless a derivation was requested. Include relevant book links using exact supplied IDs. No tool calls.'},{role:'user',content:JSON.stringify({question:args.question,sources})}],{signal});return {model:settings.model,answer:answer.content,sources:sources.map(({page,passage,title})=>({page,passage,title}))};}finally{toolActivity='';}
  }
  if(name==='show_chapter'){const target=pages.find(p=>p.id===args.page);if(!target)throw Error('Unknown chapter. Use the book map for an exact ID.');await navigate(`${target.id}.html`,{signal});if(signal?.aborted)throw new DOMException('Cancelled','AbortError');return {shown:true,page:target.id,title:target.title,note:'Navigation only. Narration was not started.'};}
  if(!['read_passage','show_passage','play_section'].includes(name))throw Error('Unknown book action.');
  const target=pages.find(p=>p.id===args.page),index=target?.segments.findIndex(s=>s.id===args.passage);
  if(!target||index<0)throw Error('Unknown chapter or passage. Use the book map for an exact ID first.');
  if(name==='play_section'){
   if(!settings.openaiKey||!settings.elevenKey||!settings.voiceId)throw Error('Add OpenAI and ElevenLabs keys and a narrator voice in Connections.');
   let end=args.end;
   if(!end){if(target.segments[index].noNarration)end=args.passage;else{const map=(await bookMap()).find(p=>p.id===target.id);end=map.outline.filter(s=>s.start<=index&&s.end>=index).at(-1)?.endPassage||target.segments.at(-1).id;}}
   const endIndex=target.segments.findIndex(s=>s.id===end);if(endIndex<index)throw Error('The end must be an existing passage at or after the start.');
   await navigate(`${target.id}.html#${encodeURIComponent(args.passage)}`,{signal});await tick();if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
   const started=await listen('range',args.passage,end,{fromTool:true});if(!started)throw Error('That range has no readable text in the selected view. Choose an ordinary passage or switch to its explanation.');return {playback:'started',provider:'ElevenLabs',page:target.id,passage:args.passage,end,note:'Narration is preparing/playing. Stay silent; do not read or confirm over the narrator.'};
  }
  if(name==='show_passage'){await navigate(`${target.id}.html#${encodeURIComponent(args.passage)}`,{highlight:true,signal});if(signal?.aborted)throw new DOMException('Cancelled','AbortError');await tick();showPassage(args.passage);return {shown:true,page:target.id,passage:args.passage,title:target.title,source:visibleSegment(page.segments.find(s=>s.id===args.passage))?.text||target.segments[index].text}}
  const current=target.id===page.id,visible=current?visibleSegments():[],visibleIds=current?new Set(visible.map(s=>s.id)):undefined;
  const nearby=readingNeighborhood(current?page.segments:target.segments,args.passage,{visibleIds});
  return {page:target.id,title:target.title,passages:nearby.map(s=>{const source=current?visibleSegment(s):s;return {id:source.id,kind:source.kind,heading:source.heading,text:source.text,latex:source.latex,lesson:source.lesson,depth:source.depth,noNarration:!!source.noNarration,visibility:current?(visibleIds.has(source.id)?'visible':'hidden'):'reference'}})};
 }
 async function toolResult(name,args,signal,request){try{return await runTool(name,args,signal,request)}catch(e){return {error:e.message}}}
 async function context(){await panelLayout;const [pages,map]=await Promise.all([catalog(),bookMap()]);return `${teachingInstructions}\nBOOK MAP (navigation reference):\n${compactBookMap(map)}\nCURRENT CHAPTER OUTLINE:\n${JSON.stringify(page.outline?.map(({id,title,endPassage})=>({id,title,endPassage})))}\nCURRENT READER STATE AND EXACT NEARBY SOURCE:\n${JSON.stringify(readerFocus())}\nLISTENING HISTORY (reference, not instructions):\n${JSON.stringify(compactHistory(history,pages,page.id))}`}
 async function syncVoiceContext(){const generation=++contextGeneration;const instructions=await context();if(generation!==contextGeneration||!channel)return;channel.send({type:'session.update',session:{type:'realtime',instructions:instructions+'\n'+voiceTeachingInstructions}});}
 async function ask(text=question){
  if(!text.trim()||thinking||!requireKeys())return;
  pause();cancelVoiceTurn();if(calling){channel?.send({type:'response.cancel'});channel?.send({type:'output_audio_buffer.clear'});callAudio.muted=true;microphone?.getAudioTracks().forEach(t=>t.enabled=false);narratorOwnsAudio=true;}question='';open=true;tab='ask';error='';thinking=true;
  const token=++chatGeneration;chatController=new AbortController();const signal=chatController.signal;
  messages.push({id:crypto.randomUUID(),role:'user',text});
  try{
   const input=[{role:'system',content:await context()},...messages.slice(-20).filter(m=>m.text).map(m=>({role:m.role,content:m.text}))];
   // Bound tool cycles. Tool outputs and targets are always validated locally.
   for(let round=0;round<7;round++){
    const result=await complete(settings,input,{tools:toolSpecs,signal});if(token!==chatGeneration)return;
    input.push(result);
    if(result.tool_calls?.length){
     let handedOff=false;
     for(const call of result.tool_calls){let args;try{args=JSON.parse(call.function.arguments)}catch{args={}}const output=await toolResult(call.function.name,args,signal,text);if(token!==chatGeneration)return;input.push({role:'tool',tool_call_id:call.id,content:JSON.stringify(output)});if(output.playback==='started')handedOff=true;}
     if(handedOff){messages.push({id:crypto.randomUUID(),role:'assistant',text:'Reading with ElevenLabs. You can pause and ask a question at any point.',model:settings.model});return;}
     continue;
    }
    const answer=result.content||'I could not form an answer. Try asking about one equation or passage.';
    messages.push({id:crypto.randomUUID(),role:'assistant',text:answer,model:settings.model});await tick();document.querySelector('.chat-transcript')?.scrollTo(0,document.querySelector('.chat-transcript').scrollHeight);return;
   }
   throw Error('The tutor needed too many steps. Try a more specific question.');
  }catch(e){fail(e)}finally{if(token===chatGeneration)thinking=false}
 }
 function cancelAnswer(){chatGeneration++;chatController?.abort();thinking=false;}
 async function explain(id){const s=visibleSegment(page.segments.find(s=>s.id===id));if(!s)return;selected={page:page.id,start:id,end:id,text:s.text,element:document.getElementById(id)};reveal('ask');question=`Explain this ${s.kind} step by step: ${s.heading}.`;await ask(question);}
 async function explainSelection(){if(!selection)return;reveal('ask');question='Explain the selected excerpt clearly, focusing on exactly what I selected.';await ask(question)}
 function endCall(){shortcutHeld=false;captureStarted=0;manualReady=false;pushToTalk=false;pendingCommits=[];callGeneration++;contextGeneration++;cancelVoiceTurn();narratorOwnsAudio=false;toolActivity='';callController?.abort();channel?.close();channel=null;microphone?.getTracks().forEach(t=>t.stop());microphone=null;if(callAudio){callAudio.pause();callAudio.srcObject=null;}callState='idle';muted=false;caption='';}
 function mute(){if(pushToTalk){enableHandsFree();return}if(narratorOwnsAudio){talkAboutReading();return}muted=!muted;microphone?.getAudioTracks().forEach(t=>t.enabled=!muted);}
 async function startCall({manual=false}={}){
  if(!requireKeys())return;if(!navigator.mediaDevices?.getUserMedia){error='Voice conversations need HTTPS and microphone access.';return}
  pause();cancelAnswer();const held=shortcutHeld;endCall();shortcutHeld=held;pushToTalk=manual;muted=manual;const generation=callGeneration;callController=new AbortController();callState='connecting';error='';voiceRequest='';voiceInputs.clear();manualItems.clear();
  try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
   if(generation!==callGeneration){stream.getTracks().forEach(t=>t.stop());return}microphone=stream;if(manual)stream.getAudioTracks().forEach(t=>t.enabled=false);
   const instructions=await context()+'\n'+voiceTeachingInstructions+'\nPrior conversation (reference transcript): '+JSON.stringify(messages.slice(-12).map(m=>({role:m.role,text:m.text.slice(0,5000)})));if(generation!==callGeneration)return;
   const secret=await mintRealtimeSecret(settings.openaiKey,{model:'gpt-realtime-2.1',voice:settings.realtimeVoice,effort:'low',instructions,tools:[...toolSpecs,textTutorTool]},callController.signal);
   if(generation!==callGeneration)return;
   const connection=await connectRealtime({secret,model:'gpt-realtime-2.1',microphone:stream,audio:callAudio,signal:callController.signal,onEvent:event=>handleEvent(event,generation).catch(e=>{if(generation===callGeneration)fail(e)}),onClosed:()=>{if(generation===callGeneration){endCall();error='The voice connection ended. You can reconnect.'}}});
   if(generation!==callGeneration){connection.close();return}channel=connection;callAudio.muted=false;callState='listening';
   channel.send({type:'session.update',session:{type:'realtime',audio:{input:{transcription:{model:'gpt-4o-mini-transcribe'},turn_detection:manual?null:{type:'server_vad',create_response:false,interrupt_response:true}}}}});
   callAudio.play().catch(()=>{error='Press “Hear assistant” to enable voice playback.'});
  }catch(e){if(generation===callGeneration){endCall();error=e?.name==='NotAllowedError'?'Microphone permission was denied. Allow it in your browser, or type your question.':e.message;}}
 }
 async function executeVoiceTools(calls,signal){
  const generation=callGeneration,request=voiceRequest;let handedOff=false;
  for(const call of calls){
   if(signal.aborted||generation!==callGeneration)return;
   let args;try{args=JSON.parse(call.arguments)}catch{args={}}
   const result=await toolResult(call.name,args,signal,request);
   if(signal.aborted||generation!==callGeneration)return;
   if(result.playback==='started')handedOff=true;
   channel?.send({type:'conversation.item.create',item:{type:'function_call_output',call_id:call.call_id,output:JSON.stringify(result)}});
  }
  if(!handedOff&&!signal.aborted)requestVoiceResponse();
 }
 async function handleEvent(event,generation){
  if(generation!==callGeneration)return;
  if(event.type==='session.updated'&&pushToTalk&&event.session?.audio?.input?.turn_detection===null){manualReady=true;beginManualCapture();}
  if(event.type==='input_audio_buffer.committed'&&pendingCommits.length){voiceInputs.set(event.item_id,pendingCommits.shift().turn);manualItems.add(event.item_id);}
  if(event.type==='input_audio_buffer.speech_started'){
   if(narratorOwnsAudio||pushToTalk)return;pause();cancelVoiceTurn();if(event.item_id)voiceInputs.set(event.item_id,voiceTurn);callState='listening';caption='';
  }
  if(event.type==='conversation.item.input_audio_transcription.completed'){
   if(narratorOwnsAudio)return;
   if(pushToTalk&&!manualItems.has(event.item_id))return;
   if(voiceInputs.has(event.item_id)&&voiceInputs.get(event.item_id)!==voiceTurn)return;
   if(!event.transcript?.trim()){callState='listening';return;}
   voiceRequest=event.transcript;messages.push({id:event.item_id||crypto.randomUUID(),role:'user',text:event.transcript});
   const turn=voiceTurn;callState='thinking';await syncVoiceContext();
   if(generation===callGeneration&&turn===voiceTurn&&!narratorOwnsAudio)requestVoiceResponse();
  }
  if(!voiceTools.accepts(event))return;
  voiceTools.handle(event);
  if(event.type==='output_audio_buffer.started'&&!narratorOwnsAudio)callState='speaking';
  if(event.type==='response.output_audio_transcript.delta'||event.type==='response.output_text.delta'){
   if(narratorOwnsAudio)return;const id=event.item_id||event.response_id;let entry=messages.find(m=>m.id===id);
   if(!entry){messages.push({id,role:'assistant',text:'',model:'GPT Realtime 2.1'});entry=messages.at(-1)}entry.text+=event.delta||'';caption=entry.text;
   await tick();document.querySelector('.chat-transcript')?.scrollTo(0,document.querySelector('.chat-transcript').scrollHeight);
  }
  if(event.type==='output_audio_buffer.stopped'||event.type==='output_audio_buffer.cleared')callState='listening';
  if(event.type==='response.done'){
   if(event.response?.status==='failed'){error='The voice response failed. Please try again.';callState='listening';}
   else if(callState!=='speaking')callState='listening';
  }
  if(event.type==='conversation.item.input_audio_transcription.failed'&&voiceInputs.get(event.item_id)===voiceTurn){callState='listening';error='The question could not be transcribed. Hold to try again, or type it.';}
  if(event.type==='error'&&/input_audio_buffer_commit_empty/.test(event.error?.code||'')){
   pendingCommits=pendingCommits.filter(item=>item.event_id!==event.error?.event_id);if(callState==='thinking')callState='listening';
  }
  if(event.type==='error'&&!/cancel|empty/.test(event.error?.code||''))error='The voice assistant encountered an error. Retry or reconnect.';
 }
 onMount(()=>{
  audio=new Audio();callAudio=new Audio();callAudio.autoplay=true;
  audio.ontimeupdate=()=>{progress=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration:0};
  const action=e=>{const button=e.target.closest('[data-study-action]');if(!button)return;e.preventDefault();e.stopPropagation();const what=button.dataset.studyAction,id=button.dataset.readTarget;if(what==='explain')explain(id);else if(what==='listen')listen('one',id);else if(what==='chapter')listen('chapter');else reveal('ask')};
  let selectionFrame=0,selecting=false,touchSelection=false;
  const select=()=>{
   cancelAnimationFrame(selectionFrame);selectionFrame=0;
   if(selecting||selectionPinned)return;
   if(document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')){clearSelection();return}
   const native=getSelection();
   if(!native||native.isCollapsed||!native.rangeCount){clearSelection();return}
   const range=native.getRangeAt(0),excerpt=readingSelection(page,range);
   const anchor=excerpt&&selectionPosition(range,{touch:touchSelection});
   if(anchor&&!selection?.anchor)document.dispatchEvent(new CustomEvent('gr:context-open',{detail:{kind:'selection'}}));
   selected=anchor?{...excerpt,anchor}:null;
  };
  const scheduleSelection=()=>{cancelAnimationFrame(selectionFrame);selectionFrame=requestAnimationFrame(select)};
  const point=e=>{
   if(e.target.closest('.selection-study')){if(e.pointerType==='mouse')e.preventDefault();return}
   if(!e.target.closest('.study-panel'))clearSelection();
   selecting=!!e.target.closest('#main')&&!e.target.closest('button,input,textarea,select,.math-symbol-button');touchSelection=e.pointerType==='touch';
   const el=e.target.closest('#main [data-passage]');if(el&&e.pointerType!=='touch')hovered={page:page.id,id:el.id};
  };
  const release=e=>{const wasSelecting=selecting;selecting=false;if(wasSelecting&&!e.target.closest('.selection-study,.study-panel'))scheduleSelection()};
  const dismiss=()=>{cancelAnimationFrame(selectionFrame);if(!selectionPinned)clearSelection()};
  const contextOpen=e=>{if(e.detail?.kind==='symbol')dismiss()};
  const save=()=>remember();
  const key=e=>{
   if(shortcutHeld&&e.repeat&&e.code===shortcut?.code){e.preventDefault();return;}
   if(recordingShortcut){e.preventDefault();if(e.key==='Escape'){recordingShortcut=false;shortcutCandidate=null;}else shortcutCandidate=shortcutFromEvent(e);return;}
   if(matchesShortcut(e,shortcut)&&!e.target.closest('input,textarea,select,[contenteditable=true]')){e.preventDefault();holdToTalk().catch(e=>{releaseToTalk({discard:true});fail(e)});return;}
   if(e.key==='Escape'){
    releaseToTalk({discard:true});
    if(selection){e.preventDefault();clearSelection();getSelection()?.removeAllRanges()}
    if(open){closeStudy();document.querySelector('.study-launcher button')?.focus()}
   }
  };
  const keyup=e=>{if(recordingShortcut){e.preventDefault();if(shortcutCandidate)setShortcut(shortcutCandidate);return;}if(shortcutHeld&&releasesShortcut(e,shortcut)){e.preventDefault();releaseToTalk();}};
  const blur=()=>releaseToTalk({discard:true});
  const visibility=()=>{if(document.hidden)blur();};
  document.addEventListener('keyup',keyup);window.addEventListener('blur',blur);document.addEventListener('visibilitychange',visibility);
  document.addEventListener('pointerdown',point,true);document.addEventListener('pointerup',release);document.addEventListener('pointercancel',release);
  document.addEventListener('selectionchange',scheduleSelection);document.addEventListener('scroll',dismiss,true);window.addEventListener('resize',dismiss);
  window.visualViewport?.addEventListener('resize',dismiss);window.visualViewport?.addEventListener('scroll',dismiss);
  document.addEventListener('gr:context-open',contextOpen);window.addEventListener('pagehide',save);document.addEventListener('click',action);document.addEventListener('keydown',key);
  return ()=>{document.removeEventListener('keyup',keyup);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',visibility);stop();endCall();cancelAnswer();prepareController?.abort();cancelAnimationFrame(selectionFrame);
   document.removeEventListener('pointerdown',point,true);document.removeEventListener('pointerup',release);document.removeEventListener('pointercancel',release);
   document.removeEventListener('selectionchange',scheduleSelection);document.removeEventListener('scroll',dismiss,true);window.removeEventListener('resize',dismiss);
   window.visualViewport?.removeEventListener('resize',dismiss);window.visualViewport?.removeEventListener('scroll',dismiss);
   document.removeEventListener('gr:context-open',contextOpen);window.removeEventListener('pagehide',save);document.removeEventListener('click',action);document.removeEventListener('keydown',key)};
 });
</script>

<div class="study-launcher" aria-label="Study tools">
 <button aria-label="Listen" title="Listen to the book" onclick={()=>reveal('listen')} aria-expanded={open&&tab==='listen'} aria-controls="study-panel"><Icon name="headphones"/><span class="study-launcher-label">Listen</span></button>
 <button aria-label="Ask" title={shortcut?`Ask the tutor · Hold ${shortcutText} to talk`:'Ask the tutor'} onclick={()=>{if(active)pause();reveal('ask')}} aria-expanded={open&&tab==='ask'} aria-controls="study-panel"><Icon name="chat"/><span class="study-launcher-label">Ask</span>{#if calling}<span class="live-dot"></span>{/if}</button>
</div>
{#if selection?.anchor&&!open}
 <div class="selection-study" role="group" aria-label="Selected text actions" data-placement={selection.anchor.placement} style:left={`${selection.anchor.left}px`} style:top={`${selection.anchor.top}px`}>
  <button aria-label="Listen to selected text" title="Listen to selection" onclick={()=>listen('selection')}><Icon name="headphones" size={18}/></button>
  <button aria-label="Explain selected text" title="Explain selection" onclick={explainSelection}><Icon name="chat" size={18}/></button>
 </div>
{/if}
{#if active||calling||(!open&&error)}
 <div class="companion-dock listening-dock" data-playback={playback}>
  {#if error&&!open}<div class="dock-notice" role="alert"><span>{error}</span><button onclick={()=>{open=true;tab=active?'listen':'ask'}}>Details</button><button aria-label="Dismiss error" onclick={()=>error=''}><Icon name="close" size={16}/></button></div>{/if}
  {#if captionsOpen&&!(open&&tab==='ask'&&!active)}
   {#if active&&liveTokens.length}<div class="listening-caption" aria-label="Spoken words"><span class="caption-location">{readingHeading}</span><p>{#each liveTokens as word (word.index)}<span class:spoken-current={word.index===spokenWord}>{word.text}</span>{/each}</p></div>
   {:else if calling&&caption}<div class="listening-caption" aria-label="Assistant transcript"><span class="caption-location">VOICE COMPANION</span><p>{caption}</p></div>{/if}
  {/if}
  {#if active}
   <div class="listening-bar" aria-label="Narration player">
    <button aria-label="Previous passage" title="Previous passage" onclick={()=>skip(-1)}><Icon name="previous"/></button>
    <button class="player-primary" aria-label={(playback==='paused'||playback==='error')?'Resume narration':'Pause narration'} onclick={toggle}><Icon name={(playback==='paused'||playback==='error')?'play':'pause'}/></button>
    <button aria-label="Next passage" title="Next passage" onclick={()=>skip(1)}><Icon name="next"/></button>
    <button class="player-title" aria-label="Open narration controls" title="Open narration controls" onclick={()=>reveal('listen')}><span>{busy?'Preparing your reading…':playback==='paused'?'Reading paused':readingHeading||readingTitle}</span><small>Passage {readingIndex+1} of {readingCount} · ElevenLabs</small></button>
    <button aria-label="Show captions" title={open&&tab==='listen'?'Captions are shown in the narration panel':'Show captions'} disabled={open&&tab==='listen'} aria-pressed={captionsOpen} onclick={()=>captionsOpen=!captionsOpen}><Icon name="captions"/></button>
    <button aria-label="Ask about this reading" title="Pause and ask about this reading" onclick={talkAboutReading}><Icon name="mic"/></button>
    <button aria-label="Stop narration" title="Stop narration" onclick={finishNarration}><Icon name="stop"/></button>
    <div class="audio-progress" style={`--audio-progress:${progress*100}%`}></div>
   </div>
   {#if calling}<div class="dock-call-status"><span><span class="live-dot" class:mic-paused={muted||narratorOwnsAudio}></span>{voiceStatus}</span><div>{#if !narratorOwnsAudio&&callState!=='connecting'}<button onclick={mute}>{muted?'Unmute microphone':'Mute microphone'}</button>{/if}<button onclick={endCall}>End voice call</button></div></div>{/if}
  {:else if calling}
   <div class="listening-bar voice-bar" aria-label="Voice conversation">
    <button class="player-primary" disabled={callState==='connecting'} aria-label={muted||narratorOwnsAudio?'Unmute microphone':'Mute microphone'} title={muted||narratorOwnsAudio?'Unmute microphone':'Mute microphone'} onclick={mute}><Icon name={muted||narratorOwnsAudio?'micOff':'mic'}/></button>
    <button class="player-title" aria-label="Open voice conversation" title="Open voice conversation" onclick={()=>reveal('ask')}><span>{voiceStatus}</span><small>{pushToTalk?shortcutText:'Voice companion · '+(page.id.startsWith('chapter-')?page.id.replace('chapter-','Chapter '):'This page')}</small></button>
    <button aria-label="Show captions" title={open&&tab==='ask'?'The transcript is open in the conversation panel':'Show captions'} disabled={open&&tab==='ask'} aria-pressed={captionsOpen} onclick={()=>captionsOpen=!captionsOpen}><Icon name="captions"/></button>
    <button class="end-call" aria-label="End voice call" title="End voice call" onclick={endCall}><Icon name="hangup"/></button>
   </div>
  {/if}
 </div>
{/if}
{#if open}
 <section class="study-panel" id="study-panel" aria-label="Study companion" tabindex="-1">
  <header class="study-heading"><div><span class="study-eyebrow">GENERAL RELATIVITY</span><h2>Study companion</h2></div>{#if active||calling}<button class="study-minimize" onclick={closeStudy} aria-label="Minimize study companion" title="Keep audio going in the compact player"><Icon name="minimize" size={17}/>Minimize</button>{:else}<button class="study-icon" onclick={closeStudy} aria-label="Close study panel"><Icon name="close"/></button>{/if}</header>
  <div class="study-tabs" role="tablist" aria-label="Study mode">
   <button role="tab" aria-selected={tab==='listen'} onclick={()=>tab='listen'} id="listen-tab" aria-controls="listen-content"><Icon name="headphones" size={17}/>Listen</button>
   <button role="tab" aria-selected={tab==='ask'} onclick={()=>tab='ask'} id="ask-tab" aria-controls="ask-content"><Icon name="chat" size={17}/>Ask</button>
   <button role="tab" aria-selected={tab==='settings'} onclick={()=>tab='settings'} id="settings-tab" aria-controls="settings-content"><Icon name="settings" size={17}/><span>Connections</span></button>
  </div>
  {#if error}<div class="study-error" role="alert">{error}<button aria-label="Dismiss error" onclick={()=>error=''}>×</button></div>{/if}
  {#if notice}<p class="study-notice" role="status">{notice}</p>{/if}
  {#if tab==='settings'}
   <div class="study-content" id="settings-content" role="tabpanel" aria-labelledby="settings-tab">
    <p class="study-intro">Your keys connect directly to OpenAI and ElevenLabs. Audio and explanations use your provider accounts.</p>
    <label>OpenAI API key<input type="password" bind:value={settings.openaiKey} autocomplete="off" spellcheck="false" placeholder="sk-…"/></label>
    <label>Text tutor & spoken explanations<select bind:value={settings.model}><option value="gpt-5.6-terra">GPT-5.6 Terra</option><option value="gpt-5.6-sol">GPT-5.6 Sol</option></select></label>
    <p class="field-note">GPT Realtime 2.1 handles conversation and navigation; your selected text model works through physics questions. ElevenLabs reads the book.</p>
    <div class="shortcut-setting"><span class="study-eyebrow">HOLD TO ASK</span><p class="field-note">Hold your shortcut to pause the book and ask about that moment. Release to send. The microphone closes between questions.</p><button class="study-secondary" aria-label="Change voice shortcut" onblur={()=>{recordingShortcut=false;shortcutCandidate=null}} onclick={()=>{releaseToTalk({discard:true});recordingShortcut=true;shortcutCandidate=null}}>{recordingShortcut?'Press a combination, then release…':shortcutText}</button><div class="study-actions"><button onclick={()=>setShortcut(defaultShortcut())}>Reset shortcut</button><button onclick={()=>setShortcut(shortcut?false:defaultShortcut())}>{shortcut?'Disable':'Enable'} shortcut</button></div><p class="field-note">Works while this book has keyboard focus. Your browser or operating system may reserve some combinations.</p></div>
    <label>Assistant voice<select bind:value={settings.realtimeVoice}><option value="marin">Marin</option><option value="cedar">Cedar</option><option value="coral">Coral</option><option value="sage">Sage</option></select></label>
    <label>ElevenLabs API key<input type="password" bind:value={settings.elevenKey} autocomplete="off" spellcheck="false" placeholder="Your ElevenLabs key"/></label>
    <div class="voice-choice"><label>Narrator voice ID<input bind:value={settings.voiceId} spellcheck="false"/></label><button class="study-secondary" onclick={loadVoices} disabled={loadingVoices}>{loadingVoices?'Loading…':'Find voices'}</button></div>
    {#if voiceList.length}<label>Your available voices<select bind:value={settings.voiceId}>{#each voiceList as voice (voice.voice_id)}<option value={voice.voice_id}>{voice.name}</option>{/each}</select></label>{/if}
    <label>Speech model<select bind:value={settings.ttsModel}><option value="eleven_flash_v2_5">Eleven Flash v2.5 · Fast</option><option value="eleven_multilingual_v2">Eleven Multilingual v2</option><option value="eleven_v3">Eleven v3</option></select></label>
    <label class="study-check"><input type="checkbox" bind:checked={settings.remember}/>Remember keys on this device</label>
    <p class="field-note">Otherwise keys last for this browser tab. Remembered keys are stored unencrypted in this browser. Use a personal device.</p>
    <button class="study-primary" onclick={persist}>Save connections</button>
    <div class="study-actions"><button onclick={forget}>Forget keys</button><button onclick={async()=>{await clearCache();notice='Saved narration and audio cleared.'}}>Clear audio & scripts</button></div>
   </div>
  {:else if tab==='listen'}
   <div class="study-content" id="listen-content" role="tabpanel" aria-labelledby="listen-tab">
    <span class="study-eyebrow">{page.id.startsWith('chapter-')?page.id.replace('-',' '):'READING'}</span><h3>{page.title}</h3>
    <p class="study-intro">Listen to the ideas, including what the equations and pictures mean.</p>
    <button class="study-primary" onclick={()=>listen('chapter')}><Icon name="play"/>Listen to this chapter</button>
    <div class="study-actions"><button onclick={()=>listen('current')}>Start where I’m reading</button>{#if selection}<button onclick={()=>listen('selection')}>Read selected text</button>{/if}</div>
    <div class="reading-preferences"><label>Speed<select bind:value={rate} onchange={()=>{if(audio)audio.playbackRate=rate}}>{#each [.75,1,1.15,1.3,1.5,1.75,2] as speed (speed)}<option value={speed}>{speed}×</option>{/each}</select></label><label class="study-check"><input type="checkbox" bind:checked={follow}/>Follow the reading</label></div>
    {#if active}<div class="reading-now"><span class="study-eyebrow">{playback==='preparing'?'PREPARING':playback==='paused'?'PAUSED':'NOW READING'}</span><p>{readingHeading}</p>{#if liveTokens.length}<p class="panel-spoken-words" aria-label="Spoken words">{#each liveTokens as word (word.index)}<span class:spoken-current={word.index===spokenWord}>{word.text}</span>{/each}</p>{/if}<div class="study-actions"><button onclick={()=>{navigate(`${readingPage}.html#${queue[readingIndex]?.id}`).then(()=>showPassage(queue[readingIndex].id)).catch(fail)}}>Show passage</button><button onclick={()=>skip(0)}>Replay passage</button></div></div>{/if}
    {#if script}<button class="script-toggle" onclick={()=>scriptOpen=!scriptOpen} aria-expanded={scriptOpen}>{scriptOpen?'Hide':'Show'} spoken explanation</button>{#if scriptOpen}<p class="field-note">Last reading: {readingTitle}</p><label>Spoken explanation<textarea class="spoken-script" bind:value={script} rows="7"></textarea></label><div class="study-actions"><button onclick={saveScript}>Save wording</button><button onclick={regenerate}>Regenerate</button></div><p class="field-note">Generated explanations can make mistakes. Compare with the source equation; edit the wording if needed.</p>{/if}{/if}
    <details class="prepare-details"><summary>Prepare spoken explanations</summary><p class="field-note">Generate this chapter’s mathematical and visual explanations ahead of listening. This uses OpenAI; audio is generated by ElevenLabs when played. Completed passages are cached.</p>{#if preparing}<p role="status">Prepared {prepared} of {prepareCount}</p><button class="study-secondary" onclick={()=>prepareController?.abort()}>Stop preparing</button>{:else}<button class="study-secondary" onclick={prepareChapter}>Prepare this chapter</button>{/if}</details>
   </div>
  {:else}
   <div class="study-content study-chat" id="ask-content" role="tabpanel" aria-labelledby="ask-tab">
    {#if calling}<div class="voice-session connected"><div><span class="live-dot"></span><strong>{voiceStatus}</strong></div><div class="study-actions">{#if callState!=='connecting'}<button onclick={mute}>{narratorOwnsAudio?'Ask about reading':muted?'Unmute':'Mute'}</button><button onclick={()=>callAudio?.play().catch(fail)}>Hear assistant</button>{/if}<button onclick={endCall}>End call</button></div>
    </div>{/if}
    {#if shortcut}<p class="voice-shortcut-hint">Hold <button title="Customize your shortcut" onclick={()=>tab='settings'}>{shortcutText}</button> to ask. Release to send.</p>{/if}
    <div class="chat-transcript" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
     {#if !messages.length}<div class="chat-empty"><span class="study-eyebrow">A GOOD PLACE TO START</span><button onclick={()=>ask('Explain the passage I am looking at, starting with the physical idea.')}>What is this really saying?<Icon name="send" size={16}/></button><button onclick={()=>ask('What earlier idea do I need to understand this passage? Show me where it is introduced.')}>Help me connect the dots.<Icon name="send" size={16}/></button></div>{/if}
     {#each messages as message (message.id)}<div class={`chat-message ${message.role}`}><span>{message.role==='user'?'You':message.model||'Tutor'}</span><div><SafeHTML html={answerHTML(message.text,page.id.replace('chapter-',''))}/></div></div>{/each}
     {#if toolActivity}<p class="thinking" role="status">{toolActivity}</p>{/if}
     {#if thinking}<p class="thinking" role="status">Following the idea… <button onclick={cancelAnswer}>Stop</button></p>{/if}
    </div>
    <form class="question-form" onsubmit={e=>{e.preventDefault();ask()}}>
     {#if selection}<div class="composer-selection"><Icon name="book" size={15}/><span>Selected passage</span><button type="button" aria-label="Clear question context" title="Clear selected passage" onclick={clearSelection}><Icon name="close" size={14}/></button></div>{/if}
     <label class="sr-only" for="tutor-question">Ask a question</label>
     <textarea id="tutor-question" {@attach sizeComposer} bind:value={question} placeholder="Ask anything about this chapter" rows="1" onkeydown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();ask()}}}></textarea>
     <div class="composer-toolbar">
      <span class="composer-context" title={page.title}><Icon name="book" size={16}/>{page.id.startsWith('chapter-')?page.id.replace('chapter-','Chapter '):'This page'}</span>
      <div class="composer-actions">
       {#if messages.length}<button type="button" class="composer-utility" aria-label="Clear conversation" title="New conversation" onclick={()=>{cancelAnswer();endCall();messages=[]}}><Icon name="newChat" size={19}/></button>{/if}
       <button type="button" class="composer-utility" class:voice-active={calling} aria-label={calling?(narratorOwnsAudio?'Ask about reading':'End voice conversation'):'Talk about this page'} title={calling?(narratorOwnsAudio?'Ask about reading':'End voice conversation'):'Start voice conversation'} onclick={()=>calling?(narratorOwnsAudio?talkAboutReading():endCall()):startCall()}><Icon name="mic" size={20}/></button>
       {#if thinking}<button type="button" class="composer-send" aria-label="Stop answer" title="Stop answer" onclick={cancelAnswer}><Icon name="stop" size={18}/></button>{:else}<button type="submit" class="composer-send" aria-label="Send question" title="Send question" disabled={!question.trim()}><Icon name="up" size={20}/></button>{/if}
      </div>
     </div>
    </form>
   </div>
  {/if}
 </section>
{/if}
