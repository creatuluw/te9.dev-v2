<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# lucide svelte with svelte 5

**Lucide icons fully support Svelte 5** through the dedicated `@lucide/svelte` package, which provides reactive Svelte components rendering inline SVGs with tree-shaking for optimal performance.[^1_1]

## Installation

Install via your preferred package manager, such as `pnpm add @lucide/svelte`, `npm install @lucide/svelte`, `yarn add @lucide/svelte`, or `bun add @lucide/svelte`. Note that `@lucide/svelte` is exclusively for Svelte 5; Svelte 4 projects should use the legacy `lucide-svelte` package instead.[^1_2][^1_1]

## Basic Usage

Import specific icons directly as Svelte components for tree-shaking benefits.

```svelte
<script>
  import { Camera, Skull } from '@lucide/svelte';
</script>

<Camera color="#ff3e98" size={32} />
<Skull strokeWidth={3} />
```

Icons accept props like `size` (default: 24), `color` (default: currentColor), `strokeWidth` (default: 2), and `absoluteStrokeWidth` (default: false), plus any standard SVG attributes.[^1_1]

## Dynamic Icons

For runtime icon selection with TypeScript support, define icon types and use `svelte:component` or snippets.

```svelte
<script lang="ts">
  import { Home, Cog, type Icon } from '@lucide/svelte';
  import type { ComponentType } from 'svelte';

  type MenuItem = {
    name: string;
    icon: ComponentType<Icon>;
  };

  const menuItems: MenuItem[] = [
    { name: 'Home', icon: Home },
    { name: 'Settings', icon: Cog }
  ];
</script>

{#each menuItems as item}
  {@const Icon = item.icon}
  <a href="/{item.name.toLowerCase()}">
    <Icon size={20} />
    {item.name}
  </a>
{/each}
```

This ensures type safety and reactivity in Svelte 5's runes mode.[^1_1]

## Optimization Tips

- Import from `@lucide/svelte/icons` (e.g., `import Alert from '@lucide/svelte/icons/circle-alert';`) for even smaller bundles in large apps.[^1_1]
- Avoid importing all icons (`import * as icons`) in a single component to prevent bundle bloat; prefer direct imports.[^1_1]
<span style="display:none">[^1_10][^1_3][^1_4][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://lucide.dev/guide/packages/lucide-svelte

[^1_2]: https://lucide.dev/guide/installation

[^1_3]: https://svelte-lucide.codewithshin.com/guide/custom-icons

[^1_4]: https://svelte-lucide.codewithshin.com/guide/svelte-5/getting-started

[^1_5]: https://github.com/lucide-icons/lucide/issues/2312

[^1_6]: https://github.com/shinokada/svelte-lucide

[^1_7]: https://svelte.dev/playground/6b2057d58c3841fc9f37b67960f02e27

[^1_8]: https://lucide.dev/guide/packages/lucide

[^1_9]: https://github.com/lucide-icons/lucide/issues/1736

[^1_10]: https://security.snyk.io/package/npm/lucide-svelte

