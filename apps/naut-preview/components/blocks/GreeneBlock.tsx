import Link from '../link/Link'
import Text from '../text/Text'
//queda pendiente arreglar las columnas dinámicas

export interface Props {
  title: string;
  isDescription: boolean;
  description?: string;
  content: {
    image: string;
    url: string;
    text: string;
  }[];
  edit: boolean;
  reference: any;
}

export default function GreeneBlock(props: Props) {
  return (
    <>
      <Text edit={props.edit} name={props.reference.title} className="block w-complete sm:w-complete-sm max-w-4xl mx-auto mt-24 sm:mt-32 text-title text-center text-2xl sm:text-4xl font-bold tracking-[-0.3px] sm:tracking-[-0.5px] font-font2">{props.title}</Text>
      {props.isDescription && (
      <Text edit={props.edit} name={props.reference.description} className="block w-complete sm:w-complete-sm mx-auto mt-4 text-center sm:text-md text-text tracking-[-0.2px] max-w-4xl">{props.description}</Text>
      )}
      <div className={`mx-auto w-complete sm:w-complete-sm grid ${ props.content.length===2 ? "md:grid-cols-2" : props.content.length===3 ? "md:grid-cols-3" : props.content.length===4 ? "md:grid-cols-4" : "md:grid-cols-2"} gap-8 sm:gap-12 mt-10`}>
        {props.content.map((item, index) => (
          <div key={index} className="relative flex justify-center items-center w-full h-96 rounded-xl bg-center bg-cover overflow-hidden" style={{backgroundImage: `url('${item.image}')`}}>
            <div className="absolute w-full h-full bg-color1 opacity-50">
            </div>
            <Link edit={props.edit} linkName={`array_${props.reference.content}.${index}-url`} textName={`array_${props.reference.content}.${index}-text`} className="min-w-[50%] shadow-fanoespecial flex items-center justify-center bg-bg1 z-10 px-10 pt-3 pb-4 font-semibold text-lg hover:translate-x-1 tracking-[-0.3px] text-title rounded-md" href={item.url}>
                {item.text}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}