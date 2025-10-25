import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { db } from "@/db";
import { site, cmsType } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic'

export default async function Layout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: { domain: string } 
}) {
  const { userId } = await auth();
  const domain = (await params).domain;

  // Fetch site data
  const siteData = await db.select().from(site).where(and(eq(site.domain, domain), eq(site.userId, userId!)));

  if (!siteData) {
    // If site doesn't exist or user doesn't own it, show not authorized
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Not Authorized</h1>
          <p className="mt-2 text-gray-600">You do not have permission to access this site.</p>
        </div>
      </div>
    );
  } else {

    const cmsTypes = await db.select().from(cmsType).where(eq(cmsType.siteDomain, domain));
    return (
      <>
        <SidebarProvider>
          <AppSidebar siteData={siteData[0]} cmsTypes={cmsTypes} />
          <div className="w-full">
            {children}
          </div>
        </SidebarProvider>
      </>
    );
  }
}

