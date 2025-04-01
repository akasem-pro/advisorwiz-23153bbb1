
import { useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  AdvisorProfile, 
  ConsumerProfile, 
  ServiceCategory 
} from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import { CallMetrics } from '../types/callTypes';
import { getWeightedCompatibilityScore, clearCompatibilityCache } from '../services/matching/weightedScoring';
import { clearMatchCache } from '../utils/matchingAlgorithm';

// Enhanced hook for optimizing the matching algorithm performance
export const useMatchingOptimization = (
  userType: 'consumer' | 'advisor' | null,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  matchPreferences: MatchPreferences,
  callMetrics?: CallMetrics[]
) => {
  // Store previous preferences for comparison
  const prevPreferencesRef = useRef<MatchPreferences | null>(null);
  
  // Clear caches only when preferences meaningfully change
  useEffect(() => {
    if (!prevPreferencesRef.current || 
        JSON.stringify(prevPreferencesRef.current) !== JSON.stringify(matchPreferences)) {
      // Clear both caches to ensure fresh results with new preferences
      clearCompatibilityCache();
      clearMatchCache();
      prevPreferencesRef.current = matchPreferences;
    }
  }, [matchPreferences]);

  // Cache calculation results for the current session
  const calculationCache = useRef(new Map<string, {score: number, timestamp: number}>());

  // Clean up stale cache entries periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const MAX_AGE = 5 * 60 * 1000; // 5 minutes
      
      // Remove stale entries
      calculationCache.current.forEach((value, key) => {
        if (now - value.timestamp > MAX_AGE) {
          calculationCache.current.delete(key);
        }
      });
    }, 60 * 1000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // Memoize the calculate compatibility score function with local cache
  const calculateCompatibilityScore = useCallback((advisorId: string, consumerId: string) => {
    const cacheKey = `${advisorId}_${consumerId}_${JSON.stringify(matchPreferences)}`;
    
    // Check local cache first for better performance
    if (calculationCache.current.has(cacheKey)) {
      return calculationCache.current.get(cacheKey)!.score;
    }
    
    // If not in cache, perform calculation
    const result = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences,
      callMetrics
    );
    
    // Store in local cache
    calculationCache.current.set(cacheKey, {
      score: result.score,
      timestamp: Date.now()
    });
    
    return result.score;
  }, [matchPreferences, callMetrics]);

  // Memoize complex matching explanations
  const getMatchExplanations = useCallback((advisorId: string, consumerId: string): string[] => {
    const result = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences,
      callMetrics
    );
    
    return result.matchExplanation;
  }, [matchPreferences, callMetrics]);

  // Optimized pre-filtering for eligible profiles
  const eligibleProfiles = useMemo(() => {
    const targetProfiles: Array<AdvisorProfile | ConsumerProfile> = [];
    const selfId = userType === 'consumer' ? consumerProfile?.id : advisorProfile?.id;
    
    if (!selfId) return [];

    // For optimization, pre-filter profiles that wouldn't meet basic threshold
    // This avoids expensive calculations for obviously bad matches
    if (userType === 'consumer' && consumerProfile) {
      const language = consumerProfile.preferredLanguage;
      const services = consumerProfile.serviceNeeds;
      
      // Logic to get advisor profiles that meet the primary criteria
      // This would normally come from your hook that fetches advisors
      // This is just a placeholder for the optimization logic
      
      return targetProfiles.filter(profile => {
        const advisorProfile = profile as AdvisorProfile;
        
        // Quick pre-filtering based on basic criteria
        if (matchPreferences.prioritizeLanguage && language && language.length > 0) {
          if (!language.some(lang => advisorProfile.languages?.includes(lang))) {
            return false;
          }
        }
        
        if (matchPreferences.prioritizeExpertise && services && services.length > 0) {
          if (!services.some(service => 
            advisorProfile.expertise?.includes(service as ServiceCategory)
          )) {
            return false;
          }
        }
        
        // Only do expensive calculation if basic criteria are met
        return true;
      });
    }
    
    // Similar logic for advisors looking for consumers
    return targetProfiles;
  }, [userType, consumerProfile, advisorProfile, matchPreferences]);

  return {
    calculateCompatibilityScore,
    getMatchExplanations,
    eligibleProfiles
  };
};

export default useMatchingOptimization;
