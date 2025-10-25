import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
export default function MatsuyamaHeader( props: { spacer: boolean } ) {
  return (
    <>
    <header className="w-[calc(100%-24px)] sm:w-[calc(100%-48px)] ml-[12px] sm:ml-[24px] px-4 sm:px-5 py-3 sm:py-4 shadow-xs mx-4 fixed z-20 rounded-md bg-white mt-4 flex items-center justify-between">
      <Image className="h-8 sm:h-10 w-auto" src="https://internaut.nyc3.cdn.digitaloceanspaces.com/thirdsquarecapital.com/Group%201%20(1).png" alt="Third Square Capital" width={500} height={500} />
      <Button asChild>
        <Link href="mailto:info@thirdsquarecapital.com">Contact Us</Link>
      </Button>
    </header>
    {props.spacer && <div className="h-24" />}
    </>
  );
}
