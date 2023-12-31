import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { groceries, type NewGroceryItem } from '$lib/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ depends }) => {
	depends('db:groceries');

	const shoppingList = await db.select().from(groceries);

	console.log('loading');

	return { shoppingList };
};

export const actions = {
	new: async ({ request }) => {
		const data = await request.formData();

		const item = data.get('item');

		if (!item) return fail(400, { message: 'Invalid item!' });

		try {
			const newItem = { name: item } as NewGroceryItem;

			console.log('adding', newItem);

			await db.insert(groceries).values(newItem);

			return { success: true };
		} catch (e) {
			console.log(e);

			return fail(500, { message: 'Something went wrong!' });
		}
	},
	remove: async ({ request }) => {
		const data = await request.formData();

		const idStr = data.get('itemId');

		console.log(idStr);

		if (!idStr) return fail(400, { message: 'Invalid item!' });

		const itemId = Number(idStr);

		try {
			console.log(`deleting ${itemId}`);

			await db.delete(groceries).where(eq(groceries.id, itemId));

			return { success: true };
		} catch (e) {
			console.log(e);

			return fail(500, { message: 'Something went wrong!' });
		}
	}
};
