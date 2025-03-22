
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { getWeightedCompatibilityScore } from './weightedScoring';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

/**
 * Calculates compatibility between profiles (consumer to advisor or advisor to consumer)
 */
export const calculateCompatibilityBetweenProfiles = (
  userType: 'consumer' | 'advisor',
  userId: string,
  preferences: MatchPreferences,
  limit?: number
): (AdvisorProfile | ConsumerProfile)[] => {
  if (userType === 'consumer') {
    // Consumer looking for advisors
    const compatibilityScores = mockAdvisors.map(advisor => {
      const result = getWeightedCompatibilityScore(advisor.id, userId, preferences);
      return {
        advisor,
        score: result.score,
        explanations: result.matchExplanation
      };
    });
    
    // Sort by score (descending)
    const sortedResults = compatibilityScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Add compatibility score to advisor object
    const resultsWithScores = sortedResults.map(item => ({
      ...item.advisor,
      compatibilityScores: {
        ...item.advisor.compatibilityScores,
        [userId]: item.score
      }
    }));
    
    // Limit results if specified
    return limit ? resultsWithScores.slice(0, limit) : resultsWithScores;
  } else {
    // Advisor looking for consumers
    const compatibilityScores = mockConsumers.map(consumer => {
      const result = getWeightedCompatibilityScore(userId, consumer.id, preferences);
      return {
        consumer,
        score: result.score,
        explanations: result.matchExplanation
      };
    });
    
    // Sort by score (descending)
    const sortedResults = compatibilityScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Return sorted consumers
    const consumers = sortedResults.map(item => item.consumer);
    
    // Limit results if specified
    return limit ? consumers.slice(0, limit) : consumers;
  }
};
