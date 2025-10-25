CREATE TABLE "cmsCategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"typeId" integer NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsEntry" (
	"id" serial PRIMARY KEY NOT NULL,
	"cmsTypeId" integer NOT NULL,
	"publishedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsEntryCategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"cmsEntryId" integer NOT NULL,
	"cmsCategoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsEntryContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"cmsEntryId" integer NOT NULL,
	"cmsFieldId" integer NOT NULL,
	"value" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsField" (
	"id" serial PRIMARY KEY NOT NULL,
	"cmsTypeId" integer NOT NULL,
	"name" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsType" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(191) NOT NULL,
	"siteDomain" varchar(191) NOT NULL,
	"spacer" boolean DEFAULT false,
	"invertHeaderColor" boolean DEFAULT false,
	"entryComponentName" varchar(191),
	"categoryComponentName" varchar(191)
);
--> statement-breakpoint
ALTER TABLE "cmsCategory" ADD CONSTRAINT "cmsCategory_typeId_cmsType_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntry" ADD CONSTRAINT "cmsEntry_cmsTypeId_cmsType_id_fk" FOREIGN KEY ("cmsTypeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryCategory" ADD CONSTRAINT "cmsEntryCategory_cmsEntryId_cmsEntry_id_fk" FOREIGN KEY ("cmsEntryId") REFERENCES "public"."cmsEntry"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryCategory" ADD CONSTRAINT "cmsEntryCategory_cmsCategoryId_cmsCategory_id_fk" FOREIGN KEY ("cmsCategoryId") REFERENCES "public"."cmsCategory"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryContent" ADD CONSTRAINT "cmsEntryContent_cmsEntryId_cmsEntry_id_fk" FOREIGN KEY ("cmsEntryId") REFERENCES "public"."cmsEntry"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryContent" ADD CONSTRAINT "cmsEntryContent_cmsFieldId_cmsField_id_fk" FOREIGN KEY ("cmsFieldId") REFERENCES "public"."cmsField"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsField" ADD CONSTRAINT "cmsField_cmsTypeId_cmsType_id_fk" FOREIGN KEY ("cmsTypeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_entryComponentName_Component_name_fk" FOREIGN KEY ("entryComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_categoryComponentName_Component_name_fk" FOREIGN KEY ("categoryComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;