import {
	date,
	integer,
	pgTable,
	serial,
	text,
	time,
	timestamp
} from 'drizzle-orm/pg-core';
import { users } from './auth.schema';
import { branches } from './coverage.schema';
import { drivers, fleets } from './fleet.schema';

export const routes = pgTable('routes', {
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
	code: text('code').notNull().unique(),
	name: text('name').notNull()
});

export const routeSegments = pgTable('route_segments', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	routeId: integer('route_id')
		.notNull()
		.references(() => routes.id),
	order: integer('order').notNull(),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branches.id)
});

export const trips = pgTable('trips', {
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
	routeId: integer('route_id')
		.notNull()
		.references(() => routes.id),
	departureDate: date('departure_date').notNull(),
	departureTime: time('departure_time').notNull(),
	arrivalDate: date('arrival_date'),
	arrivalTime: time('arrival_time'),
	driverId: integer('driver_id').references(() => drivers.id),
	fleetId: integer('fleet_id').references(() => fleets.id),
	status: text('status').notNull().default('draft')
});
