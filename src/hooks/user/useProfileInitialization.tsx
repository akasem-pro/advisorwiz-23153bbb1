
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { UserType, ConsumerProfile, AdvisorProfile } from '../../types/profileTypes';
import { initializeUserProfile } from '../../services/profileService';

/**
 * Hook to handle initializing user profiles based on authentication
 */
export const useProfileInitialization = (
  user: User | null,
  userType: UserType,
  setUserType: (type: UserType) => void,
  consumerProfile: ConsumerProfile | null,
  setConsumerProfile: (profile: ConsumerProfile | null) => void,
  advisorProfile: AdvisorProfile | null,
  setAdvisorProfile: (profile: AdvisorProfile | null) => void,
  setIsAuthenticated: (value: boolean) => void
) => {
  useEffect(() => {
    if (user) {
      console.log("[useProfileInitialization] User authenticated:", user);
      setIsAuthenticated(true);
      
      // For demo purposes, assign a default userType if not already set
      // In a real app, this would come from the user's profile in the database
      if (!userType) {
        initializeUserProfiles(user);
      }
    } else {
      console.log("[useProfileInitialization] No authenticated user");
      setIsAuthenticated(false);
    }
  }, [user, userType]);

  /**
   * Initialize user profiles based on email patterns for demo
   */
  const initializeUserProfiles = async (user: User) => {
    const email = user.email?.toLowerCase() || '';
    
    let type: UserType = 'consumer';
    if (email.includes('consumer')) {
      type = 'consumer';
    } else if (email.includes('advisor')) {
      type = 'advisor';
    } else {
      // Default to consumer
      type = 'consumer';
    }
    
    setUserType(type);
    
    // Initialize the profile using our service
    const profile = await initializeUserProfile(user, type);
    
    if (profile) {
      if (type === 'consumer') {
        setConsumerProfile(profile as ConsumerProfile);
      } else if (type === 'advisor') {
        setAdvisorProfile(profile as AdvisorProfile);
      }
    }
  };

  return {
    initializeUserProfiles
  };
};
