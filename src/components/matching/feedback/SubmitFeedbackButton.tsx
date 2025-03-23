
import React from 'react';
import { Button } from '../../ui/button';
import { RefreshCw } from 'lucide-react';

interface SubmitFeedbackButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

const SubmitFeedbackButton: React.FC<SubmitFeedbackButtonProps> = ({ isSubmitting, onClick }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full text-xs h-7"
      onClick={onClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
      ) : null}
      Submit Feedback
    </Button>
  );
};

export default SubmitFeedbackButton;
