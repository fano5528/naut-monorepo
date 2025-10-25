"use client";

import Image from "../image/Image";
import Text from "../text/Text";
import { motion } from "framer-motion";

function isMiddleOfThree(num: number) {
  return num % 3 === 1;
}

function isEndOfThree(num: number) {
  return num % 3 === 2;
}

export default function DubnerBlock(props: {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: { icon: string; name: string; description: string }[];
}) {
  return (
    <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true, amount: 0.9 }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.subtitle}
              className="text-base font-semibold leading-7 text-color1 w-full text-center"
            >
              {props.subtitle}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true, amount: 0.9 }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="w-full text-center mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl"
            >
              {props.title}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true, amount: 0.9 }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="w-full text-center mt-6 text-lg leading-8 text-text"
            >
              {props.description}
            </Text>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="relative overflow-hidden pt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ amount: 0.9, once: true }}
      >
        <div className="mx-auto px-6 lg:px-8 max-w-7xl">
          <Image
            edit={props.edit}
            name={props.reference.image}
            src={props.image}
            className="mb-[-12%] rounded-xl shadow-2xl sm:sw-auto ring-1 ring-bg1 mx-auto w-[80vw] sm:w-[80vw] lg:w-[60vw] max-h-[750px] aspect-square md:aspect-auto object-cover"
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-bg1 pt-[7%]" />
          </div>
        </div>
      </motion.div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-text sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {props.content.map((feature, index) => (
            <motion.div key={feature.name} className="relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.9, once: true }} transition={{ duration: 0.2, delay: (isMiddleOfThree(index)) ? 0.2 : (isEndOfThree(index)) ? 0.4 : 0 }}>
              <dt className="inline font-semibold text-title">
                <i
                  className={`h-5 w-5 flex-none text-color1 fa-solid fa-${feature.icon} mr-2.5`}
                  aria-hidden="true"
                />
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.content}.${index}-name`}
                  className="max-h-8 inline"
                >
                  {feature.name}
                </Text>
              </dt>
              {"  "}
              <dd className="inline">
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.content}.${index}-description`}
                  className="inline ml-1 w-full"
                >
                  {feature.description}
                </Text>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}
