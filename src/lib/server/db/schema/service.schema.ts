import {
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { area, branch } from './coverage.schema';
import { contract } from './client.schema';
import { uom } from './shipment.schema';

export const category = pgTable('category', {
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
	name: text('name').notNull(),
	code: text('code').notNull().unique(),
	description: text('description')
});

export const service = pgTable('service', {
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
	name: text('name').notNull(),
	code: text('code').notNull().unique(),
	uomId: integer('uom_id')
		.notNull()
		.references(() => uom.id),
	categoryId: integer('category_id')
		.notNull()
		.references(() => category.id),
	description: text('description')
});

export const serviceAvailability = pgTable('service_availability', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	serviceId: integer('service_id')
		.notNull()
		.references(() => service.id),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branch.id)
});

export const shippingRate = pgTable('shipping_rate', {
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
	serviceId: integer('service_id')
		.notNull()
		.references(() => service.id),
	contractId: integer('contract_id').references(() => contract.id),
	originAreaId: integer('origin_area_id')
		.notNull()
		.references(() => area.id),
	destinationAreaId: integer('destination_area_id')
		.notNull()
		.references(() => area.id),
	price: numeric('price').notNull()
});
