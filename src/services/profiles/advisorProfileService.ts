
import { supabase } from '../../integrations/supabase/client';
import { AdvisorProfile, AdvisorProfileUpdate } from '../../types/profileTypes';

/**
 * Fetches an advisor profile by user ID
 */
export const getAdvisorProfileById = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    // Fetch base user profile
    const { data: userProfile, error: userError } = await supabase
      .from('user_profiles')
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
      // Base user profile fields
      id: userProfile.id,
      email: userProfile.email,
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      phoneNumber: userProfile.phone_number,
      addressLine1: userProfile.address_line1,
      addressLine2: userProfile.address_line2,
      city: userProfile.city,
      state: userProfile.state,
      zipCode: userProfile.zip_code,
      country: userProfile.country,
      profilePicture: userProfile.avatar_url || userProfile.profile_picture || '',
      
      // Advisor specific fields
      name: `${userProfile.first_name} ${userProfile.last_name}`,
      organization: advisorProfile.organization || '',
      isAccredited: advisorProfile.is_accredited || false,
      website: advisorProfile.website || '',
      bio: advisorProfile.biography || '',
      assetsUnderManagement: advisorProfile.assets_under_management || 0,
      yearsOfExperience: advisorProfile.years_of_experience || 0,
      languages: advisorProfile.languages || ['English'],
      averageRating: advisorProfile.average_rating || 0,
      ratingCount: advisorProfile.rating_count || 0,
      certifications: advisorProfile.certifications || [],
      expertise: advisorProfile.expertise || [],
      availability: advisorProfile.availability || {},
      preferredCommunication: advisorProfile.preferred_communication || 'email',
      servicedLocations: advisorProfile.serviced_locations || [],
      showOnlineStatus: advisorProfile.show_online_status || true,
      
      // Default values for fields not directly in the database
      testimonials: advisorProfile.testimonials || [],
      pricing: advisorProfile.pricing || { hourlyRate: 0, portfolioFee: 0 },
      specializations: advisorProfile.specializations || [],
      matches: advisorProfile.matches || [],
      chats: advisorProfile.chats || [],
      appointment_categories: advisorProfile.appointment_categories || [],
      appointments: advisorProfile.appointments || []
    } as AdvisorProfile;
    
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
    } = updateData;
    
    // Update base user profile if relevant fields provided
    if (firstName || lastName || phoneNumber || addressLine1 || addressLine2 || city || state || zipCode || country || profilePicture) {
      const { error: userError } = await supabase
        .from('user_profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
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
      const mappedAdvisorData = {
        organization: advisorSpecificData.organization,
        is_accredited: advisorSpecificData.isAccredited,
        website: advisorSpecificData.website,
        biography: advisorSpecificData.bio,
        assets_under_management: advisorSpecificData.assetsUnderManagement,
        years_of_experience: advisorSpecificData.yearsOfExperience,
        languages: advisorSpecificData.languages,
        certifications: advisorSpecificData.certifications,
        expertise: advisorSpecificData.expertise,
        preferred_communication: advisorSpecificData.preferredCommunication,
        serviced_locations: advisorSpecificData.servicedLocations,
        show_online_status: advisorSpecificData.showOnlineStatus
      };
      
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
