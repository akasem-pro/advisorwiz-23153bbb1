
import { AppointmentStatus } from '../../../context/UserContext';

export const getStatusClass = (status: AppointmentStatus) => {
  switch (status) {
    case 'confirmed':
      return 'text-green-700 bg-green-100';
    case 'pending':
      return 'text-amber-700 bg-amber-100';
    case 'canceled':
      return 'text-red-700 bg-red-100';
    case 'completed':
      return 'text-blue-700 bg-blue-100';
    case 'rescheduled':
      return 'text-purple-700 bg-purple-100';
    default:
      return 'text-slate-700 bg-slate-100';
  }
};

export const getStatusIcon = (status: AppointmentStatus) => {
  // The actual implementation can be kept as is
  // Just ensuring the function is exported and has the right type
  return status;
};
