import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn('relative w-full h-6 flex items-center', className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          'absolute w-full h-2 appearance-none bg-gray-200 rounded-full outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-black',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:hover:bg-gray-900',
          '[&::-webkit-slider-thumb]:disabled:bg-gray-400',
          '[&::-moz-range-thumb]:appearance-none',
          '[&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:h-4',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-black',
          '[&::-moz-range-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:hover:bg-gray-900',
          '[&::-moz-range-thumb]:disabled:bg-gray-400'
        )}
      />
      <div 
        className="absolute h-2 bg-black rounded-l-full pointer-events-none"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}