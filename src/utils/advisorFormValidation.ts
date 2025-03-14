
import { ExtendedAdvisorProfileForm } from '../types/advisorTypes';

/**
 * Validates basic information section
 */
export const isBasicInfoComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(
    formData.name && 
    formData.email && 
    formData.phone && 
    formData.province
  );
};

/**
 * Validates professional credentials section
 */
export const isProfessionalInfoComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(
    formData.licensingBody && 
    formData.registrationNumber && 
    formData.yearsOfExperience
  );
};

/**
 * Validates expertise section
 */
export const isExpertiseComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return formData.expertise.length > 0;
};

/**
 * Validates marketing section
 */
export const isMarketingComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.profilePicture && formData.bio);
};

/**
 * Validates fee structure section
 */
export const isFeeStructureComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!formData.feeStructure;
};

/**
 * Validates compliance section
 */
export const isComplianceComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return formData.consentToBackgroundCheck;
};

/**
 * Validates consent section
 */
export const isConsentComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!(formData.consentToTerms && formData.consentToContact);
};

/**
 * Validates subscription section
 */
export const isSubscriptionComplete = (formData: ExtendedAdvisorProfileForm): boolean => {
  return !!formData.subscriptionPlan;
};

/**
 * Validates email format
 */
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format (North American)
 */
export const isPhoneValid = (phone: string): boolean => {
  // Basic validation - at least 10 digits
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
};

/**
 * Calculates overall profile completion percentage
 */
export const calculateProfileCompletion = (formData: ExtendedAdvisorProfileForm): number => {
  let completedSections = 0;
  let totalSections = 8; // Total number of form sections
  
  if (isBasicInfoComplete(formData)) completedSections++;
  if (isProfessionalInfoComplete(formData)) completedSections++;
  if (isExpertiseComplete(formData)) completedSections++;
  if (isFeeStructureComplete(formData)) completedSections++;
  if (isMarketingComplete(formData)) completedSections++;
  if (isComplianceComplete(formData)) completedSections++;
  if (isSubscriptionComplete(formData)) completedSections++;
  if (isConsentComplete(formData)) completedSections++;
  
  return (completedSections / totalSections) * 100;
};
