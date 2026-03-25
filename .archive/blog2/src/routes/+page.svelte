<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	if (browser) {
		goto('/blog');
	}
</script>

<div class="pt-32 px-6 md:px-12">
	<div class="max-w-7xl mx-auto text-center">
		<p class="text-zinc-400">Redirecting to Journal...</p>
	</div>
</div>
