<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getReader } from '../reader.svelte';
  import {
    shortcutFromEvent,
    shortcutLabel,
    saveShortcut,
    defaultShortcut
  } from '../assistant/shortcut';
  import { voices, issueFor } from '../providers';
  import { clearCache } from '../storage';
  import type { Issue } from '../types';
  import IssueNotice from './IssueNotice.svelte';
  const reader = getReader();
  let voiceList = $state<{ voice_id: string; name: string }[]>([]);
  let loading = $state(false);
  let issue = $state<Issue | null>(null);
  onDestroy(() => (reader.recordingShortcut = false));
  function recordShortcut(event: KeyboardEvent) {
    if (!reader.recordingShortcut) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'Escape') {
      reader.recordingShortcut = false;
      return;
    }
    const shortcut = shortcutFromEvent(event);
    if (shortcut) {
      reader.shortcut = shortcut;
      reader.shortcutEnabled = true;
      saveShortcut(shortcut, true);
    }
  }
  async function loadVoices() {
    loading = true;
    issue = null;
    try {
      voiceList = await voices(reader.settings);
    } catch (error) {
      issue = issueFor(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:window
  onkeydown={recordShortcut}
  onkeyup={() => {
    if (reader.recordingShortcut) reader.recordingShortcut = false;
  }}
/>
<form
  onsubmit={(event) => {
    event.preventDefault();
    reader.saveConnections();
  }}
>
  <p class="intro">
    Use your own accounts for the tutor and narrator. Reading and experiments work without a
    connection.
  </p>
  <fieldset>
    <legend>Tutor</legend>
    <label
      >OpenAI API key<input
        type="password"
        bind:value={reader.settings.openaiKey}
        autocomplete="off"
        spellcheck="false"
        placeholder="OpenAI key"
      /></label
    >
    <div class="field-row">
      <label
        >Text model<input bind:value={reader.settings.model} spellcheck="false" required /></label
      ><label
        >Voice model<input
          bind:value={reader.settings.realtimeModel}
          spellcheck="false"
          required
        /></label
      >
    </div>
    <label
      >Conversation voice<select bind:value={reader.settings.realtimeVoice}
        ><option value="marin">Marin</option><option value="cedar">Cedar</option><option
          value="coral">Coral</option
        ><option value="sage">Sage</option><option value="verse">Verse</option></select
      ></label
    >
  </fieldset>
  <fieldset>
    <legend>Narrator</legend>
    <label
      >ElevenLabs API key<input
        type="password"
        bind:value={reader.settings.elevenKey}
        autocomplete="off"
        spellcheck="false"
        placeholder="ElevenLabs key"
      /></label
    >
    <div class="voice-picker">
      <label
        >Voice ID<input bind:value={reader.settings.voiceId} spellcheck="false" required /></label
      ><button class="v2-secondary" type="button" onclick={loadVoices} disabled={loading}
        >{loading ? 'Loading…' : 'Choose voice'}</button
      >
    </div>
    {#if voiceList.length}<label
        >Narrator<select
          value={reader.settings.voiceId}
          onchange={(event) => {
            reader.settings.voiceId = event.currentTarget.value;
            reader.settings.voiceName =
              voiceList.find((v) => v.voice_id === event.currentTarget.value)?.name || '';
          }}
        >
          {#each voiceList as voice (voice.voice_id)}<option value={voice.voice_id}
              >{voice.name}</option
            >{/each}
        </select></label
      >{/if}
    <label
      >Speech model<select bind:value={reader.settings.ttsModel}
        ><option value="eleven_flash_v2_5">Flash v2.5</option><option value="eleven_multilingual_v2"
          >Multilingual v2</option
        ><option value="eleven_v3">Eleven v3</option></select
      ></label
    >
  </fieldset>
  <label class="check-field"
    ><input type="checkbox" bind:checked={reader.settings.remember} />Remember connections on this
    device</label
  >
  <p class="hint">
    Otherwise, keys stay in this browser tab. Requests go directly to your providers.
  </p>
  <div class="shortcut-settings">
    <label class="check-field"
      ><input
        type="checkbox"
        checked={reader.shortcutEnabled}
        onchange={(event) => {
          reader.shortcutEnabled = event.currentTarget.checked;
          saveShortcut(reader.shortcut, reader.shortcutEnabled);
        }}
      />Enable hold-to-talk shortcut</label
    >
    <div class="form-actions">
      <button
        class="v2-secondary"
        type="button"
        onclick={() => (reader.recordingShortcut = !reader.recordingShortcut)}
        >{reader.recordingShortcut
          ? 'Press a key combination…'
          : shortcutLabel(reader.shortcut)}</button
      ><button
        class="v2-secondary"
        type="button"
        onclick={() => {
          reader.shortcut = defaultShortcut();
          saveShortcut(reader.shortcut, reader.shortcutEnabled);
        }}>Reset</button
      >
    </div>
    <p class="hint">Use Command, Control, or Alt with another key. Escape cancels.</p>
  </div>
  <div class="form-actions">
    <button class="v2-primary" type="submit">Save connections</button><button
      class="v2-secondary"
      type="button"
      onclick={() => reader.forgetConnections()}>Remove keys</button
    >
  </div>
  {#if reader.notice}<p role="status" class="hint">{reader.notice}</p>{/if}
  {#if issue}<IssueNotice {issue} dismiss={() => (issue = null)} />{/if}
  <details class="cache-settings">
    <summary>Local audio storage</summary>
    <p class="hint">Cached audio is reused when the voice, text, and surrounding context match.</p>
    <button
      class="v2-secondary"
      type="button"
      onclick={async () => {
        try {
          await clearCache();
          reader.notice = 'Cached audio and explanations cleared.';
        } catch {
          issue = { message: 'Browser storage is unavailable.' };
        }
      }}>Clear cached audio</button
    >
  </details>
</form>

<style>
  .shortcut-settings {
    display: grid;
    gap: 12px;
  }

  form {
    display: grid;
    gap: 20px;
  }
  .intro {
    font-size: 14px;
    color: var(--muted);
    margin: 0;
    line-height: 1.7;
  }
  fieldset {
    border: 0;
    border-top: 1px solid var(--line);
    margin: 0;
    padding: 18px 0 0;
    display: grid;
    gap: 16px;
  }
  legend {
    font-size: 14px;
    font-weight: 650;
    padding: 0 12px 0 0;
  }
  label {
    display: grid;
    gap: 7px;
    font-size: 14px;
    font-weight: 500;
  }
  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  input:not([type='checkbox']),
  select {
    width: 100%;
    border: 1px solid var(--line);
    background: var(--wash);
    border-radius: 9px;
    color: var(--ink);
    padding: 10px 12px;
    font:
      14px Manrope,
      sans-serif;
    min-width: 0;
  }
  .voice-picker {
    display: flex;
    align-items: end;
    gap: 10px;
  }
  .voice-picker label {
    flex: 1;
    min-width: 0;
  }
  .check-field {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .check-field input {
    accent-color: var(--geometry);
  }
  .hint {
    font-size: 13px;
    color: var(--muted);
    margin: 0;
    line-height: 1.65;
  }
  .form-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .cache-settings {
    font-size: 14px;
  }
  .cache-settings summary {
    cursor: pointer;
  }
  .cache-settings p {
    margin: 12px 0;
  }
  @media (max-width: 500px) {
    .field-row {
      grid-template-columns: 1fr;
    }
    .voice-picker {
      align-items: stretch;
      flex-direction: column;
    }
  }
</style>
