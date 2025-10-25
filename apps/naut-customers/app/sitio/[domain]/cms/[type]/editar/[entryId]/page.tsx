import { db } from "@/db"
import { cmsType, cmsField, cmsEntryContent, cmsEntry } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm"
import { EditEntryForm } from "./edit-entry-form"

interface Props {
  params: Promise<{
    domain: string;
    type: string;
    entryId: string;
  }>
}

export default async function EditEntryPage({ params }: Props) {
    const domain = (await params).domain
    const type = (await params).type
    const entryId = (await params).entryId

    const entryData = await db.select().from(cmsEntry).where(eq(cmsEntry.id, parseInt(entryId)));

    const typeData = await db.select().from(cmsType).where(and(eq(cmsType.uid, type), eq(cmsType.siteDomain, domain)))
    const fieldsData = await db.select().from(cmsField).where(eq(cmsField.cmsTypeId, typeData[0].id)).orderBy(asc(cmsField.id))
    const entryContents:any = await db.select().from(cmsEntryContent).where(eq(cmsEntryContent.cmsEntryId, parseInt(entryId)))
    
    const fieldsWithContent = fieldsData.map((field) => {
        const content = entryContents.find((content:any) => content.cmsFieldId === field.id)
        return {
            ...field,
            value: content?.value.payload|| "",
            entryContentId: content?.id
        }
    })

    return (
        <div className="relative">
            <EditEntryForm initialFields={fieldsWithContent} entryId={parseInt(entryId)} publishedAt={entryData[0].publishedAt!} />
        </div>
    );
}

export const dynamic = 'force-dynamic'