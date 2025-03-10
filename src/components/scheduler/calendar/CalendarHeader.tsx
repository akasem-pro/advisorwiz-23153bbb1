
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-serif font-semibold">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <div className="flex space-x-2">
        <button 
          onClick={onPrevMonth}
          className="p-2 rounded-full hover:bg-slate-100"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-slate-100"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
