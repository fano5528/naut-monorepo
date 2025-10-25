"use client";

import { useState } from "react"
import { H2 } from "@/components/ui/typography"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RichText from "@/components/text/RichText"
import { upload } from '@vercel/blob/client';
import { useToast } from "@/hooks/use-toast"
import { Upload, Trash2, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { saveEntry, deleteEntry, updatePublishedStatus, updatePublishedDate } from "./actions"
import { useRouter, useParams } from "next/navigation"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Field {
  id: number;
  uid: string;
  name: string;
  type: string;
  blockPropMappedTo: string;
  value: string;
  entryContentId: number;
}

export function EditEntryForm({ initialFields, entryId, publishedAt }: { initialFields: Field[], entryId: number, publishedAt: Date }) {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [isUploading, setIsUploading] = useState<{ [key: number]: boolean }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublished, setIsPublished] = useState<boolean>(publishedAt ? true : false);
  const [publishDate, setPublishDate] = useState<Date | undefined>(publishedAt || undefined);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as string;

  const handleRichTextChange = (fieldId: number, value: string) => {
    setFields(prevFields => prevFields.map(field =>
      field.id === fieldId ? { ...field, value } : field
    ));
  };

  const handleFileUpload = async (fieldId: number, file: File) => {
    try {
      setIsUploading(prev => ({ ...prev, [fieldId]: true }));
      
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      setFields(prevFields => prevFields.map(field => 
        field.id === fieldId ? { ...field, value: newBlob.url } : field
      ));

      toast({
        title: "Éxito",
        description: "Contenido subido correctamente",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Error uploading image',
      });
    } finally {
      setIsUploading(prev => ({ ...prev, [fieldId]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();

      console.log("fields", fields);
      
      // Add all field values to formData
      fields.forEach(field => {
        if (field.entryContentId !== undefined) {
          formData.append(`entryContentId-${field.entryContentId}`, field.value);
        } else {
          formData.append(`fieldId-${field.id}-${entryId}`, field.value);
        }
      });

      // Update published status if it has changed
      if (isPublished !== (publishedAt ? true : false)) {
        const result = await updatePublishedStatus(entryId, isPublished, domain);
        if (!result.success) {
          throw new Error("Failed to update published status");
        }
      }

      // Update published date if it has changed and entry is published
      if (isPublished && publishDate && publishDate !== publishedAt) {
        const result = await updatePublishedDate(entryId, publishDate, domain);
        if (!result.success) {
          throw new Error("Failed to update published date");
        }
      }

      const result = await saveEntry(formData);

      if (result.success) {
        toast({
          title: "Éxito",
          description: "Cambios guardados correctamente",
        });
        router.refresh();
      } else {
        throw new Error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar los cambios",
      });
    } finally {
      setIsSaving(false);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("a borrar entrada", entryId);
      const result = await deleteEntry(entryId);

      if (result.success) {
        toast({
          title: "Éxito",
          description: "Entrada eliminada correctamente",
        });
        router.push(`../1`); // Navigate back to entries list
      } else {
        throw new Error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la entrada",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handlePublishedChange = (checked: boolean) => {
    setIsPublished(checked);
  };

  return (
    <div className="w-full mt-16 px-12">
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
      <div className="flex justify-between items-center">
        <H2>Editar entrada</H2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Publicada</Label>
              <Switch
                checked={isPublished}
                onCheckedChange={handlePublishedChange}
              />
            </div>
            {publishedAt && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !publishDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {publishDate ? format(publishDate, "PPP") : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={publishDate}
                    onSelect={setPublishDate}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isDeleting}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar entrada
          </Button>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
          {fields.map((field) => (
            <div key={field.id}>
              {field.type === "string" && (
                <div className="flex flex-col gap-2">
                  <Label>{field.name}</Label>
                  <Input 
                    type="text" 
                    value={field.value}
                    onChange={(e) => {
                      setFields(prevFields => prevFields.map(f => 
                        f.id === field.id ? { ...f, value: e.target.value } : f
                      ));
                    }}
                  />
                </div>
              )}
              {field.type === "richtext" && (
                <div className="flex flex-col gap-2">
                  <Label>{field.name}</Label>
                  <RichText
                    content={field.value}
                    edit={true}
                    name={`field-${field.id}`}
                    onChange={(value) => handleRichTextChange(field.id, value)}
                  />
                </div>
              )}
              {field.type === "image" && (
                <div className="flex flex-col gap-2">
                  <Label>{field.name}</Label>
                  <div className="flex flex-col gap-4">
                    {field.value && !field.value.includes('.mp4') ? (
                      <img 
                        src={field.value} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : field.value ? (
                      <p>Video</p>
                    ) : null}
                    <div className="flex flex-col items-start gap-2">
                      <Label>Upload media:</Label>
                      <Input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(field.id, file);
                        }}
                        disabled={isUploading[field.id]}
                      />
                      <input 
                        type="hidden"
                        name={`entryContentId-${field.entryContentId}`}
                        value={field.value}
                      />
                      {isUploading[field.id] && (
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4 animate-pulse" />
                          <span className="text-sm">Subiendo...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button 
            type="submit"
            className="mt-4 mb-12"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar cambios</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres guardar los cambios? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmSave}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta entrada? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              type="button"
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Trash2 className="h-4 w-4 animate-pulse" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 