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
import { user } from './auth.schema';
import { client } from './client.schema';
import { service } from './service.schema';
import { area } from './coverage.schema';

export const uom = pgTable('uom', {
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
	rounding_treshold: real('rounding_treshold').default(0),
	isMain: boolean('is_main').default(false),
	conversionRateToMain: real('conversion_rate_to_main').default(1),
	conversionRateFromMain: real('conversion_rate_from_main').default(1),
	weight_based: boolean('weight_based').default(true)
});

export const commodity = pgTable('commodity', {
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
	description: text('description')
});

export const insurance = pgTable('insurance', {
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
	description: text('description'),
	rate: real('rate')
});

export const packaging = pgTable('packaging', {
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
	description: text('description'),
	isWhole: boolean('is_whole').default(false),
	rate: real('rate')
});

export const shipmentStatus = pgTable('shipment_status', {
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
	order: integer('order').notNull(),
	description: text('description')
});

export const shipment = pgTable('shipment', {
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
	date: date('date').notNull().defaultNow(),
	clientId: integer('client_id').references(() => client.id),
	serviceId: integer('service_id')
		.notNull()
		.references(() => service.id),
	originAreaId: integer('origin_area_id')
		.notNull()
		.references(() => area.id),
	destinationAreaId: integer('destination_area_id')
		.notNull()
		.references(() => area.id),
	commodityId: integer('commodity_id')
		.notNull()
		.references(() => commodity.id),
	remarks: text('remarks'),
	gwt: real('gwt').notNull(),
	cwt: real('cwt'),
	metricVolume: real('metric_volume').notNull(),
	qty: integer('item_qty').notNull(),
	statusId: integer('status_id')
		.notNull()
		.references(() => shipmentStatus.id),
	cnUrl: text('cn_url').notNull()
});

export const shipmentParty = pgTable('shipment_party', {
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
	shipmentId: integer('shipment_id')
		.notNull()
		.references(() => shipment.id),
	role: integer('role').notNull(),
	name: text('name').notNull(),
	address1: text('address1').notNull(),
	address2: text('address2'),
	address3: text('address3'),
	areaId: integer('area_id')
		.notNull()
		.references(() => area.id),
	phone: text('phone').notNull(),
	email: text('email')
});

export const shipmentItem = pgTable('shipment_item', {
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
	shipmentId: integer('shipment_id')
		.notNull()
		.references(() => shipment.id),
	number: text('number').notNull(),
	description: text('description').notNull(),
	uomId: integer('uom_id')
		.notNull()
		.references(() => uom.id),
	gwt: real('gwt').notNull(),
	cwt: real('cwt'),
	l: real('l').default(1),
	w: real('w').default(1),
	h: real('h').default(1),
	volume: real('volumne'),
	packagingId: integer('packaging_id').references(() => packaging.id)
});
