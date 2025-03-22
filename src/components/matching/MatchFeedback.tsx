
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';

interface MatchFeedbackProps {
  matchId: string;
  onFeedbackSubmit: (feedback: {
    matchId: string;
    isHelpful: boolean;
    comment?: string;
  }) => void;
}

const MatchFeedback: React.FC<MatchFeedbackProps> = ({ matchId, onFeedbackSubmit }) => {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isHelpful === null) return;
    
    setIsSubmitting(true);
    
    onFeedbackSubmit({
      matchId,
      isHelpful: isHelpful,
      comment: comment.trim() || undefined
    });
    
    toast.success('Thank you for your feedback!');
    
    // Reset the form
    setIsHelpful(null);
    setComment('');
    setIsSubmitting(false);
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
