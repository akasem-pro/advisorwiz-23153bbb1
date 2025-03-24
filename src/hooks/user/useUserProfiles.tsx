
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile
} from '../../types/profileTypes';
import { useUserProfileState } from './useUserProfileState';
import { useProfileStatusUpdater } from './useProfileStatusUpdater';

/**
 * Hook to manage user profile state and operations
 */
export const useUserProfiles = () => {
  // Use separate hooks for state management and status updates
  const {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated
  } = useUserProfileState();

  // Status updater hook
  const { updateOnlineStatus } = useProfileStatusUpdater(
    consumerProfile,
    setConsumerProfile,
    advisorProfile,
    setAdvisorProfile
  );

  return {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus
  };
};
