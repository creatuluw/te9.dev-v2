<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Type definitions for SVG paths
    type PathData =
        | {
              d: string;
              rect?: undefined;
              polyline?: undefined;
              line?: undefined;
              circle?: undefined;
          }
        | {
              d?: undefined;
              rect: {
                  x: string;
                  y: string;
                  width: string;
                  height: string;
                  rx: string;
              };
              polyline?: undefined;
              line?: undefined;
              circle?: undefined;
          }
        | {
              d?: undefined;
              rect?: undefined;
              polyline: { points: string };
              line?: undefined;
              circle?: undefined;
          }
        | {
              d?: undefined;
              rect?: undefined;
              polyline?: undefined;
              line: { x1: string; y1: string; x2: string; y2: string };
              circle?: undefined;
          }
        | {
              d?: undefined;
              rect?: undefined;
              polyline?: undefined;
              line?: undefined;
              circle: { cx: string; cy: string; r: string };
          };

    interface GardenCard {
        paths: PathData[];
        title: string;
        desc: string;
        tag: string;
    }

    interface QuickLink {
        href: string;
        name: string;
        desc: string;
    }

    // Garden cards data
    const gardenCards: GardenCard[] = [
        {
            paths: [
                { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" },
                { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" },
                { d: "M7 21h10" },
                { d: "M12 3v18" },
                { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" },
            ],
            title: "Dev Playground",
            desc: "Experiments, prototypes, and side projects. A sandbox for trying new technologies and approaches without constraints.",
            tag: "experiments",
        },
        {
            paths: [
                { d: "M12 3v18" },
                {
                    rect: {
                        x: "4",
                        y: "8",
                        width: "16",
                        height: "12",
                        rx: "2",
                    },
                },
                { d: "m8 12 4 4 4-4" },
            ],
            title: "Starter Kits",
            desc: "Quick shortcuts to project templates and boilerplate. Jump-start new projects with battle-tested configurations.",
            tag: "templates",
        },
        {
            paths: [
                {
                    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
                },
                {
                    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
                },
            ],
            title: "Link Collection",
            desc: "Curated bookmarks and resources I keep coming back to. Tools, articles, and references worth sharing.",
            tag: "bookmarks",
        },
        {
            paths: [
                {
                    d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
                },
                { polyline: { points: "17 21 17 13 7 13 7 21" } },
                { polyline: { points: "7 3 7 8 15 8" } },
            ],
            title: "Personal Preferences",
            desc: "Configs, settings, and preferences I use across projects. A personal reference for consistency.",
            tag: "config",
        },
        {
            paths: [
                {
                    d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
                },
                { polyline: { points: "14 2 14 8 20 8" } },
                { line: { x1: "16", y1: "13", x2: "8", y2: "13" } },
                { line: { x1: "16", y1: "17", x2: "8", y2: "17" } },
            ],
            title: "Notes & Articles",
            desc: "Personal notes on topics I'm exploring. From technical deep-dives to random interests and learnings.",
            tag: "knowledge",
        },
        {
            paths: [
                { circle: { cx: "12", cy: "12", r: "10" } },
                { d: "M12 16v-4" },
                { d: "M12 8h.01" },
            ],
            title: "Sharing & Resources",
            desc: "Tools, thoughts, and resources shared with the world. If it helped me, maybe it'll help you too.",
            tag: "open",
        },
    ];

    // Quick links data
    const quickLinks: QuickLink[] = [
        {
            href: "https://patrick.te9.nl",
            name: "patrick.te9.nl",
            desc: "Main personal site",
        },
        {
            href: "https://patrick.te9.nl/wip/",
            name: "Work in progress",
            desc: "Building and testing",
        },
        {
            href: "https://te9.dev/blog/",
            name: "Blog",
            desc: "Thoughts & writings",
        },
        {
            href: "https://patrick.te9.nl/resume/",
            name: "Resume",
            desc: "Work experience",
        },
        {
            href: "https://github.com/creatuluw",
            name: "GitHub",
            desc: "@creatuluw",
        },
    ];

    // Terminal typing effect
    let typedText = $state("");
    const fullText = "te9.dev";
    let cursorVisible = $state(true);

    // Cursor blink
    $effect(() => {
        const interval = setInterval(() => {
            cursorVisible = !cursorVisible;
        }, 500);
        return () => clearInterval(interval);
    });

    // Typing effect
    $effect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                typedText = fullText.slice(0, i + 1);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    });

    // Nav scroll state
    let navScrolled = $state(false);

    function handleScroll() {
        navScrolled = window.scrollY > 100;
    }

    $effect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<svelte:head>
    <title>te9.dev — Patrick's Digital Garden</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Lekton:wght@400;700&display=swap"
        rel="stylesheet"
        crossorigin="anonymous"
    />
</svelte:head>

<div
    class="relative min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-[Lekton] overflow-x-hidden"
>
    <!-- Noise overlay -->
    <div class="noise-overlay"></div>

    <!-- Scanlines -->
    <div class="scanlines"></div>

    <!-- Navigation -->
    <nav
        class={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 border-b border-[#2a2a2a] ${navScrolled ? "bg-[#0a0a0a]/98 backdrop-blur-[10px] shadow-lg" : "bg-[#0a0a0a]/90 backdrop-blur-[10px]"}`}
    >
        <div
            class="max-w-[1400px] mx-auto px-8 py-0 flex items-center justify-between h-[60px]"
        >
            <a
                href="#/"
                aria-label="Home"
                class="font-[JetBrains_Mono] text-[1rem] flex items-center gap-[0.25rem] no-underline text-inherit hover:text-[#ff9500] transition-colors"
            >
                <span class="text-[#ff9500] font-bold">›</span>
                <span class="text-[#e8e8e8] font-medium">{typedText}</span>
                <span
                    class={`text-[#ff9500] ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                    >_</span
                >
            </a>
            <div
                class="font-[JetBrains_Mono] text-[0.875rem] flex items-center gap-8"
            >
                <a
                    href="about.html"
                    class="text-[#888888] lowercase no-underline transition-colors hover:text-[#e8e8e8] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[#ff9500] after:transition-all after:duration-300 hover:after:w-full"
                    >about</a
                >
                <a
                    href="#garden"
                    class="text-[#888888] lowercase no-underline transition-colors hover:text-[#e8e8e8] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[#ff9500] after:transition-all after:duration-300 hover:after:w-full"
                    >garden</a
                >
                <a
                    href="#links"
                    class="text-[#888888] lowercase no-underline transition-colors hover:text-[#e8e8e8] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[#ff9500] after:transition-all after:duration-300 hover:after:w-full"
                    >links</a
                >
                <a
                    href="https://patrick.te9.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#888888] lowercase no-underline transition-colors hover:text-[#e8e8e8]"
                    >patrick.te9.nl →</a
                >
            </div>
        </div>
    </nav>

    <main class="pt-[60px]">
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <div class="hero-label">
                    <span class="label-bracket">[</span>
                    <span class="label-text">digital-garden</span>
                    <span class="label-bracket">]</span>
                </div>
                <h1 class="hero-title hero-title-single">
                    <span class="title-main">te9.dev</span>
                </h1>
                <p class="hero-subtitle">
                    Playground. Garden. Archive.<br />
                    <span class="subtitle-accent">Everything in one place.</span
                    >
                </p>
                <p class="hero-description">
                    A personal corner of the web for dev experiments, starter
                    kits, notes, tools, and resources. Built to share, designed
                    to grow.
                </p>
                <div class="hero-cta">
                    <a href="#garden" class="btn btn-primary">
                        <span class="btn-text">explore</span>
                        <span class="btn-icon">→</span>
                    </a>
                    <a
                        href="https://patrick.te9.nl/about/"
                        class="btn btn-secondary"
                        target="_blank"
                    >
                        <span class="btn-text">about me</span>
                    </a>
                </div>
            </div>
            <div class="hero-decoration">
                <div class="deco-ring deco-ring-1"></div>
                <div class="deco-ring deco-ring-2"></div>
                <div class="deco-ring deco-ring-3"></div>
            </div>
        </section>

        <!-- Garden Section -->
        <section id="garden" class="py-24 px-8 bg-[#0a0a0a]">
            <div class="max-w-[1200px] mx-auto">
                <!-- Section Header -->
                <div class="section-header">
                    <span class="section-label">// purpose</span>
                    <h2 class="section-title">
                        What this<br />site is for
                    </h2>
                </div>

                <!-- Grid -->
                <div class="garden-grid">
                    {#each gardenCards as card, i}
                        <article
                            in:fly={{ y: 20, duration: 500, delay: i * 100 }}
                            out:fade={{ duration: 200 }}
                            class="garden-card"
                        >
                            <div class="garden-card-accent"></div>
                            <div class="relative z-10">
                                <div class="garden-icon">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    >
                                        {#each card.paths as path}
                                            {#if "d" in path && path.d}
                                                <path d={path.d} />
                                            {:else if "rect" in path && path.rect}
                                                <rect
                                                    x={path.rect.x}
                                                    y={path.rect.y}
                                                    width={path.rect.width}
                                                    height={path.rect.height}
                                                    rx={path.rect.rx}
                                                />
                                            {:else if "polyline" in path && path.polyline}
                                                <polyline
                                                    points={path.polyline
                                                        .points}
                                                />
                                            {:else if "line" in path && path.line}
                                                <line
                                                    x1={path.line.x1}
                                                    y1={path.line.y1}
                                                    x2={path.line.x2}
                                                    y2={path.line.y2}
                                                />
                                            {:else if "circle" in path && path.circle}
                                                <circle
                                                    cx={path.circle.cx}
                                                    cy={path.circle.cy}
                                                    r={path.circle.r}
                                                />
                                            {/if}
                                        {/each}
                                    </svg>
                                </div>
                                <h3 class="garden-title">
                                    {card.title}
                                </h3>
                                <p class="garden-desc">
                                    {card.desc}
                                </p>
                                <span class="garden-tag">{card.tag}</span>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <!-- Links Section -->
        <section id="links" class="py-24 px-8 bg-[#111111]">
            <div class="links-container">
                <!-- Section Header -->
                <div class="section-header">
                    <span class="section-label">// shortcuts</span>
                    <h2 class="section-title">Quick Links</h2>
                </div>

                <!-- Links Grid -->
                <div class="links-grid">
                    {#each quickLinks as link, i}
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            in:slide={{
                                axis: "y",
                                duration: 300,
                                delay: i * 50,
                            }}
                            class="link-item"
                        >
                            <span class="link-name">{link.name}</span>
                            <span class="link-desc">{link.desc}</span>
                            <span class="link-arrow">→</span>
                        </a>
                    {/each}
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-brand">
                    <span class="footer-logo">te9.dev</span>
                    <p class="footer-tagline">Patrick's Digital Garden</p>
                </div>
                <div class="footer-links">
                    <div class="footer-col">
                        <h4>Connect</h4>
                        <a href="mailto:creatuluw@gmail.com">Email</a>
                        <a
                            href="https://linkedin.com/in/gotoptw"
                            target="_blank"
                            rel="noopener noreferrer">LinkedIn</a
                        >
                        <a
                            href="https://bsky.app/profile/creatuluw.bsky.social"
                            target="_blank"
                            rel="noopener noreferrer">Bluesky</a
                        >
                    </div>
                    <div class="footer-col">
                        <h4>Sites</h4>
                        <a
                            href="https://patrick.te9.nl"
                            target="_blank"
                            rel="noopener noreferrer">patrick.te9.nl</a
                        >
                        <a
                            href="https://github.com/creatuluw"
                            target="_blank"
                            rel="noopener noreferrer">GitHub</a
                        >
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <span class="footer-copy">© 2025 Patrick Tehubijuluw</span>
                <span class="footer-status">
                    <span class="status-dot"></span>
                    Growing organically
                </span>
            </div>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        font-family: "Lekton", sans-serif;
        background-color: #0a0a0a;
        color: #e8e8e8;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :global(.font-[Bricolage_Grotesque]) {
        font-family: "Bricolage Grotesque", sans-serif;
    }

    :global(.font-[JetBrains_Mono]) {
        font-family: "JetBrains Mono", monospace;
    }

    :global(html) {
        scroll-behavior: smooth;
    }

    :global(::selection) {
        background-color: #ff9500;
        color: #0a0a0a;
    }

    :global(:focus-visible) {
        outline: 2px solid #ff9500;
        outline-offset: 2px;
    }

    /* Custom scrollbar */
    :global(::-webkit-scrollbar) {
        width: 8px;
        height: 8px;
    }

    :global(::-webkit-scrollbar-track) {
        background: #0a0a0a;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: #333;
        border-radius: 4px;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #ff9500;
    }

    /* Noise overlay */
    .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* Scanlines */
    .scanlines {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
        );
        opacity: 0.15;
    }

    /* Animations */
    @keyframes blink {
        0%,
        50% {
            opacity: 1;
        }
        51%,
        100% {
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
            border-width: 1px;
        }
        50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
            border-width: 3px;
        }
    }

    /* Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.05);
        }
    }

    .text-shadow-glow {
        text-shadow: 0 0 30px rgba(255, 149, 0, 0.15);
    }

    /* Hero Section */
    .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 2rem 4rem;
        overflow: hidden;
        max-width: 1400px;
        margin: 0 auto;
    }

    .hero-content {
        max-width: 800px;
        text-align: center;
        position: relative;
        z-index: 10;
        animation: fadeInUp 0.8s ease-out;
    }

    .hero-label {
        display: inline-block;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        animation: fadeInUp 0.8s ease-out 0.1s backwards;
        font-family: "Lekton", sans-serif;
    }

    .label-bracket {
        color: #555555;
    }

    .label-text {
        color: #ff9500;
        letter-spacing: 0.1em;
        text-transform: lowercase;
    }

    .hero-title {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: clamp(4rem, 15vw, 10rem);
        font-weight: 700;
        line-height: 0.9;
        margin-bottom: 1.5rem;
        animation: fadeInUp 0.8s ease-out 0.2s backwards;
    }

    .hero-title-single {
        font-size: clamp(4rem, 15vw, 8rem);
    }

    .title-main {
        color: #ff9500;
        display: block;
        text-shadow: 0 0 30px rgba(255, 149, 0, 0.15);
    }

    .hero-subtitle {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        color: #888888;
        margin-bottom: 1.5rem;
        line-height: 1.4;
        font-weight: 400;
        animation: fadeInUp 0.8s ease-out 0.3s backwards;
        font-family: "Lekton", sans-serif;
    }

    .subtitle-accent {
        color: #ffb347;
        font-weight: 400;
    }

    .hero-description {
        font-size: 1rem;
        color: #555555;
        max-width: 500px;
        margin: 0 auto 2.5rem;
        animation: fadeInUp 0.8s ease-out 0.4s backwards;
        font-family: "Lekton", sans-serif;
        line-height: 1.6;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        animation: fadeInUp 0.8s ease-out 0.5s backwards;
    }

    /* Buttons */
    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.75rem;
        font-family: "Lekton", sans-serif;
        font-size: 0.875rem;
        text-decoration: none;
        border-radius: 4px;
        transition: all 300ms ease;
        position: relative;
        overflow: hidden;
    }

    .btn-primary {
        background: #ff9500;
        color: #0a0a0a;
        font-weight: 600;
    }

    .btn-primary::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: left 0.5s ease;
    }

    .btn-primary:hover::before {
        left: 100%;
    }

    .btn-primary:hover {
        background: #ffb347;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(255, 149, 0, 0.3);
    }

    .btn-text {
        position: relative;
    }

    .btn-icon {
        position: relative;
    }

    .btn-secondary {
        background: transparent;
        color: #e8e8e8;
        border: 1px solid #333333;
    }

    .btn-secondary:hover {
        border-color: #ff9500;
        color: #ff9500;
        transform: translateY(-2px);
    }

    /* Hero Decoration */
    .hero-decoration {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 600px;
        pointer-events: none;
        z-index: 1;
    }

    .deco-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 1px solid #2a2a2a;
        opacity: 0.3;
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

    /* Section Header */
    .section-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .section-label {
        display: block;
        font-size: 0.875rem;
        color: #ff9500;
        margin-bottom: 1rem;
        letter-spacing: 0.1em;
        font-family: "Lekton", sans-serif;
    }

    .garden-tag {
        display: inline-block;
        font-size: 0.6875rem;
        color: #00cc6a;
        background: rgba(0, 255, 136, 0.1);
        padding: 0.25rem 0.75rem;
        border-radius: 2px;
        text-transform: lowercase;
        letter-spacing: 0.05em;
        font-family: "Lekton", sans-serif;
    }

    .section-title {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        color: #e8e8e8;
        line-height: 1.1;
    }

    /* Garden Grid */
    .garden-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .garden-card {
        background: #141414;
        border: 1px solid #2a2a2a;
        border-radius: 8px;
        padding: 2rem;
        transition: all 300ms ease;
        position: relative;
        overflow: hidden;
    }

    .garden-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #00ff88, #ff9500);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 300ms ease;
    }

    .garden-card:hover::before {
        transform: scaleX(1);
    }

    .garden-card:hover {
        transform: translateY(-4px);
        border-color: #333333;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .garden-icon {
        color: #00ff88;
        margin-bottom: 1.5rem;
        width: 32px;
        height: 32px;
    }

    .garden-title {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #e8e8e8;
        margin-bottom: 0.75rem;
    }

    .garden-desc {
        font-size: 0.875rem;
        color: #888888;
        line-height: 1.7;
        margin-bottom: 1.5rem;
        font-family: "Lekton", sans-serif;
    }

    .garden-tag {
        display: inline-block;
        font-size: 0.6875rem;
        color: #00cc6a;
        background: rgba(0, 255, 136, 0.1);
        padding: 0.25rem 0.75rem;
        border-radius: 2px;
        text-transform: lowercase;
        letter-spacing: 0.05em;
        font-family: "Lekton", sans-serif;
    }

    /* Links Section */
    .links-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .links-grid {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .link-item {
        display: grid;
        grid-template-columns: 1fr 2fr auto;
        gap: 1rem;
        align-items: center;
        padding: 1.25rem 1.5rem;
        background: #141414;
        border: 1px solid #2a2a2a;
        border-radius: 8px;
        text-decoration: none;
        transition: all 150ms ease;
    }

    .link-item:hover {
        border-color: #ff9500;
        transform: translateX(8px);
    }

    .link-name {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #e8e8e8;
    }

    .link-desc {
        font-family: "Lekton", sans-serif;
        font-size: 0.875rem;
        color: #888888;
    }

    .link-arrow {
        font-size: 1.25rem;
        color: #555555;
        transition: color 150ms ease;
    }

    .link-item:hover .link-arrow {
        color: #ff9500;
    }

    @media (max-width: 600px) {
        .link-item {
            grid-template-columns: 1fr auto;
        }
        .link-desc {
            display: none;
        }
    }

    /* Footer */

    .section-label {
        display: block;
        font-size: 0.875rem;
        color: #ff9500;
        margin-bottom: 1rem;
        letter-spacing: 0.1em;
        font-family: "JetBrains Mono", monospace;
    }

    .section-title {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        color: #e8e8e8;
        line-height: 1.1;
    }

    /* Footer */
    .site-footer {
        background: #111111;
        border-top: 1px solid #2a2a2a;
        padding: 4rem 2rem 2rem;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 4rem;
        margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
        .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .footer-logo {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: #ff9500;
    }

    .footer-tagline {
        font-size: 0.875rem;
        color: #555555;
        font-family: "Lekton", sans-serif;
    }

    .footer-links {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    @media (max-width: 500px) {
        .footer-links {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }

    .footer-col h4 {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #e8e8e8;
        margin-bottom: 1rem;
    }

    .footer-col a {
        display: block;
        font-size: 0.875rem;
        color: #888888;
        text-decoration: none;
        margin-bottom: 0.5rem;
        transition: color 150ms ease;
        font-family: "Lekton", sans-serif;
    }

    .footer-col a:hover {
        color: #ff9500;
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid #2a2a2a;
        font-size: 0.8125rem;
        color: #555555;
        font-family: "Lekton", sans-serif;
    }

    @media (max-width: 500px) {
        .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
    }

    .footer-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00ff88;
        animation: pulse-dot 2s ease-in-out infinite;
    }

    @keyframes pulse-dot {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
</style>
