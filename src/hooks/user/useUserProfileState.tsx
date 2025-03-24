
import { useState } from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile 
} from '../../types/profileTypes';

/**
 * Hook that manages the user profile state
 */
export const useUserProfileState = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    userType, 
    setUserType,
    consumerProfile, 
    setConsumerProfile,
    advisorProfile, 
    setAdvisorProfile,
    isAuthenticated, 
    setIsAuthenticated
  };
};
