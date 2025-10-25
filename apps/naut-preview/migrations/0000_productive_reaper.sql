CREATE TABLE "Block" (
	"id" serial PRIMARY KEY NOT NULL,
	"pageId" integer NOT NULL,
	"componentName" varchar(191) NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "Block_pageId_order_key" UNIQUE("pageId","order")
);
--> statement-breakpoint
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
	"createdAt" timestamp NOT NULL,
	"publishedAt" timestamp
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
	"uid" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"type" varchar(191) NOT NULL,
	"blockPropMappedTo" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cmsType" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"description" text NOT NULL,
	"tagline" text,
	"siteDomain" varchar(191) NOT NULL,
	"spacer" boolean DEFAULT false NOT NULL,
	"categorySpacer" boolean DEFAULT false NOT NULL,
	"homeSpacer" boolean DEFAULT false NOT NULL,
	"invertHeaderColor" boolean DEFAULT false NOT NULL,
	"categoryInvertHeaderColor" boolean DEFAULT false NOT NULL,
	"homeInvertHeaderColor" boolean DEFAULT false NOT NULL,
	"entryComponentName" varchar(191) NOT NULL,
	"categoryComponentName" varchar(191) NOT NULL,
	"homeComponentName" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Component" (
	"name" varchar(191) PRIMARY KEY NOT NULL,
	"type" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Content" (
	"id" serial PRIMARY KEY NOT NULL,
	"blockId" integer NOT NULL,
	"fieldId" integer NOT NULL,
	"value" json NOT NULL,
	CONSTRAINT "Content_blockId_fieldId_key" UNIQUE("blockId","fieldId")
);
--> statement-breakpoint
CREATE TABLE "Field" (
	"id" serial PRIMARY KEY NOT NULL,
	"componentName" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"type" varchar(191) NOT NULL,
	"structure" json DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "FooterContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"siteDomain" varchar(191) NOT NULL,
	"fieldId" integer NOT NULL,
	"value" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "HeaderContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"siteDomain" varchar(191) NOT NULL,
	"fieldId" integer NOT NULL,
	"value" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Image" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"url" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Page" (
	"id" serial PRIMARY KEY NOT NULL,
	"siteDomain" varchar(191) NOT NULL,
	"route" varchar(191) NOT NULL,
	"title" varchar(191) NOT NULL,
	"description" text NOT NULL,
	"header" boolean DEFAULT true NOT NULL,
	"footer" boolean DEFAULT true NOT NULL,
	"spacer" boolean DEFAULT false NOT NULL,
	"invertHeaderColor" boolean DEFAULT false NOT NULL,
	CONSTRAINT "Page_siteDomain_route_key" UNIQUE("siteDomain","route")
);
--> statement-breakpoint
CREATE TABLE "Site" (
	"domain" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"footerComponentName" varchar(191) NOT NULL,
	"headerComponentName" varchar(191) NOT NULL,
	"backgroundColor1" varchar(191) DEFAULT '#f2f2f2' NOT NULL,
	"backgroundColor2" varchar(191) DEFAULT '#e5e7eb' NOT NULL,
	"color1" varchar(191) DEFAULT '#fb3640' NOT NULL,
	"color1Hover" varchar(191) DEFAULT '#db1620' NOT NULL,
	"color2" varchar(191),
	"color2Hover" varchar(191),
	"color3" varchar(191),
	"color3Hover" varchar(191),
	"footerBackgroundColor" varchar(191) DEFAULT '#d4d4d8' NOT NULL,
	"footerTextColor" varchar(191) DEFAULT '#71717a' NOT NULL,
	"textColor" varchar(191) DEFAULT '#52525b' NOT NULL,
	"titleColor" varchar(191) DEFAULT '#050C0F' NOT NULL,
	"headerBackgroundColor" varchar(191) DEFAULT '#ffffff' NOT NULL,
	"font2" varchar(191),
	"font3" varchar(191),
	"sansFont" varchar(191) DEFAULT 'bergern' NOT NULL,
	"icon" varchar(191) DEFAULT 'https://internaut.nyc3.cdn.digitaloceanspaces.com/favicon.ico' NOT NULL,
	"deploymentId" varchar(191),
	"projectId" varchar(191),
	"googleId" varchar(191),
	"metaId" varchar(191)
);
--> statement-breakpoint
CREATE TABLE "Subdomain" (
	"subdomain" varchar(191) PRIMARY KEY NOT NULL,
	"siteDomain" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"stripeCustomerId" varchar(191)
);
--> statement-breakpoint
ALTER TABLE "Block" ADD CONSTRAINT "Block_pageId_Page_id_fk" FOREIGN KEY ("pageId") REFERENCES "public"."Page"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Block" ADD CONSTRAINT "Block_componentName_Component_name_fk" FOREIGN KEY ("componentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsCategory" ADD CONSTRAINT "cmsCategory_typeId_cmsType_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntry" ADD CONSTRAINT "cmsEntry_cmsTypeId_cmsType_id_fk" FOREIGN KEY ("cmsTypeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryCategory" ADD CONSTRAINT "cmsEntryCategory_cmsEntryId_cmsEntry_id_fk" FOREIGN KEY ("cmsEntryId") REFERENCES "public"."cmsEntry"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryCategory" ADD CONSTRAINT "cmsEntryCategory_cmsCategoryId_cmsCategory_id_fk" FOREIGN KEY ("cmsCategoryId") REFERENCES "public"."cmsCategory"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryContent" ADD CONSTRAINT "cmsEntryContent_cmsEntryId_cmsEntry_id_fk" FOREIGN KEY ("cmsEntryId") REFERENCES "public"."cmsEntry"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsEntryContent" ADD CONSTRAINT "cmsEntryContent_cmsFieldId_cmsField_id_fk" FOREIGN KEY ("cmsFieldId") REFERENCES "public"."cmsField"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsField" ADD CONSTRAINT "cmsField_cmsTypeId_cmsType_id_fk" FOREIGN KEY ("cmsTypeId") REFERENCES "public"."cmsType"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_entryComponentName_Component_name_fk" FOREIGN KEY ("entryComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_categoryComponentName_Component_name_fk" FOREIGN KEY ("categoryComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cmsType" ADD CONSTRAINT "cmsType_homeComponentName_Component_name_fk" FOREIGN KEY ("homeComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Content" ADD CONSTRAINT "Content_blockId_Block_id_fk" FOREIGN KEY ("blockId") REFERENCES "public"."Block"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Content" ADD CONSTRAINT "Content_fieldId_Field_id_fk" FOREIGN KEY ("fieldId") REFERENCES "public"."Field"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Field" ADD CONSTRAINT "Field_componentName_Component_name_fk" FOREIGN KEY ("componentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "FooterContent" ADD CONSTRAINT "FooterContent_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "FooterContent" ADD CONSTRAINT "FooterContent_fieldId_Field_id_fk" FOREIGN KEY ("fieldId") REFERENCES "public"."Field"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HeaderContent" ADD CONSTRAINT "HeaderContent_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HeaderContent" ADD CONSTRAINT "HeaderContent_fieldId_Field_id_fk" FOREIGN KEY ("fieldId") REFERENCES "public"."Field"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Page" ADD CONSTRAINT "Page_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Site" ADD CONSTRAINT "Site_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Site" ADD CONSTRAINT "Site_footerComponentName_Component_name_fk" FOREIGN KEY ("footerComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Site" ADD CONSTRAINT "Site_headerComponentName_Component_name_fk" FOREIGN KEY ("headerComponentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_siteDomain_Site_domain_fk" FOREIGN KEY ("siteDomain") REFERENCES "public"."Site"("domain") ON DELETE cascade ON UPDATE cascade;