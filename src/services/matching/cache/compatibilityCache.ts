
/**
 * Enhanced compatibility score caching system with memory optimizations
 * 
 * This module serves as a facade for the underlying cache implementation,
 * providing a simplified public API for other modules to use.
 */

// Re-export key functionality from internal modules
export { getCachedResult, cacheResult, createCacheKey } from './operations/cacheOperations';
export { 
  cleanupStaleEntries, 
  retainTopHitEntries, 
  pruneCache,
  cleanupCacheAsync,
  optimizeCache,
  CACHE_CLEANUP_INTERVAL,
  CACHE_AUTO_CLEANUP_SIZE,
  MAX_CACHE_SIZE
} from './maintenance/cacheMaintenance';

// Export statistics functionality
import { getCacheMetrics } from './core/cacheStore';
export const getCompatibilityCacheStats = getCacheMetrics;

// Re-export cache clearing functionality
import { clearCache } from './core/cacheStore';
export const clearCompatibilityCache = clearCache;

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
 * 
 * This function implements an adaptive cache maintenance strategy:
 * - Performs cleanup on size threshold or time interval
 * - Emergency pruning when cache size approaches capacity
 * - All maintenance operations run asynchronously to avoid blocking
 * 
 * Should be called by client code before cache operations
 * in high-traffic scenarios.
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

/**
 * Get cache health indicators as percentages
 * 
 * @returns Object with cache health metrics
 */
export const getCacheHealth = () => {
  const metrics = getCacheMetrics();
  
  return {
    utilizationPercent: (metrics.size / MAX_CACHE_SIZE) * 100,
    hitRatePercent: metrics.hitRate,
    timeElapsedPercent: Math.min(
      ((Date.now() - getLastCleanupTime()) / CACHE_CLEANUP_INTERVAL) * 100,
      100
    )
  };
};
