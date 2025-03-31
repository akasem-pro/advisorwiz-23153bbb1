
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { trackMatchingInteraction } from '../../utils/analytics/userBehaviorTracker';
import { useUser } from '../../context/UserContext';
import { 
  FeedbackButtons, 
  FeedbackComment, 
  AdvancedOptions, 
  SubmitFeedbackButton 
} from './feedback';

interface MatchFeedbackProps {
  matchId: string;
  onFeedbackSubmit: (feedback: {
    matchId: string;
    isHelpful: boolean;
    comment?: string;
    adjustWeights?: boolean;
    weightAdjustments?: Record<string, number>;
  }) => void;
  explanations?: string[];
}

const MatchFeedback: React.FC<MatchFeedbackProps> = ({ 
  matchId, 
  onFeedbackSubmit,
  explanations = [] 
}) => {
  const { userType, consumerProfile, advisorProfile } = useUser();
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [adjustWeights, setAdjustWeights] = useState(false);

  // For adjusting weights dynamically
  const [weightAdjustments, setWeightAdjustments] = useState<Record<string, number>>({
    language: 0,
    expertise: 0,
    availability: 0,
    location: 0
  });

  const handleWeightChange = (factor: string, direction: 'increase' | 'decrease') => {
    setWeightAdjustments(prev => ({
      ...prev,
      [factor]: prev[factor] + (direction === 'increase' ? 5 : -5)
    }));
  };

  const handleSubmit = async () => {
    if (isHelpful === null) return;
    
    setIsSubmitting(true);
    
    const feedback = {
      matchId,
      isHelpful,
      comment: comment.trim() || undefined,
      adjustWeights,
      weightAdjustments: adjustWeights ? weightAdjustments : undefined
    };
    
    // Get the user ID based on user type
    const userId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
    
    if (userId) {
      // Get the advisor and consumer IDs from the match ID format
      // Assuming matchId format is "match-{advisorId}-{consumerId}"
      const parts = matchId.split('-');
      if (parts.length >= 3) {
        const advisorId = parts[1];
        const consumerId = parts[2];
        
        // Track the feedback using analytics - using 'view' action type which is allowed
        await trackMatchingInteraction(
          'view', // Changed from 'feedback' to 'view' which is an accepted action type
          advisorId,
          consumerId,
          0, // We don't have the score here, so we use 0
          matchId,
          { 
            action_subtype: 'feedback',  // Add a subtype to differentiate
            is_helpful: isHelpful,
            has_comment: !!comment.trim(),
            feedback_details: feedback 
          }
        );
      }
    }
    
    // Submit the feedback
    onFeedbackSubmit(feedback);
    
    // Show success notification
    toast.success('Thank you for your feedback!', {
      description: 'Your input helps us improve our matching algorithm.'
    });
    
    // Reset the form
    setIsHelpful(null);
    setComment('');
    setIsSubmitting(false);
    setShowAdvanced(false);
    setAdjustWeights(false);
    setWeightAdjustments({
      language: 0,
      expertise: 0,
      availability: 0,
      location: 0
    });
  };

  return (
    <div className="mt-3 pt-2">
      <Separator className="mb-3" />
      <p className="text-xs text-slate-600 mb-2">Was this match helpful?</p>
      
      <FeedbackButtons 
        isHelpful={isHelpful} 
        setIsHelpful={setIsHelpful} 
      />
      
      {isHelpful !== null && (
        <>
          <FeedbackComment 
            comment={comment}
            setComment={setComment}
            isHelpful={isHelpful}
          />
          
          <AdvancedOptions
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            adjustWeights={adjustWeights}
            setAdjustWeights={setAdjustWeights}
            weightAdjustments={weightAdjustments}
            handleWeightChange={handleWeightChange}
            explanations={explanations}
            isHelpful={isHelpful}
          />
          
          <SubmitFeedbackButton
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default MatchFeedback;
