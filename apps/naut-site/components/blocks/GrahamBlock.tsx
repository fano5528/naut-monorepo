import Text from "../text/Text";
import Image from "../image/Image";

interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description1?: string;
  description2?: string;
  content?: {
    name: string;
    description: string;
    icon: string;
  }[];
  image: string;
}

export default function GrahamBlock(props: Props) {
  return (
    <div className="relative isolate overflow-hidden px-6 pt-24 sm:pt-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-256 w-512 -translate-x-1/2 stroke-text/10 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-text/5">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <Text
                name={props.subtitle}
                edit={props.edit}
                className="block w-full text-base font-semibold leading-7 text-color1"
              >
                {props.subtitle}
              </Text>
              <Text
                name={props.title}
                edit={props.edit}
                className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl block w-full"
              >
                {props.title}
              </Text>
              {props.description1 && (
                <Text
                  edit={props.edit}
                  name={props.description1}
                  className="mt-6 text-xl leading-8 text-text w-full"
                >
                  {props.description1}
                </Text>
              )}
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-3xl max-w-none rounded-xl bg-title shadow-xl ring-1 ring-text/10 sm:w-228"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            edit={props.edit}
            name={props.reference.image}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-text lg:max-w-lg">
              {props.description2 && (
                <Text
                  name={props.reference.description2}
                  edit={props.edit}
                  className="w-full"
                >
                  {props.description2}
                </Text>
              )}
              <ul role="list" className="mt-8 space-y-8 text-text">
                {props.content?.map((item, index) => (
                <li className="flex" key={item.name}>
                  <i
                    className={`h-5 w-5 flex-none text-color1 fa-solid fa-${
                      item.icon
                    } mt-1.5 mr-2`}
                    aria-hidden="true"
                  />
                  <span>
                    <Text name={`array_${props.reference.content}.${index}-name`} edit={props.edit} className="font-semibold text-title inline">
                      {item.name}
                    </Text>{" "}
                    <Text name={`array_${props.reference.content}.${index}-description`} edit={props.edit} className="text-text inline w-full">
                      {item.description}
                    </Text>
                  </span>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
