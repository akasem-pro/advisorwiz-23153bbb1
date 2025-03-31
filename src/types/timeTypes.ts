
// Appointment status enum
export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rescheduled';

// Appointment interface
export interface Appointment {
  id: string;
  advisorId: string;
  consumerId: string;
  title?: string;
  description?: string;
  status: AppointmentStatus;
  scheduledStart: string;
  scheduledEnd: string;
  createdAt: string;
  updatedAt: string;
  meetingLink?: string;
  notes?: string;
  category?: string; // Added this field
}

// Availability time slot
export interface TimeSlot {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Calendar event
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status?: AppointmentStatus;
  appointmentId?: string;
  isAppointment?: boolean;
  category?: string;
}
