
import { useState } from 'react';
import { ConsumerProfile, AdvisorProfile } from '../../types/profileTypes';

/**
 * Hook to handle updating user profile online status
 */
export const useProfileStatusUpdater = (
  consumerProfile: ConsumerProfile | null,
  setConsumerProfile: React.Dispatch<React.SetStateAction<ConsumerProfile | null>>,
  advisorProfile: AdvisorProfile | null,
  setAdvisorProfile: React.Dispatch<React.SetStateAction<AdvisorProfile | null>>
) => {
  // Update online status and last online timestamp
  const updateOnlineStatus = (status: 'online' | 'offline' | 'away') => {
    const timestamp = new Date().toISOString();

    if (consumerProfile) {
      setConsumerProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          onlineStatus: status,
          lastOnline: timestamp
        };
      });
    }

    if (advisorProfile) {
      setAdvisorProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          onlineStatus: status,
          lastOnline: timestamp
        };
      });
    }

    return true;
  };

  return { updateOnlineStatus };
};
