<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Lekton:wght@400;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="noise-overlay"></div>
<div class="scanlines"></div>
{@render children()}
