"use client";

import Link from "../link/Link";
import Text from "../text/Text";
import { motion } from "framer-motion";

export default function GilmourHero(props: {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
}) {
  return (
    <div className="bg-black overflow-hidden">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-color1 to-color1 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}

              className="transition-none"
            >
              <Text
                edit={props.edit}
                name={props.reference.title}
                className="text-4xl leading-tight sm:leading-tight font-bold tracking-tight text-white sm:text-5xl block mx-auto w-full text-center"
              >
                {props.title}
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="transition-none"
            >
              <Text
                edit={props.edit}
                name={props.description}
                className="mt-6 text-md leading-8 text-white max-w-xl mx-auto block w-full text-center"
              >
                {props.description}
              </Text>
            </motion.div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {props.isCta1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                  className="transition-none"
                >
                  <Link
                    href={props.cta1Link!}
                    className="rounded-md bg-color1 px-5 py-2.5 text-sm font-semibold text-title shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                    edit={props.edit}
                    linkName={props.reference.cta1Link}
                    textName={props.reference.cta1Text}
                  >
                    {props.cta1Text}
                  </Link>
                </motion.div>
              )}
              {props.isCta2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.5 }}
                  className="transition-none"
                >
                  <Link
                    href={props.cta2Link!}
                    className="text-sm font-semibold leading-6 text-white hover:translate-x-1"
                    edit={props.edit}
                    linkName={props.reference.cta2Link}
                    textName={props.reference.cta2Text}
                  >
                    {props.cta2Text}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-color1 to-color1 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
