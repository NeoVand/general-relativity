<script lang="ts">
  import { onMount } from 'svelte';
  import { getReader, type SearchResult } from '../reader.svelte';
  import { base } from '$app/paths';
  import Icon from './Icon.svelte';
  let { open = $bindable(false) }: { open?: boolean } = $props();
  const reader = getReader();
  let hydrated = $state(false);
  onMount(() => (hydrated = true));
  let root: HTMLDivElement;
  let trigger: HTMLButtonElement;
  let query = $state('');
  let results = $state.raw<SearchResult[]>([]);
  let error = $state('');
  let searching = $state(false);
  let active = $state(-1);
  let generation = 0;
  function close(restoreFocus = false) {
    open = false;
    if (restoreFocus) trigger?.focus();
  }
  async function search() {
    const token = ++generation;
    error = '';
    active = -1;
    searching = true;
    try {
      const found = await reader.search(query);
      if (token === generation) results = found;
    } catch {
      if (token === generation) error = 'The book index could not load. Try again.';
    } finally {
      if (token === generation) searching = false;
    }
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close(true);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(
        0,
        Math.min(results.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1))
      );
      document.getElementById(`search-result-${active}`)?.scrollIntoView({ block: 'nearest' });
    }
    if (event.key === 'Enter' && results.length) {
      event.preventDefault();
      document.getElementById(`search-result-${Math.max(0, active)}`)?.click();
    }
  }
</script>

<svelte:document
  onpointerdown={(event) => {
    if (open && event.target instanceof Node && !root?.contains(event.target)) close();
  }}
/>
<div class={['header-search', { open }]} bind:this={root} role="search">
  <button
    class="search-trigger"
    disabled={!hydrated}
    aria-label="Search the book"
    title="Search · ⌘ / Ctrl K"
    aria-expanded={open}
    bind:this={trigger}
    onclick={() => (open = !open)}
    ><Icon name="search" size={20} />{#if !open}<span>Search</span>{/if}</button
  >
  {#if open}
    <input
      type="search"
      role="combobox"
      aria-label="Search the book"
      aria-expanded="true"
      aria-controls="book-search-results"
      aria-autocomplete="list"
      aria-activedescendant={active >= 0 ? `search-result-${active}` : undefined}
      bind:value={query}
      oninput={search}
      onkeydown={keydown}
      {@attach (node) => node.focus()}
      placeholder="Find an idea…"
      autocomplete="off"
    />
    <button class="v2-icon" aria-label="Close search" onclick={() => close(true)}
      ><Icon name="close" size={16} /></button
    >
    <div class="search-popover">
      {#if error}<p>{error}</p>{:else if !query.trim()}<p class="eyeline">EXPLORE THE BOOK</p>
        <div class="suggestions">
          {#each ['Proper time', 'Geodesics', 'Curvature', 'Black holes'] as text (text)}<button
              onclick={() => {
                query = text;
                void search();
              }}>{text}</button
            >{/each}
        </div>{:else if !results.length}<p role="status">
          {searching ? 'Searching…' : 'No matching passages.'}
        </p>{/if}
      <div id="book-search-results" role="listbox" aria-label="Matching passages">
        {#each results as result, i (`${result.page}:${result.passage}`)}<a
            id={`search-result-${i}`}
            role="option"
            aria-selected={active === i}
            href={`${base}/${result.page}.html#${result.passage}`}
            onclick={() => close()}
            ><small>{result.page.replace('chapter-', 'Chapter ')}</small><strong
              >{result.title}</strong
            ><span>{result.text.slice(0, 150)}</span></a
          >{/each}
      </div>
      <div class="search-hint">↑ ↓ to explore · Enter to open <span>Esc to close</span></div>
    </div>
  {/if}
</div>

<style>
  .header-search {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    border: 1px solid transparent;
    border-radius: 9px;
    height: 36px;
  }
  .header-search.open {
    background: var(--wash);
    border-color: var(--line);
  }
  .search-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px;
    background: none;
    border: 0;
    color: var(--muted);
    font:
      12px Manrope,
      sans-serif;
    border-radius: 8px;
  }
  .search-trigger:hover {
    background: var(--wash);
    color: var(--ink);
  }
  input {
    width: 190px;
    min-width: 0;
    border: 0;
    background: none;
    color: var(--ink);
    font:
      13px Manrope,
      sans-serif;
    outline: none;
    padding: 5px 0;
  }
  .search-popover {
    position: absolute;
    right: 0;
    top: 44px;
    width: 360px;
    max-height: min(480px, 70dvh);
    overflow: auto;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 13px;
    box-shadow: 0 12px 40px #0002;
    padding: 12px;
    z-index: 80;
  }
  .search-popover p {
    font:
      12px/1.6 Manrope,
      sans-serif;
    color: var(--muted);
    margin: 8px;
  }
  .eyeline {
    letter-spacing: 0.12em;
    font-size: 9px !important;
  }
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin: 14px 6px 18px;
  }
  .suggestions button {
    border: 1px solid var(--line);
    background: var(--wash);
    border-radius: 7px;
    color: var(--ink);
    padding: 7px 9px;
    font:
      12px Manrope,
      sans-serif;
  }
  a {
    display: block;
    padding: 11px;
    border-radius: 9px;
    color: var(--ink);
    text-decoration: none;
  }
  a:hover,
  a[aria-selected='true'] {
    background: var(--wash);
  }
  a small {
    font:
      10px Manrope,
      sans-serif;
    color: var(--geometry);
  }
  a strong {
    display: block;
    font:
      500 14px/1.5 Manrope,
      sans-serif;
    margin: 4px 0;
  }
  a span {
    display: block;
    font:
      11px/1.6 Manrope,
      sans-serif;
    color: var(--muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-hint {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--line);
    padding: 10px 6px 0;
    font:
      10px Manrope,
      sans-serif;
    color: var(--muted);
    margin-top: 6px;
  }
  @media (max-width: 650px) {
    .search-trigger span {
      display: none;
    }
    .header-search.open {
      position: absolute;
      left: 54px;
      right: 12px;
      top: 10px;
      background: var(--paper);
      z-index: 82;
    }
    .header-search.open input {
      flex: 1;
      width: 0;
    }
    .search-popover {
      width: min(360px, calc(100vw - 24px));
      right: 0;
    }
  }
</style>
