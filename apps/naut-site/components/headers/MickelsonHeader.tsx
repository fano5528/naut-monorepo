"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Headerlink from "../headerlink/Headerlink";
import Image from "next/image";

interface Props {
  edit: boolean;
  logo: string;
  navigation: { name: string; href: string }[];
  logoHeight: string;
  spacer: boolean;
}

export default function MickelsonHeader(props: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(()=> {
    window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });
}, [])

  return (

    <>

    <header className={`${hasScrolled ? "bg-header/50 backdrop-blur-xs" : ""} fixed z-20 w-full top-0`}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Headerlink edit={props.edit} href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {props.logo.slice(0,5) === "https" ? (
            <Image
              className={`${props.logoHeight == "5" ? "h-4" : props.logoHeight == "6" ? "h-5" : props.logoHeight == "7" ? "h-6" : props.logoHeight == "8" ? "h-6" : props.logoHeight == "9" ? "h-7" : props.logoHeight == "10" ? "h-8" : props.logoHeight == "11" ? "h-9" : props.logoHeight == "12" ? "h-10" : props.logoHeight == "14" ? "h-10" : "h-8"} ${props.logoHeight == "5" ? "sm:h-5" : props.logoHeight == "6" ? "sm:h-6" : props.logoHeight == "7" ? "sm:h-7" : props.logoHeight == "8" ? "sm:h-8" : props.logoHeight == "9" ? "sm:h-9" : props.logoHeight == "10" ? "sm:h-10" : props.logoHeight == "11" ? "sm:h-11" : props.logoHeight == "12" ? "sm:h-12" : props.logoHeight == "14" ? "sm:h-14" : "sm:h-8"} w-auto`}
              src={props.logo}
              alt=""
              height={1000}
              width={1000}
            />
            ) : (
              <h1 className="text-2xl font-font2 text-title font-semibold">{props.logo}</h1>
            )}
          </Headerlink>
        </div>
        <div className="flex">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-title"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-header/50 backdrop-blur-xs px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6 justify-between mt-3">
            <Headerlink edit={props.edit} href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {props.logo.slice(0,5) === "https" ? (
            <Image
              className={`${props.logoHeight == "5" ? "h-4" : props.logoHeight == "6" ? "h-5" : props.logoHeight == "7" ? "h-6" : props.logoHeight == "8" ? "h-6" : props.logoHeight == "9" ? "h-7" : props.logoHeight == "10" ? "h-8" : "h-7"} ${props.logoHeight == "5" ? "sm:h-5" : props.logoHeight == "6" ? "sm:h-6" : props.logoHeight == "7" ? "sm:h-7" : props.logoHeight == "8" ? "sm:h-8" : props.logoHeight == "9" ? "sm:h-9" : props.logoHeight == "10" ? "sm:h-10" : "sm:h-8"} w-auto`}
              src={props.logo}
              alt=""
              height={1000}
              width={1000}
            />
            ) : (
              <h1 className="text-2xl font-font2 text-title font-semibold">{props.logo}</h1>
            )}
            </Headerlink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-title"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {props.navigation.map((item) => (
                  <Headerlink
                    edit={props.edit}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text font-font2 hover:bg-footer/40"
                  >
                    {item.name}
                  </Headerlink>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>

    <div className={`w-full p-8 ${props.logoHeight == "5" ? "h-4" : props.logoHeight == "6" ? "h-5" : props.logoHeight == "7" ? "h-6" : props.logoHeight == "8" ? "h-6" : props.logoHeight == "9" ? "h-7" : props.logoHeight == "10" ? "h-8" : "h-7"} ${props.logoHeight == "5" ? "sm:h-5" : props.logoHeight == "6" ? "sm:h-6" : props.logoHeight == "7" ? "sm:h-7" : props.logoHeight == "8" ? "sm:h-8" : props.logoHeight == "9" ? "sm:h-9" : props.logoHeight == "10" ? "sm:h-10" : "sm:h-8"} ${props.spacer ? "" : "hidden"}`}>

    </div>
    </>
  );
}
