
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AppointmentStatus } from '../../../context/UserContext';
import { getStatusColor } from './StatusUtils';
import { cn } from '@/lib/utils';

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({ status }) => {
  return (
    <Badge variant="outline" className={cn(getStatusColor(status), "capitalize")}>
      {status}
    </Badge>
  );
};

export default AppointmentStatusBadge;
