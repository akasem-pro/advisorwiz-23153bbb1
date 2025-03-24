
import { supabase } from '../../integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ConsumerProfile } from '../../types/profileTypes';
import { fetchBaseProfile, updateBaseProfile } from './baseProfileService';

/**
 * Fetch consumer profile from Supabase
 */
export const fetchConsumerProfile = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    console.log(`[consumerProfileService] Fetching consumer profile for user ${userId}`);
    
    // First get the base profile
    const profileData = await fetchBaseProfile(userId);
    if (!profileData) return null;
    
    // Get consumer-specific profile data
    const { data: consumerData, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (consumerError && consumerError.code !== 'PGRST116') { // Not found error code
      console.error('[consumerProfileService] Error fetching consumer profile:', consumerError);
    }
    
    // Map database data to our ConsumerProfile type
    const consumerProfile: ConsumerProfile = {
      id: userId,
      name: profileData?.first_name || 'User',
      age: consumerData?.age || 30,
      status: 'employed',
      investableAssets: consumerData?.investable_assets || 0,
      riskTolerance: (consumerData?.risk_tolerance as 'low' | 'medium' | 'high') || 'medium',
      preferredCommunication: consumerData?.preferred_communication || ['email'],
      preferredLanguage: consumerData?.preferred_language || ['english'],
      serviceNeeds: consumerData?.service_needs || [],
      investmentAmount: consumerData?.investment_amount || 0,
      financialGoals: consumerData?.financial_goals || [],
      incomeBracket: consumerData?.income_bracket || '',
      preferredAdvisorSpecialties: consumerData?.preferred_advisor_specialties || [],
      // Check if languages exists on profileData, if not use an empty array
      languages: (profileData as any)?.languages || [],
      matches: [],
      chats: [],
      profilePicture: profileData?.avatar_url || '',
      chatEnabled: profileData?.chat_enabled !== false,
      appointments: [],
      startTimeline: (consumerData?.start_timeline as 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' | null) || 'not_sure',
      onlineStatus: (profileData?.online_status as 'online' | 'offline' | 'away') || 'online',
      lastOnline: profileData?.last_online || new Date().toISOString(),
      showOnlineStatus: profileData?.show_online_status !== false,
      email: profileData?.email || '',
      phone: profileData?.phone || '',
    };
    
    return consumerProfile;
  } catch (error) {
    console.error('[consumerProfileService] Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Update consumer profile in Supabase
 */
export const updateConsumerProfile = async (
  user: User,
  profileData: Partial<ConsumerProfile>
) => {
  try {
    console.log(`[consumerProfileService] Updating consumer profile for user ${user.id}`, profileData);
    
    // First update the base profile
    const baseUpdated = await updateBaseProfile(user, 'consumer', profileData);
    if (!baseUpdated) {
      return false;
    }
    
    // Update consumer-specific profile data
    const consumerData: any = {
      id: user.id,
      age: profileData.age,
      investable_assets: profileData.investableAssets,
      risk_tolerance: profileData.riskTolerance,
      preferred_communication: profileData.preferredCommunication,
      preferred_language: profileData.preferredLanguage,
      service_needs: profileData.serviceNeeds,
      investment_amount: profileData.investmentAmount,
      financial_goals: profileData.financialGoals,
      income_bracket: profileData.incomeBracket,
      preferred_advisor_specialties: profileData.preferredAdvisorSpecialties,
      start_timeline: profileData.startTimeline,
      updated_at: new Date().toISOString()
    };
    
    const { error: consumerUpsertError } = await supabase
      .from('consumer_profiles')
      .upsert(consumerData, {
        onConflict: 'id'
      });
    
    if (consumerUpsertError) {
      console.error('[consumerProfileService] Error updating consumer profile:', consumerUpsertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[consumerProfileService] Unexpected error updating profile:', error);
    return false;
  }
};

/**
 * Initialize consumer profile with default values
 */
export const initializeConsumerProfile = async (user: User): Promise<ConsumerProfile | null> => {
  try {
    console.log(`[consumerProfileService] Initializing consumer profile for user ${user.id}`);
    
    // Check if profile already exists
    const existingProfile = await fetchConsumerProfile(user.id);
    
    if (existingProfile) {
      console.log('[consumerProfileService] Found existing profile', existingProfile);
      return existingProfile;
    }
    
    // Profile doesn't exist, create one
    console.log('[consumerProfileService] No existing profile found, creating default profile');
    
    const email = user.email?.toLowerCase() || '';
    let name = email.split('@')[0] || 'User';
    
    // Try to capitalize the name
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    const profileData: Partial<ConsumerProfile> = {
      id: user.id,
      name,
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
      showOnlineStatus: true,
      email: email
    };
    
    const success = await updateConsumerProfile(user, profileData);
    
    if (success) {
      return profileData as ConsumerProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('[consumerProfileService] Error initializing user profile:', error);
    return null;
  }
};
