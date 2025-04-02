
import React from 'react';
import Joyride from 'react-joyride';
import { UserType } from '../../types/profileTypes';
import { useEnhancedOnboarding } from '../../hooks/onboarding/use-enhanced-onboarding';
import { useGeneralTourSteps } from '../../hooks/onboarding/use-general-tour-steps';
import { useConsumerTourSteps } from '../../hooks/onboarding/use-consumer-tour-steps';
import { useAdvisorTourSteps } from '../../hooks/onboarding/use-advisor-tour-steps';
import { tourStyles } from './OnboardingTourStyles';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { HelpCircle, RotateCcw } from 'lucide-react';

interface EnhancedOnboardingTourProps {
  userType?: UserType;
  tourName?: string;
  autoStart?: boolean;
  showResetButton?: boolean;
  buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onComplete?: () => void;
  onSkip?: () => void;
}

const EnhancedOnboardingTour: React.FC<EnhancedOnboardingTourProps> = ({ 
  userType,
  tourName = 'main',
  autoStart = false,
  showResetButton = true,
  buttonPosition = 'bottom-right',
  onComplete,
  onSkip
}) => {
  // Get the appropriate tour steps based on user type
  const generalSteps = useGeneralTourSteps();
  const consumerSteps = useConsumerTourSteps();
  const advisorSteps = useAdvisorTourSteps();

  let steps = generalSteps;
  
  // Determine which steps to show based on user type
  if (userType === 'consumer') {
    steps = [...generalSteps, ...consumerSteps];
  } else if (userType === 'advisor') {
    steps = [...generalSteps, ...advisorSteps];
  }
  
  const {
    run,
    stepIndex,
    handleJoyrideCallback,
    startTour,
    resetTour,
    setRun,
    isTourCompleted,
    joyrideProps
  } = useEnhancedOnboarding({
    tourName: `${tourName}-${userType || 'general'}`,
    userType,
    steps,
    onComplete,
    onSkip,
    autoStart
  });

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  return (
    <>
      <div className={cn("fixed z-50 flex gap-2", positionClasses[buttonPosition])}>
        <Button 
          onClick={() => setRun(true)}
          variant="outline"
          size="icon"
          className="rounded-full bg-white dark:bg-navy-800 shadow-md"
          aria-label="Start onboarding tour"
        >
          <HelpCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />
        </Button>
        
        {showResetButton && isTourCompleted() && (
          <Button 
            onClick={resetTour}
            variant="outline"
            size="icon"
            className="rounded-full bg-white dark:bg-navy-800 shadow-md"
            aria-label="Reset onboarding tour"
          >
            <RotateCcw className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </Button>
        )}
      </div>
      
      {run && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton={false}
          run={run}
          scrollToFirstStep
          scrollOffset={80}
          showProgress
          showSkipButton
          stepIndex={stepIndex}
          steps={steps}
          disableScrolling={false}
          styles={tourStyles}
          disableOverlayClose
          spotlightClicks
          {...joyrideProps}
        />
      )}
    </>
  );
};

export default EnhancedOnboardingTour;
