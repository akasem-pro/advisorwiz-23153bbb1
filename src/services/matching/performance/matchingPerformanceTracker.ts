import { trackFunctionPerformance } from '../../performance';
import { getCacheStats } from '../cache/compatibilityCache';

// Store performance data for matching operations
const matchingPerformanceData: {
  totalOperations: number;
  totalDuration: number;
  cacheHits: number;
  cacheMisses: number;
  lastBatchTime: number;
  operationTimes: number[];
} = {
  totalOperations: 0,
  totalDuration: 0,
  cacheHits: 0,
  cacheMisses: 0,
  lastBatchTime: Date.now(),
  operationTimes: []
};

// Maximum number of operation times to store
const MAX_OPERATION_TIMES = 100;

/**
 * Track a matching operation's performance
 * 
 * @param operationName Name of the matching operation
 * @param duration Duration in milliseconds
 * @param metadata Additional metadata
 * @param usedCache Whether the operation used cached results
 */
export const trackMatchingOperation = (
  operationName: string,
  duration: number,
  metadata?: Record<string, any>,
  usedCache = false
): void => {
  // Track in main performance service
  trackFunctionPerformance(operationName, duration, metadata);
  
  // Update internal tracking
  matchingPerformanceData.totalOperations++;
  matchingPerformanceData.totalDuration += duration;
  
  if (usedCache) {
    matchingPerformanceData.cacheHits++;
  } else {
    matchingPerformanceData.cacheMisses++;
  }
  
  // Store operation time (keep only the most recent MAX_OPERATION_TIMES)
  matchingPerformanceData.operationTimes.push(duration);
  if (matchingPerformanceData.operationTimes.length > MAX_OPERATION_TIMES) {
    matchingPerformanceData.operationTimes.shift();
  }
  
  // Periodically log performance stats in development
  const now = Date.now();
  if (now - matchingPerformanceData.lastBatchTime > 60000 && process.env.NODE_ENV === 'development') {
    logPerformanceStats();
    matchingPerformanceData.lastBatchTime = now;
  }
};

/**
 * Log performance statistics to console in development mode
 */
export const logPerformanceStats = (): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const cacheStats = getCacheStats();
  const totalOps = matchingPerformanceData.totalOperations;
  
  if (totalOps === 0) return;
  
  const avgDuration = matchingPerformanceData.totalDuration / totalOps;
  const recentAvgDuration = 
    matchingPerformanceData.operationTimes.reduce((sum, time) => sum + time, 0) / 
    matchingPerformanceData.operationTimes.length;
  
  const cacheHitRate = totalOps ? (matchingPerformanceData.cacheHits / totalOps) * 100 : 0;
  
  console.log(`
[Matching Performance Stats]
Total operations: ${totalOps}
Average duration: ${avgDuration.toFixed(2)}ms
Recent avg (last ${matchingPerformanceData.operationTimes.length}): ${recentAvgDuration.toFixed(2)}ms
Cache hit rate: ${cacheHitRate.toFixed(1)}%
Cache entries: ${cacheStats.activeEntries} active / ${cacheStats.totalEntries} total
  `);
};

/**
 * Reset performance tracking data
 */
export const resetPerformanceTracking = (): void => {
  matchingPerformanceData.totalOperations = 0;
  matchingPerformanceData.totalDuration = 0;
  matchingPerformanceData.cacheHits = 0;
  matchingPerformanceData.cacheMisses = 0;
  matchingPerformanceData.operationTimes = [];
};
