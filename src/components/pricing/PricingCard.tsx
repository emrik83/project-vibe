import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({ 
  name, 
  description, 
  price, 
  period, 
  features, 
  isPopular 
}: PricingCardProps) {
  return (
    <div className={`relative bg-white rounded-lg p-8 ${
      isPopular ? 'border-2 border-black shadow-lg' : 'border border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2">
          <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-light">${price}</span>
          <span className="text-gray-500 ml-2">/{period === 'monthly' ? 'mo' : 'yr'}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={isPopular ? 'primary' : 'secondary'} 
        className="w-full"
      >
        Get Started
      </Button>
    </div>
  );
}