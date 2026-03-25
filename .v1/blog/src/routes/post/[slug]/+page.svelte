<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import Icon from '@iconify/svelte';
  
  interface Post {
    title: string;
    description: string;
    date: string;
    categories: string[];
    author: string;
    slug: string;
  }
  
  let post: Post | null = $state(null);
  let content = $state('');
  let loading = $state(true);
  let readingProgress = $state(0);
  let readingTime = $state(0);

  onMount(async () => {
    const slug = $page.params.slug;
    try {
      const [metaRes, htmlRes] = await Promise.all([
        fetch(`${base}/data/postsMetadata.json`),
        fetch(`${base}/posts/${slug}.html`)
      ]);
      
      if (metaRes.ok && htmlRes.ok) {
        const data = await metaRes.json();
        const posts = Object.values(data) as Post[];
        post = posts.find((p) => p.slug === slug) || null;
        content = await htmlRes.text();
        
        const wordCount = content.split(/\s+/).length;
        readingTime = Math.ceil(wordCount / 200);
      }
    } catch (e) {
      console.error('Failed to load post:', e);
    }
    loading = false;
  });

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  $effect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        readingProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<svelte:head>
  <title>{post?.title || 'Loading...'} | te9.dev/blog</title>
</svelte:head>

<div class="reading-progress" style="width: {readingProgress}%"></div>

<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      <a href="{base}/" class="flex items-center gap-2">
        <span class="prompt-symbol">›</span>
        <span class="text-[#e8e8e8] font-medium">te9.dev/blog</span>
        <span class="terminal-cursor"></span>
      </a>
      <div class="flex items-center gap-6">
        <a href="{base}/" class="nav-link text-sm text-[#888888] hover:text-[#e8e8e8] transition-colors">home</a>
        <a href="{base}/#articles" class="nav-link text-sm text-[#888888] hover:text-[#e8e8e8] transition-colors">articles</a>
      </div>
    </div>
  </div>
</nav>

<main class="pt-16">
  {#if loading}
    <div class="max-w-4xl mx-auto px-6 py-20">
      <div class="animate-pulse space-y-6">
        <div class="h-8 bg-[#1a1a1a] rounded w-1/3"></div>
        <div class="h-12 bg-[#1a1a1a] rounded w-3/4"></div>
        <div class="h-6 bg-[#1a1a1a] rounded w-full"></div>
        <div class="h-6 bg-[#1a1a1a] rounded w-2/3"></div>
      </div>
    </div>
  {:else if post}
    <article class="article-wrapper">
      <header class="article-header">
        <div class="max-w-3xl mx-auto">
          <a href="{base}/" class="back-link">
            <Icon icon="mdi:arrow-left" class="text-lg" />
            <span>back to articles</span>
          </a>

          <div class="article-meta">
            <div class="meta-categories">
              {#each post.categories as cat}
                <span class="category-tag">{cat}</span>
              {/each}
            </div>
            <div class="meta-stats">
              <span class="meta-stat">
                <Icon icon="mdi:clock-outline" class="text-sm" />
                <span>{readingTime} min read</span>
              </span>
            </div>
          </div>

          <h1 class="article-title">{post.title}</h1>
          
          <p class="article-excerpt">{post.description}</p>

          <div class="article-info">
            <div class="author-info">
              <div class="author-avatar">
                <span>P</span>
              </div>
              <div class="author-details">
                <span class="author-name">{post.author}</span>
                <span class="article-date">{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="article-content">
        <div class="content-inner">
          {@html content}
        </div>
      </div>

      <footer class="article-footer">
        <div class="footer-inner">
          <div class="share-section">
            <span class="share-label">Share this article</span>
            <div class="share-buttons">
              <button class="share-btn" title="Copy link">
                <Icon icon="mdi:link-variant" />
              </button>
              <button class="share-btn" title="Share on Twitter">
                <Icon icon="mdi:twitter" />
              </button>
              <button class="share-btn" title="Share on LinkedIn">
                <Icon icon="mdi:linkedin" />
              </button>
            </div>
          </div>
          
          <div class="nav-buttons">
            <a href="{base}/" class="nav-btn nav-btn-back">
              <Icon icon="mdi:arrow-left" />
              <span>All Articles</span>
            </a>
          </div>
        </div>
      </footer>
    </article>
  {:else}
    <div class="max-w-4xl mx-auto px-6 py-20 text-center">
      <div class="not-found">
        <Icon icon="mdi:file-document-outline" class="text-6xl text-[#555555] mb-4" />
        <h2 class="text-xl text-[#888888] mb-2">Article not found</h2>
        <p class="text-[#555555] mb-6">The article you're looking for doesn't exist or has been moved.</p>
        <a href="{base}/" class="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9500] text-[#0a0a0a] rounded font-medium text-sm hover:bg-[#ffb347] transition-colors">
          <Icon icon="mdi:arrow-left" />
          <span>Back to articles</span>
        </a>
      </div>
    </div>
  {/if}
</main>

<style>
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff9500, #ffb347);
    z-index: 100;
    transition: width 0.1s ease-out;
  }

  .article-wrapper {
    max-width: 100%;
  }

  .article-header {
    background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
    border-bottom: 1px solid #2a2a2a;
    padding: 3rem 1.5rem 4rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #888888;
    font-size: 0.875rem;
    margin-bottom: 2rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #ff9500;
  }

  .article-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .meta-categories {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .category-tag {
    display: inline-block;
    font-size: 0.6875rem;
    color: #cc7700;
    background: rgba(255, 149, 0, 0.1);
    padding: 0.375rem 0.75rem;
    border-radius: 2px;
    text-transform: lowercase;
    letter-spacing: 0.05em;
  }

  .meta-stats {
    display: flex;
    gap: 1rem;
  }

  .meta-stat {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #555555;
    font-size: 0.75rem;
  }

  .article-title {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: #e8e8e8;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .article-excerpt {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #888888;
    margin-bottom: 2rem;
    max-width: 640px;
  }

  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff9500, #cc7700);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #0a0a0a;
    font-size: 1rem;
  }

  .author-details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .author-name {
    font-size: 0.9375rem;
    color: #e8e8e8;
    font-weight: 500;
  }

  .article-date {
    font-size: 0.8125rem;
    color: #555555;
  }

  .article-content {
    background: #0a0a0a;
    padding: 3rem 1.5rem;
  }

  .content-inner {
    max-width: 680px;
    margin: 0 auto;
  }

  .content-inner :global(h2) {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #e8e8e8;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid #2a2a2a;
    letter-spacing: -0.01em;
  }

  .content-inner :global(h2:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .content-inner :global(h3) {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #e8e8e8;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .content-inner :global(p) {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: #aaaaaa;
    margin-bottom: 1.5rem;
  }

  .content-inner :global(p:first-child) {
    font-size: 1.125rem;
    color: #cccccc;
  }

  .content-inner :global(strong) {
    color: #e8e8e8;
    font-weight: 600;
  }

  .content-inner :global(a) {
    color: #ff9500;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .content-inner :global(a:hover) {
    border-bottom-color: #ff9500;
  }

  .content-inner :global(ul),
  .content-inner :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .content-inner :global(li) {
    font-size: 1rem;
    line-height: 1.8;
    color: #aaaaaa;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }

  .content-inner :global(ul li::marker) {
    color: #ff9500;
    font-size: 0.875rem;
  }

  .content-inner :global(ol) {
    counter-reset: item;
  }

  .content-inner :global(ol li) {
    counter-increment: item;
    list-style: none;
    position: relative;
    padding-left: 2rem;
  }

  .content-inner :global(ol li::before) {
    content: counter(item);
    position: absolute;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(255, 149, 0, 0.1);
    color: #ff9500;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    top: 0.25rem;
  }

  .content-inner :global(blockquote) {
    margin: 2rem 0;
    padding: 1.5rem 1.75rem;
    background: #111111;
    border-left: 3px solid #ff9500;
    border-radius: 0 8px 8px 0;
  }

  .content-inner :global(blockquote p) {
    font-size: 1.125rem;
    font-style: italic;
    color: #888888;
    margin: 0;
    line-height: 1.7;
  }

  .content-inner :global(code) {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875em;
    color: #ff9500;
    background: #1a1a1a;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  .content-inner :global(pre) {
    background: #111111;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .content-inner :global(pre code) {
    background: none;
    padding: 0;
    color: #aaaaaa;
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .content-inner :global(hr) {
    border: none;
    height: 1px;
    background: #2a2a2a;
    margin: 3rem 0;
  }

  .article-footer {
    background: #0f0f0f;
    border-top: 1px solid #2a2a2a;
    padding: 2rem 1.5rem;
  }

  .footer-inner {
    max-width: 680px;
    margin: 0 auto;
  }

  .share-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 1px solid #2a2a2a;
    margin-bottom: 2rem;
  }

  .share-label {
    font-size: 0.875rem;
    color: #555555;
  }

  .share-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .share-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    color: #888888;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .share-btn:hover {
    background: #ff9500;
    border-color: #ff9500;
    color: #0a0a0a;
  }

  .nav-buttons {
    display: flex;
    justify-content: center;
  }

  .nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: transparent;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    color: #888888;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background: #ff9500;
    border-color: #ff9500;
    color: #0a0a0a;
  }

  .not-found {
    padding: 4rem 0;
  }

  @media (min-width: 768px) {
    .article-header {
      padding: 4rem 2rem 5rem;
    }

    .article-content {
      padding: 4rem 2rem;
    }

    .article-footer {
      padding: 2.5rem 2rem;
    }
  }
</style>
