"use client";

import Image from 'next/image';
import Text from '../text/Text';
import PopupEditor from "../popup-editor";
import { useState, useEffect } from 'react';

interface ContentItem extends Record<string, string> {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const contentFields = {
  image: {
    label: 'Imagen',
    type: 'image' as const
  },
  title: {
    label: 'Título',
    type: 'text' as const
  },
  subtitle: {
    label: 'Subtítulo',
    type: 'text' as const
  },
  description: {
    label: 'Descripción',
    type: 'richtext' as const
  }
};

const defaultContentItem: ContentItem = {
  image: "https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/placeholder.jpg",
  title: "Nuevo elemento",
  subtitle: "Nuevo subtítulo",
  description: "Nueva descripción"
};

export interface Props {
  content: ContentItem[];
  title: string;
  subtitle: string;
  edit: boolean;
  reference: any;
}

export default function LukeBlock(props: Props) {
  const [content, setContent] = useState(props.content);

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  return (
    <>
      <style jsx global>{`
        .luke-content p {
          margin-top: 16px;
          font-size: 0.9rem;
        }
        .luke-content p:first-child {
          margin-top: 0;
        }
      `}</style>

      <div className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <Text 
              className="text-sm font-semibold text-color2 mb-3 w-full text-center"
              edit={props.edit}
              name={props.reference?.subtitle}
            >
              {props.subtitle}
            </Text>
            <Text 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-color1 font-font2 w-full text-center"
              edit={props.edit}
              name={props.reference?.title}
            >
              {props.title}
            </Text>
          </div>

          {/* Cards Grid */}
          <div className="relative">
            {props.edit && (
              <PopupEditor<ContentItem>
                items={content}
                onItemsChange={setContent}
                reference={props.reference.content}
                triggerClassName="absolute top-4 left-4 z-10"
                fields={contentFields}
                defaultItem={defaultContentItem}
              />
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {content.map((item, index) => (
                <div key={index} className="bg-text/10 overflow-hidden shadow-sm">
                  {/* Image */}
                  <div className="aspect-[4/3] w-full relative">
                    <Image
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt="Card image"
                      width={500}
                      height={375}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    {/* Subtitle */}
                    <div className="inline-block text-xs font-semibold text-color2 bg-color2/10 px-3 py-1 rounded-full">
                      {item.subtitle}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-color1 font-font2 mt-2">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <div 
                      className="prose prose-sm text-text mt-4 luke-content"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}