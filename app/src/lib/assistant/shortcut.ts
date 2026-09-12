import { readLocal, writeLocal } from '../storage';
export interface Shortcut {
  code: string | null;
  meta: boolean;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
}
const modifiers = ['meta', 'ctrl', 'alt', 'shift'] as const;
export function defaultShortcut(platform = globalThis.navigator?.platform || ''): Shortcut {
  const mac = /Mac|iPhone|iPad/.test(platform);
  return { code: 'Space', meta: mac, ctrl: !mac, alt: false, shift: true };
}
export function shortcutFromEvent(event: KeyboardEvent): Shortcut | null {
  const value = {
    code: ['Meta', 'Control', 'Alt', 'Shift'].includes(event.key) ? null : event.code,
    meta: event.metaKey,
    ctrl: event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey
  };
  if (
    !(value.meta || value.ctrl || value.alt) ||
    (!value.code && modifiers.filter((key) => value[key]).length < 2)
  )
    return null;
  return value;
}
export function matchesShortcut(event: KeyboardEvent, shortcut: Shortcut) {
  return (
    !event.repeat &&
    (!shortcut.code || event.code === shortcut.code) &&
    modifiers.every((key) => event[`${key}Key`] === shortcut[key])
  );
}
export function releasesShortcut(event: KeyboardEvent, shortcut: Shortcut) {
  return (
    event.code === shortcut.code || modifiers.some((key) => shortcut[key] && !event[`${key}Key`])
  );
}
export function shortcutLabel(shortcut: Shortcut) {
  return [
    shortcut.meta && '⌘',
    shortcut.ctrl && 'Ctrl',
    shortcut.alt && 'Alt',
    shortcut.shift && 'Shift',
    shortcut.code?.replace(/^Key|^Digit/, '')
  ]
    .filter(Boolean)
    .join(' + ');
}
export function loadShortcut() {
  const value = readLocal<Partial<Shortcut> | false | null>('gr-voice-shortcut', null);
  if (value === false) return { enabled: false, shortcut: defaultShortcut() };
  if (
    value &&
    (value.meta || value.ctrl || value.alt) &&
    modifiers.every((key) => typeof value[key] === 'boolean') &&
    (typeof value.code === 'string' || value.code === null)
  )
    return { enabled: true, shortcut: value as Shortcut };
  return { enabled: true, shortcut: defaultShortcut() };
}
export function saveShortcut(shortcut: Shortcut, enabled: boolean) {
  writeLocal('gr-voice-shortcut', enabled ? shortcut : false);
}
