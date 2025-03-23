
import React from 'react';
import { Button } from '../../ui/button';

interface WeightAdjustmentProps {
  factor: string;
  displayName: string;
  value: number;
  onChange: (factor: string, direction: 'increase' | 'decrease') => void;
}

const WeightAdjustment: React.FC<WeightAdjustmentProps> = ({ 
  factor, 
  displayName, 
  value, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs">{displayName}</span>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => onChange(factor, 'decrease')}
          disabled={value <= -20}
        >
          <span>-</span>
        </Button>
        <span className="w-8 text-center text-xs">
          {value > 0 ? `+${value}` : value}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => onChange(factor, 'increase')}
          disabled={value >= 20}
        >
          <span>+</span>
        </Button>
      </div>
    </div>
  );
};

export default WeightAdjustment;
