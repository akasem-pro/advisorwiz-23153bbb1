
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';

/**
 * Interface for matching strategy implementations
 * 
 * This interface defines the contract for all matching strategy implementations.
 * Each strategy must implement the calculateScore method, which returns
 * both a numeric score and qualitative explanations for the match.
 * 
 * The interface enables a flexible strategy pattern where different
 * matching algorithms can be used interchangeably based on context.
 */
export interface MatchingStrategy {
  /**
   * Calculate compatibility score between an advisor and a consumer
   * 
   * @param advisorId - Unique identifier for the advisor
   * @param consumerId - Unique identifier for the consumer
   * @param preferences - User-defined matching preferences that influence the calculation
   * @param callMetrics - Optional historical call interaction data for enhanced matching
   * 
   * @returns Object containing:
   *   - score: Numeric compatibility score (0-100)
   *   - matchExplanation: Array of human-readable explanations for the score
   */
  calculateScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics?: CallMetrics[]
  ): { score: number; matchExplanation: string[] };
}
