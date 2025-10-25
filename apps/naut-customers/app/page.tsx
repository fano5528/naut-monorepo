import { H1, H3 } from "@/components/ui/typography";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { db } from "@/db";
import { site } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {

  const { userId } = await auth();

  const sites = await db.select({ domain: site.domain, name: site.name, icon: site.icon }).from(site).where(eq(site.userId, userId!));

  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 bg-naut">
        <Image className="h-16 w-auto" src="https://internaut.nyc3.cdn.digitaloceanspaces.com/colegiocuernavaca.edu.mx/white.png" alt="Logo" width={1000} height={1000} />
        <H1 className="mt-10 text-nautBg">Selecciona un sitio para continuar...</H1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:mt-12 px-12">
        {sites.map((siteToMap) => (
          <Link key={siteToMap.domain} href={`/sitio/${siteToMap.domain}`} className="shadow-md hover:shadow-sm border rounded-lg p-8 transition-300">
            <Image className="h-12 w-auto" src={siteToMap.icon} alt={siteToMap.name} width={1000} height={1000} />
            <H3 className="mt-4">{siteToMap.name}</H3>
            <p className="text-sm text-text/40">{siteToMap.domain}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
