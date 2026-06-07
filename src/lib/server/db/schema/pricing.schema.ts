import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { currencies } from './currency.schema';

export const rates = pgTable('rates', {
	id: serial().primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	effectiveFrom: timestamp().defaultNow().notNull(),
	effectiveTo: timestamp().notNull(),
	type: text('type').notNull(),
	code: text('code').notNull(),
	itemName: text('item_name').notNull(),
	currencyId: integer('currency_id').references(() => currencies.id)
});
