
import React, { useEffect, useRef } from 'react';
import Joyride from 'react-joyride';
import { useOnboardingTour } from '../../hooks/onboarding/use-onboarding-tour';
import { useAdvisorTourSteps } from '../../hooks/onboarding/use-advisor-tour-steps';
import { tourStyles } from './OnboardingTourStyles';
import { useToast } from '../../hooks/use-toast';

interface AdvisorOnboardingTourProps {
  autoStart?: boolean;
  onComplete?: () => void;
}

const AdvisorOnboardingTour: React.FC<AdvisorOnboardingTourProps> = ({ 
  autoStart = true,
  onComplete
}) => {
  const { toast } = useToast();
  const steps = useAdvisorTourSteps();
  const isMounted = useRef(true);
  
  // Use the base onboarding tour hook with advisor-specific configuration
  const { 
    run, 
    stepIndex, 
    handleJoyrideCallback, 
    startTour, 
    setRun 
  } = useOnboardingTour(
    'advisor',
    () => {
      if (!isMounted.current) return;
      
      toast({
        title: "Profile Setup Tour Complete!",
        description: "You're now ready to start connecting with potential clients. Complete your profile to increase your visibility.",
        duration: 5000,
      });
      
      if (onComplete) {
        onComplete();
      }
      
      // Mark this specific tour as seen
      localStorage.setItem('hasSeenAdvisorOnboardingTour', 'true');
    },
    () => {
      if (!isMounted.current) return;
      
      toast({
        title: "Tour Skipped",
        description: "You can restart the tour anytime from your settings menu.",
        duration: 3000,
      });
    }
  );
  
  useEffect(() => {
    // Check if this specific tour has been seen
    const hasSeenTour = localStorage.getItem('hasSeenAdvisorOnboardingTour');
    
    // Auto-start the tour if requested and not seen before
    if (autoStart && !hasSeenTour) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        if (isMounted.current) {
          startTour();
        }
      }, 800);
      
      return () => {
        clearTimeout(timer);
        isMounted.current = false;
      };
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [autoStart, startTour]);

  return (
    <>
      <button 
        onClick={() => isMounted.current && setRun(true)}
        className="fixed bottom-16 right-4 z-50 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg"
        aria-label="Start advisor profile setup tour"
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

export default AdvisorOnboardingTour;
