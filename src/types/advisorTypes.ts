
import { AdvisorProfile, ServiceCategory, TimeSlot, AppointmentCategory } from '../context/UserContext';

export interface ExtendedAdvisorProfileForm extends Partial<AdvisorProfile> {
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
  chats: string[];
  availability: TimeSlot[];
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

