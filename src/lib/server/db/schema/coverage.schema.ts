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
import { users } from './auth.schema';

export const areaLevels = pgTable('area_levels', {
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
	name: text('name').notNull()
});

export const areas = pgTable('areas', {
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
	levelId: integer('level_id')
		.notNull()
		.references(() => areaLevels.id),
	parentId: integer('parent_id').references((): AnyPgColumn => areas.id)
});

export const portTypes = pgTable('port_types', {
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
	name: text('name').notNull()
});

export const ports = pgTable('ports', {
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
	type: integer('type_id').references(() => portTypes.id),
	name: text('name').notNull(),
	code: text('code').notNull(),
	latitude: numeric('latitude'),
	longitude: numeric('longitude'),
	address: text('address'),
	areaId: integer('area_id').references(() => areas.id)
});

export const portCoverages = pgTable('port_coverages', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	portId: integer('port_id')
		.notNull()
		.references(() => ports.id),
	areaId: integer('area_id')
		.notNull()
		.references(() => areas.id)
});

export const branches = pgTable('branches', {
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
	code: text('code').notNull(),
	address: text('address'),
	latitude: numeric('latitude'),
	longitude: numeric('longitude'),
	areaId: integer('area_id')
		.notNull()
		.references(() => areas.id)
});

export const branch_coverages = pgTable('branch_coverages', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branches.id),
	areaId: integer('area_id')
		.notNull()
		.references(() => areas.id),
	delivery: boolean('delivery').default(true),
	pickup: boolean('pickup').default(true)
});
