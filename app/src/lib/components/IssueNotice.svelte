<script lang="ts">
  import type { Issue } from '../types';
  let { issue, retry, dismiss }: { issue: Issue; retry?: () => void; dismiss?: () => void } =
    $props();
</script>

<div class="issue-notice" role="status">
  <p>{issue.message}</p>
  {#if issue.detail || issue.requestId}<details>
      <summary>Details</summary>
      <p>{issue.detail}</p>
      {#if issue.requestId}<code>Request: {issue.requestId}</code>{/if}
    </details>{/if}
  <div>
    {#if retry}<button onclick={retry}>Try again</button>{/if}{#if dismiss}<button onclick={dismiss}
        >Dismiss</button
      >{/if}
  </div>
</div>

<style>
  .issue-notice {
    padding: 14px 16px;
    border: 1px solid color-mix(in srgb, var(--observer) 25%, var(--line));
    border-radius: 12px;
    font-size: 14px;
    background: color-mix(in srgb, var(--observer) 4%, var(--paper));
    overflow-wrap: anywhere;
  }
  p {
    margin: 0 0 8px;
  }
  summary {
    cursor: pointer;
    color: var(--muted);
  }
  details {
    font-size: 13px;
    margin: 6px 0;
  }
  button {
    border: 0;
    background: none;
    padding: 4px 12px 4px 0;
    color: var(--geometry);
    font: inherit;
    cursor: pointer;
  }
  code {
    font-size: 12px;
  }
</style>
