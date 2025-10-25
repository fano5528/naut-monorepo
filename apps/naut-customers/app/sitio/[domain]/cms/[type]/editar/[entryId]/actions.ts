"use server";

import { db } from '@/db';
import { cmsEntry, cmsEntryContent, site } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function saveEntry(formData: FormData) {
    try {
        console.log("saveEntry");
        const formDataArray = Array.from(formData.entries());
        console.log("formDataArray");
        console.log(formDataArray);
        
        for (const [key, value] of formDataArray) {
            if (key.startsWith('entryContentId-') ) {
                    const entryContentId = parseInt(key.split('-')[1]);
                    
                    if (value.toString() !== "" && value.toString() !== "undefined" && value.toString() !== "null" && entryContentId !== 0 && entryContentId !== null && entryContentId !== undefined ) {
                    await db.update(cmsEntryContent)
                        .set({
                            value: { payload: value.toString() }
                        })
                        .where(eq(cmsEntryContent.id, entryContentId));
                    }
            } else if (key.startsWith('fieldId-')) {
                const fieldId = parseInt(key.split('-')[1]);
                const entryId = parseInt(key.split('-')[2]);
                if (value.toString() !== "" && value.toString() !== "undefined" && value.toString() !== "null" && fieldId !== 0 && fieldId !== null && fieldId !== undefined ) {
                    await db.insert(cmsEntryContent).values({
                        cmsEntryId: entryId,
                        cmsFieldId: fieldId,
                        value: { payload: value.toString() }
                    });
                }
            }
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving entry:", error);
        return { success: false };
    }
}

export async function updatePublishedStatus(entryId: number, isPublished: boolean, domain: string) {
    try {
        console.log("updatePublishedStatus", entryId, isPublished);
        
        await db.update(cmsEntry)
            .set({ 
                publishedAt: isPublished ? new Date() : null
            })
            .where(eq(cmsEntry.id, entryId));

            const siteData = await db.select().from(site).where(eq(site.domain, domain));
            const projectName = siteData[0]?.projectId;
            const deployment = siteData[0]?.deploymentId;

            await fetch(`https://api.vercel.com/v13/deployments?teamId=${process.env.VERCEL_TEAM_ID}`, {
                method: "POST",
                cache: "no-store",
                headers: {
                  "Authorization": "Bearer " + process.env.VERCEL_TOKEN,
                },
                body: JSON.stringify({
                  "name": projectName,
                  "deploymentId": deployment,
                  "target": "production"
                })
              });
            
        return { success: true };
    } catch (error) {
        console.error("Error updating published status:", error);
        return { success: false };
    }
}

export async function deleteEntry(entryId: number) {
    try {
        console.log("deleteEntry", entryId);
        await db.delete(cmsEntry)
            .where(eq(cmsEntry.id, entryId));
            
        return { success: true };
    } catch (error) {
        console.error("Error deleting entry:", error);
        return { success: false };
    }
}

export async function updatePublishedDate(entryId: number, date: Date, domain: string) {
    try {
        await db.update(cmsEntry)
            .set({ 
                publishedAt: date
            })
            .where(eq(cmsEntry.id, entryId));

            const siteData = await db.select().from(site).where(eq(site.domain, domain));
            const projectName = siteData[0]?.projectId;
            const deployment = siteData[0]?.deploymentId;

            await fetch(`https://api.vercel.com/v13/deployments?teamId=${process.env.VERCEL_TEAM_ID}`, {
                method: "POST",
                cache: "no-store",
                headers: {
                  "Authorization": "Bearer " + process.env.VERCEL_TOKEN,
                },
                body: JSON.stringify({
                  "name": projectName,
                  "deploymentId": deployment,
                  "target": "production"
                })
              });
            
        return { success: true };
    } catch (error) {
        console.error("Error updating published date:", error);
        return { success: false };
    }
}