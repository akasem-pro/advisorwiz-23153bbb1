
import React from 'react';

const WeekdayLabels: React.FC = () => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="grid grid-cols-7 gap-2 border-b pb-2 mb-2">
      {weekdays.map((day) => (
        <div key={day} className="text-center font-medium text-sm text-navy-700">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayLabels;
