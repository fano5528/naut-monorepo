import Link from 'next/link'

export default function HeaderLink(props: { edit: boolean, className?: string, href: string, target?: string, children: React.ReactNode }) {
  if(props.edit) {
    return (
      <div className={props.className}>
        {props.children}
      </div>
    )
  }
  else {
  return (
    <Link href={props.href} className={`${props.className}`} target={props.target}>
      {props.children}
    </Link>
  )  
  }
}