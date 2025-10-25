'use server'

import { db } from "@/db"
import { site } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const analyticsSchema = z.object({
  domain: z.string(),
  metaId: z.string().min(1).optional(),
  googleId: z.string().min(1).optional(),
})

export async function handleAnalyticsSubmit(data: any) {
  try {
    const { domain, ...analyticsData } = analyticsSchema.parse(data)
    
    await db.update(site)
      .set(analyticsData)
      .where(eq(site.domain, domain))

    return void 0
  } catch (error) {
    console.error('Failed to update analytics:', error)
    throw new Error('Failed to update analytics settings')
  }
}