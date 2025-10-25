import { Props as SoleHerbertBlockProps } from './components/blocks/SoleHerbertBlock';
import { Props as ChecoFooterProps } from './components/footers/ChecoFooter';
import { Props as TigerHeaderProps } from './components/headers/TigerHeader';

const defaultImage = "https://internaut.nyc3.cdn.digitaloceanspaces.com/default.jpg"

export const nautComponents = {
  banners: [],
  blocks: [{
    name: "SoleHerbertBlock",
    props: {
      isFirst: true,
      textOnLeft: true,
      title: "Este es el prop 'title' de SoleHerbertBlock",
      description: "Este es el prop 'description' de SoleHerbertBlock",
      image: defaultImage,
      isCta: true,
      ctaText: "ctaText prop",
      ctaLink: "#",
      cutImage: true,
      subtitle: "Este es el prop 'subtitle' de SoleHerbertBlock"
    } as SoleHerbertBlockProps
  }],
  footers: [{
    name: "ChecoFooter",
    props: {
      navigation: [
        { name: "navigation[0].name", href: "#" },
        { name: "navigation[1].name", href: "#" },
        { name: "navigation[2].name", href: "#" },
        { name: "navigation[3].name", href: "#" },
      ],
      social: [
        { name: "facebook", href: "#" },
        { name: "instagram", href: "#" },
        { name: "twitter", href: "#" },
        { name: "youtube", href: "#" }
      ],
    } as ChecoFooterProps
  }],
  headers: [{
    name: "TigerHeader",
    props: {
      logo: defaultImage,
      navigation: [
        { name: "navigation[0].name", href: "#" },
      ],
      logoHeight: "10",
      spacer: true
    } as TigerHeaderProps
  }],
  heroes: [{
    name: "HendrixHero",
    props: {
      title: "Este es el prop 'title' de HendrixHero",
      description: "Este es el prop 'description' de HendrixHero"
    }
  }, {
    name: "BowieHero",
    props: {}
  }, {
    name: "DylanHero",
    props: {
      content: [
        {
          title: "Primera diapositiva",
          description: "Descripción de la primera diapositiva",
          link: "#",
          background: defaultImage
        },
        {
          title: "Segunda diapositiva",
          description: "Descripción de la segunda diapositiva",
          link: "#",
          background: defaultImage
        }
      ]
    }
  }, {
    name: "GilmourHero",
    props: {
      title: "Título de GilmourHero",
      description: "Descripción de GilmourHero",
      isCta1: true,
      isCta2: true,
      cta1Text: "Botón Principal",
      cta1Link: "#",
      cta2Text: "Enlace Secundario",
      cta2Link: "#"
    }
  }, {
    name: "GrohlHero",
    props: {
      title: "Título de GrohlHero",
      description: "Descripción de GrohlHero",
      isCta1: true,
      isCta2: true,
      cta1Text: "Ver Video",
      cta1Link: "#",
      cta2Text: "Más Info",
      cta2Link: "#",
      image: defaultImage,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  }, {
    name: "JaggerHero",
    props: {
      content: "<h1>Título Principal</h1><p>Contenido rico de JaggerHero con texto formateado.</p>",
      image1: defaultImage,
      image2: defaultImage,
      image3: defaultImage,
      image4: defaultImage,
      image5: defaultImage,
      cta1Text: "Acción Principal",
      cta1Link: "#",
      cta1Icon: "arrow-right",
      cta2Text: "Acción Secundaria",
      cta2Link: "#",
      cta2Icon: "external-link"
    }
  }, {
    name: "LennonHero",
    props: {
      title: "Título de LennonHero",
      image: defaultImage
    }
  }, {
    name: "MercuryHero",
    props: {
      title: "Título de MercuryHero",
      description: "Descripción de MercuryHero",
      hasTopInfo: true,
      topInfoLink: "#",
      topInfoTag: "Nuevo",
      topInfoName: "Ver anuncio",
      isCta1: true,
      cta1Text: "Comenzar",
      cta1Link: "#",
      isCta2: true,
      cta2Text: "Más información",
      cta2Link: "#",
      image: defaultImage
    }
  }, {
    name: "PetersonHero",
    props: {
      title: "Título de PetersonHero",
      subtitle: "Subtítulo",
      description: "Descripción de PetersonHero",
      isCta1: true,
      isCta2: true,
      cta1Text: "Acción Principal",
      cta2Text: "Acción Secundaria",
      cta1Link: "#",
      cta2Link: "#",
      image: defaultImage,
      cutImage: false
    }
  }, {
    name: "TurnerHero",
    props: {
      title: "Título de TurnerHero",
      description: "Descripción de TurnerHero",
      cta1Text: "Descargar App",
      cta1Link: "#",
      image: defaultImage,
      isBanner: true,
      bannerText: "Nueva versión disponible",
      bannerCtaText: "Ver más",
      bannerCtaLink: "#",
      isCta2: true,
      cta2Text: "Más información",
      cta2Link: "#",
      isCta1: true
    }
  }, {
    name: "VanhalenHero",
    props: {
      icon: defaultImage,
      hasTopInfo: true,
      topInfoTag: "Beta",
      topInfoText: "Versión beta disponible",
      topInfoLink: "#",
      title: "Título de VanhalenHero",
      description: "Descripción de VanhalenHero",
      isCta1: true,
      cta1Text: "Comenzar",
      cta1Link: "#",
      isCta2: true,
      cta2Text: "Documentación",
      cta2Link: "#",
      image: defaultImage
    }
  }, {
    name: "WatersHero",
    props: {
      title: "Título de WatersHero",
      description: "Descripción de WatersHero",
      image: defaultImage,
      isCta1: true,
      isCta2: true,
      isBanner: true,
      cta1Text: "Acción Principal",
      cta1Link: "#",
      cta2Text: "Acción Secundaria",
      cta2Link: "#",
      bannerText: "Oferta especial",
      bannerCtaText: "Ver ofertas",
      bannerCtaLink: "#",
      isLight: false
    }
  }]
}