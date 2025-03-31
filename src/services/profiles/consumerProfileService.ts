
import { supabase } from '../../integrations/supabase/client';
import { ConsumerProfile } from '../../types/profileTypes';
import { getConsumerProfile } from '../profileService';

/**
 * Fetches a consumer profile by user ID
 */
export const getConsumerProfileById = async (userId: string): Promise<ConsumerProfile | null> => {
  return getConsumerProfile(userId);
};

/**
 * Updates a consumer profile
 */
export const updateConsumerProfile = async (userId: string, updateData: Partial<ConsumerProfile>): Promise<boolean> => {
  try {
    // Split the data into user profile and consumer profile updates
    const { 
      firstName, lastName, phone, addressLine1, addressLine2, city, state, zipCode, country, profilePicture,
      ...consumerSpecificData 
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
    
    // Update consumer specific profile
    if (Object.keys(consumerSpecificData).length > 0) {
      // Map the frontend fields to database fields
      const mappedConsumerData: any = {};
      
      // Only include properties that exist in the consumerSpecificData object
      if ('age' in consumerSpecificData) mappedConsumerData.age = consumerSpecificData.age;
      if ('incomeRange' in consumerSpecificData) mappedConsumerData.income_bracket = consumerSpecificData.incomeRange;
      if ('investmentAmount' in consumerSpecificData) mappedConsumerData.investment_amount = consumerSpecificData.investmentAmount;
      if ('investableAssets' in consumerSpecificData) mappedConsumerData.investable_assets = consumerSpecificData.investableAssets;
      if ('riskTolerance' in consumerSpecificData) mappedConsumerData.risk_tolerance = consumerSpecificData.riskTolerance;
      if ('financialGoals' in consumerSpecificData) mappedConsumerData.financial_goals = consumerSpecificData.financialGoals;
      if ('preferredAdvisorSpecialties' in consumerSpecificData) mappedConsumerData.preferred_advisor_specialties = consumerSpecificData.preferredAdvisorSpecialties;
      if ('preferredCommunication' in consumerSpecificData && Array.isArray(consumerSpecificData.preferredCommunication)) {
        // Join array as string or take first value if needed
        mappedConsumerData.preferred_communication = consumerSpecificData.preferredCommunication;
      }
      if ('startTimeline' in consumerSpecificData) mappedConsumerData.start_timeline = consumerSpecificData.startTimeline;
      
      const { error: consumerError } = await supabase
        .from('consumer_profiles')
        .update(mappedConsumerData)
        .eq('id', userId);
      
      if (consumerError) throw consumerError;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating consumer profile:', error);
    return false;
  }
};
