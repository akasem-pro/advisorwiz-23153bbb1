
/**
 * Language matching algorithm
 * 
 * This module calculates compatibility scores based on language preferences.
 * It compares the languages spoken by an advisor with the preferred languages
 * of a consumer to determine how well they can communicate.
 * 
 * The algorithm prioritizes exact matches between consumer preferences and
 * advisor capabilities, with partial matches receiving proportional scores.
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
 * Edge cases handled:
 * - Empty language arrays
 * - Missing language data
 * - Capitalization and formatting differences
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

  // Normalize language strings for comparison (case-insensitive)
  const normalizedConsumerLanguages = consumer.preferredLanguage.map(
    lang => lang.toLowerCase().trim()
  );
  
  const normalizedAdvisorLanguages = advisor.languages.map(
    lang => lang.toLowerCase().trim()
  );
  
  // Find matching languages using normalized values
  const matchingLanguages = normalizedConsumerLanguages.filter(consumerLang => 
    normalizedAdvisorLanguages.some(advisorLang => advisorLang === consumerLang)
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
