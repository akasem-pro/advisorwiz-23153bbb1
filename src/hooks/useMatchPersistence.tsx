
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { AdvisorProfile, ConsumerProfile } from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import { supabase } from '../integrations/supabase/client';
import { 
  getStoredCompatibilityScore, 
  storeCompatibilityScore, 
  calculateAndStoreCompatibilityScores,
  getTopMatchesFromDatabase
} from '../services/matching/supabaseMatching';
import { calculateMatchScore, getMatchExplanations } from '../utils/matchingAlgorithm';

/**
 * Hook for persisting match data to Supabase
 */
export const useMatchPersistence = () => {
  const { userType, advisorProfile, consumerProfile } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the current user's ID
  const getCurrentUserId = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
  }, []);
  
  // Calculate and store match score
  const calculateAndStoreMatch = useCallback(async (
    advisorId: string,
    consumerId: string
  ) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // First check if we already have this score cached
      const existingScore = await getStoredCompatibilityScore(advisorId, consumerId);
      
      if (existingScore) {
        return existingScore;
      }
      
      // Get profiles if needed
      let advisorProfile, consumerProfile;
      
      if (!advisorProfile) {
        // Fetch advisor profile from database
        const { data: advisorData, error: advisorError } = await supabase
          .from('advisor_profiles')
          .select('*')
          .eq('id', advisorId)
          .single();
          
        if (advisorError || !advisorData) {
          throw new Error('Failed to fetch advisor profile');
        }
        
        advisorProfile = advisorData;
      }
      
      if (!consumerProfile) {
        // Fetch consumer profile from database
        const { data: consumerData, error: consumerError } = await supabase
          .from('consumer_profiles')
          .select('*')
          .eq('id', consumerId)
          .single();
          
        if (consumerError || !consumerData) {
          throw new Error('Failed to fetch consumer profile');
        }
        
        consumerProfile = consumerData;
      }
      
      // Calculate score
      const score = calculateMatchScore(advisorProfile as AdvisorProfile, consumerProfile as ConsumerProfile);
      const explanations = getMatchExplanations(advisorProfile as AdvisorProfile, consumerProfile as ConsumerProfile);
      
      // Store in database
      await storeCompatibilityScore(advisorId, consumerId, score, explanations);
      
      return { score, explanations };
    } catch (err) {
      console.error('Error calculating match:', err);
      setError('Failed to calculate match score');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  // Sync local matches with database
  const syncMatches = useCallback(async (
    targetProfiles: (AdvisorProfile | ConsumerProfile)[],
    preferences: MatchPreferences
  ) => {
    if (!userType || (!advisorProfile && !consumerProfile)) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      await calculateAndStoreCompatibilityScores(
        userType as 'consumer' | 'advisor',
        userId,
        targetProfiles,
        preferences
      );
    } catch (err) {
      console.error('Error syncing matches:', err);
      setError('Failed to sync matches with database');
    } finally {
      setIsProcessing(false);
    }
  }, [userType, advisorProfile, consumerProfile, getCurrentUserId]);
  
  // Get top matches from database
  const getTopMatches = useCallback(async (limit: number = 10) => {
    if (!userType) return [];
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      return await getTopMatchesFromDatabase(
        userType as 'consumer' | 'advisor', 
        userId, 
        limit
      );
    } catch (err) {
      console.error('Error getting top matches:', err);
      setError('Failed to get top matches from database');
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, [userType, getCurrentUserId]);
  
  return {
    calculateAndStoreMatch,
    syncMatches,
    getTopMatches,
    isProcessing,
    error
  };
};
