"use client";

import Image from "../image/Image";
import Link from "../link/Link";
import Text from "../text/Text";
import IconLink from "../link/IconLink";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  hasTopInfo: boolean;
  topInfoLink: string;
  topInfoTag: string;
  topInfoName: string;
  isCta1: boolean;
  cta1Text: string;
  cta1Link: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  image: string;
  edit: boolean;
  reference: any;
}

export default function MercuryHero(props: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-bg1">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-title/10 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-bg2/50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-1108/632 w-277 bg-linear-to-r from-color1 to-color1 opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 lg:flex lg:px-8 lg:pt-40 lg:pb-8">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {props.hasTopInfo ? (
            <motion.div
              className="mt-24 sm:mt-32 lg:mt-16 transition-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <div className="inline-flex space-x-6">
                <Text
                  edit={props.edit}
                  name={props.reference.topInfoTag}
                  className="h-8 rounded-full bg-color1/10! px-3 py-1 text-sm font-semibold leading-6 text-color1 ring-1 ring-inset ring-color1/20"
                >
                  {props.topInfoTag}
                </Text>
                <IconLink
                  icon="chevron-right"
                  textName={props.reference.topInfoName}
                  linkName={props.reference.topInfoLink}
                  edit={props.edit}
                  href={props.topInfoLink!}
                  className="hover:translate-x-1 inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-400"
                >
                  {props.topInfoName}
                </IconLink>
              </div>
            </motion.div>
          ) : null}
          <motion.div className="transition-none" initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
          <Text
            edit={props.edit}
            name={props.reference.title}
            className="mt-28 text-4xl font-bold tracking-tight text-title sm:text-6xl w-full font-font2 sm:mt-10 leading-tight sm:leading-tight"
          >
            {props.title}
          </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="transition-none"
          >
          <Text
            edit={props.edit}
            name={props.reference.description}
            className="mt-6 text-lg leading-8 text-text w-full"
          >
            {props.description}
          </Text>
          </motion.div>
          <div className="mt-10 flex items-center gap-x-6">
            {props.isCta1 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="transition-none"
              >
              <Link
                edit={props.edit}
                textName={props.reference.cta1Text}
                linkName={props.reference.cta1Link}
                href={props.cta1Link}
                className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-color1hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
              >
                {props.cta1Text}
              </Link>
              </motion.div>
            ) : null}
            {props.isCta2 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="transition-none"
              >
              <Link
                edit={props.edit}
                textName={props.reference.cta2Text}
                linkName={props.reference.cta2Link}
                href={props.cta2Link}
                className="text-sm font-semibold leading-6 text-text hover:translate-x-1"
              >
                {props.cta2Text}
              </Link>
              </motion.div>
            ) : null}
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0 }}
              className="transition-none"
            >
            <Image
              edit={props.edit}
              name={props.reference.image}
              src={props.image}
              className="h-[450px] sm:h-[650px] w-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
