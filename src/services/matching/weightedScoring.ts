
/**
 * Weighted compatibility scoring system
 * Central coordinator for the matching algorithm
 * 
 * This module provides the main entry point for compatibility calculations,
 * utilizing the strategy pattern to apply different scoring algorithms
 * based on context and requirements.
 * 
 * Key features:
 * - Strategy-based scoring with interchangeable algorithms
 * - Performance optimization through caching
 * - Integration with analytics for match tracking
 * - Support for custom preference weightings
 */
import { MatchPreferences } from '../../context/UserContextDefinition';
import { withPerformanceTracking } from '../../utils/performance/functionTracking';
import { CallMetrics } from '../../types/callTypes';
import { trackMatchingInteraction } from '../../utils/analytics/matchTracker';

// Strategy Pattern components
import { MatchingStrategyContext } from './strategies/MatchingStrategyContext';
import { MatchingStrategyFactory, MatchingStrategyType } from './strategies/MatchingStrategyFactory';

// Cache management - updated imports
import { 
  getCachedResult, 
  cacheResult, 
  clearCompatibilityCache, 
  getCompatibilityCacheStats,
  checkCacheMaintenance
} from './cache/compatibilityCache';

/**
 * The current active strategy context used for calculations
 * @private
 */
const strategyContext = new MatchingStrategyContext(
  MatchingStrategyFactory.createStrategy('default')
);

/**
 * Set the active matching strategy
 * 
 * @param strategyType - The type of matching strategy to use
 * 
 * Usage example:
 * ```typescript
 * // For a premium user
 * setMatchingStrategy('premium');
 * // For risk-focused matching
 * setMatchingStrategy('risk-focused');
 * ```
 */
export const setMatchingStrategy = (strategyType: MatchingStrategyType): void => {
  const strategy = MatchingStrategyFactory.createStrategy(strategyType);
  strategyContext.setStrategy(strategy);
  console.log(`Matching strategy set to: ${strategyType}`);
};

/**
 * Performance-optimized weighted compatibility score calculation
 * 
 * This function handles caching, analytics tracking, and delegates the actual
 * calculation to the current active strategy.
 * 
 * @param advisorId - The ID of the advisor to score
 * @param consumerId - The ID of the consumer to score against
 * @param preferences - The matching preferences to apply
 * @param callMetrics - Optional call metrics for interaction-based scoring
 * @param trackAnalytics - Whether to track this calculation in analytics
 * @returns Object containing both the score and explanation for the match
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: CallMetrics[],
  trackAnalytics: boolean = false
): { score: number; matchExplanation: string[] } => {
  // Create a comprehensive cache key that includes preferences
  const cacheKey = `${advisorId}-${consumerId}-${JSON.stringify(preferences)}`;
  
  // Check if we have this calculation cached and it's not expired
  const cachedResult = getCachedResult(cacheKey);
  if (cachedResult) {
    // Track analytics even for cached results if requested
    if (trackAnalytics) {
      // Generate a unique ID for this match calculation
      const matchId = `${advisorId}_${consumerId}_${Date.now()}`;
      
      // Track the match view event asynchronously
      trackMatchingInteraction(
        'view',
        advisorId,
        consumerId,
        cachedResult.score,
        matchId,
        { explanations: cachedResult.matchExplanation }
      );
    }
    return cachedResult;
  }
  
  // Check if cache maintenance is needed
  checkCacheMaintenance();
  
  // Get score from the strategy context
  const result = strategyContext.calculateCompatibilityScore(
    advisorId, 
    consumerId, 
    preferences, 
    callMetrics
  );
  
  // Cache the result with a timestamp
  cacheResult(cacheKey, result);
  
  // Track analytics for newly calculated match if requested
  if (trackAnalytics) {
    // Generate a unique ID for this match calculation
    const matchId = `${advisorId}_${consumerId}_${Date.now()}`;
    
    // Track the match view event asynchronously
    trackMatchingInteraction(
      'view',
      advisorId,
      consumerId,
      result.score,
      matchId,
      { explanations: result.matchExplanation }
    );
  }
  
  return result;
};

/**
 * Public API: Calculate compatibility score with performance tracking
 * 
 * This exported function wraps the internal calculation function with
 * performance tracking to monitor execution time and success rates.
 */
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);

// Re-export cache utilities for external use
export {
  clearCompatibilityCache,
  getCompatibilityCacheStats
};
