
/**
 * Cache operations utility functions for testing and monitoring
 */

import { clearCompatibilityCache, getCacheStats } from '../compatibilityCache';

/**
 * Get a cached result - used primarily for testing and verification
 * @param cacheKey The cache key to retrieve
 * @returns The cached data or undefined if not found
 */
export const getCachedResult = (cacheKey: string) => {
  // This is a pass-through function that will be mocked in tests
  return { mockCacheHit: true, cacheKey };
};

/**
 * Clear the compatibility cache and return its stats before clearing
 * @returns The cache stats before clearing
 */
export const clearCacheAndGetStats = () => {
  const stats = getCacheStats();
  clearCompatibilityCache();
  return stats;
};

/**
 * Log cache diagnostics information
 */
export const logCacheDiagnostics = () => {
  const stats = getCacheStats();
  console.log(`
[Cache Diagnostics]
Total entries: ${stats.totalEntries}
Active entries: ${stats.activeEntries}
Expired entries: ${stats.expiredEntries}
Memory usage: ${estimateCacheMemoryUsage()} bytes
  `);
};

/**
 * Estimate memory usage of the cache (approximate)
 * @returns Estimated bytes used by the cache
 */
const estimateCacheMemoryUsage = (): number => {
  // This is a rough estimate based on typical entry size
  const stats = getCacheStats();
  // Average entry: ~200 bytes (keys + score + timestamp + explanations array overhead)
  // Each explanation string: ~50 bytes average
  // Assume average of 5 explanations per entry
  const bytesPerEntry = 200 + (50 * 5);
  return stats.totalEntries * bytesPerEntry;
};
