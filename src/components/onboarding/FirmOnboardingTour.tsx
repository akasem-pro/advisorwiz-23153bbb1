
import React, { useEffect } from 'react';
import Joyride from 'react-joyride';
import { useOnboardingTour } from '../../hooks/onboarding/use-onboarding-tour';
import { useFirmTourSteps } from '../../hooks/onboarding/use-firm-tour-steps';
import { tourStyles } from './OnboardingTourStyles';
import { useToast } from '../../hooks/use-toast';
import { TOUR_NAMES } from '../../hooks/onboarding/types';

interface FirmOnboardingTourProps {
  autoStart?: boolean;
  onComplete?: () => void;
}

const FirmOnboardingTour: React.FC<FirmOnboardingTourProps> = ({ 
  autoStart = true,
  onComplete
}) => {
  const { toast } = useToast();
  const steps = useFirmTourSteps();
  
  // Use the base onboarding tour hook with firm-specific configuration
  const { 
    run, 
    stepIndex, 
    handleJoyrideCallback, 
    startTour, 
    setRun 
  } = useOnboardingTour(
    'firm_admin',
    () => {
      toast({
        title: "Firm Profile Setup Tour Complete!",
        description: "You're now ready to manage your firm and connect your advisors with potential clients.",
        duration: 5000,
      });
      
      if (onComplete) {
        onComplete();
      }
      
      // Mark this specific tour as seen
      localStorage.setItem(TOUR_NAMES.FIRM_ONBOARDING, 'true');
    },
    () => {
      toast({
        title: "Tour Skipped",
        description: "You can restart the tour anytime from your settings menu.",
        duration: 3000,
      });
    }
  );
  
  useEffect(() => {
    // Check if this specific tour has been seen
    const hasSeenTour = localStorage.getItem(TOUR_NAMES.FIRM_ONBOARDING);
    
    // Auto-start the tour if requested and not seen before
    if (autoStart && !hasSeenTour) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        startTour();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, startTour]);

  return (
    <>
      <button 
        onClick={() => setRun(true)}
        className="fixed bottom-16 right-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-lg"
        aria-label="Start firm setup tour"
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
          steps={steps}
          disableOverlayClose
          spotlightClicks
          styles={tourStyles}
        />
      )}
    </>
  );
};

export default FirmOnboardingTour;
