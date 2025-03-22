
import { UserType, AdvisorProfile, ConsumerProfile } from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import { CallMetrics } from '../types/callTypes';
import {
  calculateCompatibilityBetweenProfiles,
  getWeightedCompatibilityScore,
  getRecommendedProfilesBasedOnActivity
} from '../services/matching';

/**
 * Hook that provides matching algorithm operations with enhanced weighted scoring
 */
export const useMatchingAlgorithm = (
  userType: UserType,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  matchPreferences: MatchPreferences,
  chats: any[],
  appointments: any[],
  callMetrics: CallMetrics[] = [] // Call metrics for interaction-based matching
) => {
  const calculateCompatibilityScore = (advisorId: string, consumerId: string) => {
    // Enhanced logic using matchPreferences to compute more accurate scores
    let score = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences,
      callMetrics
    );
    
    // Apply additional business rules if needed
    // For example, boosting scores for premium users or other business logic
    
    return Math.min(score, 100); // Cap at 100
  };

  const updateMatchPreferences = (preferences: MatchPreferences) => {
    return preferences;
  };

  const getTopMatches = (limit: number = 5): (AdvisorProfile | ConsumerProfile)[] => {
    if (userType === 'consumer' && consumerProfile) {
      // Get top advisor matches for consumer
      return calculateCompatibilityBetweenProfiles(
        'consumer',
        consumerProfile.id,
        matchPreferences,
        limit
      );
    } else if (userType === 'advisor' && advisorProfile) {
      // Get top consumer matches for advisor
      return calculateCompatibilityBetweenProfiles(
        'advisor',
        advisorProfile.id,
        matchPreferences,
        limit
      );
    }
    return [];
  };

  const getRecommendedMatches = (): (AdvisorProfile | ConsumerProfile)[] => {
    const currentUserId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
    
    if (!currentUserId) return [];

    return getRecommendedProfilesBasedOnActivity(
      userType as 'consumer' | 'advisor',
      currentUserId,
      chats,
      appointments,
      matchPreferences,
      callMetrics // Pass call metrics to recommendation function
    );
  };

  return {
    calculateCompatibilityScore,
    updateMatchPreferences,
    getTopMatches,
    getRecommendedMatches
  };
};
