<script lang="ts">
    // Footer.svelte - Site footer component
    // Displays brand, navigation links, and status indicator
    import { Globe, Mail } from "@lucide/svelte";
</script>

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
                    <div class="footer-social">
                        <a href="mailto:creatuluw@gmail.com" aria-label="Email">
                            <Mail size={18} />
                        </a>
                        <a
                            href="https://linkedin.com/in/gotoptw"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <Globe size={18} />
                        </a>
                        <a
                            href="https://bsky.app/profile/creatuluw.bsky.social"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Bluesky"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                ><path
                                    d="M12.48 10.64c-3.38-.11-6.21 1.17-7.85 1.93.33-.89.72-1.57 1.13-2.17-.87.45-1.79.8-2.75.99C4.8 9.87 3.39 8.78 2.47 7.2 1.57 5.64 1.25 3.87 1.7 2.15c1.08 1.36 2.44 2.35 4.18 2.9C5.22 4.32 4.55 3.55 4.08 2.68c-.87 1.37-.5 3.34 1.02 4.36-.63 0-1.23-.08-1.81-.28.03 1.56.69 2.97 1.96 3.85-.76 0-1.47-.17-2.12-.46.02.48.19 1.4 1.02 2.13-.75.2-1.48.17-2.1-.1.3.95 1.18 1.74 2.32 1.93-.88.46-1.79.48-2.56.21.85.79 1.86 1.27 2.92 1.34-1.86 1.36-3.82 1.38-5.01.68.85.57 1.79.9 2.82 1.03-1.37.96-2.96 1.31-4.47 1.03C3.24 22.1 5.52 22.82 8.16 22.41c4.26-.27 7.49-3.63 7.94-7.94.58-.02 1.14-.12 1.66-.3-1.46-.42-2.23-.94-3.22-1.69z"
                                /></svg
                            >
                        </a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Sites</h4>
                    <div class="footer-social">
                        <a
                            href="https://github.com/creatuluw"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <Globe size={18} />
                        </a>
                    </div>
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

<style>
    .site-footer {
        background: linear-gradient(to bottom, #111111, #0a0a0a);
        padding: 3rem 2rem 2rem;
        border-top: 1px solid #2a2a2a;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
        .footer-main {
            flex-direction: column;
            gap: 2rem;
        }
    }

    .footer-brand {
        flex-shrink: 0;
    }

    .footer-logo {
        font-family: "JetBrains Mono", monospace;
        font-size: 1.5rem;
        font-weight: 700;
        color: #ff9500;
        display: block;
        margin-bottom: 0.5rem;
    }

    .footer-tagline {
        font-size: 0.875rem;
        color: #888888;
        margin: 0;
    }

    .footer-links {
        display: flex;
        gap: 4rem;
    }

    @media (max-width: 500px) {
        .footer-links {
            flex-direction: column;
            gap: 2rem;
        }
    }

    .footer-col h4 {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #e8e8e8;
        margin-bottom: 1rem;
    }

    .footer-col a {
        display: block;
        font-size: 0.875rem;
        color: #888888;
        text-decoration: none;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
    }

    .footer-col a:hover {
        color: #ff9500;
    }

    .footer-social {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .footer-social a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888888;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-social a:hover {
        color: #ff9500;
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid #2a2a2a;
        font-size: 0.875rem;
        color: #666666;
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
        background: #4ade80;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(0.95);
        }
    }
</style>
