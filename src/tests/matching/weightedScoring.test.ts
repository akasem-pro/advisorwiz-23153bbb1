
import { getWeightedCompatibilityScore, setMatchingStrategy } from '../../services/matching/weightedScoring';
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

  beforeEach(() => {
    // Reset to default strategy before each test
    setMatchingStrategy('default');
  });

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

  test('changing matching strategy should be possible', () => {
    // First use default strategy
    const defaultResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Set a different strategy
    setMatchingStrategy('premium');
    
    // This should use the premium strategy
    const premiumResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    
    // Premium strategy should be different than default
    expect(premiumResult.score).not.toEqual(defaultResult.score);
    
    // Risk-focused strategy should also be different
    setMatchingStrategy('risk-focused');
    const riskResult = getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
    expect(riskResult.score).not.toEqual(defaultResult.score);
  });

  test('weight factors should influence score', () => {
    const withoutWeights = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      defaultPreferences
    );
    
    const withWeights = getWeightedCompatibilityScore(
      advisorId, 
      consumerId, 
      {
        ...defaultPreferences,
        weightFactors: {
          language: 80,
          expertise: 90,
          availability: 40,
          location: 30,
          interaction: 60
        }
      }
    );
    
    // Scores should be different when weights are applied
    expect(withWeights.score).not.toEqual(withoutWeights.score);
  });
  
  // Performance benchmarks
  describe('Performance', () => {
    test('should process single match score calculation in under 5ms', () => {
      const startTime = performance.now();
      getWeightedCompatibilityScore(advisorId, consumerId, defaultPreferences);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`Single match calculation took ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(5); // Should be very fast for a single calculation
    });
    
    test('should handle batch calculations efficiently', () => {
      const batchSize = 100;
      const startTime = performance.now();
      
      // Process multiple matches in sequence
      for (let i = 0; i < batchSize; i++) {
        getWeightedCompatibilityScore(
          advisorId,
          consumerId,
          defaultPreferences
        );
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      const avgTime = duration / batchSize;
      
      console.log(`Batch of ${batchSize} calculations took ${duration.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms per calculation)`);
      expect(avgTime).toBeLessThan(1); // Average time should be under 1ms with caching
    });
    
    test('calculation time should scale linearly with different inputs', () => {
      const advisorIds = mockAdvisors.slice(0, 5).map(a => a.id || `advisor-${Math.random()}`);
      const consumerIds = mockConsumers.slice(0, 5).map(c => c.id || `consumer-${Math.random()}`);
      
      const startTime = performance.now();
      
      for (const aId of advisorIds) {
        for (const cId of consumerIds) {
          getWeightedCompatibilityScore(aId, cId, defaultPreferences);
        }
      }
      
      const endTime = performance.now();
      const totalCalculations = advisorIds.length * consumerIds.length;
      const duration = endTime - startTime;
      
      console.log(`Multiple combinations (${totalCalculations}) took ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(100); // Should process reasonably quickly 
    });
  });
});
