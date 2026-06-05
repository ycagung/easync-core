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
import { user } from './auth.schema';

export const client = pgTable('client', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	updatedBy: text('updated_by')
		.notNull()
		.references(() => user.id),
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
		.references(() => user.id),
	updatedBy: text('updated_by')
		.notNull()
		.references(() => user.id),
	nik: text('nik').notNull(),
	npwp: text('npwp').notNull(),
	address: text('address').notNull(),
	clientId: integer('client_id')
		.notNull()
		.references(() => client.id),
	isPrimary: boolean('is_primary').default(false)
});

export const contract = pgTable('contract', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	updatedBy: text('updated_by')
		.notNull()
		.references(() => user.id),
	number: text('number').notNull().unique(),
	clientId: integer('client_id')
		.notNull()
		.references(() => client.id),
	beginsAt: date('begins_at').notNull(),
	endsAt: date('ends_at'),
	description: text('description'),
	fileUrl: text('file_url')
});
