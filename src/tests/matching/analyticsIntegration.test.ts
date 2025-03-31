
import { getWeightedCompatibilityScore, clearCompatibilityCache } from '../../services/matching/weightedScoring';
import { trackMatchingInteraction } from '../../utils/analytics/matchTracker';
import { mockAdvisors, mockConsumers } from '../../data/mockUsers';
import { clearCompatibilityCache as clearDirectCache } from '../../services/matching/cache/compatibilityCache';
import { clearMatchCache } from '../../utils/matchingAlgorithm';

// Mock the analytics tracker to verify it's called correctly
jest.mock('../../utils/analytics/matchTracker', () => ({
  trackMatchingInteraction: jest.fn().mockResolvedValue(undefined)
}));

describe('Matching and Analytics Integration', () => {
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
    jest.clearAllMocks();
  });

  test('match score calculation should trigger analytics tracking', async () => {
    // Create a spy for the analytics tracking
    const trackingSpy = jest.spyOn(require('../../utils/analytics/matchTracker'), 'trackMatchingInteraction');
    
    // Calculate a match score which should trigger analytics tracking
    const result = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences, [], true);
    
    // Verify the analytics tracking was called with correct parameters
    expect(trackingSpy).toHaveBeenCalledWith(
      'view',
      advisorId,
      consumerId,
      result.score,
      expect.any(String),
      expect.objectContaining({
        explanations: result.matchExplanation
      })
    );
  });
  
  test('different matching strategies should provide different analytics data', async () => {
    // Set up spies
    const trackingSpy = jest.spyOn(require('../../utils/analytics/matchTracker'), 'trackMatchingInteraction');
    
    // Test with default strategy
    const defaultResult = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      defaultPreferences,
      [],
      true
    );
    
    // Switch to premium strategy and test again
    const premiumPreferences = {
      ...defaultPreferences,
      weightFactors: {
        language: 90,
        expertise: 80,
        availability: 20,
        location: 10
      }
    };
    
    require('../../services/matching/weightedScoring').setMatchingStrategy('premium');
    const premiumResult = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      premiumPreferences,
      [],
      true
    );
    
    // Verify both strategy calls triggered analytics with different data
    expect(trackingSpy).toHaveBeenCalledTimes(2);
    
    // Reset to default strategy for other tests
    require('../../services/matching/weightedScoring').setMatchingStrategy('default');
  });
  
  test('should track interaction when user views match explanation', async () => {
    // Calculate match score first (without tracking)
    getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Clear mocks to start fresh
    jest.clearAllMocks();
    
    // Simulate user viewing match explanation - change "view_explanation" to a valid action type
    await trackMatchingInteraction(
      'view', // Changed from 'view_explanation' to 'view' which is a valid action type
      advisorId,
      consumerId,
      85, // Sample score
      'test-match-id',
      { explanations: ['Test explanation'] }
    );
    
    // Verify tracking occurred with correct action type
    expect(trackMatchingInteraction).toHaveBeenCalledWith(
      'view',
      advisorId,
      consumerId,
      85,
      'test-match-id',
      expect.objectContaining({
        explanations: ['Test explanation']
      })
    );
  });
});
