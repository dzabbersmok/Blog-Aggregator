CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"published_at" timestamp NOT NULL,
	"feed_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feeds" ALTER COLUMN "created_at" SET DEFAULT '2025-09-16 08:53:59.148';--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "posts_feed_url_unique" ON "posts" USING btree ("feed_id","url");