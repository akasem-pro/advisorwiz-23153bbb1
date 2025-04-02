
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';

/**
 * Context for using different matching strategies
 * 
 * This class acts as a facade for the matching strategy pattern, providing
 * a simplified interface for client code to use different matching strategies
 * without being tightly coupled to specific implementations.
 * 
 * Usage example:
 * ```typescript
 * const context = new MatchingStrategyContext();
 * // Use default strategy
 * let result = context.calculateCompatibilityScore(advisorId, consumerId, preferences);
 * // Switch to a different strategy
 * context.setStrategy(new PremiumMatchingStrategy());
 * // Use new strategy
 * result = context.calculateCompatibilityScore(advisorId, consumerId, preferences);
 * ```
 */
export class MatchingStrategyContext {
  /**
   * The current strategy used for calculations
   * @private
   */
  private strategy: MatchingStrategy;
  
  /**
   * Creates a new matching strategy context
   * 
   * @param strategy - The initial strategy to use (defaults to DefaultMatchingStrategy)
   */
  constructor(strategy: MatchingStrategy = new DefaultMatchingStrategy()) {
    this.strategy = strategy;
  }

  /**
   * Set a new matching strategy
   * 
   * @param strategy - The new strategy to use for calculations
   */
  setStrategy(strategy: MatchingStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Calculate compatibility score using the current strategy
   * 
   * @param advisorId - ID of the advisor to evaluate
   * @param consumerId - ID of the consumer to match against
   * @param preferences - User-defined matching preferences
   * @param callMetrics - Optional call interaction metrics
   * 
   * @returns Compatibility score (0-100) and explanations from the current strategy
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
