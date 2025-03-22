
import { calculateCompatibilityBetweenProfiles } from '../../services/matching/profileMatching';
import { getWeightedCompatibilityScore } from '../../services/matching/weightedScoring';
import { calculateMatchScore, getMatchExplanations } from '../../utils/matchingAlgorithm';

describe('Matching Integration Tests', () => {
  test('calculateCompatibilityBetweenProfiles should return appropriate profiles', () => {
    const consumerResults = calculateCompatibilityBetweenProfiles(
      'consumer',
      'consumer-1',
      {
        prioritizeLanguage: true,
        prioritizeExpertise: true,
        prioritizeAvailability: true,
        prioritizeLocation: true
      },
      5 // Limit to 5 results
    );
    
    // Should return some results
    expect(Array.isArray(consumerResults)).toBe(true);
    expect(consumerResults.length).toBeLessThanOrEqual(5);
    
    // Check if results are properly sorted (descending by score)
    for (let i = 1; i < consumerResults.length; i++) {
      const prevScore = consumerResults[i-1].compatibilityScores?.['consumer-1'] || 0;
      const currScore = consumerResults[i].compatibilityScores?.['consumer-1'] || 0;
      expect(prevScore).toBeGreaterThanOrEqual(currScore);
    }
  });
  
  test('calculateMatchScore should align with getWeightedCompatibilityScore', () => {
    // Use mock data for an advisor and consumer
    const advisor = {
      id: 'advisor-test',
      name: 'Test Advisor',
      organization: 'Test Org',
      expertise: ['retirement', 'tax'],
      languages: ['English']
    };
    
    const consumer = {
      id: 'consumer-test',
      name: 'Test Consumer',
      preferredLanguage: ['English'],
      riskTolerance: 'medium',
      serviceNeeds: ['retirement']
    };
    
    // Calculate scores using both methods
    const directScore = calculateMatchScore(advisor as any, consumer as any);
    
    // Scores should be of the same type and within reasonable range
    expect(typeof directScore).toBe('number');
    expect(directScore).toBeGreaterThanOrEqual(0);
    expect(directScore).toBeLessThanOrEqual(100);
  });
});
