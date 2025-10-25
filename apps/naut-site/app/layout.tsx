// Package imports
import { eq } from "drizzle-orm";
import Script from "next/script";

// Local imports
import "./globals.css"; // Tailwind + shadcn
import { getFonts, FontName } from "@/fonts/fonts"; // Dynamic font selection
import "@/public/fontawesome/fontawesome.css"; // Icons
import "@/public/fontawesome/solid.css"; // Icons
import { db } from "@/db/index"; // Database
import { site } from "@/db/schema"; // Database schema
import { setVariables } from "@/utils/set-variables"; // Set variables like colors, fonts, etc.

// Root layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get general site data, as this document will be a container for all pages
  const siteObject = await db.select().from(site).where(eq(site.domain, process.env.DOMAIN!));
  
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
  siteObject[0].font2 && (fontClasses += " " + fonts[siteObject[0].font2 as FontName].variable);
  siteObject[0].font3 && (fontClasses += " " + fonts[siteObject[0].font3 as FontName].variable);

  const metaId = siteObject[0].metaId;
  const googleId = siteObject[0].googleId;

  const variables = await setVariables();

  return (
    <>
      <html lang="es" className={`${fontClasses}`}>
        <head>
          <style dangerouslySetInnerHTML={{ __html: variables! }} />
          {metaId && (
            <>
              {/* Meta Pixel */}
              <Script id="meta-pixel">
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaId}');
                fbq('track', 'PageView');
                `}
              </Script>
              <noscript>
                <img 
                  height="1" 
                  width="1" 
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
                  alt=""
                />
              </noscript>
            </>
          )}
          {googleId && (
              <Script id="google-tag-manager" strategy="afterInteractive">
                {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleId}');
                `}
              </Script>
          )}
        </head>
        <body>
          {googleId && (
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${googleId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
          )}
          {children}
        </body>
      </html>
    </>
  );
}