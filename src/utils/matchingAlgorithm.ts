import { AdvisorProfile as AdvisorProfileTypes, ConsumerProfile } from '../types/userTypes';

// Function to calculate compatibility score based on various factors
export const calculateCompatibilityScore = (
  advisorProfile: AdvisorProfileTypes,
  consumerProfile: ConsumerProfile
): number => {
  let score = 0;

  // Weighting for each factor (adjust as needed)
  const languageWeight = 0.2;
  const availabilityWeight = 0.3;
  const expertiseWeight = 0.3;
  const experienceWeight = 0.2;

  // Calculate individual factor scores
  const languageScore = matchLanguage(advisorProfile, consumerProfile);
  const availabilityScore = matchAvailability(advisorProfile, consumerProfile);
  const expertiseScore = matchExpertise(advisorProfile, consumerProfile);
  const experienceScore = matchAdvisorExperience(advisorProfile, consumerProfile);

  // Apply weights to factor scores and sum them up
  score += languageScore * languageWeight;
  score += availabilityScore * availabilityWeight;
  score += expertiseScore * expertiseWeight;
  score += experienceScore * experienceWeight;

  return score;
};

// Function to match advisor's languages with consumer's preferred languages
const matchLanguage = (advisor: AdvisorProfileTypes, consumer: ConsumerProfile): number => {
  if (!advisor.languages || !consumer.preferredLanguage) {
    return 50; // No language information, return neutral score
  }
  
  const advisorLanguages = advisor.languages;
  const consumerLanguages = consumer.preferredLanguage;
  
  // Find common languages
  const commonLanguages = advisorLanguages.filter(lang => 
    consumerLanguages.includes(lang)
  );
  
  if (commonLanguages.length === 0) {
    return 0; // No common languages
  }
  
  // Calculate match percentage based on how many of consumer's languages the advisor speaks
  return (commonLanguages.length / consumerLanguages.length) * 100;
};

// Function to match advisor's availability with consumer's preferred time
const matchAvailability = (advisorProfile: AdvisorProfileTypes, consumerProfile: ConsumerProfile): number => {
  // This is a placeholder function.  A real implementation would compare
  // the advisor's availability with the consumer's preferred time for meetings.
  // For now, it returns a random score.
  return Math.floor(Math.random() * 100);
};

// Function to match advisor's expertise with consumer's service needs
const matchExpertise = (advisorProfile: AdvisorProfileTypes, consumerProfile: ConsumerProfile): number => {
  if (!advisorProfile.expertise || !consumerProfile.serviceNeeds) {
    return 50; // No expertise information, return neutral score
  }

  const advisorExpertise = advisorProfile.expertise;
  const consumerNeeds = consumerProfile.serviceNeeds;

  // Find common expertise
  const commonExpertise = advisorExpertise.filter(expertise =>
    consumerNeeds.includes(expertise)
  );

  if (commonExpertise.length === 0) {
    return 0; // No common expertise
  }

  // Calculate match percentage based on how many of consumer's needs the advisor can meet
  return (commonExpertise.length / consumerNeeds.length) * 100;
};

// Function to match advisor's experience with consumer's preferences
const matchAdvisorExperience = (advisorProfile: AdvisorProfileTypes, consumerProfile: ConsumerProfile): number => {
  const consumerPreferences = consumerProfile.advisorPreferences;
  
  if (!consumerPreferences?.experienceLevel) {
    return 50; // No preference, return neutral score
  }
  
  const expectedExperience = consumerPreferences.experienceLevel;
  const actualExperience = advisorProfile.experience || 0;
  
  // Calculate difference percentage
  const difference = Math.abs(actualExperience - expectedExperience);
  
  if (difference === 0) {
    return 100; // Perfect match
  } else if (difference <= 2) {
    return 80; // Close match
  } else if (difference <= 5) {
    return 60; // Somewhat close
  } else {
    return 40; // Not close
  }
};
