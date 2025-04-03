import { useCallback, useMemo, useEffect, useState } from 'react';
import { 
  clearCompatibilityCache,
  getCompatibilityCacheStats
} from '../services/matching';
import { 
  cleanupStaleEntries, 
  retainTopHitEntries 
} from '../services/matching/cache/compatibilityCache';
import { clearMatchCache, invalidateMatchCache } from '../utils/matchingAlgorithm';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';

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
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
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
  
  // Check if we have connectivity to Supabase
  const checkSupabaseConnectivity = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      return !error;
    } catch (err) {
      console.error('Error checking Supabase connectivity:', err);
      return false;
    }
  }, []);

  // Sync cache with Supabase if required
  const syncCacheWithSupabase = useCallback(async () => {
    const hasConnectivity = await checkSupabaseConnectivity();
    
    if (!hasConnectivity) {
      console.log('No Supabase connectivity, skipping cache sync');
      return;
    }
    
    try {
      console.log('Syncing match cache with Supabase...');
      // Here we would implement logic to sync local cache with Supabase
      // This is a placeholder for actual implementation
      
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error syncing cache with Supabase:', error);
    }
  }, [checkSupabaseConnectivity]);
  
  // Periodically optimize cache to maintain performance
  useEffect(() => {
    const cacheCleanupInterval = setInterval(() => {
      // Only run cleanup if cache is getting large
      if (cacheStats.size > 500) {
        cleanupStaleEntries();
      }
    }, 60 * 60 * 1000); // Run hourly
    
    // Periodically sync with Supabase when online
    const cacheSyncInterval = setInterval(() => {
      if (navigator.onLine) {
        syncCacheWithSupabase();
      }
    }, 30 * 60 * 1000); // Sync every 30 minutes
    
    return () => {
      clearInterval(cacheCleanupInterval);
      clearInterval(cacheSyncInterval);
    };
  }, [cacheStats.size, syncCacheWithSupabase]);
  
  return {
    clearAllCaches,
    invalidateUserCache,
    optimizeCache,
    cacheStats,
    lastSyncTime
  };
};

export default useMatchingCache;
