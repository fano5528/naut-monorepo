/**
 * Component interfaces extracted from naut-preview
 * 
 * This file contains TypeScript interfaces for all components to ensure type safety.
 * These interfaces were migrated from the naut-preview repository while keeping
 * the current component implementations in naut-site.
 * 
 * Components included:
 * - 44+ Block components (AchebeBlock, AquinoBlock, AsimovBlock, etc.)
 * - 12 Hero components (HendrixHero, BowieHero, DylanHero, etc.)
 * - 7 Header components (TigerHeader, KoepkaHeader, MatsuyamaHeader, etc.)
 * - 4 Footer components (ChecoFooter, HamiltonFooter, LaudaFooter, SennaFooter)
 * 
 * All interfaces follow the same pattern with:
 * - edit: boolean (for edit mode)
 * - reference: any (for content references)
 * - Component-specific props as defined in the original implementations
 */

// ===============================
// BLOCK COMPONENT INTERFACES
// ===============================

export interface AchebeBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { image: string }[];
}

export interface AquinoBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  color: string;
}

export interface AsimovBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  mainTestimonialBody: string;
  mainTestimonialName: string;
  mainTestimonialImage: string;
  mainTestimonialLogo: string;
  testimonials1: { body: string; name: string; image: string }[];
  testimonials2: { body: string; name: string; image: string }[];
  testimonials3: { body: string; name: string; image: string }[];
  testimonials4: { body: string; name: string; image: string }[];
}

export interface AustenBlockProps {
  title: string;
  content: {
    subtitle: string;
    title: string;
    description: string;
    color: string;
    image: string;
    ctaLink: string;
    ctaText: string;
  }[];
  reference: any;
  edit: boolean;
}

export interface BronteBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { name: string; icon: string; description: string }[];
}

export interface CervantesBlockProps {
  edit: boolean;
  reference: any;
  media: Array<{ url: string }>;
}

export interface CollinsBlockProps {
  title: string;
  description: string;
  content: {
    image: string;
    href: string;
    date: string;
    category: string;
    title: string;
    description: string;
  }[];
  reference: any;
  edit: boolean;
}

export interface DalioBlockProps {
  title1: string;
  description1: string;
  content1: { name: string; ctaText: string; ctaLink: string }[];
  isSecond: boolean;
  title2?: string;
  description2?: string;
  content2?: { name: string; ctaText: string; ctaLink: string }[];
  edit: boolean;
  reference: any;
}

export interface DickensBlockProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  edit: boolean;
  reference: any;
}

export interface DoyleBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  frequencies: {
    value: string;
    label: string;
    priceSuffix: string;
  }[];
  tiers: {
    name: string;
    id: string;
    href: string;
    price: any;
    description: string;
    features: string[];
    mostPopular: boolean;
  }[];
}

export interface DubnerBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: { icon: string; name: string; description: string }[];
}

export interface DumasBlockProps {
  title: string;
  description: string;
  content: { name: string; image: string }[];
  edit: boolean;
  reference: any;
}

export interface FitzgeraldBlockProps {
  edit: boolean;
  reference: any;
  unhighlightedTitle: string;
  highlightedTitle: string;
  description: string;
}

export interface ForteBlockProps {
  content: string;
  logos: { src: string }[];
  edit: boolean;
  reference: any;
}

export interface GladwellBlockProps {
  title: string;
  description: string;
  features: Array<{ name: string; description: string }>;
  edit?: boolean;
  reference?: any;
}

export interface GoldingBlockProps {
  image: string;
  video: string;
  content: string;
  textOnLeft: boolean;
  edit: boolean;
  reference: any;
}

export interface GrahamBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description1?: string;
  description2?: string;
  content?: {
    name: string;
    description: string;
    icon: string;
  }[];
  image: string;
}

export interface GreeneBlockProps {
  title: string;
  isDescription: boolean;
  description?: string;
  content: {
    image: string;
    url: string;
    text: string;
  }[];
  edit: boolean;
  reference: any;
}

export interface HarariBlockProps {
  edit: boolean;
  reference: any;
  isDescription: boolean;
  title: string;
  description: string;
  content: { question: string; answer: string[] }[];
}

export interface HerbertBlockProps {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  cta1: boolean;
  cta2: boolean;
  ctaText1?: string;
  ctaText2?: string;
  ctaLink1?: string;
  ctaLink2?: string;
  edit: boolean;
  reference: any;
}

export interface HorowitzBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: {
    name: string;
    date: string;
    author: string;
    image: string;
    href: string;
  }[];
}

export interface JohnBlockProps {
  edit: boolean;
  reference: any;
  media: Array<{ url: string }>;
}

export interface KingBlockProps {
  title: string;
  subtitle: string;
  ctaText: string;
  typeUid: string;
  domain: string;
  edit: boolean;
  reference: any;
}

export interface KnightBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
}

export interface LevittBlockProps {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  title: string;
  description: string;
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
  edit: boolean;
  reference: any;
}

export interface LuBlockProps {
  cutImage: boolean;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: { 
    name: string; 
    description: string; 
    icon: string 
  }[];
  textOnLeft: boolean;
  edit: boolean;
  reference: any;
}

export interface LukeBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; price: string; originalPrice: string; link: string; image: string }[];
}

export interface MalkielBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
  content: { question: string; answer: string }[];
}

export interface MarkBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; description: string; image: string }[];
}

export interface MatthewBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  subtitle: string;
  description: string;
}

export interface MorinBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { name: string; description: string; href: string }[];
}

export interface OrwellBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { icon: string; name: string; description: string }[];
}

export interface PragerBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
}

export interface ProustBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
}

export interface RandBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { name: string; description: string; icon: string }[];
}

export interface RiordanBlockProps {
  reference: any;
  edit: boolean;
  title: string;
  description: string;
  ctaText1: string;
  ctaLink1: string;
  isCta2: boolean;
  ctaText2?: string;
  ctaLink2?: string;
  color1: string;
}

export interface SciasciaBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  stats: { label: string; value: string }[];
  edit: boolean;
  reference: any;
  ctaText?: string;
  ctaLink?: string;
}

export interface ShakespeareBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; price: string; description: string; features: string[]; href: string; mostPopular: boolean }[];
}

export interface SoleHerbertBlockProps {
  isFirst: boolean;
  textOnLeft: boolean;
  title: string;
  description: string;
  image: string;
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
  cutImage: boolean;
  edit: boolean;
  reference: any;
  subtitle?: string;
}

export interface SubyBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
  content: { icon: string; name: string; description: string }[];
}

export interface ThielBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
}

export interface VargasBlockProps {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { name: string; description: string; icon: string }[];
}

export interface VerneBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; role: string; image: string }[];
  ctaText?: string;
  ctaLink?: string;
}

export interface YarrosBlockProps {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; logo: string }[];
}

// ===============================
// HEADER COMPONENT INTERFACES
// ===============================

export interface TigerHeaderProps {
  navigation: { name: string; href: string }[];
  logo: string;
  logoHeight: string;
  edit: boolean;
  spacer: boolean;
}

export interface KoepkaHeaderProps {
  edit: boolean;
  reference: any;
  logo: string;
  navigation: { name: string; href: string }[];
  logoHeight: string;
  spacer: boolean;
  rightMenu: { name: string; href: string; isCta: boolean }[];
}

export interface MatsuyamaHeaderProps {
  spacer: boolean;
  logo: string;
  rightMenu: { name: string; href: string; isCta: boolean }[];
  edit: boolean;
}

export interface MickelsonHeaderProps {
  edit: boolean;
  logo: string;
  navigation: { name: string; href: string }[];
  logoHeight: string;
  spacer: boolean;
}

export interface OchoaHeaderProps {
  edit: boolean;
  invertHeaderColor: boolean;
  logo: string;
  invertedLogo: string;
  navigation: { name: string; href: string }[];
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface OrtizHeaderProps {
  edit: boolean;
  reference: any;
  logo: string;
  spacer: boolean;
}

export interface RoryHeaderProps {
  edit: boolean;
  logo: string;
  navigation: { name: string; href: string }[];
  rightMenu: { name: string; href: string; isCta: boolean }[];
}

// ===============================
// FOOTER COMPONENT INTERFACES
// ===============================

export interface ChecoFooterProps {
  navigation: { name: string; href: string }[];
  social: { name: string; href: string }[];
  edit: boolean;
}

export interface HamiltonFooterProps {
  edit?: boolean;
  social: { name: string; href: string }[];
  logo: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

export interface LaudaFooterProps {
  edit: boolean;
  reference: any;
}

export interface SennaFooterProps {
  edit: boolean;
  ref: any;
  navigation: { name: string; href: string }[];
  social: { name: string; href: string }[];
  logo: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

// ===============================
// HERO COMPONENT INTERFACES
// ===============================

export interface HendrixHeroProps {
  title: string;
  description: string;
  edit: boolean;
  reference: any;
}

export interface BowieHeroProps {
  edit: boolean;
  reference: any;
}

export interface DylanHeroProps {
  content: {
    title: string;
    description: string;
    link: string;
    background: string;
  }[];
  edit: boolean;
  reference: any;
}

export interface GilmourHeroProps {
  title: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  edit: boolean;
  reference: any;
}

export interface GrohlHeroProps {
  title: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  image: string;
  video: string;
  edit: boolean;
  reference: any;
}

export interface JaggerHeroProps {
  content: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  cta1Text: string;
  cta1Link: string;
  cta1Icon: string;
  cta2Text: string;
  cta2Link: string;
  cta2Icon: string;
  edit: boolean;
  reference: any;
}

export interface LennonHeroProps {
  title: string;
  image: string;
  edit: boolean;
  reference: any;
}

export interface MercuryHeroProps {
  title: string;
  description: string;
  hasTopInfo: boolean;
  topInfoLink: string;
  topInfoTag: string;
  topInfoName: string;
  isCta1: boolean;
  cta1Text: string;
  cta1Link: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  image: string;
  edit: boolean;
  reference: any;
}

export interface PetersonHeroProps {
  title: string;
  subtitle: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text: string;
  cta2Text: string;
  cta1Link: string;
  cta2Link: string;
  image: string;
  cutImage: boolean;
  edit: boolean;
  reference: any;
}

export interface TurnerHeroProps {
  title: string;
  description: string;
  cta1Text: string;
  cta1Link: string;
  image: string;
  isBanner: boolean;
  bannerText: string;
  bannerCtaText: string;
  bannerCtaLink: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  isCta1: boolean;
  edit: boolean;
  reference: any;
}

export interface VanhalenHeroProps {
  icon: string;
  hasTopInfo: boolean;
  topInfoTag: string;
  topInfoText: string;
  topInfoLink: string;
  text: string;
  isCta1: boolean;
  cta1Text: string;
  cta1Link: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  image: string;
  edit: boolean;
  reference: any;
}

export interface WatersHeroProps {
  title: string;
  description: string;
  image: string;
  isCta1: boolean;
  isCta2: boolean;
  isBanner: boolean;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  bannerText: string;
  bannerCtaText: string;
  bannerCtaLink: string;
  isLight: boolean;
  edit: boolean;
  reference: any;
}