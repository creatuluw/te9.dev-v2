<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
	<script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>" />
</svelte:head>

<div class="bg-zinc-950 text-white min-h-screen">
	<!-- Navigation -->
	<header class="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 bg-zinc-950/80 backdrop-blur-md">
		<nav class="max-w-7xl mx-auto flex items-center justify-between">
			<a href="/" class="text-lg font-bold tracking-tight">
				Studio<span class="text-zinc-500">.</span>
			</a>
			<div class="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center gap-8">
				<a href="/" class="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Home</a>
				<a href="/blog" class="text-xs uppercase tracking-widest text-white hover:text-zinc-400 transition-colors">Journal</a>
				<a href="/blog" class="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">About</a>
			</div>
			<a href="mailto:hello@studio.com" class="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wide rounded-full hover:bg-zinc-200 transition-colors">
				<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
				Contact
			</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="px-6 md:px-12 py-16 bg-black border-t border-zinc-900">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
				<div class="md:col-span-2">
					<h3 class="text-3xl font-semibold mb-4">
						Let's build something <br />great together.
					</h3>
					<a href="mailto:hello@studio.com" class="text-lg text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 pb-1">
						hello@studio.com
					</a>
				</div>
				<div>
					<h4 class="text-xs uppercase tracking-widest text-zinc-500 mb-4">Navigation</h4>
					<ul class="space-y-3">
						<li><a href="/" class="text-zinc-300 hover:text-white transition-colors">Home</a></li>
						<li><a href="/blog" class="text-zinc-300 hover:text-white transition-colors">Journal</a></li>
						<li><a href="/blog" class="text-zinc-300 hover:text-white transition-colors">About</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-xs uppercase tracking-widest text-zinc-500 mb-4">Connect</h4>
					<ul class="space-y-3">
						<li><a href="#" class="text-zinc-300 hover:text-white transition-colors">Twitter</a></li>
						<li><a href="#" class="text-zinc-300 hover:text-white transition-colors">GitHub</a></li>
						<li><a href="#" class="text-zinc-300 hover:text-white transition-colors">LinkedIn</a></li>
					</ul>
				</div>
			</div>
			<div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900">
				<p class="text-xs text-zinc-600 mb-4 md:mb-0">© 2024 Studio. All rights reserved.</p>
				<p class="text-xs text-zinc-600">Designed with precision.</p>
			</div>
		</div>
	</footer>
</div>
