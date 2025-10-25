"use client";

import Text from "../text/Text";
import Image from "../image/Image";
import RichText from "../text/RichText";
import { motion } from "framer-motion";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  edit: boolean;
  reference: any;
  subtitle: string;
  title: string;
  mainTestimonialBody: string;
  mainTestimonialName: string;
  mainTestimonialImage: string;
  mainTestimonialLogo: string;
  testimonials1: { body: string; name: string; image: string }[];
  testimonials2: { body: string; name: string; image: string }[];
  testimonials3: { body: string; name: string; image: string }[];
  testimonials4: { body: string; name: string; image: string }[];
}

export default function AsimovBlock(props: Props) {
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
      <div className="relative isolate pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-linear-to-tr from-color2 to-color2"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-1313/771 w-328.25 flex-none origin-top-right rotate-30 bg-linear-to-tr from-color2 to-color2 xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.subtitle}
              className="text-lg font-semibold leading-8 tracking-tight text-color2 text-center"
            >
              {props.subtitle}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ amount: 0.9, once: true }}
            className="transition-none"
          >
            <Text
              edit={props.edit}
              name={props.reference.title}
              className="mt-2 text-3xl font-bold tracking-tight text-title sm:text-4xl text-center"
            >
              {props.title}
            </Text>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-title sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <motion.figure initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.2}} viewport={{amount: 0.9, once: true}} className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-bg1/70 bg-blur backdrop-blur-lg sm:shadow-lg sm:ring-1 sm:ring-text/5 xl:col-start-2 xl:row-end-1 transition-none">
            <blockquote className="px-10 py-2 tracking-tight text-gray-900 text-[1.2rem] leading-8 sm:text-[1.35rem] sm:leading-9">
              <RichText
                edit={props.edit}
                name={props.reference.mainTestimonialBody}
                content={props.mainTestimonialBody}
                className="text-[1.2rem] leading-8 sm:text-[1.35rem] sm:leading-9"
              />
            </blockquote>
            <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
              <Image
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={props.mainTestimonialImage}
                edit={props.edit}
                name={props.reference.mainTestimonialImage}
              />
              <div className="flex-auto">
                <Text
                  edit={props.edit}
                  name={props.reference.mainTestimonialName}
                  className="font-semibold"
                >
                  {props.mainTestimonialName}
                </Text>
              </div>
              {props.mainTestimonialLogo && (
              <Image
                className="h-6 w-auto flex-none"
                src={props.mainTestimonialLogo}
                edit={props.edit}
                name={props.reference.mainTestimonialLogo}
              />
              )}
            </figcaption>
          </motion.figure>
          <div className="space-y-8 xl:contents xl:space-y-0">
            <div className="xl:row-span-2 space-y-8">
              {props.testimonials1.map((testimonial, testimonialIndex) => (
                <motion.figure
                  key={testimonial.name}
                  className="rounded-2xl bg-bg1/70 px-8 pt-2 pb-6 bg-blur backdrop-blur-lg shadow-lg ring-1 ring-text/5 transition-none"
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.2}}
                  viewport={{amount: 0.9, once: true}}
                >
                  <blockquote className="text-gray-900 text-sm leading-6 sm:text-base sm:leading-7">
                    <RichText
                      edit={props.edit}
                      name={`array_${props.reference.testimonials1}.${testimonialIndex}-body`}
                      content={testimonial.body}
                      className="text-sm leading-6 sm:text-base sm:leading-7"
                    />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      name={`array_${props.reference.testimonials1}.${testimonialIndex}-image`}
                      edit={props.edit}
                    />
                    <div>
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.testimonials1}.${testimonialIndex}-name`}
                        className="font-semibold text-title"
                      >
                        {testimonial.name}
                      </Text>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            <div className="xl:row-start-1 space-y-8">
              {props.testimonials2.map((testimonial, testimonialIndex) => (
                <motion.figure
                  key={testimonial.name}
                  className="rounded-2xl bg-bg1/70 px-8 pt-2 pb-6 shadow-lg ring-1 ring-text/5 transition-none bg-blur backdrop-blur-lg"
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.2}}
                  viewport={{amount: 0.9, once: true}}
                >
                  <blockquote className="text-gray-900 text-sm leading-6 sm:text-base sm:leading-7">
                    <RichText
                      edit={props.edit}
                      name={`array_${props.reference.testimonials2}.${testimonialIndex}-body`}
                      content={testimonial.body}
                      className="text-sm leading-6 sm:text-base sm:leading-7"
                    />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      name={`array_${props.reference.testimonials2}.${testimonialIndex}-image`}
                      edit={props.edit}
                    />
                    <div>
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.testimonials2}.${testimonialIndex}-name`}
                        className="font-semibold text-title"
                      >
                        {testimonial.name}
                      </Text>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
          <div className="space-y-8 xl:contents xl:space-y-0">
            <div
              className={classNames(
                false ? "xl:row-span-2" : "xl:row-start-1",
                "space-y-8"
              )}
            >
              {props.testimonials3.map((testimonial, testimonialIndex) => (
                <motion.figure
                  key={testimonial.name}
                  className="rounded-2xl bg-bg1/70 bg-blur px-8 pt-2 pb-6 shadow-lg ring-1 ring-text/5 transition-none backdrop-blur-lg"
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.2}}
                  viewport={{amount: 0.9, once: true}}
                >
                  <blockquote className="text-gray-900 text-sm leading-6 sm:text-base sm:leading-7">
                    <RichText
                      edit={props.edit}
                      name={`array_${props.reference.testimonials3}.${testimonialIndex}-body`}
                      content={testimonial.body}
                      className="text-sm leading-6 sm:text-base sm:leading-7"
                    />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      name={`array_${props.reference.testimonials3}.${testimonialIndex}-image`}
                      edit={props.edit}
                    />
                    <div>
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.testimonials3}.${testimonialIndex}-name`}
                        className="font-semibold text-title"
                      >
                        {testimonial.name}
                      </Text>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            <div
              className={classNames(
                true ? "xl:row-span-2" : "xl:row-start-1",
                "space-y-8"
              )}
            >
              {props.testimonials4.map((testimonial, testimonialIndex) => (
                <motion.figure
                  key={testimonial.name}
                  className="rounded-2xl px-8 pt-2 pb-6 shadow-lg ring-1 ring-text/5 transition-none bg-bg1/70 bg-blur backdrop-blur-lg"
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.2}}
                  viewport={{amount: 0.9, once: true}}
                >
                  <blockquote className="text-gray-900 text-sm leading-6 sm:text-base sm:leading-7">
                    <RichText
                      edit={props.edit}
                      name={`array_${props.reference.testimonials4}.${testimonialIndex}-body`}
                      content={testimonial.body}
                      className="text-sm leading-6 sm:text-base sm:leading-7"
                    />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      name={`array_${props.reference.testimonials4}.${testimonialIndex}-image`}
                      edit={props.edit}
                    />
                    <div>
                      <Text
                        edit={props.edit}
                        name={`array_${props.reference.testimonials4}.${testimonialIndex}-name`}
                        className="font-semibold text-title"
                      >
                        {testimonial.name}
                      </Text>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
