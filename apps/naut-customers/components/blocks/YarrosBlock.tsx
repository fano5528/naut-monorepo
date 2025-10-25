"use client"; 

import Text from "../text/Text"
import Image from "../image/Image"
import { motion } from "framer-motion"

function isOdd(num:number) { return num % 2;}

export default function YarrosBlock(props: {
  edit: boolean,
  reference: any,
  title: string,
  description: string,
  content: { name: string, title?: string, description?: string, image: string }[]
}) {
  return (
    <div className="mt-24 md:mt-32 lg:mt-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          ><Text className="text-3xl font-bold tracking-tight sm:text-4xl w-full text-color1 block" name={props.reference.title} edit={props.edit}>{props.title}</Text></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          ><Text className="mt-6 text-lg leading-8 text-text w-full block" name={props.reference.description} edit={props.edit}>
            {props.description}
          </Text></motion.div>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {props.content.map((person, personIndex) => (
            <motion.li className="transition-none" key={person.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: (isOdd(personIndex)) ? 0.2 : 0 }} viewport={{ amount: 0.2, once: true }}>
              <Image edit={props.edit} name={`array_${props.reference.content}.${personIndex}-image`} className="aspect-[2/2] w-full rounded-2xl object-cover shadow-lg" src={person.image} />
              <Text edit={props.edit} name={`array_${props.reference.content}.${personIndex}-name`} className="mt-6 text-lg font-semibold leading-8 text-color1 block w-full">{person.name}</Text>
              <Text edit={props.edit} name={`array_${props.reference.content}.${personIndex}-title`} className="text-base leading-7 text-title w-full">{person.title}</Text>
              {person.description && (
              <Text edit={props.edit} name={`array_${props.reference.content}.${personIndex}-description`} className="w-full mt-4 text-base leading-7 text-text/80">{person.description}</Text>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
