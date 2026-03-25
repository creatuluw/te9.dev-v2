<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} - Studio Journal</title>
	<meta name="description" content={data.post.excerpt} />
</svelte:head>

<!-- Back Navigation -->
<div class="pt-32 px-6 md:px-12">
	<div class="max-w-7xl mx-auto">
		<a href="/blog" class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
			<span class="iconify text-lg" data-icon="mdi:arrow-left"></span>
			Back to Journal
		</a>
	</div>
</div>

<!-- Article Header -->
<section class="pt-8 pb-16 px-6 md:px-12">
	<div class="max-w-4xl mx-auto">
		<span class="text-xs text-zinc-400 uppercase tracking-widest mb-4 block">
			{data.post.category.label}
		</span>
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
			{data.post.title}
		</h1>
		<div class="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
			<div class="flex items-center gap-3">
				<img src={data.post.author.avatar} alt={data.post.author.name} class="w-10 h-10 rounded-full object-cover" />
				<div>
					<div class="font-medium text-white">{data.post.author.name}</div>
					<div class="text-xs text-zinc-500">{data.post.author.title}</div>
				</div>
			</div>
			<span class="text-zinc-700">•</span>
			<span>{data.post.dateLong}</span>
			<span class="text-zinc-700">•</span>
			<span>{data.post.readingTimeLong}</span>
		</div>
	</div>
</section>

<!-- Cover Image -->
{#if data.post.cover}
	<section class="px-6 md:px-12 pb-16">
		<div class="max-w-5xl mx-auto">
			<img src={data.post.cover} alt={data.post.title} class="w-full rounded-2xl" />
		</div>
	</section>
{/if}

<!-- Article Content -->
<section class="px-6 md:px-12 pb-24">
	<article class="max-w-3xl mx-auto prose prose-lg prose-invert">
		{@html data.post.html}
	</article>
</section>

<!-- Navigation Between Posts -->
<section class="px-6 md:px-12 pb-24 border-t border-zinc-800">
	<div class="max-w-7xl mx-auto py-12">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#if data.previous}
				<a href="/blog/{data.previous.slug}" class="group p-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-colors">
					<span class="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Previous</span>
					<h3 class="text-lg font-semibold group-hover:text-zinc-300 transition-colors">{data.previous.title}</h3>
				</a>
			{:else}
				<div></div>
			{/if}
			{#if data.next}
				<a href="/blog/{data.next.slug}" class="group p-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-colors text-right">
					<span class="text-xs text-zinc-500 uppercase tracking-widest mb-2 block">Next</span>
					<h3 class="text-lg font-semibold group-hover:text-zinc-300 transition-colors">{data.next.title}</h3>
				</a>
			{/if}
		</div>
	</div>
</section>
