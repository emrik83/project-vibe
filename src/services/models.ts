import { apiClient } from '@/lib/api-client';
import type { Model } from '@/types/model';

export const modelsService = {
  async getAll(): Promise<Model[]> {
    try {
      const response = await apiClient.get<Model[]>('/models');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Model | null> {
    try {
      const response = await apiClient.get<Model>(`/models/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model:', error);
      return null;
    }
  },

  async create(modelData: any): Promise<Model> {
    try {
      const formData = new FormData();
      
      // Add model file
      if (modelData.modelFile) {
        formData.append('modelFile', modelData.modelFile);
      }

      // Add thumbnails
      if (modelData.thumbnails?.length) {
        modelData.thumbnails.forEach((file: File, index: number) => {
          formData.append(`thumbnail_${index}`, file);
        });
      }

      // Remove file-related properties before stringifying
      const { modelFile, thumbnails, ...restData } = modelData;

      // Add other data
      formData.append('data', JSON.stringify(restData));

      const response = await apiClient.upload('/models', formData);
      return response.data;
    } catch (error) {
      console.error('Error creating model:', error);
      throw error;
    }
  },

  async update(id: string, modelData: any): Promise<Model> {
    try {
      const formData = new FormData();
      
      if (modelData.modelFile) {
        formData.append('modelFile', modelData.modelFile);
      }

      if (modelData.thumbnails?.length) {
        modelData.thumbnails.forEach((file: File, index: number) => {
          formData.append(`thumbnail_${index}`, file);
        });
      }

      // Remove file-related properties before stringifying
      const { modelFile, thumbnails, ...restData } = modelData;

      // Add other data
      formData.append('data', JSON.stringify(restData));

      const response = await apiClient.upload(`/models/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/models/${id}`);
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  },

  async updateStats(id: string, stats: Partial<Model['stats']>): Promise<Model> {
    try {
      const response = await apiClient.put<Model>(`/models/${id}/stats`, { stats });
      return response.data;
    } catch (error) {
      console.error('Error updating model stats:', error);
      throw error;
    }
  }
};