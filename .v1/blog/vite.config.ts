import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { markdownMetadataPlugin } from '@avidys/s-blog/markdownMetadataPlugin';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), markdownMetadataPlugin()]
});
