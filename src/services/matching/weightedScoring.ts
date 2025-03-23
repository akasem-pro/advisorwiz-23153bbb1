import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { calculateBaseCompatibility } from './compatibility';
import { withPerformanceTracking } from '../../utils/matchingPerformance';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

// Define preference weights
const PREFERENCE_WEIGHTS = {
  LANGUAGE: 10,           // Language match bonus
  EXPERTISE: 15,          // Expertise coverage bonus
  AVAILABILITY: 5,        // Availability bonus (max)
  EXCLUDED_PENALTY: 25,   // Penalty for excluded categories
  CALL_INTERACTION: {
    CALL_COUNT: 10,       // Up to 10 points for call frequency
    DURATION: 10,         // Up to 10 points for call duration
    COMPLETION_RATE: 10   // Up to 10 points for call completion rate
  },
  USER_FEEDBACK: 15       // Weight for user feedback adjustments
};

/**
 * Performance-optimized weighted compatibility score calculation
 * @returns {Object} Contains both the score and explanation for the match
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: any[]
): { score: number; matchExplanation: string[] } => {
  // Use memoization technique to cache results for identical input parameters
  const cacheKey = `${advisorId}-${consumerId}-${JSON.stringify(preferences)}`;
  
  // Check if we have this calculation cached for this session
  // This would ideally be stored in a more permanent cache or state management solution
  // @ts-ignore - Using a session-based caching approach
  if (window.__matchCalculationCache && window.__matchCalculationCache[cacheKey]) {
    // @ts-ignore
    return window.__matchCalculationCache[cacheKey];
  }
  
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return { score: 0, matchExplanation: ["No match data available"] };
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  let matchExplanation: string[] = [];
  
  // Optimized matching logic
  if (preferences.prioritizeLanguage && consumer.preferredLanguage && advisor.languages) {
    // Check for language match - fast path for common case
    const hasLanguageMatch = consumer.preferredLanguage.some(lang => 
      advisor.languages.includes(lang)
    );
    
    if (hasLanguageMatch) {
      // For perfect match, check all languages
      const perfectLanguageMatch = consumer.preferredLanguage.every(lang => 
        advisor.languages.includes(lang)
      );
      
      if (perfectLanguageMatch) {
        weightedScore += PREFERENCE_WEIGHTS.LANGUAGE;
        matchExplanation.push(`Speaks all your preferred languages`);
      } else {
        // Partial language match
        const matchCount = consumer.preferredLanguage.filter(lang => 
          advisor.languages.includes(lang)
        ).length;
        
        const partialBonus = Math.floor(PREFERENCE_WEIGHTS.LANGUAGE * 
          (matchCount / consumer.preferredLanguage.length));
        
        weightedScore += partialBonus;
        if (partialBonus > 0) {
          matchExplanation.push(`Speaks ${matchCount} of your preferred languages`);
        }
      }
    }
  }
  
  // Optimized expertise matching
  if (preferences.prioritizeExpertise && consumer.serviceNeeds && advisor.expertise) {
    // Fast path check - do they have any matching service at all?
    const hasExpertiseMatch = consumer.serviceNeeds.some(service => 
      advisor.expertise.includes(service)
    );
    
    if (hasExpertiseMatch) {
      // Calculate what percentage of needs are covered
      const matchedServices = consumer.serviceNeeds.filter(service => 
        advisor.expertise.includes(service)
      );
      
      const coverage = matchedServices.length / consumer.serviceNeeds.length;
      const expertiseBonus = Math.floor(PREFERENCE_WEIGHTS.EXPERTISE * coverage);
      
      weightedScore += expertiseBonus;
      
      if (coverage === 1) {
        matchExplanation.push(`Expert in all your financial service needs`);
      } else if (coverage > 0.5) {
        matchExplanation.push(`Expertise in most of your service needs (${matchedServices.length} of ${consumer.serviceNeeds.length})`);
      } else if (matchedServices.length > 0) {
        matchExplanation.push(`Expertise in ${matchedServices.length} of your ${consumer.serviceNeeds.length} service needs`);
      }
    }
  }
  
  // 3. Availability preference weighting
  if (preferences.prioritizeAvailability && advisor.availability) {
    // Reward advisors with more availability slots
    const availableSlots = advisor.availability.filter(slot => slot.isAvailable).length;
    // Cap the bonus at PREFERENCE_WEIGHTS.AVAILABILITY points
    const availabilityBonus = Math.min(availableSlots, PREFERENCE_WEIGHTS.AVAILABILITY);
    weightedScore += availabilityBonus;
    
    if (availabilityBonus > 3) {
      matchExplanation.push("Highly available for appointments");
    } else if (availabilityBonus > 0) {
      matchExplanation.push("Some availability for appointments");
    }
  }
  
  // 4. Location preference weighting
  if (preferences.prioritizeLocation) {
    // Since we don't have direct region and city properties, 
    // we'll use organization or any other available comparable data
    
    // If we had location data in the future, this would be the place to implement it
    // For now, we'll simplify by giving a small bonus if both profiles exist
    weightedScore += 5; // Small location bonus when the feature is enabled
    
    // Note: In a real implementation, we would compare actual location properties
    // once they're added to the user profile types
  }
  
  // 5. Call interaction data weighting (if available and preference enabled)
  if (preferences.considerInteractionData && callMetrics && callMetrics.length > 0) {
    const metrics = callMetrics.find(m => 
      m.advisorId === advisorId && m.consumerId === consumerId
    );
    
    if (metrics) {
      // Add bonus for high engagement users (more calls and longer duration)
      const callCountBonus = Math.min(metrics.totalCalls * 2, PREFERENCE_WEIGHTS.CALL_INTERACTION.CALL_COUNT);
      const durationBonus = Math.min(Math.floor(metrics.totalDuration / 300), PREFERENCE_WEIGHTS.CALL_INTERACTION.DURATION);
      const completionRateBonus = metrics.totalCalls > 0 
        ? Math.min((metrics.callOutcomes.completed / metrics.totalCalls) * PREFERENCE_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE, PREFERENCE_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE)
        : 0;
        
      const totalInteractionBonus = callCountBonus + durationBonus + completionRateBonus;
      weightedScore += totalInteractionBonus;
      
      if (totalInteractionBonus > 15) {
        matchExplanation.push("Excellent communication history with this advisor");
      } else if (totalInteractionBonus > 5) {
        matchExplanation.push("Good communication history with this advisor");
      }
    }
  }
  
  // 6. Risk tolerance alignment
  if (consumer.riskTolerance && advisor.expertise) {
    const riskToExpertiseMap: Record<string, string[]> = {
      'low': ['insurance', 'estate', 'education'],
      'medium': ['retirement', 'tax', 'philanthropic'],
      'high': ['investment', 'business']
    };
    
    const recommendedExpertise = riskToExpertiseMap[consumer.riskTolerance] || [];
    const expertiseMatches = recommendedExpertise.filter(exp => 
      advisor.expertise.includes(exp as any)
    );
    
    if (expertiseMatches.length > 0) {
      const riskBonus = Math.min(expertiseMatches.length * 3, 10);
      weightedScore += riskBonus;
      
      if (riskBonus > 5) {
        matchExplanation.push(`Well-aligned with your ${consumer.riskTolerance} risk tolerance`);
      }
    }
  }
  
  // 7. Filter out excluded categories
  if (preferences.excludedCategories && preferences.excludedCategories.length > 0) {
    const hasExcludedCategory = advisor.expertise.some(exp => 
      preferences.excludedCategories?.includes(exp)
    );
    
    if (hasExcludedCategory) {
      weightedScore -= PREFERENCE_WEIGHTS.EXCLUDED_PENALTY; // Significant penalty for having excluded expertise
      matchExplanation.push("Contains some expertise areas you've excluded");
    }
  }
  
  // Apply minimum score threshold
  if (preferences.minimumMatchScore && weightedScore < preferences.minimumMatchScore) {
    return { score: 0, matchExplanation: ["Below your minimum match threshold"] }; // Below threshold, not a match
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
  
  // Cache the result for future use
  // @ts-ignore - Using a session-based caching approach
  if (!window.__matchCalculationCache) window.__matchCalculationCache = {};
  // @ts-ignore
  window.__matchCalculationCache[cacheKey] = result;
  
  return result;
};

// Export the function with performance tracking wrapper
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);
