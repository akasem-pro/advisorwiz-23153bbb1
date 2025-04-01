
import { supabase } from '../../integrations/supabase/client';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { trackPerformance } from '../../lib/supabase/types/dataTypes';

/**
 * Record matching performance metrics to Supabase
 */
export const recordMatchingPerformance = async (
  functionName: string, 
  executionTime: number, 
  inputSize?: number
): Promise<boolean> => {
  try {
    // Use direct table insert instead of RPC
    const { error } = await supabase
      .from('matching_performance')
      .insert({
        function_name: functionName,
        execution_time: executionTime,
        input_size: inputSize
      });

    if (error) {
      console.error('Error recording performance:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    // Fail silently in production - performance recording shouldn't break functionality
    console.error('Failed to record matching performance:', err);
    return false;
  }
};

/**
 * Store compatibility score in Supabase
 */
export const storeCompatibilityScore = async (
  advisorId: string,
  consumerId: string,
  score: number,
  matchExplanations: string[]
): Promise<boolean> => {
  const startTime = performance.now();
  
  try {
    const { error } = await supabase
      .from('compatibility_scores')
      .upsert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        match_explanations: matchExplanations,
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
    console.error('Error storing compatibility score:', err);
    return false;
  } finally {
    const endTime = performance.now();
    trackPerformance('storeCompatibilityScore', endTime - startTime);
  }
};

/**
 * Retrieve compatibility score from Supabase
 */
export const getCompatibilityScore = async (
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
    console.error('Error fetching compatibility score:', err);
    return null;
  } finally {
    const endTime = performance.now();
    trackPerformance('getCompatibilityScore', endTime - startTime);
  }
};

/**
 * Record match history for analytics
 */
export const recordMatchHistory = async (
  compatibilityScoreId: string,
  advisorId: string,
  consumerId: string,
  score: number,
  algorithmVersion: string = '1.0',
  factors?: Record<string, any>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('match_history')
      .insert({
        compatibility_score_id: compatibilityScoreId,
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        algorithm_version: algorithmVersion,
        factors: factors || null
      });
      
    if (error) {
      console.error('Error recording match history:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error recording match history:', err);
    return false;
  }
};

/**
 * Submit user feedback about a match
 */
export const submitMatchFeedback = async (
  matchId: string,
  userId: string,
  isHelpful: boolean,
  comment?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('match_feedback')
      .insert({
        match_id: matchId,
        user_id: userId,
        is_helpful: isHelpful,
        comment: comment || null
      });
      
    if (error) {
      console.error('Error submitting match feedback:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error submitting match feedback:', err);
    return false;
  }
};

/**
 * Get top matches for a user from Supabase
 */
export const getTopMatches = async (
  userType: 'consumer' | 'advisor',
  userId: string,
  limit: number = 10
): Promise<{ id: string; score: number; explanations: string[] }[]> => {
  try {
    let query;
    
    if (userType === 'consumer') {
      query = supabase
        .from('compatibility_scores')
        .select('advisor_id, score, match_explanations')
        .eq('consumer_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    } else {
      query = supabase
        .from('compatibility_scores')
        .select('consumer_id, score, match_explanations')
        .eq('advisor_id', userId)
        .order('score', { ascending: false })
        .limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error || !data) {
      return [];
    }
    
    return data.map(item => ({
      id: userType === 'consumer' ? item.advisor_id : item.consumer_id,
      score: item.score,
      explanations: item.match_explanations || []
    }));
  } catch (err) {
    console.error('Error fetching top matches:', err);
    return [];
  }
};
