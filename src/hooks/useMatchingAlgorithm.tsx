
import { UserType, AdvisorProfile, ConsumerProfile } from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';
import { CallMetrics } from '../types/callTypes';
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
  appointments: any[],
  callMetrics: CallMetrics[] = [] // New parameter
) => {
  const calculateCompatibilityScore = (advisorId: string, consumerId: string) => {
    // Enhanced logic using matchPreferences to compute more accurate scores
    let baseScore = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      matchPreferences
    );
    
    // Apply call interaction bonus if enabled in preferences
    if (matchPreferences.considerInteractionData && callMetrics.length > 0) {
      const metrics = callMetrics.find(
        m => m.advisorId === advisorId && m.consumerId === consumerId
      );
      
      if (metrics) {
        // Add bonus for high engagement users (more calls and longer duration)
        const callCountBonus = Math.min(metrics.totalCalls * 2, 10); // Up to 10 points
        const durationBonus = Math.min(Math.floor(metrics.totalDuration / 300), 10); // Up to 10 points, 1 point per 5 minutes
        const completionRateBonus = metrics.totalCalls > 0 
          ? Math.min((metrics.callOutcomes.completed / metrics.totalCalls) * 10, 10) // Up to 10 points
          : 0;
          
        baseScore += callCountBonus + durationBonus + completionRateBonus;
      }
    }
    
    return Math.min(baseScore, 100); // Cap at 100
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
