
import React from 'react';
import { CalendarCheck, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { cn } from '@/lib/utils';

interface AppointmentItemProps {
  appointment: Appointment;
  onClick: () => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onClick }) => {
  const { advisorProfile } = useUser();

  const formatAppointmentTime = (start: string, end: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minutes} ${period}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const getStatusClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-amber-700 bg-amber-100';
      case 'cancelled':
        return 'text-red-700 bg-red-100';
      case 'completed':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const getCategoryLabel = (appointment: Appointment) => {
    if (advisorProfile) {
      const category = advisorProfile.appointmentCategories.find(
        cat => cat.id === appointment.categoryId
      );
      return category ? category.label : 'Appointment';
    }
    return 'Appointment';
  };

  return (
    <div 
      className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-medium">{appointment.title}</h3>
          <div className="text-sm text-slate-500 flex items-center mt-1">
            <CalendarCheck className="h-4 w-4 mr-1" />
            {format(parseISO(appointment.date), 'EEEE, MMMM d, yyyy')}
          </div>
          <div className="text-sm text-slate-500 flex items-center mt-1">
            <Clock className="h-4 w-4 mr-1" />
            {formatAppointmentTime(appointment.startTime, appointment.endTime)}
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2">
          <Badge variant="outline" className={cn(getStatusClass(appointment.status), "capitalize")}>
            {appointment.status}
          </Badge>
          <span className="text-sm text-slate-600">
            {getCategoryLabel(appointment)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
