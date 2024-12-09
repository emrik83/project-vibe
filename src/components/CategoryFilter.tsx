import React, { useState } from 'react';
import { categories } from '../types/model';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  onCategorySelect: (category: string, subCategory?: string) => void;
}

export function CategoryFilter({ onCategorySelect }: CategoryFilterProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow">
      {Object.entries(categories).map(([category, subCategories]) => (
        <div key={category} className="border-b last:border-b-0">
          <button
            onClick={() => {
              setExpandedCategory(expandedCategory === category ? null : category);
              onCategorySelect(category);
            }}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-medium">{category}</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${
              expandedCategory === category ? 'rotate-180' : ''
            }`} />
          </button>
          {expandedCategory === category && (
            <div className="bg-gray-50 px-4 py-2">
              {subCategories.map(subCategory => (
                <button
                  key={subCategory}
                  onClick={() => onCategorySelect(category, subCategory)}
                  className="w-full text-left py-2 text-sm text-gray-600 hover:text-black"
                >
                  {subCategory}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}