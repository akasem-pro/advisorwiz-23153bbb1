
import { UserType, AdvisorProfile, ConsumerProfile } from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import {
  calculateCompatibilityBetweenProfiles,
  getWeightedCompatibilityScore,
  getRecommendedProfilesBasedOnActivity
} from '../services/matching';

/**
 * Hook that provides matching algorithm operations
 */
export const useMatchingAlgorithm = (
  userType: UserType,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  matchPreferences: MatchPreferences,
  chats: any[],
  appointments: any[]
) => {
  const calculateCompatibilityScore = (advisorId: string, consumerId: string) => {
    // Enhanced logic using matchPreferences to compute more accurate scores
    return getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences
    );
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
      matchPreferences
    );
  };

  return {
    calculateCompatibilityScore,
    updateMatchPreferences,
    getTopMatches,
    getRecommendedMatches
  };
};
