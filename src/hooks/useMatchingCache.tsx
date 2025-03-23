
import { useCallback, useMemo } from 'react';
import { clearCompatibilityCache, getCompatibilityCacheStats } from '../services/matching/weightedScoring';
import { clearMatchCache, invalidateMatchCache } from '../utils/matchingAlgorithm';
import { toast } from 'sonner';

/**
 * Hook for monitoring and managing the matching algorithm cache
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
  
  // Get cache statistics for monitoring
  const cacheStats = useMemo(() => {
    try {
      return getCompatibilityCacheStats();
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { size: 0, oldestEntry: null };
    }
  }, []);
  
  return {
    clearAllCaches,
    invalidateUserCache,
    cacheStats
  };
};
