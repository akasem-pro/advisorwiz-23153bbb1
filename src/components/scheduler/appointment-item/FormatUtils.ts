
import { format, parseISO } from 'date-fns';

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

export const formatAppointmentDate = (date: string): string => {
  return format(parseISO(date), 'EEEE, MMMM d, yyyy');
};
