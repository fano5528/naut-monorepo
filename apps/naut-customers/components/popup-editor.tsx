"use client";

import { useState } from "react";
import { Settings, Plus, Trash2, Upload, X } from "lucide-react";
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
  type: 'text' | 'textarea' | 'url' | 'image' | 'richtext' | 'visual-array';
  arrayFields?: { [key: string]: { label: string; type: string } };
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
  isHeader?: boolean;
}

export default function PopupEditor<T extends Record<string, string>>({ 
  items, 
  onItemsChange,
  reference,
  triggerClassName,
  fields,
  defaultItem,
  isHeader = false
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
    if (config.type === 'visual-array') {
      // Parse the current array value
      let currentArray: any[] = [];
      try {
        const value = items[editingIndex][fieldName];
        if (typeof value === 'string') {
          currentArray = JSON.parse(value);
        } else if (Array.isArray(value)) {
          currentArray = value;
        }
      } catch {
        currentArray = [];
      }

      const updateArrayField = (index: number, field: string, value: string) => {
        const newArray = [...currentArray];
        if (!newArray[index]) {
          newArray[index] = {};
        }
        newArray[index][field] = value;
        updateItem(fieldName, JSON.stringify(newArray));
      };

      const addArrayItem = () => {
        const newArray = [...currentArray];
        const newItem: any = {};
        // Initialize with empty values for all array fields
        if (config.arrayFields) {
          Object.keys(config.arrayFields).forEach(key => {
            newItem[key] = '';
          });
        }
        newArray.push(newItem);
        updateItem(fieldName, JSON.stringify(newArray));
      };

      const removeArrayItem = (index: number) => {
        const newArray = currentArray.filter((_, i) => i !== index);
        updateItem(fieldName, JSON.stringify(newArray));
      };

      return (
        <div key={fieldName as string} className="grid gap-2">
          <Label htmlFor={fieldName as string}>{config.label}</Label>
          <div className="space-y-3">
            {currentArray.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Elemento {index + 1}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid gap-2">
                  {config.arrayFields && Object.entries(config.arrayFields).map(([field, fieldConfig]) => (
                    <div key={field} className="grid gap-1">
                      <Label className="text-xs">{fieldConfig.label}</Label>
                      <Input
                        type={fieldConfig.type}
                        value={item[field] || ''}
                        onChange={(e) => updateArrayField(index, field, e.target.value)}
                        className="h-8"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addArrayItem}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar elemento
            </Button>
          </div>
        </div>
      );
    }

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

  // Check if any field is a richtext field or visual array
  const hasRichText = Object.values(fields).some(field => field.type === 'richtext');
  const hasVisualArray = Object.values(fields).some(field => field.type === 'visual-array');

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
        <DialogContent className={`sm:max-w-[425px] ${hasRichText || hasVisualArray ? 'sm:max-w-[90vw] overflow-y-scroll' : ''} text-neutral-700`}>
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
              name={`array_${reference}.${index}-${fieldName}${isHeader ? '_header' : ''}`}
              value={item[fieldName] || ''}
            />
          ))}
        </div>
      ))}
    </>
  );
} 