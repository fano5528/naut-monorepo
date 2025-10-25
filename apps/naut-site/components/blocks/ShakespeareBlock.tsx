"use client";

import Text from "../text/Text";
import Image from "../image/Image";
import { motion } from "framer-motion";
import IconLink from "../link/IconLink";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  subtitle: string;
  title: string;
  content: {
    image: string;
    title: string;
    description: string;
    date: string;
  }[];
  edit: boolean;
  reference: any;
  ctaText?: string;
  ctaLink?: string;
}

export default function ShakespeareBlock(props: Props) {
  const [content, setContent] = useState(props.content);

  function handleAddItem() {
    setContent([...content, {
      image: "https://internaut.nyc3.cdn.digitaloceanspaces.com/sublime.jpg",
      title: "Título del elemento",
      description: "Descripción del elemento. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      date: "Subtítulo del elemento"
    }]);
  }

  function handleDeleteItem(indexToDelete: number) {
    setContent(content.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="w-full bg-bg2 mt-16 sm:mt-24 py-12 sm:py-16">
      <div className="w-complete sm:w-complete-sm mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 md:gap-16 bg-bg2">
        <div>
          <Text
            edit={props.edit}
            name={props.reference.subtitle}
            className="text-md md:text-lg font-bold text-color2 w-full"
          >
            {props.subtitle}
          </Text>
          <Text
            edit={props.edit}
            name={props.reference.title}
            className="mt-2 text-3xl md:text-5xl font-bold font-font2 text-color1 w-full"
          >
            {props.title}
          </Text>

          {props.ctaText && props.ctaLink && (
            <IconLink
              href={props.ctaLink}
              edit={props.edit}
              linkName={`${props.reference.ctaLink}`}
              textName={`${props.reference.ctaText}`}
              icon="arrow-right"
              className="inline-flex items-center text-color2/80 hover:text-color2 font-normal mt-6 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-color2 after:transition-all hover:after:w-full"
            >
              {props.ctaText}
            </IconLink>
          )}
        </div>
        <div className="flex flex-col">
          {content.map((item, index) => (
            <div key={index}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 transition-none relative group"
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.4, once: true }}
                transition={{ duration: 0.2 }}
              >
                {props.edit && (
                  <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          className="h-7 w-7 rounded-full shadow-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Quieres eliminar este elemento?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará el elemento &quot;{item.title}&quot; de manera permanente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Mejor no</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteItem(index)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sí, eliminarlo
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                <Image
                  src={item.image}
                  edit={props.edit}
                  name={`array_${props.reference.content}.${index}-image`}
                  className="md:h-[250px] aspect-square object-cover relative shadow-lg"
                />
                <div>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-date`}
                    className="text-md text-color2 font-bold w-full"
                  >
                    {item.date}
                  </Text>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-title`}
                    className="text-3xl font-bold font-font2 mt-1 w-full"
                  >
                    {item.title}
                  </Text>
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${index}-description`}
                    className="text-md text-text mt-4 tracking-tight w-full"
                  >
                    {item.description}
                  </Text>
                </div>
              </motion.div>
              {index < content.length - 1 && (
                <hr className="w-full border-t border-text/20 my-8" />
              )}
            </div>
          ))}
          {props.edit && (
            <div className="mt-8">
              <button
                onClick={handleAddItem}
                type="button"
                className="w-full grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 group cursor-pointer"
              >
                <div className="md:h-[250px] aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
                </div>
                <div className="flex items-center h-full">
                  <span className="text-gray-400 group-hover:text-gray-500 text-lg font-medium">
                    Agregar nuevo...
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}