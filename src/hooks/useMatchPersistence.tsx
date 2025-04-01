
import { useState, useCallback, useRef, useEffect } from 'react';
import { useSupabase } from './useSupabase';
import { useUser } from '../context/UserContext';
import { 
  storeCompatibilityScore, 
  getCompatibilityScore, 
  getTopMatches as fetchTopMatches 
} from '../services/matching/supabaseIntegration';
import { toast } from 'sonner';

// Cache configuration
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_ITEMS = 100;

/**
 * Hook for persisting match data to the database
 */
export const useMatchPersistence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userType, consumerProfile, advisorProfile } = useUser();
  const { isOnline } = useSupabase();
  
  // Local in-memory cache
  const scoreCache = useRef<Map<string, {
    data: { score: number; explanations: string[] },
    timestamp: number
  }>>(new Map());
  
  // Clean up stale cache entries periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      let evictedCount = 0;
      
      // Time-based eviction
      scoreCache.current.forEach((entry, key) => {
        if (now - entry.timestamp > CACHE_TTL) {
          scoreCache.current.delete(key);
          evictedCount++;
        }
      });
      
      // Size-based eviction if too many items
      if (scoreCache.current.size > MAX_CACHE_ITEMS) {
        // Convert to array to sort by timestamp
        const entries = Array.from(scoreCache.current.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp);
        
        // Remove oldest entries to bring size down to 75% of max
        const itemsToRemove = scoreCache.current.size - Math.floor(MAX_CACHE_ITEMS * 0.75);
        entries.slice(0, itemsToRemove).forEach(([key]) => {
          scoreCache.current.delete(key);
          evictedCount++;
        });
      }
      
      if (evictedCount > 0) {
        console.log(`Cache maintenance: evicted ${evictedCount} stale or excess entries`);
      }
    }, 5 * 60 * 1000); // Run every 5 minutes
    
    return () => clearInterval(cleanupInterval);
  }, []);

  // Store a compatibility score in the database
  const persistCompatibilityScore = useCallback(async (
    advisorId: string,
    consumerId: string,
    score: number,
    explanations: string[]
  ): Promise<boolean> => {
    if (!isOnline) {
      console.log('Offline - skipping persistence of compatibility score');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await storeCompatibilityScore(advisorId, consumerId, score, explanations);
      
      if (success) {
        // Update local cache with fresh data
        const cacheKey = `${advisorId}:${consumerId}`;
        scoreCache.current.set(cacheKey, {
          data: { score, explanations },
          timestamp: Date.now()
        });
      } else {
        setError('Failed to store compatibility score');
        return false;
      }
      
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error storing compatibility score';
      setError(message);
      console.error('Error persisting compatibility score:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);
  
  // Get a compatibility score from the database
  const getStoredCompatibilityScore = useCallback(async (
    advisorId: string,
    consumerId: string
  ): Promise<{ score: number; explanations: string[] } | null> => {
    const cacheKey = `${advisorId}:${consumerId}`;
    
    // Check local cache first
    const cachedEntry = scoreCache.current.get(cacheKey);
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_TTL)) {
      console.log('Cache hit: Returning cached compatibility score');
      return cachedEntry.data;
    }
    
    if (!isOnline) {
      console.log('Offline - skipping retrieval of compatibility score');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getCompatibilityScore(advisorId, consumerId);
      
      if (result) {
        // Update cache with fresh data from database
        scoreCache.current.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error retrieving compatibility score';
      setError(message);
      console.error('Error retrieving compatibility score:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);
  
  // Get top matches from the database
  const getTopMatches = useCallback(async (
    limit: number = 10
  ): Promise<{ id: string; score: number; explanations: string[] }[]> => {
    if (!userType || (!consumerProfile && !advisorProfile)) {
      return [];
    }
    
    if (!isOnline) {
      toast.error('Cannot fetch top matches while offline');
      return [];
    }
    
    const userId = userType === 'consumer' ? consumerProfile?.id : advisorProfile?.id;
    if (!userId) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await fetchTopMatches(userType as 'consumer' | 'advisor', userId, limit);
      
      // Update cache with results
      results.forEach(match => {
        const targetId = match.id;
        const advisorId = userType === 'consumer' ? targetId : userId;
        const consumerId = userType === 'consumer' ? userId : targetId;
        const cacheKey = `${advisorId}:${consumerId}`;
        
        scoreCache.current.set(cacheKey, {
          data: { 
            score: match.score, 
            explanations: match.explanations 
          },
          timestamp: Date.now()
        });
      });
      
      return results;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error fetching top matches';
      setError(message);
      console.error('Error fetching top matches:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [userType, consumerProfile, advisorProfile, isOnline]);

  // Force invalidate cache entries by pattern
  const invalidateCache = useCallback((pattern?: string) => {
    if (!pattern) {
      // Clear entire cache
      scoreCache.current.clear();
      console.log('Cleared entire compatibility score cache');
      return;
    }
    
    // Pattern-based invalidation (like by advisor ID)
    let count = 0;
    scoreCache.current.forEach((_, key) => {
      if (key.includes(pattern)) {
        scoreCache.current.delete(key);
        count++;
      }
    });
    
    console.log(`Invalidated ${count} cache entries matching pattern: ${pattern}`);
  }, []);

  return {
    persistCompatibilityScore,
    getStoredCompatibilityScore,
    getTopMatches,
    invalidateCache,
    isLoading,
    error
  };
};

export default useMatchPersistence;
