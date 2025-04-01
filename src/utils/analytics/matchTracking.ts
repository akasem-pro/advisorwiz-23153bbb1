
import { supabase } from '../../integrations/supabase/client';
import { recordMatchHistory, submitMatchFeedback } from '../../services/matching/supabaseIntegration';
import { v4 as uuidv4 } from 'uuid';

// Track match interaction (view, like, dismiss, etc.)
export const trackMatchInteraction = async (
  action: string,
  advisorId: string,
  consumerId: string,
  score: number,
  matchId: string = '',
  additionalData: Record<string, any> = {}
): Promise<boolean> => {
  try {
    // Use generateMatchId if no matchId provided
    const finalMatchId = matchId || `match-${advisorId}-${consumerId}-${uuidv4().slice(0, 8)}`;
    
    // Record to user_interactions table
    const { error } = await supabase.from('user_interactions').insert({
      advisor_id: advisorId,
      consumer_id: consumerId,
      interaction_type: `match_${action}`,
      notes: JSON.stringify({ 
        score,
        match_id: finalMatchId, 
        ...additionalData 
      })
    });
    
    if (error) {
      console.error('Failed to track match interaction:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to track match interaction:', error);
    return false;
  }
};

// Record match history for trend analysis
export const recordMatchHistoryWithTracking = async (
  advisorId: string,
  consumerId: string,
  score: number,
  factors?: Record<string, any>
): Promise<string | null> => {
  try {
    // First store the compatibility score
    const { data, error } = await supabase
      .from('compatibility_scores')
      .upsert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'advisor_id,consumer_id'
      })
      .select('id');
    
    if (error || !data || data.length === 0) {
      console.error('Failed to create compatibility score:', error);
      return null;
    }
    
    const compatibilityScoreId = data[0].id;
    
    // Then record the match history
    const success = await recordMatchHistory(
      compatibilityScoreId,
      advisorId,
      consumerId,
      score,
      '1.0', // Algorithm version
      factors
    );
    
    if (!success) {
      console.error('Failed to record match history');
      return null;
    }
    
    return compatibilityScoreId;
  } catch (error) {
    console.error('Failed to record match history:', error);
    return null;
  }
};

// Submit feedback about a match
export const submitMatchFeedbackWithTracking = async (
  matchId: string,
  userId: string,
  isHelpful: boolean,
  comment?: string
): Promise<boolean> => {
  try {
    // Track the feedback
    await trackMatchInteraction(
      'feedback',
      '', // Will be parsed from matchId if needed
      '', // Will be parsed from matchId if needed
      0, // Score unknown at this point
      matchId,
      {
        is_helpful: isHelpful,
        has_comment: !!comment
      }
    );
    
    // Submit the actual feedback
    return await submitMatchFeedback(
      matchId,
      userId,
      isHelpful,
      comment
    );
  } catch (error) {
    console.error('Failed to submit match feedback:', error);
    return false;
  }
};
