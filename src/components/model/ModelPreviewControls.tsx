import React from 'react';
import { Expand, View, Download } from 'lucide-react';

interface ModelPreviewControlsProps {
  onViewAR: () => void;
  onFullscreen: () => void;
  onDownload: () => void;
}

export function ModelPreviewControls({ onViewAR, onFullscreen, onDownload }: ModelPreviewControlsProps) {
  return (
    <div className="absolute bottom-2 right-2 flex gap-2">
      <button 
        onClick={onViewAR}
        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        title="View in AR"
      >
        <View className="h-4 w-4 text-gray-700" />
      </button>
      <button 
        onClick={onFullscreen}
        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        title="Full Screen"
      >
        <Expand className="h-4 w-4 text-gray-700" />
      </button>
      <button 
        onClick={onDownload}
        className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
        title="Download"
      >
        <Download className="h-4 w-4 text-gray-700" />
      </button>
    </div>
  );
}