"use client";

import { useEffect, useState } from 'react';
import PopupEditor from "../popup-editor";
import Image from 'next/image';

interface SlideContent extends Record<string, string> {
  image: string;
  title: string;
}

const slideFields = {
  image: {
    label: 'Imagen',
    type: 'image' as const
  },
  title: {
    label: 'Título',
    type: 'text' as const
  }
};

const defaultSlide: SlideContent = {
  image: "https://internaut.nyc3.cdn.digitaloceanspaces.com/sublime.jpg",
  title: "Nueva imagen"
};

export default function StevensonBlock( props: {
  content: SlideContent[];
  edit: boolean;
  reference: any;
} ) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState(props.content);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Preload all images to prevent flicker
  useEffect(() => {
    console.log(imagesLoaded);
    const loadImages = async () => {
      const loadPromises = slides.map((slide, index) => {
        return new Promise<boolean>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve(true);
          };
          img.onerror = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true; // Mark as loaded even on error to prevent infinite loading
              return newLoaded;
            });
            resolve(false);
          };
          img.src = slide.image;
        });
      });
      
      await Promise.all(loadPromises);
    };

    loadImages();
  }, [slides]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 200);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handleStart = () => {
    setIsPaused(true);
  };

  const handleEnd = () => {
    setIsPaused(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent context menu on long press
  };

  return (
    <div className="w-full h-[100dvh] block relative top-0">
      {props.edit && (
        <PopupEditor<SlideContent>
          items={slides}
          onItemsChange={setSlides}
          reference={props.reference.content}
          triggerClassName="absolute bottom-4 left-4 z-10"
          fields={slideFields}
          defaultItem={defaultSlide}
        />
      )}
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className="w-full h-full flex items-center justify-center relative cursor-pointer select-none touch-none" 
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onContextMenu={handleContextMenu}
          style={{ 
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
        >
          {/* Render all images with crossfade effect */}
          {slides.map((slide, index) => (
            <Image 
              key={`${slide.image}-${index}`}
              width={800} 
              height={800} 
              quality={60} 
              src={slide.image} 
              alt={slide.title} 
              className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-0 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
              onContextMenu={handleContextMenu}
              priority={index === 0} // Prioritize first image
            />
          ))}
          {isPaused && (
            <div className="absolute inset-0 bg-bg1/20 flex items-center justify-center z-10">
              <h2 className="text-2xl text-title font-medium text-center px-4">
                {slides[currentIndex].title}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}