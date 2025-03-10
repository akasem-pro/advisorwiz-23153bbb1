
import { 
  AdvisorProfile, 
  ConsumerProfile, 
  ServiceCategory 
} from '../../types/userTypes';

/**
 * Calculates the basic compatibility score between an advisor and consumer
 */
export const calculateBaseCompatibility = (
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): number => {
  let score = 0;
  const maxScore = 100;
  
  // 1. Match services/expertise (high importance - up to 35 points)
  if (consumer.serviceNeeds && advisor.expertise) {
    const serviceMatches = consumer.serviceNeeds.filter(service => 
      advisor.expertise.includes(service)
    );
    
    if (serviceMatches.length > 0) {
      const serviceMatchPercentage = serviceMatches.length / consumer.serviceNeeds.length;
      score += Math.round(35 * serviceMatchPercentage);
    }
  }
  
  // 2. Language match (high importance - up to 25 points)
  if (consumer.preferredLanguage && advisor.languages) {
    const languageMatches = consumer.preferredLanguage.filter(lang => 
      advisor.languages.includes(lang)
    );
    
    if (languageMatches.length > 0) {
      const languageMatchPercentage = languageMatches.length / consumer.preferredLanguage.length;
      score += Math.round(25 * languageMatchPercentage);
    }
  }
  
  // 3. Investment compatibility (medium importance - up to 20 points)
  if (consumer.investmentAmount && advisor.pricing) {
    // Check if consumer's investment amount meets advisor's minimum
    if (advisor.pricing.portfolioFee) {
      // Score based on where consumer falls within advisor's fee structure
      const averagePortfolioFee = 1.5; // Industry average (assumed)
      const feeRatio = advisor.pricing.portfolioFee / averagePortfolioFee;
      
      // Lower fees get higher scores (inverse relationship)
      if (feeRatio <= 0.7) score += 20;
      else if (feeRatio <= 1.0) score += 15;
      else if (feeRatio <= 1.3) score += 10;
      else score += 5;
    } else if (advisor.pricing.hourlyRate) {
      // Similar logic for hourly rate
      const averageHourlyRate = 200; // Industry average (assumed)
      const rateRatio = advisor.pricing.hourlyRate / averageHourlyRate;
      
      if (rateRatio <= 0.7) score += 20;
      else if (rateRatio <= 1.0) score += 15;
      else if (rateRatio <= 1.3) score += 10;
      else score += 5;
    }
  }
  
  // 4. Risk tolerance alignment (medium importance - up to 10 points)
  if (consumer.riskTolerance && advisor.expertise) {
    // Map risk tolerance to likely expertise needs
    const riskToExpertiseMap: Record<string, ServiceCategory[]> = {
      'low': ['insurance', 'estate', 'education'],
      'medium': ['retirement', 'tax', 'philanthropic'],
      'high': ['investment', 'business']
    };
    
    const recommendedExpertise = riskToExpertiseMap[consumer.riskTolerance] || [];
    const expertiseMatches = recommendedExpertise.filter(exp => 
      advisor.expertise.includes(exp)
    );
    
    if (expertiseMatches.length > 0) {
      const expertiseMatchPercentage = expertiseMatches.length / recommendedExpertise.length;
      score += Math.round(10 * expertiseMatchPercentage);
    }
  }
  
  // 5. Availability compatibility (low importance - up to 10 points)
  if (advisor.availability && advisor.availability.length > 0) {
    // Simply give points for having availability set up
    score += 10;
    
    // Future enhancement: match with consumer's preferred times
  }
  
  // Ensure score is within 0-100 range
  return Math.min(Math.max(score, 0), maxScore);
};
