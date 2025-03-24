
import { supabase } from '../../integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { AdvisorProfile } from '../../types/profileTypes';
import { fetchBaseProfile, updateBaseProfile } from './baseProfileService';

/**
 * Fetch advisor profile from Supabase
 */
export const fetchAdvisorProfile = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    console.log(`[advisorProfileService] Fetching advisor profile for user ${userId}`);
    
    // First get the base profile
    const profileData = await fetchBaseProfile(userId);
    if (!profileData) return null;
    
    // Get advisor-specific profile data
    const { data: advisorData, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (advisorError && advisorError.code !== 'PGRST116') { // Not found error code
      console.error('[advisorProfileService] Error fetching advisor profile:', advisorError);
    }
    
    // Map database data to our AdvisorProfile type
    const advisorProfile: AdvisorProfile = {
      id: userId,
      name: profileData?.first_name ? `${profileData.first_name} ${profileData?.last_name || ''}`.trim() : 'Advisor',
      organization: advisorData?.organization || 'Demo Financial',
      isAccredited: advisorData?.is_accredited === true,
      website: advisorData?.website || '',
      testimonials: [],
      // Check if languages exists in advisorData first, fall back to profileData, then empty array
      languages: advisorData?.languages || (profileData as any)?.languages || ['english'],
      pricing: {
        hourlyRate: advisorData?.hourly_rate,
        portfolioFee: advisorData?.portfolio_fee
      },
      assetsUnderManagement: advisorData?.assets_under_management || 0,
      expertise: advisorData?.expertise || ['investment', 'retirement'],
      specializations: advisorData?.certifications || [],
      yearsOfExperience: advisorData?.years_of_experience || 0,
      averageRating: advisorData?.average_rating || 0,
      ratingCount: advisorData?.rating_count || 0,
      biography: advisorData?.biography || '',
      certifications: advisorData?.certifications || [],
      profilePicture: profileData?.avatar_url || '',
      matches: [],
      chats: [],
      availability: [],
      chatEnabled: profileData?.chat_enabled !== false,
      appointmentCategories: [],
      appointments: [],
      onlineStatus: (profileData?.online_status as 'online' | 'offline' | 'away') || 'online',
      lastOnline: profileData?.last_online || new Date().toISOString(),
      showOnlineStatus: profileData?.show_online_status !== false
    };
    
    return advisorProfile;
  } catch (error) {
    console.error('[advisorProfileService] Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Update advisor profile in Supabase
 */
export const updateAdvisorProfile = async (
  user: User,
  profileData: Partial<AdvisorProfile>
) => {
  try {
    console.log(`[advisorProfileService] Updating advisor profile for user ${user.id}`, profileData);
    
    // First update the base profile
    const baseUpdated = await updateBaseProfile(user, 'advisor', profileData);
    if (!baseUpdated) {
      return false;
    }
    
    // Update advisor-specific profile data
    const advisorData: any = {
      id: user.id,
      is_accredited: profileData.isAccredited,
      organization: profileData.organization,
      website: profileData.website,
      hourly_rate: profileData.pricing?.hourlyRate,
      portfolio_fee: profileData.pricing?.portfolioFee,
      assets_under_management: profileData.assetsUnderManagement,
      expertise: profileData.expertise,
      years_of_experience: profileData.yearsOfExperience,
      biography: profileData.biography,
      certifications: profileData.certifications,
      // Update the languages field if it exists
      languages: profileData.languages,
      updated_at: new Date().toISOString()
    };
    
    const { error: advisorUpsertError } = await supabase
      .from('advisor_profiles')
      .upsert(advisorData, {
        onConflict: 'id'
      });
    
    if (advisorUpsertError) {
      console.error('[advisorProfileService] Error updating advisor profile:', advisorUpsertError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[advisorProfileService] Unexpected error updating profile:', error);
    return false;
  }
};

/**
 * Initialize advisor profile with default values
 */
export const initializeAdvisorProfile = async (user: User): Promise<AdvisorProfile | null> => {
  try {
    console.log(`[advisorProfileService] Initializing advisor profile for user ${user.id}`);
    
    // Check if profile already exists
    const existingProfile = await fetchAdvisorProfile(user.id);
    
    if (existingProfile) {
      console.log('[advisorProfileService] Found existing profile', existingProfile);
      return existingProfile;
    }
    
    // Profile doesn't exist, create one
    console.log('[advisorProfileService] No existing profile found, creating default profile');
    
    const email = user.email?.toLowerCase() || '';
    let name = email.split('@')[0] || 'User';
    
    // Try to capitalize the name
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    const profileData: Partial<AdvisorProfile> = {
      id: user.id,
      name,
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
    
    const success = await updateAdvisorProfile(user, profileData);
    
    if (success) {
      return profileData as AdvisorProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('[advisorProfileService] Error initializing user profile:', error);
    return null;
  }
};
