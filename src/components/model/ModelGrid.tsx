import React from 'react';
import { ModelCard } from './ModelCard';
import type { Model } from '@/types/model';

interface ModelGridProps {
  models: Model[];
}

export function ModelGrid({ models }: ModelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
        />
      ))}
    </div>
  );
}