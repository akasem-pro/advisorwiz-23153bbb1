
import { ConsumerProfile, AdvisorProfile } from '../types/userTypes';

/**
 * Hook that provides user status operations
 */
export const useUserStatus = (
  consumerProfile: ConsumerProfile | null,
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>,
  advisorProfile: AdvisorProfile | null,
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>
) => {
  const updateOnlineStatus = (status: 'online' | 'offline' | 'away') => {
    if (consumerProfile) {
      setConsumerProfile({
        ...consumerProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    } else if (advisorProfile) {
      setAdvisorProfile({
        ...advisorProfile,
        onlineStatus: status,
        lastOnline: new Date().toISOString()
      });
    }
  };

  return {
    updateOnlineStatus
  };
};
