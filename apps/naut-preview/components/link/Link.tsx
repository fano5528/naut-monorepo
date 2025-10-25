"use client"

import { useState } from 'react'
import { CogIcon } from '@heroicons/react/24/outline'
import DomainLink from './DomainLink'
import {
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LinkElement(props: { 
  href: string, 
  className?: string, 
  children: any, 
  linkName: string, 
  textName: string, 
  edit: boolean, 
  style?: React.CSSProperties
}) {
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState(props.href)
  const [text, setText] = useState(props.children)

  if(props.edit) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar botón</DialogTitle>
              <DialogDescription>
                Aquí, puedes editar el texto del botón, al igual que el link al que te lleva.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs">Link</label>
                <Input
                  type="text" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs">Texto</label>
                <Input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <h1 className={`${props.className} !relative`}>
          {text}
          <div 
            className="cursor-pointer bg-[#2adf94] absolute left-0 top-0 -mt-9 p-2 rounded-t-md hover:bg-[#20d589] text-white text-xs" 
            onClick={() => setOpen(true)}
          >
            <CogIcon className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </h1>
        <input type="hidden" name={props.linkName} value={link} />
        <input type="hidden" name={props.textName} value={text} />
      </>
    )
  }

  return (
    <DomainLink
      href={props.href}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </DomainLink>
  )
}