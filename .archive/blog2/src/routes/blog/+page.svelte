<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let selected = $state('');
	
	function onSelect(slug: string) {
		selected = slug;
	}
	
	const filteredPosts = $derived(
		selected 
			? data.posts.filter(p => p.category.slug === selected || p.tags.includes(selected))
			: data.posts
	);

	const gradients = [
		'from-indigo-600 to-purple-800',
		'from-orange-500 to-red-700',
		'from-emerald-600 to-teal-900',
		'from-blue-600 to-cyan-800',
		'from-pink-500 to-rose-700',
		'from-violet-600 to-indigo-900'
	];
</script>

<svelte:head>
	<title>Journal - Studio</title>
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 px-6 md:px-12">
	<div class="max-w-7xl mx-auto">
		<h1 class="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-8 max-w-4xl">
			Thoughts on design, technology, and culture.
		</h1>
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
			<p class="text-lg text-zinc-400 max-w-md">
				A curated collection of stories, insights, and studio updates.
			</p>
			<div class="flex items-center gap-3">
				<span class="text-xs text-zinc-500 uppercase tracking-wide">Filter by</span>
				<button
					class="px-4 py-2 {selected === '' ? 'border border-zinc-700 bg-zinc-800' : ''} rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors"
					onclick={() => onSelect('')}
				>
					All
				</button>
				{#each data.categories as category}
					<button
						class="px-4 py-2 {selected === category.slug ? 'border border-zinc-700 bg-zinc-800' : ''} rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors"
						onclick={() => onSelect(category.slug)}
					>
						{category.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Bento Grid Layout -->
<section class="px-6 md:px-12 pb-24">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[300px]">
			{#each filteredPosts as post, i}
				{#if i === 0}
					<!-- Featured Large Card (2x2) -->
					<a 
						href="/blog/{post.slug}" 
						class="bento-card col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden bg-zinc-900 group"
					>
						<div class="absolute inset-0">
							<img
								src="https://picsum.photos/seed/{post.slug}/800/800"
								alt={post.title}
								class="card-image w-full h-full object-cover opacity-60"
							/>
							<div class="gradient-overlay absolute inset-0"></div>
						</div>
						<div class="absolute top-6 left-6 z-10">
							<span class="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
								Featured
							</span>
						</div>
						<div class="absolute bottom-0 left-0 right-0 p-8 z-10 card-content">
							<span class="text-xs text-zinc-300 uppercase tracking-widest mb-2 block">
								{post.category.label}
							</span>
							<h2 class="text-3xl md:text-4xl font-semibold leading-tight mb-3">
								{post.title}
							</h2>
							<p class="text-sm text-zinc-300 leading-relaxed max-w-md mb-4">
								{post.excerpt}
							</p>
							<div class="flex items-center justify-between">
								<span class="text-xs text-zinc-500">{post.dateShort}</span>
								<span class="iconify text-2xl text-white" data-icon="mdi:arrow-top-right"></span>
							</div>
						</div>
					</a>
				{:else if i === 1 || i === 2}
					<!-- Standard Cards (1x1) -->
					<a 
						href="/blog/{post.slug}" 
						class="bento-card relative rounded-3xl overflow-hidden bg-zinc-900 group"
					>
						<div class="absolute inset-0 bg-gradient-to-br {gradients[i % gradients.length]} opacity-40"></div>
						<div class="absolute inset-0 p-6 flex flex-col justify-between">
							<div>
								<span class="text-xs text-zinc-300 uppercase tracking-widest mb-2 block">
									{post.category.label}
								</span>
								<h3 class="text-xl font-semibold leading-tight">{post.title}</h3>
							</div>
							<div class="flex items-center justify-between card-content">
								<span class="text-xs text-zinc-400">{post.readingTimeShort}</span>
								<span class="iconify text-xl text-white" data-icon="mdi:arrow-right"></span>
							</div>
						</div>
					</a>
				{:else if i === 3}
					<!-- Wide Card (2x1) -->
					<a 
						href="/blog/{post.slug}" 
						class="bento-card col-span-1 md:col-span-2 relative rounded-3xl overflow-hidden bg-zinc-900 group"
					>
						<div class="absolute inset-0">
							<img
								src="https://picsum.photos/seed/{post.slug}/800/400"
								alt={post.title}
								class="card-image w-full h-full object-cover opacity-50"
							/>
						</div>
						<div class="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
							<span class="text-xs text-zinc-300 uppercase tracking-widest mb-2">
								{post.category.label}
							</span>
							<h2 class="text-2xl md:text-3xl font-semibold leading-tight mb-2">
								{post.title}
							</h2>
							<p class="text-sm text-zinc-400 max-w-sm">{post.excerpt}</p>
						</div>
						<div class="absolute top-6 right-6 z-10">
							<span class="iconify text-2xl text-white opacity-50 group-hover:opacity-100 transition-opacity" data-icon="mdi:arrow-top-right"></span>
						</div>
					</a>
				{:else}
					<!-- Standard Cards (1x1) with image -->
					<a 
						href="/blog/{post.slug}" 
						class="bento-card relative rounded-3xl overflow-hidden bg-zinc-900 group"
					>
						<div class="absolute inset-0">
							<img
								src="https://picsum.photos/seed/{post.slug}/400/400"
								alt={post.title}
								class="card-image w-full h-full object-cover opacity-60"
							/>
						</div>
						<div class="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/80 to-transparent">
							<span class="text-xs text-zinc-300 uppercase tracking-widest mb-1">
								{post.category.label}
							</span>
							<h3 class="text-lg font-semibold leading-tight">{post.title}</h3>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- Marquee Section -->
<section class="border-t border-b border-zinc-800 py-6 overflow-hidden mb-24">
	<div class="marquee flex whitespace-nowrap">
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Design</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Develop</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Create</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Design</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Develop</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">Create</span>
		<span class="text-5xl md:text-6xl font-bold text-zinc-800 mx-8">•</span>
	</div>
</section>
