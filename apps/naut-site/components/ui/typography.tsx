import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"

// Heading components
export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-5 lg:text-5xl -tracking-[0.02rem]",
        className
      )}
      {...props}
    />
  )
}

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl lg:text-4xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function H3({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function H4({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

// Paragraph component
export const P = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("leading-7 not-first:mt-6", className)}
    {...props}
  />
))
P.displayName = "P"

// Muted text component
export function Muted({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}