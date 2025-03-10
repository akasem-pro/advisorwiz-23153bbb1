
import { 
  AdvisorProfile, 
  ConsumerProfile, 
  ServiceCategory,
  Chat,
  Appointment
} from '../types/userTypes';
import { MatchPreferences } from '../context/UserContextDefinition';

// Mock data imports (these would be replaced with real data in a production environment)
import { mockAdvisors, mockConsumers } from '../data/mockUsers';

// Base compatibility calculation between advisor and consumer
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

// Get enhanced compatibility score with weighted preferences
export const getWeightedCompatibilityScore = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences
): number => {
  const advisor = mockAdvisors.find(a => a.id === advisorId);
  const consumer = mockConsumers.find(c => c.id === consumerId);
  
  if (!advisor || !consumer) return 0;
  
  // Get base compatibility score
  let baseScore = calculateBaseCompatibility(advisor, consumer);
  
  // Apply preference weights
  let weightedScore = baseScore;
  
  if (preferences.prioritizeLanguage) {
    // Check for perfect language match
    const perfectLanguageMatch = consumer.preferredLanguage.every(lang => 
      advisor.languages.includes(lang)
    );
    
    if (perfectLanguageMatch) {
      weightedScore += 10;
    }
  }
  
  if (preferences.prioritizeExpertise) {
    // Check for comprehensive expertise coverage
    if (consumer.serviceNeeds) {
      const expertiseCoverage = consumer.serviceNeeds.every(service => 
        advisor.expertise.includes(service)
      );
      
      if (expertiseCoverage) {
        weightedScore += 15;
      }
    }
  }
  
  if (preferences.prioritizeAvailability && advisor.availability) {
    // Reward advisors with more availability slots
    const availabilityBonus = Math.min(advisor.availability.filter(slot => slot.isAvailable).length, 5);
    weightedScore += availabilityBonus;
  }
  
  // Filter out excluded categories
  if (preferences.excludedCategories && preferences.excludedCategories.length > 0) {
    const hasExcludedCategory = advisor.expertise.some(exp => 
      preferences.excludedCategories?.includes(exp)
    );
    
    if (hasExcludedCategory) {
      weightedScore -= 25; // Significant penalty for having excluded expertise
    }
  }
  
  // Apply minimum score threshold
  if (preferences.minimumMatchScore && weightedScore < preferences.minimumMatchScore) {
    return 0; // Below threshold, not a match
  }
  
  // Cap at 100
  return Math.min(Math.max(weightedScore, 0), 100);
};

// Calculate compatibility between profiles
export const calculateCompatibilityBetweenProfiles = (
  userType: 'consumer' | 'advisor',
  userId: string,
  preferences: MatchPreferences,
  limit?: number
): (AdvisorProfile | ConsumerProfile)[] => {
  if (userType === 'consumer') {
    // Consumer looking for advisors
    const compatibilityScores = mockAdvisors.map(advisor => ({
      advisor,
      score: getWeightedCompatibilityScore(advisor.id, userId, preferences)
    }));
    
    // Sort by score (descending)
    const sortedResults = compatibilityScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Add compatibility score to advisor object
    const resultsWithScores = sortedResults.map(item => ({
      ...item.advisor,
      compatibilityScores: {
        ...item.advisor.compatibilityScores,
        [userId]: item.score
      }
    }));
    
    // Limit results if specified
    return limit ? resultsWithScores.slice(0, limit) : resultsWithScores;
  } else {
    // Advisor looking for consumers
    const compatibilityScores = mockConsumers.map(consumer => ({
      consumer,
      score: getWeightedCompatibilityScore(userId, consumer.id, preferences)
    }));
    
    // Sort by score (descending)
    const sortedResults = compatibilityScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Return sorted consumers
    const consumers = sortedResults.map(item => item.consumer);
    
    // Limit results if specified
    return limit ? consumers.slice(0, limit) : consumers;
  }
};

// Analyze chat and appointment history to recommend matches
export const getRecommendedProfilesBasedOnActivity = (
  userType: 'consumer' | 'advisor',
  userId: string,
  chats: Chat[],
  appointments: Appointment[],
  preferences: MatchPreferences
): (AdvisorProfile | ConsumerProfile)[] => {
  // Get user's most active contacts
  const userChats = chats.filter(chat => chat.participants.includes(userId));
  
  // Count messages per contact
  const messageCountByContact: Record<string, number> = {};
  
  userChats.forEach(chat => {
    const contactId = chat.participants.find(id => id !== userId);
    
    if (contactId) {
      // Count messages from this contact
      const messagesFromContact = chat.messages.filter(msg => msg.senderId === contactId).length;
      
      if (!messageCountByContact[contactId]) {
        messageCountByContact[contactId] = 0;
      }
      
      messageCountByContact[contactId] += messagesFromContact;
    }
  });
  
  // Get user's appointments
  const userAppointments = appointments.filter(apt => {
    if (userType === 'consumer') {
      return apt.consumerId === userId;
    } else {
      return apt.advisorId === userId;
    }
  });
  
  // Count appointments per contact
  const appointmentCountByContact: Record<string, number> = {};
  
  userAppointments.forEach(apt => {
    const contactId = userType === 'consumer' ? apt.advisorId : apt.consumerId;
    
    if (!appointmentCountByContact[contactId]) {
      appointmentCountByContact[contactId] = 0;
    }
    
    appointmentCountByContact[contactId] += 1;
  });
  
  // Combine activity scores
  const activityScores: Record<string, number> = {};
  
  // Merge all contact IDs
  const allContactIds = [
    ...Object.keys(messageCountByContact),
    ...Object.keys(appointmentCountByContact)
  ].filter((id, index, array) => array.indexOf(id) === index);
  
  allContactIds.forEach(contactId => {
    const messageScore = messageCountByContact[contactId] || 0;
    const appointmentScore = (appointmentCountByContact[contactId] || 0) * 3; // Weight appointments higher
    
    activityScores[contactId] = messageScore + appointmentScore;
  });
  
  // Get contacts with similar activity patterns
  const contactsByActivity = allContactIds
    .sort((a, b) => activityScores[b] - activityScores[a]);
  
  // Find similar profiles based on active contacts
  let recommendedProfiles: (AdvisorProfile | ConsumerProfile)[] = [];
  
  if (userType === 'consumer') {
    // If user is consumer, find advisors similar to their active advisors
    const activeAdvisors = contactsByActivity
      .map(id => mockAdvisors.find(a => a.id === id))
      .filter(Boolean) as AdvisorProfile[];
    
    if (activeAdvisors.length > 0) {
      // Get expertise from active advisors
      const commonExpertise = activeAdvisors.flatMap(a => a.expertise)
        .filter((exp, i, arr) => arr.indexOf(exp) === i);
      
      // Find other advisors with similar expertise
      recommendedProfiles = mockAdvisors
        .filter(a => !contactsByActivity.includes(a.id)) // Exclude already contacted
        .filter(a => a.expertise.some(exp => commonExpertise.includes(exp)))
        .map(advisor => ({
          ...advisor,
          // Calculate match score based on expertise overlap
          compatibilityScores: {
            ...advisor.compatibilityScores,
            [userId]: (advisor.expertise.filter(exp => commonExpertise.includes(exp)).length / 
                      commonExpertise.length) * 100
          }
        }))
        .sort((a, b) => 
          (b.compatibilityScores?.[userId] || 0) - 
          (a.compatibilityScores?.[userId] || 0)
        );
    }
  } else {
    // If user is advisor, find consumers similar to their active consumers
    const activeConsumers = contactsByActivity
      .map(id => mockConsumers.find(c => c.id === id))
      .filter(Boolean) as ConsumerProfile[];
    
    if (activeConsumers.length > 0) {
      // Get common characteristics from active consumers
      const riskTolerances = activeConsumers.map(c => c.riskTolerance);
      const mostCommonRisk = riskTolerances.sort((a, b) => 
        riskTolerances.filter(r => r === a).length - 
        riskTolerances.filter(r => r === b).length
      )[0];
      
      const commonLanguages = activeConsumers.flatMap(c => c.preferredLanguage)
        .filter((lang, i, arr) => arr.indexOf(lang) === i);
      
      // Find other consumers with similar characteristics
      recommendedProfiles = mockConsumers
        .filter(c => !contactsByActivity.includes(c.id)) // Exclude already contacted
        .filter(c => c.riskTolerance === mostCommonRisk || 
                     c.preferredLanguage.some(lang => commonLanguages.includes(lang)))
        .sort((a, b) => {
          // Score based on similarity to active consumers
          const aScore = (a.riskTolerance === mostCommonRisk ? 50 : 0) + 
                         (a.preferredLanguage.filter(lang => commonLanguages.includes(lang)).length * 10);
          
          const bScore = (b.riskTolerance === mostCommonRisk ? 50 : 0) + 
                         (b.preferredLanguage.filter(lang => commonLanguages.includes(lang)).length * 10);
          
          return bScore - aScore;
        });
    }
  }
  
  return recommendedProfiles.slice(0, 5); // Return top 5 recommendations
};
