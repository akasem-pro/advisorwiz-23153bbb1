
// Remove crypto import and replace with a browser-compatible hash function
import { MatchPreferences } from '../../context/UserContextDefinition';
import { MatchingStrategy } from './strategies/MatchingStrategy';
import { DefaultMatchingStrategy } from './strategies/DefaultMatchingStrategy';
import { PremiumMatchingStrategy } from './strategies/PremiumMatchingStrategy';
import { RiskFocusedMatchingStrategy } from './strategies/RiskFocusedMatchingStrategy';
import { getCachedCompatibility, cacheCompatibility, getCacheStats } from './cache/compatibilityCache';
import { trackMatchingOperation } from './performance/matchingPerformanceTracker';
import { trackUserBehavior, UserBehaviorEvent } from '../../utils/analytics/eventTracker';

// Available matching strategies
const strategies: Record<string, MatchingStrategy> = {
  default: new DefaultMatchingStrategy(),
  premium: new PremiumMatchingStrategy(),
  'risk-focused': new RiskFocusedMatchingStrategy()
};

// Current strategy
let currentStrategy: MatchingStrategy = strategies.default;

/**
 * Set the active matching strategy
 * @param strategyName The strategy name to use
 */
export const setMatchingStrategy = (strategyName: string): void => {
  if (!strategies[strategyName]) {
    console.error(`Strategy "${strategyName}" not found, using default`);
    currentStrategy = strategies.default;
  } else {
    currentStrategy = strategies[strategyName];
  }
};

/**
 * Generate a stable hash for preferences object
 * Browser-compatible implementation that doesn't rely on Node.js crypto
 * @param preferences Match preferences
 * @returns Hash string
 */
const generatePreferencesHash = (preferences: MatchPreferences): string => {
  const json = JSON.stringify(preferences);
  
  // Simple hash function for browser environments
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to a positive hex string and take first 8 chars
  const hashString = Math.abs(hash).toString(16).padStart(8, '0');
  return hashString.substring(0, 8);
};

/**
 * Calculate weighted compatibility score
 */
export const getWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics: any[] = [],
  trackViewEvent: boolean = false
): { score: number; matchExplanation: string[] } => {
  const startTime = performance.now();
  
  // Generate cache key using both IDs and preferences hash
  const preferencesHash = generatePreferencesHash(preferences);
  const cacheKey = `${advisorId}-${consumerId}-${preferencesHash}`;
  
  // Check cache first
  const cachedResult = getCachedCompatibility(cacheKey);
  if (cachedResult) {
    // Track cache hit
    const duration = performance.now() - startTime;
    trackMatchingOperation('getWeightedCompatibilityScore', duration, {
      advisorId,
      consumerId,
      strategyName: currentStrategy.getName()
    }, true);
    
    // Generate a view ID for tracking events
    if (trackViewEvent) {
      const viewId = `match-${advisorId}-${consumerId}-${Math.random().toString(36).substring(2, 10)}`;
      
      // Track view event
      trackUserBehavior(UserBehaviorEvent.MATCH_VIEW, {
        advisor_id: advisorId,
        consumer_id: consumerId,
        score: cachedResult.score,
        explanations: cachedResult.matchExplanation,
        match_id: viewId,
        view_type: 'cache_hit'
      });
    }
    
    return {
      score: cachedResult.score,
      matchExplanation: cachedResult.matchExplanation
    };
  }
  
  // Use current strategy to calculate score
  const result = currentStrategy.calculateScore(
    advisorId,
    consumerId,
    preferences,
    callMetrics
  );
  
  // Cache the result
  cacheCompatibility(cacheKey, result.score, result.matchExplanation);
  
  // Track performance
  const duration = performance.now() - startTime;
  trackMatchingOperation('getWeightedCompatibilityScore', duration, {
    advisorId,
    consumerId,
    strategyName: currentStrategy.getName()
  }, false);
  
  // Track view event
  if (trackViewEvent) {
    const viewId = `match-${advisorId}-${consumerId}-${Math.random().toString(36).substring(2, 10)}`;
    
    trackUserBehavior(UserBehaviorEvent.MATCH_VIEW, {
      advisor_id: advisorId,
      consumer_id: consumerId,
      score: result.score,
      explanations: result.matchExplanation,
      match_id: viewId,
      view_type: 'calculation'
    });
  }
  
  return result;
};

/**
 * Get cache statistics for monitoring
 */
export const getCompatibilityCacheStats = () => {
  return getCacheStats();
};

// Export for tests and direct usage if needed
export { clearCompatibilityCache } from './cache/compatibilityCache';
