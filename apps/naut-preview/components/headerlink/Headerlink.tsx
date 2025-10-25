import DomainLink from '../link/DomainLink'

export default function HeaderLink(props: { edit: boolean, className?: string, href: string, children: React.ReactNode }) {
  if(props.edit) {
    return (
      <div className={props.className}>
        {props.children}
      </div>
    )
  }
  else {
  return (
    <DomainLink href={props.href} className={`${props.className}`}>
      {props.children}
    </DomainLink>
  )  
  }
}