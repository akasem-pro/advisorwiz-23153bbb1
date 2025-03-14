
import React from 'react';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  icon: LucideIcon;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ 
  title, 
  icon: Icon, 
  options, 
  selectedValues, 
  onToggle 
}) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <Icon size={16} className="mr-2 text-gray-500" />
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <Button
            key={option.value}
            variant={selectedValues.includes(option.value) ? "default" : "outline"}
            size="sm"
            onClick={() => onToggle(option.value)}
            className={`text-xs h-7 ${selectedValues.includes(option.value) ? 'bg-teal-600' : ''}`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
