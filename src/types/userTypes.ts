
export interface ConsumerProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  financialGoals?: string[];
  riskTolerance?: 'low' | 'medium' | 'high';
  investmentAmount?: number;
  timeHorizon?: string;
  preferences?: {
    communicationPreference?: 'email' | 'phone' | 'video';
    advisorSpecialties?: string[];
    location?: string;
  };
}

export interface AdvisorProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  firm?: string;
  firmId?: string;
  title?: string;
  bio?: string;
  experience?: number;
  specialties?: string[];
  certifications?: string[];
  location?: string;
  availability?: {
    days: string[];
    hours: string;
  };
  feeStructure?: {
    type: 'hourly' | 'flat-fee' | 'percentage' | 'commission';
    details: string;
  };
  clientMinimum?: number;
  reviews?: {
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
}

export interface FirmProfile {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  founded?: number;
  size?: 'small' | 'medium' | 'large';
  location?: string;
  website?: string;
  specialties?: string[];
  advisors?: string[]; // Array of advisor IDs
  adminId?: string; // ID of the firm administrator
}

export type UserType = 'consumer' | 'advisor' | 'firm_admin' | null;

export interface AppointmentType {
  id: string;
  advisorId: string;
  consumerId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  title: string;
  description?: string;
  meetingLink?: string;
  location?: string;
  type: 'consultation' | 'follow-up' | 'review';
  createdAt: string;
  updatedAt: string;
}
