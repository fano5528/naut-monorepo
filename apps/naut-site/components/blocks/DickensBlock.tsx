import Link from "../link/Link";
import Text from "../text/Text";

interface Props {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  edit: boolean;
  reference: any;
}

export default function DickensBlock(props: Props) {
  return (
    <div className="w-full sm:w-complete-sm mt-24 sm:mt-32 mx-auto">
      <div className="w-full block relative isolate overflow-hidden bg-color1 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <Text
          edit={props.edit}
          name={props.reference.title}
          className="text-center w-full block mx-auto max-w-2xl text-3xl font-bold tracking-tight text-bg1 sm:text-4xl font-font2"
        >
          {props.title}
        </Text>
        <Text
          edit={props.edit}
          name={props.reference.description}
          className="text-center w-full mx-auto mt-6 max-w-xl text-lg leading-8 text-bg2 tracking-[-0.2px]"
        >
          {props.description}
        </Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={props.ctaLink}
            className="font-font2 rounded-md bg-bg1 px-8 py-3 text-md font-semibold text-color1 shadow-xs hover:bg-bg2 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg1"
            edit={props.edit}
            linkName={props.reference.ctaLink}
            textName={props.reference.ctaText}
          >
            {props.ctaText}
          </Link>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.4"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop className="text-white bg-white fill-white" />
              <stop offset={1} stopColor="#324376" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
