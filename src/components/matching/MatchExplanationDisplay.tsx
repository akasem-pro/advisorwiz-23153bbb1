
import React from 'react';
import MatchExplanation from './MatchExplanation';
import { calculateMatchScore, getMatchExplanations } from '../../utils/matchingAlgorithm';
import { trackUserBehavior, UserBehaviorEvent } from '../../utils/analytics/eventTracker';
import { convertToMatchExplanations } from './utils/matchExplanationUtils';

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
    const explanationStrings = getMatchExplanations(advisorProfile as any, consumerProfile);
    const explanations = convertToMatchExplanations(explanationStrings);
    
    // Generate a matchId from the two profiles
    const matchId = `match-${advisorProfile.id}-${consumerProfile.id}`;
    
    // Track this match view event
    trackUserBehavior(
      UserBehaviorEvent.MATCH_VIEW,
      {
        advisor_id: advisorProfile.id,
        consumer_id: consumerProfile.id,
        score: score,
        explanations: explanationStrings
      }
    );
    
    return (
      <div className="match-explanation">
        <MatchExplanation 
          matchId={matchId}
          explanations={explanations}
          score={score}
          compact={compact}
          showFeedback={showFeedback}
          advisorId={advisorProfile.id}
          consumerId={consumerProfile.id}
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
    const explanationStrings = getMatchExplanations(item, consumerProfile);
    const explanations = convertToMatchExplanations(explanationStrings);
    
    // Generate a matchId from the two profiles
    const matchId = `match-${item.id}-${consumerProfile.id}`;
    
    // Track this match view event
    trackUserBehavior(
      UserBehaviorEvent.MATCH_VIEW,
      {
        advisor_id: item.id,
        consumer_id: consumerProfile.id,
        score: score,
        explanations: explanationStrings
      }
    );
    
    return (
      <div className="match-explanation">
        <MatchExplanation 
          matchId={matchId}
          explanations={explanations}
          score={score}
          compact={compact}
          showFeedback={showFeedback}
          advisorId={item.id}
          consumerId={consumerProfile.id}
        />
      </div>
    );
  }
  
  return null;
};

export default MatchExplanationDisplay;
