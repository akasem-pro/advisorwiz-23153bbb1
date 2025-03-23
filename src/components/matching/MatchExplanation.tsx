
import React, { useState } from 'react';
import { InfoIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import CompactMatchExplanation from './CompactMatchExplanation';
import MatchExplanationCategories from './MatchExplanationCategories';
import MatchFeedbackHandler from './MatchFeedbackHandler';
import { categorizeExplanations } from './utils/matchExplanationUtils';

interface MatchExplanationProps {
  score: number;
  explanations: string[];
  compact?: boolean;
  showFeedback?: boolean;
  matchId?: string;
  advisorId?: string;
  consumerId?: string;
}

const MatchExplanation: React.FC<MatchExplanationProps> = ({ 
  score, 
  explanations, 
  compact = false,
  showFeedback = true,
  matchId,
  advisorId,
  consumerId
}) => {
  const { userType, consumerProfile, advisorProfile } = useUser();
  const [expanded, setExpanded] = useState(false);
  
  // Only display if we have explanations and a reasonable score
  if (!explanations.length || score === 0) {
    return null;
  }

  // If compact mode is enabled, show the tooltip version
  if (compact) {
    return <CompactMatchExplanation explanations={explanations} />;
  }

  // Get categorized explanations for display
  const explanationCategories = categorizeExplanations(explanations);
  
  // Get the current user's ID from context
  // Only pass consumer or advisor types to components, filter out firm_admin
  const userTypeForComponents = 
    userType === 'consumer' || userType === 'advisor' 
      ? userType 
      : null;
      
  const userId = userType === 'consumer' 
    ? consumerProfile?.id 
    : advisorProfile?.id;

  return (
    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <h4 className="text-sm font-medium text-navy-800 flex items-center">
          <InfoIcon className="h-4 w-4 text-teal-600 mr-1" />
          Why we matched you
        </h4>
        {explanations.length > 3 && (
          <button className="text-slate-500 hover:text-slate-700">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
      
      <MatchExplanationCategories 
        explanationCategories={explanationCategories} 
        expanded={expanded} 
      />
      
      {showFeedback && matchId && userId && userTypeForComponents && (
        <MatchFeedbackHandler
          userType={userTypeForComponents}
          userId={userId}
          matchId={matchId}
          showFeedback={showFeedback}
          explanations={explanations}
        />
      )}
    </div>
  );
};

export default MatchExplanation;
