import React from 'react';
import { Bitcoin } from 'lucide-react';

interface CurrencySelectorProps {
  currency: string;
  onChange: (currency: string) => void;
}

export function CurrencySelector({ currency, onChange }: CurrencySelectorProps) {
  const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
    { code: 'BTC', symbol: '₿', label: 'Bitcoin', icon: Bitcoin }
  ];

  return (
    <div className="relative inline-block">
      <select
        value={currency}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        {currencies.map(curr => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code}
          </option>
        ))}
      </select>
    </div>
  );
}