import { groceries, type GroceryItem } from '$lib/schema.js';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST = async ({ request }) => {
	const data = (await request.json()) as GroceryItem[];

	if (!data) throw error(400, 'what');

	try {
		for (const item of data) {
			console.log(`setting ${item.id} to`, item);

			await db.update(groceries).set(item).where(eq(groceries.id, item.id));
		}
	} catch (e) {
		console.log(e);

		throw error(500, 'Something went wrong!');
	}

	return new Response();
};
