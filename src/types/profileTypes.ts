
// Types for user profiles and related types

import { Location } from './locationTypes';
import { ServiceCategory } from './serviceTypes';
import { TimeSlot, AppointmentCategory } from './timeTypes';

// Types for the consumer and advisor profiles
export type ConsumerProfile = {
  id: string;
  name: string;
  age: number;
  status: string;
  investableAssets: number;
  riskTolerance: 'low' | 'medium' | 'high';
  preferredCommunication: string[];
  preferredLanguage: string[];
  serviceNeeds?: ServiceCategory[];
  investmentAmount?: number;
  financialGoals?: string[];
  incomeBracket?: string;
  incomeRange?: string;
  preferredAdvisorSpecialties?: string[];
  location?: Location;
  advisorPreferences?: {
    experience?: string;
    feeStructure?: string;
    minimumInvestment?: number;
  };
  languages?: string[];
  matches: string[];
  chats: string[];
  profilePicture?: string; // URL to profile picture
  chatEnabled: boolean; // New field for chat settings
  appointments: string[];
  startTimeline: 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure'; // When they want to start
  onlineStatus: 'online' | 'offline' | 'away'; // New field for online status
  lastOnline: string; // ISO string for last online time
  showOnlineStatus: boolean; // Toggle to show/hide online status

  // Additional fields for the form
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  province?: string;
  postalCode?: string;
  industry?: string;
  jobTitle?: string;
  preferredMeetingTimes?: string[];
  advisorInvolvement?: string;
  wantsEducation?: boolean;
  termsConsent?: boolean;
  advisorContactConsent?: boolean;
  hasAdvisor?: boolean;
  currentAdvisorReason?: string;
};

export type AdvisorProfile = {
  id: string;
  name: string;
  organization: string;
  isAccredited: boolean;
  website: string;
  testimonials: { client: string; text: string }[];
  languages: string[];
  pricing: {
    hourlyRate?: number;
    portfolioFee?: number;
  };
  assetsUnderManagement: number;
  expertise: ServiceCategory[]; // Now explicitly typed
  specializations: string[]; // Required field for specializations
  yearsOfExperience?: number; // New field
  averageRating?: number; // New field
  ratingCount?: number; // New field
  biography?: string; // New field
  certifications?: string[]; // New field
  location?: Location; // New field
  matches: string[];
  compatibilityScores?: Record<string, number>; // Add this optional property
  chats: string[];
  profilePicture?: string; // URL to profile picture
  availability?: TimeSlot[]; // Weekly availability slots
  chatEnabled: boolean; // New field for chat settings
  appointmentCategories: AppointmentCategory[]; // Available appointment types
  appointments: string[]; // IDs of appointments
  onlineStatus: 'online' | 'offline' | 'away'; // New field for online status
  lastOnline: string; // ISO string for last online time
  showOnlineStatus: boolean; // Toggle to show/hide online status
};

// User type - Updated to include 'admin'
export type UserType = 'consumer' | 'advisor' | 'firm_admin' | 'admin' | null;
