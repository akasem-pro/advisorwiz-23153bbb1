
import { AdvisorProfile, ConsumerProfile, ServiceCategory } from '../context/UserContext';

// Define weights for different matching criteria
const MATCHING_WEIGHTS = {
  serviceNeed: 0.4,      // Highest priority - matching service needs with expertise
  language: 0.25,        // High priority - communication is important
  timeline: 0.15,        // Medium priority - when the consumer wants to start
  investmentMatch: 0.2,  // Medium priority - investment amount and advisor's minimum
};

// Risk tolerance mapping
const RISK_TOLERANCE_MAP = {
  low: ['retirement', 'education', 'estate'],
  medium: ['tax', 'retirement', 'investment', 'insurance'],
  high: ['investment', 'business', 'philanthropic']
};

// Timeline preference mapping to advisor experience
const TIMELINE_PREFERENCE = {
  immediately: 10,       // Higher experience better for immediate needs
  next_3_months: 7,      // Moderate experience for 3-month timeline
  next_6_months: 5,      // Less experience needed for 6-month timeline
  not_sure: 0            // Any experience level for uncertain timelines
};

/**
 * Calculate compatibility score between consumer and advisor
 * @param consumer Consumer profile
 * @param advisor Advisor profile
 * @returns Score between 0-100
 */
export const calculateCompatibilityScore = (
  consumer: ConsumerProfile,
  advisor: AdvisorProfile
): number => {
  let score = 0;
  
  // 1. Service/Expertise Match - checks if advisor's expertise aligns with risk profile
  const serviceScore = calculateServiceMatch(consumer.riskTolerance, advisor.expertise);
  score += serviceScore * MATCHING_WEIGHTS.serviceNeed;
  
  // 2. Language Match
  const languageScore = calculateLanguageMatch(
    consumer.preferredLanguage, 
    advisor.languages
  );
  score += languageScore * MATCHING_WEIGHTS.language;
  
  // 3. Timeline Match - based on consumer's timeline and advisor's experience
  const timelineScore = calculateTimelineMatch(
    consumer.startTimeline, 
    advisor.yearsOfExperience ? parseInt(advisor.yearsOfExperience) : 5 // Default to 5 if not specified
  );
  score += timelineScore * MATCHING_WEIGHTS.timeline;
  
  // 4. Investment Match - check if consumer's assets meet advisor's minimums
  const investmentScore = calculateInvestmentMatch(
    consumer.investableAssets,
    advisor.minimumInvestment || 0
  );
  score += investmentScore * MATCHING_WEIGHTS.investmentMatch;
  
  // Return final score on a scale of 0-100
  return Math.round(score * 100);
};

/**
 * Calculate service match based on risk tolerance and advisor expertise
 */
const calculateServiceMatch = (
  riskTolerance: 'low' | 'medium' | 'high',
  expertise: ServiceCategory[]
): number => {
  if (!expertise.length) return 0;
  
  // Get recommended services based on risk tolerance
  const recommendedServices = RISK_TOLERANCE_MAP[riskTolerance] || [];
  
  // Count matching services
  const matchingServices = recommendedServices.filter(service => 
    expertise.includes(service as ServiceCategory)
  );
  
  return matchingServices.length / Math.max(recommendedServices.length, 1);
};

/**
 * Calculate language match between consumer and advisor
 */
const calculateLanguageMatch = (
  consumerLanguages: string[],
  advisorLanguages: string[]
): number => {
  if (!consumerLanguages.length || !advisorLanguages.length) return 0;
  
  // Check for common languages
  const commonLanguages = consumerLanguages.filter(lang => 
    advisorLanguages.includes(lang)
  );
  
  return commonLanguages.length > 0 ? 1 : 0; // Full score if any language matches
};

/**
 * Calculate match based on consumer timeline and advisor experience
 */
const calculateTimelineMatch = (
  timeline: 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' | null,
  yearsOfExperience: number
): number => {
  if (!timeline) return 0.5; // Neutral score if timeline not specified
  
  const requiredExperience = TIMELINE_PREFERENCE[timeline];
  
  // For immediate needs, more experience is better
  if (timeline === 'immediately') {
    return Math.min(yearsOfExperience / requiredExperience, 1);
  }
  
  // For other timelines, closer to the preferred experience is better
  const difference = Math.abs(yearsOfExperience - requiredExperience);
  return Math.max(0, 1 - (difference / 10)); // Scale from 0-1
};

/**
 * Calculate investment match based on consumer assets and advisor minimums
 */
const calculateInvestmentMatch = (
  consumerAssets: number,
  advisorMinimum: number
): number => {
  if (advisorMinimum === 0) return 1; // No minimum requirement
  
  // Check if consumer meets minimum requirements
  if (consumerAssets >= advisorMinimum) {
    // Calculate how much above minimum (up to 2x for full score)
    const ratio = Math.min(consumerAssets / advisorMinimum, 2);
    return 0.5 + (ratio / 4); // Scale from 0.5 to 1.0
  }
  
  // Below minimum, score based on how close
  return Math.max(0, consumerAssets / advisorMinimum);
};

/**
 * Get top matching advisors for a consumer
 * @param consumer Consumer profile
 * @param advisors List of all advisors
 * @param limit Maximum number of matches to return
 * @returns Sorted list of advisors with compatibility scores
 */
export const getTopAdvisorMatches = (
  consumer: ConsumerProfile,
  advisors: AdvisorProfile[],
  limit: number = 5
): { advisor: AdvisorProfile, score: number }[] => {
  // Calculate scores for all advisors
  const advisorScores = advisors.map(advisor => ({
    advisor,
    score: calculateCompatibilityScore(consumer, advisor)
  }));
  
  // Sort by score descending and limit results
  return advisorScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Get top matching consumers for an advisor
 * @param advisor Advisor profile
 * @param consumers List of all consumers
 * @param limit Maximum number of matches to return
 * @returns Sorted list of consumers with compatibility scores
 */
export const getTopConsumerMatches = (
  advisor: AdvisorProfile,
  consumers: ConsumerProfile[],
  limit: number = 5
): { consumer: ConsumerProfile, score: number }[] => {
  // Calculate scores for all consumers
  const consumerScores = consumers.map(consumer => ({
    consumer,
    score: calculateCompatibilityScore(consumer, advisor)
  }));
  
  // Sort by score descending and limit results
  return consumerScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Generate match suggestions for a user (either consumer or advisor)
 * @param userType Type of user requesting matches
 * @param userId ID of the user
 * @param advisors All available advisors
 * @param consumers All available consumers
 * @returns Array of match suggestions with scores
 */
export const generateMatchSuggestions = (
  userType: 'consumer' | 'advisor',
  userId: string,
  advisors: AdvisorProfile[],
  consumers: ConsumerProfile[]
): { id: string, name: string, score: number }[] => {
  
  if (userType === 'consumer') {
    const consumer = consumers.find(c => c.id === userId);
    if (!consumer) return [];
    
    return getTopAdvisorMatches(consumer, advisors)
      .map(({ advisor, score }) => ({
        id: advisor.id,
        name: advisor.name,
        score
      }));
  } else {
    const advisor = advisors.find(a => a.id === userId);
    if (!advisor) return [];
    
    return getTopConsumerMatches(advisor, consumers)
      .map(({ consumer, score }) => ({
        id: consumer.id,
        name: consumer.name,
        score
      }));
  }
};
