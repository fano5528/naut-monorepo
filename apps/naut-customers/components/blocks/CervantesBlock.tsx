"use client";

import Image from "next/image";
import { Fragment, useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import RichText from '@/components/text/RichText';
import PopupEditor from "@/components/popup-editor";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Define the MediaItem interface as a Record to work with PopupEditor
interface MediaItem extends Record<string, string> {
  url: string;
}

const mediaFields = {
  url: {
    label: 'Media',
    type: 'image' as const  // This will show a file input that accepts both images and videos
  }
};

const defaultMediaItem: MediaItem = {
  url: "https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/placeholder.jpg"
};

function isVideo(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const extension = url.toLowerCase().substring(url.lastIndexOf('.'));
  return videoExtensions.includes(extension);
}

export default function CervantesBlock(props: {
  media: MediaItem[];
  content: string;
  edit: boolean;
  reference: any;
  textOnLeft: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState(props.media);
  console.log("content", props.content);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % props.media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + props.media.length) % props.media.length);
  };

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
          font-size: 2.5rem;
          font-weight: 700;
          margin: 2rem 0 1.5rem;
          color: hsl(var(--color2));
          font-family: var(--font-font2);
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
          margin: 1.25rem 0 0.75rem;
          color: hsl(var(--color2));
        }

        .rich-text-container h6 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 1rem 0 0.75rem;
          color: hsl(var(--color2));
        }

        /* Paragraphs and spacing */
        .rich-text-container p {
          margin: 1rem 0;
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

      {/* Replace Dialog Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 border-none bg-transparent shadow-none w-screen h-screen max-w-[95vw] max-h-[95vh]">
          <VisuallyHidden>
            <DialogTitle>Imagen</DialogTitle>
          </VisuallyHidden>
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute right-4 top-4 z-50"
          >
            <XMarkIcon className="h-8 w-8 text-[#c0c0c0] hover:text-white duration-0" />
          </button>

          {/* Navigation Buttons */}
          {props.media.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-50"
              >
                <ChevronLeftIcon className="h-8 w-8 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 z-50"
              >
                <ChevronRightIcon className="h-8 w-8 text-white" />
              </button>
            </>
          )}

          {/* Media Content */}
          <div className="flex items-center justify-center w-full h-full">
            {isVideo(media[currentIndex].url) ? (
              <video
                className="max-w-full max-h-[90vh] object-contain"
                src={media[currentIndex].url}
                controls
                autoPlay
              />
            ) : (
              <Image
                className="max-w-full max-h-[90vh] object-contain"
                src={media[currentIndex].url}
                alt="Uploaded content"
                width={2000}
                height={2000}
                quality={95}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8 sm:mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            {/* Content on the Left/Right */}
            <div className={`${props.textOnLeft ? "lg:col-start-1" : "lg:col-start-2"}`}>
              <RichText
                content={props.content}
                edit={props.edit}
                name={props.reference.content}
              />
            </div>

            {/* Gallery Grid */}
            <div className={`${props.textOnLeft ? "lg:-mr-12 lg:-mt-12 lg:p-12 lg:col-start-2 lg:row-span-2 lg:row-start-1" : "lg:-mr-12 lg:-mt-12 lg:p-12 lg:col-start-1 lg:row-span-2 lg:row-start-1"}`}>
              <div className={`relative lg:sticky lg:top-32 w-full ${media.length > 1 ? 'grid grid-cols-2 gap-4' : ''}`}>
                {props.edit && (
                  <PopupEditor<MediaItem>
                    items={media}
                    onItemsChange={setMedia}
                    reference={props.reference.media}
                    triggerClassName="absolute top-4 left-4 z-50"
                    fields={mediaFields}
                    defaultItem={defaultMediaItem}
                  />
                )}
                
                {media.map((item, index) => (
                  <div
                    key={index}
                    className={`relative group cursor-pointer ${media.length > 1 ? 'aspect-[4/3]' : ''} bg-bg2`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsOpen(true);
                    }}
                  >
                    {isVideo(item.url) ? (
                      <>
                        <video
                          className={`w-full h-full object-cover shadow-xl ${media.length > 1 ? 'object-cover' : 'sm:max-h-[600px] object-contain'}`}
                          src={item.url}
                          preload="metadata"
                          muted
                          playsInline
                        />
                        <div className={`absolute inset-0 bg-black transition-opacity ${media.length > 1 ? 'opacity-20' : 'opacity-0'} group-hover:opacity-30`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayIcon className="w-12 h-12 text-white opacity-80 transition-opacity group-hover:opacity-100" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          className={`w-full h-full shadow-xl ${media.length > 1 ? 'object-cover' : 'object-contain max-h-[600px]'}`}
                          src={item.url}
                          alt="Uploaded content"
                          width={1000}
                          height={1000}
                        />
                        <div className={`absolute inset-0 bg-black transition-opacity ${media.length > 1 ? 'opacity-20' : 'opacity-0'} group-hover:opacity-30`} />
                        <div className="absolute inset-0 flex items-end justify-end">
                          <MagnifyingGlassIcon className="w-8 h-8 pb-2 pr-2 text-white opacity-80 transition-opacity hover:opacity-100" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
