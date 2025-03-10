
import { AdvisorProfile, ServiceCategory, TimeSlot, AppointmentCategory } from '../context/UserContext';

// Extended form data type for the advisor profile
export interface ExtendedAdvisorProfileForm extends Partial<AdvisorProfile> {
  id?: string;
  name: string;
  organization: string;
  isAccredited: boolean;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  licensingBody: string;
  registrationNumber: string;
  yearsOfExperience: string;
  hasViolations: boolean;
  consentToBackgroundCheck: boolean;
  feeStructure: string;
  feeAmount: string;
  minimumInvestmentCategory: string;
  minimumInvestment: number | null;
  preferredClientTypes: string[];
  preferredMeetingMethods: string[];
  bio: string;
  websiteUrl: string;
  linkedinUrl: string;
  subscriptionPlan: string;
  consentToTerms: boolean;
  consentToMarketing: boolean;
  consentToContact: boolean;
  consentToDataProcessing: boolean;
  profilePicture?: string;
  testimonials: { client: string; text: string }[];
  languages: string[];
  pricing: {
    hourlyRate?: number;
    portfolioFee?: number;
  };
  assetsUnderManagement: number;
  expertise: ServiceCategory[];
  matches: string[];
  chats: string[];
  availability: TimeSlot[];
  chatEnabled: boolean;
  appointmentCategories: AppointmentCategory[];
  appointments: string[];
  onlineStatus: 'online' | 'offline' | 'away';
  lastOnline: string;
  showOnlineStatus: boolean;
}

// Type for a section in the accordion UI
export interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isCompleted: boolean;
}
