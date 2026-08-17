import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** Where a lead sits in the owner's follow-up pipeline. */
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
]);

export const urgencyEnum = pgEnum("urgency", [
  "asap",
  "this_week",
  "next_week",
  "flexible",
]);

export const contactMethodEnum = pgEnum("contact_method", ["call", "text", "email"]);

/** Whether the customer plans to wait at the shop or leave the car. */
export const dropOffEnum = pgEnum("drop_off", ["wait", "leave", "unsure"]);

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

    // ---- Step 1: the vehicle ----
    vehicleYear: integer("vehicle_year").notNull(),
    vehicleMake: text("vehicle_make").notNull(),
    vehicleModel: text("vehicle_model").notNull(),
    vehicleMileage: integer("vehicle_mileage"),

    // ---- Step 2: what they need ----
    /** Service slugs from src/lib/services.ts. jsonb rather than a Postgres
     *  array so the list can change shape later without a migration. */
    services: jsonb("services").$type<string[]>().notNull().default([]),
    problemDescription: text("problem_description"),

    // ---- Step 3: timing ----
    urgency: urgencyEnum("urgency").notNull(),
    preferredDate: text("preferred_date"),
    dropOff: dropOffEnum("drop_off").notNull().default("unsure"),

    // ---- Step 4: contact ----
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    /** Stored digits-only so search and duplicate checks work regardless of
     *  how the customer typed it. */
    phoneNormalized: text("phone_normalized").notNull(),
    email: text("email"),
    contactMethod: contactMethodEnum("contact_method").notNull().default("call"),
    aaaMember: boolean("aaa_member").notNull().default(false),
    referralSource: text("referral_source"),

    // ---- Owner's workflow ----
    status: leadStatusEnum("status").notNull().default("new"),
    notes: text("notes"),
    /** Null until the owner opens the lead. Drives the unread count. */
    readAt: timestamp("read_at", { withTimezone: true }),

    // ---- Request metadata ----
    /** Salted SHA-256 of the IP, never the IP itself. Enough to rate-limit
     *  and spot abuse without storing personal data we don't need. */
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
  },
  (table) => [
    index("leads_created_at_idx").on(table.createdAt),
    index("leads_status_idx").on(table.status),
    index("leads_ip_hash_idx").on(table.ipHash),
    index("leads_phone_idx").on(table.phoneNormalized),
  ],
);

export const leadAttachments = pgTable(
  "lead_attachments",
  {
    id: serial("id").primaryKey(),
    leadId: integer("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("lead_attachments_lead_id_idx").on(table.leadId)],
);

/**
 * Failed admin login attempts, kept so we can lock out brute force. A database
 * table rather than an in-memory counter because serverless instances don't
 * share memory — an in-memory limiter is trivially bypassed by retrying until
 * you land on a cold instance.
 */
export const authAttempts = pgTable(
  "auth_attempts",
  {
    id: serial("id").primaryKey(),
    ipHash: text("ip_hash").notNull(),
    attemptedAt: timestamp("attempted_at", { withTimezone: true }).notNull().defaultNow(),
    succeeded: boolean("succeeded").notNull().default(false),
  },
  (table) => [index("auth_attempts_ip_time_idx").on(table.ipHash, table.attemptedAt)],
);

export const leadsRelations = relations(leads, ({ many }) => ({
  attachments: many(leadAttachments),
}));

export const leadAttachmentsRelations = relations(leadAttachments, ({ one }) => ({
  lead: one(leads, {
    fields: [leadAttachments.leadId],
    references: [leads.id],
  }),
}));

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadAttachment = typeof leadAttachments.$inferSelect;
export type LeadStatus = (typeof leadStatusEnum.enumValues)[number];
