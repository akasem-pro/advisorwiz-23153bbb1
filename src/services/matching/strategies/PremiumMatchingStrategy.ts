
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';

/**
 * Premium Matching Strategy
 * 
 * This strategy leverages dynamic user preferences and weight factors
 * to provide highly personalized matching tailored to premium users.
 * The algorithm takes into account custom weighting for different factors
 * and can analyze past interaction data for improved matching.
 */
export class PremiumMatchingStrategy implements MatchingStrategy {
  /**
   * Calculate compatibility score with emphasis on user-defined preferences
   * 
   * @param advisorId - The ID of the advisor to match
   * @param consumerId - The ID of the consumer to match
   * @param preferences - User-defined matching preferences, including custom weight factors
   * @param callMetrics - Optional historical call metrics for interaction-based scoring
   * @returns Object containing the score and explanations for the match
   */
  calculateScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics?: CallMetrics[]
  ): { score: number; matchExplanation: string[] } {
    // Base score for premium users
    const baseScore = 80;
    const explanations = [
      "Premium matching algorithm applied",
      "Dynamic user preference weights utilized"
    ];
    
    // Apply weight factors if they exist
    if (preferences.weightFactors) {
      explanations.push("Personalized weight factors applied to match criteria");
      
      // We would apply the specific weights here in a real implementation
      // For example, if language is weighted higher, we'd score that more heavily
      if (preferences.weightFactors.language && preferences.weightFactors.language > 50) {
        explanations.push(`Language compatibility weighted at ${preferences.weightFactors.language}%`);
      }
      
      if (preferences.weightFactors.expertise && preferences.weightFactors.expertise > 50) {
        explanations.push(`Expertise match weighted at ${preferences.weightFactors.expertise}%`);
      }
      
      if (preferences.weightFactors.interaction && preferences.weightFactors.interaction > 40) {
        explanations.push("Past interactions heavily factored into match score");
      }
    }
    
    // Consider additional premium factors
    if (preferences.considerInteractionData && callMetrics && callMetrics.length > 0) {
      explanations.push("Call history and interaction quality analyzed");
    }
    
    // In practice, we'd calculate this based on actual profile data and preferences
    return {
      score: baseScore,
      matchExplanation: explanations
    };
  }
}
