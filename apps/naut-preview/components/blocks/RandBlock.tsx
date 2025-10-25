"use client";

import Link from "../link/Link";
import Text from "../text/Text";
import Image from "../image/Image";
import { motion } from "framer-motion";

export interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
  image: string;
}

export default function RandBlock(props: Props) {
  return (
    <div className="overflow-hidden mt-32 sm:mt-50">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="relative transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.subtitle}
                  className="text-base font-semibold leading-7 text-color1 w-full"
                >
                  {props.subtitle}
                </Text>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="mt-2 transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.title}
                  className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full"
                >
                  {props.title}
                </Text>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="mt-6 transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.description}
                  className="text-lg leading-8 text-gray-600 pb-8 w-full"
                >
                  {props.description}
                </Text>
              </motion.div>
              {props.isCta && (
                <motion.div
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  viewport={{ amount: 0.9, once: true }}
                  transition={{ delay: 0 }}
                  className="transition-none"
                >
                  <Link
                    edit={props.edit}
                    href={props.ctaLink!}
                    linkName={props.reference.ctaLink}
                    textName={props.reference.ctaText}
                    className="inline mt-4 rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {props.ctaText}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <motion.div
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 10, opacity: 0 }}
              viewport={{ amount: 0.9, once: true }}
              className="relative isolate overflow-hidden bg-color1 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none transition-none"
            >
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-color1hover opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image
                  src={props.image}
                  name={props.reference.image}
                  edit={props.edit}
                  className="-mb-12 w-full sm:w-[57rem] max-w-none rounded-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
