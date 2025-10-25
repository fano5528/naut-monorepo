"use client";

import { motion } from "framer-motion";
import Text from "../text/Text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  edit: boolean;
  reference: any;
  isDescription: boolean;
  title: string;
  description: string;
  content: { question: string; answer: string[] }[];
}

export default function HarariBlock(props: Props) {
  return (
    <div className="bg-bg1">
      <div className="mx-auto max-w-7xl px-6 mt-24 sm:mt-32 lg:px-8">

        <div className="mx-auto max-w-4xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, amount: 0.3 }}
              viewport={{ once: true }}
              className="transition-none"
            >
              <Text
                edit={props.edit}
                name={props.reference.title}
                className="w-full text-2xl font-bold leading-10 tracking-tight text-title font-font2"
              >
                {props.title}
              </Text>
            </motion.div>
            {props.isDescription && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, amount: 0.3 }}
                viewport={{ once: true }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.description}
                  className="w-full mt-4 text-lg leading-7 text-text"
                >
                  {props.description}
                </Text>
              </motion.div>
            )}
          </div>
          <Accordion type="single" className="divide-y divide-title/10 mt-10" collapsible>
            {props.content.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, amount: 0.3 }}
                viewport={{ once: true }}
                className="transition-none"
              >
                {props.edit && <input type="hidden" name={`array_${props.reference.content}.${index}-answer`} value={JSON.stringify(faq.answer)} />}
                <AccordionItem value={`item-${index}`} className="border-none py-5">
                  <AccordionTrigger className="cursor-pointer flex w-full items-start justify-between text-left text-title py-0">
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.content}.${index}-question`}
                      className="w-full text-base font-semibold leading-7 inline-block font-font2"
                    >
                      {faq.question}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 pr-12">
                    {faq.answer.length > 1 ? (
                      <ul className="text-base leading-7 text-text list-disc flex flex-col gap-1">
                        {faq.answer.map((answer, answerIndex) => (
                          <li key={answerIndex} className="pb-0 ml-5">
                            {answer}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base leading-7 text-text pb-0 ml-0">
                        {faq.answer[0]}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
