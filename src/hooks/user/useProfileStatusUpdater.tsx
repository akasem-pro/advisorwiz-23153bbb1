
import { useState } from 'react';
import { ConsumerProfile, AdvisorProfile } from '../../types/profileTypes';

/**
 * Hook to handle updating user profile online status
 * Refactored for better performance and maintainability
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
    
    // Update using a common function for both profile types
    const updateProfileWithStatus = <T extends ConsumerProfile | AdvisorProfile>(
      profile: T | null,
      setProfile: React.Dispatch<React.SetStateAction<T | null>>
    ) => {
      if (profile) {
        setProfile(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            onlineStatus: status,
            lastOnline: timestamp
          };
        });
      }
    };

    // Apply updates to both profile types
    updateProfileWithStatus(consumerProfile, setConsumerProfile);
    updateProfileWithStatus(advisorProfile, setAdvisorProfile);

    return true;
  };

  return { updateOnlineStatus };
};
