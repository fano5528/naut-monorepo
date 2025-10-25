import Text from "../text/Text";

export interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  features: Array<{name: string; description: string}>;
}

export default function GladwellBlock(props: Props) {
  //console.log(JSON.stringify(json))
    return (
        <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Text
            name={props.reference.title}
            edit={props.edit}
            className="text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2"
          >
            {props.title}
          </Text>
          <Text
            name={props.reference.description}
            edit={props.edit}
            className="mt-6 text-lg leading-8 text-text"
          >
            {props.description}
          </Text>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.features.map((feature, index) => (
            <div key={feature.name}>
              <dt className="font-semibold text-title font-font2">
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.features}.${index}-name`}
                  className="inline"
                >
                  {feature.name}
                </Text>
              </dt>
              <dd className="mt-1 text-text">
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.features}.${index}-description`}
                  className="inline w-full"
                >
                  {feature.description}
                </Text>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    )
}