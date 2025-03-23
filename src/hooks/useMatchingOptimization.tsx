
import { useMemo, useCallback, useEffect } from 'react';
import { 
  AdvisorProfile, 
  ConsumerProfile, 
  ServiceCategory 
} from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import { CallMetrics } from '../types/callTypes';
import { getWeightedCompatibilityScore, clearCompatibilityCache } from '../services/matching/weightedScoring';
import { clearMatchCache } from '../utils/matchingAlgorithm';

// New hook for optimizing the matching algorithm
export const useMatchingOptimization = (
  userType: 'consumer' | 'advisor' | null,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  matchPreferences: MatchPreferences,
  callMetrics?: CallMetrics[]
) => {
  // Clear caches when preferences change
  useEffect(() => {
    if (matchPreferences) {
      // Clear both caches to ensure fresh results with new preferences
      clearCompatibilityCache();
      clearMatchCache();
    }
  }, [matchPreferences]);

  // Memoize the calculate compatibility score function
  const calculateCompatibilityScore = useCallback((advisorId: string, consumerId: string) => {
    // Enhanced logic using matchPreferences to compute more accurate scores
    const result = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences,
      callMetrics
    );
    
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

  // Memoize filtered consumer/advisor profiles that meet minimum criteria
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
