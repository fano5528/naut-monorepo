import Text from "../text/Text"
import Link from "../link/Link"
import Image from "../image/Image"

export interface Props {
  title: string;
  description: string;
  content: {
    image: string;
    href: string;
    date: string;
    category: string;
    title: string;
    description: string;
  }[];
  reference: any;
  edit: boolean;
}

export default function CollinsBlock(props: Props) {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Text name={props.reference.title} edit={props.edit} className="block text-3xl font-bold tracking-tight text-color1 sm:text-4xl text-center mx-auto max-w-xl w-full">{props.title}</Text>
          <Text name={props.reference.description} edit={props.edit} className="mt-2 text-lg leading-8 text-text block text-center mx-auto max-w-xl w-full">
            {props.description}
          </Text>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.content.map((post, postIndex) => (
            <article key={post.title} className="flex flex-col items-start justify-start">
              <div className="relative w-full">
                <Image
                  src={post.image}
                  edit={props.edit}
                  name={`array_${props.reference.content}.${postIndex}-image`}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl flex flex-col gap-2">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <Text edit={props.edit} name={`array_${props.reference.content}.${postIndex}-date`} className="text-text">
                    {post.date}
                  </Text>
                  <Text
                    className="relative z-10 rounded-full bg-text/10 px-3 py-1.5 font-medium text-text"
                    edit={props.edit}
                    name={`array_${props.reference.content}.${postIndex}-category`}
                  >
                    {post.category}
                  </Text>
                </div>
                <div className="group relative">
                  <span className="text-lg font-semibold leading-6 text-title group-hover:text-text">
                    <Link href={post.href} linkName={`array_${props.reference.content}.${postIndex}-href`} textName={`array_${props.reference.content}.${postIndex}-title`} edit={props.edit}>
                      {post.title}
                    </Link>
                  </span>
                  <Text edit={props.edit} name={`array_${props.reference.content}.${postIndex}-description`} className="mt-4 text-sm leading-6 text-text w-full">{post.description}</Text>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
