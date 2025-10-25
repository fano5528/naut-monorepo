'use client'

import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      className="bg-naut hover:bg-naut/80 w-full font-semibold"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:hidden" />
          <span>Guardando...</span>
        </div>
      ) : (
        "Guardar"
      )}
    </Button>
  )
} 