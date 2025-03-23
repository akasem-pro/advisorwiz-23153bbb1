
/**
 * Weighted compatibility scoring system
 * Central coordinator for the matching algorithm
 */
import { MatchPreferences } from '../../context/UserContextDefinition';
import { withPerformanceTracking } from '../../utils/matchingPerformance';
import { CallMetrics } from '../../types/callTypes';
import { trackMatchingInteraction } from '../../utils/analytics/matchTracker';

// Strategy Pattern components
import { MatchingStrategyContext } from './strategies/MatchingStrategyContext';
import { MatchingStrategyFactory, MatchingStrategyType } from './strategies/MatchingStrategyFactory';

// Cache management
import { 
  getCachedResult, 
  cacheResult, 
  clearCompatibilityCache, 
  getCompatibilityCacheStats 
} from './cache/compatibilityCache';

// Create the strategy context with default strategy
const strategyContext = new MatchingStrategyContext(
  MatchingStrategyFactory.createStrategy('default')
);

/**
 * Set the active matching strategy
 * 
 * @param strategyType - The type of matching strategy to use
 */
export const setMatchingStrategy = (strategyType: MatchingStrategyType): void => {
  const strategy = MatchingStrategyFactory.createStrategy(strategyType);
  strategyContext.setStrategy(strategy);
};

/**
 * Performance-optimized weighted compatibility score calculation
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

// Export the function with performance tracking wrapper
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);

// Re-export cache utilities
export {
  clearCompatibilityCache,
  getCompatibilityCacheStats
};
