import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build/blog',
			assets: 'build/blog',
			fallback: undefined,
			precompress: false,
			strict: false
		}),
		paths: {
			base: '/blog'
		},
		prerender: {
			handleHttpError: 'ignore'
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
