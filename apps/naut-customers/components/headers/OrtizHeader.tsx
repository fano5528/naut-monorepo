"use client";

import Image from "next/image";
import {
  Bars2Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Headerlink from "../headerlink/Headerlink";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeaderIconLink from "../headerlink/HeaderIconLink";
import Link from "next/link";

type NavigationItem = {
  name: string;
  children: {
    name: string,
    href: string,
  }[];
};

const navigation: NavigationItem[] = [
  {
    name: "Vanguardia Educativa",
    children: [
      {
        name: "Nuestra Vanguardia Educativa",
        href: "/vanguardia-educativa",
      },
      {
        name: "Reconocimientos",
        href: "/vanguardia-educativa/reconocimientos",
      },
      {
        name: "Pensamiento Lógico-Matemático",
        href: "/vanguardia-educativa/pensamiento-logico-matematico",
      },
      {
        name: "Lenguaje y comunicación",
        href: "/vanguardia-educativa/lenguaje-y-comunicacion",
      },
      { name: "Tecnologías", href: "/vanguardia-educativa/tecnologias" },
      { name: "Socioemociones", href: "/vanguardia-educativa/socioemociones" },
      { name: "Artes", href: "/vanguardia-educativa/artes" },
      { name: "Idiomas", href: "/vanguardia-educativa/idiomas" },
      { name: "Ciencias", href: "/vanguardia-educativa/ciencias" },
    ],
  },
  {
    name: "Academia",
    children: [
      {
        name: "Academia",
        href: "/academia",
      },
      {
        name: "Preescolar",
        href: "/academia/preescolar",
      },
      {
        name: "Primaria",
        href: "/academia/primaria",
      },
      {
        name: "Secundaria",
        href: "/academia/secundaria",
      },
    ],
  },
  {
    name: "Comunidad",
    children: [
      {
        name: "Extracurriculares",
        href: "/comunidad/extracurriculares",
      },
      {
        name: "Acción Social",
        href: "/comunidad/accion-social",
      },
      {
        name: "Triada Educativa",
        href: "/comunidad/triada-educativa",
      },
      {
        name: "Alumni",
        href: "/comunidad/alumni",
      },
      {
        name: "Directorio Comercial",
        href: "https://colegiocuernavaca.edu.mx/directorio-comercial.pdf",
      },
    ],
  },
  {
    name: "Blog",
    children: [
      {
        name: "Blog",
        href: "/cms/home/blog",
      },
      {
        name: "Noticias",
        href: "/cms/category/1",
      },
      {
        name: "Pedagogía",
        href: "/cms/category/2",
      },
    ],
  },
];

const social = [
  {
    name: "facebook",
    href: "https://www.facebook.com/ColegioCuernavaca/"
  },
  {
    name: "youtube",
    href: "https://www.youtube.com/user/ColegioCuernavaca"
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/colegiocuernavaca/"
  },
  {
    name: "tiktok",
    href: "https://www.tiktok.com/@colegiocuernavaca"
  }
]

const icons: any = {
  facebook: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  ),
  instagram: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  twitter: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  github: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  youtube: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  linkedin: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    </svg>
  ),
  tiktok: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M16 1H12.5V16.5C12.5 18 11 19.5 9.5 19.5C8 19.5 6.5 19 6.5 16.5C6.5 14.5 8.39888 13.1614 10 13.5V10C3.88087 10 3 15 3 16.5C3 18 3.977 23 9.5 23C14.0224 23 16 19.5 16 17V8C17.1465 9.0179 18.9222 9.35727 21 9.5V6C17.983 6 16 3.34635 16 1Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export default function OrtizHeader(props: {
  edit: boolean;
  reference: any;
  logo: string;
  navigation: NavigationItem[];
  logoHeight: string;
  spacer: boolean;
  rightMenu: { name: string; href: string; isCta: boolean }[];
  invertHeaderColor: boolean;
  invertedLogo?: string;
}) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState<number | null>(null);

  // rest of the code

  useEffect(() => {
    if (window.scrollY != 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY != 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    });
  }, []);

  return (
    <>
      <div className="header relative">
        <div
          className={`${
            hasScrolled
              ? "bg-header/90 w-[calc(100vw-2rem)] mx-4 px-6 mt-4 py-4 backdrop-blur-2xl"
              : "bg-header/0 w-[100vw] px-10 py-8"
          } flex rounded-md items-center justify-between fixed duration-[10000] z-30 top-0p`}
        >
          <div className="flex items-center justify-start sm:justify-center">
            <Link href="/">
            <Image
              className={`${
                props.logoHeight == "5"
                  ? "h-4"
                  : props.logoHeight == "6"
                  ? "h-5"
                  : props.logoHeight == "7"
                  ? "h-6"
                  : props.logoHeight == "8"
                  ? "h-6"
                  : props.logoHeight == "9"
                  ? "h-7"
                  : props.logoHeight == "10"
                  ? "h-8"
                  : props.logoHeight == "11"
                  ? "h-9"
                  : props.logoHeight == "12"
                  ? "h-10"
                  : props.logoHeight == "14"
                  ? "h-10"
                  : "h-8"
              } ${
                props.logoHeight == "5"
                  ? "sm:h-5"
                  : props.logoHeight == "6"
                  ? "sm:h-6"
                  : props.logoHeight == "7"
                  ? "sm:h-7"
                  : props.logoHeight == "8"
                  ? "sm:h-8"
                  : props.logoHeight == "9"
                  ? "sm:h-9"
                  : props.logoHeight == "10"
                  ? "sm:h-10"
                  : props.logoHeight == "11"
                  ? "sm:h-11"
                  : props.logoHeight == "12"
                  ? "sm:h-12"
                  : props.logoHeight == "14"
                  ? "sm:h-14"
                  : "sm:h-8"
              } w-auto sm:order-none justify-start`}
              src={ props.invertHeaderColor ? mobileMenuOpen ? props.logo : hasScrolled ? props.logo : props.invertedLogo! : props.logo }
              alt="Naut Logo"
              width={1000}
              height={1000}
            />
            </Link>
          </div>
          <div className="flex justify-end gap-6">
            <div className="items-center justify-center hidden sm:flex gap-10">
              {props.rightMenu.map((item) =>
                item.isCta ? (
                  <HeaderIconLink
                    icon="comments"
                    href={item.href}
                    className="bg-[#58d466] hover:bg-[#58d466]/90 text-bg1 px-6 py-2.5 shadow-sm hover:shadow-none text-sm overflow-hidden relative hidden sm:block font-semibold tracking-tight"
                    key={item.name}
                    edit={props.edit}
                  >
                    {item.name}
                  </HeaderIconLink>
                ) : (
                  <Headerlink
                    href={item.href}
                    edit={props.edit}
                    key={item.name}
                    className="relative text-title group hover:text-title/70 text-sm font-medium"
                  >
                    {item.name}
                    <div className="absolute inset-x-1/2 w-0 group-hover:w-full group-hover:inset-x-0 h-[1px] bg-title group-hover:bg-title/70"></div>
                  </Headerlink>
                )
              )}
            </div>
            <div className="flex flex-1 order-2 sm:order-none justify-end sm:justify-start">
              <motion.button
                className={`rounded-full p-2 cursor-pointer hover:bg-title/10 relative transition-colors ${props.invertHeaderColor ? mobileMenuOpen ? "hover:bg-title/10" : hasScrolled ? "hover:bg-title/10" : "hover:bg-bg1/10" : "hover:bg-title/10"}`}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                variants={{ closed: { rotate: 0 }, open: { rotate: 90 } }}
                animate={mobileMenuOpen ? "open" : "closed"}
                initial="closed"
                transition={{ ease: "easeInOut", duration: 0.3 }}
              >
                <Bars2Icon
                  className={`h-7 rounded-full ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  } ${props.invertHeaderColor ? hasScrolled ? "text-title" : "text-bg1" : "text-title"}`}
                />
                <XMarkIcon
                  className={`h-7 text-title rounded-full absolute top-2 left-2 ${
                    mobileMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          className="fixed w-full z-20 bg-header backdrop-blur-xl top-0 left-0 overflow-hidden shadow-xl transition-none"
          variants={{ open: { height: "100vh" }, closed: { height: "0vh" } }}
          animate={mobileMenuOpen ? "open" : "closed"}
          initial="closed"
          transition={{ ease: "linear" }}
        >
          <div className="flex justify-between items-center h-[100vh] w-[90vw] mx-auto gap-8">
            <div className="h-full flex relative flex-col justify-center gap-5 sm:gap-10 items-start">
              {navigation.map((item, index) => (
                <motion.div
                  variants={{
                    closed: { opacity: 0, y: -20 },
                    open: { opacity: 1, x: 0 },
                  }}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{
                    ease: "easeOut",
                    duration: 0.3,
                    delay: mobileMenuOpen ? 0.25 + (index + 1) * 0.05 : 0,
                  }}
                  key={item.name}
                  className="transition-none"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedNavItem(
                        selectedNavItem === index ? null : index
                      )
                    }
                    className={`!tracking-normal text-color1 w-full text-2xl sm:text-3xl lg:text-4xl font-semibold flex items-center group font-font2 cursor-pointer ${
                      selectedNavItem !== null && selectedNavItem !== index ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    {item.name}
                    <ChevronRightIcon
                      className={`hidden sm:block h-8 w-8 sm:h-12 sm:w-12 text-color1 transition-transform duration-300 ${
                        selectedNavItem === index ? "translate-x-1" : ""
                      } sm:group-hover:translate-x-1 -translate-y-0.5`}
                    />
                  </button>
                  {selectedNavItem === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="sm:hidden mt-4 ml-4 sm:space-y-3 transition-none"
                    >
                      {item.children?.map((child) => (
                        <div key={child.name} className="space-y-1">
                          <Headerlink
                            href={child.href}
                            edit={props.edit}
                            className="block text-lg text-color1/80 hover:text-color1 font-medium"
                          >
                            {child.name}
                          </Headerlink>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                variants={{
                  closed: { opacity: 0, y: -10 },
                  open: { opacity: 1, x: 0 },
                }}
                animate={mobileMenuOpen ? "open" : "closed"}
                transition={{
                  ease: "easeOut",
                  duration: 0.3,
                  delay: mobileMenuOpen ? 0.2 : 0,
                }}
                className="absolute bottom-10 left-0 w-[90vw] border-t border-color1/10 pt-8 transition-none"
              >
                <div className="flex gap-6 sm:gap-8 items-center">
                  {social.map((item) => {
                    const Icon = icons[item.name];
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-color1/70 hover:text-color1 transition-colors duration-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 !duration-0" aria-hidden="true" />
                        <span className="sr-only">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="h-full flex-grow flex-col justify-center px-8 hidden sm:flex">
              {selectedNavItem !== null &&
                "children" in navigation[selectedNavItem] && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6 transition-none"
                  >
                    {navigation[selectedNavItem].children?.map((child) => (
                      <div key={child.name} className="space-y-0.5">
                        <Headerlink
                          href={child.href}
                          edit={props.edit}
                          className="group text-xl sm:text-2xl text-color1/90 hover:text-color1 font-semibold transition-colors duration-200 flex items-center gap-0.5"
                        >
                          {child.name}
                          <ChevronRightIcon className="h-6 w-6 text-color1/70 group-hover:translate-x-1 duration-200" />
                        </Headerlink>
                      </div>
                    ))}
                  </motion.div>
                )}
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className={`w-full py-8 box-content ${
          props.logoHeight == "5"
            ? "h-4"
            : props.logoHeight == "6"
            ? "h-5"
            : props.logoHeight == "7"
            ? "h-6"
            : props.logoHeight == "8"
            ? "h-6"
            : props.logoHeight == "9"
            ? "h-7"
            : props.logoHeight == "10"
            ? "h-8"
            : "h-7"
        } ${
          props.logoHeight == "5"
            ? "sm:h-5"
            : props.logoHeight == "6"
            ? "sm:h-6"
            : props.logoHeight == "7"
            ? "sm:h-7"
            : props.logoHeight == "8"
            ? "sm:h-8"
            : props.logoHeight == "9"
            ? "sm:h-9"
            : props.logoHeight == "10"
            ? "sm:h-10"
            : "sm:h-8"
        } ${props.spacer ? "" : "hidden"}`}
      ></div>
    </>
  );
}
