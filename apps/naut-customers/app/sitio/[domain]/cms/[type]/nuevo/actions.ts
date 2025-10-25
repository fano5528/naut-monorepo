"use server";

import { db } from '@/db';
import { cmsEntry, cmsEntryContent, cmsEntryCategory, cmsType } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface CreateEntryParams {
    fields: {
        fieldId: number;
        value: string;
    }[];
    categoryIds: number[];
    typeId: number;
    siteDomain: string;
}

export async function createEntry(params: CreateEntryParams) {
    try {
        // Get the type UID for the redirect
        const typeData = await db.select({ uid: cmsType.uid })
            .from(cmsType)
            .where(eq(cmsType.id, params.typeId));

        if (!typeData.length) {
            return { success: false, error: "Type not found" };
        }

        // Create the entry
        const [newEntry] = await db.insert(cmsEntry)
            .values({
                cmsTypeId: params.typeId,
                createdAt: new Date()
            })
            .returning();

        // Create entry contents
        await Promise.all(params.fields.map(field => 
            db.insert(cmsEntryContent)
                .values({
                    cmsEntryId: newEntry.id,
                    cmsFieldId: field.fieldId,
                    value: { payload: field.value }
                })
        ));

        // Create category associations
        await Promise.all(params.categoryIds.map(categoryId =>
            db.insert(cmsEntryCategory)
                .values({
                    cmsEntryId: newEntry.id,
                    cmsCategoryId: categoryId
                })
        ));

        return { 
            success: true, 
            entryId: newEntry.id,
            typeUid: typeData[0].uid
        };
    } catch (error) {
        console.error("Error creating entry:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Unknown error" 
        };
    }
} 