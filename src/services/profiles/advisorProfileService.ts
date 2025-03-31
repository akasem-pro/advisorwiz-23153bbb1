
import { supabase } from '../../integrations/supabase/client';
import { AdvisorProfile, AdvisorProfileUpdate } from '../../types/profileTypes';

/**
 * Fetches an advisor profile by user ID
 */
export const getAdvisorProfileById = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    // Fetch base user profile
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    // Fetch advisor specific profile
    const { data: advisorProfile, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (advisorError) throw advisorError;
    
    if (!userProfile || !advisorProfile) {
      console.error('Missing user or advisor profile data');
      return null;
    }
    
    // Combine profiles with safe default values for potentially missing fields
    return {
      id: userId,
      name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim(),
      email: userProfile.email || '',
      organization: advisorProfile.organization || '',
      isAccredited: advisorProfile.is_accredited || false,
      website: advisorProfile.website || '',
      testimonials: advisorProfile.testimonials || [],
      languages: advisorProfile.languages || ['English'],
      pricing: {
        hourlyRate: advisorProfile.hourly_rate || 0,
        portfolioFee: advisorProfile.portfolio_fee || 0
      },
      assetsUnderManagement: advisorProfile.assets_under_management || 0,
      expertise: advisorProfile.expertise || [],
      specializations: advisorProfile.specializations || [],
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
    };
    
  } catch (error) {
    console.error('Error fetching advisor profile:', error);
    return null;
  }
};

/**
 * Updates an advisor profile
 */
export const updateAdvisorProfile = async (userId: string, updateData: AdvisorProfileUpdate): Promise<boolean> => {
  try {
    // Split the data into user profile and advisor profile updates
    const { 
      firstName, lastName, phoneNumber, addressLine1, addressLine2, city, state, zipCode, country, profilePicture,
      ...advisorSpecificData 
    } = updateData as any; // Using any to avoid complex type mapping
    
    // Update base user profile if relevant fields provided
    if (firstName || lastName || phoneNumber || addressLine1 || addressLine2 || city || state || zipCode || country || profilePicture) {
      const { error: userError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
          address_line1: addressLine1,
          address_line2: addressLine2,
          city,
          state,
          zip_code: zipCode,
          country,
          avatar_url: profilePicture
        })
        .eq('id', userId);
      
      if (userError) throw userError;
    }
    
    // Update advisor specific profile
    if (Object.keys(advisorSpecificData).length > 0) {
      // Map the frontend fields to database fields
      const mappedAdvisorData: any = {};
      
      // Only include properties that exist in the advisorSpecificData object
      if ('organization' in advisorSpecificData) mappedAdvisorData.organization = advisorSpecificData.organization;
      if ('isAccredited' in advisorSpecificData) mappedAdvisorData.is_accredited = advisorSpecificData.isAccredited;
      if ('website' in advisorSpecificData) mappedAdvisorData.website = advisorSpecificData.website;
      if ('biography' in advisorSpecificData) mappedAdvisorData.biography = advisorSpecificData.biography || advisorSpecificData.bio;
      if ('assetsUnderManagement' in advisorSpecificData) mappedAdvisorData.assets_under_management = advisorSpecificData.assetsUnderManagement;
      if ('yearsOfExperience' in advisorSpecificData) mappedAdvisorData.years_of_experience = advisorSpecificData.yearsOfExperience;
      if ('languages' in advisorSpecificData) mappedAdvisorData.languages = advisorSpecificData.languages;
      if ('certifications' in advisorSpecificData) mappedAdvisorData.certifications = advisorSpecificData.certifications;
      if ('expertise' in advisorSpecificData) mappedAdvisorData.expertise = advisorSpecificData.expertise;
      if ('specializations' in advisorSpecificData) mappedAdvisorData.specializations = advisorSpecificData.specializations;
      if ('preferredCommunication' in advisorSpecificData) mappedAdvisorData.preferred_communication = advisorSpecificData.preferredCommunication;
      
      const { error: advisorError } = await supabase
        .from('advisor_profiles')
        .update(mappedAdvisorData)
        .eq('user_id', userId);
      
      if (advisorError) throw advisorError;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating advisor profile:', error);
    return false;
  }
};
