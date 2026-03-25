import type { EntryGenerator } from './$types';

const slugs = ['about-this-blog', 'building-future', 'creative-flow', 'minimalist-design', 'typography-digital'];

export const entries: EntryGenerator = () => {
	return slugs.map((slug) => ({ slug }));
};

export const prerender = true;
