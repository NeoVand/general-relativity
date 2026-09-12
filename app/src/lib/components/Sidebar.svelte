<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import type { BookEntry, BookPage } from '../types';
  import { readLocal, writeLocal } from '../storage';
  import Icon from './Icon.svelte';
  let {
    contents,
    current,
    collapsed,
    mobileOpen,
    toggle,
    closeMobile
  }: {
    contents: BookEntry[];
    current?: BookPage;
    collapsed: boolean;
    mobileOpen: boolean;
    toggle: () => void;
    closeMobile: () => void;
  } = $props();
  const parts = [
    {
      id: 'part-0',
      title: 'Foundations',
      detail: 'Clocks, rulers & motion',
      icon: 'ruler',
      color: 'observer',
      start: 0,
      end: 5
    },
    {
      id: 'part-1',
      title: 'Differential geometry',
      detail: 'Connections, curvature & tides',
      icon: 'geometry',
      color: 'geometry',
      start: 6,
      end: 10
    },
    {
      id: 'part-2',
      title: 'Matter & field equations',
      detail: 'Sources, action & symmetry',
      icon: 'function',
      color: 'curvature',
      start: 11,
      end: 15
    },
    {
      id: 'part-3',
      title: 'Applications',
      detail: 'Orbits, black holes & cosmology',
      icon: 'galaxy',
      color: 'matter',
      start: 16,
      end: 19
    },
    {
      id: 'part-4',
      title: 'Further paths',
      detail: 'Optional advanced introductions',
      icon: 'layers',
      color: 'transport',
      start: 20,
      end: 23
    },
    {
      id: 'part-5',
      title: 'Synthesis',
      detail: 'The main course comes together',
      icon: 'book',
      color: 'geometry',
      start: 24,
      end: 24
    },
    {
      id: 'notebook',
      title: 'Reference',
      detail: 'Appendices & conventions',
      icon: 'notebook',
      color: 'geometry',
      start: 25,
      end: 25
    }
  ];
  const groups = $derived(
    parts.map((part) => ({
      ...part,
      entries: contents.filter((entry) =>
        part.id === 'notebook'
          ? entry.id.startsWith('appendix-')
          : entry.id.startsWith('chapter-') &&
            Number(entry.id.slice(8)) >= part.start &&
            Number(entry.id.slice(8)) <= part.end
      )
    }))
  );
  let expanded = $state<Record<string, boolean>>(
    untrack(() =>
      Object.fromEntries(
        groups.map((group, i) => [
          group.id,
          group.entries.some((entry) => entry.id === current?.id) ||
            (current?.id === 'index' && i === 0)
        ])
      )
    )
  );
  let hydrated = $state(false);
  let sections = $state(false);
  let flyout = $state('');
  let flyoutTop = $state(100);
  let narrow = $state(false);
  let previewTrigger: HTMLElement | undefined;
  let suppressPreview = false;
  let hoverTimer: ReturnType<typeof setTimeout>;
  const isRail = $derived(collapsed && !narrow);
  const preview = $derived(groups.find((group) => group.id === flyout));
  const resources = [
    { id: 'figure-atlas', label: 'Visual atlas', icon: 'cube' },
    { id: 'course-map', label: 'Learning paths', icon: 'route' },
    { id: 'notebook', label: 'Field notebook', icon: 'notebook' },
    { id: 'credits', label: 'Edition notes', icon: 'info' }
  ];
  const containsCurrent = (entries: BookEntry[]) =>
    entries.some((entry) => entry.id === current?.id);
  function openPreview(id: string, element: HTMLElement) {
    clearTimeout(hoverTimer);
    if (suppressPreview || !isRail) return;
    previewTrigger = element;
    flyoutTop = Math.max(68, Math.min(element.getBoundingClientRect().top - 8, innerHeight - 440));
    flyout = id;
  }
  function leavePreview() {
    hoverTimer = setTimeout(() => (flyout = ''), 180);
  }
  function selectGroup(id: string, element: HTMLElement, keyboard = false) {
    if (isRail) {
      openPreview(id, element);
      if (keyboard)
        queueMicrotask(() => document.querySelector<HTMLAnchorElement>('.nav-flyout a')?.focus());
    } else {
      expanded[id] = !expanded[id];
      writeLocal('gr-nav-groups', expanded);
    }
  }
  afterNavigate(() => {
    flyout = '';
    sections = false;
    const group = groups.find((group) => containsCurrent(group.entries));
    if (group) expanded[group.id] = true;
  });
  onMount(() => {
    hydrated = true;
    const prefs = readLocal<Record<string, boolean>>('gr-nav-groups', {});
    expanded = Object.fromEntries(
      groups.map((group, i) => [
        group.id,
        containsCurrent(group.entries) || prefs[group.id] || (current?.id === 'index' && i === 0)
      ])
    );
    const media = matchMedia('(max-width:800px)');
    const resize = () => {
      narrow = media.matches;
      flyout = '';
    };
    resize();
    media.addEventListener('change', resize);
    return () => {
      media.removeEventListener('change', resize);
      clearTimeout(hoverTimer);
    };
  });
</script>

<svelte:document
  onpointerdown={(event) => {
    if (event.target instanceof Element && !event.target.closest('.nav-flyout,.group-toggle'))
      flyout = '';
  }}
/>
<svelte:window
  onkeydown={(event) => {
    if (event.key === 'Escape') {
      if (flyout && document.activeElement?.closest('.nav-flyout')) {
        suppressPreview = true;
        previewTrigger?.focus();
        suppressPreview = false;
      }
      flyout = '';
      closeMobile();
    }
  }}
/>
{#if mobileOpen}<button class="nav-backdrop" aria-label="Close contents" onclick={closeMobile}
  ></button>{/if}
<aside
  id="book-navigation"
  class={['reader-sidebar', { rail: isRail, open: mobileOpen }]}
  aria-label="Book contents"
  inert={narrow && !mobileOpen}
>
  <div class="sidebar-inner">
    <div class="sidebar-home">
      <button
        class="nav-toggle"
        disabled={!hydrated}
        aria-label={isRail ? 'Expand contents' : 'Collapse contents'}
        aria-expanded={!isRail}
        onclick={() => {
          flyout = '';
          toggle();
        }}
        title={isRail ? 'Expand contents' : 'Collapse contents'}
        ><span class="nav-glyph"><Icon name="sidebar" /></span><span
          class="sidebar-copy sidebar-title">General relativity</span
        ></button
      >
    </div>
    <nav class="sidebar-scroll chapters" aria-label="Book chapters">
      {#each groups as group (group.id)}
        <section
          class:current-group={containsCurrent(group.entries)}
          style={`--nav-accent:var(--${group.color})`}
        >
          <button
            class="group-toggle"
            disabled={!hydrated}
            aria-label={group.title}
            aria-expanded={isRail ? flyout === group.id : !!expanded[group.id]}
            aria-controls={`group-${group.id}`}
            onpointerenter={(event) => openPreview(group.id, event.currentTarget)}
            onpointerleave={leavePreview}
            onfocus={(event) => openPreview(group.id, event.currentTarget)}
            onclick={(event) => selectGroup(group.id, event.currentTarget, event.detail === 0)}
            ><span class="nav-glyph"><Icon name={group.icon} /></span><span class="sidebar-copy"
              ><span>{group.title}</span><small>{group.detail}</small></span
            ><span class="caret" class:up={expanded[group.id]}
              ><Icon name="chevron" size={12} /></span
            ></button
          >
          <div
            id={`group-${group.id}`}
            class="chapter-reveal"
            class:shown={!isRail && !!expanded[group.id]}
            inert={isRail || !expanded[group.id]}
          >
            <div class="chapter-clip">
              <div class="chapter-list">
                {#each group.entries as entry (entry.id)}<div class="chapter-row">
                    <a
                      href={`${base}/${entry.id}.html`}
                      aria-current={current?.id === entry.id ? 'page' : undefined}
                      onclick={closeMobile}
                      ><small
                        >{entry.id
                          .replace('chapter-', '')
                          .replace('appendix-', '')
                          .padStart(2, '0')}</small
                      ><span>{entry.title}</span></a
                    >{#if current?.id === entry.id}<button
                        class="section-toggle"
                        aria-label="Show sections in this chapter"
                        aria-expanded={sections}
                        onclick={() => (sections = !sections)}
                        ><Icon name="chevron" size={12} /></button
                      >{/if}
                  </div>
                  {#if current?.id === entry.id && sections}<nav
                      class="chapter-sections"
                      aria-label="Sections in this chapter"
                    >
                      {#each current.outline.filter((section) => section.level === 3) as section (section.id)}<a
                          href={`#${section.id}`}
                          onclick={closeMobile}>{section.title.replace(/^\d+[.\d]*\s*/, '')}</a
                        >{/each}
                    </nav>{/if}
                {/each}
                {#if group.id === 'notebook'}<a
                    class="reference-link"
                    href={`${base}/reading-guide.html`}
                    onclick={closeMobile}>Reading guide</a
                  ><a
                    class="reference-link"
                    href={`${base}/visual-language.html`}
                    onclick={closeMobile}>Color & notation</a
                  >{/if}
              </div>
            </div>
          </div>
        </section>
      {/each}
    </nav>
    <nav class="nav-resources" aria-label="Book resources">
      {#each resources as item (item.id)}<a
          href={`${base}/${item.id}.html`}
          aria-label={item.label}
          title={isRail ? item.label : undefined}
          aria-current={current?.id === item.id ? 'page' : undefined}
          onclick={closeMobile}
          ><span class="nav-glyph"><Icon name={item.icon} size={19} /></span><span
            class="sidebar-copy">{item.label}</span
          ></a
        >{/each}
    </nav>
  </div>
</aside>
{#if isRail && preview}
  <nav
    class="nav-flyout"
    style={`top:${flyoutTop}px;--nav-accent:var(--${preview.color})`}
    aria-label={`${preview.title} chapters`}
    onpointerenter={() => clearTimeout(hoverTimer)}
    onpointerleave={leavePreview}
  >
    <p><Icon name={preview.icon} />{preview.title}</p>
    {#each preview.entries as entry (entry.id)}<a
        href={`${base}/${entry.id}.html`}
        aria-current={current?.id === entry.id ? 'page' : undefined}
        onclick={() => (flyout = '')}
        ><small>{entry.id.replace('chapter-', '').replace('appendix-', '').padStart(2, '0')}</small
        >{entry.title}</a
      >{/each}
  </nav>
{/if}

<style>
  .reader-sidebar {
    position: fixed;
    inset: 56px auto 0 0;
    width: 288px;
    overflow: clip;
    background: var(--paper);
    z-index: 50;
    transition: width var(--sidebar-motion) ease-out;
  }
  /* As in terminalvibes, only the outer edge moves. Labels keep their full
     layout width, and every glyph keeps the same column in both states. */
  .sidebar-inner {
    width: 288px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 10px 18px;
  }
  .sidebar-home {
    height: 58px;
    flex-shrink: 0;
  }
  .nav-toggle {
    display: flex;
    align-items: center;
    gap: 0;
    background: none;
    border: 0;
    border-radius: 10px;
    width: calc(var(--reader-sidebar) - 20px);
    height: 46px;
    padding: 0;
    transition: width var(--sidebar-motion) ease-out;
    color: var(--ink);
    font:
      550 12px Manrope,
      sans-serif;
    text-align: left;
  }
  .nav-toggle:hover {
    background: var(--wash);
  }
  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    overflow-anchor: none;
    scrollbar-width: thin;
    min-height: 0;
  }
  .group-toggle {
    display: flex;
    align-items: center;
    gap: 0;
    width: calc(var(--reader-sidebar) - 20px);
    height: 56px;
    transition: width var(--sidebar-motion) ease-out;
    background: none;
    border: 0;
    padding: 10px 0;
    color: var(--muted);
    text-align: left;
    border-radius: 10px;
  }
  .group-toggle:hover {
    background: var(--wash);
    color: var(--ink);
  }
  .nav-glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 36px;
    flex: 0 0 48px;
    border-radius: 10px;
  }
  .sidebar-copy {
    display: block;
    min-width: 0;
    flex: 0 0 186px;
    white-space: nowrap;
    opacity: 1;
    visibility: visible;
    transition:
      opacity var(--sidebar-motion) ease-out,
      visibility 0s;
    line-height: 1.45;
    font:
      500 13px/1.45 Manrope,
      sans-serif;
  }
  .sidebar-title {
    font-size: 12px;
    font-weight: 550;
  }
  .sidebar-copy small {
    display: block;
    font:
      400 10px/1.5 Manrope,
      sans-serif;
    margin-top: 3px;
    color: var(--muted);
  }
  .caret {
    margin-left: auto;
    padding: 0 8px;
    display: flex;
    flex-shrink: 0;
    opacity: 1;
    visibility: visible;
    transition:
      opacity var(--sidebar-motion) ease-out,
      visibility 0s,
      transform var(--sidebar-motion) ease-out;
  }
  .caret.up {
    transform: rotate(180deg);
  }
  .current-group > .group-toggle {
    color: var(--nav-accent);
  }
  .current-group .nav-glyph {
    background: color-mix(in srgb, var(--nav-accent) 10%, transparent);
  }
  .chapter-reveal {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    visibility: hidden;
    transition:
      grid-template-rows var(--sidebar-motion) ease-out,
      opacity var(--sidebar-motion) ease-out,
      visibility 0s linear var(--sidebar-motion);
  }
  .chapter-reveal.shown {
    grid-template-rows: 1fr;
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
  .chapter-clip {
    min-height: 0;
    overflow: hidden;
  }
  .chapter-list {
    padding: 2px 0 8px 8px;
  }
  .chapter-row {
    position: relative;
  }
  .chapter-row > a,
  .nav-flyout > a {
    display: flex;
    gap: 14px;
    padding: 11px 22px 11px 12px;
    color: var(--muted);
    text-decoration: none;
    font:
      400 12px/1.55 Manrope,
      sans-serif;
    border-radius: 10px;
  }
  .chapter-row > a small,
  .nav-flyout > a small {
    font-size: 10px;
    min-width: 16px;
    opacity: 0.8;
    margin-top: 2px;
  }
  .chapter-row > a:hover,
  .nav-flyout > a:hover {
    background: var(--wash);
    color: var(--ink);
  }
  .chapter-row > [aria-current='page'],
  .nav-flyout > [aria-current='page'] {
    background: color-mix(in srgb, var(--nav-accent) 10%, transparent);
    color: var(--nav-accent);
    font-weight: 650;
  }
  .section-toggle {
    position: absolute;
    right: 2px;
    top: 12px;
    padding: 5px 3px;
    background: none;
    border: 0;
    color: var(--nav-accent);
    display: flex;
  }
  .chapter-sections {
    margin: 5px 10px 14px 26px;
    border-left: 1px solid var(--line);
    padding-left: 12px;
  }
  .chapter-sections a {
    display: block;
    font:
      11px/1.6 Manrope,
      sans-serif;
    padding: 6px;
    color: var(--muted);
    text-decoration: none;
  }
  .chapter-sections a:hover {
    color: var(--ink);
  }
  .reference-link {
    display: block;
    padding: 8px 15px;
    font-size: 12px;
    text-decoration: none;
    color: var(--muted);
  }
  .nav-resources {
    padding-top: 14px;
    flex-shrink: 0;
  }
  .nav-resources a {
    display: flex;
    align-items: center;
    gap: 0;
    width: calc(var(--reader-sidebar) - 20px);
    height: 38px;
    transition: width var(--sidebar-motion) ease-out;
    text-decoration: none;
    color: var(--muted);
    border-radius: 10px;
    padding: 0 0 2px;
  }
  .nav-resources .sidebar-copy {
    font-size: 11px;
  }
  .nav-resources a:hover,
  .nav-resources a[aria-current='page'] {
    background: var(--wash);
    color: var(--ink);
  }
  .rail {
    width: 68px;
  }
  .rail .sidebar-copy,
  .rail .caret {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--sidebar-motion) ease-out,
      visibility 0s linear var(--sidebar-motion);
  }
  .nav-flyout {
    position: fixed;
    left: 76px;
    width: 280px;
    max-height: calc(100dvh - 100px);
    overflow: auto;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 10px;
    box-shadow: 0 12px 40px #0003;
    z-index: 80;
  }
  .nav-flyout p {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 10px 12px;
    margin: 0;
    font:
      600 13px Manrope,
      sans-serif;
    color: var(--nav-accent);
  }
  .nav-backdrop {
    display: none;
  }
  @media (max-width: 800px) {
    .reader-sidebar {
      transform: translateX(-100%);
      --reader-sidebar: 280px;
      width: 280px;
      transition: transform var(--sidebar-motion) ease-out;
      border-right: 1px solid var(--line);
    }
    .sidebar-inner {
      width: 280px;
    }
    .sidebar-copy {
      flex-basis: 178px;
    }
    .reader-sidebar.open {
      transform: none;
    }
    .nav-backdrop {
      display: block;
      position: fixed;
      inset: 56px 0 0;
      background: #0004;
      border: 0;
      z-index: 49;
    }
  }
</style>
