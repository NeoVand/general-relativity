<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getReader } from '../reader.svelte';
  import { answerHTML } from '../format';
  import Icon from './Icon.svelte';
  import Connections from './Connections.svelte';
  import IssueNotice from './IssueNotice.svelte';
  import { shortcutLabel } from '../assistant/shortcut';
  import { saveSpokenText } from '../audio/passages';
  import type { Passage } from '../types';
  const reader = getReader();
  const tutor = reader.tutor,
    voice = reader.voice,
    player = reader.narrator;
  let question = $state('');
  let tab = $derived(reader.overlay || 'ask');
  let preparing = $state(false);
  let preparation: AbortController | undefined;
  let editing = $state.raw<Passage | null>(null);
  let spokenDraft = $state('');
  function editSpeech() {
    player.pause();
    editing = player.sourcePassage;
    spokenDraft = player.passageScript;
  }
  async function saveSpeech() {
    if (!editing || !spokenDraft.trim()) return;
    if (!saveSpokenText(editing, spokenDraft)) {
      reader.issue = {
        message: 'Browser storage is unavailable; the explanation could not be saved.'
      };
      return;
    }
    editing = null;
    reader.notice = 'Spoken explanation saved.';
    await player.retry();
  }
  onDestroy(() => preparation?.abort());
  function open(node: HTMLElement) {
    const previous = document.activeElement;
    queueMicrotask(() => {
      if (reader.overlay === 'ask') node.querySelector('textarea')?.focus({ preventScroll: true });
    });
    return () => {
      if (
        previous instanceof HTMLElement &&
        previous.isConnected &&
        node.contains(document.activeElement)
      )
        previous.focus({ preventScroll: true });
    };
  }
  function send() {
    const text = question.trim();
    if (text) {
      question = '';
      void reader.ask(text);
    }
  }
  function scrollTranscript(node: HTMLElement) {
    // Follow new answers only while the reader remains near the bottom.
    let following = true;
    const scroll = () => (following = node.scrollHeight - node.scrollTop - node.clientHeight < 100);
    node.addEventListener('scroll', scroll);
    const observer = new MutationObserver(() => {
      if (following) node.scrollTop = node.scrollHeight;
    });
    observer.observe(node, { childList: true, subtree: true, characterData: true });
    node.scrollTop = node.scrollHeight;
    return () => {
      observer.disconnect();
      node.removeEventListener('scroll', scroll);
    };
  }
  async function prepareChapter() {
    preparing = true;
    reader.notice = '';
    try {
      const { groupPassages, prepareSpeech } = await import('../audio/passages');
      const controller = (preparation = new AbortController());
      for (const [index, block] of groupPassages(reader.visiblePassages()).entries()) {
        await prepareSpeech(reader.settings, block, controller.signal);
        reader.notice = `Prepared ${index + 1} passages.`;
      }
      reader.notice = 'Spoken explanations are ready.';
    } catch (error) {
      if (!preparation?.signal.aborted)
        reader.issue = {
          message: error instanceof Error ? error.message : 'Preparation could not finish.'
        };
    } finally {
      preparing = false;
    }
  }
</script>

<div
  class={['assistant-overlay', { listening: tab === 'listen', connections: tab === 'settings' }]}
  role="dialog"
  aria-label="Study companion"
  aria-modal="false"
  tabindex="-1"
  {@attach open}
  onkeydown={(event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      reader.close();
    }
  }}
>
  <header class="assistant-header">
    <div class="assistant-identity">
      <Icon name={tab === 'listen' ? 'headphones' : tab === 'settings' ? 'settings' : 'chat'} />
      <h2>
        {tab === 'listen' ? 'Listen' : tab === 'settings' ? 'Connections' : 'Study companion'}
      </h2>
    </div>
    <div class="window-actions">
      {#if tab !== 'ask'}<button
          class="v2-icon"
          aria-label="Open conversation"
          title="Ask"
          onclick={() => reader.show('ask')}><Icon name="chat" size={17} /></button
        >{:else}<button
          class="v2-icon"
          aria-label="Listening controls"
          title="Listen"
          onclick={() => reader.show('listen')}><Icon name="headphones" size={17} /></button
        >{/if}
      {#if tab !== 'settings'}<button
          class="v2-icon"
          aria-label="Connections"
          title="Connections"
          onclick={() => reader.show('settings')}><Icon name="settings" size={17} /></button
        >{/if}
      <button
        class="v2-icon"
        aria-label="Close study companion"
        title="Close"
        onclick={() => reader.close()}><Icon name="close" size={18} /></button
      >
    </div>
  </header>
  {#if tab === 'settings'}
    <div class="assistant-body" id="panel-settings" role="region" aria-label="Connections">
      <Connections />
    </div>
  {:else if tab === 'listen'}
    <div
      class="assistant-body listening-settings"
      id="panel-listen"
      role="region"
      aria-label="Listening controls"
    >
      <div class="listen-source">
        <p class="eyeline">{player.active ? 'NOW READING' : 'THIS CHAPTER'}</p>
        <h3>{player.active ? player.title : reader.book().title}</h3>
        <p class="subtle">
          {player.active
            ? player.status === 'paused'
              ? 'Paused · resume whenever you’re ready.'
              : player.status === 'preparing'
                ? 'Preparing the next passage…'
                : 'Reading continues when you close this panel.'
            : 'Start at the passage in view, or read the whole chapter.'}
        </p>
      </div>
      <div class="listen-actions">
        <button
          class="v2-primary"
          onclick={() =>
            player.active
              ? player.status === 'playing' || player.status === 'preparing'
                ? player.pause()
                : void player.resume()
              : void reader.listen('current')}
          ><Icon
            name={player.status === 'playing' || player.status === 'preparing' ? 'pause' : 'play'}
            size={17}
          />{player.active
            ? player.status === 'playing' || player.status === 'preparing'
              ? 'Pause reading'
              : 'Resume reading'
            : 'Read from here'}</button
        ><button class="v2-secondary" onclick={() => void reader.listen('chapter')}
          >From the beginning</button
        >
      </div>
      {#if reader.selection}<button
          class="v2-secondary"
          onclick={() => void reader.listen('selection')}>Read selected text</button
        >{/if}
      <div class="listen-options">
        <label
          >Playback speed<select
            value={player.rate}
            onchange={(event) => player.setRate(Number(event.currentTarget.value))}
            >{#each [0.75, 1, 1.25, 1.5, 1.75, 2] as speed (speed)}<option value={speed}
                >{speed}×</option
              >{/each}</select
          ></label
        ><label class="toggle"
          ><input type="checkbox" bind:checked={player.follow} />Follow the passage</label
        ><label class="toggle"
          ><input type="checkbox" bind:checked={player.captions} />Show spoken captions</label
        >
      </div>
      {#if player.caption}<blockquote>{player.caption}</blockquote>{/if}
      {#if player.issue}<IssueNotice issue={player.issue} retry={() => void player.retry()} />{/if}
      {#if reader.issue}<IssueNotice
          issue={reader.issue}
          dismiss={() => (reader.issue = null)}
        />{/if}
      <details>
        <summary>Spoken explanations</summary>
        <p class="subtle">
          Prepare the mathematical explanations ahead of listening. This uses your OpenAI account;
          audio is generated when played.
        </p>
        <button class="v2-secondary" disabled={preparing} onclick={prepareChapter}
          >{preparing ? 'Preparing…' : 'Prepare this chapter'}</button
        >{#if player.script}<p class="subtle">Current spoken passage</p>
          <p class="script">{player.script}</p>
          <button class="v2-secondary" onclick={editSpeech}>Edit spoken passage</button>{/if}
      </details>
      {#if editing}<div class="speech-editor">
          <label for="spoken-draft">Spoken passage</label><textarea
            id="spoken-draft"
            bind:value={spokenDraft}
            rows="6"></textarea>
          <div class="listen-actions">
            <button
              class="v2-primary"
              disabled={!spokenDraft.trim()}
              onclick={() => void saveSpeech()}>Save and replay</button
            ><button class="v2-secondary" onclick={() => (editing = null)}>Cancel</button>
          </div>
        </div>{/if}
      {#if reader.notice}<p class="subtle" role="status">{reader.notice}</p>{/if}
    </div>
  {:else}
    <div class="conversation" id="panel-ask" role="region" aria-label="Conversation">
      <div class="context-line">
        <Icon name="book" size={16} /><span
          >{reader.selection
            ? 'Selected passage'
            : player.active
              ? 'Where you paused'
              : reader.book().title}</span
        >{#if player.active}<button
            onclick={() => {
              void player.resume();
              reader.close();
            }}>Resume reading <Icon name="play" size={13} /></button
          >{/if}
      </div>
      <div class="transcript" {@attach scrollTranscript}>
        {#if !tutor.messages.length}<div class="conversation-empty">
            <h3>Let’s work through it.</h3>
            <p>Ask about what you’re reading. You can keep exploring the book while we talk.</p>
            <div>
              {#each ['Explain the main idea here', 'Help me understand this equation'] as prompt (prompt)}<button
                  onclick={() => void reader.ask(prompt)}
                  >{prompt}<Icon name="arrow" size={16} /></button
                >{/each}
            </div>
          </div>{/if}
        {#each tutor.messages as message (message.id)}<div class={['message', message.role]}>
            <span class="message-role">{message.role === 'user' ? 'You' : 'Companion'}</span>
            <div class="message-text">{@html answerHTML(message.text)}</div>
          </div>{/each}
        {#if tutor.thinking}<p class="thinking" role="status">
            Working through your question…
          </p>{/if}
        {#if tutor.issue}<IssueNotice
            issue={tutor.issue}
            retry={() => void reader.ask(tutor.lastQuestion, true)}
            dismiss={() => (tutor.issue = null)}
          />{/if}
        {#if voice.issue}<IssueNotice
            issue={voice.issue}
            dismiss={() => (voice.issue = null)}
          />{#if voice.active}<button class="v2-secondary" onclick={() => void voice.hear()}
              >Hear companion</button
            >{/if}{/if}
      </div>
      <form
        class="composer"
        onsubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <label class="v2-sr-only" for="question">Ask a question</label><textarea
          id="question"
          bind:value={question}
          rows="2"
          placeholder="Ask about what you’re reading…"
          onkeydown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
              event.preventDefault();
              send();
            }
          }}></textarea>
        <div class="composer-actions">
          <button
            type="button"
            class={['voice-toggle', { live: voice.active }]}
            onclick={() => (voice.active ? voice.end() : void reader.startVoice())}
            ><Icon name={voice.active ? 'micOff' : 'mic'} size={18} />{voice.active
              ? 'End voice'
              : 'Talk instead'}</button
          ><span class="voice-status"
            >{voice.active
              ? voice.held
                ? 'Listening'
                : voice.status === 'speaking'
                  ? 'Speaking'
                  : voice.status === 'thinking'
                    ? 'Thinking…'
                    : voice.muted
                      ? 'Microphone off'
                      : 'Listening to you'
              : reader.shortcutEnabled
                ? shortcutLabel(reader.shortcut)
                : 'Voice shortcut disabled'}</span
          >{#if tutor.thinking}<button
              class="v2-icon send"
              type="button"
              aria-label="Cancel answer"
              onclick={() => tutor.cancel()}><Icon name="stop" size={17} /></button
            >{:else}<button
              class="v2-icon send"
              type="submit"
              disabled={!question.trim()}
              aria-label="Send question"><Icon name="send" /></button
            >{/if}
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  .speech-editor {
    display: grid;
    gap: 12px;
  }
  .speech-editor textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: var(--wash);
    color: var(--ink);
    font:
      15px/1.7 Manrope,
      sans-serif;
  }

  .assistant-overlay {
    position: fixed;
    inset: auto 22px 24px auto;
    margin: 0;
    width: 400px;
    height: min(550px, calc(100dvh - 92px));
    max-height: calc(100dvh - 92px);
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--paper);
    color: var(--ink);
    box-shadow: 0 12px 50px #0003;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 75;
    outline: none;
  }
  .assistant-overlay.listening {
    top: 66px;
    bottom: auto;
    height: auto;
    width: 380px;
    max-height: calc(100dvh - 90px);
  }
  .assistant-overlay.connections {
    height: min(650px, calc(100dvh - 90px));
  }
  .window-actions {
    display: flex;
    align-items: center;
    gap: 1px;
  }
  .window-actions .v2-icon {
    width: 30px;
    height: 30px;
    padding: 6px;
  }
  .assistant-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--line);
    gap: 16px;
  }
  .assistant-identity {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--geometry);
  }
  h2 {
    font:
      600 16px/1.4 Manrope,
      sans-serif;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0;
  }
  .assistant-body {
    padding: 18px;
    overflow: auto;
    overscroll-behavior: contain;
    min-height: 0;
  }
  .conversation {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
  .context-line {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    font-size: 12px;
    color: var(--muted);
  }
  .context-line > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .context-line button {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    margin-left: auto;
    background: none;
    border: 0;
    color: var(--geometry);
    font-size: 12px;
  }
  .transcript {
    padding: 0 18px 18px;
    overflow: auto;
    flex: 1;
    min-height: 100px;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }
  .conversation-empty {
    padding: 16px 0;
  }
  .conversation-empty h3 {
    font:
      400 26px/1.2 Newsreader,
      serif;
    letter-spacing: -0.025em;
    margin: 0 0 12px;
  }
  .conversation-empty p {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    max-width: 44ch;
  }
  .conversation-empty > div {
    display: grid;
    gap: 8px;
    margin-top: 18px;
  }
  .conversation-empty button {
    background: var(--wash);
    border: 1px solid transparent;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    gap: 12px;
    padding: 12px 14px;
    font:
      14px/1.5 Manrope,
      sans-serif;
    color: var(--ink);
  }
  .conversation-empty button:hover {
    border-color: var(--line);
  }
  .message {
    padding: 12px 0 20px;
  }
  .message.user {
    padding: 14px 18px;
    background: var(--wash);
    border-radius: 13px;
    margin: 10px 0 16px;
  }
  .message-role {
    font:
      600 12px Manrope,
      sans-serif;
    color: var(--geometry);
  }
  .message-text {
    font:
      17px/1.65 Newsreader,
      serif;
    overflow-wrap: anywhere;
  }
  .message-text :global(p) {
    margin: 8px 0;
  }
  .message-text :global(.katex-display) {
    overflow: auto;
    padding: 8px 0;
  }
  .message-text :global(pre) {
    overflow: auto;
    font-size: 13px;
  }
  .thinking {
    color: var(--muted);
    font-size: 14px;
  }
  .composer {
    margin: 0 12px 12px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: var(--wash);
    padding: 12px 14px 8px;
  }
  .composer:focus-within {
    border-color: color-mix(in srgb, var(--geometry) 60%, var(--line));
  }
  textarea {
    display: block;
    resize: none;
    width: 100%;
    max-height: 160px;
    min-height: 58px;
    background: none;
    border: 0;
    outline: none;
    color: var(--ink);
    font:
      15px/1.6 Manrope,
      sans-serif;
  }
  .composer-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .voice-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: none;
    padding: 6px 0;
    font:
      13px Manrope,
      sans-serif;
    color: var(--muted);
  }
  .voice-toggle.live {
    color: var(--geometry);
  }
  .voice-status {
    font-size: 10px;
    color: var(--muted);
  }
  .send {
    margin-left: auto;
    background: var(--ink);
    color: var(--paper);
  }
  .send:disabled {
    opacity: 0.3;
  }
  .listening-settings {
    display: grid;
    align-content: start;
    gap: 16px;
  }
  .eyeline {
    font-size: 12px;
    letter-spacing: 0.08em;
    color: var(--geometry);
    margin: 0 0 8px;
  }
  .listening-settings h3 {
    font:
      450 24px/1.25 Newsreader,
      serif;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
  }
  .subtle {
    font-size: 14px;
    line-height: 1.7;
    color: var(--muted);
    margin: 8px 0;
  }
  .listen-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .listen-options {
    display: grid;
    gap: 13px;
    padding: 14px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .listen-options label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
  }
  .listen-options select {
    margin-left: auto;
    padding: 7px 12px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--wash);
    color: var(--ink);
  }
  .toggle input {
    width: 15px;
    height: 15px;
    margin: 0;
    flex: 0 0 15px;
    accent-color: var(--geometry);
  }
  .listening-settings blockquote {
    font-size: 16px;
    max-height: 90px;
    overflow: auto;
  }
  .listening-settings .listen-actions button {
    font-size: 12px;
    padding: 9px 12px;
    flex: 1;
  }
  .listen-source .subtle {
    margin: 8px 0 0;
    font-size: 12px;
  }
  .listen-options label {
    font-size: 12px;
  }
  blockquote {
    font:
      20px/1.65 Newsreader,
      serif;
    color: var(--muted);
    margin: 0;
    padding: 0 0 0 18px;
    border-left: 2px solid var(--geometry);
  }
  details summary {
    font-size: 14px;
    cursor: pointer;
  }
  .script {
    font:
      18px/1.7 Newsreader,
      serif;
  }
  @media (max-width: 600px) {
    .assistant-overlay {
      inset: auto 10px 12px;
      width: calc(100vw - 20px);
      height: min(480px, 60dvh);
      max-height: calc(100dvh - 80px);
      border-radius: 14px;
    }
    .assistant-overlay.listening {
      top: 64px;
      bottom: auto;
      width: calc(100vw - 20px);
      height: auto;
      max-height: 65dvh;
    }
    .assistant-overlay.connections {
      height: 65dvh;
    }
    .assistant-body {
      padding: 16px;
    }
    .transcript {
      padding: 0 16px 14px;
    }
    .voice-status {
      display: none;
    }
    .context-line {
      padding: 10px 16px;
    }
    .conversation-empty h3 {
      font-size: 24px;
    }
    .conversation-empty {
      padding-top: 10px;
    }
    .conversation-empty p {
      font-size: 12px;
    }
    .conversation-empty button {
      font-size: 12px;
      padding: 9px 10px;
    }
  }
</style>
