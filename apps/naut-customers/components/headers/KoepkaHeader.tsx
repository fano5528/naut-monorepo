"use client";

import Image from "next/image";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Headerlink from "../headerlink/Headerlink";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function KoepkaHeader(props: {
  edit: boolean;
  reference: any;
  logo: string;
  navigation: { name: string; href: string }[];
  logoHeight: string;
  spacer: boolean;
  rightMenu: { name: string; href: string; isCta: boolean }[];
}) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              ? "bg-header/80 w-[calc(100vw-2rem)] mx-4 px-6 mt-4 py-4 backdrop-blur-2xl"
              : "bg-header/0 w-[100vw] px-10 py-8"
          } flex rounded-md items-center fixed duration-[10000] z-30 top-0`}
        >
          <div className="flex flex-1 order-2 sm:order-none justify-end sm:justify-start">
            <motion.button
              className="rounded-full p-2 cursor-pointer hover:bg-title/10 duration-400 transition-none relative"
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              variants={{ closed: { rotate: 0 }, open: { rotate: 90 } }}
              animate={mobileMenuOpen ? "open" : "closed"}
              initial="closed"
              transition={{ ease: "easeIn", duration: 0.1 }}
            >
              <Bars2Icon
                className={`h-7 text-title rounded-full ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <XMarkIcon
                className={`h-7 text-title rounded-full absolute top-2 left-2 ${
                  mobileMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.button>
          </div>
          <div className="flex-1 flex items-center justify-start sm:justify-center sm:order-none order-1">
            <Headerlink href="/" edit={props.edit}>
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
              src={props.logo}
              alt="Naut Logo"
              width={1000}
              height={1000}
              />
            </Headerlink>
          </div>
          <div className="flex-1 items-center justify-end hidden sm:flex gap-10">
            {props.rightMenu.map((item) =>
              item.isCta ? (
                <Headerlink
                  href={item.href}
                  className="bg-color1 text-bg1 px-5 py-2 rounded-md text-sm duration-500 overflow-hidden relative group hidden sm:block font-semibolds tracking-tight"
                  key={item.name}
                  edit={props.edit}
                >
                  {item.name}
                  <div className="px-5 py-2 bg-title text-bg1 absolute top-full left-0 group-hover:top-0 rounded-md text-md">
                    {item.name}
                  </div>
                </Headerlink>
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
        </div>

        <motion.div
          className="fixed w-full z-20 bg-header backdrop-blur-xl top-0 left-0 overflow-hidden h-[100vw]"
          variants={{ open: { height: "100vh" }, closed: { height: "0vh" } }}
          animate={mobileMenuOpen ? "open" : "closed"}
          initial="closed"
          transition={{ ease: "easeIn", duration: 0.1 }}
        >
          <div className="max-w-2xl w-[80vw] h-full flex relative mx-auto flex-col justify-center gap-5 sm:gap-10 items-start">
            {props.navigation.map((item, index) => (
              <motion.div
                variants={{
                  closed: { opacity: 0, x: -30 },
                  open: { opacity: 1, x: 0 },
                }}
                animate={mobileMenuOpen ? "open" : "closed"}
                transition={{
                  ease: "easeOut",
                  duration: 0.3,
                  delay: (index + 1) * 0.1,
                }}
                key={item.name}
                className="transition-none duration-0"
              >
                <Headerlink
                  href={item.href}
                  edit={props.edit}
                  className="w-full text-5xl sm:text-6xl text-title hover:text-title/30 font-semibold tracking-tight"
                >
                  {item.name}
                </Headerlink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        className={`w-full p-8 box-content ${
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
