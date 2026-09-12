<script lang="ts">
  import { getReader } from '../reader.svelte';
  import Icon from './Icon.svelte';
  const reader = getReader();
  const player = reader.narrator;
  const voice = reader.voice;
  const active = $derived(player.active || voice.active || !!voice.issue || !!reader.issue);
  const voiceLabel = $derived(
    voice.held
      ? 'Listening · release to ask'
      : voice.status === 'connecting'
        ? 'Connecting voice…'
        : voice.status === 'thinking'
          ? 'Thinking…'
          : voice.status === 'speaking'
            ? 'Speaking'
            : voice.handsFree && !voice.muted
              ? 'Listening to you'
              : 'Hold to ask'
  );
  const label = $derived(
    voice.issue
      ? 'Voice needs attention'
      : reader.issue
        ? 'Reading needs attention'
        : voice.active && voice.status !== 'reading'
          ? voiceLabel
          : player.status === 'preparing'
            ? 'Preparing reading…'
            : player.status === 'paused'
              ? 'Reading paused'
              : player.status === 'error'
                ? 'Reading needs attention'
                : 'Reading'
  );
</script>

{#if active}
  <div class="player-area">
    {#if player.captions && player.caption}<div class="spoken-caption">
        <p>{player.caption}</p>
      </div>{/if}
    <div
      class={['compact-player', { 'is-listening': voice.held }]}
      aria-label="Reading and voice controls"
    >
      {#if player.active}
        <button
          class="v2-icon quiet-skip"
          aria-label="Back 15 seconds"
          title="Back 15 seconds"
          onclick={() => player.seek(-15)}><Icon name="back" size={18} /></button
        >
        <button
          class="v2-icon primary-play"
          aria-label={player.status === 'playing' || player.status === 'preparing'
            ? 'Pause narration'
            : 'Resume narration'}
          onclick={() =>
            player.status === 'playing' || player.status === 'preparing'
              ? player.pause()
              : void player.resume()}
          ><Icon
            name={player.status === 'playing' || player.status === 'preparing' ? 'pause' : 'play'}
            size={19}
          /></button
        >
        <button
          class="v2-icon quiet-skip"
          aria-label="Forward 15 seconds"
          title="Forward 15 seconds"
          onclick={() => player.seek(15)}><Icon name="forward" size={18} /></button
        >
      {:else}<Icon name="mic" size={19} />{/if}
      <button
        class="player-label"
        onclick={() =>
          reader.show(
            voice.issue || (voice.active && voice.status !== 'reading') ? 'ask' : 'listen'
          )}
        ><span>{label}</span><small>{player.active ? player.title : 'Study companion'}</small
        ></button
      >
      {#if player.active}<button
          class="speed"
          aria-label={`Playback speed ${player.rate} times`}
          title="Change playback speed"
          onclick={() =>
            player.setRate(player.rate >= 2 ? 0.75 : Math.round((player.rate + 0.25) * 100) / 100)}
          >{player.rate}×</button
        >{/if}
      <button
        class="v2-icon"
        aria-label="Open study companion"
        title="Ask about this passage"
        onclick={() => reader.show('ask')}><Icon name="chat" size={19} /></button
      >
      {#if voice.active}<button
          class="v2-icon"
          aria-label="End voice conversation"
          title="End voice conversation"
          onclick={() => voice.end()}><Icon name="micOff" size={19} /></button
        >{/if}
      {#if !player.active && !voice.active}<button
          class="v2-icon"
          aria-label="Dismiss attention notice"
          onclick={() => {
            voice.issue = null;
            reader.issue = null;
          }}><Icon name="close" size={16} /></button
        >{/if}
      {#if player.active}<button
          class="v2-icon"
          aria-label="Stop narration"
          title="Stop narration"
          onclick={() => player.stop()}><Icon name="stop" size={16} /></button
        >{/if}
    </div>
  </div>
{/if}

<style>
  .player-area {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 65;
    width: max-content;
    max-width: calc(100vw - 28px);
  }
  .compact-player {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 10px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: color-mix(in srgb, var(--paper) 96%, transparent);
    backdrop-filter: blur(20px);
    box-shadow: 0 6px 36px #0002;
    max-width: 100%;
  }
  .compact-player.is-listening {
    border-color: var(--geometry);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--geometry) 10%, transparent),
      0 6px 36px #0002;
  }
  .primary-play {
    background: var(--ink) !important;
    color: var(--paper) !important;
    border-radius: 50% !important;
  }
  .player-label {
    display: block;
    min-width: 100px;
    max-width: 210px;
    border: 0;
    background: none;
    text-align: left;
    padding: 0 12px;
    font:
      500 14px/1.4 Manrope,
      sans-serif;
    color: var(--ink);
  }
  .player-label span,
  .player-label small {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .player-label small {
    font-size: 12px;
    color: var(--muted);
    margin-top: 2px;
  }
  .speed {
    border: 0;
    background: none;
    font:
      500 13px Manrope,
      sans-serif;
    color: var(--muted);
    padding: 8px 5px;
  }
  .spoken-caption {
    max-width: 540px;
    margin: 0 auto 12px;
    padding: 18px 22px;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: 0 5px 30px #0002;
  }
  .spoken-caption p {
    font:
      20px/1.6 Newsreader,
      serif;
    margin: 0;
  }
  @media (max-width: 600px) {
    .player-area {
      bottom: 14px;
    }
    .quiet-skip {
      display: none;
    }
    .compact-player {
      gap: 2px;
    }
    .player-label {
      max-width: 135px;
      padding: 0 7px;
      min-width: 75px;
    }
    .speed {
      display: none;
    }
    .spoken-caption {
      max-height: 30vh;
      overflow: auto;
    }
  }
</style>
