
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface TooltipHelperProps {
  title: string;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  interactive?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: 'primary' | 'secondary' | 'muted';
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({
  title,
  content,
  side = 'right',
  sideOffset = 5,
  className = '',
  interactive = false,
  iconSize = 'md',
  iconColor = 'primary'
}) => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;
  
  const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  const iconColorClasses = {
    primary: "text-teal-500 dark:text-teal-400",
    secondary: "text-navy-500 dark:text-slate-300",
    muted: "text-slate-400 dark:text-slate-500"
  };
  
  return (
    <span className={cn("inline-flex items-center", className)}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button 
              className="inline-flex focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-full transition-colors hover:text-teal-600 dark:hover:text-teal-300" 
              aria-label={`Help for ${title}`}
            >
              <HelpCircle className={cn(
                iconSizeClasses[iconSize],
                iconColorClasses[iconColor]
              )} />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side={side} 
            sideOffset={sideOffset}
            className={cn(
              "max-w-xs p-3 bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 text-navy-900 dark:text-slate-100",
              interactive ? 'pointer-events-auto' : ''
            )}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm text-navy-800 dark:text-white">{title}</h4>
                {interactive && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 p-0 -mr-1 -mt-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" 
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
