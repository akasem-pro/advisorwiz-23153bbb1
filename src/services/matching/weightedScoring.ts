
/**
 * Weighted compatibility scoring system
 * Central coordinator for the matching algorithm
 */
import { MatchPreferences } from '../../context/UserContextDefinition';
import { withPerformanceTracking } from '../../utils/matchingPerformance';
import { CallMetrics } from '../../types/callTypes';

// Algorithm components
import { calculateLanguageMatchScore } from './algorithms/languageMatching';
import { 
  calculateExpertiseMatchScore, 
  calculateRiskAlignmentScore,
  checkExcludedCategories 
} from './algorithms/expertiseMatching';
import { calculateAvailabilityScore } from './algorithms/availabilityMatching';
import { calculateCallInteractionScore } from './algorithms/callInteractionScoring';

// Cache management
import { 
  getCachedResult, 
  cacheResult, 
  clearCompatibilityCache, 
  getCompatibilityCacheStats 
} from './cache/compatibilityCache';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

/**
 * Performance-optimized weighted compatibility score calculation
 * @returns {Object} Contains both the score and explanation for the match
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: CallMetrics[]
): { score: number; matchExplanation: string[] } => {
  // Create a comprehensive cache key that includes preferences
  const cacheKey = `${advisorId}-${consumerId}-${JSON.stringify(preferences)}`;
  
  // Check if we have this calculation cached and it's not expired
  const cachedResult = getCachedResult(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return { score: 0, matchExplanation: ["No match data available"] };
  
  // Get base compatibility score
  let weightedScore = 0;
  let matchExplanation: string[] = [];
  
  // 1. Language match calculation
  if (preferences.prioritizeLanguage) {
    const languageResult = calculateLanguageMatchScore(advisor, consumer);
    weightedScore += languageResult.score;
    if (languageResult.explanation) {
      matchExplanation.push(languageResult.explanation);
    }
  }
  
  // 2. Expertise match calculation
  if (preferences.prioritizeExpertise) {
    const expertiseResult = calculateExpertiseMatchScore(advisor, consumer);
    weightedScore += expertiseResult.score;
    if (expertiseResult.explanation) {
      matchExplanation.push(expertiseResult.explanation);
    }
  }
  
  // 3. Availability preference weighting
  if (preferences.prioritizeAvailability) {
    const availabilityResult = calculateAvailabilityScore(advisor);
    weightedScore += availabilityResult.score;
    if (availabilityResult.explanation) {
      matchExplanation.push(availabilityResult.explanation);
    }
  }
  
  // 4. Location preference weighting
  if (preferences.prioritizeLocation) {
    // Simplified location logic for now
    weightedScore += 5;
  }
  
  // 5. Call interaction data weighting
  if (preferences.considerInteractionData) {
    const interactionResult = calculateCallInteractionScore(advisorId, consumerId, callMetrics);
    weightedScore += interactionResult.score;
    if (interactionResult.explanation) {
      matchExplanation.push(interactionResult.explanation);
    }
  }
  
  // 6. Risk tolerance alignment
  const riskResult = calculateRiskAlignmentScore(advisor, consumer);
  weightedScore += riskResult.score;
  if (riskResult.explanation) {
    matchExplanation.push(riskResult.explanation);
  }
  
  // 7. Filter out excluded categories
  if (preferences.excludedCategories?.length) {
    const exclusionResult = checkExcludedCategories(advisor, preferences.excludedCategories);
    weightedScore -= exclusionResult.penalty;
    if (exclusionResult.explanation) {
      matchExplanation.push(exclusionResult.explanation);
    }
  }
  
  // Apply minimum score threshold with early exit
  if (preferences.minimumMatchScore && weightedScore < preferences.minimumMatchScore) {
    return { score: 0, matchExplanation: ["Below your minimum match threshold"] };
  }
  
  // Cap at 100
  const finalScore = Math.min(Math.max(weightedScore, 0), 100);
  
  // For low scores with explanations, add a general explanation
  if (finalScore < 40 && matchExplanation.length === 0) {
    matchExplanation.push("Low overall compatibility with your profile");
  }
  
  // Add base compatibility explanation if no specific matches found
  if (matchExplanation.length === 0) {
    matchExplanation.push("Basic compatibility with your financial needs");
  }
  
  const result = { score: finalScore, matchExplanation };
  
  // Cache the result with a timestamp
  cacheResult(cacheKey, result);
  
  return result;
};

// Export the function with performance tracking wrapper
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);

// Re-export cache utilities
export {
  clearCompatibilityCache,
  getCompatibilityCacheStats
};
