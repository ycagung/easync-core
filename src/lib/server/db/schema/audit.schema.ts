import { pgTable, text } from 'drizzle-orm/pg-core';

export const devices = pgTable('devices', {
	id: text('id').notNull().primaryKey(),
	platform: text('platform').notNull(),
	model: text('model').notNull(),
	make: text('make').notNull(),
	os: text('os').notNull()
});
