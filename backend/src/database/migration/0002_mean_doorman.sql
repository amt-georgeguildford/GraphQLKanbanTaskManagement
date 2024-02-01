CREATE TABLE IF NOT EXISTS "columnB" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"position" integer,
	"boardId" uuid
);
--> statement-breakpoint
DROP TABLE "boardColumn";