
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Button } from './button';

interface TooltipHelperProps {
  title: string;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  interactive?: boolean;
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({
  title,
  content,
  side = 'right',
  sideOffset = 5,
  className = '',
  interactive = false
}) => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;
  
  return (
    <span className={`inline-flex items-center ${className}`}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button className="inline-flex focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-full" aria-label={`Help for ${title}`}>
              <HelpCircle className="h-4 w-4 text-teal-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side={side} 
            sideOffset={sideOffset}
            className={`max-w-xs p-3 ${interactive ? 'pointer-events-auto' : ''}`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm">{title}</h4>
                {interactive && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 -mr-1 -mt-1" 
                    onClick={() => setDismissed(true)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">{content}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default TooltipHelper;
