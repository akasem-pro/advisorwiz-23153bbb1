
/**
 * Compatibility Cache Module
 * 
 * Provides caching functionality for compatibility score calculations
 * with time-based invalidation and size management.
 */

interface CachedResult {
  score: number;
  matchExplanation: string[];
  timestamp: number;
}

// Cache storage
const compatibilityCache: Map<string, CachedResult> = new Map();

// Cache configuration
const CACHE_MAX_SIZE = 500;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Performance metrics
let cacheHits = 0;
let cacheMisses = 0;

/**
 * Get cached compatibility result
 */
export const getCachedCompatibility = (cacheKey: string): CachedResult | null => {
  const cachedResult = compatibilityCache.get(cacheKey);
  
  // If not in cache, return null
  if (!cachedResult) {
    cacheMisses++;
    return null;
  }
  
  // Check if entry is expired
  const now = Date.now();
  if (now - cachedResult.timestamp > CACHE_TTL) {
    compatibilityCache.delete(cacheKey);
    cacheMisses++;
    return null;
  }
  
  // Valid cache hit
  cacheHits++;
  return cachedResult;
};

/**
 * Cache a compatibility result
 */
export const cacheCompatibility = (
  cacheKey: string,
  score: number,
  matchExplanation: string[]
): void => {
  // Check if cache is at max capacity
  if (compatibilityCache.size >= CACHE_MAX_SIZE) {
    // Remove oldest entry
    const oldestKey = Array.from(compatibilityCache.keys())[0];
    compatibilityCache.delete(oldestKey);
  }
  
  // Add to cache
  compatibilityCache.set(cacheKey, {
    score,
    matchExplanation,
    timestamp: Date.now()
  });
};

/**
 * Clear the compatibility cache
 */
export const clearCompatibilityCache = (): void => {
  compatibilityCache.clear();
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  const now = Date.now();
  let oldestEntryTime = now;
  let activeEntries = 0;
  
  // Count active (non-expired) entries
  compatibilityCache.forEach((entry) => {
    if (now - entry.timestamp <= CACHE_TTL) {
      activeEntries++;
      if (entry.timestamp < oldestEntryTime) {
        oldestEntryTime = entry.timestamp;
      }
    }
  });
  
  return {
    totalEntries: compatibilityCache.size,
    activeEntries,
    oldestEntry: activeEntries > 0 ? new Date(oldestEntryTime) : null,
    hitRate: cacheHits + cacheMisses > 0 
      ? (cacheHits / (cacheHits + cacheMisses)) * 100 
      : 0,
    size: compatibilityCache.size, // Add size for consistency with other interfaces
    expiredEntries: compatibilityCache.size - activeEntries // Add expiredEntries for operations/cacheOperations.ts
  };
};

/**
 * Clean up stale entries from cache
 * @returns Number of entries removed
 */
export const cleanupStaleEntries = (): number => {
  const now = Date.now();
  let removedCount = 0;
  
  compatibilityCache.forEach((entry, key) => {
    if (now - entry.timestamp > CACHE_TTL) {
      compatibilityCache.delete(key);
      removedCount++;
    }
  });
  
  return removedCount;
};

/**
 * Retain only the most frequently accessed entries
 * @param limit Number of entries to keep
 * @returns Number of entries removed
 */
export const retainTopHitEntries = (limit: number): number => {
  if (compatibilityCache.size <= limit) return 0;
  
  // In a real implementation, this would track access frequency
  // For now, we'll just keep the most recent entries
  const entries = Array.from(compatibilityCache.entries())
    .sort((a, b) => b[1].timestamp - a[1].timestamp);
  
  const toRemove = entries.slice(limit);
  let removedCount = 0;
  
  toRemove.forEach(([key]) => {
    compatibilityCache.delete(key);
    removedCount++;
  });
  
  return removedCount;
};

/**
 * Get compatibility cache statistics specifically for the useMatchingCache hook
 */
export const getCompatibilityCacheStats = () => {
  const stats = getCacheStats();
  
  return {
    size: stats.size,
    hitRate: stats.hitRate,
    oldestEntry: stats.oldestEntry,
    frequentlyAccessedCount: Math.min(stats.size, 20) // Placeholder for actual tracking
  };
};
