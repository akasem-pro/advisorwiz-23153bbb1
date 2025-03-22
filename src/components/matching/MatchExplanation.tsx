
import React from 'react';
import { Badge } from '../ui/badge';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MatchExplanationProps {
  score: number;
  explanations: string[];
  compact?: boolean;
}

const MatchExplanation: React.FC<MatchExplanationProps> = ({ 
  score, 
  explanations, 
  compact = false 
}) => {
  // Only display if we have explanations and a reasonable score
  if (!explanations.length || score === 0) {
    return null;
  }

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
      <h4 className="text-sm font-medium text-navy-800 mb-2 flex items-center">
        <InfoIcon className="h-4 w-4 text-teal-600 mr-1" />
        Why we matched you
      </h4>
      <div className="flex flex-wrap gap-2">
        {explanations.map((explanation, index) => (
          <Badge key={index} variant="outline" className="bg-white text-slate-700">
            {explanation}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MatchExplanation;
