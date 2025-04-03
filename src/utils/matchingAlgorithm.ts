import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { ExtendedAdvisorProfileForm, MatchScoreRange, getMatchCategory } from '../types/advisorTypes';
import { getWeightedCompatibilityScore } from '../services/matching/weightedScoring';
import { trackMatchingOperation } from '../services/matching/performance/matchingPerformanceTracker';

type AdvisorProfileTypes = AdvisorProfile | ExtendedAdvisorProfileForm;

const matchScoreCache = new Map<string, {
  score: number;
  explanations: string[];
  timestamp: number;
}>();

const CACHE_EXPIRATION_MS = 10 * 60 * 1000;

export const calculateMatchScore = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): number => {
  if (!advisor || !consumer) return 0;
  
  const startTime = performance.now();
  
  const cacheKey = `${advisor.id}-${consumer.id}`;
  
  const cachedResult = matchScoreCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION_MS) {
    const duration = performance.now() - startTime;
    trackMatchingOperation('calculateMatchScore', duration, { 
      advisorId: advisor.id, 
      consumerId: consumer.id 
    }, true);
    
    return cachedResult.score;
  }
  
  const result = getWeightedCompatibilityScore(advisor.id, consumer.id, {
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: true
  });
  
  matchScoreCache.set(cacheKey, {
    score: result.score,
    explanations: result.matchExplanation,
    timestamp: Date.now()
  });
  
  const duration = performance.now() - startTime;
  trackMatchingOperation('calculateMatchScore', duration, {
    advisorId: advisor.id,
    consumerId: consumer.id,
    cached: false
  }, false);
  
  return result.score;
};

export const getMatchExplanations = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): string[] => {
  if (!advisor || !consumer) return ["No match data available"];
  
  const cacheKey = `${advisor.id}-${consumer.id}`;
  const cachedResult = matchScoreCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION_MS) {
    return cachedResult.explanations;
  }
  
  calculateMatchScore(advisor, consumer);
  
  const freshCachedResult = matchScoreCache.get(cacheKey);
  return freshCachedResult ? freshCachedResult.explanations : ["No match data available"];
};

export const clearMatchCache = (): void => {
  matchScoreCache.clear();
};

export const invalidateMatchCache = (id: string): void => {
  for (const key of matchScoreCache.keys()) {
    if (key.includes(id)) {
      matchScoreCache.delete(key);
    }
  }
};

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

  Object.keys(matches).forEach(key => {
    matches[key] = matches[key].sort((a, b) => b.score - a.score);
  });

  return matches;
};

export const generateCompatibilityScores = (advisor: AdvisorProfileTypes, consumers: ConsumerProfile[]) => {
  const scores: Record<string, { score: number; explanations: string[] }> = {};
  
  consumers.forEach(consumer => {
    if (consumer.id) {
      scores[consumer.id] = {
        score: calculateMatchScore(advisor, consumer),
        explanations: getMatchExplanations(advisor, consumer)
      };
    }
  });
  
  return scores;
};
