import React from 'react';
import { X } from 'lucide-react';

interface ModelARPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: number;
  title: string;
}

export function ModelARPreviewModal({ isOpen, onClose, modelId, title }: ModelARPreviewModalProps) {
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
          <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">
                Model Preview
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Preview mode: Use mouse to rotate and scroll to zoom
          </div>
        </div>
      </div>
    </div>
  );
}