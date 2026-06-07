import {
	boolean,
	date,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';
import { users } from './auth.schema';

export const clients = pgTable('clients', {
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
	title: text('title'),
	name: text('name').notNull(),
	phone: text('phone').notNull(),
	email: text('email').notNull(),
	address: text('address').notNull(),
	creditLimit: numeric('credit_limit').notNull()
});

export const taxCredentials = pgTable('tax_credentials', {
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
	nik: text('nik').notNull(),
	npwp: text('npwp').notNull(),
	address: text('address').notNull(),
	clientId: integer('client_id')
		.notNull()
		.references(() => clients.id),
	isPrimary: boolean('is_primary').default(false)
});

export const contracts = pgTable('contracts', {
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
	number: text('number').notNull().unique(),
	clientId: integer('client_id')
		.notNull()
		.references(() => clients.id),
	beginsAt: date('begins_at').notNull(),
	endsAt: date('ends_at'),
	description: text('description'),
	fileUrl: text('file_url')
});
