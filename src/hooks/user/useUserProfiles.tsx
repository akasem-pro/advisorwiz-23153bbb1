
import { useState, useCallback } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile
} from '../../types/profileTypes';

/**
 * Hook to manage user profile state and operations
 */
export const useUserProfiles = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  }, [consumerProfile, advisorProfile]);

  return {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus
  };
};
