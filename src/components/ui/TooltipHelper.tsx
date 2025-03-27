
import React from 'react';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { cn } from '@/lib/utils';

interface TooltipHelperProps {
  title: string;
  content: string;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'center' | 'start' | 'end';
  delay?: number;
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({
  title,
  content,
  className = '',
  iconClassName = '',
  contentClassName = '',
  side = 'top',
  align = 'center',
  delay = 0
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger className={cn('inline-flex cursor-help', className)}>
          <InfoIcon className={cn('h-4 w-4 text-slate-500 dark:text-slate-400', iconClassName)} />
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          className={cn(
            'bg-white dark:bg-navy-800 text-navy-900 dark:text-slate-100 border-slate-200 dark:border-navy-700 max-w-xs z-50',
            contentClassName
          )}
        >
          <div className="space-y-1.5">
            {title && <p className="font-medium text-xs">{title}</p>}
            <p className="text-xs text-slate-700 dark:text-slate-300">{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHelper;
