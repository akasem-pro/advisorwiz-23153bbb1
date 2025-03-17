
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
  // Added missing properties
  age?: number;
  status?: string;
  investableAssets?: number;
  preferredCommunication?: string[];
  preferredLanguage?: string[];
  startTimeline?: string;
  serviceNeeds?: ServiceCategory[];
  advisorPreferences?: {
    specializations?: string[];
    experienceLevel?: number;
    communicationStyle?: string;
  };
  matches?: string[];
  chats?: string[];
  chatEnabled?: boolean;
  appointments?: string[];
  onlineStatus?: 'online' | 'offline' | 'away';
  lastOnline?: string;
  showOnlineStatus?: boolean;
  profilePicture?: string;
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
  // Added missing properties
  organization?: string;
  isAccredited?: boolean;
  website?: string;
  testimonials?: { client: string; text: string }[];
  languages?: string[];
  pricing?: {
    hourlyRate?: number;
    portfolioFee?: number;
  };
  assetsUnderManagement?: number;
  expertise?: ServiceCategory[];
  profilePicture?: string;
  matches?: string[];
  compatibilityScores?: Record<string, number>;
  chats?: string[];
  availability?: TimeSlot[];
  chatEnabled?: boolean;
  appointmentCategories?: AppointmentCategory[];
  appointments?: string[];
  onlineStatus?: 'online' | 'offline' | 'away';
  lastOnline?: string;
  showOnlineStatus?: boolean;
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

// Additional types needed for components
export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  lastMessageAt: string;
  unreadCount: Record<string, number>;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  advisorId: string;
  consumerId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  title: string;
  description?: string;
  meetingLink?: string;
  location?: string;
  type: 'consultation' | 'follow-up' | 'review';
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategory = 
  | 'retirement'
  | 'investment'
  | 'tax'
  | 'estate'
  | 'insurance'
  | 'business'
  | 'education'
  | 'philanthropic';

export interface AppointmentCategory {
  id: string;
  name: string;
  duration: number; // Duration in minutes
  description: string;
  price?: number;
  isActive: boolean;
  color?: string;
}

export interface FinancialFirm {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  founded?: number;
  size?: 'small' | 'medium' | 'large';
  aum?: number; // Assets Under Management
  specialties?: string[];
  adminId: string; // ID of the firm admin
  advisorIds: string[]; // IDs of advisors in the firm
  status: 'active' | 'pending' | 'suspended';
  subscription?: {
    plan: string;
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  updatedAt: string;
}
