import Image from '../image/Image'
import Text from '../text/Text'

export interface Props {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: {
    name: string;
    description: string;
    icon: string;
  }[];
  edit: boolean;
  reference: any;
}

export default function ThielBlock(props: Props) {
  return (
    <>
      <div className="overflow-hidden bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <Text edit={props.edit} name={props.reference.subtitle} className="text-base font-semibold leading-7 text-color2 w-full font-font2">{props.subtitle}</Text>
              <Text edit={props.edit} name={props.reference.title} className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl w-full font-font2">{props.title}</Text>
              <Text edit={props.edit} name={props.reference.description} className="mt-6 text-lg leading-8 text-text w-full">
                {props.description}
              </Text>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-text lg:max-w-none">
                {props.content.map((feature, index) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-title">
                      <i className={`fa-solid fa-${feature.icon} mr-2.5 text-md text-color1`}/>
                      <Text edit={props.edit} name={`array_${props.reference.content}.${index}-name`} className="inline">{feature.name}</Text>
                    </dt>{' '}
                    <Text edit={props.edit} name={`array_${props.reference.content}.${index}-description`} className="inline w-full">{feature.description}</Text>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            edit={props.edit}
            name={props.reference.image}
            src={props.image}
            className="aspect-[7/5] object-cover w-[48rem] max-w-none rounded-xl shadow-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
    </>
  )
}