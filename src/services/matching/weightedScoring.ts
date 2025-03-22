
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { calculateBaseCompatibility } from './compatibility';

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
  }
};

/**
 * Calculates a weighted compatibility score based on user preferences and historical interaction data
 */
export const getWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: any[]
): number => {
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return 0;
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  
  // 1. Language preference weighting
  if (preferences.prioritizeLanguage) {
    // Check for perfect language match
    const perfectLanguageMatch = consumer.preferredLanguage.every(lang => 
      advisor.languages.includes(lang)
    );
    
    if (perfectLanguageMatch) {
      weightedScore += PREFERENCE_WEIGHTS.LANGUAGE;
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
  }
  
  // 4. Location preference weighting
  if (preferences.prioritizeLocation) {
    // Using optional chaining to safely check location properties
    // Check region match if both have region property
    const regionMatch = advisor.region === consumer.region;
    if (regionMatch) {
      weightedScore += 8; // Medium bonus for region match
    }
    
    // Check city match if both have city property
    const cityMatch = advisor.city === consumer.city;
    if (cityMatch) {
      weightedScore += 12; // Additional bonus for exact city match
    }
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
        
      weightedScore += callCountBonus + durationBonus + completionRateBonus;
    }
  }
  
  // 6. Filter out excluded categories
  if (preferences.excludedCategories && preferences.excludedCategories.length > 0) {
    const hasExcludedCategory = advisor.expertise.some(exp => 
      preferences.excludedCategories?.includes(exp)
    );
    
    if (hasExcludedCategory) {
      weightedScore -= PREFERENCE_WEIGHTS.EXCLUDED_PENALTY; // Significant penalty for having excluded expertise
    }
  }
  
  // Apply minimum score threshold
  if (preferences.minimumMatchScore && weightedScore < preferences.minimumMatchScore) {
    return 0; // Below threshold, not a match
  }
  
  // Cap at 100
  return Math.min(Math.max(weightedScore, 0), 100);
};
