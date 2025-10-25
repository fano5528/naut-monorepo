export default function Text(props: { className?: string, style?: React.CSSProperties, edit: boolean, children: React.ReactNode, name: string}) {
  if(props.edit) {
    return (
      <textarea name={props.name} className={"bg-[#00000000] border border-text rounded " + props.className} defaultValue={props.children?.toString()}></textarea>
    )
  } else {
    return (
      <p className={props.className} style={props.style}>{props.children}</p>
    )
  }
}