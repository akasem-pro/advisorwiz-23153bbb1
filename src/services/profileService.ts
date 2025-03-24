
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { UserType, ConsumerProfile, AdvisorProfile } from '../types/profileTypes';

/**
 * Fetch user profile from Supabase
 */
export const fetchUserProfile = async (userId: string, userType: UserType) => {
  try {
    console.log(`[profileService] Fetching ${userType} profile for user ${userId}`);
    
    // First check if a profile exists in the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('[profileService] Error fetching profile:', profileError);
      return null;
    }
    
    // If user type is consumer, get consumer profile
    if (userType === 'consumer') {
      const { data: consumerData, error: consumerError } = await supabase
        .from('consumer_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (consumerError && consumerError.code !== 'PGRST116') { // Not found error code
        console.error('[profileService] Error fetching consumer profile:', consumerError);
      }
      
      // Combine profile and consumer data
      return {
        ...profileData,
        ...consumerData
      } as ConsumerProfile;
    }
    
    // If user type is advisor, get advisor profile
    if (userType === 'advisor') {
      const { data: advisorData, error: advisorError } = await supabase
        .from('advisor_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (advisorError && advisorError.code !== 'PGRST116') { // Not found error code
        console.error('[profileService] Error fetching advisor profile:', advisorError);
      }
      
      // Combine profile and advisor data
      return {
        ...profileData,
        ...advisorData
      } as AdvisorProfile;
    }
    
    return profileData;
  } catch (error) {
    console.error('[profileService] Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Create or update user profile in Supabase
 */
export const updateUserProfile = async (
  user: User, 
  userType: UserType, 
  profileData: Partial<ConsumerProfile | AdvisorProfile>
) => {
  try {
    console.log(`[profileService] Updating ${userType} profile for user ${user.id}`, profileData);
    
    // First, ensure base profile exists
    const { error: profileUpsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        user_type: userType,
        updated_at: new Date().toISOString(),
        ...profileData
      }, {
        onConflict: 'id'
      });
    
    if (profileUpsertError) {
      console.error('[profileService] Error updating base profile:', profileUpsertError);
      toast.error('Failed to update profile information');
      return false;
    }
    
    // Then update the specific profile type
    if (userType === 'consumer') {
      const { error: consumerUpsertError } = await supabase
        .from('consumer_profiles')
        .upsert({
          id: user.id,
          ...profileData
        }, {
          onConflict: 'id'
        });
      
      if (consumerUpsertError) {
        console.error('[profileService] Error updating consumer profile:', consumerUpsertError);
        toast.error('Failed to update consumer profile information');
        return false;
      }
    } else if (userType === 'advisor') {
      const { error: advisorUpsertError } = await supabase
        .from('advisor_profiles')
        .upsert({
          id: user.id,
          ...profileData
        }, {
          onConflict: 'id'
        });
      
      if (advisorUpsertError) {
        console.error('[profileService] Error updating advisor profile:', advisorUpsertError);
        toast.error('Failed to update advisor profile information');
        return false;
      }
    }
    
    toast.success('Profile updated successfully');
    return true;
  } catch (error) {
    console.error('[profileService] Unexpected error updating profile:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
};

/**
 * Initialize user profile after authentication
 */
export const initializeUserProfile = async (
  user: User, 
  userType: UserType
): Promise<ConsumerProfile | AdvisorProfile | null> => {
  try {
    console.log(`[profileService] Initializing ${userType} profile for user ${user.id}`);
    
    // Check if profile already exists
    const existingProfile = await fetchUserProfile(user.id, userType);
    
    if (existingProfile) {
      console.log('[profileService] Found existing profile', existingProfile);
      return existingProfile as ConsumerProfile | AdvisorProfile;
    }
    
    // Profile doesn't exist, create one
    console.log('[profileService] No existing profile found, creating default profile');
    
    const email = user.email?.toLowerCase() || '';
    
    let profileData: Partial<ConsumerProfile | AdvisorProfile> = {
      id: user.id,
      email: email,
      user_type: userType,
    };
    
    if (userType === 'consumer') {
      profileData = {
        ...profileData,
        name: email.split('@')[0] || 'User',
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
      };
    } else if (userType === 'advisor') {
      profileData = {
        ...profileData,
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
      };
    }
    
    const success = await updateUserProfile(user, userType, profileData);
    
    if (success) {
      return profileData as ConsumerProfile | AdvisorProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('[profileService] Error initializing user profile:', error);
    return null;
  }
};
