
import React from 'react';
import { Clock } from 'lucide-react';
import { AppointmentStatus } from '../../context/UserContext';

interface EmptyAppointmentsProps {
  searchTerm: string;
  statusFilter: AppointmentStatus | 'all';
}

const EmptyAppointments: React.FC<EmptyAppointmentsProps> = ({ searchTerm, statusFilter }) => {
  return (
    <div className="text-center py-8 border rounded-lg bg-slate-50">
      <Clock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
      <h3 className="text-lg font-medium text-slate-700">No appointments found</h3>
      <p className="text-slate-500 mt-1">
        {searchTerm 
          ? 'Try changing your search criteria'
          : statusFilter !== 'all'
            ? `No ${statusFilter} appointments found`
            : 'You have no appointments scheduled'}
      </p>
    </div>
  );
};

export default EmptyAppointments;
