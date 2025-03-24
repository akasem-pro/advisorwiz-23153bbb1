import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';

interface MatchEvent {
  advisorId?: string;
  consumerId?: string;
  score?: number;
  factors?: Record<string, any>;
}

/**
 * Track when a match is presented to a user
 */
export const trackMatchPresented = (
  matchId: string,
  userId: string,
  data?: MatchEvent
): void => {
  try {
    trackEvent('match_presented', {
      match_id: matchId,
      user_id: userId,
      ...data
    });
  } catch (error) {
    console.error('Failed to track match presented:', error);
  }
};

/**
 * Track when a match is selected for viewing
 */
export const trackMatchSelected = (
  matchId: string,
  userId: string,
  data?: MatchEvent
): void => {
  try {
    trackEvent('match_selected', {
      match_id: matchId,
      user_id: userId,
      ...data
    });
  } catch (error) {
    console.error('Failed to track match selected:', error);
  }
};

/**
 * Track when a match results in contact
 */
export const trackMatchContact = (
  matchId: string,
  userId: string,
  contactMethod: 'message' | 'appointment' | 'call' | 'email',
  data?: MatchEvent
): void => {
  try {
    trackEvent('match_contact', {
      match_id: matchId,
      user_id: userId,
      contact_method: contactMethod,
      ...data
    });
  } catch (error) {
    console.error('Failed to track match contact:', error);
  }
};

/**
 * Record a new match in the database with explanations
 */
export const recordMatch = async (
  advisorId: string,
  consumerId: string,
  score: number,
  explanations: string[]
): Promise<string | null> => {
  try {
    // Save the match result
    const { data, error } = await supabase
      .from('match_history')
      .insert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score: score,
        factors: { explanations },
        algorithm_version: '1.0'
      })
      .select('id')
      .single();
    
    if (error) {
      handleError('Failed to record match', ErrorCategory.DATABASE);
      return null;
    }
    
    // Also track the event
    trackEvent('match_recorded', {
      match_id: data.id,
      advisor_id: advisorId,
      consumer_id: consumerId,
      score: score
    });
    
    return data.id;
  } catch (error) {
    handleError('Failed to record match', ErrorCategory.DATABASE);
    return null;
  }
};

/**
 * Track detailed information about a matching interaction
 * 
 * This function records match interactions in multiple places:
 * 1. User behavior tracking for high-level analytics
 * 2. Match history table for detailed analysis and improvement
 * 3. Match feedback if provided
 * 4. Custom analytics metrics for dashboards
 * 
 * @param matchAction - The type of match action (view, click, contact, schedule, feedback)
 * @param advisorId - The ID of the advisor in the match
 * @param consumerId - The ID of the consumer in the match
 * @param matchScore - The compatibility score of the match
 * @param matchId - Optional unique ID for this match interaction
 * @param additionalDetails - Optional additional data about the match
 * @returns Promise that resolves when tracking is complete
 */
export const trackMatchingInteraction = async (
  matchAction: MatchAction,
  advisorId: string,
  consumerId: string,
  matchScore: number,
  matchId?: string,
  additionalDetails?: Record<string, any>
): Promise<void> => {
  try {
    // Determine the event type based on the match action
    const eventType = `match_${matchAction}`;
    
    // Track the basic user behavior
    await trackUserBehavior(eventType, consumerId, {
      advisor_id: advisorId,
      match_score: matchScore,
      match_id: matchId,
      ...additionalDetails
    });
    
    // Store detailed match interaction in match_history table if appropriate
    if (['click', 'contact', 'schedule'].includes(matchAction)) {
      await supabase.from('match_history').insert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score: matchScore,
        compatibility_score_id: matchId,
        algorithm_version: '1.0', // Update as your algorithm evolves
        factors: additionalDetails || null
      });
    }
    
    // Store feedback specifically if that was the action
    if (matchAction === 'feedback' && additionalDetails?.feedback) {
      await supabase.from('match_feedback').insert({
        match_id: matchId || `${advisorId}_${consumerId}`,
        user_id: consumerId,
        is_helpful: additionalDetails.feedback.isHelpful,
        comment: additionalDetails.feedback.comment || null
      });
      
      // Update matching weights based on feedback if that's implemented
      if (additionalDetails.feedback.adjustWeights && additionalDetails.feedback.weightAdjustments) {
        // This would call a function to gradually adjust algorithm weights based on feedback
        // updateAlgorithmWeights(additionalDetails.feedback.weightAdjustments);
        console.log('Algorithm weight adjustments:', additionalDetails.feedback.weightAdjustments);
      }
    }
    
    // Log the match interaction for analytics
    await storeAnalyticsMetric(
      'matching',
      matchAction,
      matchScore,
      'match_id',
      matchId || `${advisorId}_${consumerId}`
    );
  } catch (error) {
    console.error('Failed to track matching interaction:', error);
  }
};
