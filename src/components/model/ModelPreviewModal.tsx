import React from 'react';
import { X } from 'lucide-react';

interface ModelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: number;
  title: string;
  imageUrl: string;
}

export function ModelPreviewModal({ isOpen, onClose, modelId, title, imageUrl }: ModelPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">
          <h3 className="text-xl font-medium mb-4">{title}</h3>
          <div className="aspect-[16/9] rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}