
import React from 'react';
import { 
  UserType, 
  ConsumerProfile, 
  AdvisorProfile
} from '../../types/profileTypes';
import { useUserProfileState } from './useUserProfileState';
import { useProfileStatusUpdater } from './useProfileStatusUpdater';
import { updateConsumerProfile } from '../../services/profiles/consumerProfileService';
import { updateAdvisorProfile } from '../../services/profiles/advisorProfileService';
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
      // Double-check authentication both in our state and with Supabase
      const { data, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("[useUserProfiles] Auth error when checking user:", authError);
        toast.error("Authentication error. Please sign in again.");
        setIsAuthenticated(false);
        return false;
      }
      
      const user = data?.user;
      
      if (!user) {
        console.error("[useUserProfiles] Cannot save profile: Not authenticated with Supabase");
        toast.error("Please sign in to save your profile changes");
        setIsAuthenticated(false); // Update our state to match reality
        return false;
      }

      // Set authenticated if we have a user (in case our state was wrong)
      setIsAuthenticated(true);
      
      // For development and testing with mock data
      const isDevelopment = process.env.NODE_ENV === 'development';
      const mockUserIdMatch = user.id === 'mock-user-id';
      
      if (isDevelopment && mockUserIdMatch) {
        console.log("[useUserProfiles] Using mock user ID in development environment");
        // For mock users in development, simulate a successful save
        toast.success("Profile saved successfully (development mode)");
        return true;
      }
      
      let success = false;
      
      if (userType === 'consumer' && consumerProfile) {
        console.log("[useUserProfiles] Saving consumer profile to Supabase:", consumerProfile);
        success = await updateConsumerProfile(user, consumerProfile);
      } else if (userType === 'advisor' && advisorProfile) {
        console.log("[useUserProfiles] Saving advisor profile to Supabase:", advisorProfile);
        success = await updateAdvisorProfile(user, advisorProfile);
      } else {
        console.error("[useUserProfiles] Cannot save profile: Invalid user type or missing profile", {
          userType,
          hasConsumerProfile: !!consumerProfile,
          hasAdvisorProfile: !!advisorProfile
        });
        toast.error("Unable to save profile: Profile data is incomplete");
        return false;
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
      toast.error("An unexpected error occurred while saving your profile");
      return false;
    }
  };

  // Handle profile updates and sync with database
  const handleProfileUpdate = async (profileData: any) => {
    try {
      if (userType === 'consumer') {
        setConsumerProfile(prev => ({ ...prev, ...profileData }));
      } else if (userType === 'advisor') {
        setAdvisorProfile(prev => ({ ...prev, ...profileData }));
      } else {
        console.error("[useUserProfiles] Cannot update profile: Invalid user type", userType);
        return false;
      }
      
      return await saveProfileChanges();
    } catch (error) {
      console.error("[useUserProfiles] Error updating profile:", error);
      toast.error("Failed to update profile");
      return false;
    }
  };

  return {
    userType, setUserType,
    consumerProfile, setConsumerProfile,
    advisorProfile, setAdvisorProfile,
    isAuthenticated, setIsAuthenticated,
    updateOnlineStatus,
    saveProfileChanges,
    handleProfileUpdate
  };
};
