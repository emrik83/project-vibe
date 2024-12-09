export type MaterialCategory = 
  | 'Metal'
  | 'Ceramic'
  | 'Concrete'
  | 'Stone'
  | 'Interior Paint'
  | 'Plaster/Stucco'
  | 'Glass'
  | 'Leather'
  | 'Wood'
  | 'Mosaic'
  | 'Fabric'
  | 'Liquid'
  | 'Parquet'
  | 'Gemstone'
  | 'Carpaint'
  | 'Plastic';

export interface MaterialProperties {
  roughness?: number;
  metallic?: number;
  opacity?: number;
  normalStrength?: number;
  displacement?: number;
  emission?: number;
}

export interface Material {
  category: MaterialCategory;
  name: string;
  preview: string;
  properties: MaterialProperties;
  maps: {
    diffuse?: string;
    normal?: string;
    roughness?: string;
    metallic?: string;
    displacement?: string;
    emission?: string;
  };
}