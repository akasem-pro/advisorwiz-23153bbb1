
import React from 'react';

interface PriceDisplayProps {
  price: number;
  period: 'monthly' | 'annually';
  discount: string | null;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, period, discount }) => {
  return (
    <div className="text-center py-2">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-navy-900 dark:text-white">${price}</span>
        <span className="text-slate-600 dark:text-slate-200 ml-1">/{period === 'monthly' ? 'mo' : 'yr'}</span>
      </div>
      
      {discount && (
        <div className="mt-1">
          <span className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded">
            {discount}
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
