"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Text from "../text/Text";
import LoadingLink from "../link/LoadingLink";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  description: string;
  frequencies: {
    value: string;
    label: string;
    priceSuffix: string;
  }[];
  tiers: {
    name: string;
    id: string;
    href: string;
    price: any;
    description: string;
    features: string[];
    mostPopular: boolean;
  }[];
}

export default function DoyleBlock(props: Props) {
  const [frequency, setFrequency] = useState(props.frequencies[0]);

  return (
    <div className="mt-24 sm:mt-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Text
            edit={props.edit}
            name={props.reference.subtitle}
            className="text-base font-semibold leading-7 text-color1"
          >
            {props.subtitle}
          </Text>
          <Text
            edit={props.edit}
            name={props.reference.title}
            className="mt-2 text-4xl font-bold tracking-tight text-title sm:text-5xl"
          >
            {props.title}
          </Text>
        </div>
        <Text
          edit={props.edit}
          name={props.reference.description}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-text"
        >
          {props.description}
        </Text>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-text"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {props.frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? "bg-color1 text-white" : "text-text/80",
                    "cursor-pointer rounded-full px-2.5 py-1"
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-auto lg:max-w-5xl lg:grid-cols-2 w-full">
          {props.tiers.map((tier: any) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "ring-2 ring-color1"
                  : "ring-1 ring-footertext",
                "rounded-3xl p-8 xl:p-10"
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? "text-color2" : "text-title",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-color1/10 px-2.5 py-1 text-xs font-semibold leading-5 text-color1">
                    Oferta
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-text">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-title">
                  {tier.price[frequency.value]}
                </span>
                {tier.id === "anual" ? (
                  <span className="text-sm font-semibold leading-6 text-text">
                    /año
                  </span>
                ) : (
                  <span className="text-sm font-semibold leading-6 text-text">
                    /mes
                  </span>
                )}
              </p>
              <LoadingLink
                href={tier.href}
                edit={props.edit}
                linkName="nada"
                textName="nada"       
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-color1 text-white shadow-xs hover:bg-color1hover"
                    : "text-color1 hover:text-color1hover ring-1 ring-inset ring-color1 hover:ring-color1hover",
                  "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                )}
              >
                ¡Comenzar!
              </LoadingLink>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-text xl:mt-10"
              >
                {tier.features.map((feature: any) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-color1"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
