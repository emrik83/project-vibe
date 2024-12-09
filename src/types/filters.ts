export interface ModelFilters {
  category?: string;
  subCategory?: string;
  polygoncount?: string[];
  format?: string[];
  style?: string[];
  materials?: string[];
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterCategory {
  name: string;
  options: FilterOption[];
}

export const filterCategories: FilterCategory[] = [
  {
    name: 'Polygon Count',
    options: [
      { label: 'Low (< 1000)', value: 'low' },
      { label: 'Medium (1000-5000)', value: 'medium' },
      { label: 'High (> 5000)', value: 'high' }
    ]
  },
  {
    name: 'Format',
    options: [
      { label: '.fbx', value: 'fbx' },
      { label: '.obj', value: 'obj' },
      { label: '.max', value: 'max' }
    ]
  },
  {
    name: 'Style',
    options: [
      { label: 'Modern', value: 'modern' },
      { label: 'Classic', value: 'classic' },
      { label: 'Minimalist', value: 'minimalist' }
    ]
  },
  {
    name: 'Materials',
    options: [
      { label: 'Metal', value: 'metal' },
      { label: 'Wood', value: 'wood' },
      { label: 'Glass', value: 'glass' },
      { label: 'Plastic', value: 'plastic' }
    ]
  }
];