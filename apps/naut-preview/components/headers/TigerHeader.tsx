'use client';

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Headerlink from "../headerlink/Headerlink"

export interface Props {
  navigation: { name: string, href: string }[];
  logo: string;
  logoHeight: string;
  edit: boolean;
  spacer: boolean;
}

export default function TigerHeader( props: Props ) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  //los valores originales eran z-10 en header, p-6 en nav y h-8 en img de logo

  return (
    <div>
      
    {/*  Este primer elemento es para que la altura dinámica funcione correctamente */}
    <header className="bg-header/90 backdrop-blur fixed w-full shadow-fanoespecial z-20">
      <nav className="w-fill mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-title"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {props.navigation.map((item) => (
            <Headerlink edit={props.edit} key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-title">
              {item.name}
            </Headerlink>
          ))}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-header px-6 py-6 sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
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
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-text/10">
              <div className="space-y-2 py-6">
                {props.navigation.map((item) => (
                  <Headerlink
                    key={item.name}
                    edit={props.edit}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-title hover:bg-bg2"
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
    {props.spacer && <div className="h-[80px]"/>}
    </div>
  )
}