import React from 'react';

interface UploadProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function UploadProgress({ currentStep, totalSteps }: UploadProgressProps) {
  return (
    <div className="flex items-center mb-12">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${currentStep === index + 1 ? 'bg-black text-white' : 
              currentStep > index + 1 ? 'bg-green-500 text-white' : 
              'bg-gray-200 text-gray-500'}
          `}>
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-20 h-0.5 ${
              currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}