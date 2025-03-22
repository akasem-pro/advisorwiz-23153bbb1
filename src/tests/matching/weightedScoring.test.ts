
import { getWeightedCompatibilityScore } from '../../services/matching/weightedScoring';
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

describe('Weighted Scoring Algorithm', () => {
  // Sample test data
  const advisorId = mockAdvisors[0]?.id || 'advisor-1';
  const consumerId = mockConsumers[0]?.id || 'consumer-1';
  const defaultPreferences = {
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: true
  };

  test('should return valid score structure', () => {
    const result = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Check structure
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('matchExplanation');
    expect(typeof result.score).toBe('number');
    expect(Array.isArray(result.matchExplanation)).toBe(true);
  });

  test('score should be within valid range (0-100)', () => {
    const result = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  test('disabling all preferences should lower score', () => {
    const withPreferences = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      defaultPreferences
    );
    
    const withoutPreferences = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      {
        prioritizeLanguage: false,
        prioritizeExpertise: false,
        prioritizeAvailability: false,
        prioritizeLocation: false
      }
    );
    
    // Without preferences, score should be lower or equal
    expect(withoutPreferences.score).toBeLessThanOrEqual(withPreferences.score);
  });

  test('excluded categories should reduce score', () => {
    const withoutExclusions = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      defaultPreferences
    );
    
    const withExclusions = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      {
        ...defaultPreferences,
        excludedCategories: ['retirement', 'tax']
      }
    );
    
    // With exclusions that match advisor expertise, score should be lower
    expect(withExclusions.score).toBeLessThanOrEqual(withoutExclusions.score);
  });
});
