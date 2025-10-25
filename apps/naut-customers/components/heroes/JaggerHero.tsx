"use client";

import Image from "../image/Image";
import Link from "../link/Link";
import IconLink from "../link/IconLink";
import RichText from "../text/RichText";
import { motion } from "framer-motion";

export default function JaggerHero(props: {
  content: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  cta1Text?: string;
  cta1Link?: string;
  cta1Icon?: string;
  cta1Color?: string;
  cta2Text?: string;
  cta2Link?: string;
  cta2Icon?: string;
  edit: boolean;
  reference: any;
}) {
  return (
    <>
    <style jsx global>{`
  .rich-text-container {
    /* Base text styles */
    color: hsl(var(--text));
    font-size: 1rem;
    line-height: 1.6;
  }

  /* Headers */
  .rich-text-container h1 {
    font-size: 2.75rem;
    font-weight: 700;
    margin: 0rem 0 1.5rem;
    color: hsl(var(--primary));
    font-family: var(--font-font2);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .rich-text-container h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 2rem 0 1.25rem;
    color: hsl(var(--color2));
    font-family: var(--font-font2);
  }

  .rich-text-container h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 1.75rem 0 1rem;
    color: hsl(var(--color2));
    font-family: var(--font-font2);
  }

  .rich-text-container h4 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
    color: hsl(var(--color2));
  }

  .rich-text-container h5 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.25rem 0 0rem;
    color: hsl(var(--color2));
  }

  .rich-text-container h6 {
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0 0rem;
    color: hsl(var(--color2));
  }

  @media (max-width: 768px) {
    .rich-text-container h1 {
      font-size: 2rem;
    }
    .rich-text-container h2 {
      font-size: 1.5rem;
    }
    .rich-text-container h3 {
      font-size: 1.25rem;
    }
    
  }

  /* Paragraphs and spacing */
  .rich-text-container p {
    margin: 1.6rem 0;
    line-height: 1.8;
  }

  /* Lists */
  .rich-text-container ul,
  .rich-text-container ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .rich-text-container li {
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  .rich-text-container ul {
    list-style-type: disc;
  }

  .rich-text-container ul ul {
    list-style-type: circle;
  }

  .rich-text-container ul ul ul {
    list-style-type: square;
  }

  .rich-text-container ol {
    list-style-type: decimal;
  }

  .rich-text-container ol ol {
    list-style-type: lower-alpha;
  }

  .rich-text-container ol ol ol {
    list-style-type: lower-roman;
  }

  /* Links */
  .rich-text-container a {
    color: hsl(var(--primary));
    text-decoration: none;
    transition: all 0.2s ease;
    border-bottom: 1px solid currentColor;
  }

  .rich-text-container a:hover {
    color: hsl(var(--primary) / 0.7);
    border-bottom-color: currentColor;
  }

  /* Images */
  .rich-text-container img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
  }

  /* Strong and emphasis */
  .rich-text-container strong {
    font-weight: 600;
  }

  .rich-text-container em {
    font-style: italic;
  }

  /* Blockquotes */
  .rich-text-container blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid hsl(var(--color2));
    background: hsl(var(--background2));
    font-style: italic;
  }

  /* Code blocks */
  .rich-text-container pre,
  .rich-text-container code {
    background: hsl(var(--background2));
    border-radius: 0.25rem;
    font-family: monospace;
  }

  .rich-text-container pre {
    padding: 1rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .rich-text-container code {
    padding: 0.2rem 0.4rem;
  }
`}</style>
    <div className="relative">
      <svg
        className=" absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-bg2 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs className="-z-10">
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-bg2">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          className="-z-10"
        />
      </svg>
      <div className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-color2 to-color2 opacity-30"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-20 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl lg:-mt-36">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0 }}
                className="transition-none"
              >
                <RichText
                  edit={props.edit}
                  name={props.reference.content}
                  content={props.content}
                />
              </motion.div>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 }}
                className="transition-none mt-10 flex items-center gap-x-6"
              >
                {props.cta1Text && props.cta1Icon ? (
                  props.cta1Color ? (
                    <div 
                      className="relative group inline-block rounded-md"
                      style={{ backgroundColor: props.cta1Color }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 transition-opacity duration-200" />
                      <IconLink
                        href={props.cta1Link!}
                        linkName={props.reference.cta1Link}
                        edit={props.edit}
                        textName={props.reference.cta1Text}
                        icon={props.cta1Icon}
                        className="px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1 relative z-10 block"
                        iconFirst
                      >
                        {props.cta1Text}
                      </IconLink>
                    </div>
                  ) : (
                    <IconLink
                      href={props.cta1Link!}
                      linkName={props.reference.cta1Link}
                      edit={props.edit}
                      textName={props.reference.cta1Text}
                      icon={props.cta1Icon}
                      className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-color1 hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                      iconFirst
                    >
                      {props.cta1Text}
                    </IconLink>
                  )
                ) : props.cta1Text && (
                  props.cta1Color ? (
                    <div 
                      className="relative group inline-block rounded-md"
                      style={{ backgroundColor: props.cta1Color }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 transition-opacity duration-200" />
                      <Link
                        href={props.cta1Link!}
                        linkName={props.reference.cta1Link}
                        edit={props.edit}
                        textName={props.reference.cta1Text}
                        className="px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1 relative z-10 block"
                      >
                        {props.cta1Text}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={props.cta1Link!}
                      linkName={props.reference.cta1Link}
                      edit={props.edit}
                      textName={props.reference.cta1Text}
                      className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-color1 hover:bg-color1hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                    >
                      {props.cta1Text}
                    </Link>
                  )
                )}
                {props.cta2Text && props.cta2Icon ? (
                  <IconLink
                    edit={props.edit}
                    textName={props.reference.cta2Text}
                    linkName={props.reference.cta2Link}
                    href={props.cta2Link!}
                    icon={props.cta2Icon}
                    className="text-sm font-semibold leading-6 text-title hover:translate-x-1"
                    iconFirst
                  >
                    {props.cta2Text}
                  </IconLink>
                ) : props.cta2Text && (
                  <Link
                    edit={props.edit}
                    textName={props.reference.cta2Text}
                    linkName={props.reference.cta2Link}
                    href={props.cta2Link!}
                    className="text-sm font-semibold leading-6 text-title hover:translate-x-1"
                  >
                    {props.cta2Text!}
                  </Link>
                )}
              </motion.div>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-0 lg:order-last xl:order-none xl:pt-32">
                <motion.div 
                  className="relative"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 }}
                >
                  <Image
                    edit={props.edit}
                    name={props.reference.image1}
                    src={props.image1}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </motion.div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-0 sm:-mt-12 lg:pt-24">
                <motion.div 
                  className="relative"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 }}
                >
                  <Image
                    src={props.image2}
                    edit={props.edit}
                    name={props.reference.image2}
                    className="aspect-[2/3] sm:aspect-[5/6] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </motion.div>
                <motion.div 
                  className="relative"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image
                    src={props.image3}
                    edit={props.edit}
                    name={props.reference.image3}
                    className="aspect-[2/3] sm:aspect-[5/6] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </motion.div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <motion.div 
                  className="relative"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.25 }}
                >
                  <Image
                    src={props.image4}
                    edit={props.edit}
                    name={props.reference.image4}
                    className="aspect-[2/3] sm:aspect-[7/8] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </motion.div>
                <motion.div 
                  className="relative"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 }}
                >
                  <Image
                    src={props.image5}
                    edit={props.edit}
                    name={props.reference.image5}
                    className="aspect-[2/3] sm:aspect-[7/8] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
