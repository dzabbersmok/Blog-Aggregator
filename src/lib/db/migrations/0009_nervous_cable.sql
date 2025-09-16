ALTER TABLE "feeds" ALTER COLUMN "created_at" SET DEFAULT '2025-09-16 11:06:35.965';--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "created_at" SET DEFAULT now();