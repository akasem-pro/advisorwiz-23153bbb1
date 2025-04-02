
/**
 * Core cache storage implementation
 * Provides the fundamental caching mechanism with LRU-like behavior
 * 
 * This module is the foundation of the caching system, providing:
 * - Primary data structures for storing cached results
 * - Basic CRUD operations for cache entries
 * - Performance metrics tracking
 * - Memory management primitives
 */

import { CACHE_CONFIG } from '../../config/cacheConfig';

/**
 * Core cache entry type definition
 * @property result - The cached compatibility score and explanations
 * @property timestamp - When the entry was created (for expiration)
 * @property hitCount - How many times this entry has been accessed
 * @property lastAccessed - When the entry was last retrieved
 */
export interface CacheEntry {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
  hitCount: number;
  lastAccessed: number;
}

// Use Map for better performance with LRU-like approach
const scoreCache = new Map<string, CacheEntry>();

// Performance metrics
let cacheHits = 0;
let cacheMisses = 0;
let lastCacheCleanup = Date.now();

/**
 * Retrieve a cache entry by key
 * @param key - Cache entry identifier
 * @returns The cached entry or undefined if not found
 */
export const getCacheEntry = (key: string): CacheEntry | undefined => {
  return scoreCache.get(key);
};

/**
 * Store or update a cache entry
 * @param key - Cache entry identifier
 * @param entry - The cache entry data
 */
export const setCacheEntry = (key: string, entry: CacheEntry): void => {
  scoreCache.set(key, entry);
};

/**
 * Remove a specific entry from the cache
 * @param key - Cache entry identifier
 * @returns True if the entry was found and removed, false otherwise
 */
export const deleteCacheEntry = (key: string): boolean => {
  return scoreCache.delete(key);
};

/**
 * Clear all entries from the cache and reset metrics
 */
export const clearCache = (): void => {
  scoreCache.clear();
  cacheHits = 0;
  cacheMisses = 0;
};

/**
 * Get the current number of entries in the cache
 * @returns Number of cached entries
 */
export const getCacheSize = (): number => {
  return scoreCache.size;
};

/**
 * Get all entries in the cache as array of [key, entry] pairs
 * @returns Array of cache entries with their keys
 */
export const getAllEntries = (): [string, CacheEntry][] => {
  return Array.from(scoreCache.entries());
};

/**
 * Increment the cache hit counter
 */
export const incrementCacheHits = (): void => {
  cacheHits++;
};

/**
 * Increment the cache miss counter
 */
export const incrementCacheMisses = (): void => {
  cacheMisses++;
};

/**
 * Get the current number of cache hits
 * @returns Number of cache hits
 */
export const getCacheHits = (): number => {
  return cacheHits;
};

/**
 * Get the current number of cache misses
 * @returns Number of cache misses
 */
export const getCacheMisses = (): number => {
  return cacheMisses;
};

/**
 * Update the timestamp of the last cache cleanup
 */
export const updateLastCleanupTime = (): void => {
  lastCacheCleanup = Date.now();
};

/**
 * Get the timestamp of the last cache cleanup
 * @returns Timestamp of the last cleanup
 */
export const getLastCleanupTime = (): number => {
  return lastCacheCleanup;
};

/**
 * Check if a cache entry has expired
 * @param entry - The cache entry to check
 * @returns True if the entry has expired, false otherwise
 */
export const isEntryExpired = (entry: CacheEntry): boolean => {
  return Date.now() - entry.timestamp > CACHE_CONFIG.EXPIRATION_MS;
};

/**
 * Calculate the hit rate of the cache
 * @returns Percentage of cache hits (0-100)
 */
export const getCacheHitRate = (): number => {
  const total = cacheHits + cacheMisses;
  if (total === 0) return 100; // No requests yet
  return (cacheHits / total) * 100;
};

/**
 * Get cache performance metrics
 * @returns Object with cache metrics
 */
export const getCacheMetrics = () => {
  return {
    size: scoreCache.size,
    hits: cacheHits,
    misses: cacheMisses,
    hitRate: getCacheHitRate(),
    lastCleanup: new Date(lastCacheCleanup).toISOString(),
  };
};
