<script lang="ts">
  import BookContent from '$lib/components/BookContent.svelte';
  let { data } = $props();
</script>

{#key data.book.id}<BookContent book={data.book} />{/key}
