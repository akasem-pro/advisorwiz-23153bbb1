
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
  category?: string;
  
  // Adding these properties to maintain backward compatibility
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  categoryId?: string;
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
  day: string; // Day of the week (e.g., "monday", "tuesday", etc.)
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

// Appointment Category
export interface AppointmentCategory {
  id: string;
  label: string;
  description?: string;
  duration: number;
  color?: string;
  price?: number;
  isDefault?: boolean;
  advisorId?: string;
  enabled: boolean; // Added this field which was being used
}

