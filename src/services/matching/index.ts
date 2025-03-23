
// Export all matching algorithms from a single entry point
export { calculateBaseCompatibility } from './compatibility';
export { 
  getWeightedCompatibilityScore,
  clearCompatibilityCache,
  getCompatibilityCacheStats 
} from './weightedScoring';
export { calculateCompatibilityBetweenProfiles } from './profileMatching';
export { getRecommendedProfilesBasedOnActivity } from './activityRecommendations';

// Export algorithm components for detailed access
export * from './algorithms/languageMatching';
export * from './algorithms/expertiseMatching';
export * from './algorithms/availabilityMatching';
export * from './algorithms/callInteractionScoring';
