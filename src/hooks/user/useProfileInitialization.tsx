
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { UserType, ConsumerProfile, AdvisorProfile } from '../../types/profileTypes';

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
  const initializeUserProfiles = (user: User) => {
    const email = user.email?.toLowerCase() || '';
    
    if (email.includes('consumer')) {
      setUserType('consumer');
      createConsumerProfile(user, email);
    } else if (email.includes('advisor')) {
      setUserType('advisor');
      createAdvisorProfile(user, email);
    } else {
      // Default to consumer
      setUserType('consumer');
      createConsumerProfile(user, email);
    }
  };

  /**
   * Create a consumer profile with default values
   */
  const createConsumerProfile = (user: User, email: string) => {
    if (!consumerProfile) {
      setConsumerProfile({
        id: user.id,
        name: email.split('@')[0] || 'User',
        email: email,
        age: 30,
        status: 'employed',
        investableAssets: 100000,
        riskTolerance: 'medium',
        preferredCommunication: ['email'],
        preferredLanguage: ['english'],
        matches: [],
        chats: [],
        chatEnabled: true,
        appointments: [],
        startTimeline: 'not_sure',
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      });
    }
  };

  /**
   * Create an advisor profile with default values
   */
  const createAdvisorProfile = (user: User, email: string) => {
    if (!advisorProfile) {
      setAdvisorProfile({
        id: user.id,
        name: email.split('@')[0],
        organization: 'Demo Financial',
        isAccredited: true,
        website: 'https://example.com',
        testimonials: [],
        languages: ['english'],
        pricing: {},
        assetsUnderManagement: 5000000,
        expertise: ['investment', 'retirement'],
        matches: [],
        chats: [],
        chatEnabled: true,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: 'online',
        lastOnline: new Date().toISOString(),
        showOnlineStatus: true
      });
    }
  };

  return {
    initializeUserProfiles
  };
};
