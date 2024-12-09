import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { Model } from '@/types/model';

// Create separate stores for different data types
const modelStore = localforage.createInstance({
  name: 'viLibrary',
  storeName: 'models'
});

const fileStore = localforage.createInstance({
  name: 'viLibrary',
  storeName: 'files'
});

export const storage = {
  async getAllModels(): Promise<Model[]> {
    const models: Model[] = [];
    await modelStore.iterate((value: Model) => {
      models.push(value);
    });
    return models.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getModel(id: string): Promise<Model | null> {
    return await modelStore.getItem(id);
  },

  async saveModel(modelData: any): Promise<Model> {
    try {
      const id = uuidv4();
      
      // Save model file
      if (modelData.modelFile) {
        const modelFileKey = `model_${id}`;
        await fileStore.setItem(modelFileKey, modelData.modelFile);
      }

      // Save thumbnails and get their URLs
      const thumbnailUrls = await Promise.all(
        modelData.thumbnails.map(async (file: File, index: number) => {
          const thumbnailKey = `thumbnail_${id}_${index}`;
          await fileStore.setItem(thumbnailKey, file);
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
      await modelStore.setItem(id, model);

      return model;
    } catch (error) {
      console.error('Error saving model:', error);
      throw error;
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
        const modelFileKey = `model_${id}`;
        await fileStore.setItem(modelFileKey, modelData.modelFile);
      }

      // Update thumbnails if provided
      let thumbnailUrls = existingModel.thumbnails;
      if (modelData.thumbnails?.length) {
        thumbnailUrls = await Promise.all(
          modelData.thumbnails.map(async (file: File, index: number) => {
            const thumbnailKey = `thumbnail_${id}_${index}`;
            await fileStore.setItem(thumbnailKey, file);
            return URL.createObjectURL(file);
          })
        );
      }

      const updatedModel: Model = {
        ...existingModel,
        ...modelData,
        thumbnails: thumbnailUrls,
        id // Ensure ID remains unchanged
      };

      await modelStore.setItem(id, updatedModel);
      return updatedModel;
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  },

  async deleteModel(id: string): Promise<void> {
    try {
      // Delete model file
      await fileStore.removeItem(`model_${id}`);

      // Delete thumbnails
      const model = await this.getModel(id);
      if (model) {
        const thumbnailCount = model.thumbnails.length;
        for (let i = 0; i < thumbnailCount; i++) {
          await fileStore.removeItem(`thumbnail_${id}_${i}`);
        }
      }

      // Delete model metadata
      await modelStore.removeItem(id);
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  },

  async downloadModel(id: string): Promise<Blob | null> {
    try {
      return await fileStore.getItem(`model_${id}`);
    } catch (error) {
      console.error('Error downloading model:', error);
      return null;
    }
  }
};