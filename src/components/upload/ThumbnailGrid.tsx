import React from 'react';
import { Plus, X } from 'lucide-react';

interface ThumbnailGridProps {
  thumbnails: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxThumbnails?: number;
}

export function ThumbnailGrid({ 
  thumbnails, 
  onAdd, 
  onRemove, 
  maxThumbnails = 4 
}: ThumbnailGridProps) {
  const remainingSlots = maxThumbnails - thumbnails.length;

  return (
    <div className="grid grid-cols-4 gap-4">
      {thumbnails.map((thumbnail, index) => (
        <div key={index} className="relative aspect-square">
          <img
            src={thumbnail}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      ))}
      {remainingSlots > 0 && Array.from({ length: remainingSlots }).map((_, i) => (
        <button
          key={`empty-${i}`}
          onClick={onAdd}
          className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          <Plus className="h-6 w-6 text-gray-400" />
        </button>
      ))}
    </div>
  );
}