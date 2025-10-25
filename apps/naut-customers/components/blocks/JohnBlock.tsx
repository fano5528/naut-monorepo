"use client";

import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Text from '../text/Text';
import PopupEditor from "../popup-editor";

interface MediaItem extends Record<string, string> {
  url: string;
}

const mediaFields = {
  url: {
    label: 'Media',
    type: 'image' as const
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

function VideoThumbnail({ src, ...props }: { src: string } & React.ComponentProps<typeof Image>) {
  const [thumbnail, setThumbnail] = useState(src);

  useEffect(() => {
    if (!isVideo(src)) return;

    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = "anonymous";
    video.currentTime = 0.1;  // Seek to first frame
    
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      setThumbnail(canvas.toDataURL());
    });
  }, [src]);

  return <Image {...props} src={thumbnail} />;
}

export default function JohnBlock(props: {
  title: string;
  subtitle: string;
  media: MediaItem[];
  edit: boolean;
  reference: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [media, setMedia] = useState(props.media);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <>
      {/* Gallery Modal */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg text-left transition-all sm:my-8 w-[90vw] sm:w-[80vw] h-[56.25vw] sm:h-[50vw]">
                  <button onClick={() => setIsOpen(false)} className="absolute right-0 sm:-right-12 -top-12">
                    <XMarkIcon className="h-8 w-8 text-[#c0c0c0] hover:text-white duration-0" />
                  </button>

                  {/* Navigation Buttons */}
                  {media.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2"
                      >
                        <ChevronLeftIcon className="h-8 w-8 text-white" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2"
                      >
                        <ChevronRightIcon className="h-8 w-8 text-white" />
                      </button>
                    </>
                  )}

                  {/* Media Content */}
                  <div className="w-full h-full bg-black">
                    {isVideo(media[currentIndex].url) ? (
                      <video
                        className="w-full h-full"
                        src={media[currentIndex].url}
                        controls
                        autoPlay
                      />
                    ) : (
                      <Image
                        className="w-full h-full object-contain"
                        src={media[currentIndex].url}
                        alt="Gallery image"
                        width={1000}
                        height={1000}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

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

          {/* Gallery Grid */}
          <div className="relative">
            {props.edit && (
              <PopupEditor<MediaItem>
                items={media}
                onItemsChange={setMedia}
                reference={props.reference.media}
                triggerClassName="absolute top-4 left-4 z-10"
                fields={mediaFields}
                defaultItem={defaultMediaItem}
              />
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] cursor-pointer group"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsOpen(true);
                  }}
                >
                  {isVideo(item.url) ? (
                    <>
                      <VideoThumbnail
                        className="w-full h-full object-cover"
                        src={item.url}
                        alt="Video thumbnail"
                        width={500}
                        height={375}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                        <PlayIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80 group-hover:opacity-100" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        className="w-full h-full object-cover"
                        src={item.url}
                        alt="Gallery image"
                        width={500}
                        height={375}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                        <MagnifyingGlassIcon className="absolute bottom-2 right-2 w-6 h-6 text-white opacity-80 group-hover:opacity-100" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}