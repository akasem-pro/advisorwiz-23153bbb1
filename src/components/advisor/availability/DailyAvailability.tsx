
import React from 'react';
import { format } from 'date-fns';
import TimeSlot from './TimeSlot';
import { TimeSlot as TimeSlotType } from '../../../context/UserContext';

interface DailyAvailabilityProps {
  selectedDate: Date;
  availabilityByDay: Record<string, TimeSlotType[]>;
  selectedSlot: string | null;
  formatTime: (time: string) => string;
  onSlotSelect: (timeDisplay: string) => void;
}

const DailyAvailability: React.FC<DailyAvailabilityProps> = ({
  selectedDate,
  availabilityByDay,
  selectedSlot,
  formatTime,
  onSlotSelect
}) => {
  const dayName = format(selectedDate, 'EEEE').toLowerCase() as keyof typeof availabilityByDay;
  const daySlots = availabilityByDay[dayName];

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h4 className="font-medium mb-3">
        {format(selectedDate, 'EEEE, MMMM d')}
      </h4>

      {daySlots ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {daySlots.map((slot, index) => {
            const timeDisplay = `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;
            return (
              <TimeSlot
                key={index}
                timeDisplay={timeDisplay}
                isSelected={selectedSlot === timeDisplay}
                onClick={() => onSlotSelect(timeDisplay)}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-4">
          No availability on this day.
        </p>
      )}
    </div>
  );
};

export default DailyAvailability;
