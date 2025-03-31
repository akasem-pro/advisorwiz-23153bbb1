
import { supabase } from '../../integrations/supabase/client';
import { ConsumerProfile, ConsumerProfileUpdate } from '../../types/profileTypes';

/**
 * Fetches a consumer profile by user ID
 */
export const getConsumerProfileById = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    // Fetch base user profile
    const { data: userProfile, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    // Fetch consumer specific profile
    const { data: consumerProfile, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (consumerError) throw consumerError;
    
    if (!userProfile || !consumerProfile) {
      console.error('Missing user or consumer profile data');
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
      profilePicture: userProfile.avatar_url || '',
      
      // Consumer specific fields
      age: consumerProfile.age || 0,
      incomeRange: consumerProfile.income_bracket || '',
      investmentAmount: consumerProfile.investment_amount || 0,
      investableAssets: consumerProfile.investable_assets || 0,
      riskTolerance: consumerProfile.risk_tolerance || 'moderate',
      financialGoals: consumerProfile.financial_goals || [],
      preferredAdvisorSpecialties: consumerProfile.preferred_advisor_specialties || [],
      preferredCommunication: consumerProfile.preferred_communication || 'email',
      
      // Default values for fields not directly in the database
      status: consumerProfile.status || 'active',
      matches: consumerProfile.matches || [],
      chats: consumerProfile.chats || [],
      appointments: consumerProfile.appointments || []
    } as ConsumerProfile;
    
  } catch (error) {
    console.error('Error fetching consumer profile:', error);
    return null;
  }
};

/**
 * Updates a consumer profile
 */
export const updateConsumerProfile = async (userId: string, updateData: ConsumerProfileUpdate): Promise<boolean> => {
  try {
    // Split the data into user profile and consumer profile updates
    const { 
      firstName, lastName, phoneNumber, addressLine1, addressLine2, city, state, zipCode, country, profilePicture,
      ...consumerSpecificData 
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
    
    // Update consumer specific profile
    if (Object.keys(consumerSpecificData).length > 0) {
      // Map the frontend fields to database fields
      const mappedConsumerData = {
        age: consumerSpecificData.age,
        income_bracket: consumerSpecificData.incomeRange,
        investment_amount: consumerSpecificData.investmentAmount,
        investable_assets: consumerSpecificData.investableAssets,
        risk_tolerance: consumerSpecificData.riskTolerance,
        financial_goals: consumerSpecificData.financialGoals,
        preferred_advisor_specialties: consumerSpecificData.preferredAdvisorSpecialties,
        preferred_communication: consumerSpecificData.preferredCommunication
      };
      
      const { error: consumerError } = await supabase
        .from('consumer_profiles')
        .update(mappedConsumerData)
        .eq('user_id', userId);
      
      if (consumerError) throw consumerError;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating consumer profile:', error);
    return false;
  }
};
