"use client";

import Text from "../text/Text";
import { motion } from "framer-motion";

export default function BronteBlock(props: {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { name: string; icon: string; description: string }[];
}) {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              name={props.reference.subtitle}
              edit={props.edit}
              className="text-base font-semibold leading-7 text-color1 w-full text-center"
            >
              {props.subtitle}
            </Text>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              name={props.reference.title}
              edit={props.edit}
              className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl w-full text-center"
            >
              {props.title}
            </Text>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              name={props.reference.description}
              edit={props.edit}
              className="mt-6 text-lg leading-8 text-text w-full text-center"
            >
              {props.description}
            </Text>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {props.content.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative pl-16 transition-none"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                viewport={{ amount: 0.8, once: true }}
                transition={{ delay: index%2 != 0 ? 0.15 : 0 }}
              >
                <dt className="text-base font-semibold leading-7 text-title">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-color2">
                    <i
                      className={`text-white fa-solid fa-${feature.icon}`}
                      aria-hidden="true"
                    />
                    <input type="hidden" name={`array_${props.reference.content}.${index}-icon`} value={feature.icon} />
                  </div>
                  <Text
                    name={`array_${props.reference.content}.${index}-name`}
                    edit={props.edit}
                    className="sm:max-h-8 w-full"
                  >
                    {feature.name}
                  </Text>
                </dt>
                <Text
                  name={`array_${props.reference.content}.${index}-description`}
                  edit={props.edit}
                  className="mt-2 text-base leading-7 text-text w-full"
                >
                  {feature.description}
                </Text>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
