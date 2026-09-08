<script>
 import {onMount,tick} from 'svelte';
 import {SvelteSet} from 'svelte/reactivity';
 import SafeHTML from './SafeHTML.svelte';
 import Icon from './Icon.svelte';
 import {loadSettings,saveSettings,forgetSettings,defaults,clearCache,cached,saveCache} from './lib/cache.js';
 import {voices,complete} from './lib/providers.js';
 import {narrationText,narrationAudio,splitSpeech,needsExplanation} from './lib/narration.js';
 import {catalog,currentPassage,showPassage,rankPassages,toolSpecs,teachingInstructions} from './lib/book.js';
 import {mintRealtimeSecret,connectRealtime} from './lib/openai-realtime.ts';
 import {answerHTML} from './lib/format.js';
 let {page,navigate}=$props();
 let settings=$state(loadSettings());
 let open=$state(false),tab=$state('listen'),error=$state(''),notice=$state('');
 let voiceList=$state([]),loadingVoices=$state(false),selected=$state(null);
 let playback=$state('idle'),readingTitle=$state(''),readingPage=$state(''),readingIndex=$state(0),readingCount=$state(0),script=$state(''),progress=$state(0),rate=$state(1),follow=$state(true);
 let scriptOpen=$state(false),preparing=$state(false),prepared=$state(0),prepareCount=$state(0);
 let question=$state(''),messages=$state([]),thinking=$state(false),callState=$state('idle'),muted=$state(false),caption=$state('');
 let audio,callAudio,channel,microphone,playController,prepareController,chatController,callController;
 let run=0,callGeneration=0,chatGeneration=0,activeURL,queue=[],queuePage='',queueCursor=0,onceOnly=false,stopWait=()=>{},currentScriptSegment;
 let seenCalls=new SvelteSet();
 const selection=$derived(selected?.page===page.id?selected:null);
 const active=$derived(playback!=='idle');
 const calling=$derived(callState!=='idle');
 const busy=$derived(playback==='preparing');
 function sizeComposer(node){
  question;
  node.style.height='auto';
  node.style.height=`${Math.min(node.scrollHeight,160)}px`;
 }
 function fail(e){if(e?.name!=='AbortError')error=e?.message||'Something went wrong. Please retry.'}
 function reveal(nextTab){open=true;tab=nextTab;error='';notice='';tick().then(()=>document.querySelector('#study-panel')?.focus());}
 function persist(){notice=saveSettings($state.snapshot(settings))?'Connections saved.':'This browser cannot save connections; they remain available until you leave.';error='';}
 function forget(){stop();endCall();chatController?.abort();prepareController?.abort();forgetSettings();settings={...defaults};notice='API keys removed.';error='';}
 async function loadVoices(){loadingVoices=true;error='';try{voiceList=await voices(settings);if(voiceList.length&&!voiceList.some(v=>v.voice_id===settings.voiceId)){settings.voiceId=voiceList[0].voice_id;settings.voiceName=voiceList[0].name}}catch(e){fail(e)}finally{loadingVoices=false}}
 function requireKeys(narration=false){if(!settings.openaiKey||(narration&&!settings.elevenKey)){reveal('settings');notice=narration?'Add both API keys to listen with spoken mathematical explanations.':'Add an OpenAI API key to ask the tutor.';return false}return true}
 function stop(){run++;playController?.abort();stopWait();stopWait=()=>{};audio?.pause();if(audio){audio.removeAttribute('src');audio.load()}if(activeURL)URL.revokeObjectURL(activeURL);activeURL=null;playback='idle';progress=0;document.querySelectorAll('.narration-active').forEach(n=>n.classList.remove('narration-active'));}
 function pause(){if(playback==='idle')return;playback='paused';audio?.pause();}
 async function resume(){if(playback==='error'){await startQueue();return}if(!active){await listen('current');return}playback='playing';if(audio?.src)try{await audio.play()}catch{playback='paused';error='Press play once more to allow audio in this browser.'}}
 function toggle(){if(playback==='paused'||playback==='error')resume();else pause();}
 async function listen(mode='chapter',id){
  if(!requireKeys(true))return;
  if(calling)endCall();
  const requested=page.segments.findIndex(s=>s.id===(id||(mode==='selection'?selection?.start:currentPassage())));
  const end=mode==='selection'?page.segments.findIndex(s=>s.id===selection?.end):-1;
  queue=mode==='selection'&&requested>=0?page.segments.slice(requested,Math.max(requested,end)+1):page.segments;
  queuePage=page.id;queueCursor=mode==='chapter'||mode==='selection'?0:Math.max(0,requested);onceOnly=mode==='one';
  readingTitle=page.title;readingPage=page.id;readingCount=queue.length;
  open=true;tab='listen';await startQueue();
 }
 async function playBlob(blob,token){
  if(token!==run)return;
  if(activeURL)URL.revokeObjectURL(activeURL);activeURL=URL.createObjectURL(blob);audio.src=activeURL;audio.playbackRate=rate;
  await new Promise((resolve,reject)=>{
   const finish=()=>{audio.onended=null;audio.onerror=null;stopWait=()=>{};resolve()};stopWait=finish;
   audio.onended=finish;audio.onerror=()=>{audio.onended=null;audio.onerror=null;stopWait=()=>{};reject(Error('The audio could not play. Please retry this passage.'))};
   if(playback!=='paused'){playback='playing';audio.play().catch(()=>{playback='paused';error='Press play to allow audio in this browser.'})}
  });
 }
 async function startQueue(){
  stop();const token=run;playController=new AbortController();const signal=playController.signal;const voiceSettings=$state.snapshot(settings);error='';playback='preparing';
  const prepare=async segment=>{const text=await narrationText(voiceSettings,segment,signal);const parts=splitSpeech(text);const first=await narrationAudio(voiceSettings,parts[0],signal);return {text,parts,first}};
  let ahead;
  try{
   for(;queueCursor<queue.length;queueCursor++){
    if(token!==run)return;
    const segment=queue[queueCursor];readingIndex=queueCursor;currentScriptSegment=segment;
    if(playback!=='paused')playback='preparing';progress=0;audio.removeAttribute('src');audio.load();
    const ready=ahead?await ahead:await prepare(segment);if(ready.error)throw ready.error;if(token!==run)return;script=ready.text;
    ahead=!onceOnly&&queueCursor+1<queue.length?prepare(queue[queueCursor+1]).catch(error=>({error})):null;
    const hidden=document.querySelector(`.narration-script[data-for="${CSS.escape(segment.id)}"]`);if(page.id===queuePage&&hidden)hidden.textContent=script;
    if(page.id===queuePage){document.querySelectorAll('.narration-active').forEach(n=>n.classList.remove('narration-active'));const el=document.getElementById(segment.id);el?.classList.add('narration-active');if(follow&&el){let p=el.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}el.scrollIntoView({behavior:'smooth',block:'center'})}}
    for(const [partIndex,part] of ready.parts.entries()){const blob=partIndex===0?ready.first:await narrationAudio(voiceSettings,part,signal);if(token!==run)return;await playBlob(blob,token);if(token!==run)return;}
    if(onceOnly)break;
   }
   if(token===run){stop();notice='You’ve reached the end of this reading.';}
  }catch(e){if(token===run){audio?.pause();playback='error';fail(e)}}
 }
 function skip(delta){if(!queue.length)return;queueCursor=Math.max(0,Math.min(queue.length-1,queueCursor+delta));startQueue();}
 async function regenerate(){if(!currentScriptSegment||!requireKeys())return;pause();error='';try{script=await narrationText(settings,currentScriptSegment,undefined,{refresh:true});notice='Spoken explanation updated. Replay this passage to hear it.'}catch(e){fail(e)}}
 async function saveScript(){if(!currentScriptSegment)return;await saveCache(`script:v2:${settings.model}:${currentScriptSegment.hash}`,script);notice='Your spoken explanation is saved on this device. Replay to hear it.';}
 async function prepareChapter(){
  if(!requireKeys())return;preparing=true;prepared=0;prepareController=new AbortController();error='';
  const segments=page.segments.filter(needsExplanation);prepareCount=segments.length;
  try{for(const s of segments){const text=await narrationText(settings,s,prepareController.signal);const hidden=document.querySelector(`.narration-script[data-for="${CSS.escape(s.id)}"]`);if(hidden)hidden.textContent=text;prepared++;}notice='Spoken explanations are ready for this chapter.'}catch(e){fail(e)}finally{preparing=false}
 }
 async function runTool(name,args,signal){
  if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
  if(name==='get_reader_focus'){
   const id=selection?.start||currentPassage(),segment=page.segments.find(s=>s.id===id);
   return {page:page.id,title:page.title,selection:selection?.text||'',passage:segment,controls:[...document.querySelectorAll('#main input[type="range"]')].map(el=>({label:el.getAttribute('aria-label')||el.closest('label')?.textContent?.slice(0,150)||el.id,value:el.value}))};
  }
  const pages=await catalog();
  if(signal?.aborted)throw new DOMException('Cancelled','AbortError');
  if(name==='search_book'){if(typeof args.query!=='string'||args.query.length>1000)throw Error('Use a short search query.');return rankPassages(pages,args.query)}
  if(!['read_passage','show_passage'].includes(name))throw Error('Unknown book action.');
  const target=pages.find(p=>p.id===args.page),index=target?.segments.findIndex(s=>s.id===args.passage);
  if(!target||index<0)throw Error('Unknown chapter or passage. Search the book for an exact ID first.');
  if(name==='show_passage'){await navigate(`${target.id}.html#${encodeURIComponent(args.passage)}`,{highlight:true,signal});if(signal?.aborted)throw new DOMException('Cancelled','AbortError');await tick();showPassage(args.passage);return {shown:true,page:target.id,passage:args.passage,title:target.title,source:target.segments[index].text}}
  return {page:target.id,title:target.title,passages:target.segments.slice(Math.max(0,index-1),index+2)};
 }
 async function toolResult(name,args,signal){try{return await runTool(name,args,signal)}catch(e){return {error:e.message}}}
 async function context(){const pages=await catalog();return `${teachingInstructions}\nBook chapters: ${pages.map(p=>`${p.id}: ${p.title}`).join('; ')}\nCurrent reading state: ${JSON.stringify(await runTool('get_reader_focus',{}))}`}
 async function ask(text=question){
  if(!text.trim()||thinking||!requireKeys())return;
  pause();if(calling)endCall();question='';open=true;tab='ask';error='';thinking=true;
  const token=++chatGeneration;chatController=new AbortController();const signal=chatController.signal;
  messages.push({id:crypto.randomUUID(),role:'user',text});
  try{
   const input=[{role:'system',content:await context()},...messages.slice(-20).filter(m=>m.text).map(m=>({role:m.role,content:m.text}))];
   // Bound tool cycles. Tool outputs and targets are always validated locally.
   for(let round=0;round<7;round++){
    const result=await complete(settings,input,{tools:toolSpecs,signal});if(token!==chatGeneration)return;
    input.push(result);
    if(result.tool_calls?.length){
     for(const call of result.tool_calls){let args;try{args=JSON.parse(call.function.arguments)}catch{args={}}const output=await toolResult(call.function.name,args,signal);if(token!==chatGeneration)return;input.push({role:'tool',tool_call_id:call.id,content:JSON.stringify(output)});}
     continue;
    }
    const answer=result.content||'I could not form an answer. Try asking about one equation or passage.';
    messages.push({id:crypto.randomUUID(),role:'assistant',text:answer});await tick();document.querySelector('.chat-transcript')?.scrollTo(0,document.querySelector('.chat-transcript').scrollHeight);return;
   }
   throw Error('The tutor needed too many steps. Try a more specific question.');
  }catch(e){fail(e)}finally{if(token===chatGeneration)thinking=false}
 }
 function cancelAnswer(){chatGeneration++;chatController?.abort();thinking=false;}
 async function explain(id){const s=page.segments.find(s=>s.id===id);if(!s)return;selected={page:page.id,start:id,end:id,text:s.text};reveal('ask');question=`Explain this ${s.kind} step by step: ${s.heading}.`;await ask(question);}
 function endCall(){callGeneration++;callController?.abort();channel?.close();channel=null;microphone?.getTracks().forEach(t=>t.stop());microphone=null;if(callAudio){callAudio.pause();callAudio.srcObject=null;}callState='idle';muted=false;caption='';}
 function mute(){muted=!muted;microphone?.getAudioTracks().forEach(t=>t.enabled=!muted);}
 async function startCall(){
  if(!requireKeys())return;if(!navigator.mediaDevices?.getUserMedia){error='Voice conversations need HTTPS and microphone access.';return}
  pause();cancelAnswer();endCall();const generation=callGeneration;callController=new AbortController();callState='connecting';error='';seenCalls=new SvelteSet();
  try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
   if(generation!==callGeneration){stream.getTracks().forEach(t=>t.stop());return}microphone=stream;
   const instructions=await context()+'\nPrior conversation (reference transcript): '+JSON.stringify(messages.slice(-12).map(m=>({role:m.role,text:m.text.slice(0,5000)})));if(generation!==callGeneration)return;
   const secret=await mintRealtimeSecret(settings.openaiKey,{model:'gpt-realtime-2.1',voice:settings.realtimeVoice,effort:'low',instructions,tools:toolSpecs},callController.signal);
   if(generation!==callGeneration)return;
   const connection=await connectRealtime({secret,model:'gpt-realtime-2.1',microphone:stream,audio:callAudio,signal:callController.signal,onEvent:event=>handleEvent(event,generation),onClosed:()=>{if(generation===callGeneration){endCall();error='The voice connection ended. You can reconnect.'}}});
   if(generation!==callGeneration){connection.close();return}channel=connection;callState='listening';
   channel.send({type:'session.update',session:{type:'realtime',audio:{input:{transcription:{model:'gpt-4o-mini-transcribe'},turn_detection:{type:'server_vad',create_response:true,interrupt_response:true}}}}});
   callAudio.play().catch(()=>{error='Press “Hear assistant” to enable voice playback.'});
  }catch(e){if(generation===callGeneration){endCall();error=e?.name==='NotAllowedError'?'Microphone permission was denied. Allow it in your browser, or type your question.':e.message;}}
 }
 async function handleEvent(event,generation){
  if(generation!==callGeneration)return;
  if(event.type==='input_audio_buffer.speech_started'){callState='listening';caption='';}
  if(event.type==='conversation.item.input_audio_transcription.completed'&&event.transcript){messages.push({id:event.item_id||crypto.randomUUID(),role:'user',text:event.transcript});}
  if(event.type==='response.output_audio_transcript.delta'||event.type==='response.output_text.delta'){
   const id=event.item_id||event.response_id;let entry=messages.find(m=>m.id===id);
   if(!entry){messages.push({id,role:'assistant',text:''});entry=messages.at(-1)}entry.text+=event.delta||'';caption=entry.text;callState='speaking';
   await tick();document.querySelector('.chat-transcript')?.scrollTo(0,document.querySelector('.chat-transcript').scrollHeight);
  }
  if(event.type==='output_audio_buffer.stopped'||event.type==='output_audio_buffer.cleared')callState='listening';
  if(event.type==='response.done'){
   if(event.response?.status==='failed'){error='The voice response failed. Please try again.';callState='listening';return}
   const calls=(event.response?.output||[]).filter(item=>item.type==='function_call'&&!seenCalls.has(item.call_id));
   if(!calls.length)return;
   for(const call of calls){seenCalls.add(call.call_id);let args;try{args=JSON.parse(call.arguments)}catch{args={}}const result=await toolResult(call.name,args,callController?.signal);if(generation!==callGeneration)return;channel?.send({type:'conversation.item.create',item:{type:'function_call_output',call_id:call.call_id,output:JSON.stringify(result)}});}
   channel?.send({type:'response.create'});
  }
  if(event.type==='error'&&!/cancel|empty/.test(event.error?.code||''))error='The voice assistant encountered an error. Retry or reconnect.';
 }
 onMount(()=>{
  audio=new Audio();callAudio=new Audio();callAudio.autoplay=true;
  audio.ontimeupdate=()=>progress=Number.isFinite(audio.duration)&&audio.duration>0?audio.currentTime/audio.duration:0;
  const action=e=>{const button=e.target.closest('[data-study-action]');if(!button)return;e.preventDefault();e.stopPropagation();const what=button.dataset.studyAction,id=button.dataset.readTarget;if(what==='explain')explain(id);else if(what==='listen')listen('one',id);else if(what==='chapter')listen('chapter');else reveal('ask')};
  const select=()=>{const s=getSelection();if(!s?.toString().trim()||s.isCollapsed)return;const a=s.anchorNode?.parentElement?.closest('#main [data-passage]'),b=s.focusNode?.parentElement?.closest('#main [data-passage]');if(!a||!b)return;const start=Number(a.dataset.passage)<=Number(b.dataset.passage)?a:b,end=start===a?b:a;selected={page:page.id,start:start.id,end:end.id,text:s.toString().slice(0,6000)};};
  const key=e=>{if(e.key==='Escape'&&open){open=false;document.querySelector('.study-launcher button')?.focus()}};
  document.addEventListener('click',action);document.addEventListener('pointerup',select);document.addEventListener('keyup',select);document.addEventListener('keydown',key);
  return ()=>{stop();endCall();cancelAnswer();prepareController?.abort();document.removeEventListener('click',action);document.removeEventListener('pointerup',select);document.removeEventListener('keyup',select);document.removeEventListener('keydown',key)};
 });
</script>

<div class="study-launcher" aria-label="Study tools">
 <button onclick={()=>reveal('listen')} aria-expanded={open&&tab==='listen'} aria-controls="study-panel"><Icon name="headphones"/><span>Listen</span></button>
 <button onclick={()=>reveal('ask')} aria-expanded={open&&tab==='ask'} aria-controls="study-panel"><Icon name="chat"/><span>Ask</span>{#if calling}<span class="live-dot"></span>{/if}</button>
</div>
{#if selection&&!open}
 <div class="selection-study"><span>Selected passage</span><button onclick={()=>listen('selection')}>Listen</button><button onclick={()=>explain(selection.start)}>Explain</button><button aria-label="Clear selected passage" onclick={()=>selected=null}><Icon name="close" size={16}/></button></div>
{/if}
{#if active}
 <div class="listening-bar" aria-label="Narration player">
  <button aria-label="Previous passage" onclick={()=>skip(-1)}><Icon name="previous"/></button>
  <button class="player-primary" aria-label={(playback==='paused'||playback==='error')?'Resume narration':'Pause narration'} onclick={toggle}><Icon name={(playback==='paused'||playback==='error')?'play':'pause'}/></button>
  <button aria-label="Next passage" onclick={()=>skip(1)}><Icon name="next"/></button>
  <button class="player-title" onclick={()=>reveal('listen')}><span>{busy?'Preparing your reading…':readingTitle}</span><small>Passage {readingIndex+1} of {readingCount}</small></button>
  <button aria-label="Stop narration" onclick={stop}><Icon name="stop"/></button>
  <div class="audio-progress" style={`--audio-progress:${progress*100}%`}></div>
 </div>
{/if}
{#if open}
 <section class="study-panel" id="study-panel" aria-label="Study companion" tabindex="-1">
  <header class="study-heading"><div><span class="study-eyebrow">GENERAL RELATIVITY</span><h2>Study companion</h2></div><button class="study-icon" onclick={()=>open=false} aria-label="Close study panel"><Icon name="close"/></button></header>
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
    <p class="field-note">Voice conversations use GPT Realtime 2.1.</p>
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
    <div class="study-actions"><button onclick={()=>listen('current')}>Start where I’m reading</button>{#if selection}<button onclick={()=>listen('selection')}>Read selected passages</button>{/if}</div>
    <div class="reading-preferences"><label>Speed<select bind:value={rate} onchange={()=>{if(audio)audio.playbackRate=rate}}>{#each [.75,1,1.15,1.3,1.5,1.75,2] as speed (speed)}<option value={speed}>{speed}×</option>{/each}</select></label><label class="study-check"><input type="checkbox" bind:checked={follow}/>Follow the reading</label></div>
    {#if active}<div class="reading-now"><span class="study-eyebrow">{playback==='preparing'?'PREPARING':playback==='paused'?'PAUSED':'NOW READING'}</span><p>{readingTitle}</p><div class="study-actions"><button onclick={()=>{navigate(`${readingPage}.html#${queue[readingIndex]?.id}`).then(()=>showPassage(queue[readingIndex].id)).catch(fail)}}>Show passage</button><button onclick={()=>skip(0)}>Replay passage</button></div></div>{/if}
    {#if script}<button class="script-toggle" onclick={()=>scriptOpen=!scriptOpen} aria-expanded={scriptOpen}>{scriptOpen?'Hide':'Show'} spoken explanation</button>{#if scriptOpen}<p class="field-note">Last reading: {readingTitle}</p><label>Spoken explanation<textarea class="spoken-script" bind:value={script} rows="7"></textarea></label><div class="study-actions"><button onclick={saveScript}>Save wording</button><button onclick={regenerate}>Regenerate</button></div><p class="field-note">Generated explanations can make mistakes. Compare with the source equation; edit the wording if needed.</p>{/if}{/if}
    <details class="prepare-details"><summary>Prepare spoken explanations</summary><p class="field-note">Generate this chapter’s mathematical and visual explanations ahead of listening. This uses OpenAI; audio is generated by ElevenLabs when played. Completed passages are cached.</p>{#if preparing}<p role="status">Prepared {prepared} of {prepareCount}</p><button class="study-secondary" onclick={()=>prepareController?.abort()}>Stop preparing</button>{:else}<button class="study-secondary" onclick={prepareChapter}>Prepare this chapter</button>{/if}</details>
   </div>
  {:else}
   <div class="study-content study-chat" id="ask-content" role="tabpanel" aria-labelledby="ask-tab">
    {#if calling}<div class="voice-session connected"><div><span class="live-dot"></span><strong>{callState==='connecting'?'Connecting…':muted?'Microphone muted':callState==='speaking'?'Speaking':'Listening'}</strong></div><div class="study-actions">{#if callState!=='connecting'}<button onclick={mute}>{muted?'Unmute':'Mute'}</button><button onclick={()=>callAudio?.play().catch(fail)}>Hear assistant</button>{/if}<button onclick={endCall}>End call</button></div>
    </div>{/if}
    <div class="chat-transcript" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
     {#if !messages.length}<div class="chat-empty"><span class="study-eyebrow">A GOOD PLACE TO START</span><button onclick={()=>ask('Explain the passage I am looking at, starting with the physical idea.')}>What is this really saying?<Icon name="send" size={16}/></button><button onclick={()=>ask('What earlier idea do I need to understand this passage? Show me where it is introduced.')}>Help me connect the dots.<Icon name="send" size={16}/></button></div>{/if}
     {#each messages as message (message.id)}<div class={`chat-message ${message.role}`}><span>{message.role==='user'?'You':'Tutor'}</span><div><SafeHTML html={answerHTML(message.text,page.id.replace('chapter-',''))}/></div></div>{/each}
     {#if thinking}<p class="thinking" role="status">Following the idea… <button onclick={cancelAnswer}>Stop</button></p>{/if}
    </div>
    <form class="question-form" onsubmit={e=>{e.preventDefault();ask()}}>
     {#if selection}<div class="composer-selection"><Icon name="book" size={15}/><span>Selected passage</span><button type="button" aria-label="Clear question context" title="Clear selected passage" onclick={()=>selected=null}><Icon name="close" size={14}/></button></div>{/if}
     <label class="sr-only" for="tutor-question">Ask a question</label>
     <textarea id="tutor-question" {@attach sizeComposer} bind:value={question} placeholder="Ask anything about this chapter" rows="1" onkeydown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();ask()}}}></textarea>
     <div class="composer-toolbar">
      <span class="composer-context" title={page.title}><Icon name="book" size={16}/>{page.id.startsWith('chapter-')?page.id.replace('chapter-','Chapter '):'This page'}</span>
      <div class="composer-actions">
       {#if messages.length}<button type="button" class="composer-utility" aria-label="Clear conversation" title="New conversation" onclick={()=>{cancelAnswer();endCall();messages=[]}}><Icon name="newChat" size={19}/></button>{/if}
       <button type="button" class="composer-utility" class:voice-active={calling} aria-label={calling?'End voice conversation':'Talk about this page'} title={calling?'End voice conversation':'Start voice conversation'} onclick={()=>calling?endCall():startCall()}><Icon name="mic" size={20}/></button>
       {#if thinking}<button type="button" class="composer-send" aria-label="Stop answer" title="Stop answer" onclick={cancelAnswer}><Icon name="stop" size={18}/></button>{:else}<button type="submit" class="composer-send" aria-label="Send question" title="Send question" disabled={!question.trim()}><Icon name="up" size={20}/></button>{/if}
      </div>
     </div>
    </form>
   </div>
  {/if}
 </section>
{/if}
