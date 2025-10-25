import { Urbanist, Libre_Baskerville, Inter, Raleway, Lexend, DM_Sans, Bodoni_Moda, Montserrat, Crimson_Text, Outfit, DM_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Local fonts
export const bergern = localFont({
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
})
export const strawford = localFont({
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
})
export const bergenNeue = localFont({
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
})

// Google fonts
export const urbanist = Urbanist({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-urbanist',
})
export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin-ext'],
  weight: ["400", "700"],
  variable: '--font-libreBaskerville',
})
export const inter = Inter({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
})
export const raleway = Raleway({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-raleway',
})
export const lexend = Lexend({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-lexend',
})
export const dmSans = DM_Sans({
  subsets: ['latin-ext'],
  weight: ["400", "500", "700"],
  variable: '--font-dmSans',
})
export const bodoni = Bodoni_Moda({
  subsets: ['latin-ext'],
  weight: ["400", "500", "600", "700"],
  variable: '--font-bodoni',
})
export const montserrat = Montserrat({
  subsets: ['latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat',
})
export const crimsonText = Crimson_Text({
  subsets: ['latin-ext'],
  weight: ["400"],
  variable: '--font-crimsonText',
})

export const outfit = Outfit({
  subsets: ['latin-ext'],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-outfit',
})

export const dmMono = DM_Mono({
  subsets: ['latin-ext'],
  weight: ["300", "400", "500"],
  variable: '--font-dmMono',
})