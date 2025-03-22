
import React from 'react';
import MatchExplanation from './MatchExplanation';
import { UserType } from '../../types/userTypes';
import { calculateMatchScore, getMatchExplanations } from '../../utils/matchingAlgorithm';

interface MatchExplanationDisplayProps {
  userType: 'consumer' | 'advisor' | null;
  item: any;
  compact?: boolean;
  showFeedback?: boolean;
}

const MatchExplanationDisplay: React.FC<MatchExplanationDisplayProps> = ({ 
  userType,
  item,
  compact = false,
  showFeedback = true
}) => {
  if (!item || !userType) return null;
  
  // For advisors viewing consumer profiles
  if (userType === 'advisor' && item.id) {
    // Fetch consumer profile from context or props
    const consumerProfile = item;
    
    // Get advisor profile from context
    const advisorProfile = {
      id: 'advisor-current',
      name: 'Current Advisor',
      organization: 'Your Organization'
    };
    
    // Import dynamic explanations based on user's profile
    const score = calculateMatchScore(advisorProfile as any, consumerProfile);
    const explanations = getMatchExplanations(advisorProfile as any, consumerProfile);
    
    // Generate a matchId from the two profiles
    const matchId = `match-${advisorProfile.id}-${consumerProfile.id}`;
    
    return (
      <div className="match-explanation">
        <MatchExplanation 
          score={score}
          explanations={explanations}
          compact={compact}
          showFeedback={showFeedback}
          matchId={matchId}
        />
      </div>
    );
  }
  
  // For consumers viewing advisor profiles
  if (userType === 'consumer' && item.id) {
    // Fetch consumer profile from context
    const consumerProfile = {
      id: 'consumer-123',
      name: 'John Doe',
      preferredLanguage: ['English'],
      riskTolerance: 'medium',
      serviceNeeds: ['retirement', 'tax']
    } as any;
    
    // Get real explanations
    const score = calculateMatchScore(item, consumerProfile);
    const explanations = getMatchExplanations(item, consumerProfile);
    
    // Generate a matchId from the two profiles
    const matchId = `match-${item.id}-${consumerProfile.id}`;
    
    return (
      <div className="match-explanation">
        <MatchExplanation 
          score={score}
          explanations={explanations}
          compact={compact}
          showFeedback={showFeedback}
          matchId={matchId}
        />
      </div>
    );
  }
  
  return null;
};

export default MatchExplanationDisplay;
