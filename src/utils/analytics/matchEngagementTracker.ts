
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { handleSupabaseError, ErrorSeverity } from '../errorHandling/supabaseErrorHandler';

/**
 * Event types for match engagement tracking
 */
export type MatchEngagementEvent = 
  | 'view_profile'
  | 'view_explanation'
  | 'feedback'
  | 'contact'
  | 'schedule'
  | 'save'
  | 'dismiss';

/**
 * Track specific engagement with matches to improve algorithm
 * 
 * @param event - The type of engagement
 * @param matchId - The ID of the match
 * @param score - The compatibility score (0-100)
 * @param advisorId - The advisor ID
 * @param properties - Additional properties to track
 * @returns Whether the tracking was successful
 */
export const trackMatchEngagement = async (
  event: MatchEngagementEvent,
  matchId: string,
  score?: number,
  advisorId?: string,
  properties?: Record<string, any>
): Promise<boolean> => {
  try {
    // Track event via tag manager
    trackEvent('match_engagement', {
      event_type: event,
      match_id: matchId,
      score: score,
      advisor_id: advisorId,
      timestamp: new Date().toISOString(),
      ...properties
    });
    
    // Store in database for more detailed analytics if needed
    // This is optional and depends on business requirements
    if (advisorId && properties?.consumer_id) {
      await supabase.from('user_interactions').insert({
        advisor_id: advisorId,
        consumer_id: properties.consumer_id,
        interaction_type: `match_${event}`,
        notes: JSON.stringify({ 
          match_id: matchId, 
          score: score,
          ...properties 
        })
      });
    }
    
    return true;
  } catch (error) {
    handleSupabaseError(
      'Failed to track match engagement', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
    return false;
  }
};
