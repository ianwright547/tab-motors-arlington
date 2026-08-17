CREATE TYPE "public"."contact_method" AS ENUM('call', 'text', 'email');--> statement-breakpoint
CREATE TYPE "public"."drop_off" AS ENUM('wait', 'leave', 'unsure');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'quoted', 'won', 'lost');--> statement-breakpoint
CREATE TYPE "public"."urgency" AS ENUM('asap', 'this_week', 'next_week', 'flexible');--> statement-breakpoint
CREATE TABLE "auth_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip_hash" text NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"succeeded" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer NOT NULL,
	"url" text NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"vehicle_year" integer NOT NULL,
	"vehicle_make" text NOT NULL,
	"vehicle_model" text NOT NULL,
	"vehicle_mileage" integer,
	"services" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"problem_description" text,
	"urgency" "urgency" NOT NULL,
	"preferred_date" text,
	"drop_off" "drop_off" DEFAULT 'unsure' NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"phone_normalized" text NOT NULL,
	"email" text,
	"contact_method" "contact_method" DEFAULT 'call' NOT NULL,
	"aaa_member" boolean DEFAULT false NOT NULL,
	"referral_source" text,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"notes" text,
	"read_at" timestamp with time zone,
	"ip_hash" text,
	"user_agent" text
);
--> statement-breakpoint
ALTER TABLE "lead_attachments" ADD CONSTRAINT "lead_attachments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "auth_attempts_ip_time_idx" ON "auth_attempts" USING btree ("ip_hash","attempted_at");--> statement-breakpoint
CREATE INDEX "lead_attachments_lead_id_idx" ON "lead_attachments" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_ip_hash_idx" ON "leads" USING btree ("ip_hash");--> statement-breakpoint
CREATE INDEX "leads_phone_idx" ON "leads" USING btree ("phone_normalized");