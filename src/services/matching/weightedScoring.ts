
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

// In-memory cache for weighted compatibility scores
const scoreCache = new Map<string, {
  result: { score: number; matchExplanation: string[] };
  timestamp: number;
}>();

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION_MS = 5 * 60 * 1000;

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
  // Create a comprehensive cache key that includes preferences
  const cacheKey = `${advisorId}-${consumerId}-${JSON.stringify(preferences)}`;
  
  // Check if we have this calculation cached and it's not expired
  const cachedEntry = scoreCache.get(cacheKey);
  if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRATION_MS)) {
    return cachedEntry.result;
  }
  
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return { score: 0, matchExplanation: ["No match data available"] };
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  let matchExplanation: string[] = [];
  
  // Optimized matching logic - Using short-circuit evaluation for better performance
  if (preferences.prioritizeLanguage && consumer.preferredLanguage?.length && advisor.languages?.length) {
    // Check for language match - fast path for common case
    const matchingLanguages = consumer.preferredLanguage.filter(lang => 
      advisor.languages.includes(lang)
    );
    
    const matchCount = matchingLanguages.length;
    
    if (matchCount > 0) {
      const perfectLanguageMatch = matchCount === consumer.preferredLanguage.length;
      
      if (perfectLanguageMatch) {
        weightedScore += PREFERENCE_WEIGHTS.LANGUAGE;
        matchExplanation.push(`Speaks all your preferred languages`);
      } else {
        // Partial language match
        const partialBonus = Math.floor(PREFERENCE_WEIGHTS.LANGUAGE * 
          (matchCount / consumer.preferredLanguage.length));
        
        weightedScore += partialBonus;
        if (partialBonus > 0) {
          matchExplanation.push(`Speaks ${matchCount} of your preferred languages`);
        }
      }
    }
  }
  
  // Optimized expertise matching with early exits
  if (preferences.prioritizeExpertise && consumer.serviceNeeds?.length && advisor.expertise?.length) {
    // Calculate matching services in one pass
    const matchedServices = consumer.serviceNeeds.filter(service => 
      advisor.expertise.includes(service as any)
    );
    
    const matchCount = matchedServices.length;
    
    if (matchCount > 0) {
      const coverage = matchCount / consumer.serviceNeeds.length;
      const expertiseBonus = Math.floor(PREFERENCE_WEIGHTS.EXPERTISE * coverage);
      
      weightedScore += expertiseBonus;
      
      if (coverage === 1) {
        matchExplanation.push(`Expert in all your financial service needs`);
      } else if (coverage > 0.5) {
        matchExplanation.push(`Expertise in most of your service needs (${matchCount} of ${consumer.serviceNeeds.length})`);
      } else if (matchCount > 0) {
        matchExplanation.push(`Expertise in ${matchCount} of your ${consumer.serviceNeeds.length} service needs`);
      }
    }
  }
  
  // 3. Availability preference weighting - simplified calculation
  if (preferences.prioritizeAvailability && advisor.availability?.length) {
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
    // Simplified location logic for now
    weightedScore += 5;
  }
  
  // 5. Call interaction data weighting (if available and preference enabled)
  if (preferences.considerInteractionData && callMetrics?.length) {
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
  
  // 6. Risk tolerance alignment - optimized comparison
  if (consumer.riskTolerance && advisor.expertise?.length) {
    const riskToExpertiseMap: Record<string, string[]> = {
      'low': ['insurance', 'estate', 'education'],
      'medium': ['retirement', 'tax', 'philanthropic'],
      'high': ['investment', 'business']
    };
    
    const recommendedExpertise = riskToExpertiseMap[consumer.riskTolerance] || [];
    
    if (recommendedExpertise.length) {
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
  }
  
  // 7. Filter out excluded categories - optimized to exit early if possible
  if (preferences.excludedCategories?.length && advisor.expertise?.length) {
    const hasExcludedCategory = advisor.expertise.some(exp => 
      preferences.excludedCategories?.includes(exp as any)
    );
    
    if (hasExcludedCategory) {
      weightedScore -= PREFERENCE_WEIGHTS.EXCLUDED_PENALTY;
      matchExplanation.push("Contains some expertise areas you've excluded");
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
  scoreCache.set(cacheKey, {
    result,
    timestamp: Date.now()
  });
  
  return result;
};

// Utility function to clear cache (e.g., when preferences change globally)
export const clearCompatibilityCache = (): void => {
  scoreCache.clear();
};

// Utility to get cache stats for debugging
export const getCompatibilityCacheStats = (): { size: number, oldestEntry: number | null } => {
  let oldestTimestamp: number | null = null;
  
  for (const entry of scoreCache.values()) {
    if (oldestTimestamp === null || entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp;
    }
  }
  
  return {
    size: scoreCache.size,
    oldestEntry: oldestTimestamp ? Date.now() - oldestTimestamp : null
  };
};

// Export the function with performance tracking wrapper
export const getWeightedCompatibilityScore = withPerformanceTracking(
  calculateWeightedCompatibilityScore,
  'getWeightedCompatibilityScore'
);
