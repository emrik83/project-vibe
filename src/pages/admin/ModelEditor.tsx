import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/admin/FileUpload';
import { MaterialSelector } from '@/components/admin/MaterialSelector';
import { useModelStore } from '@/stores/modelStore';
import { categories, modelStyles } from '@/types/model';
import type { MaterialCategory } from '@/types/materials';
import type { Model } from '@/types/model';
import { modelService } from '@/services/models/modelService';

export function ModelEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadModels } = useModelStore();
  const [model, setModel] = useState<Partial<Model>>({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    style: 'Modern',
    price: 0,
    isPro: false,
    status: 'pending',
    polyCount: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0
    },
    materials: [],
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
  });

  const [modelFile, setModelFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadModel(id);
    }
  }, [id]);

  const loadModel = async (modelId: string) => {
    try {
      const loadedModel = await modelService.getModel(modelId);
      if (loadedModel) {
        setModel(loadedModel);
      }
    } catch (err) {
      setError('Failed to load model');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('dimensions.')) {
      const dimension = name.split('.')[1];
      setModel(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: parseFloat(value) || 0
        }
      }));
    } else {
      setModel(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setModel(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleMaterialsChange = (materials: MaterialCategory[]) => {
    setModel(prev => ({
      ...prev,
      materials
    }));
  };

  const handleModelFileSelect = (result: { file: File }) => {
    setModelFile(result.file);
    setModel(prev => ({
      ...prev,
      format: result.file.name.split('.').pop() || '',
    }));
  };

  const handleThumbnailSelect = (result: { file: File }) => {
    setThumbnails(prev => [...prev, result.file]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!model.title || !model.category) {
        throw new Error('Title and category are required');
      }

      if (!modelFile && !id) {
        throw new Error('Model file is required');
      }

      if (thumbnails.length === 0 && !id) {
        throw new Error('At least one thumbnail is required');
      }

      const modelData = {
        ...model,
        modelFile,
        thumbnails
      };

      if (id) {
        await modelService.updateModel(id, modelData);
      } else {
        await modelService.createModel(modelData);
      }

      await loadModels();
      navigate('/admin/models');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save model');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/models')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-medium">
            {id ? 'Edit Model' : 'New Model'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/models')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={model.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            name="category"
            value={model.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {model.category && (
          <div>
            <label className="block text-sm font-medium mb-2">Subcategory</label>
            <select
              name="subCategory"
              value={model.subCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-md"
            >
              <option value="">Select Subcategory</option>
              {categories[model.category]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Style</label>
          <select
            name="style"
            value={model.style}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
          >
            <option value="">Select Style</option>
            {modelStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={model.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Model File *</label>
          <FileUpload
            type="model"
            accept=".fbx,.obj,.max"
            onFileSelect={handleModelFileSelect}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Thumbnails *</label>
          <FileUpload
            type="image"
            accept=".jpg,.jpeg,.png"
            preview={true}
            multiple={true}
            onFileSelect={handleThumbnailSelect}
          />
          {thumbnails.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              {thumbnails.length} thumbnail(s) selected
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Materials</label>
          <MaterialSelector
            selectedMaterials={model.materials as MaterialCategory[] || []}
            onChange={handleMaterialsChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dimensions (cm)</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                type="number"
                name="dimensions.width"
                value={model.dimensions?.width}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-200 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                type="number"
                name="dimensions.height"
                value={model.dimensions?.height}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-200 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Depth</label>
              <input
                type="number"
                name="dimensions.depth"
                value={model.dimensions?.depth}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-200 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPro"
              checked={model.isPro}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
            />
            <span className="text-sm">PRO Model</span>
          </label>
        </div>
      </div>
    </div>
  );
}