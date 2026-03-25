# te9.dev Monorepo

Personal development workspace containing multiple projects.

## Projects

### `blog/`
SvelteKit-based blog using Svelte 5, Tailwind CSS v4, and `@avidys/s-blog` for content management.

```bash
cd blog && npm run dev
```

### `llmngn/`
OpenCode plugin providing context persistence using LanceDB vector database. Enables semantic search and memory for AI conversations.

```bash
cd llmngn && npm run build
```

### `design/site/`
Website design template with HTML/CSS/JS assets.

## Tech Stack

- **Blog**: SvelteKit, Svelte 5, Tailwind CSS v4, TypeScript
- **Plugin**: TypeScript, LanceDB, Commander.js
- **Runtime**: Node.js 18+
