"use client";

import Text from "../text/Text";
import RichText from "../text/RichText";
import Link from "../link/Link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  description: string;
  // Legacy optional fields for backward compatibility during migration
  description1?: string;
  description2?: string;
  stats: { label: string; value: string }[];
  edit: boolean;
  reference: any;
  ctaText?: string;
  ctaLink?: string;
}

export default function SciasciaBlock(props: Props) {
  return (
    <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          {props.subtitle && (
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              viewport={{ amount: 0.9, once: true }}
              className="transition-none"
            >
              <Text
                edit={props.edit}
                name={props.reference.subtitle}
                className="text-color2 font-semibold text-md sm:text-lg"
              >
                {props.subtitle}
              </Text>
            </motion.div>
          )}
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="text-3xl font-bold tracking-tight text-title sm:text-4xl mt-2"
            >
              {props.title}
            </Text>
          </motion.div>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <div className="w-full">
                  <RichText
                    edit={props.edit}
                    name={props.reference.description ?? props.reference.description1}
                    content={
                      props.description ?? [props.description1, props.description2]
                        .filter(Boolean)
                        .map((p) => `<p>${p}</p>`) // legacy combine
                        .join("")
                    }
                  />
                </div>
              </motion.div>
              {props.ctaText && (
                <motion.div
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  viewport={{ amount: 0.9, once: true }}
                  transition={{ delay: 0 }}
                  className="mt-8 transition-none"
                >
                  <Link
                    edit={props.edit}
                    href={props.ctaLink ? props.ctaLink : "#"}
                    linkName={props.reference.ctaLink}
                    textName={props.reference.ctaText}
                    className="inline rounded-md bg-color2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-color2/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {props.ctaText}
                  </Link>
                </motion.div>
              )}
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {props.stats.map((stat, index) => (
                  <motion.div
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    viewport={{ amount: 0.9, once: true }}
                    className="transition-none"
                    key={stat.label}
                  >
                    <div className="flex flex-col-reverse gap-y-4 mt-8">
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.stats}.${index}-label`}
                        className="text-base leading-7 text-text"
                      >
                        {stat.label}
                      </Text>
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.stats}.${index}-value`}
                        className="text-5xl font-semibold tracking-tight text-color1"
                      >
                        {stat.value}
                      </Text>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
