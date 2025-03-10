
import React from 'react';
import { Badge } from '../../components/ui/badge';

interface PriceDisplayProps {
  price: number;
  period: 'monthly' | 'annually';
  discount?: string | null;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  period, 
  discount = null 
}) => (
  <div className="mt-2 mb-6">
    <div className="flex items-end">
      <span className="text-4xl font-bold text-navy-900">${price}</span>
      <span className="text-slate-500 ml-2">/{period === 'monthly' ? 'mo' : 'yr'}</span>
    </div>
    {discount && (
      <div className="mt-1">
        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
          {discount}
        </Badge>
      </div>
    )}
  </div>
);

export default PriceDisplay;
