'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { GripVertical, Minimize2, Maximize2 } from "lucide-react";

interface DraggableCardProps {
  domain: string;
}

export function DraggableCard({ domain }: DraggableCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize position to bottom right
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth - (cardRef.current?.offsetWidth || 320) - 48,
        y: window.innerHeight - (cardRef.current?.offsetHeight || 120) - 48
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setInitialPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - initialPos.x;
      const newY = e.clientY - initialPos.y;
      
      // Ensure the card stays within viewport bounds
      const maxX = window.innerWidth - (cardRef.current?.offsetWidth || 320);
      const maxY = window.innerHeight - (cardRef.current?.offsetHeight || 120);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Card 
      ref={cardRef}
      className="z-40 fixed w-full max-w-sm h-auto rounded-lg shadow-lg bg-nautBg"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        boxShadow: isDragging ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div 
        className="flex items-center justify-between px-4 pt-4 pb-4 border-b cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GripVertical size={16} />
        </div>
        <div className="flex items-center gap-2">
          {isDragging && (
            <div className="text-xs text-muted-foreground mr-2">
              {Math.round(position.x)}, {Math.round(position.y)}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={toggleMinimize}
            title={isMinimized ? "Expandir" : "Minimizar"}
            type="button"
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <CardHeader>
          <Button
            variant="outline"
            asChild
            className="text-input cursor-pointer"
          >
            <Link href={`/sitio/${domain}/paginas`}>
              Salir sin guardar
            </Link>
          </Button>
          <SubmitButton />
        </CardHeader>
      )}
    </Card>
  );
} 