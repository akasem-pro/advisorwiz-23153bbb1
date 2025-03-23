
import { supabase } from '../../integrations/supabase/client';

// Record match history for trend analysis
export const recordMatchHistory = async (
  compatibilityScoreId: string,
  advisorId: string,
  consumerId: string,
  score: number,
  factors?: Record<string, any>
): Promise<void> => {
  try {
    await supabase
      .from('match_history')
      .insert({
        compatibility_score_id: compatibilityScoreId,
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        algorithm_version: '1.0', // Update this as algorithm changes
        factors: factors || null
      });
  } catch (error) {
    console.error('Failed to record match history:', error);
  }
};
