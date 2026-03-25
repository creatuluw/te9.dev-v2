<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Icon from '@iconify/svelte';
  
  interface Post {
    title: string;
    description: string;
    date: string;
    categories: string[];
    author: string;
    slug: string;
    pin?: boolean;
  }
  
  let posts: Post[] = $state([]);
  let categories: string[] = $state([]);
  let selectedCategory = $state('All Posts');
  let loading = $state(true);

  const categoryColors: Record<string, string> = {
    'Technology': 'amber',
    'Typography': 'amber',
    'Philosophy': 'amber',
    'Design': 'amber',
    'Accessibility': 'amber',
    'Inspiration': 'amber',
    'Web': 'amber',
    'Welcome': 'amber',
    'About': 'amber'
  };

  const categoryIcons: Record<string, string> = {
    'Technology': 'mdi:rocket-launch-outline',
    'Typography': 'mdi:format-font',
    'Philosophy': 'mdi:puzzle-outline',
    'Design': 'mdi:palette-outline',
    'Accessibility': 'mdi:wheelchair-accessibility',
    'Inspiration': 'mdi:lightning-bolt-outline',
    'Web': 'mdi:web',
    'Welcome': 'mdi:star-outline',
    'About': 'mdi:information-outline'
  };

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function getCategoryIcon(cat: string): string {
    return categoryIcons[cat] || 'mdi:article-outline';
  }

  onMount(async () => {
    try {
      const res = await fetch(`${base}/data/postsMetadata.json`);
      if (res.ok) {
        const data = await res.json();
        const arr = Object.values(data) as Post[];
        posts = arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const cats = new Set<string>();
        posts.forEach((p) => p.categories?.forEach((c) => cats.add(c)));
        categories = ['All Posts', ...Array.from(cats)];
      }
    } catch (e) {
      console.error('Failed to load posts:', e);
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>te9.dev/blog</title>
</svelte:head>

<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      <a href="{base}/" class="flex items-center gap-2">
        <span class="prompt-symbol">›</span>
        <span class="text-[#e8e8e8] font-medium">te9.dev/blog</span>
        <span class="terminal-cursor"></span>
      </a>
      <div class="flex items-center gap-6">
        <a href="{base}/" class="nav-link text-sm text-[#e8e8e8]">home</a>
        <a href="#articles" class="nav-link text-sm text-[#888888] hover:text-[#e8e8e8] transition-colors">articles</a>
      </div>
    </div>
  </div>
</nav>

<main class="pt-16">
  {#if !loading && posts.length > 0}
    {@const featured = posts.find(p => p.pin) || posts[0]}
    <section class="relative min-h-[70vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="deco-ring deco-ring-1"></div>
        <div class="deco-ring deco-ring-2"></div>
        <div class="deco-ring deco-ring-3"></div>
      </div>
      <div class="relative max-w-3xl mx-auto px-6 py-16 w-full text-center">
        <div class="mb-6">
          <span class="text-[#555555]">[</span>
          <span class="text-[#ff9500] text-sm tracking-wider">{featured.pin ? 'pinned' : 'latest'}</span>
          <span class="text-[#555555]">]</span>
        </div>
        <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#e8e8e8]">
          {featured.title}
        </h1>
        <p class="text-[#888888] text-lg leading-relaxed mb-6 max-w-xl mx-auto">
          {featured.description}
        </p>
        <div class="flex items-center justify-center gap-4 mb-8">
          <span class="text-[#555555] text-sm">{formatDate(featured.date)}</span>
          <span class="text-[#555555]">•</span>
          <span class="text-[#888888] text-sm">{featured.author}</span>
        </div>
        <a href="{base}/post/{featured.slug}" class="inline-flex items-center gap-2 px-6 py-3 bg-[#ff9500] text-[#0a0a0a] rounded font-semibold text-sm hover:bg-[#ffb347] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,149,0,0.3)]">
          <span>read article</span>
          <span>→</span>
        </a>
      </div>
    </section>
  {/if}

  <section id="articles" class="border-y border-[#2a2a2a] bg-[#111111]">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center gap-3 overflow-x-auto no-scrollbar">
        <span class="text-sm text-[#555555] shrink-0">filter:</span>
        {#each categories as cat}
          <button 
            class="px-4 py-2 text-sm rounded shrink-0 transition-colors {selectedCategory === cat ? 'bg-[#ff9500] text-[#0a0a0a]' : 'bg-[#1a1a1a] text-[#888888] hover:bg-[#2a2a2a]'}"
            onclick={() => selectedCategory = cat}
          >
            {cat}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-16 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-12">
        <span class="text-[#ff9500] text-sm">// recent</span>
        <h2 class="font-heading text-3xl md:text-4xl font-bold mt-2 text-[#e8e8e8]">Articles</h2>
      </div>

      {#if loading}
        <div class="text-center py-20 text-[#555555]">Loading...</div>
      {:else if posts.length === 0}
        <div class="text-center py-20 text-[#555555]">No articles found.</div>
      {:else}
        {@const featured = posts.find(p => p.pin) || posts[0]}
        {@const displayPosts = selectedCategory === 'All Posts' ? posts.filter(p => p.slug !== featured.slug) : posts.filter(p => p.categories.includes(selectedCategory) && p.slug !== featured.slug)}
        {#if displayPosts.length === 0}
          <div class="text-center py-20 text-[#555555]">No articles in this category.</div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each displayPosts as post}
              {@const cat = post.categories[0] || 'General'}
              <a href="{base}/post/{post.slug}" class="article-card relative bg-[#141414] rounded-lg overflow-hidden border border-[#2a2a2a] block">
                <div class="card-top-line"></div>
                <div class="aspect-[16/10] relative bg-[#1a1a1a] flex items-center justify-center">
                  <Icon icon={getCategoryIcon(cat)} class="text-5xl text-[#555555]" />
                  <div class="absolute top-4 left-4">
                    <span class="feature-tag">{cat}</span>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-3 mb-3 text-xs text-[#555555]">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 class="font-heading text-lg font-semibold mb-3 text-[#e8e8e8]">
                    {post.title}
                  </h3>
                  <p class="text-[#888888] text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      {/if}
    </div>
  </section>

  <section class="relative bg-[#111111] border-t border-[#2a2a2a]">
    <div class="max-w-3xl mx-auto px-6 py-20 text-center">
      <div class="mb-6">
        <span class="text-[#555555]">[</span>
        <span class="text-[#ff9500] text-sm tracking-wider">newsletter</span>
        <span class="text-[#555555]">]</span>
      </div>
      <h2 class="font-heading text-3xl md:text-4xl font-bold mb-4 text-[#e8e8e8]">Stay Updated</h2>
      <p class="text-[#888888] text-lg mb-8 max-w-xl mx-auto">
        Get the latest articles delivered to your inbox.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" placeholder="email@example.com" class="flex-1 px-5 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded text-[#e8e8e8] placeholder-[#555555] focus:outline-none focus:border-[#ff9500] transition-colors" />
        <button class="px-6 py-3 bg-[#ff9500] text-[#0a0a0a] rounded font-semibold hover:bg-[#ffb347] transition-colors">
          subscribe
        </button>
      </div>
    </div>
  </section>
</main>

<footer class="bg-[#111111] border-t border-[#2a2a2a]">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 mb-4">
          <span class="prompt-symbol text-xl">›</span>
          <span class="text-[#e8e8e8] font-medium text-lg">te9.dev/blog</span>
        </div>
        <p class="text-[#555555] text-sm leading-relaxed max-w-sm">
          Thoughts on design, technology, and the creative process.
        </p>
      </div>
      <div>
        <h4 class="font-heading font-semibold mb-4 text-[#e8e8e8]">Explore</h4>
        <ul class="space-y-2 text-sm text-[#888888]">
          <li><a href="/" class="hover:text-[#ff9500] transition-colors">All Articles</a></li>
          <li><a href="#articles" class="hover:text-[#ff9500] transition-colors">Categories</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-heading font-semibold mb-4 text-[#e8e8e8]">Connect</h4>
        <div class="flex gap-3">
          <a href="#" class="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center text-[#888888] hover:bg-[#ff9500] hover:text-[#0a0a0a] transition-all">
            <Icon icon="mdi:twitter" class="text-lg" />
          </a>
          <a href="#" class="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center text-[#888888] hover:bg-[#ff9500] hover:text-[#0a0a0a] transition-all">
            <Icon icon="mdi:github" class="text-lg" />
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-[#2a2a2a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-xs text-[#555555]">© 2026 te9.dev</p>
      <div class="flex items-center gap-2 text-xs text-[#555555]">
        <div class="status-dot"></div>
        <span>all systems operational</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .deco-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid #2a2a2a;
    opacity: 0.3;
    pointer-events: none;
  }
  .deco-ring-1 {
    width: 300px;
    height: 300px;
    animation: pulse 4s ease-in-out infinite;
  }
  .deco-ring-2 {
    width: 450px;
    height: 450px;
    animation: pulse 4s ease-in-out infinite 0.5s;
  }
  .deco-ring-3 {
    width: 600px;
    height: 600px;
    animation: pulse 4s ease-in-out infinite 1s;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.05); }
  }
</style>
