import { getAllPosts, pickHero, getCategories, getAllTags } from '$lib/svelta';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();
	const hero = await pickHero(posts);
	const categories = await getCategories();
	const tags = await getAllTags();

	return {
		posts,
		hero,
		categories,
		tags
	};
};
