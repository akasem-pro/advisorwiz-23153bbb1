
import { useState, useCallback, useEffect, useRef } from 'react';
import { AdvisorProfile, ConsumerProfile } from '../context/UserContext';
import { MatchPreferences } from '../context/UserContextDefinition';
import { memoize, createStableKey, MemoizedFunction } from '../utils/optimization/memoize';
import { 
  initMatchingWorker, 
  calculateCompatibilityAsync, 
  calculateBatchCompatibility,
  isWorkerSupported,
  terminateWorker
} from '../services/matching/workerService';
import { getWeightedCompatibilityScore } from '../services/matching/weightedScoring';
import { useMatchPersistence } from './useMatchPersistence';

/**
 * Hook providing optimized matching algorithm functionality
 */
export const useOptimizedMatching = (
  matchPreferences: MatchPreferences
) => {
  // Track if web worker is available and initialized
  const [workerAvailable, setWorkerAvailable] = useState(false);
  
  // Get database persistence functions
  const { 
    getStoredCompatibilityScore, 
    persistCompatibilityScore, 
    getTopMatches: fetchPersistentMatches 
  } = useMatchPersistence();
  
  // Reference to batch queue for performance optimization
  const batchQueue = useRef<Array<{
    advisorId: string;
    consumerId: string;
    resolve: (score: number) => void;
    reject: (error: Error) => void;
  }>>([]);
  
  // Batch processing timeout reference
  const batchTimeoutRef = useRef<number | null>(null);
  
  // Initialize worker on mount
  useEffect(() => {
    if (isWorkerSupported()) {
      const initialized = initMatchingWorker();
      setWorkerAvailable(initialized);
    }
    
    return () => {
      // Clean up worker on unmount
      terminateWorker();
      
      // Clear any pending batch
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
    };
  }, []);
  
  // Create a memoized version of the compatibility calculation function
  const calculateCompatibilityMemoized = useRef<MemoizedFunction<
    (advisorId: string, consumerId: string, prefs: MatchPreferences) => { score: number; matchExplanation: string[] }
  >>(
    memoize(
      (advisorId: string, consumerId: string, prefs: MatchPreferences) => {
        return getWeightedCompatibilityScore(advisorId, consumerId, prefs);
      },
      {
        maxSize: 500,
        ttl: 5 * 60 * 1000, // 5 minutes
        cacheKeyFn: (...args) => {
          const [advisorId, consumerId, prefs] = args;
          return `${advisorId}:${consumerId}:${createStableKey(prefs)}`;
        }
      }
    )
  ).current;
  
  /**
   * Process batch queue of compatibility calculations
   */
  const processBatchQueue = useCallback(async () => {
    if (batchQueue.current.length === 0) return;
    
    const currentBatch = [...batchQueue.current];
    batchQueue.current = [];
    
    try {
      if (workerAvailable) {
        // Use worker for batch processing
        const pairs = currentBatch.map(({ advisorId, consumerId }) => ({ 
          advisorId, consumerId 
        }));
        
        const results = await calculateBatchCompatibility(pairs, matchPreferences);
        
        // Resolve all promises with their results
        results.forEach((result, index) => {
          const request = currentBatch[index];
          request.resolve(result.score);
        });
      } else {
        // Process serially if worker not available
        currentBatch.forEach(({ advisorId, consumerId, resolve, reject }) => {
          try {
            const result = calculateCompatibilityMemoized(
              advisorId,
              consumerId,
              matchPreferences
            );
            resolve(result.score);
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        });
      }
    } catch (error) {
      // Reject all promises in the batch
      currentBatch.forEach(({ reject }) => {
        reject(error instanceof Error ? error : new Error(String(error)));
      });
    }
  }, [workerAvailable, matchPreferences, calculateCompatibilityMemoized]);
  
  /**
   * Queue a compatibility calculation for batch processing
   */
  const queueCompatibilityCalculation = useCallback(
    (advisorId: string, consumerId: string): Promise<number> => {
      return new Promise((resolve, reject) => {
        // Add to the batch queue
        batchQueue.current.push({
          advisorId,
          consumerId,
          resolve,
          reject
        });
        
        // Set timeout to process the batch
        if (batchTimeoutRef.current === null) {
          batchTimeoutRef.current = window.setTimeout(() => {
            batchTimeoutRef.current = null;
            processBatchQueue();
          }, 10); // Short delay to batch nearby requests
        }
      });
    },
    [processBatchQueue]
  );
  
  /**
   * Calculate compatibility score with optimizations
   */
  const calculateCompatibilityScore = useCallback(
    async (advisorId: string, consumerId: string): Promise<number> => {
      try {
        // First, try to get from database cache
        const storedScore = await getStoredCompatibilityScore(advisorId, consumerId);
        if (storedScore) {
          return storedScore.score;
        }
        
        // If not in database, try memoized cache
        const cachedResult = calculateCompatibilityMemoized(
          advisorId, 
          consumerId, 
          matchPreferences
        );
        
        // Store the result in the database for future use
        persistCompatibilityScore(
          advisorId, 
          consumerId, 
          cachedResult.score, 
          cachedResult.matchExplanation
        ).catch(err => {
          console.error('Failed to persist compatibility score:', err);
        });
        
        return cachedResult.score;
      } catch (error) {
        // If memoization fails or cache miss, use async calculation
        if (workerAvailable) {
          // Use web worker if available
          const result = await calculateCompatibilityAsync(
            advisorId,
            consumerId,
            matchPreferences
          );
          
          // Store the result in the database for future use
          persistCompatibilityScore(
            advisorId, 
            consumerId, 
            result.score, 
            result.matchExplanation
          ).catch(err => {
            console.error('Failed to persist compatibility score:', err);
          });
          
          return result.score;
        } else {
          // Queue for batch processing as fallback
          return queueCompatibilityCalculation(advisorId, consumerId);
        }
      }
    },
    [
      matchPreferences, 
      workerAvailable, 
      calculateCompatibilityMemoized, 
      queueCompatibilityCalculation,
      getStoredCompatibilityScore,
      persistCompatibilityScore
    ]
  );
  
  /**
   * Get compatibility explanations
   */
  const getCompatibilityExplanations = useCallback(
    (advisorId: string, consumerId: string): Promise<string[]> => {
      // Always get the full explanation
      if (workerAvailable) {
        return calculateCompatibilityAsync(advisorId, consumerId, matchPreferences)
          .then(result => result.matchExplanation);
      }
      
      // Fallback to synchronous calculation
      const result = calculateCompatibilityMemoized(
        advisorId,
        consumerId,
        matchPreferences
      );
      return Promise.resolve(result.matchExplanation);
    },
    [matchPreferences, workerAvailable, calculateCompatibilityMemoized]
  );
  
  /**
   * Get top matches with optimized batch processing and database integration
   */
  const getTopMatches = useCallback(
    async (
      userType: 'consumer' | 'advisor',
      profiles: Array<AdvisorProfile | ConsumerProfile>,
      selfId: string,
      limit: number = 10
    ): Promise<Array<{ profile: AdvisorProfile | ConsumerProfile; score: number }>> => {
      // First try to get top matches from database
      try {
        const dbMatches = await fetchPersistentMatches(limit);
        
        if (dbMatches.length > 0) {
          // Map the database matches to profiles
          const matchedProfiles = dbMatches
            .map(match => {
              const profile = profiles.find(p => p.id === match.id);
              return profile ? { profile, score: match.score } : null;
            })
            .filter(Boolean) as Array<{ profile: AdvisorProfile | ConsumerProfile; score: number }>;
            
          if (matchedProfiles.length > 0) {
            return matchedProfiles;
          }
        }
      } catch (err) {
        console.error('Error fetching matches from database, falling back to local calculation:', err);
      }
      
      // Fall back to local calculation if database retrieval fails
      const calculationPromises = profiles.map(async (profile) => {
        const targetId = profile.id;
        const advisorId = userType === 'consumer' ? targetId : selfId;
        const consumerId = userType === 'consumer' ? selfId : targetId;
        
        const score = await calculateCompatibilityScore(advisorId, consumerId);
        
        return {
          profile,
          score
        };
      });
      
      // Wait for all calculations to complete
      const results = await Promise.all(calculationPromises);
      
      // Sort by score (descending) and take only the limit
      return results
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    },
    [calculateCompatibilityScore, fetchPersistentMatches]
  );
  
  /**
   * Clear the compatibility calculation cache
   */
  const clearCache = useCallback(() => {
    calculateCompatibilityMemoized.clearCache();
  }, [calculateCompatibilityMemoized]);
  
  /**
   * Get cache statistics
   */
  const getCacheStats = useCallback(() => {
    return calculateCompatibilityMemoized.getStats();
  }, [calculateCompatibilityMemoized]);
  
  return {
    calculateCompatibilityScore,
    getCompatibilityExplanations,
    getTopMatches,
    clearCache,
    getCacheStats,
    isWorkerSupported: workerAvailable
  };
};

export default useOptimizedMatching;
