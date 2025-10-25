"use client";

import Text from "../text/Text";
import Image from "../image/Image";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
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

export default function SubyBlock(props: {
  subtitle?: string;
  title: string;
  description?: string;
  content: {
    name: string;
    description: string;
    image: string;
    body: string;
  }[];
  edit: boolean;
  reference: any;
}) {
  const [content, setContent] = useState(props.content);

  function handleAddItem() {
    setContent([...content, {
      name: "Nombre del testimonio",
      description: "Cargo o posición",
      image: "https://internaut.nyc3.cdn.digitaloceanspaces.com/avatar-placeholder.jpg",
      body: "Este es un nuevo testimonio. Puedes editar este texto para personalizarlo según tus necesidades."
    }]);
  }

  function handleDeleteItem(indexToDelete: number) {
    setContent(content.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="mt-12 sm:mt-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
          className="transition-none"
        >
          <Text
            edit={props.edit}
            name={props.reference.subtitle}
            className="text-base/7 font-semibold text-color2 w-full text-center"
          >
            {props.subtitle}
          </Text>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
          className="transition-none"
        >
          <Text
            edit={props.edit}
            name={props.reference.title}
            className="w-full mt-1 text-balance text-2xl font-semibold tracking-tight text-title sm:text-4xl font-font2 sm:text-center"
          >
            {props.title}
          </Text>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          viewport={{ amount: 0.9, once: true }}
          className="transition-none"
        >
          <Text
            edit={props.edit}
            name={props.reference.description}
            className="w-full mt-4 text-md text-text sm:text-lg text-center"
          >
            {props.description}
          </Text>
        </motion.div>
      </div>
      <div className="mx-auto mt-8 flow-root max-w-2xl sm:mt-12 lg:mx-0 lg:max-w-none">
        <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
          {content.map((testimonial, testimonialIndex) => (
            <div key={testimonialIndex} className="pt-8 sm:inline-block sm:w-full sm:px-4">
              <motion.figure 
                className="rounded-2xl bg-white/40 p-8 text-sm/6 shadow-sm relative group"
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                viewport={{ amount: 0.2, once: true }}
                transition={{ delay: testimonialIndex * 0.05 }}
              >
                {props.edit && (
                  <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
                          <AlertDialogTitle>¿Quieres eliminar este testimonio?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará el testimonio de &quot;{testimonial.name}&quot; de manera permanente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Mejor no</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteItem(testimonialIndex)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sí, eliminarlo
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                <blockquote className="text-text">
                  <Text
                    edit={props.edit}
                    name={`array_${props.reference.content}.${testimonialIndex}-body`}
                    className="w-full text-text"
                  >
                    {testimonial.body}
                  </Text>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <Image
                    src={testimonial.image}
                    name={`array_${props.reference.content}.${testimonialIndex}-image`}
                    edit={props.edit}
                    className="size-10 rounded-full bg-white"
                  />
                  <div>
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.content}.${testimonialIndex}-name`}
                      className="font-semibold text-title w-full"
                    >
                      {testimonial.name}
                    </Text>
                    <Text
                      edit={props.edit}
                      name={`array_${props.reference.content}.${testimonialIndex}-description`}
                      className="text-text/80 w-full"
                    >
                      {testimonial.description}
                    </Text>
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          ))}
        </div>
        
        {props.edit && (
          <div className="mt-8 sm:px-4">
            <button
              onClick={handleAddItem}
              type="button"
              className="w-full rounded-2xl border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
              <span className="mt-2 text-gray-500 font-medium">
                Agregar nuevo testimonio
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}