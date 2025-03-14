
import { TimeSlot } from '../../context/UserContext';
import { ExtendedAdvisorProfileForm } from '../../types/advisorTypes';

export const useProfileSettingsHandlers = (
  setFormData: React.Dispatch<React.SetStateAction<ExtendedAdvisorProfileForm>>
) => {
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
    return true; // This will be used by the main hook
  };

  const handleVerifyPhone = () => {
    return true; // This will be used by the main hook
  };

  const handleSubscriptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setFormData(prev => ({
      ...prev,
      subscriptionPlan: planId
    }));
  };

  return {
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
