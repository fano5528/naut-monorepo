import Link from "../link/Link";
import IconLink from "../link/IconLink";
import Text from "../text/Text";

interface Props {
  title: string;
  description: string;
  cta1Link: string;
  cta1Text: string;
  cta1Icon?: string;
  cta2Link: string;
  cta2Text: string;
  cta2Icon?: string;
  edit: boolean;
  reference: any;
}

export default function VargasBlock(props: Props) {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-color1 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="font-font2 text-2xl font-bold tracking-tight text-bg1 sm:text-3xl w-full"
            >
              {props.title}
            </Text>
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="mt-6 text-md leading-8 text-bg2 w-full"
            >
              {props.description}
            </Text>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {props.cta1Text && props.cta1Icon ? (
                <IconLink
                  href={props.cta1Link}
                  className="flex items-center justify-center rounded-md bg-bg1 px-3.5 py-2.5 text-sm font-semibold text-color1 shadow-xs hover:bg-bg1/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  linkName={props.reference.cta1Link}
                  textName={props.reference.cta1Text}
                  edit={props.edit}
                  icon={props.cta1Icon}
                  iconFirst
                >
                  {props.cta1Text}
                </IconLink>
              ) : props.cta1Text && (
                <Link
                  href={props.cta1Link}
                  className="flex items-center justify-center rounded-md bg-bg1 px-3.5 py-2.5 text-sm font-semibold text-color1 shadow-xs hover:bg-bg1/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  linkName={props.reference.cta1Link}
                  textName={props.reference.cta1Text}
                  edit={props.edit}
                >
                  {props.cta1Text}
                </Link>
              )}
              {props.cta2Text && props.cta2Icon ? (
                <IconLink
                  href={props.cta2Link}
                  className="text-sm font-semibold leading-6 text-bg1 hover:translate-x-1"
                  linkName={props.reference.cta2Link}
                  textName={props.reference.cta2Text}
                  edit={props.edit}
                  icon={props.cta2Icon}
                  iconFirst
                >
                  {props.cta2Text}
                </IconLink>
              ) : props.cta2Text && (
                <Link
                  href={props.cta2Link}
                  className="text-sm font-semibold leading-6 text-bg1 hover:translate-x-1"
                  linkName={props.reference.cta2Link}
                  textName={props.reference.cta2Text}
                  edit={props.edit}
                >
                  {props.cta2Text}
                </Link>
              )}
            </div>
          </div>
          <div className="relative h-96 mt-12 sm:mt-16 lg:mt-0">
            <img className="absolute -left-6 sm:-left-16 md:-left-24 top-0 lg:w-228 lg:h-224 lg:ml-16 w-screen h-[110vw] max-w-none bg-white/5 ring-1 ring-white/10 object-cover object-center" src="https://internaut.nyc3.cdn.digitaloceanspaces.com/colegiocuernavaca.edu.mx/bandera.jpg" alt="App screenshot" width="1824" height="1080" />
          </div>
        </div>
      </div>
    </div>
  )
}