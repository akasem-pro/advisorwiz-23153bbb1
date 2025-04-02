
/**
 * Weighted compatibility scoring system
 * Central coordinator for the matching algorithm
 * 
 * This module provides the main entry point for compatibility calculations,
 * utilizing the strategy pattern to apply different scoring algorithms
 * based on context and requirements.
 */
import { MatchPreferences } from '../../context/UserContextDefinition';
import { withPerformanceTracking } from '../../utils/performance/functionTracking';
import { CallMetrics } from '../../types/callTypes';
import { trackMatchingInteraction } from '../../utils/analytics/matchTracker';

// Strategy Pattern components
import { MatchingStrategyContext } from './strategies/MatchingStrategyContext';
import { MatchingStrategyFactory, MatchingStrategyType } from './strategies/MatchingStrategyFactory';

// Cache management with improved implementation
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
 */
export const setMatchingStrategy = (strategyType: MatchingStrategyType): void => {
  const strategy = MatchingStrategyFactory.createStrategy(strategyType);
  strategyContext.setStrategy(strategy);
  console.log(`Matching strategy set to: ${strategyType}`);
};

/**
 * Create a stable cache key for compatibility calculation inputs
 * @private
 */
const createCompatibilityCacheKey = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences
): string => {
  // Sort preference keys to ensure consistent ordering
  const prefsString = JSON.stringify(
    preferences, 
    Object.keys(preferences).sort()
  );
  
  return `${advisorId}-${consumerId}-${prefsString}`;
};

/**
 * Performance-optimized weighted compatibility score calculation
 * 
 * This pure function handles caching and delegates the actual
 * calculation to the current active strategy.
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: CallMetrics[],
  trackAnalytics: boolean = false
): { score: number; matchExplanation: string[] } => {
  if (!advisorId || !consumerId) {
    return { 
      score: 0, 
      matchExplanation: ["Invalid input: Missing advisor or consumer ID"] 
    };
  }

  // Create a comprehensive cache key
  const cacheKey = createCompatibilityCacheKey(advisorId, consumerId, preferences);
  
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
  
  // Get score from the strategy context using a pure function call
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
