
import { supabase } from '../../integrations/supabase/client';
import { storeAnalyticsMetric } from '../performance/core';
import { MatchAction } from './types';
import { trackUserBehavior } from './eventTracker';

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
