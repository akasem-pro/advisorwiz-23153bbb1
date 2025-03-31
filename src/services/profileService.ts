
import { supabase } from '../integrations/supabase/client';
import { UserType, ConsumerProfile, AdvisorProfile } from '../types/profileTypes';
import { User } from '@supabase/supabase-js';

// Generic function to fetch a user profile by ID
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data || null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
};

// Function to fetch a consumer profile by user ID
export const getConsumerProfile = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const { data: consumerProfile, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (consumerError) throw consumerError;
    
    if (!userProfile || !consumerProfile) return null;
    
    // Safely create a merged profile with default values for possibly missing properties
    const profile: ConsumerProfile = {
      id: userId,
      name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim(),
      age: consumerProfile.age || 0,
      status: 'active',
      investableAssets: consumerProfile.investable_assets || 0,
      riskTolerance: (consumerProfile.risk_tolerance as 'low' | 'medium' | 'high') || 'medium',
      preferredCommunication: Array.isArray(consumerProfile.preferred_communication) ? 
        consumerProfile.preferred_communication as string[] : [],
      preferredLanguage: consumerProfile.preferred_language || ['English'],
      financialGoals: consumerProfile.financial_goals || [],
      incomeRange: consumerProfile.income_bracket || '',
      investmentAmount: consumerProfile.investment_amount || 0,
      preferredAdvisorSpecialties: consumerProfile.preferred_advisor_specialties || [],
      location: {
        city: userProfile.city || '',
        state: userProfile.state || '',
        country: userProfile.country || 'US'
      },
      matches: [],
      chats: [],
      profilePicture: userProfile.avatar_url || '',
      chatEnabled: userProfile.chat_enabled || false,
      appointments: [],
      startTimeline: consumerProfile.start_timeline as 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' || 'not_sure',
      onlineStatus: userProfile.online_status || 'offline',
      lastOnline: userProfile.last_online || new Date().toISOString(),
      showOnlineStatus: userProfile.show_online_status || true,
      email: userProfile.email || '',
      phone: userProfile.phone || ''
    };
    
    return profile;
  } catch (err) {
    console.error('Error fetching consumer profile:', err);
    return null;
  }
};

// Function to fetch an advisor profile by user ID
export const getAdvisorProfile = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const { data: advisorProfile, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (advisorError) throw advisorError;
    
    if (!userProfile || !advisorProfile) return null;
    
    // Safely create a merged profile with default values for possibly missing properties
    return {
      id: userId,
      name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim(),
      organization: advisorProfile.organization || '',
      isAccredited: advisorProfile.is_accredited || false,
      website: advisorProfile.website || '',
      testimonials: [],
      languages: advisorProfile.languages || ['English'],
      pricing: {
        hourlyRate: advisorProfile.hourly_rate || 0,
        portfolioFee: advisorProfile.portfolio_fee || 0
      },
      assetsUnderManagement: advisorProfile.assets_under_management || 0,
      expertise: advisorProfile.expertise || [],
      specializations: [],
      yearsOfExperience: advisorProfile.years_of_experience || 0,
      averageRating: advisorProfile.average_rating || 0,
      ratingCount: advisorProfile.rating_count || 0,
      biography: advisorProfile.biography || '',
      certifications: advisorProfile.certifications || [],
      location: {
        city: userProfile.city || '',
        state: userProfile.state || '',
        country: userProfile.country || 'US'
      },
      matches: [],
      chats: [],
      profilePicture: userProfile.avatar_url || '',
      availability: [],
      chatEnabled: userProfile.chat_enabled || false,
      appointmentCategories: [],
      appointments: [],
      onlineStatus: userProfile.online_status || 'offline',
      lastOnline: userProfile.last_online || new Date().toISOString(),
      showOnlineStatus: userProfile.show_online_status || true
    } as AdvisorProfile;
  } catch (err) {
    console.error('Error fetching advisor profile:', err);
    return null;
  }
};

/**
 * Initialize a user profile based on their authentication status
 * This is the function that was missing and causing the error
 */
export const initializeUserProfile = async (
  user: User, 
  userType: UserType
): Promise<ConsumerProfile | AdvisorProfile | null> => {
  try {
    console.log(`[profileService] Initializing ${userType} profile for user ${user.id}`);

    // Check if profile exists in supabase
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // If profile doesn't exist, create a new one
    if (profileError || !existingProfile) {
      console.log(`[profileService] No profile found, creating new ${userType} profile`);
      
      // Create base profile
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          first_name: '',
          last_name: '',
          user_type: userType,
          chat_enabled: true,
          online_status: 'offline',
          last_online: new Date().toISOString(),
          show_online_status: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (createError) {
        console.error('[profileService] Error creating base profile:', createError);
        return null;
      }

      // Create type specific profile
      if (userType === 'consumer') {
        const { error: consumerError } = await supabase
          .from('consumer_profiles')
          .insert({
            id: user.id,
            investment_amount: 0,
            investable_assets: 0,
            risk_tolerance: 'medium',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (consumerError) {
          console.error('[profileService] Error creating consumer profile:', consumerError);
          return null;
        }
      } else if (userType === 'advisor') {
        const { error: advisorError } = await supabase
          .from('advisor_profiles')
          .insert({
            id: user.id,
            organization: '',
            is_accredited: false,
            assets_under_management: 0,
            years_of_experience: 0,
            expertise: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (advisorError) {
          console.error('[profileService] Error creating advisor profile:', advisorError);
          return null;
        }
      }
    } else {
      console.log(`[profileService] Existing profile found for ${user.id}`);
    }

    // Fetch the complete profile
    if (userType === 'consumer') {
      return await getConsumerProfile(user.id);
    } else if (userType === 'advisor') {
      return await getAdvisorProfile(user.id);
    }

    return null;
  } catch (error) {
    console.error('[profileService] Error initializing user profile:', error);
    return null;
  }
};

// Additional profile-related functions can be added here
