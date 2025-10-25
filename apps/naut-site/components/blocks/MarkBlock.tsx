"use client";

import Link from "../link/Link";
import Text from "../text/Text";
import YtVideo from "../video/YtVideo";
import { motion } from "framer-motion";

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { name: string; description: string; image: string }[];
  textOnLeft: boolean;
  isFirst: boolean;
  video: string;
  isSubtitle: boolean;
  subtitle: string;
  isCta: boolean;
  ctaText: string;
  ctaLink: string;
}

export default function MarkBlock(props: Props) {
  if (props.textOnLeft) {
    return (
      <div
        className={`${
          props.isFirst ? "mt-24 sm:mt-32" : "mt-20 sm:mt-24"
        } w-complete sm:w-complete-sm mx-auto`}
      >
        <div className="flex flex-col md:grid grid-cols-2 gap-8 md:gap-28 items-center">
          <div className="md:order-2 w-full">
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.2, once: true }}
              className="transition-none w-full aspect-3/2"
            >
              <YtVideo
                url={props.video}
                edit={props.edit}
                name={props.reference?.video}
                className="shadow-2xl"
              />
            </motion.div>
          </div>
          <div className="w-full md:order-1">
            {props.isSubtitle && (
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Text
                  name={props.reference?.subtitle}
                  edit={props.edit!}
                  className="text-color1 font-semibold text-lg md:text-right"
                >
                  {props.subtitle}
                </Text>
              </motion.div>
            )}
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.9, once: true }}
              className="transition-none"
            >
              <Text
                name={props.reference?.title}
                edit={props.edit!}
                className="md:text-right text-2xl sm:text-4xl tracking-tight font-bold font-font2 text-title w-full mt-2 leading-normal md:leading-normal"
              >
                {props.title}
              </Text>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.9, once: true }}
              className="transition-none"
            >
              <Text
                name={props.reference?.description}
                edit={props.edit!}
                className="md:text-right mt-5 tracking-[-0.15px] text-text w-full leading-relaxed"
              >
                {props.description}
              </Text>
            </motion.div>
            {props.isCta && (
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Link
                  linkName={props.reference?.ctaLink}
                  textName={props.reference?.ctaText}
                  edit={props.edit}
                  href={props.ctaLink!}
                  className="md:float-right mt-8 inline-block px-8 py-2 rounded-md bg-color1 text-bg1 font-semibold font-font2 hover:bg-color1hover"
                >
                  {props.ctaText}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          props.isFirst ? "mt-24 sm:mt-32" : "mt-20 sm:mt-24"
        } w-complete sm:w-complete-sm mx-auto`}
      >
        <div className="flex flex-col md:grid grid-cols-2 gap-8 lg:gap-28 items-center">
          <div>
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.2, once: true }}
              className="transition-none w-full aspect-3/2"
            >
              <YtVideo
                url={props.video}
                edit={props.edit}
                name={props.reference?.video}
                className="shadow-2xl"
              />
            </motion.div>
          </div>
          <div className="w-full">
            {props.isSubtitle && (
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Text
                  name={props.reference?.subtitle}
                  edit={props.edit}
                  className="text-color2 font-semibold text-lg"
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
                name={props.reference?.title}
                edit={props.edit}
                className="sm:text-4xl text-2xl tracking-tight font-bold font-font2 text-title w-full mt-2"
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
                name={props.reference?.description}
                edit={props.edit}
                className="mt-5 tracking-[-0.15px] text-text w-full leading-relaxed"
              >
                {props.description}
              </Text>
            </motion.div>
            {props.isCta && (
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Link
                  linkName={props.reference?.ctaLink}
                  textName={props.reference?.ctaText}
                  edit={props.edit!}
                  href={props.ctaLink!}
                  className="mt-8 inline-block px-8 py-2 rounded-md bg-color2 text-bg1 font-semibold font-font2 hover:bg-color2hover"
                >
                  {props.ctaText}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
}