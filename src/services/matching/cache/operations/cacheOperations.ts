
/**
 * Cache operations for storing and retrieving compatibility scores
 * 
 * This module provides the business logic for interacting with the cache,
 * including hit/miss tracking, timestamp management, and entry updates.
 */
import { 
  CacheEntry, 
  getCacheEntry, 
  setCacheEntry, 
  incrementCacheHits, 
  incrementCacheMisses, 
  isEntryExpired 
} from '../core/cacheStore';

/**
 * Check if a cached entry exists and is valid, then retrieve it
 * 
 * This function handles all cache checking logic:
 * - Checks if the entry exists in cache
 * - Verifies that it hasn't expired
 * - Updates hit counts and access timestamps
 * - Maintains cache metrics
 * 
 * @param cacheKey - Unique identifier for the cache entry
 * @returns The cached result if valid, null otherwise
 */
export const getCachedResult = (cacheKey: string) => {
  const cachedEntry = getCacheEntry(cacheKey);
  
  if (cachedEntry && !isEntryExpired(cachedEntry)) {
    // Update hit count and last accessed timestamp for this entry
    cachedEntry.hitCount += 1;
    cachedEntry.lastAccessed = Date.now();
    
    // Update the cache with the updated entry
    setCacheEntry(cacheKey, cachedEntry);
    
    // Update metrics
    incrementCacheHits();
    
    return cachedEntry.result;
  }
  
  // Update metrics
  incrementCacheMisses();
  
  return null;
};

/**
 * Store a result in the cache with appropriate metadata
 * 
 * This function handles proper caching of new results:
 * - Creates a new cache entry with the current timestamp
 * - Initializes hit count and access time
 * - Stores the entry in the cache
 * 
 * @param cacheKey - Unique identifier for the cache entry
 * @param result - The compatibility score and explanations to cache
 */
export const cacheResult = (
  cacheKey: string,
  result: { score: number; matchExplanation: string[] }
) => {
  const newEntry: CacheEntry = {
    result,
    timestamp: Date.now(),
    hitCount: 1,
    lastAccessed: Date.now()
  };
  
  setCacheEntry(cacheKey, newEntry);
};

/**
 * Create a standardized cache key from advisor and consumer IDs
 * 
 * This ensures consistent key formatting throughout the application
 * to avoid duplicate entries and improve cache hit rates.
 * 
 * @param advisorId - Unique identifier for the advisor
 * @param consumerId - Unique identifier for the consumer 
 * @param additionalData - Optional extra data to include in the key
 * @returns Formatted cache key
 */
export const createCacheKey = (
  advisorId: string, 
  consumerId: string,
  additionalData?: Record<string, any>
): string => {
  let key = `${advisorId}:${consumerId}`;
  
  if (additionalData) {
    key += `:${JSON.stringify(additionalData)}`;
  }
  
  return key;
};

/**
 * Check if a cache key matches a particular pattern
 * 
 * Useful for selectively invalidating cache entries based on
 * partial key matches, like all entries for a particular advisor.
 * 
 * @param cacheKey - The cache key to check
 * @param pattern - The pattern to match against
 * @returns True if the key matches the pattern
 */
export const keyMatchesPattern = (cacheKey: string, pattern: string): boolean => {
  return cacheKey.includes(pattern);
};
