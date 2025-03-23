
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';

/**
 * Interface for matching strategy implementations
 */
export interface MatchingStrategy {
  /**
   * Calculate compatibility score between an advisor and a consumer
   */
  calculateScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics?: CallMetrics[]
  ): { score: number; matchExplanation: string[] };
}
