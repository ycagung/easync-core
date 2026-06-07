import {
	bigint,
	bigserial,
	boolean,
	char,
	check,
	date,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
	varchar
} from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { sql } from 'drizzle-orm';

export const currencies = pgTable('currencies', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	updatedBy: text('updated_by')
		.notNull()
		.references(() => users.id),
	name: text('name').notNull(),
	code: text('code').notNull().unique(),
	symbol: varchar('symbol', { length: 8 }),
	symbolPosition: varchar('symbol_position', { length: 6 }).default('before'),
	isBase: boolean('is_base').default(false),
	isActive: boolean('is_active').default(true)
});

export const exchangeRates = pgTable(
	'exchange_rates',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		createdAt: timestamp().defaultNow(),
		createdBy: text('created_by')
			.notNull()
			.references(() => users.id),
		fromCurrency: char('from_currency', { length: 3 })
			.notNull()
			.references(() => currencies.code),
		toCurrency: char('to_currency', { length: 3 })
			.notNull()
			.references(() => currencies.code),
		rate: numeric('rate', { precision: 20, scale: 10 }).notNull(),
		effectiveDate: date('effective_date').notNull(),
		source: varchar('source', { length: 32 }), // 'manual', 'bank_indonesia', etc.
		note: text('note')
	},
	(table) => [
		unique('uq_rate_pair_date').on(
			table.fromCurrency,
			table.toCurrency,
			table.effectiveDate
		),
		check(
			'chk_different_currency',
			sql`${table.fromCurrency} <> ${table.toCurrency}`
		)
	]
);

export const conversions = pgTable('conversions', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	fromCurrency: char('from_currency', { length: 3 })
		.notNull()
		.references(() => currencies.code),
	toCurrency: char('to_currency', { length: 3 })
		.notNull()
		.references(() => currencies.code),
	fromAmount: numeric('from_amount', { precision: 20, scale: 4 }).notNull(),
	toAmount: numeric('to_amount', { precision: 20, scale: 4 }).notNull(),
	rate: numeric('rate', { precision: 20, scale: 10 }).notNull(), // snapshotted
	rateId: bigint('rate_id', { mode: 'number' }).references(
		() => exchangeRates.id
	),
	referenceType: varchar('reference_type', { length: 64 }), // 'invoice', 'payment', etc.
	referenceId: bigint('reference_id', { mode: 'number' }),
	convertedBy: text('converted_by').references(() => users.id),
	convertedAt: timestamp('converted_at').notNull().defaultNow()
});
