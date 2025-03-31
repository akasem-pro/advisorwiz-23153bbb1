
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
      .eq('user_id', userId)
      .single();
    
    if (advisorError) {
      console.error('[advisorProfileService] Error fetching advisor data:', advisorError);
      return null;
    }
    
    // Combine the data into an advisor profile
    const advisorProfile: AdvisorProfile = {
      id: userId,
      name: `${baseProfile.first_name || ''} ${baseProfile.last_name || ''}`.trim(),
      organization: advisorData.organization || '',
      isAccredited: advisorData.is_accredited !== false,
      website: advisorData.website || '',
      testimonials: advisorData.testimonials || [],
      languages: advisorData.languages || ['english'],
      pricing: advisorData.pricing || {},
      assetsUnderManagement: advisorData.assets_under_management || 0,
      expertise: advisorData.expertise || [],
      specializations: advisorData.specializations || [],
      yearsOfExperience: advisorData.years_of_experience || 0,
      averageRating: advisorData.average_rating || 0,
      ratingCount: advisorData.rating_count || 0,
      biography: advisorData.biography || '',
      certifications: advisorData.certifications || [],
      matches: advisorData.matches || [],
      chats: advisorData.chats || [],
      chatEnabled: baseProfile.chat_enabled !== false,
      appointmentCategories: advisorData.appointment_categories || [],
      appointments: advisorData.appointments || [],
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
        user_id: user.id,
        organization: profileData.organization,
        is_accredited: profileData.isAccredited,
        website: profileData.website,
        testimonials: profileData.testimonials,
        languages: profileData.languages,
        pricing: profileData.pricing,
        assets_under_management: profileData.assetsUnderManagement,
        expertise: profileData.expertise,
        specializations: profileData.specializations,
        years_of_experience: profileData.yearsOfExperience,
        average_rating: profileData.averageRating,
        rating_count: profileData.ratingCount,
        biography: profileData.biography,
        certifications: profileData.certifications,
        location: profileData.location,
        matches: profileData.matches,
        compatibility_scores: profileData.compatibilityScores,
        chats: profileData.chats,
        availability: profileData.availability,
        appointment_categories: profileData.appointmentCategories,
        appointments: profileData.appointments,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
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
      pricing: {},
      assetsUnderManagement: 0,
      expertise: [],
      matches: [],
      chats: [],
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
