
/**
 * Call interaction scoring algorithm
 */
import { PREFERENCE_WEIGHTS } from '../constants/matchingWeights';
import { CallMetrics } from '../../../types/callTypes';

export const calculateCallInteractionScore = (
  advisorId: string,
  consumerId: string,
  callMetrics?: CallMetrics[]
): { score: number; explanation: string | null } => {
  if (!callMetrics?.length) {
    return { score: 0, explanation: null };
  }
  
  const metrics = callMetrics.find(m => 
    m.advisorId === advisorId && m.consumerId === consumerId
  );
  
  if (!metrics) {
    return { score: 0, explanation: null };
  }
  
  // Add bonus for high engagement users (more calls and longer duration)
  const callCountBonus = Math.min(
    metrics.totalCalls * 2, 
    PREFERENCE_WEIGHTS.CALL_INTERACTION.CALL_COUNT
  );
  
  const durationBonus = Math.min(
    Math.floor(metrics.totalDuration / 300), 
    PREFERENCE_WEIGHTS.CALL_INTERACTION.DURATION
  );
  
  const completionRateBonus = metrics.totalCalls > 0 
    ? Math.min(
        (metrics.callOutcomes.completed / metrics.totalCalls) * PREFERENCE_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE, 
        PREFERENCE_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE
      )
    : 0;
    
  const totalInteractionBonus = callCountBonus + durationBonus + completionRateBonus;
  
  let explanation: string | null = null;
  
  if (totalInteractionBonus > 15) {
    explanation = "Excellent communication history with this advisor";
  } else if (totalInteractionBonus > 5) {
    explanation = "Good communication history with this advisor";
  }
  
  return { score: totalInteractionBonus, explanation };
};
