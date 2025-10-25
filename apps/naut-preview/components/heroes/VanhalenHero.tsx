import Link from "../link/Link";
import Image from "../image/Image";
import Text from "../text/Text";
import IconLink from "../link/IconLink";

export default function VanhalenHero(props: {
  reference: any;
  edit: boolean;
  icon: string;
  hasTopInfo: boolean;
  topInfoTag?: string;
  topInfoText?: string;
  topInfoLink?: string;
  title: string;
  description: string;
  isCta1: boolean;
  cta1Text?: string;
  cta1Link?: string;
  isCta2: boolean;
  cta2Text?: string;
  cta2Link?: string;
  image: string;
}) {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-color1/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <Image
                  className="h-11 w-auto"
                  name={props.reference.icon}
                  edit={props.edit}
                  src={props.icon}
                />
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  {props.hasTopInfo ? (
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                      <div className="inline-flex space-x-6">
                        <Text
                          edit={props.edit}
                          name={props.reference.topInfoTag}
                          className="h-8 rounded-full !bg-color1/10 px-3 py-1 text-sm font-semibold leading-6 text-color1 ring-1 ring-inset ring-color1/20"
                        >
                          {props.topInfoTag}
                        </Text>
                        <IconLink
                          icon="chevron-right"
                          textName={props.reference.topInfoName}
                          linkName={props.reference.topInfoLink}
                          edit={props.edit}
                          href={props.topInfoLink!}
                          className="hover:translate-x-1 inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-400"
                        >
                          {props.topInfoText}
                        </IconLink>
                      </div>
                    </div>
                  ) : null}
                </div>
                <Text
                  edit={props.edit}
                  name={props.reference.title}
                  className="mt-10 text-4xl font-bold tracking-tight text-title sm:text-6xl"
                >
                  {props.title}
                </Text>
                <Text
                  edit={props.edit}
                  name={props.reference.description}
                  className="mt-6 text-lg leading-8 text-text"
                >
                  {props.description}
                </Text>
                <div className="mt-10 flex items-center gap-x-6">
                  {props.isCta1 ? (
                    <Link
                      href={props.cta1Link!}
                      edit={props.edit}
                      textName={props.reference.cta1Text}
                      linkName={props.reference.cta1Link}
                      className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                    >
                      {props.cta1Text}
                    </Link>
                  ) : null}
                  {props.isCta2 ? (
                    <Link
                      href={props.cta2Link!}
                      edit={props.edit}
                      textName={props.reference.cta2Text}
                      linkName={props.reference.cta2Link}
                      className="text-sm font-semibold leading-6 text-title hover:translate-x-1"
                    >
                      {props.cta2Text}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-bg1 shadow-xl shadow-indigo-600/10 ring-1 ring-color1/30 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-color1 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-neutral-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative p-10">
                  <Image
                    edit={props.edit}
                    name={props.reference.image}
                    src={props.image}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-bg1 sm:h-32" />
      </div>
    </div>
  );
}
