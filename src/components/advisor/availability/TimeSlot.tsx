
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotProps {
  timeDisplay: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ 
  timeDisplay, 
  isSelected, 
  onClick 
}) => {
  return (
    <div
      className={`p-2 text-center rounded-md cursor-pointer border transition-colors ${
        isSelected
          ? 'bg-teal-100 border-teal-300 text-teal-800'
          : 'border-slate-200 hover:border-teal-200 hover:bg-teal-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <Clock className="mr-1 w-4 h-4" />
        <span>{timeDisplay}</span>
      </div>
    </div>
  );
};

export default TimeSlot;
