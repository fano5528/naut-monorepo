"use client";

import { useState } from "react";
import { Settings, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { upload } from '@vercel/blob/client';
import { useToast } from "@/hooks/use-toast";
import RichText from "./text/RichText";

type FieldConfig = {
  label: string;
  type: 'text' | 'textarea' | 'url' | 'image' | 'richtext';
}

type FieldConfigs = {
  [key: string]: FieldConfig;
}

interface EditorProps<T> {
  items: T[];
  onItemsChange: (items: T[]) => void;
  reference: string;
  triggerClassName?: string;
  fields: FieldConfigs;
  defaultItem: T;
}

export default function PopupEditor<T extends Record<string, string>>({ 
  items, 
  onItemsChange,
  reference,
  triggerClassName,
  fields,
  defaultItem
}: EditorProps<T>) {
  const [editingIndex, setEditingIndex] = useState(0);
  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const addItem = () => {
    onItemsChange([...items, { ...defaultItem }]);
    setEditingIndex(items.length);
  };

  const deleteItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
    setEditingIndex(Math.min(editingIndex, items.length - 2));
  };

  const updateItem = (field: keyof T, value: string) => {
    onItemsChange(items.map((item, index) => 
      index === editingIndex 
        ? { ...item, [field]: value }
        : item
    ));
  };

  const handleFileUpload = async (fieldName: keyof T, file: File) => {
    try {
      setIsUploading(prev => ({ ...prev, [fieldName]: true }));
      
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      updateItem(fieldName, newBlob.url);
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
      setIsUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Add a handler for richtext changes
  const handleRichTextChange = (fieldName: keyof T, value: string) => {
    const newItems = [...items];
    newItems[editingIndex] = {
      ...newItems[editingIndex],
      [fieldName]: value
    };
    onItemsChange(newItems);
  };

  const renderField = (fieldName: keyof T, config: FieldConfig) => {
    if (config.type === 'image') {
      return (
        <div key={fieldName as string} className="grid gap-2">
          <Label htmlFor={fieldName as string}>{config.label}</Label>
          <div className="flex flex-col gap-4">
            {(items[editingIndex][fieldName] && !items[editingIndex][fieldName].includes('.mp4') ) ? (
              <img 
                src={items[editingIndex][fieldName]} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <p>Video</p>
            )}
            <div className="flex flex-col items-center gap-2 mt-2">
              <Label htmlFor={fieldName as string} className="w-full text-left">Upload media:</Label>
              <Input
                id={fieldName as string}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(fieldName, file);
                }}
                disabled={isUploading[fieldName as string]}
              />
              {isUploading[fieldName as string] && (
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 animate-pulse" />
                  <span className="text-sm">Subiendo...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (config.type === 'richtext') {
      return (
        <div key={fieldName as string} className="grid gap-2">
          <Label htmlFor={fieldName as string}>{config.label}</Label>
          <style jsx global>{`
            .popup-editor .rich-text-container p {
              margin-top: 1rem;
            }
            .popup-editor .rich-text-container p:first-child {
              margin-top: 0;
            }
          `}</style>
          <div className="popup-editor">
            <RichText
              key={`${String(fieldName)}-${editingIndex}`}
              content={items[editingIndex][fieldName]}
              edit={true}
              name={fieldName as string}
              onChange={(value: string) => handleRichTextChange(fieldName, value)}
            />
          </div>
        </div>
      );
    }

    const commonProps = {
      id: fieldName as string,
      value: items[editingIndex][fieldName] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        updateItem(fieldName, e.target.value)
    };

    return (
      <div key={fieldName as string} className="grid gap-2">
        <Label htmlFor={fieldName as string}>{config.label}</Label>
        {config.type === 'textarea' ? (
          <Textarea {...commonProps} />
        ) : (
          <Input {...commonProps} type={config.type} />
        )}
      </div>
    );
  };

  // Check if any field is a richtext field
  const hasRichText = Object.values(fields).some(field => field.type === 'richtext');

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="default"
            size="icon"
            className={`${triggerClassName} bg-[#2adf94] hover:bg-[#20d589] text-white`}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[425px] ${hasRichText ? 'sm:max-w-[90vw] overflow-y-scroll' : ''} text-neutral-700`}>
          <DialogHeader>
            <DialogTitle>Editar elemento {editingIndex + 1}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2 justify-center">
              {items.map((_, index) => (
                <Button
                  key={index}
                  variant={editingIndex === index ? "default" : "default"}
                  onClick={() => setEditingIndex(index)}
                  size="icon"
                  className={`rounded-full w-4 h-4 border-neutral-400 bg-neutral-400 hover:bg-neutral-500 hover:border-neutral-500 ${editingIndex === index ? "border-neutral-600 bg-neutral-600" : ""}`}
                >
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="!p-0 h-5 w-5 border-neutral-400"
                onClick={addItem}
              >
                <Plus className="h-3 text-neutral-400" />
              </Button>
            </div>

            <div className="grid gap-4">
              {Object.entries(fields).map(([fieldName, config]) => 
                renderField(fieldName as keyof T, config)
              )}
            </div>

            {items.length > 1 && (
              <Button
                variant="destructive"
                onClick={() => deleteItem(editingIndex)}
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar elemento {editingIndex + 1}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {items.map((item, index) => (
        <div key={index} className="hidden">
          {Object.keys(fields).map(fieldName => (
            <input
              key={fieldName}
              type="hidden"
              name={`array_${reference}.${index}-${fieldName}`}
              value={item[fieldName] || ''}
            />
          ))}
        </div>
      ))}
    </>
  );
} 