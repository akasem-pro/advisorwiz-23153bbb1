
import React, { useState } from 'react';
import { Appointment, AppointmentStatus, useUser } from '../../context/UserContext';
import { toast } from '@/hooks/use-toast';
import AppointmentCategoryManager from './AppointmentCategoryManager';
import AppointmentFilters from './AppointmentFilters';
import AppointmentItem from './AppointmentItem';
import AppointmentDetails from './AppointmentDetails';
import EmptyAppointments from './EmptyAppointments';
import { useAppointmentFilters } from '../../hooks/useAppointmentFilters';

interface AdvisorAppointmentManagerProps {
  appointments: Appointment[];
}

const AdvisorAppointmentManager: React.FC<AdvisorAppointmentManagerProps> = ({ appointments }) => {
  const { updateAppointmentStatus } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  
  const { 
    filteredAppointments,
    searchTerm, 
    setSearchTerm,
    statusFilter, 
    setStatusFilter
  } = useAppointmentFilters({ appointments });

  const handleUpdateStatus = (appointmentId: string, status: AppointmentStatus) => {
    updateAppointmentStatus(appointmentId, status);
    toast({
      title: 'Status updated',
      description: `Appointment status changed to ${status}`,
    });
    setShowDetails(false);
  };

  return (
    <div>
      <AppointmentFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onManageCategories={() => setShowCategoryManager(true)}
      />

      {filteredAppointments.length > 0 ? (
        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onClick={() => {
                setSelectedAppointment(appointment);
                setShowDetails(true);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyAppointments 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
        />
      )}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          open={showDetails}
          onOpenChange={setShowDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Category Manager Dialog */}
      <AppointmentCategoryManager 
        isOpen={showCategoryManager} 
        onClose={() => setShowCategoryManager(false)} 
      />
    </div>
  );
};

export default AdvisorAppointmentManager;
