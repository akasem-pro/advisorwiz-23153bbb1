
import { supabase } from '../integrations/supabase/client';
import { UserProfile, ConsumerProfile, AdvisorProfile } from '../types/profileTypes';

// Generic function to fetch a user profile by ID
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data ? data as UserProfile : null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
};

// Function to fetch a consumer profile by user ID
export const getConsumerProfile = async (userId: string): Promise<ConsumerProfile | null> => {
  try {
    const { data: userProfile, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const { data: consumerProfile, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (consumerError) throw consumerError;
    
    if (!userProfile || !consumerProfile) return null;
    
    // Safely create a merged profile with default values for possibly missing properties
    return {
      ...userProfile,
      ...consumerProfile,
      // Add default values for potentially missing properties
      status: consumerProfile.status || 'active',
      matches: consumerProfile.matches || [],
      chats: consumerProfile.chats || [],
      appointments: consumerProfile.appointments || []
    } as ConsumerProfile;
  } catch (err) {
    console.error('Error fetching consumer profile:', err);
    return null;
  }
};

// Function to fetch an advisor profile by user ID
export const getAdvisorProfile = async (userId: string): Promise<AdvisorProfile | null> => {
  try {
    const { data: userProfile, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const { data: advisorProfile, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (advisorError) throw advisorError;
    
    if (!userProfile || !advisorProfile) return null;
    
    // Safely create a merged profile with default values for possibly missing properties
    return {
      ...userProfile,
      ...advisorProfile,
      // Add default values for potentially missing properties
      testimonials: advisorProfile.testimonials || [],
      pricing: advisorProfile.pricing || { hourlyRate: 0, portfolioFee: 0 },
      matches: advisorProfile.matches || [],
      chats: advisorProfile.chats || [],
      appointment_categories: advisorProfile.appointment_categories || [],
      appointments: advisorProfile.appointments || [],
      specializations: advisorProfile.specializations || []
    } as AdvisorProfile;
  } catch (err) {
    console.error('Error fetching advisor profile:', err);
    return null;
  }
};

// Additional profile-related functions can be added here
