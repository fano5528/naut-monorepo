"use client"

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CogIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function LoadingLinkElement(props: { href: string, className?: string, children: any, linkName: string, textName: string, edit: boolean}) {
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState(props.href)
  const [text, setText] = useState(props.children)
  const [loading, setLoading] = useState(false)

  if(props.edit) {
    return (
      <>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CogIcon className="h-6 w-6 text-color1" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Editar botón
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col items-start">
                      <p className="text-sm text-gray-500">
                       Aquí, puedes editar el texto del botón, al igual que el link al que te lleva.
                      </p>
                      <label className="mt-10 text-xs">Link</label>
                      <input
                        type="text"
                        className="border border-text rounded w-full p-2 mt-1"
                        defaultValue={link}
                        onChange={(e)=>setLink(e.target.value)}
                      />
                      <label className="mt-5 text-xs">Link</label>
                      <input
                        type="text"
                        className="border border-text rounded w-full mt-1 p-2"
                        defaultValue={text}
                        onChange={(e)=>setText(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-color1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-color1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

      <h1
        className={`${props.className} !relative`}
      >
        {text}
        <div className="cursor-pointer bg-[#2adf94] absolute left-0 top-0 -mt-9 p-2 rounded-t-md hover:bg-[#20d589] text-white text-xs" onClick={()=>setOpen(true)}>
          <CogIcon className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
      </h1>
      <input type="hidden" name={props.linkName} value={link} />
      <input type="hidden" name={props.textName} value={text} />
      </>
    )
  }
  else {
    return (
      <Link
        href={props.href}
        className={props.className}
        onClick={() => setLoading(true)}
      >
        { loading ? (
          <ArrowPathIcon className="h-6 w-6 p-1 animate-spin mx-auto" />
        ) : props.children }
      </Link>
    )
  }
}