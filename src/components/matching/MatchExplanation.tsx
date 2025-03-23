
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { InfoIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import MatchFeedback from './MatchFeedback';
import { UserBehaviorEvent, trackUserBehavior } from '../../utils/analytics/userBehaviorTracker';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';

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

  // Categorize explanations to improve display
  const categorizeExplanations = () => {
    const categories: Record<string, string[]> = {
      primary: [],
      secondary: []
    };
    
    // Sort explanations by importance/relevance
    explanations.forEach(explanation => {
      if (
        explanation.includes('Expert') || 
        explanation.includes('Expertise') || 
        explanation.includes('language') || 
        explanation.includes('Languages')
      ) {
        categories.primary.push(explanation);
      } else {
        categories.secondary.push(explanation);
      }
    });
    
    return categories;
  };
  
  const explanationCategories = categorizeExplanations();

  const handleFeedbackSubmit = async (feedback: {
    matchId: string;
    isHelpful: boolean;
    comment?: string;
    adjustWeights?: boolean;
    weightAdjustments?: Record<string, number>;
  }) => {
    // Get the current user's ID from context
    const userId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
      
    if (!userId) return;
    
    // Log this feedback event for analytics
    await trackUserBehavior(
      UserBehaviorEvent.FEEDBACK_SUBMITTED,
      userId,
      {
        match_id: feedback.matchId,
        is_helpful: feedback.isHelpful,
        adjustments: feedback.weightAdjustments
      }
    );
    
    // Store feedback in Supabase
    await supabase
      .from('match_feedback')
      .insert({
        match_id: feedback.matchId,
        user_id: userId,
        is_helpful: feedback.isHelpful,
        comment: feedback.comment
      });
    
    // If the user wants to adjust weights, we apply those changes
    if (feedback.adjustWeights && feedback.weightAdjustments) {
      // Get current preferences
      const { data: prefsData } = await supabase
        .from('user_preferences')
        .select('matching_preferences')
        .eq('user_id', userId)
        .single();
        
      const currentPrefs = prefsData?.matching_preferences || {};
      const currentWeights = currentPrefs.weightFactors || {};
      
      // Calculate new weights by applying adjustments
      const newWeights = { ...currentWeights };
      
      for (const [factor, adjustment] of Object.entries(feedback.weightAdjustments)) {
        if (adjustment !== 0) {
          const currentValue = newWeights[factor] || 50;
          // Apply the adjustment with bounds checking (0-100)
          newWeights[factor] = Math.max(0, Math.min(100, currentValue + adjustment));
        }
      }
      
      // Update preferences in database
      await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          matching_preferences: {
            ...currentPrefs,
            weightFactors: newWeights
          }
        });
    }
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center cursor-help">
              <InfoIcon className="h-4 w-4 text-teal-600 mr-1" />
              <span className="text-xs text-slate-600">Why this match?</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="text-sm">
              <p className="font-medium mb-1">Why we matched you:</p>
              <ul className="list-disc pl-4 space-y-1">
                {explanations.map((explanation, index) => (
                  <li key={index}>{explanation}</li>
                ))}
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

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
      
      <div className="mt-2">
        {/* Always show primary reasons */}
        {explanationCategories.primary.length > 0 && (
          <div className="mb-2">
            <p className="text-xs text-slate-600 mb-1">Key factors:</p>
            <div className="flex flex-wrap gap-1">
              {explanationCategories.primary.map((explanation, index) => (
                <Badge key={`primary-${index}`} variant="outline" className="bg-white text-slate-700 border-teal-200">
                  {explanation}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Show secondary reasons if expanded or few explanations */}
        {(expanded || explanations.length <= 3) && explanationCategories.secondary.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-slate-600 mb-1">Additional factors:</p>
            <div className="flex flex-wrap gap-1">
              {explanationCategories.secondary.map((explanation, index) => (
                <Badge key={`secondary-${index}`} variant="outline" className="bg-white text-slate-700">
                  {explanation}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {showFeedback && matchId && (
        <MatchFeedback 
          matchId={matchId} 
          onFeedbackSubmit={handleFeedbackSubmit}
          explanations={explanations}
        />
      )}
    </div>
  );
};

export default MatchExplanation;
