import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/lib/utils';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (version: 'original' | 'optimized') => void;
  hasOptimizedVersion: boolean;
  originalPolyCount: number;
  optimizedPolyCount?: number;
}

export function DownloadDialog({
  isOpen,
  onClose,
  onDownload,
  hasOptimizedVersion,
  originalPolyCount,
  optimizedPolyCount
}: DownloadDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium mb-4">Download Model</h3>
        
        <div className="space-y-4">
          {/* Original Version */}
          <button
            onClick={() => onDownload('original')}
            className={cn(
              'w-full p-4 rounded-lg border text-left hover:border-blue-500 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Original Version</span>
              <Download className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-sm text-gray-600">
              <div>Polygon count: {formatNumber(originalPolyCount)}</div>
              <div className="mt-1 text-gray-500">Original unmodified file</div>
            </div>
          </button>

          {/* Optimized Version */}
          {hasOptimizedVersion && optimizedPolyCount && (
            <button
              onClick={() => onDownload('optimized')}
              className={cn(
                'w-full p-4 rounded-lg border text-left hover:border-blue-500 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Optimized Version</span>
                <Download className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-sm">
                <div className="text-gray-600">
                  Polygon count: {formatNumber(optimizedPolyCount)}
                </div>
                <div className="text-green-600 mt-1">
                  {Math.round(((originalPolyCount - optimizedPolyCount) / originalPolyCount) * 100)}% reduction in polygon count
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}