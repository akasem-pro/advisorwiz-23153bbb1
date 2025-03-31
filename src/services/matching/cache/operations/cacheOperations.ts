
/**
 * Cache operations for storing and retrieving compatibility scores
 */
import { CacheEntry, getCacheEntry, setCacheEntry, incrementCacheHits, incrementCacheMisses, isEntryExpired } from '../core/cacheStore';

/**
 * Check if a cached entry exists and is valid
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
 * Store a result in the cache
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
