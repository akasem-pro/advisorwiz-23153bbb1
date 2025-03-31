
import React, { useEffect, useRef } from 'react';
import Joyride from 'react-joyride';
import { UserType } from '../../types/profileTypes';
import { useOnboardingTour } from '../../hooks/onboarding/use-onboarding-tour';
import { tourStyles } from './OnboardingTourStyles';
import { cn } from '@/lib/utils';

interface OnboardingTourProps {
  userType?: UserType;
  onComplete?: () => void;
  onSkip?: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  userType, 
  onComplete,
  onSkip 
}) => {
  const { run, stepIndex, steps, handleJoyrideCallback } = useOnboardingTour(
    userType,
    onComplete,
    onSkip
  );
  const isMounted = useRef(true);

  // Only render if there are steps and the tour should run
  if (!steps.length || !run) return null;

  // Add some styles to highlight active tour elements better
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .tour-highlight {
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6) !important;
        transition: box-shadow 0.3s ease-in-out !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      isMounted.current = false;
    };
  }, []);

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton={false}
      run={run}
      scrollToFirstStep={true}
      scrollOffset={80}
      showProgress={true}
      showSkipButton={true}
      stepIndex={stepIndex}
      steps={steps}
      disableScrolling={false}
      styles={tourStyles}
      disableOverlayClose={true}
      spotlightClicks={true}
      floaterProps={{
        styles: {
          floater: {
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
          }
        }
      }}
      tooltipComponent={({ continuous, index, step, backProps, primaryProps, skipProps, tooltipProps }) => (
        <div 
          className={cn(
            "bg-white dark:bg-navy-800 p-4 rounded-lg shadow-lg max-w-md border dark:border-navy-600",
            "text-navy-900 dark:text-white"
          )}
          {...tooltipProps}
        >
          <div className="mb-3 text-sm">{step.content}</div>
          <div className="flex justify-between items-center">
            <div>
              {index > 0 && (
                <button
                  {...backProps}
                  className="px-3 py-1 text-sm bg-slate-200 dark:bg-navy-700 rounded mr-2 hover:bg-slate-300 dark:hover:bg-navy-600"
                >
                  Back
                </button>
              )}
              {continuous && (
                <button
                  {...primaryProps}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {index === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
            {index < steps.length - 1 && (
              <button
                {...skipProps}
                className="px-3 py-1 text-sm text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default OnboardingTour;
