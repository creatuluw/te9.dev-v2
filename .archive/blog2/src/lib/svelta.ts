import { createRawBlog } from '@aureuma/svelta/server';
import { marked } from 'marked';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const blogDir = join(process.cwd(), 'src/content/blog');
const files = readdirSync(blogDir).filter((f: string) => f.endsWith('.md'));

const rawModules: Record<string, () => Promise<string>> = {};
for (const file of files) {
	const path = `/src/content/blog/${file}`;
	const filePath = join(blogDir, file);
	rawModules[path] = async () => readFileSync(filePath, 'utf-8');
}

const getAuthor = (id: string) => {
	const authors: Record<string, { name: string; title: string; avatar: string }> = {
		admin: {
			name: 'Admin',
			title: 'Blog Author',
			avatar: '/blog/avatar.jpg'
		}
	};
	const author = authors[id] || authors.admin;
	return {
		id,
		name: author.name,
		title: author.title,
		avatar: author.avatar
	};
};

function mapFrontmatter({ data, content, slug, path }: { data: unknown; content: string; slug: string; path: string }) {
	const d = data as Record<string, unknown>;
	const date = d.date instanceof Date ? d.date.toISOString().split('T')[0] : String(d.date);
	return {
		title: String(d.title),
		date,
		category: String(d.category),
		author: String(d.author),
		cover: String(d.cover),
		excerpt: d.excerpt ? String(d.excerpt) : undefined,
		tags: Array.isArray(d.tags) ? d.tags.map(String) : undefined,
		featured: Boolean(d.featured),
		draft: Boolean(d.draft)
	};
}

export const blog = createRawBlog({
	rawModules,
	getAuthor,
	categoryOrder: ['Technology', 'Tutorials', 'News'],
	renderMarkdown: async (markdown) => await marked(markdown),
	mapFrontmatter
});

export const getAllPosts = blog.getAllPosts;
export const getPostBySlug = blog.getPostBySlug;
export const getCategories = blog.getCategories;
export const pickHero = blog.pickHero;
export const getAllTags = blog.getAllTags;
export const getAdjacentPosts = blog.getAdjacentPosts;
