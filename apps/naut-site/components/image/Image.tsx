"use client";

import Image from "next/image";
import { Settings, Upload } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { upload } from '@vercel/blob/client';
import { useToast } from "@/hooks/use-toast";

export default function Images(props: {
  className?: string;
  alt?: string;
  edit: boolean;
  src: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(props.src);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      setSrc(newBlob.url);
      setOpen(false);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Error uploading image',
      });
    } finally {
      setIsUploading(false);
    }
  }

  if (props.edit) {
    return (
      <>
        <div className={`${props.className} relative opacity-100!`}>
          <img 
            src={src} 
            className={`${props.className}`}
            alt="Uploaded content" 
          />
          <input type="hidden" name={props.name} value={src} />
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="z-10!">
              <div className="cursor-pointer bg-[#2adf94] absolute left-2 bottom-2 p-2 rounded-md hover:bg-[#20d589] text-white text-xs opacity-100!">
                <Settings className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reemplazar imagen</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4 flex-col">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4 animate-pulse" />
                      <span className="text-sm">Subiendo...</span>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={props.alt || "Image"}
      className={props.className}
      width={600}
      height={600}
    />
  );
}