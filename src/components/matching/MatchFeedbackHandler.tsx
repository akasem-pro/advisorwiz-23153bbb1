
import React from 'react';
import { UserBehaviorEvent, trackUserBehavior } from '../../utils/analytics/userBehaviorTracker';
import { supabase } from '../../integrations/supabase/client';
import MatchFeedback from './MatchFeedback';
import { TableInsert } from '../../lib/supabase/types/databaseHelpers';

interface MatchFeedbackHandlerProps {
  userType: 'consumer' | 'advisor';
  userId: string;
  matchId: string;
  showFeedback: boolean;
  explanations: string[];
}

const MatchFeedbackHandler: React.FC<MatchFeedbackHandlerProps> = ({
  userType,
  userId,
  matchId,
  showFeedback,
  explanations
}) => {
  if (!showFeedback || !matchId) return null;

  const handleFeedbackSubmit = async (feedback: {
    matchId: string;
    isHelpful: boolean;
    comment?: string;
    adjustWeights?: boolean;
    weightAdjustments?: Record<string, number>;
  }) => {
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
    const feedbackData: TableInsert<'match_feedback'> = {
      id: undefined, // Let Supabase generate this
      user_id: userId,
      is_helpful: feedback.isHelpful,
      comment: feedback.comment || null
    };
    
    await supabase
      .from('match_feedback')
      .insert(feedbackData);
    
    // If the user wants to adjust weights, we apply those changes
    if (feedback.adjustWeights && feedback.weightAdjustments) {
      // Get current preferences
      const { data: prefsData, error } = await supabase
        .from('user_preferences')
        .select('matching_preferences')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user preferences:", error);
        return;
      }
      
      const currentPrefs = prefsData?.matching_preferences || {};
      
      // Type guard to ensure currentPrefs is an object
      if (typeof currentPrefs === 'object' && currentPrefs !== null && !Array.isArray(currentPrefs)) {
        // Create a more precise type guard for the object structure
        const prefsObject = currentPrefs as Record<string, any>;
        
        // Safely access weightFactors with type checking
        const weightFactorsValue = prefsObject.weightFactors;
        const currentWeights = typeof weightFactorsValue === 'object' && weightFactorsValue !== null && !Array.isArray(weightFactorsValue)
          ? weightFactorsValue as Record<string, number>
          : {};
          
        // Calculate new weights by applying adjustments
        const newWeights = { ...currentWeights };
        
        for (const [factor, adjustment] of Object.entries(feedback.weightAdjustments)) {
          if (adjustment !== 0) {
            const currentValue = newWeights[factor] || 50;
            // Apply the adjustment with bounds checking (0-100)
            newWeights[factor] = Math.max(0, Math.min(100, currentValue + adjustment));
          }
        }
        
        // Update preferences in database with proper type handling
        const preferenceData: TableInsert<'user_preferences'> = {
          user_id: userId,
          matching_preferences: {
            ...prefsObject,
            weightFactors: newWeights
          }
        };
        
        await supabase
          .from('user_preferences')
          .upsert(preferenceData);
      }
    }
  };

  return (
    <MatchFeedback 
      matchId={matchId} 
      onFeedbackSubmit={handleFeedbackSubmit}
      explanations={explanations}
    />
  );
};

export default MatchFeedbackHandler;
