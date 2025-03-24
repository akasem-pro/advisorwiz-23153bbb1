
import { useState, useCallback } from 'react';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { useMatchingAlgorithm } from '../useMatchingAlgorithm';
import { UserType, ConsumerProfile, AdvisorProfile } from '../../types/profileTypes';
import { Chat } from '../../types/chatTypes';
import { Appointment } from '../../types/timeTypes';
import { CallMetrics } from '../../types/callTypes';

/**
 * Hook to manage matching preferences and algorithms
 */
export const useUserMatching = (
  userType: UserType,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  chats: Chat[],
  appointments: Appointment[],
  callMetrics: CallMetrics[]
) => {
  const [matchPreferences, setMatchPreferences] = useState<MatchPreferences>({
    prioritizeLanguage: true,
    prioritizeAvailability: true,
    prioritizeExpertise: true,
    prioritizeLocation: false,
    minimumMatchScore: 40,
    considerInteractionData: true // Enable interaction data by default
  });

  const matching = useMatchingAlgorithm(
    userType,
    consumerProfile,
    advisorProfile,
    matchPreferences,
    chats,
    appointments,
    callMetrics
  );

  const updateMatchPreferences = useCallback((preferences: MatchPreferences) => {
    setMatchPreferences(prev => ({
      ...prev,
      ...preferences
    }));
  }, []);

  return {
    matchPreferences,
    setMatchPreferences,
    updateMatchPreferences,
    calculateCompatibilityScore: matching.calculateCompatibilityScore,
    getTopMatches: matching.getTopMatches,
    getRecommendedMatches: matching.getRecommendedMatches
  };
};
