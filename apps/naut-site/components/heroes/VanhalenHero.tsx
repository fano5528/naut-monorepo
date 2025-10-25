"use client";

import Link from "../link/Link";
import Image from "../image/Image";
import Text from "../text/Text";
import RichText from "../text/RichText";
import IconLink from "../link/IconLink";
import { motion } from "framer-motion";

interface Props {
  icon: string;
  hasTopInfo: boolean;
  topInfoTag: string;
  topInfoText: string;
  topInfoLink: string;
  text: string;
  content: {
    name: string;
    description: string;
    icon: string;
  }[];
  isCta1: boolean;
  cta1Text: string;
  cta1Link: string;
  isCta2: boolean;
  cta2Text: string;
  cta2Link: string;
  image: string;
  edit: boolean;
  reference: any;
}

export default function VanhalenHero(props: Props) {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-linear-to-b from-color1/20">
        <style jsx global>{`
  .rich-text-container {
    color: hsl(var(--text));
    font-size: 1rem;
    line-height: 1.6;
  }

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

  .rich-text-container p {
    margin: 1.6rem 0;
    line-height: 1.8;
  }

  .rich-text-container ul,
  .rich-text-container ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .rich-text-container li {
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  .rich-text-container ul { list-style-type: disc; }
  .rich-text-container ul ul { list-style-type: circle; }
  .rich-text-container ul ul ul { list-style-type: square; }

  .rich-text-container ol { list-style-type: decimal; }
  .rich-text-container ol ol { list-style-type: lower-alpha; }
  .rich-text-container ol ol ol { list-style-type: lower-roman; }

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

  .rich-text-container img {
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
  }

  .rich-text-container strong { font-weight: 600; }
  .rich-text-container em { font-style: italic; }

  .rich-text-container blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid hsl(var(--color2));
    background: hsl(var(--background2));
    font-style: italic;
  }

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
  .rich-text-container code { padding: 0.2rem 0.4rem; }
        `}</style>
        <div className="mx-auto max-w-7xl pb-20 pt-10 sm:pb-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-28">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="transition-none"
                >
                  <Image
                    className="h-11 w-auto"
                    name={props.reference.icon}
                    edit={props.edit}
                    src={props.icon}
                  />
                </motion.div>
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  {props.hasTopInfo ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="transition-none"
                    >
                      <div className="mt-24 sm:mt-32 lg:mt-16">
                        <div className="inline-flex space-x-6">
                          <Text
                            edit={props.edit}
                            name={props.reference.topInfoTag}
                            className="h-8 rounded-full bg-color1/10! px-3 py-1 text-sm font-semibold leading-6 text-color1 ring-1 ring-inset ring-color1/20"
                          >
                            {props.topInfoTag}
                          </Text>
                          <IconLink
                            icon="chevron-right"
                            textName={props.reference.topInfoName}
                            linkName={props.reference.topInfoLink}
                            edit={props.edit}
                            href={props.topInfoLink!}
                            className="hover:translate-x-1 inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-400"
                          >
                            {props.topInfoText}
                          </IconLink>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="transition-none"
                >
                  <div className="mt-10">
                    <RichText
                      edit={props.edit}
                      name={props.reference.text ?? props.reference.description}
                      content={props.text ?? ""}
                    />
                  </div>
                </motion.div>
                {props.content?.length ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="transition-none"
                  >
                    <dl className="mt-10 max-w-xl space-y-4 text-base leading-7 text-text lg:max-w-none">
                      {props.content.map((feature, index) => (
                        <motion.div
                          key={feature.description}
                          initial={{ opacity: 0, y: 10, scale: 0.99 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ amount: 0.9, once: true }}
                          className="transition-none"
                        >
                          {props.edit && (
                            <input
                              type="hidden"
                              name={`array_${props.reference.content}.${index}-icon`}
                              value={feature.icon}
                            />
                          )}
                          <div className="relative pl-9">
                            <dt className="inline font-semibold text-title">
                              <i
                                className={`fa-solid fa-${feature.icon} absolute left-1 top-1 size-5 text-color2`}
                              />
                              <Text
                                edit={props.edit}
                                name={`array_${props.reference.content}.${index}-name`}
                                className="inline mr-1"
                              >
                                {feature.name}
                              </Text>
                            </dt>{" "}
                            <Text
                              edit={props.edit}
                              name={`array_${props.reference.content}.${index}-description`}
                              className="inline w-full"
                            >
                              {feature.description}
                            </Text>
                          </div>
                        </motion.div>
                      ))}
                    </dl>
                  </motion.div>
                ) : null}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="transition-none"
                >
                  <div className="mt-10 flex items-center gap-x-6">
                    {props.isCta1 ? (
                      <Link
                        href={props.cta1Link!}
                        edit={props.edit}
                        textName={props.reference.cta1Text}
                        linkName={props.reference.cta1Link}
                        className="rounded-md bg-color1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-color1/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color1"
                      >
                        {props.cta1Text}
                      </Link>
                    ) : null}
                    {props.isCta2 ? (
                      <Link
                        href={props.cta2Link!}
                        edit={props.edit}
                        textName={props.reference.cta2Text}
                        linkName={props.reference.cta2Link}
                        className="text-sm font-semibold leading-6 text-title hover:translate-x-1"
                      >
                        {props.cta2Text}
                      </Link>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-bg1 shadow-xl shadow-indigo-600/10 ring-1 ring-color1/30 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-color1 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-neutral-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative p-10">
                  <Image
                    edit={props.edit}
                    name={props.reference.image}
                    src={props.image}
                    className="rounded-2xl"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-bg1 sm:h-32" />
      </div>
    </div>
  );
}
