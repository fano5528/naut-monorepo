import Text from "../text/Text";
import Image from "../image/Image";

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  description: string;
  content: { image: string }[];
}

export default function AchebeBlock(props: Props) {
  return (
    <div>
      <div className="max-w-4xl block relative mx-auto">
        <Text
          name={props.reference.title}
          edit={props.edit}
          className="relative block mx-auto w-full max-w-[90vw] mt-24 sm:mt-32 text-3xl font-bold tracking-tight text-title sm:text-4xl text-center"
        >
          {props.title}
        </Text>
        <Text
          name={props.reference.description}
          edit={props.edit}
          className="relative block mx-auto w-full max-w-[90vw] mt-3 text-base leading-7 text-text sm:mt-4 text-center"
        >
          {props.description}
        </Text>
      </div>
      <div className="relative grid grid-cols-1 gap-8 mt-10 sm:mt-12 sm:grid-cols-2 w-[90vw] max-w-6xl mx-auto">
        {props.content.map((feature: any, index) => (
          <Image
            key={index}
            name={`array_${props.reference.content}.${index}-image`}
            edit={props.edit}
            className="w-full rounded-md sm:rounded-lg aspect-7/5 object-cover"
            src={feature.image}
          />
        ))}
      </div>
    </div>
  );
}
