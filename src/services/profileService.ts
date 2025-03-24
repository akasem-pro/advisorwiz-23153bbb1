
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { UserType, ConsumerProfile, AdvisorProfile } from '../types/profileTypes';
import { 
  fetchConsumerProfile, 
  updateConsumerProfile, 
  initializeConsumerProfile 
} from './profiles/consumerProfileService';
import { 
  fetchAdvisorProfile, 
  updateAdvisorProfile, 
  initializeAdvisorProfile 
} from './profiles/advisorProfileService';

/**
 * Fetch user profile from Supabase based on userType
 */
export const fetchUserProfile = async (userId: string, userType: UserType) => {
  try {
    console.log(`[profileService] Fetching ${userType} profile for user ${userId}`);
    
    if (userType === 'consumer') {
      return await fetchConsumerProfile(userId);
    } else if (userType === 'advisor') {
      return await fetchAdvisorProfile(userId);
    }
    
    return null;
  } catch (error) {
    console.error('[profileService] Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Create or update user profile in Supabase based on userType
 */
export const updateUserProfile = async (
  user: User, 
  userType: UserType, 
  profileData: Partial<ConsumerProfile | AdvisorProfile>
) => {
  try {
    console.log(`[profileService] Updating ${userType} profile for user ${user.id}`, profileData);
    
    let success = false;
    
    if (userType === 'consumer') {
      success = await updateConsumerProfile(user, profileData as Partial<ConsumerProfile>);
    } else if (userType === 'advisor') {
      success = await updateAdvisorProfile(user, profileData as Partial<AdvisorProfile>);
    }
    
    if (success) {
      toast.success('Profile updated successfully');
      return true;
    } else {
      toast.error('Failed to update profile information');
      return false;
    }
  } catch (error) {
    console.error('[profileService] Unexpected error updating profile:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
};

/**
 * Initialize user profile after authentication based on userType
 */
export const initializeUserProfile = async (
  user: User, 
  userType: UserType
): Promise<ConsumerProfile | AdvisorProfile | null> => {
  try {
    console.log(`[profileService] Initializing ${userType} profile for user ${user.id}`);
    
    if (userType === 'consumer') {
      return await initializeConsumerProfile(user);
    } else if (userType === 'advisor') {
      return await initializeAdvisorProfile(user);
    }
    
    return null;
  } catch (error) {
    console.error('[profileService] Error initializing user profile:', error);
    return null;
  }
};
