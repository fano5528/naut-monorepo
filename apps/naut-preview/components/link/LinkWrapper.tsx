"use client"

import { useState } from 'react'
import { Settings } from 'lucide-react'
import DomainLink from "./DomainLink"
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

interface LinkWrapperProps {
  children: React.ReactNode
  href: string
  className?: string
  reference: string
  edit: boolean
}

export default function LinkWrapper(props: LinkWrapperProps) {
  const [open, setOpen] = useState(false)
  const [href, setHref] = useState(props.href)

  if (props.edit) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar enlace</DialogTitle>
              <DialogDescription>
                Aquí puedes editar el enlace de destino.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs">Link</label>
                <Input
                  type="text"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
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

        <div className={`${props.className} relative`}>
          {props.children}
          <div
            className="cursor-pointer bg-[#2adf94] z-10 absolute right-2 bottom-2 p-2 rounded-md hover:bg-[#20d589] text-white text-xs"
            onClick={() => setOpen(true)}
          >
            <Settings className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <input type="hidden" name={props.reference} value={href} />
        </div>
      </>
    )
  }

  return (
    <DomainLink href={props.href} className={props.className}>
      {props.children}
    </DomainLink>
  )
}