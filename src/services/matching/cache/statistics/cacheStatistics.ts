
import { CacheStatistics } from '../../../../utils/accessibility/types';

/**
 * Generates statistics about the current state of the compatibility cache
 * 
 * @param cache The compatibility cache to analyze
 * @returns Statistics about the cache
 */
export function generateCacheStatistics(cache: Map<string, any>): CacheStatistics {
  const now = new Date();
  let hitCount = 0;
  let missCount = 0;
  let oldestDate: Date = now;
  let expiredCount = 0;
  let totalSize = 0;
  
  // Process cache entries to calculate statistics
  Array.from(cache.entries()).forEach(([_, entry]) => {
    // Track hit/miss ratio
    hitCount += entry.hits || 0;
    missCount += entry.misses || 0;
    
    // Calculate size (approximate)
    const entrySize = JSON.stringify(entry).length;
    totalSize += entrySize;
    
    // Track expired entries
    if (entry.expires && entry.expires < now) {
      expiredCount++;
    }
    
    // Track oldest entry
    if (entry.timestamp && entry.timestamp < oldestDate) {
      oldestDate = entry.timestamp;
    }
  });
  
  // Calculate hit rate
  const hitRate = hitCount + missCount > 0 
    ? (hitCount / (hitCount + missCount)) 
    : 0;
  
  return {
    totalEntries: cache.size,
    activeEntries: cache.size - expiredCount,
    size: totalSize,
    expiredEntries: expiredCount,
    oldestEntry: oldestDate,
    hitRate: hitRate
  };
}

/**
 * Prints cache statistics to console
 * 
 * @param statistics The cache statistics to print
 */
export function printCacheStatistics(statistics: CacheStatistics): void {
  console.group('Compatibility Cache Statistics');
  console.log(`Total entries: ${statistics.totalEntries}`);
  console.log(`Active entries: ${statistics.activeEntries}`);
  console.log(`Expired entries: ${statistics.expiredEntries}`);
  console.log(`Cache size (bytes): ${statistics.size}`);
  console.log(`Hit rate: ${(statistics.hitRate * 100).toFixed(2)}%`);
  console.log(`Oldest entry: ${statistics.oldestEntry.toISOString()}`);
  console.groupEnd();
}
