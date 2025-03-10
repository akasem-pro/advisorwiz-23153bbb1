
import { useState, useMemo } from 'react';
import { Appointment, AppointmentStatus } from '../context/UserContext';

type UseAppointmentFiltersProps = {
  appointments: Appointment[];
};

type UseAppointmentFiltersReturn = {
  filteredAppointments: Appointment[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: AppointmentStatus | 'all';
  setStatusFilter: (status: AppointmentStatus | 'all') => void;
  hasFiltersApplied: boolean;
};

export const useAppointmentFilters = ({ 
  appointments 
}: UseAppointmentFiltersProps): UseAppointmentFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (appointment.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, searchTerm, statusFilter]);

  const hasFiltersApplied = searchTerm !== '' || statusFilter !== 'all';

  return {
    filteredAppointments,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    hasFiltersApplied
  };
};
