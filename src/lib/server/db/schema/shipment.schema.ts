import {
	boolean,
	date,
	integer,
	pgTable,
	real,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { clients } from './client.schema';
import { services } from './service.schema';
import { areas } from './coverage.schema';

export const uoms = pgTable('uoms', {
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
	rounding_treshold: real('rounding_treshold').default(0),
	isMain: boolean('is_main').default(false),
	conversionRateToMain: real('conversion_rate_to_main').default(1),
	conversionRateFromMain: real('conversion_rate_from_main').default(1),
	weight_based: boolean('weight_based').default(true)
});

export const commodities = pgTable('commodities', {
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
	description: text('description')
});

export const insurances = pgTable('insurances', {
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
	description: text('description'),
	rate: real('rate')
});

export const packagings = pgTable('packagings', {
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
	description: text('description'),
	isWhole: boolean('is_whole').default(false),
	rate: real('rate')
});

export const shipmentStatuses = pgTable('shipment_statuses', {
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
	order: integer('order').notNull(),
	description: text('description')
});

export const shipments = pgTable('shipments', {
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
	date: date('date').notNull().defaultNow(),
	clientId: integer('client_id').references(() => clients.id),
	serviceId: integer('service_id')
		.notNull()
		.references(() => services.id),
	originAreaId: integer('origin_area_id')
		.notNull()
		.references(() => areas.id),
	destinationAreaId: integer('destination_area_id')
		.notNull()
		.references(() => areas.id),
	commodityId: integer('commodity_id')
		.notNull()
		.references(() => commodities.id),
	remarks: text('remarks'),
	gwt: real('gwt').notNull(),
	cwt: real('cwt'),
	metricVolume: real('metric_volume').notNull(),
	qty: integer('item_qty').notNull(),
	statusId: integer('status_id')
		.notNull()
		.references(() => shipmentStatuses.id),
	cnUrl: text('cn_url').notNull()
});

export const shipmentParties = pgTable('shipment_parties', {
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
	shipmentId: integer('shipment_id')
		.notNull()
		.references(() => shipments.id),
	role: integer('role').notNull(),
	name: text('name').notNull(),
	address1: text('address1').notNull(),
	address2: text('address2'),
	address3: text('address3'),
	areaId: integer('area_id')
		.notNull()
		.references(() => areas.id),
	phone: text('phone').notNull(),
	email: text('email')
});

export const shipmentItems = pgTable('shipment_items', {
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
	shipmentId: integer('shipment_id')
		.notNull()
		.references(() => shipments.id),
	number: text('number').notNull(),
	description: text('description').notNull(),
	uomId: integer('uom_id')
		.notNull()
		.references(() => uoms.id),
	gwt: real('gwt').notNull(),
	cwt: real('cwt'),
	l: real('l').default(1),
	w: real('w').default(1),
	h: real('h').default(1),
	volume: real('volumne'),
	packagingId: integer('packaging_id').references(() => packagings.id)
});
