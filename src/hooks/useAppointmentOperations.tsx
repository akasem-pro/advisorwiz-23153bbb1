
import { 
  Appointment, 
  AppointmentStatus, 
  ConsumerProfile, 
  AdvisorProfile 
} from '../types/userTypes';
import { 
  createAppointment, 
  updateAppointmentStatusById, 
  updateProfileWithAppointment 
} from '../services/appointmentService';

/**
 * Hook that provides appointment-related operations
 */
export const useAppointmentOperations = (
  appointments: Appointment[], 
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>,
  consumerProfile: ConsumerProfile | null,
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>,
  advisorProfile: AdvisorProfile | null,
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>
) => {
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment = createAppointment(appointmentData);
    
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    
    // Update consumer and advisor appointment lists
    if (consumerProfile && appointmentData.consumerId === consumerProfile.id) {
      setConsumerProfile(prevProfile => 
        updateProfileWithAppointment(prevProfile, newAppointment.id) as ConsumerProfile | null
      );
    }
    
    if (advisorProfile && appointmentData.advisorId === advisorProfile.id) {
      setAdvisorProfile(prevProfile => 
        updateProfileWithAppointment(prevProfile, newAppointment.id) as AdvisorProfile | null
      );
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments(prevAppointments => 
      updateAppointmentStatusById(prevAppointments, appointmentId, status)
    );
  };

  return {
    addAppointment,
    updateAppointmentStatus
  };
};
