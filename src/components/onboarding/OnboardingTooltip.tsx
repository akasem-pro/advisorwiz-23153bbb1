
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '../ui/button';

interface OnboardingTooltipProps {
  title: string;
  description: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  title,
  description,
  placement = 'bottom',
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) {
    return <>{children}</>;
  }
  
  const getPlacementClasses = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-3';
      case 'right':
        return 'left-full ml-3';
      case 'bottom':
        return 'top-full mt-3';
      case 'left':
        return 'right-full mr-3';
      default:
        return 'top-full mt-3';
    }
  };
  
  return (
    <div className="relative inline-block">
      <div 
        className="inline-flex items-center cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <HelpCircle className="ml-1.5 h-4 w-4 text-teal-500 dark:text-teal-400" />
      </div>
      
      {isOpen && (
        <div className={`absolute z-50 w-72 ${getPlacementClasses()}`}>
          <div className="bg-white dark:bg-navy-800 p-4 rounded-lg shadow-xl border border-slate-200 dark:border-navy-700">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-lg text-navy-900 dark:text-white">{title}</h4>
              <Button 
                variant="ghost" 
                className="h-7 w-7 p-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDismissed(true);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingTooltip;
