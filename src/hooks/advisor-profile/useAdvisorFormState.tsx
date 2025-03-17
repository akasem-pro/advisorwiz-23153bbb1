
import { useState } from 'react';
import { ExtendedAdvisorProfileForm } from '../../types/advisorTypes';
import { AdvisorProfile, TimeSlot, AppointmentCategory } from '../../types/userTypes';
import { DEFAULT_CATEGORIES } from '../../data/advisorProfileData';

export const useAdvisorFormState = (advisorProfile?: AdvisorProfile | null) => {
  const [formData, setFormData] = useState<ExtendedAdvisorProfileForm>({
    id: advisorProfile?.id || 'advisor-' + Date.now(),
    name: advisorProfile?.name || '',
    organization: advisorProfile?.organization || '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    isAccredited: advisorProfile?.isAccredited || false,
    licensingBody: '',
    registrationNumber: '',
    yearsOfExperience: '',
    hasViolations: false,
    consentToBackgroundCheck: false,
    websiteUrl: '',
    linkedinUrl: '',
    bio: '',
    testimonials: advisorProfile?.testimonials || [],
    languages: advisorProfile?.languages || [],
    feeStructure: '',
    feeAmount: '',
    minimumInvestmentCategory: '',
    minimumInvestment: null,
    pricing: {
      hourlyRate: advisorProfile?.pricing?.hourlyRate || undefined,
      portfolioFee: advisorProfile?.pricing?.portfolioFee || undefined
    },
    preferredClientTypes: [],
    preferredMeetingMethods: [],
    assetsUnderManagement: advisorProfile?.assetsUnderManagement || 0,
    expertise: advisorProfile?.expertise || [],
    profilePicture: advisorProfile?.profilePicture || '',
    matches: advisorProfile?.matches || [],
    compatibilityScores: {},  // Initialize with empty object
    chats: advisorProfile?.chats || [],
    availability: advisorProfile?.availability || [] as TimeSlot[],
    chatEnabled: advisorProfile?.chatEnabled !== undefined ? advisorProfile.chatEnabled : true,
    appointmentCategories: advisorProfile?.appointmentCategories || DEFAULT_CATEGORIES as AppointmentCategory[],
    appointments: advisorProfile?.appointments || [],
    onlineStatus: advisorProfile?.onlineStatus || 'online',
    lastOnline: advisorProfile?.lastOnline || new Date().toISOString(),
    showOnlineStatus: advisorProfile?.showOnlineStatus !== undefined ? advisorProfile.showOnlineStatus : true,
    subscriptionPlan: 'basic',
    consentToTerms: false,
    consentToMarketing: false,
    consentToContact: false,
    consentToDataProcessing: false
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ client: '', text: '' });

  return {
    formData,
    setFormData,
    isEmailVerified,
    setIsEmailVerified,
    isPhoneVerified,
    setIsPhoneVerified,
    newTestimonial,
    setNewTestimonial
  };
};
