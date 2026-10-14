CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"locale" text NOT NULL,
	"source_page" text NOT NULL,
	"form_type" text NOT NULL,
	"product_interest" text,
	"name" text NOT NULL,
	"company" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"whatsapp" text,
	"size" text,
	"message" text,
	"extra" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"consent_at" timestamp with time zone NOT NULL,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"ip_hash" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	CONSTRAINT "leads_form_type_check" CHECK ("leads"."form_type" in ('contact', 'enhance')),
	CONSTRAINT "leads_status_check" CHECK ("leads"."status" in ('new', 'contacted', 'closed'))
);
--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "leads_ip_hash_created_at_idx" ON "leads" USING btree ("ip_hash","created_at");