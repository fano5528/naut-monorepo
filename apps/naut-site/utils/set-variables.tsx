import { db } from '@/db';
import { site } from '@naut/schemas';
import { eq } from 'drizzle-orm';
import { formatHSL } from './color-utils';

export async function setVariables() {
  const siteData = await db.select().from(site).where(eq(site.domain, process.env.DOMAIN!));

  if (!siteData || !siteData[0]) {
    return;
  }

  return `
  :root {
    --foreground: ${formatHSL(siteData[0].titleColor)};
    --background: ${formatHSL(siteData[0].backgroundColor1)};
    --background2: ${formatHSL(siteData[0].backgroundColor2)};
    --primary: ${formatHSL(siteData[0].color1)};
    --font-sans: var(--font-${siteData[0].sansFont});
    ${siteData[0].font2 ? `--font-font2: var(--font-${siteData[0].font2});` : `--font-font2: var(--font-${siteData[0].sansFont});` }
    ${siteData[0].font3 ? `--font-font3: var(--font-${siteData[0].font3});` : `--font-font3: var(--font-${siteData[0].sansFont});` }
    --color1: ${formatHSL(siteData[0].color1)};
    --color1Hover: ${formatHSL(siteData[0].color1Hover)};
    --color2: ${ siteData[0].color2 ? formatHSL(siteData[0].color2) : formatHSL(siteData[0].color1) };
    --color2Hover: ${ siteData[0].color2Hover ? formatHSL(siteData[0].color2Hover) : formatHSL(siteData[0].color1Hover) };
    --color3: ${ siteData[0].color3 ? formatHSL(siteData[0].color3) : siteData[0].color2 ? formatHSL(siteData[0].color2) : formatHSL(siteData[0].color1) };
    --color3Hover: ${ siteData[0].color3Hover ? formatHSL(siteData[0].color3Hover) : siteData[0].color2Hover ? formatHSL(siteData[0].color2Hover) : formatHSL(siteData[0].color1Hover) };
    --footerBackground: ${formatHSL(siteData[0].footerBackgroundColor)};
    --footerText: ${formatHSL(siteData[0].footerTextColor)};
    --title: ${formatHSL(siteData[0].titleColor)};
    --text: ${formatHSL(siteData[0].textColor)};
    --headerBackground: ${formatHSL(siteData[0].headerBackgroundColor)};

  }` as string;
}