"use client";

import { useState } from 'react'
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, List, ListOrdered } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function EditorToolbar({ editor }: { editor: any }) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b text-neutral-600 font-bergern">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
        className={`p-2 ${editor.isActive('bold') ? 'bg-primary/20' : ''}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
        className={`p-2 ${editor.isActive('italic') ? 'bg-primary/20' : ''}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        type="button"
        className={`p-2 ${editor.isActive('underline') ? 'bg-primary/20' : ''}`}
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <button
          onClick={() => setIsLinkDialogOpen(true)}
          type="button"
          className={`p-2 ${editor.isActive('link') ? 'bg-primary/20' : ''}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar hipervinculo</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Ingresar URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                if (linkUrl) {
                  editor.chain().focus().setLink({ href: linkUrl }).run()
                }
                setLinkUrl("")
                setIsLinkDialogOpen(false)
              }}
            >
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type="button"
        className={`p-2 ${editor.isActive('orderedList') ? 'bg-primary/20' : ''}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type="button"
        className={`p-2 ${editor.isActive('bulletList') ? 'bg-primary/20' : ''}`}
      >
        <List className="w-4 h-4" />
      </button>
      <Select 
        onValueChange={(value: string) => editor.chain().focus().setColor(value).run()}
        defaultValue="hsl(var(--text))"
      >
        <SelectTrigger className="w-[100px] bg-bg2">
          <SelectValue>Color</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hsl(var(--text))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--text))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--title))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--title))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--primary))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--primary))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--color2))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--color2))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--color3))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--color3))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--background))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--background))] rounded-sm" />
            </div>
          </SelectItem>
          <SelectItem value="hsl(var(--background2))">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[hsl(var(--background2))] rounded-sm" />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select 
        onValueChange={(value: string) => {
          const level = parseInt(value)
          if (level === 0) {
            editor.chain().focus().setParagraph().run()
          } else {
            editor.chain().focus().toggleHeading({ level }).run()
          }
        }}
        defaultValue="0"
      >
        <SelectTrigger className="w-[110px] bg-bg2">
          <SelectValue>Estilo</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Texto</SelectItem>
          <SelectItem value="1">H1</SelectItem>
          <SelectItem value="2">H2</SelectItem>
          <SelectItem value="3">H3</SelectItem>
          <SelectItem value="4">H4</SelectItem>
          <SelectItem value="5">H5</SelectItem>
          <SelectItem value="6">H6</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

interface RichTextEditorProps {
  content: string
  edit: boolean
  name: string
  onChange?: (value: string) => void
}

export default function RichText({ content, edit, name, onChange }: RichTextEditorProps) {
  const [editorContent, setEditorContent] = useState(content)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline'
        }
      }),
      TextStyle,
      Color,
      Underline
    ],
    content: content,
    editable: edit,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setEditorContent(html)
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none'
      }
    },
    enableInputRules: true,
    enablePasteRules: true,
    immediatelyRender: false
  })

  if (typeof window === 'undefined') {
    return (
      <div
        className="rich-text-container text-base leading-7 text-text"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  if (edit) {
    return (
      <div className="prose max-w-none">
        <div className="border rounded-lg">
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} className="p-4 rich-text-container" />
          <input type="hidden" name={name} value={editorContent} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="rich-text-container text-base leading-7 text-text"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}