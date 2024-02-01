ALTER TABLE "board" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "columnB" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "columnB" ALTER COLUMN "position" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "columnB" ALTER COLUMN "boardId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subtask" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subtask" ALTER COLUMN "checked" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subtask" ALTER COLUMN "taskId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "position" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "columnId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "board" ADD COLUMN "createdAt" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "columnB" ADD COLUMN "createdAt" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "subtask" ADD COLUMN "createdAt" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "createdAt" date DEFAULT now();