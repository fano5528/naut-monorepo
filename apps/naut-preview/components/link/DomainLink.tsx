"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'

interface DomainLinkProps {
  href: string
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
}

export default function DomainLink({ href, className, children, style, onClick }: DomainLinkProps) {
  const params = useParams()
  const domain = params.domain as string
  
  // Add domain prefix to the link
  const prefixedHref = href.startsWith('/') 
    ? `/${domain}${href}` 
    : href.startsWith('http') 
      ? href // Don't modify external links
      : `/${domain}/${href}`
  
  return (
    <Link
      href={prefixedHref}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </Link>
  )
} 