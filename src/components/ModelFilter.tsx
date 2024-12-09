import React, { useState } from 'react';
import { Filter as FilterIcon, ChevronDown } from 'lucide-react';
import { useModelStore } from '../stores/modelStore';

const filterCategories = {
  'Polygon Count': [
    { label: 'Low (< 1000)', value: 'low' },
    { label: 'Medium (1000-5000)', value: 'medium' },
    { label: 'High (> 5000)', value: 'high' }
  ],
  'Rating': [
    { label: '4+ Stars', value: '4' },
    { label: '3+ Stars', value: '3' },
    { label: '2+ Stars', value: '2' }
  ],
  'Downloads': [
    { label: 'Most Downloaded', value: 'most' },
    { label: '1000+', value: '1000plus' },
    { label: '500+', value: '500plus' }
  ],
  'Format': [
    { label: '.fbx', value: 'fbx' },
    { label: '.obj', value: 'obj' },
    { label: '.max', value: 'max' }
  ],
  'Style': [
    { label: 'Modern', value: 'modern' },
    { label: 'Classic', value: 'classic' },
    { label: 'Minimalist', value: 'minimalist' }
  ],
  'Materials': [
    { label: 'Metal', value: 'metal' },
    { label: 'Wood', value: 'wood' },
    { label: 'Glass', value: 'glass' },
    { label: 'Plastic', value: 'plastic' }
  ],
  'Sort By': [
    { label: 'Newest First', value: 'newest' },
    { label: 'Most Downloaded', value: 'mostDownloaded' },
    { label: 'Most Liked', value: 'mostLiked' }
  ]
};

export function ModelFilter() {
  const [showFilters, setShowFilters] = useState(false);
  const { filters, setFilters, clearFilters } = useModelStore();
  const filterRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (category: string, value: string) => {
    const filterKey = category.toLowerCase().replace(/\s+/g, '') as keyof typeof filters;
    
    if (category === 'Sort By') {
      setFilters({ sortBy: value as any });
      return;
    }

    setFilters(prev => {
      const currentFilters = { ...prev };
      
      if (!currentFilters[filterKey]) {
        currentFilters[filterKey] = [];
      }

      const filterArray = currentFilters[filterKey] as string[];
      const valueIndex = filterArray.indexOf(value);

      if (valueIndex === -1) {
        filterArray.push(value);
      } else {
        filterArray.splice(valueIndex, 1);
      }

      if (filterArray.length === 0) {
        delete currentFilters[filterKey];
      } else {
        currentFilters[filterKey] = filterArray;
      }

      return currentFilters;
    });
  };

  const isFilterActive = (category: string, value: string) => {
    if (category === 'Sort By') {
      return filters.sortBy === value;
    }
    
    const filterKey = category.toLowerCase().replace(/\s+/g, '') as keyof typeof filters;
    return filters[filterKey]?.includes(value) || false;
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).length;
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 w-full md:w-auto justify-center md:justify-start"
      >
        <FilterIcon className="h-4 w-4" />
        <span>Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}</span>
        <ChevronDown className={`h-4 w-4 transform transition-transform ${
          showFilters ? 'rotate-180' : ''
        }`} />
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] md:w-[800px] bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(filterCategories).map(([category, options]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm mb-2">{category}</h4>
                  <div className="space-y-2">
                    {options.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type={category === 'Sort By' ? 'radio' : 'checkbox'}
                          checked={isFilterActive(category, option.value)}
                          onChange={() => handleFilterChange(category, option.value)}
                          className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                          name={category === 'Sort By' ? 'sortBy' : undefined}
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {getActiveFiltersCount()} filters applied
              </div>
              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}