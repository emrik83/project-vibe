import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/admin/FileUpload';
import { MaterialSelector } from '@/components/admin/MaterialSelector';
import { useModelStore } from '@/stores/modelStore';
import { categories, modelStyles } from '@/types/model';
import type { MaterialCategory } from '@/types/materials';
import type { Model } from '@/types/model';

function UploadPage() {
  const navigate = useNavigate();
  const { loadModels } = useModelStore();
  const [currentStep, setCurrentStep] = useState(1);
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

  const [originalVersion, setOriginalVersion] = useState<{
    file: File;
    polyCount: number;
  } | null>(null);

  const [optimizedVersion, setOptimizedVersion] = useState<{
    file: File;
    polyCount: number;
  } | null>(null);

  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleModelFileSelect = (result: {
    file: File;
    originalFile?: File;
    optimizedFile?: File;
    polyCount?: number;
  }) => {
    if (result.originalFile && result.optimizedFile) {
      // Both original and optimized versions available
      setOriginalVersion({
        file: result.originalFile,
        polyCount: Math.floor(result.originalFile.size / 50)
      });
      setOptimizedVersion({
        file: result.optimizedFile,
        polyCount: result.polyCount || Math.floor(result.optimizedFile.size / 50)
      });
    } else {
      // Only original version
      setOriginalVersion({
        file: result.file,
        polyCount: result.polyCount || Math.floor(result.file.size / 50)
      });
    }

    setModel(prev => ({
      ...prev,
      format: result.file.name.split('.').pop() || '',
      polyCount: result.polyCount || Math.floor(result.file.size / 50)
    }));
  };

  const handleThumbnailSelect = (result: { file: File }) => {
    setThumbnails(prev => [...prev, result.file]);
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      setError(null);

      if (!model.title || !model.category) {
        throw new Error('Title and category are required');
      }

      if (!originalVersion?.file || thumbnails.length === 0) {
        throw new Error('Model file and thumbnails are required');
      }

      const modelUpload = {
        ...model,
        originalVersion,
        optimizedVersion,
        thumbnails
      };

      await loadModels();
      navigate('/models');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload model');
    } finally {
      setIsUploading(false);
    }
  };

  const steps = [
    'Basic Information',
    'Technical Details',
    'Files & Preview'
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-light">Upload 3D Model</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep === index + 1 ? 'bg-black text-white' : 
                  currentStep > index + 1 ? 'bg-green-500 text-white' : 
                  'bg-gray-200 text-gray-500'}
              `}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 ${
                  currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
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
            </div>
          )}

          {/* Step 2: Technical Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
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

              <div>
                <label className="block text-sm font-medium mb-2">Materials</label>
                <MaterialSelector
                  selectedMaterials={model.materials as MaterialCategory[] || []}
                  onChange={handleMaterialsChange}
                />
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
          )}

          {/* Step 3: Files & Preview */}
          {currentStep === 3 && (
            <div className="space-y-8">
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
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isUploading}
                className="ml-auto"
              >
                {isUploading ? 'Uploading...' : 'Upload Model'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;