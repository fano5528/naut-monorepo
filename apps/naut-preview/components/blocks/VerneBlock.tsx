import Text from "../text/Text";

export interface Props {
  isSubtitle: boolean;
  isTitle: boolean;
  isDescription: boolean;
  subtitle?: string;
  title?: string;
  description?: string;
  content: { 
    name: string; 
    description: string; 
    date: string 
  }[];
  edit: boolean;
  reference: any;
}

export default function VerneBlock(props: Props) {
  return (
    <>
      <div className="hidden grid-cols-1">
        <div className="hidden grid-cols-2">
          <div className="hidden grid-cols-3">
            <div className="hidden grid-cols-4">
              <div className="hidden grid-cols-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 sm:mt-32 bg-bg2 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
          {props.isSubtitle ? (
            <Text
              edit={props.edit}
              name={props.reference.subtitle}
              className="text-base font-semibold leading-7 text-color1 text-center font-font2"
            >
              {props.subtitle}
            </Text>
          ) : (
            ""
          )}
          {props.isTitle ? (
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2 text-center w-full"
            >
              {props.title}
            </Text>
          ) : (
            ""
          )}
          {props.isDescription ? (
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="mt-6 text-lg leading-8 text-text text-center w-full"
            >
              {props.description}
            </Text>
          ) : (
            ""
          )}
          </div>

          <div
            className={`mt-14 mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none ${props.content.length == 1 ? "lg:grid-cols-1" : props.content.length == 2 ? "lg:grid-cols-2" : props.content.length == 3 ? "lg:grid-cols-3" : props.content.length == 4 ? "lg:grid-cols-4" : props.content.length == 5 ? "lg:grid-cols-5" : props.content.length == 6 ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}
          >
            {props.content.map((item, index) => (
              <div key={item.name}>
                <time className="flex items-center text-sm font-semibold leading-6 text-color1 font-font3">
                  <svg
                    viewBox="0 0 4 4"
                    className="mr-4 h-1 w-1 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx={2} cy={2} r={2} fill="currentColor" />
                  </svg>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-date`}
                  >
                    {item.date}
                  </Text>
                  <div
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-color1/40 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                    aria-hidden="true"
                  />
                </time>
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.content}.${index}-name`}
                  className="w-full mt-6 text-lg font-semibold leading-8 tracking-tight text-title font-font2"
                >
                  {item.name}
                </Text>
                <Text
                  edit={props.edit}
                  name={`array_${props.reference.content}.${index}-description`}
                  className="w-full mt-1 text-base leading-7 text-text"
                >
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
