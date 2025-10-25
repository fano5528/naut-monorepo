"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlayIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Text from "../text/Text";
import Link from "../link/Link";
import Image from "../image/Image";

interface Props {
  title: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  image: string;
  video: string;
  edit: boolean;
  reference: any;
}

export default function GrohlHero(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg text-left shadow-xl transition-all sm:my-8 w-[90vw] sm:w-[80vw] h-[56.25vw] sm:h-[50vw]">
                  <button onClick={() => setOpen(false)} className="absolute right-0 sm:-right-12 -top-12">
                  <XMarkIcon className="h-8 w-8 text-[#c0c0c0] hover:text-white duration-0" />
                  </button>
                  <iframe
                    className="w-full h-full"
                    src={props.video}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div>
        <div className="relative isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-color1 to-color1 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <Text
                  name={props.reference.title}
                  edit={props.edit}
                  className="text-center text-4xl font-bold tracking-tight text-title sm:text-6xl mx-auto w-full"
                >
                  {props.title}
                </Text>
                <Text
                  name={props.reference.description}
                  edit={props.edit}
                  className="w-full text-center mt-6 text-lg leading-8 text-text"
                >
                  {props.description}
                </Text>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {props.isCta1 && (
                    <Link
                      href={props.cta1Link!}
                      linkName={props.reference.cta1Link}
                      textName={props.reference.cta1Text}
                      edit={props.edit}
                      className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-color1hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1hover"
                    >
                      {props.cta1Text}
                    </Link>
                  )}
                  {props.isCta2 && (
                    <Link
                      edit={props.edit}
                      linkName={props.reference.cta2Link}
                      textName={props.reference.cta2Text}
                      href={props.cta2Link!}
                      className="text-sm font-semibold leading-6 text-title"
                    >
                      {props.cta2Text}
                    </Link>
                  )}
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="w-full -m-2 rounded-xl bg-title/20 p-2 ring-1 ring-inset ring-title/30 lg:-m-4 lg:rounded-2xl lg:p-4 relative">
                  <div className="w-full h-full absolute top-0 left-0 bg-transparent flex justify-center items-center flex-col">
                    <button
                      className="bg-color1 hover:bg-color1hover z-10 p-5 rounded-full shadow-xl ring-10 hover:ring-4 ring-color1/20 hover:ring-color1/40"
                      onClick={() => setOpen(true)}
                    >
                      <PlayIcon className="h-9 w-9 text-white" />
                    </button>
                  </div>
                  <Image
                    src={props.image}
                    name={props.reference.image}
                    edit={props.edit}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-color1 to-color1 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
