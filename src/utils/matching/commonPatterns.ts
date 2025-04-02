
/**
 * Common Matching Algorithm Patterns
 * 
 * This utility provides reusable functions for matching algorithms
 * to avoid code duplication across different hooks and services.
 */

import { ServiceCategory } from '../../types/userTypes';
import { MatchPreferences } from '../../context/UserContextDefinition';

/**
 * Calculate an overlap score between two arrays
 * 
 * @template T - The type of elements in the arrays
 * @param {T[]} array1 - First array to compare
 * @param {T[]} array2 - Second array to compare
 * @param {number} [weight=1.0] - Weight to apply to the score
 * @returns {number} Normalized score between 0-100
 */
export const calculateOverlapScore = <T>(
  array1: T[] | undefined | null,
  array2: T[] | undefined | null,
  weight: number = 1.0
): number => {
  // Handle edge cases
  if (!array1 || !array2 || array1.length === 0 || array2.length === 0) {
    return 0;
  }

  // Count matches
  const matches = array1.filter(item => array2.includes(item)).length;
  
  // Calculate score as percentage of smaller array that matches
  const score = (matches / Math.min(array1.length, array2.length)) * 100;
  
  // Apply weight
  return Math.min(100, score * weight);
};

/**
 * Calculate language compatibility score
 * 
 * @param {string[]} advisorLanguages - Languages the advisor speaks
 * @param {string[]} consumerLanguages - Languages the consumer prefers
 * @param {number} [weight=1.0] - Weight to apply to the score
 * @returns {number} Language compatibility score (0-100)
 */
export const calculateLanguageScore = (
  advisorLanguages: string[] | undefined | null,
  consumerLanguages: string[] | undefined | null,
  weight: number = 1.0
): number => {
  return calculateOverlapScore(advisorLanguages, consumerLanguages, weight);
};

/**
 * Calculate expertise compatibility score
 * 
 * @param {ServiceCategory[]} advisorExpertise - Advisor's areas of expertise
 * @param {ServiceCategory[]} consumerNeeds - Consumer's service needs
 * @param {ServiceCategory[]} [excludedCategories] - Categories to exclude from matching
 * @param {number} [weight=1.0] - Weight to apply to the score
 * @returns {number} Expertise compatibility score (0-100)
 */
export const calculateExpertiseScore = (
  advisorExpertise: ServiceCategory[] | undefined | null,
  consumerNeeds: ServiceCategory[] | undefined | null,
  excludedCategories?: ServiceCategory[],
  weight: number = 1.0
): number => {
  // Handle edge cases
  if (!advisorExpertise || !consumerNeeds || advisorExpertise.length === 0 || consumerNeeds.length === 0) {
    return 0;
  }
  
  // Filter out excluded categories
  let filteredExpertise = advisorExpertise;
  let filteredNeeds = consumerNeeds;
  
  if (excludedCategories && excludedCategories.length > 0) {
    filteredExpertise = advisorExpertise.filter(exp => !excludedCategories.includes(exp));
    filteredNeeds = consumerNeeds.filter(need => !excludedCategories.includes(need));
    
    // If all categories are excluded, return 0
    if (filteredExpertise.length === 0 || filteredNeeds.length === 0) {
      return 0;
    }
  }
  
  return calculateOverlapScore(filteredExpertise, filteredNeeds, weight);
};

/**
 * Create a stable cache key for compatibility calculations
 * 
 * @param {string} advisorId - Advisor's unique ID
 * @param {string} consumerId - Consumer's unique ID
 * @param {MatchPreferences} preferences - Matching preferences
 * @returns {string} A consistent cache key
 */
export const createCompatibilityCacheKey = (
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences
): string => {
  // Sort preference keys to ensure consistent ordering
  const prefsString = JSON.stringify(
    preferences, 
    Object.keys(preferences).sort()
  );
  
  return `${advisorId}-${consumerId}-${prefsString}`;
};

/**
 * Apply weight factors to a raw score
 * 
 * @param {number} rawScore - The original score (0-100)
 * @param {number} weight - The weight to apply (0-100)
 * @returns {number} The weighted score
 */
export const applyWeightFactor = (rawScore: number, weight: number): number => {
  if (weight === 0) return 0;
  if (weight === 100) return rawScore;
  
  // Normalize weight to 0-1 range and apply
  const normalizedWeight = weight / 100;
  return rawScore * normalizedWeight;
};

/**
 * Get a human-readable explanation for a match score
 * 
 * @param {string} category - The matching category (language, expertise, etc.)
 * @param {number} score - The score value
 * @param {number} weight - The weight applied
 * @returns {string} Human-readable explanation
 */
export const getMatchExplanation = (
  category: string, 
  score: number, 
  weight: number
): string => {
  const weightedScore = applyWeightFactor(score, weight);
  
  if (weightedScore >= 80) {
    return `Strong ${category} match (${Math.round(weightedScore)}%)`;
  } else if (weightedScore >= 50) {
    return `Good ${category} compatibility (${Math.round(weightedScore)}%)`;
  } else if (weightedScore >= 20) {
    return `Partial ${category} alignment (${Math.round(weightedScore)}%)`;
  } else if (weightedScore > 0) {
    return `Minimal ${category} overlap (${Math.round(weightedScore)}%)`;
  } else {
    return `No ${category} compatibility (0%)`;
  }
};
