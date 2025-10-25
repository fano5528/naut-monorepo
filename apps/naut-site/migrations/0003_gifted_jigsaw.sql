ALTER TABLE "cmsField" ADD COLUMN "uid" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsField" ADD COLUMN "type" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "tagline" text;