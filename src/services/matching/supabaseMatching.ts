
import { supabase } from '../../integrations/supabase/client';
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../../types/userTypes';
import { trackPerformance } from '../../utils/matchingPerformance';
import { calculateMatchScore, getMatchExplanations } from '../../utils/matchingAlgorithm';
import { MatchPreferences } from '../../context/UserContextDefinition';

/**
 * Store compatibility score between advisor and consumer in the database
 */
export const storeCompatibilityScore = async (
  advisorId: string,
  consumerId: string,
  score: number,
  explanations: string[]
): Promise<boolean> => {
  const startTime = performance.now();
  
  try {
    const { data, error } = await supabase
      .from('compatibility_scores')
      .upsert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        match_explanations: explanations,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'advisor_id,consumer_id'
      });
    
    if (error) {
      console.error('Error storing compatibility score:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception storing compatibility score:', err);
    return false;
  } finally {
    const endTime = performance.now();
    trackPerformance('storeCompatibilityScore', endTime - startTime, 2);
  }
};

/**
 * Get compatibility score between advisor and consumer from the database
 */
export const getStoredCompatibilityScore = async (
  advisorId: string,
  consumerId: string
): Promise<{ score: number; explanations: string[] } | null> => {
  const startTime = performance.now();
  
  try {
    const { data, error } = await supabase
      .from('compatibility_scores')
      .select('score, match_explanations')
      .eq('advisor_id', advisorId)
      .eq('consumer_id', consumerId)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return {
      score: data.score,
      explanations: data.match_explanations || []
    };
  } catch (err) {
    console.error('Exception getting compatibility score:', err);
    return null;
  } finally {
    const endTime = performance.now();
    trackPerformance('getStoredCompatibilityScore', endTime - startTime, 2);
  }
};

/**
 * Store match feedback in the database
 */
export const storeMatchFeedback = async (
  matchId: string,
  userId: string,
  isHelpful: boolean,
  comment?: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('match_feedback')
      .insert({
        match_id: matchId,
        user_id: userId,
        is_helpful: isHelpful,
        comment
      });
    
    if (error) {
      console.error('Error storing match feedback:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception storing match feedback:', err);
    return false;
  }
};

/**
 * Record user interaction in the database
 */
export const recordUserInteraction = async (
  advisorId: string,
  consumerId: string,
  interactionType: 'view' | 'message' | 'call' | 'appointment',
  duration?: number,
  notes?: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_interactions')
      .insert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        interaction_type: interactionType,
        duration,
        notes
      });
    
    if (error) {
      console.error('Error recording user interaction:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception recording user interaction:', err);
    return false;
  }
};

/**
 * Get top matches for a user from the database
 */
export const getTopMatchesFromDatabase = async (
  userType: 'consumer' | 'advisor',
  userId: string,
  limit: number = 10
): Promise<{ id: string; score: number; explanations: string[] }[]> => {
  try {
    let query;
    
    if (userType === 'consumer') {
      query = supabase
        .from('compatibility_scores')
        .select('advisor_id:advisor_id, score, match_explanations')
        .eq('consumer_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    } else {
      query = supabase
        .from('compatibility_scores')
        .select('consumer_id:consumer_id, score, match_explanations')
        .eq('advisor_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error || !data) {
      console.error('Error getting top matches:', error);
      return [];
    }
    
    return data.map(item => ({
      id: userType === 'consumer' ? item.advisor_id : item.consumer_id,
      score: item.score,
      explanations: item.match_explanations || []
    }));
  } catch (err) {
    console.error('Exception getting top matches:', err);
    return [];
  }
};

/**
 * Calculate and store compatibility scores for multiple profiles
 */
export const calculateAndStoreCompatibilityScores = async (
  userType: 'consumer' | 'advisor',
  userId: string,
  targetProfiles: (AdvisorProfile | ConsumerProfile)[],
  preferences: MatchPreferences
): Promise<boolean> => {
  const startTime = performance.now();
  
  try {
    // Get my profile
    const myProfile = userType === 'consumer' 
      ? await getConsumerProfile(userId)
      : await getAdvisorProfile(userId);
    
    if (!myProfile) {
      console.error('My profile not found');
      return false;
    }
    
    // Calculate scores
    for (const profile of targetProfiles) {
      let score: number;
      let explanations: string[];
      
      if (userType === 'consumer') {
        score = calculateMatchScore(profile as AdvisorProfile, myProfile as ConsumerProfile);
        explanations = getMatchExplanations(profile as AdvisorProfile, myProfile as ConsumerProfile);
      } else {
        score = calculateMatchScore(myProfile as AdvisorProfile, profile as ConsumerProfile);
        explanations = getMatchExplanations(myProfile as AdvisorProfile, profile as ConsumerProfile);
      }
      
      // Store score in database
      await storeCompatibilityScore(
        userType === 'consumer' ? profile.id : userId,
        userType === 'consumer' ? userId : profile.id,
        score,
        explanations
      );
    }
    
    return true;
  } catch (err) {
    console.error('Exception calculating and storing compatibility scores:', err);
    return false;
  } finally {
    const endTime = performance.now();
    trackPerformance('calculateAndStoreCompatibilityScores', endTime - startTime, targetProfiles.length);
  }
};

/**
 * Get advisor profile from database with enhanced fields
 */
const getAdvisorProfile = async (advisorId: string): Promise<AdvisorProfile | null> => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url, email, phone, online_status, last_online, show_online_status, chat_enabled, city, state, country')
      .eq('id', advisorId)
      .single();
    
    if (profileError || !profileData) {
      return null;
    }
    
    const { data: advisorData, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('organization, is_accredited, website, languages, expertise, hourly_rate, portfolio_fee, assets_under_management, years_of_experience, average_rating, rating_count, biography, certifications')
      .eq('id', advisorId)
      .single();
    
    if (advisorError || !advisorData) {
      return null;
    }
    
    // Get specializations
    const { data: specializationsData } = await supabase
      .from('advisor_specializations')
      .select('specialization_id, specializations(name)')
      .eq('advisor_id', advisorId);
    
    const specializations = specializationsData ? 
      specializationsData.map(s => s.specializations?.name || '') : [];
    
    return {
      id: profileData.id,
      name: `${profileData.first_name} ${profileData.last_name}`,
      organization: advisorData.organization || '',
      isAccredited: advisorData.is_accredited,
      website: advisorData.website || '',
      testimonials: [],
      languages: advisorData.languages || [],
      pricing: {
        hourlyRate: advisorData.hourly_rate,
        portfolioFee: advisorData.portfolio_fee
      },
      assetsUnderManagement: advisorData.assets_under_management || 0,
      expertise: advisorData.expertise || [],
      specializations: specializations.filter(Boolean),
      yearsOfExperience: advisorData.years_of_experience || 0,
      averageRating: advisorData.average_rating || 0,
      ratingCount: advisorData.rating_count || 0,
      biography: advisorData.biography || '',
      certifications: advisorData.certifications || [],
      location: {
        city: profileData.city || '',
        state: profileData.state || '',
        country: profileData.country || 'US'
      },
      matches: [],
      chats: [],
      profilePicture: profileData.avatar_url,
      chatEnabled: profileData.chat_enabled,
      appointmentCategories: [],
      appointments: [],
      onlineStatus: profileData.online_status || 'offline',
      lastOnline: profileData.last_online || new Date().toISOString(),
      showOnlineStatus: profileData.show_online_status
    };
  } catch (err) {
    console.error('Exception getting advisor profile:', err);
    return null;
  }
};

/**
 * Get consumer profile from database with enhanced fields
 */
const getConsumerProfile = async (consumerId: string): Promise<ConsumerProfile | null> => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url, email, phone, online_status, last_online, show_online_status, chat_enabled, city, state, country')
      .eq('id', consumerId)
      .single();
    
    if (profileError || !profileData) {
      return null;
    }
    
    const { data: consumerData, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('age, investable_assets, risk_tolerance, preferred_communication, preferred_language, service_needs, investment_amount, start_timeline, financial_goals, income_bracket, preferred_advisor_specialties')
      .eq('id', consumerId)
      .single();
    
    if (consumerError || !consumerData) {
      return null;
    }
    
    // Define valid timeline types
    type StartTimeline = "immediately" | "next_3_months" | "next_6_months" | "not_sure";
    
    // Convert string timeline to valid enum or use "not_sure" as default
    const validTimelineValues: StartTimeline[] = ["immediately", "next_3_months", "next_6_months", "not_sure"];
    const startTimeline = consumerData.start_timeline && 
      validTimelineValues.includes(consumerData.start_timeline as StartTimeline) 
        ? (consumerData.start_timeline as StartTimeline) 
        : "not_sure";
    
    return {
      id: profileData.id,
      name: `${profileData.first_name} ${profileData.last_name}`,
      age: consumerData.age || 0,
      status: '',
      investableAssets: consumerData.investable_assets || 0,
      riskTolerance: consumerData.risk_tolerance || 'medium',
      preferredCommunication: consumerData.preferred_communication || [],
      preferredLanguage: consumerData.preferred_language || [],
      serviceNeeds: consumerData.service_needs || [],
      investmentAmount: consumerData.investment_amount,
      financialGoals: consumerData.financial_goals || [],
      incomeBracket: consumerData.income_bracket || '',
      preferredAdvisorSpecialties: consumerData.preferred_advisor_specialties || [],
      location: {
        city: profileData.city || '',
        state: profileData.state || '',
        country: profileData.country || 'US'
      },
      matches: [],
      chats: [],
      profilePicture: profileData.avatar_url,
      chatEnabled: profileData.chat_enabled,
      appointments: [],
      startTimeline: startTimeline,
      onlineStatus: profileData.online_status || 'offline',
      lastOnline: profileData.last_online || new Date().toISOString(),
      showOnlineStatus: profileData.show_online_status
    };
  } catch (err) {
    console.error('Exception getting consumer profile:', err);
    return null;
  }
};

/**
 * Get appointments for a user
 */
export const getUserAppointments = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        advisor:advisor_id(
          profiles(first_name, last_name, avatar_url)
        ),
        consumer:consumer_id(
          profiles(first_name, last_name, avatar_url)
        )
      `)
      .or(`advisor_id.eq.${userId},consumer_id.eq.${userId}`)
      .order('scheduled_start', { ascending: true });
    
    if (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception getting appointments:', err);
    return [];
  }
};

/**
 * Create a new appointment
 */
export const createAppointment = async (
  advisorId: string,
  consumerId: string,
  title: string,
  description: string,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        title,
        description,
        scheduled_start: startTime,
        scheduled_end: endTime,
        status: 'pending'
      });
    
    if (error) {
      console.error('Error creating appointment:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception creating appointment:', err);
    return false;
  }
};

/**
 * Get chat messages between two users
 */
export const getChatMessages = async (userId1: string, userId2: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error getting chat messages:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception getting chat messages:', err);
    return [];
  }
};

/**
 * Send a chat message
 */
export const sendChatMessage = async (
  senderId: string,
  recipientId: string,
  content: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        sender_id: senderId,
        recipient_id: recipientId,
        content
      });
    
    if (error) {
      console.error('Error sending chat message:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception sending chat message:', err);
    return false;
  }
};

/**
 * Get reviews for an advisor
 */
export const getAdvisorReviews = async (advisorId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        consumer:consumer_id(
          profiles(first_name, last_name, avatar_url)
        )
      `)
      .eq('advisor_id', advisorId)
      .eq('is_public', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting advisor reviews:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception getting advisor reviews:', err);
    return [];
  }
};

/**
 * Submit a review for an advisor
 */
export const submitAdvisorReview = async (
  consumerId: string,
  advisorId: string,
  rating: number,
  reviewText: string,
  isPublic: boolean = true
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        consumer_id: consumerId,
        advisor_id: advisorId,
        rating,
        review_text: reviewText,
        is_public: isPublic
      });
    
    if (error) {
      console.error('Error submitting advisor review:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception submitting advisor review:', err);
    return false;
  }
};

/**
 * Get user notifications
 */
export const getUserNotifications = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception getting notifications:', err);
    return [];
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
    
    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception marking notification as read:', err);
    return false;
  }
};

/**
 * Get user match preferences
 */
export const getUserMatchPreferences = async (userId: string): Promise<MatchPreferences | null> => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('matching_preferences')
      .eq('user_id', userId)
      .single();
    
    if (error || !data) {
      // If no preferences found, create default preferences
      const defaultPreferences: MatchPreferences = {
        prioritizeLanguage: true,
        prioritizeAvailability: true,
        prioritizeExpertise: true,
        prioritizeLocation: false,
        minimumMatchScore: 40,
        considerInteractionData: true
      };
      
      await supabase.from('user_preferences').upsert({
        user_id: userId,
        matching_preferences: defaultPreferences
      });
      
      return defaultPreferences;
    }
    
    return data.matching_preferences as MatchPreferences;
  } catch (err) {
    console.error('Exception getting user match preferences:', err);
    return null;
  }
};

/**
 * Update user match preferences
 */
export const updateUserMatchPreferences = async (
  userId: string,
  preferences: MatchPreferences
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        matching_preferences: preferences,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error updating user match preferences:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception updating user match preferences:', err);
    return false;
  }
};
