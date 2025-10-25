import { db } from "@/db"
import { cmsType, cmsField, cmsCategory } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm"
import { NewEntryForm } from "./new-entry-form"

export default async function NewEntryPage({ params }: {
    params: Promise<{
        domain: string;
        type: string;
    }>
}) {
    const domain = (await params).domain
    const type = (await params).type

    const typeData = await db.select().from(cmsType)
        .where(and(
            eq(cmsType.uid, type),
            eq(cmsType.siteDomain, domain)
        ));

    if (!typeData.length) {
        return <div>Type not found</div>;
    }

    const fieldsData = await db.select().from(cmsField)
        .where(eq(cmsField.cmsTypeId, typeData[0].id)).orderBy(asc(cmsField.id));

    const categories = await db.select().from(cmsCategory)
        .where(eq(cmsCategory.typeId, typeData[0].id));

    const fieldsWithEmptyValues = fieldsData.map(field => ({
        ...field,
        value: ""
    }));

    return (
        <NewEntryForm 
            fields={fieldsWithEmptyValues}
            categories={categories}
            typeId={typeData[0].id}
            siteDomain={domain}
        />
    );
}