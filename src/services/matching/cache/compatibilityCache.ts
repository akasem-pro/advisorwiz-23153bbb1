
/**
 * Enhanced compatibility score caching system with memory optimizations
 */
import { CACHE_EXPIRATION_MS } from '../constants/matchingWeights';

interface CacheEntry {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
  hitCount: number;
  lastAccessed: number;
}

// Use LRU-like approach with Map for better performance
const scoreCache = new Map<string, CacheEntry>();

// Performance metrics
let cacheHits = 0;
let cacheMisses = 0;
let lastCacheCleanup = Date.now();
const CACHE_CLEANUP_INTERVAL = 3600000; // 1 hour

// Maximum cache size to prevent memory leaks
const MAX_CACHE_SIZE = 5000;

/**
 * Check if a cached entry exists and is valid
 */
export const getCachedResult = (cacheKey: string) => {
  const cachedEntry = scoreCache.get(cacheKey);
  if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRATION_MS)) {
    // Update hit count and last accessed timestamp for this entry
    cachedEntry.hitCount += 1;
    cachedEntry.lastAccessed = Date.now();
    scoreCache.set(cacheKey, cachedEntry);
    
    // Update metrics
    cacheHits++;
    
    return cachedEntry.result;
  }
  
  // Update metrics
  cacheMisses++;
  
  // Consider automatic cleanup
  if (Date.now() - lastCacheCleanup > CACHE_CLEANUP_INTERVAL || scoreCache.size > MAX_CACHE_SIZE) {
    cleanupStaleEntries();
  }
  
  return null;
};

/**
 * Store a result in the cache with memory management
 */
export const cacheResult = (
  cacheKey: string,
  result: { score: number; matchExplanation: string[] }
) => {
  // If we're at capacity, clean up before adding new entries
  if (scoreCache.size >= MAX_CACHE_SIZE) {
    cleanupStaleEntries();
    
    // If still at capacity, remove least recently used entries
    if (scoreCache.size >= MAX_CACHE_SIZE) {
      pruneCache(100); // Remove 100 least accessed entries
    }
  }
  
  scoreCache.set(cacheKey, {
    result,
    timestamp: Date.now(),
    hitCount: 1,
    lastAccessed: Date.now()
  });
};

/**
 * Clear the entire compatibility cache
 */
export const clearCompatibilityCache = (): void => {
  scoreCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
};

/**
 * Clean up only stale entries
 */
export const cleanupStaleEntries = (): void => {
  const now = Date.now();
  let removedCount = 0;
  
  for (const [key, entry] of scoreCache.entries()) {
    if (now - entry.timestamp > CACHE_EXPIRATION_MS) {
      scoreCache.delete(key);
      removedCount++;
    }
  }
  
  console.log(`[Cache] Cleaned up ${removedCount} stale entries`);
  lastCacheCleanup = now;
};

/**
 * Prune the cache by removing the least frequently accessed entries
 */
export const pruneCache = (count: number): void => {
  // Convert to array and sort by lastAccessed (oldest first)
  const entries = Array.from(scoreCache.entries())
    .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
  
  // Remove the oldest entries up to count
  const entriesToRemove = entries.slice(0, count);
  
  entriesToRemove.forEach(([key]) => {
    scoreCache.delete(key);
  });
  
  console.log(`[Cache] Pruned ${entriesToRemove.length} least recently used entries`);
};

/**
 * Retain only high-value cache entries to reduce memory usage
 * @param maxEntries Maximum number of entries to keep
 */
export const retainTopHitEntries = (maxEntries: number = 1000): void => {
  if (scoreCache.size <= maxEntries) return;
  
  // Convert to array, sort by hit count, and keep only top entries
  const entries = Array.from(scoreCache.entries())
    .sort((a, b) => b[1].hitCount - a[1].hitCount)
    .slice(0, maxEntries);
  
  // Clear and rebuild cache with only top entries
  scoreCache.clear();
  entries.forEach(([key, value]) => {
    scoreCache.set(key, value);
  });
  
  console.log(`[Cache] Retained top ${entries.length} most accessed entries`);
};

/**
 * Merge statistics from another cache (useful for worker thread scenarios)
 */
export const mergeStats = (stats: { hits: number, misses: number }): void => {
  cacheHits += stats.hits;
  cacheMisses += stats.misses;
};

/**
 * Get statistics about the cache for debugging and monitoring
 */
export const getCompatibilityCacheStats = (): { 
  size: number, 
  hitRate: number, 
  oldestEntry: number | null,
  frequentlyAccessedCount: number,
  memoryUsageEstimate: string
} => {
  let oldestTimestamp: number | null = null;
  let frequentlyAccessedCount = 0;
  
  for (const entry of scoreCache.values()) {
    if (oldestTimestamp === null || entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp;
    }
    if (entry.hitCount > 10) {
      frequentlyAccessedCount++;
    }
  }
  
  const totalRequests = cacheHits + cacheMisses;
  const hitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;
  
  // Estimate memory usage (rough calculation)
  // Assuming each entry takes about 200 bytes on average
  const memoryUsageBytes = scoreCache.size * 200;
  const memoryUsageEstimate = memoryUsageBytes < 1024 * 1024
    ? `${(memoryUsageBytes / 1024).toFixed(2)} KB`
    : `${(memoryUsageBytes / (1024 * 1024)).toFixed(2)} MB`;
  
  return {
    size: scoreCache.size,
    hitRate,
    oldestEntry: oldestTimestamp ? Date.now() - oldestTimestamp : null,
    frequentlyAccessedCount,
    memoryUsageEstimate
  };
};
