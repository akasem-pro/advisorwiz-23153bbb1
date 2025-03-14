
import { useAdvisorFormState } from './advisor-profile/useAdvisorFormState';
import { useFormHandlers } from './advisor-profile/useFormHandlers';
import { useExpertiseHandlers } from './advisor-profile/useExpertiseHandlers';
import { useTestimonialHandlers } from './advisor-profile/useTestimonialHandlers';
import { useProfileSettingsHandlers } from './advisor-profile/useProfileSettingsHandlers';
import { AdvisorProfile } from '../context/UserContext';

export const useAdvisorProfileForm = (advisorProfile?: AdvisorProfile | null) => {
  const {
    formData,
    setFormData,
    isEmailVerified,
    setIsEmailVerified,
    isPhoneVerified,
    setIsPhoneVerified,
    newTestimonial,
    setNewTestimonial
  } = useAdvisorFormState(advisorProfile);

  const { handleChange, handleButtonClick, handleMultiSelectChange } = 
    useFormHandlers(formData, setFormData, setNewTestimonial);

  const { handleExpertiseChange, isExpertiseSelected, handleLanguageChange } = 
    useExpertiseHandlers(formData, setFormData);

  const { handleTestimonialChange, addTestimonial, removeTestimonial } = 
    useTestimonialHandlers(formData, setFormData, newTestimonial, setNewTestimonial);

  const {
    handlePictureChange,
    handleAvailabilityChange,
    handleToggleChat,
    handleToggleOnlineStatus,
    handleStatusChange,
    handleVerifyEmail: verifyEmail,
    handleVerifyPhone: verifyPhone,
    handleSubscriptionSelect
  } = useProfileSettingsHandlers(setFormData);

  // Wrapper functions to update the verification state
  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    setIsPhoneVerified(true);
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
