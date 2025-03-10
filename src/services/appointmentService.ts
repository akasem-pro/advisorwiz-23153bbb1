
import { Appointment, AppointmentStatus, ConsumerProfile, AdvisorProfile } from '../types/userTypes';

export const createAppointment = (
  appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
): Appointment => {
  return {
    ...appointmentData,
    id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const updateAppointmentStatusById = (
  appointments: Appointment[],
  appointmentId: string, 
  status: AppointmentStatus
): Appointment[] => {
  const appointmentIndex = appointments.findIndex(appt => appt.id === appointmentId);
  
  if (appointmentIndex === -1) return appointments;
  
  const updatedAppointment = {
    ...appointments[appointmentIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  const newAppointments = [...appointments];
  newAppointments[appointmentIndex] = updatedAppointment;
  
  return newAppointments;
};

export const updateProfileWithAppointment = (
  profile: ConsumerProfile | AdvisorProfile | null,
  appointmentId: string
): ConsumerProfile | AdvisorProfile | null => {
  if (!profile) return profile;
  
  return {
    ...profile,
    appointments: [...(profile.appointments || []), appointmentId]
  };
};
