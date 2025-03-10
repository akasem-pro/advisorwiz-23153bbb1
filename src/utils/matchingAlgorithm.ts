
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { ExtendedAdvisorProfileForm, MatchScoreRange, getMatchCategory } from '../types/advisorTypes';

// Helper function that takes either AdvisorProfile or ExtendedAdvisorProfileForm
type AdvisorProfileTypes = AdvisorProfile | ExtendedAdvisorProfileForm;

// Function to calculate match score between advisor and consumer
export const calculateMatchScore = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): number => {
  if (!advisor || !consumer) return 0;

  let score = 0;
  let maxScore = 0;

  // Match service needs - heavily weighted
  if (advisor.expertise && consumer.serviceNeeds) {
    const matchingServices = advisor.expertise.filter(service => 
      consumer.serviceNeeds?.includes(service as ServiceCategory)
    );
    
    maxScore += 40;
    if (matchingServices.length > 0) {
      // Score based on percentage of consumer needs met
      score += (matchingServices.length / consumer.serviceNeeds.length) * 40;
    }
  }

  // Match language preferences - medium weight
  if (advisor.languages && consumer.languages) {
    const matchingLanguages = advisor.languages.filter(lang => 
      consumer.languages?.includes(lang)
    );
    
    maxScore += 20;
    if (matchingLanguages.length > 0) {
      score += (matchingLanguages.length / consumer.languages.length) * 20;
    }
  }

  // Match investment expectations with advisor minimum - medium weight
  if (consumer.investmentAmount && 'minimumInvestment' in advisor && advisor.minimumInvestment !== null) {
    maxScore += 20;
    if (consumer.investmentAmount >= advisor.minimumInvestment) {
      score += 20;
    }
  }

  // Consider experience level - low weight
  if ('yearsOfExperience' in advisor && consumer.advisorPreferences?.experienceLevel) {
    maxScore += 10;
    
    // Simple mapping of experience levels to scores
    if (consumer.advisorPreferences.experienceLevel === 'experienced' && 
        (advisor.yearsOfExperience === '5_to_10' || advisor.yearsOfExperience === '10_plus')) {
      score += 10;
    } else if (consumer.advisorPreferences.experienceLevel === 'mid_level' && 
               advisor.yearsOfExperience === '1_to_5') {
      score += 10;
    } else if (consumer.advisorPreferences.experienceLevel === 'any') {
      score += 7; // Partial credit for any experience level
    }
  }

  // If maxScore is 0 (no matching criteria), return 0
  if (maxScore === 0) return 0;

  // Normalize score to percentage (0-100)
  const normalizedScore = (score / maxScore) * 100;
  return Math.round(normalizedScore);
};

// Function to categorize matches into different buckets
export const categorizeMatches = (advisors: AdvisorProfileTypes[], consumer: ConsumerProfile) => {
  const matches: Record<string, { advisor: AdvisorProfileTypes; score: number }[]> = {
    excellent: [],
    good: [],
    average: [],
    poor: []
  };

  advisors.forEach(advisor => {
    const score = calculateMatchScore(advisor, consumer);
    const category = getMatchCategory(score);
    matches[category.category].push({ advisor, score });
  });

  // Sort each category by score (highest first)
  Object.keys(matches).forEach(key => {
    matches[key] = matches[key].sort((a, b) => b.score - a.score);
  });

  return matches;
};

// Generate compatibility scores for an advisor with multiple consumers
export const generateCompatibilityScores = (advisor: AdvisorProfileTypes, consumers: ConsumerProfile[]) => {
  const scores: Record<string, number> = {};
  
  consumers.forEach(consumer => {
    if (consumer.id) {
      scores[consumer.id] = calculateMatchScore(advisor, consumer);
    }
  });
  
  return scores;
};
