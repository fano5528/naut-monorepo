// Package imports
import { eq } from "drizzle-orm";

// Local imports
import "../globals.css"; // Tailwind + shadcn
import { getFonts, FontName } from "@/fonts/fonts"; // Dynamic font selection
import "@/public/fontawesome/fontawesome.css"; // Icons
import "@/public/fontawesome/solid.css"; // Icons
import { db } from "@/db/index"; // Database
import { site } from "@naut/schemas"; // Database schema
import { setVariables } from "@/utils/set-variables"; // Set variables like colors, fonts, etc.

// Root layout
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const domain = (await params).domain;

  // Get general site data, as this document will be a container for all pages
  const siteObject = await db.select().from(site).where(eq(site.domain, domain));
  
  // Determine which fonts to load based on site configuration
  const fontsToLoad: FontName[] = [siteObject[0].sansFont as FontName];
  
  // Add optional fonts if they exist
  if (siteObject[0].font2) {
    fontsToLoad.push(siteObject[0].font2 as FontName);
  }
  
  if (siteObject[0].font3) {
    fontsToLoad.push(siteObject[0].font3 as FontName);
  }
  
  // Get only the required fonts (already loaded at module scope)
  const fonts = getFonts(fontsToLoad);

  // Get all utility classes for fonts of this specific site
  let fontClasses = "";

  fontClasses += fonts[siteObject[0].sansFont as FontName].variable;
  if (siteObject[0].font2) {
    fontClasses += " " + fonts[siteObject[0].font2 as FontName].variable;
  }
  if (siteObject[0].font3) {
    fontClasses += " " + fonts[siteObject[0].font3 as FontName].variable;
  }

  const variables = await setVariables(domain);

  return (
    <>
      <html lang="es" className={`${fontClasses}`}>
        <head>
          <style dangerouslySetInnerHTML={{ __html: variables! }} />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}