"use client";

import { useState } from "react"
import { H2 } from "@/components/ui/typography"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RichText from "@/components/text/RichText"
import { upload } from '@vercel/blob/client';
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { createEntry } from "./actions"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface Category {
  id: number;
  name: string;
}

interface Field {
  id: number;
  uid: string;
  name: string;
  type: string;
  blockPropMappedTo: string;
  value: string;
}

interface NewEntryFormProps {
  fields: Field[];
  categories: Category[];
  typeId: number;
  siteDomain: string;
}

export function NewEntryForm({ fields: initialFields, categories, typeId, siteDomain }: NewEntryFormProps) {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState<{ [key: number]: boolean }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirmCreate = async () => {
    try {
      setIsCreating(true);
      
      const result = await createEntry({
        fields: fields.map(field => ({
          fieldId: field.id,
          value: field.value
        })),
        categoryIds: selectedCategories,
        typeId,
        siteDomain
      });

      if (result.success) {
        toast({
          title: "Éxito",
          description: "Entrada creada correctamente",
        });
        router.push(`/sitio/${siteDomain}/cms/${result.typeUid}/1`);
      } else {
        throw new Error(result.error || "Failed to create entry");
      }
    } catch (error) {
      console.error("Error creating entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la entrada",
      });
    } finally {
      setIsCreating(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="w-full mt-16 px-12">
      <H2>Nueva entrada</H2>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
          <div className="flex flex-col gap-4">
            <Label>Categorías</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                  {selectedCategories.includes(category.id) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

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
            disabled={isCreating || selectedCategories.length === 0}
          >
            {isCreating ? "Creando..." : "Crear entrada"}
          </Button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar creación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres crear esta entrada?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isCreating}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmCreate}
              disabled={isCreating}
            >
              {isCreating ? "Creando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 