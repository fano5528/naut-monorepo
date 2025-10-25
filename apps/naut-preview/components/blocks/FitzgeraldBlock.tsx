import Text from "../text/Text"

export interface Props {
  edit: boolean;
  reference: any;
  unhighlightedTitle: string;
  highlightedTitle: string;
  description: string;
}

export default function FitzgeraldBlock(props: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-24 sm:mt-32">
    <div className="text-center">
      <Text
        name={props.reference.unhighlightedTitle}
        edit={props.edit}
        className="text-2xl sm:text-5xl tracking-tight font-bold font-font2 text-title inline text-center"
      >
        {props.unhighlightedTitle}
      </Text>
      {"  "}
      <Text
        name={props.reference.highlightedTitle}
        edit={props.edit}
        className="text-2xl sm:text-5xl tracking-tight font-bold text-color1 inline text-center ml-1"
      >
        {props.highlightedTitle}
      </Text>
    </div>
    <Text
      name={props.reference.description}
      edit={props.edit}
      className="mt-5 tracking-[-0.15px] text-text w-full text-lg text-center"
    >
      {props.description}
    </Text>
    </div>
  )
}