import Image from '../image/Image'
import Link from '../link/Link'
import Text from '../text/Text'

export interface Props {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  cta1: boolean;
  cta2: boolean;
  ctaText1?: string;
  ctaText2?: string;
  ctaLink1?: string;
  ctaLink2?: string;
  edit: boolean;
  reference: any;
}

export default function HerbertBlock(props: Props) {
  return (
    <>
      <div className="mt-24 sm:mt-32 w-complete sm:w-complete-sm mx-auto">
        <div className="flex flex-col md:grid grid-cols-2 gap-8 md:gap-28 items-center">
          <Image
            className="w-full h-10bg-blue-500 rounded-2xl aspect-[7/5] object-cover"
            src={props.image1}
            edit={props.edit}
            name={props.reference.image1}
          />
          <div className="w-full">
            <Text edit={props.edit} name={props.reference.title1} className="w-full sm:text-4xl text-2xl tracking-tight font-bold font-font2 text-title">{props.title1}</Text>
            <Text edit={props.edit} name={props.reference.description1} className="w-full mt-5 tracking-[-0.15px] text-text">{props.description1}</Text>
            {props.cta1 && (
              <Link
                href={props.ctaLink1!}
                textName={props.reference.ctaText1}
                linkName={props.reference.ctaLink1}
                edit={props.edit}
                className="mt-8 inline-block px-8 py-2 rounded-md bg-color1 text-bg1 font-semibold font-font2 hover:bg-color1hover"
              >
                {props.ctaText1}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-24 w-complete sm:w-complete-sm mx-auto">
        <div className="flex flex-col md:grid grid-cols-2 gap-8 md:gap-28 items-center">
          <Image
            className="md:order-2 w-full h-10bg-blue-500 rounded-2xl  aspect-[7/5] object-cover"
            edit={props.edit}
            name={props.reference.image2}
            src={props.image2}
          />
          <div className="w-full md:order-1">
            <Text edit={props.edit} name={props.reference.title2} className="w-full md:text-right text-2xl sm:text-4xl tracking-tight font-bold font-font2">{props.title2}</Text>
            <Text edit={props.edit} name={props.reference.description2} className="w-full md:text-right mt-5 tracking-[-0.15px]">{props.description2}</Text>
            {props.cta2 && (
              <Link
                href={props.ctaLink2!}
                textName={props.reference.ctaText2}
                linkName={props.reference.ctaLink2}
                edit={props.edit}
                className="md:float-right mt-8 inline-block px-8 py-2 rounded-md bg-color1 text-bg1 font-semibold font-font2 hover:bg-color1hover"
              >
                {props.ctaText2}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}