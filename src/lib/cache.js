let dbPromise;
function database(){
 if(!globalThis.indexedDB)return Promise.reject(Error('Local cache unavailable'));
 dbPromise ||= new Promise((resolve,reject)=>{const req=indexedDB.open('gr-study',1);req.onupgradeneeded=()=>req.result.createObjectStore('cache',{keyPath:'key'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
 return dbPromise;
}
export async function cached(key){try{const db=await database();return await new Promise(resolve=>{const r=db.transaction('cache').objectStore('cache').get(key);r.onsuccess=()=>resolve(r.result?.value);r.onerror=()=>resolve(undefined)})}catch{return undefined}}
export async function saveCache(key,value){try{const db=await database();await new Promise((resolve,reject)=>{const tx=db.transaction('cache','readwrite');tx.objectStore('cache').put({key,value,time:Date.now()});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});await prune(db)}catch{/* Private browsing or quota: playback still works without a cache. */}}
async function prune(db){return new Promise(resolve=>{const tx=db.transaction('cache','readwrite'),s=tx.objectStore('cache'),r=s.getAll();r.onsuccess=()=>{const entries=r.result.sort((a,b)=>b.time-a.time);let bytes=0;entries.forEach((e,i)=>{bytes+=e.value instanceof Blob?e.value.size:(e.value?.blob?.size||0)+JSON.stringify(e.value).length*2;if(i>300||bytes>80*1024*1024)s.delete(e.key)})};tx.oncomplete=resolve;tx.onerror=resolve})}
export async function clearCache(){try{const db=await database();await new Promise(resolve=>{const tx=db.transaction('cache','readwrite');tx.objectStore('cache').clear();tx.oncomplete=resolve;tx.onerror=resolve})}catch{}}
export const defaults={openaiKey:'',elevenKey:'',model:'gpt-5.6-terra',voiceId:'JBFqnCBsd6RMkjVDRZzb',voiceName:'George',ttsModel:'eleven_flash_v2_5',realtimeVoice:'marin',remember:false};
export function loadSettings(){try{const saved=JSON.parse(localStorage.getItem('gr-study-settings')||sessionStorage.getItem('gr-study-settings')||'{}');return {...defaults,...saved}}catch{return {...defaults}}}
export function saveSettings(settings){try{localStorage.removeItem('gr-study-settings');sessionStorage.removeItem('gr-study-settings');(settings.remember?localStorage:sessionStorage).setItem('gr-study-settings',JSON.stringify(settings));return true}catch{return false}}
export function forgetSettings(){for(const store of [localStorage,sessionStorage])try{store.removeItem('gr-study-settings')}catch{}}
