"use client";

import { XMarkIcon } from '@heroicons/react/20/solid'
import Text from "../text/Text"
import Link from "../link/Link"
import { useState } from 'react'

export default function SheeranBanner(props: { title: string, ctaText: string, ctaLink: string, edit: boolean, reference: any }) {
  const [show, setShow] = useState(true)

  return (
    <>
      
      <div className={`z-20 pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8 ${show ? "" : "hidden"}`}>
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-color1 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <div className="text-sm leading-6 text-white">
            
          <Text edit={props.edit} name={props.reference.title} className="font-semibold inline-block h-auto">{props.title}</Text>
              <svg viewBox="0 0 2 2" className="mx-2 inline-block h-0.5 w-0.5 fill-current" aria-hidden="true">
                <circle cx={1} cy={1} r={1} />
              </svg>
            <Link edit={props.edit} linkName={props.reference.ctaLink} textName={props.reference.ctaText} href={props.ctaLink} className="inline-block">
              {props.ctaText}
            </Link>
          </div>
          <button type="button" className="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]" onClick={()=>setShow(false)}>
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}
