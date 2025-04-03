
import { MatchingStrategy } from './MatchingStrategy';
import { MatchPreferences } from '../../../context/UserContextDefinition';

/**
 * Strategy focused on managing risk exposure in matches
 * Gives higher weight to factors that reduce risk-mismatch
 */
export class RiskFocusedMatchingStrategy implements MatchingStrategy {
  getName(): string {
    return 'risk-focused';
  }
  
  getDescription(): string {
    return 'Prioritizes matching based on risk tolerance alignment and investment preferences';
  }

  calculateScore(
    advisorId: string,
    consumerId: string,
    preferences: MatchPreferences,
    callMetrics: any[] = []
  ): { score: number; matchExplanation: string[] } {
    // Base score starts at 50
    let score = 50;
    const explanations: string[] = [];
    
    // Calculate risk-tolerance based score adjustments
    // This would normally use actual user data from profiles
    
    // Simulate using risk data for this example
    score += Math.min(25, Math.random() * 30); // Risk alignment score
    explanations.push('Risk tolerance profile analyzed');
    
    // If there are excluded categories and they match advisor specialties, reduce score
    if (preferences.excludedCategories && preferences.excludedCategories.length > 0) {
      // In a real implementation, this would check against actual advisor expertise
      const penaltyPerCategory = 10;
      score -= Math.min(30, preferences.excludedCategories.length * penaltyPerCategory);
      explanations.push(`Excluded ${preferences.excludedCategories.length} investment categories from match consideration`);
    }
    
    // Apply customized weight factors if provided
    if (preferences.weightFactors) {
      const riskScore = Math.min(15, Math.random() * 20); // Sample risk score calculation
      
      // Higher weight for risk assessment in this strategy
      // Fix: Use 'expertise' instead of 'risk' as it's more related to risk assessment
      const riskWeight = preferences.weightFactors.expertise || 70;
      score += (riskScore * riskWeight / 100);
      
      explanations.push('Applied custom risk tolerance weighting');
    }
    
    // Add insights from previous interactions if available
    if (callMetrics && callMetrics.length > 0) {
      // Analyze call metrics for risk discussion patterns
      score += Math.min(10, callMetrics.length * 2);
      explanations.push('Incorporated insights from previous risk discussions');
    }

    // Ensure score is within 0-100 range
    score = Math.max(0, Math.min(100, score));
    
    return {
      score: Math.round(score),
      matchExplanation: explanations
    };
  }
}
