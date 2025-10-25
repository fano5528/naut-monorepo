"use client";

import Text from "../text/Text";
import Link from "../link/Link";
import { motion } from "framer-motion";

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content?: {
    name: string;
    description: string;
    icon: string;
  }[];
  firstStatNumber: string;
  firstStatLabel: string;
  firstStatDescription: string;
  secondStatNumber: string;
  secondStatLabel: string;
  secondStatDescription: string;
  thirdStatNumber: string;
  thirdStatLabel: string;
  thirdStatDescription: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function DostoevskyBlock(props: Props) {

  return (
    <div className="mt-16 sm:mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:mx-0">
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="text-4xl font-bold tracking-tight text-pretty text-color1 sm:text-5xl"
            >
              {props.title}
            </Text>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="mt-6 text-base/7 text-text"
            >
              {props.description}
            </Text>
          </motion.div>
          {props.content && props.content.length > 0 && (
            <dl className="mt-6 max-w-xl space-y-4 text-base leading-7 text-text lg:max-w-none">
              {props.content.map((feature, index) => (
                <motion.div
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  viewport={{ amount: 0.2, once: true }}
                  className="transition-none"
                  key={index}
                >
                  {props.edit && (
                    <input
                      type="hidden"
                      name={`array_${props.reference.content}.${index}-icon`}
                      value={feature.icon}
                    />
                  )}
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-title">
                      <i
                        className={`fa-solid fa-${feature.icon} absolute left-1 top-1 size-5 text-color2`}
                      />
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.content}.${index}-name`}
                        className="inline mr-1"
                      >
                        {feature.name}
                      </Text>
                    </dt>{" "}
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.content}.${index}-description`}
                      className="inline w-full"
                    >
                      {feature.description}
                    </Text>
                  </div>
                </motion.div>
              ))}
            </dl>
          )}
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
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-16 lg:max-w-none lg:flex-row lg:items-end">
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.3, once: true }}
            className="transition-none flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-title/10 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start"
          >
            <Text
              edit={props.edit}
              name={props.reference.firstStatNumber}
              className="flex-none text-3xl font-bold tracking-tight text-gray-900"
            >
              {props.firstStatNumber}
            </Text>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <Text
                edit={props.edit}
                name={props.reference.firstStatLabel}
                className="text-lg font-semibold tracking-tight text-gray-900"
              >
                {props.firstStatLabel}
              </Text>
              <Text edit={props.edit} name={props.reference.firstStatDescription} className="mt-2 text-base/7 text-gray-600">
                {props.firstStatDescription}
              </Text>
            </div>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.3, once: true }}
            className="transition-none flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-color1 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44"
          >
            <Text
              edit={props.edit}
              name={props.reference.secondStatNumber}
              className="flex-none text-3xl font-bold tracking-tight text-white"
            >
              {props.secondStatNumber}
            </Text>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <Text
                edit={props.edit}
                name={props.reference.secondStatLabel}
                className="text-lg font-semibold tracking-tight text-white"
              >
                {props.secondStatLabel}
              </Text>
              <Text
                edit={props.edit}
                name={props.reference.secondStatDescription}
                className="mt-2 text-base/7 text-gray-400"
              >
                {props.secondStatDescription}
              </Text>
            </div>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.3, once: true }}
            className="transition-none flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-color2 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28"
          >
            <Text
              edit={props.edit}
              name={props.reference.thirdStatNumber}
              className="flex-none text-3xl font-bold tracking-tight text-white"
            >
              {props.thirdStatNumber}
            </Text>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <Text
                edit={props.edit}
                name={props.reference.thirdStatLabel}
                className="text-lg font-semibold tracking-tight text-white"
              >
                {props.thirdStatLabel}
              </Text>
              <Text
                edit={props.edit}
                name={props.reference.thirdStatDescription}
                className="mt-2 text-base/7 text-indigo-200"
              >
                {props.thirdStatDescription}
              </Text>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
