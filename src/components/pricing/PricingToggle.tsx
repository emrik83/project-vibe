import React from 'react';

interface PricingToggleProps {
  period: 'monthly' | 'yearly';
  onChange: (period: 'monthly' | 'yearly') => void;
}

export function PricingToggle({ period, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        className={`px-4 py-2 text-sm rounded-md transition-colors ${
          period === 'monthly' ? 'bg-white shadow' : ''
        }`}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 text-sm rounded-md transition-colors ${
          period === 'yearly' ? 'bg-white shadow' : ''
        }`}
        onClick={() => onChange('yearly')}
      >
        Yearly (Save 20%)
      </button>
    </div>
  );
}