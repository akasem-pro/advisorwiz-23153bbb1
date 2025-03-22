
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { ExtendedAdvisorProfileForm, MatchScoreRange, getMatchCategory } from '../types/advisorTypes';
import { getWeightedCompatibilityScore } from '../services/matching/weightedScoring';

// Helper function that takes either AdvisorProfile or ExtendedAdvisorProfileForm
type AdvisorProfileTypes = AdvisorProfile | ExtendedAdvisorProfileForm;

// Function to calculate match score between advisor and consumer
export const calculateMatchScore = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): number => {
  if (!advisor || !consumer) return 0;
  
  // Use the enhanced weighted scoring algorithm
  return getWeightedCompatibilityScore(advisor.id, consumer.id, {
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: consumer.location ? true : false
  });
};

// Function to categorize matches into different buckets
export const categorizeMatches = (advisors: AdvisorProfileTypes[], consumer: ConsumerProfile) => {
  const matches: Record<string, { advisor: AdvisorProfileTypes; score: number }[]> = {
    excellent: [],
    good: [],
    average: [],
    poor: []
  };

  advisors.forEach(advisor => {
    const score = calculateMatchScore(advisor, consumer);
    const category = getMatchCategory(score);
    matches[category.category].push({ advisor, score });
  });

  // Sort each category by score (highest first)
  Object.keys(matches).forEach(key => {
    matches[key] = matches[key].sort((a, b) => b.score - a.score);
  });

  return matches;
};

// Generate compatibility scores for an advisor with multiple consumers
export const generateCompatibilityScores = (advisor: AdvisorProfileTypes, consumers: ConsumerProfile[]) => {
  const scores: Record<string, number> = {};
  
  consumers.forEach(consumer => {
    if (consumer.id) {
      scores[consumer.id] = calculateMatchScore(advisor, consumer);
    }
  });
  
  return scores;
};
