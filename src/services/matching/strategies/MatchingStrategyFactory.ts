
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';
import { RiskFocusedMatchingStrategy } from './RiskFocusedMatchingStrategy';
import { PremiumMatchingStrategy } from './PremiumMatchingStrategy';

/**
 * Available matching strategy types
 * 
 * @property default - Balanced approach that weighs all factors equally
 * @property premium - Enhanced algorithm for premium users that uses personalized weighting
 * @property risk-focused - Specialized algorithm that prioritizes risk tolerance alignment
 */
export type MatchingStrategyType = 'default' | 'premium' | 'risk-focused';

/**
 * Factory for creating matching strategies
 * 
 * This class implements the Factory pattern to provide the appropriate
 * matching strategy based on the requested type. This allows for easy
 * extension with new strategies in the future.
 * 
 * Usage:
 * ```typescript
 * const strategy = MatchingStrategyFactory.createStrategy('premium');
 * const result = strategy.calculateScore(advisorId, consumerId, preferences);
 * ```
 * 
 * To add a new strategy:
 * 1. Create a new class implementing the MatchingStrategy interface
 * 2. Add a new type to the MatchingStrategyType union
 * 3. Add a new case in the createStrategy method
 */
export class MatchingStrategyFactory {
  /**
   * Create a matching strategy by name
   * 
   * @param strategyType - The type of strategy to create
   * 
   * Strategy selection criteria:
   * - 'default': General purpose matching for most users
   * - 'premium': Enhanced algorithm with more personalization for premium users
   * - 'risk-focused': Special algorithm that prioritizes risk tolerance alignment
   * 
   * @returns The requested matching strategy implementation
   */
  static createStrategy(strategyType: MatchingStrategyType): MatchingStrategy {
    switch (strategyType) {
      case 'default':
        return new DefaultMatchingStrategy();
      case 'risk-focused':
        return new RiskFocusedMatchingStrategy();
      case 'premium':
        return new PremiumMatchingStrategy();
      default:
        // TypeScript should catch invalid strategy types at compile time,
        // but as a safety measure, return DefaultMatchingStrategy for any unexpected value
        console.warn(`Unknown strategy type: ${strategyType}, using default strategy.`);
        return new DefaultMatchingStrategy();
    }
  }
}
