import Text from "../text/Text";
import Link from "../link/Link";

interface Props {
  edit: boolean;
  reference: any;
  isCta: boolean;
  subtitle: string;
  title: string;
  description: string;
  content: { icon: string; name: string; description: string; ctaText?: string; ctaLink?: string }[];
}

export default function OrwellBlock(props: Props) {
  return (
    <div className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <Text
            className="text-base font-semibold leading-7 text-color1 font-font2 w-full text-center"
            name={props.reference.subtitle}
            edit={props.edit}
          >
            {props.subtitle}
          </Text>
          <Text
            name={props.reference.title}
            edit={props.edit}
            className="text-center w-full mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2"
          >
            {props.title}
          </Text>
          <Text
            name={props.reference.description}
            edit={props.edit}
            className="text-center w-full mt-6 text-lg leading-8 text-text"
          >
            {props.description}
          </Text>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl
            className={`grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none ${
              props.content.length == 2
                ? "lg:grid-cols-2"
                : props.content.length == 3
                ? "lg:grid-cols-3"
                : props.content.length == 4
                ? "lg:grid-cols-4"
                : props.content.length == 5
                ? "lg:grid-cols-5"
                : "lg-grid-cols:3"
            }`}
          >
            {props.content.map((feature, index) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-title font-font2">
                  <i
                    className={`h-5 w-5 flex-none text-color1 fa-solid fa-${feature.icon}`}
                    aria-hidden="true"
                  />
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-name`}
                    className="flex-auto"
                  >
                    {feature.name}
                  </Text>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text">
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-description`}
                    className="flex-auto"
                  >
                    {feature.description}
                  </Text>
                  {props.isCta ? (
                    <p className="mt-6">
                      <Link
                        edit={props.edit}
                        textName={`array_${props.reference.content}.${index}-ctaText`}
                        linkName={`array_${props.reference.content}.${index}-ctaLink`}
                        href={feature.ctaLink!}
                        className="text-sm font-semibold leading-6 text-color1"
                      >
                        {feature.ctaText}
                      </Link>
                    </p>
                  ) : (
                    ""
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
