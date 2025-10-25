"use client";

import { CheckIcon } from '@heroicons/react/20/solid'
import Link from '../link/Link'
import Text from '../text/Text'
import { motion } from 'framer-motion'

export default function MorinBlock(props: { title: string, description: string, subtitle: string, subdescription: string, textAbovePoints: string, content: {name: string}[], textAbovePrice: string, price: string, priceSubtitle: string, ctaLink: string, ctaText: string, edit: boolean, textUnderCta: string, reference: any }) {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto sm:text-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.8, once: true }}
            className="transition-none"
          >
          <Text name={props.reference.title} edit={props.edit} className="mx-auto max-w-4xl text-center w-full text-3xl font-bold tracking-tight text-title sm:text-5xl font-font2">{props.title}</Text>
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.8, once: true }}
            className="transition-none"
          >
          <Text name={props.reference.description} edit={props.edit} className="mx-auto max-w-4xl w-full mt-6 text-lg leading-8 text-text">
            {props.description}
          </Text>
          </motion.div>
        </div>
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          viewport={{ amount: 0.8, once: true }}
          transition={{ duration: 0.2 }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-color1/50 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none transition-none"
        >
          <div className="p-8 sm:p-10 lg:flex-auto">
            <Text name={props.reference.subtitle} edit={props.edit} className="w-full text-2xl font-bold tracking-tight text-title font-font2">{props.subtitle}</Text>
            <Text edit={props.edit} name={props.reference.subdescription} className="w-full mt-6 text-base leading-7 text-text">
              {props.subdescription}
            </Text>
            <div className="mt-10 flex items-center gap-x-4">
              <Text edit={props.edit} name={props.reference.textAbovePoints} className="flex-none text-sm font-semibold leading-6 text-color1 font-font2">{props.textAbovePoints}</Text>
              <div className="h-px flex-auto bg-color1/50" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-text sm:grid-cols-2 sm:gap-6"
            >
              {props.content.map((feature) => (
                <li key={feature.name} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-5 flex-none text-color1" aria-hidden="true" />
                  <Text edit={props.edit} name={`array_${props.reference.content}.${props.content.indexOf(feature)}`} className="flex-auto">
                  {feature.name}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-bg2 py-10 text-center ring-1 ring-inset ring-title/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <Text edit={props.edit} name={props.reference.textAbovePrice} className="text-base font-semibold text-text">{props.textAbovePrice}</Text>
                <div className="mt-6 flex items-baseline justify-center gap-x-2">
                  <Text name={props.reference.price} edit={props.edit} className="text-5xl font-bold tracking-tight text-title font-font2">{props.price}</Text>
                  <Text name={props.reference.priceSubtitle} edit={props.edit} className="text-sm font-semibold leading-6 tracking-wide text-text">{props.priceSubtitle}</Text>
                </div>
                <Link
                  href={props.ctaLink}
                  linkName={props.reference.ctaLink}
                  textName={props.reference.ctaText}
                  edit={props.edit}
                  className="mt-10 block w-full rounded-md bg-color1 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                >
                  {props.ctaText}
                </Link>
                <Text name={props.reference.textUnderCta} edit={props.edit} className="mt-6 text-xs leading-5 text-text">
                  {props.textUnderCta}
                </Text>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}