<script lang="ts">
  import BookContent from '$lib/components/BookContent.svelte';
  let { data } = $props();
</script>

<BookContent book={data.book} />
