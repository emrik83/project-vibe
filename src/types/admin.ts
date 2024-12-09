export interface CategoryContent {
  id: string;
  name: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ContentImage {
  id: string;
  url: string;
  alt: string;
  category?: string;
  subCategory?: string;
}

export interface SiteContent {
  id: string;
  section: string;
  title: string;
  description: string;
  image?: string;
}

export type FileUploadStatus = {
  progress: number;
  error?: string;
  success: boolean;
};