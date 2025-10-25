"use client";

import Text from "../text/Text";
import Link from "../link/Link";
import { motion } from "framer-motion";

interface Props {
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
  color: string;
}

export default function AquinoBlock(props: Props) {
  return (
    <motion.div
      className="mx-auto max-w-7xl mt-24 sm:px-6 sm:mt-32 lg:px-8 transition-none"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative isolate overflow-hidden bg-neutral-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <Text
          edit={props.edit}
          name={props.reference.title}
          className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-bg1 sm:text-4xl w-full block text-center"
        >
          {props.title}
        </Text>
        <Text
          edit={props.edit}
          name={props.reference.description}
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-bg2 w-full block text-center"
        >
          {props.description}
        </Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {props.isCta1 && (
            <Link
              href={props.cta1Link!}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-neutral-200 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              textName={props.reference.cta1Text}
              linkName={props.reference.cta1Link}
              edit={props.edit}
            >
              {props.cta1Text}
            </Link>
          )}
          {props.isCta2 && (
            <Link
              href={props.cta2Link!}
              edit={props.edit}
              textName={props.reference.cta2Text}
              linkName={props.reference.cta2Link}
              className="text-sm font-semibold leading-6 text-white hover:translate-x-1"
            >
              {props.cta2Text}
            </Link>
          )}
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor={props.color} />
              <stop offset={1} stopColor={props.color} />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}
