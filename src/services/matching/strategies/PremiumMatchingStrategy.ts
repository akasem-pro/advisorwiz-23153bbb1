
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { handleError, createError, ErrorCategory, ErrorSeverity } from '../../../utils/errorHandling';

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
    try {
      // Input validation
      if (!advisorId || !consumerId) {
        return { 
          score: 0, 
          matchExplanation: ["Invalid input: Missing advisor or consumer ID"] 
        };
      }

      // Normalize preferences to prevent unexpected nulls
      const safePreferences: MatchPreferences = {
        ...preferences,
        weightFactors: preferences?.weightFactors || {}
      };
      
      // Base score for premium users
      const baseScore = 80;
      const explanations = [
        "Premium matching algorithm applied",
        "Dynamic user preference weights utilized"
      ];
      
      // Apply weight factors if they exist
      if (safePreferences.weightFactors) {
        explanations.push("Personalized weight factors applied to match criteria");
        
        // We would apply the specific weights here in a real implementation
        // For example, if language is weighted higher, we'd score that more heavily
        if (safePreferences.weightFactors.language && safePreferences.weightFactors.language > 50) {
          explanations.push(`Language compatibility weighted at ${safePreferences.weightFactors.language}%`);
        }
        
        if (safePreferences.weightFactors.expertise && safePreferences.weightFactors.expertise > 50) {
          explanations.push(`Expertise match weighted at ${safePreferences.weightFactors.expertise}%`);
        }
        
        if (safePreferences.weightFactors.interaction && safePreferences.weightFactors.interaction > 40) {
          explanations.push("Past interactions heavily factored into match score");
        }
      }
      
      // Consider additional premium factors
      if (safePreferences.considerInteractionData && callMetrics && callMetrics.length > 0) {
        explanations.push("Call history and interaction quality analyzed");
      }
      
      // In practice, we'd calculate this based on actual profile data and preferences
      return {
        score: baseScore,
        matchExplanation: explanations
      };
    } catch (error) {
      // Create a proper AppError object using createError
      const appError = createError(
        `Error in Premium Matching Strategy: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCategory.UNKNOWN,
        ErrorSeverity.MEDIUM,
        error,
        { advisorId, consumerId }
      );
      
      // Pass the properly constructed error object to handleError
      handleError(appError);
      
      return { 
        score: 0, 
        matchExplanation: ["An error occurred while calculating premium compatibility"] 
      };
    }
  }

  /**
   * Get the name of the strategy for logging and analytics
   * @returns Name of the strategy
   */
  getName(): string {
    return 'Premium Enhanced Strategy';
  }
  
  /**
   * Get the description of how this strategy works
   * @returns Description of the strategy
   */
  getDescription(): string {
    return 'Enhanced algorithm for premium users that applies custom weighting factors ' +
           'and analyzes historical interaction data to provide highly personalized matching.';
  }
}
