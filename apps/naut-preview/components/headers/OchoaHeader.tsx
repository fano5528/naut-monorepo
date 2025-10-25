"use client";

import { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Headerlink from "../headerlink/Headerlink";
import Image from "../image/Image";

export default function OchoaHeader(props: {
  edit: boolean;
  invertHeaderColor: boolean;
  logo: string;
  invertedLogo: string;
  navigation: { name: string; href: string }[];
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 mt-2">
      <nav
        className={`z-0 flex items-center justify-between p-6 lg:px-24 ${
          mobileMenuOpen ? "hidden" : ""
        } sm:flex`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Headerlink href="/" className="-m-1.5 p-1.5" edit={props.edit}>
            <span className="sr-only">Your Company</span>
            <Image
              className="h-8 w-auto"
              src={props.invertHeaderColor ? props.invertedLogo : props.logo}
              name={props.logo}
              edit={props.edit}
            />
          </Headerlink>
        </div>
        <div className="flex">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3BottomRightIcon
              className={`h-7 w-7 z-0 ${mobileMenuOpen ? "hidden" : ""} ${
                props.invertHeaderColor ? "text-white" : "text-black"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
      <AnimatePresence mode="sync">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            key="mobile-menu"
            className="fixed top-0 bg-black inset-y-0 right-0 z-50 w-full overflow-y-auto px-10 py-6 sm:max-w-sm sm:ring-1 h-[100vh] ring-black transition-none"
          >
            <div className="flex items-center justify-between">
              <Headerlink
                edit={props.edit}
                href="/"
                className="-m-1.5 p-1.5 mt-1"
              >
                <span className="sr-only">Your Company</span>
                <Image className="h-8 w-auto" src={props.invertedLogo} name={props.invertedLogo} edit={props.edit} />
              </Headerlink>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="mt-4 divide-y divide-gray-500/10">
                <div className="space-y-2 py-0">
                  {props.navigation.map((item) => (
                    <Headerlink
                      edit={props.edit}
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-700/10"
                    >
                      {item.name}
                    </Headerlink>
                  ))}
                </div>
                <div className="py-6">
                  {props.isCta && (
                  <Headerlink
                    href={props.ctaLink!}
                    edit={props.edit}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black bg-color1 hover:bg-color1hover"
                  >
                    {props.ctaText}
                  </Headerlink>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
