import { useState } from 'react';
import { storage, ModelUpload } from '../utils/storage';
import { Model } from '../types/model';

export function useModelUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadModel = async (modelData: ModelUpload): Promise<Model | null> => {
    try {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      // Validate files
      if (!modelData.modelFile) {
        throw new Error('Model file is required');
      }
      if (modelData.thumbnails.length === 0) {
        throw new Error('At least one thumbnail is required');
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      // Save model
      const savedModel = await storage.saveModel(modelData);

      clearInterval(progressInterval);
      setProgress(100);
      
      return savedModel;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload model');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadModel,
    isUploading,
    progress,
    error
  };
}