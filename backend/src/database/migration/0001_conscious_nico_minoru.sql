CREATE TABLE IF NOT EXISTS "boardColumn" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"position" integer,
	"boardId" uuid
);
--> statement-breakpoint
DROP TABLE "column";