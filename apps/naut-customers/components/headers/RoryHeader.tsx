"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Headerlink from "../headerlink/Headerlink";
import Image from "next/image";

export default function Example(props: {
  edit: boolean;
  logo: string;
  navigation: { name: string; href: string }[];
  rightMenu: { name: string; href: string; isCta: boolean }[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-header/50 backdrop-blur-lg fixed w-full top-0 left-0 border-b border-title/10 z-20">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Headerlink href="/" className="-m-1.5 p-1.5" edit={props.edit}>
              <span className="sr-only">Your Company</span>
              <Image
                className="h-6 sm:h-8 w-auto"
                src={props.logo}
                alt=""
                height={1000}
                width={1000}
              />
            </Headerlink>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {props.navigation.map((item) => (
              <Headerlink
                edit={props.edit}
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-title hover:text-text"
              >
                {item.name}
              </Headerlink>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {props.rightMenu.map((item) =>
              item.isCta ? (
                <Headerlink
                  edit={props.edit}
                  href={item.href}
                  key={item.name}
                  className="hidden lg:block rounded-md bg-color1 px-3 py-2 text-sm font-semibold text-title hover:text-text shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                >
                  {item.name}
                </Headerlink>
              ) : (
                <Headerlink
                  edit={props.edit}
                  key={item.name}
                  href={item.href}
                  className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-title hover:text-text"
                >
                  {item.name}
                </Headerlink>
              )
            )}
          </div>
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
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-header/90 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-title/10">
            <div className="flex items-center gap-x-6">
              <Headerlink edit={props.edit} href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="h-8 w-auto"
                  src={props.logo}
                  height={1000}
                  width={1000}
                  alt=""
                />
              </Headerlink>
              {props.rightMenu.map((item) =>
                item.isCta ? (
                  <Headerlink
                    edit={props.edit}
                    href={item.href}
                    key={item.name}
                    className="ml-auto rounded-md bg-color1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                  >
                    {item.name}
                  </Headerlink>
                ) : (
                  <div className="hidden" key={item.name}></div>
                )
              )}
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-title"
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
                      edit={props.edit}
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-title hover:bg-gray-50"
                    >
                      {item.name}
                    </Headerlink>
                  ))}
                </div>
                <div className="py-6">
                  {props.rightMenu.map((item) =>
                    !item.isCta ? (
                      <Headerlink
                        edit={props.edit}
                        href={item.href}
                        key={item.name}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-title hover:bg-gray-50"
                      >
                        {item.name}
                      </Headerlink>
                    ) : (
                      <div className="hidden" key={item.name}></div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="box-content h-6 sm:h-8 py-6"></div>
    </>
  );
}
