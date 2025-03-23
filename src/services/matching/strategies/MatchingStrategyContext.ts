
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';

/**
 * Context for using different matching strategies
 * Acts as a facade for the matching strategy pattern
 */
export class MatchingStrategyContext {
  private strategy: MatchingStrategy;
  
  constructor(strategy: MatchingStrategy = new DefaultMatchingStrategy()) {
    this.strategy = strategy;
  }

  /**
   * Set a new matching strategy
   */
  setStrategy(strategy: MatchingStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Calculate compatibility score using the current strategy
   */
  calculateCompatibilityScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics?: CallMetrics[]
  ): { score: number; matchExplanation: string[] } {
    return this.strategy.calculateScore(advisorId, consumerId, preferences, callMetrics);
  }
}
