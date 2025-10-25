// Package imports
import { Metadata } from "next";
import { eq, and, isNotNull } from "drizzle-orm";

// Local imports
import { db } from '@/db';
import { site, page, headerContent, footerContent, field, block, content, cmsEntry, cmsType, cmsEntryContent, cmsField, cmsCategory } from '@/db/schema';
/*import { SearchParams } from "@/lib/types";*/
import TigerHeader from "@/components/headers/TigerHeader";
import ChecoFooter from "@/components/footers/ChecoFooter";
import HendrixHero from "@/components/heroes/HendrixHero";
import GladwellBlock from "@/components/blocks/GladwellBlock";
import JaggerHero from "@/components/heroes/JaggerHero";
import HerbertBlock from "@/components/blocks/HerbertBlock";
import DickensBlock from "@/components/blocks/DickensBlock";
import GreeneBlock from "@/components/blocks/GreeneBlock";
import PetersonHero from "@/components/heroes/PetersonHero";
import VerneBlock from "@/components/blocks/VerneBlock";
import SciasciaBlock from "@/components/blocks/SciasciaBlock";
import ThielBlock from "@/components/blocks/ThielBlock";
import DubnerBlock from "@/components/blocks/DubnerBlock";
import DalioBlock from "@/components/blocks/DalioBlock";
import HarariBlock from "@/components/blocks/HarariBlock";
import RoryHeader from "@/components/headers/RoryHeader";
import MercuryHero from "@/components/heroes/MercuryHero";
import RiordanBlock from "@/components/blocks/RiordanBlock";
import LuBlock from "@/components/blocks/LuBlock";
import FitzgeraldBlock from "@/components/blocks/FitzgeraldBlock";
import BronteBlock from "@/components/blocks/BronteBlock";
import SoleHerbertBlock from "@/components/blocks/SoleHerbertBlock";
import DoyleBlock from "@/components/blocks/DoyleBlock";
import VanhalenHero from "@/components/heroes/VanhalenHero";
import SheeranBanner from "@/components/banners/SheeranBanner";
import MickelsonHeader from "@/components/headers/MickelsonHeader";
import WatersHero from "@/components/heroes/WatersHero";
import OrwellBlock from "@/components/blocks/OrwellBlock";
import MorinBlock from "@/components/blocks/MorinBlock";
import KnightBlock from "@/components/blocks/KnightBlock";
import LennonHero from "@/components/heroes/LennonHero";
import GrohlHero from "@/components/heroes/GrohlHero";
import TurnerHero from "@/components/heroes/TurnerHero";
import AchebeBlock from "@/components/blocks/AchebeBlock";
import KoepkaHeader from "@/components/headers/KoepkaHeader";
import SennaFooter from "@/components/footers/SennaFooter";
import OchoaHeader from "@/components/headers/OchoaHeader";
import GilmourHero from "@/components/heroes/GilmourHero";
import RandBlock from "@/components/blocks/RandBlock";
import AsimovBlock from "@/components/blocks/AsimovBlock";
import AquinoBlock from "@/components/blocks/AquinoBlock";
import YarrosBlock from "@/components/blocks/YarrosBlock";
import LevittBlock from "@/components/blocks/LevittBlock";
import OrtizHeader from "@/components/headers/OrtizHeader";
import DylanHero from "@/components/heroes/DylanHero";
import AustenBlock from "@/components/blocks/AustenBlock";
import ShakespeareBlock from "@/components/blocks/ShakespeareBlock";
import KingBlock from "@/components/blocks/KingBlock";
import GoldingBlock from "@/components/blocks/GoldingBlock";
import ForteBlock from "@/components/blocks/ForteBlock";
import LaudaFooter from "@/components/footers/LaudaFooter";
import MatthewBlock from "@/components/blocks/MatthewBlock";
import CervantesBlock from "@/components/blocks/CervantesBlock";
import MarkBlock from "@/components/blocks/MarkBlock";
import LukeBlock from "@/components/blocks/LukeBlock";
import JohnBlock from "@/components/blocks/JohnBlock";
import MoscatiBlock from "@/components/cms/article/MoscatiBlock";
import AcutisBlock from "@/components/cms/category/AcutisBlock";
import JuanDiegoBlock from "@/components/cms/home/JuanDiegoBlock";
import MatsuyamaHeader from "@/components/headers/MatsuyamaHeader";
import HamiltonFooter from "@/components/footers/HamiltonFooter";
import ProustBlock from "@/components/blocks/ProustBlock";
import DumasBlock from "@/components/blocks/DumasBlock";
import MalkielBlock from "@/components/blocks/MalkielBlock";
import MadonnaBanner from "@/components/banners/MadonnaBanner";
import SubyBlock from "@/components/blocks/SubyBlock";
import VargasBlock from "@/components/blocks/VargasBlock";

// Add this interface near the top of the file
interface DynamicProps {
  [key: string]: any;
}

// Add this interface near the top of the file
interface ComponentType {
  [key: string]: React.ComponentType<any>;
}

// Add near the top with other interfaces
interface BlockProps {
  component: React.ComponentType<any>;
  props: DynamicProps;
}

// Type definition for metadata props
type Props = {
  params: Promise<{ domain: string }>;
};


// Define the components that will be used
const components: ComponentType = {
  TigerHeader,
  ChecoFooter,
  HendrixHero,
  GladwellBlock,
  JaggerHero,
  HerbertBlock,
  DickensBlock,
  GreeneBlock,
  PetersonHero,
  VerneBlock,
  SciasciaBlock,
  ThielBlock,
  DubnerBlock,
  DalioBlock,
  HarariBlock,
  RoryHeader,
  MercuryHero,
  RiordanBlock,
  LuBlock,
  VanhalenHero,
  FitzgeraldBlock,
  BronteBlock,
  SoleHerbertBlock,
  DoyleBlock,
  SheeranBanner,
  MickelsonHeader,
  WatersHero,
  OrwellBlock,
  MorinBlock,
  KnightBlock,
  LennonHero,
  GrohlHero,
  TurnerHero,
  AchebeBlock,
  KoepkaHeader,
  SennaFooter,
  OchoaHeader,
  GilmourHero,
  RandBlock,
  AsimovBlock,
  AquinoBlock,
  YarrosBlock,
  LevittBlock,
  OrtizHeader,
  DylanHero,
  AustenBlock,
  ShakespeareBlock,
  KingBlock,
  GoldingBlock,
  ForteBlock,
  LaudaFooter,
  MatthewBlock,
  CervantesBlock,
  MarkBlock,
  LukeBlock,
  JohnBlock,
  MoscatiBlock,
  AcutisBlock,
  JuanDiegoBlock,
  MatsuyamaHeader,
  HamiltonFooter,
  ProustBlock,
  DumasBlock,
  MalkielBlock,
  MadonnaBanner,
  SubyBlock,
  VargasBlock,
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // Get route from params
  let route = "/";
  const pageParams = await params;
  const domain = pageParams.domain;

  // Get site data for icon (and title and description if page data is not defined)
  const siteData = await db.select().from(site).where(eq(site.domain, domain));

  // Get page data for title and description
  const pageData = await db.select().from(page).where(and(eq(page.siteDomain, domain), eq(page.route, route)));

  // Return metadata
  if (pageData[0]?.title && pageData[0]?.description) {
    // Return page specific data if found
    return {
      title: pageData[0].title,
      description: pageData[0].description,
      icons: {
        icon: siteData[0].icon,
      },
    };
  } else {
    // Return site data if page specific data is not found
    return {
      title: siteData[0].name,
      description: "Esta página fue creada por naut.mx",
      icons: {
        icon: siteData[0].icon,
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const pageParams = await params;
  const domain = pageParams.domain;

  // Define the props that will be sent to the header and footer
  const headerProps: DynamicProps = {};
  const footerProps: DynamicProps = {};

  // Get all the header content from database
  const headerData: any = await db.select().from(headerContent).where(eq(headerContent.siteDomain, domain));
  // Get the name of each field obtained above and turn it into a key value pair inside the headerProps object
  for (let i = 0; i < headerData.length; i++) {
    const fieldInTurn = await db.select().from(field).where(eq(field.id, headerData[i].fieldId));
    headerProps[fieldInTurn[0]?.name] = headerData[i].value.payload;
  }

  // Get all the footer content from database
  const footerData: any = await db.select().from(footerContent).where(eq(footerContent.siteDomain, domain));

  // Get the name of each field obtained above and turn it into a key value pair inside the footerProps object
  for (let i = 0; i < footerData.length; i++) {
    const fieldInTurn = await db.select().from(field).where(eq(field.id, footerData[i].fieldId));
    footerProps[fieldInTurn[0]?.name] = footerData[i].value.payload;
  }

  // Get the site data
  const siteData = await db.select().from(site).where(eq(site.domain, domain));

  // Define an object with all of the information needed to render the header (the component and its props)
  const headerInfo = {
    component: components[siteData[0]?.headerComponentName as keyof ComponentType],
    props: headerProps,
  };
  // Define an object with all of the information needed to render the footer (the component and its props)
  const footerInfo = {
    component: components[siteData[0]?.footerComponentName as keyof ComponentType],
    props: footerProps,
  };

    // Get route from params of function
    let route = "/";

    // Get specific page data
    const pageData = await db.select().from(page).where(and(eq(page.siteDomain, domain), eq(page.route, route)));
    const { header, footer } = pageData?.[0];

    // Get all the blocks from the specific page
    const blocks: BlockProps[] = [];
    const blocksData = await db.select().from(block).where(eq(block.pageId, pageData[0].id));

    // For each block, get the component, and each of its props. Store everything in an array of objects defined above as blocks
    for (let i = 0; i < blocksData.length; i++) {
      const blockInTurn = blocksData.find((block) => block.order === i);
      const blockData: any = await db.select().from(content).where(eq(content.blockId, blockInTurn?.id!));
      const component = components[blockInTurn?.componentName as keyof ComponentType];
      const props = {};
      for (let j = 0; j < blockData.length; j++) {
        const fieldInTurn = await db.select().from(field).where(eq(field.id, blockData[j].fieldId));
        props[fieldInTurn[0]?.name as keyof Object] = blockData[j].value?.payload;
      }
      blocks.push({
        component: component,
        props: props,
      });
    }

    return (
      <div data-nextjs-scroll-focus-boundary>
        { /* If the page goes with a header, render it with its component and respective props */}
        {header ? <headerInfo.component {...headerInfo.props} edit={false} spacer={pageData[0].spacer} invertHeaderColor={pageData[0].invertHeaderColor} /> : <></>}

        { /* For each of the blocks on the page, render its component and respective props */}
        {blocks.map((block: BlockProps, index) => (
          <div key={index}>
            <block.component {...block.props} reference={{}} edit={false} />
          </div>
        ))}

        { /* If the page goes with a footer, render it with its component and respective props */}
        {footer ? <footerInfo.component {...footerInfo.props} edit={false} /> : <></>}
      </div>
    );
  
}