"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SmallRichTextReader from "@/components/text/SmallRichTextReader";
import { motion } from "framer-motion";
import Text from "../text/Text";

interface AccordionData {
  name: string;
  content: string;
  icon: string;
}

interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: AccordionData[];
}

export default function MalkielBlock(props: Props) {
  return (
    <section className="container mx-auto mt-24 sm:mt-32 px-6 sm:px-0">
      <div className="grid gap-6 sm:gap-24 md:grid-cols-[2fr_3fr]">
        {/* Left column - Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.9, once: true }}
              className="text-sm font-medium tracking-wider text-color1 transition-none"
            >
              <Text edit={props.edit} name={props.reference.subtitle} className="text-sm font-medium tracking-wider text-color1 transition-none">{props.subtitle}</Text>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.9, once: true }}
              className="text-3xl font-bold tracking-tight text-title transition-none"
            >
              <Text edit={props.edit} name={props.reference.title} className="text-3xl font-bold tracking-tight text-title transition-none">{props.title}</Text>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              viewport={{ amount: 0.9, once: true }}
              className="text-lg text-text transition-none"
            >
              <Text edit={props.edit} name={props.reference.description} className="text-lg text-text transition-none">{props.description}</Text> 
            </motion.div>
          </div>
        </div>

        {/* Right column - Accordion */}
        <div
          className="space-y-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {props.content.map((item) => (
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 5, scale: 1 }}
                viewport={{ amount: 0.9, once: true }}
                key={item.name}
                className="transition-none"
              >
                <AccordionItem value={item.name}>
                  <AccordionTrigger className="text-left transition-all [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3 text-lg py-2 font-medium">
                    <i className={`fa-solid fa-${item.icon} w-12 text-color1 text-xl`} aria-hidden="true" />
                    {item.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <SmallRichTextReader content={item.content} />
                </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}