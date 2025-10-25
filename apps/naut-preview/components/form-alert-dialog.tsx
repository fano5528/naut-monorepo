'use client'

import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface FormAlertDialogProps {
  isOpen: boolean
  domain: string
}

export function FormAlertDialog({ isOpen, domain }: FormAlertDialogProps) {
  const router = useRouter()

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¡Cambios guardados!</AlertDialogTitle>
          <AlertDialogDescription>
            Los cambios han sido guardados exitosamente, y serán visibles en el sitio web en los próximos minutos. ¿Qué deseas hacer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogAction 
            onClick={() => window.location.reload()}
            className="border border-neutral-800/60 hover:border-neutral-800 text-neutral-800/60 hover:text-neutral-800 font-medium bg-transparent hover:bg-transparent"
          >
            Seguir editando página
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={() => router.push(`/sitio/${domain}/paginas`)}
            className="bg-naut hover:bg-naut/80 font-semibold"
          >
            Salir del editor
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 