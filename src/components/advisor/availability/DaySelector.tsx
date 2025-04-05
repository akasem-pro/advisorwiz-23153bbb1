
import React from 'react';
import { format } from 'date-fns';

interface DaySelectorProps {
  weekDays: {
    date: Date;
    dayName: string;
    formattedDate: string;
  }[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  weekDays, 
  selectedDate, 
  onDateSelect 
}) => {
  return (
    <div className="grid grid-cols-7 gap-1 text-center mb-4">
      {weekDays.map(day => (
        <div 
          key={day.dayName}
          className={`p-2 cursor-pointer rounded ${
            format(selectedDate, 'EEEE').toLowerCase() === day.dayName 
              ? 'bg-teal-100 text-teal-800 font-medium'
              : 'hover:bg-slate-50'
          }`}
          onClick={() => onDateSelect(day.date)}
        >
          <div className="text-xs uppercase text-slate-500">{day.dayName.slice(0, 3)}</div>
          <div className="font-medium">{day.formattedDate}</div>
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
