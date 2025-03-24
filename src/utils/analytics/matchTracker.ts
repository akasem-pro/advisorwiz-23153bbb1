
import { supabase } from '../../integrations/supabase/client';
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';
import { handleSupabaseError, ErrorSeverity } from '../errorHandling/supabaseErrorHandler';

/**
 * Track actions related to advisor-consumer matching
 */
export const trackMatchingInteraction = async (
  action: 'view' | 'like' | 'dislike' | 'contact' | 'feedback',
  advisorId: string,
  consumerId: string,
  score: number = 0,
  matchId?: string,
  properties?: Record<string, any>
): Promise<boolean> => {
  try {
    // Record the interaction in the database
    if (matchId) {
      await supabase
        .from('match_history')
        .upsert({
          id: matchId,
          advisor_id: advisorId,
          consumer_id: consumerId,
          score: Math.round(score * 100),
          recorded_at: new Date().toISOString(),
        });
    }
    
    // Track the event for analytics
    trackUserBehavior(
      UserBehaviorEvent.MATCH_VIEW, 
      {
        action,
        advisor_id: advisorId,
        consumer_id: consumerId,
        score: Math.round(score * 100),
        match_id: matchId,
        ...properties
      }
    );
    
    return true;
  } catch (error) {
    handleSupabaseError(
      'Failed to track matching interaction', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
    return false;
  }
};

/**
 * Record match feedback from users
 */
export const recordMatchFeedback = async (
  matchId: string,
  isHelpful: boolean,
  comment?: string
): Promise<boolean> => {
  try {
    await supabase
      .from('match_feedback')
      .insert({
        match_id: matchId,
        is_helpful: isHelpful,
        comment,
        created_at: new Date().toISOString()
      });
      
    return true;
  } catch (error) {
    handleSupabaseError(
      'Failed to record match feedback', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
    return false;
  }
};
