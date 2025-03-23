
/**
 * Availability matching algorithm
 */
import { AdvisorProfile } from '../../../types/userTypes';
import { PREFERENCE_WEIGHTS } from '../constants/matchingWeights';

export const calculateAvailabilityScore = (advisor: AdvisorProfile): { 
  score: number; 
  explanation: string | null 
} => {
  if (!advisor.availability?.length) {
    return { score: 0, explanation: null };
  }

  // Reward advisors with more availability slots
  const availableSlots = advisor.availability.filter(slot => slot.isAvailable).length;
  
  // Cap the bonus at PREFERENCE_WEIGHTS.AVAILABILITY points
  const availabilityBonus = Math.min(availableSlots, PREFERENCE_WEIGHTS.AVAILABILITY);
  
  let explanation: string | null = null;
  
  if (availabilityBonus > 3) {
    explanation = "Highly available for appointments";
  } else if (availabilityBonus > 0) {
    explanation = "Some availability for appointments";
  }
  
  return { score: availabilityBonus, explanation };
};
