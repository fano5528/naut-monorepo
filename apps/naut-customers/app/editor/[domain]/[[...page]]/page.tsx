// Package imports
import { Metadata } from "next";
import { eq, and } from "drizzle-orm";
import { setVariables } from "@/utils/set-variables";

// Local imports
import { db } from '@/db';
import { site, page, headerContent, footerContent, field, block, content } from '@/db/schema';
import * as fonts from "@/fonts/fonts";
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
import GoyaHeader from "@/components/headers/GoyaHeader";
import StevensonBlock from "@/components/blocks/StevensonBlock";
import DostoevskyBlock from "@/components/blocks/DostoevskyBlock";
import SertillangesBlock from "@/components/blocks/SertillangesBlock";
import { FormWrapper } from "@/components/form-wrapper"
import { next } from './actions';
import { DraggableCard } from './DraggableCard';

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
  reference: DynamicProps;
}

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
  ProustBlock,
  DumasBlock,
  MalkielBlock,
  MadonnaBanner,
  MoscatiBlock,
  AcutisBlock,
  JuanDiegoBlock,
  MatsuyamaHeader,
  HamiltonFooter,
  SubyBlock,
  VargasBlock,
  GoyaHeader,
  StevensonBlock,
  DostoevskyBlock,
  SertillangesBlock,
};

export const metadata: Metadata = {
  title: "Editor de página",
  description: "Estás editando una página con el editor de Naut."
};

export default async function Page({ params }: {
  params: Promise<{
    domain: string;
    page?: string[]
  }>
}) {
  const pageParams = await params;

  const variables = await setVariables((await params).domain);

  // Define the props that will be sent to the header and footer
  const headerProps: DynamicProps = {};
  const headerReference: DynamicProps = {};
  const footerProps: DynamicProps = {};

  // Replace process.env.DOMAIN with pageParams.domain in all queries
  const headerData: any = await db.select()
    .from(headerContent)
    .where(eq(headerContent.siteDomain, pageParams.domain));

  // Get the name of each field obtained above and turn it into a key value pair inside the headerProps object
  for (let i = 0; i < headerData.length; i++) {
    const fieldInTurn = await db.select().from(field).where(eq(field.id, headerData[i].fieldId));
    headerProps[fieldInTurn[0]?.name] = headerData[i].value.payload;
    headerReference[fieldInTurn[0]?.name] = headerData[i].id.toString();
  }

  // Get all the footer content from database
  const footerData: any = await db.select().from(footerContent).where(eq(footerContent.siteDomain, pageParams.domain));

  // Get the name of each field obtained above and turn it into a key value pair inside the footerProps object
  for (let i = 0; i < footerData.length; i++) {
    const fieldInTurn = await db.select().from(field).where(eq(field.id, footerData[i].fieldId));
    footerProps[fieldInTurn[0]?.name] = footerData[i].value.payload;
  }

  // Get the site data
  const siteData = await db.select()
    .from(site)
    .where(eq(site.domain, pageParams.domain));

  // Define an object with all of the information needed to render the header (the component and its props)
  const headerInfo = {
    component: components[siteData[0]?.headerComponentName as keyof ComponentType],
    props: headerProps,
    reference: headerReference,
  };
  // Define an object with all of the information needed to render the footer (the component and its props)
  const footerInfo = {
    component: components[siteData[0]?.footerComponentName as keyof ComponentType],
    props: footerProps,
  };

  // Get route from params
  let route = "/";

  if (pageParams.page) {
    if (pageParams.page[0] == "index") {
      route = "/";
    } else {
      route = "/" + pageParams.page.join("/");
    }
  }

  // Get specific page data
  const pageData = await db.select()
    .from(page)
    .where(and(eq(page.siteDomain, pageParams.domain), eq(page.route, route)));
  const { header, footer } = pageData[0];

  // Get all the blocks from the specific page
  const blocks: BlockProps[] = [];
  const blocksData = await db.select().from(block).where(eq(block.pageId, pageData[0].id));

  // For each block, get the component, and each of its props. Store everything in an array of objects defined above as blocks
  for (let i = 0; i < blocksData.length; i++) {
    const blockInTurn = blocksData.find((block) => block.order === i);
    const blockData: any = await db.select().from(content).where(eq(content.blockId, blockInTurn?.id!));
    const component = components[blockInTurn?.componentName as keyof ComponentType];
    const props = {};
    const reference = {};
    for (let j = 0; j < blockData.length; j++) {
      const fieldInTurn = await db.select().from(field).where(eq(field.id, blockData[j].fieldId));

      // Safely extract payload, handling cases where value is stored as a stringified JSON
      let payload: any = blockData[j].value?.payload;
      if (payload === undefined && typeof (blockData[j].value as any) === "string") {
        try {
          const parsed = JSON.parse(blockData[j].value as unknown as string);
          payload = parsed?.payload ?? parsed;
        } catch {}
      }

      // Normalize Harari-like structures: ensure answer is an array
      if (Array.isArray(payload)) {
        payload = payload.map((item: any) => {
          if (item && typeof item.answer === "string") {
            try {
              const parsedAnswer = JSON.parse(item.answer);
              if (Array.isArray(parsedAnswer)) item.answer = parsedAnswer;
            } catch {}
          }
          return item;
        });
      }

      props[fieldInTurn[0]?.name as keyof Object] = payload;
      reference[fieldInTurn[0]?.name as keyof Object] = blockData[j].id.toString();
    }
    blocks.push({
      component: component,
      props: props,
      reference: reference,
    });
  }

  let fontClasses = "";

  fontClasses += fonts[siteData[0].sansFont as keyof typeof fonts].variable;
  siteData[0].font2 && (fontClasses += " " + fonts[siteData[0].font2 as keyof typeof fonts].variable);
  siteData[0].font3 && (fontClasses += " " + fonts[siteData[0].font3 as keyof typeof fonts].variable);

  return (
    <FormWrapper action={next} domain={(await params).domain}>
      <div
        data-nextjs-scroll-focus-boundary
        className={`${fontClasses} font-sans`}
      >
        <style dangerouslySetInnerHTML={{ __html: variables! }} />
        { /* If the page goes with a header, render it with its component and respective props */}
        {header ? <headerInfo.component {...headerInfo.props} reference={headerInfo.reference} edit={true} spacer={pageData[0].spacer} invertHeaderColor={pageData[0].invertHeaderColor} /> : <></>}

        { /* For each of the blocks on the page, render its component and respective props */}
        {blocks.map((block: BlockProps, index) => (
          <div key={index}>
            <block.component {...block.props} reference={block.reference} edit={true} />
          </div>
        ))}

        { /* If the page goes with a footer, render it with its component and respective props */}
        {footer ? <footerInfo.component {...footerInfo.props} edit={true} /> : <></>}
      </div>
      <DraggableCard domain={(await params).domain} />
    </FormWrapper>
  );
}