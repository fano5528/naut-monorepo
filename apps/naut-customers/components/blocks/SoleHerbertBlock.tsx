"use client";

import Image from "../image/Image";
import Link from "../link/Link";
import Text from "../text/Text";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";

export default function HerbertBlock(props: {
  isFirst: boolean;
  textOnLeft: boolean;
  title: string;
  description: string;
  image: string;
  isCta: boolean;
  ctaText?: string;
  ctaLink?: string;
  cutImage: boolean;
  edit: boolean;
  reference: any;
  isSubtitle: boolean;
  subtitle?: string;
}) {
  if (props.textOnLeft) {
    return (
      <ParallaxProvider>
        <div
          className={`${
            props.isFirst ? "mt-24 sm:mt-32" : "mt-20 sm:mt-24"
          } w-complete sm:w-complete-sm mx-auto`}
        >
          <div className="flex flex-col md:grid grid-cols-2 gap-8 md:gap-28 items-center">
            <Parallax speed={0} className="order-2 md:order-2">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                viewport={{ amount: 0.2, once: true }}
                className="transition-none"
              >
                <Image
                  edit={props.edit}
                  name={props.reference.image}
                  className={`md:order-2 w-full h-10bg-blue-500 rounded-2xl ${
                    props.cutImage ? "aspect-7/5" : ""
                  } object-cover`}
                  src={props.image}
                />
              </motion.div>
            </Parallax>
            <div className="w-full order-1 md:order-1">
              {props.isSubtitle && (
                <motion.div
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  viewport={{ amount: 0.9, once: true }}
                  className="transition-none"
                >
                  <Text
                    name={props.reference.subtitle}
                    edit={props.edit}
                    className="text-color2 font-semibold text-md sm:text-lg md:text-right w-full"
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
                  name={props.reference.title}
                  edit={props.edit}
                  className="md:text-right text-2xl sm:text-4xl tracking-tight font-bold font-font2 text-title w-full mt-2"
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
                  name={props.reference.description}
                  edit={props.edit}
                  className="md:text-right text-sm sm:text-base mt-5 tracking-[-0.15px] text-text w-full leading-relaxed"
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
                    linkName={props.reference.ctaLink}
                    textName={props.reference.ctaText}
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
      </ParallaxProvider>
    );
  } else {
    return (
      <ParallaxProvider>
        <div
          className={`${
            props.isFirst ? "mt-24 sm:mt-32" : "mt-20 sm:mt-24"
          } w-complete sm:w-complete-sm mx-auto`}
        >
          <div className="flex flex-col md:grid grid-cols-2 gap-8 md:gap-28 items-center">
            <Parallax speed={0} className="order-2 md:order-1">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                viewport={{ amount: 0.2, once: true }}
                className="transition-none"
              >
                <Image
                  edit={props.edit}
                  name={props.reference.image}
                  className={`w-full h-10bg-blue-500 rounded-2xl ${
                    props.cutImage ? "aspect-7/5" : ""
                  } object-cover`}
                  src={props.image}
                />
              </motion.div>
            </Parallax>
            <div className="w-full order-1 md:order-2">
              {props.isSubtitle && (
                <motion.div
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  viewport={{ amount: 0.9, once: true }}
                  className="transition-none"
                >
                  <Text
                    name={props.reference.subtitle}
                    edit={props.edit}
                    className="text-color2 font-semibold text-lg w-full"
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
                  name={props.reference.title}
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
                  name={props.reference.description}
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
                    linkName={props.reference.ctaLink}
                    textName={props.reference.ctaText}
                    edit={props.edit}
                    href={props.ctaLink!}
                    className="mt-8 inline-block px-8 py-2 rounded-md bg-color1 text-bg1 font-semibold font-font2 hover:bg-color1hover"
                  >
                    {props.ctaText}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </ParallaxProvider>
    );
  }
}