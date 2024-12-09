import React from 'react';

interface AuthToggleProps {
  activeType: 'member' | 'vendor';
  onChange: (type: 'member' | 'vendor') => void;
}

export function AuthToggle({ activeType, onChange }: AuthToggleProps) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        className={`flex-1 pb-4 text-sm font-medium transition-colors ${
          activeType === 'member'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('member')}
      >
        VIBE Member Login
      </button>
      <button
        className={`flex-1 pb-4 text-sm font-medium transition-colors ${
          activeType === 'vendor'
            ? 'border-b-2 border-black text-black'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onChange('vendor')}
      >
        Vendor Login
      </button>
    </div>
  );
}