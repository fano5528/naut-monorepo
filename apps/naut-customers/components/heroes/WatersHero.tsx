"use client";

import Image from "../image/Image";
import Link from "../link/Link";
import Text from "../text/Text";

export default function WatersHero(props: {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
  isCta1: boolean;
  isCta2: boolean;
  isBanner: boolean;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  bannerText?: string;
  bannerCtaText?: string;
  bannerCtaLink?: string;
  isLight?: boolean;
}) {

  return (
    <div>
      <div
        className={`relative isolate overflow-hidden sm:pt-14 ${
          props.isLight ? "bg-neutral-900" : ""
        }`}
      >
        <Image
          edit={props.edit}
          name={props.reference.image}
          src={props.image}
          className="absolute inset-0 -z-10 h-[100vh] w-full object-cover opacity-30"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-color1 to-color1 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-[30vh] sm:py-48 lg:py-64">
          {props.isBanner ? (
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                {props.bannerText}
                <Link
                  edit={props.edit}
                  linkName={props.reference.bannerCtaLink}
                  textName={props.reference.bannerCtaText}
                  href={props.bannerCtaLink!}
                  className="ml-2 font-semibold text-white"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  {props.bannerCtaText}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="text-center">
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-font2 text-center w-full max-w-[90vw] block relative mx-auto"
            >
              {props.title}
            </Text>
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="mt-6 text-lg leading-8 text-gray-300 w-full text-cener  max-w-[90vw] block relative mx-auto"
            >
              {props.description}
            </Text>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {props.isCta1 ? (
                <Link
                  href={props.cta1Link!}
                  edit={props.edit}
                  linkName={props.reference.cta1Link}
                  textName={props.reference.cta1Text}
                  className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                >
                  {props.cta1Text}
                </Link>
              ) : (
                ""
              )}
              {props.isCta2 ? (
                <Link
                  href={props.cta2Link!}
                  edit={props.edit}
                  linkName={props.reference.cta2Link}
                  textName={props.reference.cta2Text}
                  className="text-sm font-semibold leading-6 text-white hover:translate-x-1"
                >
                  {props.cta2Text}
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-color1 to-color1 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div className="relative" aria-hidden="true">
        <div
          className={`${
            props.isLight
              ? ""
              : "absolute left-0 inset-x-0 bottom-0 bg-gradient-to-t pt-[13%] from-bg1"
          }`}
        />
      </div>
    </div>
  );
}
