
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';
import { RiskFocusedMatchingStrategy } from './RiskFocusedMatchingStrategy';
import { PremiumMatchingStrategy } from './PremiumMatchingStrategy';

/**
 * Available matching strategy types
 */
export type MatchingStrategyType = 'default' | 'premium' | 'risk-focused';

/**
 * Factory for creating matching strategies
 */
export class MatchingStrategyFactory {
  /**
   * Create a matching strategy by name
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
