"use client";

import { useState, useEffect, useLayoutEffect } from 'react';
import HeaderLink from '../headerlink/Headerlink';
import PopupEditor from '../popup-editor';
import RichText from '../text/RichText';

interface Props {
  edit: boolean;
  reference: any;
  title: string;
  navigation: { name: string; href: string }[];
  navigationTitle: string;
  description: string;
}

export default function GoyaHeader(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [stylesReady, setStylesReady] = useState(false);

  // State for editable header content
  const [headerData, setHeaderData] = useState([{
    title: props.title,
    navigationTitle: props.navigationTitle,
    description: props.description,
    navigation: JSON.stringify(props.navigation)
  }]);

  // Set styles ready after layout effect
  useLayoutEffect(() => {
    setStylesReady(true);
  }, []);

  // Hide overlay after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  // Update header data when props change
  useEffect(() => {
    setHeaderData([{
      title: props.title,
      navigationTitle: props.navigationTitle,
      description: props.description,
      navigation: JSON.stringify(props.navigation)
    }]);
  }, [props.title, props.navigationTitle, props.description, props.navigation]);

  // Parse navigation from current data - handle both string and array cases
  const currentNavigation = (() => {
    try {
      const navData = headerData[0]?.navigation;
      if (typeof navData === 'string') {
        return JSON.parse(navData);
      } else if (Array.isArray(navData)) {
        return navData;
      } else {
        return props.navigation;
      }
    } catch {
      return props.navigation;
    }
  })();

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

        /* GoyaHeader specific styles - reduced margins for p elements */
        .goya-header-richtext .rich-text-container p {
          margin: 0.2rem 0;
          line-height: 1.8;
        }

        /* Override RichText width limitation for GoyaHeader overlay */
        .goya-header-overlay .rich-text-container {
          max-width: none !important;
          width: 100% !important;
        }

        /* GoyaHeader overlay - 30% larger text */
        .goya-header-overlay .rich-text-container,
        .goya-header-overlay .rich-text-container p,
        .goya-header-overlay .rich-text-container h1,
        .goya-header-overlay .rich-text-container h2,
        .goya-header-overlay .rich-text-container h3,
        .goya-header-overlay .rich-text-container h4,
        .goya-header-overlay .rich-text-container h5,
        .goya-header-overlay .rich-text-container h6 {
          font-size: 1rem !important; /* 30% larger than text-2xl (1.5rem) */
          line-height: 1.3 !important;
        }

        @media (min-width: 640px) {
          .goya-header-overlay .rich-text-container,
          .goya-header-overlay .rich-text-container p,
          .goya-header-overlay .rich-text-container h1,
          .goya-header-overlay .rich-text-container h2,
          .goya-header-overlay .rich-text-container h3,
          .goya-header-overlay .rich-text-container h4,
          .goya-header-overlay .rich-text-container h5,
          .goya-header-overlay .rich-text-container h6 {
            font-size: 2rem !important; /* 30% larger than text-4xl (2.25rem) */
            line-height: 1.4 !important;
          }
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

      {/* Black overlay that shows for 5 seconds */}
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-bg1 flex items-center justify-center z-[25]">
          <div className={`text-title text-center px-8 sm:px-24 leading-[1.1] goya-header-richtext goya-header-overlay w-full max-w-none transition-opacity duration-300 ${stylesReady ? 'opacity-100' : 'opacity-0'}`}>
            <RichText
              content={headerData[0]?.description || props.description}
              edit={false}
              name="overlay-description"
            />
          </div>
        </div>
      )}
      
      <header className="w-full px-6 pt-4 z-20 fixed">
        <button type="button" className="text-xl font-medium cursor-pointer" onClick={() => setIsOpen(true)}>{headerData[0]?.title || props.title}</button>
        <div onClick={() => setIsOpen(false)} className={`bg-header fixed top-0 left-0 w-full h-full px-6 pt-4 z-30 ${isOpen ? "block" : "hidden"}`}>
          <p className="text-xl font-medium cursor-pointer">{headerData[0]?.title || props.title}</p>
          <div className="flex gap-12 sm:gap-32 mt-12 flex-col sm:flex-row">
            <div className="flex-1 leading-[1.1] text-lg goya-header-richtext">
              <RichText
                content={headerData[0]?.description || props.description}
                edit={false}
                name="menu-description"
              />
            </div>
            <div className="flex-1 flex flex-col gap-0">
              <p className="text-lg font-medium leading-[1.1]">{headerData[0]?.navigationTitle || props.navigationTitle}</p>
              {currentNavigation.map((item: { name: string; href: string }, index: number) => (
                <div key={index} onClick={(e) => e.stopPropagation()}>
                  <HeaderLink target="_blank" edit={props.edit} href={item.href} className="text-lg cursor-pointer leading-[1.1]">{item.name}</HeaderLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {props.edit && (
        <>
          <PopupEditor
            items={headerData}
            onItemsChange={setHeaderData}
            reference="header"
            triggerClassName="fixed top-4 right-4 z-50"
            fields={{
              title: { label: 'Título', type: 'text' },
              navigationTitle: { label: 'Título de navegación', type: 'text' },
              description: { label: 'Descripción', type: 'richtext' },
              navigation: { 
                label: 'Navegación', 
                type: 'visual-array',
                arrayFields: {
                  name: { label: 'Nombre', type: 'text' },
                  href: { label: 'Enlace', type: 'text' }
                }
              }
            }}
            defaultItem={{
              title: '',
              navigationTitle: '',
              description: '',
              navigation: '[]'
            }}
            isHeader={true}
          />
          
          {/* Hidden inputs for header content fields - these will be used by the form */}
          {props.reference && (
            <>
              <input type="hidden" name={`${props.reference.title}_header`} value={headerData[0]?.title || props.title} />
              <input type="hidden" name={`${props.reference.navigationTitle}_header`} value={headerData[0]?.navigationTitle || props.navigationTitle} />
              <input type="hidden" name={`${props.reference.description}_header`} value={headerData[0]?.description || props.description} />
              <input type="hidden" name={`${props.reference.navigation}_header`} value={
                typeof headerData[0]?.navigation === 'string' 
                  ? headerData[0].navigation 
                  : JSON.stringify(headerData[0]?.navigation || props.navigation)
              } />
            </>
          )}
        </>
      )}
    </>
  );
}