"use client";

import Text from "../text/Text";
import Image from "../image/Image";
import RichText from "../text/RichText";
import { motion } from "framer-motion";

export interface Props {
  cutImage: boolean;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  content: { 
    name: string; 
    description: string; 
    icon: string 
  }[];
  textOnLeft: boolean;
  edit: boolean;
  reference: any;
}

export default function LuBlock(props: Props) {
  const textOnLeft = props.textOnLeft;


  if (textOnLeft) {
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
      <div className="overflow-hidden mt-12 sm:mt-24 z-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.subtitle}
                  className="text-base font-semibold leading-7 text-color2 w-full"
                >
                  {props.subtitle}
                </Text>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.title}
                  className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl w-full font-font2"
                >
                  {props.title}
                </Text>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <Text
                  edit={props.edit}
                  name={props.reference.description}
                  className="mt-6 text-lg leading-8 text-text w-full"
                >
                  {props.description}
                </Text>
              </motion.div>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-text lg:max-w-none">
                {props.content.map((feature, index) => (
                  <motion.div
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    viewport={{ amount: 0.9, once: true }}
                    className="transition-none"
                    key={feature.name}
                  >
                    {props.edit && <input type="hidden" name={`array_${props.reference.content}.${index}-icon`} value={feature.icon} />}
                    <div key={feature.name} className="relative pl-9">
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
            </div>
          </div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            viewport={{ amount: 0.6, once: true }}
            className="transition-none"
          >
            <Image
              src={props.image}
              edit={props.edit}
              name={props.reference.image}
              className={`object-cover w-[95vw] md:w-auto md:h-[600px] ${
                props.cutImage ? "aspect-[5/4]" : ""
              } max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 bg-bg2`}
            />
          </motion.div>
        </div>
      </div>
    </div>
    </>
    );
  } else {
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
      <div className="overflow-hidden mt-12 sm:mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4 lg:order-2">
            <div className="lg:max-w-lg">
              <motion.div
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.9, once: true }}
                className="transition-none"
              >
                <RichText
                  edit={props.edit}
                  name={props.reference.description}
                  content={props.description}
                />
              </motion.div>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-text lg:max-w-none">
                {props.content.map((feature, index) => (
                  <motion.div
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    initial={{ opacity: 0, y: 10, scale: 0.99 }}
                    viewport={{ amount: 0.9, once: true }}
                    className="transition-none"
                    key={feature.name}
                  >
                    {props.edit && <input type="hidden" name={`array_${props.reference.content}.${index}-icon`} value={feature.icon} />}
                    <div key={feature.name} className="relative pl-9">
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
            </div>
          </div>
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            viewport={{ amount: 0.3, once: true }}
            className="transition-none flex justify-end"
          >
            <Image
              src={props.image}
              edit={props.edit}
              name={props.reference.image}
              className={`object-cover w-[95vw] md:w-auto md:h-[600px] ${
                props.cutImage ? "aspect-[5/4]" : ""
              } max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 bg-bg2 lg:order-1`}
            />
          </motion.div>
        </div>
      </div>
    </div>
    </>
    )
  }
}
