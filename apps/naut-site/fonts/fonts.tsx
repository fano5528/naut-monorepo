import { Urbanist, Libre_Baskerville, Inter, Raleway, Lexend, DM_Sans, Bodoni_Moda, Montserrat, Crimson_Text, Outfit } from 'next/font/google'
import localFont from 'next/font/local'

// Local fonts - preloaded at module scope as required by Next.js
const bergern = localFont({
  src: [
    {
      path: '../public/fonts/bergern/100.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergern/200.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergern/400.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergern/600.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergern/700.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergern/900.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-bergern',
  preload: false, // Don't preload by default
})

const strawford = localFont({
  src: [
    {
      path: '../public/fonts/strawford/100.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/200.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/strawford/900.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-strawford',
  preload: false, // Don't preload by default
})

const bergenNeue = localFont({
  src: [
    {
      path: '../public/fonts/bergenNeue/300.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergenNeue/400.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergenNeue/500.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergenNeue/600.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergenNeue/700.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/bergenNeue/900.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-bergenNeue',
  preload: false, // Don't preload by default
})

// Google fonts - preloaded at module scope as required by Next.js
const urbanist = Urbanist({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-urbanist',
  preload: false, // Don't preload by default
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin-ext'],
  weight: ["400", "700"],
  variable: '--font-libreBaskerville',
  preload: false, // Don't preload by default
})

const inter = Inter({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
  preload: false, // Don't preload by default
})

const raleway = Raleway({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-raleway',
  preload: false, // Don't preload by default
})

const lexend = Lexend({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-lexend',
  preload: false, // Don't preload by default
})

const dmSans = DM_Sans({
  subsets: ['latin-ext'],
  weight: ["400", "500", "700"],
  variable: '--font-dmSans',
  preload: false, // Don't preload by default
})

const bodoni = Bodoni_Moda({
  subsets: ['latin-ext'],
  weight: ["400", "500", "600", "700"],
  variable: '--font-bodoni',
  preload: false, // Don't preload by default
})

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat',
  preload: false, // Don't preload by default
})

const crimsonText = Crimson_Text({
  subsets: ['latin-ext'],
  weight: ["400"],
  variable: '--font-crimsonText',
  preload: false, // Don't preload by default
})

const outfit = Outfit({
  subsets: ['latin-ext'],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-outfit',
  preload: false, // Don't preload by default
})

// Map of all available fonts
const fontMap = {
  bergern,
  strawford,
  bergenNeue,
  urbanist,
  libreBaskerville,
  inter,
  raleway,
  lexend,
  dmSans,
  bodoni,
  montserrat,
  crimsonText,
  outfit,
};

// Type for font names
export type FontName = keyof typeof fontMap;

// Function to get only the required fonts
export function getFonts(fontNames: FontName[]) {
  const selectedFonts: Record<FontName, typeof fontMap[FontName]> = {} as any;
  
  // Select only the requested fonts
  fontNames.forEach(fontName => {
    if (fontMap[fontName]) {
      selectedFonts[fontName] = fontMap[fontName];
    }
  });
  
  return selectedFonts;
}