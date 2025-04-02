
/**
 * Availability matching algorithm with improved edge case handling
 */
import { AdvisorProfile } from '../../../types/userTypes';
import { PREFERENCE_WEIGHTS } from '../constants/matchingWeights';

/**
 * Calculates a score based on advisor availability
 * Optimized for edge cases and defensive coding
 * 
 * @param advisor - The advisor profile to evaluate
 * @returns Object containing score and explanation
 */
export const calculateAvailabilityScore = (advisor: AdvisorProfile | null | undefined): { 
  score: number; 
  explanation: string | null 
} => {
  // Handle null/undefined advisor profiles
  if (!advisor) {
    return { 
      score: 0, 
      explanation: "No advisor data available" 
    };
  }

  // Handle missing availability data
  if (!advisor.availability || !Array.isArray(advisor.availability)) {
    return { 
      score: 0, 
      explanation: "No availability information" 
    };
  }

  // For empty arrays, return early
  if (advisor.availability.length === 0) {
    return { 
      score: 0, 
      explanation: "No availability slots defined" 
    };
  }

  // Safely count available slots with type checking
  const availableSlots = advisor.availability.filter(slot => {
    // Defensive check to ensure slot exists and has isAvailable property
    return slot && typeof slot === 'object' && slot.isAvailable === true;
  }).length;
  
  // Calculate bonus with upper limit
  const availabilityBonus = Math.min(
    availableSlots, 
    PREFERENCE_WEIGHTS.AVAILABILITY || 5
  );
  
  // Generate appropriate explanation
  let explanation: string | null = null;
  
  if (availabilityBonus > 3) {
    explanation = "Highly available for appointments";
  } else if (availabilityBonus > 0) {
    explanation = "Some availability for appointments";
  } else {
    explanation = "Limited or no availability";
  }
  
  return { 
    score: Math.max(0, availabilityBonus), // Ensure score is never negative
    explanation 
  };
};

/**
 * Calculate availability match percentage between advisor and consumer preferred times
 * New helper function to determine time overlap quality
 * 
 * @param advisorAvailability - Advisor's available time slots
 * @param consumerPreferredTimes - Consumer's preferred time slots
 * @returns Percentage of match (0-100)
 */
export const calculateTimeOverlapScore = (
  advisorAvailability: any[] = [], 
  consumerPreferredTimes: any[] = []
): number => {
  // Handle edge cases
  if (!Array.isArray(advisorAvailability) || 
      !Array.isArray(consumerPreferredTimes) || 
      advisorAvailability.length === 0 || 
      consumerPreferredTimes.length === 0) {
    return 0;
  }
  
  let matchCount = 0;
  let totalPreferences = consumerPreferredTimes.length;
  
  // Count how many consumer preferred times match advisor availability
  for (const preferredTime of consumerPreferredTimes) {
    const hasMatch = advisorAvailability.some(slot => {
      // Safe comparison with defensive checks
      try {
        // Compare dates and times (implementation depends on your data structure)
        // This is a simplified example
        if (slot?.day === preferredTime?.day && 
            slot?.timeSlot === preferredTime?.timeSlot && 
            slot?.isAvailable === true) {
          return true;
        }
        return false;
      } catch (err) {
        console.warn('Error comparing time slots:', err);
        return false;
      }
    });
    
    if (hasMatch) {
      matchCount++;
    }
  }
  
  // Calculate percentage with safeguards against division by zero
  return totalPreferences > 0 ? Math.round((matchCount / totalPreferences) * 100) : 0;
};
