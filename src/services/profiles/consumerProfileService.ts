
import { supabase } from '../../integrations/supabase/client';
import { ConsumerProfile, ConsumerProfileUpdate } from '../../types/profileTypes';

/**
 * Fetches a consumer profile by user ID
 */
export const getConsumerProfileById = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    // Fetch base user profile
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    // Fetch consumer specific profile
    const { data: consumerProfile, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (consumerError) throw consumerError;
    
    if (!userProfile || !consumerProfile) {
      console.error('Missing user or consumer profile data');
      return null;
    }
    
    // Combine profiles with safe default values for potentially missing fields
    const profile: ConsumerProfile = {
      id: userId,
      name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim(),
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      age: consumerProfile.age || 0,
      status: 'active',
      investableAssets: consumerProfile.investable_assets || 0,
      riskTolerance: (consumerProfile.risk_tolerance as 'low' | 'medium' | 'high') || 'medium',
      preferredCommunication: consumerProfile.preferred_communication || [],
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
      showOnlineStatus: userProfile.show_online_status || true
    };
    
    return profile;
    
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
