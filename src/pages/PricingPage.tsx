import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { CurrencySelector } from '../components/CurrencySelector';

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  TRY: 30.5,
  BTC: 0.000024
};

const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out VI-Library',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Access to basic 3D model library',
      'Up to 3 downloads per day',
      'Basic support',
      'Standard quality models'
    ]
  },
  {
    name: 'Gold',
    description: 'Best for regular users',
    monthlyPrice: 30,
    yearlyPrice: 300,
    features: [
      'Full access to VI-Library',
      'Up to 30 downloads per day',
      'Priority support',
      'VIBE Program access',
      'High quality models',
      'No watermarks'
    ],
    isPopular: true
  },
  {
    name: 'Diamond',
    description: 'For professional users',
    monthlyPrice: 75,
    yearlyPrice: 750,
    features: [
      'Unlimited access to VI-Library',
      'Up to 100 downloads per day',
      'Premium support',
      'Unlimited VIBE Program access',
      'Highest quality models',
      'Early access to new models',
      'Priority rendering'
    ]
  }
];

function PricingPage() {
  const [currency, setCurrency] = useState('USD');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const formatPrice = (price: number) => {
    const converted = price * exchangeRates[currency as keyof typeof exchangeRates];
    
    if (currency === 'BTC') {
      return `₿${converted.toFixed(6)}`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(converted);
  };

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-600 mb-8">Choose the perfect plan for your needs</p>
        
        <div className="flex items-center justify-center gap-6">
          <CurrencySelector 
            currency={currency}
            onChange={setCurrency}
          />
          
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                billingPeriod === 'monthly' ? 'bg-white shadow' : ''
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                billingPeriod === 'yearly' ? 'bg-white shadow' : ''
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg p-8 ${
                plan.isPopular ? 'border-2 border-black shadow-lg' : 'border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-light">
                    {formatPrice(billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                  </span>
                  <span className="text-gray-500 ml-2">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-md text-sm transition-colors ${
                  plan.isPopular
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center pb-16">
        <h2 className="text-2xl font-light mb-4">Get Started with VIBE</h2>
        <p className="text-gray-600 mb-6">
          Download the VIBE program to start creating amazing projects
        </p>
        <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900">
          <Download className="h-4 w-4" />
          Download VIBE
        </button>
      </div>
    </div>
  );
}

export default PricingPage;