ALTER TABLE "Block" DROP CONSTRAINT "Block_pageId_Page_id_fk";
--> statement-breakpoint
ALTER TABLE "Block" DROP CONSTRAINT "Block_componentName_Component_name_fk";
--> statement-breakpoint
ALTER TABLE "Content" DROP CONSTRAINT "Content_blockId_Block_id_fk";
--> statement-breakpoint
ALTER TABLE "Content" DROP CONSTRAINT "Content_fieldId_Field_id_fk";
--> statement-breakpoint
ALTER TABLE "Field" DROP CONSTRAINT "Field_componentName_Component_name_fk";
--> statement-breakpoint
ALTER TABLE "FooterContent" DROP CONSTRAINT "FooterContent_siteDomain_Site_domain_fk";
--> statement-breakpoint
ALTER TABLE "FooterContent" DROP CONSTRAINT "FooterContent_fieldId_Field_id_fk";
--> statement-breakpoint
ALTER TABLE "HeaderContent" DROP CONSTRAINT "HeaderContent_siteDomain_Site_domain_fk";
--> statement-breakpoint
ALTER TABLE "HeaderContent" DROP CONSTRAINT "HeaderContent_fieldId_Field_id_fk";
--> statement-breakpoint
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Page" DROP CONSTRAINT "Page_siteDomain_Site_domain_fk";
--> statement-breakpoint
ALTER TABLE "Site" DROP CONSTRAINT "Site_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Site" DROP CONSTRAINT "Site_footerComponentName_Component_name_fk";
--> statement-breakpoint
ALTER TABLE "Site" DROP CONSTRAINT "Site_headerComponentName_Component_name_fk";
--> statement-breakpoint
ALTER TABLE "Subdomain" DROP CONSTRAINT "Subdomain_siteDomain_Site_domain_fk";
--> statement-breakpoint
ALTER TABLE "Block" ADD CONSTRAINT "Block_pageId_Page_id_fk" FOREIGN KEY ("pageId") REFERENCES "public"."Page"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Block" ADD CONSTRAINT "Block_componentName_Component_name_fk" FOREIGN KEY ("componentName") REFERENCES "public"."Component"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
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