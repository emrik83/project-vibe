import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizeModel } from '@/components/upload/ModelOptimizer';

interface FileUploadProps {
  onFileSelect: (result: {
    file: File;
    originalFile?: File;
    optimizedFile?: File;
    polyCount?: number;
  }) => void;
  accept?: string;
  preview?: boolean;
  multiple?: boolean;
  currentImage?: string;
  currentFile?: File;
  type?: 'image' | 'model';
}

export function FileUpload({ 
  onFileSelect, 
  accept,
  preview = false,
  multiple = false,
  currentImage,
  currentFile,
  type = 'image'
}: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(currentFile || null);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (type === 'image') {
      const allowedImageTypes = ['image/jpeg', 'image/png'];
      if (!allowedImageTypes.includes(file.type)) {
        alert('Please upload only JPG or PNG images');
        return false;
      }
      return true;
    } else if (type === 'model') {
      const allowedModelExtensions = ['.fbx', '.obj', '.max'];
      const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!allowedModelExtensions.includes(extension)) {
        alert('Please upload only .fbx, .obj, or .max files');
        return false;
      }
      return true;
    }
    return false;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      
      if (type === 'model' && file.name.toLowerCase().endsWith('.obj')) {
        setShowOptimizer(true);
      } else {
        onFileSelect({ file });
      }

      if (preview && type === 'image') {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleOptimized = (result: {
    originalFile: File;
    optimizedFile: File;
    originalPolyCount: number;
    optimizedPolyCount: number;
  }) => {
    onFileSelect({
      file: result.optimizedFile,
      originalFile: result.originalFile,
      optimizedFile: result.optimizedFile,
      polyCount: result.optimizedPolyCount
    });
  };

  const handleUseOriginal = (file: File) => {
    setShowOptimizer(false);
    onFileSelect({
      file,
      originalFile: file,
      polyCount: Math.floor(file.size / 50)
    });
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      
      if (type === 'model' && file.name.toLowerCase().endsWith('.obj')) {
        setShowOptimizer(true);
      } else {
        onFileSelect({ file });
      }

      if (preview && type === 'image') {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setShowOptimizer(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Original Model File Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          multiple={multiple}
          className="hidden"
          id={`file-upload-${type}`}
        />
        <label 
          htmlFor={`file-upload-${type}`}
          className="cursor-pointer block"
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {selectedFile ? selectedFile.name : 'Drag and drop your file here or click to browse'}
          </span>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: {type === 'image' ? '.jpg, .png' : '.fbx, .obj, .max'}
          </p>
        </label>
      </div>

      {/* Model Optimizer */}
      {showOptimizer && selectedFile && (
        <OptimizeModel
          file={selectedFile}
          onOptimized={handleOptimized}
          onUseOriginal={handleUseOriginal}
        />
      )}

      {/* Image Preview */}
      {preview && previewUrl && type === 'image' && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}