const modifiers = ['Meta', 'Control', 'Alt', 'Shift'];
export function defaultShortcut(platform = globalThis.navigator?.platform || '') {
 return {code:'Space', meta:/Mac|iPhone|iPad/.test(platform), ctrl:!/Mac|iPhone|iPad/.test(platform), alt:false, shift:true};
}
export function shortcutFromEvent(event) {
 const value = {code:modifiers.includes(event.key)?null:event.code, meta:event.metaKey, ctrl:event.ctrlKey, alt:event.altKey, shift:event.shiftKey};
 if (!(value.meta || value.ctrl || value.alt)) return null;
 if (!value.code && [value.meta,value.ctrl,value.alt,value.shift].filter(Boolean).length<2) return null;
 return value;
}
export function matchesShortcut(event, shortcut) {
 return !!shortcut && !event.repeat && (!shortcut.code || event.code===shortcut.code)
  && ['meta','ctrl','alt','shift'].every(key=>!!event[`${key}Key`]===!!shortcut[key]);
}
export function releasesShortcut(event, shortcut) {
 return event.code===shortcut.code || ['meta','ctrl','alt','shift'].some(key=>shortcut[key]&&!event[`${key}Key`]);
}
export function shortcutLabel(shortcut) {
 const key=shortcut.code?.replace(/^Key|^Digit/,'').replace('Space','Space')||'';
 return [shortcut.meta&&'⌘',shortcut.ctrl&&'Ctrl',shortcut.alt&&'Alt',shortcut.shift&&'Shift',key].filter(Boolean).join(' + ');
}
export function loadShortcut() {
 try { const value=JSON.parse(localStorage.getItem('gr-voice-shortcut')); if(value===false)return false; if(value&&typeof value==='object'&&(value.meta||value.ctrl||value.alt))return value; } catch { /* Use the default. */ }
 return defaultShortcut();
}
export function saveShortcut(value) { try { localStorage.setItem('gr-voice-shortcut',JSON.stringify(value)); } catch { /* Available for this page. */ } }
