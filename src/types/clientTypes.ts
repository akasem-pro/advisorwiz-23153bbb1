
export interface ClientData {
  id: string;
  name: string;
  profilePicture?: string;
  email: string;
  phone?: string;
  lastContact?: string;
  tags: string[];
  matchScore?: number;
  notes?: string[];
  appointmentHistory?: {
    date: string;
    title: string;
    status: 'completed' | 'upcoming' | 'cancelled';
  }[];
}
