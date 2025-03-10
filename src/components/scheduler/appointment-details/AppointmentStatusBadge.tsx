
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AppointmentStatus } from '../../../context/UserContext';

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({ status }) => {
  const getStatusBadgeColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={cn("capitalize", getStatusBadgeColor(status))}>
      {status}
    </Badge>
  );
};

export default AppointmentStatusBadge;
