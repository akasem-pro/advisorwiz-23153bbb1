
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ThumbsUp, ThumbsDown, RefreshCw, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { trackMatchingInteraction } from '../../utils/analytics/userBehaviorTracker';
import { useUser } from '../../context/UserContext';
import { supabase } from '../../integrations/supabase/client';

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
        
        // Track the feedback using analytics
        await trackMatchingInteraction(
          'feedback',
          advisorId,
          consumerId,
          0, // We don't have the score here, so we use 0
          matchId,
          { feedback }
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
      
      <div className="flex space-x-2 mb-2">
        <Button
          variant={isHelpful === true ? "default" : "outline"}
          size="sm"
          className={`px-2 py-1 h-8 ${isHelpful === true ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
          onClick={() => setIsHelpful(true)}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Yes
        </Button>
        
        <Button
          variant={isHelpful === false ? "default" : "outline"}
          size="sm"
          className={`px-2 py-1 h-8 ${isHelpful === false ? 'bg-slate-600 hover:bg-slate-700' : ''}`}
          onClick={() => setIsHelpful(false)}
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          No
        </Button>
      </div>
      
      {isHelpful !== null && (
        <>
          <textarea
            className="w-full p-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 mt-1 mb-2"
            placeholder={isHelpful ? "What did you like about this match?" : "How could this match be improved?"}
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 w-full text-slate-600 justify-start mb-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
            {showAdvanced ? "Hide advanced options" : "Show advanced options"}
          </Button>
          
          {showAdvanced && (
            <div className="p-2 bg-slate-50 rounded-md mb-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="adjustWeights"
                  checked={adjustWeights}
                  onChange={() => setAdjustWeights(!adjustWeights)}
                  className="mr-2"
                />
                <Label htmlFor="adjustWeights" className="text-xs cursor-pointer flex items-center">
                  <Sliders className="h-3 w-3 mr-1" />
                  Adjust matching preferences
                </Label>
              </div>
              
              {adjustWeights && (
                <div className="mt-2 space-y-2">
                  {explanations && explanations.length > 0 && (
                    <div className="mb-2">
                      <Label className="text-xs">Match explanations:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {explanations.map((explanation, idx) => (
                          <Badge key={idx} variant="outline" className="bg-white text-xs">
                            {explanation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-xs">Adjust weights:</Label>
                    <p className="text-xs text-slate-500">
                      {isHelpful 
                        ? "Increase weights for factors you liked" 
                        : "Decrease weights for factors you didn't like"}
                    </p>
                    
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Language match</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('language', 'decrease')}
                            disabled={weightAdjustments.language <= -20}
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-8 text-center text-xs">
                            {weightAdjustments.language > 0 ? `+${weightAdjustments.language}` : weightAdjustments.language}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('language', 'increase')}
                            disabled={weightAdjustments.language >= 20}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Expertise match</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('expertise', 'decrease')}
                            disabled={weightAdjustments.expertise <= -20}
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-8 text-center text-xs">
                            {weightAdjustments.expertise > 0 ? `+${weightAdjustments.expertise}` : weightAdjustments.expertise}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('expertise', 'increase')}
                            disabled={weightAdjustments.expertise >= 20}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Availability</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('availability', 'decrease')}
                            disabled={weightAdjustments.availability <= -20}
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-8 text-center text-xs">
                            {weightAdjustments.availability > 0 ? `+${weightAdjustments.availability}` : weightAdjustments.availability}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('availability', 'increase')}
                            disabled={weightAdjustments.availability >= 20}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Location</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('location', 'decrease')}
                            disabled={weightAdjustments.location <= -20}
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-8 text-center text-xs">
                            {weightAdjustments.location > 0 ? `+${weightAdjustments.location}` : weightAdjustments.location}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleWeightChange('location', 'increase')}
                            disabled={weightAdjustments.location >= 20}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-7"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            ) : null}
            Submit Feedback
          </Button>
        </>
      )}
    </div>
  );
};

export default MatchFeedback;
