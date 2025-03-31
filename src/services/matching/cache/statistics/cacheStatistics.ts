
/**
 * Cache statistics module
 * Provides analytics and monitoring for cache performance
 */
import { 
  getAllEntries, 
  getCacheSize, 
  getCacheHits, 
  getCacheMisses, 
} from '../core/cacheStore';

/**
 * Get statistics about the cache for debugging and monitoring
 */
export const getCompatibilityCacheStats = (): { 
  size: number, 
  hitRate: number, 
  oldestEntry: number | null,
  frequentlyAccessedCount: number,
  memoryUsageEstimate: string,
  efficiency: number
} => {
  let oldestTimestamp: number | null = null;
  let frequentlyAccessedCount = 0;
  let totalHitCount = 0;
  
  for (const [_, entry] of getAllEntries()) {
    if (oldestTimestamp === null || entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp;
    }
    if (entry.hitCount > 10) {
      frequentlyAccessedCount++;
    }
    totalHitCount += entry.hitCount;
  }
  
  const cacheHits = getCacheHits();
  const cacheMisses = getCacheMisses();
  const totalRequests = cacheHits + cacheMisses;
  const hitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;
  
  // Calculate efficiency (hits per cache entry) - higher is better
  const currentSize = getCacheSize();
  const efficiency = currentSize > 0 ? totalHitCount / currentSize : 0;
  
  // Estimate memory usage (rough calculation)
  // Assuming each entry takes about 200 bytes on average
  const memoryUsageBytes = currentSize * 200;
  const memoryUsageEstimate = memoryUsageBytes < 1024 * 1024
    ? `${(memoryUsageBytes / 1024).toFixed(2)} KB`
    : `${(memoryUsageBytes / (1024 * 1024)).toFixed(2)} MB`;
  
  return {
    size: currentSize,
    hitRate,
    oldestEntry: oldestTimestamp ? Date.now() - oldestTimestamp : null,
    frequentlyAccessedCount,
    memoryUsageEstimate,
    efficiency
  };
};
