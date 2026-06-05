import { relations } from 'drizzle-orm';
import {
	account,
	session,
	user,
	area,
	areaLevel,
	branch,
	branch_coverage,
	port,
	portCoverage,
	portType
} from './schema';

// --- Auth Relations ---
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));

// --- Area Level Relations ---
export const areaLevelRelations = relations(areaLevel, ({ many }) => ({
	areas: many(area)
}));

// --- Area Relations ---
export const areaRelations = relations(area, ({ one, many }) => ({
	level: one(areaLevel, {
		fields: [area.levelId],
		references: [areaLevel.id]
	}),
	// Self-referencing relation for parent/child areas
	parent: one(area, {
		fields: [area.parentId],
		references: [area.id],
		relationName: 'areaHierarchy'
	}),
	children: many(area, {
		relationName: 'areaHierarchy'
	})
}));

// --- Port Type Relations ---
export const portTypeRelations = relations(portType, ({ many }) => ({
	ports: many(port)
}));

// --- Port Relations ---
export const portRelations = relations(port, ({ one, many }) => ({
	type: one(portType, {
		fields: [port.type],
		references: [portType.id]
	}),
	area: one(area, {
		fields: [port.areaId],
		references: [area.id]
	}),
	coverages: many(portCoverage)
}));

// --- Port Coverage Relations ---
export const portCoverageRelations = relations(portCoverage, ({ one }) => ({
	port: one(port, {
		fields: [portCoverage.portId],
		references: [port.id]
	}),
	area: one(area, {
		fields: [portCoverage.areaId],
		references: [area.id]
	})
}));

// --- Branch Relations ---
export const branchRelations = relations(branch, ({ one, many }) => ({
	area: one(area, {
		fields: [branch.areaId],
		references: [area.id]
	}),
	coverages: many(branch_coverage)
}));

// --- Branch Coverage Relations ---
export const branchCoverageRelations = relations(branch_coverage, ({ one }) => ({
	branch: one(branch, {
		fields: [branch_coverage.branchId],
		references: [branch.id]
	}),
	area: one(area, {
		fields: [branch_coverage.areaId],
		references: [area.id]
	})
}));
