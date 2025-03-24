
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
        languages: profileData?.languages || [],
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
      
      // Map database data to our AdvisorProfile type
      const advisorProfile: AdvisorProfile = {
        id: userId,
        name: profileData?.first_name ? `${profileData.first_name} ${profileData?.last_name || ''}`.trim() : 'Advisor',
        organization: advisorData?.organization || 'Demo Financial',
        isAccredited: advisorData?.is_accredited === true,
        website: advisorData?.website || '',
        testimonials: [],
        languages: profileData?.languages || ['english'],
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
    }
    
    return null;
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
    
    // Prepare base profile data
    const baseProfileData: any = {
      // Only include fields that are in the profiles table
      first_name: profileData.name ? profileData.name.split(' ')[0] : undefined,
      last_name: profileData.name ? profileData.name.split(' ').slice(1).join(' ') : undefined,
      email: (profileData as any).email,
      phone: (profileData as any).phone,
      avatar_url: profileData.profilePicture,
      chat_enabled: profileData.chatEnabled,
      online_status: profileData.onlineStatus,
      last_online: profileData.lastOnline,
      show_online_status: profileData.showOnlineStatus,
      updated_at: new Date().toISOString()
    };
    
    // First, ensure base profile exists
    const { error: profileUpsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        user_type: userType,
        ...baseProfileData
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
      const consumerProfile = profileData as Partial<ConsumerProfile>;
      const consumerData: any = {
        id: user.id,
        age: consumerProfile.age,
        investable_assets: consumerProfile.investableAssets,
        risk_tolerance: consumerProfile.riskTolerance,
        preferred_communication: consumerProfile.preferredCommunication,
        preferred_language: consumerProfile.preferredLanguage,
        service_needs: consumerProfile.serviceNeeds,
        investment_amount: consumerProfile.investmentAmount,
        financial_goals: consumerProfile.financialGoals,
        income_bracket: consumerProfile.incomeBracket,
        preferred_advisor_specialties: consumerProfile.preferredAdvisorSpecialties,
        start_timeline: consumerProfile.startTimeline,
        updated_at: new Date().toISOString()
      };
      
      const { error: consumerUpsertError } = await supabase
        .from('consumer_profiles')
        .upsert(consumerData, {
          onConflict: 'id'
        });
      
      if (consumerUpsertError) {
        console.error('[profileService] Error updating consumer profile:', consumerUpsertError);
        toast.error('Failed to update consumer profile information');
        return false;
      }
    } else if (userType === 'advisor') {
      const advisorProfile = profileData as Partial<AdvisorProfile>;
      const advisorData: any = {
        id: user.id,
        is_accredited: advisorProfile.isAccredited,
        organization: advisorProfile.organization,
        website: advisorProfile.website,
        hourly_rate: advisorProfile.pricing?.hourlyRate,
        portfolio_fee: advisorProfile.pricing?.portfolioFee,
        assets_under_management: advisorProfile.assetsUnderManagement,
        expertise: advisorProfile.expertise,
        years_of_experience: advisorProfile.yearsOfExperience,
        biography: advisorProfile.biography,
        certifications: advisorProfile.certifications,
        updated_at: new Date().toISOString()
      };
      
      const { error: advisorUpsertError } = await supabase
        .from('advisor_profiles')
        .upsert(advisorData, {
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
      return existingProfile;
    }
    
    // Profile doesn't exist, create one
    console.log('[profileService] No existing profile found, creating default profile');
    
    const email = user.email?.toLowerCase() || '';
    let name = email.split('@')[0] || 'User';
    
    // Try to capitalize the name
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    let profileData: Partial<ConsumerProfile | AdvisorProfile>;
    
    if (userType === 'consumer') {
      profileData = {
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
    } else if (userType === 'advisor') {
      profileData = {
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
        showOnlineStatus: true,
        email: email
      };
    } else {
      return null;
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
