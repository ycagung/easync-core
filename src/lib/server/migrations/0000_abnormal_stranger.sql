CREATE TABLE "devices" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" text NOT NULL,
	"model" text NOT NULL,
	"make" text NOT NULL,
	"os" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"device_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"title" text,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"credit_limit" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"number" text NOT NULL,
	"client_id" integer NOT NULL,
	"begins_at" date NOT NULL,
	"ends_at" date,
	"description" text,
	"file_url" text,
	CONSTRAINT "contracts_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "tax_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"nik" text NOT NULL,
	"npwp" text NOT NULL,
	"address" text NOT NULL,
	"client_id" integer NOT NULL,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "area_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"level_id" integer NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE "branch_coverages" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"branch_id" integer NOT NULL,
	"area_id" integer NOT NULL,
	"delivery" boolean DEFAULT true,
	"pickup" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"address" text,
	"latitude" numeric,
	"longitude" numeric,
	"area_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "port_coverages" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"port_id" integer NOT NULL,
	"area_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "port_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ports" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"type_id" integer,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"latitude" numeric,
	"longitude" numeric,
	"address" text,
	"area_id" integer
);
--> statement-breakpoint
CREATE TABLE "conversions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"from_currency" char(3) NOT NULL,
	"to_currency" char(3) NOT NULL,
	"from_amount" numeric(20, 4) NOT NULL,
	"to_amount" numeric(20, 4) NOT NULL,
	"rate" numeric(20, 10) NOT NULL,
	"rate_id" bigint,
	"reference_type" varchar(64),
	"reference_id" bigint,
	"converted_by" text,
	"converted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"symbol" varchar(8),
	"symbol_position" varchar(6) DEFAULT 'before',
	"is_base" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "currencies_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "exchange_rates" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"from_currency" char(3) NOT NULL,
	"to_currency" char(3) NOT NULL,
	"rate" numeric(20, 10) NOT NULL,
	"effective_date" date NOT NULL,
	"source" varchar(32),
	"note" text,
	CONSTRAINT "uq_rate_pair_date" UNIQUE("from_currency","to_currency","effective_date"),
	CONSTRAINT "chk_different_currency" CHECK ("exchange_rates"."from_currency" <> "exchange_rates"."to_currency")
);
--> statement-breakpoint
CREATE TABLE "route_segments" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"route_id" integer NOT NULL,
	"order" integer NOT NULL,
	"branch_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "routes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"route_id" integer NOT NULL,
	"departure_date" date NOT NULL,
	"departure_time" time NOT NULL,
	"arrival_date" date,
	"arrival_time" time,
	"driver_id" integer,
	"fleet_id" integer,
	"status" text DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driver_license_classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"code" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"nik" text NOT NULL,
	"email" text NOT NULL,
	"photo_url" text,
	"phone" text NOT NULL,
	"address" text,
	"license_class_id" integer,
	"license_no" text NOT NULL,
	"license_exp" date NOT NULL,
	"license_pic_url" text,
	"account_id" text,
	"has_dedicated_vehicle" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "fleet_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"fleet_id" integer NOT NULL,
	"url" text NOT NULL,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "fleets" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"code" text NOT NULL,
	"license_plate_number" text NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"production_year" integer NOT NULL,
	"color" text,
	"vehicle_type_id" integer,
	"driver_id" integer
);
--> statement-breakpoint
CREATE TABLE "vehicle_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"required_license_id" integer
);
--> statement-breakpoint
CREATE TABLE "rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"effectiveFrom" timestamp DEFAULT now() NOT NULL,
	"effectiveTo" timestamp NOT NULL,
	"type" text NOT NULL,
	"code" text NOT NULL,
	"item_name" text NOT NULL,
	"currency_id" integer
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	CONSTRAINT "categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "service_availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"service_id" integer NOT NULL,
	"branch_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"uom_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"description" text,
	CONSTRAINT "services_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "shipping_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"service_id" integer NOT NULL,
	"contract_id" integer,
	"origin_area_id" integer NOT NULL,
	"destination_area_id" integer NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commodities" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "insurances" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"rate" real
);
--> statement-breakpoint
CREATE TABLE "packagings" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_whole" boolean DEFAULT false,
	"rate" real
);
--> statement-breakpoint
CREATE TABLE "shipment_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"shipment_id" integer NOT NULL,
	"number" text NOT NULL,
	"description" text NOT NULL,
	"uom_id" integer NOT NULL,
	"gwt" real NOT NULL,
	"cwt" real,
	"l" real DEFAULT 1,
	"w" real DEFAULT 1,
	"h" real DEFAULT 1,
	"volumne" real,
	"packaging_id" integer
);
--> statement-breakpoint
CREATE TABLE "shipment_parties" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"shipment_id" integer NOT NULL,
	"role" integer NOT NULL,
	"name" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"address3" text,
	"area_id" integer NOT NULL,
	"phone" text NOT NULL,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "shipment_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"order" integer NOT NULL,
	"description" text,
	CONSTRAINT "shipment_statuses_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"number" text NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"client_id" integer,
	"service_id" integer NOT NULL,
	"origin_area_id" integer NOT NULL,
	"destination_area_id" integer NOT NULL,
	"commodity_id" integer NOT NULL,
	"remarks" text,
	"gwt" real NOT NULL,
	"cwt" real,
	"metric_volume" real NOT NULL,
	"item_qty" integer NOT NULL,
	"status_id" integer NOT NULL,
	"cn_url" text NOT NULL,
	CONSTRAINT "shipments_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "uoms" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"title" text,
	"rounding_treshold" real DEFAULT 0,
	"is_main" boolean DEFAULT false,
	"conversion_rate_to_main" real DEFAULT 1,
	"conversion_rate_from_main" real DEFAULT 1,
	"weight_based" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tax_credentials" ADD CONSTRAINT "tax_credentials_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tax_credentials" ADD CONSTRAINT "tax_credentials_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tax_credentials" ADD CONSTRAINT "tax_credentials_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area_levels" ADD CONSTRAINT "area_levels_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "area_levels" ADD CONSTRAINT "area_levels_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "areas" ADD CONSTRAINT "areas_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "areas" ADD CONSTRAINT "areas_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "areas" ADD CONSTRAINT "areas_level_id_area_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."area_levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "areas" ADD CONSTRAINT "areas_parent_id_areas_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_coverages" ADD CONSTRAINT "branch_coverages_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_coverages" ADD CONSTRAINT "branch_coverages_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_coverages" ADD CONSTRAINT "branch_coverages_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "port_coverages" ADD CONSTRAINT "port_coverages_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "port_coverages" ADD CONSTRAINT "port_coverages_port_id_ports_id_fk" FOREIGN KEY ("port_id") REFERENCES "public"."ports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "port_coverages" ADD CONSTRAINT "port_coverages_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "port_types" ADD CONSTRAINT "port_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "port_types" ADD CONSTRAINT "port_types_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ports" ADD CONSTRAINT "ports_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ports" ADD CONSTRAINT "ports_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ports" ADD CONSTRAINT "ports_type_id_port_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."port_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ports" ADD CONSTRAINT "ports_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_from_currency_currencies_code_fk" FOREIGN KEY ("from_currency") REFERENCES "public"."currencies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_to_currency_currencies_code_fk" FOREIGN KEY ("to_currency") REFERENCES "public"."currencies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_rate_id_exchange_rates_id_fk" FOREIGN KEY ("rate_id") REFERENCES "public"."exchange_rates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_converted_by_users_id_fk" FOREIGN KEY ("converted_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_from_currency_currencies_code_fk" FOREIGN KEY ("from_currency") REFERENCES "public"."currencies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_to_currency_currencies_code_fk" FOREIGN KEY ("to_currency") REFERENCES "public"."currencies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_segments" ADD CONSTRAINT "route_segments_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_segments" ADD CONSTRAINT "route_segments_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_segments" ADD CONSTRAINT "route_segments_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_fleet_id_fleets_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driver_license_classes" ADD CONSTRAINT "driver_license_classes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driver_license_classes" ADD CONSTRAINT "driver_license_classes_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_license_class_id_driver_license_classes_id_fk" FOREIGN KEY ("license_class_id") REFERENCES "public"."driver_license_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet_images" ADD CONSTRAINT "fleet_images_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleet_images" ADD CONSTRAINT "fleet_images_fleet_id_fleets_id_fk" FOREIGN KEY ("fleet_id") REFERENCES "public"."fleets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_vehicle_type_id_vehicle_types_id_fk" FOREIGN KEY ("vehicle_type_id") REFERENCES "public"."vehicle_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fleets" ADD CONSTRAINT "fleets_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_required_license_id_driver_license_classes_id_fk" FOREIGN KEY ("required_license_id") REFERENCES "public"."driver_license_classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rates" ADD CONSTRAINT "rates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rates" ADD CONSTRAINT "rates_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_availabilities" ADD CONSTRAINT "service_availabilities_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_availabilities" ADD CONSTRAINT "service_availabilities_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_availabilities" ADD CONSTRAINT "service_availabilities_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_uom_id_uoms_id_fk" FOREIGN KEY ("uom_id") REFERENCES "public"."uoms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_origin_area_id_areas_id_fk" FOREIGN KEY ("origin_area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipping_rates" ADD CONSTRAINT "shipping_rates_destination_area_id_areas_id_fk" FOREIGN KEY ("destination_area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commodities" ADD CONSTRAINT "commodities_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commodities" ADD CONSTRAINT "commodities_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurances" ADD CONSTRAINT "insurances_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurances" ADD CONSTRAINT "insurances_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packagings" ADD CONSTRAINT "packagings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_uom_id_uoms_id_fk" FOREIGN KEY ("uom_id") REFERENCES "public"."uoms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_items" ADD CONSTRAINT "shipment_items_packaging_id_packagings_id_fk" FOREIGN KEY ("packaging_id") REFERENCES "public"."packagings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_parties" ADD CONSTRAINT "shipment_parties_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_parties" ADD CONSTRAINT "shipment_parties_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_parties" ADD CONSTRAINT "shipment_parties_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_parties" ADD CONSTRAINT "shipment_parties_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_statuses" ADD CONSTRAINT "shipment_statuses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_statuses" ADD CONSTRAINT "shipment_statuses_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_origin_area_id_areas_id_fk" FOREIGN KEY ("origin_area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_destination_area_id_areas_id_fk" FOREIGN KEY ("destination_area_id") REFERENCES "public"."areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_commodity_id_commodities_id_fk" FOREIGN KEY ("commodity_id") REFERENCES "public"."commodities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_status_id_shipment_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."shipment_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uoms" ADD CONSTRAINT "uoms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uoms" ADD CONSTRAINT "uoms_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verifications" USING btree ("identifier");