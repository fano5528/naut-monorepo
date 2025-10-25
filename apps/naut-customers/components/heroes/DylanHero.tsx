"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PopupEditor from "../popup-editor";
import Link from "next/link";
import Image from "next/image";

interface Slide extends Record<string, string> {
  title: string;
  description: string;
  link: string;
  background: string;
}

const slideFields = {
  title: {
    label: 'Título',
    type: 'text' as const
  },
  description: {
    label: 'Descripción',
    type: 'textarea' as const
  },
  link: {
    label: 'Hipervínculo',
    type: 'text' as const
  },
  background: {
    label: 'Imagen de fondo',
    type: 'image' as const
  }
};

const defaultSlide: Slide = {
  title: "Nueva diapositiva",
  description: "Agrega tu descripción aquí",
  link: "/ejemplo",
  background: "https://internaut.nyc3.cdn.digitaloceanspaces.com/sublime.jpg"
};

export default function DylanHero(props: { 
  content: Slide[], 
  edit: boolean, 
  reference: any 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState(props.content);
  const ROTATION_INTERVAL = 7500;

  const goToSlide = useCallback((index: number) => {
    const validIndex = Math.max(0, Math.min(index, slides.length - 1));
    setCurrentSlide(validIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), ROTATION_INTERVAL);
  }, []);

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="overflow-hidden relative h-[90vh] w-full box-border">
      {props.edit && (
        <PopupEditor<Slide>
          items={slides}
          onItemsChange={setSlides}
          reference={props.reference.content}
          triggerClassName="absolute bottom-4 left-4 z-10"
          fields={slideFields}
          defaultItem={defaultSlide}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 transition-none"
        >
          <Image
            src={slides[currentSlide].background}
            alt={slides[currentSlide].title}
            priority={currentSlide === 0}
            quality={90}
            fill
            className="object-cover"
            style={{ zIndex: -1 }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-bg1/70 from-10% to-bg1/10 to-20%" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg1 to-bg1/10 to-35%" />

          <div className="relative h-full w-full flex flex-col items-center justify-center text-title px-4">
            <Link href={`${slides[currentSlide].link}`} className="bg-white p-[48px] flex flex-col items-center justify-center sm:max-w-4xl w-full hover:scale-[101%]">
              <motion.h1
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-[2.625rem] font-bold mb-4 text-center font-font2 text-color1 transition-none"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-md md:text-base text-center max-w-2xl text-text transition-none"
              >
                {slides[currentSlide].description}
              </motion.p>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-1">
        <button
          onClick={prevSlide}
          type="button"
          className="p-1 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 text-text" />
        </button>

        <div className="w-64 h-1 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-text transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        <button
          onClick={nextSlide}
          type="button"
          className="p-1 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="w-4 h-4 text-text" />
        </button>
      </div>
    </div>
  );
}
