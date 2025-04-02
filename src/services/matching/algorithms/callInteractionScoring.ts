
/**
 * Call interaction scoring algorithm
 * 
 * This module analyzes historical call data between advisors and consumers
 * to enhance compatibility scores based on their previous interactions.
 * 
 * It rewards pairs that have had positive call experiences together,
 * considering factors like call frequency, duration, and completion rates.
 */
import { MATCHING_WEIGHTS } from '../config/matchingConfig';
import { CallMetrics } from '../../../types/callTypes';

/**
 * Calculate a compatibility score bonus based on call interaction history
 * 
 * Scoring factors:
 * 1. Total number of calls (frequency) - rewards repeated interactions
 * 2. Total call duration - rewards longer engagements
 * 3. Call completion rate - rewards successful interactions
 * 
 * @param advisorId - ID of the advisor
 * @param consumerId - ID of the consumer
 * @param callMetrics - Array of call metrics data
 * 
 * @returns Score boost value (0 to max defined in weights) and explanation
 */
export const calculateCallInteractionScore = (
  advisorId: string,
  consumerId: string,
  callMetrics?: CallMetrics[]
): { score: number; explanation: string | null } => {
  // Early return if no metrics available
  if (!callMetrics?.length) {
    return { score: 0, explanation: null };
  }
  
  // Find metrics for this specific advisor-consumer pair
  const metrics = callMetrics.find(m => 
    m.advisorId === advisorId && m.consumerId === consumerId
  );
  
  if (!metrics) {
    return { score: 0, explanation: null };
  }
  
  // Calculate bonuses for different metrics
  
  // Call count bonus - 2 points per call up to maximum
  const callCountBonus = Math.min(
    metrics.totalCalls * 2, 
    MATCHING_WEIGHTS.CALL_INTERACTION.CALL_COUNT
  );
  
  // Duration bonus - 1 point per 5 minutes up to maximum
  const durationBonus = Math.min(
    Math.floor(metrics.totalDuration / 300), 
    MATCHING_WEIGHTS.CALL_INTERACTION.DURATION
  );
  
  // Completion rate bonus - percentage of calls completed successfully
  const completionRateBonus = metrics.totalCalls > 0 
    ? Math.min(
        (metrics.callOutcomes.completed / metrics.totalCalls) * MATCHING_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE, 
        MATCHING_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE
      )
    : 0;
    
  // Sum all bonuses for total interaction score
  const totalInteractionBonus = callCountBonus + durationBonus + completionRateBonus;
  
  // Generate appropriate explanation based on score
  let explanation: string | null = null;
  
  if (totalInteractionBonus > 15) {
    explanation = "Excellent communication history with this advisor";
  } else if (totalInteractionBonus > 5) {
    explanation = "Good communication history with this advisor";
  }
  
  return { score: totalInteractionBonus, explanation };
};
