import { create } from 'zustand';
import type { Model } from '@/types/model';
import { storage } from '@/utils/storage';

interface ModelState {
  models: Model[];
  filteredModels: Model[];
  filters: {
    category?: string;
    subCategory?: string;
    polygoncount?: string[];
    format?: string[];
    rating?: string[];
    downloads?: string[];
    style?: string[];
    materials?: string[];
  };
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: Partial<ModelState['filters']>) => void;
  addModel: (model: Model) => void;
  clearFilters: () => void;
  loadModels: () => Promise<void>;
  downloadModel: (id: string) => Promise<void>;
}

export const useModelStore = create<ModelState>((set, get) => ({
  models: [],
  filteredModels: [],
  filters: {},
  isLoading: false,
  error: null,
  
  setFilters: (newFilters) => 
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      let filteredModels = state.models;
      
      if (filters.category) {
        filteredModels = filteredModels.filter(model => model.category === filters.category);
      }
      
      if (filters.subCategory) {
        filteredModels = filteredModels.filter(model => model.subCategory === filters.subCategory);
      }

      if (filters.style?.length) {
        filteredModels = filteredModels.filter(model => 
          model.style && filters.style?.includes(model.style)
        );
      }

      if (filters.materials?.length) {
        filteredModels = filteredModels.filter(model =>
          model.materials?.some(material => 
            filters.materials?.includes(material)
          )
        );
      }

      return { filters, filteredModels };
    }),

  addModel: (model) =>
    set((state) => {
      const newModels = [...state.models, model];
      return {
        models: newModels,
        filteredModels: state.filters.category ? 
          newModels.filter(m => m.category === state.filters.category) : 
          newModels
      };
    }),

  clearFilters: () => set({ filters: {}, filteredModels: [] }),

  loadModels: async () => {
    set({ isLoading: true, error: null });
    try {
      const models = await storage.getAllModels();
      set({ models, filteredModels: [], isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load models',
        isLoading: false 
      });
    }
  },

  downloadModel: async (id: string) => {
    try {
      const modelBlob = await storage.downloadModel(id);
      if (!modelBlob) return;

      const model = get().models.find(m => m.id === id);
      if (!model) return;

      const url = URL.createObjectURL(modelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${model.title}.${model.format || 'obj'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Update download count
      await storage.updateModel(id, {
        ...model,
        stats: {
          ...model.stats,
          downloads: (model.stats.downloads || 0) + 1
        }
      });
      
      // Refresh models list
      get().loadModels();
    } catch (error) {
      console.error('Error downloading model:', error);
    }
  }
}));