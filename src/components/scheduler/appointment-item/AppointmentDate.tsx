
import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { formatAppointmentDate } from './FormatUtils';

interface AppointmentDateProps {
  date: string;
}

const AppointmentDate: React.FC<AppointmentDateProps> = ({ date }) => {
  return (
    <div className="text-sm text-slate-500 flex items-center mt-1">
      <CalendarCheck className="h-4 w-4 mr-1" />
      {formatAppointmentDate(date)}
    </div>
  );
};

export default AppointmentDate;
