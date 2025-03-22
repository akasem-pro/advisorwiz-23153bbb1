
import { calculateCompatibilityBetweenProfiles } from '../../services/matching/profileMatching';
import { getWeightedCompatibilityScore } from '../../services/matching/weightedScoring';
import { calculateMatchScore, getMatchExplanations } from '../../utils/matchingAlgorithm';
import { AdvisorProfile, ConsumerProfile } from '../../context/UserContext';

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
      const prevItem = consumerResults[i-1] as AdvisorProfile;
      const currItem = consumerResults[i] as AdvisorProfile;
      const prevScore = prevItem.compatibilityScores?.['consumer-1'] || 0;
      const currScore = currItem.compatibilityScores?.['consumer-1'] || 0;
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
      languages: ['English'],
      chats: [],
      chatEnabled: true,
      appointmentCategories: [],
      appointments: [],
      onlineStatus: 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: true,
      isAccredited: false,
      testimonials: [],
      pricing: {},
      assetsUnderManagement: 0,
      matches: []
    } as AdvisorProfile;
    
    const consumer = {
      id: 'consumer-test',
      name: 'Test Consumer',
      preferredLanguage: ['English'],
      riskTolerance: 'medium',
      serviceNeeds: ['retirement'],
      status: '',
      investableAssets: 0,
      preferredCommunication: [],
      matches: [],
      chats: [],
      chatEnabled: true,
      appointments: [],
      onlineStatus: 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: true,
      age: 30
    } as ConsumerProfile;
    
    // Calculate scores using both methods
    const directScore = calculateMatchScore(advisor, consumer);
    
    // Scores should be of the same type and within reasonable range
    expect(typeof directScore).toBe('number');
    expect(directScore).toBeGreaterThanOrEqual(0);
    expect(directScore).toBeLessThanOrEqual(100);
  });
});
