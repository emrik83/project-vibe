import React from 'react';
import { MaterialCategory } from '../../types/materials';

interface MaterialSelectorProps {
  selectedMaterials: MaterialCategory[];
  onChange: (materials: MaterialCategory[]) => void;
}

export function MaterialSelector({ selectedMaterials, onChange }: MaterialSelectorProps) {
  const materialCategories: MaterialCategory[] = [
    'Metal',
    'Ceramic',
    'Concrete',
    'Stone',
    'Interior Paint',
    'Plaster/Stucco',
    'Glass',
    'Leather',
    'Wood',
    'Mosaic',
    'Fabric',
    'Liquid',
    'Parquet',
    'Gemstone',
    'Carpaint',
    'Plastic'
  ];

  const handleMaterialToggle = (material: MaterialCategory) => {
    if (selectedMaterials.includes(material)) {
      onChange(selectedMaterials.filter(m => m !== material));
    } else {
      onChange([...selectedMaterials, material]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {materialCategories.map((material) => (
          <label
            key={material}
            className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedMaterials.includes(material)}
              onChange={() => handleMaterialToggle(material)}
              className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
            />
            <span className="text-sm">{material}</span>
          </label>
        ))}
      </div>
    </div>
  );
}