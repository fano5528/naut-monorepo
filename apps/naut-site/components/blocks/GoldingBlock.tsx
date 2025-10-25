"use client";

import Image from '../image/Image'
import { useState } from 'react'
import { Play, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog"
import RichText from '@/components/text/RichText'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  image: string;
  video: string;
  content: string;
  textOnLeft: boolean;
  edit: boolean;
  reference: any;
}

export default function GoldingBlock(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogContent className="max-w-[90vw] sm:max-w-[80vw] h-[56.25vw] sm:h-[50vw] p-0 border-none bg-transparent">
            <VisuallyHidden>
              <DialogTitle>Video</DialogTitle>
            </VisuallyHidden>
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute right-0 sm:-right-12 -top-12 z-50"
            >
              <X className="h-8 w-8 text-[#c0c0c0] hover:text-white transition-colors" />
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={props.video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <div className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Sticky Image on the Left */}
            <div className={`lg:-ml-12 lg:-mt-12 lg:p-12 lg:col-start-1 ${props.textOnLeft ? 'lg:order-2 lg:col-start-2 lg:row-start-1' : 'lg:order-1 lg:col-start-1 lg:row-start-2'}`}>
              <div className="relative group lg:sticky lg:top-32 w-full">
                <Image
                  className="w-full max-w-none bg-bg2 shadow-2xl ring-1 ring-text/10 object-cover"
                  src={props.image}
                  edit={props.edit}
                  name={props.reference.image}
                />
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.35)] cursor-pointer"
                >
                  <Play className="w-14 h-14 text-white opacity-80 group-hover:opacity-100" />
                </button>
              </div>
            </div>

            {/* Content on the Right */}
            <div className={`${props.textOnLeft ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:order-2 lg:col-start-2 lg:row-start-2'}`}>
              <RichText 
                content={props.content}
                edit={props.edit}
                name={props.reference.content}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
