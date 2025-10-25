"use client";

import Link from "../link/Link";
import Text from "../text/Text";
import Image from "../image/Image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  cta1Text: string;
  cta1Link: string;
  image: string;
  isBanner: boolean;
  bannerText: string;
  bannerCtaText: string;
  bannerCtaLink: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  isCta1: boolean;
  edit: boolean;
  reference: any;
}

export default function TurnerHero(props: Props) {
  return (
    <div className="bg-bg1">
      <div className="relative isolate pt-0">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-text/10 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-color1/10">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              {props.isBanner && (
                <motion.div
                  className="transition-none transition-(--tw-ring-color) relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-text ring-1 ring-text/30 hover:ring-text/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  <Text
                    edit={props.edit}
                    name={props.reference.bannerText}
                    className="font-semibold text-color1 duration-200"
                  >
                    {props.bannerText}
                  </Text>
                  <span className="h-4 w-px bg-text/30" aria-hidden="true" />
                  <Link
                    edit={props.edit}
                    linkName={props.reference.bannerCtaLink}
                    textName={props.reference.bannerCtaText}
                    href={props.bannerCtaLink!}
                    className="flex items-center gap-x-1"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {props.bannerCtaText}
                  </Link>
                </motion.div>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="transition-none"
            >
              <Text
                edit={props.edit}
                name={props.reference.title}
                className="mt-10 text-4xl font-bold tracking-tight text-title sm:text-6xl w-full"
              >
                {props.title}
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
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
            <motion.div
              className="mt-10 flex items-center gap-x-6 transition-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {props.isCta1 && (
                <Link
                  href={props.cta1Link!}
                  edit={props.edit}
                  linkName={props.reference.ctaLink}
                  textName={props.reference.ctaText}
                  className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-color1hover focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1hover"
                >
                  {props.cta1Text}
                </Link>
              )}
              {props.isCta2 && (
                <Link
                  href={props.cta2Link!}
                  edit={props.edit}
                  linkName={props.reference.cta2Link}
                  textName={props.reference.cta2Text}
                  className="text-sm font-semibold leading-6 text-title"
                >
                  {props.cta2Text}
                </Link>
              )}
            </motion.div>
          </div>
          <motion.div
            className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow transition-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <svg
              viewBox="0 0 366 729"
              role="img"
              className="mx-auto w-91.5 max-w-full drop-shadow-xl"
            >
              <title>App screenshot</title>
              <defs>
                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                  <rect width={316} height={684} rx={36} />
                </clipPath>
              </defs>
              <path
                fill="#4B5563"
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
              />
              <path
                fill="#343E4E"
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
              />
              <foreignObject
                width={316}
                height={684}
                transform="translate(24 24)"
                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
              >
                <Image
                  edit={props.edit}
                  name={props.reference.image}
                  src={props.image}
                />
              </foreignObject>
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
