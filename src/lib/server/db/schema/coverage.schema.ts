import {
	boolean,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	type AnyPgColumn
} from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export const areaLevel = pgTable('area_level', {
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
	name: text('name').notNull()
});

export const area = pgTable('area', {
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
	levelId: integer('level_id')
		.notNull()
		.references(() => areaLevel.id),
	parentId: integer('parent_id').references((): AnyPgColumn => area.id)
});

export const portType = pgTable('port_type', {
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
	name: text('name').notNull()
});

export const port = pgTable('port', {
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
	type: integer('type_id').references(() => portType.id),
	name: text('name').notNull(),
	code: text('code').notNull(),
	latitude: numeric('latitude'),
	longitude: numeric('longitude'),
	address: text('address'),
	areaId: integer('area_id').references(() => area.id)
});

export const portCoverage = pgTable('port_coverage', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	portId: integer('port_id')
		.notNull()
		.references(() => port.id),
	areaId: integer('area_id')
		.notNull()
		.references(() => area.id)
});

export const branch = pgTable('branch', {
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
	code: text('code').notNull(),
	address: text('address'),
	latitude: numeric('latitude'),
	longitude: numeric('longitude'),
	areaId: integer('area_id')
		.notNull()
		.references(() => area.id)
});

export const branch_coverage = pgTable('branch_coverage', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branch.id),
	areaId: integer('area_id')
		.notNull()
		.references(() => area.id),
	delivery: boolean('delivery').default(true),
	pickup: boolean('pickup').default(true)
});
