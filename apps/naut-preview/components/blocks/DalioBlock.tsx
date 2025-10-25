import Text from "../text/Text";
import Link from "../link/Link";

export interface Props {
  title1: string;
  description1: string;
  content1: { name: string; ctaText: string; ctaLink: string }[];
  isSecond: boolean;
  title2?: string;
  description2?: string;
  content2?: { name: string; ctaText: string; ctaLink: string }[];
  edit: boolean;
  reference: any;
}

export default function DalioBlock(props: Props) {
  return (
    <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-text/20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <Text
                name={props.reference.title1}
                edit={props.edit}
                className="text-3xl font-bold tracking-tight text-color1 w-full font-font2"
              >
                {props.title1}
              </Text>
              <Text
                name={props.reference.description1}
                edit={props.edit}
                className="w-full mt-4 leading-7 text-text"
              >
                {props.description1}
              </Text>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              {props.content1.map((item, index) => (
                <div className="rounded-2xl bg-bg2 p-10" key={item.ctaLink}>
                  <Text
                    name={`array_${props.reference.content1}.${index}-name`}
                    edit={props.edit}
                    className="text-base font-semibold leading-7 text-title w-full font-font2"
                  >
                    {item.name}
                  </Text>
                  <dl className="mt-3 space-y-1 text-sm leading-6 text-color1">
                    <div>
                      <dt className="sr-only">{item.name}</dt>
                    </div>
                    <div className="mt-1">
                      <Link
                        linkName={`array_${props.reference.content1}.${index}-ctaLink`}
                        textName={`array_${props.reference.content1}.${index}-ctaText`}
                        edit={props.edit}
                        href={item.ctaLink}
                        className="w-full flex items-center hover:text-title hover:translate-x-1"
                      >
                        {item.ctaText}
                      </Link>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
          {props.isSecond && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
              <div>
                <Text
                  edit={props.edit}
                  name={props.reference.title2}
                  className="w-full text-3xl font-bold tracking-tight text-color1 font-font2"
                >
                  {props.title2}
                </Text>
                <Text
                  edit={props.edit}
                  name={props.reference.description2}
                  className="w-full mt-4 leading-7 text-text"
                >
                  {props.description2}
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                {props.content2!.map((item, index) => (
                  <div className="rounded-2xl bg-bg2 p-10" key={item.ctaLink}>
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.content2}.${index}-name`}
                      className="w-full text-base font-semibold leading-7 text-title font-font2"
                    >
                      {item.name}
                    </Text>
                    <dl className="mt-3 space-y-1 text-sm leading-6 text-color1">
                      <div>
                        <dt className="sr-only">{item.name}</dt>
                      </div>
                      <div className="mt-1">
                        <Link
                          edit={props.edit}
                          textName={`array_${props.reference.content2}.${index}-ctaText`}
                          linkName={`array_${props.reference.content2}.${index}-ctaLink`}
                          href={item.ctaLink}
                          className="w-full flex items-center hover:text-title hover:translate-x-1"
                        >
                          {item.ctaText}
                        </Link>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
