import React from 'react';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  children?: React.ReactNode;
}

export function FileDropzone({ 
  accept, 
  multiple = false, 
  onFilesSelected,
  children 
}: FileDropzoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onFilesSelected(files);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        {children || (
          <p className="text-gray-500">
            Drag and drop your files here or click to browse
          </p>
        )}
      </label>
    </div>
  );
}