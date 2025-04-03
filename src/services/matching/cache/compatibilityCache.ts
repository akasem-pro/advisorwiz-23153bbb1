
/**
 * Cache management for compatibility scores
 * This file provides utilities for caching and retrieving compatibility scores
 * to improve performance of matching operations.
 */

// Cache structure: advisorId-consumerId-preferencesHash -> {score, explanations, timestamp}
const compatibilityCache = new Map<string, {
  score: number;
  matchExplanation: string[];
  timestamp: number;
}>();

// Cache configuration
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const MAX_CACHE_SIZE = 1000; // Maximum number of entries to prevent memory issues

/**
 * Get a cached compatibility result
 * 
 * @param cacheKey The cache key (advisorId-consumerId-preferencesHash)
 * @returns The cached result or undefined if not found or expired
 */
export const getCachedCompatibility = (cacheKey: string) => {
  const cachedResult = compatibilityCache.get(cacheKey);
  
  if (!cachedResult) return undefined;
  
  // Check if cache entry has expired
  if (Date.now() - cachedResult.timestamp > CACHE_TTL) {
    // Cache expired, remove it
    compatibilityCache.delete(cacheKey);
    return undefined;
  }
  
  return cachedResult;
};

/**
 * Store a compatibility result in the cache
 * 
 * @param cacheKey The cache key (advisorId-consumerId-preferencesHash)
 * @param score The compatibility score
 * @param matchExplanation The match explanations
 */
export const cacheCompatibility = (
  cacheKey: string,
  score: number,
  matchExplanation: string[]
) => {
  // Enforce cache size limit with LRU behavior (remove oldest entries)
  if (compatibilityCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = compatibilityCache.keys().next().value;
    compatibilityCache.delete(oldestKey);
  }
  
  compatibilityCache.set(cacheKey, {
    score,
    matchExplanation,
    timestamp: Date.now()
  });
};

/**
 * Clear the compatibility cache
 */
export const clearCompatibilityCache = () => {
  compatibilityCache.clear();
};

/**
 * Invalidate cache entries for a specific advisor or consumer
 * 
 * @param id The advisor or consumer ID
 */
export const invalidateCompatibilityCache = (id: string) => {
  // Delete any cache entries that contain this ID
  for (const key of compatibilityCache.keys()) {
    if (key.includes(id)) {
      compatibilityCache.delete(key);
    }
  }
};

/**
 * Get cache statistics
 * 
 * @returns Cache statistics object
 */
export const getCacheStats = () => {
  let expiredCount = 0;
  const now = Date.now();
  
  // Count expired entries
  for (const entry of compatibilityCache.values()) {
    if (now - entry.timestamp > CACHE_TTL) {
      expiredCount++;
    }
  }
  
  return {
    totalEntries: compatibilityCache.size,
    expiredEntries: expiredCount,
    activeEntries: compatibilityCache.size - expiredCount
  };
};
