
import React from 'react';
import Joyride from 'react-joyride';
import { useOnboardingTour } from '../../hooks/onboarding/use-onboarding-tour';
import { usePricingTourSteps } from '../../hooks/onboarding/use-pricing-tour-steps';
import { tourStyles } from './OnboardingTourStyles';
import { useToast } from '../../hooks/use-toast';
import { PricingUserType } from '../../hooks/onboarding/types';

interface PricingPageTourProps {
  userType?: PricingUserType;
  autoStart?: boolean;
}

const PricingPageTour: React.FC<PricingPageTourProps> = ({ 
  userType = 'consumer',
  autoStart = false
}) => {
  const { toast } = useToast();
  const steps = usePricingTourSteps(userType);
  
  // Use the base onboarding tour hook but with pricing-specific configuration
  const { 
    run, 
    stepIndex, 
    handleJoyrideCallback, 
    startTour, 
    setRun 
  } = useOnboardingTour(
    userType === 'enterprise' ? 'firm_admin' : userType, // Map 'enterprise' to 'firm_admin' for compatibility
    () => {
      toast("Pricing Tour Complete!", {
        description: "Now you understand our pricing options. Feel free to choose the plan that fits your needs!",
        duration: 5000,
      });
    },
    () => {
      toast("Tour Skipped", {
        description: "You can restart the tour anytime by clicking the 'Tour' button.",
        duration: 3000,
      });
    }
  );
  
  React.useEffect(() => {
    // Check if this specific tour has been seen
    const hasTakenPricingTour = localStorage.getItem('hasTakenPricingTour');
    
    // Auto-start the tour if requested and not seen before
    if (autoStart && !hasTakenPricingTour) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('hasTakenPricingTour', 'true');
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, startTour]);

  return (
    <>
      <button 
        onClick={() => setRun(true)}
        className="fixed bottom-4 right-4 z-50 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-lg"
        aria-label="Start pricing tour"
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

export default PricingPageTour;
