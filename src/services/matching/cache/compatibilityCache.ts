/**
 * Compatibility score caching system
 */
import { CACHE_EXPIRATION_MS } from '../constants/matchingWeights';

// In-memory cache for weighted compatibility scores
const scoreCache = new Map<string, {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
  hitCount: number;  // Track how frequently this entry is accessed
}>();

// Performance metrics
let cacheHits = 0;
let cacheMisses = 0;
let lastCacheCleanup = Date.now();
const CACHE_CLEANUP_INTERVAL = 3600000; // 1 hour

/**
 * Check if a cached entry exists and is valid
 */
export const getCachedResult = (cacheKey: string) => {
  const cachedEntry = scoreCache.get(cacheKey);
  if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRATION_MS)) {
    // Update hit count for this entry
    cachedEntry.hitCount += 1;
    scoreCache.set(cacheKey, cachedEntry);
    
    // Update metrics
    cacheHits++;
    
    return cachedEntry.result;
  }
  
  // Update metrics
  cacheMisses++;
  
  // Consider automatic cleanup
  if (Date.now() - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
    cleanupStaleEntries();
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
    timestamp: Date.now(),
    hitCount: 1
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
  
  lastCacheCleanup = now;
  
  return;
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
};

/**
 * Get statistics about the cache for debugging and monitoring
 */
export const getCompatibilityCacheStats = (): { 
  size: number, 
  hitRate: number, 
  oldestEntry: number | null,
  frequentlyAccessedCount: number 
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
  
  return {
    size: scoreCache.size,
    hitRate,
    oldestEntry: oldestTimestamp ? Date.now() - oldestTimestamp : null,
    frequentlyAccessedCount
  };
};
