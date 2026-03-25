<script lang="ts">
    import { slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import type { QuickLink } from "./types";
    import { ArrowUpRight } from "@lucide/svelte";

    interface Props {
        link: QuickLink;
        index: number;
    }

    let { link, index }: Props = $props();
</script>

<a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    in:slide={{
        axis: "y",
        duration: 300,
        delay: index * 50,
    }}
    class="link-item"
>
    <span class="link-name">{link.name}</span>
    <span class="link-desc">{link.desc}</span>
    <ArrowUpRight class="link-arrow" size={20} />
</a>

<style>
    .link-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        background: #0f0f0f;
        border: 1px solid #1a1a1a;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .link-item:hover {
        background: #141414;
        border-color: #2a2a2a;
        transform: translateY(-2px);
    }

    .link-name {
        font-family: "JetBrains Mono", monospace;
        font-size: 1rem;
        font-weight: 500;
        color: #e8e8e8;
        flex: 1;
    }

    .link-desc {
        font-size: 0.875rem;
        color: #666666;
        margin: 0 1rem;
    }

    :global(.link-arrow) {
        color: #ff9500;
        transition: transform 0.3s ease;
    }

    .link-item:hover :global(.link-arrow) {
        transform: translate(2px, -2px);
    }

    @media (max-width: 600px) {
        .link-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .link-desc {
            margin: 0;
            order: 2;
        }

        :global(.link-arrow) {
            order: 1;
            align-self: flex-end;
        }
    }
</style>
