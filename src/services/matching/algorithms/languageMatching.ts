
/**
 * Language matching algorithm
 * 
 * This module calculates compatibility scores based on language preferences.
 * It compares the languages spoken by an advisor with the preferred languages
 * of a consumer to determine how well they can communicate.
 */
import { AdvisorProfile, ConsumerProfile } from '../../../types/userTypes';
import { MATCHING_WEIGHTS } from '../config/matchingConfig';

/**
 * Calculate language match score between advisor and consumer
 * 
 * Scoring logic:
 * - Perfect match: Advisor speaks all languages preferred by consumer (full points)
 * - Partial match: Points awarded proportionally to matched languages
 * - No match: Zero points
 * 
 * @param advisor - Advisor profile with languages array
 * @param consumer - Consumer profile with preferredLanguage array
 * @returns Score value and explanation
 */
export const calculateLanguageMatchScore = (
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null } => {
  // Check for language match - fast path for common case
  if (!consumer.preferredLanguage?.length || !advisor.languages?.length) {
    return { score: 0, explanation: null };
  }

  const matchingLanguages = consumer.preferredLanguage.filter(lang => 
    advisor.languages.includes(lang)
  );
  
  const matchCount = matchingLanguages.length;
  
  if (matchCount === 0) {
    return { score: 0, explanation: null };
  }

  const perfectLanguageMatch = matchCount === consumer.preferredLanguage.length;
  
  if (perfectLanguageMatch) {
    return { 
      score: MATCHING_WEIGHTS.LANGUAGE,
      explanation: `Speaks all your preferred languages` 
    };
  } else {
    // Partial language match
    const partialBonus = Math.floor(MATCHING_WEIGHTS.LANGUAGE * 
      (matchCount / consumer.preferredLanguage.length));
    
    return { 
      score: partialBonus,
      explanation: partialBonus > 0 ? `Speaks ${matchCount} of your preferred languages` : null
    };
  }
};
