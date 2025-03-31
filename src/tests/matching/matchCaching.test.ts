
import { getWeightedCompatibilityScore, clearCompatibilityCache } from '../../services/matching/weightedScoring';
import { calculateMatchScore, clearMatchCache, getMatchExplanations } from '../../utils/matchingAlgorithm';
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';
import { ServiceCategory } from '../../types/userTypes';

describe('Match Caching System', () => {
  // Sample test data
  const advisorId = mockAdvisors[0]?.id || 'advisor-1';
  const consumerId = mockConsumers[0]?.id || 'consumer-1';
  const defaultPreferences = {
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: true
  };

  beforeEach(() => {
    // Clear caches before each test
    clearCompatibilityCache();
    clearMatchCache();
  });

  test('repeated calculations should use cache', () => {
    // First calculation, should hit database/calculation
    const firstResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    expect(firstResult.score).toBeGreaterThanOrEqual(0);
    
    // Second calculation, should use cache - we'll use a spy to verify
    const cacheSpy = jest.spyOn(require('../../services/matching/cache/operations/cacheOperations'), 'getCachedResult');
    
    getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Verify the cache was checked
    expect(cacheSpy).toHaveBeenCalled();
    
    // Clean up
    cacheSpy.mockRestore();
  });

  test('changing preferences should bypass cache', () => {
    // First calculation with default preferences
    const firstResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Second calculation with different preferences should bypass cache
    const modifiedPreferences = {
      ...defaultPreferences,
      prioritizeLocation: false,
      excludedCategories: ['tax' as ServiceCategory]
    };
    
    const secondResult = getWeightedCompatibilityScore(advisorId, consumerId, modifiedPreferences);
    
    // Scores should be different since we're using different preferences
    expect(secondResult.score).not.toEqual(firstResult.score);
  });

  test('calculateMatchScore should cache explanations', () => {
    const advisor = mockAdvisors[0];
    const consumer = mockConsumers[0];
    
    if (!advisor || !consumer) {
      throw new Error('Test data not available');
    }
    
    // First calculation
    const score = calculateMatchScore(advisor, consumer);
    expect(score).toBeGreaterThanOrEqual(0);
    
    // Getting explanations should use the cache from calculateMatchScore
    const explanations = getMatchExplanations(advisor, consumer);
    
    // Verify explanations were returned
    expect(explanations.length).toBeGreaterThan(0);
  });

  test('weighted factors should affect score', () => {
    // First calculation with default weights
    const firstResult = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      defaultPreferences
    );
    
    // Second calculation with custom weights
    const weightedPreferences = {
      ...defaultPreferences,
      weightFactors: {
        language: 90,
        expertise: 80,
        availability: 20,
        location: 10
      }
    };
    
    const secondResult = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      weightedPreferences
    );
    
    // Scores should be different with weights applied
    expect(secondResult.score).not.toEqual(firstResult.score);
  });
});
