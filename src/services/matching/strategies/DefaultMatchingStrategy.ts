
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { MATCHING_WEIGHTS } from '../config/matchingConfig';

// Algorithm components
import { calculateLanguageMatchScore } from '../algorithms/languageMatching';
import { 
  calculateExpertiseMatchScore, 
  calculateRiskAlignmentScore,
  checkExcludedCategories 
} from '../algorithms/expertiseMatching';
import { calculateAvailabilityScore } from '../algorithms/availabilityMatching';
import { calculateCallInteractionScore } from '../algorithms/callInteractionScoring';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../../data/mockUsers';

/**
 * Default implementation of the matching strategy
 * 
 * This strategy implements a balanced approach to compatibility scoring,
 * giving appropriate weight to each matching factor based on standard weights.
 * It serves as the base implementation and fallback strategy.
 * 
 * Algorithm characteristics:
 * - Balances all matching factors using standard weights
 * - Includes risk tolerance alignment with moderate weighting
 * - Considers call interaction data if available
 * - Applies exclusion penalties for explicitly excluded categories
 * - Enforces minimum score thresholds from user preferences
 */
export class DefaultMatchingStrategy implements MatchingStrategy {
  /**
   * Calculate compatibility score using the default balanced algorithm
   * 
   * @param advisorId - ID of the advisor to evaluate
   * @param consumerId - ID of the consumer to match against
   * @param preferences - User-defined matching preferences
   * @param callMetrics - Optional call interaction metrics
   * 
   * @returns Compatibility score (0-100) and explanations
   */
  calculateScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics?: CallMetrics[]
  ): { score: number; matchExplanation: string[] } {
    // Fetch profiles from data source
    // In production, this would be replaced with database queries or API calls
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
      weightedScore += MATCHING_WEIGHTS.LOCATION;
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
    
    return { score: finalScore, matchExplanation };
  }

  /**
   * Get the name of the strategy for logging and analytics
   * @returns Name of the strategy
   */
  getName(): string {
    return 'Default Balanced Strategy';
  }
  
  /**
   * Get the description of how this strategy works
   * @returns Description of the strategy
   */
  getDescription(): string {
    return 'Balanced approach that weighs all matching factors using standard weights, ' +
           'including language, expertise, availability, location, and risk tolerance alignment.';
  }
}
