
import React from 'react';
import { Clock } from 'lucide-react';
import { formatAppointmentTime } from './FormatUtils';

interface AppointmentTimeProps {
  startTime: string;
  endTime: string;
}

const AppointmentTime: React.FC<AppointmentTimeProps> = ({ startTime, endTime }) => {
  return (
    <div className="text-sm text-slate-500 flex items-center mt-1">
      <Clock className="h-4 w-4 mr-1" />
      {formatAppointmentTime(startTime, endTime)}
    </div>
  );
};

export default AppointmentTime;
