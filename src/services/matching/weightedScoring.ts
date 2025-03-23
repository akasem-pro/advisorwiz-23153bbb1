
/**
 * Weighted compatibility scoring system
 * Central coordinator for the matching algorithm
 */
import { MatchPreferences } from '../../context/UserContextDefinition';
import { withPerformanceTracking } from '../../utils/matchingPerformance';
import { CallMetrics } from '../../types/callTypes';

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
 */
export const setMatchingStrategy = (strategyType: MatchingStrategyType): void => {
  const strategy = MatchingStrategyFactory.createStrategy(strategyType);
  strategyContext.setStrategy(strategy);
};

/**
 * Performance-optimized weighted compatibility score calculation
 * @returns {Object} Contains both the score and explanation for the match
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: CallMetrics[]
): { score: number; matchExplanation: string[] } => {
  // Create a comprehensive cache key that includes preferences
  const cacheKey = `${advisorId}-${consumerId}-${JSON.stringify(preferences)}`;
  
  // Check if we have this calculation cached and it's not expired
  const cachedResult = getCachedResult(cacheKey);
  if (cachedResult) {
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
