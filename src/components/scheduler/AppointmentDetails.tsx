
import React from 'react';
import { Appointment, AppointmentStatus } from '../../context/UserContext';
import AppointmentDetailsDialog from './appointment-details';

interface AppointmentDetailsProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (id: string, status: AppointmentStatus) => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = (props) => {
  return <AppointmentDetailsDialog {...props} />;
};

export default AppointmentDetails;
