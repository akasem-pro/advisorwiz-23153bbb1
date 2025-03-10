
import { useState, useCallback } from 'react';
import { ExtendedAdvisorProfileForm } from '../types/advisorTypes';
import { AdvisorProfile, ServiceCategory } from '../context/UserContext';
import { DEFAULT_CATEGORIES } from '../data/advisorProfileData';

export const useAdvisorForm = (initialAdvisorProfile?: AdvisorProfile) => {
  const [formData, setFormData] = useState<ExtendedAdvisorProfileForm>({
    id: initialAdvisorProfile?.id || `advisor-${Date.now()}`,
    name: initialAdvisorProfile?.name || '',
    organization: initialAdvisorProfile?.organization || '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    isAccredited: initialAdvisorProfile?.isAccredited || false,
    licensingBody: '',
    registrationNumber: '',
    yearsOfExperience: '',
    hasViolations: false,
    consentToBackgroundCheck: false,
    websiteUrl: initialAdvisorProfile?.website || '',
    linkedinUrl: '',
    bio: '',
    testimonials: initialAdvisorProfile?.testimonials || [],
    languages: initialAdvisorProfile?.languages || [],
    feeStructure: '',
    feeAmount: '',
    minimumInvestmentCategory: '',
    minimumInvestment: null,
    pricing: initialAdvisorProfile?.pricing || {
      hourlyRate: undefined,
      portfolioFee: undefined
    },
    preferredClientTypes: [],
    preferredMeetingMethods: [],
    assetsUnderManagement: initialAdvisorProfile?.assetsUnderManagement || 0,
    expertise: initialAdvisorProfile?.expertise || [],
    profilePicture: initialAdvisorProfile?.profilePicture || '',
    matches: initialAdvisorProfile?.matches || [],
    chats: initialAdvisorProfile?.chats || [],
    availability: initialAdvisorProfile?.availability || [],
    chatEnabled: initialAdvisorProfile?.chatEnabled ?? true,
    appointmentCategories: initialAdvisorProfile?.appointmentCategories || DEFAULT_CATEGORIES,
    appointments: initialAdvisorProfile?.appointments || [],
    onlineStatus: initialAdvisorProfile?.onlineStatus || 'online',
    lastOnline: initialAdvisorProfile?.lastOnline || new Date().toISOString(),
    showOnlineStatus: initialAdvisorProfile?.showOnlineStatus ?? true,
    subscriptionPlan: 'basic',
    consentToTerms: false,
    consentToMarketing: false,
    consentToContact: false,
    consentToDataProcessing: false
  });

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
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
  }, []);

  const handleExpertiseChange = useCallback((expertise: ServiceCategory) => {
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
  }, []);

  const handlePictureChange = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: url
    }));
  }, []);

  const handleMultiSelectChange = useCallback((fieldName: string, selectedValue: string) => {
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
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    handleExpertiseChange,
    handlePictureChange,
    handleMultiSelectChange
  };
};

