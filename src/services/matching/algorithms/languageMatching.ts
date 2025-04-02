
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
 * - Invalid data types
 * 
 * @param advisor - Advisor profile with languages array
 * @param consumer - Consumer profile with preferredLanguage array
 * @returns Score value and explanation
 */
export const calculateLanguageMatchScore = (
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null } => {
  try {
    // Input validation
    if (!advisor || !consumer) {
      console.warn("Language matching: Missing advisor or consumer profile");
      return { score: 0, explanation: null };
    }

    // Check for language match - fast path for common case
    if (!Array.isArray(consumer.preferredLanguage) || consumer.preferredLanguage.length === 0 || 
        !Array.isArray(advisor.languages) || advisor.languages.length === 0) {
      return { score: 0, explanation: null };
    }

    // Filter out any non-string values
    const consumerLanguages = consumer.preferredLanguage.filter(lang => typeof lang === 'string');
    const advisorLanguages = advisor.languages.filter(lang => typeof lang === 'string');
    
    if (consumerLanguages.length === 0 || advisorLanguages.length === 0) {
      return { score: 0, explanation: null };
    }

    // Normalize language strings for comparison (case-insensitive)
    const normalizedConsumerLanguages = consumerLanguages.map(
      lang => String(lang).toLowerCase().trim()
    );
    
    const normalizedAdvisorLanguages = advisorLanguages.map(
      lang => String(lang).toLowerCase().trim()
    );
    
    // Find matching languages using normalized values
    const matchingLanguages = normalizedConsumerLanguages.filter(consumerLang => 
      normalizedAdvisorLanguages.some(advisorLang => advisorLang === consumerLang)
    );
    
    const matchCount = matchingLanguages.length;
    
    if (matchCount === 0) {
      return { score: 0, explanation: null };
    }

    const perfectLanguageMatch = matchCount === consumerLanguages.length;
    
    if (perfectLanguageMatch) {
      return { 
        score: MATCHING_WEIGHTS.LANGUAGE,
        explanation: `Speaks all your preferred languages` 
      };
    } else {
      // Partial language match
      const partialBonus = Math.floor(MATCHING_WEIGHTS.LANGUAGE * 
        (matchCount / consumerLanguages.length));
      
      return { 
        score: partialBonus,
        explanation: partialBonus > 0 ? `Speaks ${matchCount} of your preferred languages` : null
      };
    }
  } catch (error) {
    console.error("Error in language matching calculation:", error);
    // Return safe fallback result
    return { score: 0, explanation: null };
  }
};
