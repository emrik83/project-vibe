import { localStorageService } from '../storage/localStorageService';
import type { Model } from '@/types/model';

export const modelService = {
  async getAllModels(): Promise<Model[]> {
    try {
      const models = await localStorageService.list('models');
      return models.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },

  async getModel(id: string): Promise<Model | null> {
    try {
      return await localStorageService.get('models', id);
    } catch (error) {
      console.error('Error fetching model:', error);
      return null;
    }
  },

  async createModel(modelData: any): Promise<Model> {
    try {
      const id = localStorageService.generateId();

      // Save model file
      if (modelData.modelFile) {
        await localStorageService.set('files', `model_${id}`, modelData.modelFile);
      }

      // Save thumbnails
      const thumbnailUrls = await Promise.all(
        modelData.thumbnails.map(async (file: File, index: number) => {
          const key = `thumbnail_${id}_${index}`;
          await localStorageService.set('thumbnails', key, file);
          return URL.createObjectURL(file);
        })
      );

      // Create model object
      const model: Model = {
        id,
        title: modelData.title,
        description: modelData.description,
        category: modelData.category,
        subCategory: modelData.subCategory,
        style: modelData.style,
        materials: modelData.materials,
        isPro: modelData.isPro || false,
        price: modelData.price || 0,
        status: 'pending',
        thumbnails: thumbnailUrls,
        createdAt: new Date().toISOString(),
        format: modelData.modelFile?.name.split('.').pop() || '',
        polyCount: modelData.polyCount || 0,
        dimensions: modelData.dimensions || { width: 0, height: 0, depth: 0 },
        creator: {
          name: 'Demo User',
          avatar: 'https://source.unsplash.com/100x100/?avatar',
          rating: 5
        },
        stats: {
          likes: 0,
          downloads: 0,
          views: 0
        }
      };

      // Save model metadata
      await localStorageService.set('models', id, model);
      return model;
    } catch (error) {
      console.error('Error creating model:', error);
      throw new Error('Failed to save model');
    }
  },

  async updateModel(id: string, modelData: any): Promise<Model> {
    try {
      const existingModel = await this.getModel(id);
      if (!existingModel) {
        throw new Error('Model not found');
      }

      // Update model file if provided
      if (modelData.modelFile) {
        await localStorageService.set('files', `model_${id}`, modelData.modelFile);
      }

      // Update thumbnails if provided
      let thumbnailUrls = existingModel.thumbnails;
      if (modelData.thumbnails?.length) {
        // Remove old thumbnails
        for (let i = 0; i < existingModel.thumbnails.length; i++) {
          await localStorageService.remove('thumbnails', `thumbnail_${id}_${i}`);
        }

        // Save new thumbnails
        thumbnailUrls = await Promise.all(
          modelData.thumbnails.map(async (file: File, index: number) => {
            const key = `thumbnail_${id}_${index}`;
            await localStorageService.set('thumbnails', key, file);
            return URL.createObjectURL(file);
          })
        );
      }

      const updatedModel: Model = {
        ...existingModel,
        ...modelData,
        thumbnails: thumbnailUrls,
        id
      };

      await localStorageService.set('models', id, updatedModel);
      return updatedModel;
    } catch (error) {
      console.error('Error updating model:', error);
      throw new Error('Failed to update model');
    }
  },

  async deleteModel(id: string): Promise<void> {
    try {
      // Delete model file
      await localStorageService.remove('files', `model_${id}`);

      // Delete thumbnails
      const model = await this.getModel(id);
      if (model) {
        for (let i = 0; i < model.thumbnails.length; i++) {
          await localStorageService.remove('thumbnails', `thumbnail_${id}_${i}`);
        }
      }

      // Delete model metadata
      await localStorageService.remove('models', id);
    } catch (error) {
      console.error('Error deleting model:', error);
      throw new Error('Failed to delete model');
    }
  },

  async downloadModel(id: string): Promise<Blob | null> {
    try {
      return await localStorageService.get('files', `model_${id}`);
    } catch (error) {
      console.error('Error downloading model:', error);
      return null;
    }
  }
};