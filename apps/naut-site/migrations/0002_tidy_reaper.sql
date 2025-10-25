ALTER TABLE "cmsType" ALTER COLUMN "spacer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ALTER COLUMN "invertHeaderColor" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ALTER COLUMN "entryComponentName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ALTER COLUMN "categoryComponentName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsField" ADD COLUMN "blockPropMappedTo" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "uid" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "categorySpacer" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "homeSpacer" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "categoryInvertHeaderColor" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "homeInvertHeaderColor" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD COLUMN "homeComponentName" varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_homeComponentName_Component_name_fk" FOREIGN KEY ("homeComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;