
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
  hitCount?: number;
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
  
  // Update hit count for LRU tracking
  const hitCount = cachedResult.hitCount || 0;
  compatibilityCache.set(cacheKey, {
    ...cachedResult,
    hitCount: hitCount + 1
  });
  
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
    timestamp: Date.now(),
    hitCount: 1
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

/**
 * Get extended cache statistics for monitoring
 */
export const getCompatibilityCacheStats = () => {
  const stats = getCacheStats();
  
  // Calculate hit rate if we had tracking
  let frequentlyAccessedCount = 0;
  for (const entry of compatibilityCache.values()) {
    if (entry.hitCount && entry.hitCount > 5) {
      frequentlyAccessedCount++;
    }
  }
  
  return {
    size: stats.totalEntries,
    hitRate: frequentlyAccessedCount / Math.max(stats.activeEntries, 1) * 100,
    oldestEntry: getOldestEntryAge(),
    frequentlyAccessedCount
  };
};

/**
 * Get age of oldest entry in cache in milliseconds
 */
const getOldestEntryAge = (): number | null => {
  let oldestTimestamp = Date.now();
  
  for (const entry of compatibilityCache.values()) {
    if (entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp;
    }
  }
  
  return oldestTimestamp === Date.now() ? null : Date.now() - oldestTimestamp;
};

/**
 * Remove stale entries from the cache
 */
export const cleanupStaleEntries = (): number => {
  const now = Date.now();
  let removedCount = 0;
  
  for (const [key, entry] of compatibilityCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      compatibilityCache.delete(key);
      removedCount++;
    }
  }
  
  return removedCount;
};

/**
 * Keep only the most frequently accessed entries in the cache
 * 
 * @param limit Maximum number of entries to keep
 */
export const retainTopHitEntries = (limit: number): number => {
  if (compatibilityCache.size <= limit) {
    return 0;
  }
  
  // Convert to array for sorting
  const entries = Array.from(compatibilityCache.entries())
    .sort((a, b) => (b[1].hitCount || 0) - (a[1].hitCount || 0));
  
  // Clear cache
  compatibilityCache.clear();
  
  // Add back only the top entries
  const entriesToKeep = entries.slice(0, limit);
  for (const [key, value] of entriesToKeep) {
    compatibilityCache.set(key, value);
  }
  
  return entries.length - entriesToKeep.length;
};
