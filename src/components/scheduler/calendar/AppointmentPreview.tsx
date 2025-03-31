
import React from 'react';
import { Appointment, AppointmentStatus } from '../../../context/UserContext';
import { CheckCircle, Clock, XCircle, CheckSquare, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentPreviewProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

const AppointmentPreview: React.FC<AppointmentPreviewProps> = ({ appointment, onClick }) => {
  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckSquare className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center text-xs p-1 rounded truncate",
        appointment.status === 'confirmed' && "bg-green-100",
        appointment.status === 'pending' && "bg-amber-100",
        appointment.status === 'canceled' && "bg-red-100",
        appointment.status === 'completed' && "bg-blue-100"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick(appointment);
      }}
    >
      {getStatusIcon(appointment.status)}
      <span className="ml-1 truncate">{appointment.title}</span>
    </div>
  );
};

export default AppointmentPreview;
