import { getPostBySlug, getAdjacentPosts } from '$lib/svelta';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const { previous, next } = await getAdjacentPosts(params.slug);

	return {
		post,
		previous,
		next
	};
};
