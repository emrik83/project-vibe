import { Model } from './model';

export interface ApiResponse<T = any> {
  data: T;
  error?: string;
}

export interface ModelResponse extends ApiResponse<Model> {}

export interface ModelsResponse extends ApiResponse<Model[]> {}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface UploadResponse {
  url: string;
  fileId: string;
}

export interface ModelUploadData {
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  style?: string;
  materials?: string[];
  isPro: boolean;
  price: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}