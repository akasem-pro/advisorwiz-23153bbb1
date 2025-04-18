
import React from 'react';
import { Appointment } from '../../../context/UserContext';
import { formatAppointmentDate, formatAppointmentTime } from './FormatUtils';
import AppointmentTitle from './AppointmentTitle';
import AppointmentDate from './AppointmentDate';
import AppointmentTime from './AppointmentTime';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import AppointmentCategory from './AppointmentCategory';

interface AppointmentItemProps {
  appointment: Appointment;
  onClick?: (appointment: Appointment) => void;
  showAdvisorName?: boolean;
  showConsumerName?: boolean;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onClick,
  showAdvisorName = false,
  showConsumerName = false,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(appointment);
    }
  };

  // Get the title of the appointment based on who's viewing it
  const getTitle = () => {
    // Since advisorName and consumerName don't exist in the Appointment type,
    // we'll just use the title directly
    return appointment.title || 'Appointment';
  };

  return (
    <div 
      className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow mb-3 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <AppointmentTitle title={getTitle()} />
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <AppointmentDate date={appointment.date} />
            <span>•</span>
            <AppointmentTime startTime={appointment.startTime} endTime={appointment.endTime} />
          </div>
          {appointment.categoryId && (
            <div className="mt-2">
              <AppointmentCategory category={appointment.categoryId} />
            </div>
          )}
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>
    </div>
  );
};

export default AppointmentItem;
