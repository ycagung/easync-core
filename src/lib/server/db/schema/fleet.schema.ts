import { boolean, date, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { accounts, users } from './auth.schema';

export const driverLicenseClasses = pgTable('driver_license_classes', {
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
	code: text('code').notNull(),
	description: text('description')
});

export const drivers = pgTable('drivers', {
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
	nik: text('nik').notNull(),
	email: text('email').notNull(),
	photoUrl: text('photo_url'),
	phone: text('phone').notNull(),
	address: text('address'),
	licenseClassId: integer('license_class_id').references(() => driverLicenseClasses.id),
	licenseNo: text('license_no').notNull(),
	licenseExp: date('license_exp').notNull(),
	licensePicUrl: text('license_pic_url'),
	accountId: text('account_id').references(() => accounts.id),
	hasDedicatedVehicle: boolean('has_dedicated_vehicle').default(false)
});

export const vehicleTypes = pgTable('vehicle_types', {
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
	code: text('code').notNull(),
	name: text('name').notNull(),
	description: text('description'),
	requiredLicenseId: integer('required_license_id').references(() => driverLicenseClasses.id)
});

export const fleets = pgTable('fleets', {
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
	code: text('code').notNull(),
	licensePlateNumber: text('license_plate_number').notNull(),
	make: text('make').notNull(),
	model: text('model').notNull(),
	productionYear: integer('production_year').notNull(),
	color: text('color'),
	vehicleTypeId: integer('vehicle_type_id').references(() => vehicleTypes.id),
	driverId: integer('driver_id').references(() => drivers.id)
});

export const fleetImages = pgTable('fleet_images', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => users.id),
	fleetId: integer('fleet_id')
		.notNull()
		.references(() => fleets.id),
	url: text('url').notNull(),
	isPrimary: boolean('is_primary').default(false)
});
