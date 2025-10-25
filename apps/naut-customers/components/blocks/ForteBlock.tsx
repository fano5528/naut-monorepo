"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import RichText from '@/components/text/RichText';
import PopupEditor from "@/components/popup-editor";

interface Logo extends Record<string, string> {
  src: string;
}

const logoFields = {
  src: {
    label: 'Logo',
    type: 'image' as const
  }
};

const defaultLogo: Logo = {
  src: "https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/placeholder.jpg"
};

export default function ForteBlock(props: { 
  content: string;
  logos: Logo[];
  edit: boolean;
  reference: any;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [logos, setLogos] = useState(props.logos);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleLogos = () => {
    const extendedLogos = [...logos, ...logos];
    const visibleCount = isMobile ? 2 : 4;
    return extendedLogos.slice(currentIndex, currentIndex + visibleCount);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div className="mt-16 sm:mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <RichText
            content={props.content}
            edit={props.edit}
            name={props.reference.content}
          />
        </div>
        <div className="mx-auto max-w-lg lg:max-w-none mt-4 sm:mt-6">
          <div className="relative">
            {props.edit && (
              <PopupEditor<Logo>
                items={logos}
                onItemsChange={setLogos}
                reference={props.reference.logos}
                triggerClassName="absolute bottom-0 left-1/2 -translate-x-1/2 z-50"
                fields={logoFields}
                defaultItem={defaultLogo}
              />
            )}
            <div className="flex w-[80vw] sm:w-[60vw] mx-auto">
              <AnimatePresence mode="popLayout">
                {visibleLogos().map((logo, idx) => (
                  <motion.div
                    key={`${currentIndex}-${idx}`}
                    initial={{ opacity: 0, x: isMobile ? "40vw" : "15vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isMobile ? "-40vw" : "-15vw" }}
                    transition={{ ease: "linear" }}
                    className="w-[40vw] sm:w-[15vw] flex-none"
                  >
                    <div className="flex justify-center items-center">
                      <Image
                        className="px-4 sm:px-6 object-contain h-12 sm:h-16"
                        src={logo.src}
                        alt="Logo"
                        width={500}
                        height={500}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}