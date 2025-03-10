
import { ConsumerProfile, AdvisorProfile, ServiceCategory } from '../context/UserContext';
import { ExtendedAdvisorProfileForm } from '../types/advisorTypes';

type MatchResult = {
  advisorId: string;
  consumerId: string;
  score: number;
  matchFactors: {
    servicesMatch: number;
    languageMatch: number;
    timelineMatch: number;
    investmentMatch: number;
    experienceMatch: number;
  };
};

export function calculateMatchScore(
  advisor: AdvisorProfile | ExtendedAdvisorProfileForm,
  consumer: ConsumerProfile
): MatchResult {
  let score = 0;
  let maxPossibleScore = 100;
  
  // Initialize all match factors to 0
  const matchFactors = {
    servicesMatch: 0,
    languageMatch: 0,
    timelineMatch: 0,
    investmentMatch: 0,
    experienceMatch: 0
  };
  
  // Weight for each factor
  const weights = {
    services: 35,
    language: 20,
    timeline: 15,
    investment: 20,
    experience: 10
  };
  
  // 1. Services match (35% of score)
  // For each service that the consumer needs and the advisor offers, add points
  if (consumer.preferredLanguage && advisor.expertise) {
    const consumerNeeds = getConsumerNeeds(consumer);
    const matchedServices = advisor.expertise.filter(service => 
      consumerNeeds.includes(service)
    );
    
    const serviceMatchPercentage = matchedServices.length / consumerNeeds.length;
    matchFactors.servicesMatch = serviceMatchPercentage * weights.services;
    score += matchFactors.servicesMatch;
  }
  
  // 2. Language match (20% of score)
  if (consumer.preferredLanguage && advisor.languages) {
    const languageMatch = consumer.preferredLanguage.some(lang => 
      advisor.languages.includes(lang)
    );
    
    if (languageMatch) {
      matchFactors.languageMatch = weights.language;
      score += weights.language;
    }
  }
  
  // 3. Experience match (10% of score)
  if ('yearsOfExperience' in advisor) { 
    const experienceLevel = getExperienceLevel(advisor.yearsOfExperience);
    matchFactors.experienceMatch = experienceLevel * weights.experience;
    score += matchFactors.experienceMatch;
  }
  
  // 4. Investment match (20% of score)
  if ('minimumInvestment' in advisor && advisor.minimumInvestment !== null && consumer.investableAssets) {
    if (consumer.investableAssets >= advisor.minimumInvestment) {
      matchFactors.investmentMatch = weights.investment;
      score += weights.investment;
    } else {
      // Partial match if close to minimum
      const ratio = consumer.investableAssets / advisor.minimumInvestment;
      if (ratio > 0.7) {
        matchFactors.investmentMatch = weights.investment * 0.7;
        score += matchFactors.investmentMatch;
      }
    }
  } else {
    // No minimum investment requirement, give full score
    matchFactors.investmentMatch = weights.investment;
    score += weights.investment;
  }
  
  // 5. Timeline match (15% of score)
  if (consumer.startTimeline) {
    // Advisors who are ready for any timeline get full score
    matchFactors.timelineMatch = weights.timeline;
    score += weights.timeline;
    
    // Could be expanded to match specific timeline preferences
  }
  
  // Ensure score is between 0-100
  score = Math.min(100, Math.max(0, score));
  
  return {
    advisorId: advisor.id,
    consumerId: consumer.id,
    score,
    matchFactors
  };
}

// Helper function to determine what services a consumer might need based on their profile
function getConsumerNeeds(consumer: ConsumerProfile): ServiceCategory[] {
  const needs: ServiceCategory[] = [];
  
  // Logic to determine needs based on consumer profile
  if (consumer.age > 50) {
    needs.push('retirement');
    needs.push('estate');
  }
  
  if (consumer.investableAssets > 500000) {
    needs.push('investment');
    needs.push('tax');
  }
  
  if (consumer.investableAssets > 1000000) {
    needs.push('philanthropic');
  }
  
  // Default to at least need investment help
  if (needs.length === 0) {
    needs.push('investment');
  }
  
  return needs;
}

// Helper function to convert experience string to numeric score between 0-1
function getExperienceLevel(experience: string): number {
  switch (experience) {
    case 'less_than_1':
      return 0.25;
    case '1_to_5':
      return 0.5;
    case '5_to_10':
      return 0.75;
    case '10_plus':
      return 1;
    default:
      return 0.5; // Default to middle experience
  }
}

// Function to find the best matches for a consumer from a list of advisors
export function findBestMatches(
  consumer: ConsumerProfile,
  advisors: (AdvisorProfile | ExtendedAdvisorProfileForm)[],
  limit: number = 5
): MatchResult[] {
  const matches = advisors.map(advisor => calculateMatchScore(advisor, consumer));
  
  // Sort by score descending
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Function to update compatibility scores for an advisor
export function updateAdvisorCompatibilityScores(
  advisor: ExtendedAdvisorProfileForm,
  consumers: ConsumerProfile[]
): Record<string, number> {
  const compatibilityScores: Record<string, number> = {};
  
  for (const consumer of consumers) {
    const match = calculateMatchScore(advisor, consumer);
    compatibilityScores[consumer.id] = match.score;
  }
  
  return compatibilityScores;
}
