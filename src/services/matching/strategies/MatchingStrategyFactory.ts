
import { MatchingStrategy } from './MatchingStrategy';
import { DefaultMatchingStrategy } from './DefaultMatchingStrategy';

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
      // Add more strategies here when they're implemented
      // case 'premium':
      //   return new PremiumMatchingStrategy();
      // case 'risk-focused':
      //   return new RiskFocusedMatchingStrategy();
      default:
        return new DefaultMatchingStrategy();
    }
  }
}
