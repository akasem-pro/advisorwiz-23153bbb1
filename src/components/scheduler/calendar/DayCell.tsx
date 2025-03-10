
import React from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { Appointment } from '../../../context/UserContext';
import { cn } from '@/lib/utils';
import AppointmentPreview from './AppointmentPreview';

interface DayCellProps {
  day: Date;
  appointments: Appointment[];
  monthStart: Date;
  onDateClick: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  appointments,
  monthStart,
  onDateClick,
  onAppointmentClick
}) => {
  const isCurrentMonth = isSameMonth(day, monthStart);
  
  return (
    <div
      className={cn(
        "min-h-[80px] p-1 border rounded-md",
        isCurrentMonth ? "bg-white" : "bg-slate-50",
        isSameDay(day, new Date()) && "border-teal-500 border-2",
        !isCurrentMonth && "text-slate-400",
        appointments.length > 0 && "cursor-pointer hover:bg-slate-50"
      )}
      onClick={() => onDateClick(day)}
    >
      <div className="text-right font-medium p-1">
        {format(day, 'd')}
      </div>
      
      <div className="space-y-1">
        {appointments.slice(0, 2).map((appointment) => (
          <AppointmentPreview 
            key={appointment.id}
            appointment={appointment}
            onClick={onAppointmentClick}
          />
        ))}
        
        {appointments.length > 2 && (
          <div className="text-xs text-right text-slate-500">
            +{appointments.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;
