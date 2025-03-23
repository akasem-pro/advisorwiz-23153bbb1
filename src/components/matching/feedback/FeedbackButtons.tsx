
import React from 'react';
import { Button } from '../../ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackButtonsProps {
  isHelpful: boolean | null;
  setIsHelpful: (value: boolean) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ isHelpful, setIsHelpful }) => {
  return (
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
  );
};

export default FeedbackButtons;
