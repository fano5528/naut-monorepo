'use client'

import { useState, useActionState } from 'react'
import { FormAlertDialog } from './form-alert-dialog'

export function FormWrapper({ 
  children, 
  action,
  domain 
}: { 
  children: React.ReactNode
  action: (formData: FormData) => Promise<{ success: boolean }>
  domain: string
}) {
  const [showAlert, setShowAlert] = useState(false)
  const [, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await action(formData)
    if (result.success) {
      setShowAlert(true)
    }
    return result
  }, null)

  return (
    <>
      <form action={formAction}>
        {children}
      </form>
      <FormAlertDialog isOpen={showAlert} domain={domain} />
    </>
  )
} 