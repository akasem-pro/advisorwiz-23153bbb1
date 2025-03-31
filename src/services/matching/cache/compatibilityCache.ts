
/**
 * Enhanced compatibility score caching system with memory optimizations
 * This file serves as a facade for the underlying cache implementation
 */

// Re-export key functionality from internal modules
export { getCachedResult, cacheResult } from './operations/cacheOperations';
export { 
  cleanupStaleEntries, 
  retainTopHitEntries, 
  pruneCache,
  cleanupCacheAsync,
  CACHE_CLEANUP_INTERVAL,
  CACHE_AUTO_CLEANUP_SIZE,
  MAX_CACHE_SIZE
} from './maintenance/cacheMaintenance';
export { getCompatibilityCacheStats } from './statistics/cacheStatistics';
export { clearCache as clearCompatibilityCache } from './core/cacheStore';

// Main function to check cache maintenance if needed
import { getCacheSize, getLastCleanupTime } from './core/cacheStore';
import { 
  CACHE_AUTO_CLEANUP_SIZE, 
  CACHE_CLEANUP_INTERVAL, 
  cleanupCacheAsync, 
  MAX_CACHE_SIZE,
  pruneCache
} from './maintenance/cacheMaintenance';

/**
 * Check if cache maintenance is needed and perform it if required
 */
export const checkCacheMaintenance = (): void => {
  const currentSize = getCacheSize();
  const now = Date.now();
  const lastCleanup = getLastCleanupTime();

  // Consider automatic cleanup in these cases:
  // 1. Cache is getting too large
  // 2. It's been a while since the last cleanup
  if (currentSize > CACHE_AUTO_CLEANUP_SIZE || 
      (now - lastCleanup > CACHE_CLEANUP_INTERVAL)) {
    cleanupCacheAsync();
  }
  
  // If we're at capacity, remove least recently used entries
  if (currentSize >= MAX_CACHE_SIZE) {
    pruneCache(MAX_CACHE_SIZE / 5); // Remove 20% of entries
  }
};
