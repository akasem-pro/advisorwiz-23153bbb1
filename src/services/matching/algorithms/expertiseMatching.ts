
/**
 * Expertise matching algorithm
 */
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../../../types/userTypes';
import { PREFERENCE_WEIGHTS } from '../constants/matchingWeights';

export const calculateExpertiseMatchScore = (
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null } => {
  // Check for expertise match
  if (!consumer.serviceNeeds?.length || !advisor.expertise?.length) {
    return { score: 0, explanation: null };
  }

  // Calculate matching services in one pass
  const matchedServices = consumer.serviceNeeds.filter(service => 
    advisor.expertise.includes(service as any)
  );
  
  const matchCount = matchedServices.length;
  
  if (matchCount === 0) {
    return { score: 0, explanation: null };
  }

  const coverage = matchCount / consumer.serviceNeeds.length;
  const expertiseBonus = Math.floor(PREFERENCE_WEIGHTS.EXPERTISE * coverage);
  
  let explanation: string | null = null;
  
  if (coverage === 1) {
    explanation = `Expert in all your financial service needs`;
  } else if (coverage > 0.5) {
    explanation = `Expertise in most of your service needs (${matchCount} of ${consumer.serviceNeeds.length})`;
  } else if (matchCount > 0) {
    explanation = `Expertise in ${matchCount} of your ${consumer.serviceNeeds.length} service needs`;
  }
  
  return { score: expertiseBonus, explanation };
};

export const calculateRiskAlignmentScore = (
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null } => {
  // Risk tolerance alignment check
  if (!consumer.riskTolerance || !advisor.expertise?.length) {
    return { score: 0, explanation: null };
  }

  const riskToExpertiseMap: Record<string, ServiceCategory[]> = {
    'low': ['insurance', 'estate', 'education'],
    'medium': ['retirement', 'tax', 'philanthropic'],
    'high': ['investment', 'business']
  };
  
  const recommendedExpertise = riskToExpertiseMap[consumer.riskTolerance] || [];
  
  if (!recommendedExpertise.length) {
    return { score: 0, explanation: null };
  }

  const expertiseMatches = recommendedExpertise.filter(exp => 
    advisor.expertise.includes(exp as any)
  );
  
  if (expertiseMatches.length === 0) {
    return { score: 0, explanation: null };
  }

  const riskBonus = Math.min(expertiseMatches.length * 3, 10);
  
  return { 
    score: riskBonus,
    explanation: riskBonus > 5 ? `Well-aligned with your ${consumer.riskTolerance} risk tolerance` : null
  };
};

export const checkExcludedCategories = (
  advisor: AdvisorProfile,
  excludedCategories?: ServiceCategory[]
): { penalty: number; explanation: string | null } => {
  if (!excludedCategories?.length || !advisor.expertise?.length) {
    return { penalty: 0, explanation: null };
  }

  const hasExcludedCategory = advisor.expertise.some(exp => 
    excludedCategories.includes(exp as any)
  );
  
  if (hasExcludedCategory) {
    return { 
      penalty: PREFERENCE_WEIGHTS.EXCLUDED_PENALTY,
      explanation: "Contains some expertise areas you've excluded"
    };
  }
  
  return { penalty: 0, explanation: null };
};
