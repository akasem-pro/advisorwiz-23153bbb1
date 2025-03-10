
import { AdvisorProfileType, ServiceCategory, TimeSlot } from '../context/UserContext';

// Extended form data type for the advisor profile
export interface ExtendedAdvisorProfileForm extends Partial<AdvisorProfileType> {
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
  linkedinUrl: string;
  websiteUrl: string;
  subscriptionPlan: string;
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
