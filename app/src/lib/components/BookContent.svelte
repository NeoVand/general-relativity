<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { figureLayouts, mountExperiments } from '../experiments';
  import { getReader } from '../reader.svelte';
  import type { BookPage } from '../types';
  import IssueNotice from './IssueNotice.svelte';
  import Icon from './Icon.svelte';
  let { book }: { book: BookPage } = $props();
  const reader = getReader();
  let runtimeIssue = $state('');
  let figure = $state('');
  let figureTitle = $state('');
  function mount(node: HTMLElement) {
    const controller = new AbortController();
    document.body.dataset.page = book.id;
    delete document.body.dataset.readingReady;
    const cleanupFigures = figureLayouts(node);
    void mountExperiments(controller.signal).catch(() => {
      if (!controller.signal.aborted)
        runtimeIssue =
          'The interactive models could not start. The chapter is still available to read.';
    });
    return () => {
      controller.abort();
      cleanupFigures();
    };
  }
  function action(event: MouseEvent) {
    const element = event.target instanceof Element ? event.target : null;
    const button = element?.closest<HTMLButtonElement>('[data-study-action]');
    if (button) {
      const id = button.dataset.readTarget;
      if (button.dataset.studyAction === 'listen') void reader.listen('one', id);
      else if (button.dataset.studyAction === 'explain') {
        const passage = book.segments.find((p) => p.id === id);
        if (passage) void reader.ask(`Explain this ${passage.kind}: ${passage.text}`);
      }
    }
    const zoom = element?.closest('[data-figure]');
    if (zoom) {
      const root = zoom.closest('figure');
      figure = root?.querySelector('svg')?.outerHTML || '';
      figureTitle = root?.querySelector('figcaption strong')?.textContent || 'Figure';
    }
    const filter = element?.closest<HTMLElement>('[data-filter]');
    if (filter) {
      document
        .querySelectorAll<HTMLElement>('[data-filter]')
        .forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
      document
        .querySelectorAll<HTMLElement>('.atlas-item')
        .forEach(
          (item) =>
            (item.hidden =
              filter.dataset.filter !== 'all' && item.dataset.category !== filter.dataset.filter)
        );
    }
  }
  onMount(() => {
    reader.selection = null;
  });
</script>

<svelte:head>
  <title>{book.title} · General Relativity</title>
  <meta name="description" content={book.description} />
  <link rel="stylesheet" href={`${base}/book/content.css`} />
</svelte:head>
<svelte:document onclick={action} />
{#if runtimeIssue}<div class="runtime-issue">
    <IssueNotice issue={{ message: runtimeIssue }} retry={() => location.reload()} />
  </div>{/if}
<!-- This HTML is generated from the authored manuscript at build time. Model
     replies and notebook input never enter this trusted content boundary. -->
<main id="main" tabindex="-1" class="book-content" {@attach mount}>{@html book.html}</main>
{#if figure}
  <dialog
    class="figure-overlay"
    {@attach (node) => {
      node.showModal();
      return () => node.close();
    }}
    onclose={() => (figure = '')}
  >
    <header>
      <h2>{figureTitle}</h2>
      <button class="v2-icon" aria-label="Close figure" onclick={() => (figure = '')}
        ><Icon name="close" /></button
      >
    </header>
    {@html figure}
  </dialog>
{/if}

<style>
  .book-content {
    max-width: 100%;
    min-width: 0;
    outline: none;
    padding-bottom: 140px;
  }
  .runtime-issue {
    margin: 20px auto;
    max-width: 820px;
  }
  .figure-overlay {
    width: min(1100px, 94vw);
    max-height: 90dvh;
    padding: 24px;
    background: var(--paper);
    color: var(--ink);
    border: 1px solid var(--line);
    border-radius: 20px;
  }
  .figure-overlay::backdrop {
    background: #0008;
    backdrop-filter: blur(5px);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
  h2 {
    font-size: 24px;
    margin: 0 0 20px;
  }
  .figure-overlay :global(svg) {
    max-width: 100%;
    height: auto;
  }
</style>
