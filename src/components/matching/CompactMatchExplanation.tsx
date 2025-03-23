
import React from 'react';
import { InfoIcon } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface CompactMatchExplanationProps {
  explanations: string[];
}

const CompactMatchExplanation: React.FC<CompactMatchExplanationProps> = ({ explanations }) => {
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
};

export default CompactMatchExplanation;
