"use client";
import { motion } from "framer-motion";
import Text from "../text/Text";
import Image from "../image/Image";

interface LogoItem {
  name: string;
  image: string;
}

export interface Props {
  title: string;
  description: string;
  content: LogoItem[];
  edit: boolean;
  reference: any;
}

export default function DumasBlock(props: Props) {
  return (
    <div className="bg-color2 py-16 sm:py-24 mt-16 sm:mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-4xl font-bold text-white text-center transition-none w-full"
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
        >
          <Text edit={props.edit} name={props.reference.title} className="w-full text-4xl font-bold text-white text-center transition-none">{props.title}</Text>
        </motion.div>
        <motion.div
          className="text-white text-center mt-4 max-w-2xl mx-auto transition-none w-full"
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
        >
          <Text edit={props.edit} name={props.reference.description} className="w-full text-white text-center mt-4 max-w-2xl mx-auto transition-none">{props.description}</Text>
        </motion.div>
        <div className="mt-12 -mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-5">
          {props.content.map((logo, index) => (
            <motion.div
              key={index}
              className="bg-white/5 p-6 sm:p-10 transition-none"
              initial={{ opacity: 0.4, y: 5, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ delay: 0 + index * 0.05 }}
            >
              <Image
                edit={props.edit}
                alt={logo.name}
                src={logo.image}
                name={`array_${props.reference.content}.${index}-image`}
                className="max-h-8 sm:max-h-12 w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}