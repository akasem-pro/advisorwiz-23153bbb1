
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
        return 'bottom-full mb-2';
      case 'right':
        return 'left-full ml-2';
      case 'bottom':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      default:
        return 'top-full mt-2';
    }
  };
  
  return (
    <div className="relative inline-block">
      <div 
        className="inline-flex items-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <HelpCircle className="ml-1 h-4 w-4 text-slate-500" />
      </div>
      
      {isOpen && (
        <div className={`absolute z-50 w-64 ${getPlacementClasses()}`}>
          <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-navy-700">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-navy-900 dark:text-white">{title}</h4>
              <Button 
                variant="ghost" 
                className="h-6 w-6 p-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDismissed(true);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingTooltip;
