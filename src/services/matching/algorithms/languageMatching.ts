
/**
 * Language matching algorithm
 */
import { AdvisorProfile, ConsumerProfile } from '../../../types/userTypes';
import { PREFERENCE_WEIGHTS } from '../constants/matchingWeights';

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
      score: PREFERENCE_WEIGHTS.LANGUAGE,
      explanation: `Speaks all your preferred languages` 
    };
  } else {
    // Partial language match
    const partialBonus = Math.floor(PREFERENCE_WEIGHTS.LANGUAGE * 
      (matchCount / consumer.preferredLanguage.length));
    
    return { 
      score: partialBonus,
      explanation: partialBonus > 0 ? `Speaks ${matchCount} of your preferred languages` : null
    };
  }
};
