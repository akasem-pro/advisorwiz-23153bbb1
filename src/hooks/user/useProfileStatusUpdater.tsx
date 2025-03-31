
import React, { useCallback } from 'react';
import { 
  ConsumerProfile, 
  AdvisorProfile 
} from '../../types/profileTypes';

/**
 * Hook for updating profile status information
 */
export const useProfileStatusUpdater = (
  consumerProfile: ConsumerProfile | null,
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>,
  advisorProfile: AdvisorProfile | null,
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>
) => {
  // Update online status for the appropriate profile
  const updateOnlineStatus = useCallback((status: 'online' | 'offline' | 'away') => {
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
  }, [consumerProfile, setConsumerProfile, advisorProfile, setAdvisorProfile]);

  return {
    updateOnlineStatus
  };
};
