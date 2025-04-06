import React, { useEffect } from 'react';
import Joyride from 'react-joyride';
import { useOnboardingTour } from '../../hooks/onboarding/use-onboarding-tour';
import { tourStyles } from './OnboardingTourStyles';
import { useToast } from '../../hooks/use-toast';
import { TOUR_NAMES } from '../../hooks/onboarding/types';
import { Step } from 'react-joyride';
import { UserType } from '../../types/profileTypes';

interface BaseTourComponentProps {
  tourName: keyof typeof TOUR_NAMES;
  tourSteps: Step[];
  userType: UserType; // Ensure this is using the UserType from profileTypes
  autoStart?: boolean;
  onComplete?: () => void;
  completionMessage: {
    title: string;
    description: string;
  };
}

const BaseTourComponent: React.FC<BaseTourComponentProps> = ({ 
  tourName,
  tourSteps,
  userType,
  autoStart = true,
  onComplete,
  completionMessage
}) => {
  const { toast } = useToast();
  
  // Use the base onboarding tour hook with specific configuration
  const { 
    run, 
    stepIndex, 
    handleJoyrideCallback, 
    startTour, 
    setRun 
  } = useOnboardingTour(
    userType,
    () => {
      toast(completionMessage.title, {
        description: completionMessage.description,
        duration: 5000,
      });
      
      if (onComplete) {
        onComplete();
      }
      
      // Mark this specific tour as seen
      localStorage.setItem(TOUR_NAMES[tourName], 'true');
    },
    () => {
      toast("Tour Skipped", {
        description: "You can restart the tour anytime from your settings menu.",
        duration: 3000,
      });
    }
  );
  
  useEffect(() => {
    // Check if this specific tour has been seen
    const hasSeenTour = localStorage.getItem(TOUR_NAMES[tourName]);
    
    // Auto-start the tour if requested and not seen before
    if (autoStart && !hasSeenTour) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        startTour();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, startTour, tourName]);

  return (
    <>
      <button 
        onClick={() => setRun(true)}
        className="fixed bottom-16 right-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-lg"
        aria-label={`Start ${tourName.toLowerCase().replace('_', ' ')} tour`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>
      
      {run && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton={false}
          run={run}
          scrollToFirstStep
          scrollOffset={100}
          showProgress
          showSkipButton
          stepIndex={stepIndex}
          steps={tourSteps}
          disableOverlayClose
          spotlightClicks
          styles={tourStyles}
        />
      )}
    </>
  );
};

export default BaseTourComponent;
