"use client";

import Text from "../text/Text";
import Link from "../link/Link";
import Image from "../image/Image";
import { motion } from "framer-motion";

export default function PetersonHero(props: {
  title: string;
  subtitle: string;
  description: string;
  isCta1: boolean;
  isCta2: boolean;
  cta1Text?: string;
  cta2Text?: string;
  cta1Link?: string;
  cta2Link?: string;
  image: string;
  reference: any;
  edit: boolean;
  cutImage: boolean;
}) {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-color1/10 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-bg1 shadow-xl shadow-color1/10 ring-1 ring-color1/10 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
            <div className="flex flex-col lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.subtitle}
                  className="text-color1 text-sm font-semibold tracking-wide max-w-2xl w-full"
                >
                  {props.subtitle}
                </Text>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.title}
                  className="w-full mt-2 max-w-2xl text-4xl font-bold tracking-tight text-title sm:text-6xl lg:col-span-2"
                >
                  {props.title}
                </Text>
              </motion.div>
            </div>
            <div className="mt-6 max-w-xl lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.description}
                  className="text-lg leading-8 text-text w-full"
                >
                  {props.description}
                </Text>
              </motion.div>

              <div className="mt-10 flex items-center gap-x-6">
                {props.isCta1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="transition-none"
                  >
                    <Link
                      href={props.cta1Link!}
                      edit={props.edit}
                      textName={props.reference.cta1Text}
                      linkName={props.reference.cta1Link}
                      className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                    >
                      {props.cta1Text}
                    </Link>
                  </motion.div>
                )}
                {props.isCta2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="transition-none"
                  >
                    <Link
                      href={props.cta2Link!}
                      edit={props.edit}
                      textName={props.reference.cta2Text}
                      linkName={props.reference.cta2Link}
                      className="text-sm font-semibold leading-6 text-title"
                    >
                      {props.cta2Text}
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="transition-none"
            >
              <Image
                edit={props.edit}
                name={props.reference.image}
                src={props.image}
                className={`mt-10 ${
                  props.cutImage ? "aspect-[6/5]" : ""
                } w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none`}
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-bg1 sm:h-32" />
      </div>
    </div>
  );
}
