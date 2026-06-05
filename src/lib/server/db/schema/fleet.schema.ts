import { boolean, date, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { account, user } from './auth.schema';

export const driverLicenseClass = pgTable('driver_license_class', {
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
	code: text('code').notNull(),
	description: text('description')
});

export const driver = pgTable('driver', {
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
	nik: text('nik').notNull(),
	email: text('email').notNull(),
	photoUrl: text('photo_url'),
	phone: text('phone').notNull(),
	address: text('address'),
	licenseClassId: integer('license_class_id').references(() => driverLicenseClass.id),
	licenseNo: text('license_no').notNull(),
	licenseExp: date('license_exp').notNull(),
	licensePicUrl: text('license_pic_url'),
	accountId: text('account_id').references(() => account.id),
	hasDedicatedVehicle: boolean('has_dedicated_vehicle').default(false)
});

export const vehicleType = pgTable('vehicle_type', {
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
	code: text('code').notNull(),
	name: text('name').notNull(),
	description: text('description'),
	requiredLicenseId: integer('required_license_id').references(() => driverLicenseClass.id)
});

export const fleet = pgTable('fleet', {
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
	code: text('code').notNull(),
	licensePlateNumber: text('license_plate_number').notNull(),
	make: text('make').notNull(),
	model: text('model').notNull(),
	productionYear: integer('production_year').notNull(),
	color: text('color'),
	vehicleTypeId: integer('vehicle_type_id').references(() => vehicleType.id),
	driverId: integer('driver_id').references(() => driver.id)
});

export const fleetImages = pgTable('fleet_images', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().defaultNow(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	fleetId: integer('fleet_id')
		.notNull()
		.references(() => fleet.id),
	url: text('url').notNull(),
	isPrimary: boolean('is_primary').default(false)
});
