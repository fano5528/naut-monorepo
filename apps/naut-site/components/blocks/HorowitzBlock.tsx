import Text from "../text/Text"
import Link from "../link/Link"
import Image from "../image/Image"

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: {
    name: string;
    date: string;
    author: string;
    image: string;
    href: string;
  }[]
}

export default function HorowitzBlock(props: Props) {

  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Text name={props.reference.title} edit={props.edit} className="text-3xl font-bold tracking-tight text-color1 sm:text-4xl w-full block text-center">{props.title}</Text>
          <Text name={props.reference.description} edit={props.edit} className="mt-2 text-lg leading-8 text-text w-full block text-center">
            {props.description}
          </Text>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.content.map((post, index) => (
            <article
              key={post.name}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-[1.01]"
            >
              <Image edit={props.edit} name={`array_${props.reference.content}.${index}-image`} src={post.image} className="absolute inset-0 -z-10 h-full w-full object-cover top-0 left-0" />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-900 via-neutral-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-neutral-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-neutral-300">
                <Text name={`array_${props.reference.content}.${index}-date`} edit={props.edit} className="mr-8">
                  {post.date}
                </Text>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <Text name={`array_${props.reference.content}.${index}-author`} edit={props.edit} className="flex gap-x-2.5">
                    {post.author}
                  </Text>
                </div>
              </div>
              <div className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link edit={props.edit} textName={`array_${props.reference.content}.${index}-name`} linkName={`array_${props.reference.content}.${index}-name`} href={post.href}>
                  {post.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
