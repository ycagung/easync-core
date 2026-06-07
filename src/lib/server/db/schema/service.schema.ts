import {
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { areas, branches } from './coverage.schema';
import { contracts } from './client.schema';
import { uoms } from './shipment.schema';

export const categories = pgTable('categories', {
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
	description: text('description')
});

export const services = pgTable('services', {
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
	uomId: integer('uom_id')
		.notNull()
		.references(() => uoms.id),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id),
	description: text('description')
});

export const serviceAvailabilities = pgTable('service_availabilities', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	serviceId: integer('service_id')
		.notNull()
		.references(() => services.id),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branches.id)
});

export const shippingRates = pgTable('shipping_rates', {
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
	serviceId: integer('service_id')
		.notNull()
		.references(() => services.id),
	contractId: integer('contract_id').references(() => contracts.id),
	originAreaId: integer('origin_area_id')
		.notNull()
		.references(() => areas.id),
	destinationAreaId: integer('destination_area_id')
		.notNull()
		.references(() => areas.id),
	price: numeric('price').notNull()
});
