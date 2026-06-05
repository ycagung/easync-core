import {
	date,
	integer,
	pgTable,
	serial,
	text,
	time,
	timestamp
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { branch } from './coverage.schema';
import { driver, fleet } from './fleet.schema';

export const route = pgTable('route', {
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
	code: text('code').notNull().unique(),
	name: text('name').notNull()
});

export const routeSegment = pgTable('route_segment', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	routeId: integer('route_id')
		.notNull()
		.references(() => route.id),
	order: integer('order').notNull(),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branch.id)
});

export const trip = pgTable('trip', {
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
	routeId: integer('route_id')
		.notNull()
		.references(() => route.id),
	departureDate: date('departure_date').notNull(),
	departureTime: time('departure_time').notNull(),
	arrivalDate: date('arrival_date'),
	arrivalTime: time('arrival_time'),
	driverId: integer('driver_id').references(() => driver.id),
	fleetId: integer('fleet_id').references(() => fleet.id),
	status: text('status').notNull().default('draft')
});
