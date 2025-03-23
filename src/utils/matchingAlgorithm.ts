
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { ExtendedAdvisorProfileForm, MatchScoreRange, getMatchCategory } from '../types/advisorTypes';
import { getWeightedCompatibilityScore } from '../services/matching/weightedScoring';

// Helper function that takes either AdvisorProfile or ExtendedAdvisorProfileForm
type AdvisorProfileTypes = AdvisorProfile | ExtendedAdvisorProfileForm;

// In-memory cache to store recent match calculations
const matchScoreCache = new Map<string, {
  score: number;
  explanations: string[];
  timestamp: number;
}>();

// Cache expiration time (10 minutes)
const CACHE_EXPIRATION_MS = 10 * 60 * 1000;

// Function to calculate match score between advisor and consumer
export const calculateMatchScore = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): number => {
  if (!advisor || !consumer) return 0;
  
  // Generate a cache key using both IDs
  const cacheKey = `${advisor.id}-${consumer.id}`;
  
  // Check if we have a valid cached result
  const cachedResult = matchScoreCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION_MS) {
    return cachedResult.score;
  }
  
  // If no valid cache, calculate and store result
  const result = getWeightedCompatibilityScore(advisor.id, consumer.id, {
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: true
  });
  
  // Cache the result with current timestamp
  matchScoreCache.set(cacheKey, {
    score: result.score,
    explanations: result.matchExplanation,
    timestamp: Date.now()
  });
  
  return result.score;
};

// Function to get match explanations
export const getMatchExplanations = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): string[] => {
  if (!advisor || !consumer) return ["No match data available"];
  
  // Check if we have a valid cached result to avoid redundant calculation
  const cacheKey = `${advisor.id}-${consumer.id}`;
  const cachedResult = matchScoreCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION_MS) {
    return cachedResult.explanations;
  }
  
  // If not cached, calculate the score (which will also cache it)
  calculateMatchScore(advisor, consumer);
  
  // Now the result should be cached, get it
  const freshCachedResult = matchScoreCache.get(cacheKey);
  return freshCachedResult ? freshCachedResult.explanations : ["No match data available"];
};

// Manually clear the cache when needed (e.g., when preferences change)
export const clearMatchCache = (): void => {
  matchScoreCache.clear();
};

// Selectively invalidate cache for specific advisor or consumer
export const invalidateMatchCache = (id: string): void => {
  // Remove any cache entries that contain this ID
  for (const key of matchScoreCache.keys()) {
    if (key.includes(id)) {
      matchScoreCache.delete(key);
    }
  }
};

// Function to categorize matches into different buckets
export const categorizeMatches = (advisors: AdvisorProfileTypes[], consumer: ConsumerProfile) => {
  const matches: Record<string, { advisor: AdvisorProfileTypes; score: number; explanations: string[] }[]> = {
    excellent: [],
    good: [],
    average: [],
    poor: []
  };

  advisors.forEach(advisor => {
    const score = calculateMatchScore(advisor, consumer);
    const explanations = getMatchExplanations(advisor, consumer);
    const category = getMatchCategory(score);
    matches[category.category].push({ advisor, score, explanations });
  });

  // Sort each category by score (highest first)
  Object.keys(matches).forEach(key => {
    matches[key] = matches[key].sort((a, b) => b.score - a.score);
  });

  return matches;
};

// Generate compatibility scores for an advisor with multiple consumers
export const generateCompatibilityScores = (advisor: AdvisorProfileTypes, consumers: ConsumerProfile[]) => {
  const scores: Record<string, { score: number; explanations: string[] }> = {};
  
  consumers.forEach(consumer => {
    if (consumer.id) {
      // Use the cache-enabled functions
      scores[consumer.id] = {
        score: calculateMatchScore(advisor, consumer),
        explanations: getMatchExplanations(advisor, consumer)
      };
    }
  });
  
  return scores;
};
