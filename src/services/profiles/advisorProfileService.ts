
import { supabase } from '../../integrations/supabase/client';
import { AdvisorProfile } from '../../types/profileTypes';
import { toast } from 'sonner';
import { getAdvisorProfile } from '../profileService';

/**
 * Fetches an advisor profile by user ID
 */
export const getAdvisorProfileById = async (userId: string): Promise<AdvisorProfile | null> => {
  return getAdvisorProfile(userId);
};

/**
 * Updates an advisor profile
 */
export const updateAdvisorProfile = async (userId: string, updateData: Partial<AdvisorProfile>): Promise<boolean> => {
  try {
    // Split the data into user profile and advisor profile updates
    const { 
      firstName, lastName, phone, addressLine1, addressLine2, city, state, zipCode, country, profilePicture,
      ...advisorSpecificData 
    } = updateData as any; // Using any to avoid complex type mapping
    
    // Update base user profile if relevant fields provided
    if (firstName || lastName || phone || addressLine1 || addressLine2 || city || state || zipCode || country || profilePicture) {
      const { error: userError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone,
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
      if ('preferredCommunication' in advisorSpecificData) mappedAdvisorData.preferred_communication = advisorSpecificData.preferredCommunication;
      
      const { error: advisorError } = await supabase
        .from('advisor_profiles')
        .update(mappedAdvisorData)
        .eq('id', userId);
      
      if (advisorError) throw advisorError;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating advisor profile:', error);
    return false;
  }
};
