
import { useCallback, useMemo, useEffect } from 'react';
import { 
  clearCompatibilityCache, 
  getCompatibilityCacheStats, 
  cleanupStaleEntries,
  retainTopHitEntries
} from '../services/matching/cache/compatibilityCache';
import { clearMatchCache, invalidateMatchCache } from '../utils/matchingAlgorithm';
import { toast } from 'sonner';

/**
 * Hook for monitoring and managing the matching algorithm cache
 * 
 * This hook provides utilities for:
 * - Clearing caches to free memory
 * - Invalidating specific user entries when data changes
 * - Optimizing cache performance automatically
 * - Monitoring cache statistics
 * 
 * @returns An object with cache management functions and statistics
 */
export const useMatchingCache = () => {
  // Clear all caches (both scoring and match caches)
  const clearAllCaches = useCallback(() => {
    clearCompatibilityCache();
    clearMatchCache();
    toast.success('Match caches cleared successfully');
  }, []);
  
  // Invalidate cache for a specific user
  const invalidateUserCache = useCallback((userId: string) => {
    if (!userId) {
      toast.error('Invalid user ID provided');
      return false;
    }
    
    // Only invalidate match cache for now
    invalidateMatchCache(userId);
    toast.success(`Cache invalidated for user ${userId}`);
    return true;
  }, []);
  
  // Optimize cache by removing stale entries and retaining only valuable ones
  const optimizeCache = useCallback(() => {
    cleanupStaleEntries();
    retainTopHitEntries(1000); // Keep top 1000 most accessed entries
    toast.success('Cache optimized successfully');
  }, []);
  
  // Get cache statistics for monitoring
  const cacheStats = useMemo(() => {
    try {
      return getCompatibilityCacheStats();
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { 
        size: 0, 
        hitRate: 0, 
        oldestEntry: null,
        frequentlyAccessedCount: 0 
      };
    }
  }, []);
  
  // Periodically optimize cache to maintain performance
  useEffect(() => {
    const cacheCleanupInterval = setInterval(() => {
      // Only run cleanup if cache is getting large
      if (cacheStats.size > 500) {
        cleanupStaleEntries();
      }
    }, 60 * 60 * 1000); // Run hourly
    
    return () => clearInterval(cacheCleanupInterval);
  }, [cacheStats.size]);
  
  return {
    clearAllCaches,
    invalidateUserCache,
    optimizeCache,
    cacheStats
  };
};

export default useMatchingCache;
