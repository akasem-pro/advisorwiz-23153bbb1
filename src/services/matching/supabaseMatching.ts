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
 * Get advisor profile from database
 */
const getAdvisorProfile = async (advisorId: string): Promise<AdvisorProfile | null> => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url, email, phone, online_status, last_online, show_online_status, chat_enabled')
      .eq('id', advisorId)
      .single();
    
    if (profileError || !profileData) {
      return null;
    }
    
    const { data: advisorData, error: advisorError } = await supabase
      .from('advisor_profiles')
      .select('organization, is_accredited, website, languages, expertise, hourly_rate, portfolio_fee, assets_under_management')
      .eq('id', advisorId)
      .single();
    
    if (advisorError || !advisorData) {
      return null;
    }
    
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
 * Get consumer profile from database
 */
const getConsumerProfile = async (consumerId: string): Promise<ConsumerProfile | null> => {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url, email, phone, online_status, last_online, show_online_status, chat_enabled')
      .eq('id', consumerId)
      .single();
    
    if (profileError || !profileData) {
      return null;
    }
    
    const { data: consumerData, error: consumerError } = await supabase
      .from('consumer_profiles')
      .select('age, investable_assets, risk_tolerance, preferred_communication, preferred_language, service_needs, investment_amount, start_timeline')
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
