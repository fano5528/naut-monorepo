"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'password' | 'hidden'
  placeholder?: string
  description?: string
  value?: string
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: string
    min?: number
    max?: number
  }
}

interface AppFormProps {
  fields: FormField[]
  title: string
  action: (data: any) => Promise<void>
}

export default function AppForm({ fields, action }: AppFormProps) {
  const [isPending, startTransition] = useTransition()

  const generateSchema = () => {
    const schemaObj: Record<string, any> = {}
    
    fields.forEach((field) => {
      let fieldSchema = field.type === 'number' ? z.number() : z.string()
      
      if (field.validation) {
        const { minLength, maxLength, pattern, min, max } = field.validation
        
        if (field.type === 'number') {
          if (min !== undefined) fieldSchema = fieldSchema.min(min)
          if (max !== undefined) fieldSchema = fieldSchema.max(max)
        } else {
          const stringSchema = fieldSchema as z.ZodString
          if (minLength) fieldSchema = stringSchema.min(minLength)
          if (maxLength) fieldSchema = stringSchema.max(maxLength)
          if (pattern) fieldSchema = stringSchema.regex(new RegExp(pattern))
        }
      }
      
      schemaObj[field.name] = field.validation?.required === false ? fieldSchema.optional() : fieldSchema
    })
    
    return z.object(schemaObj)
  }

  const schema = generateSchema()
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.value || (field.type === 'number' ? 0 : ''),
    }), {}),
  })

  const handleSubmit = (values: z.infer<typeof schema>) => {
    startTransition(() => {
      action(values)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                    {...(field.type === 'hidden' ? { value: field.value } : {})}
                  />
                </FormControl>
                {field.description && (
                  <FormDescription className="text-xs">
                    {field.description}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </Form>
  )
}
