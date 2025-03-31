
/**
 * Cache maintenance operations
 * Handles cleaning up stale entries and optimizing cache size
 */
import { 
  getAllEntries, 
  deleteCacheEntry, 
  getCacheSize, 
  clearCache, 
  updateLastCleanupTime,
  isEntryExpired
} from '../core/cacheStore';

// Constants for maintenance operations
export const CACHE_CLEANUP_INTERVAL = 3600000; // 1 hour
export const CACHE_AUTO_CLEANUP_SIZE = 3000; // When cache reaches this size, auto cleanup
export const MAX_CACHE_SIZE = 5000; // Maximum cache size to prevent memory leaks

/**
 * Clean up only stale entries
 */
export const cleanupStaleEntries = (): void => {
  const now = Date.now();
  let removedCount = 0;
  
  // Get all entries and filter stale ones
  const entries = getAllEntries();
  const staleEntries = entries.filter(([_, entry]) => isEntryExpired(entry));
  
  staleEntries.forEach(([key]) => {
    deleteCacheEntry(key);
    removedCount++;
  });
  
  console.log(`[Cache] Cleaned up ${removedCount} stale entries`);
  updateLastCleanupTime();
};

/**
 * Clean up cache asynchronously to not block the main thread
 */
export const cleanupCacheAsync = () => {
  // Use setTimeout to move this work off the main thread
  setTimeout(() => {
    cleanupStaleEntries();
  }, 0);
};

/**
 * Prune the cache by removing the least frequently accessed entries
 */
export const pruneCache = (count: number): void => {
  // Convert to array and sort by lastAccessed (oldest first)
  const entries = getAllEntries()
    .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
  
  // Remove the oldest entries up to count
  const entriesToRemove = entries.slice(0, Math.min(count, entries.length));
  
  entriesToRemove.forEach(([key]) => {
    deleteCacheEntry(key);
  });
  
  console.log(`[Cache] Pruned ${entriesToRemove.length} least recently used entries`);
};

/**
 * Retain only high-value cache entries to reduce memory usage
 * @param maxEntries Maximum number of entries to keep
 */
export const retainTopHitEntries = (maxEntries: number = 1000): void => {
  if (getCacheSize() <= maxEntries) return;
  
  // Convert to array and sort by hit count
  const entries = getAllEntries()
    .sort((a, b) => b[1].hitCount - a[1].hitCount);
  
  // Take only the top entries
  const topEntries = entries.slice(0, maxEntries);
  
  // Clear and rebuild cache with only top entries
  clearCache();
  topEntries.forEach(([key, value]) => {
    deleteCacheEntry(key);
  });
  
  console.log(`[Cache] Retained top ${topEntries.length} most accessed entries`);
};
