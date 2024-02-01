CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "column" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"position" integer,
	"boardId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subtask" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"checked" boolean,
	"taskId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"description" text,
	"position" integer,
	"columnId" uuid
);
