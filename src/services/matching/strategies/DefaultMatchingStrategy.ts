
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { CallMetrics } from '../../../types/callTypes';
import { MatchingStrategy } from './MatchingStrategy';
import { MATCHING_WEIGHTS } from '../config/matchingConfig';
import { handleError, createError, ErrorCategory, ErrorSeverity } from '../../../utils/errorHandling';

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
    try {
      // Input validation
      if (!advisorId || !consumerId) {
        return { 
          score: 0, 
          matchExplanation: ["Invalid input: Missing advisor or consumer ID"] 
        };
      }
      
      // Normalize preferences to prevent unexpected nulls
      const safePreferences: MatchPreferences = {
        prioritizeLanguage: preferences?.prioritizeLanguage ?? true,
        prioritizeExpertise: preferences?.prioritizeExpertise ?? true,
        prioritizeAvailability: preferences?.prioritizeAvailability ?? true,
        prioritizeLocation: preferences?.prioritizeLocation ?? false,
        minimumMatchScore: preferences?.minimumMatchScore ?? 0,
        considerInteractionData: preferences?.considerInteractionData ?? true,
        excludedCategories: preferences?.excludedCategories ?? [],
        weightFactors: preferences?.weightFactors ?? {}
      };

      // Fetch profiles from data source
      // In production, this would be replaced with database queries or API calls
      const advisor = mockAdvisors.find(a => a.id === advisorId);
      const consumer = mockConsumers.find(c => c.id === consumerId);
      
      if (!advisor || !consumer) {
        return { 
          score: 0, 
          matchExplanation: ["No match data available: Profile not found"] 
        };
      }
      
      // Get base compatibility score
      let weightedScore = 0;
      let matchExplanation: string[] = [];
      
      // 1. Language match calculation
      if (safePreferences.prioritizeLanguage) {
        try {
          const languageResult = calculateLanguageMatchScore(advisor, consumer);
          weightedScore += languageResult.score;
          if (languageResult.explanation) {
            matchExplanation.push(languageResult.explanation);
          }
        } catch (error) {
          console.warn("Error in language matching calculation:", error);
          // Continue with other calculations despite this error
        }
      }
      
      // 2. Expertise match calculation
      if (safePreferences.prioritizeExpertise) {
        try {
          const expertiseResult = calculateExpertiseMatchScore(advisor, consumer);
          weightedScore += expertiseResult.score;
          if (expertiseResult.explanation) {
            matchExplanation.push(expertiseResult.explanation);
          }
        } catch (error) {
          console.warn("Error in expertise matching calculation:", error);
          // Continue with other calculations despite this error
        }
      }
      
      // 3. Availability preference weighting
      if (safePreferences.prioritizeAvailability) {
        try {
          const availabilityResult = calculateAvailabilityScore(advisor);
          weightedScore += availabilityResult.score;
          if (availabilityResult.explanation) {
            matchExplanation.push(availabilityResult.explanation);
          }
        } catch (error) {
          console.warn("Error in availability calculation:", error);
          // Continue with other calculations despite this error
        }
      }
      
      // 4. Location preference weighting
      if (safePreferences.prioritizeLocation) {
        // Simplified location logic for now
        weightedScore += MATCHING_WEIGHTS.LOCATION;
      }
      
      // 5. Call interaction data weighting
      if (safePreferences.considerInteractionData) {
        try {
          const interactionResult = calculateCallInteractionScore(advisorId, consumerId, callMetrics);
          weightedScore += interactionResult.score;
          if (interactionResult.explanation) {
            matchExplanation.push(interactionResult.explanation);
          }
        } catch (error) {
          console.warn("Error in call interaction scoring:", error);
          // Continue with other calculations despite this error
        }
      }
      
      // 6. Risk tolerance alignment
      try {
        const riskResult = calculateRiskAlignmentScore(advisor, consumer);
        weightedScore += riskResult.score;
        if (riskResult.explanation) {
          matchExplanation.push(riskResult.explanation);
        }
      } catch (error) {
        console.warn("Error in risk alignment calculation:", error);
        // Continue with other calculations despite this error
      }
      
      // 7. Filter out excluded categories
      if (safePreferences.excludedCategories?.length) {
        try {
          const exclusionResult = checkExcludedCategories(advisor, safePreferences.excludedCategories);
          weightedScore -= exclusionResult.penalty;
          if (exclusionResult.explanation) {
            matchExplanation.push(exclusionResult.explanation);
          }
        } catch (error) {
          console.warn("Error in excluded categories check:", error);
          // Continue with other calculations despite this error
        }
      }
      
      // Apply minimum score threshold with early exit
      if (safePreferences.minimumMatchScore && weightedScore < safePreferences.minimumMatchScore) {
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
    } catch (error) {
      // Use createError to properly create an AppError object
      const appError = createError(
        `Error in Default Matching Strategy: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCategory.UNKNOWN,
        ErrorSeverity.MEDIUM,
        error,
        { advisorId, consumerId }
      );
      
      // Pass the properly constructed error object to handleError
      handleError(appError);
      
      return { 
        score: 0, 
        matchExplanation: ["An error occurred while calculating compatibility"] 
      };
    }
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
