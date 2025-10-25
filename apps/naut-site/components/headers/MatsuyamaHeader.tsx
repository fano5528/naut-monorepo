import Image from "next/image";
import { Button } from "../ui/button";
import Headerlink from "../headerlink/Headerlink";
interface Props {
  spacer: boolean;
  logo: string;
  rightMenu: { name: string; href: string; isCta: boolean }[];
  edit: boolean;
}

export default function MatsuyamaHeader(props: Props) {
  return (
    <>
      <header className="w-[calc(100%-24px)] sm:w-complete ml-[12px] sm:ml-[24px] px-4 sm:px-5 py-3 sm:py-4 shadow-2xs mx-4 fixed z-20 rounded-md bg-white mt-4 flex items-center justify-between">
        <Image className="h-7 sm:h-10 w-auto" src={props.logo} alt="Third Square Capital" width={500} height={500} />
        <div className="flex gap-2 sm:gap-4">
        {props.rightMenu.map((item) => (
          <Button asChild key={item.name} variant={item.isCta ? "default" : "ghost"} className="text-xs px-3 h-9 sm:px-4 sm:py-2 sm:h-10 sm:text-sm">
            <Headerlink edit={props.edit} href={item.href}>{item.name}</Headerlink>
          </Button>
        ))}
        </div>
      </header>
      {props.spacer && <div className="h-24" />}
    </>
  );
}