import { relations } from 'drizzle-orm';
import { accounts, sessions, users } from './schema/auth.schema';
import {
	areaLevels,
	areas,
	branch_coverages,
	branches,
	portCoverages,
	ports,
	portTypes
} from './schema/coverage.schema';

// --- Auth Relations ---
export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	accounts: many(accounts)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

// --- Area Level Relations ---
export const areaLevelsRelations = relations(areaLevels, ({ many }) => ({
	areas: many(areas)
}));

// --- Area Relations ---
export const areasRelations = relations(areas, ({ one, many }) => ({
	level: one(areaLevels, {
		fields: [areas.levelId],
		references: [areaLevels.id]
	}),
	// Self-referencing relation for parent/child areas
	parent: one(areas, {
		fields: [areas.parentId],
		references: [areas.id],
		relationName: 'areaHierarchy'
	}),
	children: many(areas, {
		relationName: 'areaHierarchy'
	})
}));

// --- Port Type Relations ---
export const portTypesRelations = relations(portTypes, ({ many }) => ({
	ports: many(ports)
}));

// --- Port Relations ---
export const portsRelations = relations(ports, ({ one, many }) => ({
	type: one(portTypes, {
		fields: [ports.type],
		references: [portTypes.id]
	}),
	area: one(areas, {
		fields: [ports.areaId],
		references: [areas.id]
	}),
	coverages: many(portCoverages)
}));

// --- Port Coverage Relations ---
export const portCoveragesRelations = relations(portCoverages, ({ one }) => ({
	port: one(ports, {
		fields: [portCoverages.portId],
		references: [ports.id]
	}),
	area: one(areas, {
		fields: [portCoverages.areaId],
		references: [areas.id]
	})
}));

// --- Branch Relations ---
export const branchesRelations = relations(branches, ({ one, many }) => ({
	area: one(areas, {
		fields: [branches.areaId],
		references: [areas.id]
	}),
	coverages: many(branch_coverages)
}));

// --- Branch Coverage Relations ---
export const branchCoveragesRelations = relations(
	branch_coverages,
	({ one }) => ({
		branch: one(branches, {
			fields: [branch_coverages.branchId],
			references: [branches.id]
		}),
		area: one(areas, {
			fields: [branch_coverages.areaId],
			references: [areas.id]
		})
	})
);
