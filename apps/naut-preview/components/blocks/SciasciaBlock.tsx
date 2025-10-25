import Text from "../text/Text";

export interface Props {
  title: string;
  description1: string;
  description2: string;
  stats: { 
    label: string; 
    value: string 
  }[];
  edit: boolean;
  reference: any;
}

export default function SciasciaBlock(props: Props) {
  return (
    <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <Text
            edit={props.edit}
            name={props.reference.title}
            className="text-3xl font-bold tracking-tight text-title sm:text-4xl"
          >
            {props.title}
          </Text>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <Text
                className="text-xl leading-8 text-text w-full"
                edit={props.edit}
                name={props.reference.description1}
              >
                {props.description1}
              </Text>
              <Text
                className="w-full mt-10 max-w-xl text-base leading-7 text-text"
                edit={props.edit}
                name={props.reference.description2}
              >
                {props.description2}
              </Text>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {props.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-y-4 mt-8"
                  >
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.stats}.${index}-label`}
                      className="text-base leading-7 text-text"
                    >
                      {stat.label}
                    </Text>
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.stats}.${index}-value`}
                      className="text-5xl font-semibold tracking-tight text-color1"
                    >
                      {stat.value}
                    </Text>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
