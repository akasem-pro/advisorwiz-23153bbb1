
import { AdvisorProfile } from '../../types/profileTypes';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { fetchBaseProfile, updateBaseProfile } from './baseProfileService';

/**
 * Fetch an advisor profile from Supabase
 */
export const fetchAdvisorProfile = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    console.log(`[advisorProfileService] Fetching advisor profile for user ${userId}`);
    
    // First get the base profile data
    const baseProfile = await fetchBaseProfile(userId);
    
    if (!baseProfile) {
      console.log(`[advisorProfileService] No base profile found for ${userId}`);
      return null;
    }
    
    // Then get advisor specific data
    const { data: advisorData, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (advisorError && advisorError.code !== 'PGRST116') {
      console.error('[advisorProfileService] Error fetching advisor data:', advisorError);
      return null;
    }

    // If no advisor data exists, return minimal profile
    if (!advisorData) {
      const minimalAdvisorProfile: AdvisorProfile = {
        id: userId,
        name: `${baseProfile.first_name || ''} ${baseProfile.last_name || ''}`.trim(),
        organization: '',
        isAccredited: false,
        website: '',
        testimonials: [],
        languages: ['english'],
        pricing: {
          hourlyRate: 0,
          portfolioFee: 0
        },
        assetsUnderManagement: 0,
        expertise: [],
        specializations: [],
        profilePicture: baseProfile.profile_picture || '',
        matches: [],
        chats: [],
        availability: [],
        chatEnabled: baseProfile.chat_enabled !== false,
        appointmentCategories: [],
        appointments: [],
        onlineStatus: baseProfile.online_status || 'offline',
        lastOnline: baseProfile.last_online || new Date().toISOString(),
        showOnlineStatus: baseProfile.show_online_status !== false
      };
      return minimalAdvisorProfile;
    }
    
    // Create the advisor profile from the data
    const advisorProfile: AdvisorProfile = {
      id: userId,
      name: `${baseProfile.first_name || ''} ${baseProfile.last_name || ''}`.trim(),
      organization: advisorData.organization || '',
      isAccredited: advisorData.is_accredited || false,
      website: advisorData.website || '',
      testimonials: Array.isArray(advisorData.testimonials) ? advisorData.testimonials : [],
      languages: Array.isArray(advisorData.languages) ? advisorData.languages : ['english'],
      pricing: {
        hourlyRate: advisorData.hourly_rate || 0,
        portfolioFee: advisorData.portfolio_fee || 0
      },
      assetsUnderManagement: advisorData.assets_under_management || 0,
      expertise: Array.isArray(advisorData.expertise) ? advisorData.expertise : [],
      specializations: Array.isArray(advisorData.specializations) ? advisorData.specializations : [],
      profilePicture: baseProfile.profile_picture || advisorData.profile_picture || '',
      matches: Array.isArray(advisorData.matches) ? advisorData.matches : [],
      chats: Array.isArray(advisorData.chats) ? advisorData.chats : [],
      availability: Array.isArray(advisorData.availability) ? advisorData.availability : [],
      chatEnabled: baseProfile.chat_enabled !== false,
      appointmentCategories: Array.isArray(advisorData.appointment_categories) ? advisorData.appointment_categories : [],
      appointments: Array.isArray(advisorData.appointments) ? advisorData.appointments : [],
      onlineStatus: baseProfile.online_status || 'offline',
      lastOnline: baseProfile.last_online || new Date().toISOString(),
      showOnlineStatus: baseProfile.show_online_status !== false
    };
    
    return advisorProfile;
  } catch (error) {
    console.error('[advisorProfileService] Unexpected error fetching advisor profile:', error);
    return null;
  }
};

/**
 * Update an advisor profile
 */
export const updateAdvisorProfile = async (user: User, profileData: AdvisorProfile): Promise<boolean> => {
  try {
    console.log(`[advisorProfileService] Updating advisor profile for user ${user.id}`);
    
    // First update the base profile
    const baseUpdateSuccess = await updateBaseProfile(user, 'advisor', profileData);
    
    if (!baseUpdateSuccess) {
      console.error('[advisorProfileService] Failed to update base profile');
      return false;
    }
    
    // Then update advisor specific data
    const { error: advisorUpsertError } = await supabase
      .from('advisor_profiles')
      .upsert({
        id: user.id,
        organization: profileData.organization,
        is_accredited: profileData.isAccredited,
        website: profileData.website,
        testimonials: profileData.testimonials || [],
        languages: profileData.languages,
        hourly_rate: profileData.pricing?.hourlyRate || 0,
        portfolio_fee: profileData.pricing?.portfolioFee || 0,
        assets_under_management: profileData.assetsUnderManagement,
        expertise: profileData.expertise,
        specializations: profileData.specializations || [],
        availability: profileData.availability,
        matches: profileData.matches || [],
        chats: profileData.chats || [],
        appointment_categories: profileData.appointmentCategories || [],
        appointments: profileData.appointments || [],
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });
    
    if (advisorUpsertError) {
      console.error('[advisorProfileService] Error updating advisor profile:', advisorUpsertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[advisorProfileService] Unexpected error updating advisor profile:', error);
    return false;
  }
};

/**
 * Initialize a new advisor profile
 */
export const initializeAdvisorProfile = async (user: User): Promise<AdvisorProfile | null> => {
  try {
    console.log(`[advisorProfileService] Initializing advisor profile for user ${user.id}`);
    
    const defaultAdvisorProfile: AdvisorProfile = {
      id: user.id,
      name: user.user_metadata?.name || '',
      organization: '',
      isAccredited: false,
      website: '',
      testimonials: [],
      languages: ['english'],
      pricing: {
        hourlyRate: 0,
        portfolioFee: 0
      },
      assetsUnderManagement: 0,
      expertise: [],
      specializations: [],
      profilePicture: '',
      matches: [],
      chats: [],
      availability: [],
      chatEnabled: true,
      appointmentCategories: [],
      appointments: [],
      onlineStatus: 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: true
    };
    
    // Update the profile in Supabase
    const success = await updateAdvisorProfile(user, defaultAdvisorProfile);
    
    if (!success) {
      toast.error('Failed to initialize advisor profile');
      return null;
    }
    
    return defaultAdvisorProfile;
  } catch (error) {
    console.error('[advisorProfileService] Unexpected error initializing advisor profile:', error);
    toast.error('Unexpected error initializing advisor profile');
    return null;
  }
};
