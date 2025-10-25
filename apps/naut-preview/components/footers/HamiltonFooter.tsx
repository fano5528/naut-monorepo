"use client";

import { motion } from "framer-motion";
import Headerlink from "../headerlink/Headerlink";
import Image from "next/image";
import React from "react";

const icons = {
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
  twitter: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  linkedin: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 448 512" {...props}>
      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
    </svg>
  ),
  mail: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 512 512" {...props}>
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
  ),
};

interface HamiltonFooterProps {
  edit?: boolean;
  social: { name: string; href: string }[];
  logo: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

export default function HamiltonFooter({
  edit = false,
  social,
  logo,
  title,
  ctaText,
  ctaLink,
}: HamiltonFooterProps) {
  return (
    <footer className="mt-24 sm:mt-32 bg-footer w-full py-14 px-14 sm:py-20 sm:px-28 md:px-36 relative block">
      <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
          className="transition-none"
        >
          <Headerlink href="/" edit={edit}>
            <Image
              src={logo}
              width={100}
              height={100}
              alt="Logo"
              className="h-24 w-auto"
            />
          </Headerlink>
        </motion.div>

      <div className="flex mt-20 sm:mt-48 justify-between md:items-center flex-col md:flex-row gap-8 md:gap-0">
        <div className="flex flex-col items-start">
        <motion.h1
          className="text-footertext text-2xl sm:text-4xl font-semibold transition-none"
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
        >
          {title}
        </motion.h1>
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
          className="transition-none"
        >
          <Headerlink
            href={ctaLink}
            className="text-footertext/90 hover:text-footertext text-sm sm:text-2xl font-light mt-4 relative block group overflow-hidden transition-none"
            edit={edit}
          >
            {ctaText}
            <div className="relative h-[1px] w-[200%] grid grid-cols-2 -ml-[100%] group-hover:ml-0">
              <div className="w-full h-[1px] bg-footertext" />
              <div className="w-full h-[1px] bg-footertext/30" />
            </div>
          </Headerlink>
        </motion.div>
      </div>
        <div className="flex gap-6">
          {social.map((item, index) => (
            <motion.div
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              viewport={{ amount: 0.9, once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
              key={item.name}
              className="transition-none"
            >
              <Headerlink
                edit={edit}
                href={item.href}
                className="text-footertext hover:text-footertext/40 !duration-0"
              >
                <span className="sr-only">{item.name}</span>
                {React.createElement(icons[item.name as keyof typeof icons], {
                  className: "h-8 w-8 !duration-0",
                })}
              </Headerlink>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}
