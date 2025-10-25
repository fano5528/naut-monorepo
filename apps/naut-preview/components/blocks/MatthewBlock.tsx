"use client";

import Image from "../image/Image";
import Text from "../text/Text";

export interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  image: string;
}

export default function MatthewBlock(props: Props) {
  return (
    <div className="relative overflow-hidden">
      <Image
        edit={props.edit}
        name={props.reference.image}
        src={props.image}
        className="!absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="mx-auto max-w-7xl px-6 pt-56 mb-24 sm:pt-80 sm:pb-36">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-x-16 gap-y-8">
          <div className="lg:w-1/2">
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-font2 w-full z-[5] isolate"
            >
              {props.title}
            </Text>
          </div>
          <div className="lg:w-1/2">
            <Text
              edit={props.edit}
              name={props.reference.description}
              className="text-lg leading-8 text-gray-300 w-full z-[5] isolate"
            >
              {props.description}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}