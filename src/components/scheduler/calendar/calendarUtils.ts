
import { parseISO, isSameDay, getDay, addDays } from 'date-fns';
import { Appointment, AppointmentStatus } from '../../../context/UserContext';

export const formatAppointmentTime = (start: string, end: string): string => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minutes} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const getAppointmentsForDay = (appointments: Appointment[], date: Date): Appointment[] => {
  return appointments.filter(appointment => 
    isSameDay(parseISO(appointment.date), date)
  );
};

export const endOfWeek = (date: Date): Date => {
  const day = getDay(date);
  return addDays(date, 6 - (day === 0 ? 6 : day - 1));
};

export const getOtherPartyName = (
  appointment: Appointment, 
  consumerProfileId: string | undefined,
  advisorProfileId: string | undefined
): string => {
  if (consumerProfileId && appointment.consumerId === consumerProfileId) {
    // User is the consumer, show advisor name
    return "Your advisor"; // In a real app, you'd fetch the advisor's name
  } else if (advisorProfileId && appointment.advisorId === advisorProfileId) {
    // User is the advisor, show consumer name
    return "Client"; // In a real app, you'd fetch the consumer's name
  }
  return "Unknown";
};

export const getCategoryLabel = (
  appointment: Appointment,
  advisorAppointmentCategories: any[] | undefined
): string => {
  if (advisorAppointmentCategories) {
    const category = advisorAppointmentCategories.find(
      cat => cat.id === appointment.categoryId
    );
    return category ? category.label : 'Appointment';
  }
  return 'Appointment';
};
