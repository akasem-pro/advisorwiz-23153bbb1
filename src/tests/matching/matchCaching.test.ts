
import { getWeightedCompatibilityScore, clearCompatibilityCache } from '../../services/matching/weightedScoring';
import { calculateMatchScore, clearMatchCache } from '../../utils/matchingAlgorithm';
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';

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
    
    // Mock the calculation function to verify it's not called again
    const originalImpl = jest.requireMock('../../services/matching/weightedScoring').calculateWeightedCompatibilityScore;
    const mockFn = jest.fn();
    jest.requireMock('../../services/matching/weightedScoring').calculateWeightedCompatibilityScore = mockFn;
    
    // Second calculation, should use cache
    getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Verify that the calculation function was not called
    expect(mockFn).not.toHaveBeenCalled();
    
    // Restore original implementation
    jest.requireMock('../../services/matching/weightedScoring').calculateWeightedCompatibilityScore = originalImpl;
  });

  test('changing preferences should bypass cache', () => {
    // First calculation with default preferences
    const firstResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Second calculation with different preferences should bypass cache
    const modifiedPreferences = {
      ...defaultPreferences,
      prioritizeLocation: false,
      excludedCategories: ['tax']
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
    
    // Mock the underlying function to verify it's not called again
    const originalImpl = jest.requireMock('../../services/matching/weightedScoring').getWeightedCompatibilityScore;
    const mockFn = jest.fn();
    jest.requireMock('../../services/matching/weightedScoring').getWeightedCompatibilityScore = mockFn;
    
    // Getting explanations should use the cache from calculateMatchScore
    // This is the optimization we're testing: explanations should be retrieved from cache
    // rather than triggering a new calculation
    const explanations = getMatchExplanations(advisor, consumer);
    
    // Verify explanations were returned and the calculation was not called again
    expect(explanations.length).toBeGreaterThan(0);
    expect(mockFn).not.toHaveBeenCalled();
    
    // Restore original implementation
    jest.requireMock('../../services/matching/weightedScoring').getWeightedCompatibilityScore = originalImpl;
  });
});
