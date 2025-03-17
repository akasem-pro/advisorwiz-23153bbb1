
import { TimeSlot, AppointmentCategory, ServiceCategory, AdvisorProfile } from '../types/userTypes';

// Update the ExtendedAdvisorProfileForm interface
export interface ExtendedAdvisorProfileForm {
  // Core profile info
  id: string;
  name: string;
  organization: string;
  isAccredited: boolean;
  email: string;
  phone: string;
  
  // Address fields
  street: string;
  city: string;
  province: string;
  postalCode: string;
  
  // Professional details
  licensingBody: string;
  registrationNumber: string;
  yearsOfExperience: string;
  hasViolations: boolean;
  consentToBackgroundCheck: boolean;
  
  // Online presence
  websiteUrl: string;
  linkedinUrl: string;
  bio: string;
  profilePicture: string;
  
  // Services and expertise
  expertise: ServiceCategory[];
  testimonials: { client: string; text: string }[];
  languages: string[];
  pricing: {
    hourlyRate?: number;
    portfolioFee?: number;
  };
  
  // Business details
  feeStructure: string;
  feeAmount: string;
  minimumInvestmentCategory: string;
  minimumInvestment: number | null;
  preferredClientTypes: string[];
  preferredMeetingMethods: string[];
  assetsUnderManagement: number;
  
  // Platform settings
  subscriptionPlan: string;
  matches: string[];
  compatibilityScores: Record<string, number>; // Store scores for potential matches
  chats: string[];
  availability: TimeSlot[]; // Updated to use TimeSlot[] type
  chatEnabled: boolean;
  appointmentCategories: AppointmentCategory[];
  appointments: string[];
  onlineStatus: 'online' | 'offline' | 'away';
  lastOnline: string;
  showOnlineStatus: boolean;
  
  // Consent flags
  consentToTerms: boolean;
  consentToMarketing: boolean;
  consentToContact: boolean;
  consentToDataProcessing: boolean;
}

// Type for a section in the accordion UI
export interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isCompleted: boolean;
}

// Match score category enum
export enum MatchCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor'
}

// Match score range interface
export interface MatchScoreRange {
  category: MatchCategory;
  minScore: number;
  maxScore: number;
  label: string;
  description: string;
}

// Match score ranges
export const MATCH_SCORE_RANGES: MatchScoreRange[] = [
  {
    category: MatchCategory.EXCELLENT,
    minScore: 80,
    maxScore: 100,
    label: 'Excellent Match',
    description: 'This advisor is highly compatible with your needs and preferences.'
  },
  {
    category: MatchCategory.GOOD,
    minScore: 60,
    maxScore: 79,
    label: 'Good Match',
    description: 'This advisor matches well with most of your requirements.'
  },
  {
    category: MatchCategory.AVERAGE,
    minScore: 40,
    maxScore: 59,
    label: 'Average Match',
    description: 'This advisor meets some of your needs but may not be ideal in all areas.'
  },
  {
    category: MatchCategory.POOR,
    minScore: 0,
    maxScore: 39,
    label: 'Low Match',
    description: 'This advisor may not be the best fit for your specific needs.'
  }
];

// Function to get match category from score
export function getMatchCategory(score: number): MatchScoreRange {
  return MATCH_SCORE_RANGES.find(
    range => score >= range.minScore && score <= range.maxScore
  ) || MATCH_SCORE_RANGES[MATCH_SCORE_RANGES.length - 1];
}

// Add new interfaces for the refactored data types
export interface LicensingBody {
  value: string;
  label: string;
}

export interface ExperienceOption {
  value: string;
  label: string;
}

export interface FeeStructureOption {
  value: string;
  label: string;
  fieldType: string;
  placeholder: string;
}

export interface MinimumInvestmentOption {
  value: string;
  label: string;
  range: string;
}

export interface ClientTypeOption {
  value: string;
  label: string;
}

export interface MeetingMethodOption {
  value: string;
  label: string;
}

export interface ProvinceOption {
  value: string;
  label: string;
}

export interface EmploymentStatusOption {
  value: string;
  label: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface LanguageOption {
  value: string;
  label: string;
}
