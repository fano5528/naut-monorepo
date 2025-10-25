"use client";

import { useState } from 'react';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface YtVideoProps {
  url: string;
  className?: string;
  edit?: boolean;
  name?: string;
}

export default function YtVideo({ url, className, edit, name }: YtVideoProps) {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(url);

  function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const videoId = getYouTubeId(videoUrl);

  if (edit) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="relative">
            <iframe 
              className={`w-full aspect-video ${className}`}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div 
              className="cursor-pointer bg-[#2adf94] absolute left-2 bottom-2 p-2 rounded-md hover:bg-[#20d589] text-white text-xs"
              onClick={() => setOpen(true)}
            >
              <Settings className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar video</DialogTitle>
              <DialogDescription>
                Ingresa la URL del video de YouTube que deseas mostrar.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs">URL del video</label>
                <Input
                  type="text" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <input type="hidden" name={name} value={videoUrl} />
      </>
    );
  }

  return (
    <iframe 
      className={`w-full aspect-video ${className}`}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}