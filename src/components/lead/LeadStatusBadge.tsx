
import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { LeadStatus } from '../../types/leadTypes';

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'matched':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'appointment_scheduled':
        return 'bg-indigo-100 text-indigo-800';
      case 'appointment_completed':
        return 'bg-cyan-100 text-cyan-800';
      case 'proposal_sent':
        return 'bg-amber-100 text-amber-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: LeadStatus) => {
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'contacted':
        return 'Contacted';
      case 'appointment_scheduled':
        return 'Meeting Scheduled';
      case 'appointment_completed':
        return 'Meeting Completed';
      case 'proposal_sent':
        return 'Proposal Sent';
      case 'converted':
        return 'Converted ✓';
      case 'lost':
        return 'Lost';
      default:
        return status.replace('_', ' ');
    }
  };

  return (
    <Badge 
      className={cn(getStatusColor(status), "capitalize", className)}
    >
      {getStatusLabel(status)}
    </Badge>
  );
};

export default LeadStatusBadge;
