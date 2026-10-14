import { sql } from "drizzle-orm";
import {
  check,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const formTypes = ["contact", "enhance"] as const;
export const leadStatuses = ["new", "contacted", "closed"] as const;

// One row per form submission. Holds personal data (UU PDP): the app only
// inserts; nothing in the app deletes. No children's data is ever stored here.
export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    locale: text("locale").notNull(),
    sourcePage: text("source_page").notNull(),
    formType: text("form_type", { enum: formTypes }).notNull(),
    productInterest: text("product_interest"),
    name: text("name").notNull(),
    company: text("company").notNull(),
    email: text("email").notNull(),
    role: text("role"),
    whatsapp: text("whatsapp"),
    size: text("size"),
    message: text("message"),
    // Form-specific fields. Enhance: sites, trackingToday, nextCycle.
    extra: jsonb("extra")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    // sha256(ip + LEAD_IP_SALT), for rate limiting only. Never the raw IP.
    ipHash: text("ip_hash").notNull(),
    status: text("status", { enum: leadStatuses }).notNull().default("new"),
  },
  (t) => [
    index("leads_created_at_idx").on(t.createdAt.desc()),
    index("leads_ip_hash_created_at_idx").on(t.ipHash, t.createdAt),
    check("leads_form_type_check", sql`${t.formType} in ('contact', 'enhance')`),
    check(
      "leads_status_check",
      sql`${t.status} in ('new', 'contacted', 'closed')`,
    ),
  ],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
