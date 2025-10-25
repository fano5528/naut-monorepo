"use client";

import Link from "../link/Link";
import Text from "../text/Text";
import { motion } from "framer-motion";

export interface Props {
  reference: any;
  edit: boolean;
  title: string;
  description: string;
  ctaText1: string;
  ctaLink1: string;
  isCta2: boolean;
  ctaText2?: string;
  ctaLink2?: string;
  color1: string;
}

export default function RiordanBlock(props: Props) {
  return (
    <div className="relative isolate overflow-hidden mt-24 sm:mt-32 -mb-24 sm:-mb-32">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, amount: 0.3 }}
            viewport={{ once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="text-center w-full text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2"
            >
              {props.title}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, amount: 0.3 }}
            viewport={{ once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="w-full text-center mx-auto mt-6 max-w-xl text-lg leading-8 text-text"
            >
              {props.description}
            </Text>
          </motion.div>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6 transition-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, amount: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              edit={props.edit}
              linkName={props.reference.ctaLink1}
              textName={props.reference.ctaText1}
              href={props.ctaLink1}
              className="rounded-md bg-title px-3.5 py-2.5 text-sm font-semibold text-bg1 shadow-sm hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title"
            >
              {props.ctaText1}
            </Link>
            {props.isCta2 ? (
              <Link
                textName={props.reference.ctaText2}
                linkName={props.reference.ctaLink2}
                edit={props.edit}
                href={props.ctaLink2!}
                className="text-sm font-semibold leading-6 text-title hover:translate-x-1"
              >
                {props.ctaText2}
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
          className="text-color1 bg-color1 fill-color1 from-color1 to-color1 via-color1"
        />
        <defs>
          <radialGradient
            id="8d958450-c69f-4251-94bc-4e091a323369"
            className="text-color1 bg-color1 fill-color1 from-color1 to-color1 via-color1"
          >
            <stop className="text-color1 bg-color1 fill-color1 from-color1 to-color1 via-color1" />
            <stop
              offset={1}
              className="text-color1 bg-color1 fill-color1 from-color1 to-color1 via-color1"
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
