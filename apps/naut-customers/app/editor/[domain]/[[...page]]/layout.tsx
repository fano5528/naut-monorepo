import { db } from "@/db";
import { site } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Layout({ params, children }: {
    params: Promise<{
      domain: string;
      page?: string[];
    }>;
    children: React.ReactNode;
  }) {
    const { userId } = await auth();

    // Fetch site data
    const siteData = await db.query.site.findFirst({
        where: and(
            eq(site.domain, (await params).domain),
            eq(site.userId, userId!)
        )
    });

    if (siteData) {
        return children;
    } else {
        // If site doesn't exist or user doesn't own it, show not authorized
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col text-center">
                    <Image className="w-16 h-auto" src="https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/favicon.ico" alt="Logo" width={100} height={100} />
                    <h1 className="text-2xl font-bold text-gray-900 mt-8">Acceso denegado.</h1>
                    <p className="mt-2 text-gray-600">No tienes permisos para acceder a este sitio.</p>
            </div>
        );
    }
}

export const dynamic = 'force-dynamic'