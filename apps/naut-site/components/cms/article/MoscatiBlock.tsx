import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { cmsEntry, cmsType, cmsEntryContent, cmsField, cmsCategory, cmsEntryCategory } from "@naut/schemas";
import Image from "next/image";
import Link from "next/link";
import RichTextReader from "@/components/text/RichTextReader";

export default async function MoscatiBlock(props: { id: string }) {
  const id = parseInt(props.id);
  const cmsEntryData = await db.select().from(cmsEntry).where(eq(cmsEntry.id, id));
  const cmsTypeData = await db.select().from(cmsType).where(eq(cmsType.id, cmsEntryData[0]?.cmsTypeId));
  const cmsFields = await db.select({ name: cmsField.name, blockPropMappedTo: cmsField.blockPropMappedTo, id: cmsField.id }).from(cmsField).where(eq(cmsField.cmsTypeId, cmsTypeData[0]?.id));
  // find name of the field that has blockPropMappedTo of "title"
  const titleField = cmsFields.find((field) => field.blockPropMappedTo === "title");
  const contentField = cmsFields.find((field) => field.blockPropMappedTo === "content");
  const thumbnailField = cmsFields.find((field) => field.blockPropMappedTo === "thumbnail");

  const titleFieldId = titleField?.id;
  const contentFieldId = contentField?.id;
  const thumbnailFieldId = thumbnailField?.id;

  const titleData:any = await db.select().from(cmsEntryContent).where(and(eq(cmsEntryContent.cmsEntryId, id), eq(cmsEntryContent.cmsFieldId, titleFieldId as number)));
  const contentData:any = await db.select().from(cmsEntryContent).where(and(eq(cmsEntryContent.cmsEntryId, id), eq(cmsEntryContent.cmsFieldId, contentFieldId as number)));
  const thumbnailData:any = await db.select().from(cmsEntryContent).where(and(eq(cmsEntryContent.cmsEntryId, id), eq(cmsEntryContent.cmsFieldId, thumbnailFieldId as number)));

  const cmsEntryCategoryData:any = await db.select().from(cmsEntryCategory).where(eq(cmsEntryCategory.cmsEntryId, id));
  const categoryData:any = await db.select({ id: cmsCategory.id, name: cmsCategory.name }).from(cmsCategory).where(eq(cmsCategory.id, cmsEntryCategoryData[0]?.cmsCategoryId));

  return (
    <>
      <div className="relative overflow-hidden">
      <Image
        src={thumbnailData[0]?.value.payload as string}
        alt="thumbnail"
        width={500}
        height={500}
        className="!absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="mx-auto max-w-7xl px-6 pt-56 mb-24 sm:pt-96 sm:pb-12">
        <div className="flex flex-col items-center justify-between gap-x-16 gap-y-2">
            <Link href={`/cms/category/${categoryData[0]?.id}`} className="uppercase tracking-wide text-white/80 hover:text-white text-sm z-5 isolate font-semibold">{categoryData[0]?.name}</Link>
            <h1
              className="text-3xl font-bold tracking-tight sm:leading-[1.3] text-white sm:text-5xl font-font2 w-full z-5 isolate text-center"
            >
              {titleData[0]?.value.payload as string}
            </h1>
        </div>
      </div>
    </div>
    <RichTextReader content={contentData[0]?.value.payload as string} />
    </>
  )
}