import Text from "../text/Text";
import Image from "../image/Image";

interface Props {
  title: string;
  image: string;
  edit: boolean;
  reference: any;
}

export default function LennonHero(props: Props) {
  return (
    <div className="mx-auto mt-24 sm:mt-32 w-complete sm:w-complete-sm">
      <Text
        name={props.reference.title}
        edit={props.edit}
        className="text-2xl font-medium tracking-tight sm:leading-normal text-title sm:text-5xl w-[70%] mx-0"
      >
        {props.title}
      </Text>
      <Image
        src={props.image}
        name={props.reference.image}
        edit={props.edit}
        className="rounded-xl shadow-2xl w-full h-[550px] object-cover mt-8"
      />
    </div>
  );
}
