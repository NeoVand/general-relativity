import {alignedWords} from './speech.js';
// Adapted from Voicebook's cloud-llm.ts and elevenlabs.ts (MIT, see vendor/voicebook/LICENSE).
export async function providerRequest(url,key,body,{signal,eleven=false}={}){
 const timeout=AbortSignal.timeout(90000);
 let response;
 try{response=await fetch(url,{method:body?'POST':'GET',headers:{[eleven?'xi-api-key':'authorization']:eleven?key:`Bearer ${key}`,...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:signal?AbortSignal.any([signal,timeout]):timeout})}
 catch(e){if(signal?.aborted)throw new DOMException('Cancelled','AbortError');throw Error(timeout.aborted?'The provider took too long. Please retry.':'Could not reach the provider. Check your connection and browser permissions.')}
 if(!response.ok){
 const provider=eleven?'ElevenLabs':'OpenAI';
 if(response.status===401||response.status===403)throw Error(`${provider} rejected the key or its permissions. Check your connection settings.`);
 if(response.status===429)throw Error(`${provider} quota or rate limit reached. Check your account, then retry.`);
 if(response.status===404)throw Error(`${provider} could not find the selected model or voice for this account.`);
 throw Error(`${provider} request failed (${response.status}). Check the selected model, voice, and account access.`);
 }
 return response;
}
export async function complete(settings,messages,{tools,signal,narration=false}={}){
 if(!settings.openaiKey)throw Error('Add your OpenAI API key in Connections.');
 const body={model:settings.model,messages,reasoning_effort:narration?'none':'low',max_completion_tokens:narration?1600:5000,...(tools?.length?{tools:tools.map(({type,...f})=>({type:'function',function:f})),tool_choice:'auto'}:{})};
 const response=await providerRequest('https://api.openai.com/v1/chat/completions',settings.openaiKey,body,{signal});
 const data=await response.json();const message=data.choices?.[0]?.message;
 if(!message)throw Error('OpenAI returned no answer. Please retry.');
 if(data.choices[0].finish_reason==='length')throw Error('The explanation was cut short. Try a smaller passage.');
 return message;
}
export async function voices(settings,signal){
 if(!settings.elevenKey)throw Error('Add your ElevenLabs API key first.');
 const r=await providerRequest('https://api.elevenlabs.io/v1/voices',settings.elevenKey,null,{signal,eleven:true});
 return (await r.json()).voices||[];
}
export async function synthesize(settings,text,signal){
 if(!settings.elevenKey)throw Error('Add your ElevenLabs API key in Connections.');
 if(!settings.voiceId)throw Error('Choose an ElevenLabs voice in Connections.');
 const response=await providerRequest(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(settings.voiceId)}/with-timestamps?output_format=mp3_44100_128`,settings.elevenKey,{text,model_id:settings.ttsModel},{signal,eleven:true});
 const data=await response.json();if(!data.audio_base64)throw Error('ElevenLabs returned no audio.');
 const bytes=Uint8Array.from(atob(data.audio_base64),c=>c.charCodeAt(0));
 const alignment=data.alignment||data.normalized_alignment;
 return {blob:new Blob([bytes],{type:'audio/mpeg'}),words:alignedWords(alignment),text:alignment?.characters?.join('')||text};
}
