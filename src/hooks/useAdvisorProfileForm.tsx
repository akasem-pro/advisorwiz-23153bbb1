
import { useState } from 'react';
import { ExtendedAdvisorProfileForm } from '../types/advisorTypes';
import { ServiceCategory, AdvisorProfile, TimeSlot, AppointmentCategory } from '../context/UserContext';
import { DEFAULT_CATEGORIES } from '../data/advisorProfileData';

export const useAdvisorProfileForm = (advisorProfile?: AdvisorProfile | null) => {
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
    availability: advisorProfile?.availability || [],
    chatEnabled: advisorProfile?.chatEnabled !== undefined ? advisorProfile.chatEnabled : true,
    appointmentCategories: advisorProfile?.appointmentCategories || DEFAULT_CATEGORIES,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'hourlyRate' || name === 'portfolioFee') {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [name]: value ? Number(value) : undefined
        }
      }));
    } else if (name === 'minimumInvestment') {
      setFormData(prev => ({
        ...prev,
        minimumInvestment: value ? Number(value) : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'assetsUnderManagement' ? Number(value) : value
      }));
    }
  };

  const handleButtonClick = (name: string, value: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (fieldName: string, selectedValue: string) => {
    setFormData(prev => {
      const currentValues = prev[fieldName as keyof ExtendedAdvisorProfileForm] as string[] || [];
      
      if (currentValues.includes(selectedValue)) {
        return {
          ...prev,
          [fieldName]: currentValues.filter(v => v !== selectedValue)
        };
      } else {
        return {
          ...prev,
          [fieldName]: [...currentValues, selectedValue]
        };
      }
    });
  };

  const handleExpertiseChange = (expertise: ServiceCategory) => {
    setFormData(prev => {
      const currentExpertise = prev.expertise || [];
      if (currentExpertise.includes(expertise)) {
        return {
          ...prev,
          expertise: currentExpertise.filter(e => e !== expertise)
        };
      } else {
        return {
          ...prev,
          expertise: [...currentExpertise, expertise]
        };
      }
    });
  };

  const isExpertiseSelected = (expertise: ServiceCategory) => {
    return formData.expertise?.includes(expertise) || false;
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => {
      const currentLanguages = prev.languages || [];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTestimonial = () => {
    if (newTestimonial.client && newTestimonial.text) {
      setFormData(prev => ({
        ...prev,
        testimonials: [...(prev.testimonials || []), newTestimonial]
      }));
      setNewTestimonial({ client: '', text: '' });
    }
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index)
    }));
  };

  const handlePictureChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: url
    }));
  };

  const handleAvailabilityChange = (newAvailability: TimeSlot[]) => {
    setFormData(prev => ({
      ...prev,
      availability: newAvailability
    }));
  };

  const handleToggleChat = () => {
    setFormData(prev => ({
      ...prev,
      chatEnabled: !prev.chatEnabled
    }));
  };

  const handleToggleOnlineStatus = () => {
    setFormData(prev => ({
      ...prev,
      showOnlineStatus: !prev.showOnlineStatus
    }));
  };

  const handleStatusChange = (status: 'online' | 'offline' | 'away') => {
    setFormData(prev => ({
      ...prev,
      onlineStatus: status
    }));
  };

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    setIsPhoneVerified(true);
  };

  const handleSubscriptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setFormData(prev => ({
      ...prev,
      subscriptionPlan: planId
    }));
  };

  return {
    formData,
    setFormData,
    isEmailVerified,
    isPhoneVerified,
    newTestimonial,
    handleChange,
    handleButtonClick,
    handleMultiSelectChange,
    handleExpertiseChange,
    isExpertiseSelected,
    handleLanguageChange,
    handleTestimonialChange,
    addTestimonial,
    removeTestimonial,
    handlePictureChange,
    handleAvailabilityChange,
    handleToggleChat,
    handleToggleOnlineStatus,
    handleStatusChange,
    handleVerifyEmail,
    handleVerifyPhone,
    handleSubscriptionSelect
  };
};
