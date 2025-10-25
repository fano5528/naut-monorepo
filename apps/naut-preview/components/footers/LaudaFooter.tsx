import Link from "next/link";
import Image from "next/image";

const social = [
  {
    name: "facebook",
    href: "https://www.facebook.com/ColegioCuernavaca/"
  },
  {
    name: "youtube",
    href: "https://www.youtube.com/user/ColegioCuernavaca"
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/colegiocuernavaca/"
  },
  {
    name: "tiktok",
    href: "https://www.tiktok.com/@colegiocuernavaca"
  }
];

const icons: any = {
  facebook: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  ),
  instagram: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  youtube: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  tiktok: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M16 1H12.5V16.5C12.5 18 11 19.5 9.5 19.5C8 19.5 6.5 19 6.5 16.5C6.5 14.5 8.39888 13.1614 10 13.5V10C3.88087 10 3 15 3 16.5C3 18 3.977 23 9.5 23C14.0224 23 16 19.5 16 17V8C17.1465 9.0179 18.9222 9.35727 21 9.5V6C17.983 6 16 3.34635 16 1Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export default function LaudaFooter() {
  return (
    <footer className="mt-24 sm:mt-32 bg-footer/20 text-color1 border-t border-color1/10">
      <div className="mx-auto max-w-7xl px-8 pt-12 md:pt-16 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          {/* Logo Column */}
          <div>
            <Image
              src="https://internaut.nyc3.cdn.digitaloceanspaces.com/colegiocuernavaca.edu.mx/nuevopng.png"
              alt="Logo"
              width={500}
              height={500}
              className="h-10 w-auto"
            />
          </div>

          {/* Menu Columns */}
          <div className="flex gap-16 flex-col sm:flex-row">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold leading-6">Visítanos</h3>
              <Link 
                href="https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=mx&sa=X&geocode=KT3LsuRd4c2FMbwIixFTt-8V&daddr=Laurel+101,+Rancho+Cortes,+62130+Cuernavaca,+Mor." 
                target="_blank"
                className="text-sm leading-6 text-color1/70 hover:text-color1 block"
              >
                Laurel #101, Col.<br/>
                Rancho Cortés<br/>
                Cuernavaca, Morelos
              </Link>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold leading-6">Llámanos</h3>
              <ul role="list" className="space-y-2">
                <li>
                  <Link href="tel:7773133282" className="text-sm leading-6 text-color1/70 hover:text-color1">
                  777.313.32.82
                  </Link>
                </li>
                <li>
                  <Link href="tel:7773179787" className="text-sm leading-6 text-color1/70 hover:text-color1">
                  777.317.97.87
                  </Link>
                </li>
                <li>
                  <Link href="tel:7774180550" className="text-sm leading-6 text-color1/70 hover:text-color1">
                  777.418.05.50
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold leading-6">Escríbenos</h3>
              <ul role="list" className="space-y-2">
                <li>
                  <Link href="mailto:info@colegiocuernavaca.edu.mx" className="text-sm leading-6 text-color1/70 hover:text-color1">
                    info@colegiocuernavaca.edu.mx
                  </Link>
                </li>
                <li>
                  <Link href="mailto:admisiones@colegiocuernavaca.edu.mx" className="text-sm leading-6 text-color1/70 hover:text-color1">
                    pr@colegiocuernavaca.edu.mx
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Social Icons */}
        <div className="mt-16 py-8 border-t border-color1/10">
          <div className="flex gap-6 justify-end">
            {social.map((item) => {
              const Icon = icons[item.name];
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-color1/70 hover:text-color1 duration-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-6 w-6 duration-0" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}