
// Types related to time slots and availability

// Time slot type for weekly availability
export type TimeSlot = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  isAvailable: boolean;
};

// Appointment status type
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Appointment type
export type Appointment = {
  id: string;
  advisorId: string;
  consumerId: string;
  categoryId: string;
  title: string;
  date: string; // ISO string format
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  status: AppointmentStatus;
  notes?: string;
  location?: string; // Could be 'video', 'phone', physical address, etc.
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
};

// Appointment category type
export type AppointmentCategory = {
  id: string;
  name: 'free_consultation' | 'discovery_call' | 'investment_call' | 'tax_planning' | 'business_entrepreneurship';
  label: string;
  description: string;
  duration: number; // in minutes
  enabled: boolean;
};
