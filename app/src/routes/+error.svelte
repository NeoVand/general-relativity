<script lang="ts">
  import { page } from '$app/state';
  import { base } from '$app/paths';
</script>

<main class="missing-page">
  <h1>We couldn’t open this page.</h1>
  <p>{page.error?.message}</p>
  <a href={`${base}/course-map.html`}>Return to the learning paths</a>
</main>
