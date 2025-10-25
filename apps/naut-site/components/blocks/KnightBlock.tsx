import Text from "../text/Text"

interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  content: { icon: string; name: string; description?: string }[];
}

export default function KnightBlock(props: Props) {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <Text name={props.subtitle} edit={props.edit} className="text-base font-semibold leading-7 text-color1 font-font2 w-full">{props.subtitle}</Text>
            <Text name={props.title} edit={props.edit} className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2 w-full">{props.title}</Text>
            <Text name={props.description} edit={props.edit} className="mt-6 text-base leading-7 text-text w-full">
              {props.description}
            </Text>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-text sm:grid-cols-2 lg:gap-y-16">
            {props.content.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-title font-font2">
                  <i className={`absolute left-0 top-1 h-5 w-5 text-color1 fa-solid fa-${feature.icon}`} aria-hidden="true" />
                  <Text name={`array_${props.reference.content}.${props.content.indexOf(feature)}-name`} edit={props.edit}>
                  {feature.name}
                  </Text>
                </dt>
                {feature.description ? (
                <Text name={`array_${props.reference.content}.${props.content.indexOf(feature)}-description`} edit={props.edit} className="mt-2">{feature.description}</Text>
                ) : ""}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
