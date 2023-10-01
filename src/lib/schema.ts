import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const groceries = sqliteTable(
	'groceries',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		status: integer('status', { mode: 'boolean' }).notNull().default(false)
	},
	(groceries) => ({
		idIdx: uniqueIndex('idIdx').on(groceries.id)
	})
);

export type GroceryItem = typeof groceries.$inferSelect;
export type NewGroceryItem = typeof groceries.$inferInsert;
