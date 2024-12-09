import React, { useState, useEffect } from 'react';
import { AlertCircle, Info, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ModelOptimizer } from '@/utils/modelOptimizer';
import { cn, formatNumber } from '@/lib/utils';

interface ModelOptimizerProps {
  file: File;
  onOptimized: (result: { 
    originalFile: File;
    optimizedFile: File;
    originalPolyCount: number;
    optimizedPolyCount: number;
  }) => void;
  onUseOriginal: (file: File) => void;
}

export function OptimizeModel({ file, onOptimized, onUseOriginal }: ModelOptimizerProps) {
  const [reduction, setReduction] = useState(50);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalPolyCount, setOriginalPolyCount] = useState<number | null>(null);
  const [optimizedPolyCount, setOptimizedPolyCount] = useState<number | null>(null);
  const [showOptimizedPreview, setShowOptimizedPreview] = useState(false);

  useEffect(() => {
    calculatePolyCount();
  }, [file]);

  const calculatePolyCount = async () => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const content = new TextDecoder().decode(arrayBuffer);
      const vertices = content.split('\n')
        .filter(line => line.startsWith('v '))
        .length;
      
      setOriginalPolyCount(vertices);
      calculateOptimizedCount(vertices, reduction);
    } catch (err) {
      setError('Failed to analyze model file');
    }
  };

  const calculateOptimizedCount = (original: number, reductionPercent: number) => {
    const reduced = Math.floor(original * (1 - reductionPercent / 100));
    setOptimizedPolyCount(reduced);
  };

  const handleReductionChange = (value: number) => {
    setReduction(value);
    if (originalPolyCount) {
      calculateOptimizedCount(originalPolyCount, value);
    }
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setError(null);

    try {
      const result = await ModelOptimizer.optimizeModel(file, reduction);
      setShowOptimizedPreview(true);
      onOptimized(result);
    } catch (err) {
      setError('Failed to optimize model. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6 border rounded-lg p-4">
      {/* Original File Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Original File</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUseOriginal(file)}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Use Original
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          <p>Name: {file.name}</p>
          <p>Polygons: {formatNumber(originalPolyCount || 0)}</p>
        </div>
      </div>

      {/* Optimization Controls */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Polygon Reduction</label>
          <span className="text-sm">{reduction}%</span>
        </div>

        <Slider
          value={reduction}
          onChange={handleReductionChange}
          min={10}
          max={90}
          step={10}
          disabled={isOptimizing}
        />

        <p className="text-xs text-gray-500 mt-2">
          Move the slider to adjust optimization level. Higher values mean more reduction.
        </p>
      </div>

      {/* Preview Section */}
      {optimizedPolyCount && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Optimization Preview</h3>
          <div className="text-sm text-gray-600">
            <p>Original polygons: {formatNumber(originalPolyCount || 0)}</p>
            <p>Optimized polygons: {formatNumber(optimizedPolyCount)}</p>
            <p className="text-green-600 mt-1">
              {Math.round(((originalPolyCount || 0) - optimizedPolyCount) / (originalPolyCount || 1) * 100)}% reduction
            </p>
          </div>
        </div>
      )}

      {/* Optimization Button */}
      <Button
        onClick={handleOptimize}
        disabled={isOptimizing}
        className="w-full"
      >
        {isOptimizing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Optimizing...
          </span>
        ) : (
          <>
            Apply Optimization
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Optimized Version Preview */}
      {showOptimizedPreview && (
        <div className="border-t pt-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Optimized Version</h3>
            <div className="text-sm text-gray-600">
              <p>Name: {file.name.replace('.obj', '_optimized.obj')}</p>
              <p>Polygons: {formatNumber(optimizedPolyCount || 0)}</p>
              <p className="text-green-600 mt-1">Ready for use</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}