
import { ConsumerProfile } from '../../types/profileTypes';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { fetchBaseProfile, updateBaseProfile } from './baseProfileService';

/**
 * Fetch a consumer profile from Supabase
 */
export const fetchConsumerProfile = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    console.log(`[consumerProfileService] Fetching consumer profile for user ${userId}`);
    
    // First get the base profile data
    const baseProfile = await fetchBaseProfile(userId);
    
    if (!baseProfile) {
      console.log(`[consumerProfileService] No base profile found for ${userId}`);
      return null;
    }
    
    // Then get consumer specific data
    const { data: consumerData, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (consumerError) {
      console.error('[consumerProfileService] Error fetching consumer data:', consumerError);
      return null;
    }
    
    // Combine the data into a consumer profile
    const consumerProfile: ConsumerProfile = {
      id: userId,
      name: `${baseProfile.first_name || ''} ${baseProfile.last_name || ''}`.trim(),
      age: consumerData.age || 0,
      status: consumerData.status || 'new',
      investableAssets: consumerData.investable_assets || 0,
      riskTolerance: consumerData.risk_tolerance || 'medium',
      preferredCommunication: consumerData.preferred_communication || ['email'],
      preferredLanguage: consumerData.preferred_language || ['english'],
      matches: consumerData.matches || [],
      chats: consumerData.chats || [],
      chatEnabled: baseProfile.chat_enabled !== false,
      appointments: consumerData.appointments || [],
      onlineStatus: baseProfile.online_status || 'offline',
      lastOnline: baseProfile.last_online || new Date().toISOString(),
      showOnlineStatus: baseProfile.show_online_status !== false,
      startTimeline: consumerData.start_timeline || null
    };
    
    return consumerProfile;
  } catch (error) {
    console.error('[consumerProfileService] Unexpected error fetching consumer profile:', error);
    return null;
  }
};

/**
 * Update a consumer profile
 */
export const updateConsumerProfile = async (user: User, profileData: ConsumerProfile): Promise<boolean> => {
  try {
    console.log(`[consumerProfileService] Updating consumer profile for user ${user.id}`);
    
    // First update the base profile
    const baseUpdateSuccess = await updateBaseProfile(user, 'consumer', profileData);
    
    if (!baseUpdateSuccess) {
      console.error('[consumerProfileService] Failed to update base profile');
      return false;
    }
    
    // Then update consumer specific data
    const { error: consumerUpsertError } = await supabase
      .from('consumer_profiles')
      .upsert({
        user_id: user.id,
        age: profileData.age,
        status: profileData.status,
        investable_assets: profileData.investableAssets,
        risk_tolerance: profileData.riskTolerance,
        preferred_communication: profileData.preferredCommunication,
        preferred_language: profileData.preferredLanguage,
        service_needs: profileData.serviceNeeds,
        investment_amount: profileData.investmentAmount,
        financial_goals: profileData.financialGoals,
        income_bracket: profileData.incomeBracket,
        income_range: profileData.incomeRange,
        preferred_advisor_specialties: profileData.preferredAdvisorSpecialties,
        matches: profileData.matches,
        chats: profileData.chats,
        appointments: profileData.appointments,
        start_timeline: profileData.startTimeline,
        has_advisor: profileData.hasAdvisor,
        current_advisor_reason: profileData.currentAdvisorReason,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });
    
    if (consumerUpsertError) {
      console.error('[consumerProfileService] Error updating consumer profile:', consumerUpsertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[consumerProfileService] Unexpected error updating consumer profile:', error);
    return false;
  }
};

/**
 * Initialize a new consumer profile
 */
export const initializeConsumerProfile = async (user: User): Promise<ConsumerProfile | null> => {
  try {
    console.log(`[consumerProfileService] Initializing consumer profile for user ${user.id}`);
    
    const defaultConsumerProfile: ConsumerProfile = {
      id: user.id,
      name: user.user_metadata?.name || '',
      age: 0,
      status: 'new',
      investableAssets: 0,
      riskTolerance: 'medium',
      preferredCommunication: ['email'],
      preferredLanguage: ['english'],
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: true
    };
    
    // Update the profile in Supabase
    const success = await updateConsumerProfile(user, defaultConsumerProfile);
    
    if (!success) {
      toast.error('Failed to initialize consumer profile');
      return null;
    }
    
    return defaultConsumerProfile;
  } catch (error) {
    console.error('[consumerProfileService] Unexpected error initializing consumer profile:', error);
    toast.error('Unexpected error initializing consumer profile');
    return null;
  }
};
