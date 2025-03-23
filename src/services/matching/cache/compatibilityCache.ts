
/**
 * Compatibility score caching system
 */
import { CACHE_EXPIRATION_MS } from '../constants/matchingWeights';

// In-memory cache for weighted compatibility scores
const scoreCache = new Map<string, {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
}>();

/**
 * Check if a cached entry exists and is valid
 */
export const getCachedResult = (cacheKey: string) => {
  const cachedEntry = scoreCache.get(cacheKey);
  if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRATION_MS)) {
    return cachedEntry.result;
  }
  return null;
};

/**
 * Store a result in the cache
 */
export const cacheResult = (
  cacheKey: string,
  result: { score: number; matchExplanation: string[] }
) => {
  scoreCache.set(cacheKey, {
    result,
    timestamp: Date.now()
  });
};

/**
 * Clear the entire compatibility cache
 */
export const clearCompatibilityCache = (): void => {
  scoreCache.clear();
};

/**
 * Get statistics about the cache for debugging
 */
export const getCompatibilityCacheStats = (): { size: number, oldestEntry: number | null } => {
  let oldestTimestamp: number | null = null;
  
  for (const entry of scoreCache.values()) {
    if (oldestTimestamp === null || entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp;
    }
  }
  
  return {
    size: scoreCache.size,
    oldestEntry: oldestTimestamp ? Date.now() - oldestTimestamp : null
  };
};
