import type { Settings } from './types';

export const defaults: Settings = {
  openaiKey: '',
  elevenKey: '',
  model: 'gpt-5.6-terra',
  realtimeModel: 'gpt-realtime-2.1',
  realtimeVoice: 'marin',
  voiceId: 'JBFqnCBsd6RMkjVDRZzb',
  voiceName: 'George',
  ttsModel: 'eleven_flash_v2_5',
  remember: false
};
export function readLocal<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeLocal(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function loadSettings(): Settings {
  try {
    const saved = JSON.parse(
      localStorage.getItem('gr-study-settings') ||
        sessionStorage.getItem('gr-study-settings') ||
        '{}'
    );
    const result = { ...defaults };
    for (const key of Object.keys(defaults) as (keyof Settings)[]) {
      if (typeof saved[key] === typeof defaults[key]) Object.assign(result, { [key]: saved[key] });
    }
    return result;
  } catch {
    return { ...defaults };
  }
}
export function saveSettings(settings: Settings): boolean {
  try {
    const target = settings.remember ? localStorage : sessionStorage;
    target.setItem('gr-study-settings', JSON.stringify(settings));
    (settings.remember ? sessionStorage : localStorage).removeItem('gr-study-settings');
    return true;
  } catch {
    return false;
  }
}
export function forgetSettings() {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      storage.removeItem('gr-study-settings');
    } catch {
      /* Browser storage may be disabled. */
    }
  }
}
let database: Promise<IDBDatabase> | undefined;
function db() {
  database ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('gr-study', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('cache', { keyPath: 'key' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      database = undefined;
      reject(request.error);
    };
  });
  return database;
}
export async function cached<T>(key: string): Promise<T | undefined> {
  try {
    const store = (await db()).transaction('cache').objectStore('cache');
    return await new Promise((resolve) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}
export async function cache(key: string, value: unknown) {
  try {
    const database = await db();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction('cache', 'readwrite');
      transaction.objectStore('cache').put({ key, value, time: Date.now() });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    const transaction = database.transaction('cache', 'readwrite');
    const store = transaction.objectStore('cache');
    const request = store.getAll();
    request.onsuccess = () => {
      let bytes = 0;
      const entries = request.result as { key: string; time: number; value: { blob?: Blob } }[];
      entries
        .sort((a, b) => b.time - a.time)
        .forEach((entry, index) => {
          bytes += (entry.value?.blob?.size || 0) + JSON.stringify(entry.value).length * 2;
          if (index >= 300 || bytes > 80 * 1024 * 1024) store.delete(entry.key);
        });
    };
  } catch {
    /* Cache failure must never prevent reading. */
  }
}
export async function clearCache() {
  const database = await db();
  await new Promise<void>((resolve, reject) => {
    const tx = database.transaction('cache', 'readwrite');
    tx.objectStore('cache').clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
export async function hash(text: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(bytes), (value) => value.toString(16).padStart(2, '0')).join('');
}
