/**
 * Cache maintenance operations
 * 
 * This module handles cleaning up stale entries and optimizing cache size.
 * It implements multiple strategies for cache eviction:
 * - Time-based expiration for stale entries
 * - Size-based removal for memory management
 * - Hit-count prioritization for value retention
 */
import { 
  getAllEntries, 
  deleteCacheEntry, 
  getCacheSize, 
  clearCache, 
  updateLastCleanupTime,
  isEntryExpired
} from '../core/cacheStore';

import { CACHE_CONFIG } from '../../config/cacheConfig';

// Export configuration constants for external use
export const CACHE_CLEANUP_INTERVAL = CACHE_CONFIG.CLEANUP_INTERVAL_MS;
export const CACHE_AUTO_CLEANUP_SIZE = CACHE_CONFIG.AUTO_CLEANUP_SIZE;
export const MAX_CACHE_SIZE = CACHE_CONFIG.MAX_SIZE;

/**
 * Clean up only stale entries based on their timestamp
 * 
 * This function removes cache entries that have exceeded their TTL,
 * preventing stale data from being served to users.
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
 * 
 * This function schedules cleanup on the next event loop tick,
 * ensuring the UI remains responsive during cache maintenance.
 */
export const cleanupCacheAsync = () => {
  // Use setTimeout to move this work off the main thread
  setTimeout(() => {
    cleanupStaleEntries();
  }, 0);
};

/**
 * Prune the cache by removing the least frequently accessed entries
 * 
 * This function removes a specified number of least recently used entries
 * from the cache, helping to manage memory usage while preserving
 * the most valuable cached data.
 * 
 * @param count - Number of entries to remove
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
 * 
 * This function keeps only the most frequently accessed entries in the cache,
 * maximizing the value of the limited cache space by prioritizing
 * entries with the highest hit counts.
 * 
 * @param maxEntries - Maximum number of entries to keep
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

/**
 * Advanced cache optimization strategy 
 * 
 * This function combines multiple strategies to optimize the cache:
 * 1. First removes expired entries
 * 2. If still over capacity, uses LRU to remove older entries
 * 3. If still over capacity, keeps only entries with highest hit counts
 * 
 * @param targetSize - Target size to reduce the cache to
 */
export const optimizeCache = (targetSize: number = CACHE_CONFIG.MAX_SIZE * CACHE_CONFIG.PRUNE_KEEP_RATIO): void => {
  // Step 1: Clear expired entries
  cleanupStaleEntries();
  
  // Step 2: If still too many entries, prune by last accessed time
  if (getCacheSize() > targetSize) {
    const countToRemove = getCacheSize() - targetSize;
    pruneCache(countToRemove);
  }
  
  // Step 3: If still too many entries (unlikely), keep only entries with highest hit count
  if (getCacheSize() > targetSize) {
    retainTopHitEntries(targetSize);
  }
  
  console.log(`[Cache] Optimized to target size of ${targetSize}, current size: ${getCacheSize()}`);
};
