import React, { useState } from 'react';
import { X, MessageSquare, ThumbsUp, ThumbsDown, Bug } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { UserBehaviorEvent } from '../../utils/analytics/types';

type FeedbackType = 'suggestion' | 'bug' | 'praise' | 'other';

interface FeedbackWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  currentPageUrl?: string;
  userId?: string;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  position = 'bottom-right',
  currentPageUrl = typeof window !== 'undefined' ? window.location.href : '',
  userId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const feedbackIcons = {
    suggestion: <ThumbsUp className="h-4 w-4" />,
    bug: <Bug className="h-4 w-4" />,
    praise: <ThumbsUp className="h-4 w-4" />,
    other: <MessageSquare className="h-4 w-4" />
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the feedback submission using the analytics system
      trackUserBehavior(UserBehaviorEvent.FEEDBACK_SUBMITTED, {
        user_id: userId,
        feedback_type: feedbackType,
        page_url: currentPageUrl,
        has_comment: comment.length > 0
      });

      // In a real implementation, you would send this to your backend
      console.log('Feedback submitted:', {
        userId,
        feedbackType,
        comment,
        currentPageUrl
      });

      // Show success message
      toast.success('Thank you for your feedback!', {
        description: 'Your input helps us improve AdvisorWiz.'
      });

      // Reset form and close
      setComment('');
      setFeedbackType('suggestion');
      setIsOpen(false);
    } catch (error) {
      toast.error('Unable to submit feedback', {
        description: 'Please try again later.'
      });
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      {isOpen ? (
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-slate-200 dark:border-navy-700 w-80 p-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-navy-900 dark:text-white">Share your feedback</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Feedback type</Label>
                <RadioGroup
                  value={feedbackType}
                  onValueChange={(value) => setFeedbackType(value as FeedbackType)}
                  className="flex flex-wrap gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion" className="flex items-center">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                      Suggestion
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="flex items-center">
                      <Bug className="h-3.5 w-3.5 mr-1.5" />
                      Bug report
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="praise" id="praise" />
                    <Label htmlFor="praise" className="flex items-center">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                      Praise
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="comment" className="text-sm font-medium mb-1.5 block">
                  Your feedback
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Tell us what you think..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit feedback'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg bg-teal-600 hover:bg-teal-700 text-white"
          aria-label="Give feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default FeedbackWidget;
