"use client";

import Text from "../../components/text/Text";
import LinkWrapper from "../../components/link/LinkWrapper";
import { motion } from "framer-motion";
import Image from "../../components/image/Image";

interface Props {
  title: string;
  content: {
    subtitle: string;
    title: string;
    description: string;
    color: string;
    image: string;
    ctaLink: string;
    ctaText: string;
  }[];
  reference: any;
  edit: boolean;
}

export default function AustenBlock(props: Props) {
  return (
    <div className="w-complete sm:w-complete-sm mx-auto mt-16 sm:mt-24">
      <Text
        edit={props.edit}
        name={props.reference.title}
        className="font-font2 w-full text-3xl sm:text-4xl font-bold tracking-tight text-color2"
      >
        {props.title}
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6 md:mt-12">
        {props.content.map((item, index) => (
          <LinkWrapper edit={props.edit} reference={`array_${props.reference.content}.${index}-ctaLink`} href={item.ctaLink} key={index} className="hover:scale-[101%] group">
            {props.edit && (
              <input type="hidden" name={`array_${props.reference.content}.${index}-color`} value={item.color} />
            )}
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              viewport={{ amount: 0.4, once: true }}
              transition={{ delay: index * 0.2, duration: 0.2 }}
              className="h-[550px] relative shadow-xl transition-none"
            >
              <Image
                edit={props.edit}
                src={item.image}
                name={`array_${props.reference.content}.${index}-image`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, #00000030 0%, ${item.color}99 50%, ${item.color}cc 60%, ${item.color}ee 100%)`
                }}
              />
              <div className="w-full absolute bottom-0 p-8 space-y-8 box-border">
                <div>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-subtitle`}
                    className="text-sm sm:text-base font-semibold text-white w-full"
                  >
                    {item.subtitle}
                  </Text>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-title`}
                    className="text-xl sm:text-4xl font-bold text-white font-font2 mt-1 w-full"
                  >
                    {item.title}
                  </Text>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-description`}
                    className="text-sm text-white/90 mt-4 w-full"
                  >
                    {item.description}
                  </Text>
                </div>

                <div className="flex items-center space-x-4 group justify-end group-hover:translate-x-1">
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-ctaText`}
                    className="text-white font-semibold w-full text-right"
                  >
                    {item.ctaText}
                  </Text>
                  <div className="p-2 rounded-full border border-white flex items-center justify-center hover:bg-white/40">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </LinkWrapper>
        ))}
      </div>
    </div>
  )
}