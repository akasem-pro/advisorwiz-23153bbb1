
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile
} from '../../types/profileTypes';
import { useUserProfileState } from './useUserProfileState';
import { useProfileStatusUpdater } from './useProfileStatusUpdater';
import { updateConsumerProfile, updateAdvisorProfile } from '../../services/profiles/consumerProfileService';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

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

  // Save profile changes to Supabase
  const saveProfileChanges = async () => {
    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("[useUserProfiles] Cannot save profile: No authenticated user");
        toast.error("Please sign in to save your profile changes");
        return false;
      }
      
      let success = false;
      
      if (userType === 'consumer' && consumerProfile) {
        console.log("[useUserProfiles] Saving consumer profile to Supabase:", consumerProfile);
        success = await updateConsumerProfile(user, consumerProfile);
      } else if (userType === 'advisor' && advisorProfile) {
        console.log("[useUserProfiles] Saving advisor profile to Supabase:", advisorProfile);
        success = await updateAdvisorProfile(user, advisorProfile);
      }
      
      if (success) {
        toast.success("Profile saved successfully");
        return true;
      } else {
        toast.error("Failed to save profile changes");
        return false;
      }
    } catch (error) {
      console.error("[useUserProfiles] Error saving profile:", error);
      toast.error("An unexpected error occurred");
      return false;
    }
  };

  return {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus,
    saveProfileChanges
  };
};
