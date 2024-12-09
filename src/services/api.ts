import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const modelService = {
  async getAllModels() {
    try {
      const response = await api.get('/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  async getModel(id: string) {
    try {
      const response = await api.get(`/models/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model:', error);
      throw error;
    }
  },

  async createModel(modelData: FormData) {
    try {
      const response = await api.post('/models', modelData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating model:', error);
      throw error;
    }
  },

  async updateModel(id: string, modelData: FormData) {
    try {
      const response = await api.put(`/models/${id}`, modelData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  },

  async deleteModel(id: string) {
    try {
      await api.delete(`/models/${id}`);
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  }
};