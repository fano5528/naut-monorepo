"use client";

import Image from "../image/Image";
import RichText from "../text/RichText";

interface Props {
  edit: boolean;
  reference: any;
  content: {
    image: string;
    description: string;
  }[];
}

export default function SertillangesBlock(props: Props) {
  return (
    <div className="bg-color1 grid grid-cols-1 md:grid-cols-2 py-16 sm:px-24 w-full mt-6 sm:mt-12 gap-8">
      <style jsx global>{`
        .white-rich-text .rich-text-container,
        .white-rich-text .rich-text-container h1,
        .white-rich-text .rich-text-container h2,
        .white-rich-text .rich-text-container h3,
        .white-rich-text .rich-text-container h4,
        .white-rich-text .rich-text-container h5,
        .white-rich-text .rich-text-container h6,
        .white-rich-text .rich-text-container p,
        .white-rich-text .rich-text-container li,
        .white-rich-text .rich-text-container a,
        .white-rich-text .rich-text-container strong,
        .white-rich-text .rich-text-container em {
          color: #ffffff !important;
        }
        .white-rich-text .rich-text-container a {
          border-bottom-color: #ffffff !important;
        }
      `}</style>
      {props.content.map((item, index) => (
      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <Image
          edit={props.edit}
          name={`array_${props.reference.content}.${index}-image`}
          className="h-36 object-contain object-center"
          src={item.image}
        />
        <div className="mt-2 w-full block white-rich-text">
          <RichText
            edit={props.edit}
            name={`array_${props.reference.content}.${index}-description`}
            content={item.description}
          />
        </div>
      </div>
      ))}
    </div>
  );
}