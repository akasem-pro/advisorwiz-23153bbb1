
import { AppointmentStatus } from '../../../context/UserContext';

export const getStatusColor = (status: AppointmentStatus): string => {
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
