
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
 * Calculates a weighted compatibility score based on user preferences and historical interaction data
 * @returns {Object} Contains both the score and explanation for the match
 */
const calculateWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: any[]
): { score: number; matchExplanation: string[] } => {
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return { score: 0, matchExplanation: ["No match data available"] };
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  let matchExplanation: string[] = [];
  
  // 1. Language preference weighting
  if (preferences.prioritizeLanguage) {
    // Check for perfect language match
    const perfectLanguageMatch = consumer.preferredLanguage.every(lang => 
      advisor.languages.includes(lang)
    );
    
    if (perfectLanguageMatch) {
      weightedScore += PREFERENCE_WEIGHTS.LANGUAGE;
      matchExplanation.push(`Speaks all your preferred languages`);
    }
  }
  
  // 2. Expertise preference weighting
  if (preferences.prioritizeExpertise) {
    // Check for comprehensive expertise coverage
    if (consumer.serviceNeeds) {
      const expertiseCoverage = consumer.serviceNeeds.every(service => 
        advisor.expertise.includes(service)
      );
      
      if (expertiseCoverage) {
        weightedScore += PREFERENCE_WEIGHTS.EXPERTISE;
        matchExplanation.push(`Expert in all your financial service needs`);
      } else {
        // Check for partial coverage
        const matchedServices = consumer.serviceNeeds.filter(service => 
          advisor.expertise.includes(service)
        );
        
        if (matchedServices.length > 0) {
          const partialBonus = Math.floor(PREFERENCE_WEIGHTS.EXPERTISE * (matchedServices.length / consumer.serviceNeeds.length));
          weightedScore += partialBonus;
          matchExplanation.push(`Expertise in ${matchedServices.length} of your ${consumer.serviceNeeds.length} service needs`);
        }
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
  
  return { 
    score: finalScore,
    matchExplanation
  };
};

// Export the function with performance tracking wrapper
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);
