
import { ExtendedAdvisorProfileForm } from '../types/advisorTypes';

export const isBasicInfoComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.name && formData.email && formData.phone && formData.province);
};

export const isProfessionalInfoComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.licensingBody && formData.registrationNumber && formData.yearsOfExperience);
};

export const isExpertiseComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return formData.expertise.length > 0;
};

export const isMarketingComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.profilePicture && formData.bio);
};

export const isComplianceComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return formData.consentToBackgroundCheck;
};

export const isConsentComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.consentToTerms && formData.consentToContact);
};

