
import { useState, useCallback } from 'react';
import { useSupabase } from './useSupabase';
import { useUser } from '../context/UserContext';
import { 
  storeCompatibilityScore, 
  getCompatibilityScore, 
  getTopMatches as fetchTopMatches 
} from '../services/matching/supabaseIntegration';
import { MatchPreferences } from '../context/UserContextDefinition';
import { toast } from 'sonner';

/**
 * Hook for persisting match data to the database
 */
export const useMatchPersistence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userType, consumerProfile, advisorProfile } = useUser();
  const { isOnline } = useSupabase();

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
      
      if (!success) {
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
    if (!isOnline) {
      console.log('Offline - skipping retrieval of compatibility score');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getCompatibilityScore(advisorId, consumerId);
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
      return await fetchTopMatches(userType as 'consumer' | 'advisor', userId, limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error fetching top matches';
      setError(message);
      console.error('Error fetching top matches:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [userType, consumerProfile, advisorProfile, isOnline]);

  return {
    persistCompatibilityScore,
    getStoredCompatibilityScore,
    getTopMatches,
    isLoading,
    error
  };
};

export default useMatchPersistence;
