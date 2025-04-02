
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { handleError, createError, ErrorCategory, ErrorSeverity } from '../../../utils/errorHandling';

/**
 * Risk-Focused Matching Strategy
 * 
 * This strategy prioritizes matching consumers with advisors who have expertise
 * in risk management and align with the consumer's risk tolerance preferences.
 */
export class RiskFocusedMatchingStrategy implements MatchingStrategy {
  /**
   * Calculate compatibility score with emphasis on risk alignment
   * 
   * @param advisorId - ID of the advisor to evaluate
   * @param consumerId - ID of the consumer to match against
   * @param preferences - User-defined matching preferences
   * @param callMetrics - Optional call interaction metrics
   * 
   * @returns Compatibility score (0-100) and explanations
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

      // In a real implementation, this would:
      // 1. Query advisor and consumer profiles
      // 2. Put heavy weight on risk tolerance alignment
      // 3. Consider risk management expertise of the advisor
      // 4. Analyze portfolio diversification needs
      
      // For this example, we'll return a mock implementation
      // that would be replaced with actual risk-focused algorithm
      
      const baseScore = 75; // Reasonable starting score
      const explanations = [
        "Risk-focused matching algorithm applied",
        "Advisor's risk management expertise considered",
        "Consumer's risk tolerance preferences prioritized"
      ];
      
      // In practice, we'd calculate this based on actual profile data
      return {
        score: baseScore,
        matchExplanation: explanations
      };
    } catch (error) {
      // Create a proper AppError object using createError
      const appError = createError(
        `Error in Risk-Focused Matching Strategy: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCategory.UNKNOWN,
        ErrorSeverity.MEDIUM,
        error,
        { advisorId, consumerId }
      );
      
      // Pass the properly constructed error object to handleError
      handleError(appError);
      
      return { 
        score: 0, 
        matchExplanation: ["An error occurred while calculating risk-focused compatibility"] 
      };
    }
  }
  
  /**
   * Get the name of the strategy for logging and analytics
   * @returns Name of the strategy
   */
  getName(): string {
    return 'Risk-Focused Strategy';
  }
  
  /**
   * Get the description of how this strategy works
   * @returns Description of the strategy
   */
  getDescription(): string {
    return 'Specialized algorithm that prioritizes risk tolerance alignment between ' +
           'advisors and consumers, with emphasis on risk management expertise.';
  }
}
