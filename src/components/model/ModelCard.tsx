import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Download, Eye } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Model } from '@/types/model';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/models/${model.id}`} className="group">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
        {model.thumbnails?.[0] && (
          <img
            src={model.thumbnails[0]}
            alt={model.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {model.isPro && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            PRO
          </div>
        )}

        <button 
          onClick={handleLike}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between text-white text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {formatNumber(model.stats.views)}
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {formatNumber(model.stats.downloads)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium truncate">{model.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">{model.category}</span>
          {model.price > 0 ? (
            <span className="text-sm font-medium">${model.price}</span>
          ) : (
            <span className="text-sm text-green-600">Free</span>
          )}
        </div>
      </div>
    </Link>
  );
}