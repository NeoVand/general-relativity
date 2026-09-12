<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { Reader, setReader } from '$lib/reader.svelte';
  import { matchesShortcut, releasesShortcut } from '$lib/assistant/shortcut';
  import type { BookPage } from '$lib/types';
  import Icon from '$lib/components/Icon.svelte';
  import Assistant from '$lib/components/Assistant.svelte';
  import Player from '$lib/components/Player.svelte';
  import Search from '$lib/components/Search.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import 'katex/dist/katex.min.css';
  import '../app.css';
  let { data, children } = $props();
  const reader = new Reader(
    () => page.data.book as BookPage,
    untrack(() => data.contents)
  );
  setReader(reader);
  let navigationOpen = $state(false);
  let hydrated = $state(false);
  let collapsed = $state(false);
  function toggleNavigation() {
    if (matchMedia('(max-width:800px)').matches) navigationOpen = !navigationOpen;
    else {
      collapsed = !collapsed;
      document.documentElement.dataset.sidebar = collapsed ? 'collapsed' : 'expanded';
      try {
        localStorage.setItem('gr-sidebar', collapsed ? 'collapsed' : 'expanded');
      } catch {}
    }
  }
  let searchOpen = $state(false);
  let dark = $state(false);
  let largeType = $state(false);
  const current = $derived(page.data.book as BookPage | undefined);
  function theme() {
    dark = !dark;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try {
      localStorage.setItem('gr-theme', dark ? 'dark' : 'light');
    } catch {}
  }
  function size() {
    largeType = !largeType;
    document.documentElement.classList.toggle('large-type', largeType);
    try {
      localStorage.setItem('gr-type', largeType ? 'large' : 'normal');
    } catch {}
  }
  function keydown(event: KeyboardEvent) {
    if (reader.recordingShortcut) return;
    const editing =
      event.target instanceof Element &&
      event.target.closest('input,textarea,select,[contenteditable=true]');
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchOpen = !searchOpen;
      return;
    }
    if (event.key === 'Escape') {
      reader.voice.release(true);
      navigationOpen = false;
      searchOpen = false;
    }
    if (!editing && reader.shortcutEnabled && matchesShortcut(event, reader.shortcut)) {
      event.preventDefault();
      if (!event.repeat && !reader.voice.held) {
        if (!reader.settings.openaiKey) {
          reader.show('settings');
          reader.notice = 'Add your OpenAI key to use voice.';
        } else void reader.voice.hold();
      }
    }
  }
  function keyup(event: KeyboardEvent) {
    if (reader.voice.held && releasesShortcut(event, reader.shortcut)) {
      event.preventDefault();
      reader.voice.release();
    }
  }
  afterNavigate(() => {
    navigationOpen = false;
  });
  onMount(() => {
    hydrated = true;
    reader.initialize();
    collapsed = document.documentElement.dataset.sidebar === 'collapsed';
    dark = document.documentElement.dataset.theme === 'dark';
    largeType = document.documentElement.classList.contains('large-type');
    return () => reader.dispose();
  });
</script>

<svelte:window onkeydown={keydown} onkeyup={keyup} onblur={() => reader.voice.release(true)} />
<svelte:document
  onvisibilitychange={() => {
    if (document.hidden) reader.voice.release(true);
  }}
  onpointerup={(event) => {
    if (event.target instanceof Element && event.target.closest('#main'))
      setTimeout(() => reader.select(), 0);
  }}
/>
<a class="v2-skip" href="#main">Skip to reading</a>
<div
  class="reader-app"
  class:companion-open={reader.overlay !== null}
  class:with-outline={current?.id.startsWith('chapter-')}
>
  <header class={['reader-header', { 'search-open': searchOpen }]}>
    <div class="header-start">
      <button
        disabled={!hydrated}
        class="v2-icon mobile-menu"
        aria-label="Toggle contents"
        aria-expanded={navigationOpen}
        onclick={toggleNavigation}><Icon name="home" size={25} /></button
      >
      <a class="app-wordmark" href={`${base}/`} aria-label="General Relativity home"
        ><Icon name="home" size={26} /><span>A FIELD GUIDE TO SPACETIME</span></a
      >
    </div>
    <div class="header-actions">
      <button
        disabled={!hydrated}
        class="header-action"
        aria-label="Listen"
        aria-expanded={reader.overlay === 'listen'}
        onclick={() => (reader.overlay === 'listen' ? reader.close() : reader.show('listen'))}
        ><Icon name="headphones" size={19} /><span>Listen</span></button
      >
      <button
        disabled={!hydrated}
        class="header-action"
        aria-label="Ask"
        aria-expanded={reader.overlay === 'ask'}
        onclick={() => (reader.overlay === 'ask' ? reader.close() : reader.show('ask'))}
        ><Icon name="chat" size={19} /><span>Ask</span></button
      >
      <Search bind:open={searchOpen} />
      <button
        disabled={!hydrated}
        class="v2-icon type-button"
        aria-label="Larger text"
        aria-pressed={largeType}
        onclick={size}><Icon name="type" size={20} /></button
      >
      <button
        disabled={!hydrated}
        class="v2-icon"
        aria-label={dark ? 'Switch to light appearance' : 'Switch to dark appearance'}
        onclick={theme}><Icon name={dark ? 'sun' : 'moon'} size={21} /></button
      >
      <a
        class="v2-icon github-link"
        href="https://github.com/NeoVand/general-relativity"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the GitHub repository"><Icon name="github" size={21} /></a
      >
    </div>
  </header>
  <Sidebar
    contents={data.contents}
    {current}
    {collapsed}
    mobileOpen={navigationOpen}
    toggle={toggleNavigation}
    closeMobile={() => (navigationOpen = false)}
  />
  <div class="reader-page">
    {@render children()}
    {#if current?.id.startsWith('chapter-')}<nav class="section-rail" aria-label="In this chapter">
        <p>IN THIS CHAPTER</p>
        {#each current.outline.filter((section) => section.level === 3) as section (section.id)}<a
            href={`#${section.id}`}>{section.title}</a
          >{/each}<a class="back-top" href="#main">Back to top ↑</a>
      </nav>{/if}
  </div>
</div>
<Player />
{#if reader.selection && !reader.overlay}<div class="selection-actions">
    <span>Selected text</span><button onclick={() => void reader.listen('selection')}
      ><Icon name="headphones" size={16} />Listen</button
    ><button onclick={() => void reader.ask('Explain this selection: ' + reader.selection?.text)}
      ><Icon name="chat" size={16} />Explain</button
    ><button aria-label="Dismiss selection actions" onclick={() => (reader.selection = null)}
      ><Icon name="close" size={15} /></button
    >
  </div>{/if}
{#if reader.overlay}<Assistant />{/if}

<style>
  .reader-header {
    height: 56px;
    position: fixed;
    inset: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
    z-index: 60;
  }
  @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
    .reader-header {
      background: var(--header-glass);
      -webkit-backdrop-filter: blur(20px) saturate(145%);
      backdrop-filter: blur(20px) saturate(145%);
    }
  }
  .header-start,
  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mobile-menu {
    display: none;
  }
  .app-wordmark {
    display: flex;
    align-items: center;
    gap: 24px;
    color: var(--ink);
    text-decoration: none;
  }
  .app-wordmark span {
    font:
      600 8px Manrope,
      sans-serif;
    letter-spacing: 0.22em;
  }
  .header-actions {
    gap: 8px;
  }
  .header-action {
    display: flex;
    align-items: center;
    gap: 7px;
    border: 0;
    padding: 9px 7px;
    border-radius: 8px;
    font:
      500 12px Manrope,
      sans-serif;
    color: var(--ink);
    background: none;
  }
  .header-action:hover,
  .header-action[aria-expanded='true'] {
    background: var(--wash);
  }
  .header-action[aria-expanded='true'] {
    color: var(--geometry);
  }
  .github-link {
    color: var(--ink);
  }
  .reader-page {
    margin: 56px 0 0 var(--reader-sidebar, 288px);
    transition: margin-left var(--sidebar-motion) ease-out;
    padding: 0 clamp(28px, 4vw, 64px);
    min-width: 0;
  }
  .selection-actions {
    position: fixed;
    bottom: 96px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 64;
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--paper);
    padding: 9px 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 8px 30px #0002;
    white-space: nowrap;
    font-size: 13px;
  }
  .selection-actions > span {
    color: var(--muted);
    font-size: 12px;
  }
  .selection-actions button {
    display: flex;
    gap: 6px;
    align-items: center;
    background: none;
    border: 0;
    padding: 5px 0;
    color: var(--geometry);
    font: inherit;
  }
  .section-rail {
    display: none;
  }
  @media (min-width: 1350px) {
    .with-outline:not(.companion-open) .reader-page {
      display: grid;
      grid-template-columns: minmax(0, 850px) 164px;
      gap: 38px;
      max-width: 1200px;
    }
    .with-outline:not(.companion-open) .section-rail {
      display: block;
      position: sticky;
      top: 112px;
      align-self: start;
      max-height: calc(100dvh - 140px);
      overflow: auto;
      padding-top: 20px;
    }
    .section-rail p {
      font:
        650 8px Manrope,
        sans-serif;
      letter-spacing: 0.2em;
      color: var(--geometry);
      margin: 0 0 22px;
    }
    .section-rail a {
      display: block;
      color: var(--muted);
      text-decoration: none;
      font:
        10px/1.65 Manrope,
        sans-serif;
      padding: 8px 0;
    }
    .section-rail a:hover {
      color: var(--ink);
    }
    .section-rail .back-top {
      color: var(--geometry);
      font-size: 9px;
      margin-top: 14px;
    }
  }
  @media (min-width: 1200px) {
    .companion-open .reader-page {
      margin-right: 432px;
      padding-inline: 36px;
    }
  }
  @media (max-width: 1000px) {
    .app-wordmark span {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .reader-page {
      margin-left: 0;
      padding: 0 24px;
    }
    .mobile-menu {
      display: flex;
    }
    .app-wordmark {
      display: none;
    }
    .reader-header {
      padding: 0 14px;
    }
  }
  @media (max-width: 500px) {
    .header-actions {
      gap: 2px;
    }
    .header-action {
      padding: 8px 5px;
    }
    .header-action span {
      font-size: 11px;
    }
    .github-link {
      display: none;
    }
    .reader-header {
      padding: 0 10px;
      gap: 8px;
    }
    .reader-page {
      padding: 0 20px;
    }
    .selection-actions > span {
      display: none;
    }
  }
</style>
