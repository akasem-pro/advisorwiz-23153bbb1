
import { AdvisorProfile, ConsumerProfile } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';
import { calculateBaseCompatibility } from './compatibility';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

/**
 * Calculates a weighted compatibility score based on user preferences
 */
export const getWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences
): number => {
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return 0;
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  
  if (preferences.prioritizeLanguage) {
    // Check for perfect language match
    const perfectLanguageMatch = consumer.preferredLanguage.every(lang => 
      advisor.languages.includes(lang)
    );
    
    if (perfectLanguageMatch) {
      weightedScore += 10;
    }
  }
  
  if (preferences.prioritizeExpertise) {
    // Check for comprehensive expertise coverage
    if (consumer.serviceNeeds) {
      const expertiseCoverage = consumer.serviceNeeds.every(service => 
        advisor.expertise.includes(service)
      );
      
      if (expertiseCoverage) {
        weightedScore += 15;
      }
    }
  }
  
  if (preferences.prioritizeAvailability && advisor.availability) {
    // Reward advisors with more availability slots
    const availabilityBonus = Math.min(advisor.availability.filter(slot => slot.isAvailable).length, 5);
    weightedScore += availabilityBonus;
  }
  
  // Filter out excluded categories
  if (preferences.excludedCategories && preferences.excludedCategories.length > 0) {
    const hasExcludedCategory = advisor.expertise.some(exp => 
      preferences.excludedCategories?.includes(exp)
    );
    
    if (hasExcludedCategory) {
      weightedScore -= 25; // Significant penalty for having excluded expertise
    }
  }
  
  // Apply minimum score threshold
  if (preferences.minimumMatchScore && weightedScore < preferences.minimumMatchScore) {
    return 0; // Below threshold, not a match
  }
  
  // Cap at 100
  return Math.min(Math.max(weightedScore, 0), 100);
};
