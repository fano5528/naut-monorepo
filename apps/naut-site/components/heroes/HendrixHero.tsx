import Text from "../text/Text";

interface Props {
  title: string;
  description: string;
  edit: boolean;
  reference: any;
}

export default function HendrixHero(props: Props) {
  return (
    <div className="mt-16 bg-color1 px-6 py-24 sm:py-32 lg:px-8 rounded-xl w-complete sm:w-complete-sm mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <Text
          edit={props.edit}
          name={props.reference.title}
          className="w-full text-xl xs:text-4xl font-bold tracking-tight text-bg1 sm:text-6xl font-font2 text-center"
        >
          {props.title}
        </Text>
        <Text
          edit={props.edit}
          name={props.reference.description}
          className="w-full mt-6 text-lg leading-8 text-bg2 text-center mx-auto"
        >
          {props.description}
        </Text>
      </div>
    </div>
  );
}
