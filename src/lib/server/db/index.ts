import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as auditSchema from './schema/audit.schema';
import * as authSchema from './schema/auth.schema';
import * as clientSchema from './schema/client.schema';
import * as coverageSchema from './schema/coverage.schema';
import * as currencySchema from './schema/currency.schema';
import * as dispatchSchema from './schema/dispatch.schema';
import * as fleetSchema from './schema/fleet.schema';
import * as pricingSchema from './schema/pricing.schema';
import * as serviceSchema from './schema/service.schema';
import * as shipmentSchema from './schema/shipment.schema';
import * as relations from './relations';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	schema: {
		...auditSchema,
		...authSchema,
		...clientSchema,
		...coverageSchema,
		...currencySchema,
		...dispatchSchema,
		...fleetSchema,
		...pricingSchema,
		...serviceSchema,
		...shipmentSchema,
		...relations
	}
});
