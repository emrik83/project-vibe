import { MaterialCategory } from './materials';

export type ModelStyle = 
  | 'Modern'
  | 'Classic'
  | 'Contemporary'
  | 'Industrial'
  | 'Minimalist'
  | 'Traditional'
  | 'Art Deco'
  | 'Scandinavian'
  | 'Bohemian'
  | 'Mid-Century Modern';

export interface Model {
  id: number | string;
  title: string;
  category: string;
  subCategory?: string;
  style?: ModelStyle;
  creator: {
    name: string;
    avatar: string;
    rating: number;
  };
  isPro: boolean;
  price: number;
  stats: {
    likes: number;
    downloads: number;
    views: number;
  };
  status: 'active' | 'pending' | 'reported';
  thumbnails: string[];
  createdAt: string;
  description?: string;
  materials?: MaterialCategory[];
  polyCount?: number;
  format?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  originalVersion?: {
    file: File;
    polyCount: number;
  };
  optimizedVersion?: {
    file: File;
    polyCount: number;
  };
}

export const modelStyles: ModelStyle[] = [
  'Modern',
  'Classic',
  'Contemporary',
  'Industrial',
  'Minimalist',
  'Traditional',
  'Art Deco',
  'Scandinavian',
  'Bohemian',
  'Mid-Century Modern'
];

export const categories: Record<string, string[]> = {
  'Decoration': [
    'Decorative plaster', '3D panel', 'Curtain', 'Mirror', 'Frame',
    'Vase', 'Books', 'Pillows', 'Carpets', 'Decorative set',
    'Sculpture', 'Other decorative objects', 'Clothes', 'Footwear',
    'Watches & Clocks'
  ],
  'Childroom': [
    'Full furniture set', 'Bed', 'Table + Chair', 'Wardrobe',
    'Toy', 'Miscellaneous'
  ],
  'Furniture': [
    'Dressing table', 'Hallway', 'Rack', 'TV Wall', 'Console',
    'Wardrobe & Display cabinets', 'Sofa', 'Table', 'Chair',
    'Other', 'Bed', 'Sideboard & Chest of drawer', 'Office furniture',
    'Arm chair', 'Other soft seating', 'Table + Chair'
  ],
  'Kitchen': [
    'Tableware', 'Kitchen', 'Kitchen appliance', 'Other kitchen accessories',
    'Food and drinks', 'Sink', 'Faucet'
  ],
  'Bathroom': [
    'Wash basin', 'Toilet and Bidet', 'Bathtub', 'Shower',
    'Bathroom furniture', 'Faucet', 'Towel rail', 'Bathroom accessories'
  ],
  'Lighting': [
    'Pendant light', 'Ceiling lamp', 'Neon', 'Wall light',
    'Floor lamp', 'Table lamp', 'Spot light', 'Street lighting',
    'Technical lighting'
  ],
  'Plants': [
    'Bouquet', 'Indoor', 'Fitowall', 'Tree', 'Bush',
    'Grass', 'Outdoor'
  ],
  'Architecture': [
    'Barbecue and grill', 'Fence', 'Paving', 'Building',
    'Playground', 'Other', 'Environment elements', 'Facade element',
    'Urban environment'
  ],
  'Technology': [
    'PC & other electronics', 'Household appliance', 'TV',
    'Phones', 'Audio tech', 'Miscellaneous'
  ],
  'Materials': [
    'Metal', 'Ceramic', 'Concrete', 'Stone', 'Interior Paint',
    'Plaster/Stucco', 'Glass', 'Leather', 'Wood', 'Mosaic',
    'Fabric', 'Liquid', 'Parquet', 'Gemstone', 'Carpaint',
    'Plastic'
  ]
};