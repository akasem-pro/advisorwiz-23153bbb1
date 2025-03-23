
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';
import { RiskFocusedMatchingStrategy } from './RiskFocusedMatchingStrategy';
import { PremiumMatchingStrategy } from './PremiumMatchingStrategy';

/**
 * Available matching strategy types
 * 
 * - default: Balanced approach that weighs all factors equally
 * - premium: Enhanced algorithm for premium users that uses personalized weighting
 * - risk-focused: Specialized algorithm that prioritizes risk tolerance alignment
 */
export type MatchingStrategyType = 'default' | 'premium' | 'risk-focused';

/**
 * Factory for creating matching strategies
 * 
 * This class implements the Factory pattern to provide the appropriate
 * matching strategy based on the requested type. This allows for easy
 * extension with new strategies in the future.
 */
export class MatchingStrategyFactory {
  /**
   * Create a matching strategy by name
   * 
   * @param strategyType - The type of strategy to create
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
        return new DefaultMatchingStrategy();
    }
  }
}
