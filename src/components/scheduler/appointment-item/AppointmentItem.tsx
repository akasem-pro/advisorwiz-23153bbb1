
import React from 'react';
import { Appointment, useUser } from '../../../context/UserContext';
import AppointmentTitle from './AppointmentTitle';
import AppointmentDate from './AppointmentDate';
import AppointmentTime from './AppointmentTime';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import AppointmentCategory from './AppointmentCategory';

interface AppointmentItemProps {
  appointment: Appointment;
  onClick: () => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onClick }) => {
  const { advisorProfile } = useUser();

  return (
    <div 
      className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <AppointmentTitle title={appointment.title} />
          <AppointmentDate date={appointment.date} />
          <AppointmentTime startTime={appointment.startTime} endTime={appointment.endTime} />
        </div>
        
        <div className="flex flex-col sm:items-end gap-2">
          <AppointmentStatusBadge status={appointment.status} />
          <AppointmentCategory 
            appointment={appointment} 
            advisorProfile={advisorProfile} 
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
